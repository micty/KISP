
/**
* 移动端滚动器。
* 对 iScroll 组件的进一步封装。
* @class
* @name Scroller
*/
define('Scroller', function (require, module, exports) {
    var $ = require('$');
    var Emitter = require('Emitter');
    var $Object = require('Object');
    var Defaults = require('Defaults');
    var Fn = require('Fn');

    var Meta = module.require('Meta');
    var IScroll = module.require('IScroll');
    var Puller = module.require('Puller');
    var Pulldown = module.require('Pulldown');
    var Pullup = module.require('Pullup');

    var mapper = new Map();




    //阻止原生的 touchmove 事件
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, {
        passive: false,
    });

 



    /**
    * 构造函数。
    * 已重载 Scroller(config);             //传入一个配置对象。
    * 已重载 Scroller(container, config);  //容器从配置对象中分离出来。
    */
    function Scroller(container, config) {
        //重载 Scroller(config)
        if ($Object.isPlain(container)) {
            config = container;
            container = config.container;
        }


        config = Defaults.clone(module.id, config);


        var emitter = new Emitter(this);

        var meta = Meta.create(config, {
            'container': container,
            'emitter': emitter,
            '$': $(container),
            'this': this,
        });

        mapper.set(this, meta);

        //对外暴露的属性。
        Object.assign(this, {
            'id': meta.id,
            '$': meta.$,
        });
    }


    //实例方法
    Scroller.prototype = /**@lends Scroller#*/ {
        constructor: Scroller,

        /**
        * 当前实例的 id。
        */
        id: '',

        /**
        * 当前实例关联的 DOM 节点对应的 jQuery 实例。
        * 即 $(container) 的快捷方式。
        */
        $: null,

        /**
        * 原始的 IScroll 实例。
        * 在调用 render() 后才存在。
        */
        iscroll: null,


        /**
        * 渲染。
        */
        render: function () {
            var meta = mapper.get(this);

            //已渲染。
            if (meta.scroller) {
                return;
            }

            meta.scroller = this.iscroll = IScroll.create(meta.container, meta.options);
            meta.$.addClass('KISP Scroller');
            meta.$.css(meta.style);

            Puller.bind(meta);
            Pulldown.bind(meta);
            Pullup.bind(meta);

        },

        /**
        * 刷新。
        * @param {number} delay 要延迟执行的时间。
        */
        refresh: function (delay, ...args) {
            var meta = mapper.get(this);
            var scroller = meta.scroller;
            var indicators = scroller.indicators || [];

            Fn.delay(delay, function () {
                scroller.refresh(...args);

                //隐藏全部滚动条
                indicators.forEach(function (item, index) {
                    $(item).hide();
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
        * 已重载 pulldown(load);       //设定下拉刷新时的加载函数。
        * 已重载 pulldown(options);    //设定复杂的选项。
        *   options = {
        *       min: 0,     //下拉开始生效的最小 y 值。
        *       max: 0,     //下拉结束生效的最大 y 值。
        *       top: 0,     //指示器最终停留的位置。
        *       release: 0, //释放后回弹到的位置。
        *       translateY, //初始时，指示器隐藏的位置。
        *       tips: {     //指示器的提示语集合。
        *           start: '↓ 下拉刷新',
        *           reach: '↑ 释放立即刷新',
        *           loading: '加载中...',
        *           success: '√ 刷新成功',
        *       },
        *       load: fn,   //下拉刷新时的加载函数。 如果指定此项，则会使用 KISP 内部实现的简单的下拉刷新的 UI 及功能。
        *   };
        */
        pulldown: function (options) {
            //重载 pulldown(load); 
            //设置下拉刷新的加载函数。
            if (typeof options == 'function') {
                options = { 'load': options, };
            }
            else {
                options = options || {};
            }


            var meta = mapper.get(this);
            var pulldown = Object.assign(meta.pulldown, options);
            var min = pulldown.min;
            var max = pulldown.max;

            if (min > max) {
                throw new Error(`参数 min 的值不能大于参数 max 的值。`);
            }

            if (!min && !max) {
                throw new Error(`参数 min 和 max 的值不能全为零。`);
            }

            pulldown.enabled = true;

            Puller.bind(meta);
            Pulldown.bind(meta);
           

        },

        /**
        * 监控上拉动作。
        * 已重载 pullup(load);       //设定上拉时的加载函数。
        * 已重载 pullup(options);    //设定复杂的选项。
        *   options = {
        *       min: 0,             //上拉开始生效的最小 y 值。
        *       max: 0,             //上拉结束生效的最大 y 值。
        *       bottom: 0,          //指示器最终停留的位置。
        *       release: 0,         //释放后回弹到的位置。
        *       translateY,         //初始时，指示器隐藏的位置。
        *       lastPage: false,    //是否为最后一页。 如果是，则表示没有更多数据，则停用上拉加载更多功能。
        *       tips: {             //指示器的提示语集合。
        *           start: '↑ 上拉加载更多',   //
        *           reach: '↓ 释放立即加载',   //
        *           loading: '加载中...',      //    
        *           lastPage: '已是最后一页',  //
        *       },
        *       load: fn,       //上拉时的加载函数。 如果指定此项，则会使用 KISP 内部实现的简单的上拉加载更多的 UI 及功能。
        *   };
        */
        pullup: function (options) {
            //重载 pullup(load); 
            //设置下拉刷新的加载函数。
            if (typeof options == 'function') {
                options = { 'load': options, };
            }
            else {
                options = options || {};
            }


            var meta = mapper.get(this);
            var pullup = Object.assign(meta.pullup, options);
            var min = pullup.min;
            var max = pullup.max;

            if (min > max) {
                throw new Error(`参数 min 的值不能大于参数 max 的值。`);
            }

            if (!min && !max) {
                throw new Error(`参数 min 和 max 的值不能全为零。`);
            }

            pullup.enabled = true;

            Puller.bind(meta);
            Pullup.bind(meta);


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
        * 启用或禁用本组件。
        */
        enable: function (enabled) {
            var meta = mapper.get(this);

            meta.enabled = !!enabled;

            if (meta.enabled) {
                meta.scroller.enable();
            }
            else {
                meta.scroller.disable();
            }

            return meta.enabled;
        },


        /**
        * 监听事件。
        */
        on: function (...args) {
            var meta = mapper.get(this);
            meta.emitter.on(...args);
        },

        /**
        * 销毁本实例对象。
        */
        destroy: function () {
            var meta = mapper.get(this);

            meta.emitter.destroy();
            meta.scroller.destroy();

            mapper.remove(this);
        },

    };


    return Scroller;


});


