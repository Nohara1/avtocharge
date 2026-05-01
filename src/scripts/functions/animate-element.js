import { Animation, linear } from "./animate";

export function animateElement() {

  const elements = document.querySelectorAll("[data-animate]");
  let elementsBelow = [];

  if (!elements.length) return;

  const iOptions = {
    // root: document.querySelector( '#viewport' ),
    rootMargin: "0px",
    threshold: 0.5,
  };

  elements.forEach((element) => {
    elementsBelow.push(element);
    // if (
    //   isElementInViewportOrHigher(element) &&
    //   element.getAttribute("data-animate") === "appearing"
    // ) {
    //   element.removeAttribute("data-animate");
    // } else {
    //   elementsBelow.push(element);
    // }
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
    entries.forEach(function (element) {
      if (element.isIntersecting) {
        manageAnimations(element.target);
        observer.unobserve(element.target);
      }
      return;
    });
  }

  // function isElementInViewportOrHigher(element) {
  //   const rect = element.getBoundingClientRect();

  //   return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  // }

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
    const text = element.textContent.replace(/(\s*((\r?\n){2,})\s*|\s*((\r?\n){1,2})\s*)/g, "$2$4"),
      textLength = text.length;

    let currentIndex = 0,
      prevIndex = 0;

    element.style.height = `${element.offsetHeight}px`;
    element.textContent = "";
    element.classList.add("_animate");

    let anim = new Animation({
      draw: function (p) {
        currentIndex = Math.round(p * textLength);

        if (currentIndex === prevIndex) return;

        prevIndex = currentIndex;
        element.textContent = text.slice(0, currentIndex);
      },
      timing: linear,
      duration: textLength * 60,
      onEnd: function () {
        element.removeAttribute("style");
      },
    });

    anim.start();
    anim.stop.bind(anim);
  }

  function counting(element) {
    const hasWhitespaces = element.textContent.indexOf(" ") > -1;
    const number = parseInt(element.textContent.replace(/\s/g, ""));
    const duration = element.getAttribute("data-animate-duration") || 3000;
    let currentNumber = 0,
      prevNumber = 0;

    const anim = new Animation({
      draw: function (p) {
        if (p === undefined) return;

        currentNumber = Math.round(p * number);

        if (currentNumber === prevNumber) return;

        prevNumber = currentNumber;
        element.textContent = hasWhitespaces
          ? currentNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          : currentNumber;
      },
      timing: linear,
      duration: duration,
    });

    anim.start();
    anim.stop.bind(anim);
  }

  function appearing(element) {
    const delay = element.getAttribute("data-animate-delay") || 0;

    let anim = new Animation({
      onEnd: function () {
        element.classList.add("_animate");
      },
      timing: linear,
      duration: delay,
    });

    anim.start();
    anim.stop.bind(anim);
  }

  function adding(element) {
    const delay = element.getAttribute("data-animate-delay") || 0;

    let anim = new Animation({
      onEnd: function () {
        element.classList.add("_animate");
      },
      timing: linear,
      duration: delay,
    });

    anim.start();
    anim.stop.bind(anim);
  }
}
