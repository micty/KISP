/**
* 面板组件
* @class
* @name Panel
*/
define('Panel', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');

    var mapper = new Mapper();

    /**
    * 构造器。
    * @constructor
    */
    function Panel(container, config) {

        Mapper.setGuid(this);
        config = Config.clone(module.id, config);

        var emitter = new Emitter(this);


        var meta = {
            'emitter': emitter,
            'container': container,
            'rendered': false,
            'showAfterRender': config.showAfterRender,
        };

        mapper.set(this, meta);

        //暴露一个 jQuery 对象给外面使用。 但为了安全起见，内部不使用这个对象。
        this.$ = $(container);

    }


    //实例方法
    Panel.prototype = /**@lends Panel#*/ {
        constructor: Panel,

        /**
        * $(container) 的快捷方式。
        */
        $: null,

        /**
        * 显示本组件。
        */
        show: function () {

            var meta = mapper.get(this);
            var container = meta.container;
            var emitter = meta.emitter;

            container = $(container);
            var args = [].slice.call(arguments);
            container.show.apply(container, args);

            emitter.fire('show');

        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            var meta = mapper.get(this);
            var container = meta.container;
            var emitter = meta.emitter;

            container = $(container);
            var args = [].slice.call(arguments);
            container.hide.apply(container, args);

            emitter.fire('hide');

        },


        /**
        * 渲染。
        */
        render: function () {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var rendered = meta.rendered;
            if (!rendered) { //首次 render
                emitter.fire('init');
            }

            emitter.fire('before-render', [rendered]);

            var args = [].slice.call(arguments);
            emitter.fire('render', args);

            meta.rendered = true;

            if (meta.showAfterRender) {
                this.show();
            }

        },

        /**
        * 刷新，会触发 refresh 事件。
        */
        refresh: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var args = [].slice.call(arguments);
            emitter.fire('refresh', args);

        },

        /**
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            emitter.destroy();
            mapper.remove(this);
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
        * 包装一个新对象，使其拥有实例的成员和新对象的成员。
        *
        */
        wrap: function (obj) {

            var panel = {};

            for (var key in this) {

                if (key.slice(0, 1) == '_' || key == 'constructor') { //忽略下划线开头的成员。
                    continue;
                }

                var value = this[key];
                if (typeof value == 'function') {
                    value = value.bind(this);
                }

                panel[key] = value;
            }

            return $.Object.extend(panel, obj);
        },

    };

    return Panel;

});

