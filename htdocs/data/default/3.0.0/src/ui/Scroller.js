
/**
* 移动端滚动器。
* 对 iScroll 组件的进一步封装。
* @class
* @name Scroller
*/
define('Scroller', function (require, module,  exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var IScroll = require('IScroll');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var Style = require('Style');

    var mapper = new Mapper();


    //阻止原生的 touchmove 事件
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);


    /**
    * 滚动器构造函数。
    */
    function Scroller(el, config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        //过滤出 iScroll 的所用到的字段
        var obj = $.Object.filter(config, [
            'scrollbars',
            'shrinkScrollbars',
            'preventDefault',
            'probeType',
        ]);
        
        var scroller = new IScroll(el, obj);


        var style = Style.filter(config, [
            'top',
            'left',
            'right',
            'bottom',
            'width',
        ]);

        $(el).addClass('KISP Scroller').css(style);


        var emitter = new Emitter(this);

        //jQuery 包装后的滚动条的数组。
        var indicators = $.Array.keep(scroller.indicators, function (item, index) {
            item = $(item.indicator);
            item.hide();
            return item;
        });


        var meta = {
            'emitter': emitter,
            'scroller': scroller,
            'indicators': indicators,
            'pulldown': {},
            'pullup': {},
            'hasBindPull': false, //是否已绑定 pull 中要用到的事件
            'el': el,
            'resize': null, //针对 $(el).on('resize', meta.resize)
        };

        mapper.set(this, meta);

        
        //判断是否有滚动条。
        function hasScrollBar() {
            var hasX = scroller.hasHorizontalScroll;
            var hasY = scroller.hasVerticalScroll;
            var len = indicators.length;

            return (len == 1 && (hasX || hasY)) ||
                (len == 2 && (hasX && hasY));
        }


        scroller.on('scroll', function () {
            if (!this.hasVerticalScroll) {
                this._translate(0, (this.distY * 0.5) >> 0);
            }
        });

        var timeoutId = null;
        var isScrolling = false;

        //按下并开始滚动时触发
        scroller.on('scrollStart', function () {
            isScrolling = true;
            clearTimeout(timeoutId);
            if (!hasScrollBar()) {
                return;
            }

            $.Array.each(indicators, function (item, index) {
                item.css('opacity', 1); // for zepto
                item.show();
            });
        });

        scroller.on('scrollEnd', function () {
            isScrolling = false;

            //当第一个 scrollEnd 中的 fadeOut 还没执行完就又开始第二个 beforeScrollStart 时，
            //就会有时间先后的竞争关系。 这会导致第二个 beforeScrollStart 中的 show 失效
            timeoutId = setTimeout(function () {
                if (!hasScrollBar()) {
                    return;
                }

                $.Array.each(indicators, function (item, index) {
                    //在 zepto 中没有 fadeOut 方法，因此是补充实现的
                    item.fadeOut('fast', function () {
                        if (isScrolling) {
                            item.css('opacity', 1); // for zepto
                            item.show();
                        }
                    });
                });
            }, 100);
        });

        if (config.autoRefresh) { 
            var self = this;
            var resize = meta.resize = function () {
                var meta = mapper.get(self);

                if (!meta) { //不存在，说明已经调用了 destroy()
                    return;
                }

                self.refresh();
            };

            //需要 jQuery 插件，详情: https://github.com/cowboy/jquery-resize
            $(el).on('resize', resize);
            
        }


    }


    //实例方法
    Scroller.prototype = /**@lends Scroller#*/ {
        constructor: Scroller,

        /**
        * 监听事件。
        */
        on: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var scroller = meta.scroller;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);

        },

        /**
        * 刷新。
        */
        refresh: function (delay) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;
            var indicators = meta.indicators;
            var args = [].slice.call(arguments, 1);

            var Fn = require('Fn');

            Fn.delay(delay, function () {
                scroller.refresh.apply(scroller, args);

                //隐藏全部滚动条
                $.Array.each(indicators, function (item, index) {
                    item.hide();
                });
            });
            

        },

        /**
        * 重置。
        */
        reset: function () {
            var meta = mapper.get(this);
            var scroller = meta.scroller;
            scroller.isWaitingForManualReset = false;
            scroller.resetPosition(scroller.options.bounceTime);
        },

        /**
        * 监控下拉动作。
        * 已重载 pulldown(min, max)。
        * @param {Object} config 配置对象。
        * @param {number} config.min 开始时的 y 值。
        * @param {number} config.max 结束时的 y 值。
        * @param {function} config.start 开始下拉时的回调。
        * @param {function} config.enter 进入下拉区间时的回调。
        * @param {function} config.reach 到达最大值时的回调。
        * @param {function} config.release 释放时的回调。
        */
        pulldown: function (config) {
            var meta = mapper.get(this);

            if (typeof config == 'number') { //重载 pulldown(min, max)
                config = {
                    min: config,
                    max: arguments[1]
                };
            }

            meta.pulldown = config;

            if (!meta.hasBindPull) {
                var pull = require(module, 'pull');
                pull(meta);
                meta.hasBindPull = true;
            }

        },


        /**
        * 监控上拉动作。
        已重载 pullup(min, max)。
        * @param {Object} config 配置对象。
        * @param {number} config.min 开始时的 y 值。
        * @param {number} config.max 结束时的 y 值。
        * @param {function} config.start 开始上拉时的回调。
        * @param {function} config.enter 进入上拉区间时的回调。
        * @param {function} config.reach 到达最大值时的回调。
        * @param {function} config.release 释放时的回调。
        */
        pullup: function (config) {

            var meta = mapper.get(this);

            if (typeof config == 'number') { //重载 pullup(min, max)
                config = {
                    min: config,
                    max: arguments[1]
                };
            }

            meta.pullup = config;

            if (!meta.hasBindPull) {
                var pull = require(module, 'pull');
                pull(meta);
                meta.hasBindPull = true;
            }
        },

        /**
        * 滚动到距离顶部的指定位置。
        * @param {number} y 相对于顶部的距离。
        */
        to: function (y) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;
            var options = scroller.options;

            scroller.scrollTo(0, y, options.bounceTime, options.bounceEasing);
        },

        /**
        * 滚动到距离底部的指定位置。
        * @param {number} y 相对于底部的距离。
        */
        toBottom: function (y) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;
            var options = scroller.options;
            var maxScrollY = scroller.maxScrollY;

            y = maxScrollY - y;

            scroller.scrollTo(0, y, options.bounceTime, options.bounceEasing);
        },

        /**
        * 销毁本实例对象。
        */
        destroy: function () {
            var meta = mapper.get(this);

            //移除之前绑定的 resize 事件
            var resize = meta.resize;
            if (resize) {
                $(meta.el).off('resize', resize);
            }

            var scroller = meta.scroller;
            scroller.destroy();

            var emitter = meta.emitter;
            emitter.destroy();

            mapper.remove(this);
        },

        /**
        * 获取原生 scroller 实例的属性值。
        * @param {string} key 要获取的属性名称。
        * @return 返回原生 scroller 实例指定的属性值。
        */
        get: function (key) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;

            return scroller[key];
        },

        /**
        * 调用原生 scroller 实例的方法(call 方式)。
        * @param {string} name 要调用的方法名称。
        * @param arg0 要传递的第一个参数。
        * @param arg1 要传递的第二个参数。
        */
        call: function (name, arg0, arg1) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;

            var args = [].slice.call(arguments, 1);
            return scroller[name].apply(scroller, args);
        },

        /**
        * 调用原生 scroller 实例的方法(apply 方式)。
        * @param {string} name 要调用的方法名称。
        * @param {Array} args 要传递的参数数组。
        */
        apply: function (name, args) {
            var meta = mapper.get(this);
            var scroller = meta.scroller;
            return scroller[name].apply(scroller, args);
        },




    };


    return Scroller;


});


