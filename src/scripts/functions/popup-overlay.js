class popupOverlay {
  constructor() {
    this.initialized = false;
    if (!document.body) return;
    this.init();
  }
  init() {
    if (this.initialized) return;
    this.name = "popup-overlay";
    this.element = document.createElement("div");
    this.element.classList.add(this.name);
    document.body.appendChild(this.element);
    this.elementClassActive = `${this.name}_active`;
    this.initialized = true;
  }
  show() {
    if (!this.initialized) this.init();
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    this.element.classList.add(this.elementClassActive);
    document.body.style = `overflow: hidden; margin-right: ${scrollWidth}px`;
    document.querySelector("header").style = `padding-right: ${scrollWidth}px`;
  }
  hide() {
    this.element.classList.remove(this.elementClassActive);
    setTimeout(() => {
      document.body.style = "";
      document.querySelector("header").style = "";
    }, 300);
  }
}

export const myPopupOverlay = new popupOverlay();
