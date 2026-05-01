export function mapOverlay() {
  const overlays = document.querySelectorAll("[data-map-overlay]");

  if (!overlays.length) return;

  const passive = {
    passive: true,
  };

  let timer = null;

  overlays.forEach(function (overlay) {
    const showListener = showMapOverlay.bind(this, overlay);

    overlay.addEventListener("wheel", showListener, passive);
    overlay.addEventListener("touchmove", showListener, passive);
    overlay.addEventListener("click", disableOverlay);

    function disableOverlay() {
      overlay.classList.add("disabled");
      overlay.removeEventListener("wheel", showListener);
      overlay.removeEventListener("touchmove", showListener);
      overlay.removeEventListener("click", disableOverlay);
    }
  });

  function showMapOverlay(element) {
    if (timer) clearTimeout(timer);
    element.classList.add("active");

    timer = setTimeout(function () {
      element.classList.remove("active");
      clearTimeout(timer);
      timer = null;
    }, 2000);
  }
}
