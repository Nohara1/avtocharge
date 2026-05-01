// counter group elements //

export function counterGroup() {
  const containers = document.querySelectorAll("[data-counter-container]");

  if (!containers.length) return;

  for (const container of containers) {
    const plus = container.querySelector("[data-action='plus']");
    const minus = container.querySelector("[data-action='minus']");
    const counterTarget = container.querySelector("[data-target]");
    if (!plus && !minus && !counterTarget) continue;

    plus.addEventListener(function () {
      counterTarget.value = parseInt(counterTarget.value) + 1;
    });
    minus.addEventListener(function () {
      const targetNumber = parseInt(counterTarget.value);
      if (targetNumber <= 1) return;
      counterTarget.value = targetNumber - 1;
    });
    counterTarget.addEventListener("change", (event) => {
      const target = event.currentTarget;
      if (parseInt(target.value) >= target.getAttribute("data-min")) return;
      target.value = 1;
    });
  }
}
