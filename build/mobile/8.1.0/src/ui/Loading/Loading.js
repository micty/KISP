
/**
* 加载中提示组件。
* @class
* @name Loading
*/
define('Loading', function (require, module, exports) {
    var $String = require('String');
    var Emitter = require('Emitter');
    var Defaults = require('Defaults');

    //子模块
    var Sample = module.require('Sample');
    var Style = module.require('Style');
    var Meta = module.require('Meta');
    var Masker = module.require('Masker');
    var Presettings = module.require('Presettings');

    var mapper = new Map();

    


    /**
    * 构造器。
    * @constructor
    */
    function Loading(options) {
        options = options || {};

        var presetting = Presettings[options.presetting] || {};         //预设方案。
        var config = Defaults.clone(module.id, presetting, options);    //合并预设配置。

        var emitter = new Emitter(this);        //事件驱动器。
        var sample = Sample.get(config.sample); //加载相应的 HTML 模板。
        var style = Style.get(config);          //从配置中过滤出样式成员，并进行规范化处理，style 是一个 {}。
        var masker = Masker.create(config);     //

        var meta = Meta.create(config, {
            'sample': sample,       //相应的 html 模板。
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
    Loading.prototype = /**@lends Loading#*/ {
        constructor: Loading,

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

            var Style = require('Style');

            var html = $String.format(meta.sample, {
                'id': meta.id,
                'text': meta.text,
                'textId': meta.textId,
                'cssClass': meta.cssClass,
            });

            $(meta.container).append(html);

            meta.$ = this.$ = $(`#${meta.id}`);
            meta.$text = $(`#${meta.textId}`);

            meta.$.css(meta.style);

            meta.emitter.fire('render');

        },

        /**
        * 显示本组件。
        * 已重载 show(text);       //显示指定的文本。
        * 已重载 show(done);       //显示组件，完成后执行回调函数。 要显示的文本以创建实例时指定的为准。
        * 已重载 show(text, done); //显示指定的文本，完成后执行回调函数。
        * 参数：
        *   text: '',       //要显示的文本。
        *   done: fn,       //完成后回调函数。 须在创建实例时指定 `duration` 字段为大于 0 的值才起作用。 
        */
        show: function (text, done) {
            //重载 show(done); 
            //不传入要显示的文本，以创建实例时指定的 text 为准。
            if (typeof text == 'function') {
                done = text;
                text = undefined;
            }

            var meta = mapper.get(this);
            var masker = meta.masker;
            var duration = meta.duration;


            //首次 render。
            if (!meta.$) {
                this.render();
            }

            if (masker) {
                masker.show();
            }

            if (typeof text == 'string') {
                meta.text = text;
                meta.$text.html(text);
            }


            if (duration) {
                setTimeout(function () {
                    meta.this.hide();
                    done && done();
                }, duration);
            }

            meta.$.toggleClass('NoText', !meta.text);
            meta.$.show();
            meta.emitter.fire('show');

        },

        /**
        * 隐藏本组件。
        * 触发事件: `hide`。
        */
        hide: function () {
            var meta = mapper.get(this);
            var masker = meta.masker;

            if (!meta.$) {
                return;
            }

            masker && masker.hide();
            meta.$.hide();
            meta.emitter.fire('hide');
        },

        /**
        * 移除本组件已生成的 DOM 节点。
        * 触发事件: `remove`。
        */
        remove: function () {
            var meta = mapper.get(this);

            if (!meta.$) {
                return;
            }

            var div = meta.$.get(0);
            var masker = meta.masker;

            div.parentNode.removeChild(div);
            masker && masker.remove();


            meta.$.off();

            meta.$ = this.$ = null;
            meta.$text = null;
            meta.masker = null;

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

            this.remove();
            meta.emitter.destroy();

            mapper.remove(this);
        },

    };

    return Loading;

});

