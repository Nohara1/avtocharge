export function toHorizontalScroll(element) {
  element.addEventListener("wheel", (event) => {
    event.preventDefault();
    element.scrollLeft += event.deltaY / 2;
  });
  element.addEventListener("touchstart", (event) => {
    xDown = event.touches[0].clientX;
  });
  let xDown = null;
  element.addEventListener("touchmove", (event) => {
    const xUp = event.touches[0].clientX;
    const xDiff = xDown - xUp;
    event.preventDefault();
    element.scrollLeft += xDiff / 2;
  });
}
