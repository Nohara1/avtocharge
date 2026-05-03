(() => {
    /**
     * Tooltip Plugin
     * Обрабатывает элементы с атрибутом data-plug-tooltip и показывает подсказки при наведении
     */

    // Класс для управления tooltip
    class TooltipManager {
        constructor() {
            this.activeTooltip = null;
            this.tooltipElement = null;
            this.init();
        }

        init() {
            // Находим все элементы с атрибутом data-plug-tooltip
            const tooltipTriggers = document.querySelectorAll('[data-plug-tooltip]');
            
            // Добавляем обработчики событий
            tooltipTriggers.forEach(trigger => {
                trigger.addEventListener('mouseenter', this.showTooltip.bind(this, trigger));
                trigger.addEventListener('mouseleave', this.hideTooltip.bind(this));
            });

            // Обработчик для адаптации при изменении размера окна
            window.addEventListener('resize', () => {
                if (this.activeTooltip) {
                    const trigger = this.activeTooltip;
                    this.hideTooltip();
                    this.showTooltip(trigger);
                }
            });
        }

        // Парсинг конфигурации из атрибута
        parseConfig(trigger) {
            try {
                const configStr = trigger.getAttribute('data-plug-tooltip');
                return JSON.parse(configStr);
            } catch (error) {
                console.error('Error parsing tooltip configuration:', error);
                return {};
            }
        }

        // Создание элемента tooltip
        createTooltipElement(config) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip tw-fixed tw-z-50 tw-bg-[#313131] tw-text-white tw-rounded-[4px] tw-p-[8px_12px] tw-max-w-[200px] tw-text-[14px] tw-pointer-events-none has-[.ensub-logo]:tw-max-w-[400px] has-[.ensub-logo]:tw-leading-[1.4]';

            if (config.class) {
                tooltip.classList.add(...config.class.split(' '));
            }
            
            let tooltipContent = '';
            
            // Добавляем заголовок, если он указан
            if (config.title) {
                tooltipContent += `<div class="tw-font-bold tw-mb-[6px]">${config.title}</div>`;
            }
            
            // Добавляем основной контент, если он указан
            if (config.content) {
                tooltipContent += `<div class="">${config.content}</div>`;
            }
            
            tooltip.innerHTML = tooltipContent;

            const ensubLogo = tooltip.querySelector('.ensub-logo');
            if (ensubLogo) {
                ensubLogo.classList.add(
                    'tw-inline-flex', 'tw-items-center', 'tw-justify-center',
                    'tw-w-[16px]', 'tw-h-[16px]', 'tw-p-[2px]',
                    'tw-rounded-full', 'tw-bg-white', 'tw-ml-[2px]'
                );
            }

            return tooltip;
        }

        // Определение позиции tooltip
        calculatePosition(trigger, tooltip, preferredAlign, offset = 5) {
            const triggerRect = trigger.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Конвертируем offset в число, если это строка
            const offsetValue = typeof offset === 'string' ? parseInt(offset, 10) || 0 : offset;
            
            let position = {
                top: 0,
                left: 0
            };
            
            // Получение предпочтительного выравнивания
            const align = preferredAlign || 'bottom';
            
            // Определяем, хватит ли места для размещения tooltip в предпочтительном направлении
            let actualAlign = align;
            
            switch (align) {
                case 'top':
                    if (triggerRect.top < tooltipRect.height) {
                        actualAlign = 'bottom';
                    }
                    break;
                case 'bottom':
                    if (windowHeight - triggerRect.bottom < tooltipRect.height) {
                        actualAlign = 'top';
                    }
                    break;
                case 'left':
                    if (triggerRect.left < tooltipRect.width) {
                        actualAlign = 'right';
                    }
                    break;
                case 'right':
                    if (windowWidth - triggerRect.right < tooltipRect.width) {
                        actualAlign = 'left';
                    }
                    break;
            }
            
            // Расчет позиции на основе фактического выравнивания с учетом отступа
            switch (actualAlign) {
                case 'top':
                    position.top = triggerRect.top - tooltipRect.height - offsetValue;
                    position.left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case 'bottom':
                    position.top = triggerRect.bottom + offsetValue;
                    position.left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case 'left':
                    position.top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    position.left = triggerRect.left - tooltipRect.width - offsetValue;
                    break;
                case 'right':
                    position.top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    position.left = triggerRect.right + offsetValue;
                    break;
            }
            
            // Коррекция позиции, чтобы tooltip не выходил за пределы экрана
            if (position.left < 0) {
                position.left = 0;
            } else if (position.left + tooltipRect.width > windowWidth) {
                position.left = windowWidth - tooltipRect.width;
            }
            
            if (position.top < 0) {
                position.top = 0;
            } else if (position.top + tooltipRect.height > windowHeight) {
                position.top = windowHeight - tooltipRect.height;
            }
            
            return position;
        }

        // Показать tooltip
        showTooltip(trigger) {
            // Сохраняем активный триггер
            this.activeTooltip = trigger;
            
            // Получаем конфигурацию
            const config = this.parseConfig(trigger);
            
            // Создаем элемент tooltip
            this.tooltipElement = this.createTooltipElement(config);
            
            // Добавляем tooltip в конец body
            document.body.appendChild(this.tooltipElement);
            
            // Рассчитываем и устанавливаем позицию с учетом отступа
            const position = this.calculatePosition(trigger, this.tooltipElement, config.align, config.offset);
            
            // Применяем позицию
            this.tooltipElement.style.top = `${position.top}px`;
            this.tooltipElement.style.left = `${position.left}px`;
        }

        // Скрыть tooltip
        hideTooltip() {
            if (this.tooltipElement && this.tooltipElement.parentNode) {
                this.tooltipElement.parentNode.removeChild(this.tooltipElement);
                this.tooltipElement = null;
            }
            
            this.activeTooltip = null;
        }
    }

    new TooltipManager();

})();