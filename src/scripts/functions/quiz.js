export function quiz() {
  const quizzes = document.querySelectorAll(".quiz");

  if (!quizzes.length) return;

  document.documentElement.addEventListener("click", function (event) {
    const button = event.target.closest("button[name^='quiz']");
    // const interaction = event.target.closest("input, select");

    if (button) switchSlide(button);
    // if (interaction) switchButtonsState(interaction.closest(".quiz__wrapper"));
  });
}

function switchSlide(button) {
  const wrapper = button.closest(".quiz__wrapper");
  const currentSlide = wrapper.querySelector(".quiz__slide_shown");
  const nextSlide = currentSlide.nextElementSibling;
  const prevSlide = currentSlide.previousElementSibling;
  const action = button.getAttribute("name");

  switch (action) {
    case "quiz-next":
      if (!nextSlide) break;
      hideSlide(currentSlide);
      showSlide(nextSlide);
      break;
    case "quiz-previous":
      if (!prevSlide) break;
      hideSlide(currentSlide);
      showSlide(prevSlide);
      break;
  }
}

function showSlide(slide) {
  slide.classList.add("quiz__slide_shown");
  slide.setAttribute("aria-hidden", false);
}

function hideSlide(slide) {
  slide.classList.remove("quiz__slide_shown");
  slide.setAttribute("aria-hidden", true);
}

// function isSlideValid(slide) {
//   if (!slide) return;

//   const checkboxes = slide.querySelectorAll("input[type='radio']");
//   const checked = slide.querySelectorAll("input[type='radio']:checked");
//   const selects = slide.querySelectorAll("select");
//   let countValid = 0;
//   let checkboxNames = [];

//   checkboxes.forEach((checkbox) => {
//     if (checkboxNames.indexOf(checkbox.name) === -1) {
//       checkboxNames.push(checkbox.name);
//     }
//   });

//   selects.forEach((select) => {
//     select.value;
//   });

//   countValid += checked.length;
//   countValid += checkboxes.length;
//   console.log(checkboxNames.length, countValid);

//   if (countValid) return true;
//   return false;
// }

// eslint-disable-next-line no-unused-vars
// function switchButtonsState(wrapper) {
//   if (!wrapper) return;

//   const currentSlide = wrapper.querySelector(".quiz__slide_shown");

//   if (!isSlideValid(currentSlide)) return;

//   currentSlide
//     .querySelectorAll("button")
//     .forEach((button) => button.removeAttribute("disabled"));
// }
