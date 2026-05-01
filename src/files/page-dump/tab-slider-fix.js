(function () {
  "use strict";

  function initTabSliders() {
    if (typeof window.Swiper === "undefined") {
      return;
    }

    var sliders = document.querySelectorAll(".tab-slider");
    if (!sliders.length) {
      return;
    }

    sliders.forEach(function (sliderNode) {
      if (sliderNode.dataset.tabSliderInited === "1" || sliderNode.swiper) {
        return;
      }

      var wrapperSlides = sliderNode.querySelectorAll(".swiper-wrapper > div");
      wrapperSlides.forEach(function (slide) {
        if (!slide.classList.contains("swiper-slide")) {
          slide.classList.add("swiper-slide");
        }
      });

      var scope = sliderNode.parentElement || sliderNode;
      var nextEl = scope.querySelector(".tab-slider__arrow-next");
      var prevEl = scope.querySelector(".tab-slider__arrow-prev");

      new Swiper(sliderNode, {
        slidesPerView: 4,
        spaceBetween: 40,
        cssMode: false,
        breakpoints: {
          300: {
            spaceBetween: 20,
            slidesPerView: "auto",
          },
          769: {
            spaceBetween: 30,
            slidesPerView: "auto",
          },
          1025: {
            spaceBetween: 30,
            slidesPerView: 4,
            cssMode: true,
          },
          1231: {
            spaceBetween: 40,
            slidesPerView: 4,
            cssMode: true,
          },
        },
        navigation: {
          nextEl: nextEl,
          prevEl: prevEl,
        },
      });

      sliderNode.dataset.tabSliderInited = "1";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTabSliders);
  } else {
    initTabSliders();
  }

  document.addEventListener("mse2_load", initTabSliders);
})();
