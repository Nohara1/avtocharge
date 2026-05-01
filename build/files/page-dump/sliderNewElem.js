new Swiper('.newSliderElem',{
    navigation:{
        nextEl:'.next-wrapper_new',
        prevEl:'.prev-wrapper_new',
        clickable: true,
    },
    // mousewheel: {
    //     releaseOnEdges: true,
    // },
    slideToClickedSlide: true,
    slidesPerView: 5,
    spaceBetween: 26,
    slidesPerGroup: 1,
    touchRatio: 1,
    grabCursor: true,
    // initialSlide: 1,
    speed: 800,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            // centeredSlides: true,
            initialSlide: 1,
        },
        400: {
            slidesPerView: 3,
            initialSlide: 1,
            // slideActiveClass: 'active-slide',
            // centeredSlides: true,
            spaceBetween: 20
        },
        // when window width is >= 480px
        1000: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        // when window width is >= 640px
        1250: {
            slidesPerView: 5,
            spaceBetween: 25
        }
    }
})