import { myPopupOverlay } from "./popup-overlay";

export class myGallery {
  constructor() {
    // init
    this.init();

    // global events
    document.addEventListener("click", this.eventsHandler.bind(this, "click"));
    document.addEventListener("keydown", this.eventsHandler.bind(this, "keydown"));
  }

  init() {
    // console.log("init");
    this.galleryWrapper = document.createElement("div");
    this.galleryInner = document.createElement("div");
    this.closeButton = document.createElement("button");
    this.prevButton = document.createElement("button");
    this.nextButton = document.createElement("button");
    this.galleryClassActive = "my-gallery_active";
    this.galleryObjects = [];
    this.imageIndex = 0;
    this.minImageIndex = 0;
    this.maxImageIndex = 0;

    this.galleryWrapper.className = "my-gallery";
    this.galleryInner.className = "my-gallery__inner";
    this.closeButton.type = "button";
    this.closeButton.className = "my-gallery__close";
    this.closeButton.innerHTML = "<span class='_sr-only'>Закрыть</span>";
    this.prevButton.type = "button";
    this.prevButton.className = "my-gallery__prev";
    this.prevButton.innerHTML = "<span class='_sr-only'>Предыдущее</span>";
    this.nextButton.type = "button";
    this.nextButton.className = "my-gallery__next";
    this.nextButton.innerHTML = "<span class='_sr-only'>Следующее</span>";

    document.body.appendChild(this.galleryWrapper);
    this.galleryWrapper.appendChild(this.galleryInner);
    this.galleryInner.appendChild(this.closeButton);
    this.galleryInner.appendChild(this.prevButton);
    this.galleryInner.appendChild(this.nextButton);
    this.galleryImage = new Image();

    this.galleryWrapper.addEventListener("click", this.hideGalleryElement.bind(this));
    this.closeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideGalleryElement();
    });
    this.prevButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.galleryPrev();
    });
    this.nextButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.galleryNext();
    });
    this.galleryImage.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    window.addEventListener("resize", this.setImageSize, {
      passive: true,
    });
  }

  eventsHandler(eventType, event) {
    const button = event.target.closest("[data-gallery]");
    if (!button) return;

    if (eventType === "keydown" && event.key === "ArrowLeft") return this.galleryPrev();
    if (eventType === "keydown" && event.key === "ArrowRight") return this.galleryNext();
    if (eventType === "keydown" && event.key === "Escape") return this.hideGalleryElement();

    if (
      eventType === "keydown" &&
      event.key !== " " &&
      event.key !== "Enter" &&
      event.key !== "Spacebar"
    )
      return;
    event.preventDefault();

    const galleryName = button.getAttribute("data-gallery");

    if (galleryName === "") {
      this.galleryObjects.length = 0;
      this.galleryObjects.push(button);
    } else {
      this.galleryObjects = document.querySelectorAll(`[data-gallery="${galleryName}"]`);
      this.maxImageIndex = this.galleryObjects.length - 1;
    }

    this.imageIndex = Array.from(this.galleryObjects).findIndex(function (el) {
      return el === button;
    });

    const imageElement = button.querySelector("img");
    this.showGalleryElement(imageElement);
  }

  imageUrl(image) {
    return (
      image.getAttribute("src") ||
      image.getAttribute("data-srcset") ||
      image.getAttribute("data-src") ||
      "images/placeholder.png"
    ).replace("/thumbs", "");
  }

  show() {
    // myPopupOverlay.element.style.zIndex = "1055";
    this.galleryWrapper.classList.add(this.galleryClassActive);
  }
  hide() {
    // myPopupOverlay.element.style = "";
    this.galleryWrapper.classList.remove(this.galleryClassActive);
  }

  showGalleryElement(imageElement) {
    if (!imageElement) return;
    this.arrowsManage();

    this.galleryImage.onload = () => {
      this.imageRatio = this.galleryImage.naturalWidth / this.galleryImage.naturalHeight;

      setTimeout(() => this.setImageSize(), 50);

      this.galleryInner.appendChild(this.galleryImage);

      myPopupOverlay.show();
      this.show();
    };
    this.galleryImage.src = this.imageUrl(imageElement);
    this.galleryImage.alt = imageElement.alt;
  }

  hideGalleryElement() {
    this.hide();
    if (document.querySelectorAll(".popup_active").length) return;
    myPopupOverlay.hide();
  }

  galleryPrev() {
    const prevIndex = this.getIndex("prev");
    if (prevIndex === -1) return;
    const prevElement = this.galleryObjects[prevIndex];
    if (!prevElement) return;
    this.imageIndex = prevIndex;
    this.showGalleryElement(prevElement.querySelector("img"), prevIndex);
  }
  galleryNext() {
    const nextIndex = this.getIndex("next");
    if (nextIndex === -1) return;
    const nextElement = this.galleryObjects[nextIndex];
    if (!nextElement) return;
    this.imageIndex = nextIndex;
    this.showGalleryElement(nextElement.querySelector("img"), nextIndex);
  }

  arrowsManage() {
    if (this.imageIndex === this.minImageIndex) this.prevButton.classList.add("disabled");
    if (this.imageIndex !== this.minImageIndex) this.prevButton.classList.remove("disabled");
    if (this.imageIndex === this.maxImageIndex) this.nextButton.classList.add("disabled");
    if (this.imageIndex !== this.maxImageIndex) this.nextButton.classList.remove("disabled");
  }

  getIndex(direction) {
    // console.log(direction);
    if (!direction) return -1;
    if (direction === "prev") {
      if (this.imageIndex === this.minImageIndex) return -1;
      this.imageIndex -= 1;
    }
    if (direction === "next") {
      if (this.imageIndex === this.maxImageIndex) return -1;
      this.imageIndex += 1;
    }
    return this.imageIndex;
  }

  setImageSize() {
    if (!this.galleryImage) return;
    let windowRatio = window.innerWidth / window.innerHeight,
      gap = window.innerWidth < 576 ? 30 : 50,
      oneSideSize = 0;

    if (
      this.galleryImage.naturalWidth + gap < window.innerWidth &&
      this.galleryImage.naturalHeight + gap < window.innerHeight
    ) {
      this.galleryImage.style.width = `${this.galleryImage.naturalWidth}px`;
      this.galleryImage.style.height = `${this.galleryImage.naturalHeight}px`;
      return;
    }

    if (this.imageRatio > windowRatio) {
      oneSideSize = window.innerWidth - gap;
      this.galleryImage.style.width = `${oneSideSize}px`;
      this.galleryImage.style.height = `${oneSideSize / this.imageRatio}px`;
    } else {
      oneSideSize = window.innerHeight - gap;
      this.galleryImage.style.height = `${oneSideSize}px`;
      this.galleryImage.style.width = `${oneSideSize * this.imageRatio}px`;
    }
  }
}
