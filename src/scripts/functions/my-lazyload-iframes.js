import { isDesktopResolution } from "./helpers";
/**
 * HTML Syntax
 *
 * @example
 * ```html
 * <iframe src="about:blank" data-src="|real iframe src|"><iframe>
 * ```
 */
export function myLazyLoadIframes() {
  const lazyObjects = document.querySelectorAll("iframe[data-src]");

  if (!lazyObjects.length) return;

  const iOptions = {
    // root: document.querySelector( '#viewport' ),
    rootMargin: isDesktopResolution() ? "500px" : "250px",
    threshold: 0,
  };

  intersectionHandler(lazyObjects);

  function intersectionHandler(items) {
    if ("IntersectionObserver" in window) {
      items.forEach(function (item) {
        const observer = new IntersectionObserver(manageIntersection, iOptions);
        observer.observe(item);
      });

      return true;
    } else {
      items.forEach((item) => replaceAttributes(item));
      return true;
    }
  }

  function manageIntersection(entries, observer) {
    entries.forEach(function (item) {
      if (item.isIntersecting) {
        replaceAttributes(item.target);
        observer.disconnect();
      }
    });
  }

  function replaceAttributes(item) {
    item.setAttribute("src", item.getAttribute("data-src"));
    item.removeAttribute("data-src");
  }
}
