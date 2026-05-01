export function cookies() {
  const cookieElement = document.querySelector(".cookie");

  if (!cookieElement) return;

  const cookieStorage = localStorage.getItem("cookie_notice");

  if (cookieStorage === null) {
    cookieElement.removeAttribute("hidden");
    setTimeout(() => cookieElement.classList.add("active"), 300);

    cookieElement
      .querySelector(".cookie__btn")
      .addEventListener("click", () => {
        cookieElement.classList.remove("active");
        localStorage.setItem("cookie_notice", true);
      });
  }
}
