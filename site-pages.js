(() => {
  "use strict";

  const courseRoutes = {
    "course-top": "ethical-hacking-course.html",
    "about-course": "ethical-hacking-course.html",
    "learn": "ethical-hacking-course.html",
    "faq": "ethical-hacking-course.html",
    "course-reviews": "ethical-hacking-course.html",
    "enroll": "ethical-hacking-course.html",
    "course-tools": "ethical-hacking-course.html",
    "outcomes": "ethical-hacking-course.html",
    "curriculum": "ethical-hacking-course.html",
    "cyberstart": "cyberstart.html",
    "cyberstart-curriculum": "cyberstart.html",
    "enroll-techfly": "cyberstart.html",
    "oxege-training": "oxege-training.html",
    "oxege-curriculum": "oxege-training.html",
    "enroll-oxege": "oxege-training.html"
  };

  const followHash = () => {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); }
    catch { return; }
    if (!id) return;
    const page = window.location.pathname.split("/").pop() || "index.html";
    const localTarget = document.getElementById(id);
    const destination = id.startsWith("oxege-module-")
      ? "oxege-training.html" : courseRoutes[id];
    if (destination && destination !== page && !localTarget) {
      window.location.replace(new URL(`${destination}#${encodeURIComponent(id)}`, document.baseURI));
      return;
    }

    // A legacy link to a module must reveal the full list before locating it.
    if (id.startsWith("oxege-module-")) {
      const expand = document.getElementById("oxege-full-toggle");
      if (expand?.getAttribute("aria-expanded") === "false") expand.click();
    }
    const target = localTarget || document.getElementById(id);
    if (!target) return;
    for (let ancestor = target.parentElement; ancestor; ancestor = ancestor.parentElement) {
      if (ancestor.tagName === "DETAILS") ancestor.open = true;
    }
    if (id.startsWith("oxege-module-")) {
      const toggle = target.querySelector(".oxege-module__toggle");
      if (toggle?.getAttribute("aria-expanded") === "false") toggle.click();
    }
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  };

  window.addEventListener("hashchange", followHash);
  if (document.readyState !== "complete") document.addEventListener("DOMContentLoaded", followHash, { once: true });
  else followHash();
})();
