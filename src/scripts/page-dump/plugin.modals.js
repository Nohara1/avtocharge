/**
 * Modal windows plugin
 * 
 * Features:
 * - Opens modal on click on elements with data-modal-open attribute
 * - Closes modal on click on elements with data-modal-close attribute
 * - Closes modal on click outside modal content (overlay)
 * - Closes modal on ESC key press
 */
(() => {
    'use strict';

    /**
     * CSS class used to show modal windows
     * @type {string}
     */
    const VISIBLE_CLASS = 'visible';

    /**
     * Open modal by ID
     * @param {string} modalId - ID of the modal to open
     */
    const openModal = (modalId) => {
        const modal = document.querySelector(`[data-modal="${modalId}"]`);
        if (!modal) return;

        modal.classList.add(VISIBLE_CLASS);
        document.body.style.overflow = 'hidden'; // Prevent scrolling of background content
    };

    /**
     * Close all open modals
     */
    const closeAllModals = () => {
        const openModals = document.querySelectorAll(`[data-modal].${VISIBLE_CLASS}`);
        if (openModals.length === 0) return;

        openModals.forEach(modal => {
            modal.classList.remove(VISIBLE_CLASS);
        });
        document.body.style.overflow = ''; // Restore scrolling
    };
    
    /**
     * Handle click on modal trigger element
     * @param {Event} event - Click event
     */
    const handleModalTriggerClick = (event) => {
        const trigger = event.target.closest('[data-modal-open]');
        if (!trigger) return;

        const modalId = trigger.getAttribute('data-modal-open');
        if (!modalId) return;

        // Close all other modals first
        closeAllModals();

        // Open target modal
        openModal(modalId);
    };

    /**
     * Handle clicks that should close modals
     * @param {Event} event - Click event
     */
    const handleModalCloseClick = (event) => {
        // Case 1: Clicked on a close button inside modal
        if (event.target.closest('[data-modal-close]')) {
            closeAllModals();
            return;
        }

        // Case 2: Clicked on overlay (outside modal content)
        const modalElement = event.target.closest('[data-modal]');
        if (modalElement && !event.target.closest('[data-modal-content]')) {
            closeAllModals();
            return;
        }
    };

    /**
     * Handle ESC key press to close modals
     * @param {KeyboardEvent} event - Keyboard event
     */
    const handleEscapeKeyPress = (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            closeAllModals();
        }
    };

    // Set up event listeners for modal triggers
    document.addEventListener('click', handleModalTriggerClick);
        
    // Set up event listeners for modal closing
    document.addEventListener('click', handleModalCloseClick);
    document.addEventListener('keydown', handleEscapeKeyPress);

})();