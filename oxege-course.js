(() => {
  "use strict";

  const program = window.hackstarkData?.oxegeCybersecurityProgram;
  const root = document.querySelector(".oxege");
  if (!program || !root) return;

  const sections = program.curriculum?.sections || [];
  const state = { track: "all", query: "" };
  const list = document.getElementById("oxege-module-list");
  const status = document.getElementById("oxege-status");
  const search = document.getElementById("oxege-search");
  const filters = document.getElementById("oxege-filters");
  const fullToggle = document.getElementById("oxege-full-toggle");
  const curriculumTools = root.querySelector(".oxege-curriculum__tools");
  const previewSectionCount = 2;
  let fullCurriculum = false;

  const normalize = (value) => String(value || "").toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9+#.\-/\s]/g, " ")
    .replace(/\s+/g, " ").trim();

  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const renderOverview = () => {
    const tracks = document.getElementById("oxege-tracks");
    const outcomes = document.getElementById("oxege-outcomes");
    const tools = document.getElementById("oxege-tools");

    program.tracks.forEach((track) => {
      const article = make("article", "oxege-track-card");
      article.innerHTML = `<span>${track.number}</span><p>${track.id === "core" ? "Part I" : "Part II"}</p><h4></h4><strong>${track.moduleCount} Modules</strong>`;
      article.querySelector("h4").textContent = track.name;
      const ul = make("ul");
      track.topics.forEach((topic) => ul.append(make("li", "", topic)));
      article.append(ul);
      tracks?.append(article);
    });

    program.outcomeGroups.forEach((group) => {
      const article = make("article", "oxege-outcome-card");
      article.append(make("h4", "", group.name));
      const ul = make("ul");
      group.topics.forEach((topic) => ul.append(make("li", "", topic)));
      article.append(ul);
      outcomes?.append(article);
    });

    program.toolGroups.forEach((group) => {
      const article = make("article", "oxege-tool-card");
      article.append(make("h4", "", group.name));
      const ul = make("ul", "oxege-tag-list");
      group.tools.forEach((tool) => ul.append(make("li", "", tool)));
      article.append(ul);
      tools?.append(article);
    });
  };

  const sectionLabel = (section) => section.kind === "module"
    ? `Module ${section.number}`
    : section.id === "introduction" ? "Introduction" : "Lab Setup";

  const topicMatches = (section) => {
    if (!state.query) return section.topics;
    const query = normalize(state.query);
    const headingMatches = normalize(`${sectionLabel(section)} ${section.title}`).includes(query);
    return headingMatches ? section.topics : section.topics.filter((topic) => normalize(`${topic.id} ${topic.title}`).includes(query));
  };

  const ensureTopics = (card, section, topics = section.topics) => {
    const panel = card.querySelector(".oxege-module__panel");
    panel.replaceChildren();
    const ol = make("ol", "oxege-topic-list");
    topics.forEach((topic) => {
      const li = make("li");
      li.append(make("span", "", topic.id), make("p", "", topic.title));
      ol.append(li);
    });
    panel.append(ol);
    panel.dataset.loaded = "true";
  };

  const setOpen = (card, section, open, topics) => {
    const button = card.querySelector(".oxege-module__toggle");
    const panel = card.querySelector(".oxege-module__panel");
    if (open && (!panel.dataset.loaded || topics)) ensureTopics(card, section, topics || section.topics);
    button.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    card.classList.toggle("is-open", open);
  };

  const renderCurriculum = () => {
    list.replaceChildren();
    let visibleTopics = 0;
    let visibleSections = 0;
    const sourceSections = fullCurriculum ? sections : sections.slice(0, previewSectionCount);
    sourceSections.forEach((section) => {
      if (state.track !== "all" && section.track !== state.track) return;
      const matches = topicMatches(section);
      if (state.query && !matches.length) return;
      visibleSections += 1;
      visibleTopics += state.query ? matches.length : section.topics.length;

      const card = make("article", `oxege-module oxege-module--${section.track}`);
      card.id = `oxege-${section.id}`;
      card.dataset.sectionId = section.id;
      const button = make("button", "oxege-module__toggle");
      button.type = "button";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", `oxege-panel-${section.id}`);
      const heading = make("span", "oxege-module__heading");
      heading.append(make("span", "oxege-module__number", sectionLabel(section)), make("strong", "", section.title));
      const meta = make("span", "oxege-module__meta", `${section.track === "core" ? "Part I" : "Part II"} · ${section.topics.length} Topics`);
      const icon = make("span", "oxege-module__icon", "+");
      icon.setAttribute("aria-hidden", "true");
      button.append(heading, meta, icon);
      const panel = make("div", "oxege-module__panel");
      panel.id = `oxege-panel-${section.id}`;
      panel.hidden = true;
      card.append(button, panel);
      list.append(card);
      if (state.query) setOpen(card, section, true, matches);
    });
    status.textContent = fullCurriculum
      ? (state.query ? `${visibleSections} Sections · ${visibleTopics} Matching Topics` : `${visibleSections} Sections · ${visibleTopics} Topics`)
      : `Preview: Course Introduction + Cybersecurity Lab Setup · ${visibleTopics} Opening Topics`;
  };

  const setFullCurriculum = (open) => {
    fullCurriculum = open;
    if (curriculumTools) curriculumTools.hidden = !open;
    if (filters) filters.hidden = !open;
    if (!open) {
      state.track = "all";
      state.query = "";
      if (search) search.value = "";
      filters?.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.track === "all")));
    }
    if (fullToggle) {
      fullToggle.setAttribute("aria-expanded", String(open));
      fullToggle.innerHTML = `${open ? "Hide Full Curriculum" : "View Full Curriculum"} <svg aria-hidden="true"><use href="#icon-arrow"></use></svg>`;
    }
    renderCurriculum();
  };

  const renderFilters = () => {
    [
      ["all", "All 32 Modules"],
      ["core", "Part I · Core"],
      ["professional", "Part II · Professional"]
    ].forEach(([value, label]) => {
      const button = make("button", "", label);
      button.type = "button";
      button.dataset.track = value;
      button.setAttribute("aria-pressed", String(value === state.track));
      filters.append(button);
    });
  };

  filters?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-track]");
    if (!button) return;
    state.track = button.dataset.track;
    filters.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    renderCurriculum();
  });

  search?.addEventListener("input", () => {
    state.query = search.value;
    renderCurriculum();
  });

  list?.addEventListener("click", (event) => {
    const button = event.target.closest(".oxege-module__toggle");
    if (!button) return;
    const card = button.closest(".oxege-module");
    const section = sections.find((item) => item.id === card.dataset.sectionId);
    setOpen(card, section, button.getAttribute("aria-expanded") !== "true", state.query ? topicMatches(section) : undefined);
  });

  document.getElementById("oxege-expand")?.addEventListener("click", () => {
    list.querySelectorAll(".oxege-module").forEach((card) => {
      const section = sections.find((item) => item.id === card.dataset.sectionId);
      setOpen(card, section, true, state.query ? topicMatches(section) : undefined);
    });
  });

  document.getElementById("oxege-collapse")?.addEventListener("click", () => {
    list.querySelectorAll(".oxege-module").forEach((card) => {
      const section = sections.find((item) => item.id === card.dataset.sectionId);
      setOpen(card, section, false);
    });
  });

  fullToggle?.addEventListener("click", () => setFullCurriculum(!fullCurriculum));

  document.querySelectorAll("[data-oxege-open-module]").forEach((link) => link.addEventListener("click", () => {
    state.track = "all";
    state.query = "";
    if (search) search.value = "";
    filters?.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.track === "all")));
    setFullCurriculum(true);
    requestAnimationFrame(() => {
      const section = sections.find((item) => item.id === link.dataset.oxegeOpenModule);
      const card = document.getElementById(`oxege-${section.id}`);
      if (card) setOpen(card, section, true);
    });
  }));

  renderOverview();
  renderFilters();
  setFullCurriculum(false);
})();
