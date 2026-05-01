import { isDesktopResolution } from "./helpers";
export function catalogHandlers() {
  // catalog button switcher on tablet and lower

  const catalogButtonSwitcher = {
    button: document.querySelector("[name='header-catalog']"),
    isToggled: false,
    clickEvent: function () {
      if (!this.button) return;

      this.button.addEventListener("click", (event) => {
        if (this.isToggled || isDesktopResolution()) return;

        event.preventDefault();

        this.isToggled = true;
      });
    },
  };

  catalogButtonSwitcher.clickEvent();

  //catalog banners scrolling horizonally and max width
  // const catalogBannerWrappers = document.querySelectorAll(
  //   ".catalog__banners-wrapper"
  // );
  // catalogBannerWrappers.forEach((elem) => {
  //   window.addEventListener(
  //     "resize",
  //     () => {
  //       if (isDesktopResolution()) {
  //         elem.style.maxWidth = `${
  //           window.innerWidth - elem.getBoundingClientRect().left
  //         }px`;
  //       }
  //     },
  //     {
  //       passive: true,
  //     }
  //   );
  //   if (!isDesktopResolution()) return;

  //   elem.style.maxWidth = `${
  //     window.innerWidth - elem.getBoundingClientRect().left
  //   }px`;

  //   myFunctions.toHorizontalScroll(elem);
  // });

  // catalog document scrolling prevent
  // const catalogElements = document.querySelectorAll(".catalog");
  // let supportsPassive = false;
  // try {
  //   window.addEventListener(
  //     "test",
  //     null,
  //     Object.defineProperty({}, "passive", {
  //       // eslint-disable-next-line getter-return
  //       get: function () {
  //         supportsPassive = true;
  //       },
  //     })
  //   );
  // } catch (e) {
  //   /* empty */
  // }
  // const wheelEvent =
  //   "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
  // const wheelOpt = supportsPassive ? { passive: false } : false;

  // catalogElements.forEach((catalog) => {
  //   catalog.addEventListener(
  //     "mouseenter",
  //     () => {
  //       window.addEventListener(wheelEvent, preventDefault, wheelOpt);
  //       window.addEventListener("touchmove", preventDefault, wheelOpt);
  //     },
  //     {
  //       passive: true,
  //     }
  //   );
  //   catalog.addEventListener(
  //     "mouseleave",
  //     () => {
  //       window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  //       window.removeEventListener("touchmove", preventDefault, wheelOpt);
  //     },
  //     {
  //       passive: true,
  //     }
  //   );
  // });

  // function preventDefault(e) {
  //   e.preventDefault();
  // }

  // menu buttons handler on tablet and lower
  menuButtonsHandler();

  // menu closing by clicking on an empty space
  menuClosingOnclick(catalogButtonSwitcher);

  // main banner class addding on load page
  // mainBannerOnLoad();
}

function menuButtonsHandler() {
  let openedMenus = 0;

  document.documentElement.addEventListener("click", (event) => {
    const t = event.target;
    const button = t.closest('button[name="button-collapse"], .hb__catalog');

    const list = t.closest(".hb__links-list");
    const hoverToOpenEl = t.closest("._hto");

    if (button && hoverToOpenEl) {
      hoverToOpenEl.classList.toggle("opened");

      if (hoverToOpenEl.className.indexOf("opened") > -1) {
        openedMenus++;
      } else {
        openedMenus--;
      }
    }

    list && openedMenus && list.classList.add("_selected");

    if (!openedMenus) {
      const allLists = document.querySelectorAll(".hb__links-list");

      allLists.forEach(function (list) {
        list.classList.remove("_selected");
      });
    }
  });

  // document.documentElement.addEventListener("click", (event) => {
  //   if (event.target.closest(".hb__links-list")) return;
  //   document.querySelectorAll(".hb__links-list").forEach((elem) => {
  //     elem.classList.remove("_selected");
  //   });
  // });
}
function menuClosingOnclick(switcher) {
  document.documentElement.addEventListener("click", (event) => {
    if (event.target.closest("._hto")) return;
    document.querySelectorAll("._hto").forEach((elem) => {
      elem.classList.remove("opened");
    });
    switcher.isToggled = false;
  });
}

// function mainBannerOnLoad() {
//   const banner = document.querySelector(".mb");

//   if (!banner) return;

//   window.addEventListener("load", () => {
//     setTimeout(function () {
//       banner.classList.add("mb_active");
//       // myFunctions.animateElement();
//     }, 100);
//   });
// }
