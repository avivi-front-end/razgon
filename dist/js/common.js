'use strict';
if (!window.console)
    window.console = {};
if (!window.console.memory)
    window.console.memory = function() {};
if (!window.console.debug)
    window.console.debug = function() {};
if (!window.console.error)
    window.console.error = function() {};
if (!window.console.info)
    window.console.info = function() {};
if (!window.console.log)
    window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------
if (!Modernizr.flexbox) {
    (function() {
        var $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            noFlexboxStickyFooter = function() {
                $pageBody.height('auto');
                if ($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
                } else {
                    $pageWrapper.height('auto');
                }
            };
        $(window).on('load resize', noFlexboxStickyFooter);
    })();
}
if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
    (function() {
        var $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            ieFlexboxFix = function() {
                if ($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageWrapper.height($(window).height());
                    $pageBody.removeClass('flex-none');
                } else {
                    $pageWrapper.height('auto');
                }
            };
        ieFlexboxFix();
        $(window).on('load resize', ieFlexboxFix);
    })();
}

$(function() {

    // placeholder
    //-----------------------------------------------------------------------------
    $('input[placeholder], textarea[placeholder]').placeholder();

    $('.js-people').slick({
        arrows: true
    });

    $('.js-grid').masonry({
        itemSelector: '.photo__item',
        columnWidth: 300
    })

    $('.js-phone').inputmask("+7 (999) 999-99-99"); //static mask

    $('.js-date').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: 'dd MM'
    });

    $('.js-date-weekend').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: 'dd MM',
        beforeShowDay: onlyWeekends
    });

    function onlyWeekends(date) {
        var day = date.getDay();
        return [
            (day == 0 || day == 6),
            ''
        ];
    }

    $('.js-scroll').on('click', function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    })

    jQuery.validator.addMethod("usPhoneFormat", function(value, element) {

        return this.optional(element) || value.replace(/\D/g, '').length == 11
    }, "Введите правильный номер телефона");

    var $reserveForm = $('#reserveForm');

    $reserveForm.on('submit', function() {
        return $reserveFormValidate.form()
    })

    var $reserveFormValidate = $reserveForm.validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                usPhoneFormat: true,
                required: true
            },
            email: {
                required: true,
                email: true
            },
            date: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'Поле должно быть заполнено'
            },
            phone: {
                required: 'Поле должно быть заполнено'
            },
            email: {
                required: 'Поле должно быть заполнено',
                email: 'Проверьте правильность вашего email'
            },
            date: {
                required: 'Поле должно быть заполнено'
            }
        }
    })

    var $popUpForm = $('#pop-up-form');

    $popUpForm.on('submit', function() {
        return $popUpFormValidate.form()
    })

    var $popUpFormValidate = $popUpForm.validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                usPhoneFormat: true,
                required: true
            },

        },
        messages: {
            name: {
                required: 'Поле должно быть заполнено'
            },
            phone: {
                required: 'Поле должно быть заполнено'
            },
            
        }
    })

});

var tabs = (function() {
    var $link = $('.js-quest-link');
    var $btn = $('.js-quest-btn');
    var $item = $('.quest__tabs-item');
    var length = $item.length
    var $current = 1;

    $link.on('click', function(e) {
        e.preventDefault();
        var target = parseInt($(this).attr('href'));
        $current = target;
        setTab()
    })

    $btn.on('click', function(e) {
        e.preventDefault();
        var direction = $(this).attr('data-direction');

        if (direction == 'next') {
            if ($current == length) {
                $current = 1;

            } else {
                $current++
            }

            setTab()

        } else {
            if ($current == 1) {
                $current = length;

            } else {
                $current--
            }
            setTab()
        }

    })

    function setTab() {
        $link.removeClass('active')
        $('.js-quest-link[href=' + $current + ']').addClass('active')
        $item.hide();
        $('.quest__tabs-item#quest-' + $current).show();
    }

    setTab()

})()

var quest = (function() {
    var $link = $('.js-another-quest');
    var $dropLink = $('.js-dropdown-link');
    var $selected = $('.package__selected-item')
    var $dropdown = $('.package__dropdown');
    $link.on('click', function(e) {
        e.preventDefault();
        $dropdown.fadeToggle(200);
    })
    $dropLink.on('click', function(e) {
        e.preventDefault();

        $selected.html($(this).text())
        $dropdown.fadeOut(200)
    })
})()

var menu = (function() {
    var $btn = $('.js-mobile-menu');

    var $menu = $('.header__nav')

    $btn.on('click', function(e) {
        e.preventDefault()
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $menu.slideUp()
        } else {
            $menu.slideDown()
            $(this).addClass('active')
        }

    })
})();

var priceForm = (function() {
    var $checkBtn = $('.js-to-form');

    $checkBtn.on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('data-price');

        $('html, body').animate({
            scrollTop: $('.reserve__wrapper').offset().top
        }, 500);
        $('.reserve__wrapper #price').val(target)

    })
})()

var mapStyle = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
        "saturation": "-20"
    }, {
        "color": "#a28bb5"
    }, {
        "lightness": "50"
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#a28bb5"
    }, {
        "lightness": "-20"
    }, {
        "saturation": "20"
    }]
}, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "on"
    }, {
        "lightness": "-2"
    }, {
        "saturation": "-1"
    }, {
        "hue": "#8e00ff"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{
        "color": "#a28bb5"
    }, {
        "saturation": "15"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#a28bb5"
    }, {
        "lightness": "10"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#a28bb5"
    }, {
        "lightness": "-40"
    }, {
        "weight": 1.2
    }]
}, {
    "featureType": "administrative.land_parcel",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "color": "#a28bb5"
    }, {
        "lightness": "-20"
    }, {
        "saturation": "20"
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#a28bb5"
    }, {
        "lightness": "-25"
    }, {
        "saturation": "20"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#a28bb5"
    }, {
        "lightness": "-35"
    }, {
        "saturation": "20"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 29
    }, {
        "weight": 0.2
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
        "color": "#a28bb5"
    }, {
        "lightness": "-35"
    }, {
        "saturation": "20"
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#a28bb5"
    }, {
        "lightness": "-35"
    }, {
        "saturation": "20"
    }]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#a28bb5"
    }, {
        "lightness": "-10"
    }, {
        "saturation": "20"
    }]
}]

function initMap() {
    var uluru = {
        lat: 56.309164,
        lng: 43.987349
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: uluru
    });
    var marker = new google.maps.Marker({
        icon: new google.maps.MarkerImage('img/map-icon.png', new google.maps.Size(93, 148)),
        position: uluru
    });
    marker.setMap(map);
    map.setOptions({
        scrollwheel: false,
        styles: mapStyle
    });
}
