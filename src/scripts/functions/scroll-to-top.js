import { Animation, easeOutCubic } from "./animate";

export function scrollToTop(setScrollPosition = false) {
  const scrollTopElement = document.querySelector(".st");
  if (!scrollTopElement) return;
  const scrollTopPath = scrollTopElement.querySelector(".st__path");
  let scrollTopPathLength = 0;
  let documentHeight = getDocumentHeight();

  if (scrollTopPath) {
    scrollTopPathLength = scrollTopPath.getTotalLength();
    const resizeObserver = new ResizeObserver(function () {
      documentHeight = getDocumentHeight();
    });

    window.addEventListener("load", function () {
      documentHeight = getDocumentHeight();
      setPathDashOffset(scrollTopPath, scrollTopPathLength, getScrollPositionPercentage());
      setPathDashArray(scrollTopPath, scrollTopPathLength, getScrollPositionPercentage());
    });
    window.addEventListener(
      "resize",
      function () {
        documentHeight = getDocumentHeight();
      },
      {
        passive: true,
      }
    );
    resizeObserver.observe(document.body);
  }
  let hasClass = scrollTopElement.classList.contains("_active"),
    isScrolled = scrollY > 35;
  window.addEventListener(
    "scroll",
    function () {
      hasClass = scrollTopElement.classList.contains("_active");
      isScrolled = scrollY > 35;
      if (isScrolled && !hasClass) {
        scrollTopElement.classList.add("_active");
      } else if (!isScrolled && hasClass) {
        scrollTopElement.classList.remove("_active");
      }

      if (!scrollTopPath) return;
      setPathDashOffset(scrollTopPath, scrollTopPathLength, getScrollPositionPercentage());
    },
    {
      passive: true,
    }
  );
  scrollTopElement.addEventListener("click", () => {
    let currentScrollTop = window.scrollY;

    const scrollAnimation = new Animation({
      draw: function (progress) {
        window.scrollTo(0, currentScrollTop - currentScrollTop * progress);
      },
      timing: easeOutCubic,
      duration: 1000,
    });

    scrollAnimation.start();
  });
  if (scrollY > 35 && !scrollTopElement.classList.contains("_active")) {
    scrollTopElement.classList.add("_active");
  }

  function setPathDashOffset(path, pathLength, value) {
    path.style.strokeDashoffset = pathLength - 0.01 * pathLength * value;
  }

  function setPathDashArray(path, pathLength) {
    path.style.strokeDasharray = pathLength;
  }

  function getDocumentHeight() {
    return document.documentElement.offsetHeight - window.innerHeight;
  }

  function getScrollPositionPercentage() {
    const scrollPercentage = (document.documentElement.scrollTop * 100) / documentHeight;
    if (setScrollPosition)
      document.documentElement.setAttribute("style", "--scroll-position:" + scrollPercentage);
    return scrollPercentage;
  }
}
