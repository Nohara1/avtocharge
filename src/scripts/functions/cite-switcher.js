export function citeSwitcher() {
  const citeElements = document.querySelectorAll("[data-cite-switcher]");

  if (!citeElements.length) return;

  citeElements.forEach(function (cite) {
    const citeArray = cite.getAttribute("data-cite-switcher").split("*"),
      arrayLength = citeArray.length,
      citeDelay = cite.getAttribute("data-cite-switcher-delay");
    let citeIndex = 0;

    const firstElem = document.createElement("span");
    firstElem.setAttribute("data-cite-switcher-first", "");

    const secondElem = document.createElement("span");
    secondElem.setAttribute("data-cite-switcher-second", "");

    firstElem.textContent = secondElem.textContent;

    if (!arrayLength) return;

    firstElem.textContent = citeArray[citeIndex];
    cite.appendChild(firstElem);

    setInterval(
      function () {
        if (++citeIndex >= arrayLength) citeIndex = 0;

        cite.innerHTML = null;
        secondElem.textContent = firstElem.textContent;
        firstElem.textContent = citeArray[citeIndex];
        cite.appendChild(firstElem);
        cite.appendChild(secondElem);
      },
      citeDelay ? +citeDelay * 1000 : 5000
    );
  });
}
