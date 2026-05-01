export function onKeydownAction(element, customFunction) {
  element.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
      e.preventDefault();
      customFunction();
    }
  });
}
