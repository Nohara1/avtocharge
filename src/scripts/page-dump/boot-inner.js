/**
 * Выполняется после window.jQuery (см. entry.js). Статические импорты нельзя
 * держать в entry.js выше присваивания — esbuild поднимает их выше тела модуля.
 */

import "./vendor/jquery-migrate-1.4.1.min.js";
import "./vendor/jquery.custom-select.js";
import "./vendor/fancybox-5.0.umd.js";

import "./site-index.js";
import "./plugin.cart-prerview.js";
import "./plugin.tooltips.js";
import "./plugin.accordion.js";
import "./plugin.modals.js";
import "./plugin.input-limit.js";
import "./plugin.input-file.js";
import "./plugin.input-select.js";
import "./plugin.input-autocomplete.js";
import "./plugin.product-hover-gallery.js";
import "./plugin.sticky-reset-button.js";
import "./plugin.filter-sort-popup.js";
import "./plugin.comparison.js";

import "./arigami.widget.js";

const F = typeof window !== "undefined" ? window.Fancybox : undefined;

if (F) {
  if (document.querySelector("[data-fancybox]")) {
    F.bind("[data-fancybox]", {});
  }
  if (document.querySelector('[data-fancybox="gallery"]')) {
    F.bind('[data-fancybox="gallery"]', {});
  }
  if (document.querySelector(".portfolio-fl-pg .text img:not([class])")) {
    F.bind(".portfolio-fl-pg .text img:not([class])", {});
  }
}
