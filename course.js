(() => {
  "use strict";

  const data = window.hackstarkData;
  const course = data?.courses?.find((item) => item.id === "ethical-hacking-beginners");
  const mount = document.querySelector("#course-curriculum-list");
  const viewButton = document.querySelector("#show-full-curriculum");
  if (!course || !mount || !viewButton) return;

  const svg = (name) => `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
  const badge = (label, kind = "") => `<span class="course-badge${kind ? ` course-badge--${kind}` : ""}">${label}</span>`;
  const resourceMarkup = (resource) => resource.url
    ? `<a class="course-resource course-resource--linked" href="${resource.url}" target="_blank" rel="noopener noreferrer">${svg(resource.type === "pdf" ? "book" : "external")}<span><strong>${resource.title}</strong><small>${resource.label || "Open resource"}</small></span>${svg("arrow")}</a>`
    : `<div class="course-resource course-resource--pending">${svg("book")}<span><strong>${resource.title}</strong><small>Resource not yet published</small></span>${badge("Coming soon", "muted")}</div>`;

  const lessonMarkup = (lesson, index) => {
    const preview = lesson.videoUrl
      ? `<a class="course-watch-button" href="${lesson.videoUrl}" target="_blank" rel="noopener noreferrer">${svg("play")} Free preview</a>`
      : `<span class="course-video-pending">Included in full course</span>`;
    return `<article class="course-lesson">
      <div class="course-lesson__number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
      <div class="course-lesson__copy"><div class="course-lesson__meta"><span>${lesson.category}</span>${lesson.legacy ? badge("Legacy", "legacy") : ""}${lesson.labOnly ? badge("Lab only", "lab") : ""}</div><h4>${lesson.title}</h4></div>
      <div class="course-lesson__actions">${preview}</div>
    </article>`;
  };

  const moduleMarkup = (module, moduleIndex, sectionIndex) => {
    const panelId = `course-module-panel-${sectionIndex}-${moduleIndex}`;
    const buttonId = `course-module-button-${sectionIndex}-${moduleIndex}`;
    const moduleBadges = `${module.legacy ? badge("Legacy content", "legacy") : ""}${module.badge ? badge(module.badge, "lab") : ""}`;
    const resources = module.resources.length ? `<div class="course-resources" aria-label="Supporting resources">${module.resources.map(resourceMarkup).join("")}</div>` : "";
    return `<article class="course-module">
      <h3><button class="course-module__toggle" id="${buttonId}" type="button" aria-expanded="false" aria-controls="${panelId}">
        <span class="course-module__identity"><span class="course-module__number">${module.number}</span><span><strong>${module.title}</strong><small>${module.category} · ${module.lessons.length} lesson${module.lessons.length === 1 ? "" : "s"}</small></span></span>
        <span class="course-module__badges">${moduleBadges}</span><span class="course-module__chevron" aria-hidden="true"></span>
      </button></h3>
      <div class="course-module__panel" id="${panelId}" role="region" aria-labelledby="${buttonId}" hidden>${module.description ? `<p class="course-module__description">${module.description}</p>` : ""}<div class="course-lessons">${module.lessons.map(lessonMarkup).join("")}</div>${resources}</div>
    </article>`;
  };

  mount.innerHTML = course.sections.map((section, sectionIndex) => `<section class="course-curriculum-group">
    <div class="course-curriculum-group__heading"><span>${String(sectionIndex + 1).padStart(2, "0")}</span><div><h3>${section.title}</h3><p>${section.description}</p></div></div>
    <div class="course-module-list">${section.modules.map((module, moduleIndex) => moduleMarkup(module, moduleIndex, sectionIndex)).join("")}</div>
  </section>`).join("");
  const curriculumGroups = Array.from(mount.querySelectorAll(".course-curriculum-group"));
  const previewSectionCount = 2;

  const setModuleOpen = (module, open) => {
    const toggle = module.querySelector(".course-module__toggle");
    const panel = module.querySelector(".course-module__panel");
    toggle.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  };
  const setCurriculumOpen = (open) => {
    curriculumGroups.forEach((group, index) => {
      group.hidden = !open && index >= previewSectionCount;
    });
    viewButton.setAttribute("aria-expanded", String(open));
    viewButton.innerHTML = `${open ? "Hide Full Curriculum" : "View Full Curriculum"} ${svg("arrow")}`;
  };

  mount.addEventListener("click", (event) => {
    const toggle = event.target.closest(".course-module__toggle");
    if (!toggle) return;
    const module = toggle.closest(".course-module");
    setModuleOpen(module, toggle.getAttribute("aria-expanded") !== "true");
  });
  viewButton.addEventListener("click", () => setCurriculumOpen(viewButton.getAttribute("aria-expanded") !== "true"));
  document.querySelectorAll("[data-course-filter-link]").forEach((link) => link.addEventListener("click", () => {
    if (link.dataset.courseFilterLink !== "all") setCurriculumOpen(true);
  }));
  setCurriculumOpen(false);
})();
