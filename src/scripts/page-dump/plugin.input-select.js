console.log('plugin.input-select.js');

/* 
    * Custom input-select list.
    * Manages input-select functionality based on id and data attributes:
    * id - custom-select - Custom list parent wrapper
    * data-selected - Trigger field of the custom select
    * data-arrow - Arrow in trigger field
    * data-label - Text in trigger field
    * data-options - Options list
    * data-select-output - Input that receives the selected value
*/

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('custom-select');
        if (!root) return;

        const selected = root.querySelector('[data-selected]');
        const label = root.querySelector('[data-label]');
        const options = root.querySelector('[data-options]');
        const arrow = root.querySelector('[data-arrow]');
        const input = root.querySelector('[data-select-output]');

        selected.addEventListener('click', () => {
            const isOpen = !options.classList.contains('tw-hidden');
            arrow.classList.toggle('tw-rotate-180', !isOpen);
            options.classList.toggle('tw-hidden');
        });

        options.querySelectorAll('li').forEach(opt => {
            opt.addEventListener('click', () => {
                const value = opt.dataset.value;
                const text = opt.textContent.trim();

                // Сброс чекбоксов у всех элементов
                options.querySelectorAll('li svg').forEach(svg => svg.remove());

                // Добавляем чекбокс к выбранному элементу
                const checkSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                checkSvg.setAttribute("width", "24");
                checkSvg.setAttribute("height", "24");
                checkSvg.setAttribute("viewBox", "0 0 24 24");
                checkSvg.setAttribute("fill", "none");
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", "M20 8.40916L11.8913 16.6219C11.4293 17.0958 10.8203 17.3333 10.2102 17.3334C9.60002 17.3334 8.98628 17.0946 8.51942 16.617L4 12.0876L5.66806 10.3353L10.197 14.8746L18.3236 6.66669L20 8.40916Z");
                path.setAttribute("fill", "#313131");
                checkSvg.appendChild(path);

                opt.prepend(checkSvg);

                label.textContent = text;
                label.classList.remove('tw-text-[#C0C0C0]');
                input.value = value;

                // излучаем событие с выбранным значением
                document.dispatchEvent(new CustomEvent('select:changed', {
                    detail: { value }
                }));

                options.classList.add('tw-hidden');
                arrow.classList.remove('tw-rotate-180');
            });
        });

        // закрытие при клике вне
        document.addEventListener('click', (e) => {
            if (!root.contains(e.target)) options.classList.add('tw-hidden');
        });
    });
})();