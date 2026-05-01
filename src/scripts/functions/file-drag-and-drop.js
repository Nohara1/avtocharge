export function fileDragAndDrop() {
  const dropZones = document.querySelectorAll("[data-dropzone]");

  if (!dropZones.length) return;

  dropZones.forEach((zone) => {
    const dropInput = zone.querySelector("input[type='file']");
    const hoverClassName = "form__file-dropdown_hovered";

    zone.addEventListener("dragenter", function () {
      zone.classList.add(hoverClassName);
    });

    zone.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    zone.addEventListener("dragleave", function () {
      zone.classList.remove(hoverClassName);
    });

    zone.addEventListener("drop", function (event) {
      event.preventDefault();
      zone.classList.remove(hoverClassName);

      const file = event.dataTransfer?.files[0];

      if (!file) return;

      dropInput.files = event.dataTransfer.files;

      // for Safari
      if (dropInput.webkitEntries.length) {
        dropInput.setAttribute("data-file", `${event.dataTransfer.files[0].name}`);
      }

      dropInput.dispatchEvent(new Event("change"));
    });
  });
}
