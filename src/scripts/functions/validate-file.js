import { formatBytes } from "./format-bytes";

export function validateFiles() {
  const fileInputs = document.querySelectorAll("input[type='file']");

  if (!fileInputs.length) return;

  fileInputs.forEach((fileInput) =>
    fileInput.addEventListener("change", validateFile.bind(this, fileInput))
  );
}

function validateFile(inputElement) {
  const fileErrorClass = "error";
  const inputLabel =
    inputElement.parentElement.querySelector("[data-file-name]") ||
    inputElement.parentElement.querySelector(".form__label") ||
    inputElement.parentElement.querySelector("span");
  const fileButton = inputElement.parentElement.querySelector("[data-file-button]");

  if (!inputElement.files.length) {
    inputElement.classList.add(fileErrorClass);
    inputLabel.textContent = "Файл не выбран.";
    return;
  }

  // init state //
  const maxFileSize = inputElement.getAttribute("data-max-size") * Math.pow(1024, 2) || 5e6,
    filesCount = inputElement.files.length,
    firstFile = inputElement.files[0],
    fileName = firstFile.name,
    fileSize = firstFile.size;

  // clear validation //
  inputElement.classList.remove(fileErrorClass);
  inputLabel.textContent = "";

  const fileNameToShow =
      fileName.length > 19 ? `${fileName.slice(0, 6)}...${fileName.slice(-8)}` : fileName,
    fileSizeToShow = formatBytes(fileSize);

  if (fileSize > maxFileSize) {
    inputElement.classList.add(fileErrorClass);
    inputLabel.textContent = `Файл больше ${formatBytes(maxFileSize)}`;
    return;
  }

  inputLabel.textContent = `Файл${
    filesCount > 1 ? `(${filesCount})` : ``
  }: ${fileNameToShow} (${fileSizeToShow})`;
  if (fileButton) fileButton.textContent = fileButton.getAttribute("data-file-button");
}
