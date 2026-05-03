"use strict";

(function () {
	var galleryCache = {};
	var currentObserver = null;

	function isProductGalleryApiEnabled() {
		return document.documentElement.getAttribute("data-product-gallery-api") !== "off";
	}

	function initGallery() {
		var cards = document.querySelectorAll('[data-hover-gallery]:not([data-gallery-init])');

		if (!cards.length) {
			return;
		}

		if (currentObserver) {
			currentObserver.disconnect();
		}

		var newIds = [];

		cards.forEach(function (card) {
			card.setAttribute('data-gallery-init', '');
			setupCard(card);

			var id = card.getAttribute('data-product-id');

			if (id && galleryCache[id]) {
				galleryCache[id].rendered = false;
				renderDots(card);
				renderGalleryImages(id);
			} else if (id) {
				newIds.push(id);
			}
		});

		if (newIds.length) {
			loadCounts(cards, newIds);
		}
	}

	function loadCounts(cards, newIds) {
		if (!isProductGalleryApiEnabled()) {
			return;
		}

		fetch("/api/products/gallery/count?ids=" + newIds.join(","))
			.then(function (r) {
				if (!r.ok) {
					throw new Error("gallery count " + r.status);
				}
				return r.json();
			})
			.then(function (response) {
				if (!response.data) {
					return;
				}

				var idsWithGallery = [];

				Object.keys(response.data).forEach(function (productId) {
					var count = response.data[productId];

					galleryCache[productId] = {
						count: count,
						images: null,
						loading: false,
						rendered: false
					};

					if (count > 1) {
						idsWithGallery.push(productId);
					}
				});

				cards.forEach(function (card) {
					renderDots(card);
				});

				if (idsWithGallery.length) {
					observeCards();
				}
			})
			.catch(function () {});
	}

	function observeCards() {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) {
					return;
				}

				var card = entry.target;
				var productId = card.getAttribute('data-product-id');

				if (!productId || !galleryCache[productId] || galleryCache[productId].count <= 1) {
					observer.unobserve(card);
					return;
				}

				if (galleryCache[productId].images || galleryCache[productId].loading) {
					observer.unobserve(card);
					return;
				}

				observer.unobserve(card);
				loadSingleProduct(productId);
			});
		}, { rootMargin: '200px' });

		document.querySelectorAll('[data-hover-gallery]').forEach(function (card) {
			var productId = card.getAttribute('data-product-id');

			if (productId && galleryCache[productId] && galleryCache[productId].count > 1 && !galleryCache[productId].images) {
				observer.observe(card);
			}
		});

		currentObserver = observer;
	}

	function loadSingleProduct(productId) {
		if (!isProductGalleryApiEnabled()) {
			return;
		}

		if (galleryCache[productId].images || galleryCache[productId].loading) {
			return;
		}

		galleryCache[productId].loading = true;

		fetch("/api/products/" + productId + "/gallery")
			.then(function (r) {
				if (!r.ok) {
					throw new Error("gallery " + r.status);
				}
				return r.json();
			})
			.then(function (response) {
				if (response.data && galleryCache[productId]) {
					galleryCache[productId].images = response.data;
					galleryCache[productId].loading = false;
					renderGalleryImages(productId);
				}
			})
			.catch(function () {
				galleryCache[productId].loading = false;
			});
	}

	function renderGalleryImages(productId) {
		if (galleryCache[productId].rendered) {
			return;
		}

		var card = document.querySelector('[data-hover-gallery][data-product-id="' + productId + '"]');

		if (!card) {
			return;
		}

		var link = card.querySelector('a');
		var images = galleryCache[productId].images;

		if (!link || !images || images.length <= 1) {
			return;
		}

		images.forEach(function (imageData, index) {
			if (index === 0) {
				return;
			}

			var img = document.createElement('img');
			img.className = 'tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-contain tw-opacity-0 tw-transition-opacity tw-duration-200 tw-pointer-events-none';
			img.src = imageData.src;
			img.srcset = imageData.srcset + ' 2x';
			img.alt = '';
			img.setAttribute('data-gallery-index', index);
			link.appendChild(img);
		});

		galleryCache[productId].rendered = true;
	}

	function renderDots(card) {
		var productId = card.getAttribute('data-product-id');
		var dotsContainer = card.querySelector('[data-gallery-dots]');

		if (!dotsContainer || !galleryCache[productId]) {
			return;
		}

		var count = galleryCache[productId].count;

		if (count <= 1) {
			return;
		}

		dotsContainer.innerHTML = '';

		for (var i = 0; i < count; i++) {
			var dot = document.createElement('span');
			dot.className = 'tw-w-[6px] tw-h-[6px] tw-rounded-full tw-transition-colors tw-duration-200 ' +
				(i === 0 ? 'tw-bg-[#2D8EFF]' : 'tw-bg-[#DEDEDE]');
			dot.setAttribute('data-dot-index', i);
			dotsContainer.appendChild(dot);
		}
	}

	function setupCard(card) {
		var productId = card.getAttribute('data-product-id');
		var link = card.querySelector('a');

		if (!link) {
			return;
		}

		var currentIndex = 0;
		var touchStartX = 0;
		var touchStartY = 0;
		var isSwiping = false;

		function loadImagesFallback() {
			if (!isProductGalleryApiEnabled()) {
				return;
			}

			if (!galleryCache[productId] || galleryCache[productId].count <= 1) {
				return;
			}

			if (galleryCache[productId].images || galleryCache[productId].loading) {
				return;
			}

			galleryCache[productId].loading = true;

			fetch("/api/products/" + productId + "/gallery")
				.then(function (r) {
					if (!r.ok) {
						throw new Error("gallery " + r.status);
					}
					return r.json();
				})
				.then(function (response) {
					if (response.data) {
						galleryCache[productId].images = response.data;
						galleryCache[productId].loading = false;
						renderGalleryImages(productId);
					}
				})
				.catch(function () {
					galleryCache[productId].loading = false;
				});
		}

		function showImage(index) {
			if (!galleryCache[productId] || !galleryCache[productId].images) {
				return;
			}

			var images = galleryCache[productId].images;

			if (index < 0 || index >= images.length) {
				return;
			}

			currentIndex = index;

			var originalImg = link.querySelector('img:not([data-gallery-index])');
			var galleryImgs = link.querySelectorAll('img[data-gallery-index]');

			if (originalImg) {
				originalImg.style.opacity = index === 0 ? '1' : '0';
			}

			galleryImgs.forEach(function (img) {
				var imgIndex = parseInt(img.getAttribute('data-gallery-index'));
				img.style.opacity = imgIndex === index ? '1' : '0';
			});

			updateDots(card, index);
		}

		function resetImage() {
			currentIndex = 0;

			var originalImg = link.querySelector('img:not([data-gallery-index])');
			var galleryImgs = link.querySelectorAll('img[data-gallery-index]');

			if (originalImg) {
				originalImg.style.opacity = '1';
			}

			galleryImgs.forEach(function (img) {
				img.style.opacity = '0';
			});

			updateDots(card, 0);
		}

		card.addEventListener('mouseenter', function () {
			loadImagesFallback();
		});

		card.addEventListener('mousemove', function (e) {
			if (!galleryCache[productId] || !galleryCache[productId].rendered) {
				return;
			}

			var count = galleryCache[productId].images.length;

			if (count <= 1) {
				return;
			}

			var rect = card.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var zoneWidth = rect.width / count;
			var index = Math.min(Math.floor(x / zoneWidth), count - 1);

			if (index !== currentIndex) {
				showImage(index);
			}
		});

		card.addEventListener('mouseleave', function () {
			resetImage();
		});

		card.addEventListener('touchstart', function (e) {
			touchStartX = e.touches[0].clientX;
			touchStartY = e.touches[0].clientY;
			isSwiping = false;

			loadImagesFallback();
		}, { passive: true });

		card.addEventListener('touchmove', function (e) {
			if (!galleryCache[productId] || !galleryCache[productId].rendered) {
				return;
			}

			var count = galleryCache[productId].images.length;

			if (count <= 1) {
				return;
			}

			var deltaX = e.touches[0].clientX - touchStartX;
			var deltaY = e.touches[0].clientY - touchStartY;

			if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
				isSwiping = true;
			}
		}, { passive: true });

		card.addEventListener('touchend', function (e) {
			if (!isSwiping) {
				return;
			}

			if (!galleryCache[productId] || !galleryCache[productId].rendered) {
				return;
			}

			var count = galleryCache[productId].images.length;

			if (count <= 1) {
				return;
			}

			e.preventDefault();

			var deltaX = e.changedTouches[0].clientX - touchStartX;

			if (deltaX < -20 && currentIndex < count - 1) {
				showImage(currentIndex + 1);
			} else if (deltaX > 20 && currentIndex > 0) {
				showImage(currentIndex - 1);
			}
		});
	}

	function updateDots(card, activeIndex) {
		var dots = card.querySelectorAll('[data-dot-index]');

		dots.forEach(function (dot) {
			var index = parseInt(dot.getAttribute('data-dot-index'));
			dot.className = 'tw-w-[6px] tw-h-[6px] tw-rounded-full tw-transition-colors tw-duration-200 ' +
				(index === activeIndex ? 'tw-bg-[#2D8EFF]' : 'tw-bg-[#DEDEDE]');
		});
	}

	document.addEventListener('DOMContentLoaded', initGallery);

	$(document).on('mse2_load', function () {
		initGallery();
	});
})();
