/**
* 通用的面板组件。
* @class
* @name Panel
*/
define('Panel', function (require, module, exports) {
    var $Object = require('Object');
    var Emitter = require('Emitter');
    var Defaults = require('Defaults');
    var OuterModule = require('OuterModule');
    var Template = require('Template');
    var Meta = module.require('Meta');
    var Container = module.require('Container');

    var mapper = new Map();
    var id$panel = {};
    var defaults = Defaults.clone(module.id);



    /**
    * 构造器。
    * @constructor
    */
    function Panel(container, config) {
        config = Defaults.clone(module.id, config);

        var meta = Meta.create(config, {
            'moudle': null,                 //如果非空，则是由 Panel.define() 创建的，此时 container='[data-panel="xx"]'。
            'container': container,         //
            '$emitter': new Emitter(),      //供外部用的事件管理器。
            'emitter': new Emitter(this),   //内部使用的事件管理器。
            '$': $(container),              //当前实例关联的 DOM 节点对应的 jQuery 实例。
            'this': this,                   //方便内部使用。
        });

        mapper.set(this, meta);

        //对外暴露的属性。
        Object.assign(this, {
            'container': container,
            'id': meta.id,
            '$': meta.$,
        });

    }


    //实例方法
    Panel.prototype = /**@lends Panel#*/ {
        constructor: Panel,

        /**
        * 构造实例时传入的 container 参数。
        */
        container: '',

        /**
        * 当前实例的 id。
        */
        id: '',

        /**
        * 当前实例关联的 DOM 节点对应的 jQuery 实例。
        * 即 $(container) 的快捷方式。
        */
        $: null,

        /**
        * 当前实例关联的 module 对象。
        * 业务层只有使用 KISP.panel() 或 KISP.view() 创建实例时，此值才存在。
        */
        module: null,

        

        /**
        * 渲染。
        * 触发事件:
        *   首次渲染时，首先会触发 `init` 事件，即该事件只会触发一次。
        *   每次渲染时，都会依次触发 `before-render`、`render`、`after-render` 事件。
        */
        render: function (...args) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            //首次 render。
            if (!meta.rendered) {
                meta.rendered = true;    //要放在此处。
                meta.renderArgs = args;

                emitter.fire('init');
            }

            emitter.fire('before-render', args);
            emitter.fire('render', args);


            //指定了要自动显示。
            if (meta.show) {
                this.show();
            }

            emitter.fire('after-render', args);
        },

        /**
        * 显示本组件。
        * 触发事件: `show`。
        */
        show: function (...args) {
            var meta = mapper.get(this);

            meta.$.show(...args);
            meta.visible = true;

            //外面可能会用到事件返回值。
            return meta.emitter.fire('show');

        },

        /**
        * 隐藏本组件。
        * 触发事件: `hide`。
        */
        hide: function (...args) {
            var meta = mapper.get(this);


            meta.$.hide(...args);
            meta.visible = false;

            //外面可能会用到事件返回值。
            return meta.emitter.fire('hide');
        },

        /**
        * 切换显示或隐藏本组件。
        */
        toggle: function (needShow) {
            var meta = mapper.get(this);

            //重载 toggle(); 
            //未指定参数，则根据原有状态进行切换。
            if (arguments.length == 0) { 
                meta.visible ? this.hide() : this.show();
            }
            else {
                needShow ? this.show() : this.hide();
            }

            //返回更改后的可见状态。
            return meta.visible;
        },

        /**
        * 设置模板填充的规则，为模板填充进行预处理。
        */
        template: function (process) {
            var meta = mapper.get(this);
            var tpl = meta.tpl;

            if (!tpl) {
                tpl = meta.tpl = new Template(meta.container);
            }

            if (process) {
                tpl.process(...arguments);
            }

            //返回给外面，可能要用到。
            //通过 panel.template() 即可取得 tpl。
            return tpl;
        },

        /**
        * 对本组件进行模板填充。
        * 触发事件: `fill`。
        * @param {Object|Array} 要填充的数据，可以是对象或数组。
        * @param {function} [fn] 当要填充的数据是一个数组时，需要进行迭代转换的处理函数。
        *   调用该函数，可以把一个数组转换成一个新的数组。
        */
        fill: function (data, fn) {
            var meta = mapper.get(this);

            this.template(); //先确保 meta.tpl 存在。
            meta.tpl.render(data, fn);

            //外面可能会用到事件返回值。
            return meta.emitter.fire('fill', [data]);
        },

        /**
        * 刷新。
        * 即使用最近一次的渲染参数重新进行渲染。
        * 触发事件: `refresh`。
        */
        refresh: function () {
            var meta = mapper.get(this);
            var args = meta.renderArgs;

            this.render(...args);

            //外面可能会用到事件返回值。
            return meta.emitter.fire('refresh', args);
        },

        /**
        * 重置。
        * 触发事件: `reset`。
        */
        reset: function (...args) {
            var meta = mapper.get(this);

            //外面可能会用到事件返回值。
            return meta.emitter.fire('reset', args);
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
        * 触发外部的事件。
        */
        fire: function (...args) {
            var meta = mapper.get(this);

            //外面可能会用到事件返回值。
            return meta.$emitter.fire(...args);
        },

        /**
        * 批量绑定(委托)事件到 panel.$ 对象多个元素上。
        * 该方法可以批量绑定一个或多个不同的(委托)事件到多个元素上。
        * 该方法是以事件为组长、选择器为组员进行绑定的。
        * 已重载 $on(name$selector$fn);    //绑定多个(委托)事件到多个元素上。
        * 已重载 $on(name, selector$fn);   //绑定单个(委托)事件到多个元素上。
        *   
        *   name: '',           //事件名。 如 `click`。
        *   selector$fn: {      //选择器对应的事件处理器。
        *       '#id-0': fn0,   //
        *       '#id-1': fn1,   //
        *   },
        *
        * 例如，绑定多个(委托)事件到多个元素上：
        *   $on({
        *       'click': {
        *           '#id-0': fn10,
        *           '#id-1': fn11,
        *       },
        *       'keyup': {
        *           '#id-0': fn20,
        *           '#id-1': fn21,
        *       },
        *   });
        */
        $on: function (name, selector$fn) {
            var name$selector$fn = null;

            if (typeof name == 'string') {
                //重载 $on(name, selector$fn);
                //单个事件，多个元素的情况。
                name$selector$fn = { [name]: selector$fn, };
            }
            else if (typeof name == 'object') {
                //重载 $on(name$selector$fn);
                //多个事件，多个元素的情况。
                name$selector$fn = name;
            }
            else {
                throw new Error(`无法识别参数 name 的类型。`);
            }

            if (!name$selector$fn) {
                return;
            }

            //统一形式后再处理。
            var meta = mapper.get(this);

            $Object.each(name$selector$fn, function (name, selector$fn) {
                if (!selector$fn) {
                    return;
                }

                //如 $on({ 'click': fn, });
                if (typeof selector$fn == 'function') {
                    meta.$.on(name, selector$fn); //此时，selector$fn 就是 fn。
                    return;
                }

                $Object.each(selector$fn, function (selector, fn) {
                    meta.$.on(name, selector, fn);
                });
            });
        },

        /**
        * 对 panel.$ 对象中的多个元素进行多个(委托)事件的绑定。
        * 该方法可以对一个或多个元素批量绑定多个(委托)事件。
        * 该方法是以选择器为组长、事件为组员进行绑定的。
        * 已重载 $bind(selector$name$fn);    //对多个元素绑定多个(委托)事件。
        * 已重载 $bind(selector, name$fn);   //对单个元素上绑定多个(委托)事件。
        *   
        *   selector: '',       //要绑定的元素或其选择器。
        *   name$fn: {          //事件名对应的处理器函数。
        *       'click': fn0,   //
        *       'keyup': fn1,   //
        *   },
        *
        * 例如，对多个元素绑定多个(委托)事件：
        *   $on({
        *       '#id-0': {
        *           'click': fn10,
        *           'keyup': fn11,
        *       },
        *       '#id-1': {
        *           'click': fn20,
        *           'keyup': fn21,
        *       },
        *   });
        */
        $bind: function (selector, name$fn) {
            var selector$name$fn = null;

            if (typeof selector == 'string') {
                //重载 $bind(selector, name$fn);
                //单个元素，多个事件的情况。
                selector$name$fn = { [selector]: name$fn, };
            }
            else if (typeof selector == 'object') {
                //重载 $bind(selector$name$fn);
                //多个元素，多个事件的情况。
                selector$name$fn = selector;
            }
            else {
                throw new Error(`无法识别参数 selector 的类型。`);
            }

            if (!selector$name$fn) {
                return;
            }

            //统一形式后再处理。
            var meta = mapper.get(this);

            $Object.each(selector$name$fn, function (selector, name$fn) {
                if (!name$fn) {
                    return;
                }

                $Object.each(name$fn, function (name, fn) {
                    meta.$.on(name, selector, fn);
                });
            });

        },


        /**
        * 包装一个新对象，使其拥有当前 Panel 实例的部分成员和新对象的成员。
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
            var panel = meta.panel;

            if (panel) {
                return panel;
            }

            obj = obj || {};
            panel = meta.panel = {};


            //忽略的成员。
            var ignores = new Set([
                'constructor',
                'fire',
                'wrap',
            ]);

            //拷贝实例原有的成员，忽略的成员除外。
            $Object.each(meta.this, function (key, value) {
                if (ignores.has(key)) {
                    return;
                }

                //实例方法静态化
                if (typeof value == 'function') {
                    value = value.bind(meta.this); 
                }

                panel[key] = value;
            });

            //重写事件绑定，让事件绑定到外部的事件管理器上，而不是内部使用的 emitter。
            Object.assign(panel, obj, {
                'on': meta.$emitter.on.bind(meta.$emitter),
                'off': meta.$emitter.off.bind(meta.$emitter),
            });

            return panel;
        },

        /**
        * 传播指定模块的事件列表。
        * 用于透传子模块的事件给父级。
        */
        propagate: function (M, names) {
            var meta = mapper.get(this);

            names.forEach(function (name) {
                M.on(name, function (...args) {
                    meta.this.fire(name, args);
                });
            });
        },

        /**
        * 设置指定的属性。
        * 已重载 set(obj);         //批量设置。
        * 已重载 set(key, value);  //单个设置。
        * @param {string} key 要设置的属性的名称。 
        *   目前支持的字段有：'show'、'rendered'、'$'。
        * @param value 要设置的属性的值，可以是任何类型。
        */
        set: function (key, value) {
            var meta = mapper.get(this);

            //重载 set({...}); 
            //批量设置的情况。
            if ($Object.isPlain(key)) {
                $Object.each(key, function (key, value) {
                    meta.this.set(key, value);
                });
                return;
            }

            //重载 set(key, value); 单个设置的情况。
            switch (key) {
                case 'show':

                //提供一个重置的机会，以便可以再次触发 init。 
                //这是高级用法，针对特殊场景。
                //场景：在 set('$') 更新容器后，原 `init` 事件中绑定的逻辑，如果用到了 panel.$.on() 之类的，则会失效。
                //因此在 set('$') 后再调一下 set('rendered', false)，可以让 `init` 事件有机会再次触发。
                case 'rendered': 
                    meta[key] = value;
                    break;

                //更新容器。
                case '$':
                case 'container':
                    Container.set(meta, value);
                    break;

                //允许设置可见性的初始状态，以便在不调用 render() 的前提下直接调用 show() 或 hide()。
                case 'visible':
                    meta.visible = !!value;
                    break;
                default:
                    throw new Error(`目前不支持设置属性: ${key}`);
            }

        },

        /**
        * 销毁本组件。
        */
        destroy: function () {
            var meta = mapper.get(this);
            meta.emitter.destroy();
            meta.$emitter.destroy();
            meta.$.off();

            mapper.delete(this);
        },

        /**
        * 绑定事件到内部的事件管理器。
        * 注意，该方法在通过 wrap() 导出后，会给重写。
        */
        on: function (...args) {
            var meta = mapper.get(this);
            meta.emitter.on(...args);
        },


    };

    //静态方法。
    Object.assign(Panel, {

        /**
        * 提供一种按标准方法定义面板的方式。
        * 参数 options 是留给内部模块 View 扩展使用的。
        *   options = {
        *       constructor: Panel, //要使用的构造器，Panel 或 View。
        *       defaults: {},       //要使用的默认配置，为 Panel 或 View 对应的配置。
        *   };
        */
        define: function (id, factory, options) {
            options = options || {
                'constructor': Panel,
                'defaults': defaults,
            };

            OuterModule.define(id, function ($require, $module, $exports) {
                var container = Container.get(id, options.defaults);  //如 `[data-panel="/Users/Main"]`。
                var panel = new options.constructor(container);
                var meta = mapper.get(panel);

                meta.module = panel.module = $module;    //指示此 panel 由 Panel.define() 创建的。

                $exports = factory($require, $module, panel);
                $exports = panel.wrap($exports);

                id$panel[id] = panel;

                return $exports;
            });

        },

        /**
        * 更新容器。
        * 已重载 update(id);   //更新单个。
        * 已重载 update(ids);  //更新多个。
        * 参数 options 是留给内部模块 View 扩展使用的。
        */
        update: function (ids, options) {
            ids = Array.isArray(ids) ? ids : [ids];

            options = options || {
                'defaults': defaults,
            };

            ids.forEach(function (id) {
                var panel = id$panel[id];
                var container = Container.get(id, options.defaults);  //如 `[data-panel="/Users/Main"]`。

                if (!panel) {
                    console.warn(`不存在 ${container} 的 Panel 实例。`);
                    return;
                }

                panel.set('container', container);
            });
        },

    });


    return Panel;

});

