(() => {
  // src/scripts/functions/helpers.js
  function isDesktopResolution() {
    return window.innerWidth >= 1200;
  }
  function isMobileResolution() {
    return window.innerWidth < 575.98;
  }
  function onReady(func) {
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

  // src/scripts/functions/my-lazyload.js
  function myLazyLoad() {
    const lazyObjects = document.querySelectorAll("img[data-srcset], [data-background]");
    const lazyObservedContainers = document.querySelectorAll("[data-lazy-observe]");
    if (!lazyObjects.length) return;
    const mOptions = {
      childList: true,
      subtree: true
    };
    const iOptions = {
      // root: document.querySelector( '#viewport' ),
      rootMargin: isDesktopResolution() ? "500px" : "250px",
      threshold: 0
    };
    if ("MutationObserver" in window) {
      lazyObservedContainers.forEach(function(item) {
        const observer = new MutationObserver(manageMutation);
        observer.observe(item, mOptions);
      });
    }
    intersectionHandler(lazyObjects);
    function intersectionHandler(items) {
      if ("IntersectionObserver" in window) {
        items.forEach(function(item) {
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
      entries.forEach(function(item) {
        if (item.isIntersecting) {
          replaceAttributes(item.target);
          observer.disconnect();
        }
        return;
      });
    }
    function manageMutation(mutationList, observer) {
      mutationList.forEach(function(items) {
        if (!items.addedNodes.length) return;
        items.addedNodes.forEach(function(item) {
          if (item.nodeType !== Node.ELEMENT_NODE) return;
          const lazyImages = item.querySelectorAll("img[data-srcset], [data-background]");
          if (!lazyImages.length) return;
          intersectionHandler(lazyImages);
        });
      });
    }
    function replaceAttributes(item) {
      if (item.nodeName === "IMG") {
        item.setAttribute("srcset", item.getAttribute("data-srcset"));
        item.removeAttribute("data-srcset");
        return true;
      }
      item.style.backgroundImage = 'url("' + item.getAttribute("data-background") + '")';
      item.removeAttribute("data-background");
    }
  }

  // src/scripts/functions/my-lazyload-iframes.js
  function myLazyLoadIframes() {
    const lazyObjects = document.querySelectorAll("iframe[data-src]");
    if (!lazyObjects.length) return;
    const iOptions = {
      // root: document.querySelector( '#viewport' ),
      rootMargin: isDesktopResolution() ? "500px" : "250px",
      threshold: 0
    };
    intersectionHandler(lazyObjects);
    function intersectionHandler(items) {
      if ("IntersectionObserver" in window) {
        items.forEach(function(item) {
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
      entries.forEach(function(item) {
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

  // src/scripts/functions/toggle-class-on-click.js
  function toggleClassOnClick(itemsClick, classToItem, nameOfClass) {
    document.documentElement.addEventListener("click", function(event) {
      const button = event.target.closest(itemsClick);
      if (!button) return;
      toggle(button, classToItem, nameOfClass);
    });
    function toggle(button, toItem, className) {
      let closestItem = "";
      if (toItem.indexOf("closest") > -1) {
        closestItem = toItem.split(":")[1];
        toItem = "closest";
      }
      switch (toItem) {
        case "parent":
          button.parentElement.classList.toggle(className);
          break;
        case "previous":
          button.previousElementSibling.classList.toggle(className);
          break;
        case "closest":
          var closest = button.closest(closestItem);
          if (!closest) return;
          closest.classList.toggle(className);
          break;
        default:
          document.querySelectorAll(toItem).forEach((item) => {
            item.classList.toggle(className);
          });
          break;
      }
    }
  }

  // src/scripts/functions/toggle-class-on-scroll.js
  function toggleClassOnScroll(selector, topOffset, type = "default") {
    const items = document.querySelectorAll(selector);
    const scrolledClass = "_scrolled", hiddenClass = "_hidden";
    let scrollState = null, hiddenState = null;
    window.addEventListener(
      "scroll",
      function() {
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
        passive: true
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
        function() {
          if (window.scrollY > oldPosition && window.scrollY > topOffset && hiddenState !== "hidden") {
            toggleClass(items, hiddenClass, "add");
            hiddenState = "hidden";
          }
          if (window.scrollY <= oldPosition && hiddenState !== "not-hidden" || window.scrollY < topOffset && hiddenState !== "not-hidden") {
            toggleClass(items, hiddenClass);
            hiddenState = "not-hidden";
          }
          oldPosition = window.scrollY <= 0 ? 0 : window.scrollY;
        },
        {
          passive: true
        }
      );
      toggleClass(items, hiddenClass);
      hiddenState = "not-hidden";
    }
    function toggleClass(items2, className, action = null) {
      items2.forEach(function(item) {
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

  // src/scripts/functions/animate.js
  var Animation = class {
    constructor({ draw, timing, duration, onEnd }) {
      this.draw = draw;
      this.timing = timing;
      this.duration = duration;
      this.onEnd = function() {
        if (typeof onEnd === "undefined") return;
        onEnd();
      };
    }
    start() {
      this.running = true;
      this.start = performance.now();
      this.animate();
    }
    animate() {
      var next = requestAnimationFrame(this.animate.bind(this));
      let time = performance.now();
      let timeFraction = (time - this.start) / this.duration;
      if (timeFraction > 1) timeFraction = 1;
      let progress = this.timing(timeFraction);
      if (typeof this.draw === "function") this.draw(progress);
      if (!this.running || progress >= 1) {
        cancelAnimationFrame(next);
        this.onEnd();
      }
    }
    stop() {
      this.running = false;
    }
  };
  function linear(timeFraction) {
    return timeFraction;
  }
  function easeOutCubic(timeFraction) {
    return 1 - Math.pow(1 - timeFraction, 3);
  }

  // src/scripts/functions/scroll-to-top.js
  function scrollToTop(setScrollPosition = false) {
    const scrollTopElement = document.querySelector(".st");
    if (!scrollTopElement) return;
    const scrollTopPath = scrollTopElement.querySelector(".st__path");
    let scrollTopPathLength = 0;
    let documentHeight = getDocumentHeight();
    if (scrollTopPath) {
      scrollTopPathLength = scrollTopPath.getTotalLength();
      const resizeObserver = new ResizeObserver(function() {
        documentHeight = getDocumentHeight();
      });
      window.addEventListener("load", function() {
        documentHeight = getDocumentHeight();
        setPathDashOffset(scrollTopPath, scrollTopPathLength, getScrollPositionPercentage());
        setPathDashArray(scrollTopPath, scrollTopPathLength, getScrollPositionPercentage());
      });
      window.addEventListener(
        "resize",
        function() {
          documentHeight = getDocumentHeight();
        },
        {
          passive: true
        }
      );
      resizeObserver.observe(document.body);
    }
    let hasClass2 = scrollTopElement.classList.contains("_active"), isScrolled = scrollY > 35;
    window.addEventListener(
      "scroll",
      function() {
        hasClass2 = scrollTopElement.classList.contains("_active");
        isScrolled = scrollY > 35;
        if (isScrolled && !hasClass2) {
          scrollTopElement.classList.add("_active");
        } else if (!isScrolled && hasClass2) {
          scrollTopElement.classList.remove("_active");
        }
        if (!scrollTopPath) return;
        setPathDashOffset(scrollTopPath, scrollTopPathLength, getScrollPositionPercentage());
      },
      {
        passive: true
      }
    );
    scrollTopElement.addEventListener("click", () => {
      let currentScrollTop = window.scrollY;
      const scrollAnimation = new Animation({
        draw: function(progress) {
          window.scrollTo(0, currentScrollTop - currentScrollTop * progress);
        },
        timing: easeOutCubic,
        duration: 1e3
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
      const scrollPercentage = document.documentElement.scrollTop * 100 / documentHeight;
      if (setScrollPosition)
        document.documentElement.setAttribute("style", "--scroll-position:" + scrollPercentage);
      return scrollPercentage;
    }
  }

  // src/scripts/functions/catalog-handlers.js
  function catalogHandlers() {
    const catalogButtonSwitcher = {
      button: document.querySelector("[name='header-catalog']"),
      isToggled: false,
      clickEvent: function() {
        if (!this.button) return;
        this.button.addEventListener("click", (event) => {
          if (this.isToggled || isDesktopResolution()) return;
          event.preventDefault();
          this.isToggled = true;
        });
      }
    };
    catalogButtonSwitcher.clickEvent();
    menuButtonsHandler();
    menuClosingOnclick(catalogButtonSwitcher);
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
        allLists.forEach(function(list2) {
          list2.classList.remove("_selected");
        });
      }
    });
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

  // src/scripts/functions/toggle-elements.js
  function toggleElements() {
    const toggleContainers = document.querySelectorAll("[data-toggle-container]");
    if (!toggleContainers.length) return;
    toggleContainers.forEach((container) => {
      let toggleElements2 = container.querySelectorAll("[data-toggle]");
      const toggleTargets = container.querySelectorAll("[data-target]");
      const otherContainers = container.querySelectorAll("[data-toggle-container]");
      if (!toggleElements2.length && !toggleTargets.length) return;
      const dataAttrValue = container.getAttribute("data-toggle-container");
      const isToggle = dataAttrValue.includes("toggle") ? true : false;
      const isSelf = dataAttrValue.includes("self") ? true : false;
      const isDisable = dataAttrValue.includes("disable") ? true : false;
      const isClickOutside = dataAttrValue.includes("click-outside") ? true : false;
      if (otherContainers.length) {
        toggleElements2 = filterElements(toggleElements2, otherContainers);
      }
      toggleElements2.forEach((elem) => {
        switch (elem.tagName.toLowerCase()) {
          case "select":
            toggleContent({
              current: elem,
              targets: toggleTargets,
              select: true
            });
            elem.addEventListener("change", (event) => {
              toggleContent({
                current: event.target,
                targets: toggleTargets,
                select: true
              });
            });
            break;
          case "input":
            toggleContent({
              current: elem,
              targets: toggleTargets,
              checked: elem.checked,
              disable: isDisable
            });
            elem.addEventListener("click", (event) => {
              toggleContent({
                current: event.target,
                targets: toggleTargets,
                disable: isDisable
              });
            });
            break;
          default:
            elem.addEventListener("click", () => {
              if (elem.hasAttribute("data-step")) return;
              toggleContent({
                current: elem,
                targets: toggleTargets,
                buttons: toggleElements2,
                toggle: isToggle,
                self: isSelf
              });
            });
            break;
        }
      });
      if (isClickOutside) {
        document.documentElement.addEventListener("click", function(event) {
          if (event.target.closest("[data-toggle], [data-target]")) return;
          toggleElements2.forEach((elem) => {
            if (elem.getAttribute("aria-expanded") === "false") return;
            toggleContent({
              current: elem,
              targets: toggleTargets,
              buttons: toggleElements2,
              toggle: isToggle,
              self: isSelf
            });
          });
        });
      }
    });
    function toggleContent(obj) {
      let current = obj.current, targets = obj.targets, buttons = obj.buttons || null, toggle = obj.toggle || false, self = obj.self || false, disable = obj.disable || false, checked = obj.checked !== void 0 ? obj.checked : null, select = obj.select || false;
      const value = toggleValue(select, current);
      targets.forEach((target) => toggleClass(target, value, toggle, self, disable, checked));
      if (buttons === null) return;
      toggleExpanded(current, buttons, toggle, self);
    }
    function toggleValue(select, element) {
      if (select === true) return element.value;
      return element.getAttribute("data-toggle");
    }
    function toggleClass(t, value, toggle, self, disable, checked) {
      const tValue = t.getAttribute("data-target");
      if (checked === false || self === true && tValue !== value) return;
      if (self === true && tValue === value) return t.classList.toggle("active");
      if (toggle === true && t.classList.contains("active")) return t.classList.remove("active");
      if (tValue === value && disable) t.removeAttribute("disabled");
      if (tValue === value) return t.classList.add("active");
      if (disable) t.setAttribute("disabled", "");
      return t.classList.remove("active");
    }
    function toggleExpanded(current, buttons, toggle, self) {
      let isAreaExpanded = current.getAttribute("aria-expanded") === "true";
      if (self) return current.setAttribute("aria-expanded", !isAreaExpanded);
      buttons.forEach((button) => button.setAttribute("aria-expanded", false));
      if (toggle) return current.setAttribute("aria-expanded", !isAreaExpanded);
      current.setAttribute("aria-expanded", true);
    }
    function filterElements(elements, containers) {
      let result = [];
      elements.forEach((element) => {
        let toAdd = true;
        containers.forEach((container) => {
          if (container.contains(element) && toAdd) toAdd = false;
        });
        if (toAdd) result.push(element);
      });
      return result;
    }
  }

  // src/scripts/functions/map-overlay.js
  function mapOverlay() {
    const overlays = document.querySelectorAll("[data-map-overlay]");
    if (!overlays.length) return;
    const passive = {
      passive: true
    };
    let timer = null;
    overlays.forEach(function(overlay) {
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
      timer = setTimeout(function() {
        element.classList.remove("active");
        clearTimeout(timer);
        timer = null;
      }, 2e3);
    }
  }

  // src/scripts/functions/animate-element.js
  function animateElement() {
    const elements = document.querySelectorAll("[data-animate]");
    let elementsBelow = [];
    if (!elements.length) return;
    const iOptions = {
      // root: document.querySelector( '#viewport' ),
      rootMargin: "0px",
      threshold: 0.5
    };
    elements.forEach((element) => {
      elementsBelow.push(element);
    });
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(manageIntersection, iOptions);
      elementsBelow.forEach((element) => observer.observe(element));
      return true;
    } else {
      elementsBelow.forEach((element) => manageAnimations(element));
      return true;
    }
    function manageIntersection(entries, observer) {
      entries.forEach(function(element) {
        if (element.isIntersecting) {
          manageAnimations(element.target);
          observer.unobserve(element.target);
        }
        return;
      });
    }
    function manageAnimations(element) {
      switch (element.getAttribute("data-animate")) {
        case "appearing":
          appearing(element);
          break;
        case "typing":
          typing(element);
          break;
        case "counting":
          counting(element);
          break;
        default:
          adding(element);
          break;
      }
    }
    function typing(element) {
      const text = element.textContent.replace(/(\s*((\r?\n){2,})\s*|\s*((\r?\n){1,2})\s*)/g, "$2$4"), textLength = text.length;
      let currentIndex = 0, prevIndex = 0;
      element.style.height = "".concat(element.offsetHeight, "px");
      element.textContent = "";
      element.classList.add("_animate");
      let anim = new Animation({
        draw: function(p) {
          currentIndex = Math.round(p * textLength);
          if (currentIndex === prevIndex) return;
          prevIndex = currentIndex;
          element.textContent = text.slice(0, currentIndex);
        },
        timing: linear,
        duration: textLength * 60,
        onEnd: function() {
          element.removeAttribute("style");
        }
      });
      anim.start();
      anim.stop.bind(anim);
    }
    function counting(element) {
      const hasWhitespaces = element.textContent.indexOf(" ") > -1;
      const number = parseInt(element.textContent.replace(/\s/g, ""));
      const duration = element.getAttribute("data-animate-duration") || 3e3;
      let currentNumber = 0, prevNumber = 0;
      const anim = new Animation({
        draw: function(p) {
          if (p === void 0) return;
          currentNumber = Math.round(p * number);
          if (currentNumber === prevNumber) return;
          prevNumber = currentNumber;
          element.textContent = hasWhitespaces ? currentNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : currentNumber;
        },
        timing: linear,
        duration
      });
      anim.start();
      anim.stop.bind(anim);
    }
    function appearing(element) {
      const delay = element.getAttribute("data-animate-delay") || 0;
      let anim = new Animation({
        onEnd: function() {
          element.classList.add("_animate");
        },
        timing: linear,
        duration: delay
      });
      anim.start();
      anim.stop.bind(anim);
    }
    function adding(element) {
      const delay = element.getAttribute("data-animate-delay") || 0;
      let anim = new Animation({
        onEnd: function() {
          element.classList.add("_animate");
        },
        timing: linear,
        duration: delay
      });
      anim.start();
      anim.stop.bind(anim);
    }
  }

  // src/scripts/functions/video-appending.js
  function videoAppending() {
    const videoCover = document.querySelectorAll("[data-video-id]");
    if (!videoCover.length) return;
    videoCover.forEach((el) => {
      const videoProps = {
        el,
        mute: "0",
        controls: el.getAttribute("data-controls") || "0",
        origin: window.location.origin.indexOf("localhost") < 0 ? window.location.origin : "",
        id: el.getAttribute("data-video-id") || null,
        width: el.getAttribute("data-width") || el.scrollWidth,
        height: el.getAttribute("data-height") || el.scrollHeight
      };
      if (!videoProps.id) return;
      if (el.closest(".video_fullwidth")) {
        videoProps.mute = "1";
        window.addEventListener("load", () => appendVideo(videoProps));
        el.removeEventListener("click", appendVideo);
      }
      el.addEventListener("click", () => appendVideo(videoProps));
    });
  }
  function appendVideo(props) {
    const videoContainer = props.el.closest(".video__inner"), video = document.createElement("iframe");
    video.src = "https://www.youtube.com/embed/".concat(props.id, "?rel=0&disablekb=1&iv_load_policy=3") + "&mute=".concat(props.mute, "&autoplay=1&showinfo=0&controls=").concat(props.controls, "&enablejsapi=1&loop=1&modestbranding=1&playlist=").concat(props.id) + "&widgetid=1&origin=".concat(props.origin);
    video.width = props.width;
    video.height = props.height;
    video.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );
    video.setAttribute("allowfullscreen", "1");
    videoContainer.appendChild(video);
    video.addEventListener("load", () => {
      video.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "playVideo",
          args: []
        }),
        "*"
      );
      props.el.classList.add("video__cover_hidden");
    });
  }

  // src/scripts/functions/rating-widget.js
  function ratingWidget() {
    const ratingWidgets = document.querySelectorAll("[data-review-rating]");
    for (const widget of ratingWidgets) {
      if (!widget) continue;
      const rating = +widget.getAttribute("data-rating");
      const starsEl = widget.querySelectorAll("[data-star]");
      if (!rating) continue;
      for (const [index, star] of starsEl.entries()) {
        const svgEl = star.nodeName.toLowerCase() === "svg" ? star : star.querySelector("svg");
        if (Math.floor(rating) === index) {
          svgEl.style.width = Math.floor(rating % 1 * Math.pow(10, 2)) + "%";
          continue;
        }
        if (rating < index + 1) continue;
        svgEl.style.width = "100%";
      }
    }
  }

  // src/scripts/functions/anchor-highlight.js
  function anchorHighlight(selector) {
    const anchorElements = document.querySelectorAll(selector);
    let anchors = {};
    const prevEntry = {
      el: null,
      height: 0
    };
    anchorElements.forEach(function(anchor) {
      const link = anchor.getAttribute("href") || anchor.getAttribute("data-target");
      const targetId = link.split("#")[1];
      if (targetId) {
        anchors[targetId] = {
          link: anchor,
          target: document.getElementById(targetId)
        };
      }
    });
    if (!Object.getOwnPropertyNames(anchors).length) return;
    const options = {
      root: null,
      rootMargin: "33.33% 0px -33.33% 0px",
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
    };
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(onIntersect.bind(this, anchors), options);
      for (key in anchors) {
        observer.observe(anchors[key].target);
      }
    }
    function onIntersect(anchors2, entries, observer) {
      const intersectedEntries = entries.filter((entry) => entry.isIntersecting);
      if (!intersectedEntries.length) return;
      const currentEntry = intersectedEntries.reduce(
        (a, b) => a.intersectionRect.height > b.intersectionRect.height ? a : b
      );
      if (prevEntry.el === currentEntry || currentEntry.intersectionRect.height < prevEntry.height)
        return;
      if (prevEntry.el !== null) anchors2[prevEntry.el.target.id].link.classList.remove("active");
      anchors2[currentEntry.target.id].link.classList.add("active");
      prevEntry.el = currentEntry;
      prevEntry.height = currentEntry.intersectionRect.height;
    }
  }

  // src/scripts/functions/popup-overlay.js
  var popupOverlay = class {
    constructor() {
      this.initialized = false;
      if (!document.body) return;
      this.init();
    }
    init() {
      if (this.initialized) return;
      this.name = "popup-overlay";
      this.element = document.createElement("div");
      this.element.classList.add(this.name);
      document.body.appendChild(this.element);
      this.elementClassActive = "".concat(this.name, "_active");
      this.initialized = true;
    }
    show() {
      if (!this.initialized) this.init();
      let scrollWidth = window.innerWidth - document.body.clientWidth;
      this.element.classList.add(this.elementClassActive);
      document.body.style = "overflow: hidden; margin-right: ".concat(scrollWidth, "px");
      document.querySelector("header").style = "padding-right: ".concat(scrollWidth, "px");
    }
    hide() {
      this.element.classList.remove(this.elementClassActive);
      setTimeout(() => {
        document.body.style = "";
        document.querySelector("header").style = "";
      }, 300);
    }
  };
  var myPopupOverlay = new popupOverlay();

  // src/scripts/functions/popup-handler.js
  function popupHandler() {
    const allPopopups = document.querySelectorAll(".popup");
    const popupCloseButtons = document.querySelectorAll(".popup__close");
    popupCloseButtons.forEach((elem) => {
      elem.addEventListener("click", () => {
        myPopupOverlay.hide();
        closePopups(allPopopups);
      });
    });
    window.addEventListener("load", () => autoOpenPopup(allPopopups));
    document.documentElement.addEventListener("click", function(event) {
      const button = event.target.closest("[data-open-popup]");
      if (!button) return;
      closePopups(allPopopups);
      if (openPopup(button.getAttribute("data-open-popup"), button.getAttribute("data-set-title"))) {
        button.classList.add("_popup-opened");
      }
    });
    document.documentElement.addEventListener("click", function(event) {
      const pClass = event.target.getAttribute("class");
      if (!pClass) return;
      const popup = pClass.indexOf("popup_active") > -1;
      if (!popup) return;
      closeAllPopups();
    });
  }
  function closeAllPopups() {
    const popups = document.querySelectorAll(".popup");
    myPopupOverlay.hide();
    closePopups(popups);
  }
  function autoOpenPopup(popups) {
    if (typeof Storage === "undefined") return;
    popups.forEach((popup) => {
      if (!popup.hasAttribute("data-autoopen")) return;
      if (popup.getAttribute("data-autoopen") === "false") return;
      if (timeRangeCheck(popup)) return;
      const interval = popup.getAttribute("data-autoopen-interval");
      const delay = popup.getAttribute("data-autoopen-delay");
      const delayValue = delay ? +delay * 1e3 : 5e3;
      const buttons = popup.querySelectorAll("[name='popup-close'], [name='submit']");
      const popupStorage = localStorage.getItem("popup_".concat(popup.id));
      if (interval !== null) {
        buttons.forEach(
          (button) => button.addEventListener("click", () => saveExpiration(popup, interval))
        );
      }
      if (interval === null || interval === "0" && popupStorage === null || +interval > 0 && isExpired(popupStorage)) {
        setTimeout(() => openPopup(popup.id), delayValue);
      }
      if (isExpired(popupStorage) && interval !== "0") {
        removeExpiration(popup);
      }
    });
    function saveExpiration(popup, interval) {
      const expiry = (/* @__PURE__ */ new Date()).getTime() + interval * 36e5;
      localStorage.setItem("popup_".concat(popup.id), expiry);
    }
    function removeExpiration(popup) {
      localStorage.removeItem("popup_".concat(popup.id));
    }
    function isExpired(expiration) {
      if ((/* @__PURE__ */ new Date()).getTime() < expiration) return false;
      return true;
    }
    function timeRangeCheck(popup) {
      const value = popup.getAttribute("data-autoopen-time");
      if (!value) return false;
      const range = value.split(",");
      if (range.length !== 2) return false;
      const hoursNow = (/* @__PURE__ */ new Date()).getHours();
      if (+range[0] < +range[1]) {
        if (hoursNow >= +range[0] && hoursNow < +range[1]) return false;
      } else {
        if (hoursNow >= +range[0] || hoursNow < +range[1]) return false;
      }
      return true;
    }
  }
  function openPopup(buttonTarget, title = null) {
    if (buttonTarget === "") {
      console.log("This button has an empty data attribute.");
      return false;
    }
    const currentPopup = document.getElementById(buttonTarget);
    if (!currentPopup) {
      console.log('There is no pop-up with current ID ("'.concat(buttonTarget, '") or ID is wrong.'));
      return false;
    }
    popupTitleChange(title, currentPopup);
    myPopupOverlay.show();
    currentPopup.classList.add("popup_active");
    const hasFocusableElement = currentPopup.querySelector(
      "input:not(disabled):not(hidden):not(._sr-only), a, select, button"
    );
    if (!hasFocusableElement) return true;
    setTimeout(() => hasFocusableElement.focus(), 300);
    return true;
  }
  function closePopups(popups) {
    popups.forEach(function(elem) {
      elem.classList.remove("popup_active");
    });
    const activeButtons = document.querySelectorAll("._popup-opened");
    activeButtons.forEach(function(btn) {
      btn.classList.remove("_popup-opened");
    });
  }
  function popupTitleChange(title, popup) {
    if (!title) return;
    const targetInput = popup.querySelector("input[data-set-title]");
    const popupHeading = popup.querySelector(".popup__heading");
    if (!targetInput && !popupHeading) return;
    targetInput.setAttribute("value", title);
    popupHeading.textContent = title;
  }

  // node_modules/@panzoom/panzoom/dist/panzoom.es.js
  if (typeof window !== "undefined") {
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
    if (typeof window.CustomEvent !== "function") {
      window.CustomEvent = function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };
    }
  }
  var isIE = typeof document !== "undefined" && !!document.documentMode;
  var divStyle;
  function createStyle() {
    if (divStyle) {
      return divStyle;
    }
    return divStyle = document.createElement("div").style;
  }
  var prefixes = ["webkit", "moz", "ms"];
  var prefixCache = {};
  function getPrefixedName(name) {
    if (prefixCache[name]) {
      return prefixCache[name];
    }
    const divStyle2 = createStyle();
    if (name in divStyle2) {
      return prefixCache[name] = name;
    }
    const capName = name[0].toUpperCase() + name.slice(1);
    let i = prefixes.length;
    while (i--) {
      const prefixedName = "".concat(prefixes[i]).concat(capName);
      if (prefixedName in divStyle2) {
        return prefixCache[name] = prefixedName;
      }
    }
  }
  function getCSSNum(name, style) {
    return parseFloat(style[getPrefixedName(name)]) || 0;
  }
  function getBoxStyle(elem, name, style = window.getComputedStyle(elem)) {
    const suffix = name === "border" ? "Width" : "";
    return {
      left: getCSSNum("".concat(name, "Left").concat(suffix), style),
      right: getCSSNum("".concat(name, "Right").concat(suffix), style),
      top: getCSSNum("".concat(name, "Top").concat(suffix), style),
      bottom: getCSSNum("".concat(name, "Bottom").concat(suffix), style)
    };
  }
  function setStyle(elem, name, value) {
    elem.style[getPrefixedName(name)] = value;
  }
  function setTransition(elem, options) {
    const transform = getPrefixedName("transform");
    setStyle(elem, "transition", "".concat(transform, " ").concat(options.duration, "ms ").concat(options.easing));
  }
  function setTransform(elem, { x, y, scale, isSVG }, _options) {
    setStyle(elem, "transform", "scale(".concat(scale, ") translate(").concat(x, "px, ").concat(y, "px)"));
    if (isSVG && isIE) {
      const matrixValue = window.getComputedStyle(elem).getPropertyValue("transform");
      elem.setAttribute("transform", matrixValue);
    }
  }
  function getDimensions(elem) {
    let parent = elem.parentNode;
    if (!parent || parent.nodeType !== 1) {
      parent = document.documentElement;
    }
    const style = window.getComputedStyle(elem);
    const parentStyle = window.getComputedStyle(parent);
    const rectElem = elem.getBoundingClientRect();
    const rectParent = parent.getBoundingClientRect();
    return {
      elem: {
        style,
        width: rectElem.width,
        height: rectElem.height,
        top: rectElem.top,
        bottom: rectElem.bottom,
        left: rectElem.left,
        right: rectElem.right,
        margin: getBoxStyle(elem, "margin", style),
        border: getBoxStyle(elem, "border", style)
      },
      parent: {
        style: parentStyle,
        width: rectParent.width,
        height: rectParent.height,
        top: rectParent.top,
        bottom: rectParent.bottom,
        left: rectParent.left,
        right: rectParent.right,
        padding: getBoxStyle(parent, "padding", parentStyle),
        border: getBoxStyle(parent, "border", parentStyle)
      }
    };
  }
  var events = {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup mouseleave"
  };
  if (typeof window !== "undefined") {
    if (typeof window.PointerEvent === "function") {
      events = {
        down: "pointerdown",
        move: "pointermove",
        up: "pointerup pointerleave pointercancel"
      };
    } else if (typeof window.TouchEvent === "function") {
      events = {
        down: "touchstart",
        move: "touchmove",
        up: "touchend touchcancel"
      };
    }
  }
  function onPointer(event, elem, handler, eventOpts) {
    events[event].split(" ").forEach((name) => {
      elem.addEventListener(name, handler, eventOpts);
    });
  }
  function destroyPointer(event, elem, handler) {
    events[event].split(" ").forEach((name) => {
      elem.removeEventListener(name, handler);
    });
  }
  function findEventIndex(pointers, event) {
    let i = pointers.length;
    while (i--) {
      if (pointers[i].pointerId === event.pointerId) {
        return i;
      }
    }
    return -1;
  }
  function addPointer(pointers, event) {
    let i;
    if (event.touches) {
      i = 0;
      for (const touch of event.touches) {
        touch.pointerId = i++;
        addPointer(pointers, touch);
      }
      return;
    }
    i = findEventIndex(pointers, event);
    if (i > -1) {
      pointers.splice(i, 1);
    }
    pointers.push(event);
  }
  function removePointer(pointers, event) {
    if (event.touches) {
      while (pointers.length) {
        pointers.pop();
      }
      return;
    }
    const i = findEventIndex(pointers, event);
    if (i > -1) {
      pointers.splice(i, 1);
    }
  }
  function getMiddle(pointers) {
    pointers = pointers.slice(0);
    let event1 = pointers.pop();
    let event2;
    while (event2 = pointers.pop()) {
      event1 = {
        clientX: (event2.clientX - event1.clientX) / 2 + event1.clientX,
        clientY: (event2.clientY - event1.clientY) / 2 + event1.clientY
      };
    }
    return event1;
  }
  function getDistance(pointers) {
    if (pointers.length < 2) {
      return 0;
    }
    const event1 = pointers[0];
    const event2 = pointers[1];
    return Math.sqrt(Math.pow(Math.abs(event2.clientX - event1.clientX), 2) + Math.pow(Math.abs(event2.clientY - event1.clientY), 2));
  }
  function isAttached(node) {
    let currentNode = node;
    while (currentNode && currentNode.parentNode) {
      if (currentNode.parentNode === document)
        return true;
      currentNode = currentNode.parentNode instanceof ShadowRoot ? currentNode.parentNode.host : currentNode.parentNode;
    }
    return false;
  }
  function getClass(elem) {
    return (elem.getAttribute("class") || "").trim();
  }
  function hasClass(elem, className) {
    return elem.nodeType === 1 && " ".concat(getClass(elem), " ").indexOf(" ".concat(className, " ")) > -1;
  }
  function isExcluded(elem, options) {
    for (let cur = elem; cur != null; cur = cur.parentNode) {
      if (hasClass(cur, options.excludeClass) || options.exclude.indexOf(cur) > -1) {
        return true;
      }
    }
    return false;
  }
  var rsvg = /^http:[\w\.\/]+svg$/;
  function isSVGElement(elem) {
    return rsvg.test(elem.namespaceURI) && elem.nodeName.toLowerCase() !== "svg";
  }
  function shallowClone(obj) {
    const clone = {};
    for (const key2 in obj) {
      if (obj.hasOwnProperty(key2)) {
        clone[key2] = obj[key2];
      }
    }
    return clone;
  }
  var defaultOptions = {
    animate: false,
    canvas: false,
    cursor: "move",
    disablePan: false,
    disableZoom: false,
    disableXAxis: false,
    disableYAxis: false,
    duration: 200,
    easing: "ease-in-out",
    exclude: [],
    excludeClass: "panzoom-exclude",
    handleStartEvent: (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    maxScale: 4,
    minScale: 0.125,
    overflow: "hidden",
    panOnlyWhenZoomed: false,
    pinchAndPan: false,
    relative: false,
    setTransform,
    startX: 0,
    startY: 0,
    startScale: 1,
    step: 0.3,
    touchAction: "none"
  };
  function Panzoom(elem, options) {
    if (!elem) {
      throw new Error("Panzoom requires an element as an argument");
    }
    if (elem.nodeType !== 1) {
      throw new Error("Panzoom requires an element with a nodeType of 1");
    }
    if (!isAttached(elem)) {
      throw new Error("Panzoom should be called on elements that have been attached to the DOM");
    }
    options = { ...defaultOptions, ...options };
    const isSVG = isSVGElement(elem);
    const parent = elem.parentNode;
    parent.style.overflow = options.overflow;
    parent.style.userSelect = "none";
    parent.style.touchAction = options.touchAction;
    (options.canvas ? parent : elem).style.cursor = options.cursor;
    elem.style.userSelect = "none";
    elem.style.touchAction = options.touchAction;
    setStyle(elem, "transformOrigin", typeof options.origin === "string" ? options.origin : isSVG ? "0 0" : "50% 50%");
    function resetStyle() {
      parent.style.overflow = "";
      parent.style.userSelect = "";
      parent.style.touchAction = "";
      parent.style.cursor = "";
      elem.style.cursor = "";
      elem.style.userSelect = "";
      elem.style.touchAction = "";
      setStyle(elem, "transformOrigin", "");
    }
    function setOptions(opts = {}) {
      for (const key2 in opts) {
        if (opts.hasOwnProperty(key2)) {
          options[key2] = opts[key2];
        }
      }
      if (opts.hasOwnProperty("cursor") || opts.hasOwnProperty("canvas")) {
        parent.style.cursor = elem.style.cursor = "";
        (options.canvas ? parent : elem).style.cursor = options.cursor;
      }
      if (opts.hasOwnProperty("overflow")) {
        parent.style.overflow = opts.overflow;
      }
      if (opts.hasOwnProperty("touchAction")) {
        parent.style.touchAction = opts.touchAction;
        elem.style.touchAction = opts.touchAction;
      }
    }
    let x = 0;
    let y = 0;
    let scale = 1;
    let isPanning = false;
    zoom(options.startScale, { animate: false, force: true });
    setTimeout(() => {
      pan(options.startX, options.startY, { animate: false, force: true });
    });
    function trigger(eventName, detail, opts) {
      if (opts.silent) {
        return;
      }
      const event = new CustomEvent(eventName, { detail });
      elem.dispatchEvent(event);
    }
    function setTransformWithEvent(eventName, opts, originalEvent) {
      const value = { x, y, scale, isSVG, originalEvent };
      requestAnimationFrame(() => {
        if (typeof opts.animate === "boolean") {
          if (opts.animate) {
            setTransition(elem, opts);
          } else {
            setStyle(elem, "transition", "none");
          }
        }
        opts.setTransform(elem, value, opts);
        trigger(eventName, value, opts);
        trigger("panzoomchange", value, opts);
      });
      return value;
    }
    function constrainXY(toX, toY, toScale, panOptions) {
      const opts = { ...options, ...panOptions };
      const result = { x, y, opts };
      if (!(panOptions == null ? void 0 : panOptions.force) && (opts.disablePan || opts.panOnlyWhenZoomed && scale === opts.startScale)) {
        return result;
      }
      toX = parseFloat(toX);
      toY = parseFloat(toY);
      if (!opts.disableXAxis) {
        result.x = (opts.relative ? x : 0) + toX;
      }
      if (!opts.disableYAxis) {
        result.y = (opts.relative ? y : 0) + toY;
      }
      if (opts.contain) {
        const dims = getDimensions(elem);
        const realWidth = dims.elem.width / scale;
        const realHeight = dims.elem.height / scale;
        const scaledWidth = realWidth * toScale;
        const scaledHeight = realHeight * toScale;
        const diffHorizontal = (scaledWidth - realWidth) / 2;
        const diffVertical = (scaledHeight - realHeight) / 2;
        if (opts.contain === "inside") {
          const minX = (-dims.elem.margin.left - dims.parent.padding.left + diffHorizontal) / toScale;
          const maxX = (dims.parent.width - scaledWidth - dims.parent.padding.left - dims.elem.margin.left - dims.parent.border.left - dims.parent.border.right + diffHorizontal) / toScale;
          result.x = Math.max(Math.min(result.x, maxX), minX);
          const minY = (-dims.elem.margin.top - dims.parent.padding.top + diffVertical) / toScale;
          const maxY = (dims.parent.height - scaledHeight - dims.parent.padding.top - dims.elem.margin.top - dims.parent.border.top - dims.parent.border.bottom + diffVertical) / toScale;
          result.y = Math.max(Math.min(result.y, maxY), minY);
        } else if (opts.contain === "outside") {
          const minX = (-(scaledWidth - dims.parent.width) - dims.parent.padding.left - dims.parent.border.left - dims.parent.border.right + diffHorizontal) / toScale;
          const maxX = (diffHorizontal - dims.parent.padding.left) / toScale;
          result.x = Math.max(Math.min(result.x, maxX), minX);
          const minY = (-(scaledHeight - dims.parent.height) - dims.parent.padding.top - dims.parent.border.top - dims.parent.border.bottom + diffVertical) / toScale;
          const maxY = (diffVertical - dims.parent.padding.top) / toScale;
          result.y = Math.max(Math.min(result.y, maxY), minY);
        }
      }
      if (opts.roundPixels) {
        result.x = Math.round(result.x);
        result.y = Math.round(result.y);
      }
      return result;
    }
    function constrainScale(toScale, zoomOptions) {
      const opts = { ...options, ...zoomOptions };
      const result = { scale, opts };
      if (!(zoomOptions == null ? void 0 : zoomOptions.force) && opts.disableZoom) {
        return result;
      }
      let minScale = options.minScale;
      let maxScale = options.maxScale;
      if (opts.contain) {
        const dims = getDimensions(elem);
        const elemWidth = dims.elem.width / scale;
        const elemHeight = dims.elem.height / scale;
        if (elemWidth > 1 && elemHeight > 1) {
          const parentWidth = dims.parent.width - dims.parent.border.left - dims.parent.border.right;
          const parentHeight = dims.parent.height - dims.parent.border.top - dims.parent.border.bottom;
          const elemScaledWidth = parentWidth / elemWidth;
          const elemScaledHeight = parentHeight / elemHeight;
          if (options.contain === "inside") {
            maxScale = Math.min(maxScale, elemScaledWidth, elemScaledHeight);
          } else if (options.contain === "outside") {
            minScale = Math.max(minScale, elemScaledWidth, elemScaledHeight);
          }
        }
      }
      result.scale = Math.min(Math.max(toScale, minScale), maxScale);
      return result;
    }
    function pan(toX, toY, panOptions, originalEvent) {
      const result = constrainXY(toX, toY, scale, panOptions);
      if (x !== result.x || y !== result.y) {
        x = result.x;
        y = result.y;
        return setTransformWithEvent("panzoompan", result.opts, originalEvent);
      }
      return { x, y, scale, isSVG, originalEvent };
    }
    function zoom(toScale, zoomOptions, originalEvent) {
      const result = constrainScale(toScale, zoomOptions);
      const opts = result.opts;
      if (!(zoomOptions == null ? void 0 : zoomOptions.force) && opts.disableZoom) {
        return;
      }
      toScale = result.scale;
      let toX = x;
      let toY = y;
      if (opts.focal) {
        const focal = opts.focal;
        toX = (focal.x / toScale - focal.x / scale + x * toScale) / toScale;
        toY = (focal.y / toScale - focal.y / scale + y * toScale) / toScale;
      }
      const panResult = constrainXY(toX, toY, toScale, { relative: false, force: true });
      x = panResult.x;
      y = panResult.y;
      scale = toScale;
      return setTransformWithEvent("panzoomzoom", opts, originalEvent);
    }
    function zoomInOut(isIn, zoomOptions) {
      const opts = { ...options, animate: true, ...zoomOptions };
      return zoom(scale * Math.exp((isIn ? 1 : -1) * opts.step), opts);
    }
    function zoomIn(zoomOptions) {
      return zoomInOut(true, zoomOptions);
    }
    function zoomOut(zoomOptions) {
      return zoomInOut(false, zoomOptions);
    }
    function zoomToPoint(toScale, point, zoomOptions, originalEvent) {
      const dims = getDimensions(elem);
      const effectiveArea = {
        width: dims.parent.width - dims.parent.padding.left - dims.parent.padding.right - dims.parent.border.left - dims.parent.border.right,
        height: dims.parent.height - dims.parent.padding.top - dims.parent.padding.bottom - dims.parent.border.top - dims.parent.border.bottom
      };
      let clientX = point.clientX - dims.parent.left - dims.parent.padding.left - dims.parent.border.left - dims.elem.margin.left;
      let clientY = point.clientY - dims.parent.top - dims.parent.padding.top - dims.parent.border.top - dims.elem.margin.top;
      if (!isSVG) {
        clientX -= dims.elem.width / scale / 2;
        clientY -= dims.elem.height / scale / 2;
      }
      const focal = {
        x: clientX / effectiveArea.width * (effectiveArea.width * toScale),
        y: clientY / effectiveArea.height * (effectiveArea.height * toScale)
      };
      return zoom(toScale, { ...zoomOptions, animate: false, focal }, originalEvent);
    }
    function zoomWithWheel(event, zoomOptions) {
      event.preventDefault();
      const opts = { ...options, ...zoomOptions, animate: false };
      const delta = event.deltaY === 0 && event.deltaX ? event.deltaX : event.deltaY;
      const wheel = delta < 0 ? 1 : -1;
      const toScale = constrainScale(scale * Math.exp(wheel * opts.step / 3), opts).scale;
      return zoomToPoint(toScale, event, opts, event);
    }
    function reset(resetOptions) {
      const opts = { ...options, animate: true, force: true, ...resetOptions };
      scale = constrainScale(opts.startScale, opts).scale;
      const panResult = constrainXY(opts.startX, opts.startY, scale, opts);
      x = panResult.x;
      y = panResult.y;
      return setTransformWithEvent("panzoomreset", opts);
    }
    let origX;
    let origY;
    let startClientX;
    let startClientY;
    let startScale;
    let startDistance;
    const pointers = [];
    function handleDown(event) {
      if (isExcluded(event.target, options)) {
        return;
      }
      addPointer(pointers, event);
      isPanning = true;
      options.handleStartEvent(event);
      origX = x;
      origY = y;
      trigger("panzoomstart", { x, y, scale, isSVG, originalEvent: event }, options);
      const point = getMiddle(pointers);
      startClientX = point.clientX;
      startClientY = point.clientY;
      startScale = scale;
      startDistance = getDistance(pointers);
    }
    function handleMove(event) {
      if (!isPanning || origX === void 0 || origY === void 0 || startClientX === void 0 || startClientY === void 0) {
        return;
      }
      addPointer(pointers, event);
      const current = getMiddle(pointers);
      const hasMultiple = pointers.length > 1;
      let toScale = scale;
      if (hasMultiple) {
        if (startDistance === 0) {
          startDistance = getDistance(pointers);
        }
        const diff = getDistance(pointers) - startDistance;
        toScale = constrainScale(diff * options.step / 80 + startScale).scale;
        zoomToPoint(toScale, current, { animate: false }, event);
      }
      if (!hasMultiple || options.pinchAndPan) {
        pan(origX + (current.clientX - startClientX) / toScale, origY + (current.clientY - startClientY) / toScale, { animate: false }, event);
      }
    }
    function handleUp(event) {
      if (pointers.length === 1) {
        trigger("panzoomend", { x, y, scale, isSVG, originalEvent: event }, options);
      }
      removePointer(pointers, event);
      if (!isPanning) {
        return;
      }
      isPanning = false;
      origX = origY = startClientX = startClientY = void 0;
    }
    let bound = false;
    function bind() {
      if (bound) {
        return;
      }
      bound = true;
      onPointer("down", options.canvas ? parent : elem, handleDown);
      onPointer("move", document, handleMove, { passive: true });
      onPointer("up", document, handleUp, { passive: true });
    }
    function destroy() {
      bound = false;
      destroyPointer("down", options.canvas ? parent : elem, handleDown);
      destroyPointer("move", document, handleMove);
      destroyPointer("up", document, handleUp);
    }
    if (!options.noBind) {
      bind();
    }
    return {
      bind,
      destroy,
      eventNames: events,
      getPan: () => ({ x, y }),
      getScale: () => scale,
      getOptions: () => shallowClone(options),
      handleDown,
      handleMove,
      handleUp,
      pan,
      reset,
      resetStyle,
      setOptions,
      setStyle: (name, value) => setStyle(elem, name, value),
      zoom,
      zoomIn,
      zoomOut,
      zoomToPoint,
      zoomWithWheel
    };
  }
  Panzoom.defaultOptions = defaultOptions;

  // src/scripts/functions/plan.js
  function plan() {
    const maps = document.querySelectorAll(".plan");
    if (!maps.length) return;
    maps.forEach(function(map) {
      new Plan(map);
    });
    document.addEventListener("click", function(event) {
      const quizPopupButton = event.target.closest("[data-quiz-popup]");
      const resetSelectionButton = event.target.closest('button[name="reset-selection"]');
      if (quizPopupButton) bookAnOffice(event, quizPopupButton.getAttribute("data-quiz-popup"));
      if (resetSelectionButton) resetSelection(event);
    });
  }
  function bookAnOffice(event, popupId) {
    const slide = event.target.closest("[data-slide]");
    if (!slide) return;
    const activeElems = slide.querySelectorAll("[data-country].active");
    if (!activeElems.length) return;
    let activeNumbers = "";
    activeElems.forEach(function(el, i) {
      if (i !== 0) activeNumbers += ",";
      activeNumbers += el.getAttribute("data-country");
    });
  }
  function resetSelection(event) {
    const slide = event.target.closest("[data-slide]");
    if (!slide) return;
    const activeElems = slide.querySelectorAll("[data-country].active");
    if (!activeElems.length) return;
    activeElems.forEach(function(el) {
      el.className.baseVal = "";
    });
  }
  var Plan = class {
    constructor(wrapper) {
      this.wrapper = wrapper;
      this.map = wrapper.querySelector("svg");
      if (!this.map) return;
      this.click = { x: 0, y: 0 };
      this.address = this.wrapper.getAttribute("data-address");
      this.floorNumber = this.wrapper.getAttribute("data-floor");
      this.countryName = 0;
      this.ui = this.createUI(this.wrapper);
      this.isAdmin = this.wrapper.hasAttribute("data-admin");
      this.setBookedRooms();
      this.panzoomInit();
    }
    panzoomInit() {
      const passive = {
        passive: true
      };
      this.panzoom = Panzoom(this.map, {
        step: 0.5,
        maxScale: 30,
        minScale: 0.9,
        startScale: 0.9,
        touchAction: ""
      });
      this.map.addEventListener("pointerdown", this.pointerdownHandler.bind(this), passive);
      this.map.addEventListener("pointerup", this.pointerupHandler.bind(this), passive);
      this.map.addEventListener("wheel", this.wheelHandler.bind(this));
      this.map.addEventListener("panzoomchange", this.onZoomChanged.bind(this), passive);
      this.ui.zoomIn.addEventListener("click", this.panzoom.zoomIn);
      this.ui.zoomOut.addEventListener("click", this.panzoom.zoomOut);
      this.ui.reset.addEventListener("click", this.panzoom.reset);
    }
    pointerdownHandler(event) {
      this.click = { x: event.clientX, y: event.clientY };
    }
    onZoomChanged(event) {
      this.wrapper.style.setProperty("--zoom", this.panzoom.getScale());
    }
    pointerupHandler(event) {
      if (event.button !== 0) return;
      if (this.click.x !== event.clientX && this.click.y !== event.clientY) return;
      this.country = event.target.closest("[data-country]");
      if (!this.country) return;
      const isOfficeBooked = this.country.className.baseVal.indexOf("booked") !== -1;
      if (isOfficeBooked) return;
      this.countryName = this.country.getAttribute("data-country");
      if (this.countryName) {
        this.wrapper.dispatchEvent(
          new CustomEvent("countrySelected", { bubbles: true, detail: this.countryName })
        );
        return true;
      }
      const isOfficeActive = this.country.className.baseVal.indexOf("active") !== -1;
      this.country.classList.toggle("active");
      if (!isOfficeActive) this.zoomToCountry(this.country);
      this.handleGallery(isOfficeActive);
      if (this.isAdmin && this.ui.admin)
        this.ui.admin.textContent = "| \u2116 \u043A\u043E\u043C\u043D\u0430\u0442\u044B: " + this.countryName;
    }
    wheelHandler(event) {
      if (!event.ctrlKey) return;
      this.panzoom.zoomWithWheel(event);
    }
    zoomToCountry(country) {
      const countryRect = country.getBoundingClientRect();
      const countryCenter = {
        x: countryRect.left + countryRect.width / 2,
        y: countryRect.top + countryRect.height / 2
      };
      const mapRect = this.wrapper.getBoundingClientRect();
      const mapCenter = {
        x: mapRect.left + mapRect.width / 2,
        y: mapRect.top + mapRect.height / 2
      };
      const panCenter = {
        x: (mapCenter.x - countryCenter.x) / this.panzoom.getScale(),
        y: (mapCenter.y - countryCenter.y) / this.panzoom.getScale()
      };
      this.panzoom.pan(panCenter.x, panCenter.y, {
        relative: true,
        animate: true
      });
      this.panzoom.zoom(1.2, { animate: true });
    }
    handleGallery(isActive) {
      if (!this.ui.gallery) return;
      Array.from(this.ui.gallery.children).forEach(function(image) {
        image.classList.remove("active");
      });
      const officeGallery = this.wrapper.querySelectorAll(
        "[data-gallery-office='" + this.countryName + "']"
      );
      if (isActive || officeGallery.length === 0) return this.ui.gallery.classList.remove("active");
      if (!officeGallery.length) return;
      if (!isActive) this.ui.gallery.classList.add("active");
      officeGallery.forEach(function(image) {
        image.classList.add("active");
      });
    }
    createUI() {
      const overlay = document.createElement("div");
      overlay.className = "plan__overlay";
      const controls = document.createElement("div");
      controls.className = "plan__controls";
      const gallery = this.wrapper.querySelector("[data-plan-gallery='" + this.floorNumber + "']");
      const isAdmin = this.wrapper.hasAttribute("data-admin");
      const iconsPath = this.wrapper.getAttribute("data-icons-path") || "";
      const zoomIn = document.createElement("button");
      zoomIn.type = "button";
      zoomIn.name = "plan-zoom-in";
      zoomIn.className = "plan__btn";
      zoomIn.ariaLabel = "\u041F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u044C";
      zoomIn.innerHTML = svg(iconsPath, "zoomin");
      controls.appendChild(zoomIn);
      const zoomOut = document.createElement("button");
      zoomOut.type = "button";
      zoomOut.name = "plan-zoom-out";
      zoomOut.className = "plan__btn";
      zoomOut.ariaLabel = "\u041E\u0442\u0434\u0430\u043B\u0438\u0442\u044C";
      zoomOut.innerHTML = svg(iconsPath, "zoomout");
      controls.appendChild(zoomOut);
      const reset = document.createElement("button");
      reset.type = "button";
      reset.name = "plan-reset";
      reset.className = "plan__btn";
      reset.ariaLabel = "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435";
      reset.innerHTML = svg(iconsPath, "reset");
      controls.appendChild(reset);
      if (this.address) {
        const address = document.createElement("span");
        address.className = "plan__info";
        address.textContent = this.address + ", ";
        overlay.appendChild(address);
      }
      if (this.floorNumber) {
        const floor = document.createElement("span");
        floor.className = "plan__info";
        floor.textContent = this.floorNumber + "-\u0439 \u044D\u0442\u0430\u0436";
        overlay.appendChild(floor);
      }
      if (isAdmin) {
        const admin2 = document.createElement("span");
        admin2.className = "plan__info";
        overlay.appendChild(admin2);
      }
      this.wrapper.insertAdjacentElement("afterbegin", controls);
      if (overlay.childElementCount) this.wrapper.insertAdjacentElement("afterbegin", overlay);
      return {
        zoomIn,
        zoomOut,
        reset,
        admin: isAdmin ? admin : null,
        gallery: gallery ? gallery : null
      };
      function svg(path, icon) {
        return '<svg width="20" height="20" aria-hidden="true"><use href="' + path + "controls.svg#" + icon + '" /></svg>';
      }
    }
    setBookedRooms() {
      const bookedString = this.wrapper.getAttribute("data-booked");
      if (!bookedString) return;
      const bookedArray = bookedString.replace(/\s+/g, "").split(",");
      let queryString = "";
      bookedArray.forEach(function(number, index) {
        if (index !== 0) queryString += ",";
        queryString += '[data-country="' + number + '"]';
      });
      const bookedRooms = this.wrapper.querySelectorAll(queryString);
      if (!bookedRooms.length) return;
      bookedRooms.forEach(function(room) {
        room.className.baseVal = "booked";
      });
    }
  };

  // src/scripts/functions/set-anchors-events.js
  function setAnchorsEvents() {
    const headerEl = document.querySelector(".header");
    document.documentElement.addEventListener("click", function(event) {
      const link = event.target.closest("a[href*='#'], button[data-target]");
      if (!link) return;
      event.preventDefault();
      scrollTo(link, headerEl);
    });
  }
  function scrollTo(elem, headerEl) {
    const link = elem.getAttribute("href") || elem.getAttribute("data-target");
    if (link === "#" || link === void 0) return;
    const linkTarget = document.getElementById(link.split("#")[1]);
    if (!linkTarget) return;
    const headerHeight = headerEl ? headerEl.offsetHeight : 100;
    const currentScrollTop = window.scrollY;
    const targetScrollTop = linkTarget.getBoundingClientRect().top + document.documentElement.scrollTop;
    let difference = currentScrollTop - targetScrollTop;
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
      draw: function(progress) {
        window.scrollTo(0, currentScrollTop - difference * progress);
      },
      timing: easeOutCubic,
      duration: 1e3
    });
    anchorAnimation.start();
  }

  // src/scripts/functions/my-gallery.js
  var myGallery = class {
    constructor() {
      this.init();
      document.addEventListener("click", this.eventsHandler.bind(this, "click"));
      document.addEventListener("keydown", this.eventsHandler.bind(this, "keydown"));
    }
    init() {
      this.galleryWrapper = document.createElement("div");
      this.galleryInner = document.createElement("div");
      this.closeButton = document.createElement("button");
      this.prevButton = document.createElement("button");
      this.nextButton = document.createElement("button");
      this.galleryClassActive = "my-gallery_active";
      this.galleryObjects = [];
      this.imageIndex = 0;
      this.minImageIndex = 0;
      this.maxImageIndex = 0;
      this.galleryWrapper.className = "my-gallery";
      this.galleryInner.className = "my-gallery__inner";
      this.closeButton.type = "button";
      this.closeButton.className = "my-gallery__close";
      this.closeButton.innerHTML = "<span class='_sr-only'>\u0417\u0430\u043A\u0440\u044B\u0442\u044C</span>";
      this.prevButton.type = "button";
      this.prevButton.className = "my-gallery__prev";
      this.prevButton.innerHTML = "<span class='_sr-only'>\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0435</span>";
      this.nextButton.type = "button";
      this.nextButton.className = "my-gallery__next";
      this.nextButton.innerHTML = "<span class='_sr-only'>\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435</span>";
      document.body.appendChild(this.galleryWrapper);
      this.galleryWrapper.appendChild(this.galleryInner);
      this.galleryInner.appendChild(this.closeButton);
      this.galleryInner.appendChild(this.prevButton);
      this.galleryInner.appendChild(this.nextButton);
      this.galleryImage = new Image();
      this.galleryWrapper.addEventListener("click", this.hideGalleryElement.bind(this));
      this.closeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hideGalleryElement();
      });
      this.prevButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.galleryPrev();
      });
      this.nextButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.galleryNext();
      });
      this.galleryImage.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      window.addEventListener("resize", this.setImageSize, {
        passive: true
      });
    }
    eventsHandler(eventType, event) {
      const button = event.target.closest("[data-gallery]");
      if (!button) return;
      if (eventType === "keydown" && event.key === "ArrowLeft") return this.galleryPrev();
      if (eventType === "keydown" && event.key === "ArrowRight") return this.galleryNext();
      if (eventType === "keydown" && event.key === "Escape") return this.hideGalleryElement();
      if (eventType === "keydown" && event.key !== " " && event.key !== "Enter" && event.key !== "Spacebar")
        return;
      event.preventDefault();
      const galleryName = button.getAttribute("data-gallery");
      if (galleryName === "") {
        this.galleryObjects.length = 0;
        this.galleryObjects.push(button);
      } else {
        this.galleryObjects = document.querySelectorAll('[data-gallery="'.concat(galleryName, '"]'));
        this.maxImageIndex = this.galleryObjects.length - 1;
      }
      this.imageIndex = Array.from(this.galleryObjects).findIndex(function(el) {
        return el === button;
      });
      const imageElement = button.querySelector("img");
      this.showGalleryElement(imageElement);
    }
    imageUrl(image) {
      return (image.getAttribute("src") || image.getAttribute("data-srcset") || image.getAttribute("data-src") || "images/placeholder.png").replace("/thumbs", "");
    }
    show() {
      this.galleryWrapper.classList.add(this.galleryClassActive);
    }
    hide() {
      this.galleryWrapper.classList.remove(this.galleryClassActive);
    }
    showGalleryElement(imageElement) {
      if (!imageElement) return;
      this.arrowsManage();
      this.galleryImage.onload = () => {
        this.imageRatio = this.galleryImage.naturalWidth / this.galleryImage.naturalHeight;
        setTimeout(() => this.setImageSize(), 50);
        this.galleryInner.appendChild(this.galleryImage);
        myPopupOverlay.show();
        this.show();
      };
      this.galleryImage.src = this.imageUrl(imageElement);
      this.galleryImage.alt = imageElement.alt;
    }
    hideGalleryElement() {
      this.hide();
      if (document.querySelectorAll(".popup_active").length) return;
      myPopupOverlay.hide();
    }
    galleryPrev() {
      const prevIndex = this.getIndex("prev");
      if (prevIndex === -1) return;
      const prevElement = this.galleryObjects[prevIndex];
      if (!prevElement) return;
      this.imageIndex = prevIndex;
      this.showGalleryElement(prevElement.querySelector("img"), prevIndex);
    }
    galleryNext() {
      const nextIndex = this.getIndex("next");
      if (nextIndex === -1) return;
      const nextElement = this.galleryObjects[nextIndex];
      if (!nextElement) return;
      this.imageIndex = nextIndex;
      this.showGalleryElement(nextElement.querySelector("img"), nextIndex);
    }
    arrowsManage() {
      if (this.imageIndex === this.minImageIndex) this.prevButton.classList.add("disabled");
      if (this.imageIndex !== this.minImageIndex) this.prevButton.classList.remove("disabled");
      if (this.imageIndex === this.maxImageIndex) this.nextButton.classList.add("disabled");
      if (this.imageIndex !== this.maxImageIndex) this.nextButton.classList.remove("disabled");
    }
    getIndex(direction) {
      if (!direction) return -1;
      if (direction === "prev") {
        if (this.imageIndex === this.minImageIndex) return -1;
        this.imageIndex -= 1;
      }
      if (direction === "next") {
        if (this.imageIndex === this.maxImageIndex) return -1;
        this.imageIndex += 1;
      }
      return this.imageIndex;
    }
    setImageSize() {
      if (!this.galleryImage) return;
      let windowRatio = window.innerWidth / window.innerHeight, gap = window.innerWidth < 576 ? 30 : 50, oneSideSize = 0;
      if (this.galleryImage.naturalWidth + gap < window.innerWidth && this.galleryImage.naturalHeight + gap < window.innerHeight) {
        this.galleryImage.style.width = "".concat(this.galleryImage.naturalWidth, "px");
        this.galleryImage.style.height = "".concat(this.galleryImage.naturalHeight, "px");
        return;
      }
      if (this.imageRatio > windowRatio) {
        oneSideSize = window.innerWidth - gap;
        this.galleryImage.style.width = "".concat(oneSideSize, "px");
        this.galleryImage.style.height = "".concat(oneSideSize / this.imageRatio, "px");
      } else {
        oneSideSize = window.innerHeight - gap;
        this.galleryImage.style.height = "".concat(oneSideSize, "px");
        this.galleryImage.style.width = "".concat(oneSideSize * this.imageRatio, "px");
      }
    }
  };

  // src/scripts/main.js
  onReady(ready);
  function ready() {
    toggleClassOnScroll("body", 120, "hide");
    toggleClassOnClick(".burger", ".h", "_menu-opened");
    myLazyLoad();
    myLazyLoadIframes();
    animateElement();
    scrollToTop(true);
    popupHandler();
    setAnchorsEvents();
    toggleElements();
    mapOverlay();
    videoAppending();
    catalogHandlers();
    ratingWidget();
    plan();
    new myGallery();
    const activeLabes = document.querySelectorAll("label[tabindex]");
    if (activeLabes.length) {
      activeLabes.forEach(
        (label) => label.addEventListener("keydown", (e) => {
          if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
            e.preventDefault();
            label.click();
          }
        })
      );
    }
    document.querySelectorAll(".filter__checkboxes-wrapper").forEach((elem) => {
      if (elem.children.length > 3) {
        const button = document.createElement("button");
        button.classList.add("filter__toggle-checkboxes");
        button.setAttribute("type", "button");
        button.setAttribute("name", "filter-toggle-checkboxes");
        button.textContent = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435";
        elem.parentElement.append(button);
      }
    });
    document.querySelectorAll(".catalog__list-wrapper").forEach((wrapper) => {
      const list = wrapper.querySelectorAll(".catalog__li");
      if (list.length > 8) {
        const button = document.createElement("button");
        button.classList.add("catalog__show-more");
        button.setAttribute("type", "button");
        button.setAttribute("name", "catalog-show-more");
        button.textContent = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435";
        wrapper.append(button);
        wrapper.classList.add("catalog__list-wrapper_minified");
      }
    });
    document.documentElement.addEventListener("click", function(event) {
      if (event.target.closest(".h__navigation, .burger")) return;
      const headerElement = document.querySelector(".h");
      if (headerElement) headerElement.classList.remove("_menu-opened");
    });
    document.documentElement.addEventListener("click", function(event) {
      if (event.target.closest(".sort, .category__filter")) return;
      const filterElement = document.querySelector(".category__filter");
      if (filterElement) filterElement.classList.remove("_opened");
    });
    document.documentElement.addEventListener("click", function(event) {
      const button = event.target.closest(".catalog__show-more");
      if (!button) return;
      if (button.textContent === "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435") {
        button.textContent = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435";
        return true;
      }
      button.textContent = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435";
    });
    const searchFormMobile = document.querySelector(".h__mobile .search-form");
    if (searchFormMobile) {
      const searchFormInput = searchFormMobile.querySelector("[name=header-search]");
      const searchFormClose = searchFormMobile.querySelector("[name=header-search-button-close]");
      const searchFormSubmit = searchFormMobile.querySelector("[name=header-search-button]");
      if (searchFormSubmit && searchFormInput) {
        searchFormSubmit.addEventListener("click", function(event) {
          if (isMobileResolution() && !searchFormInput.value) {
            event.preventDefault();
            searchFormMobile.classList.add("_opened");
          }
        });
        searchFormClose.addEventListener("click", function() {
          searchFormMobile.classList.remove("_opened");
        });
      }
    }
    anchorHighlight(".tabs a[href*='#']");
    toggleClassOnClick("[name=filter-toggle]", ".category__filter", "_opened");
    toggleClassOnClick(".filter__toggle-item", "closest:.filter__body-item", "active");
    toggleClassOnClick(".filter__toggle-checkboxes", "previous", "active");
    toggleClassOnClick(
      "[name=catalog-show-more]",
      "previous",
      "catalog__list-inner_expanded"
    );
    if (document.querySelector(".tariffs"))
      document.addEventListener("click", function(event) {
        const button = event.target.closest("[data-toggle-tariff]");
        if (!button) return;
        const table = button.closest("table");
        if (!table) return;
        table.setAttribute("data-column", button.getAttribute("data-toggle-tariff"));
      });
  }
})();
//# sourceMappingURL=main.js.map
