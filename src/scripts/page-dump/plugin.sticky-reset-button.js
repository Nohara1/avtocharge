(() => {
    const init = () => {
        const wrapper = document.querySelector('[data-reset-wrapper]');
        if (!wrapper) return;

        const btn = wrapper.querySelector('button[type="reset"]');
        const sentinel = document.querySelector('[data-reset-sentinel]');

        const syncVisibility = () => {
            wrapper.style.display = btn.classList.contains('hidden') ? 'none' : '';
        };

        new MutationObserver(syncVisibility).observe(btn, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        syncVisibility();

        new IntersectionObserver(([entry]) => {
            const stuck = !entry.isIntersecting;
            
            if (stuck) {
                wrapper.style.background = '#fff';
                wrapper.style.padding = '16px';
                wrapper.style.margin = window.innerWidth < 1024 ? '12px -12px 0px' : '12px 0px 0px';
                wrapper.style.borderRadius = '20px 20px 0 0';
                wrapper.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            } else {
                wrapper.style.background = '';
                wrapper.style.padding = '';
                wrapper.style.margin = '';
                wrapper.style.borderRadius = '';
                wrapper.style.boxShadow = '';
            }
        }).observe(sentinel);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();