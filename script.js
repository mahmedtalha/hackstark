(() => {
  "use strict";

  document.documentElement.classList.add("js");

  /* Central configuration for public links and GitHub enhancement data. */
  const siteData = Object.freeze({
    organization: Object.freeze({
      name: "HackStark",
      email: "hackstarkofficial@gmail.com"
    }),
    socials: Object.freeze({
      github: "https://github.com/hackstarkofficial",
      youtube: "https://www.youtube.com/@hackstark8829",
      facebook: "https://facebook.com/hackstarkk/",
      telegramChannel: "https://t.me/hackstarkofficial",
      telegramContact: "https://t.me/hackstarkk"
    }),
    repositories: Object.freeze([
      "FastestRepositoryForKali",
      "fastrepo4kali",
      "C-Plus-Plus-Basic-Structure-Cheat-Sheet",
      "slowlorisdos",
      "SubstitutionCipher"
    ])
  });

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
      this.theme();
      this.navigation();
      this.headerState();
      this.scrollSpy();
      this.revealAnimations();
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

    scheduleGitHubData() {
      if (!("fetch" in window)) return;
      const connection = navigator.connection;
      if (connection && connection.saveData) return;

      const run = () => this.githubData();
      if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 2500 });
      else window.setTimeout(run, 900);
    },

    async githubData() {
      const cards = [...document.querySelectorAll("[data-repository]")];
      if (!cards.length) return;

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 7000);

      try {
        const requests = siteData.repositories.map(async (repository) => {
          const response = await fetch(`https://api.github.com/repos/hackstarkofficial/${encodeURIComponent(repository)}`, {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal
          });
          if (!response.ok) throw new Error("Repository metadata unavailable");
          return response.json();
        });

        const results = await Promise.allSettled(requests);
        let loaded = 0;

        results.forEach((result, index) => {
          if (result.status !== "fulfilled") return;
          const data = result.value;
          const expectedName = siteData.repositories[index];
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

        const note = document.querySelector("#repo-data-note");
        if (note && loaded > 0) note.textContent = `Current public metadata loaded from GitHub for ${loaded} of ${cards.length} repositories. Static project details remain available.`;
      } catch {
        // Static repository content is intentionally retained as the silent fallback.
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
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#100d0c" : "#f4eee4");
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
