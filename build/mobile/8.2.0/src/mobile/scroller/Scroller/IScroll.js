
define('Scroller/IScroll', function (require, module, exports) {
    var $ = require('$');
    var $Object = require('Object');
    var IScroll = require('IScroll');



    //判断是否有滚动条。
    function hasScrollBar(scroller) {
        var indicators = scroller.indicators || [];
        var hasX = scroller.hasHorizontalScroll;
        var hasY = scroller.hasVerticalScroll;
        var len = indicators.length;

        return (len == 1 && (hasX || hasY)) ||
            (len == 2 && (hasX && hasY));
    }


    //获取滚动条的 jQuery 包装后的数组。
    function getInicators(scroller) {
        var list = scroller.indicators || [];

        list = list.map(function (item, index) {
            var $item = $(item.indicator);
            return $item;
        });

        return list;
    }






    return {
        create: function (container, options) {
            //传入的 container 是 jQuery 实例。
            if (container instanceof $) {
                container = container.get(0);
            }

            var scroller = new IScroll(container, options);
            var indicators = getInicators(scroller);
            var isScrolling = false;    //指示是否正在滚动，即已经开始滚动。
            var tid = null;             //timeoutId。


            //先全部隐藏滚动指示条。
            indicators.forEach(function ($) {
                $.hide();
            });


            scroller.on('scroll', function () {
                if (!this.hasVerticalScroll) {
                    this._translate(0, (this.distY * 0.5) >> 0);
                }
            });

            //按下并开始滚动时触发。
            scroller.on('scrollStart', function () {
                isScrolling = true;
                clearTimeout(tid);

                //没有滚动条。
                if (!hasScrollBar(scroller)) {
                    return;
                }

                //恢复显示所有的滚动条。
                indicators.forEach(function ($, index) {
                    $.css('opacity', 1); // for zepto
                    $.show();
                });
            });


            //滚动结束时。
            scroller.on('scrollEnd', function () {
                isScrolling = false;

                //当第一个 `scrollEnd` 中的 fadeOut() 还没执行完就又开始第二个 `beforeScrollStart` 时，
                //就会有时间先后的竞争关系。 这会导致第二个 `beforeScrollStart` 中的 show 失效。
                tid = setTimeout(function () {
                    if (!hasScrollBar(scroller)) {
                        return;
                    }

                    indicators.forEach(function ($, index) {
                        //在 zepto 中没有 fadeOut 方法，此处是补充实现的。

                        $.fadeOut('fast', function () {

                            //正在滚动，恢复显示所有的滚动条。
                            if (isScrolling) {
                                $.css('opacity', 1); // for zepto
                                $.show();
                            }
                        });
                    });

                }, 100);
            });

            return scroller;
        },
    };
});