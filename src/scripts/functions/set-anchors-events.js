import { Animation, easeOutCubic } from "./animate";
import { isDesktopResolution } from "./helpers";
export function setAnchorsEvents() {
  const headerEl = document.querySelector(".header");

  document.documentElement.addEventListener("click", function (event) {
    const link = event.target.closest("a[href*='#'], button[data-target]");

    if (!link) return;

    event.preventDefault();
    scrollTo(link, headerEl);
  });
}

function scrollTo(elem, headerEl) {
  const link = elem.getAttribute("href") || elem.getAttribute("data-target");
  if (link === "#" || link === undefined) return;

  const linkTarget = document.getElementById(link.split("#")[1]);
  if (!linkTarget) return;

  const headerHeight = headerEl ? headerEl.offsetHeight : 100;
  // const isSticky = Boolean(elem.closest(".tabs-block_sticky"));
  const currentScrollTop = window.scrollY;
  const targetScrollTop =
    linkTarget.getBoundingClientRect().top + document.documentElement.scrollTop;
  let difference = currentScrollTop - targetScrollTop;

  // if (isSticky) difference += 50;

  if (isDesktopResolution()) {
    if (difference > 0) {
      difference += headerHeight + 30;
    } else {
      difference += headerHeight - 30;
    }
  } else {
    difference += headerHeight + 20;
  }

  const burgerElem = document.querySelector("._menu-opened");
  if (burgerElem) burgerElem.classList.remove("_menu-opened");

  const anchorAnimation = new Animation({
    draw: function (progress) {
      window.scrollTo(0, currentScrollTop - difference * progress);
    },
    timing: easeOutCubic,
    duration: 1000,
  });

  anchorAnimation.start();
}
