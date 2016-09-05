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

        //重载 { el: container, ... }
        if ($.Object.isPlain(container)) {
            config = container;
            container = config['el'];
            delete config['el'];
        }

        config = Config.clone(module.id, config);


        var meta = {
            'emitter': new Emitter(this),
            'outerEmitter': new Emitter(), //供外部用的 emitter

            'container': container,
            'rendered': false,
            'showAfterRender': config.showAfterRender,
            'cssClass': config.cssClass,
            'visible': false,
            'byRender': false,  //记录 show 事件是否由 render() 触发的。
            'template': null,   //复杂模板填充的 Template 实例。
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

            meta.visible = true;

            var byRender = meta.byRender;
            meta.byRender = false; //重置

            emitter.fire('show', [byRender]);

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

            meta.visible = false;
            emitter.fire('hide');

        },

        /**
        * 切换显示或隐藏本组件。
        */
        toggle: function (needShow) {
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
                else if (!visible && needShow) {
                    this.show();
                }
            }
        },

        /**
        * 设置复杂模板填充的规则，为模板填充进行预处理。
        * 已重载 template(config);
        * @param {Array} names 子级模板的标记的名称数组。 
        *   如在 #--item.begin--# 和 #--item.end--# 构成一个子级模板，则标记名称为 item。 
        * @param {function} 模板填充时的处理函数。
        */
        template: function (names, fn) {

            //重载 template({});
            var config = $.Object.isPlain(names) ? names : {
                'names': names,
                'fn': fn,
            };
            
            var Template = require('Template');

            var meta = mapper.get(this);
            var container = meta.container;

            meta.template = new Template(container, config);

        },


        /**
        * 对本组件进行简单或复杂的模板填充。
        * 在进行复杂模板填充之前，需要至少先调用一次 this.template() 方法以设置填充规则。
        * 否则当成是简单模板填充。
        * @param {Object|Array} 要填充的数据，可以是对象或数组。
        * @param {function} [fn] 当要填充的数据是一个数组时，需要进行迭代转换的处理函数。
        *   调用该函数，可以把一个数组转换成一个新的数组。
        */
        fill: function (data, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var template = meta.template;

            if (template) { //复杂模板
                template.fill(data, fn);
            }
            else { //简单模板
                var Template = require('Template');
                Template.fill(meta.container, data, fn);
            }


            emitter.fire('fill', [data]);
        },


        /**
        * 渲染。
        */
        render: function () {

            var args = [].slice.call(arguments);

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var container = meta.container;
            var cssClass = meta.cssClass;

            var rendered = meta.rendered;
            if (!rendered) { //首次 render
                emitter.fire('init', args);
            }

            emitter.fire('before-render', args);
            $(container).addClass(cssClass);

            emitter.fire('render', args);
            meta.rendered = true;

            if (meta.showAfterRender) {
                meta.byRender = true;
                this.show();
            }

            emitter.fire('after-render', args);
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
        * 重置，会触发 reset 事件。
        */
        reset: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var args = [].slice.call(arguments);
            emitter.fire('reset', args);

        },

        /**
        * 获取一个状态，该状态表示本组件是否为显示状态。
        */
        visible: function () {
            var meta = mapper.get(this);
            return meta.visible;
        },

        /**
        * 获取一个状态，该状态表示本组件是否已渲染过。
        */
        rendered: function () {
            var meta = mapper.get(this);
            return meta.rendered;
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
        * 触发外部的事件。
        */
        fire: function (name, args) {
            var meta = mapper.get(this);
            var outerEmitter = meta.outerEmitter;
            var args = [].slice.call(arguments, 0);
            outerEmitter.fire.apply(outerEmitter, args);
        },


        /**
        * 包装一个新对象，使其拥有当前实例的部分成员和新对象的成员。
        * @param {Object} [obj] 要需要包装的对象。 
            如果不指定，则只包装当前实例对象。
        * @return {Object} 返回一个由当前实例的部分成员和要包装对象的成员组成的新对象。
        * @example
            var panel = KISP.create('Panel');
            var obj = panel.wrap();
            obj.show();

            var obj1 = panel.wrap({ a: 100 });
            console.log(obj1.a);
        */
        wrap: function (obj) {

            var meta = mapper.get(this);
            var outerEmitter = meta.outerEmitter;

            var panel = {
                //重写 on，让事件绑定到外部的事件管理器上，而不是 this 内部使用的 emitter
                on: function () {
                    var args = [].slice.call(arguments, 0);
                    outerEmitter.on.apply(outerEmitter, args);
                },
            };


            for (var key in this) {

                //忽略的成员。
                if (key.slice(0, 1) == '_' ||
                    (/^(constructor|fire|on|wrap)$/g).test(key)) {
                    continue;
                }

                var value = this[key];

                //实例方法静态化
                if (typeof value == 'function') {
                    value = value.bind(this); 
                }

                panel[key] = value;
            }

            return obj ? $.Object.extend(panel, obj) : panel;
        },


    };

    return Panel;

});

