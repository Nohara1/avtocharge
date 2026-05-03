/* 
    * Custom sorting and filter management.
    * Manages mobile/desktop sorting and mSearch2 integration based on data attributes:
    * data-mobile-filter-body - Контейнер для переноса формы фильтров на мобильных экранах (< 1024px)
    * data-modal="mobile-sort" - Всплывающее окно мобильной сортировки
    * data-mobile-sort-label - Текстовый лейбл активного пункта сортировки (мобильная версия)
    * data-sort-select - Общий контейнер (обертка) кастомного селекта сортировки (десктоп)
    * data-select-output - Скрытое поле (input) для сохранения итогового значения
    * data-label - Текстовый лейбл активного пункта сортировки (десктоп)
    * data-sort-value - Значение для применения при клике по опции (например, price:asc)
    * data-sort - Имя поля базы данных для сортировки (ссылки mSearch2)
    * data-dir - Текущее направление сортировки (asc/desc)
    * data-default - Базовое направление сортировки по умолчанию
*/

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const filterBody = document.querySelector('[data-mobile-filter-body]');
        const form = document.getElementById('mse2_filters');

        if (filterBody && form && window.innerWidth < 1024) {
            filterBody.appendChild(form);
        }

        const iconDefault = document.querySelector('[data-filter-icon-default]');
        const iconActive = document.querySelector('[data-filter-icon-active]');
        const resetBtn = document.querySelector('[data-reset-wrapper] button[type="reset"]');

        if (iconDefault && iconActive && resetBtn) {
            const syncFilterIcon = () => {
                const hasFilters = !resetBtn.classList.contains('hidden');
                iconDefault.classList.toggle('tw-hidden', hasFilters);
                iconActive.classList.toggle('tw-hidden', !hasFilters);
            };

            syncFilterIcon();

            new MutationObserver(syncFilterIcon).observe(resetBtn, {
                attributes: true,
                attributeFilter: ['class']
            });
        }

        const sortPopup = document.querySelector('[data-modal="mobile-sort"]');
        const sortBtnLabel = document.querySelector('[data-mobile-sort-label]');

        if (sortPopup && sortBtnLabel) {
            const urlSort = new URLSearchParams(window.location.search).get('sort');
            const currentValue = urlSort || 'default';

            const checkSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.6466 5.38971C20.1752 4.8701 19.4113 4.8701 18.9399 5.38971L9.50596 15.7885L5.06009 10.8877C4.58886 10.3684 3.82479 10.3681 3.35355 10.8877C2.88217 11.407 2.88217 12.2494 3.3534 12.7687L8.6526 18.6103C8.87901 18.8597 9.18585 19 9.50596 19C9.82605 19 10.1329 18.8597 10.3593 18.6103L20.6466 7.27066C21.1178 6.75139 21.1178 5.90898 20.6466 5.38971Z" fill="#2D8EFF"/></svg>';

            const markActive = (value) => {
                sortPopup.querySelectorAll('[data-sort-value]').forEach(o => {
                    const isActive = o.getAttribute('data-sort-value') === value;
                    o.classList.toggle('tw-text-[#2D8EFF]', isActive);
                    o.classList.toggle('tw-text-[#313131]', !isActive);
                    const existing = o.querySelector('[data-sort-check]');
                    if (isActive && !existing) {
                        o.insertAdjacentHTML('beforeend', `<span data-sort-check class="tw-shrink-0 tw-ml-[12px]">${checkSvg}</span>`);
                    } else if (!isActive && existing) {
                        existing.remove();
                    }
                });
            };

            markActive(currentValue);

            if (urlSort) {
                // Использование шаблонных строк вместо конкатенации
                const matchOpt = sortPopup.querySelector(`[data-sort-value="${urlSort}"]`);
                if (matchOpt) sortBtnLabel.textContent = matchOpt.textContent.trim();
            }

            sortPopup.addEventListener('click', (e) => {
                const opt = e.target.closest('[data-sort-value]');
                if (!opt) return;

                const value = opt.getAttribute('data-sort-value');
                sortBtnLabel.textContent = opt.textContent.trim();
                markActive(value);

                const desktopInput = document.querySelector('[data-sort-select] [data-select-output]');
                const desktopLabel = document.querySelector('[data-sort-select] [data-label]');
                
                if (desktopInput) desktopInput.value = value;
                if (desktopLabel) desktopLabel.textContent = opt.textContent.trim();

                if (value === 'default') {
                    if (typeof mse2Config !== 'undefined') mse2Config['sort'] = '';
                    if (typeof mSearch2 !== 'undefined') {
                        const params = mSearch2.getFilters();
                        delete params['sort'];
                        mSearch2.Hash.set(params);
                        mSearch2.load(params);
                    }
                } else {
                    const colonIdx = value.lastIndexOf(':');
                    const sortField = value.substring(0, colonIdx);
                    const sortDir = value.substring(colonIdx + 1);
                    const sortLinks = document.querySelectorAll('#mse2_sort a.sort');

                    // Использование for...of вместо классического for с индексами
                    for (const link of sortLinks) {
                        link.classList.remove('active');
                        link.setAttribute('data-dir', '');
                    }
                    
                    for (const link of sortLinks) {
                        if (link.getAttribute('data-sort') === sortField) {
                            link.setAttribute('data-dir', '');
                            link.setAttribute('data-default', sortDir);
                            link.click();
                            break;
                        }
                    }
                }

                sortPopup.classList.remove('visible');
                document.body.style.overflow = '';
            });
        }
    });
})();