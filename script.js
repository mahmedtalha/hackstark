(() => {
  "use strict";

  document.documentElement.classList.add("js");

  /* Shared canonical records are loaded before this file by hackstark-data.js. */
  const siteData = window.hackstarkData;
  if (!siteData) {
    console.error("HackStark data could not be loaded; static page content remains available.");
    return;
  }

  const selectors = {
    header: "#site-header",
    menuToggle: "#menu-toggle",
    mobileMenu: "#mobile-menu",
    navLinks: 'nav a[href^="#"]',
    reveal: ".reveal",
    filterButton: ".filter-button",
    projectCard: ".project-card",
    copyEmail: "#copy-email",
    copyStatus: "#copy-status",
    themeToggle: "#theme-toggle",
    backToTop: "#back-to-top",
    showMoreVideos: "#show-more-videos"
  };

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const HackStarkApp = {
    init() {
      this.applyConfiguredLinks();
      this.hydrateSharedData();
      this.theme();
      this.navigation();
      this.headerState();
      this.scrollProgress();
      this.scrollSpy();
      this.revealAnimations();
      this.heroWorkflow();
      this.interactiveSurfaces();
      this.focusAssistant();
      this.animatedFacts();
      this.portfolioFilters();
      this.repositoryFilters();
      this.copyEmail();
      this.backToTop();
      this.videoExpansion();
      this.imageFallbacks();
      this.scheduleGitHubData();
    },

    applyConfiguredLinks() {
      document.querySelectorAll("[data-social]").forEach((link) => {
        const key = link.dataset.social;
        const url = siteData.socials[key];
        if (url) link.href = url;
      });
    },

    hydrateSharedData() {
      document.querySelectorAll("[data-repository]").forEach((card) => {
        const project = siteData.projects.find((item) => item.repository === card.dataset.repository);
        if (!project) return;
        const title = card.querySelector("h3");
        const description = card.querySelector(":scope > p:not(.responsibility-note)");
        const source = card.querySelector(".card-link");
        if (title) title.textContent = project.name;
        if (description) description.textContent = project.description;
        if (source) source.href = project.url;
      });

      document.querySelectorAll(".video-card").forEach((card) => {
        const source = card.querySelector('.video-thumb[href*="youtube.com/watch"]');
        if (!source) return;
        let id = "";
        try { id = new URL(source.href, window.location.href).searchParams.get("v") || ""; }
        catch { return; }
        const video = siteData.videos.find((item) => item.id === id);
        if (!video) return;
        const title = card.querySelector("h3");
        const description = card.querySelector(".video-card__body > p");
        source.href = video.url;
        if (title) title.textContent = video.title;
        if (description) description.textContent = video.topic;
      });

      document.querySelectorAll("[data-founder-title]").forEach((item) => { item.textContent = siteData.founder.title; });
      document.querySelectorAll("[data-founder-evidence]").forEach((link) => {
        const url = siteData.founder.evidence?.[link.dataset.founderEvidence];
        if (url) link.href = url;
      });
      document.querySelectorAll("[data-statistic]").forEach((item) => {
        const value = siteData.statistics[item.dataset.statistic];
        if (value !== undefined) item.textContent = value;
      });
    },

    navigation() {
      const toggle = document.querySelector(selectors.menuToggle);
      const menu = document.querySelector(selectors.mobileMenu);
      const header = document.querySelector(selectors.header);
      if (!toggle || !menu || !header) return;

      const closeMenu = (restoreFocus = false) => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        menu.hidden = true;
        header.classList.remove("menu-visible");
        document.body.classList.remove("menu-open");
        if (restoreFocus) toggle.focus();
      };

      const openMenu = () => {
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close navigation menu");
        menu.hidden = false;
        header.classList.add("menu-visible");
        document.body.classList.add("menu-open");
        const firstLink = menu.querySelector("a");
        if (firstLink) firstLink.focus();
      };

      toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        if (isOpen) closeMenu(true);
        else openMenu();
      });

      menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu(false);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !menu.hidden) closeMenu(true);
      });

      document.addEventListener("click", (event) => {
        if (!menu.hidden && !header.contains(event.target)) closeMenu(false);
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 1024 && !menu.hidden) closeMenu(false);
      }, { passive: true });
    },

    headerState() {
      const header = document.querySelector(selectors.header);
      if (!header) return;

      const update = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
      update();
      window.addEventListener("scroll", update, { passive: true });
    },

    scrollProgress() {
      const bar = document.querySelector("#scroll-progress-bar");
      if (!bar) return;
      let queued = false;
      const update = () => {
        queued = false;
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
        bar.style.transform = `scaleX(${progress})`;
      };
      const schedule = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
    },

    heroWorkflow() {
      const tabs = [...document.querySelectorAll("[data-workflow-step]")];
      const panel = document.querySelector("#security-stage-panel");
      const reference = document.querySelector("#workflow-reference");
      const label = document.querySelector("#workflow-label");
      const heading = document.querySelector("#workflow-heading");
      const description = document.querySelector("#workflow-description");
      const progress = document.querySelector("#workflow-progress");
      const advance = document.querySelector("#workflow-advance");
      if (!tabs.length || !panel || !reference || !label || !heading || !description || !progress || !advance) return;

      let activeIndex = Math.max(0, tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"));
      const render = (nextIndex, moveFocus = false) => {
        activeIndex = (nextIndex + tabs.length) % tabs.length;
        const stage = siteData.securityWorkflow[activeIndex];
        if (!stage) return;

        tabs.forEach((tab, index) => {
          const selected = index === activeIndex;
          tab.setAttribute("aria-selected", String(selected));
          tab.tabIndex = selected ? 0 : -1;
          tab.classList.toggle("is-current", selected);
          tab.classList.toggle("is-complete", index < activeIndex);
        });

        reference.textContent = `HS / ${stage.number}`;
        label.textContent = stage.label;
        heading.textContent = stage.title;
        description.textContent = stage.description;
        panel.dataset.workflowState = stage.id;
        panel.setAttribute("aria-labelledby", tabs[activeIndex].id);
        progress.style.transform = `scaleX(${tabs.length > 1 ? activeIndex / (tabs.length - 1) : 1})`;

        const nextStage = siteData.securityWorkflow[(activeIndex + 1) % tabs.length];
        const actionLabel = activeIndex === tabs.length - 1 ? `Restart with ${nextStage.name}` : `Continue to ${nextStage.name}`;
        advance.setAttribute("aria-label", actionLabel);
        advance.title = actionLabel;
        panel.classList.remove("security-core--changed");
        requestAnimationFrame(() => panel.classList.add("security-core--changed"));
        if (moveFocus) tabs[activeIndex].focus();
      };

      tabs.forEach((tab, index) => {
        const stage = siteData.securityWorkflow[index];
        if (stage) {
          tab.dataset.workflowStep = stage.id;
          tab.querySelector("span").textContent = stage.number;
          tab.querySelector("strong").textContent = stage.name;
          tab.querySelector("small").textContent = stage.summary;
        }
        tab.addEventListener("click", () => render(index));
        tab.addEventListener("keydown", (event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1);
          render(nextIndex, true);
        });
      });
      advance.addEventListener("click", () => render(activeIndex + 1, true));
      render(activeIndex);
    },

    interactiveSurfaces() {
      const surfaces = [...document.querySelectorAll(".fact-card, .focus-card, .portfolio-project-card, .case-study, .project-card, .video-card, .community-card, .founder-highlights > a")];
      surfaces.forEach((surface) => surface.classList.add("interactive-surface"));
      if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      surfaces.forEach((surface) => {
        surface.addEventListener("pointermove", (event) => {
          const bounds = surface.getBoundingClientRect();
          surface.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
          surface.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
        });
      });
    },

    focusAssistant() {
      document.querySelectorAll(".focus-card").forEach((card) => {
        const topic = card.querySelector("h3")?.textContent?.trim();
        if (!topic || card.querySelector(".focus-assistant-button")) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "focus-assistant-button";
        button.innerHTML = 'Ask JARVIS about this <span aria-hidden="true">↗</span>';
        button.addEventListener("click", () => {
          window.JarvisHackStarkAssistant?.open();
          window.JarvisHackStarkAssistant?.ask(`Tell me about ${topic} at HackStark.`);
        });
        card.append(button);
      });
    },

    animatedFacts() {
      const facts = [...document.querySelectorAll(".fact-card strong")].filter((item) => /^(5|10)$/.test(item.textContent.trim()));
      if (!facts.length || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target;
          const target = Number(item.textContent);
          const started = performance.now();
          const animate = (time) => {
            const progress = Math.min(1, (time - started) / 650);
            item.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          currentObserver.unobserve(item);
        });
      }, { threshold: .7 });
      facts.forEach((item) => observer.observe(item));
    },

    scrollSpy() {
      const links = [...document.querySelectorAll(selectors.navLinks)];
      const sections = [...document.querySelectorAll("main section[id]")]
        .filter((section) => links.some((link) => link.hash === `#${section.id}`));
      if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;

      const setActive = (id) => {
        links.forEach((link) => {
          const isActive = link.hash === `#${id}`;
          link.classList.toggle("is-active", isActive);
          if (isActive) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      };

      const visibility = new Map();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => visibility.set(entry.target.id, entry.intersectionRatio));
        const mostVisible = [...visibility.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort((a, b) => b[1] - a[1])[0];
        if (mostVisible) setActive(mostVisible[0]);
      }, {
        rootMargin: "-20% 0px -62% 0px",
        threshold: [0, 0.2, 0.5, 0.8]
      });

      sections.forEach((section) => observer.observe(section));
    },

    revealAnimations() {
      const elements = [...document.querySelectorAll(selectors.reveal)];
      if (!elements.length) return;

      if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

      elements.forEach((element) => observer.observe(element));
    },

    repositoryFilters() {
      const buttons = [...document.querySelectorAll(selectors.filterButton)];
      const cards = [...document.querySelectorAll(selectors.projectCard)];
      const status = document.querySelector("#project-filter-status");
      if (!buttons.length || !cards.length) return;

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const filter = button.dataset.filter || "all";
          let visibleCount = 0;

          buttons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle("is-active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
          });

          cards.forEach((card) => {
            const categories = (card.dataset.category || "").split(" ");
            const shouldShow = filter === "all" || categories.includes(filter);
            card.hidden = !shouldShow;
            if (shouldShow) visibleCount += 1;
          });

          if (status) {
            const label = filter === "all" ? "all categories" : filter;
            status.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown for ${label}.`;
          }
        });
      });
    },

    portfolioFilters() {
      const buttons = [...document.querySelectorAll("[data-portfolio-filter]")];
      const cards = [...document.querySelectorAll("[data-portfolio-category]")];
      const heading = document.querySelector("[data-portfolio-heading]");
      const status = document.querySelector("#portfolio-filter-status");
      if (!buttons.length || !cards.length) return;

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const filter = button.dataset.portfolioFilter || "all";
          let visibleCount = 0;

          buttons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle("is-active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
          });

          cards.forEach((card) => {
            const categories = (card.dataset.portfolioCategory || "").split(" ");
            const shouldShow = filter === "all" || categories.includes(filter);
            card.hidden = !shouldShow;
            if (shouldShow) visibleCount += 1;
          });

          if (heading) {
            const hasVisibleAdditionalProject = cards.some((card) => !card.classList.contains("portfolio-project-card--featured") && !card.hidden);
            heading.hidden = !hasVisibleAdditionalProject;
          }
          if (status) {
            const label = filter === "all" ? "all specialties" : filter.toUpperCase();
            status.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown for ${label}.`;
          }
        });
      });
    },

    scheduleGitHubData() {
      if (!document.querySelector("[data-repository]")) return;
      if (!("fetch" in window)) {
        this.repositoryState("fallback", "Live GitHub metadata is unavailable in this browser. Static project details remain ready.");
        return;
      }
      const connection = navigator.connection;
      if (connection && connection.saveData) {
        this.repositoryState("fallback", "Live metadata was skipped to respect Data Saver. Static project details remain ready.");
        return;
      }

      this.repositoryState("loading", "Loading current public repository metadata from GitHub…");
      const run = () => this.githubData();
      if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 2500 });
      else window.setTimeout(run, 900);
    },

    repositoryState(state, message) {
      const note = document.querySelector("#repo-data-note");
      const cards = [...document.querySelectorAll("[data-repository]")];
      const loading = state === "loading";

      if (note) {
        note.textContent = message;
        note.classList.toggle("is-loading", loading);
        note.classList.toggle("is-success", state === "success");
        note.classList.toggle("is-fallback", state === "fallback");
        note.setAttribute("aria-busy", String(loading));
      }

      cards.forEach((card) => {
        const meta = card.querySelector(".repo-meta");
        card.classList.toggle("repo-loading", loading);
        if (meta) meta.setAttribute("aria-busy", String(loading));
      });
    },

    async githubData() {
      const cards = [...document.querySelectorAll("[data-repository]")];
      if (!cards.length) return;

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 7000);

      try {
        const response = await fetch("https://api.github.com/users/hackstarkofficial/repos?per_page=100&type=public&sort=updated", {
          headers: { Accept: "application/vnd.github+json" },
          signal: controller.signal
        });
        if (!response.ok) throw new Error("Repository metadata unavailable");
        const publicRepositories = await response.json();
        if (!Array.isArray(publicRepositories)) throw new Error("Unexpected repository response");
        const byName = new Map(publicRepositories.map((repository) => [repository.name, repository]));
        const selected = siteData.projects.map((project) => byName.get(project.repository)).filter(Boolean);
        let loaded = 0;

        siteData.projects.forEach((project) => {
          const data = byName.get(project.repository);
          if (!data) return;
          const expectedName = project.repository;
          const card = cards.find((item) => item.dataset.repository === expectedName);
          if (!card || data.name !== expectedName) return;

          const language = card.querySelector("[data-repo-language]");
          const updated = card.querySelector("[data-repo-updated]");
          const meta = card.querySelector(".repo-meta");

          if (language && typeof data.language === "string") language.textContent = data.language;
          if (updated && data.updated_at) {
            const date = new Date(data.updated_at);
            if (!Number.isNaN(date.getTime())) {
              updated.textContent = `Updated ${new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date)}`;
            }
          }

          if (meta && Number.isFinite(data.stargazers_count)) {
            const stars = document.createElement("span");
            stars.textContent = `${data.stargazers_count} star${data.stargazers_count === 1 ? "" : "s"}`;
            meta.append(stars);
          }
          loaded += 1;
        });

        siteData.runtime.repositories = selected;
        siteData.runtime.githubLoadedAt = new Date().toISOString();

        if (loaded > 0) {
          const qualifier = loaded === cards.length ? "" : " Some live requests failed, so fallback details are shown for the rest.";
          this.repositoryState("success", `Current public metadata loaded from GitHub for ${loaded} of ${cards.length} repositories.${qualifier}`);
        } else {
          this.repositoryState("fallback", "GitHub metadata could not be reached. Static project details and repository links remain available.");
        }
      } catch {
        this.repositoryState("fallback", "GitHub metadata could not be reached. Static project details and repository links remain available.");
      } finally {
        window.clearTimeout(timeoutId);
      }
    },

    copyEmail() {
      const button = document.querySelector(selectors.copyEmail);
      const status = document.querySelector(selectors.copyStatus);
      if (!button || !status) return;

      const legacyCopy = (text) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.append(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Copy failed");
      };

      button.addEventListener("click", async () => {
        const email = button.dataset.email || siteData.organization.email;
        try {
          if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
          else legacyCopy(email);

          status.textContent = "Email copied to clipboard.";
          button.lastChild.textContent = " Copied";
        } catch {
          status.textContent = "Copy was unavailable. Select the email address above to copy it.";
        }

        window.setTimeout(() => {
          status.textContent = "";
          button.lastChild.textContent = " Copy";
        }, 3000);
      });
    },

    theme() {
      const toggle = document.querySelector(selectors.themeToggle);
      if (!toggle) return;

      const storageKey = "hackstark-theme";
      const getStoredTheme = () => {
        try { return localStorage.getItem(storageKey); }
        catch { return null; }
      };

      const preferred = getStoredTheme();
      const initial = preferred === "light" || preferred === "dark"
        ? preferred
        : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

      const applyTheme = (theme) => {
        document.documentElement.dataset.theme = theme;
        toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#06090e" : "#f8fafc");
      };

      applyTheme(initial);

      toggle.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(storageKey, next); }
        catch { /* Preference persistence is optional. */ }
      });
    },

    backToTop() {
      const button = document.querySelector(selectors.backToTop);
      if (!button) return;

      const update = () => button.classList.toggle("is-visible", window.scrollY > 700);
      update();
      window.addEventListener("scroll", update, { passive: true });
      button.addEventListener("click", () => window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      }));
    },

    videoExpansion() {
      const button = document.querySelector(selectors.showMoreVideos);
      const extraVideos = [...document.querySelectorAll(".video-card--more")];
      if (!button || !extraVideos.length) return;

      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        extraVideos.forEach((video) => { video.hidden = expanded; });
        button.setAttribute("aria-expanded", String(!expanded));
        button.firstChild.textContent = expanded ? "Show 4 more lessons " : "Show fewer lessons ";

        if (!expanded) {
          extraVideos.forEach((video) => video.classList.add("is-visible"));
          extraVideos[0].querySelector("a")?.focus({ preventScroll: true });
        }
      });
    },

    imageFallbacks() {
      document.querySelectorAll(".portrait-frame img").forEach((image) => {
        const markError = () => image.classList.add("image-error");
        image.addEventListener("error", markError, { once: true });
        if (image.complete && image.naturalWidth === 0) markError();
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => HackStarkApp.init(), { once: true });
  } else {
    HackStarkApp.init();
  }
})();
