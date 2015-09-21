

define('jquery-plugin/touch', function (require, module,  exports) {

    var $ = require('$');


    function touch(selector, fn) {

        var isMoving = false;

        //重载 touch(fn)，如 $(div).touch(fn)
        if (typeof selector == 'function') {

            fn = selector;

            return $(this).on({
                'touchmove': function () {
                    isMoving = true;
                },

                'touchend': function (e) {
                    if (isMoving) {
                        isMoving = false;
                        return;
                    }

                    var args = [].slice.call(arguments, 0);
                    fn.apply(this, args);
                }
            });
        }

        //重载 touch( { } ) 批量的情况
        if ($.Object.isPlain(selector)) {
            var self = this;

            $.Object.each(selector, function (key, fn) {
                touch.call(self, key, fn);
            });

            return this;
        }


        //此时为 $(div).touch(selector, fn)
        return $(this).delegate(selector, {

            'touchmove': function () {
                isMoving = true;
            },

            'touchend': function (e) {
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




