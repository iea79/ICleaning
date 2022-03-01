(function($) {
    
    initRangeSliders();
    changeQuantity();
    swichNextStep();

    function initRangeSliders() {
        const range = $( ".range__slider" );
        range.each(function(index, el) {
            const wrap = $(this).closest('.range');
            const rezult = wrap.find('.range__rezult');
            const numbers = wrap.find('.range__numbers');
            const input = wrap.find('input[type="hidden"]');
            const min = 1;
            const max = el.dataset.max;
            for (var i = 0; i < max; i++) {
                const num = i+1;
                if (num !== 0 && num <= 10) {
                    numbers.prepend('<i data-num="'+num+'">'+num+'</i>');
                } else {
                    numbers.prepend('<i data-num="'+num+'"></i>');
                }
            }
            $(el).slider({
                // value: 1,
                range: "min",
                min: min,
                max: max,
                animate: true,
                create: function() {
                    setValue($( this ).slider( "value" ));
                },
                slide: function( event, ui ) {
                    setValue( ui.value );
                }
            });

            function setValue(val) {
                if (val >10) {
                    wrap.find('.ui-slider-handle').text( '>' );
                } else {
                    wrap.find('.ui-slider-handle').text( val );
                }
                input.val( val );
                rezult.text( val );
                numbers.find('[data-num]').removeClass('active');
                numbers.find('[data-num="'+val+'"]').addClass('active');
            }
        });
    }

    function changeQuantity() {
        $('.quantity__btn').on('click', function() {
            const wrap = $(this).closest('.quantity');
            const input = wrap.find('[type="number"]');
            let val = input.val();

            if ($(this).hasClass('plus')) {
                input.val(++val);
            }

            if ($(this).hasClass('minus')) {
                if (val > 0) {
                    input.val(--val);
                }
            }
        });

        $('.quantity [type="number"]').on('input', function() {
            if ($(this).val() < 0) {
                $(this).val(0);
            }
        });
    }

    function swichNextStep() {
        const toggle = $('.notCacl__step');
        const steps = $('.notCacl__item');

        toggle.on('click', function() {
            const step = $(this).index() + 1;
            toggle.removeClass('active');
            steps.removeClass('active');
            $('.step_' + step ).addClass('active').removeClass('selected');
            $('.notCacl__step.step_' + step ).next('.notCacl__step').removeClass('selected');
            $('.notCacl__step.step_' + step ).prev('.notCacl__step').addClass('selected');
        });

        $('.btn.next').on('click', function(e) {
            e.preventDefault();
            console.log(e);
            const next = $(this).data('nextStep');
            toggle.each(function(index, el) {
                switchActive(el, next);
            });
            steps.each(function(index, el) {
                switchActive(el, next);
            });
        });

        function switchActive(el, step) {
            if ($(el).hasClass('step_'+step)) {
                $(el).addClass('active');
                $(el).next('.notCacl__step').removeClass('selected');
                $(el).prev('.notCacl__step').addClass('selected');
            } else {
                $(el).removeClass('active');
            }
        }
    }

})(jQuery);
