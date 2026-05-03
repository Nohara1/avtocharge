console.log('plugin.input-file.js');
/**
 * Input File plugin
 * Manages file input functionality based on data attributes:
 * - data-input-file-wrapper: Main container for file input functionality
 * - data-input-file-title: Element that displays file name or default title
 * - data-input-file-reset: Element to reset/clear the selected file
 */
(() => {
    /**
     * Initialize input file functionality
     */
    const initInputFile = () => {
        // Find all input file wrappers on the page
        const inputFileWrappers = document.querySelectorAll('[data-input-file-wrapper]');
        
        if (!inputFileWrappers.length) return;
        
        // Process each wrapper
        inputFileWrappers.forEach(wrapper => {
            const inputElement = wrapper.querySelector('input[type="file"]');
            const titleElement = wrapper.querySelector('[data-input-file-title]');
            const resetElement = wrapper.querySelector('[data-input-file-reset]');
            
            if (!inputElement || !titleElement) return;
            
            // Store original title from attribute
            const originalTitle = titleElement.getAttribute('data-input-file-title');
            
            // Add event listener for file selection
            inputElement.addEventListener('change', (e) => {
                handleFileChange(e.target, wrapper, titleElement, originalTitle);
            });
            
            // Add event listener for reset button
            if (resetElement) {
                resetElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    resetFile(inputElement, wrapper, titleElement, originalTitle);
                });
            }
        });
    };
    
    /**
     * Handle file input change event
     * @param {HTMLInputElement} inputElement - File input element
     * @param {HTMLElement} wrapper - Wrapper element
     * @param {HTMLElement} titleElement - Title display element
     * @param {string} originalTitle - Original title text
     */
    const handleFileChange = (inputElement, wrapper, titleElement, originalTitle) => {
        const files = inputElement.files;
        
        if (files && files.length > 0) {
            const fileName = files[0].name;
            titleElement.textContent = fileName;
            wrapper.classList.add('filled');
        } else {
            titleElement.textContent = originalTitle;
            wrapper.classList.remove('filled');
        }
    };
    
    /**
     * Reset file input
     * @param {HTMLInputElement} inputElement - File input element
     * @param {HTMLElement} wrapper - Wrapper element
     * @param {HTMLElement} titleElement - Title display element
     * @param {string} originalTitle - Original title text
     */
    const resetFile = (inputElement, wrapper, titleElement, originalTitle) => {
        inputElement.value = '';
        titleElement.textContent = originalTitle;
        wrapper.classList.remove('filled');
        
        // Trigger change event to ensure any other listeners are notified
        const changeEvent = new Event('change', { bubbles: true });
        inputElement.dispatchEvent(changeEvent);
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInputFile);
    } else {
        initInputFile();
    }
    
})();