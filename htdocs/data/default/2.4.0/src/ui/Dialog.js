
/**
* 对话框组件
* @class
* @name Dialog
*/
define('Dialog', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var RandomId = require('RandomId');

    //子模块
    var Sample = require(module, 'Sample');
    var Style = require(module, 'Style');
    var Renderer = require(module, 'Renderer');

    var mapper = new Mapper();


    /**
    * 构造器。
    * @constructor
    */
    function Dialog(config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var emitter = new Emitter(this);

        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }

        var buttons = config.buttons;
        var eventName = config.eventName;

        var prefix = config.prefix;
        var suffix = config.suffix;

        var meta = {
            'id': RandomId.get(prefix, suffix),
            'textId': RandomId.get(prefix, 'text-', suffix),
            'footerId': RandomId.get(prefix, 'footer-', suffix),
            'div': null,
            'scrollable': config.scrollable,
            'scroller': null,
            'eventName': eventName,
            'title': config.title,
            'text': config.text,
            'buttons': buttons,
            'sample': Sample.get(config.sample),//加载相应的 HTML 模板
            'emitter': emitter,
            'mask': config.mask,
            'masker': null,                     // Mask 的实例，重复使用
            'layer': null,                    //用来防止点透用的透明层，
            'cssClass': cssClass,
            'style': Style.get(config),
            'autoClosed': config.autoClosed,    //点击任何一个按钮后是否自动关闭组件
            'visible': false,                   //记录当前组件是否已显示
            'volatile': config.volatile,
            'zIndex': config['z-index'],    //生成透明层时要用到

        };

        mapper.set(this, meta);


        //预绑定事件
        if (buttons && buttons.length > 0) {
            $.Array.each(buttons, function (item, index) {
                var fn = item.fn;
                if (!fn) {
                    return;
                }

                var name = item.name || String(index);
                emitter.on(eventName, 'button', name, fn);
            });
        }

        //当宽度或高度指定了百分比，需要监听窗口的大小变化，以使组件大小相适应
        var obj = $.Object.filter(config, ['width', 'height']);
        $(window).on('resize', function () {
            var p = Style.get(obj);
            $(meta.div).css(p);
        });

    }


    //实例方法
    Dialog.prototype = /**@lends Dialog#*/ {
        constructor: Dialog,

        /**
        * 显示本组件。
        */
        show: function (mask) {
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                div = meta.div = Renderer.render(meta, this);
            }

            var zIndex = meta.zIndex;

            var Mask = require('Mask');
            mask = Mask.filter(meta.mask, mask);
            var masker = meta.masker;

            //指定了启用 mask 层
            if (mask) {
                if (!masker) {
                    masker = new Mask({
                        'z-index': zIndex - 1,
                    });

                    meta.masker = masker;
                    if (meta.volatile) {
                        var self = this;
                        masker.on('click', function () {
                            self.hide();
                        });
                    }
                }
                masker.show(mask);
            }
            else {
                if (masker) { //之前已经创建了，并且可能是显示的。
                    masker.hide();
                }
            }

            //防止点透
            var layer = meta.layer;
            if (!layer) {
                layer = meta.layer = new Mask({
                    opacity: 0,
                    'z-index': zIndex + 1,
                });
            }

            layer.show({ duration: 200 });

            //这里要用异步稍微延迟一下，不然会跟 layer 的 show 几乎是同时的
            setTimeout(function () {
                var style = meta.style;
                $(div).css(style).show();
                meta.visible = true;
                meta.emitter.fire('show');
            }, 0);

        },

        /**
        * 隐藏本组件。
        * @param {number} [lastTime] 需要持续显示的时间。
        */
        hide: function () {
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div || !meta.visible) {
                return;
            }

            var masker = meta.masker;
            if (masker) {
                masker.hide();
            }

            $(div).hide();
            meta.visible = false;
            meta.emitter.fire('hide');

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

            var layer = meta.layer;
            if (layer) {
                layer.remove();
            }

            //reset
            meta.div = null;
            meta.masker = null;
            meta.layer = null;
            meta.visible = false;

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
            var scroller = meta.scroller;

            this.remove();
            emitter.destroy();
            scroller.destroy();

            mapper.remove(this);
        },

    };

    return Dialog;

});

