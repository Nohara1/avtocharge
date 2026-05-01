export function toggleClassOnClick(itemsClick, classToItem, nameOfClass) {
  document.documentElement.addEventListener("click", function (event) {
    const button = event.target.closest(itemsClick);

    if (!button) return;

    toggle(button, classToItem, nameOfClass);
  });

  function toggle(button, toItem, className) {
    let closestItem = "";

    if (toItem.indexOf("closest") > -1) {
      closestItem = toItem.split(":")[1];
      toItem = "closest";
    }

    switch (toItem) {
      case "parent":
        button.parentElement.classList.toggle(className);
        break;
      case "previous":
        button.previousElementSibling.classList.toggle(className);
        break;
      case "closest":
        var closest = button.closest(closestItem);
        if (!closest) return;
        closest.classList.toggle(className);
        break;
      default:
        document.querySelectorAll(toItem).forEach((item) => {
          item.classList.toggle(className);
        });
        break;
    }
  }
}
