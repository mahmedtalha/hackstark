(() => {
  "use strict";

  const course = window.hackstarkData?.cyberStartCourse;
  const root = document.getElementById("cyberstart");
  if (!course || !root) return;

  const areaList = root.querySelector("#cyberstart-learning-areas");
  const labsList = root.querySelector("#cyberstart-labs");
  const toolsList = root.querySelector("#cyberstart-tools");
  const outcomesList = root.querySelector("#cyberstart-outcomes");
  const lectureList = root.querySelector("#cyberstart-lecture-list");
  const filters = root.querySelector("#cyberstart-filters");
  const search = root.querySelector("#cyberstart-search");
  const status = root.querySelector("#cyberstart-status");
  const expand = root.querySelector("#cyberstart-expand");
  const collapse = root.querySelector("#cyberstart-collapse");
  const fullToggle = root.querySelector("#cyberstart-full-toggle");
  const curriculumTools = root.querySelector(".cyberstart-curriculum__tools");
  const previewLectureCount = 2;
  let selectedArea = "all";
  let fullCurriculum = false;

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
  const normalize = (value) => String(value).toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9+#./\s-]/g, " ").replace(/\s+/g, " ").trim();

  const appendItems = (target, items, renderer) => {
    if (target) target.innerHTML = items.map(renderer).join("");
  };

  appendItems(areaList, course.learningAreas, (area, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(area)}</strong></li>`);
  appendItems(labsList, course.practicalLabs, (lab) => `<li>${escapeHtml(lab)}</li>`);
  appendItems(toolsList, course.tools, (tool) => `<li>${escapeHtml(tool)}</li>`);
  appendItems(outcomesList, course.outcomes, (outcome) => `<li>${escapeHtml(outcome)}</li>`);

  if (filters) {
    const filterItems = ["All", ...course.learningAreas];
    filters.innerHTML = filterItems.map((area, index) => `<button type="button" class="${index === 0 ? "is-active" : ""}" data-cyberstart-area="${escapeHtml(index === 0 ? "all" : area)}" aria-pressed="${index === 0}">${escapeHtml(area)}</button>`).join("");
  }

  if (lectureList) {
    lectureList.innerHTML = course.lectures.map((lecture, index) => {
      const buttonId = `cyberstart-lecture-button-${index}`;
      const panelId = `cyberstart-lecture-panel-${index}`;
      const searchText = normalize([lecture.number, lecture.title, lecture.learningArea, ...lecture.topics].join(" "));
      return `<article class="cyberstart-lecture" data-area="${escapeHtml(lecture.learningArea)}" data-search="${escapeHtml(searchText)}">
        <h4><button class="cyberstart-lecture__button" id="${buttonId}" type="button" aria-expanded="false" aria-controls="${panelId}">
          <span class="cyberstart-lecture__number">${escapeHtml(lecture.number)}</span>
          <span class="cyberstart-lecture__identity"><strong>${escapeHtml(lecture.title)}</strong><small>${escapeHtml(lecture.learningArea)}</small></span>
          <span class="cyberstart-lecture__duration">${lecture.durationMinutes} min</span><span class="cyberstart-lecture__chevron" aria-hidden="true">+</span>
        </button></h4>
        <div class="cyberstart-lecture__panel" id="${panelId}" role="region" aria-labelledby="${buttonId}" hidden><ol>${lecture.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}</ol></div>
      </article>`;
    }).join("");
  }

  const lectureItems = Array.from(root.querySelectorAll(".cyberstart-lecture"));
  const setExpanded = (item, isExpanded) => {
    const button = item.querySelector(".cyberstart-lecture__button");
    const panel = item.querySelector(".cyberstart-lecture__panel");
    button.setAttribute("aria-expanded", String(isExpanded));
    panel.hidden = !isExpanded;
  };

  lectureItems.forEach((item) => {
    item.querySelector(".cyberstart-lecture__button")?.addEventListener("click", () => {
      const isExpanded = item.querySelector(".cyberstart-lecture__button").getAttribute("aria-expanded") === "true";
      setExpanded(item, !isExpanded);
    });
  });

  const update = () => {
    const query = normalize(search?.value || "");
    let visible = 0;
    lectureItems.forEach((item, index) => {
      const areaMatch = fullCurriculum && (selectedArea === "all" || item.dataset.area === selectedArea);
      const searchMatch = fullCurriculum && (!query || item.dataset.search.includes(query));
      const previewMatch = !fullCurriculum && index < previewLectureCount;
      const show = previewMatch || (areaMatch && searchMatch);
      item.hidden = !show;
      if (show) {
        visible += 1;
        if (fullCurriculum && query) setExpanded(item, true);
      }
    });
    if (status) status.textContent = fullCurriculum
      ? `${visible} of ${course.lectureCount} Lectures · ${course.topicCount} Topics in the full program`
      : `Preview: ${visible} of ${course.lectureCount} Lectures · ${course.topicCount} Topics in the full program`;
  };

  const setFullCurriculum = (open) => {
    fullCurriculum = open;
    if (curriculumTools) curriculumTools.hidden = !open;
    if (filters) filters.hidden = !open;
    if (!open) {
      selectedArea = "all";
      if (search) search.value = "";
      filters?.querySelectorAll("button").forEach((button) => {
        const active = button.dataset.cyberstartArea === "all";
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      lectureItems.forEach((item) => setExpanded(item, false));
    }
    if (fullToggle) {
      fullToggle.setAttribute("aria-expanded", String(open));
      fullToggle.innerHTML = `${open ? "Hide Full Curriculum" : "View Full Curriculum"} <svg aria-hidden="true"><use href="#icon-arrow"></use></svg>`;
    }
    update();
  };

  filters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cyberstart-area]");
    if (!button) return;
    selectedArea = button.dataset.cyberstartArea;
    filters.querySelectorAll("button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    update();
  });
  search?.addEventListener("input", update);
  expand?.addEventListener("click", () => lectureItems.filter((item) => !item.hidden).forEach((item) => setExpanded(item, true)));
  collapse?.addEventListener("click", () => lectureItems.filter((item) => !item.hidden).forEach((item) => setExpanded(item, false)));
  fullToggle?.addEventListener("click", () => setFullCurriculum(!fullCurriculum));

  setFullCurriculum(false);
})();
