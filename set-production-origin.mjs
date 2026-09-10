#!/usr/bin/env node

import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const replacementFiles = [
  "index.html",
  "privacy.html",
  "terms.html",
  "robots.txt",
  "sitemap.xml"
];
const securityFile = ".well-known/security.txt";

function normalizeOrigin(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Pass a valid absolute URL, for example https://hackstark.example");
  }

  if (url.protocol !== "https:") throw new Error("The production origin must use HTTPS.");
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("Pass an origin only, without credentials, a path, query or fragment.");
  }
  if (url.hostname === "chatgpt.site" || url.hostname.endsWith(".chatgpt.site")) {
    throw new Error("Refusing to use a temporary chatgpt.site origin for production.");
  }

  return url.origin;
}

async function main() {
  const nextOrigin = normalizeOrigin(process.argv[2]);
  const indexPath = resolve(projectRoot, "index.html");
  const indexHtml = await readFile(indexPath, "utf8");
  const currentOrigin = indexHtml.match(/<link rel="canonical" href="(https:\/\/[^/"\s]+)\//)?.[1];

  if (!currentOrigin) throw new Error("Could not determine the current canonical origin from index.html.");
  if (currentOrigin === nextOrigin) throw new Error(`The canonical origin is already ${nextOrigin}.`);

  const pending = new Map();
  for (const relativePath of replacementFiles) {
    const absolutePath = resolve(projectRoot, relativePath);
    const content = await readFile(absolutePath, "utf8");
    if (!content.includes(currentOrigin)) {
      throw new Error(`${relativePath} does not contain the current origin ${currentOrigin}; no files were changed.`);
    }
    pending.set(absolutePath, content.replaceAll(currentOrigin, nextOrigin));
  }

  const securityPath = resolve(projectRoot, securityFile);
  const securityText = await readFile(securityPath, "utf8");
  const securityLines = securityText
    .split(/\r?\n/)
    .filter((line) => !/^(Canonical|Policy):/i.test(line) && line.trim() !== "");
  securityLines.push(
    `Canonical: ${nextOrigin}/.well-known/security.txt`,
    `Policy: ${nextOrigin}/terms.html#security-reporting`
  );
  pending.set(securityPath, `${securityLines.join("\n")}\n`);

  const temporaryFiles = [];
  try {
    for (const [absolutePath, content] of pending) {
      const temporaryPath = `${absolutePath}.origin-update`;
      await writeFile(temporaryPath, content, "utf8");
      temporaryFiles.push([temporaryPath, absolutePath]);
    }
    for (const [temporaryPath, absolutePath] of temporaryFiles) await rename(temporaryPath, absolutePath);
  } catch (error) {
    await Promise.all(temporaryFiles.map(([temporaryPath]) => rm(temporaryPath, { force: true })));
    throw error;
  }

  console.log(`Updated ${pending.size} files from ${currentOrigin} to ${nextOrigin}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
