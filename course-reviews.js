(() => {
  "use strict";

  const grid = document.querySelector("#course-review-grid");
  const button = document.querySelector("#course-reviews-more");
  const status = document.querySelector("#course-reviews-status");
  if (!grid || !button || !status) return;

  const cards = [...grid.querySelectorAll(".course-review-card")];
  const initialVisibleCount = 6;
  let visibleCount = Math.min(initialVisibleCount, cards.length);

  const render = () => {
    cards.forEach((card, index) => { card.hidden = index >= visibleCount; });
    button.hidden = visibleCount >= cards.length;
    button.textContent = visibleCount <= initialVisibleCount ? "Show More Reviews" : "Show Even More Reviews";
    status.textContent = `Showing ${visibleCount} of ${cards.length} reviews`;
  };

  button.addEventListener("click", () => {
    if (visibleCount >= cards.length) return;
    const firstNewCard = cards[visibleCount];
    visibleCount = Math.min(cards.length, visibleCount + 24);
    button.setAttribute("aria-expanded", "true");
    render();
    firstNewCard?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });

  render();
})();
