export function wheelToHide() {
  const elements = document.querySelectorAll("._wheel-to-hide");
  if (!elements.length) return;

  elements.forEach((element) => {
    if (
      element.scrollWidth <= element.clientWidth ||
      document.cookie.includes("wheelToHideHidden")
    ) {
      element.classList.remove("active");
      setTimeout(() => element.classList.remove("_wheel-to-hide"), 500);
      return;
    }

    element.scrollLeft = 0;
    element.classList.add("active");
    element.addEventListener("scroll", (event) => hide(event.target), {
      once: true,
      passive: true,
    });
    element.addEventListener("click", (event) => hide(event.target), {
      once: true,
    });
  });

  function hide(element) {
    element.classList.remove("active");
    document.cookie = "wheelToHideHidden=; max-age=604800; samesite=lax";
    setTimeout(() => element.classList.remove("_wheel-to-hide"), 500);
  }
}
