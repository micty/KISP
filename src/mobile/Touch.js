

define('Touch', function (require, module,  exports) {
    var $Object = require('Object');
    var $ = require('$');

    //判断元素是否为文本输入框。
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


    //创建处理器。
    function createHandler(fn, pressedClass) {
        var x = 0;
        var y = 0;

        return {
            'touchstart': function (event) {
                var originalEvent = event.originalEvent;
                var t = originalEvent.changedTouches[0];
                var target = originalEvent.target;


                x = t.pageX;
                y = t.pageY;

                if (pressedClass) {
                    $(this).addClass(pressedClass);
                }

                //在浏览器端长按左键时会弹出浏览器的上下文菜单，会导致 `按住->拖动` 来取消的效果失败。
                //而阻止默认动作，就可以禁止浏览器弹出上下文菜单，但同时也会导致文本框无法获得输入焦点。
                //因此需要有选择地来阻止默认事件。
                if (!isTextbox(target)) {
                    event.preventDefault();
                }

            },

            'touchend': function (event) {
                if (pressedClass) {
                    $(this).removeClass(pressedClass);
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

                fn.apply(this, [...arguments]);
            },
        };
    }



    /**
    * 扩展 jQuery 原型，使其实例上具有此方法。
    * 已重载 touch({}, pressedClass);  //批量绑定委托。
    * 已重载 touch(fn, pressedClass);  //在当前元素上绑定事件
    * 已重载 touch(selector, fn, pressedClass); //单个绑定委托。
    */
    $.fn.touch = function (selector, fn, pressedClass) {
        //重载 touch({}, pressedClass); 
        //批量绑定的委托。
        //如 $(div).touch({ 's': fn,  ...  }, pressedClass);
        if ($Object.isPlain(selector)) {
            var self = this;
            var selector$fn = selector;

            pressedClass = fn;

            $Object.each(selector$fn, function (selector, fn) {
                var handler = createHandler(fn, pressedClass);

                $(self).delegate(selector, handler);
            });

            return this;
        }


        //重载 touch(fn, pressedClass);
        //在当前元素上绑定。
        //如 $(div).touch(fn, pressedClass);
        if (typeof selector == 'function') {
            pressedClass = fn;
            fn = selector;
            selector = null;

            var handler = createHandler(fn, pressedClass);

            return $(this).on(handler);
        }


        //重载 touch(selector, fn, pressedClass);
        //单个绑定委托。
        //如 $(div).touch(selector, fn, pressedClass);
        var handler = createHandler(fn, pressedClass);

        return $(this).delegate(selector, handler);

    };


    return $;

});




