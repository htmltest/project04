var speedProjectSlider  = 500; // скорость смены фото в описании проекта

var speedSlider         = 1000; // скорость смены слайда на главной странице
var periodSlider        = 3000; // период автоматической смены слайда на главной странице (0 - автоматическая смена отключена)

var speedScroll         = 500;  // скорость скроллинга по форме заказа


var timerSlider         = null;

(function($) {

    $(document).ready(function() {

        // слайдер фотографий в описании проекта
        $('.project-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.find('.project-slider-content ul').width(curSlider.find('.project-slider-content li:first').width() * curSlider.find('.project-slider-content li').length);
        });

        $('.project-slider-ctrl a').click(function() {
            var curSlider = $(this).parents().filter('.project-slider');
            var curIndex = curSlider.find('.project-slider-ctrl a').index($(this));
            curSlider.data('curIndex', 0);
            curSlider.find('.project-slider-ctrl li.active').removeClass('active');
            $(this).parent().addClass('active');
            curSlider.find('.project-slider-content ul').animate({'left': -curIndex * curSlider.find('.project-slider-content li:first').width()}, speedProjectSlider);
            return false;
        });

        // подключение fancybox для документов
        if ($('.docs-preview a').length > 0) {
            $('.docs-preview a').fancybox();
        }

        // выравнивание блоков документов
        $('.docs-item:nth-child(3n)').each(function() {
            curMax = 0;
            if ($(this).height() > curMax) {
                curMax = $(this).height();
            }
            if ($(this).prev().height() > curMax) {
                curMax = $(this).prev().height();
            }
            if ($(this).prev().prev().height() > curMax) {
                curMax = $(this).prev().prev().height();
            }
            $(this).height(curMax);
            $(this).prev().height(curMax);
            $(this).prev().prev().height(curMax);
        });

        if ($('.docs-item').length % 3 == 2) {
            $('.docs-item:last').each(function() {
                curMax = 0;
                if ($(this).height() > curMax) {
                    curMax = $(this).height();
                }
                if ($(this).prev().height() > curMax) {
                    curMax = $(this).prev().height();
                }
                $(this).height(curMax);
                $(this).prev().height(curMax);
            });
        }

        // выравнивание блоков партнеров
        $('.partner:nth-child(3n)').each(function() {
            curMax = 0;
            if ($(this).find('.partner-name').height() > curMax) {
                curMax = $(this).find('.partner-name').height();
            }
            if ($(this).prev().find('.partner-name').height() > curMax) {
                curMax = $(this).prev().find('.partner-name').height();
            }
            if ($(this).prev().prev().find('.partner-name').height() > curMax) {
                curMax = $(this).prev().prev().find('.partner-name').height();
            }
            $(this).find('.partner-name').css({'padding-top': curMax - $(this).find('.partner-name').height()});
            $(this).prev().find('.partner-name').css({'padding-top': curMax - $(this).prev().find('.partner-name').height()});
            $(this).prev().prev().find('.partner-name').css({'padding-top': curMax - $(this).prev().prev().find('.partner-name').height()});
        });

        if ($('.partner').length % 3 == 2) {
            $('.partner:last').each(function() {
                curMax = 0;
                if ($(this).find('.partner-name').height() > curMax) {
                    curMax = $(this).find('.partner-name').height();
                }
                if ($(this).prev().find('.partner-name').height() > curMax) {
                    curMax = $(this).prev().find('.partner-name').height();
                }
                $(this).find('.partner-name').css({'padding-top': curMax - $(this).find('.partner-name').height()});
                $(this).prev().find('.partner-name').css({'padding-top': curMax - $(this).prev().find('.partner-name').height()});
            });
        }

        // слайдер на главной странице
        $('.slider-content').each(function() {
            var curSlider = $(this);
            if (curSlider.find('li').length > 1) {
                curSlider.data('curIndex', 0);
                curSlider.data('disableAnimate', false);

                $('.slider-ctrl a').click(function() {
                    var curSlider = $('.slider-content');
                    if (!curSlider.data('disableAnimate') && !$(this).parent().hasClass('active')) {
                        window.clearTimeout(timerSlider);
                        timerSlider = null;

                        curSlider.data('disableAnimate', true);

                        var curIndex = curSlider.data('curIndex');
                        var newIndex = $('.slider-ctrl a').index($(this));

                        $('.slider-ctrl li.active').removeClass('active');
                        $('.slider-ctrl li').eq(newIndex).addClass('active');

                        curSlider.find('li').eq(curIndex).fadeOut(speedSlider / 2, function() {
                            curSlider.find('li').eq(newIndex).fadeIn(speedSlider / 2, function() {
                                curSlider.data('curIndex', newIndex);
                                curSlider.data('disableAnimate', false);
                                if (periodSlider > 0) {
                                    timerSlider = window.setTimeout(sliderNext, periodSlider);
                                }
                            });
                        });
                    }
                    return false;
                });

                if (periodSlider > 0) {
                    timerSlider = window.setTimeout(sliderNext, periodSlider);
                }
            }
        });

        // каталог на главной странице
        $('.main-catalogue').each(function() {
            var curMax = 0;
            $('.main-catalogue-text').each(function() {
                if (curMax < $(this).height()) {
                    curMax = $(this).height();
                }
            });
            $('.main-catalogue-text').height(curMax);
        });

        // года на главной
        $('.main-company-year-item').mouseover(function() {
            if (!$(this).hasClass('active')) {
                $('.main-company-year-item').removeClass('active');
                $(this).addClass('active');
                var curIndex = $('.main-company-year-item').index($(this));
                $('.main-company-info-item:visible').fadeOut(function() {
                    $('.main-company-info-item').eq(curIndex).fadeIn();
                });
            }
        });

        // подключение fancybox для изображений на странице каталога
        if ($('.detail-images-big a').length > 0) {
            $('.detail-images-big a').fancybox();
        }

        // выбор изображения на странице каталога
        $('.detail-images-preview a').click(function() {
            var curLink = $(this);
            $('.detail-images-big img').attr('src', curLink.attr('href'));
            $('.detail-images-big a').attr('href', curLink.attr('rel'));

            return false;
        });

        // форма заказа
        $('.order-form-type-radio span input:checked').parent().parent().parent().addClass('active');
        $('.order-form-type').click(function() {
            $('.order-form-type').removeClass('active');
            $(this).addClass('active');
            $(this).find('.order-form-type-radio input').prop('checked', true).trigger('change');
        });

        $('.order-form-radio span input:checked').parent().addClass('active');
        $('.order-form-radio-inner').click(function() {
            var curName = $(this).find('span input').attr('name');
            $('.order-form-radio-inner span input[name="' + curName + '"]').parent().removeClass('active');
            $(this).find('span').addClass('active');
            $(this).find('span input').prop('checked', true).trigger('change');
        });

        $('.order-form').each(function() {
            $.extend($.validator.messages, {
                required: 'Поле обязательное для запонения'
            });

            $('#order-short-form').validate();

            $('#order-full-form').validate({
                submitHandler: function(form) {
                    var curStep = $('.order-form-steps div').index($('.order-form-steps div.active'));
                    switch(curStep) {
                        case 0:
                            $('.order-form-steps div').removeClass('active');
                            $('.order-form-steps div').eq(1).addClass('active');
                            $('.order-form-step-active').removeClass('order-form-step-active');
                            $('.order-form-step').eq(1).addClass('order-form-step-active');
                            $('.order-form-submit-back').show();
                            $.scrollTo('#order-full-form', {duration: speedScroll});
                            break;
                        case 1:
                            $('.order-form-steps div').removeClass('active');
                            $('.order-form-steps div').eq(2).addClass('active');
                            $('.order-form-step-active').removeClass('order-form-step-active');
                            $('.order-form-step').eq(2).addClass('order-form-step-active');
                            $('.order-form-submit-back').show();
                            $.scrollTo('#order-full-form', {duration: speedScroll});
                            break;
                        case 2:
                            $('.order-form-steps div').removeClass('active');
                            $('.order-form-steps div').eq(3).addClass('active');
                            $('.order-form-step-active').removeClass('order-form-step-active');
                            $('.order-form-step').eq(3).addClass('order-form-step-active');
                            $('.order-form-submit-back').hide();
                            $('.order-form-btn input').val('Отправить заявку');
                            $.scrollTo('#order-full-form', {duration: speedScroll});
                            break;
                        case 3:
                            form.submit();
                            break;
                    }
                }
            });

            $('.order-form-file input').change(function() {
                $(this).parent().parent().parent().find('span').html($(this).val());
            });

            $('.order-form-submit-back a').click(function() {
                var curStep = $('.order-form-steps div').index($('.order-form-steps div.active'));
                $('.order-form-steps div').removeClass('active');
                $('.order-form-steps div').eq(curStep - 1).addClass('active');
                $('.order-form-step-active').removeClass('order-form-step-active');
                $('.order-form-step').eq(curStep - 1).addClass('order-form-step-active');
                if (curStep == 1) {
                    $('.order-form-submit-back').hide();
                }
            });

        });

    });

    // переход к следующему слайду на главной странице
    function sliderNext() {
        var curSlider = $('.slider-content');
        if (!curSlider.data('disableAnimate')) {
            window.clearTimeout(timerSlider);
            timerSlider = null;

            curSlider.data('disableAnimate', true);

            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex + 1;
            if (newIndex == curSlider.find('li').length) {
                newIndex = 0;
            }

            $('.slider-ctrl li.active').removeClass('active');
            $('.slider-ctrl li').eq(newIndex).addClass('active');

            curSlider.find('li').eq(curIndex).fadeOut(speedSlider / 2, function() {
                curSlider.find('li').eq(newIndex).fadeIn(speedSlider / 2, function() {
                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimate', false);
                    if (periodSlider > 0) {
                        timerSlider = window.setTimeout(sliderNext, periodSlider);
                    }
                });
            });
        }
    }

})(jQuery);