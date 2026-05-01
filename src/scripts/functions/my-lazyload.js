import { isDesktopResolution } from "./helpers";
export function myLazyLoad() {
  const lazyObjects = document.querySelectorAll("img[data-srcset], [data-background]");
  const lazyObservedContainers = document.querySelectorAll("[data-lazy-observe]");

  if (!lazyObjects.length) return;

  const mOptions = {
    childList: true,
    subtree: true,
  };
  const iOptions = {
    // root: document.querySelector( '#viewport' ),
    rootMargin: isDesktopResolution() ? "500px" : "250px",
    threshold: 0,
  };

  if ("MutationObserver" in window) {
    lazyObservedContainers.forEach(function (item) {
      const observer = new MutationObserver(manageMutation);
      observer.observe(item, mOptions);
    });
  }

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
      return;
    });
  }

  function manageMutation(mutationList, observer) {
    mutationList.forEach(function (items) {
      if (!items.addedNodes.length) return;

      items.addedNodes.forEach(function (item) {
        if (item.nodeType !== Node.ELEMENT_NODE) return;

        const lazyImages = item.querySelectorAll("img[data-srcset], [data-background]");

        if (!lazyImages.length) return;

        intersectionHandler(lazyImages);
      });
    });
  }

  function replaceAttributes(item) {
    // const width = item.getAttribute("width"), height = item.getAttribute("height");
    // if (width && height) {
    //   item.style.height = ${height/width*window.getComputedStyle(item).width}px;
    // }
    if (item.nodeName === "IMG") {
      item.setAttribute("srcset", item.getAttribute("data-srcset"));
      item.removeAttribute("data-srcset");
      return true;
    }
    item.style.backgroundImage = 'url("' + item.getAttribute("data-background") + '")';
    item.removeAttribute("data-background");

    // item.addEventListener("load", function (event) {
    //   event.target.style.height = null;
    // });
  }
}
