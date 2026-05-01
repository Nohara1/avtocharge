export function plan() {
  const maps = document.querySelectorAll(".plan");
  if (!maps.length) return;

  maps.forEach(function (map) {
    new Plan(map);
  });

  document.addEventListener("click", function (event) {
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
  activeElems.forEach(function (el, i) {
    if (i !== 0) activeNumbers += ",";
    activeNumbers += el.getAttribute("data-country");
  });
}

function resetSelection(event) {
  const slide = event.target.closest("[data-slide]");
  if (!slide) return;

  const activeElems = slide.querySelectorAll("[data-country].active");
  if (!activeElems.length) return;

  activeElems.forEach(function (el) {
    el.className.baseVal = "";
  });
}

class Plan {
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
      passive: true,
    };

    this.panzoom = Panzoom(this.map, {
      step: 0.5,
      maxScale: 30,
      minScale: 0.9,
      startScale: 0.9,
      touchAction: "",
    });

    this.map.addEventListener("pointerdown", this.pointerdownHandler.bind(this), passive);
    this.map.addEventListener("pointerup", this.pointerupHandler.bind(this), passive);
    this.map.addEventListener("wheel", this.wheelHandler.bind(this));
    this.map.addEventListener('panzoomchange', this.onZoomChanged.bind(this), passive);

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
      this.ui.admin.textContent = "| № комнаты: " + this.countryName;
  }
  wheelHandler(event) {
    if (!event.ctrlKey) return;
    this.panzoom.zoomWithWheel(event);
  }
  zoomToCountry(country) {
    const countryRect = country.getBoundingClientRect();
    const countryCenter = {
      x: countryRect.left + countryRect.width / 2,
      y: countryRect.top + countryRect.height / 2,
    };

    const mapRect = this.wrapper.getBoundingClientRect();
    const mapCenter = {
      x: mapRect.left + mapRect.width / 2,
      y: mapRect.top + mapRect.height / 2,
    };

    const panCenter = {
      x: (mapCenter.x - countryCenter.x) / this.panzoom.getScale(),
      y: (mapCenter.y - countryCenter.y) / this.panzoom.getScale(),
    };

    this.panzoom.pan(panCenter.x, panCenter.y, {
      relative: true,
      animate: true,
    });
    this.panzoom.zoom(1.2, { animate: true });
  }
  handleGallery(isActive) {
    if (!this.ui.gallery) return;

    Array.from(this.ui.gallery.children).forEach(function (image) {
      image.classList.remove("active");
    });

    const officeGallery = this.wrapper.querySelectorAll(
      "[data-gallery-office='" + this.countryName + "']"
    );

    if (isActive || officeGallery.length === 0) return this.ui.gallery.classList.remove("active");
    if (!officeGallery.length) return;

    if (!isActive) this.ui.gallery.classList.add("active");

    officeGallery.forEach(function (image) {
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
    zoomIn.ariaLabel = "Приблизить";
    zoomIn.innerHTML = svg(iconsPath, "zoomin");
    controls.appendChild(zoomIn);

    const zoomOut = document.createElement("button");
    zoomOut.type = "button";
    zoomOut.name = "plan-zoom-out";
    zoomOut.className = "plan__btn";
    zoomOut.ariaLabel = "Отдалить";
    zoomOut.innerHTML = svg(iconsPath, "zoomout");
    controls.appendChild(zoomOut);

    const reset = document.createElement("button");
    reset.type = "button";
    reset.name = "plan-reset";
    reset.className = "plan__btn";
    reset.ariaLabel = "Сбросить положение";
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
      floor.textContent = this.floorNumber + "-й этаж";
      overlay.appendChild(floor);
    }

    if (isAdmin) {
      const admin = document.createElement("span");
      admin.className = "plan__info";
      overlay.appendChild(admin);
    }

    this.wrapper.insertAdjacentElement("afterbegin", controls);

    if (overlay.childElementCount) this.wrapper.insertAdjacentElement("afterbegin", overlay);

    return {
      zoomIn: zoomIn,
      zoomOut: zoomOut,
      reset: reset,
      admin: isAdmin ? admin : null,
      gallery: gallery ? gallery : null,
    };

    function svg(path, icon) {
      return (
        '<svg width="20" height="20" aria-hidden="true"><use href="' +
        path +
        "controls.svg#" +
        icon +
        '" /></svg>'
      );
    }
  }
  setBookedRooms() {
    const bookedString = this.wrapper.getAttribute("data-booked");
    if (!bookedString) return;

    const bookedArray = bookedString.replace(/\s+/g, "").split(",");

    let queryString = "";
    bookedArray.forEach(function (number, index) {
      if (index !== 0) queryString += ",";
      queryString += '[data-country="' + number + '"]';
    });

    const bookedRooms = this.wrapper.querySelectorAll(queryString);
    if (!bookedRooms.length) return;

    bookedRooms.forEach(function (room) {
      room.className.baseVal = "booked";
    });
  }
}

import Panzoom from "@panzoom/panzoom";
