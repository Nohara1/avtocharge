/**
 * Тема page-dump: сначала глобальный jQuery (migrate читает jQuery до своего IIFE).
 */

import $ from "jquery";

window.jQuery = window.$ = $;

void import("./boot-inner.js");
