

define('jquery-plugin/touch', function (require, module,  exports) {

    var $ = require('$');


    function touch(selector, fn, cssClass) {

        var isMoving = false;

        //重载 touch(fn, cssClass)，
        //如 $(div).touch(fn, cssClass)
        if (typeof selector == 'function') {

            cssClass = fn;
            fn = selector;
            selector = null;

            return $(this).on({
              
                'touchstart': function (event) {
                    if (cssClass) {
                        $(this).addClass(cssClass);
                    }
                },

                'touchmove': function () {
                    isMoving = true;
                },

                'touchend': function (event) {

                    if (cssClass) {
                        $(this).removeClass(cssClass);
                    }

                    if (isMoving) {
                        isMoving = false;
                        return;
                    }

                    var args = [].slice.call(arguments);
                    fn.apply(this, args);
                },
            });
        }

        //重载 touch( { }, cssClass) 批量的情况
        if ($.Object.isPlain(selector)) {
            var self = this;

            $.Object.each(selector, function (key, fn) {
                touch.call(self, key, fn, cssClass);
            });

            return this;
        }


        //此时为 $(div).touch(selector, fn, cssClass)
        return $(this).delegate(selector, {

            'touchstart': function (event) {
                if (cssClass) {
                    $(this).addClass(cssClass);
                }
            },

            'touchmove': function () {
                isMoving = true;
            },

            'touchend': function (event) {
                if (cssClass) {
                    $(this).removeClass(cssClass);
                }

                if (isMoving) {
                    isMoving = false;
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




