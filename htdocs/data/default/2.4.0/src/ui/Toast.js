
/**
* 简易信息提示组件
* @class
* @name Toast
*/
define('Toast', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var RandomId = require('RandomId');

    //子模块
    var Sample = require(module, 'Sample');
    var Style = require(module, 'Style');

    var mapper = new Mapper();



    function render(style) {

        var meta = mapper.get(this);

        var id = meta.id;
        var sample = meta.sample;

        var Style = require('Style');

        var html = $.String.format(sample, {
            'id': id,
            'icon': meta.icon,
            'icon-id': meta.iconId,
            'text-id': meta.textId,
            'text': meta.text,
            'style': Style.stringify(style),
            'cssClass': meta.cssClass,
        });

        $(document.body).prepend(html);

        var div = document.getElementById(id);
        meta.div = div;

        return div;

    }


    /**
    * 构造器。
    * @constructor
    */
    function Toast(config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var emitter = new Emitter(this);

        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }

        var text = config.text;
        if (!text && text !== 0) { // 0 除外
            cssClass += ' no-text'; //注意，前面要有个空格
        }
        else {
            cssClass += ' has-text';
        }

        var icon = config.icon;
        cssClass += icon ? ' has-icon' : ' no-icon';

        var prefix = config.prefix;
        var suffix = config.suffix;

        var meta = {

            'id': RandomId.get(prefix, suffix),
            'icon': icon,
            'iconId': RandomId.get(prefix, 'icon-', suffix),
            'textId': RandomId.get(prefix, 'text-', suffix),

            'div': null,
            'sample': Sample.get(config.sample), //加载相应的 HTML 模板
            'text': text,
            'emitter': emitter,
            'mask': config.mask,
            'masker': null, // Mask 的实例，重复使用
            'style': Style.get(config),
            'showTime': 0, //开始显示时的时间点
            'cssClass': cssClass,
            'duration': config.duration,
        };

        mapper.set(this, meta);

    }


    //实例方法
    Toast.prototype = /**@lends Toast#*/ {
        constructor: Toast,

        /**
        * 显示本组件。
        */
        show: function (text, config) {

            var type = typeof text;
            
            if (type == 'object') { //重载 show(config)
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


            $(div).css(style);

            var Mask = require('Mask');
            var mask = Mask.filter(meta.mask, config.mask);
            var masker = meta.masker;

            //指定了启用 mask 层
            if (mask) {
                if (!masker) {
                    masker = new Mask();
                    meta.masker = masker;
                }
                masker.show(mask);
            }
            else {
                if (masker) { //之前已经创建了，并且可能是显示的。
                    masker.hide();
                }
            }


            if (text !== undefined && text != meta.text) {
                $('#' + meta.textId).html(text);
                meta.text = text;
                $(div).removeClass('no-text').addClass('has-text');
            }


            if ('icon' in config) {
                var icon = config.icon;
                if (icon) {
                    $(div).removeClass('no-icon').addClass('has-icon');

                    if (icon != meta.icon) {
                        $('#' + meta.iconId).removeClass('fa-' + meta.icon).addClass('fa-' + icon);
                        meta.icon = icon;
                    }
                }
                else {
                    $(div).removeClass('has-icon').addClass('no-icon');
                }
            }


            meta.showTime = new Date(); //记录开始显示的时间点

            $(div).show();
            meta.emitter.fire('show');

            //优先使用参数中的，当不存在时，再使用 meta 的 
            var duration = 'duration' in config ? config.duration : meta.duration;

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

            var now = new Date();
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

    return Toast;

});

