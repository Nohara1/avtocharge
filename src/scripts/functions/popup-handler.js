import { myPopupOverlay } from "./popup-overlay";

export function popupHandler() {
  const allPopopups = document.querySelectorAll(".popup");
  const popupCloseButtons = document.querySelectorAll(".popup__close");

  popupCloseButtons.forEach((elem) => {
    elem.addEventListener("click", () => {
      myPopupOverlay.hide();
      closePopups(allPopopups);
    });
  });

  // myPopupOverlay.element.addEventListener("click", () => {
  //   myPopupOverlay.hide();
  //   closePopups(allPopopups);
  // });

  // document.documentElement.addEventListener("click", function (event) {
  //   const button = event.target.closest(`.${myPopupOverlay.name}`);
  //   console.log(button, event.target);
  //   if (!button) return;

  //   myPopupOverlay.hide();
  //   closePopups(allPopopups);
  // });

  window.addEventListener("load", () => autoOpenPopup(allPopopups));

  document.documentElement.addEventListener("click", function (event) {
    const button = event.target.closest("[data-open-popup]");

    if (!button) return;

    closePopups(allPopopups);
    if (openPopup(button.getAttribute("data-open-popup"), button.getAttribute("data-set-title"))) {
      button.classList.add("_popup-opened");
    }
  });

  document.documentElement.addEventListener("click", function (event) {
    const pClass = event.target.getAttribute("class");
    if (!pClass) return;
    const popup = pClass.indexOf("popup_active") > -1;

    if (!popup) return;

    closeAllPopups();
  });
}

export function closeAllPopups() {
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
    const delayValue = delay ? +delay * 1000 : 5000;
    const buttons = popup.querySelectorAll("[name='popup-close'], [name='submit']");
    const popupStorage = localStorage.getItem(`popup_${popup.id}`);

    if (interval !== null) {
      buttons.forEach((button) =>
        button.addEventListener("click", () => saveExpiration(popup, interval))
      );
    }

    if (
      interval === null ||
      (interval === "0" && popupStorage === null) ||
      (+interval > 0 && isExpired(popupStorage))
    ) {
      setTimeout(() => openPopup(popup.id), delayValue);
    }

    if (isExpired(popupStorage) && interval !== "0") {
      removeExpiration(popup);
    }
  });

  function saveExpiration(popup, interval) {
    const expiry = new Date().getTime() + interval * 3600000;
    localStorage.setItem(`popup_${popup.id}`, expiry);
  }

  function removeExpiration(popup) {
    localStorage.removeItem(`popup_${popup.id}`);
  }

  function isExpired(expiration) {
    if (new Date().getTime() < expiration) return false;
    return true;
  }

  function timeRangeCheck(popup) {
    const value = popup.getAttribute("data-autoopen-time"); // on html - data-autoopen-time="10,20"

    if (!value) return false;

    const range = value.split(",");

    if (range.length !== 2) return false;

    const hoursNow = new Date().getHours();

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
    console.log(`There is no pop-up with current ID ("${buttonTarget}") or ID is wrong.`);
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
  popups.forEach(function (elem) {
    elem.classList.remove("popup_active");
  });

  const activeButtons = document.querySelectorAll("._popup-opened");
  activeButtons.forEach(function (btn) {
    btn.classList.remove("_popup-opened");
  });
}

function popupTitleChange(title, popup) {
  if (!title) return;
  const targetInput = popup.querySelector("input[data-set-title]");
  const popupHeading = popup.querySelector(".popup__heading");
  if (!targetInput && !popupHeading) return;

  // targetInput.value = title;
  targetInput.setAttribute("value", title);
  popupHeading.textContent = title;
}
