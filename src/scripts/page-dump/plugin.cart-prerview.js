
$(function () {
    let inactivityTimer;

    // Функция для установки таймера закрытия
    const setInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            closeCartPreview();
        }, 5000); // 5 секунд бездействия
    };

    // Функция открытия превью корзины
    const openCartPreview = (html) => {
        // Удаляем предыдущий превью, если он существует
        closeCartPreview();
        
        // Добавляем новый превью в конец body
        $('body').append(html);
        
        // Устанавливаем таймер неактивности
        setInactivityTimer();
        
        // Обработчик событий мыши и сенсорных событий для сброса таймера
        $('[data-cart-preview-container]').on('mousemove click touchstart touchmove touchend', function() {
            setInactivityTimer();
        });
        
        // Обработчик для закрытия по клику на overlay
        $('[data-cart-preview-overlay]').on('click', function() {
            closeCartPreview();
        });
        
        // Обработчик для закрытия по клику на крестик
        $('[data-cart-preview-close]').on('click', function() {
            closeCartPreview();
        });
        
        // Обработчик для удаления товара
        $('[data-cart-preview-product-remove]').on('click', function() {
            const key = $(this).data('key');
            removeProductFromCart(key);
        });
    };

    // Функция закрытия превью корзины
    const closeCartPreview = () => {
        clearTimeout(inactivityTimer);
        
        // Удаляем все обработчики событий перед удалением элементов
        $('[data-cart-preview-container]').off('mousemove click touchstart touchmove touchend');
        $('[data-cart-preview-overlay]').off('click');
        $('[data-cart-preview-close]').off('click');
        $('[data-cart-preview-product-remove]').off('click');
        
        // Удаляем контейнер из DOM
        $('[data-cart-preview-container]').remove();
    };

    // Функция для получения данных корзины
    const fetchCartData = () => {
        fetch('/api/cart/')
            .then(response => response.json())
            .then(json => {
                if (json && json.data) {
                    openCartPreview(json.data);
                }
            })
            .catch(error => console.error('Ошибка при получении данных корзины:', error));
    };

    // Функция для удаления товара из корзины
    const removeProductFromCart = (key) => {
        fetch(`/api/cart/products/${key}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(json => {
                if (json && json.status === 'ok') {
                    // Всегда делаем GET запрос после удаления товара
                    fetch('/api/cart/')
                        .then(response => response.json())
                        .then(cartJson => {
                            if (cartJson && cartJson.data) {
                                // Создаем временный элемент для анализа HTML
                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = cartJson.data;
                                
                                // Проверяем наличие товаров по наличию элементов с атрибутом data-cart-preview-product
                                const hasProducts = tempDiv.querySelector('[data-cart-preview-product]') !== null;
                                
                                if (hasProducts) {
                                    // Если в корзине остались товары, обновляем содержимое
                                    openCartPreview(cartJson.data);
                                } else {
                                    // Если корзина пуста, закрываем превью
                                    closeCartPreview();
                                }
                            } else {
                                // Иначе закрываем превью
                                closeCartPreview();
                            }
                        })
                        .catch(error => {
                            console.error('Ошибка при получении данных корзины после удаления товара:', error);
                            closeCartPreview();
                        });
                }
            })
            .catch(error => console.error('Ошибка при удалении товара из корзины:', error));
    };

    // Обработчик нажатия клавиши Esc
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('[data-cart-preview-container]').length) {
            closeCartPreview();
        }
    });

    // MiniShop2 есть только на боевом сайте (MODX); на статическом дампе объекта нет
    if (typeof miniShop2 !== "undefined" && miniShop2.Callbacks) {
        miniShop2.Callbacks.add("Cart.add.response.success", "cartOverlay", function ({ data }) {
            if (data.total_count > 0) {
                fetchCartData();
            }
        });
    }
});