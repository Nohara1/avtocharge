/**
 * Accordion plugin
 * Manages accordion functionality based on data attributes:
 * - data-plug-accordion: Main accordion container
 * - data-plug-accordion-item: Individual accordion group/item
 * - data-plug-accordion-item-trigger: Clickable element that toggles accordion item
 */
(() => {
    /**
     * Initialize accordion functionality
     */
    const initAccordion = () => {
        // Find all accordion containers on the page
        const accordionContainers = document.querySelectorAll('[data-plug-accordion]');
        
        if (!accordionContainers.length) return;
        
        // Process each accordion container
        accordionContainers.forEach(accordion => {
            // Find all accordion items within the container
            const accordionItems = accordion.querySelectorAll('[data-plug-accordion-item]');
            
            if (!accordionItems.length) return;
            
            // Add click listeners to all triggers
            accordionItems.forEach(item => {
                const trigger = item.querySelector('[data-plug-accordion-item-trigger]');
                
                if (trigger) {
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        toggleAccordionItem(item);
                    });
                }
            });
        });
    };
    
    /**
     * Toggle the state of an accordion item
     * @param {HTMLElement} item - The accordion item element
     */
    const toggleAccordionItem = (item) => {
        const isOpened = item.classList.contains('is-opened');
        
        if (isOpened) {
            item.classList.remove('is-opened');
        } else {

            const parent = item.closest('[data-plug-accordion]');
            if (parent) {
                const siblings = parent.querySelectorAll('[data-plug-accordion-item]');
                siblings.forEach(sibling => sibling.classList.remove('is-opened'));
            }
            
            item.classList.add('is-opened');
        }
    };
    
    initAccordion();
    
})();