import { onReady } from "./functions/helpers";

onReady(ready);

function ready() {
  tippy("[data-tippy-content]", {
    // content: (reference) => reference.getAttribute("data-tooltip"),
    // placement: "auto-start",
    // trigger: "click",
    arrow: false,
    zIndex: 120,
    onShow(instance) {
      instance.reference.classList.add("active");
    },
    onHide(instance) {
      instance.reference.classList.remove("active");
    },
  });
  tippy("[data-country].active", {
    content: (reference) => reference.getAttribute("data-country"),
    arrow: false,
    zIndex: 120,
  });
}

import tippy from "tippy.js";
