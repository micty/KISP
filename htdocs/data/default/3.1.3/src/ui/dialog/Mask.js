
/**
* 遮罩层
* @class
* @name Mask
*/
define('Mask', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');
    
    var Config = require('Config');
    var RandomId = require('RandomId');

    var Sample = module.require('Sample');
    var Style = module.require('Style');


    var mapper = new Mapper();


    /**
    * 构造器。
    * @constructor
    */
    function Mask(config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var prefix = config.prefix;
        var suffix = config.suffix;

        var emitter = new Emitter(this);

        var meta = {
            'id': RandomId.get(prefix, suffix),
            'div': null, //jQuery 包装对象
            'sample': Sample,
            'volatile': config.volatile,
            'emitter': emitter,
            'style': Style.get(config),
            'showTime': 0, //开始显示时的时间点
            'container': config.container,
            'duration': config.duration,
            'append': config.append,
            'eventName': config.eventName,
        };

        mapper.set(this, meta);

    }


    Mask.prototype = /**@lends Mask#*/ {
        constructor: Mask,

        /**
        * $(div) 的快捷方式。
        */
        $: null,

        /**
        * 渲染本组件。
        * 该方法会创建 DOM 节点，并且绑定事件，但没有调用 show()。
        */
        render: function () {
            var meta = mapper.get(this);

            //已经渲染过了
            if (meta.div) {
                return;
            }

            //首次渲染
            var id = meta.id;
            var sample = meta.sample;
            var eventName = meta.eventName;

            var html = $.String.format(sample, {
                'id': id,
            });


            var container = $(meta.container);
            if (meta.append) {
                container.append(html);
            }
            else {
                container.prepend(html);
            }

            var div = meta.div = $('#' + id);

            //暴露一个 jQuery 对象给外面使用。 但为了安全起见，内部不使用这个对象。
            this.$ = div;

            var style = Style.get(meta.style);
            div.css(style);

     

            if (meta.volatile) { //指定了易消失，即点击 mask 层就隐藏

                var self = this;

                var fn = function () {
                    self.hide();

                    //先备份原来的 opacity
                    var opacity = div.css('opacity');

                    //显示一个完全透明的层 200ms，防止点透
                    self.show({ opacity: 0 });

                    setTimeout(function () {
                        div.css('opacity', opacity).hide();
                    }, 200);
                };


                if (eventName == 'touch') {
                    div.touch(fn);
                }
                else {
                    div.on(eventName, fn);
                }
            }


        },

        /**
        * 显示遮罩层。
        */
        show: function (config) {

            //重载 show(duration);
            if (typeof config == 'number') { 
                config = { 'duration': config, };
            }


            var meta = mapper.get(this);
            var emitter = meta.emitter;

            this.render();

            var div = meta.div;

            if (config) {
                var style = Style.get(meta.style, config);
                div.css(style);
            }

            meta.showTime = new Date(); //记录开始显示的时间点
            div.show();


            emitter.fire('show');


            var duration = config && ('duration' in config) ?
                    config.duration :
                    meta.duration;

            if (duration) {
                var self = this;

                setTimeout(function () {
                    self.hide();
                }, duration);
            }

        },

        /**
        * 隐藏遮罩层。
        * @param {number} [lastTime] 需要持续显示的时间。
        */
        hide: function (lastTime) {
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }

            if (!lastTime) {
                hide();
                return;
            }


            var now = new Date();
            var showTime = meta.showTime;

            var useTime = now - showTime;
            var leftTime = lastTime - useTime;

            if (leftTime > 0) {
                setTimeout(hide, leftTime);
            }



            function hide() {
                meta.showTime = 0;
                div.hide();
                meta.emitter.fire('hide');
            }

        },

        /**
        * 移除遮罩层。
        */
        remove: function () {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }

            //reset
            meta.div = null;

            div.off();

            div = div.get(0); //拆除 jQuery 包装。
            div.parentNode.removeChild(div);
            meta.emitter.fire('remove');

        },

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);
        },

        /**
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            this.remove();
            emitter.destroy();

            mapper.remove(this);
        },

    };


    //静态方法
    $.Object.extend(Mask, /**@lends Mask*/{

        filter: function (defaults, config) {

            if (typeof defaults == 'number') { //透明度
                defaults = { 'opacity': defaults };
            }

            if (typeof config == 'number') { //透明度
                config = { 'opacity': config };
            }


            var type = typeof defaults;

            if (type == 'object' && typeof config == 'object') {
                return $.Object.extend({}, defaults, config);
            }

            //禁用 mask
            if (config === false) {
                return null;
            }

            //显式指定使用 mask，如果 defaults 没有，则显式分配一个
            if (config === true) {
                return !defaults || type != 'object' ? {} : defaults;
            }


            //未指定，则使用默认配置指定的，有或没有
            if (config === undefined) {
                return type == 'object' ? defaults :
                    defaults ? {} : null;
            }

            return typeof config == 'object' ? config :
                config ? {} : null;
        },

    });

    return Mask;

});

