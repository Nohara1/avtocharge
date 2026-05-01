export function ratingWidget() {
  const ratingWidgets = document.querySelectorAll("[data-review-rating]");

  for (const widget of ratingWidgets) {
    if (!widget) continue;

    const rating = +widget.getAttribute("data-rating");
    const starsEl = widget.querySelectorAll("[data-star]");

    if (!rating) continue;

    for (const [index, star] of starsEl.entries()) {
      const svgEl = star.nodeName.toLowerCase() === "svg" ? star : star.querySelector("svg");
      if (Math.floor(rating) === index) {
        svgEl.style.width = Math.floor((rating % 1) * Math.pow(10, 2)) + "%";
        continue;
      }
      if (rating < index + 1) continue;
      svgEl.style.width = 100 + "%";
    }
  }
}
