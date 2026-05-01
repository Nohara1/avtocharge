import Swiper, { Pagination, Navigation, Keyboard, Mousewheel, Thumbs, Autoplay } from "swiper";
import { onReady } from "./functions/helpers";

onReady(initSliders);

function initSliders() {
  // tabs overlapping handler
  const banner = document.querySelector(".b__slider");
  if (banner) {
    new Swiper(banner, {
      createElements: true,
      modules: [Navigation, Pagination],
      wrapperClass: "b__slider-wrapper",
      slideClass: "b__slide",
      navigation: {
        enabled: true,
        prevEl: ".b__nav_prev",
        nextEl: ".b__nav_next",
      },
      pagination: {
        enabled: true,
        el: ".b__pagination",
        clickable: true,
      },
      slidesPerView: "1",
      spaceBetween: 0,
      focusableElements: "input, select, option, textarea, video, label",
      // preventInteractionOnTransition: true,
      // touchMoveStopPropagation: true,
    });
  }

  // contacts staff slider
  /*const contactsSlider = document.querySelector(".contacts__slider");
  if (contactsSlider) {
    new Swiper(contactsSlider, {
      createElements: true,
      wrapperClass: "contacts__slider-wrapper",
      slideClass: "contacts__slide",
      slidesPerView: 4,
      spaceBetween: 30,
      touchEventsTarget: "container",
      focusableElements: "input, select, option, textarea, video, label",
      // preventInteractionOnTransition: true,
      // touchMoveStopPropagation: true,
      breakpoints: {
        0: {
          slidesPerView: 1.3,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
        1366: {
          slidesPerView: 4,
        },
      },
    });
  }*/

  // clients slider
  const clientsSliders = document.querySelectorAll(".oc__items");
  if (clientsSliders.length) {
    clientsSliders.forEach(function (slider, index) {
      new Swiper(slider, {
        loop: true,
        loopAdditionalSlides: 0,
        speed: 10000,
        allowTouchMove: false,
        slideClass: "oc__item",
        spaceBetween: 50,
        wrapperClass: "oc__wrapper",
        slidesPerView: "auto",
        createElements: true,
        modules: [Autoplay],
        touchEventsTarget: "container",
        focusableElements: "input, select, option, textarea, video, label",
        // preventInteractionOnTransition: true,
        // touchMoveStopPropagation: true,
        autoplay: {
          delay: 0,
          reverseDirection: index % 2 === 0,
          disableOnInteraction: true,
        },
      });
    });
  }

  // faq mobile slider
  // const faqSlider = document.querySelector(".faq__items-wrapper");
  // if (faqSlider) {
  //   faqSliderHandler(window.matchMedia("(min-width: 992px)"));
  //   window.matchMedia("(min-width: 992px)").addEventListener("change", faqSliderHandler);
  // }

  // function faqSliderHandler(event) {
  //   if (event.matches && faqSlider.swiper) faqSlider.swiper.destroy();

  //   if (!event.matches && !faqSlider.swiper)
  //     new Swiper(faqSlider, {
  //       createElements: true,
  //       wrapperClass: "faq__items",
  //       slideClass: "faq__item",
  //       slidesPerView: "auto",
  //       spaceBetween: 30,
  //       touchEventsTarget: "container",
  //       focusableElements: "input, select, option, textarea, video, label",
  //       // preventInteractionOnTransition: true,
  //       // touchMoveStopPropagation: true,
  //       breakpoints: {
  //         0: {
  //           spaceBetween: 20,
  //         },
  //         576: {
  //           spaceBetween: 30,
  //         },
  //       },
  //     });
  // }

  // product card sliders swiper //
  const g01Class = "g01__";
  const g01Blocks = document.querySelectorAll(".g01");
  // const g01HiddenClass = `${g01Class}nav-btn_hidden`;

  g01Blocks.forEach(function (gallery) {
    const main = gallery.querySelector(".g01__main");
    const thumbs = gallery.querySelector(".g01__thumbs");
    const g01ThumbsSwiperConfig = {
      direction: "vertical",
      spaceBetween: 0,
      slidesPerView: "auto",
      // centeredSlides: true,
      normalizeSlideIndex: true,
      // centeredSlidesBounds: true,
      slideToClickedSlide: true,
      // watchSlidesProgress: true,
      // watchSlidesVisibility: true,
      wrapperClass: g01Class + "swiper-wrapper",
      slideClass: g01Class + "slide",
      breakpoints: {
        0: {
          direction: "horizontal",
        },
        576: {
          direction: "vertical",
        },
        992: {
          direction: "horizontal",
        },
        1200: {
          direction: "vertical",
        },
      },
    };
    const g01ThumbsSwiper01 = new Swiper(thumbs, g01ThumbsSwiperConfig);

    const g01MainSwiperConfig = {
      modules: [Thumbs, Navigation],
      grabCursor: false,
      slidesPerView: 1,
      roundLengths: true,
      wrapperClass: g01Class + "swiper-wrapper",
      slideClass: g01Class + "slide",
      watchSlidesProgress: true,
      navigation: {
        nextEl: `.${g01Class}nav-btn_next`,
        prevEl: `.${g01Class}nav-btn_prev`,
      },
      thumbs: {
        swiper: g01ThumbsSwiper01,
        autoScrollOffset: 1,
        multipleActiveThumbs: false,
      },
      // on: {
      //   init: function (e) {
      //     if (e.navigation.prevEl === null || e.navigation.nextEl === null)
      //       return;
      //     if (e.slides.length <= 3) {
      //       e.navigation.prevEl[0].classList.add(g01HiddenClass);
      //       e.navigation.nextEl[0].classList.add(g01HiddenClass);
      //       return;
      //     }
      //     e.navigation.prevEl[0].classList.add(g01HiddenClass);
      //   },
      //   reachBeginning: function (e) {
      //     if (e.navigation.prevEl === null || e.navigation.nextEl === null)
      //       return;
      //     if (e.slides.length <= 3) return;
      //     e.navigation.prevEl[0].classList.add(g01HiddenClass);
      //     e.navigation.nextEl[0].classList.remove(g01HiddenClass);
      //   },
      //   reachEnd: function (e) {
      //     if (e.navigation.prevEl === null || e.navigation.nextEl === null)
      //       return;
      //     if (e.slides.length <= 3) return;
      //     e.navigation.prevEl[0].classList.remove(g01HiddenClass);
      //     e.navigation.nextEl[0].classList.add(g01HiddenClass);
      //   },
      // },
    };
    new Swiper(main, g01MainSwiperConfig);
  });

  // country-params slider
  const cpSlider = document.querySelectorAll(".cp__slider");
  if (cpSlider.length) {
    cpSlider.forEach(function (slider, index) {
      const cpPrev = slider.parentElement.querySelector(".cp__nav_prev");
      const cpNext = slider.parentElement.querySelector(".cp__nav_next");
      new Swiper(slider, {
        modules: [Navigation],
        slideClass: "cp__inner",
        spaceBetween: 0,
        wrapperClass: "cp__slider-wrapper",
        slidesPerView: 1,
        createElements: true,
        touchEventsTarget: "container",
        focusableElements: "input, select, option, textarea, video, label",
        navigation: {
          prevEl: cpPrev,
          nextEl: cpNext,
        },
      });
    });
  }

  // custom slider swiper //
  const csSlides = document.querySelectorAll(".cs__swiper-wrapper > *");

  if (csSlides.length) {
    const csSwipers = document.querySelectorAll(".cs__swiper");

    csSwipers.forEach((slider) => {
      const csContainer = slider.closest(".cs");
      const counterEl = slider.querySelector(".cs__counter");
      if (counterEl) {
        const counterCurrentEl = counterEl.querySelector(
          ".cs__counter-current"
        );
        const counterTotalEl = counterEl.querySelector(".cs__counter-total");
        const counterObj = {
          counter: counterEl,
          current: counterCurrentEl,
          total: counterTotalEl,
        };
      }
      const csNext = slider.querySelector(".cs__nav-btn_next");
      const csPrev = slider.querySelector(".cs__nav-btn_prev");
      const csPagination = slider.querySelector(".cs__pagination");
      const csA11y = true;

      let modulesConfig = [Autoplay];
      const mSlides = Number(+slider.getAttribute("data-mob-slides")) || false;
      const gap = +slider.getAttribute("data-gap") || false;
      const slides = Number(+slider.getAttribute("data-slides")) || false;
      const loop = slider.hasAttribute("data-loop");
      const delay = Number(slider.getAttribute("data-delay")) || 0;
      const speed = Number(slider.getAttribute("data-speed")) || 300;
      const autoplay = slider.hasAttribute("data-autoplay") || false;

      csNext ? modulesConfig.push(Navigation) : null;
      csPagination ? modulesConfig.push(Pagination) : null;
      csA11y ? modulesConfig.push(Keyboard, Mousewheel) : null;

      const csKeyboard = {
        keyboard: {
          enabled: true,
          // onlyInViewport: true,
        },
      };

      const csMousewheel = {
        mousewheel: {
          forceToAxis: true,
          thresholdDelta: 70,
        },
      };

      const csNavigation = {
        navigation: {
          nextEl: csNext,
          prevEl: csPrev,
          lockClass: "cs__nav-btn_lock",
          disabledClass: "cs__nav-btn_disabled",
        },
      };

      const csPaginationConfig = {
        pagination: {
          el: csPagination,
          type: "bullets",
          clickable: true,
          dynamicBullets: false,
          modifierClass: "cs__pagination-",
          lockClass: "cs__pagination_lock",
        },
      };

      const csSwiperConfig = {
        modules: modulesConfig,
        loop: loop,
        speed: speed,
        freeMode: true,
        freeModeMomentum: false,
        rewind: false,
        grabCursor: true,
        // centeredSlides: true,
        // centeredSlidesBounds: true,
        setWrapperSize: true,
        roundLengths: true,
        // edgeSwipeDetection: true,
        slideClass: "cs__slide",
        watchSlidesProgress: true,
        slideVisibleClass: "cs__slide_visible",
        containerModifierClass: "cs__swiper-",
        wrapperClass: "cs__swiper-wrapper",
        breakpoints: {
          0: {
            slidesPerView: mSlides ? mSlides : "auto",
            spaceBetween: gap ? Math.floor(gap / 3) : 0,
          },
          576: {
            slidesPerView: slides ? Math.ceil(slides / 2) : "auto",
            spaceBetween: gap ? Math.floor(gap / 2) : 0,
          },
          992: {
            slidesPerView: slides ? Math.ceil(slides / 1.5) : "auto",
            spaceBetween: gap ? Math.floor(gap / 1.5) : 0,
          },
          1366: {
            slidesPerView: slides ? slides : "auto",
            spaceBetween: gap ? gap : 0,
          },
        },
        on: {
          init: function () {
            this.slides.forEach((slide) => addCategoryClass(slide));
            updateSliderLockedState(this);
          },
          update: function () {
            updateSliderLockedState(this);
          },
          resize: function () {
            updateSliderLockedState(this);
          },
          slideChange: function () {
            if (counterEl) updateSliderCounter(this, counterObj);
          },
          // touchEnd: function () {
          // },
          // progress: function (swiper, progress) {
          //   console.log(swiper, progress);
          // },
          // activeIndexChange: function () {},
          // reachBeginning: function () {
          // },
          // reachEnd: function () {
          // },
        },
      };
      if (autoplay === true) {
        csSwiperConfig.autoplay = {
          delay: delay,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: true,
        };
      }

      if (csNext) Object.assign(csSwiperConfig, csNavigation);
      if (csPagination) Object.assign(csSwiperConfig, csPaginationConfig);
      if (csA11y) Object.assign(csSwiperConfig, csKeyboard, csMousewheel);

      new Swiper(slider, csSwiperConfig);
    });

    document.documentElement.addEventListener("click", function (event) {
      const button = event.target.closest("[data-switch-category]");
      if (button) showCorrectCategory(button);
    });
  }

  // tabs overlapping handler
  const tabsContainers = document.querySelectorAll("._nav-slider");
  if (tabsContainers.length) {
    tabsContainers.forEach(function (container) {
      new Swiper(container, {
        createElements: true,
        wrapperClass: "_nav-slider__wrapper",
        slideClass: "_nav-slider__slide",
        slidesPerView: "auto",
        spaceBetween: 0,
        focusableElements: "input, select, option, textarea, video, label",
        // preventInteractionOnTransition: true,
        // touchMoveStopPropagation: true
      });
    });
  }

  function showCorrectCategory(button) {
    const container = button.closest(".cs"),
      swiper = container.querySelector(".cs__swiper").swiper,
      slides = container.querySelectorAll(".cs__slide");

    if (slides === null) return;

    slides.forEach((slide) =>
      addCategoryClass(slide, button.getAttribute("data-switch-category"))
    );
    switchCategoryButton(button);

    swiper.slideTo(0, 300);
    swiper.update();
  }

  function addCategoryClass(slide, buttonCategory = "") {
    if (buttonCategory === "")
      return (
        slide.classList.add(`${slide.classList[0]}_show`),
        slide.setAttribute("aria-hidden", "false")
      );
    slide.classList.remove(`${slide.classList[0]}_show`);
    slide.setAttribute("aria-hidden", "true");

    const slideCategoriesValue = slide.getAttribute("data-slide-category");
    if (!slideCategoriesValue) return;
    const slideCategories = slideCategoriesValue.split(",");
    if (!slideCategories.includes(buttonCategory)) return;
    slide.classList.add(`${slide.classList[0]}_show`);
    slide.setAttribute("aria-hidden", "false");
  }

  function switchCategoryButton(button) {
    Array.from(button.parentElement.children).forEach((btn) =>
      btn.classList.remove("active")
    );
    button.classList.add("active");
  }

  function updateSliderLockedState(slider) {
    slider.isLocked
      ? slider.el.classList.add("locked")
      : slider.el.classList.remove("locked");
  }

  function updateSliderCounter(slider, counterObj) {
    counterObj.current.innerHTML = +slider.realIndex + 1;
    counterObj.total.innerHTML = slider.slides.length;
  }
}
