
/**
* 无数据提示面板控件。
* @class
* @name NoData
*/
define('NoData', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var IScroll = require('IScroll');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var RandomId = require('RandomId');
    var Config = require('Config');

    var Renderer = module.require('Renderer');
    var Sample = module.require('Sample');
    var Style = module.require('Style');

    var mapper = new Mapper();



    /**
    * 构造函数。
    */
    function NoData(container, config) {

        //重载 NoData(config)
        if ($.Object.isPlain(container)) {
            config = container;
        }
        else {
            config.container = container;
        }


        Mapper.setGuid(this);
        config = Config.clone(module.id, config);


        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }

        var prefix = config.prefix;
        var suffix = config.suffix;

        var meta = {
            'div': null,
            'top': config.top,
            'bottom': config.bottom,
            'icon': config.icon,
            'text': config.text,
            'emitter': new Emitter(this),
            'container': config.container,
            'append': config.append,

            'id': RandomId.get(prefix, suffix),
            'textId': RandomId.get(prefix, 'text-', suffix),
            'text': config.text,
            'cssClass': cssClass,
            'sample': Sample,
            'style': Style.get(config),
            'scrollable': config.scrollable,
            'pulldown': config.pulldown,
            'visible': false, //组件当前是否可见
        };

        mapper.set(this, meta);

    }


    //实例方法
    NoData.prototype = /**@lends NoData#*/ {
        constructor: NoData,

        show: function (text) {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) { //首次 render
                div = Renderer.render(meta, { 'text': text, });
            }
            else {
                $('#' + meta.textId).html(text || meta.text);
            }

            meta.visible = true;
            $(div).show();
            meta.emitter.fire('show');

        },

        hide: function () {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }

            meta.visible = false;
            $(div).hide();
            meta.emitter.fire('hide');
        },

        toggle: function (needShow) {

            //重载 toggle( [] )，方便直接传入一个数据列表数组
            if (needShow instanceof Array) {
                needShow = needShow.length == 0;
            }

            var meta = mapper.get(this);
            var visible = meta.visible;

            if (arguments.length == 0) { //重载 toggle()
                if (visible) {
                    this.hide();
                }
                else {
                    this.show();
                }
            }
            else {
                if (visible && !needShow) {
                    this.hide();
                }
                else if(!visible && needShow) {
                    this.show();
                }
            }

        },


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
        * 销毁本实例对象。
        */
        destroy: function () {
            var meta = mapper.get(this);
            var scroller = meta.scroller;
            scroller.destroy();

            var emitter = meta.emitter;
            emitter.destroy();

            mapper.remove(this);
        },

        



    };


    return NoData;


});


