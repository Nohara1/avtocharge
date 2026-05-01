import { onReady } from "./functions/helpers";

onReady(ready);

function ready() {
  document.querySelectorAll("input[type='tel']").forEach(function (elem) {
    // eslint-disable-next-line no-undef
    Inputmask("+375 (99) 999-9999").mask(elem);
    // eslint-disable-next-line no-undef
    // Inputmask("+7 (999) 999-99-99").mask(elem);
  });
}

import "inputmask";
