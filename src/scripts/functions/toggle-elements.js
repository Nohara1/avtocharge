export function toggleElements() {
  const toggleContainers = document.querySelectorAll("[data-toggle-container]");
  if (!toggleContainers.length) return;

  toggleContainers.forEach((container) => {
    let toggleElements = container.querySelectorAll("[data-toggle]");
    const toggleTargets = container.querySelectorAll("[data-target]");
    const otherContainers = container.querySelectorAll("[data-toggle-container]");
    if (!toggleElements.length && !toggleTargets.length) return;

    const dataAttrValue = container.getAttribute("data-toggle-container");
    // toggle means element can make action when even active
    const isToggle = dataAttrValue.includes("toggle") ? true : false;
    // self means element can't affect on others
    const isSelf = dataAttrValue.includes("self") ? true : false;
    // to change disabled attribute
    const isDisable = dataAttrValue.includes("disable") ? true : false;
    // to close on click outside
    const isClickOutside = dataAttrValue.includes("click-outside") ? true : false;

    if (otherContainers.length) {
      toggleElements = filterElements(toggleElements, otherContainers);
    }

    toggleElements.forEach((elem) => {
      switch (elem.tagName.toLowerCase()) {
        case "select":
          toggleContent({
            current: elem,
            targets: toggleTargets,
            select: true,
          });
          elem.addEventListener("change", (event) => {
            toggleContent({
              current: event.target,
              targets: toggleTargets,
              select: true,
            });
          });
          break;
        case "input":
          toggleContent({
            current: elem,
            targets: toggleTargets,
            checked: elem.checked,
            disable: isDisable,
          });
          elem.addEventListener("click", (event) => {
            toggleContent({
              current: event.target,
              targets: toggleTargets,
              disable: isDisable,
            });
          });
          break;
        default:
          elem.addEventListener("click", () => {
            if (elem.hasAttribute("data-step")) return;
            toggleContent({
              current: elem,
              targets: toggleTargets,
              buttons: toggleElements,
              toggle: isToggle,
              self: isSelf,
            });
          });
          break;
      }
    });

    if (isClickOutside) {
      document.documentElement.addEventListener("click", function (event) {
        if (event.target.closest("[data-toggle], [data-target]")) return;

        toggleElements.forEach((elem) => {
          if (elem.getAttribute("aria-expanded") === "false") return;

          toggleContent({
            current: elem,
            targets: toggleTargets,
            buttons: toggleElements,
            toggle: isToggle,
            self: isSelf,
          });
        });
      });
    }
  });

  function toggleContent(obj) {
    let current = obj.current,
      targets = obj.targets,
      buttons = obj.buttons || null,
      toggle = obj.toggle || false,
      self = obj.self || false,
      disable = obj.disable || false,
      checked = obj.checked !== undefined ? obj.checked : null,
      select = obj.select || false;

    const value = toggleValue(select, current);

    targets.forEach((target) => toggleClass(target, value, toggle, self, disable, checked));

    if (buttons === null) return;
    toggleExpanded(current, buttons, toggle, self);
  }

  function toggleValue(select, element) {
    if (select === true) return element.value;
    return element.getAttribute("data-toggle");
  }

  function toggleClass(t, value, toggle, self, disable, checked) {
    const tValue = t.getAttribute("data-target");

    if (checked === false || (self === true && tValue !== value)) return;

    if (self === true && tValue === value) return t.classList.toggle("active");

    if (toggle === true && t.classList.contains("active")) return t.classList.remove("active");

    if (tValue === value && disable) t.removeAttribute("disabled");

    if (tValue === value) return t.classList.add("active");

    if (disable) t.setAttribute("disabled", "");

    return t.classList.remove("active");
  }

  function toggleExpanded(current, buttons, toggle, self) {
    let isAreaExpanded = current.getAttribute("aria-expanded") === "true";

    if (self) return current.setAttribute("aria-expanded", !isAreaExpanded);

    buttons.forEach((button) => button.setAttribute("aria-expanded", false));

    if (toggle) return current.setAttribute("aria-expanded", !isAreaExpanded);

    current.setAttribute("aria-expanded", true);
  }

  function filterElements(elements, containers) {
    let result = [];
    elements.forEach((element) => {
      let toAdd = true;
      containers.forEach((container) => {
        if (container.contains(element) && toAdd) toAdd = false;
      });
      if (toAdd) result.push(element);
    });
    return result;
  }
}
