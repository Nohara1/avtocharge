export function toggleClassOnScroll(selector, topOffset, type = "default") {
  const items = document.querySelectorAll(selector);
  const scrolledClass = "_scrolled",
    hiddenClass = "_hidden";
  let scrollState = null,
    hiddenState = null;

  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > topOffset && scrollState !== "scrolled") {
        toggleClass(items, scrolledClass, "add");
        scrollState = "scrolled";
      }
      if (window.scrollY <= topOffset && scrollState !== "not-scrolled") {
        toggleClass(items, scrolledClass);
        scrollState = "not-scrolled";
      }
    },
    {
      passive: true,
    }
  );

  if (window.scrollY > topOffset && scrollState !== "scrolled") {
    toggleClass(items, scrolledClass, "add");
    scrollState = "scrolled";
  }

  if (type === "hide") {
    let oldPosition = 0;

    window.addEventListener(
      "scroll",
      function () {
        if (
          window.scrollY > oldPosition &&
          window.scrollY > topOffset &&
          hiddenState !== "hidden"
        ) {
          toggleClass(items, hiddenClass, "add");
          hiddenState = "hidden";
        }
        if (
          (window.scrollY <= oldPosition && hiddenState !== "not-hidden") ||
          (window.scrollY < topOffset && hiddenState !== "not-hidden")
        ) {
          toggleClass(items, hiddenClass);
          hiddenState = "not-hidden";
        }
        oldPosition = window.scrollY <= 0 ? 0 : window.scrollY;
      },
      {
        passive: true,
      }
    );

    toggleClass(items, hiddenClass);
    hiddenState = "not-hidden";

    // if (
    //   window.scrollY > oldPosition &&
    //   window.scrollY > topOffset &&
    //   hiddenState !== "hidden"
    // ) {
    //   toggleClass(items, hiddenClass, "add");
    //   hiddenState = "hidden";
    // }
  }

  function toggleClass(items, className, action = null) {
    items.forEach(function (item) {
      if (!item) return;

      if (action === "add") {
        item.classList.add(className);
        return;
      }

      item.classList.remove(className);
      return;
    });
  }
}
