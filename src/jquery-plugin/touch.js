

define('jquery-plugin/touch', function (require, module,  exports) {

    var $ = require('$');


    function touch(selector, fn, cssClass) {

        //重载 touch( { }, cssClass) 批量的情况
        if ($.Object.isPlain(selector)) {

            var self = this;
            cssClass = fn;
            fn = null;

            $.Object.each(selector, function (key, fn) {
                touch.call(self, key, fn, cssClass);
            });

            return this;
        }

        var x = 0;
        var y = 0;


        //重载 touch(fn, cssClass)，
        //如 $(div).touch(fn, cssClass)
        if (typeof selector == 'function') {

            cssClass = fn;
            fn = selector;
            selector = null;

            return $(this).on({
                'touchstart': function (event) {

                    var t = event.originalEvent.changedTouches[0];
                    x = t.pageX;
                    y = t.pageY;

                    if (cssClass) {
                        $(this).addClass(cssClass);
                    }

                    event.preventDefault();
                },

                'touchend': function (event) {

                    if (cssClass) {
                        $(this).removeClass(cssClass);
                    }

                    var t = event.originalEvent.changedTouches[0];
                    var dx = t.pageX - x;
                    var dy = t.pageY - y;
                    var dd = Math.sqrt(dx * dx + dy * dy);

                    x = 0;
                    y = 0;

                    if (dd > 10) {
                        return;
                    }

                    var args = [].slice.call(arguments);
                    fn.apply(this, args);
                },
            });
        }



        //此时为 $(div).touch(selector, fn, cssClass)
        return $(this).delegate(selector, {

            'touchstart': function (event) {
                var t = event.originalEvent.changedTouches[0];
                x = t.pageX;
                y = t.pageY;


                if (cssClass) {
                    $(this).addClass(cssClass);
                }
                event.preventDefault();
            },

            'touchend': function (event) {

                if (cssClass) {
                    $(this).removeClass(cssClass);
                }

                var t = event.originalEvent.changedTouches[0];
                var dx = t.pageX - x;
                var dy = t.pageY - y;
                var dd = Math.sqrt(dx * dx + dy * dy);

                x = 0;
                y = 0;

                if (dd > 10) {
                    return;
                }

                var args = [].slice.call(arguments, 0);
                fn.apply(this, args);
            }
        });
    }


    //扩展 jQuery
    $.Object.extend($.fn, {
        touch: touch
    });


    return $;

});




