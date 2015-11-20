
/**
* 加载中提示组件
* @class
* @name Loading
*/
define('Loading', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var RandomId = require('RandomId');

    //子模块
    var Sample = module.require('Sample');
    var Style = module.require('Style');
    var Presettings = module.require('Presettings');

    var mapper = new Mapper();



    function render(style) {

        var meta = mapper.get(this);

        var id = meta.id;
        var sample = meta.sample;

        var Style = require('Style');

        var html = $.String.format(sample, {
            'id': id,
            'text-id': meta.textId,
            'text': meta.text,
            'style': Style.stringify(style),
            'cssClass': meta.cssClass,
        });

        var container = meta.container;
        if (meta.append) {
            $(container).append(html);
        }
        else {
            $(container).prepend(html);
        }

        var div = document.getElementById(id);
        meta.div = div;

        return div;

    }


   

    /**
    * 构造器。
    * @constructor
    */
    function Loading(config) {

        Mapper.setGuid(this);

    
        var presetting = config ? Presettings[config.presetting] : null;
        config = Config.clone(module.id, presetting, config);


        var emitter = new Emitter(this);

        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }

        var text = config.text;
        if (!text && text !== 0) { // 0 除外
            cssClass += ' no-text'; //注意，前面要有个空格
        }

        var prefix = config.prefix;
        var suffix = config.suffix;

        var meta = {

            'id': RandomId.get(prefix, suffix),
            'textId': RandomId.get(prefix, 'text-', suffix),

            'container': config.container,
            'prepend': config.prepend,
            'div': null,
            'sample': Sample.get(config.sample), //加载相应的 HTML 模板
            'text': text,
            'emitter': emitter,
            'mask': config.mask,
            'masker': null, // Mask 的实例，重复使用
            'style': Style.get(config),
            'showTime': 0, //开始显示时的时间点
            'cssClass': cssClass,
        };

        mapper.set(this, meta);

    }


    //实例方法
    Loading.prototype = /**@lends Loading#*/ {
        constructor: Loading,

        /**
       * 显示本组件。
       */
        show: function (text, config) {


            if (typeof text == 'object') { //重载 show(config)
                config = text;
                text = config.text;
            }

            config = config || {};


            var meta = mapper.get(this);
            var div = meta.div;
            var style = Style.get(meta.style, config);


            if (!div) { //首次 render
                div = render.call(this, style);
            }
            

            //在高版本的 iOS 上，样式必须重新设置，否则 background、top、bottom 
            // 的样式会不生效，至今也没有查出原因
            //else if(config) { //只有指定了 config，才有可能指定 style
            //  $(div).css(style);
            //}

            //用下面这种，相当于重复设置，但可以避免上述问题!!!
            $(div).css(style);

            var Mask = require('Mask');
            var mask = Mask.filter(meta.mask, config.mask);
            var masker = meta.masker;

            //指定了启用 mask 层
            if (mask) {
                if (!masker) {
                    masker = meta.masker = new Mask();
                }

                masker.show(mask);
            }
            else {
                if (masker) { //之前已经创建了，并且可能是显示的。
                    masker.hide();
                }
            }


            if (text !== undefined && text != meta.text) {
                document.getElementById(meta.textId).innerHTML = text;
                meta.text = text;
            }

            meta.showTime = Date.now(); //记录开始显示的时间点

            $(div).show();
            meta.emitter.fire('show');


            var duration = config.duration;
            if (duration) {
                var self = this;
                setTimeout(function () {
                    self.hide();
                }, duration);
            }

        },

        /**
        * 隐藏本组件。
        * @param {number} [lastTime] 需要持续显示的时间。
        */
        hide: function (lastTime) {
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }
            
            if (!lastTime) { //未指定要持续显示的时间，则立即隐藏
                hide();
                return;
            }

            var now = Date.now();
            var showTime = meta.showTime;

            var useTime = now - showTime;       //已经显示的时间
            var leftTime = lastTime - useTime;  //剩余时间

            if (leftTime > 0) {
                setTimeout(hide, leftTime);
            }
            else { //立即隐藏
                hide();
            }

            //内部方法
            function hide() {
                var masker = meta.masker;
                if (masker) {
                    masker.hide();
                }
                meta.showTime = 0;
                $(div).hide();
                meta.emitter.fire('hide');
            }

        },

        /**
        * 移除本组件对应的 DOM 节点。
        */
        remove: function () {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }


            var masker = meta.masker;
            if (masker) {
                masker.remove();
            }

            //reset
            meta.div = null;
            meta.masker = null;
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

    return Loading;

});

