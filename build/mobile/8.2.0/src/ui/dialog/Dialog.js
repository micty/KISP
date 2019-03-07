
/**
* 对话框组件。
* @class
* @name Dialog
*/
define('Dialog', function (require, module, exports) {
    var $Object = require('Object');
    var Emitter = require('Emitter');
    var Defaults = require('Defaults');

    //<for:mobile---->
    var Scroller = require('Scroller');
    //<----for:mobile>


    var Style = module.require('Style');
    var Meta = module.require('Meta');
    var Masker = module.require('Masker');
    var Events = module.require('Events');
    var Template = module.require('Template');

    var mapper = require('Mapper');


    /**
    * 构造器。
    * @constructor
    */
    function Dialog(config) {
        config = Defaults.clone(module.id, config);

        var emitter = new Emitter(this);        //事件驱动器。
        var style = Style.get(config);          //
        var masker = Masker.create(config);     //

        var meta = Meta.create(config, {
            'style': style,         //从配置中过滤出样式成员，并进行规范化处理，style 是一个 {}。
            'emitter': emitter,     //事件驱动器。
            'masker': masker,       //遮罩层实例。
            'this': this,           //当前实例，方便内部使用。
        });



        mapper.set(this, meta);

        //对外暴露的属性。
        Object.assign(this, {
            'id': meta.id,
        });
        
    }


    //实例方法
    Dialog.prototype = /**@lends Dialog#*/ {
        constructor: Dialog,

        /**
        * 当前实例的 id。
        * 也是最外层的 DOM 节点的 id。
        */
        id: '',

        /**
        * 当前组件最外层的 DOM 节点对应的 jQuery 实例。
        * 必须在 render 之后才存在。
        */
        $: null,

        /**
        * 渲染本组件，生成 html 到容器 DOM 节点中。
        * 该方法只需要调用一次。
        * 触发事件: `render`。
        */
        render: function () {
            var meta = mapper.get(this);

            //已经渲染过了。
            if (meta.$) {
                return;
            }


            var html = Template.fill(meta);

            $(meta.container).append(html);

            meta.$ = this.$ = $(`#${meta.id}`);
            meta.$header = $(`#${meta.headerId}`);
            meta.$article = $(`#${meta.articleId}`);
            meta.$content = $(`#${meta.contentId}`);
            meta.$footer = $(`#${meta.footerId}`);

            //<for:mobile---->
            //指定了可滚动
            if (meta.scrollable) {
                meta.scroller = new Scroller(meta.$article, meta.scrollerConfig);
                meta.scroller.render();
            }
            //<----for:mobile>


            Events.bind(meta);

            meta.emitter.fire('render');

        },

        /**
        * 显示本组件。
        */
        show: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;


            //已是显示状态。
            if (meta.visible) {
                meta.scroller && meta.scroller.refresh(200);
                return;
            }

            if (!meta.$) {
                this.render();
            }


            meta.$.show();
            meta.visible = true;
            meta.masker && meta.masker.show();
            meta.scroller && meta.scroller.refresh(200);
            meta.emitter.fire('show');
        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            var meta = mapper.get(this);

            //未渲染或已隐藏。
            if (!meta.$ || !meta.visible) {
                return;
            }

            meta.$.hide();
            meta.visible = false;
            meta.masker && meta.masker.hide();
            meta.emitter.fire('hide');

        },

        /**
        * 移除本组件对应的 DOM 节点。
        */
        remove: function () {
            var meta = mapper.get(this);

            if (!meta.$) {
                return;
            }


            meta.masker && meta.masker.remove();
            meta.layer && meta.layer.remove();

            //reset
            var div = meta.$.get(0);
            div.parentNode.removeChild(div);

            meta.$.off();
            meta.visible = false;
            meta.masker = null;
            meta.layer = null;
            meta.$ = null;
            meta.$header = null;
            meta.$content = null;
            meta.$footer = null;

            meta.emitter.fire('remove');

        },

        /**
        * 绑定事件。
        */
        on: function (...args) {
            var meta = mapper.get(this);
            meta.emitter.on(...args);
        },

        /**
        * 销毁本组件。
        */
        destroy: function () {
            var meta = mapper.get(this);
            if (!meta) {
                throw new Error('该实例已给销毁，无法再次调用 destroy 方法。');
            }


            this.remove();

            meta.emitter.destroy();
            meta.scroller && meta.scroller.destroy(); //在 PC 端为 null

            mapper.delete(this);
        },

        /**
        * 设置指定的属性。
        * 已重载 set({}); //批量设置多个字段。
        * 已重载 set(key, value); //设置单个指定的字段。
        * @param {string} key 要设置的属性的名称。 
        *  目前支持的字段有：'title', 'content', 'height', 'width。
        * @param value 要设置的属性的值，可以是任何类型。
        */
        set: function (key, value) {
            this.render();


            var meta = mapper.get(this);
            var scroller = meta.scroller;
            var obj = typeof key == 'object' ? key : { [key]: value, };

            $Object.each(obj, function (key, value) {
                switch (key) {
                    case 'title':
                        meta.$header.html(value);
                        break;

                    case 'content':
                        meta.$content.html(value);
                        scroller && scroller.refresh(200);
                        break;

                    case 'height':
                    case 'width':
                        var obj = {};

                        obj[key] = meta[key] = value;
                        obj = Style.get(obj);

                        Object.assign(meta.style, obj); //回写
                        meta.$.css(obj);
                        scroller && scroller.refresh(300);
                        break;

                    default:
                        throw new Error(`${module.id} 目前不支持设置属性: ${key}`);
                }

            });

            

        },

        /**
        * 获取或设置自定义数据。 
        * 在跨函数中传递数据时会比较方便。
        * 已重载 data();           //获取全部自定义数据。
        * 已重载 data(key);        //获取指定键的自定义数据。
        * 已重载 data(obj);        //批量设置多个字段的自定义数据。
        * 已重载 data(key, value); //单个设置指定字段的自定义数据。
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
            if ($Object.isPlain(key)) {
                Object.assign(data, key);
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

