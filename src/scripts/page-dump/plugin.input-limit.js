/**
 * Input Limit plugin
 * Manages character input limits for input and textarea elements based on data attributes:
 * - data-input-limit-wrapper: Main container for input limiting functionality
 * - data-input-limit: Attribute on input/textarea that defines the character limit
 * - data-input-limit-counter: Element that displays character count using {length} placeholder
 * - data-input-limit-error: Element where error message is displayed when limit is exceeded
 */
(() => {
    /**
     * Initialize input limit functionality
     */
    const initInputLimit = () => {
        // Find all input limit wrappers on the page
        const inputLimitWrappers = document.querySelectorAll('[data-input-limit-wrapper]');
        
        if (!inputLimitWrappers.length) return;
        
        // Process each wrapper
        inputLimitWrappers.forEach(wrapper => {
            const inputElement = wrapper.querySelector('input[data-input-limit], textarea[data-input-limit]');
            
            if (!inputElement) return;
            
            const limit = parseInt(inputElement.getAttribute('data-input-limit'), 10);
            const counterElement = wrapper.querySelector('[data-input-limit-counter]');
            
            if (isNaN(limit) || limit <= 0) return;
            
            // Initialize counter display
            updateCounter(inputElement, counterElement, limit);
            
            // Add event listeners
            inputElement.addEventListener('input', () => {
                handleInput(inputElement, counterElement, limit);
            });
            
            inputElement.addEventListener('paste', (e) => {
                // Delay to allow paste to complete
                setTimeout(() => {
                    handleInput(inputElement, counterElement, limit);
                }, 10);
            });
        });
    };
    
    /**
     * Handle input event and limit character count
     * @param {HTMLElement} inputElement - Input or textarea element
     * @param {HTMLElement} counterElement - Counter display element
     * @param {number} limit - Character limit
     */
    const handleInput = (inputElement, counterElement, limit) => {
        const currentLength = inputElement.value.length;
        
        // Trim content if it exceeds the limit
        if (currentLength > limit) {
            inputElement.value = inputElement.value.substring(0, limit);
        }
        
        // Update counter
        updateCounter(inputElement, counterElement, limit);
    };
    
    /**
     * Update the character counter display
     * @param {HTMLElement} inputElement - Input or textarea element
     * @param {HTMLElement} counterElement - Counter display element
     * @param {number} limit - Character limit
     */
    const updateCounter = (inputElement, counterElement, limit) => {
        if (!counterElement) return;
        
        const currentLength = inputElement.value.length;
        const template = counterElement.getAttribute('data-input-limit-counter');
        
        if (template && template.includes('{length}')) {
            counterElement.textContent = template.replace('{length}', currentLength);
        } else {
            counterElement.textContent = `${currentLength}/${limit}`;
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInputLimit);
    } else {
        initInputLimit();
    }
    
})();