export function anchorHighlight(selector) {
  const anchorElements = document.querySelectorAll(selector);

  let anchors = {};
  const prevEntry = {
    el: null,
    height: 0,
  };

  anchorElements.forEach(function (anchor) {
    const link = anchor.getAttribute("href") || anchor.getAttribute("data-target");
    const targetId = link.split("#")[1];
    if (targetId) {
      anchors[targetId] = {
        link: anchor,
        target: document.getElementById(targetId),
      };
    }
  });

  if (!Object.getOwnPropertyNames(anchors).length) return;

  const options = {
    root: null,
    rootMargin: "33.33% 0px -33.33% 0px",
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(onIntersect.bind(this, anchors), options);

    for (key in anchors) {
      observer.observe(anchors[key].target);
    }
  }

  function onIntersect(anchors, entries, observer) {
    const intersectedEntries = entries.filter((entry) => entry.isIntersecting);

    if (!intersectedEntries.length) return;

    const currentEntry = intersectedEntries.reduce((a, b) =>
      a.intersectionRect.height > b.intersectionRect.height ? a : b
    );

    if (prevEntry.el === currentEntry || currentEntry.intersectionRect.height < prevEntry.height)
      return;

    if (prevEntry.el !== null) anchors[prevEntry.el.target.id].link.classList.remove("active");

    anchors[currentEntry.target.id].link.classList.add("active");
    prevEntry.el = currentEntry;
    prevEntry.height = currentEntry.intersectionRect.height;

    // entries.forEach((entry) => {
    //   intersectionArray.push({
    //     link: anchors[entry.target.id].link,
    //     height: entry.intersectionRect.height,
    //   });

    //   if (entry.isIntersecting && entry.intersectionRect.height > maxHeight.value) {
    //     currentLink.classList.add("active");

    //     if (maxRatio.id !== entry.target.id) {
    //       maxRatio.id = entry.target.id;
    //       maxRatio.value = entry.intersectionRect.height;
    //     }
    //   } else {
    //     currentLink.classList.remove("active");
    //   }
    // });
  }
}
