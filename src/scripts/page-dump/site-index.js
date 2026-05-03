/* eslint-disable */

import $ from "jquery";
import Swiper from "swiper/bundle";

// break points site
const breakPoint = {
	desctop: 1920,
	desctopMid: 1450,
	desctopMin: 1230,
	table: 1024,
	mobile: 768,
	tel: 480,
}

if (document.querySelector('header')) {
	const headerEl = document.querySelector('header');

	const setVariableHeightHeader = (el) => {
		if (el) {
			document.documentElement.style.setProperty("--header-height", headerEl.getBoundingClientRect().height + "px");
		}
	}

	setTimeout(() => { setVariableHeightHeader(headerEl) }, 0);

	['resize', 'load'].forEach(listener => {
		window.addEventListener(listener, function () {
			setVariableHeightHeader(headerEl);
		});
	});
}

/***** INITIALIZING PLUGINS ******/
if (isElem('.fixblock')) {
	const fixblockNodes = document.querySelectorAll('.fixblock');
	const mediaQuery = window.matchMedia(`(min-width: ${breakPoint.table}px)`);

	for (const fixblock of fixblockNodes) {
		let a = fixedBlock(fixblock);
		let isInit = false;

		mediaHandler();

		mediaQuery.addListener(mediaHandler);

		function mediaHandler() {
			if (mediaQuery.matches) {
				a.init();
				isInit = true;
			} else if (isInit) {
				a.destroy();
			}
		}
	}


}

if (window.$ && typeof window.$.fn.customSelect === 'function') {
	$('select').customSelect();
}

// скрол страницы к нужной координате
let scrollingWindow = scrollWindow();

document.addEventListener('click', function (e) {
	if (e.target.closest('.scroll-to[href]')) {
		const link = e.target.closest('.scroll-to[href]');

		const id = link.hash;

		try {
			const $section = document.querySelector(id);

			if (!$section) return;

			e.preventDefault();

			const $header = document.querySelector('.header') || document.querySelector('header');
			let coordsSection = window.pageYOffset + $section.getBoundingClientRect().top;

			coordsSection = coordsSection - $header.offsetHeight;

			scrollingWindow.startAmimationScroll(coordsSection);
		} catch (error) {
			console.error(error);
		}
	} else if (e.target.closest('[data-toggle]')) {
		const targetEl = e.target.closest('[data-toggle]')
		const id = targetEl.dataset.toggle;

		const contentEl = document.querySelector(`[data-content="${id}"]`);

		if (!contentEl) return;

		$(targetEl).toggleClass('active');
		$(contentEl).slideToggle();
	}
})

// 	main slider
if (isElem('.main-slider')) {
	const sliderNode = document.querySelector('.main-slider');

	const swiper = new Swiper(sliderNode, {
		grabCursor: true,
		speed: 1700,
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
		},
		spaceBetween: 10,
		centeredSlides: true,
		centeredSlidesBounds: true,
		pagination: {
			el: sliderNode.parentElement.querySelector('.slider-pagination'),
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 'auto',
			},
			1024: {
				centeredSlides: false,
				centeredSlidesBounds: false,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
			}
		}
	});
}

// products slider
if (isElem('.products-slider')) {
	const $sliderNodes = document.querySelectorAll('.products-slider');

	for (let $sliderNode of $sliderNodes) {
		const swiper = new Swiper($sliderNode, {
			//loop: true,
			grabCursor: true,
			loopAdditionalSlides: 1,
			slidesPerView: 'auto',
			spaceBetween: 30,
			noSwipingClass: 'product-card__bottom',
			watchSlidesProgress: true,
			watchOverflow: true,
			breakpoints: {
				300: {
					spaceBetween: 20,
				},
				769: {
					spaceBetween: 30,
				},
				1025: {
					spaceBetween: 25,
				},
				1231: {
					spaceBetween: 40,
				}
			},
			pagination: {
				el: $sliderNode.parentElement.querySelector('.slider-pagination'),
				clickable: true,
			}
		});
	}
}

if (isElem('.article-products-slider')) {
	const $sliderNodes = document.querySelectorAll('.article-products-slider');

	for (let $sliderNode of $sliderNodes) {
		const swiper = new Swiper($sliderNode, {
			//loop: true,
			grabCursor: true,
			loopAdditionalSlides: 1,
			slidesPerView: 3,
			spaceBetween: 30,
			noSwipingClass: 'product-card__bottom',
			watchSlidesProgress: true,
			watchOverflow: true,
			breakpoints: {
				300: {
					spaceBetween: 20,
					slidesPerView: 1,
				},
				769: {
					spaceBetween: 30,
					slidesPerView: 2,
				},
				1025: {
					spaceBetween: 25,
					slidesPerView: 3,
				},
				1231: {
					spaceBetween: 40,
					slidesPerView: 3,
				}
			},
			pagination: {
				el: $sliderNode.parentElement.querySelector('.slider-pagination'),
				clickable: true,
			},
			navigation: {
				nextEl: $sliderNode.parentElement.querySelector('.slider-arr--next'),
				prevEl: $sliderNode.parentElement.querySelector('.slider-arr--prev'),
			}
		});
	}
}

if (isElem('.experts-slider')) {
	const $sliderNodes = document.querySelectorAll('.experts-slider');

	for (let $sliderNode of $sliderNodes) {
		const swiper = new Swiper($sliderNode, {
			//loop: true,
			grabCursor: true,
			// loopAdditionalSlides: 1,
			// slidesPerView: 3,
			spaceBetween: 0,
			// noSwipingClass: 'product-card__bottom',
			watchSlidesProgress: true,
			watchOverflow: true,
			breakpoints: {
				300: {
					slidesPerView: 1,
				},
				769: {
					slidesPerView: 2,
				},
				1025: {
					slidesPerView: 1,
				}
			},
			navigation: {
				nextEl: $sliderNode.parentElement.querySelector('.slider-arr--next'),
				prevEl: $sliderNode.parentElement.querySelector('.slider-arr--prev'),
			}
		});
	}
}

if (isElem('.catalog-promos-slider')) {
	const sliderNode = document.querySelector('.catalog-promos-slider');

	const swiper = new Swiper(sliderNode, {
		slidesPerView: 1,
		pagination: {
			el: sliderNode.parentElement.querySelector('.slider-pagination'),
			clickable: true,
		},
		navigation: {
			nextEl: sliderNode.parentElement.querySelector('.slider-arr--next'),
			prevEl: sliderNode.parentElement.querySelector('.slider-arr--prev'),
		}
	});
}


if (isElem('.img-slider')) {
	const $sliderNodes = document.querySelectorAll('.img-slider');

	for (let $sliderNode of $sliderNodes) {
		const swiper = new Swiper($sliderNode, {
			pagination: {
				el: $sliderNode.parentElement.querySelector('.slider-pagination'),
				type: "fraction",
			},
			navigation: {
				nextEl: $sliderNode.parentElement.querySelector('.slider-arr--next'),
				prevEl: $sliderNode.parentElement.querySelector('.slider-arr--prev'),
			}
		});
	}
}

// heading slider
if (isElem('.hiding-slider')) {
	const $sliderNodes = document.querySelectorAll('.hiding-slider');

	for (let $sliderNode of $sliderNodes) {
		const count = $sliderNode.closest('.index-pg') ? 4 : 3;

		const swiper = new Swiper($sliderNode, {
			loopAdditionalSlides: 1,
			noSwipingClass: 'btn-go',
			watchSlidesProgress: true,
			watchOverflow: true,
			dynamicBullets: true,
			breakpoints: {
				300: {
					slidesPerView: 'auto',
					spaceBetween: 23,
				},
				[breakPoint.table + 1]: {
					slidesPerView: 3,
					spaceBetween: 30,
					grabCursor: true,
				},
				[breakPoint.desctopMin + 1]: {
					grabCursor: false,
					slidesPerView: count,
					spaceBetween: 30,
				},
				[breakPoint.desctopMid + 1]: {
					slidesPerView: count,
					spaceBetween: 43,
				}
			},
		});
	}
}

//production slider
if (isElem('.image-slider')) {
	const sliderClass = '.image-slider'
	const productionSilderContainer = document.querySelector(sliderClass);

	const productionSlider = new Swiper(productionSilderContainer, {
		slidesPerView: 1,
		spaceBetween: 35,
		dynamicBullets: true,

		breakpoints: {
			320: {
				spaceBetween: 29,
				slidesPerGroup: 1,
				slidesPerView: 1,
			},
			701: {
				slidesPerGroup: 2,
				slidesPerView: 2,
				spaceBetween: 25,
			},
			[breakPoint.table + 1]: {
				slidesPerGroup: 3,
				slidesPerView: 3,
				spaceBetween: 30,
				height: 2000,
			}
		},

		navigation: {
			nextEl: `${sliderClass}-wrap .slider-arr--next`,
			prevEl: `${sliderClass}-wrap .slider-arr--prev`,
		},

		pagination: {
			el: `${sliderClass}-wrap .slider-pagination`,
			clickable: true,
		}
	})

	productionSlider.on('resize', productionSlider.update);
}

//fullscreen slider
if (isElem('.full-screen-slider')) {
	const sliderClass = '.full-screen-slider'
	const $sliderEl = document.querySelector(sliderClass);

	let swiper = new Swiper($sliderEl, {
		loop: true,
		slidesPerView: 1,
		spaceBetween: 100,
		dynamicBullets: true,
		autoHeight: true,
		pagination: {
			el: `${sliderClass}-wrap .slider-pagination`,
			clickable: true,
		}
	});
}

// advantages slider
if (isElem('.slider-sm')) {
	const $sliderNodes = document.querySelectorAll('.slider-sm');

	for (const $slider of $sliderNodes) {
		const swiper = new Swiper($slider, {
			slidesPerView: 1,
			spaceBetween: 200,
			autoHeight: true,
			breakpoints: {
				320: {
					grabCursor: true,
					enabled: true,
					spaceBetween: 200,
				},
				[breakPoint.mobile + 1]: {
					enabled: false,
					spaceBetween: 0,
				}
			},
			pagination: {
				el: $slider.parentElement.querySelector('.slider-pagination'),
				clickable: true,
			},
		})
	}
}

if (isElem('.tab-slider')) {

	const $sliderNodes = document.querySelectorAll('.tab-slider');

	// Add swiper-slide class to all slides
	$sliderNodes.forEach($sliderNode => $sliderNode.parentElement.querySelectorAll('.swiper-wrapper>div').forEach(slide => slide.classList.add('swiper-slide')));

	for (let $sliderNode of $sliderNodes) {
		const swiper = new Swiper($sliderNode, {
			slidesPerView: 4,
			spaceBetween: 40,
			cssMode: false,
			// noSwipingClass: 'product-card__bottom',
			breakpoints: {
				300: {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				769: {
					spaceBetween: 30,
					slidesPerView: 'auto',
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
				}
			},
			navigation: {
				nextEl: $sliderNode.parentElement.querySelector('.tab-slider__arrow-next'),
				prevEl: $sliderNode.parentElement.querySelector('.tab-slider__arrow-prev'),
			}
		});
	}

}

if (isElem('.slider-products')) {

	const $sliderNodes = document.querySelectorAll('.slider-products');

	// Add swiper-slide class to all slides
	$sliderNodes.forEach($sliderNode => $sliderNode.parentElement.querySelectorAll('.swiper-wrapper>div').forEach(slide => slide.classList.add('swiper-slide')));

	for (let $sliderNode of $sliderNodes) {
		const swiper = new Swiper($sliderNode, {
			slidesPerView: 4,
			spaceBetween: 40,
			cssMode: false,
			// noSwipingClass: 'product-card__bottom',
			breakpoints: {
				300: {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				769: {
					spaceBetween: 30,
					slidesPerView: 'auto',
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
				}
			},
			navigation: {
				nextEl: $sliderNode.parentElement.querySelector('.slider__arrow-next'),
				prevEl: $sliderNode.parentElement.querySelector('.slider__arrow-prev'),
			}
		});
	}

}

if (isElem('.slider-works')) {

	const $sliderNodes = document.querySelectorAll('.slider-works');

	for (let $sliderNode of $sliderNodes) {
		const swiper = new Swiper($sliderNode, {
			slidesPerView: 3,
			spaceBetween: 30,
			// noSwipingClass: 'product-card__bottom',
			breakpoints: {
				300: {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				769: {
					spaceBetween: 30,
					slidesPerView: 'auto',
				},
				1025: {
					spaceBetween: 30,
					slidesPerView: 3,
				},
				1231: {
					spaceBetween: 30,
					slidesPerView: 3,
				}
			},
			navigation: {
				nextEl: $sliderNode.parentElement.querySelector('.slider__arrow-next'),
				prevEl: $sliderNode.parentElement.querySelector('.slider__arrow-prev'),
			}
		});
	}

}

if (isElem('.slider-generic')) {

	const $sliderNodes = document.querySelectorAll('.slider-generic');

	for (let $sliderNode of $sliderNodes) {
		const count = parseInt($sliderNode.dataset.slidesPerView) || 3;
		const swiper = new Swiper($sliderNode, {
			slidesPerView: count,
			spaceBetween: 30,
			breakpoints: {
				300: {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				769: {
					spaceBetween: 30,
					slidesPerView: 'auto',
				},
				1025: {
					spaceBetween: 30,
					slidesPerView: count,
				},
				1231: {
					spaceBetween: 30,
					slidesPerView: count,
				}
			},
			navigation: {
				nextEl: $sliderNode.parentElement.querySelector('.slider__arrow-next'),
				prevEl: $sliderNode.parentElement.querySelector('.slider__arrow-prev'),
			}
		});
	}

}


if (document.querySelector('.slider-portfolio-gallery')) {
    const portfolioSliders = document.querySelectorAll('.slider-portfolio-gallery');

    portfolioSliders.forEach(sliderNode => {
        // 1. Проверяем наличие стрелок ВНУТРИ конкретного слайдера
        const nextBtn = sliderNode.querySelector('.slider__arrow-next');
        const prevBtn = sliderNode.querySelector('.slider__arrow-prev');
        const indexEl = sliderNode.querySelector('[data-slides-index]');
        const totalSlides = sliderNode.querySelectorAll('.swiper-slide').length;

        // 2. Если стрелок нет — ставим false (Swiper отключит навигацию сам)
        // Если стрелки есть — передаем их элементы
        const navConfig = (nextBtn && prevBtn)
            ? { nextEl: nextBtn, prevEl: prevBtn }
            : false;

        new Swiper(sliderNode, {
            slidesPerView: 1,
            // Эти параметры спасают, если слайдер инициализируется в скрытом блоке (табах/модалках)
            observer: true,
            observeParents: true,
            navigation: navConfig,
            on: {
                init: function() {
                    if (indexEl) indexEl.textContent = '1/' + totalSlides;
                },
                slideChange: function() {
                    if (indexEl) {
                        indexEl.textContent = (this.activeIndex + 1) + '/' + totalSlides;
                    }
                }
            }
        });
    });
}

//fullscreen slider
if (isElem('.content-img-slider')) {
	const sliderClass = '.content-img-slider'
	const $sliderEls = document.querySelectorAll(sliderClass);

	for (const $sliderEl of $sliderEls) {
		let swiper = new Swiper($sliderEl, {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 0,

			pagination: {
				el: $sliderEl.parentElement.querySelector(`.slider-pagination`),
				clickable: true,
			}
		});
	}
}

if (isElem('.vendors-slider')) {
    const vendorsSwiper = new Swiper('.vendors-slider', {
        slidesPerView: 'auto',
        spaceBetween: 70,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },
        speed: 5000,
        breakpoints: {
            300: {
                spaceBetween: 20,
            },
            1024: {
                spaceBetween: 70,
            }
        },
		a11y: {
			slideRole: 'link',
		}
    });
}

// js-incomplete-list
if (isElem('.compatibility-b__list.js-incomplete-list')) {
	const listItems = document.querySelectorAll('.compatibility-b__list.js-incomplete-list');

	for (const $item of listItems) {
		incompleteList($item, {
			btnClasses: "compatibility-b__toggle",
			positionToggle: 'inside',
			moreBtnContent: `
				<span>
					Еще
				</span>
				${toSvgToggle()}
			`,
			lessBtnContent: `
				<span>
					Скрыть
				</span>
				${toSvgToggle()}
			`,
		});
	}

	function toSvgToggle() {
		return `
				<svg svg viewBox = "0 0 44 26" xmlns = "http://www.w3.org/2000/svg" >
					<path d="M22.0001 25.2867C22.7727 25.2867 23.5452 24.9917 24.1343 24.4029L42.6703 5.86673C43.8494 4.6876 43.8494 2.77584 42.6703 1.59719C41.4916 0.418532 39.5802 0.418532 38.401 1.59719L22.0001 17.999L5.59914 1.59776C4.42001 0.419108 2.50882 0.419109 1.33026 1.59776C0.150555 2.77642 0.150555 4.68818 1.33026 5.86731L19.866 24.4035C20.4553 24.9924 21.2278 25.2867 22.0001 25.2867Z" fill="inherit" />
				</svg>
				`
	}
}

// number slider
if (isElem('.number-slider')) {
	const numberSliders = document.querySelectorAll('.number-slider');

	for (const slider of numberSliders) {
		numberSlider(slider);
	}
}

// gallery slider
if (isElem('.gallery')) {
	const $galleries = document.querySelectorAll('.gallery');

	for (const $gallery of $galleries) {
		gallery($gallery);
	}
}

if (isElem('.sv-slider')) {
	for (const item of document.querySelectorAll('.sv-slider')) {
		const section = item.closest('section');
		if (!section) continue;
		new Swiper(item, {
			navigation: {
				nextEl: section.querySelector('.next-wrapper'),
				prevEl: section.querySelector('.prev-wrapper')
			},
			slideToClickedSlide: false,
			slidesPerView: 'auto',
			spaceBetween: 36,
			slidesPerGroup: 1,
			touchRatio: 1,
			initialSlide: 0,
			grabCursor: true,
			speed: 800,
			breakpoints: {
				// when window width is >= 320px
				0: {
					spaceBetween: 20
				},
				400: {
					spaceBetween: 20
				},
				// when window width is >= 480px
				1000: {
					spaceBetween: 20
				},
				// when window width is >= 640px
				1250: {
					spaceBetween: 36
				}
			}
		})
	}
}

/****** CUSTOM PLUGIN ******/
{
	let isOpen = false;

	document.addEventListener('click', function (e) {
		if (e.target.closest('.search__toggler-head')) {
			const parent = e.target.closest('.search__toggler');
			parent.classList.toggle('open');

			isOpen = parent.classList.contains('open');
		} else if (isOpen && !e.target.closest('.search__toggler-head')) {
			for (const item of document.querySelectorAll('.search__toggler')) {
				item.classList.remove('open');
			}
		}
	});

	$(document).on('tabs:change', function(e) {
		const $activeTabBtn = $(e.target).find(`[data-tab].active`);

		if ($activeTabBtn.length) {
			const textContent = $activeTabBtn.text();

			$('.search__toggler-value').each((_, item) => {
				item.textContent = textContent;
			});
		}
	})
}

(function () {
	function findIndex($obj, $item) {
		let index = null;

		$obj.each((i, item) => {
			if (item === $item[0]) {
				index = i;
			}
		});

		return index;
	}

	function initTabsItem($tabs, $tabsItemActive) {
		let dataTabs = $tabs.attr('data-tabs');
		dataTabs = dataTabs.split(/,\s*/)[0];

		if (dataTabs) {
			const $itemsTabs = $tabs.find('[data-tab]');

			$itemsTabs.each(function (i) {
				const $sectionsTabs = $(`[data-tabs="${dataTabs}, ${i}"]`);
				const index = findIndex($itemsTabs, $tabsItemActive);
				const $unloadedSrc = $sectionsTabs.find('[data-src]');

				if (index !== i) {
					$sectionsTabs.attr('hidden', true);
				} else {
					const $displayedTabs = $(`[data-tabs="${dataTabs}, ${index}"]`);
					$displayedTabs.removeAttr('hidden');
					const $itemsTabs = $displayedTabs.find('[data-tab]');
					$itemsTabs.removeClass('active');
					$itemsTabs.eq(index).addClass('active');


					if ($unloadedSrc.length) {
						$unloadedSrc.each((i, item) => {
							const src = $(item).data('src');

							$(item).attr('src', src).removeAttr('data-src');
						});
					}
				}
			});
		}

		$tabs.trigger('tabs:change');
	}

	$('[data-tabs]').each(function () {
		const $tabs = $(this);
		let $tabsItemActive = $tabs.find('[data-tab].active');

		if ($tabsItemActive.length !== 1) {
			const $tabsItems = $tabs.find('[data-tab]');

			$tabsItems.removeClass('active');
			$tabsItems.eq(0).addClass('active');
			$tabsItemActive = $tabsItems.eq(0);
		}

		initTabsItem($tabs, $tabsItemActive);

		$tabs.trigger("tabs:init");
	});

	$(document).on('click', '[data-tab]', function () {
		const $tabsItem = $(this);
		const $tabs = $tabsItem.closest('[data-tabs]');
		const $tabsItems = $tabs.find('[data-tab]');

		$tabsItems.not($tabsItem).removeClass('active');
		$tabsItem.addClass('active');

		initTabsItem($tabs, $tabsItem);
	});
}());

//fixed header
if (isElem('header')) {
	let fixedHeader = showHeader('header');

	function showHeader(el) {
		const $el = (typeof el === 'string') ? document.querySelector(el) : el;
		const htmlEl = document.documentElement;
		let offsetTopEl = $el.offsetHeight;
		let isFixed = false;

		window.addEventListener('scroll', function () {
			if (window.pageYOffset > offsetTopEl + 40) {
				show();
			} else if (window.pageYOffset < offsetTopEl / 2) {
				fixed();
			}
		}, {})

		window.addEventListener('resize', function () {
			offsetTopEl = $el.offsetHeight;
		})

		function show() {
			if (isFixed) return;

			htmlEl.style.paddingTop = $el.offsetHeight + "px";
			$el.classList.add('fixed');
			isFixed = true;
		}

		function fixed() {
			if (!isFixed) return;

			$el.classList.remove('fixed');
			htmlEl.style.paddingTop = '';
			isFixed = false;
		}

		return {
			show,
			fixed,
		}
	}
}

//Hamburger открытия мобильного меню
if (isElem('.header__hamburger')) {

	const hamburgerClassName = '.header__hamburger';
	const burgerBlockClassName = '.header__burger';
	const burgerInnerClassName = '.header__burger-inner';
	const $body = document.querySelector('body');
	const $header = document.querySelector('header');
	const $hamburger = document.querySelector(hamburgerClassName);
	const $burgerBlock = document.querySelector(burgerBlockClassName);
	const $burgerInner = document.querySelector(burgerInnerClassName);

	document.addEventListener('click', function (e) {
		if (e.target.closest(hamburgerClassName)) {
			const offsetRight = window.innerWidth - $body.offsetWidth;
			$hamburger.classList.toggle('active');

			let isActive = $hamburger.classList.contains('active');
			$burgerBlock.classList[isActive ? 'add' : 'remove']('open');
			$burgerBlock.style.maxHeight = (isActive) ? `calc(100vh - ${$header.offsetHeight}px)` : '';
			$body.style.overflow = (isActive) ? 'hidden' : '';
		} else if ($burgerBlock.classList.contains('open') && !e.target.closest(burgerBlockClassName)) {
			$hamburger.classList.remove('active');
			$burgerBlock.classList.remove('open');
			$body.style.overflow = '';
		}
	});

	window.addEventListener('resize', function () {
		if (window.innerWidth > 1230 && $burgerBlock.classList.contains('open')) {
			$hamburger.classList.remove('active');
			$burgerBlock.classList.remove('open');
			$body.style.overflow = '';
			document.documentElement.style.paddingRight = '';
		}
	});
}

// search
if (isElem('[data-search-toggle]') && isElem('[data-search-panel]')) {
	const panelSelector = '[data-search-panel]';
	const searchBtnSelector = '[data-search-toggle]';
	// const closePanelSelector = '[data-search-close]';
	const $searchPanels = document.querySelectorAll(panelSelector);

	const toggleClass = 'open';

	document.addEventListener('click', function (e) {
		if (e.target.closest(searchBtnSelector)) {
			let $searchInput;
			for	(const $item of $searchPanels) {
				$searchInput = $item.querySelector('.search__input');
				$item.classList.toggle(toggleClass);
			}
			$searchInput.focus();
		}
		// else if (e.target.closest(closePanelSelector)
		// 	|| (!e.target.closest(panelSelector) && document.querySelector(`[data-search-panel].${toggleClass}`))) {
		// 	for	(const $item of $searchPanels) {
		// 		$item.classList.toggle(toggleClass);
		// 	}
		// }
	});
}

// под меню с гамбургером внутри основного меню
if (isElem('.menu__item--drop')) {
	const menuDrop = document.querySelector('.menu__item--drop');
	const toggle = menuDrop.querySelector('.menu__item-toggle');
	const linkbtn = menuDrop.querySelector('.menu__item-toggle ~ .menu__link');
	const itemMenuList = document.querySelectorAll('.menu__item:not(.menu__item--drop)');


	toggle.addEventListener('click', function () {
		toggle.classList.toggle('active');
		menuDrop.classList.toggle('active');
	});

	linkbtn.addEventListener('click', function () {
		toggle.classList.toggle('active');
		menuDrop.classList.toggle('active');
	});

	document.addEventListener('click', function (ev) {
		if (!ev.target.closest('.menu__item--drop')) {
			if (menuDrop.classList.contains('active')) {
				toggle.classList.remove('active');
				menuDrop.classList.remove('active');
			}
		}
	})
}

// bTabs
if (isElem('.b-tabs')) {
	const tabs = document.querySelectorAll('.b-tabs');

	for (const tab of tabs) {

		bTabs(tab);
	}
}

// window modal
if (isElem('.v-modal')) {
	modalWindow();
}

document.addEventListener('click', function(e) {
    if (e.target.closest('.marquiz-pops')) {
        console.log('Clicked on .marquiz-pops element');
        if (typeof ym === 'function') {
            ym(53189173, 'reachGoal', 'marquiz-start');
            console.log('Yandex Metrika goal "marquiz-start" sent');
        } else {
            console.warn('Yandex Metrika (ym) is not available');
        }
    }
});

// js-selection-scrollable
(function () {
	if (isElem('.js-selection-brand')) {

		const select = document.querySelector('.js-selection-brand');
		const btn = document.querySelector('.js-selection-action');
		const tableBlockWrap = document.querySelector('.js-brand-tables');
		const tableBlocks = tableBlockWrap.querySelectorAll('.js-brand-tables > *');

		for (const block of tableBlocks) {
			block.classList.add('hidden');
		}

		btn.addEventListener('click', function () {
			if (select.value === '') return false;

			const hash = '#' + select.value;
			const section = tableBlockWrap.querySelector(hash);

			for (const block of tableBlocks) {
				block.classList.add('hidden');
			}

			if (!section) return;

			section.classList.remove('hidden');
		})
	}
}());

// v-up кнопка вверх
(function () {
	document.querySelector('footer').insertAdjacentHTML('beforeBegin', `
		<div class="v-up"></div>
	`);

	const btnDown = document.querySelector('.v-up');
	let vUpTriggerTimer = 0;

	vUp(btnDown, getScroledWindow);

	btnDown.addEventListener('click', function () {
		scrollingWindow.startAmimationScroll(1);
	});

	window.addEventListener('scroll', function () {
		clearTimeout(vUpTriggerTimer);
		vUpTriggerTimer = setTimeout(() => {
			vUp(btnDown, getScroledWindow);
		}, 200)
	});

	//пролистываине окна вверх при клике на кнопку
	function vUp(btn, scroled) {
		if (scroled() > (window.innerHeight / 2)) {
			btn.classList.add('active');
		} else if (scroled() < (window.innerHeight / 2) || btn.classList.contains('active')) {
			btn.classList.remove('active');
		}
	}

	//на сколько прокручено окно
	function getScroledWindow() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}
}());

//video
(function () {
	findVideos();

	function findVideos() {
		let videos = document.querySelectorAll('.video');

		for (let i = 0; i < videos.length; i++) {
			setupVideo(videos[i]);
		}
	}

	function parseVideoUrl(url) {
		if (url.indexOf('rutube.ru') !== -1) {
			var match = url.match(/rutube\.ru\/video\/([a-f0-9]+)/);
			return { provider: 'rutube', id: match ? match[1] : '' };
		}
		var deletedLength = 'https://youtu.be/'.length;
		return { provider: 'youtube', id: url.substring(deletedLength) };
	}

	// ленивая загрузка видео
	function setupVideo(video) {
		let link = video.querySelector('.video__link');
		const hrefLink = link.href;
		let media = video.querySelector('.video__media');
		let button = video.querySelector('.video__button');
		let parsed = parseVideoUrl(hrefLink);

		if (parsed.provider === 'youtube') {
			media.src = 'https://i.ytimg.com/vi/' + parsed.id + '/maxresdefault.jpg';
		}

		video.addEventListener('click', () => {
			let iframe = createIframe(parsed.provider, parsed.id);

			link.remove();
			button.remove();
			video.appendChild(iframe);
		});

		link.removeAttribute('href');
		video.classList.add('video--enabled');
	}

	function createIframe(provider, id) {
		let iframe = document.createElement('iframe');

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write;');
		iframe.setAttribute('src', generateURL(provider, id));
		iframe.classList.add('video__media');

		return iframe;
	}

	function generateURL(provider, id) {
		if (provider === 'rutube') {
			return 'https://rutube.ru/play/embed/' + id + '?autoplay=true';
		}
		return 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=1&autoplay=1';
	}
}());

/***** FUNCTION PLUGIN ******/

//	modal window
function setModalApplicationName($modal, applicationName) {
	if (!applicationName) return;

	const input = $modal.querySelector('input[name="application_name"]');
	if (!input) return;

	input.value = applicationName;
}

function setModalFormTitle($modal, formTitle) {
	if (!formTitle) return;

	const titleEl = $modal.querySelector('.v-modal__title span');
	if (!titleEl) return;

	if (!titleEl.dataset.originalTitle) {
		titleEl.dataset.originalTitle = titleEl.textContent;
	}
	titleEl.textContent = formTitle;
}

function resetModalFormTitle($modal) {
	const titleEl = $modal.querySelector('.v-modal__title span');
	if (!titleEl) return;
	if (!titleEl.dataset.originalTitle) return;

	titleEl.textContent = titleEl.dataset.originalTitle;
}

function setModalApplicationPrice($modal, applicationPrice) {
	if (!applicationPrice) return;

	const input = $modal.querySelector('input[name="application_price"]');
	if (!input) return;

	input.value = applicationPrice;
}

function modalWindow() {
	const body = document.querySelector('body'),
		modalEls = document.querySelectorAll('.v-modal'),
		btnOpenClassName = "js-openModal",
		btnCloseClassName = 'js-closeModal';

	document.addEventListener('click', function (e) {
		const trigger = e.target.closest(`.${btnOpenClassName}`);
		if (trigger && trigger.dataset.typeModal) {
			e.preventDefault();
			const typeModal = trigger.dataset['typeModal'];

			for (let $modal of modalEls) {

				if ($modal.dataset && $modal.dataset['typeModal'] === typeModal) {
					$modal.classList.add('active');

					setModalApplicationName($modal, trigger.dataset.applicationName);
					setModalFormTitle($modal, trigger.dataset.formTitle);
					setModalApplicationPrice($modal, trigger.dataset.applicationPrice);

					e.preventDefault();
					const scrollBarWidth = window.innerWidth - body.offsetWidth;
					body.style.overflow = 'hidden';
					body.style.paddingRight = scrollBarWidth + "px";
					break;
				}
			}
		}
		else if (e.target.classList.contains('v-modal__inner') || e.target.closest(`.${btnCloseClassName}`)) {
			const $modal = e.target.closest('.v-modal');
			$modal.classList.remove('active');
			body.style.overflow = '';
			body.style.paddingRight = "";

			resetModalFormTitle($modal);

			const isModalApplication = e.target.closest('.v-modal[data-type-modal="application"]');
			if (isModalApplication) {
				// закрываем все активные попапы
				const activeModals = document.querySelectorAll('.v-modal.active');
				for (let $modal of activeModals) {
					$modal.classList.remove('active');
				}
			}

		}
	});
}

// Меню дерево, применятся непосредственно
// на DOM эелементе ul
// function treeeMenu(selector) {
// 	const $el = (typeof selector === 'string') ? document.querySelector(selector) : selector;
// 	const isAccordionType = $el.dataset.typeMenu === 'accordion';
// 	const openItemClass = 'js-tree-menu__item--open';

// 	const setings = {
// 		openItemClass: 'js-tree-menu__item--open',
// 		openSelector: '.js-tree-menu__btn'
// 	}

// 	$el.onclick = function (e) {
// 		const $btn = e.target.closest(setings.openSelector);

// 		if (!$btn) return;

// 		let $parentElement = $btn.closest('li');
// 		let $childrenContainer = $parentElement.querySelector('ul');

// 		if (!$childrenContainer) return;

// 		const isOpenCurrentItem = $parentElement.classList.contains(setings.openItemClass);

// 		if (!isOpenCurrentItem && $el.querySelector('.js-tree-menu__item--open')) {
// 			$el.querySelector('.js-tree-menu__item--open').classList.remove('js-tree-menu__item--open');
// 			$el.querySelector('.js-tree-menu__btn.active').classList.remove('active');
// 		}

// 		$parentElement.classList[isOpenCurrentItem ? 'remove' : 'add'](setings.openItemClass);
// 		$btn.classList[isOpenCurrentItem ? 'remove' : 'add']('active');
// 		$childrenContainer.style.minHeight = !isOpenCurrentItem ? $childrenContainer.scrollHeight + "px" : "";
// 	}
// }

let treeMenu = (function () {
	let $menus = document.querySelectorAll('.js-tree-menu');

	for (let i = 0; i < $menus.length; i++) {
		setupTreeMenu($menus[i]);
	}

	function setupTreeMenu(selector, options = {}) {
		const $el = (typeof selector === 'string') ? document.querySelector(selector) : selector;
		let opens = false;
		const isAccordionType = $el.dataset.typeMenu === 'accordion';

		const setings = {
			openItemClass: 'js-tree-menu__item--open',
			openSelector: '.js-tree-menu__btn',
			linkOpenSelector: 'a:not([href])'
		}

		let $mobileCloseItem = $el.querySelectorAll('.js-tree-menu__item--mobile-close');

		for (let openItem of document.getElementsByClassName(setings.openItemClass)) {
			const $childrenUl = openItem.querySelector('ul');
			$childrenUl.style.height = 'auto';
			$childrenUl.style.minHeight = 'auto';
		}

		$el.addEventListener('click', function (e) {

			// клик по ссылке без href
			const $linkWithoutHref = e.target.closest(setings.linkOpenSelector);

			let $btn;

			if (
				$linkWithoutHref?.nextElementSibling?.matches(setings.openSelector)
			) {
				$btn = $linkWithoutHref.nextElementSibling;
			} else {
				$btn = e.target.closest(setings.openSelector);
			}

			if (!$btn || opens) return;

			let $parentElement = $btn.closest('li');
			let $childrenContainer = $parentElement.querySelector('ul');

			if (!$childrenContainer) return;

			opens = true;
			const isOpenItem = $parentElement.classList.contains(setings.openItemClass);

			if (isAccordionType && window.matchMedia(`(min-width: 1450px)`).matches) {
				let activeThisLevelEl = $parentElement.parentElement.querySelector('.js-tree-menu__item--open');

				if (activeThisLevelEl) {
					const childrenUl = activeThisLevelEl.querySelector('ul');
					activeThisLevelEl.classList.remove('js-tree-menu__item--open');

					childrenUl.style.height = '';
				}
			}

			// if (!isAccordionType && $el.querySelector('.js-tree-menu__item--open')) {
			// 	$el.querySelector('.js-tree-menu__item--open').classList.remove('js-tree-menu__item--open');
			// 	$el.querySelector('.js-tree-menu__btn.active').classList.remove('active');
			// }

			$parentElement.classList[isOpenItem ? 'remove' : 'add'](setings.openItemClass);
			$childrenContainer.style.minHeight = isOpenItem ? $childrenContainer.scrollHeight + "px" : "";
			setTimeout(function () {
				$childrenContainer.style.minHeight = !isOpenItem ? $childrenContainer.scrollHeight + "px" : "";
			}, 10)

			if (isOpenItem) {
				$childrenContainer.style.height = '';
				opens = false;
			} else {
				setTimeout(() => {
					$childrenContainer.style.height = 'auto';
					$childrenContainer.style.minHeight = 'auto';
					opens = false;
				}, 500)
			}
		})
	}
}());

// анимация скрола окна браузера
function scrollWindow() {
	if (scrollWindow.instance) {
		return func.instance;
	}

	let scrollAnimationId = 0;
	let currentScroll = window.pageYOffset;
	let scrolls = false;

	function _startAmimationScroll(newScrollY, callback) {
		if (!scrolls) {
			currentScroll = window.pageYOffset;
			scrolls = true;
		}

		scrollAnimationId++;
		const deltaScroll = (newScrollY - currentScroll);

		currentScroll += deltaScroll * 0.15;
		window.scrollTo(0, currentScroll);

		if (Math.abs(deltaScroll) > 5) {
			scrollAnimationId = window.requestAnimationFrame(function () {
				_startAmimationScroll(newScrollY);
			})
		} else {
			window.scrollTo(0, newScrollY);
			stopAnimationScroll();

			if (typeof callback === 'function') callback();
		}
	}

	function stopAnimationScroll() {
		window.cancelAnimationFrame(scrollAnimationId);
		scrollAnimationId = undefined;
		scrolls = false;
	}

	return scrollWindow.instance = {
		get scrollAnimationId() {
			return scrollAnimationId;
		},
		startAmimationScroll() {
			stopAnimationScroll();
			_startAmimationScroll.apply(this, arguments);
		},
		stopAnimationScroll,
	}
}

// number slider
function numberSlider(selector) {
	const $el = typeof selector === 'string' ? document.querySelector(selector)
		: selector,
		$input = $el.querySelector('.js-number-slider-input'),
		minValue = +$input.getAttribute('min') || 1;

	$el.addEventListener('click', clickHander);

	function clickHander(e) {
		if (e.target.closest('.js-number-slider-add')) {
			const old = +parseFloat($input.value) + 1;
			$input.value = isFinite(old) ? old : minValue;
		} else if (e.target.closest('.js-number-slider-reduce')) {
			let oldValue = parseFloat($input.value);
			if (isNaN(oldValue)) return $input.value = minValue;
			$input.value = (oldValue - 1 <= minValue) ? minValue : --oldValue;
		}
	}
}

// incomplete list
function incompleteList(selector, options) {
	let $el = (typeof selector === 'string') ? document.querySelector(selector) : selector,
		$hiddenEls,
		$toggle,
		visibleCount;

	const baseClass = 'js-incomplete';
	const listClass = baseClass + '-list';
	const itemClass = baseClass + '-item';
	const expandedListClass = listClass + '--expanded';
	const hiddenItemClass = itemClass + '--hide';
	const btnToggleClass = baseClass + '-toggle';
	const btnToggleMoreClass = btnToggleClass + '--more';

	const settings = {
		visibleBlocks: 8,
		positionToggle: 'outside',
		moreBtnContent: "Показать все",
		lessBtnContent: "Скрыть",
	}

	Object.assign(settings, options);

	visibleCount = $el.dataset.incompleteNum || settings.visibleBlocks;

	if ($el.children.length <= +visibleCount) return false;

	$hiddenEls = Array.from($el.children).filter(($item, idx) => {
		$item.classList.add(itemClass);
		if (idx > visibleCount - 1) {
			$item.classList.add(hiddenItemClass);
			return $item;
		}
	});

	$toggle = document.createElement('button');
	$toggle.innerHTML = settings.moreBtnContent;
	$toggle.className = btnToggleClass + " " + btnToggleMoreClass;

	if (typeof settings.btnClasses === 'string') {
		$toggle.className = settings.btnClasses + " " + $toggle.className;
	}

	if (settings.positionToggle === 'inside') {
		$el.insertAdjacentElement('beforeend', $toggle);
	} else {
		$el.insertAdjacentElement('aftereend', $toggle);
	}

	$toggle.addEventListener('click', function (e) {
		if ($el.classList.contains(expandedListClass)) {
			$toggle.classList.add(btnToggleMoreClass);
			$el.classList.remove(expandedListClass);
			$hiddenEls.map(item => { item.classList.add(hiddenItemClass) });
			$toggle.innerHTML = settings.moreBtnContent;
		} else {
			$toggle.classList.remove(btnToggleMoreClass);
			$el.classList.add(expandedListClass);
			$hiddenEls.map(item => { item.classList.remove(hiddenItemClass) });
			$toggle.innerHTML = settings.lessBtnContent;
		}
	});
}

// bTabs
function bTabs(target) {
	let _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
		_eventTabsShow,
		_showTab = function (tabsLinkTarget) {
			var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
			tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
			tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.b-tabs__link.active, [data-tab-link].active');
			tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.b-tabs__pane.active, [data-tab-link].active');
			// если следующая вкладка равна активной, то завершаем работу
			if (tabsLinkTarget === tabsLinkActive) return;
			// удаляем классы у текущих активных элементов
			if (tabsLinkActive !== null) tabsLinkActive.classList.remove('active');

			if (tabsPaneShow !== null) tabsPaneShow.classList.remove('active');
			// добавляем классы к элементам (в завимости от выбранной вкладки)
			tabsLinkTarget.classList.add('active');
			tabsPaneTarget.classList.add('active');
			document.dispatchEvent(_eventTabsShow);
		},
		_switchTabTo = function (tabsLinkIndex) {
			var tabsLinks = _elemTabs.querySelectorAll('.b-tabs__link, [data-tab-link]');
			if (tabsLinks.length > 0) {
				if (tabsLinkIndex > tabsLinks.length) {
					tabsLinkIndex = tabsLinks.length;
				} else if (tabsLinkIndex < 1) {
					tabsLinkIndex = 1;
				}
				_showTab(tabsLinks[tabsLinkIndex - 1]);
			}
		};

	_eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

	_elemTabs.addEventListener('click', function (e) {
		var tabsLinkTarget = e.target.closest('.b-tabs__link, [data-tab-link]');
		if (!tabsLinkTarget) return;

		e.preventDefault();
		_showTab(tabsLinkTarget);
	});

	return {
		showTab: function (target) {
			_showTab(target);
		},
		switchTabTo: function (index) {
			_switchTabTo(index);
		}
	}

};

function gallery(selector) {
	const $gallery = (typeof selector === 'string') ? document.querySelector(selector) : selector;

	const $thumbsSlider = $gallery.querySelector('.gallery__thumbs'),
		$fullSlider = $gallery.querySelector('.gallery__slider');


	/* thumbs */
	let galleryThumbs = new Swiper($thumbsSlider, {
		spaceBetween: 20,
		slidesPerView: "auto",
		watchSlidesProgress: true,
		freeMode: {
			enabled: true,
			sticky: true,
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		mousewheel: true,
	});

	let galleryFull = new Swiper($fullSlider, {
		spaceBetween: 10,
		slidesPerView: "auto",
		// autoplay: {
		// 	delay: 5000
		// },
		navigation: {
			prevEl: $fullSlider.parentElement.querySelector('.slider-arr--prev'),
			nextEl: $fullSlider.parentElement.querySelector('.slider-arr--next'),
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});
}

// fixed block
function fixedBlock(selector, option = {}) {
	const $el = (typeof selector === "string") ? document.querySelector(selector)
		: selector;
	let $offsetParent = null;
	const $header = document.querySelector('.header');
	let heightHeader = $header.offsetHeight;

	let pointonYpositioning = 0;
	let topPosEl, widthEl = null;

	const parametrs = {
		init() {
			$el.style.top = `${heightHeader + 30}px`;
			// $offsetParent = $el.offsetParent;

			// if (!$offsetParent) return;

			// topPosEl = _getTopOffset($el); // начальное положение сверху относительно страницы
			// widthEl = $offsetParent.clientWidth;
			// headerHeight = $header.offsetHeight;

			// scrollingHandler();
			// window.addEventListener('resize', resizingHandler);
			window.addEventListener('scroll', scrollingHandler);
		},

		destroy() {
			// window.removeEventListener('resize', resizingHandler);
			window.removeEventListener('scroll', scrollingHandler);

			// pointonYpositioning = 0;
			// topPosEl, widthEl, headerHeight = null;

			// if ($offsetParent.classList.contains('is-fixed')) $offsetParent.classList.remove('is-fixed')
			// $el.classList.contains('positioned');
			// $el.className = $el.className.replace(/fixed|positioned/g, '');
			// $el.style.cssText = '';
		}
	}

	function resizingHandler(e) {
		widthEl = $offsetParent.clientWidth;
		headerHeight = $header.offsetHeight;

		$el.style.cssText = `
			width: ${widthEl}px;
		`;

		scrollingHandler();
	}

	function scrollingHandler() {
		if (heightHeader == $header.offsetHeight) return;
		heightHeader = $header.offsetHeight;
		$el.style.top = `${heightHeader + 30}px`;
		// if (topPosEl < (window.pageYOffset + headerHeight)) {

		// 	if (!$offsetParent.classList.contains('is-fixed')) {
		// 		$el.style.cssText = `
		// 			top: ${headerHeight}px;
		// 			width: ${widthEl}px;
		// 		`;

		// 		$offsetParent.classList.add('is-fixed');
		// 		$el.classList.add('fixed');
		// 	}

		// 	if (_getTopOffsetFromBottom($el) > _getTopOffsetFromBottom($offsetParent)) {
		// 		if (($el.classList.contains('positioned'))) return;
		// 		pointonYpositioning = window.pageYOffset;

		// 		$el.classList.add('positioned');
		// 		$el.classList.remove('fixed');

		// 		$el.style.cssText = `
		// 			position: absolute;
		// 			top: auto;
		// 			bottom: 0px;
		// 			width: ${widthEl}px;
		// 		`;
		// 	} else if ($el.classList.contains('positioned') && window.pageYOffset <= pointonYpositioning) {
		// 		$el.classList.remove('positioned')
		// 		$el.classList.add('fixed');
		// 		$el.style.cssText = `
		// 			top: ${headerHeight}px;
		// 			width: ${widthEl}px;
		// 		`;
		// 	}

		// } else if ($offsetParent.classList.contains('is-fixed')) {
		// 	$el.classList.remove('fixed');
		// 	$offsetParent.classList.remove('is-fixed');
		// }
	}

	function _getTopOffset(e) {
		var y = 0;
		do { y += e.offsetTop; } while (e = e.offsetParent);
		return y;
	}

	function _getTopOffsetFromBottom($el) {
		return $el.getBoundingClientRect().bottom;
	}

	return parametrs
}

// старая версия блока добавления в корзину на странице товара
if (isElem('#product_addtocart_form')) {
	const form = document.getElementById('product_addtocart_form');

	const onClick = () => {

		const productPrice = form.querySelector('.new__ms2_form .product__price');
		if (!productPrice) return;

		let sumPriceCur = 0;
		let sumPriceOld = 0;

		const productPriceCur = +(productPrice.getAttribute('data-price')?.replace(/ /g, '') || 0);
		const productPriceOld = +(productPrice.getAttribute('data-oldprice')?.replace(/ /g, '') || 0) || productPriceCur;

		const count = (form.querySelector('input[name="count"')?.value || 1);

		sumPriceCur += productPriceCur * count;
		sumPriceOld += productPriceOld * count;

		const options = form.querySelectorAll('.recom__products-list input[type=checkbox][name^=options]:checked');

		for (const option of options) {
			const optionPriceCur = +(option.getAttribute('data-price')?.replace(/ /g, '') || 0)
			const optionPriceOld = +(option.getAttribute('data-oldprice')?.replace(/ /g, '') || 0) || optionPriceCur;
			sumPriceOld += optionPriceOld;
			sumPriceCur += optionPriceCur;
		}

		const discount = Math.round((1 - sumPriceCur / sumPriceOld) * 100);

		let res = ``;

        if (sumPriceCur === 0) {
            return;
        }

		if (sumPriceCur !== sumPriceOld) {
			res += `<span class="old_price">${formatPrice(sumPriceOld)}</span>`;
		}
		res += ` <span>${formatPrice(sumPriceCur)}</span> ₽`;
		if (discount) {
			res += ` <span class="price_discount">-${discount}%</span>`
		}

		productPrice.innerHTML = res;
	}

	form.addEventListener('click', onClick);

	$( document ).ready(() => {
		setTimeout(onClick, 1000);
	});

}

// актуальная версия блока добавления в корзину на странице товара
if (isElem('[data-product-addcart-form]')) {
	const form = document.querySelector('[data-product-addcart-form]');

	const onClick = (e) => {

		const inputCount = form.querySelector('input[name="count"');

		// увеличение и уменьшение стоимости
		if (
			inputCount
			&& e?.target?.closest('button[name=product_price]')
		) {
			const button = e.target.matches('button[name=product_price]');
			inputCount.value = Math.max((+inputCount.value || 1) + 1 * (e.target.value === 'plus' ? 1 : -1), 1);
		}

		const priceContainer = form.querySelector('[data-product-addcart-form-price]');

		if (!priceContainer) return;

		let sumPriceCur = 0;
		let sumPriceOld = 0;

		const productPriceCur = +(priceContainer.getAttribute('data-price')?.replace(/ /g, '') || 0);
		const productPriceOld = +(priceContainer.getAttribute('data-oldprice')?.replace(/ /g, '') || 0) || productPriceCur;

		const count = (+inputCount?.value || 1);

		sumPriceCur += productPriceCur * count;
		sumPriceOld += productPriceOld * count;

		const options = form.querySelectorAll('input[type=checkbox][name^=options]:checked');

		for (const option of options) {
			const optionPriceCur = +(option.getAttribute('data-price')?.replace(/ /g, '') || 0)
			const optionPriceOld = +(option.getAttribute('data-oldprice')?.replace(/ /g, '') || 0) || optionPriceCur;
			sumPriceOld += optionPriceOld;
			sumPriceCur += optionPriceCur;
		}

		const discount = Math.round((1 - sumPriceCur / sumPriceOld) * 100);

		let res = ``;

        if (sumPriceCur === 0) {
            return;
        }

		const oldPriceContent = priceContainer.querySelector('[data-item-oldprice]');
		if (oldPriceContent) {
			oldPriceContent.textContent = sumPriceCur !== sumPriceOld
				? formatPrice(sumPriceOld)
				: ''
			;
		}

		const priceContent = priceContainer.querySelector('[data-item-price]');
		if (priceContent) {
			priceContent.textContent = `${formatPrice(sumPriceCur)} ₽`;
		}

		const discountContent = priceContainer.querySelector('[data-item-discount]');
		if (discountContent) {
			discountContent.textContent = discount
				? `-${discount}%`
				: ''
			;
		}

	}

	form.addEventListener('click', onClick);

	$( document ).ready(() => {
		setTimeout(onClick, 1000);
	});

}

if (isElem('.location-b__mapBox')) {

	for (const iframe of document.querySelectorAll('.location-b__mapBox iframe')) {
		const wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'location-b__mapBox-wrapper');
		iframe.parentElement.appendChild(wrapper);
		wrapper.appendChild(iframe);
		wrapper.addEventListener('click', () => {
			wrapper.classList.add('location-b__mapBox-wrapper_clicked');
		});
		wrapper.addEventListener('touchstart', () => {
			wrapper.classList.add('location-b__mapBox-wrapper_touched');
		});
	}

}

if (isElem('[data-showroom-container]')) {
	const container = document.querySelector('[data-showroom-container]');
	const cityRadios = document.querySelectorAll('.location-new input[type="radio"][name="css-tabs"]');
	const cityLabels = document.querySelectorAll('.location-new__tab label');

	cityRadios.forEach(function(radio, index) {
		radio.addEventListener('change', function() {
			const cityName = cityLabels[index]?.textContent?.trim();
			if (cityName) {
				const galleries = container.querySelectorAll('[data-city]');
				galleries.forEach(function(gallery) {
					if (gallery.dataset.city === cityName) {
						gallery.removeAttribute('hidden');
					} else {
						gallery.setAttribute('hidden', '');
					}
				});
			}
		});
	});
}

if (isElem('.portfolio-video__iframe')) {

	for (const wrapper of document.querySelectorAll('.portfolio-video__iframe')) {
		const preview = wrapper.querySelector('.portfolio-video__preview');
		const videoId = wrapper.getAttribute('data-video-id');
		preview && preview.addEventListener('click', () => {
			preview.hidden = true;
			wrapper.insertAdjacentHTML('beforeend', `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
		});
	}

}

if (isElem('[data-video-provider]')) {

	const getEmbedUrl = (provider, videoId) => {
		const urls = {
			youtube: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
			rutube: `https://rutube.ru/play/embed/${videoId}?autoplay=true`
		};
		return urls[provider] || urls.youtube;
	};

	for (const wrapper of document.querySelectorAll('[data-video-provider]')) {
		const preview = wrapper.querySelector('[data-video-preview]');
		const provider = wrapper.getAttribute('data-video-provider');
		const videoId = wrapper.getAttribute('data-video-id');
		preview && preview.addEventListener('click', () => {
			preview.hidden = true;
			wrapper.insertAdjacentHTML('beforeend', `<iframe src="${getEmbedUrl(provider, videoId)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>`);
		});
	}

}

if (isElem('[data-rutube-id]')) {
	for (const el of document.querySelectorAll('[data-rutube-id]')) {
		const rutubeId = el.getAttribute('data-rutube-id');
		fetch(`/api/rutube/${rutubeId}/thumbnail`)
			.then(r => r.json())
			.then(data => {
				if (data.data && data.data.thumbnail_url) {
					el.setAttribute('data-thumb-src', data.data.thumbnail_url);
				}
			})
			.catch(() => {});
	}
}

if (isElem('[data-plug-faq-list]')) {
	const faq = document.querySelector('[data-plug-faq-list]');
	faq.addEventListener('click', e => {
		if (e.target.closest('[data-plug-faq-list-item-header]')) {
			const item = e.target.closest('[data-plug-faq-list-item]');
			const body = item.children[1];
			item.classList.toggle('is-active');
			if (body) {
				if (item.classList.contains('is-active')) {
					body.style.height = '';
					window.requestAnimationFrame(() => {
						const height = body.offsetHeight;
						body.style.height = 0 + 'px';
						window.requestAnimationFrame(() => {
							body.style.height = height + 'px';
						});
					});
				} else {
					const height = body.offsetHeight;
					body.style.height = height + 'px';
					window.requestAnimationFrame(() => {
						body.style.height = 0 + 'px';
					});
				}
			}

		}
	});
}

if (isElem('[data-plug-scroll-hor]')) {
	for (const container of document.querySelectorAll('[data-plug-scroll-hor]')) {
		const content = container.querySelector('[data-plug-scroll-content]');
		const prevBtn = container.querySelector('[data-plug-scroll-prev]');
		const nextBtn = container.querySelector('[data-plug-scroll-next]');

		if (!content || !prevBtn || !nextBtn) continue;

		const checkScroll = () => {
			const { scrollLeft, scrollWidth, clientWidth } = content;

			// Проверяем, можно ли скроллить влево
			if (scrollLeft > 0) {
				prevBtn.classList.add('active');
			} else {
				prevBtn.classList.remove('active');
			}

			// Проверяем, можно ли скроллить вправо
			if (scrollLeft + clientWidth < scrollWidth) {
				nextBtn.classList.add('active');
			} else {
				nextBtn.classList.remove('active');
			}
		};

		// Обработчики для кнопок
		prevBtn.addEventListener('click', () => {
			content.scrollBy({
				left: -200,
				behavior: 'smooth'
			});
		});

		nextBtn.addEventListener('click', () => {
			content.scrollBy({
				left: 200,
				behavior: 'smooth'
			});
		});

		// Проверяем состояние скролла при загрузке и при скролле
		content.addEventListener('scroll', checkScroll);
		window.addEventListener('resize', checkScroll);
		checkScroll(); // Начальная проверка
	}
}

if (isElem('[data-plug-copy]')) {
	for (const item of document.querySelectorAll('[data-plug-copy]')) {

		item.addEventListener('click', e => {
			const text = item.getAttribute('data-plug-copy');
			const hintElement = item.querySelector('[data-plug-copy-hint]');
			const originalHintText = hintElement ? hintElement.textContent : 'Скопировать';

			if (text && !item.classList.contains('enabled')) {
				navigator.clipboard.writeText(text).then(function() {
					console.log('Async: Copying to clipboard was successful!');

					// Обновляем текст подсказки при успешном копировании
					if (hintElement) {
						hintElement.textContent = 'Скопировано';

						// Добавляем класс enabled
						item.classList.add('enabled');

						setTimeout(() => {
							hintElement.textContent = originalHintText;
							item.classList.remove('enabled');
						}, 3000);

					}
				}, function(err) {
					console.error('Async: Could not copy text: ', err);

					// Обновляем текст подсказки при ошибке
					if (hintElement) {
						hintElement.textContent = 'Не удалось скопировать';

						// Возвращаем исходный текст через 3 секунды
						setTimeout(() => {
							hintElement.textContent = originalHintText;
						}, 3000);
					}
				});
			}
		});
	}
}

/**
 * Плагин для адаптивного перемещения элементов
 *
 * Принцип работы:
 * 1. Находим все элементы с атрибутом data-plug-adaptive-move
 * 2. У каждого элемента должен быть JSON-конфиг в атрибуте, например:
 *    data-plug-adaptive-move='{
 *      "selector": ".header-top-menu li:nth-child(n+4)",
 *      "media": {
 *        "(max-width: 1100px)": "default",
 *        "(min-width: 1101px)": "this"
 *      }
 *    }'
 *
 * 3. При инициализации сохраняем ссылки на:
 *    - Элементы, найденные по selector
 *    - Их изначальных родителей
 *
 * 4. При загрузке и изменении размера окна:
 *    - Проверяем все медиа-запросы
 *    - Если запрос совпадает:
 *      * default - возвращаем элементы к изначальным родителям
 *      * this - перемещаем элементы в родителя с data-plug-adaptive-move
 */

if (isElem('[data-plug-adaptive-move]')) {
    const adaptiveElements = document.querySelectorAll('[data-plug-adaptive-move]');

    // Store original parents and elements for each adaptive block
    const adaptiveBlocks = [];

    adaptiveElements.forEach(adaptiveParent => {
        try {
            const config = JSON.parse(adaptiveParent.dataset.plugAdaptiveMove);
            const elements = document.querySelectorAll(config.selector);

            // Store original parents for each element
            const elementData = Array.from(elements).map(el => ({
                element: el,
                originalParent: el.parentNode
            }));

            adaptiveBlocks.push({
                parent: adaptiveParent,
                config: config,
                elements: elementData
            });
        } catch (e) {
            console.error('Invalid adaptive move configuration:', e);
        }
    });

    function handleAdaptiveMove() {
        adaptiveBlocks.forEach(block => {
            const { parent, config, elements } = block;

            // Check each media query
            for (const [mediaQuery, action] of Object.entries(config.media)) {
                if (window.matchMedia(mediaQuery).matches) {
                    elements.forEach(({ element, originalParent }) => {
                        if (action === 'default') {
                            // Move to original parent
                            if (element.parentNode !== originalParent) {
                                originalParent.appendChild(element);
                            }
                        } else if (action === 'this') {
                            // Move to adaptive parent
                            if (element.parentNode !== parent) {
                                parent.appendChild(element);
                            }
                        }
                    });
                    break; // Stop checking other media queries once we find a match
                }
            }
        });
    }

    // Initial check
    handleAdaptiveMove();

    // Listen for window resize
    window.addEventListener('resize', handleAdaptiveMove);
}

if (isElem('[data-plug-toggle-class]')) {
	for (const item of document.querySelectorAll('[data-plug-toggle-class]')) {
		item.addEventListener('click', e => {
			let options = {};
			try {
				options = JSON.parse(item.getAttribute('data-plug-toggle-class'))
			} catch (error) {
				console.error(error);
			}

			let target = null;

			if (options.target) {
				if (options.target === 'parent') {
					target = item.parentElement;
				} else if (options.target === 'self') {
					target = item;
				} else {
					target = document.querySelector(options.target);
				}
			} else if (options.closest) {
				target = item.closest(options.closest);
			}

			if (target && options.class) {
				target.classList.toggle(options.class);
			}

		});
	}
}

if (isElem('[data-plug-tabs]')) {
	for (const item of document.querySelectorAll('[data-plug-tabs]')) {
		const tabs = item.querySelectorAll('[data-plug-tab]');

		tabs.forEach(tab => {
			tab.addEventListener('click', () => {
				if (tab.classList.contains('active')) return;

				// Remove active class from all tabs in parent
				tabs.forEach(t => t.classList.remove('active'));

				// Add active class to clicked tab
				tab.classList.add('active');

				// Get tab content id
				const contentId = tab.getAttribute('data-plug-tab');

				// Find and activate corresponding content
				const contents = item.querySelectorAll('[data-plug-tab-content]');
				contents.forEach(content => {
					if (content.getAttribute('data-plug-tab-content') === contentId) {
						// Remove active class from siblings
						contents.forEach(c => c.classList.remove('active'));
						// Add active class to matching content
						content.classList.add('active');

						// Lazy load: convert data-src to src for iframes
						const lazyElements = content.querySelectorAll('[data-src]');
						lazyElements.forEach(el => {
							el.setAttribute('src', el.getAttribute('data-src'));
							el.removeAttribute('data-src');
						});
					}
				});
			});
		});
	}
}

// перемещаем теги к форме фильтров на мобильном
if (isElem('#cont_txt2') && window?.screen?.width < 1024) {
	const content = document.querySelector('#cont_txt2');
	const target = document.querySelector('#cont_txt2_mobile_target');
	if (content && target) {
		target.appendChild(content);
	}
}

// Поиск по фильтру (checkbox_search)
if (isElem('[data-filter-search]')) {
	for (const input of document.querySelectorAll('[data-filter-search]')) {
		input.addEventListener('input', function () {
			const query = this.value.toLowerCase().trim();
			const fieldset = this.closest('fieldset');
			if (!fieldset) return;

			const labels = fieldset.querySelectorAll('[data-label]');
			var visibleCount = 0;
			for (const label of labels) {
				const text = (label.getAttribute('data-label') || '').toLowerCase();
				const match = query === '' || text.includes(query);
				label.style.display = match ? '' : 'none';
				if (match) visibleCount++;
			}

			const showMoreBtn = fieldset.querySelector('[data-filter-show-more]');
			if (showMoreBtn) {
				var btnWrapper = showMoreBtn.closest('div');
				if (query !== '') {
					if (btnWrapper) btnWrapper.style.display = 'none';
					for (const label of fieldset.querySelectorAll('.filter-hidden')) {
						label.classList.remove('tw-hidden');
						label.style.opacity = '1';
						label.style.maxHeight = '';
					}
				} else {
					if (btnWrapper) btnWrapper.style.display = '';
					var isExpanded = showMoreBtn.textContent === 'Скрыть';
					if (!isExpanded) {
						for (const label of fieldset.querySelectorAll('.filter-hidden')) {
							label.classList.add('tw-hidden');
							label.style.opacity = '';
							label.style.maxHeight = '';
						}
					}
				}
			}
		});
	}
}

// "Показать все" / "Скрыть" для фильтров с visibleCount
if (isElem('[data-filter-show-more]')) {
	for (const btn of document.querySelectorAll('[data-filter-show-more]')) {
		btn.addEventListener('click', function (e) {
			e.preventDefault();
			const fieldset = this.closest('fieldset');
			if (!fieldset) return;

			const hiddenItems = fieldset.querySelectorAll('.filter-hidden');
			const isHidden = hiddenItems.length > 0 && hiddenItems[0].classList.contains('tw-hidden');

			if (isHidden) {
				for (const item of hiddenItems) {
					item.classList.remove('tw-hidden');
					item.style.opacity = '0';
					item.style.maxHeight = '0';
					item.style.overflow = 'hidden';
					item.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
					requestAnimationFrame(function () {
						item.style.opacity = '1';
						item.style.maxHeight = '50px';
					});
				}
			} else {
				var filterSection = fieldset.closest('[data-filter-section]') || fieldset.parentElement;
				for (const item of hiddenItems) {
					item.style.opacity = '0';
					item.style.maxHeight = '0';
				}
				setTimeout(function () {
					for (const item of hiddenItems) {
						item.classList.add('tw-hidden');
						item.style.opacity = '';
						item.style.maxHeight = '';
						item.style.overflow = '';
						item.style.transition = '';
					}
					if (filterSection) {
						filterSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
					}
				}, 300);
			}

			this.textContent = isHidden ? 'Скрыть' : 'Показать все';
		});
	}
}

// Сортировка каталога через кастомный dropdown → mSearch2
if (isElem('[data-sort-select]')) {
	(function () {
		var root = document.querySelector('[data-sort-select]');
		var trigger = root.querySelector('[data-selected]');
		var label = root.querySelector('[data-label]');
		var options = root.querySelector('[data-options]');
		var arrow = root.querySelector('[data-arrow]');
		var input = root.querySelector('[data-select-output]');

		var urlSort = new URLSearchParams(window.location.search).get('sort');
		if (urlSort) {
			input.value = urlSort;
			var matchOpt = options.querySelector('li[data-value="' + urlSort + '"]');
			if (matchOpt) {
				label.textContent = matchOpt.textContent.trim();
			}
		}

		var arrowPath = arrow.querySelector('path');

		var updateVisibleOptions = function () {
			options.querySelectorAll('li').forEach(function (opt) {
				var isActive = opt.dataset.value === input.value;
				opt.classList.toggle('tw-text-[#2D8EFF]', isActive);
				opt.classList.toggle('tw-text-[#313131]', !isActive);
			});
		};

		updateVisibleOptions();

		trigger.addEventListener('click', function () {
			var isOpen = !options.classList.contains('tw-hidden');
			arrow.classList.toggle('tw-rotate-180', !isOpen);
			options.classList.toggle('tw-hidden');
			arrowPath.setAttribute('fill', isOpen ? '#B3B3B3' : '#313131');
		});

		options.querySelectorAll('li').forEach(function (opt) {
			opt.addEventListener('click', function () {
				var value = opt.dataset.value;

				label.textContent = opt.textContent.trim();
				input.value = value;
				options.classList.add('tw-hidden');
				arrow.classList.remove('tw-rotate-180');
				arrowPath.setAttribute('fill', '#B3B3B3');
				updateVisibleOptions();

				if (value === 'default') {
					mse2Config['sort'] = '';
					var params = mSearch2.getFilters();
					delete params['sort'];
					mSearch2.Hash.set(params);
					mSearch2.load(params);
				} else {
					var colonIdx = value.lastIndexOf(':');
					var sortField = value.substring(0, colonIdx);
					var sortDir = value.substring(colonIdx + 1);
					var sortLinks = document.querySelectorAll('#mse2_sort a.sort');

					for (var i = 0; i < sortLinks.length; i++) {
						sortLinks[i].classList.remove('active');
						sortLinks[i].setAttribute('data-dir', '');
					}

					for (var j = 0; j < sortLinks.length; j++) {
						if (sortLinks[j].getAttribute('data-sort') === sortField) {
							sortLinks[j].setAttribute('data-dir', '');
							sortLinks[j].setAttribute('data-default', sortDir);
							sortLinks[j].click();
							break;
						}
					}
				}
			});
		});

		document.addEventListener('click', function (e) {
			if (!root.contains(e.target)) {
				options.classList.add('tw-hidden');
				arrow.classList.remove('tw-rotate-180');
				arrowPath.setAttribute('fill', '#B3B3B3');
			}
		});
	})();
}

// Теги выбранных фильтров (chips)
if (isElem('[data-filter-chips]') && window.filterChipsConfig) {
	(function () {
		var container = document.querySelector('[data-filter-chips]');
		var config = window.filterChipsConfig;
		var crossSvg = '<svg class="tw-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1077 3.96409C11.364 3.70778 11.7796 3.70778 12.0359 3.96409C12.2922 4.2204 12.2922 4.63596 12.0359 4.89227L8.92818 8L12.0359 11.1077C12.2922 11.364 12.2922 11.7796 12.0359 12.0359C11.7796 12.2922 11.364 12.2922 11.1077 12.0359L8 8.92818L4.89227 12.0359C4.63596 12.2922 4.2204 12.2922 3.96409 12.0359C3.70778 11.7796 3.70778 11.364 3.96409 11.1077L7.07182 8L3.96409 4.89227C3.70778 4.63596 3.70778 4.2204 3.96409 3.96409C4.2204 3.70778 4.63596 3.70778 4.89227 3.96409L8 7.07182L11.1077 3.96409Z" fill="#B3B3B3"/></svg>';

		var sortedKeys = Object.keys(config).sort(function (a, b) {
			return config[a].order - config[b].order;
		});

		function formatNumber(num) {
			return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
		}

		function getInputLabel(input) {
			var label = input.closest('label') || document.querySelector('label[for="' + input.id + '"]');
			if (label && label.getAttribute('data-label')) {
				return label.getAttribute('data-label');
			}
			return input.value;
		}

		var resetting = false;

		function buildFilterChips() {
			if (resetting) return;
			var chips = [];

			for (var i = 0; i < sortedKeys.length; i++) {
				var key = sortedKeys[i];
				var cfg = config[key];
				var uiType = cfg.uiType;

				if (uiType === 'range') {
					var rangeChanged = false;
					if (typeof mSearch2 !== 'undefined' && mSearch2.sliders && mSearch2.sliders[key]) {
						var slider = mSearch2.sliders[key];
						rangeChanged = slider.user_changed || slider.changed;
					}
					if (!rangeChanged) {
						var urlParams = new URLSearchParams(window.location.search);
						var aliasKey = key;
						if (typeof mse2Config !== 'undefined' && mse2Config.aliases) {
							for (var ak in mse2Config.aliases) {
								if (mse2Config.aliases[ak] === key) { aliasKey = ak; break; }
							}
						}
						rangeChanged = urlParams.has(key) || urlParams.has(aliasKey);
					}
					if (rangeChanged) {
						var minVal = '';
						var maxVal = '';
						var inputs = document.querySelectorAll('#mse2_filters input[name="' + key + '"]');
						if (inputs.length >= 2 && inputs[0].value && inputs[1].value) {
							minVal = inputs[0].value;
							maxVal = inputs[1].value;
						}
						if ((!minVal || !maxVal || minVal === '0') && typeof urlParams !== 'undefined') {
							var urlVal = urlParams.get(key) || urlParams.get(aliasKey) || '';
							var delimiter = (typeof mse2Config !== 'undefined' && mse2Config.values_delimeter) ? mse2Config.values_delimeter : '|';
							var parts = urlVal.split(delimiter);
							if (parts.length >= 2) {
								minVal = parts[0];
								maxVal = parts[1];
							}
						}
						if (minVal && maxVal) {
							var suffix = cfg.suffix ? ' ' + cfg.suffix : '';
							var text = formatNumber(minVal) + ' – ' + formatNumber(maxVal) + suffix;
							chips.push({
								type: 'range',
								key: key,
								text: text
							});
						}
					}
				} else if (uiType === 'toggle') {
					var toggle = document.querySelector('#mse2_filters input[name="' + key + '"]:checked');
					if (toggle) {
						chips.push({
							type: 'toggle',
							key: key,
							inputId: toggle.id,
							text: cfg.label
						});
					}
				} else {
					var checked = document.querySelectorAll('#mse2_filters input[name="' + key + '"]:checked');
					for (var j = 0; j < checked.length; j++) {
						var labelText = getInputLabel(checked[j]);
						chips.push({
							type: 'checkbox',
							key: key,
							inputId: checked[j].id,
							text: labelText
						});
					}
				}
			}

			if (chips.length === 0) {
				if (container.classList.contains('tw-flex')) {
					container.style.opacity = '0';
					container.style.maxHeight = '0';
					container.style.marginBottom = '0';
					setTimeout(function () {
						container.classList.add('tw-hidden');
						container.classList.remove('tw-flex');
						container.innerHTML = '';
						container.style.opacity = '';
						container.style.maxHeight = '';
						container.style.marginBottom = '';
					}, 300);
				} else {
					container.innerHTML = '';
				}
				return;
			}

			var html = '';
			for (var c = 0; c < chips.length; c++) {
				var chip = chips[c];
				var bgClass = chip.type === 'range' ? 'tw-bg-[#ededed]' : 'tw-bg-[#f7f7f7]';
				var textClass = '';

				html += '<button type="button" class="tw-group tw-flex tw-items-center tw-gap-[4px] ' + bgClass + ' hover:tw-bg-[#ededed] active:tw-bg-[#e0e0e0] tw-rounded-full tw-pl-[12px] tw-pr-[6px] tw-py-[6px] tw-cursor-pointer tw-border-none tw-outline-none tw-transition-all tw-duration-200" data-chip-remove data-chip-type="' + chip.type + '" data-chip-key="' + chip.key + '"' + (chip.inputId ? ' data-chip-id="' + chip.inputId + '"' : '') + '>';
				html += '<span class="tw-text-[14px] tw-font-medium tw-text-[#313131] tw-leading-[1.4] tw-whitespace-nowrap tw-transition-all tw-duration-200 group-hover:tw-line-through ' + textClass + '">' + chip.text + '</span>';
				html += '<svg class="tw-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="tw-transition-all tw-duration-200 tw-fill-[#B3B3B3] group-hover:tw-fill-[#313131]" d="M11.1077 3.96409C11.364 3.70778 11.7796 3.70778 12.0359 3.96409C12.2922 4.2204 12.2922 4.63596 12.0359 4.89227L8.92818 8L12.0359 11.1077C12.2922 11.364 12.2922 11.7796 12.0359 12.0359C11.7796 12.2922 11.364 12.2922 11.1077 12.0359L8 8.92818L4.89227 12.0359C4.63596 12.2922 4.2204 12.2922 3.96409 12.0359C3.70778 11.7796 3.70778 11.364 3.96409 11.1077L7.07182 8L3.96409 4.89227C3.70778 4.63596 3.70778 4.2204 3.96409 3.96409C4.2204 3.70778 4.63596 3.70778 4.89227 3.96409L8 7.07182L11.1077 3.96409Z"/></svg>';
				html += '</button>';
			}

			html += '<button type="button" class="tw-cursor-pointer tw-bg-transparent tw-outline-none tw-py-[1px] tw-text-[14px] tw-font-medium tw-text-[#2675d1] tw-leading-[1.4] tw-whitespace-nowrap tw-border-0 tw-border-b tw-border-solid tw-border-transparent hover:tw-border-[#2675d1] tw-transition-all tw-duration-200" data-chip-reset-all>Сбросить все</button>';

			container.innerHTML = html;
			var wasHidden = container.classList.contains('tw-hidden');
			container.classList.remove('tw-hidden');
			container.classList.add('tw-flex');
			if (wasHidden) {
				container.style.opacity = '0';
				container.style.maxHeight = '0';
				container.style.marginBottom = '0';
				requestAnimationFrame(function () {
					container.style.opacity = '1';
					container.style.maxHeight = '200px';
					container.style.marginBottom = '';
				});
			}
		}

		container.addEventListener('click', function (e) {
			var chip = e.target.closest('[data-chip-remove]');
			var resetAll = e.target.closest('[data-chip-reset-all]');

			if (resetAll) {
				resetting = true;
				container.style.opacity = '0.4';
				container.style.pointerEvents = 'none';
				var resetBtn = document.querySelector('#mse2_filters button[type="reset"]');
				if (resetBtn) {
					resetBtn.click();
				}
				return;
			}

			if (!chip) return;

			var type = chip.getAttribute('data-chip-type');
			var key = chip.getAttribute('data-chip-key');

			if (type === 'range') {
				if (typeof mSearch2 !== 'undefined' && mSearch2.sliders && mSearch2.sliders[key]) {
					var slider = mSearch2.sliders[key];
					slider.changed = false;
					slider.user_changed = false;
					var inputs = document.querySelectorAll('#mse2_filters input[name="' + key + '"]');
					if (inputs.length >= 2 && slider.values) {
						$(inputs[0]).val(slider.values[0]);
						$(inputs[1]).val(slider.values[1]);
						if (slider.slider) {
							$(slider.slider).slider('values', slider.values);
						}
					}
					mSearch2.submit();
				}
			} else {
				var inputId = chip.getAttribute('data-chip-id');
				if (inputId) {
					var input = document.getElementById(inputId);
					if (input) {
						$(input).prop('checked', false).trigger('change');
					}
				}
			}
		});

		buildFilterChips();

		$(document).on('mse2_load', function () {
			resetting = false;
			container.style.opacity = '';
			container.style.pointerEvents = '';
			buildFilterChips();
		});

		$('#mse2_filters').on('change', function () {
			setTimeout(buildFilterChips, 50);
		});
	})();
}

if (isElem('#mse2_filters')) {
	var filterForm = document.getElementById('mse2_filters');
	var chipsContainer = document.querySelector('[data-filter-chips]');

	$('#mse2_filters').on('change', 'input[type="checkbox"]', function () {
		filterForm.style.pointerEvents = 'none';
	});

	$(document).on('mse2_load', function () {
		filterForm.style.pointerEvents = '';
	});
}

if (isElem('[data-plug-map-interactive]')) {
	for (const item of document.querySelectorAll('[data-plug-map-interactive]')) {
		const map = item;
		if (map) {
			const label = map.querySelector('[data-plug-map-interactive-label]');
			if (label) {

				const isMobile = isSupportTouch();

				if (isMobile) {
					label.textContent = 'Для взаимодействия с картой, прикоснитель к карте на 1 секунду'

					onLongPress(label, 1000, (destroy) => {
						destroy();
						label.parentNode.removeChild(label);
					});

				} else {
					label.textContent = 'Для взаимодействия с картой, кликнете по ней';
					label.addEventListener('click', () => {
						label.parentNode.removeChild(label);
					});
				}

			}
		}
	}
}

if (isElem('[data-plug-our-history]')) {
	for (const item of document.querySelectorAll('[data-plug-our-history]')) {
		const container = item;
		if (container) {
			container.addEventListener('click', (e) => {

				const tab = e.target.closest('[data-plug-our-history-tab]');

				if (tab) {

					const id = tab.getAttribute('data-plug-our-history-tab');

					// удаляем класс у активных табов
					for (const item of container.querySelectorAll('[data-plug-our-history-tab].active')) {
						item.classList.remove('active');
					}
					// добавляем активному
					tab.classList.add('active');

					// удаляем класс у контента
					for (const item of container.querySelectorAll('[data-plug-our-history-content].active')) {
						item.classList.remove('active');
					}
					// добавляем активному
					const content = container.querySelector(`[data-plug-our-history-content="${id}"]`);
					if (content) {
						content.classList.add('active')
					}

				}

			});
		}
	}
}

if (isElem('[data-search-panel]')) {
	for (const item of document.querySelectorAll('[data-search-panel]')) {
		const container = item;
		if (container) {

			const $results = container.querySelector('[data-search-panel-results]');

			const paramType = container.querySelector('input[name="type"]')?.value;
			const $searchInput = container.querySelector('input[name="query"]');

			let lastRequest = null;
			let lastResults = null;
			let lastQuery = '';

			const renderResults = () => {
				$results.innerHTML = lastResults || '';
				$results.classList.toggle('tw-hidden', !lastResults);
			};
			const hideResults = () => {
				$results.classList.add('tw-hidden');
			};

			const loadResults = async ({
				query
			}) => {

				try {

					if (lastRequest) {
						lastRequest.controller.abort('request outdated');
						lastRequest = null;
					}

					$searchInput.classList.add('ui-autocomplete-loading');

					const formData = new FormData();

					formData.append('type', paramType);
					formData.append('query', query);

					const controller = new AbortController();

					const request = lastRequest = {
						fetch: fetch(
							'/assets/components/search/action.php',
							{
								method: 'post',
								body: formData,
								signal: controller.signal
							}
						),
						controller
					}

					const response = await lastRequest.fetch;

					if (request === lastRequest) {
						lastRequest = null;
					}

					if (response.ok) {

						const json = await response.json();

						const results = json?.data?.results;

						lastResults = results;

						renderResults();

					}

				} catch (error) {
					console.error(error);
				} finally {
					$searchInput.classList.remove('ui-autocomplete-loading');
				}

			}

			const searchInput = debounce(e => {

				const query = $searchInput.value.trim();

				if (query.length < 3) {
					hideResults();
				} else {

					if (query === lastQuery) {
						renderResults();
					} else {

						lastQuery = query;

						loadResults({
							query
						});

					}

				}

			}, 300);

			if ($searchInput && $results) {
				$searchInput.classList.add('ui-autocomplete-input');
				$searchInput.addEventListener('input', searchInput);
				$searchInput.addEventListener('focus', searchInput);
				document.addEventListener('click', function (e) {
					if (e.target.closest('[data-search-panel]') !== container) {
						hideResults();
					}
				});
			}

			// обновляем в других инпутах содержимое
			$searchInput.addEventListener('input', e => {
				const value = e.target.value;
				for (const input of document.querySelectorAll('[data-search-panel] input[name="query"]')) {
					if (
						input !== e.target
						&& input.value !== value
					) {
						input.value = value;
					}
				}
			});

		}
	}
}

if (isElem('[data-plug-scroll-to-tech]')) {
	const attrName = 'data-plug-scroll-to-tech';
	for (const item of document.querySelectorAll(`[${attrName}]`)) {
		const selector = item.getAttribute(attrName);
		const container = item;
		if (container) {
			container.addEventListener('click', (e) => {
				const tab = document.querySelector(selector);
				if (tab) {
					tab.click();
					tab.scrollIntoView();
				}
			});
		}
	}
}

if (isElem('[data-plug-modal-cookies]')) {

	const key = 'cookies-accept';

	const modal = document.querySelector('[data-plug-modal-cookies]');
	modal.addEventListener('click', e => {
		if (e.target.closest('[data-plug-modal-cookies-button]')) {
			setCookie(key, 1, {
				'max-age': 60 * 60 * 24 * 365
			});
			modal.classList.remove('visible');
		}
	});

	const isAccepted = getCookie(key);
	if (!isAccepted) {
		modal.classList.add('visible');
	}

}

if (isElem('input[type=search]')) {
	const checkInputEmpty = el => {
		el.classList.toggle('input_filled', !!el.value);
	}
	Array.from(document.querySelectorAll('input[type=search]')).map(el => {
		$(el).on('input', () => checkInputEmpty(el));
		checkInputEmpty(el);
	});
	$('.search__close').on('click', e => {
		const input = e.target.closest('form')?.querySelector('input[type=search]');
		if (input) {
			input.value = '';
			input.dispatchEvent(new Event('input'));
		}
	})
}

if (isElem('.basket-pg')) {
	$(function () {
		miniShop2.Callbacks.add('Order.getcost.response.success', 'order_get_cost', function (response) {
			const cost = response?.data?.cost || 0;
			const orderWrapper = document.querySelector('.basket-pg');
			if (orderWrapper) {
				orderWrapper.classList.toggle('order_free-delivery', cost > 50000);
			}
		});
	})
}

if (isElem('[data-visible-if-delivery]')) {
	$(function () {
		$('#deliveries [name=delivery]').on('change', function (e) {
			// делаем отсрочку, если сразу в поток вставить, то глючит, видимо есть еще много логики основанной на доставке
			setTimeout(() => {
				const selectedValue = $('#deliveries [name=delivery]:checked').val();

				for (const item of document.querySelectorAll('[data-visible-if-delivery]')) {
					const values = item.getAttribute('data-visible-if-delivery').split(',');
					const isHidden = !~values.indexOf(selectedValue);
					item.classList.toggle('tw-hidden', isHidden);
				}
			}, 50);
		})
	})
}

if (isElem('[data-plug-gallery]')) {

	const container = document.querySelector('[data-plug-gallery]');

	const scriptSrc = 'https://clients.arigami.io/0193f95d-ebfc-4da3-8ff5-6983ea1fc689/widget.js?2';
	let scriptLoadPromise = null;

	const gallery = container.querySelector('.gallery');
	const arigamiContainer = container.querySelector('#arigami-container');
	const arigamiOverlay = container.querySelector('.gallery-arigami__overlay');
	const button = container.querySelector('[data-guid]');
	let isArigamiWidgetStarted = false;

	button?.addEventListener('click', e => {

		gallery.classList.toggle('_arigami_visible');

		window.waitForArigamiAndRun ??= [];
		window.waitForArigamiAndRun.push(function ({
			startWidget
		}) {
			if (isArigamiWidgetStarted) return;
			startWidget({
				element: arigamiContainer,
				token: button.getAttribute('data-guid')
			})
				.then(() => {
					isArigamiWidgetStarted = true;
				})
			;
		});

		if (!scriptLoadPromise) {
			scriptLoadPromise = import(scriptSrc)
				.catch(error => {
					console.error(error);
				})
			;
		}

	});

	arigamiOverlay?.addEventListener('click', e => {
		gallery.classList.remove('_arigami_visible');
	})

}

function formatPrice (price) {
	return ('' + price).replace(/(?=(\d\d\d)+$)/g, ' ').replace(/^(-?)\s+/, '$1')
}

/****** UTILS ******/
function isElem(selector) {
	return (document.querySelector(selector)) ? true : false;
}

function _throttle(func, ms = 100) {
	let locked = false;

	return function () {
		if (locked) return;

		const context = this;
		const args = arguments;
		locked = true;

		setTimeout(() => {
			func.apply(context, args);
			locked = false;
		}, ms)
	}
}

function isSupportTouch () {
	return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
}

function onLongPress(element, timeout = 500, callback) {
	let timer;

	const listenerStart = element.addEventListener('touchstart', () => {
		timer = setTimeout(() => {
			timer = null;
			callback(destroy);
		}, timeout);
	});

	function cancel() {
		clearTimeout(timer);
	}

	const listenerEnd = element.addEventListener('touchend', cancel);
	const listenerMove = element.addEventListener('touchmove', cancel);

	function destroy () {
		element.removeEventListener('touchstart', listenerStart);
		element.removeEventListener('touchend', listenerEnd);
		element.removeEventListener('touchmove', listenerMove);
	}
}

/* генерация конфига для изображений */

if (true) {
	const generate = async ({
		// '.promo .s-img'
		selector,
		// 'r', 'f', 'c',
		postfix = '',
		// [ 'mobile', 'desktop' ] возможность указать только определенные типы устройств
		devices,
		// нужно ли проскролить до элемента
		scrollIntoView,
		// просролить и подождать, в мс
		scrollIntoViewDelay,
		// сколько нужно подождать после загрузки страницы
		delayAfterPageLoad,
	}) => {

		if (Array.isArray(selector)) {

			for (const item of selector) {
				await generate({
					selector: item,
					postfix,
					devices,
					scrollIntoView,
					scrollIntoViewDelay,
					delayAfterPageLoad
				});

				await new Promise(resolve => setTimeout(resolve, 2000));

			}

		} else {

			console.log(
				`Ищем "${selector}"${
					postfix
						? `c префиксом "${postfix}"`
						: ''
				}`
			);

            const isTailwindSizes = true;

			const breakpointsConfig = isTailwindSizes
				// размеры tailwind
				? [
					{
						"name": "xs",
						"index": 0,
						"minWidth": 0,
						"query": "(max-width: 575px)"
					},
					{
						"name": "sm",
						"index": 1,
						"minWidth": 576,
						"query": "(min-width: 576px) and (max-width: 767px)"
					},
					{
						"name": "md",
						"index": 2,
						"minWidth": 768,
						"query": "(min-width: 768px) and (max-width: 1023px)"
					},
					{
						"name": "lg",
						"index": 3,
						"minWidth": 1024,
						"query": "(min-width: 1024px) and (max-width: 1230px)"
					},
					{
						"name": "xl",
						"index": 4,
						"minWidth": 1231,
						"query": "(min-width: 1231px) and (max-width: 1649px)"
					},
					{
						"name": "2xl",
						"index": 5,
						"minWidth": 1650,
						"query": "(min-width: 1650px)"
					},

				]
				// размеры сайта
				: [
					{
						"name": "tel",
						"index": 0,
						"minWidth": 0,
						"query": "(max-width: 480px)"
					},
					{
						"name": "mobile",
						"index": 1,
						"minWidth": 481,
						"query": "(min-width: 481px) and (max-width: 768px)"
					},
					{
						"name": "table",
						"index": 2,
						"minWidth": 769,
						"query": "(min-width: 769px) and (max-width: 1023px)"
					},
					{
						"name": "desctopMin",
						"index": 3,
						"minWidth": 1024,
						"query": "(min-width: 1024px) and (max-width: 1230px)"
					},
					{
						"name": "desctopMid",
						"index": 4,
						"minWidth": 1231,
						"query": "(min-width: 1231px) and (max-width: 1450px)"
					},
					{
						"name": "desctop",
						"index": 5,
						"minWidth": 1451,
						"query": "(min-width: 1451px)"
					},

				]
			;

			const breakpoints = isTailwindSizes
				// размеры tailwind
				? {
					devices: {
						desktop: {
							screens: [
								575,
								767,
								1023,
								1230,
								1649,
								1920,
							]
						},
					}
				}
				// размеры сайта
				: {
					devices: {
						desktop: {
							screens: [
								480,
								768,
								1023,
								1230,
								1450,
								1920,
							]
						},
					}
				}
			;

			const sizes = {};

			for (const deviceType in breakpoints.devices) {

				// нужно ли тестировать на определенном типе устройств
				if (devices && !~devices.indexOf(deviceType)) continue;

				const url = window.location.href;

				const win = window.open(url, 'Размеры превью', { width: '1px' });

				const { screens } = breakpoints.devices[deviceType];

				try {

					// ждем загрузки страницы
					await new Promise(resolve => win.addEventListener("DOMContentLoaded", resolve));

					const target = win.document.querySelector(selector);

					if (!target) {
						throw new Error(`Не нашли ${selector}`);
					}

					// ждем секунду
					await new Promise(resolve => setTimeout(resolve, delayAfterPageLoad || 5000));

					sizes[deviceType] = [];

					for (const width of screens) {

						win.resizeTo(width, 1000);

						// пауза, даем время перестроиться странице
						await new Promise(resolve => setTimeout(resolve, 2000));

						if (scrollIntoView) {
							target.scrollIntoView();

							if (scrollIntoViewDelay) {
								await new Promise(resolve => setTimeout(resolve, scrollIntoViewDelay));
							}

						}

						// сохраняем размеры
						const size = `${Math.ceil(target.offsetWidth)}x${Math.ceil(target.offsetHeight)}${postfix}`;

						sizes[deviceType].push(size);

					}

				} catch (error) {
					console.error(error);
				} finally {
					win.close();
				}

			}

			// выводим данные из sizes так, чтобы потом было удобно скопировать

			const resultSizes = sizes.desktop;

			if (true) {

				const previewExt = 'avif';

				const source = {
					origin: 'https://placehold.co/500x500/555/fff/?text=.png',
					media: resultSizes
				};

				const origin = source.origin;

				if (!origin) return {};

				let srcset = [];
				let sizes = [];

				let previews = [];

				const breakpoints = breakpointsConfig;

				for (const i in breakpoints) {

					const breakpoint = breakpoints[i];

					let preview = null;

					// если массив, то берем в обратном порядке
					if (Array.isArray(source.media)) {
						preview = source.media[breakpoint.index];
					} else if (typeof source.media === 'string') {
						preview = source.media;
					// если объект, то по ключу
					} else if (source.media) {
						preview = source.media[breakpoint.name];
					}

					if (!preview) continue;

					const {
						width,
						height,
						mod
					} = previewSplit(preview);

					sizes.push(`${breakpoint.query} ${width}px`);

					previews.push({
						preview,
						width,
						height,
						mod
					});
				}

				let mainSrc = '';
				let widthsSetted = {};

				for (const { preview, width, height, mod } of previews) {
					if (widthsSetted[width]) continue;
					widthsSetted[width] = true;
					// первой превью установится превью с самого большого экрана
					mainSrc = `${origin}.${width}x${height}${mod}.${previewExt}`;
					srcset.push(`${origin}.${width}x${height}${mod}.${previewExt} ${width}w`);
					srcset.push(`${origin}.${width*2}x${height*2}${mod}.${previewExt} ${width*2}w`);
				}

				const res = {
					src: mainSrc || origin,
				};

				if (sizes.length) {
					res.sizes = sizes.join(',');
				}

				if (srcset.length) {
					res.srcset = srcset.join(',');
				}

				console.log(`<img\n\tsrc="${res.src}"\n\tsizes="${res.sizes}"\n\tsrcset="${res.srcset}"\n/>`);

				// renderResponsiveImage config
				if (true) {

					let res = `{`;

					for (let i = 0; i < previews.length; i++) {
						const { preview, width, height, mod } = previews[i];

						if (i) res += `,`;

						res += `\n\t"${sizes[i]}": "${width}x${height}${mod}"`;

					}

					res += `\n}`;

					console.log('renderResponsiveImage config\n', res);

				}
			}

			if (true) {

				const resultSizes = [];

				for (const preview of sizes.desktop) {

					const {
						width,
						height,
						mod
					} = previewSplit(preview);

					resultSizes.push(preview);
					resultSizes.push(`${width*2}x${height*2}${mod}`);

				}

				console.log(`Размеры`, sizes.desktop);
				console.log(`Размеры с ретиной`, resultSizes)

			}

			function previewSplit (preview) {

				const [ _, width, height, mod ] = preview.match(/^(\d+)x(\d+)(\w?)$/) || [];

				return {
					width,
					height,
					mod
				}
			}

		}

	}

	window.generateSizesForPreview = generate;

	// console.log(`generateSizesForPreview is ready`)

}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
// https://learn.javascript.ru/cookie
function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

// https://learn.javascript.ru/cookie
// setCookie('user', 'John', {secure: true, 'max-age': 3600});
function setCookie(name, value, options = {}) {

	options = {
	  path: '/',
	  // при необходимости добавьте другие значения по умолчанию
	  ...options
	};

	if (options.expires instanceof Date) {
	  options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
	  updatedCookie += "; " + optionKey;
	  let optionValue = options[optionKey];
	  if (optionValue !== true) {
		updatedCookie += "=" + optionValue;
	  }
	}

	document.cookie = updatedCookie;
}

function debounce (callback, wait) {
	let timeoutId = null;
	return (...args) => {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
		callback(...args);
		}, wait);
	};
}

// Popular links — collapse to one row on desktop (>1024px)
(function () {
    const container = document.querySelector('[data-popular-links]');
    if (!container) return;

    const toggle = container.querySelector('[data-popular-toggle]');
    if (!toggle) return;

    const links = Array.from(container.querySelectorAll(':scope > a'));
    if (!links.length) return;

    const toggleText = toggle.querySelector('span');
    const toggleSvg = toggle.querySelector('svg');
    let expanded = false;

    function collapse() {
		if (window.innerWidth < 1024) {
			links.forEach(l => l.style.display = '');
			toggle.style.display = 'none';
			expanded = false;
			return;
		}

		// Показать всё для замера
		links.forEach(l => l.style.display = '');
		toggle.style.display = '';

		// Установить текст «Показать все» ДО замера — он шире чем «Скрыть»
		if (toggleText) toggleText.textContent = 'Показать все';
		if (toggleSvg) toggleSvg.style.transform = '';

		const baseTop = links[0].getBoundingClientRect().top;

		const allFit = links.every(l =>
			Math.abs(l.getBoundingClientRect().top - baseTop) < 2
		) && Math.abs(toggle.getBoundingClientRect().top - baseTop) < 2;

		if (allFit) {
			toggle.style.display = 'none';
			expanded = false;
			return;
		}

		for (let i = links.length - 1; i >= 0; i--) {
			links[i].style.display = 'none';
			const firstVisible = links.find(l => l.style.display !== 'none');
			if (!firstVisible) break;
			if (Math.abs(toggle.getBoundingClientRect().top - firstVisible.getBoundingClientRect().top) < 2) {
				break;
			}
		}

		toggle.style.marginLeft = 'auto';
		expanded = false;
	}

    function expand() {
        links.forEach(l => l.style.display = '');
        expanded = true;
		toggle.style.marginLeft = '12px';
        updateToggle();
    }

    function updateToggle() {
        if (toggleText) toggleText.textContent = expanded ? 'Скрыть' : 'Показать все';
        if (toggleSvg) toggleSvg.style.transform = expanded ? 'rotate(180deg)' : '';
    }

    toggle.addEventListener('click', () => expanded ? collapse() : expand());

    // Инициализация
    collapse();

    // Ресайз с debounce
    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            // При ресайзе — пересчитать (сбросить в collapsed)
            links.forEach(l => l.style.display = '');
            expanded = false;
            collapse();
        }, 150);
    });
})();

