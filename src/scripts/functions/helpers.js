export function isDesktopResolution() {
  return window.innerWidth >= 1200;
}
export function isMobileResolution() {
  return window.innerWidth < 575.98;
}
export function onReady(func) {
  if (typeof func !== "function") return;

  if (document.readyState === "complete") {
    window.setTimeout(func());
  } else {
    document.addEventListener("DOMContentLoaded", completed);
    window.addEventListener("load", completed);
  }

  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    func();
  }
}
