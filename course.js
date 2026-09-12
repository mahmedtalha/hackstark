(() => {
  "use strict";

  const data = window.hackstarkData;
  const course = data?.courses?.find((item) => item.id === "ethical-hacking-beginners");
  const mount = document.querySelector("#course-curriculum-list");
  if (!course || !mount) return;

  const storageKey = `hackstark-course-progress:${course.id}`;
  const progressStates = Object.freeze([
    { label: "Not started", short: "Not started" },
    { label: "In progress", short: "In progress" },
    { label: "Completed", short: "Completed" }
  ]);
  const allLessons = course.sections.flatMap((section) => section.modules.flatMap((module) => module.lessons));
  let activeFilter = "all";
  let searchTerm = "";
  let progress = loadProgress();

  function lessonState(id) {
    const value = Number(progress[id]);
    return Number.isInteger(value) && value >= 0 && value < progressStates.length ? value : 0;
  }

  function loadProgress() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return stored && typeof stored === "object" ? stored : {};
    } catch (_) {
      return {};
    }
  }

  function saveProgress() {
    try { localStorage.setItem(storageKey, JSON.stringify(progress)); } catch (_) { /* Local storage may be unavailable. */ }
  }

  function svg(name) {
    return `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
  }

  function badge(label, kind = "") {
    return `<span class="course-badge${kind ? ` course-badge--${kind}` : ""}">${label}</span>`;
  }

  function resourceMarkup(resource) {
    if (resource.url) {
      const label = resource.label || (resource.type === "pdf" ? "Open guide" : "Open resource");
      return `<a class="course-resource course-resource--linked" href="${resource.url}" target="_blank" rel="noopener noreferrer">${svg(resource.type === "pdf" ? "book" : "external")}<span><strong>${resource.title}</strong><small>${label}</small></span>${svg("arrow")}</a>`;
    }
    return `<div class="course-resource course-resource--pending">${svg("book")}<span><strong>${resource.title}</strong><small>Resource not yet published</small></span>${badge("Coming soon", "muted")}</div>`;
  }

  function lessonMarkup(lesson, index) {
    const state = lessonState(lesson.id);
    const isPreview = Boolean(lesson.videoUrl);
    const watch = isPreview
      ? `<a class="course-watch-button" href="${lesson.videoUrl}" target="_blank" rel="noopener noreferrer">${svg("play")} Free preview</a>`
      : `<button class="course-locked-button" type="button" data-request-course>${svg("lock")} Purchase to unlock</button>`;
    const progressButton = isPreview ? `<button class="course-progress-button" type="button" data-progress-for="${lesson.id}" data-state="${state}" aria-label="Progress for ${lesson.title}: ${progressStates[state].label}"><span aria-hidden="true"></span>${progressStates[state].short}</button>` : "";
    return `<article class="course-lesson" data-lesson-id="${lesson.id}" data-progress-state="${state}">
      <div class="course-lesson__number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
      <div class="course-lesson__copy">
        <div class="course-lesson__meta"><span>${lesson.category}</span>${isPreview ? badge("Free preview", "preview") : badge("Locked", "locked")}${lesson.legacy ? badge("Legacy", "legacy") : ""}${lesson.labOnly ? badge("Lab only", "lab") : ""}</div>
        <h4>${lesson.title}</h4>
      </div>
      <div class="course-lesson__actions">${watch}${progressButton}</div>
    </article>`;
  }

  function moduleMarkup(module, moduleIndex, sectionIndex) {
    const panelId = `course-module-panel-${sectionIndex}-${moduleIndex}`;
    const buttonId = `course-module-button-${sectionIndex}-${moduleIndex}`;
    const isOpen = sectionIndex === 0 && moduleIndex === 0;
    const moduleBadges = `${module.legacy ? badge("Legacy content", "legacy") : ""}${module.badge ? badge(module.badge, "lab") : ""}`;
    const resources = module.resources.length
      ? `<div class="course-resources" aria-label="Supporting resources">${module.resources.map(resourceMarkup).join("")}</div>` : "";
    return `<article class="course-module" data-filter="${module.filter}" data-search="${[module.number, module.title, module.category, module.description, ...module.lessons.map((lesson) => `${lesson.title} ${lesson.category}`)].join(" ").toLowerCase()}">
      <h3>
        <button class="course-module__toggle" id="${buttonId}" type="button" aria-expanded="${isOpen}" aria-controls="${panelId}">
          <span class="course-module__identity"><span class="course-module__number">${module.number}</span><span><strong>${module.title}</strong><small>${module.category} · ${module.lessons.length} lesson${module.lessons.length === 1 ? "" : "s"}</small></span></span>
          <span class="course-module__badges">${moduleBadges}</span><span class="course-module__chevron" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="course-module__panel" id="${panelId}" role="region" aria-labelledby="${buttonId}"${isOpen ? "" : " hidden"}>
        ${module.description ? `<p class="course-module__description">${module.description}</p>` : ""}
        <div class="course-lessons">${module.lessons.map(lessonMarkup).join("")}</div>${resources}
      </div>
    </article>`;
  }

  function render() {
    mount.innerHTML = course.sections.map((section, sectionIndex) => `<section class="course-curriculum-group" data-course-section>
      <div class="course-curriculum-group__heading"><span>${String(sectionIndex + 1).padStart(2, "0")}</span><div><h3>${section.title}</h3><p>${section.description}</p></div></div>
      <div class="course-module-list">${section.modules.map((module, moduleIndex) => moduleMarkup(module, moduleIndex, sectionIndex)).join("")}</div>
    </section>`).join("");
    applyFilters();
    updateProgress();
  }

  function setModuleOpen(module, open) {
    const toggle = module.querySelector(".course-module__toggle");
    const panel = module.querySelector(".course-module__panel");
    toggle.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  }

  function applyFilters() {
    const query = searchTerm.toLowerCase();
    let visibleModules = 0;
    let visibleLessons = 0;
    mount.querySelectorAll("[data-course-section]").forEach((section) => {
      let sectionCount = 0;
      section.querySelectorAll(".course-module").forEach((module) => {
        const filterMatch = activeFilter === "all" || module.dataset.filter === activeFilter;
        const searchMatch = !query || module.dataset.search.includes(query);
        const visible = filterMatch && searchMatch;
        module.hidden = !visible;
        if (visible) {
          visibleModules += 1;
          visibleLessons += module.querySelectorAll(".course-lesson").length;
          sectionCount += 1;
          if (query) setModuleOpen(module, true);
        }
      });
      section.hidden = sectionCount === 0;
    });
    const status = document.querySelector("#curriculum-status");
    if (status) status.textContent = visibleModules ? `${visibleModules} modules · ${visibleLessons} lessons shown` : "No lessons match this search and filter.";
  }

  function updateProgress() {
    let completed = 0;
    allLessons.forEach((lesson) => { if (lessonState(lesson.id) === 2) completed += 1; });
    const percent = Math.round((completed / allLessons.length) * 100);
    const text = document.querySelector("#course-progress-text");
    const bar = document.querySelector("#course-progress-bar");
    const track = bar?.parentElement;
    const percentage = document.querySelector("#course-progress-percent");
    if (text) text.textContent = `${completed} / ${allLessons.length} lessons completed`;
    if (bar) bar.style.width = `${percent}%`;
    if (track) track.setAttribute("aria-valuenow", String(completed));
    if (percentage) percentage.textContent = `${percent}%`;
  }

  mount.addEventListener("click", (event) => {
    const toggle = event.target.closest(".course-module__toggle");
    if (toggle) {
      const module = toggle.closest(".course-module");
      setModuleOpen(module, toggle.getAttribute("aria-expanded") !== "true");
      return;
    }
    const button = event.target.closest("[data-progress-for]");
    if (!button) return;
    const lessonId = button.dataset.progressFor;
    const nextState = (lessonState(lessonId) + 1) % progressStates.length;
    progress[lessonId] = nextState;
    saveProgress();
    const lesson = button.closest(".course-lesson");
    lesson.dataset.progressState = String(nextState);
    button.dataset.state = String(nextState);
    button.innerHTML = `<span aria-hidden="true"></span>${progressStates[nextState].short}`;
    button.setAttribute("aria-label", `Progress for ${lesson.querySelector("h4").textContent}: ${progressStates[nextState].label}`);
    updateProgress();
  });

  document.querySelector("#curriculum-search")?.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim();
    applyFilters();
  });

  document.querySelectorAll("[data-course-filter]").forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.courseFilter;
    document.querySelectorAll("[data-course-filter]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    applyFilters();
  }));

  document.querySelector("#expand-curriculum")?.addEventListener("click", () => mount.querySelectorAll(".course-module:not([hidden])").forEach((module) => setModuleOpen(module, true)));
  document.querySelector("#collapse-curriculum")?.addEventListener("click", () => mount.querySelectorAll(".course-module:not([hidden])").forEach((module) => setModuleOpen(module, false)));
  document.querySelector("#reset-course-progress")?.addEventListener("click", () => {
    progress = {};
    saveProgress();
    mount.querySelectorAll(".course-lesson").forEach((lesson) => {
      lesson.dataset.progressState = "0";
      const button = lesson.querySelector(".course-progress-button");
      if (!button) return;
      button.dataset.state = "0";
      button.innerHTML = `<span aria-hidden="true"></span>${progressStates[0].short}`;
      button.setAttribute("aria-label", `Progress for ${lesson.querySelector("h4").textContent}: ${progressStates[0].label}`);
    });
    updateProgress();
  });

  render();
})();
