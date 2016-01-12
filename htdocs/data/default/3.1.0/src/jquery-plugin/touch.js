

define('jquery-plugin/touch', function (require, module,  exports) {

    var $ = require('$');



    function isTextbox(el) {
        var type = el.type;
        var tagName = el.tagName.toLowerCase();

        if (tagName == 'textarea') {
            return true;
        }

        if (tagName == 'input') {
            return true;
        }

        return false;

    }


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

                    var originalEvent = event.originalEvent;

                    var t = originalEvent.changedTouches[0];
                    x = t.pageX;
                    y = t.pageY;

                    if (cssClass) {
                        $(this).addClass(cssClass);
                    }

                    //在浏览器端长按左键时会弹出浏览器的上下文菜单，会导致按住->拖动来取消的效果失败。
                    //而阻止默认动作，就可以禁止浏览器弹出上下文菜单，但同时也会导致文本框无法获得输入焦点。
                    //因此需要有选择的来阻止默认事件。
                    var target = originalEvent.target;
                    if (!isTextbox(target)) {
                        event.preventDefault();
                    }

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
                var originalEvent = event.originalEvent;

                var t = originalEvent.changedTouches[0];
                x = t.pageX;
                y = t.pageY;


                if (cssClass) {
                    $(this).addClass(cssClass);
                }

                //在浏览器端长按左键时会弹出浏览器的上下文菜单，会导致按住->拖动来取消的效果失败。
                //而阻止默认动作，就可以禁止浏览器弹出上下文菜单，但同时也会导致文本框无法获得输入焦点。
                //因此需要有选择的来阻止默认事件。
                var target = originalEvent.target;
                if (!isTextbox(target)) {
                    event.preventDefault();
                }
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




