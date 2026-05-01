myFunctions.onReady(ready);

function ready() {
  myFunctions.toggleClassOnScroll("body", 120, "hide"); // class should be toggled on elements after height value
  myFunctions.toggleClassOnClick(".burger", ".h", "_menu-opened");
  myFunctions.myLazyLoad();
  myFunctions.myLazyLoadIframes();
  myFunctions.animateElement();
  myFunctions.scrollToTop(true);
  myFunctions.popupHandler();
  myFunctions.setAnchorsEvents();
  // myFunctions.validateStep();
  myFunctions.toggleElements();
  myFunctions.mapOverlay();
  // myFunctions.cookies();
  // myFunctions.counterGroup();
  myFunctions.videoAppending();
  myFunctions.catalogHandlers();
  myFunctions.ratingWidget();
  myFunctions.plan();
  // myFunctions.quiz();
  // myFunctions.validateFiles();
  // myFunctions.fileDragAndDrop();
  // myFunctions.calculator();
  // myFunctions.citeSwitcher();
  // myFunctions.imageSwitcher();

  new myFunctions.myGallery();

  // interaction on label //

  const activeLabes = document.querySelectorAll("label[tabindex]");
  if (activeLabes.length) {
    activeLabes.forEach((label) =>
      label.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
          e.preventDefault();
          label.click();
        }
      })
    );
  }

  // category filter button adding

  document.querySelectorAll(".filter__checkboxes-wrapper").forEach((elem) => {
    if (elem.children.length > 3) {
      const button = document.createElement("button");
      button.classList.add("filter__toggle-checkboxes");
      button.setAttribute("type", "button");
      button.setAttribute("name", "filter-toggle-checkboxes");
      button.textContent = "Показать все";
      elem.parentElement.append(button);
    }
  });

  // header catalog show-more button adding

  document.querySelectorAll(".catalog__list-wrapper").forEach((wrapper) => {
    const list = wrapper.querySelectorAll(".catalog__li");
    if (list.length > 8) {
      const button = document.createElement("button");
      button.classList.add("catalog__show-more");
      button.setAttribute("type", "button");
      button.setAttribute("name", "catalog-show-more");
      button.textContent = "Показать все";
      wrapper.append(button);
      wrapper.classList.add("catalog__list-wrapper_minified");
    }
  });

  document.documentElement.addEventListener("click", function (event) {
    if (event.target.closest(".h__navigation, .burger")) return;

    const headerElement = document.querySelector(".h");

    if (headerElement) headerElement.classList.remove("_menu-opened");
  });

  document.documentElement.addEventListener("click", function (event) {
    if (event.target.closest(".sort, .category__filter")) return;

    const filterElement = document.querySelector(".category__filter");

    if (filterElement) filterElement.classList.remove("_opened");
  });

  document.documentElement.addEventListener("click", function (event) {
    const button = event.target.closest(".catalog__show-more");

    if (!button) return;

    if (button.textContent === "Показать все") {
      button.textContent = "Показать меньше";
      return true;
    }
    button.textContent = "Показать все";
  });

  const searchFormMobile = document.querySelector(".h__mobile .search-form");

  if (searchFormMobile) {
    const searchFormInput = searchFormMobile.querySelector("[name=header-search]");
    const searchFormClose = searchFormMobile.querySelector("[name=header-search-button-close]");
    const searchFormSubmit = searchFormMobile.querySelector("[name=header-search-button]");

    if (searchFormSubmit && searchFormInput) {
      searchFormSubmit.addEventListener("click", function (event) {
        if (myFunctions.isMobileResolution() && !searchFormInput.value) {
          event.preventDefault();
          searchFormMobile.classList.add("_opened");
        }
      });
      searchFormClose.addEventListener("click", function () {
        searchFormMobile.classList.remove("_opened");
      });
    }
  }

  // myFunctions.anchorHighlight(".tabs_anchor .tabs__tab");
  myFunctions.anchorHighlight(".tabs a[href*='#']");

  myFunctions.toggleClassOnClick("[name=filter-toggle]", ".category__filter", "_opened");
  myFunctions.toggleClassOnClick(".filter__toggle-item", "closest:.filter__body-item", "active");
  myFunctions.toggleClassOnClick(".filter__toggle-checkboxes", "previous", "active");
  myFunctions.toggleClassOnClick(
    "[name=catalog-show-more]",
    "previous",
    "catalog__list-inner_expanded"
  );

  if (document.querySelector(".tariffs"))
    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-toggle-tariff]");
      if (!button) return;
      const table = button.closest("table");
      if (!table) return;
      table.setAttribute("data-column", button.getAttribute("data-toggle-tariff"));
    });
}

import * as myFunctions from "./functions/index.js";
// import "img-comparison-slider";
