export function imageSwitcher() {
  const containers = document.querySelectorAll(".is-container");

  if (!containers.length) return;

  containers.forEach(function (container) {
    let index = 0,
      oldIndex = 0,
      isMoved = false,
      fingerPos = 0;
    const image = container.querySelector("img");
    const is = container.querySelector(".is");
    const slices = container.querySelectorAll(".is__slice");
    const maxIndex = slices.length - 1;

    const eventOptions = { passive: true };

    if (!slices.length) return;
    createPagination(is, slices.length);

    const paginationItems = container.querySelectorAll(".is__p-item");

    container.addEventListener(
      "touchstart",
      function (event) {
        fingerPos = event.changedTouches[0].clientX;
      },
      eventOptions
    );
    container.addEventListener(
      "touchmove",
      function () {
        if (!isMoved) isMoved = true;
      },
      eventOptions
    );
    container.addEventListener(
      "touchend",
      function (event) {
        if (!isMoved) return;

        const direction = fingerPos > event.changedTouches[0].clientX; // true - to left

        index = nextIndex(direction, oldIndex, maxIndex);

        imageSwap(image, slices[index].getAttribute("data-src"), container);

        oldIndex = sliceToggle(slices, paginationItems, index, oldIndex);

        isMoved = false;
      },
      eventOptions
    );
    container.addEventListener(
      "mouseleave",
      function () {
        imageSwap(image, slices[0].getAttribute("data-src"), container);
        oldIndex = sliceToggle(slices, paginationItems, 0, oldIndex);
      },
      eventOptions
    );

    slices.forEach(function (slice) {
      slice.addEventListener(
        "mouseenter",
        function () {
          index = Array.prototype.indexOf.call(slice.parentNode.children, slice);

          if (index === oldIndex) return;

          imageSwap(image, slice.getAttribute("data-src"), container);

          oldIndex = sliceToggle(slices, paginationItems, index, oldIndex);
        },
        eventOptions
      );
    });
  });

  function sliceToggle(slices, pItems, index, oldIndex) {
    slices[oldIndex].classList.remove("active");
    slices[index].classList.add("active");

    if (!pItems[oldIndex] && !pItems[index]) return index;

    pItems[oldIndex].classList.remove("active");
    pItems[index].classList.add("active");

    return index;
  }

  function imageSwap(image, imageSrc, container) {
    if (!imageSrc) return;

    image.setAttribute("src", imageSrc);
    image.setAttribute("srcset", imageSrc);
    container.classList.add("_loading");

    image.addEventListener("load", completed);

    function completed() {
      image.removeEventListener("load", completed);
      container.classList.remove("_loading");
    }
  }

  function nextIndex(direction, oldIndex, maxIndex) {
    const indexPlus = oldIndex + 1,
      indexMinus = oldIndex - 1;

    if (direction && indexPlus <= maxIndex) return indexPlus;
    if (!direction && indexMinus >= 0) return indexMinus;
    if (direction && indexPlus > maxIndex) return 0;
    return maxIndex;
  }

  function createPagination(container, numberOfSlides) {
    let points = '<span class="is__pagination">';

    for (let index = 0; index < numberOfSlides; index++) {
      if (index === 0) {
        points += '<span class="is__p-item active"></span>';
        continue;
      }

      points += '<span class="is__p-item"></span>';
    }

    points += "</span>";

    container.insertAdjacentHTML("beforeend", points);
  }
}
