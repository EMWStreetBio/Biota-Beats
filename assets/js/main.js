/*
 Telephasic and Stellar by HTML5 UP
 html5up.net | @ajlkn
 Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
 */

(function ($) {

    skel.breakpoints({
        normal: '(max-width: 1280px)',
        narrow: '(max-width: 1080px)',
        narrower: '(max-width: 820px)',
        mobile: '(max-width: 736px)',
        mobilep: '(max-width: 480px)'
    });

    $(function () {

        var $window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function () {
            $body.removeClass('is-loading');
        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on narrower.
        skel.on('+narrower -narrower', function () {
            $.prioritize(
                '.important\\28 narrower\\29',
                skel.breakpoint('narrower').active
            );
        });

        // CSS polyfills (IE<9).
        if (skel.vars.IEVersion < 9)
            $(':last-child').addClass('last-child');

        // Dropdowns.
        $('#nav > ul').dropotron({
            mode: 'fade',
            speed: 300,
            alignment: 'center',
            noOpenerFade: true
        });

        // Off-Canvas Navigation.

        // Navigation Button.
        $(
            '<div id="navButton">' +
            '<a href="#navPanel" class="toggle"></a>' +
            '</div>'
        )
            .appendTo($body);

        // Navigation Panel.
        $(
            '<div id="navPanel">' +
            '<nav>' +
            '<a href="index.html" class="link depth-0">Home</a>' +
            $('#nav').navList() +
            '</nav>' +
            '</div>'
        )
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                resetScroll: true,
                resetForms: true,
                side: 'top',
                target: $body,
                visibleClass: 'navPanel-visible'
            });

        // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#navButton, #navPanel, #page-wrapper')
                .css('transition', 'none');

        var $nav = $('#nav_2');

        if ($nav.length > 0) {

            // Shrink effect.
            $main
                .scrollex({
                    mode: 'top',
                    enter: function () {
                        $nav.addClass('alt');
                    },
                    leave: function () {
                        $nav.removeClass('alt');
                    },
                });

            // Links.
            var $nav_a = $nav.find('a');

            $nav_a
                .scrolly({
                    speed: 1000,
                    offset: function () {
                        return $nav.height();
                    }
                })
                .on('click', function () {

                    var $this = $(this);

                    // External link? Bail.
                    if ($this.attr('href').charAt(0) != '#')
                        return;

                    // Deactivate all links.
                    $nav_a
                        .removeClass('active')
                        .removeClass('active-locked');

                    // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
                    $this
                        .addClass('active')
                        .addClass('active-locked');

                })
                .each(function () {

                    var $this = $(this),
                        id = $this.attr('href'),
                        $section = $(id);

                    // No section for this link? Bail.
                    if ($section.length < 1)
                        return;

                    // Scrollex.
                    $section.scrollex({
                        mode: 'middle',
                        initialize: function () {

                            // Deactivate section.
                            if (skel.canUse('transition'))
                                $section.addClass('inactive');

                        },
                        enter: function () {

                            // Activate section.
                            $section.removeClass('inactive');

                            // No locked links? Deactivate all links and activate this section's one.
                            if ($nav_a.filter('.active-locked').length == 0) {

                                $nav_a.removeClass('active');
                                $this.addClass('active');

                            }

                            // Otherwise, if this section's link is the one that's locked, unlock it.
                            else if ($this.hasClass('active-locked'))
                                $this.removeClass('active-locked');

                        }
                    });

                });

        }

        // Scrolly.
        $('.scrolly').scrolly({
            speed: 1000
        });

    });

})(jQuery);