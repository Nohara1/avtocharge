/**
 * Comparison Plugin
 * Управляет таблицей сравнения товаров: переключатель отличий, удаление,
 * мобильные контролы, sticky-шапка с синхронизацией скролла.
 */
(() => {
    if (!window.$ || !document.querySelector('.comparison-table')) return;

    $(document).ready(function () {
        var $table = $('.comparison-table');
        var $thead = $table.find('thead');
        var $allLink = $('.comparison-controls .comparison-params-all');
        var $uniqueLink = $('.comparison-controls .comparison-params-unique');

        // Sync all toggle switch visuals (main, mobile, sticky clone)
        function updateAllToggles() {
            var on = $uniqueLink.hasClass('active');
            $('.cmp-switch').css('background', on ? '#2D8EFF' : '#ccc');
            $('.cmp-knob').css('transform', on ? 'translateX(18px)' : 'translateX(0)');
        }

        function handleToggleClick(e) {
            e.preventDefault();
            if ($uniqueLink.hasClass('active')) {
                $allLink.trigger('click');
            } else {
                $uniqueLink.trigger('click');
            }
            setTimeout(updateAllToggles, 10);
        }

        function buildToggle() {
            return $(
                '<label class="cmp-diff-toggle" style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none;white-space:nowrap;">' +
                    '<span style="font-size:16px; font-weight:500; line-height:1.3;">Показать только отличия</span>' +
                    '<span class="cmp-switch" style="' +
                        'position:relative;display:inline-flex;flex-shrink:0;' +
                        'width:40px;height:22px;border-radius:11px;' +
                        'transition:background .2s;' +
                    '">' +
                        '<span class="cmp-knob" style="' +
                            'position:absolute;top:2px;left:2px;' +
                            'width:18px;height:18px;border-radius:50%;background:#fff;' +
                            'box-shadow:0 1px 3px rgba(0,0,0,.2);' +
                            'transition:transform .2s;' +
                        '"></span>' +
                    '</span>' +
                '</label>'
            );
        }

        function deleteAll() {
            var $heads = $table.find('thead td[data-id]');
            var queue = [];
            $heads.each(function () {
                queue.push({ list: $(this).data('list'), resource: $(this).data('id') });
            });
            (function next(i) {
                if (i >= queue.length) { document.location.reload(); return; }
                $.post(document.location.href, {
                    cmp_action: 'remove',
                    list: queue[i].list,
                    resource: queue[i].resource
                }, function () { next(i + 1); }, 'json');
            })(0);
        }

        // --- Main toggle (desktop, inside .comparison-controls) ---
        (function () {
            var $container = $('.comparison-controls');
            if (!$container.length || !$allLink.length || !$uniqueLink.length) return;
            var $toggle = buildToggle();
            $container.prepend($toggle);
            $toggle.on('click', handleToggleClick);
        })();

        // --- Mobile controls (div above the table) ---
        (function () {
            if (!$allLink.length || !$uniqueLink.length) return;
            var $mobileToggle = buildToggle();
            $mobileToggle.on('click', handleToggleClick);
            var $mobileReset = $('<button type="button" class="cmp-mobile-reset">Удалить все</button>');
            $mobileReset.on('click', deleteAll);
            var $mobileControls = $('<div class="cmp-mobile-controls"></div>');
            $mobileControls.append($mobileToggle).append($mobileReset);
            $table.before($mobileControls);
        })();

        // --- Delete all (desktop button from admin) ---
        $(document).on('click', '.comparison-params-reset-list', deleteAll);

        updateAllToggles();

        // --- Sticky bar (exact thead clone) ---
        (function () {
            if (!$thead.length || !$thead.find('td[data-id]').length) return;

            var $tableWrap = $table.closest('.table-wrap');

            // Persistent containers
            var $stickyScroll = $('<div class="cmp-sticky-scroll"></div>');

            var $stickyMobileToggle = buildToggle();
            $stickyMobileToggle.on('click', handleToggleClick);
            var $stickyMobileReset = $('<button type="button" class="cmp-mobile-reset">Удалить все</button>');
            $stickyMobileReset.on('click', deleteAll);
            var $stickyMobileControls = $('<div class="cmp-mobile-controls"></div>');
            $stickyMobileControls.append($stickyMobileToggle).append($stickyMobileReset);

            var $sticky = $('<div class="cmp-sticky"></div>');
            $sticky.append($stickyMobileControls).append($stickyScroll);
            $('body').append($sticky);

            // Re-clone thead content into sticky scroll wrapper
            function rebuildStickyContent() {
                $stickyScroll.empty();
                var $stickyThead = $thead.clone(true, false);
                var $stickyTable = $('<table class="compare-table comparison-table"></table>');
                $stickyTable.append($stickyThead);
                $stickyScroll.append($stickyTable);

                // Re-bind toggle in clone
                $stickyThead.find('.cmp-diff-toggle').on('click', handleToggleClick);

                // Re-bind delete all in clone
                $stickyThead.find('.comparison-params-reset-list').on('click', function (e) {
                    e.stopImmediatePropagation();
                    deleteAll();
                });

                // Re-bind comparison-remove in clone
                $stickyThead.on('click', '.comparison-remove', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var $td = $(this).closest('td[data-id]');
                    $.post(document.location.href, {
                        cmp_action: 'remove',
                        list: $td.data('list'),
                        resource: $td.data('id')
                    }, function () { document.location.reload(); }, 'json');
                });

                updateAllToggles();
            }
            rebuildStickyContent();

            // Watch original thead for DOM changes (product removed via AJAX)
            new MutationObserver(function () {
                rebuildStickyContent();
            }).observe($thead[0], { childList: true, subtree: true });

            // Mirror .table-wrap position and width onto .cmp-sticky-scroll
            function syncStickyLayout() {
                var rect = $tableWrap[0].getBoundingClientRect();
                $stickyScroll.css({
                    marginLeft: rect.left + 'px',
                    width: rect.width + 'px'
                });
            }
            syncStickyLayout();
            $(window).on('resize', syncStickyLayout);

            // Sync horizontal scroll between table-wrap and sticky scroll wrapper
            var syncing = false;
            $tableWrap.on('scroll', function () {
                if (syncing) return;
                syncing = true;
                $stickyScroll[0].scrollLeft = $tableWrap[0].scrollLeft;
                syncing = false;
            });
            $stickyScroll.on('scroll', function () {
                if (syncing) return;
                syncing = true;
                $tableWrap[0].scrollLeft = $stickyScroll[0].scrollLeft;
                syncing = false;
            });

            // Show/hide when original thead leaves viewport
            if ('IntersectionObserver' in window) {
                new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            $sticky.removeClass('visible');
                        } else if (entry.boundingClientRect.top < 0) {
                            $sticky.addClass('visible');
                            syncStickyLayout();
                            $stickyScroll[0].scrollLeft = $tableWrap[0].scrollLeft;
                        } else {
                            $sticky.removeClass('visible');
                        }
                    });
                }, { threshold: 0 }).observe($thead[0]);
            }
        })();
    });
})();
