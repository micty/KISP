
/**
* 对话框组件
* @class
* @name Dialog
*/
define('Dialog', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var RandomId = require('RandomId');

    //子模块
    var Sample = module.require('Sample');
    var Style = module.require('Style');
    var Renderer = module.require('Renderer');

    var mapper = require('Mapper');


    /**
    * 构造器。
    * @constructor
    */
    function Dialog(config) {


        mapper.setGuid(this, module); //设置 guid, 提高 mapper 查找效率。

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
            'articleId': RandomId.get(prefix, 'article-', suffix),
            'contentId': RandomId.get(prefix, 'content-', suffix),
            'footerId': RandomId.get(prefix, 'footer-', suffix),
            'div': null,
            'scrollable': config.scrollable,
            'scroller': null,
            'scrollerConfig': config['scroller'],
            'eventName': eventName,
            'title': config.title,
            'text': config.text,
            'buttons': buttons,
            'samples': Sample.get(config.sample),//加载相应的 HTML 模板
            'emitter': emitter,
            'mask': config.mask,
            'masker': null,                     // Mask 的实例，重复使用
            'layer': null,                      //用来防止点透用的透明层，
            'cssClass': cssClass,
            'style': Style.get(config),
            'autoClosed': config.autoClosed,    //点击任何一个按钮后是否自动关闭组件
            'visible': false,                   //记录当前组件是否已显示
            'volatile': config.volatile,
            'zIndex': config['z-index'],        //生成透明层时要用到
            'data': {},                         //供 this.data() 方法使用
            
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
                //这两个已废弃，建议使用 #2
                emitter.on(eventName, 'button', name, fn);

                //#2 建议使用
                emitter.on('button', name, fn);
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
        * $(container) 的快捷方式。
        */
        $: null,

        /**
        * 渲染本组件。
        * 该方法会创建 DOM 节点，并且绑定事件，但没有调用 show()。
        */
        render: function () {
            var meta = mapper.get(this);
            var div = meta.div;

            //已经渲染过了
            if (div) {
                return;
            }

            div = meta.div = Renderer.render(meta, this);
            $(div).hide(); //先隐藏

            var Mask = require('Mask');
            var zIndex = meta.zIndex;

            meta.masker = new Mask({
                'z-index': zIndex - 1,
            });

            if (meta.volatile) {
                var self = this;
                meta.masker.on('click', function () {
                    self.hide();
                });
            }

            //防止点透
            meta.layer = new Mask({
                opacity: 0,
                'z-index': zIndex + 1,
            });
        },

        /**
        * 显示本组件。
        */
        show: function (mask) {
            var meta = mapper.get(this);
            this.render();


            var Mask = require('Mask');
            mask = Mask.filter(meta.mask, mask);

            //指定了启用 mask 层
            if (mask) {
                meta.masker.show(mask);
            }
            else {
                masker.hide();
            }

            meta.layer.show({ duration: 200 });

            //这个不能放在 setTimeout 里，因为外面可能已经调用了 set('height') 等改变了
            $(meta.div).css(meta.style);


            //这里要用异步稍微延迟一下，不然会跟 layer 的 show 几乎是同时的
            setTimeout(function () {
                $(meta.div).show();
            }, 0);

            //下面的两行不要放在上面的 setTimeout 里，
            //因为外面可能已经调用了 destroy() 而导致 emitter 不可用
            meta.visible = true;
            meta.emitter.fire('show');

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
            if (!meta) {
                throw new Error('该实例已给销毁，无法再次调用 destroy 方法。');
            }

            var emitter = meta.emitter;
            var scroller = meta.scroller;

            this.remove();
            emitter.destroy();
            scroller && scroller.destroy(); //在 PC 端为 null

            mapper.remove(this);
        },

        /**
        * 设置指定的属性。
        * @param {string} name 要设置的属性的名称。 目前支持的字段有： 
            'text',
            'height',
            'width',
        * @param value 要设置的属性的值，可以是任何类型。
        */
        set: function (name, value) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;

            this.render();

            switch (name) {
                case 'text':
                    $('#' + meta.contentId).html(value);
                    scroller && scroller.refresh(200);
                    break;

                case 'height':
                case 'width':
                    var obj = {};
                    obj[name] = value;
                    obj = Style.get(obj);
                    $.Object.extend(meta.style, obj); //回写，避免调用 show 时又给重置
                    $(meta.div).css(obj);
                    scroller && scroller.refresh(300);
                    break;

                default:
                    throw new Error('目前不支持设置属性: ' + name);
            }


        },

        /**
        * 获取或设置自定义数据。 
        * 已重载 data()、 data(key)、data(obj)、data(key, value)。
        * 在跨函数中传递数据时会比较方便。
        * @param {string|Object} key 要获取或设置的数据的名称(键)。
            当指定为一个纯对象 {} 时，则表示批量设置。
            当指定为字符串或可以转为字符串的类型时，则表示获取指定名称的数据。
        * @param value 要设置的数据的值。 只有显式提供该参数，才表示设置。
        * @return 返回获取到的或设置进来的值。
        */
        data: function (key, value) {
            var meta = mapper.get(this);
            var data = meta.data;

            var len = arguments.length;
            if (len == 0) { //获取全部
                return data;
            }

            //重载 data(obj); 批量设置
            if ($.Object.isPlain(key)) {
                $.Object.extend(data, key);
                return key;
            }

            //get(key)
            if (len == 1) {
                return data[key];
            }

            //set(key, value)
            data[key] = value;
            return value;

        },


    };

    return Dialog;

});

