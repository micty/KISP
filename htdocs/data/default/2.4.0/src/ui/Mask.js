
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

    var Sample = require(module, 'Sample');
    var Style = require(module, 'Style');


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

            'div': null,
            'sample': Sample,
            'volatile': config.volatile,
            'emitter': emitter,
            'hasBind': false, //是否已绑定事件
            'style': Style.get(config),
            'showTime': 0, //开始显示时的时间点
            'container': config.container,
            'duration': config.duration,
        };

        mapper.set(this, meta);

    }


    Mask.prototype = /**@lends Mask#*/ {
        constructor: Mask,

        /**
        * 渲染本组件。
        * 该方法会创建 DOM 节点，并且绑定事件，但没有调用 show()。
        */
        render: function () {

            var meta = mapper.get(this);

            var div = meta.div;
            if (div) {
                return div;
            }

            var id = meta.id;
            var sample = meta.sample;
            var html = $.String.format(sample, {
                'id': id,
            });

            $(meta.container).prepend(html);
            div = meta.div = document.getElementById(id);

            $(div).on('click', function () {
                meta.emitter.fire('click');
            });


            if (!meta.hasBind) {
                meta.hasBind = true;

                if (meta.volatile) { //指定了易消失，即点击 mask 层就隐藏

                    var self = this;

                    $(div).on('click', function () {
                        self.hide();

                        //显示一个完全透明的层 200ms，防止点透
                        self.show({ opacity: 0, duration: 200 });
                    });
                }
            }

            return div;

        },

        /**
        * 显示遮罩层。
        */
        show: function (config) {

            if (typeof config == 'number') { //重载 show(duration);
                config = { 'duration': config, };
            }
            else {
                config = config || {};
            }


            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var style = Style.get(meta.style, config);
            
            meta.showTime = new Date(); //记录开始显示的时间点

            this.render();
            $(meta.div).css(style).show();

            emitter.fire('show');


            var duration = 'duration' in config ? config.duration : meta.duration;

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
                $(div).hide();
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
            meta.hasBind = false;

            $(div).off();

            document.body.removeChild(div);
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

