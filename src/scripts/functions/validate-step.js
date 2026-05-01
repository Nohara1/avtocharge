export function validateStep() {
  setCheckingAttr();

  document.addEventListener("click", function (event) {
    const step = event.target.closest("[data-step]");
    const toggle = event.target.closest("[data-toggle]");

    if (step) {
      if (validate(step)) step.click();
    }
    if (toggle) setCheckingAttr();
  });

  function setCheckingAttr() {
    const containers = document.querySelectorAll("[data-step-container]");

    if (!containers.length) return;

    containers.forEach(function (container) {
      const button = container.querySelector("[data-toggle]");

      if (!button) return;

      if (!button.hasAttribute("data-step")) button.setAttribute("data-step", "");
    });
  }

  function validate(button) {
    const container = button.closest("[data-step-container]");

    if (!container) return;

    const requirements = container.querySelectorAll("[data-required]");

    if (!requirements.length) return;

    let valid = true;

    for (const requirement of requirements) {
      if (
        (requirement.getAttribute("type") === "checkbox" && !requirement.checked) ||
        requirement.value === ""
      ) {
        requirement.classList.add("error");
        valid = false;
        continue;
      }

      requirement.classList.remove("error");
    }

    if (valid) button.removeAttribute("data-step");

    return valid;
  }
}
