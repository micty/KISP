//'use strict'; //取消 babel 自动生成的严格模式。

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
* KISP JavaScript Library
* name: pc 
* version: 8.1.0
* build time: 2018-12-26 14:27:59
* concat md5: 80DB7BDB5E3C41C01BFD69E04CA965B2
* source files: 130(128)
*    partial/begin.js
*    base/Module.js
*    base/ModuleManager.js
*    base/InnerModules.js
*    $/Array.js
*    $/Date.js
*    $/String.js
*    $/Emitter.js
*    $/Object.js
*    $/Tree.js
*    $/Escape.js
*    $/Fn.js
*    $/Math.js
*    $/Hash.js
*    $/Query.js
*    $/JSON.js
*    $/Script.js
*    $/StyleSheet.js
*    $/Tasks.js
*    core/KISP.js
*    core/Defaults.js
*    core/Config.js
*    core/Data.js
*    browser/Router.js
*    api/Proxy.js
*    data/defaults/common/api/Proxy.js
*    browser/Url.js
*    data/defaults/common/Url.defaults.js
*    api/Proxy/Url.js
*    browser/app/App.js
*    data/defaults/common/App.defaults.js
*    data/config/pc/App.js
*    core/OuterModule.js
*    data/defaults/common/OuterModule.defaults.js
*    lib/$.js
*    browser/app/App/Navigator.js
*    browser/navigator/Navigator.js
*    data/defaults/common/Navigator.defaults.js
*    browser/navigator/Navigator/Meta.js
*    browser/SessionStorage.js
*    data/defaults/common/SessionStorage.defaults.js
*    browser/Storage.js
*    third/CircularJSON.js
*    browser/LocalStorage.js
*    data/defaults/common/LocalStorage.defaults.js
*    browser/navigator/Navigator/Hash.js
*    browser/navigator/Navigator/Router.js
*    browser/app/App/Navigator/Views.js
*    browser/package/Package.js
*    data/defaults/common/Package.js
*    ui/loading/Loading.js
*    data/defaults/common/Loading.defaults.js
*    core/Style.js
*    ui/loading/Loading/Sample.js
*    ui/loading/Loading/Style.js
*    ui/loading/Loading/Meta.js
*    core/RandomId.js
*    ui/loading/Loading/Masker.js
*    ui/mask/Mask.js
*    data/defaults/common/Mask.defaults.js
*    data/config/pc/Mask.js
*    ui/mask/Mask/Sample.html.js
*    ui/mask/Mask/Style.js
*    ui/mask/Mask/Meta.js
*    ui/loading/Loading/Presettings.js
*    core/Session.js
*    data/defaults/common/Session.js
*    browser/package/Package/All.js
*    browser/package/Package/Loader.js
*    ui/view/View.js
*    data/defaults/common/View.defaults.js
*    data/config/pc/View.js
*    ui/panel/Panel.js
*    data/defaults/common/Panel.defaults.js
*    ui/template/Template.js
*    third/HTMLParser.js
*    ui/template/Template/Meta.js
*    ui/template/Template/Parser.js
*    ui/template/Template/Parser/Templates.js
*    ui/template/Template/Sample.js
*    ui/template/Template/Child.js
*    ui/panel/Panel/Meta.js
*    ui/panel/Panel/Container.js
*    ui/alert/Alert.js
*    data/defaults/common/Alert.defaults.js
*    data/config/pc/Alert.js
*    ui/alert/Alert/Dialog.js
*    ui/dialog/Dialog.js
*    data/defaults/common/Dialog.defaults.js
*    data/config/pc/Dialog.js
*    core/Mapper.js
*    ui/dialog/Dialog/Style.js
*    ui/dialog/Dialog/Meta.js
*    ui/dialog/Dialog/Masker.js
*    ui/dialog/Dialog/Events.js
*    ui/dialog/Dialog/Template.js
*    ui/dialog/Dialog/Template/Sample.html.js
*    ui/alert/Alert/Dialog/Height.js
*    ui/alert/Alert/Sample.html.js
*    ui/confirm/Confirm.js
*    data/defaults/common/Confirm.defaults.js
*    api/API.js
*    data/defaults/common/api/API.js
*    api/API/Ajax.js
*    api/SSH.API.js
*    data/defaults/common/api/SSH.API.js
*    api/SSH.js
*    data/defaults/common/api/SSH.js
*    api/SSH/Server.js
*    data/defaults/common/api/SSH/Server.js
*    third/MD5.js
*    api/SSH/Server/Config.js
*    data/defaults/common/api/SSH/Server/Config.js
*    api/SSH/Ajax.js
*    api/SSH.API/Ajax.js
*    ui/tabs/Tabs.js
*    data/defaults/common/Tabs.defaults.js
*    data/config/pc/Tabs.js
*    ui/tabs/Tabs/Events.js
*    ui/tabs/Tabs/Meta.js
*    ui/toast/Toast.js
*    data/defaults/common/Toast.defaults.js
*    ui/toast/Toast/Sample.html.js
*    ui/toast/Toast/Style.js
*    ui/toast/Toast/Meta.js
*    ui/toast/Toast/Masker.js
*    mobile/scroller/Scroller/pulldown/Pulldown/Indicator/Sample.html.js
*    mobile/scroller/Scroller/pullup/Pullup/Indicator/Sample.html.js
*    ui/loading/Loading/Sample/IOS.html.js
*    partial/end.js
*/

;(function (global, top, parent, window, document, location, navigator, localStorage, sessionStorage, console, history, setTimeout, setInterval, Array, Boolean, Date, Error, Function, JSON, Map, Math, Number, Object, RegExp, String, $, undefined) {

    /**
    * 用于工厂函数中的第二个参数 `module` 的构造器。
    * 工厂函数原型为: factory(require, module, exports) { }
    */
    var Module = function () {

        var mapper = new Map();

        /**
        * 构造器。
        *   id: '',     //模块 id，`Users/List/API`。
        *   config = {
        *       seperator: '',  //分隔符，如 `/`。
        *       mm: null,       //模块管理器 ModuleManager 的实例。
        *       emitter: null,  //事件驱动器实例。
        *
        *       //会扩展到 this 的成员。
        *       exports: {},    //导出对象。
        *       parent: null,   //父模块。 也是 Module 实例。
        *   };
        *   
        */
        function Module(id, config) {
            var seperator = config.seperator;
            var name = id.split(seperator).slice(-1)[0]; //短名称，如 `API`。
            var parent = config.parent;

            if (parent) {
                //在一个模块的工厂函数里：
                //防止通过 module.parent.require(...) 来加载它的兄弟模块。
                //仅允许通过 module.require(...) 来加载自己的直接子模块。
                //如当前模块为 `Users/List/API`，它的父模块则为 `Users/List`，
                //假如它还有个兄弟(同级)模块 `Users/List/Loading`，
                //则不允许 `API` 模块通过它的父模块来加载同级模块 `Loading`。
                //parent.require = function (name) {
                //    throw new Error(`禁止通过父模块来加载同级模块：模块 ${id} 尝试加载同级模块 ${name}。`);
                //};

                parent = Object.create(parent, {
                    require: {
                        value: function value(name) {
                            throw new Error('\u7981\u6B62\u901A\u8FC7\u7236\u6A21\u5757\u6765\u52A0\u8F7D\u540C\u7EA7\u6A21\u5757\uFF1A\u6A21\u5757 ' + id + ' \u5C1D\u8BD5\u52A0\u8F7D\u540C\u7EA7\u6A21\u5757 ' + name + '\u3002');
                        }
                    }
                });
            }

            //内部方法使用的字段。
            //安全起见，不使用暴露给外面的的那份，防止调用方恶意去改。
            var meta = {
                'id': id, //模块 id，`Users/List/API`。
                'seperator': seperator, //上下级模块名称的分隔符，如 `/`。
                'emitter': config.emitter, //事件驱动器。 可以为空。
                'mm': config.mm, //所属的模块管理器。
                'this': this //方便访问自己。
            };

            mapper.set(this, meta);

            //暴露给外部使用的属性。
            Object.assign(this, {
                'id': id,
                'name': name,
                'seperator': seperator,

                //扩展到 this 的成员。
                'exports': config.exports, //模块的导出对象。
                'parent': parent //父模块。
            });
        }

        //实例方法。
        Module.prototype = {
            constructor: Module,

            id: '', //模块的 id，如 `Users/List/API`。
            name: '', //模块的(短)名称，如 `API`。
            seperator: '', //模块 id 中的分隔符，如 `/`。 
            exports: null, //模块的导出对象。
            parent: null, //父模块。

            /**
            * 在当前模块上绑定事件。
            */
            on: function on() {
                var meta = mapper.get(this);
                var emitter = meta.emitter;

                emitter && emitter.on.apply(emitter, arguments);
            },

            /**
            * 加载直接子模块。
            * 即工厂函数 factory(require, module, exports) {} 中的第二个参数要用到的方法如：
            *   var Helper = module.require('Helper');
            * @param {string} name 直接下级模块的短名称。
            *   注意：短名称中不允许包含分隔符，如 `/`。
            */
            require: function require(name) {
                var meta = mapper.get(this);
                var seperator = meta.seperator;
                var id = meta.id + seperator + name; //完整名称，如 `Users/List/API/Helper`。

                if (name.includes(seperator)) {
                    throw new Error('\u6A21\u5757 ' + meta.id + ' \u4E0D\u5141\u8BB8\u8DE8\u7EA7\u52A0\u8F7D\u6A21\u5757: ' + id);
                }

                //允许模块管理器跨级加载模块。
                var exports = meta.mm.require(id, true);

                return exports;
            },

            /**
            * 在首次 require 子模块时，绑定该子模块上的事件。
            * 已重载 bind(name$events);    //批量绑定多个子模块对应的多个事件。
            * 已重载 bind(name, events);   //单个绑定指定子模块对应的多个事件。
            * @param {string} name (直接)子模块的短名称。
            * @param {object} events 由事件名称作为键，处理函数作为值组成的键值对对象。
            */
            bind: function bind(name, events) {
                //把单个绑定和批量绑定统一形式。
                var name$events = (typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object' ? name : _defineProperty({}, name, events);
                var meta = mapper.get(this);

                Object.keys(name$events).forEach(function (name) {
                    var events = name$events[name];

                    var fn = typeof events == 'function' ? events : function (M) {
                        M.on(events);
                    };

                    //当前模块加载子模块时触发。
                    //如当前模块为 `Users/List/API`，子模块为 `Helper`，
                    //在加载该子模块时，绑定 `Helper` 的抛出来的事件。
                    meta.this.on('require', name, fn);
                });
            },

            /**
            * 加载指定的子模块并调用 render() 方法，可向其传递一些参数。
            * @param {string} name 要加载的子模块名称。
            * @return {Object} 返回加载到的子模块实例。
            */
            render: function render(name) {
                var M = this.require(name);

                if (!M) {
                    throw new Error('\u6A21\u5757 ' + meta.id + ' \u4E0D\u5B58\u5728\u540D\u4E3A ' + name + ' \u7684\u76F4\u63A5\u5B50\u6A21\u5757');
                }

                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                M.render.apply(M, args);
                return M;
            }

        };

        return Module;
    }();

    /**
    * 树型结构的 CMD 模块管理器类。
    * 主要实现模块的定义 (define) 和加载 (require) 功能。
    * @class
    * @name ModuleManager
    */
    var ModuleManager = function (Module) {

        var mapper = new Map();

        //默认配置。
        var defaults = {
            seperator: '/', //模块 id 内的名称分隔符，如 `Users/List/API`。
            cross: false, //是否允许跨级加载模块。
            repeated: false, //是否允许重复定义同一个 id 的模块。
            Emitter: null //事件驱动器类。
        };

        /**
        * 构造器。
        *   options = {
        *       seperator: '/',     //模块 id 内的名称分隔符，如 `Users/List/API` 中的 `/`。
        *       cross: false,       //是否允许跨级加载模块。
        *       repeated: false,    //是否允许重复定义同一个 id 的模块。
        *       Emitter: null,      //事件驱动器类。
        *   };
        */
        function ModuleManager(options) {

            var config = Object.assign({}, defaults, options);
            var Emitter = config.Emitter;
            var emitter = Emitter ? new Emitter(this) : null;

            var meta = {
                'id$module': {},
                'seperator': config.seperator, //父子模块命名中的分隔符，如 `User/List/API`。
                'cross': config.cross, //是否允许跨级加载模块。
                'repeated': config.repeated, //是否允许重复定义模块。
                'emitter': emitter, //当前 `模块管理器` 的全局事件管理器。
                'Emitter': Emitter, //事件管理器构造器。 用于 define() 中，以便针对每个模块创建它私有的 emitter。
                'this': this, //方便内部访问 this 对象。


                /**
                * 用于给工厂函数加载公共模块。
                * 同时限制为仅允许加载公共模块。
                * 即 factory(require, module, exports){ } 中的第一个参数 `require`。
                */
                'require': function require(id) {
                    return meta.this.require(id, false);
                },

                /**
                * 内部使用的，触发全局事件。
                */
                'fire': function fire() {
                    emitter && emitter.fire.apply(emitter, arguments);
                },

                /**
                * 内部使用的，获取指定 id 对应的父模块对象。
                * 如 `User/List/API` 的父模块 id 为 ``User/List`。
                */
                'getParent': function getParent(id) {
                    var seperator = meta.seperator;
                    var names = id.split(seperator);

                    //顶级模块。
                    if (names.length == 1) {
                        return null;
                    }

                    //如 `Users/List`
                    var pid = names.slice(0, -1).join(seperator);

                    return meta.id$module[pid] || null;
                }

            };

            mapper.set(this, meta);

            //全局地监听每个模块的首次加载事件。
            this.on('require', function (id, module, exports) {

                //触发被加载模块的首次加载事件。
                module.fire('require', [exports]);

                //触发本级模块的事件。
                //取它的父模块的事件管理器。
                var parent = module.parent;

                if (parent) {
                    parent.fire('require', module.name, [exports]);
                }
            });
        }

        //实例方法
        ModuleManager.prototype = /**@lends ModuleManager#*/{
            constructor: ModuleManager,

            /**
            * 判断指定的模块是否已定义。
            */
            has: function has(id) {
                var meta = mapper.get(this);
                var id$module = meta.id$module;

                return id$module.hasOwnProperty(id);
            },

            /**
            * 定义一个模块。
            * @param {string} id 模块的名称。
            * @param {function|Object|Array} factory 模块的工厂函数或导出对象。
            *   工厂函数原型为 factory(require, module, exports) { }
            */
            define: function define(id, factory) {
                if (typeof id != 'string') {
                    throw new Error('\u53C2\u6570 id \u7684\u7C7B\u578B\u5FC5\u987B\u4E3A string\uFF0C\u5F53\u524D\u4E3A: ' + (typeof id === 'undefined' ? 'undefined' : _typeof(id)));
                }

                var meta = mapper.get(this);
                var id$module = meta.id$module;

                if (!meta.repeated && id$module[id]) {
                    throw new Error('\u914D\u7F6E\u8BBE\u5B9A\u4E86\u4E0D\u5141\u8BB8\u5B9A\u4E49\u91CD\u590D\u7684\u6A21\u5757: \u5DF2\u5B58\u5728\u540D\u4E3A ' + id + ' \u7684\u6A21\u5757');
                }

                var Emitter = meta.Emitter;
                var emitter = Emitter ? new Emitter() : null;
                var name = id.split(meta.seperator).slice(-1)[0]; //取最项一项作为短名称，如 `API`。

                id$module[id] = {
                    'id': id, //全名称，如 `Users/List/API`。
                    'name': name, //短名称，如 `API`。 如果 name == id，则说明是顶级模块，即不含有 `/`。
                    'factory': factory, //原始的工厂函数或导出对象。
                    'emitter': emitter, //用于工厂函数第二个参数 `module` 的事件驱动器。

                    //以下的在 require() 后肯定会给改写。
                    'parent': null, //父级对象。 如果为空，则说明是顶级模块。
                    'required': false, //指示是否已经 require 过。
                    'count': 0, //require 的次数统计。

                    //以下的在 require() 后可能会给改写。
                    'exports': null, //最终的导出对象。 要么是 factory 本身，要么是 factory 运行后的结果。
                    'mod': null, //工厂函数第二个参数 `module`。 如果工厂函数是一个直接导出对象，则它为空。

                    //触发当前模块级别的事件。
                    'fire': function fire() {
                        emitter && emitter.fire.apply(emitter, arguments);
                    }
                };
            },

            /**
            * 加载指定的模块。
            * @param {string} id 模块的名称。
            * @param {boolean} cross 是否允许跨级加载模块。
            *   如果不指定，则根据创建实例时指定的 cross 来决定。
            * @return 返回指定的模块的导出对象。
            */
            require: function require(id, cross) {
                if (typeof id != 'string') {
                    throw new Error('\u53C2\u6570 id \u7684\u7C7B\u578B\u5FC5\u987B\u4E3A string\uFF0C\u5F53\u524D\u4E3A: ' + (typeof id === 'undefined' ? 'undefined' : _typeof(id)));
                }

                var meta = mapper.get(this);
                var seperator = meta.seperator;

                //未指定，则使用创建实例时的配置。
                if (cross === undefined) {
                    cross = meta.cross;
                }

                if (!cross && id.includes(seperator)) {
                    throw new Error('\u53C2\u6570\u6307\u5B9A\u4E86\u6216\u914D\u7F6E\u8BBE\u5B9A\u4E86\u4E0D\u5141\u8BB8\u8DE8\u7EA7\u52A0\u8F7D\u6A21\u5757: ' + id);
                }

                //不存在该模块。
                if (!this.has(id)) {
                    return;
                }

                var id$module = meta.id$module;
                var module = id$module[id];

                //加载次数累计。
                module.count++;

                //已经加载过了。
                if (module.required) {
                    return module.exports;
                }

                //==============================================================================
                //首次加载。
                module.required = true; //更改标志，指示已经 require 过一次。


                var factory = module.factory;
                var parent = module.parent = meta.getParent(id);

                //非工厂函数，则直接导出。
                if (typeof factory != 'function') {
                    module.exports = factory;
                    meta.fire('require', [id, module, factory]);

                    return factory;
                }

                //--------------------------------------------------------------------------------
                //factory 是个工厂函数。
                var exports = {};

                //mod 就是工厂函数 factory(require, module, exports) 中的第二个参数啦。
                var mod = module.mod = new Module(id, {
                    'seperator': seperator,
                    'mm': this,
                    'emitter': module.emitter,

                    //会扩展到 mod 的属性。
                    'exports': exports, //模块的导出对象。
                    'parent': parent ? parent.mod : null //父模块实例。
                });

                //调用工厂函数获得导出对象。
                exports = factory(meta.require, mod, exports);

                //没有通过 return 来返回值，则要导出的值只能在 mod.exports 里。
                if (exports === undefined) {
                    exports = mod.exports;
                }

                module.exports = exports;

                //这条，给提供业务层提供方便。
                //即使是业务层是通过 return 来返回导出对象，
                //导出对象各成员函数之间依然可以通过 `module.exports.xx` 来引用其它的成员。
                mod.exports = exports;

                meta.fire('require', [id, module, exports]);

                return exports;
            },

            /**
            * 绑定事件。
            */
            on: function on() {
                var meta = mapper.get(this);
                var emitter = meta.emitter;

                emitter && emitter.on.apply(emitter, arguments);
            },

            /**
            * 销毁本实例。
            */
            destroy: function destroy() {
                var meta = mapper.get(this);
                var emitter = meta.emitter;

                emitter && emitter.destroy();
                mapper.delete(this);
            }
        };

        return ModuleManager;
    }(Module);

    /**
    * KISP 内部使用的模块管理器。
    */
    var InnerModules = function (ModuleManager) {

        //内部使用的模块管理器。
        var mm = new ModuleManager({
            cross: true //内部的，要允许跨级加载模块。 用于在一步到位加载某个模块的默念配置，如 `SSH/Server.defaults`
        });

        //记录要对外暴露的模块。
        var id$exposed = {};

        return {
            'has': mm.has.bind(mm),
            'define': mm.define.bind(mm), //本文件的底部即用到。
            'require': mm.require.bind(mm), //在 `partial/end.js` 中用到。

            /**
            * 绑定到指定模块的指定方法。
            * @param {string} id 模块的 id。
            * @param {string} name 要绑定的模块方法的名称。
            * @param {Object|boolean} context 绑定的方法执行时的上下文，即 this 变量的指向。
                如果传入 true，则表示当前要绑定的模块本身。
            * @return {function} 返回绑定后的方法。
            */
            bind: function bind(id, name, context) {

                return function () {
                    var M = mm.require(id);
                    var fn = M[name];

                    if (typeof fn != 'function') {
                        throw new Error('\u8981\u7ED1\u5B9A\u7684\u6A21\u5757 ' + id + ' \u4E2D\u4E0D\u5B58\u5728\u540D\u4E3A ' + name + ' \u7684\u65B9\u6CD5\u6216\u51FD\u6570\u3002');
                    }

                    context = context === true ? M : context || null;

                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    return fn.call.apply(fn, [context].concat(args));
                };
            },

            /**
            * 获取或设置模块的暴露状态。
            * 已重载 expose([]); //批量设置指定的模块列表为暴露状态。
            * 已重载 expose({}); //批量设置暴露状态。
            * 已重载 expose(id, exposed); //单个设置暴露状态。
            * 已重载 expose(id); //获取单个的暴露状态。
            */
            expose: function expose(id, exposed) {

                //重载 expose([]); 
                //批量 set 为 true。
                if (Array.isArray(id)) {
                    var ids = id;

                    ids.forEach(function (id) {
                        id$exposed[id] = true;
                    });

                    return;
                }

                //重载 expose({});
                //批量 set 为指定的 {}。
                if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) == 'object') {
                    var obj = id;

                    Object.keys(obj).forEach(function (id) {
                        id$exposed[id] = !!obj[id];
                    });

                    return;
                }

                //重载 expose(id, exposed);
                //单个 set。
                if (arguments.length == 2) {
                    id$exposed[id] = !!exposed;
                    return;
                }

                //重载 expose(id);
                //单个 get。
                id$exposed[id];
            }
        };
    }(ModuleManager);

    //内部使用的 define。
    var define = InnerModules.define;

    /**
    * 数组工具。
    * @namespace
    * @name Array
    */
    define('Array', function (require, module, exports) {

        return exports = /**@lends Array*/{

            /**
            * 对数组进行迭代。 
            * 对数组中的每个元素执行指定的操作。
            * 可以指定为深层次的)
            * @param {Array} array 要进行迭代的数组。
            * @param {function} fn 要执行处理的回调函数，会接受到当前元素和其索引作为参数。
            *   只有在 fn 中明确返回 false 才停止循环(相当于 break)。
            * @param {boolean} [isDeep=false] 指定是否进行深层次迭代。
                如果要进行深层次迭代，即对数组元素为数组继续迭代的，请指定 true；否则为浅迭代。
            * @return {Array} 返回当前数组。
            * @example
                $Array.each([0, 1, 2, ['a', 'b']], function(item, index) {
                    console.log(index + ': ' + item);
                }, true);
            */
            each: function each(array, fn, isDeep) {
                var each = arguments.callee; //引用自身，用于递归
                var len = array.length;

                for (var i = 0; i < len; i++) {

                    var item = array[i];

                    if (isDeep && item instanceof Array) {
                        //指定了深层次迭代
                        each(item, fn, true);
                    } else {
                        var value = fn(item, i);
                        if (value === false) {
                            break;
                        }
                    }
                }

                return array;
            },

            /**
            * 把一个数组中的元素转换到另一个数组中，返回一个新的数组。
            * @param {Array} array 要进行转换的数组。
            * @param {function} fn 转换函数。
                该转换函数会为每个数组元素调用，它会接收到两个参数：当前迭代的数组元素和该元素的索引。
            * 转换函数可以返回转换后的值，有两个特殊值影响到迭代行为：
            *   null：忽略当前数组元素，即该元素在新的数组中不存在对应的项（相当于 continue）；
            *   undefined：忽略当前数组元素到最后一个元素（相当于break）；
            * @param {boolean} [isDeep=false] 指定是否进行深层次迭代。
                如果要进行深层次迭代，即对数组元素为数组继续迭代的，请指定 true；否则为浅迭代。
            * @return {Array} 返回一个转换后的新数组。
            */
            map: function map(array, fn, isDeep) {
                var map = arguments.callee; //引用自身，用于递归
                var len = array.length;
                var a = [];
                var value;

                for (var i = 0; i < len; i++) {
                    var item = array[i];

                    if (isDeep && item instanceof Array) {
                        value = map(item, fn, true); // 此时的 value 是一个 []
                    } else {
                        value = fn(item, i);

                        if (value === null) {
                            continue;
                        }

                        if (value === undefined) {
                            //注意，当回调函数 fn 不返回值时，迭代会给停止掉
                            break;
                        }
                    }

                    a.push(value);
                }

                return a;
            },

            /**
            * 将一个数组中的元素转换到另一个数组中，并且保留所有的元素，返回一个新数组。
            * 作为参数的转换函数会为每个数组元素调用，并把当前元素和索引作为参数传给转换函数。
            * 该方法与 map 的区别在于本方法会保留所有的元素，而不管它的返回是什么。
            * @param {Array} array 要进行转换的数组。
            * @param {function} fn 转换函数。
                该转换函数会为每个数组元素调用，它会接收到两个参数：当前迭代的数组元素和该元素的索引。
            * 转换函数可以返回转换后的值，有两个特殊值影响到迭代行为：
            * @param {boolean} [isDeep=false] 指定是否进行深层次迭代。
                如果要进行深层次迭代，即对数组元素为数组继续迭代的，请指定 true；否则为浅迭代。
            * @return {Array} 返回一个转换后的新数组。
            */
            keep: function keep(array, fn, isDeep) {

                var keep = arguments.callee; //引用自身，用于递归
                var a = [];

                for (var i = 0, len = array.length; i < len; i++) {
                    var item = array[i];

                    var value = isDeep && item instanceof Array ? keep(item, fn, true) : fn(item, i);

                    a.push(value);
                }

                return a;
            },

            /**
            * 使用过滤函数过滤数组元素，返回一个新数组。
            * 此函数至少传递两个参数：待过滤数组和过滤函数。过滤函数必须返回 true 以保留元素或 false 以删除元素。
            * 转换函数可以返回转换后的值：
            * @param {Array} array 要进行转换的数组。
            * @param {function} fn 转换函数。
                该转换函数会为每个数组元素调用，它会接收到两个参数：当前迭代的数组元素和该元素的索引。
            * 转换函数可以返回转换后的值，有两个特殊值影响到迭代行为：
            * @param {boolean} [isDeep=false] 指定是否进行深层次迭代。
                如果要进行深层次迭代，即对数组元素为数组继续迭代的，请指定 true；否则为浅迭代。
            * @return {Array} 返回一个过滤后的新数组。
            */
            grep: function grep(array, fn, isDeep) {

                var grep = arguments.callee; //引用自身，用于递归
                var a = [];

                for (var i = 0, len = array.length; i < len; i++) {
                    var item = array[i];

                    if (isDeep && item instanceof Array) {
                        item = grep(item, fn, true);
                        a.push(item);
                    } else {
                        var value = fn(item, i);
                        if (value === true) {
                            a.push(item);
                        }
                    }
                }

                return a;
            },

            /**
            * 用滑动窗口的方式创建分组，即把转成二维数组。返回一个二维数组。
            * 可以指定窗口大小和步长。步长默认为1。
            */
            slide: function slide(array, windowSize, stepSize) {
                if (windowSize >= array.length) {
                    //只够创建一组
                    return [array];
                }

                stepSize = stepSize || 1;

                var groups = [];

                for (var i = 0, len = array.length; i < len; i = i + stepSize) {
                    var end = i + windowSize;

                    groups.push(array.slice(i, end));

                    if (end >= len) {
                        break; //已达到最后一组
                    }
                }

                return groups;
            },

            /**
            * 创建分组，即把转成二维数组。返回一个二维数组。
            * 当指定第三个参数为 true 时，可在最后一组向右对齐数据。
            */
            group: function group(array, size, isPadRight) {
                var groups = exports.slide(array, size, size);

                if (isPadRight === true) {
                    groups[groups.length - 1] = array.slice(-size); //右对齐最后一组
                }

                return groups;
            },

            /**
            * 对一个数组的所有元素进行求和。
            * 已重载 sum(array, fn)、sum(array)、sum(array, ignoreNaN)、sum(array, ignoreNaN, key)。
            * @param {Array} array 要进行求和的数组。
            * @param {boolean} [ignoreNaN=false] 指示是否忽略掉值为 NaN 的项。
                如果要忽略掉值为 NaN 的项，请指定为 true；否则为 false 或不指定。
            * @param {string} [key] 要读取的项的成员的键名称。
            *   如果指定第三个参数时，将读取数组元素中的对应的成员，该使用方式主要用于由 json 组成的的数组中。
            * @return {Number} 返回数组所有元素之和。
            * @example
                var a = [1, 2, 3, 4];
                var sum = $Array.sum(a); //得到 10
                //又如
                var a = [
                    { value: 1 },
                    { value: NaN },
                    { value: 3 },
                    { value: 4 },
                ];
                var sum = $Array.sum(a, true, 'value'); //得到 8
                  */
            sum: function sum(array, ignoreNaN, key) {
                var sum = 0;

                //重载 sum(array, fn);
                if (typeof ignoreNaN == 'function') {
                    var fn = ignoreNaN;

                    exports.each(array, function (item, index) {

                        var value = fn(item, index);

                        if (typeof value != 'number') {
                            throw new Error('第 ' + index + ' 个元素的返回值不是数字');
                        }

                        sum += value;
                    });

                    return sum;
                }

                var hasKey = !(key === undefined);

                for (var i = 0, len = array.length; i < len; i++) {
                    var value = hasKey ? array[i][key] : array[i];

                    if (isNaN(value)) {
                        if (ignoreNaN === true) {
                            continue;
                        } else {
                            throw new Error('第 ' + i + ' 个元素的值为 NaN');
                        }
                    } else {
                        sum += Number(value); //可以处理 string
                    }
                }

                return sum;
            },

            /**
            * 产生一个区间为 [start, end) 的半开区间的数组。
            * 已重载 pad(start, end, step, fn);
            * 已重载 pad(start, end, fn);
            * 已重载 pad(start, end);
            * @param {number} start 半开区间的开始值。
            * @param {number} end 半开区间的结束值。
            * @param {number} [step=1] 填充的步长，默认值为 1。可以指定为负数。
            * @param {function} [fn] 转换函数。 会收到当前项和索引值作为参数。
            * @return {Array} 返回一个递增（减）的数组。
            *   当 start 与 end 相等时，返回一个空数组。
            * @example
                $Array.pad(2, 5); //产生一个从 2 到 5 的数组，步长为1，结果为[2, 3, 4]
                $Array.pad(1, 9, 2); //产生一个从1到9的数组，步长为2，结果为[1, 3, 5, 7]
                $Array.pad(5, 2, -1); //产生一个从5到2的数组，步长为-1，结果为[5, 4, 3]
                //得到 [10, 20]
                $Array.pad(1, 3, function (item, index) {
                    return item * 10;
                });
            */
            pad: function pad(start, end, step, fn) {
                if (start == end) {
                    return [];
                }

                // 重载 pad(start, end, fn)
                if (typeof step == 'function') {
                    fn = step;
                    step = 1;
                } else {
                    step = Math.abs(step || 1);
                }

                var a = [];
                var index = 0;

                if (start < end) {
                    //升序
                    for (var i = start; i < end; i += step) {
                        var item = fn ? fn(i, index) : i;
                        a.push(item);
                        index++;
                    }
                } else {
                    //降序
                    for (var i = start; i > end; i -= step) {
                        var item = fn ? fn(i, index) : i;
                        a.push(item);
                        index++;
                    }
                }

                return a;
            }

        };
    });

    /**
    * 日期时间工具
    * @namespace
    * @name Date
    */
    define('Date', function (require, module, exports) {

        var delta = 0; //用于存放参考时间(如服务器时间)和本地时间的差值。


        function getDateItem(s) {
            var now = new Date();

            var separator = s.indexOf('.') > 0 ? '.' : s.indexOf('-') > 0 ? '-' : s.indexOf('/') > 0 ? '/' : s.indexOf('_') > 0 ? '_' : null;

            if (!separator) {
                return null;
            }

            var ps = s.split(separator);

            return {
                'yyyy': ps[0],
                'MM': ps[1] || 0,
                'dd': ps[2] || 1
            };
        }

        function getTimeItem(s) {
            var separator = s.indexOf(':') > 0 ? ':' : null;
            if (!separator) {
                return null;
            }

            var ps = s.split(separator);

            return {
                'HH': ps[0] || 0,
                'mm': ps[1] || 0,
                'ss': ps[2] || 0
            };
        }

        return exports = /**@lends Date */{

            /**
            * 把参数 value 解析成等价的日期时间实例。
            * @param {Date|string} value 要进行解析的参数，可接受的类型为：
            *   1.Date 实例
            *   2.string 字符串，包括调用 Date 实例的 toString 方法得到的字符串；也包括以下格式: 
                    yyyy-MM-dd
                    yyyy.MM.dd
                    yyyy/MM/dd
                    yyyy_MM_dd
                    HH:mm:ss
                    yyyy-MM-dd HH:mm:ss
                    yyyy.MM.dd HH:mm:ss
                    yyyy/MM/dd HH:mm:ss
                    yyyy_MM_dd HH:mm:ss
            * @return 返回一个日期时间的实例。
                如果解析失败，则返回 null。
            * @example
                $Date.parse('2013-04-29 09:31:20');
            */
            parse: function parse(value) {

                //标准方式
                var date = new Date(value);

                if (!isNaN(date)) {
                    return date;
                }

                if (typeof value != 'string') {
                    return null;
                }

                /*
                 自定义方式：
                    yyyy-MM-dd
                    yyyy.MM.dd
                    yyyy/MM/dd
                    yyyy_MM_dd
                    HH:mm:ss
                    yyyy-MM-dd HH:mm:ss
                    yyyy.MM.dd HH:mm:ss
                    yyyy/MM/dd HH:mm:ss
                    yyyy_MM_dd HH:mm:ss
                        
                */

                var parts = value.split(' ');
                var left = parts[0];

                if (!left) {
                    return null;
                }

                //冒号只能用在时间的部分，而不能用在日期部分
                var date = left.indexOf(':') > 0 ? null : left;
                var time = date ? parts[1] || null : date;

                if (!date && !time) {
                    //既没指定日期部分，也没指定时间部分
                    return null;
                }

                if (date && time) {
                    var d = getDateItem(date);
                    var t = getTimeItem(time);
                    return new Date(d.yyyy, d.MM - 1, d.dd, t.HH, t.mm, t.ss);
                }

                if (date) {
                    var d = getDateItem(date);
                    return new Date(d.yyyy, d.MM - 1, d.dd);
                }

                if (time) {
                    var now = new Date();
                    var t = getTimeItem(time);
                    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), t.HH, t.mm, t.ss);
                }
            },

            /**
            * 把日期时间格式化指定格式的字符串。
            * 已重载 format(formatter)。
            * @param {Date} datetime 要进行格式化的日期时间。
            *   如果不指定，则默认为当前时间，即 new Date()。
            * @param {string} formater 格式化的字符串。 其中保留的占位符有：
                'yyyy': 4位数年份
                'yy': 2位数年份
                'MM': 2位数的月份(01-12)
                'M': 1位数的月份(1-12)
                'dddd': '星期日|一|二|三|四|五|六'
                'dd': 2位数的日份(01-31)
                'd': 1位数的日份(1-31)
                'HH': 24小时制的2位数小时数(00-23)
                'H': 24小时制的1位数小时数(0-23)
                'hh': 12小时制的2位数小时数(00-12)
                'h': 12小时制的1位数小时数(0-12)
                'mm': 2位数的分钟数(00-59)
                'm': 1位数的分钟数(0-59)
                'ss': 2位数的秒钟数(00-59)
                's': 1位数的秒数(0-59)
                'tt': 上午：'AM'；下午: 'PM'
                't': 上午：'A'；下午: 'P'
                'TT': 上午： '上午'； 下午: '下午'
                'T': 上午： '上'； 下午: '下'
            * @return {string} 返回一个格式化的字符串。
            * @example
                //返回当前时间的格式字符串，类似 '2013年4月29日 9:21:59 星期一'
                $Date.format(new Date(), 'yyyy年M月d日 h:m:s dddd')
                $Date.format('yyyy年M月d日 h:m:s dddd')
            */
            format: function format(datetime, formater) {

                //重载 format(formater);
                if (arguments.length == 1) {
                    formater = datetime;
                    datetime = new Date();
                } else {
                    datetime = exports.parse(datetime);
                }

                var $String = require('String');

                var year = datetime.getFullYear();
                var month = datetime.getMonth() + 1;
                var date = datetime.getDate();
                var hour = datetime.getHours();
                var minute = datetime.getMinutes();
                var second = datetime.getSeconds();

                var padLeft = function padLeft(value, length) {
                    return $String.padLeft(value, length, '0');
                };

                var isAM = hour <= 12;

                //这里不要用 {} 来映射，因为 for in 的顺序不确定
                var maps = [['yyyy', padLeft(year, 4)], ['yy', String(year).slice(2)], ['MM', padLeft(month, 2)], ['M', month], ['dddd', '星期' + '日一二三四五六'.charAt(datetime.getDay())], ['dd', padLeft(date, 2)], ['d', date], ['HH', padLeft(hour, 2)], ['H', hour], ['hh', padLeft(isAM ? hour : hour - 12, 2)], ['h', isAM ? hour : hour - 12], ['mm', padLeft(minute, 2)], ['m', minute], ['ss', padLeft(second, 2)], ['s', second], ['tt', isAM ? 'AM' : 'PM'], ['t', isAM ? 'A' : 'P'], ['TT', isAM ? '上午' : '下午'], ['T', isAM ? '上' : '下']];

                var s = formater;
                var replaceAll = $String.replaceAll;

                for (var i = 0, len = maps.length; i < len; i++) {
                    var item = maps[i];
                    s = replaceAll(s, item[0], item[1]);
                }

                return s;
            },

            /**
            * 将指定的毫秒数加到指定的 Date 上。
            * 此方法不更改参数 datetime 的值，而是返回一个新的 Date，其值是此运算的结果。
            * @param {Date} datetime 要进行操作的日期时间。
            * @param {Number} value 要增加/减少的毫秒数。 
                可以为正数，也可以为负数。
            * @param {string} [formater] 可选的，对结果进行格式化的字符串。 
            * @return {Date|string} 返回一个新的日期实例或字符串值。
                如果指定了参数 formater，则进行格式化，返回格式化后的字符串值；
                否则返回 Date 的实例对象。
            * @example
                $Date.addMilliseconds(new Date(), 2000); //给当前时间加上2000毫秒
            */
            add: function add(datetime, value, formater) {
                datetime = exports.parse(datetime);

                var ms = datetime.getMilliseconds();
                var dt = new Date(datetime); //新建一个副本，避免修改参数

                dt.setMilliseconds(ms + value);

                if (formater) {
                    dt = exports.format(dt, formater);
                }

                return dt;
            },

            /**
            * 将指定的秒数加到指定的 Date 实例上。
            * @param {Date} datetime 要进行操作的日期时间实例。
            * @param {Number} value 要增加/减少的秒数。可以为正数，也可以为负数。
            * @param {string} [formater] 可选的，对结果进行格式化的字符串。 
            * @return {Date} 返回一个新的日期实例。
                此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
            * @example
                $Date.addSeconds(new Date(), 90); //给当前时间加上90秒
            */
            addSeconds: function addSeconds(datetime, value, formater) {
                return exports.add(datetime, value * 1000, formater);
            },

            /**
            * 将指定的分钟数加到指定的 Date 实例上。
            * @param {Date} datetime 要进行操作的日期时间实例。
            * @param {Number} value 要增加/减少的分钟数。可以为正数，也可以为负数。
            * @param {string} [formater] 可选的，对结果进行格式化的字符串。 
            * @return {Date} 返回一个新的日期实例。
                此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
            * @example
                $Date.addMinutes(new Date(), 90); //给当前时间加上90分钟
            */
            addMinutes: function addMinutes(datetime, value, formater) {
                return exports.addSeconds(datetime, value * 60, formater);
            },

            /**
            * 将指定的小时数加到指定的 Date 实例上。
            * @param {Date} datetime 要进行操作的日期时间实例。
            * @param {Number} value 要增加/减少的小时数。可以为正数，也可以为负数。
            * @return {Date} 返回一个新的日期实例。
                此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
            * @example
                $Date.addHours(new Date(), 35); //给当前时间加上35小时
            */
            addHours: function addHours(datetime, value, formater) {
                return exports.addMinutes(datetime, value * 60, formater);
            },

            /**
            * 将指定的天数加到指定的 Date 实例上。
            * @param {Date} datetime 要进行操作的日期时间实例。
            * @param {Number} value 要增加/减少的天数。可以为正数，也可以为负数。
            * @return {Date} 返回一个新的日期实例。。
                此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
            * @example
                $Date.addDays(new Date(), 35); //给当前时间加上35天
            */
            addDays: function addDays(datetime, value, formater) {
                return exports.addHours(datetime, value * 24, formater);
            },

            /**
            * 将指定的周数加到指定的 Date 实例上。
            * @param {Date} datetime 要进行操作的日期时间实例。
            * @param {Number} value 要增加/减少的周数。可以为正数，也可以为负数。
            * @return {Date} 返回一个新的日期实例。
                此方法不更改参数 datetime 的值。 而是返回一个新的 Date，其值是此运算的结果。
            * @example
                $Date.addWeeks(new Date(), 3); //给当前时间加上3周
            */
            addWeeks: function addWeeks(datetime, value, formater) {
                return exports.addDays(datetime, value * 7, formater);
            },

            /**
            * 将指定的月份数加到指定的 Date 实例上。
            * @param {Date} datetime 要进行操作的日期时间实例。
            * @param {Number} value 要增加/减少的月份数。可以为正数，也可以为负数。
            * @return {Date} 返回一个新的日期实例。
                此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
            * @example
                $Date.addMonths(new Date(), 15); //给当前时间加上15个月
            */
            addMonths: function addMonths(datetime, value, formater) {
                datetime = exports.parse(datetime);

                var dt = new Date(datetime); //新建一个副本，避免修改参数
                var old = datetime.getMonth();

                dt.setMonth(old + value);

                if (formater) {
                    dt = exports.format(dt, formater);
                }

                return dt;
            },

            /**
            * 将指定的年份数加到指定的 Date 实例上。
            * @param {Date} datetime 要进行操作的日期时间实例。
            * @param {Number} value 要增加/减少的年份数。可以为正数，也可以为负数。
            * @return {Date} 返回一个新的日期实例。
                此方法不更改参数 datetime 的值。 而是返回一个新的 Date，其值是此运算的结果。
            * @example
                $Date.addYear(new Date(), 5); //假如当前时间是2013年，则返回的日期实例的年份为2018
            */
            addYears: function addYears(datetime, value, formater) {
                return exports.addMonths(datetime, value * 12, formater);
            },

            /**
            * 设置一个参考时间在本地的初始值，随着时间的流逝，参考时间也会同步增长。
            * 如用来设置服务器时间在本地的初始值。
            */
            set: function set(datetime) {
                var dt = exports.parse(datetime);

                if (!dt) {
                    throw new Error('无法识别的日期时间格式: ' + datetime);
                }

                delta = dt - Date.now();
            },

            /**
            * 获取之前设置的参考时间。
            */
            get: function get(formater) {
                var dt = new Date();

                if (delta != 0) {
                    dt = exports.add(dt, delta);
                }

                if (formater) {
                    dt = exports.format(dt, formater);
                }

                return dt;
            },

            /**
            * 转换成最常用的字符串格式 `yyyy-MM-dd HH:mm:ss`。
            * 如 `2018-04-16 09:26:59`。
            * 已重载 stringify();          //获取当前时间的字符串格式。
            * 已重载 stringify(datetime);  //获取指定时间的字符串格式。
            */
            stringify: function stringify(datetime) {
                datetime = datetime || new Date();

                return exports.format(datetime, 'yyyy-MM-dd HH:mm:ss');
            }

        };
    });

    /**
    * 字符串工具类。
    * @namespace
    * @name String
    */
    define('String', function (require, module, exports) {

        //记录产生的随机串，避免意外重复。
        var randoms = new Set();

        return exports = /**@lends String */{
            /**
            * 产生指定格式或长度的随机字符串。
            * @param {string|int} [formater=12] 随机字符串的格式，或者长度（默认为12个字符）。
                格式中的每个随机字符用 'x' 来占位，如 'xxxx-1x2x-xx'
            * @return {string} 返回一个指定长度的随机字符串。
            * @example
                $String.random();      //返回一个 12 位的随机字符串
                $String.random(64);    //返回一个 64 位的随机字符串
                $String.random('xxxx-你好xx-xx'); //类似 'A3EA-你好B4-DC'
            */
            random: function random(formater) {
                if (formater === undefined) {
                    formater = 12;
                }

                //如果传入的是数字，则生成一个指定长度的格式字符串 'xxxxx...'
                if (typeof formater == 'number') {
                    var size = formater + 1;
                    if (size < 0) {
                        size = 0;
                    }
                    formater = [];
                    formater.length = size;
                    formater = formater.join('x');
                }

                var value = formater.replace(/x/g, function (c) {
                    var r = Math.random() * 16 | 0;
                    return r.toString(16);
                }).toUpperCase();

                //已存在，换一个。
                if (randoms.has(value)) {
                    value = exports.random(formater);
                } else {
                    randoms.add(value);
                }

                return value;
            },

            /**
            * 用指定的值去填充一个字符串。
            * 当不指定字符串的填充标记时，则默认为 {}。
            * @param {String} string 要进行格式填充的字符串模板。
            * @param {Object} obj 要填充的键值对的对象。
            * @return 返回一个用值去填充后的字符串。
            * @example
                $String.format('{id}{type}', {id: 1, type: 'app'});
                $String.format('{2}{0}{1}', 'a', 'b', 'c');
            */
            format: function format(string, obj) {
                var s = string;
                var replaceAll = exports.replaceAll;

                if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object') {
                    for (var key in obj) {
                        var value = obj[key];

                        if (Array.isArray(value)) {
                            value = value.join('');
                        }

                        s = replaceAll(s, '{' + key + '}', value);
                    }
                } else {
                    var args = [].slice.call(arguments, 1);
                    for (var i = 0, len = args.length; i < len; i++) {
                        var value = args[i];

                        if (Array.isArray(value)) {
                            value = value.join('');
                        }

                        s = replaceAll(s, '{' + i + '}', value);
                    }
                }

                return s;
            },

            /**
            * 对字符串进行全局替换。
            * @param {String} target 要进行替换的目标字符串。
            * @param {String} src 要进行替换的子串，旧值。
            * @param {String} dest 要进行替换的新子串，新值。
            * @return {String} 返回一个替换后的字符串。
            * @example
                $String.replaceAll('abcdeabc', 'bc', 'BC') //结果为 aBCdeBC
            */
            replaceAll: function replaceAll(target, src, dest) {
                return target.split(src).join(dest);
            },

            /**
            * 对字符串进行区间内的替换。
            * 该方法会把整个区间替换成新的字符串，包括区间标记。
            * 已重载 replaceBetween(s, { beginTag, endTags, value, });
            * @param {String} s 要进行替换的目标字符串。
            * @param {String} beginTag 区间的开始标记。
            * @param {String} endTag 区间的结束标记
            * @param {String} value 要进行替换的新子串，新值。
            * @return {String} 返回一个替换后的字符串。
            *   当不存在开始标记或结束标记时，都会不进行任何处理而直接返回原字符串。
            * @example
                $String.replaceBetween('hello #--world--# this is #--good--#', '#--', '--#', 'javascript') 
                //结果为 'hello javascript this is javascript'
            */
            replaceBetween: function replaceBetween(s, beginTag, endTag, value) {

                //重载 replaceBetween(s, opt);
                if ((typeof beginTag === 'undefined' ? 'undefined' : _typeof(beginTag)) == 'object') {
                    var opt = beginTag;
                    beginTag = opt.begin;
                    endTag = opt.end;
                    value = opt.value;
                }

                if (s.indexOf(beginTag) < 0 || s.indexOf(endTag) < 0) {
                    return s;
                }

                var list = s.split(beginTag).map(function (item) {

                    var a = item.split(endTag);

                    if (a.length == 1) {
                        return a[0];
                    }

                    return value + a.slice(1).join(endTag);
                });

                s = list.join('');

                return s;
            },

            /**
            * 右对齐此实例中的字符，在左边用指定的 Unicode 字符填充以达到指定的总长度。
            * 当指定的总长度小实际长度时，将从右边开始算起，做截断处理，以达到指定的总长度。
            * @param {String} string 要进行填充对齐的字符串。
            * @param {Number} totalWidth 填充后要达到的总长度。
            * @param {String} paddingChar 用来填充的模板字符串。
            * @return {String} 返回一个经过填充对齐后的新字符串。
            * @example
                $String.padLeft('1234', 6, '0'); //结果为 '001234'，右对齐，从左边填充 '0'
                $String.padLeft('1234', 2, '0'); //结果为 '34'，右对齐，从左边开始截断
            */
            padLeft: function padLeft(string, totalWidth, paddingChar) {
                string = String(string); //转成字符串

                var len = string.length;
                if (totalWidth <= len) {
                    //需要的长度短于实际长度，做截断处理
                    return string.substr(-totalWidth); //从后面算起
                }

                paddingChar = paddingChar || ' ';

                var arr = [];
                arr.length = totalWidth - len + 1;

                return arr.join(paddingChar) + string;
            },

            /**
            * 左对齐此字符串中的字符，在右边用指定的 Unicode 字符填充以达到指定的总长度。
            * 当指定的总长度小实际长度时，将从左边开始算起，做截断处理，以达到指定的总长度。
            * @param {String} string 要进行填充对齐的字符串。
            * @param {Number} totalWidth 填充后要达到的总长度。
            * @param {String} paddingChar 用来填充的模板字符串。
            * @return {String} 返回一个经过填充对齐后的新字符串。
            * @example
                $String.padLeft('1234', 6, '0'); //结果为 '123400'，左对齐，从右边填充 '0'
                $String.padLeft('1234', 2, '0'); //结果为 '12'，左对齐，从右边开始截断
            */
            padRight: function padRight(string, totalWidth, paddingChar) {
                string = String(string); //转成字符串

                var len = string.length;
                if (len >= totalWidth) {
                    return string.substring(0, totalWidth);
                }

                paddingChar = paddingChar || ' ';

                var arr = [];
                arr.length = totalWidth - len + 1;

                return string + arr.join(paddingChar);
            },

            /**
            * 获取位于两个标记子串之间的子字符串。
            * @param {String} string 要进行获取的大串。
            * @param {String} beginTag 区间的开始标记。
            * @param {String} endTag 区间的结束标记。
            * @return {String} 返回一个子字符串。当获取不能结果时，统一返回空字符串。
            * @example
                $String.between('abc{!hello!} world', '{!', '!}'); //结果为 'hello' 
            */
            between: function between(string, beginTag, endTag) {
                var startIndex = string.indexOf(beginTag);
                if (startIndex < 0) {
                    return '';
                }

                startIndex += beginTag.length;

                var endIndex = string.indexOf(endTag, startIndex);
                if (endIndex < 0) {
                    return '';
                }

                return string.substr(startIndex, endIndex - startIndex);
            },

            //---------------转换部分 -----------------------------------------------------

            /**
            * 把一个字符串转成骆驼命名法。。
            * 如 'font-size' 转成 'fontSize'。
            * @param {String} string 要进行转换的字符串。
            * @return 返回一个骆驼命名法的新字符串。
            * @example
                $String.toCamelCase('background-item-color') //结果为 'backgroundItemColor'
            */
            toCamelCase: function toCamelCase(string) {
                var rmsPrefix = /^-ms-/;
                var rdashAlpha = /-([a-z]|[0-9])/ig;

                return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, function (all, letter) {
                    return letter.toString().toUpperCase();
                });

                /* 下面的是 mootool 的实现
                return string.replace(/-\D/g, function(match) {
                    return match.charAt(1).toUpperCase();
                });
                */
            },

            /**
            * 把一个字符串转成短线连接法。
            * 如 fontSize 转成 font-size
            * @param {String} string 要进行转换的字符串。
            * @return 返回一个用短线连接起来的新字符串。
            * @example
                $String.toHyphenate('backgroundItemColor') //结果为 'background-item-color'
            */
            toHyphenate: function toHyphenate(string) {
                return string.replace(/[A-Z]/g, function (match) {
                    return '-' + match.charAt(0).toLowerCase();
                });
            },

            /**
            * 把一个字符串转成 UTF8 编码。
            * @param {String} string 要进行编码的字符串。
            * @return {String} 返回一个 UTF8 编码的新字符串。
            * @example
                $String.toUtf8('你好'); //结果为 ''
            */
            toUtf8: function toUtf8(string) {

                var $Array = require('Array');
                var a = [];

                $Array.each(string.split(''), function (ch, index) {
                    var code = ch.charCodeAt(0);
                    if (code < 0x80) {
                        a.push(code);
                    } else if (code < 0x800) {
                        a.push((code & 0x7C0) >> 6 | 0xC0);
                        a.push(code & 0x3F | 0x80);
                    } else {
                        a.push((code & 0xF000) >> 12 | 0xE0);
                        a.push((code & 0x0FC0) >> 6 | 0x80);
                        a.push(code & 0x3F | 0x80);
                    }
                });

                return '%' + $Array.keep(a, function (item, index) {
                    return item.toString(16);
                }).join('%');
            },

            /**
            * 把一个字符串转成等价的值。
            * 主要是把字符串形式的 0|1|true|false|null|undefined|NaN 转成原来的数据值。
            * 当参数不是字符串或不是上述值之一时，则直接返回该参数，不作转换。
            * @param {Object} value 要进行转换的值，可以是任何类型。
            * @return {Object} 返回一个等价的值。
            * @example
                $String.toValue('NaN') //NaN
                $String.toValue('null') //null
                $String.toValue('true') //true
                $String.toValue('false') //false
                $String.toValue({}) //不作转换，直接原样返回
            */
            toValue: function toValue(value) {
                if (typeof value != 'string') {
                    //拦截非字符串类型的参数
                    return value;
                }

                var maps = {
                    //'0': 0,
                    //'1': 1,
                    'true': true,
                    'false': false,
                    'null': null,
                    'undefined': undefined,
                    'NaN': NaN
                };

                return value in maps ? maps[value] : value;
            },

            //---------------分裂和提取部分 -----------------------------------------------------

            /**
            * 对一个字符串进行多层次分裂，返回一个多维数组。
            * @param {String} string 要进行分裂的字符串。
            * @param {Array} separators 分隔符列表数组。
            * @return {Array} 返回一个多维数组，该数组的维数，跟指定的分隔符 separators 的长度一致。
            * @example
                var string = 'a=1&b=2|a=100&b=200;a=111&b=222|a=10000&b=20000';
                var separators = [';', '|', '&', '='];
                var a = $String.split(string, separators);
                //结果 a 为
                a = 
                [                           // ';' 分裂的结果
                    [                       // '|'分裂的结果
                        [                   // '&'分裂的结果
                            ['a', '1'],     // '='分裂的结果
                            ['b', '2']
                        ],
                        [
                            ['a', '100'],
                            ['b', '200']
                        ]
                    ],
                    [
                        [
                            ['a', '111'],
                            ['b', '222']
                        ],
                        [
                            ['a', '10000'],
                            ['b', '20000']
                        ]
                    ]
                ];
            * 
            */
            split: function split(string, separators) {

                var $Array = require('Array');

                var list = String(string).split(separators[0]);

                for (var i = 1, len = separators.length; i < len; i++) {
                    list = fn(list, separators[i], i);
                }

                return list;

                //一个内部方法
                function fn(list, separator, dimension) {
                    dimension--;

                    return $Array.map(list, function (item, index) {

                        return dimension == 0 ? String(item).split(separator) : fn(item, separator, dimension); //递归
                    });
                }
            },

            /**
            * 获取一个字符串的字节长度。
            * 普通字符的字节长度为 1；中文等字符的字节长度为 2。
            * @param {string} s 要进行解析的字符串。
            * @return {Number} 返回参数字符串的字节长度。
            */
            getByteLength: function getByteLength(s) {
                if (!s) {
                    return 0;
                }

                return s.toString().replace(/[\u0100-\uffff]/g, '  ').length;
            }

        };
    });

    /**
    * 自定义多级事件类。
    * @class
    * @name Emitter
    */
    define('Emitter', function (require, module, exports) {
        var $Object = require('Object');
        var Tree = require('Tree');

        var mapper = new Map();

        /**
        * 构造器。
        * @param {Object} [context=null] 事件处理函数中的 this 上下文对象。
        *   如果不指定，则默认为 null。
        */
        function Emitter(context) {

            var meta = {
                'context': context,
                'tree': new Tree()
            };

            mapper.set(this, meta);
        }

        //实例方法
        Emitter.prototype = /**@lends Emitter.prototype */{
            constructor: Emitter,

            /**
            * 绑定指定名称的事件处理函数。
            * 已重载 on({...});
            * 已重载 on(name0, name1, ..., nameN, {...});
            * 已重载 on(name0, name1, ..., nameN, fn);
            * 已重载 on(args); 主要是为了方便调用方快速重绑定自己的 on() 方法。
            * 已重载 on(names, fn); 把多个事件名称绑定到同一个回调函数。
            * @param {string} name 要绑定的事件名称。
            * @param {function} fn 事件处理函数。 
                在处理函数内部， this 指向构造器参数 context 对象。
            * @example
                var emitter = new Emitter();
                emitter.on('click', function () {});
            */
            on: function on(name, fn) {
                //重载 on([]); 
                //分两种情况。
                if (Array.isArray(name)) {
                    if (fn) {
                        //重载 on(names, fn); 把多个事件名称绑定到同一个回调函数。
                        name.map(function (name) {
                            this.on(name, fn);
                        }, this);
                    } else {
                        //重载 on(args); 主要是为了方便调用方快速重绑定自己的 on() 方法。
                        this.on.apply(this, _toConsumableArray(name));
                    }

                    return;
                }

                var meta = mapper.get(this);
                var tree = meta.tree;
                var args = Array.from(arguments);

                //重载 on(name0, name1, ..., nameN, {...}) 的情况。
                //先尝试找到 {} 所在的位置。
                var index = args.findIndex(function (item, index) {
                    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object';
                });

                if (index >= 0) {
                    var obj = args[index]; //{} 部分。
                    var names = args.slice(0, index); //前缀部分 [name0, name1, ..., nameN]。
                    var list = $Object.flat(obj); //{} 部分扁平化。

                    list.forEach(function (item, index) {
                        var keys = names.concat(item.keys); //完整路径。

                        var node = tree.get(keys) || {
                            'list': [], //本节点的回调列表。
                            'count': 0 //本节点触发的次数计数。
                        };

                        node.list.push(item.value);
                        tree.set(keys, node);
                    });

                    return;
                }

                //重载 on(name0, name1, ..., nameN, fn) 的情况。
                //尝试找到回调函数 fn 所在的位置。
                var index = args.findIndex(function (item, index) {
                    return typeof item == 'function';
                });

                if (index < 0) {
                    throw new Error('参数中必须指定一个回调函数');
                }

                fn = args[index]; //回调函数

                var names = args.slice(0, index); //前面的都当作是名称

                //过滤掉空串。
                names = names.filter(function (key) {
                    return !!key;
                });

                var node = tree.get(names) || {
                    'list': [], //本节点的回调列表。
                    'count': 0, //本节点触发的次数计数。
                    'enabled': true, //当为 false 时，表示本节点的回调被禁用。
                    'spreaded': true //当为 false 时，表示子节点的回调被禁用。
                };

                node.list.push(fn);
                tree.set(names, node);
            },

            /**
            * 解除绑定指定名称的事件处理函数。
            * 已重载 off() 的情况。
            * 已重载 off(name0, name1, ..., nameN, {...}) 的情况。
            * 已重载 off(name0, name1, ..., nameN, fn) 的情况。
            * 已重载 off(name0, name1, ..., nameN) 的情况。
            * @param {string} [name] 要解除绑定的事件名称。
                如果不指定该参数，则移除所有的事件。
                如果指定了该参数，其类型必须为 string，否则会抛出异常。
            * @param {function} [fn] 要解除绑定事件处理函数。
                如果不指定，则移除 name 所关联的所有事件。
            */
            off: function off(name, fn) {
                var meta = mapper.get(this);
                var tree = meta.tree;
                var args = Array.from(arguments);

                //未指定事件名，则移除所有的事件。
                if (args.length == 0) {
                    tree.clear();
                    return;
                }

                //多名称情况: off(name0, name1, ..., nameN, {});
                //先尝试找到 {} 所在的位置。
                var index = args.findIndex(function (item, index) {
                    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object';
                });

                if (index >= 0) {
                    var obj = args[index]; //{} 对象。
                    var names = args.slice(0, index); //前缀部分 [name0, name1, ..., nameN]。
                    var list = $Object.flat(obj); //{} 对象部分扁平化。

                    list.forEach(function (item, index) {
                        var keys = names.concat(item.keys); //完整路径。
                        var node = tree.get(keys); //该路径对应的节点。

                        //不存在该路径对应的节点。
                        if (!node) {
                            return;
                        }

                        //存在该路径对应的节点，但事件列表为空。
                        var list = node.list;
                        if (!list || !list.length) {
                            return;
                        }

                        var fn = item.value;
                        node.list = list.filter(function (item) {
                            return item !== fn;
                        });
                    });
                    return;
                }

                //重载 off(name0, name1, ..., nameN, fn) 的情况。
                //先尝试找到回调函数所在的位置。
                var index = args.findIndex(function (item, index) {
                    return typeof item == 'function';
                });

                //未指定处理函数，则假定在边界之外。
                if (index < 0) {
                    index = args.length;
                }

                fn = args[index]; //回调函数。

                var names = args.slice(0, index); //前面的都当作是名称。
                var node = tree.get(names);

                //不存在该路径对应的节点。
                if (!node) {
                    return;
                }

                //存在该路径对应的节点，但事件列表为空。
                var list = node.list;
                if (!list || !list.length) {
                    return;
                }

                if (fn) {
                    node.list = list.filter(function (item, index) {
                        return item !== fn;
                    });
                } else {
                    //未指定处理函数，则清空列表
                    list.length = 0;
                }
            },

            /**
            * 已重载。
            * 触发指定名称的事件，并可向事件处理函数传递一些参数。
            * @return {Array} 返回所有事件处理函数的返回值所组成的一个数组。
            * @example
                var emitter = new Emitter();
                emitter.on('click', 'name', function (a, b) {
                    console.log(a, b);
                });
                emitter.fire('click', 'name', [100, 200]);
            */
            fire: function fire(name, params) {
                var meta = mapper.get(this);
                var args = [].concat(Array.prototype.slice.call(arguments));

                //找到参数数组所在的位置。
                var index = args.findIndex(function (item, index) {
                    return Array.isArray(item);
                });

                if (index < 0) {
                    index = args.length;
                }

                var names = args.slice(0, index); //参数数组之前的项，都当作事件名称。
                var node = meta.tree.get(names); //根据名称序列获取对应的信息节点。

                //不存在该事件名序列对应的节点。
                if (!node) {
                    return [];
                }

                params = args[index] || [];
                node.count++;

                //依次执行回调列表的每一项，并收集返回值。
                return node.list.map(function (fn, index) {
                    return fn.apply(meta.context, params); //让 fn 内部的 this 指向 context，并收集返回值。
                });
            },

            /**
            * 设置指定的属性为指定的值。
            * 如可以在触发事件前动态改变 context 值。
            */
            set: function set(key, value) {
                var meta = mapper.get(this);

                switch (key) {
                    case 'context':
                        meta[key] = value;
                        break;

                    default:
                        throw new Error('不支持设置属性: ' + key);
                }
            },

            /**
            * 销毁本实例对象。
            */
            destroy: function destroy() {
                var meta = mapper.get(this);
                meta.tree.destroy();
                mapper.delete(this);
            }

        };

        return Emitter;
    });

    /**
    * 对象工具
    * @namespace
    * @name Object
    */
    define('Object', function (require, module, exports) {

        return exports = /**@lends Object */{

            extend: Object.assign,

            /**
            * 用多个对象深度扩展一个对象。
            */
            extendDeeply: function extendDeeply(target, obj1, obj2) {

                var isPlain = exports.isPlain;

                function copy(A, B) {
                    A = A || {};

                    for (var key in B) {
                        var target = B[key];
                        var source = A[key];

                        if (isPlain(target)) {
                            if (isPlain(source)) {
                                source = copy({}, source);
                            } else {
                                source = {};
                            }

                            target = copy(source, target);
                        }

                        A[key] = target;
                    }

                    return A;
                }

                //针对最常用的情况作优化
                if (obj1 && (typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) == 'object') {
                    target = copy(target, obj1);
                }

                if (obj2 && (typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) == 'object') {
                    target = copy(target, obj2);
                }

                var startIndex = 3;
                var len = arguments.length;

                if (startIndex >= len) {
                    //已处理完所有参数
                    return target;
                }

                //更多的情况
                for (var i = startIndex; i < len; i++) {
                    var objI = arguments[i];

                    target = copy(target, objI);
                }

                return target;
            },

            /**
            * 检测对象是否是空对象(不包含任何属性)。
            * 该方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使用 hasOwnProperty )。
            * 该实现为 jQuery 的版本。
            * @param {Object} obj 要进行检测的对象，可以是任何类型
            * @return {boolean} 一个检测结果，如果为空对象则返回 true；否则返回 false
            * @example
                $Object.isEmpty({});      //true
                
                function Person(){ }
                Person.prototype.name = 'abc';
                var p = new Person();
                $Object.isEmpty( p );   //false
            */
            isEmpty: function isEmpty(obj) {
                for (var name in obj) {
                    return false;
                }

                return true;
            },

            /**
            * 检测一个对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）。
            * 该实现为 jQuery 的版本。
            * @param {Object} obj 要进行检测的对象，可以是任何类型
            * @return {boolean} 一个检测结果，如果为纯粹的对象则返回 true；否则返回 false
            * @example
                $Object.isPlain( {} );             //true
                $Object.isPlain( {a: 1, b: {} } );  //true
                
                function Person(){ }
                var p = new Person();
                $Object.isPlain( p );   //false
            */
            isPlain: function isPlain(obj) {
                if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) != 'object' /*|| obj.nodeType || exports.isWindow(obj) */) {
                        return false;
                    }

                var hasOwnProperty = Object.prototype.hasOwnProperty;
                var constructor = obj.constructor;

                try {
                    // Not own constructor property must be Object
                    if (constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(constructor.prototype, "isPrototypeOf")) {
                        return false;
                    }
                } catch (e) {
                    // IE8,9 Will throw exceptions on certain host objects #9897
                    return false;
                }

                // Own properties are enumerated firstly, so to speed up,
                // if last one is own, then all properties are own.
                var key;
                for (key in obj) {}

                return key === undefined || hasOwnProperty.call(obj, key);
            },

            /**
            * 把一个对象的键/值对深层次地扁平化成一个数组。
            * @param {Object} obj 要进行线性化的纯对象。
            * @return {Array} 返回一个线性化表示的一维数组。
            *   数组的每项都为一个 { keys: [], value: ... } 的结构。
            * @example
                var list = $Object.flat({
                 name: {
                     a: 1,
                        b: 2,
                        c: {
                         aa: 11,
                            bb: 22
                        }
                    },
                    tag: {
                     a: 'a0',
                        b: 'b0'
                    },
                    id: 1000
                });
                console.dir(list);
                //得到: 
                [
                    { keys: ['name', 'a'], value: 1 },
                    { keys: ['name', 'b'], value: 2 },
                    { keys: ['name', 'c', 'aa'], value: 11 },
                    { keys: ['name', 'c', 'bb'], value: 22 },
                    { keys: ['tag', 'a'], value: 'a0' },
                    { keys: ['tag', 'b'], value: 'b0' },
                    { keys: ['id'], value: 1000 },
                ]
            */
            flat: function flat(obj) {
                var isPlain = exports.isPlain;

                var list = [];
                if (!obj || !isPlain(obj)) {
                    return list;
                }

                var keys = [];

                /**
                * @inner
                * 内部使用的迭代函数。
                * @param {Object} obj 要进行迭代的对象。
                * @param {number} level 用来跟踪当前迭代键值所处的层次深度，辅助用的。
                */
                function each(obj, level) {

                    for (var key in obj) {

                        var value = obj[key];

                        keys = keys.slice(0, level);
                        keys.push(key);

                        if (isPlain(value)) {
                            //还是一个纯对象
                            each(value, level + 1); //递归处理
                            continue;
                        }

                        //叶子结点
                        list.push({
                            'keys': keys,
                            'value': value
                        });
                    }
                }

                each(obj, 0);

                return list;
            },

            /**
            * 对一个对象进行迭代。
            * 该方法可以代替 for in 的语句。
            * 只有在回调函数中明确返回 false 才停止循环。
            * @param {Object} obj 要进行迭代处理的对象
            * @param {function} fn 要进行迭代处理的回调函数，该函数中会接收到当前对象迭代的到 key 和 value 作为参数
            * @param {boolean} [isDeep=false] 
                指示是否要进行深层次的迭代，如果是，请指定 true；
                否则请指定 false 或不指定。默认为 false，即浅迭代
            * @example
                var obj = {
                    a: 1, 
                    b: 2, 
                    c: {
                        A: 11, 
                        B: 22
                    } 
                };
                  $Object.each(obj, function(key, value) {
                    console.log(key, ': ', value);
                }, true);
            输出：
                a: 1,
                b: 2,
                c: { A: 11, B: 22},
                A: 11,
                B: 22
            */
            each: function each(obj, fn, isDeep) {

                for (var key in obj) {
                    var value = obj[key];

                    // 只有在 fn 中明确返回 false 才停止循环
                    if (fn(key, value) === false) {
                        break;
                    }

                    //指定了深迭代，并且当前 value 为非 null 的对象
                    if (isDeep === true && value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
                        exports.each(value, fn, true); //递归
                    }
                }
            },

            /**
            * 对象映射转换器，返回一个新的对象。
            * @param {Object} obj 要进行迭代处理的对象
            * @param {function} fn 要进行迭代处理的回调函数，该函数中会接收到当前对象迭代的到 key 和 value 作为参数。
            * @param {boolean} [isDeep=false] 指示是否要进行深层次的迭代。
                如果是，请指定 true；
                否则请指定 false 或不指定。
                默认为 false，即浅迭代
            * @return {Object} 返回一个新的对象，key 仍为原来的 key，value 由回调函数得到
            * @example
                var obj = { 
                    a: 1, 
                    b: 2, 
                    c: {
                        A: 11, 
                        B: 22,
                    },
                };
                  var obj2 = $Object.map(obj, function(key, value) {
                    return value * 100;
                }, true);
                  console.dir(obj2);
            结果：
                obj2 = {
                    a: 100, 
                    b: 200, 
                    c: {
                        A: 1100, 
                        B: 2200,
                    },
                };
            */
            map: function map(obj, fn, isDeep) {
                var target = {};

                exports.each(obj, function (key, value) {

                    if (isDeep && exports.isPlain(value)) {
                        //指定了深迭代，并且当前 value 为纯对象
                        target[key] = exports.map(value, fn, isDeep); //递归
                    } else {
                        target[key] = fn(key, value);
                    }
                });

                return target;
            },

            /**
            * 用指定的多个键和单个值组合生成一个深层次的对象。
            * 已重载 make(keys, value);        //没有显式提供一个容器对象，则内部提供一个空的。
            * 已重载 make(obj, keys, value);   //使用指定的容器对象。
            * 如：make(['A', 'B', 'C'], 100) => { A: { B: { C: 100, }, }, }
            * 参数：
            *   obj: {},    //容器对象。 如果(可以)不指定，则内部提供一个空白的全新对象。
            *   keys: [],   //键列表。 如 ['A', 'B', 'C']。
            *   value: any, //值。
            */
            make: function make(obj, keys, value) {
                //重载 make(keys, value);
                //没有显式提供一个容器对象，则内部提供一个空的。
                if (Array.isArray(obj)) {
                    value = keys;
                    keys = obj;
                    obj = {};
                }

                if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) != 'object') {
                    throw new Error('参数 obj 必须为一个非空的对象，以作为容器对象。');
                }

                var item = obj;
                var maxIndex = keys.length - 1; //判断是否为最后一个。

                //依次组装。
                keys.map(function (key, index) {
                    var old = item[key];

                    //非最后一项，则保证创建一个 {} 作为容器。
                    //这意味着，如果原来的值不是对象，则会因为给新的 {} 覆盖而丢失。
                    if (index < maxIndex) {
                        item = item[key] = (typeof old === 'undefined' ? 'undefined' : _typeof(old)) == 'object' ? old || {} : {};
                    } else {
                        //最后一项，直接赋值。
                        item[key] = value;
                    }
                });

                return obj;
            },

            /**
            * 对一个对象进行成员过滤，返回一个过滤后的新对象。
            * 该方法可以以某个模板对指定对象进行成员拷贝。
            * @param {Object} src 要进行拷贝的对象，即数据来源。
            * @param {Array|Object|string} samples 要拷贝的成员列表(模板)。
            * @return {Object} 返回一个过滤后的新对象。
            * @example
                var src = {
                    a: 100,
                    b: 200,
                    c: 300,
                    d: 400
                };
                      var samples = {
                    a: 1,
                    b: 2
                };
                      //或 samples = ['a', 'b'];
                      var obj = $Object.filter(src, samples);
                console.dir(obj); //得到 obj = { a: 100, b: 200 }; 只保留 samples 中指定的成员，其他的去掉.
            */
            filter: function filter(src, samples) {

                var $Array = require('Array');

                var obj = {};

                if (Array.isArray(samples)) {
                    samples.forEach(function (key, index) {
                        if (key in src) {
                            obj[key] = src[key];
                        }
                    });
                } else if (exports.isPlain(samples)) {
                    exports.each(samples, function (key, value) {

                        if (key in src) {
                            obj[key] = src[key];
                        }
                    });
                } else if (typeof samples == 'string') {
                    var key = samples;
                    if (key in src) {
                        obj[key] = src[key];
                    }
                } else {
                    throw new Error('无法识别参数 samples 的类型');
                }

                return obj;
            },

            /**
            * 删除对象中指定的成员，返回一个新对象。
            * 指定的成员可以以单个的方式指定，也可以以数组的方式指定(批量)。
            * @param {Object} obj 要进行处理的对象。
            * @param {String|Array|Object} keys 要删除的成员名称，可以是单个，也可以是批量。
            * @return {Object} 返回一个被删除相应成员后的新对象。
            * @example
                var obj = {
                    a: 1, 
                    b: 2, 
                    c: 3
                };
                      var o = $Object.remove(obj, ['a', 'c']); //移除成员 a 和 c 
                console.dir(o); //得到 o = { b: 2 };
                      o = $Object.remove(obj, {a: 1, b: 2});
                console.dir(o); //得到 o = { c: 3 };
            */
            remove: function remove(obj, keys) {
                var target = Object.assign({}, obj); //浅拷贝一份

                if (typeof keys == 'string') {
                    delete target[keys];
                } else if (Array.isArray(keys)) {
                    for (var i = 0, len = keys.length; i < len; i++) {
                        delete target[keys[i]];
                    }
                } else {
                    for (var key in keys) {
                        delete target[key];
                    }
                }

                return target;
            }
        };
    });

    /**
    * 树形结构的存储类。
    * @class
    * @name Tree
    */
    define('Tree', function (require, module, exports) {

        var mapper = new Map();

        /**
        * 构造器。
        */
        function Tree() {

            var meta = {
                'key$node': {},
                'count': 0
            };

            mapper.set(this, meta);
        }

        //获取指定节点下指定路径的节点
        function getNode(key$node, keys) {

            var lastIndex = keys.length - 1;

            for (var index = 0; index <= lastIndex; index++) {

                var key = keys[index];
                var node = key$node[key];

                if (!node || index == lastIndex) {
                    //不存在了，或是最后一项了
                    return node || null;
                }

                key$node = node.key$node; //准备下一轮迭代
            }
        }

        //实例方法
        Tree.prototype = /**@lends Tree.prototype */{
            constructor: Tree,

            /**
            * 设置指定节点上的值。
            * 如果不存在该节点，则先创建，然后存储值到上面；否则直接改写原来的值为指定的值。
            * 已重载 set(key0, key1, ..., keyN, value) 的情况。
            * @param {Array} keys 节点路径数组。
            * @param value 要设置的值。
            * @example
                tree.set(['path', 'to'], 123);
                tree.set('path', 'to', 123); //跟上面的等价
            */
            set: function set(keys, value) {
                //重载 set(key0, key1, ..., keyN, value) 的情况。
                if (!Array.isArray(keys)) {
                    var args = Array.from(arguments);
                    keys = args.slice(0, -1);

                    value = args.slice(-1)[0]; //参数中的最后一个即为 value
                }

                //过滤掉空串。
                keys = keys.filter(function (key) {
                    return !!String(key);
                });

                if (!keys.length) {
                    throw new Error('过滤后的节点 key 为空数组。');
                }

                var meta = mapper.get(this);
                var key$node = meta.key$node;
                var lastIndex = keys.length - 1;
                var node = null;

                keys.forEach(function (key, index) {
                    node = key$node[key];

                    if (!node) {
                        meta.count++;

                        node = key$node[key] = {
                            'key$node': {}, //子节点的容器对象。
                            'parent': key$node, //指向父节点，方便后续处理。
                            'key': key //当前的 key，方便后续处理。
                            //'value': undefined,     //会有一个这样的字段，但先不创建。
                        };
                    }

                    if (index < lastIndex) {
                        key$node = node.key$node; //准备下一轮迭代
                    } else {
                        //最后一项
                        node.value = value;
                    }
                });
            },

            /**
            * 获取指定路径的节点上的值。
            * @return 返回该节点上的值。 如果不存在该节点，则返回 undefined。
            * @example
                tree.get('path', 'to'); //获取路径为 'path' -> 'to' 的节点上存储的值。
            */
            get: function get(keys) {
                //重载 get(key0, key1, ..., keyN) 的情况
                if (!Array.isArray(keys)) {
                    keys = Array.from(arguments);
                }

                //过滤掉空串。
                keys = keys.filter(function (key) {
                    return !!String(key);
                });

                if (!keys.length) {
                    throw new Error('过滤后的节点 key 为空数组。');
                }

                var meta = mapper.get(this);
                var key$node = meta.key$node;

                var node = getNode(key$node, keys);
                return node ? node.value : undefined;
            },

            /**
            * 清空全部节点及数据。
            */
            clear: function clear() {
                var meta = mapper.get(this);
                meta.key$node = {};
                meta.count = 0;
            },

            /**
            * 删除指定节点上的值。
            */
            remove: function remove(keys) {

                //重载 remove(key0, key1, ..., keyN) 的情况
                if (!Array.isArray(keys)) {
                    keys = [].concat(Array.prototype.slice.call(arguments));
                }

                //过滤掉空串。
                keys = keys.filter(function (key) {
                    return !!String(key);
                });

                if (!keys.length) {
                    throw new Error('过滤后的节点 key 为空数组。');
                }

                var meta = mapper.get(this);
                var key$node = meta.key$node;
                var node = getNode(key$node, keys);

                if (!node) {
                    //不存在该节点
                    return;
                }

                var $Object = require('Object');
                var obj = node.key$node; //子节点

                if (!obj || $Object.isEmpty(obj)) {
                    //不存在子节点
                    meta.count--;
                    delete node.parent[node.key]; //删除整个节点自身，节省内存
                } else {
                    delete node.value; //删除值
                }
            },

            /**
            * 销毁。
            */
            destroy: function destroy() {
                mapper.delete(this);
            }

        };

        return Tree;
    });

    /**
    * HTML 转码工具。
    * @namespace
    * @name Escape
    */
    define('Escape', function (require, module, exports) {

        return exports = /**@lends Escape*/{

            /**
            * 把用户产生的内容做转换，以便可以安全地放在 html 里展示。
            * @return {String}
            */
            html: function html(string) {
                var s = String(string);
                var reg = /[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g;

                s = s.replace(reg, function (r) {
                    return "&#" + r.charCodeAt(0) + ";";
                });

                s = s.replace(/ /g, "&nbsp;");
                s = s.replace(/\r\n/g, "<br />");
                s = s.replace(/\n/g, "<br />");
                s = s.replace(/\r/g, "<br />");

                return s;
            },

            /**
            * 把用户产生的内容做转换，以便可以安全地放在节点的属性里展示。
            * @example 如 `<input value="XXX">`，`XXX` 就是要转换的部分。
            * @return {String}
            */
            attribute: function attribute(string) {
                var s = String(string);
                var reg = /[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g;

                return s.replace(reg, function (r) {
                    return "&#" + r.charCodeAt(0) + ";";
                });
            },

            /**
            * 用做过滤直接放到 HTML 里 j s中的。
            * @return {String}
            */
            script: function script(string) {
                var s = String(string);
                var reg = /[\\"']/g;

                s = s.replace(reg, function (r) {
                    return "\\" + r;
                });

                s = s.replace(/%/g, "\\x25");
                s = s.replace(/\n/g, "\\n");
                s = s.replace(/\r/g, "\\r");
                s = s.replace(/\x01/g, "\\x01");

                return s;
            },

            /**
            * 对查询字符串中的值部分进行转换。
            * 如 `http://www.test.com/?a=XXX`，其中 `XXX` 就是要过滤的部分。
            * @return {String}
            */
            query: function query(string) {
                var s = String(string);
                return escape(s).replace(/\+/g, "%2B");
            },

            /**
            * 用做过滤直接放到<a href="javascript:alert('XXX')">中的XXX
            * @return {String}
            */
            hrefScript: function hrefScript(string) {
                var s = exports.escapeScript(string);

                s = s.replace(/%/g, "%25"); //escMiniUrl
                s = exports.escapeElementAttribute(s);
                return s;
            },

            /**
            * 用做过滤直接放到正则表达式中的。
            * @return {String}
            */
            regexp: function regexp(string) {
                var s = String(string);
                var reg = /[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g;

                return s.replace(reg, function (a, b) {
                    return "\\" + a;
                });
            }

        };
    });

    /**
    * 函数工具类
    * @namespace
    * @name Fn
    */
    define('Fn', function (require, module, exports) {

        return (/**@lends Fn*/{
                /**
                * 空函数。
                * 提供一个什么也不做、直接原样返回入参的空操作函数。
                * 在很多场合可以用来提供给模块配置，以要求的回调函数不为空。
                */
                noop: function noop() {
                    return arguments.length <= 0 ? undefined : arguments[0];
                },

                /**
                * 用一个的随机延迟时间去执行一个回调函数，并传递一些参数。
                * @param {Object} delay 延迟配置对象。
                    如 { min: 500, max: 2000, }，当不需要延迟时，则应为 null。
                * @param {function} fn 要延迟执行的函数。
                * @param {Array} [args] 要传递的参数数组。
                * @return {number} 返回 setTimeout 的结果。
                *   如果没有启用延迟，则不返回值。
                */
                delay: function delay(_delay, fn, args) {
                    if (!fn) {
                        return;
                    }

                    if (_delay === false || _delay == null) {
                        //不启用延迟
                        fn.apply(null, args);
                        return;
                    }

                    var $Math = require('Math');

                    var timeout = typeof _delay == 'number' ? _delay : $Math.randomInt(_delay.min, _delay.max);

                    return setTimeout(function () {
                        fn.apply(null, args);
                    }, timeout);
                }

            }
        );
    });

    /**
    * 数学工具类
    * @namespace
    * @name Math
    */
    define('Math', function (require, module, exports) {

        return exports = /**@lends Math*/{

            /**
            * 产生指定闭区间的随机整数。
            * @param {number} [minValue=0] 闭区间的左端值。
                当只指定一个参数时，minValue 默认为 0；
            * @param {number} [maxValue] 闭区间的右端值。
            * @return 返回一个整数。<br />
                当不指定任何参数时，则用 Math.random() 产生一个已移除了小数点的随机整数。
            * @example
                $Math.randomInt(100, 200); //产生一个区间为 [100, 200] 的随机整数。
                $Math.randomInt(100); //产生一个区间为 [0, 200] 的随机整数。
                $Math.randomInt(); //产生一个随机整数。
            */
            randomInt: function randomInt(minValue, maxValue) {

                var len = arguments.length;

                if (len == 0) {
                    //重载 Math.randomInt()
                    //先称除小数点，再去掉所有前导的 0，最后转为 number
                    return Number(String(Math.random()).replace('.', '').replace(/^0*/g, ''));
                }

                if (len == 1) {
                    //重载 Math.randomInt(maxValue)
                    maxValue = minValue;
                    minValue = 0;
                }

                var count = maxValue - minValue + 1;
                return Math.floor(Math.random() * count + minValue);
            },

            /**
            * 圆形求模方法。
            * 即用圆形链表的方式滑动一个数，返回一个新的数。
            * 即可正可负的双方向求模。
            * 可指定圆形链表的长度(size) 和滑动的步长(step)，滑动步长的正负号指示了滑动方向
            */
            slide: function slide(index, size, step) {
                step = step || 1; //步长默认为1

                index += step;
                if (index >= 0) {
                    return index % size;
                }

                return (size - Math.abs(index) % size) % size;
            },

            /**
            * 下一个求模数
            */
            next: function next(index, size) {
                return exports.slide(index, size, 1);
            },

            /**
            * 上一个求模数
            */
            previous: function previous(index, size, step) {
                return exports.slide(index, size, -1);
            },

            /**
            * 把一个含有百分号的字符串解析成等值的小数。
            * @param {string} v 要解析的参数。
                期望得到 string 类型，实际可传任何类型。
            * @return {Number} 返回一个小数。
                只有参数是字符串，并且去掉前后空格后以百分号结尾才会进行转换；否则直接返回参数。
                如果解析失败，则返回 NaN。
            */
            parsePercent: function parsePercent(v) {
                if (typeof v != 'string') {
                    return v;
                }

                var s = v.trim();

                if (s.slide(-1) != '%') {
                    return v;
                }

                return parseFloat(s) / 100;
            }

        };
    });

    /**
    * Hash 工具类
    * @namespace
    * @name Hash
    */
    define('Hash', function (require, module, exports) {
        var $Object = require('Object');

        return exports = /**@lends Hash */{

            /**
            * 获取指定 url 的 hash 中指定的键所对应的值。
            * @param {string} url 要进行获取的 url 字符串。
            * @param {string} [key] 要检索的键。
            * @param {boolean} [ignoreCase=false] 是否忽略参数 key 的大小写。 默认区分大小写。
                如果要忽略 key 的大小写，请指定为 true；否则不指定或指定为 false。
                当指定为 true 时，将优先检索完全匹配的键所对应的项；若没找到然后再忽略大小写去检索。
            * @retun {string|Object|undefined} 返回一个查询字符串值。
                当不指定参数 key 时，则获取全部 hash 值，对其进行 unescape 解码，
                然后返回一个等价的 Object 对象。
                当指定参数 key 为一个空字符串，则获取全部 hash (不解码)，返回一个 string 类型值。
            * @example
                Hash.get('http://test.com?query#a%3D1%26b%3D2', 'a');  //返回 '1'
                Hash.get('http://test.com?query#a%3D1%26b%3D2', 'c');  //返回 undefined
                Hash.get('http://test.com?query#a%3D1%26A%3D2', 'A');  //返回 2
                Hash.get('http://test.com?query#a%3D1%26b%3D2', 'A', true);//返回 1
                Hash.get('http://test.com?query#a%3D1%26b%3D2', '');   //返回 'a%3D1%26b%3D2'
                Hash.get('http://test.com?query#a%3D1%26b%3D2');       //返回 {a: '1', b: '2'}
                Hash.get('http://test.com?query#a%3D%26b%3D');         //返回 {a: '', b: ''}
                Hash.get('http://test.com??query#a%26b');              //返回 {a: '', b: ''}
                Hash.get('http://test.com?query#a', 'a');              //返回 ''
            */
            get: function get(url, key, ignoreCase) {

                //重载 get(location, key, ignoreCase)
                //重载 get(window, key, ignoreCase)
                if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) == 'object') {
                    url = 'href' in url ? url.href : //location
                    url.location.href; //window
                }

                var beginIndex = url.indexOf('#');
                if (beginIndex < 0) {
                    //不存在查询字符串
                    return;
                }

                var endIndex = url.length;

                var hash = url.slice(beginIndex + 1, endIndex);
                hash = unescape(hash); //解码

                if (key === '') {
                    //获取全部 hash 的 string 类型
                    return hash;
                }

                var Query = require('Query');
                var obj = Query.parse(hash);

                if (key === undefined) {
                    //未指定键，获取整个 Object 对象
                    return obj;
                }

                if (!ignoreCase || key in obj) {
                    //区分大小写或有完全匹配的键
                    return obj[key];
                }

                //以下是不区分大小写
                key = key.toString().toLowerCase();

                for (var name in obj) {
                    if (name.toLowerCase() == key) {
                        return obj[name];
                    }
                }
            },

            /**
            * 把指定的 hash 设置到指定的 url 上。
            * 该方法会对 hash 进行 escape 编码，再设置到 url 上，以避免 hash 破坏原有的 url。
            * 同时原有的 hash 会移除掉而替换成新的。
            * @param {string} url 要设置的 url 字符串。
            * @param {string|number|boolean|Object} key 要设置的 hash 的键。
                当传入一个 Object 对象时，会对键值对进行递归编码成查询字符串， 然后用 escape 编码来设置 hash 。
                当传入的是一个 string|number|boolean 类型，并且不传入第三个参数， 则直接用 escape 编码来设置 hash 。
            * @param {string} [value] 要添加的 hash 的值。
            * @retun {string} 返回组装后的新的 url 字符串。
            * @example
                //返回 'http://test.com?#a%3D1'
                Hash.set('http://test.com', 'a', 1);  
                
                //返回 'http://test.com?query#a%3D3%26d%3D4'
                Hash.set('http://test.com?query#a%3D1%26b%3D2', {a: 3, d: 4});  
                      //返回 'http://test.com?query#a%3D3%26d%3D4'
                Hash.set('http://test.com?query#a%3D1%26b%3D2', 'a=3&b=4'); 
                
            */
            set: function set(url, key, value) {

                var location = null;

                if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) == 'object') {
                    if ('href' in url) {
                        location = url; //location
                    } else {
                        location = url.location; //window
                    }
                    url = location.href;
                }

                var type = typeof key === 'undefined' ? 'undefined' : _typeof(key);
                var isValueType = /^(string|number|boolean)$/.test(type);

                var hash = '';

                if (arguments.length == 2 && isValueType) {
                    hash = String(key);
                } else {
                    var Query = require('Query');
                    var obj = type == 'object' ? key : $Object.make(key, value);
                    hash = Query.stringify(obj);
                }

                hash = escape(hash); //要进行编码，避免破坏原有的 url

                var index = url.lastIndexOf('#');
                if (index > -1) {
                    url = url.slice(0, index);
                }

                url = url + '#' + hash;

                if (location) {
                    location.hash = hash; //不要设置整个 location.href，否则会刷新
                }

                return url;
            },

            /**
            * 判断指定的 url 是否包含特定名称的 hash。
            * @param {string} url 要检查的 url。
            * @param {string} [key] 要提取的查询字符串的键。
            * @param {boolean} [ignoreCase=false] 是否忽略参数 key 的大小写，默认区分大小写。
                如果要忽略 key 的大小写，请指定为 true；否则不指定或指定为 false。
                当指定为 true 时，将优先检索完全匹配的键所对应的项；若没找到然后再忽略大小写去检索。
            * @retun {boolean} 如果 url 中包含该名称的查询字符串，则返回 true；否则返回 false。
            * @example
                Hash.has('http://test.com?a=1&b=2#hash', 'a');  //返回 true
                Hash.has('http://test.com?a=1&b=2#hash', 'b');  //返回 true
                Hash.has('http://test.com?a=1&b=2#hash', 'c');  //返回 false
                Hash.has('http://test.com?a=1&b=2#hash', 'A', true); //返回 true
                Hash.has('http://test.com?a=1&b=2#hash');       //返回 true
            */
            has: function has(url, key, ignoreCase) {

                //重载 has(location, key, ignoreCase)
                //重载 has(window, key, ignoreCase)
                if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) == 'object') {
                    url = 'href' in url ? url.href : //location
                    url.location.href; //window
                }

                var obj = exports.get(url); //获取全部 hash 字符串的 Object 形式

                if (!obj) {
                    return false;
                }

                if (!key) {
                    //不指定名称，
                    return !$Object.isEmpty(obj); //只要有数据，就为 true
                }

                if (key in obj) {
                    //找到完全匹配的
                    return true;
                }

                if (ignoreCase) {
                    //明确指定了忽略大小写

                    key = key.toString().toLowerCase();

                    for (var name in obj) {
                        if (name.toLowerCase() == key) {
                            return true;
                        }
                    }
                }

                //区分大小写，但没找到
                return false;
            },

            /**
            * 监听指定窗口 url 的 hash 变化，并触发一个回调函数。
            * 已重载　onchange(window, fn);
            * 已重载　onchange(window, immediate, fn);
            * @param {Window} window 要监听的 window 窗口。
            * @param {boolean} [immediate=false] 指示初始时是否要立即执行回调函数。
                初始时如果要立即执行回调函数，请指定该参数为 true；
                否则不指定或指定为 false。
            * @param {function} fn 当监听窗口的 hash 发生变化时，要触发的回调函数。
            *   该回调函数会接收到两个参数：hash 和 old，当前的 hash 值和旧的 hash 值。
            *   注意，hash 和 old 都去掉了 '#' 号而直接保留 hash 值。
            *   如果 old 不存在，则为 null。
            *   该回调函数内部的 this 指向监听的窗口。
            * @example
                Hash.onchange(top, function (hash, old) {
                    console.log('new hash: ' + hash);
                    console.log('old hash: ' + old);
                    console.log(this === top); //true
                });
            */
            onchange: function onchange(window, immediate, fn) {
                //重载 onchange(window, fn);
                if (typeof immediate == 'function') {
                    fn = immediate;
                    immediate = false;
                }

                var hash = exports.get(window, '');

                //指定了要立即触发，则立即触发。
                if (immediate) {
                    fn.call(window, hash, null, immediate);
                }

                $(window).on('hashchange', function () {
                    var old = hash;

                    hash = exports.get(window, '');
                    fn && fn(hash, old, false);
                });
            }

        };
    });

    /**
    * Query 工具类
    * @namespace
    * @name Query
    */
    define('Query', function (require, module, exports) {

        var $Object = require('Object');

        return exports = /**@lends Query */{

            /**
            * 把 url 中的查询字符串解析为等价结构的 Object 对象。
            * @param {string} url 要进行解析的查询字符串。
            * @param {boolean} [isShallow=false] 指示是否使用浅层次进行解析。
                当显式指定 isShallow 参数为 true 时，则使用浅层次来解析(只解析一层，不进行递归解析)；
                否则(默认)使用深层次解析。
            * @param {boolean} [isCompatible=false] 指示是否使用兼容模式进行解码。
                当指定 isCompatible 参数为 true 时，将使用 unescape 来编码；
                否则(默认)使用 decodeURIComponent。
            * @return {Object} 返回一个包含键值对的 Object 对象。
                当参数 url 非法时，返回空对象 {}。
            * @example
                var url = 'a=1&b=2&c=A%3D100%26B%3D200';
                var obj = Query.parse(url);
            得到 obj = {a: 1, b:2, c: {A: 100, B: 200}};
            */
            parse: function parse(url, isShallow, isCompatible) {

                if (!url || typeof url != 'string') {
                    return {}; //这里不要返回 null，免得外部调用出错
                }

                var $String = require('String');

                var decode = isCompatible ? unescape : decodeURIComponent; //解码方法，默认用后者
                var isDeep = !isShallow; //深层次解析，为了语义上更好理解，换个名称
                var toValue = $String.toValue; //缓存一下方法，以提高循环中的性能


                var obj = {};

                url.split('&').map(function (item) {
                    var pair = item.split('=');
                    var name = decode(pair[0]);
                    var value = pair[1];

                    if (pair.length > 1) {
                        value = decode(value);

                        //深层次解析
                        if (isDeep && value.indexOf('=') > 0) {
                            //还出现=号，说明还需要进一层次解码
                            value = exports.parse(value); //递归调用
                        } else {
                            //处理一下字符串类型的 0|1|true|false|null|undefined|NaN
                            value = toValue(value); //还原常用的数据类型
                        }
                    }

                    var existed = name in obj;

                    if (!existed) {
                        obj[name] = value;
                        return;
                    }

                    //支持重复名称，如果有则放到一个数组里。
                    var old = obj[name];

                    if (old instanceof Array) {
                        old.push(value);
                    } else {
                        obj[name] = [old, value];
                    }
                });

                return obj;
            },

            /**
            * 把一个对象编码成等价结构的 url 查询字符串。
            * @param {Object} obj 要进行编码的对象
            * @param {boolean} [isCompatible=false] 
                指定是否要使用兼容模式进行编码。
                当需要使用 escape 进行编码时，请指定 true；
                否则要使用 encodeURIComponent 进行编码，请指定 false 或不指定。
            * @return {string} 返回一个经过编码的 url 查询字符串
            * @example
                var obj = {
                    a: 1,
                    b: 2,
                    c: { A: 100, B: 200 },
                    d: null,
                    e: undefined,
                    f: ['a', 'b', 'c']
                };
                var s = Query.stringify(obj);
                console.log(s); 
                //结果 a=1&b=2&c=A%3D100%26B%3D200&d=null&e=undefined&f=%5Ba%2C%20b%5D
            */
            stringify: function stringify(obj, isCompatible) {

                if (obj == null) {
                    // null 或 undefined
                    return String(obj);
                }

                switch (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) {
                    case 'string':
                    case 'number':
                    case 'boolean':
                        return obj;
                }

                if (obj instanceof String || obj instanceof Number || obj instanceof Boolean || obj instanceof Date) {
                    return obj.valueOf();
                }

                if (Array.isArray(obj)) {
                    return '[' + obj.join(', ') + ']';
                }

                var encode = isCompatible ? escape : encodeURIComponent;
                var pairs = [];

                $Object.each(obj, function (key, value) {
                    key = encode(key);

                    if (value === undefined) {
                        pairs.push(key);
                        return;
                    }

                    value = exports.stringify(value);
                    value = encode(value);

                    pairs.push(key + '=' + value);
                });

                return pairs.join('&');
            },

            /**
            * 获取指定 url 的查询字符串中指定的键所对应的值。
            * 已重载 get(url, key, ignoreCase);
            * 已重载 get(location, key, ignoreCase);
            * 已重载 get(window, key, ignoreCase);
            * @param {string} url 要进行获取的 url 字符串。
            * @param {string} [key] 要检索的键。
            * @param {boolean} [ignoreCase=false] 是否忽略参数 key 的大小写。 默认区分大小写。
                如果要忽略 key 的大小写，请指定为 true；否则不指定或指定为 false。
                当指定为 true 时，将优先检索完全匹配的键所对应的项；若没找到然后再忽略大小写去检索。
            * @retun {string|Object|undefined} 返回一个查询字符串值。
                当不指定参数 key 时，则获取全部查询字符串，返回一个等价的 Object 对象。
                当指定参数 key 为一个空字符串，则获取全部查询字符串，返回一个 string 类型值。
            * @example
                Query.get('http://test.com?a=1&b=2#hash', 'a');  //返回 '1'
                Query.get('http://test.com?a=1&b=2#hash', 'c');  //返回 undefined
                Query.get('http://test.com?a=1&A=2#hash', 'A');  //返回 2
                Query.get('http://test.com?a=1&b=2#hash', 'A', true);//返回 1
                Query.get('http://test.com?a=1&b=2#hash', '');   //返回 'a=1&b=2'
                Query.get('http://test.com?a=1&b=2#hash');       //返回 {a: '1', b: '2'}
                Query.get('http://test.com?a=&b=');              //返回 {a: '', b: ''}
                Query.get('http://test.com?a&b');                //返回 {a: '', b: ''}
                Query.get('http://test.com?a', 'a');             //返回 ''
            */
            get: function get(url, key, ignoreCase) {

                //重载 get(location, key, ignoreCase)
                //重载 get(window, key, ignoreCase)
                if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) == 'object') {
                    url = 'href' in url ? url.href : //location
                    url.location.href; //window
                }

                var beginIndex = url.indexOf('?');
                if (beginIndex < 0) {
                    //不存在查询字符串
                    return;
                }

                var endIndex = url.indexOf('#');
                if (endIndex < 0) {
                    endIndex = url.length;
                }

                var qs = url.slice(beginIndex + 1, endIndex);
                if (key === '') {
                    //获取全部查询字符串的 string 类型
                    return decodeURIComponent(qs);
                }

                var obj = exports.parse(qs);

                if (key === undefined) {
                    //未指定键，获取整个 Object 对象
                    return obj;
                }

                if (!ignoreCase || key in obj) {
                    //区分大小写或有完全匹配的键
                    return obj[key];
                }

                //以下是不区分大小写
                key = key.toString().toLowerCase();

                for (var name in obj) {
                    if (name.toLowerCase() == key) {
                        return obj[name];
                    }
                }
            },

            /**
            * 给指定的 url 添加一个查询字符串。
            * 注意，该方法会保留之前的查询字符串，并且覆盖同名的查询字符串。
            * @param {string} url 组装前的 url。
            * @param {string|Object} key 要添加的查询字符串的键。
                当传入一个 Object 对象时，会对键值对进行递归组合编码成查询字符串。
            * @param {string} [value] 要添加的查询字符串的值。
            * @retun {string} 返回组装后的新的 url。
            * @example
                //返回 'http://test.com?a=1&b=2&c=3#hash'
                Query.add('http://test.com?a=1&b=2#hash', 'c', 3);  
                
                //返回 'http://test.com?a=3&b=2&d=4#hash'
                Query.add('http://test.com?a=1&b=2#hash', {a: 3, d: 4});  
            */
            add: function add(url, key, value) {

                var qs = exports.get(url) || {}; //先取出原来的

                if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object') {
                    Object.assign(qs, key);
                } else {
                    qs[key] = value;
                }

                //过滤掉值为 null 的项
                var obj = {};

                for (var key in qs) {
                    var value = qs[key];

                    if (value === null) {
                        continue;
                    } else {
                        obj[key] = value;
                    }
                }

                return exports.set(url, obj);
            },

            /**
            * 给指定的 url 添加一个随机查询字符串。
            * 注意，该方法会保留之前的查询字符串，并且添加一个键名为随机字符串而值为空字符串的查询字符串。
            * @param {string} url 组装前的 url。
            * @param {number} [len] 随机键的长度。
            * @retun {string} 返回组装后的新的 url。
            * @example
                //返回值类似 'http://test.com?a=1&b=2&7A8CEBAFC6B4=#hash'
                Query.random('http://test.com?a=1&b=2#hash');  
                
                //返回值类似 'http://test.com?a=1&b=2&7A8CE=#hash' 
                Query.random('http://test.com?a=1&b=2#hash', 5); //随机键的长度为 5
                  */
            random: function random(url, len) {
                var $String = require('String');
                var key = $String.random(len);
                return exports.add(url, key, undefined);
            },

            /**
            * 把指定的 url 和查询字符串组装成一个新的 url。
            * 注意，该方法会删除之前的查询字符串。
            * @param {string} url 组装前的 url。
            * @param {string|Object} key 要设置的查询字符串的键。
                当传入一个 Object 对象时，会对键值对进行递归组合编码成查询字符串。
            * @param {string} [value] 要添加的查询字符串的值。
            * @retun {string} 返回组装后的新的 url。
            * @example
                //返回 'http://test.com?c=3#hash'
                Query.set('http://test.com?a=1&b=2#hash', 'c', 3);  
                
                //返回 'http://test.com?a=3&d=4#hash'
                Query.set('http://test.com?a=1&b=2#hash', {a: 3, d: 4});  
            */
            set: function set(url, key, value) {

                var location = null;

                if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) == 'object') {
                    if ('href' in url) {
                        location = url; //location
                    } else {
                        location = url.location; //window
                    }
                    url = location.href;
                }

                var type = typeof key === 'undefined' ? 'undefined' : _typeof(key);
                var isValueType = /^(string|number|boolean)$/.test(type);

                var qs = '';

                //set(url, qs);
                if (arguments.length == 2 && isValueType) {
                    qs = encodeURIComponent(key);
                } else {
                    var obj = type == 'object' ? key : $Object.make(key, value);
                    qs = exports.stringify(obj);
                }

                var hasQuery = url.indexOf('?') > -1;
                var hasHash = url.indexOf('#') > -1;
                var a;

                if (hasQuery && hasHash) {
                    a = url.split(/\?|#/g);
                    return a[0] + '?' + qs + '#' + a[2];
                }

                if (hasQuery) {
                    a = url.split('?');
                    return a[0] + '?' + qs;
                }

                if (hasHash) {
                    a = url.split('#');
                    return a[0] + '?' + qs + '#' + a[1];
                }

                url = url + '?' + qs;

                //设置整个 location.href 会刷新
                if (location) {
                    location.href = url;
                }

                return url;
            },

            /**
            * 判断指定的 url 是否包含特定名称的查询字符串。
            * @param {string} url 要检查的 url。
            * @param {string} [key] 要提取的查询字符串的键。
            * @param {boolean} [ignoreCase=false] 是否忽略参数 key 的大小写，默认区分大小写。
                如果要忽略 key 的大小写，请指定为 true；否则不指定或指定为 false。
                当指定为 true 时，将优先检索完全匹配的键所对应的项；若没找到然后再忽略大小写去检索。
            * @retun {boolean} 如果 url 中包含该名称的查询字符串，则返回 true；否则返回 false。
            * @example
                Query.has('http://test.com?a=1&b=2#hash', 'a');  //返回 true
                Query.has('http://test.com?a=1&b=2#hash', 'b');  //返回 true
                Query.has('http://test.com?a=1&b=2#hash', 'c');  //返回 false
                Query.has('http://test.com?a=1&b=2#hash', 'A', true); //返回 true
                Query.has('http://test.com?a=1&b=2#hash');       //返回 true
            */
            has: function has(url, key, ignoreCase) {

                //重载 has(location, key, ignoreCase)
                //重载 has(window, key, ignoreCase)
                if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) == 'object') {
                    url = 'href' in url ? url.href : //location
                    url.location.href; //window
                }

                var obj = exports.get(url); //获取全部查询字符串的 Object 形式

                if (!obj) {
                    return false;
                }

                if (!key) {
                    //不指定名称，
                    return !$Object.isEmpty(obj); //只要有数据，就为 true
                }

                if (key in obj) {
                    //找到完全匹配的
                    return true;
                }

                if (ignoreCase) {
                    //明确指定了忽略大小写

                    key = key.toString().toLowerCase();
                    for (var name in obj) {
                        if (name.toLowerCase() == key) {
                            return true;
                        }
                    }
                }

                //区分大小写，但没找到
                return false;
            },

            /**
            * 对查询字符串中的值部分进行转换过滤。
            * 如 `http://www.test.com/?a=XXX`，其中 `XXX` 就是要过滤的部分。
            * @return {String}
            */
            escape: function (_escape) {
                function escape(_x) {
                    return _escape.apply(this, arguments);
                }

                escape.toString = function () {
                    return _escape.toString();
                };

                return escape;
            }(function (string) {
                var s = String(string);
                return escape(s).replace(/\+/g, "%2B");
            })

        };
    });

    /**
    * JSON 工具类。
    * @class
    * @name JSON
    */
    define('JSON', function (require, module, exports) {

        var JSON = window.JSON;

        return (/**@lends JSON*/{

                /**
                * 把一个 JSON 字符串数据解析成对象。
                */
                parse: function parse(content) {

                    try {
                        var obj = JSON.parse(content);
                        return obj;
                    } catch (ex) {
                        console.warn('使用原生的 JSON.parse() 方法无法解析:', content);
                    }

                    try {
                        //这种方法是 jQuery 的实现，有问题。
                        //content = content.replace(/^(\r\n)+/g, ' ');
                        //return (new Function('return ' + content))();

                        //下面这方法安全、可靠些。
                        //包装多一层匿名立即执行函数。
                        var js = ['return (function () { ', '   var obj = ' + content + ';', //因为 return 的换行问题，这里用一个 obj 变量再返回 obj 会安全很多。
                        '   return obj;', '})();'].join('\r\n');

                        var fn = new Function(js);
                        var obj = fn();

                        return obj;
                    } catch (ex) {
                        console.warn('使用 new Function() 方法无法解析:', content);
                    }

                    return null;
                },

                /**
                * 把一个对象解析成 JSON 字符串。
                */
                stringify: function stringify() {
                    return JSON.stringify.apply(JSON, arguments);
                }
            }
        );
    });

    /**
    * Script 脚本工具
    * @namespace
    * @name Script
    */
    define('Script', function (require, module, exports) {

        var $String = require('String');
        var $Object = require('Object');

        var defaults = {
            url: '',
            id: '',
            charset: 'utf-8',
            document: window.document,
            onload: null
        };

        /**
        * 加载单个
        * @inner
        */
        function loadItem(url, charset, document, onload) {

            var id;

            if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) == 'object') {
                //传入的是一个 {} 
                var config = url;

                id = config.id;
                url = config.url;
                charset = config.charset;
                document = config.document;
                onload = config.onload;
            }

            var script = document.createElement('script');

            if (onload) {
                //指定了回调函数，则设置它
                if (script.readyState) {
                    //IE
                    /**@ignore*/
                    script.onreadystatechange = function () {

                        var readyState = script.readyState;

                        if (readyState == 'loaded' || readyState == 'complete') {
                            script.onreadystatechange = null; //避免重复执行回调
                            onload();
                        }
                    };
                } else {
                    //标准
                    script.onload = onload;
                }
            }

            script.src = url;

            if (charset) {
                script.charset = charset;
            }

            if (id) {
                script.id = id;
            }

            document.head.appendChild(script);
        }

        /**
        * 顺序加载批量
        * @inner
        */
        function loadList(urls, charset, document, fn) {

            if (urls.length == 0) {
                fn && fn();
                return;
            }

            var index = 0;

            (function () {

                var next = arguments.callee;
                var url = urls[index];

                loadItem(url, charset, document, function () {
                    index++;

                    if (index < urls.length) {
                        next();
                    } else {
                        fn && fn();
                    }
                });
            })();
        }

        return exports = /**@lends Script*/{

            /**
            * 跨浏览器动态加载 JS 文件，并在加载完成后执行指定的回调函数。
            * @param {string|Array} params.url 
                要加载的 JS 文件的 url 地址，如果要批量加载，则为一个地址数组。
            * @param {string} [params.charset="utf-8"] 
                要加载的 JS 文件的字符编码，默认为 utf-8。
            * @param {Document} [params.document=window.document] 
                要加载的 JS 文件的上下文环境的 document，默认为当前窗口的 document 对象。
            * @param {function} [params.onload] 
                加载成功后的回调函数。
            * @example
                Script.load({
                    url: 'a.js',
                    charset: 'utf-8',
                    document: document,
                    id: 'myScript',
                    onload: function (){ }
                });
                  Script.load('a.js', 'utf-8', document, function(){});
                Script.load('a.js', 'utf-8', function(){});
                Script.load('a.js', document, function(){});
                Script.load('a.js', function(){});
                  //批量加载
                Script.load(['a.js', 'b.js'], function(){});
            */
            load: function load(params) {

                var obj = Object.assign({}, defaults); //复制一份

                //注意，params 有可能是个数组，不能用 typeof 为 'object'
                if ($Object.isPlain(params)) {
                    //纯对象 {}
                    Object.assign(obj, params);
                } else {
                    obj.url = params;

                    switch (_typeof(arguments[1])) {
                        case 'string':
                            obj.charset = arguments[1];
                            break;
                        case 'object':
                            obj.document = arguments[1];
                            break;
                        case 'function':
                            obj.onload = arguments[1];
                            break;
                    }

                    switch (_typeof(arguments[2])) {
                        case 'object':
                            obj.document = arguments[2];
                            break;
                        case 'function':
                            obj.onload = arguments[2];
                            break;
                    }

                    if (arguments[3]) {
                        obj.onload = arguments[3];
                    }
                }

                var url = obj.url;

                if (typeof url == 'string') {
                    loadItem(obj);
                } else if (url instanceof Array) {
                    loadList(url, obj.charset, obj.document, obj.onload);
                } else {
                    throw new Error('参数 params.url 必须为 string 或 string 的数组');
                }
            }

        };
    });

    /**
    * StyleSheet 样式类工具
    * @namespace
    * @name StyleSheet
    */
    define('StyleSheet', function (require, module, exports) {

        var iframe;
        var iframeDoc;

        var defaults = {
            url: '',
            id: '',
            charset: 'utf-8',
            document: window.document,
            onload: null
        };

        /**
        * 加载单个文件。 
        * @inner
        */
        function loadItem(url, charset, document, onload) {

            var id;

            if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) == 'object') {
                //传入的是一个 {} 
                var config = url;

                id = config.id;
                url = config.url;
                charset = config.charset;
                document = config.document;
                onload = config.onload;
            }

            var link = document.createElement('link');

            if (onload) {
                //指定了回调函数，则设置它

                if (link.readyState) {
                    //IE

                    link.onreadystatechange = function () {

                        var readyState = link.readyState;

                        if (readyState == 'loaded' || readyState == 'complete') {
                            link.onreadystatechange = null; //避免重复执行回调
                            onload();
                        }
                    };
                } else {
                    //标准
                    link.onload = onload;
                }
            }

            link.href = url;
            link.rel = 'stylesheet';

            if (charset) {
                link.charset = charset;
            }

            if (id) {
                link.id = id;
            }

            document.head.appendChild(link);
        }

        /**
        * 顺序加载批量
        * @inner
        */
        function loadList(urls, charset, document, fn) {

            if (urls.length == 0) {
                fn && fn();
                return;
            }

            var index = 0;

            (function () {
                var next = arguments.callee;
                var url = urls[index];

                loadItem(url, charset, document, function () {

                    index++;

                    if (index < urls.length) {
                        next();
                    } else {
                        fn && fn();
                    }
                });
            })();
        }

        return (/**@lends Style */{

                /**
                * 跨浏览器动态加载 JS 文件，并在加载完成后执行指定的回调函数。
                * @memberOf MiniQuery.Script
                * @param {string|Array} params.url 
                    要加载的 JS 文件的 url 地址，如果要批量加载，则为一个地址数组。
                * @param {string} [params.charset="utf-8"] 
                    要加载的 JS 文件的字符编码，默认为 utf-8。
                * @param {Document} [params.document=window.document] 
                    要加载的 JS 文件的上下文环境的 document，默认为当前窗口的 document 对象。
                * @param {function} [params.onload] 
                    加载成功后的回调函数。
                * @example
                    Style.load({
                        url: 'a.css',
                        charset: 'utf-8',
                        document: document,
                        id: 'myScript',
                        onload: function (){ }
                    });
                     Style.load('a.css', 'utf-8', document, function(){});
                    Style.load('a.css', 'utf-8', function(){});
                    Style.load('a.css', document, function(){});
                    Style.load('a.css', function(){});
                     //批量加载
                    Style.load(['a.css', 'b.css'], function(){});
                */
                load: function load(params) {

                    var $Object = require('Object');

                    var obj = Object.assign({}, defaults); //复制一份

                    //注意，params 有可能是个数组，不能用 typeof 为 'object'
                    if ($Object.isPlain(params)) {
                        //纯对象 {}
                        Object.assign(obj, params);
                    } else {

                        obj.url = params;

                        switch (_typeof(arguments[1])) {
                            case 'string':
                                obj.charset = arguments[1];
                                break;
                            case 'object':
                                obj.document = arguments[1];
                                break;
                            case 'function':
                                obj.onload = arguments[1];
                                break;
                        }

                        switch (_typeof(arguments[2])) {
                            case 'object':
                                obj.document = arguments[2];
                                break;
                            case 'function':
                                obj.onload = arguments[2];
                                break;
                        }

                        if (arguments[3]) {
                            obj.onload = arguments[3];
                        }
                    }

                    var url = obj.url;

                    if (typeof url == 'string') {
                        loadItem(obj);
                    } else if (url instanceof Array) {
                        loadList(url, obj.charset, obj.document, obj.onload);
                    } else {
                        throw new Error('参数 params.url 必须为 string 或 string 的数组');
                    }
                }

            }
        );
    });

    /**
    * 多任务处理工具类。
    * @namesapce
    * @name Tasks
    */
    define('Tasks', function (require, module, exports) {
        var Emitter = require('Emitter');
        var mapper = new Map();

        var sid$todos = {};

        /**
        * 构造器。
        */
        function Tasks(list) {
            var meta = {
                'emitter': new Emitter(this),
                'list': list || []
            };

            mapper.set(this, meta);
        }

        //实例成员。
        Tasks.prototype = {
            constructor: Tasks,

            /**
            * 并行处理。
            * @param {Array} [list] 要处理的任务列表。 如果不指定，则使用构造器中的。
            */
            parallel: function parallel(list) {
                var meta = mapper.get(this);
                list = list || meta.list;

                //空的任务列表。
                if (!list.length) {
                    meta.emitter.fire('all', [[]]); //里面要套个空数组。
                    return;
                }

                //非空的任务列表。
                var total = list.length; //总项数。
                var count = total; //待处理的项数。
                var values = new Array(total); //收集每项异步操作的返回值。
                var dones = new Array(total); //[true, undefined, true, ..., ] 记录对应的项是否已完成。

                list.forEach(function (item, index) {
                    //done(index) 是异步调用，要多一层闭包。
                    (function (index) {
                        //第三个参数是一个回调函数，即 done(value); 
                        //由业务层调用，以通知异步操作完成。
                        //done(value); 接受一个参数作为此项异步操作的返回值进行收集，
                        //最后会在全部完成后一起传过去给业务层。
                        meta.emitter.fire('each', [item, index, function (value) {
                            values[index] = value; //需要收集的值，由调用者传入。
                            dones[index] = true;
                            count--;

                            //计数为 0 时，不一定就全部完成了，
                            //因为调用者可能会恶意多次调用 done() 以使计数减少到 0。
                            //但有一点可以肯定的：只要计数不为 0，说明至少有一项未完成。
                            if (count > 0) {
                                //性能优化
                                return;
                            }

                            //安全起见，检查每项的完成状态。
                            for (var i = 0; i < total; i++) {
                                if (!dones[i]) {
                                    return;
                                }
                            }

                            //至此，全部项都已完成。
                            meta.emitter.fire('all', [values]);
                        }]);
                    })(index);
                });
            },

            /**
            * 串行处理。
            * @param {Array} [list] 要处理的任务列表。 如果不指定，则使用构造器中的。
            */
            serial: function serial(list) {
                var meta = mapper.get(this);
                list = list || meta.list;

                //空的任务列表。
                if (!list.length) {
                    meta.emitter.fire('all', []);
                    return;
                }

                //非空的任务列表。
                var total = list.length; //总项数。
                var values = new Array(total); //收集每项异步操作的返回值。


                function process(index) {
                    var item = list[index];

                    //第三个参数是一个回调函数，即 done(value); 
                    //由业务层调用，以通知异步操作完成。
                    //done(value); 接受一个参数作为此项异步操作的返回值进行收集，
                    //最后会在全部完成后一起传过去给业务层。
                    meta.emitter.fire('each', [item, index, function (value) {
                        values[index] = value; //需要收集的值，由调用者传入。
                        index++;

                        if (index < total) {
                            process(index);
                        } else {
                            meta.emitter.fire('all', [values]);
                        }
                    }]);
                }

                process(0);
            },

            /**
            * 绑定事件。
            */
            on: function on() {
                var _meta$emitter;

                var meta = mapper.get(this);
                (_meta$emitter = meta.emitter).on.apply(_meta$emitter, arguments);
            }

        };

        //静态成员。
        Object.assign(Tasks, {
            /**
            * 并行执行任务列表。
            *   list: [],   //任务列表。
            *   options: {
            *       //处理每一项时的回调函数。 
            *       //在异步处理完成当前项时，须手动调用参数中的 done(value) 函数以通知处理器进行处理。
            *       each: function (item, index, done) { }, 
            *       
            *       //全部项完成时的回调函数。
            *       //会接收到每一项异步完成时的回调函数传过来的值组成的数组。
            *       all: function (values) { },
            *   },
            */
            parallel: function parallel(list, options) {
                if (!options) {
                    return;
                }

                var tasks = new Tasks(list);

                tasks.on(options);
                tasks.parallel();
            },

            /**
            * 串行执行任务列表。
            *   list: [],   //任务列表。
            *   options: {
            *       //处理每一项时的回调函数。 
            *       //在异步处理完成当前项时，须手动调用参数中的 done(value) 函数以通知处理器进行处理。
            *       each: function (item, index, done) { }, 
            *       
            *       //全部项完成时的回调函数。
            *       //会接收到每一项异步完成时的回调函数传过来的值组成的数组。
            *       all: function (values) { },
            *   },
            */
            serial: function serial(list, options) {
                if (!options) {
                    return;
                }

                var tasks = new Tasks(list);

                tasks.on(options);
                tasks.serial();
            },

            /**
            * 支持多个并发异步加载操作，实际只会加载一次。
            * 如果在加载过程中，再发起加载请求，则会放入待办列表中，加载完成后再依次执行。
            *   sid: '',    //异步加载的名称，以此作为区分。 同一个名称的拥有同一个待办队列。
            *   todo: {},   //要添加的待办项，可以是任意值。
            *   load: fn,   //实际要发起的异步加载操作函数。 异步加载函数体内必须显式调用传过去的函数，以调用异步加载完成。
            */
            todo: function todo(sid, _todo, load) {
                var todos = sid$todos[sid];

                if (todos) {
                    todos.push(_todo);
                    return;
                }

                todos = sid$todos[sid] = [_todo];

                load(function (each) {
                    sid$todos[sid] = null;

                    if (typeof each == 'function') {
                        todos.forEach(function (todo, index) {
                            each(todo, index);
                        });
                    }

                    return todos;
                });
            }

        });

        return Tasks;

        //var tasks = new Tasks([]);

        //tasks.on('each', function (item, index, done) {

        //});

        //tasks.on('all', function (values) {

        //});


        //tasks.parallel();

    });

    /**
    * KISP 框架命名空间
    * @namespace
    * @name KISP
    */
    define('KISP', function (_require, module, exports) {

        return (/**@lends KISP*/{

                /**
                * 名称。 
                * (由 packer 自动插入)
                */
                name: 'pc',

                /**
                * 版本号。 (由 packer 自动插入)
                */
                version: '8.1.0',

                /**
                * 类型号。 (由 packer 自动插入)
                * 值为 'debug' 或 'min'。
                */
                edition: /**{KISP.edition*/undefined /**KISP.edition}*/

                , /**
                  * concat 版本的内容对应的 md5 值。 (由 packer 自动插入)
                  * 内容不包括本字段动态生成的值部分。
                  * 与生成的头部注释中的 md5 值是一致的。
                  */
                md5: '80DB7BDB5E3C41C01BFD69E04CA965B2',

                /**
                * babel 版本号。 (由 packer 自动插入)
                * 如果为空，则说明没有进行过 babel 转换。
                */
                babel: '6.26.3',

                /**
                * KISP 对外公开可用的公共模块列表。 (由 packer 自动插入)
                */
                modules: ['Array', 'Date', 'String', 'Emitter', 'Object', 'Tree', 'Escape', 'Fn', 'Math', 'Hash', 'Query', 'JSON', 'Script', 'StyleSheet', 'Tasks', 'KISP', 'Defaults', 'Config', 'Data', 'Router', 'Proxy', 'Proxy.defaults', 'Url', 'Url.defaults', 'App', 'App.defaults', 'App.config', 'OuterModule', 'OuterModule.defaults', '$', 'Navigator', 'Navigator.defaults', 'SessionStorage', 'SessionStorage.defaults', 'Storage', 'CircularJSON', 'LocalStorage', 'LocalStorage.defaults', 'Package', 'Package.defaults', 'Loading', 'Loading.defaults', 'Style', 'RandomId', 'Mask', 'Mask.defaults', 'Mask.config', 'Session', 'Session.defaults', 'View', 'View.defaults', 'View.config', 'Panel', 'Panel.defaults', 'Template', 'HTMLParser', 'Alert', 'Alert.defaults', 'Alert.config', 'Dialog', 'Dialog.defaults', 'Dialog.config', 'Mapper', 'Confirm', 'Confirm.defaults', 'API', 'API.defaults', 'SSH.API', 'SSH.API.defaults', 'SSH', 'SSH.defaults', 'MD5', 'Tabs', 'Tabs.defaults', 'Tabs.config', 'Toast', 'Toast.defaults'],

                /**
                * 加载 KISP 框架内公开的模块。
                * @param {string} id 模块的名称(id)。
                * @return {Object} 返回模块的导出对象。
                * @example
                *   var API = KISP.require('API');    
                */
                require: function require(id) {
                    return _require(id); //暂时全部可加载。
                    //return InnerModules.expose(id) ? require(id) : null;
                },

                /**
                * 加载 KISP 框架内公开的模块，并创建它的一个实例。
                * @param {string} id 模块的名称(id)
                * @param {Object} config 要创建实例时的配置参数。
                * @return {Object} 返回该模块所创建的实例。
                * @example
                *   var api = KISP.create('API', {});  
                *   //相当于
                *   var API = KISP.require('API');
                *   var api = new API({});
                */
                create: function create(id) {
                    var M = _require(id);

                    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                        args[_key3 - 1] = arguments[_key3];
                    }

                    return new (Function.prototype.bind.apply(M, [null].concat(args)))();
                },

                /**
                * 获取或设置 KISP 内部模块的默认配置。
                * @function
                * @example
                *   KISP.config({});    
                */
                config: InnerModules.bind('Defaults', 'config'),

                /**
                * 获取或设置业务层的自定义数据。
                * 已重载 data(key); //获取指定键的数据。
                * 已重载 data(key, value); //设置指定键的数据。
                * 已重载 data(obj); //批量设置数据。
                * 
                * @param {string} key 要存储的数据的键。
                * @param value 要存储的数据的值，可以是任何类型。
                *   当不提供此参数时，则为 get 操作；
                *   否则为 set 操作。
                */
                data: InnerModules.bind('Data', 'data'),

                /**
                * 设置顶级私有模块的路由。
                */
                route: InnerModules.bind('Router', 'set'),

                /**
                * 响应一个代理请求。
                * 相当于 Proxy.response() 的别名。
                * @function
                * @example
                *   KISP.proxy({
                        code: 200,
                        msg: 'ok',
                        data: {},
                    });    
                */
                proxy: InnerModules.bind('Proxy', 'response'),

                /**
                * 初始化执行环境，并启动应用程序。
                * 该方法会预先定义一些公共模块，然后定义一个匿名模块并启动它。
                * @param {function} factory 工厂函数，即启动函数。
                */
                launch: InnerModules.bind('App', 'launch'),

                /**
                * 用 KISP 标准的方法定义一个 View 视图实例。
                */
                view: InnerModules.bind('View', 'define'),

                /**
                * 用 KISP 标准的方法定义一个 Panel 面板实例。
                */
                panel: InnerModules.bind('Panel', 'define'),

                /**
                * 加载指定名称的包资源，并在加载完成后执行一个回调。
                * 或者加载总包文件。
                * 已重载 load(done);       //加载总包文件。 此时回调函数接受到的数据结构为总包 json 文件中的结构。
                * 已重载 load(name, done); //加载指定名称的分包资源。
                */
                load: InnerModules.bind('Package', 'load'),

                /**
                * 弹出 alert 虚拟窗口。
                * @param {string|Object} text 要显示的消息文本。
                *   如果指定为一个对象，则先调用 JSON.string(text, null, 4) 得到字符串再进行显示。
                * @param {function} fn 点击 `确定` 按钮后要执行的回调函数。
                */
                alert: InnerModules.bind('Alert', 'show'),

                /**
                * 弹出 confirm 虚拟窗口。
                * @param {string} text 要显示的消息文本。
                * @param {function} fnOK 点击 `确定` 按钮后要执行的回调函数。
                * @param {function} fnCancel 点击 `取消` 按钮后要执行的回调函数。
                */
                confirm: InnerModules.bind('Confirm', 'show')

            }
        );
    });

    /**
    * KISP 内部模块使用的默认配置管理器。
    * KISP 内部模块使用的配置，包括三个层面：
    *   1，通用的、底层的默认配置，以 `*.defaults` 命名的模块，如 `Dialog.defaults`，此类模块定义在 KISP 内部。
    *   2，针对某一环境(如移动端)的默认配置，以 `*.config` 命名的模块，如 `Dialog.config`，此类模块定义在 KISP 内部。
    *   3，业务层指定的配置，以 KISP.config() 方式手动调用的，此类调用定义在业务层，推荐写在 config.js 里。
    *
    * KISP 会把这三个配置深度合并成一个对象作为相应的模块配置，合并顺序为上述的顺序关系。
    * 因此业务层可以根据需要覆盖某个模块的特定配置或字段。
    * 
    * @namespace
    * @name Defaults
    */
    define('Defaults', function (require, module, exports) {
        var $Object = require('Object');
        var Config = require('Config');

        var cfg = new Config(); //存取器。
        var name$init = {}; //记录对应的模块是否已给处理。


        /**
        * 初始化 KISP 内部的原始配置。
        * 原始配置是指 `*.defaults` 和 `*.config` 的模块。
        * 使用之前，会先把 `*.defaults` 和 `*.config` 的模块进行合并。
        * `*.defaults` 是通用的、底层的默认配置。
        * `*.config` 是针对某一环境(如移动端)的默认配置。
        */
        function init(name) {
            if (name$init[name]) {
                return;
            }

            //首次获取，先进行合并。
            var defaults = require(name + '.defaults'); //如 `Dialog.defaults`。
            var config = require(name + '.config'); //如 `Dialog.config`。
            var all = $Object.extendDeeply({}, defaults, config);

            name$init[name] = true;

            cfg.set(name, all);
        }

        return exports = /**@lends Defaults*/{

            /**
            * 设置。
            * 会深度合并传入的目标的子对象与原配置中的对应的子对象。
            * 已重载 set(obj); //批量设置。
            * 已重载 set(name, data); //单个设置。
            */
            set: function set(name, data) {
                var obj = (typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object' ? name : _defineProperty({}, name, data);

                $Object.each(obj, function (name, data) {
                    init(name);

                    cfg.set(name, data);
                });
            },

            /**
            * 获取。
            */
            get: function get(name) {
                init(name);
                return cfg.get(name);
            },

            /**
            * 深度克隆。
            */
            clone: function clone(name) {
                for (var _len4 = arguments.length, targets = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                    targets[_key4 - 1] = arguments[_key4];
                }

                init(name);
                return cfg.clone.apply(cfg, arguments);
            },

            /**
            * 获取或设置 KISP 内部模块的默认配置。
            * 已重载 config(name); //获取指定名称的模块的默认配置。
            * 已重载 config(name, value); //单个设置指定名称的模块的默认配置。
            * 已重载 config(obj); //批量设置模块的默认配置。
            * @function
            * @example
            *   KISP.config({});    
            */
            config: function config(name, value) {
                var _exports;

                //get(name)
                if (arguments.length == 1 && typeof name == 'string') {
                    return exports.get(name);
                }

                //set()
                (_exports = exports).set.apply(_exports, arguments);
            }

        };
    });

    /**
    * 配置工具类。
    * 主要提供数据的存储与获取功能。
    * @class
    * @name Config
    */
    define('Config', function (require, module, exports) {
        var $Object = require('Object');
        var mapper = new Map();

        /**
        * 构造器。
        */
        function Config() {
            var meta = {
                'name$data': {}
            };

            mapper.set(this, meta);
        }

        //实例方法
        Config.prototype = /**@lends Config#*/{
            constructor: Config,

            /**
            * 设置指定模块的默认配置。
            * 会深度合并传入的目标的子对象与原配置中的对应的子对象。
            * 已重载 set({...});       //批量设置。
            * 已重载 set(name, data);  //单个设置。
            *
            * @param {string} name 要设置的模块的名称。
            * @param {Object} data 要设置的默认配置对象。
            */
            set: function set(name, data) {
                var meta = mapper.get(this);
                var name$data = meta.name$data;
                var obj = (typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object' ? name : _defineProperty({}, name, data);

                $Object.each(obj, function (name, data) {

                    //首次设置
                    if (!(name in name$data)) {
                        name$data[name] = data;
                        return;
                    }

                    //第二(+)次设置
                    var old = name$data[name];

                    if ($Object.isPlain(old)) {
                        //纯对象
                        $Object.extendDeeply(old, data); //则深度合并。
                    } else {
                        //其他的，则重设
                        name$data[name] = data;
                    }
                });
            },

            /**
            * 获取指定模块名称的默认配置。
            * @param {string|object} name 要获取的模块的名称。
            * @return {Object} 返回该模块的默认配置对象。
            */
            get: function get(name) {
                var meta = mapper.get(this);

                return meta.name$data[name];
            },

            /**
            * 获取并深度克隆指定模块名称的默认配置。
            * @param {string} name 要获取的模块的名称。
            * @param {Object} [target] 需要合并的对象。
            *   如果需要提供额外的(深度)合并成员，可指定此参数。
            * @return {Object} 返回该模块的默认配置对象的克隆版本。
            */
            clone: function clone(name) {
                var old = this.get(name);

                for (var _len5 = arguments.length, targets = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                    targets[_key5 - 1] = arguments[_key5];
                }

                var all = $Object.extendDeeply.apply($Object, [{}, old].concat(targets));

                return all;
            }

        };

        return Config;
    });

    /**
    * 业务层的自定义数据管理器。
    * 即针对业务层的 KISP.data() 的功能，用于存储和获取自定义数据。
    * @namespace
    * @name Data
    */
    define('Data', function (require, module, exports) {
        var $Object = require('Object');
        var Config = require('Config');

        var cfg = new Config();

        return (/**@lends Data*/{

                /**
                * 获取或设置业务层的自定义数据。
                * 已重载 data(key); //获取指定键的数据。
                * 已重载 data(key, value); //设置指定键的数据。
                * 已重载 data(obj); //批量设置数据。
                * 
                * @param {string} key 要存储的数据的键。
                * @param value 要存储的数据的值，可以是任何类型。
                *   当不提供此参数时，则为 get 操作；
                *   否则为 set 操作。
                */
                data: function data(key, value) {
                    //get(key)
                    if (arguments.length == 1 && typeof key == 'string') {
                        return cfg.get(key);
                    }

                    //set
                    cfg.set.apply(cfg, arguments);
                }
            }
        );
    });

    /**
    * 路由。
    * @namespace
    * @name Router
    */
    define('Router', function (require, module, exports) {
        var $Object = require('Object');
        var name$factory = {};

        //示例解释：
        /*
        KISP.route('User', function (require, module) {
            //以下两种写法是等价的。
            //如果是写法一，则 KISP 内部也会转换成写法二。
            //写法一简单明了，但写法二功能更自由、丰富。
            //一般情况下用写法一，必要时可用写法二。
              //写法一。
            return {
                'login': function () { },
                'logout': function () { },
            };
              //写法二。
            return function (User) {
                User.on({
                    'login': function () { },
                    'logout': function () { },
                });
            };
        });
        */

        return {

            /**
            * 设置路由。
            * @param {string} name 路由的名称。
            * @param {function} factory 路由处理函数。
            *   也可以是一个导出对象。
            */
            set: function set(name, factory) {
                if (name$factory[name]) {
                    throw new Error('\u91CD\u590D\u5B9A\u4E49\u7684\u8DEF\u7531\u5668: ' + name);
                }

                name$factory[name] = factory;
            },

            /**
            * 绑定全部路由。
            */
            bind: function bind($require, $module, $exports) {

                var all = $Object.map(name$factory, function (name, factory) {

                    if (typeof factory == 'function') {
                        factory = factory($require, $module, $exports);
                    }

                    return factory;
                });

                $module.bind(all);

                return all;
            }
        };
    });

    /**
    * 把请求后台接口代理到本地的工具类。
    * @namespace
    * @name Proxy
    */
    define('Proxy', function (require, module, exports) {

        var Defaults = require('Defaults');
        var Fn = require('Fn');

        var current = null; //当前请求到的代理文件的响应结果 factory


        //模拟一个网络的随机延迟时间去执行一个回调函数
        function delay(fn) {

            var defaults = Defaults.get(module.id); //默认配置
            var delay = defaults.delay;
            var args = [].slice.call(arguments, 1); //提取 fn 后面的参数

            Fn.delay(delay, fn, args);
        }

        /**
        * 加载指定的 js 代理文件。
        * 注意：加载完 js 代理文件后，会先执行 js 代理文件的逻辑，再触发 onload 事件。
        * 经过试验发现，并发加载多个 js 文件，也会严格地按上述顺序对应的进行。
        */
        function loadJS(file, config) {

            var Url = module.require('Url');
            var url = Url.get(file);

            var Script = require('Script');
            Script.load(url, function () {

                var factory = current;
                current = null;

                if (typeof factory == 'function') {
                    factory = factory(config.data, config);
                }

                done(factory, config);
            });
        }

        /**
        * 加载指定的 json 代理文件。
        */
        function loadJSON(file, config) {

            var Url = module.require('Url');
            var url = Url.get(file);

            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);

            xhr.onreadystatechange = function () {

                if (xhr.readyState != 4) {
                    return;
                }

                if (xhr.status != 200) {
                    delay(config.error);
                    return;
                }

                var JSON = require('JSON');
                var json = JSON.parse(xhr.responseText);
                done(json, config);
            };

            xhr.send(null);
        }

        //加载完成后，根据状态分发事件。
        function done(json, config) {
            if (!json) {
                delay(config.error);
                return;
            }

            var successCode = config.successCode;
            var field = config.field;
            var code = json[field.code];

            if (code == successCode) {
                // 成功
                var data = json[field.data] || {};
                delay(config.success, data, json);
            } else {
                //失败
                var msg = json[field.msg] || '';
                delay(config.fail, code, msg, json);
            }
        }

        return (/**@lends Proxy*/{

                /**
                * 发起代理请求。
                * @param {string} file 代理响应的文件地址。
                * @param {Object} config 配置对象。
                */
                request: function request(file, config) {

                    var Url = require('Url');

                    if (Url.isExt(file, '.js')) {
                        // 映射的响应是一个 js 文件
                        loadJS(file, config);
                        return;
                    }

                    if (Url.isExt(file, '.json')) {
                        loadJSON(file, config);
                        return;
                    }

                    throw new Error('不支持参数 file 的文件类型: ' + file);
                },

                /**
                * 响应代理请求。
                * 可以生成很复杂的动态数据，并根据提交的参数进行处理，具有真正模拟后台逻辑的能力。
                * 该方法仅用在代理响应文件中，且在调用之前必须先调用 request 方法。
                * 已重载 response(json)的情况。
                * @param {function|Object} factory 响应的处理函数或 json 对象。
                *   当传进来的 factory 为处理函数时，该函数会接收到两个参数：factory(data, config)。 其中：
                *   data 为发起 get 或 post 请求时最终的 data 字段；
                *   config 为发起 get 或 post 请求时全部的配置字段。
                */
                response: function response(factory) {

                    //var type = typeof factory;
                    //var isValid = type == 'function' || type == 'object' && factory;

                    //if (!isValid) {
                    //    throw new Error('参数 factory 只能是函数或非空对象');
                    //}

                    current = factory;
                }

            }
        );
    });

    /**
    * Proxy 模块的默认配置
    * @name Proxy.defaults
    */
    define('Proxy.defaults', /**@lends Proxy.defaults*/{
        /**
        * 加载代理响应文件的起始位置(或目录)。
        */
        base: '',

        /**
        * 为模拟真实网络环境而随机延迟的时间。
        * 格式为 { min: 500, max: 3000 }。
        * 当指定为 false 时，则禁用延迟。
        */
        delay: {
            /**
            * 随机延迟的最小毫秒数。
            */
            min: 500,
            /**
            * 随机延迟的最大毫秒数。
            */
            max: 3000
        }
    });

    /**
    * 当前页面的 Url 工具。
    * @namespace
    * @name Url
    */
    define('Url', function (require, module, exports) {
        var $String = require('String');

        var meta = {
            root: '', //网站的根地址。
            url: '', //kisp.js 文件所在的地址。
            dir: '' //kisp.js 文件所在的地址所对应的目录。
        };

        return exports = /**@lends Url*/{

            /**
            * 获取当前 web 站点的根目录。
            */
            root: function root() {
                if (meta.root) {
                    return meta.root;
                }

                var Defaults = require('Defaults');
                var defaults = Defaults.get(module.id); //默认配置

                var root = defaults.root;

                if (typeof root == 'function') {
                    root = root();
                }

                //确保以 '/' 结尾。
                if (!root.endsWith('/')) {
                    root += '/';
                }

                meta.root = root;

                return root;
            },

            /**
            * 获取 KISP 框架文件所对应的 url 地址目录。
            */
            dir: function dir() {
                if (meta.dir) {
                    return meta.dir;
                }

                var url = exports.get();
                var dir = url.split('/').slice(0, -1).join('/') + '/';

                meta.dir = dir;

                return dir;
            },

            /**
            * 获取 KISP 框架文件所对应的 url 地址。
            */
            get: function get() {
                if (meta.url) {
                    return meta.url;
                }

                var Defaults = require('Defaults');
                var defaults = Defaults.get(module.id); //默认配置
                var id = defaults.id;

                //使用 `<script id="script-KISP" src="xxx"></script>` 的模式。
                if (!id) {
                    throw new Error('必须给引用了 KISP 框架文件的 <script> 标签分配一个 id。');
                }

                var script = document.getElementById(id);
                var url = script.src.split('?')[0];

                meta.url = url;

                return url;
            },

            /**
            * 获取 url 的主体部分，即去掉 query 和 hash 后的部分。
            */
            main: function main(url) {
                url = url.split('#')[0];
                url = url.split('?')[0];

                return url;
            },

            /**
            * 检查给定的 url 是否为完整的 url。
            * 即是否以 'http://' 或 'https://' 开头。
            * @param {string} url 要检查的 url。
            */
            isFull: function isFull(url) {
                if (typeof url != 'string') {
                    return false;
                }

                return url.startsWith('http://') || url.startsWith('https://');
            },

            /**
            * 检测指定的 url 是否为特定的扩展名类型的文件。
            * @param {string} url 要检测的文件名。
            * @param {string} ext 要检测的扩展名，以 "." 开始。
            * @return {boolean} 如果该文件名以指定的扩展名结尾，则返回 true；否则返回 false。
            * @example 
                Url.is('a/b/c/login.JSON', '.json'); //返回 true
            */
            isExt: function isExt(url, ext) {

                if (typeof url != 'string' || typeof ext != 'string') {
                    return false;
                }

                url = exports.main(url);

                return url.slice(0 - ext.length).toLowerCase() == ext.toLowerCase();
            },

            /**
            * 解析路径。
            * 这是一个第三方库的方法 resolveUrl。
            */
            resolve: function resolve(baseUrl /* ...urls */) {
                var len = arguments.length;
                if (len == 0) {
                    throw new Error('resolveUrl requires at least one argument; got none.');
                }

                var base = document.createElement('base');
                base.href = baseUrl;

                if (len == 1) {
                    return base.href;
                }

                var head = document.head;
                head.insertBefore(base, head.firstChild);

                var url = '';
                var a = document.createElement('a');

                for (var i = 1; i < len; i++) {
                    a.href = arguments[i];
                    url = a.href;
                    base.href = url;
                }

                head.removeChild(base);

                return url;
            }

        };
    });

    /**
    * Url 模块的默认配置。
    * @name Url.defaults
    */
    define('Url.defaults', {

        id: 'script-KISP',

        //这里取当前页面的路径作为根地址。
        //注意：只适用于当前页面在根目录的情况。
        //IE10 及以下 location.origin 不存在。
        root: location.protocol + '//' + location.host + location.pathname.split('/').slice(0, -1).join('/') + '/'

    });

    /**
    *
    */
    define('Proxy/Url', function (require, module, exports) {

        var Defaults = require('Defaults');
        var Query = require('Query');
        var Url = require('Url');

        function _get(url) {

            //绝对地址
            if (Url.isFull(url)) {
                return url;
            }

            //相对地址

            var defaults = Defaults.get(module.parent.id); //默认配置
            var base = defaults.base;

            if (Url.isFull(base)) {
                return base + url;
            }

            var root = Url.root();
            if (url.slice(0, 1) != '/') {
                root = root + base;
            }

            return root + url;
        }

        return {
            'get': function get(url) {
                url = _get(url);

                //增加随机查询字符串，确保拿到最新的
                return Query.random(url);
            }
        };
    });

    /**
    * App 启动类。 
    * @class
    * @name App
    */
    define('App', function (require, module, exports) {
        var $String = require('String');
        var Defaults = require('Defaults');
        var OuterModule = require('OuterModule'); //对外给页面提供的，即业务层的模块管理器。
        var Router = require('Router');

        var Navigator = module.require('Navigator');
        var defaults = Defaults.get(module.id);

        return exports = /**@lends App*/{

            /**
            * 初始化执行环境，并启动应用程序。
            * @param {function} factory 工厂函数，即启动函数。
            */
            init: function init(factory) {
                var name = defaults.name;
                var root = defaults.root; //app 的名称，一般为空字符串。
                var seperator = OuterModule.defaults.seperator; //父子模块的分隔符，一般为 `/`。
                var predefines = defaults.predefines || []; //业务层需要预定义的 KISP 内部模块，映射到业务层自己的模块。 一般为 `KISP` 和 `$`。

                if (!name) {
                    throw new Error('必须首先给应用分配一个唯一的名称，用于在存储中与其它应用区分开。');
                }

                if (typeof root != 'string') {
                    throw new Error('应用的顶级模块名称必须为一个 string。');
                }

                if (root.includes(seperator)) {
                    throw new Error('应用的顶级模块名称不能含有父子模块的分隔符: ' + seperator);
                }

                //让 app 的名称同时用于以下模块。
                ['SessionStorage', 'LocalStorage'].forEach(function (item) {
                    // InnerModules 是 KISP 内部的变量，定义在 base 目录。
                    if (!InnerModules.has(item)) {
                        return;
                    }

                    Defaults.set(item, {
                        'name': name
                    });
                });

                //注意，下面注释掉的 require() 语句，是给 KISP 自动化打包工具使用的。
                //使用显式的模块加载，可以让自动化工具分析出模块的依赖关系。
                //数目与 App.defaults.js 里的 predefines 一致。
                //var KISP = require('KISP');
                //var $ = require('$');
                predefines.forEach(function (name) {
                    OuterModule.define(name, function () {
                        return require(name);
                    });
                });

                //先定义一个顶级的模块。
                OuterModule.define(root, function ($require, $module, $exports) {
                    if (defaults.navigator) {
                        $exports = Navigator.create({
                            'container': defaults.view.container,
                            'preload': defaults.view.preload,
                            'slide': defaults.view.slide,
                            'animate': defaults.view.animate,

                            'name': defaults.navigator,
                            'module': $module
                        });
                    }

                    if (defaults.prebind) {
                        Router.bind($require, $module, $exports);
                    }

                    factory && factory($require, $module, $exports);
                });
            },

            /**
            * 启动应用程序。
            * @param {function} factory 工厂函数，即启动函数。
            */
            launch: function launch(factory) {
                exports.init(factory);

                //定义完后马上加载即可启动。
                OuterModule.require(defaults.root);
            }
        };
    });

    /**
    * App 模块的默认配置
    * @name App.defaults
    */
    define('App.defaults', /**@lends App.defaults*/{
        root: '',

        /**
        * 应用的唯一名称。
        * 用于在存储中区分其它应用。
        */
        name: '',

        navigator: 'default-navigator',

        /**
        * 是否预绑定路由。
        */
        prebind: true,

        /**
        * 针对视图的配置。
        */
        view: {},

        /**
        * 给业务层预定义的模块。
        * 即把 KISP 内部的模块预定义成业务层的模块。
        */
        predefines: ['KISP', '$']

    });

    /**
    * App 模块的默认配置
    * @name App.config
    */
    define('App.config', /**@lends App.config*/{});

    /**
    * 对外提供的业务层的模块管理器。
    * @namespace
    * @name OuterModule
    */
    define('OuterModule', function (require, module, exports) {
        var Defaults = require('Defaults');
        var Emitter = require('Emitter');

        var defaults = Defaults.clone(module.id, {
            'Emitter': Emitter //事件驱动器的构造器。
        });

        //对外给业务层使用的模块管理器。
        var mm = new ModuleManager(defaults);

        return (/**@lends Module*/{
                /**
                * 默认配置。
                */
                'defaults': defaults,

                /**
                * 定义指定名称的模块。
                * 该方法对外给业务层使用的。
                * @function
                * @param {string} id 模块的名称。
                * @param {Object|function} factory 模块的导出函数或对象。
                */
                'define': mm.define.bind(mm),

                /**
                * 加载指定的模块。
                * KISP 内部使用的：
                *   在 App 模块中用到，用于启动程序。
                *   
                * @function
                * @param {string} id 模块的名称。
                * @return 返回指定的模块。 
                */
                'require': mm.require.bind(mm)

            }
        );
    });

    /**
    * OuterModule 模块的默认配置
    * @name OuterModule.defaults
    */
    define('OuterModule.defaults', /**@lends OuterModule.defaults*/{
        seperator: '/', //私有模块的分隔符。
        repeated: false, //不允许重复定义同名的模块。
        cross: false //不允许跨级加载模块。
    });

    define('$', function (require, module, exports) {

        return window.jQuery || null;
    });

    /**
    *
    */
    define('App/Navigator', function (require, module, exports) {
        var Tasks = require('Tasks');
        var Navigator = require('Navigator');

        var Views = module.require('Views');

        return {
            /**
            * 创建一个带视图滑动效果和滑动返回手势支持的导航器。
            *   options = {
            *       container: 'body',  //视图所要附加到的容器。
            *       preload: true,      //是否按需提前加载视图的分包资源。
            *       slide: true,        //是否启用滑动返回手势支持。
            *       animate: true,      //是否启用视图间的前进/后退的过渡动画效果。
            *       name: '',           //导航器的唯一名称。 因为一个应用里可以存在多个导航器，为区分存储中的数据，须提供一个名称。
            *       module: Module,     //业务层顶级的 module 对象。 即 KISP.launch() 方法中回调函数的第二个参数 `module`，用于加载视图。
            *   };
            */
            create: function create(options) {
                var $module = options.module;
                var nav = new Navigator(options.name);

                var animateEnabled = options.animate;
                var slideEnabled = options.slide;

                //针对滑动返回的。
                //让浏览器的地址栏跟随着后退，但不触发 KISP 内部相应的事件。
                var back = function back() {
                    nav.back(false);
                };

                /**
                * 跳到指定视图时触发。
                * 包括主动跳转、前进、后退、刷新。
                * 实现根据目标视图的状态信息进行显示或渲染。
                */
                nav.on('view', function (target, args, info) {
                    //target 可能尚未加载回来。
                    Views.load(target, options, function (target) {
                        if (info.cache && target.rendered()) {
                            target.show();
                        } else {
                            target.render.apply(target, _toConsumableArray(args));
                        }
                    });
                });

                if (options.preload) {
                    /**
                    * 通过输入地址栏的地址，或刷新浏览器时触发。
                    * 根据缓存到的视图信息，按时间戳进行排序，重建滑动返回顺序的手势支持。
                    */
                    nav.on('immediate', function (hash, hash$info) {
                        //视图信息列表。
                        var infos = Object.keys(hash$info).map(function (hash) {
                            return hash$info[hash];
                        });

                        //按时间戳降序排序。
                        infos = infos.sort(function (a, b) {
                            return a.timestamp > b.timestamp ? -1 : 1;
                        });

                        Views.load(infos, options, function () {
                            if (!slideEnabled) {
                                return;
                            }
                        });
                    });
                }

                /**
                * 通过浏览器的前进时触发。
                * 实现从当前视图到目标视图的滑动过渡效果。
                */
                nav.on('forward', function (current, target) {
                    current = $module.require(current);

                    //target 可能尚未加载回来。
                    Views.load(target, options, function (target) {

                        current.hide();
                        target.show();
                    });
                });

                /**
                * 通过浏览器的后退时触发。
                * 实现从目标视图到当前视图的滑动过渡效果。
                */
                nav.on('back', function (current, target) {
                    current = $module.require(current);

                    Views.load(target, options, function (target) {

                        current.hide();
                        target.show();
                    });
                });

                return nav;
            }

        };
    });

    /**
    * 基于浏览器地址栏 hash 的状态导航器。
    * @class
    * @name Navigator
    */
    define('Navigator', function (require, module, exports) {
        var $String = require('String');
        var Defaults = require('Defaults');
        var Emitter = require('Emitter');
        var Meta = module.require('Meta');
        var Hash = module.require('Hash');
        var Router = module.require('Router');

        var mapper = new Map();

        /**
        * 构造器。
        * 已重载 Navigator(config);
        * 已重载 Navigator(id, config);
        */
        function Navigator(id, config) {
            if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) == 'object') {
                config = id;
            } else {
                config = Object.assign({ 'id': id }, config);
            }

            config = Defaults.clone(module.id, config);

            var emitter = new Emitter(this);
            var router = Router.create();

            var meta = Meta.create(config, {
                'emitter': emitter,
                'router': router
            });

            mapper.set(this, meta);

            Object.assign(this, {
                'id': meta.id,
                '_meta': meta //暂时暴露。
            });

            //是否启用模拟传统多页面的路由转换器。
            if (config.simulate) {
                this.route(Navigator.simulate);
            }
        }

        Navigator.prototype = {
            constructor: Navigator,

            /**
            * 当前实例 id。
            */
            id: '',

            /**
            * 渲染。
            * 启用并开始 hash 监听。
            */
            render: function render() {
                var meta = mapper.get(this);

                //自动启用。
                this.enable(true);

                if (!meta.rendered) {
                    Hash.init(meta);
                }
            },

            /**
            * 设置 hash 与 view 的路由关系。
            * 即 hash 与 view 之间的映射转换关系。
            *   options = {
            *       静态如果明确指定为 null，则清空之前的。
            *       否则，合并覆盖。
            *       view$hash: {},
            *       hash$view: {},
            *
            *       //视图到 hash 的转换函数。 
            *       //在调用 to() 方法时会先调用此函数。 
            *       //如 `UserList` -> `/user-list.html`。
            *       //该函数会接收到参数: view，传入的视图名，如 `UserList`。 
            *       //该函数应该返回要生成的 hash 值，如 `/user-list.html`。
            *       toHash: function (view) { },
            *
            *       //hash 到视图的转换函数。 
            *       //在触发某个事件时，会把相应的 hash 作转换，以还原回原来的视图名。 
            *       //如 `/user-list.html` -> `UserList`
            *       //该函数会接收到参数: hash，地址栏中的 hash 值，如 `/user-list.html`。 
            *       //该函数应该返回要还原的视图名，如 `UserList`。
            *       toView: function (hash) { },
            *   };
            */
            route: function route(options) {
                var meta = mapper.get(this);
                var router = meta.router;
                var view$hash = options.view$hash;
                var hash$view = options.hash$view;
                var toHash = options.toHash;
                var toView = options.toView;

                //如果明确指定为 null，则清空之前的。
                //否则，合并覆盖。
                if (hash$view === null) {
                    router.hash$view = {};
                } else {
                    Object.assign(router.hash$view, hash$view);
                }

                if (view$hash === null) {
                    router.view$hash = {};
                } else {
                    Object.assign(router.view$hash, view$hash);
                }

                if (typeof toHash == 'function') {
                    router.view2hash = toHash;
                }

                if (typeof toView == 'function') {
                    router.hash2view = toView;
                }
            },

            /**
            * 跳转到新视图，并传递一些参数。
            * @return {Object} 返回目标视图信息。
            */
            to: function to(view) {
                if (typeof view != 'string') {
                    throw new Error('参数 name 必须为 string 类型。');
                }

                var meta = mapper.get(this);
                var emitter = meta.emitter;
                var current = meta.hash$info[meta.hash]; //跳转之前，原来的 hash 对应的视图信息。

                for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                    args[_key6 - 1] = arguments[_key6];
                }

                var target = meta.setInfo(view, args);

                //已禁用。
                if (!meta.enabled) {
                    return target;
                }

                if (target.hash != meta.hash) {
                    meta.fireEvent = false;
                    Hash.set(meta, target.hash);
                }

                if (current) {
                    emitter.fire('to', [current.view, view, {
                        'cache': false,
                        'current': current,
                        'target': target
                    }]);
                }

                //此处的 target 必不为空。
                emitter.fire('view', [view, args, {
                    'cache': false,
                    'current': current,
                    'target': target
                }]);

                if (current) {
                    emitter.fire('forward', [current.view, view]);
                }

                return target;
            },

            /**
            * 后退。
            */
            back: function back(fireEvent) {
                var meta = mapper.get(this);
                meta.fireEvent = fireEvent === undefined ? true : !!fireEvent;

                history.back();
            },

            /**
            * 清空缓存和地址栏中的 hash。
            */
            clear: function clear() {
                var meta = mapper.get(this);

                if (meta.storage) {
                    meta.storage.clear();
                }

                meta.fireEvent = false;
                meta.hash$info = {};
                Hash.set(meta, '');
            },

            /**
            * 设置启用或禁用。
            */
            enable: function enable(enabled) {
                var meta = mapper.get(this);
                meta.enabled = !!enabled;
            },

            /**
            * 绑定事件。
            */
            on: function on() {
                var _meta$emitter2;

                var meta = mapper.get(this);
                (_meta$emitter2 = meta.emitter).on.apply(_meta$emitter2, arguments);
            }

        };

        //静态成员。

        Object.assign(Navigator, {

            /**
            * 提供一种常用的模拟传统多页面的路由转换器。
            * 设置 hash 与 view 的双向映射转换关系。
            * 如 `AccountUsers` <-> `/account-users.html`。
            */
            simulate: {
                //把 view 转成 hash。
                toHash: function toHash(view) {
                    if (!view) {
                        return view;
                    }

                    view = $String.toHyphenate(view); // `AccountUsers` -> `-account-users`。
                    view = view.slice(1); //`-account-users` -> `account-users`。
                    view = '/' + view + '.html'; //`account-users` -> `/account-users.html`。

                    return view;
                },

                //把 hash 转成 view。
                toView: function toView(hash) {
                    //确保如 `/xx.html` 的格式。
                    if (!/^\/.+\.html$/.test(hash)) {
                        return hash;
                    }

                    hash = hash.slice(1, -5);
                    hash = $String.toCamelCase(hash);
                    hash = hash[0].toUpperCase() + hash.slice(1);

                    return hash;
                }
            }

        });

        return Navigator;
    });

    /**
    * Navigator 模块的默认配置
    * @name Navigator.defaults
    */
    define('Navigator.defaults', /**@lends Navigator.defaults*/{

        /**
        * 实例 id。
        * 须确保每个实例 id 唯一。
        */
        id: '',

        /**
        * 是否启用。
        */
        enabled: true,

        /**
        * 对状态要启用的存储类型。
        * 可取的值有: false、`session`、`local`。
        * 如果为 false，则禁用存储，页面刷新后将重新开始。
        */
        storage: 'session',

        /**
        * 是否允许在当前激活的视图后面，再添加一个跟当前激活的视图同名的视图进来。
        */
        repeated: false,

        /**
        * 是否启用模拟传统多页面的路由转换器。
        * 如果启用，则会把视图名与页面进行双向转换。
        * 如 `AccountUsers` <---> `/account-users.html`。
        */
        simulate: false

    });

    define('Navigator/Meta', function (require, module, exports) {
        var $ = require('$');
        var $String = require('String');
        var $Date = require('Date');

        var id$existed = {}; //根据 id 记录对应的实例是否已创建。


        function createStorage(type, id) {
            if (!type) {
                return null;
            }

            type = type.toLowerCase();

            //为了方便自动化工具分析模块的依赖关系，必须在 require 里使用完速的常量的模块名称，
            //而不能使用变量或动态拼接出来的名称，如 'Session' + 'Storage'。
            var Storage = type == 'session' ? require('SessionStorage') : type == 'local' ? require('LocalStorage') : null;

            if (!Storage) {
                throw new Error('\u4E0D\u652F\u6301\u7684 Storage \u7C7B\u578B: ' + type);
            }

            return new Storage(id);
        }

        return {
            create: function create(config, others) {
                var id = config.id;

                if (!id) {
                    throw new Error('\u521B\u5EFA ' + module.parent.id + ' \u5B9E\u4F8B\u65F6\uFF0C\u5FC5\u987B\u6307\u5B9A id \u5B57\u6BB5\u3002');
                }

                if (id$existed[id]) {
                    throw new Error('\u5DF2\u5B58\u5728 id \u4E3A ' + id + ' \u7684\u5B9E\u4F8B\u3002');
                }

                id$existed[id] = true;

                var storage = createStorage(config.storage, id);
                var hash$info = storage ? storage.get('hash$info') || {} : {};

                var meta = {
                    'id': id, //实例 id，由业务层传入，确保唯一。
                    'hash': '', //当前的 hash 值。
                    'fireEvent': true, //指示某一次(时刻)是否需要触发事件。
                    'rendered': false, //记录是否调用过 render()。 
                    'enabled': config.enabled, //是否启用。

                    'storage': storage, //持久存储实例。
                    'hash$info': hash$info, //hash 对应的视图信息。

                    'emitter': null, //事件驱动器。
                    'this': null, //当前实例，方便内部使用。


                    //hash 与 view 映射转换关系。 
                    //默认不进行转换，即 hash 与 view 相同。
                    //例如，若要在地址栏 hash 中显示的是 `/user-list.html`，
                    //对应的视图却是 `UserList`，则要提供自定义的映射关系。
                    'router': null,

                    //设置视图信息。
                    'setInfo': function setInfo(view, args) {
                        var hash = meta.router.toHash(view);
                        var now = new Date();
                        var datetime = $Date.stringify(now);
                        var timestamp = now.getTime();

                        var info = hash$info[hash] = {
                            'view': view,
                            'hash': hash,
                            'datetime': datetime,
                            'timestamp': timestamp,
                            'args': args || []
                        };

                        if (storage) {
                            storage.set('hash$info', hash$info);
                        }

                        return info;
                    }

                };

                Object.assign(meta, others);

                return meta;
            }
        };
    });
    /**
    * 会话存储工具类。
    * 
    * sessionStorage 属性允许你访问一个 session Storage 对象。
    * 它与 localStorage 相似，不同之处在于 localStorage 里面存储的数据没有过期时间设置，
    * 而存储在 sessionStorage 里面的数据在页面会话结束时会被清除。
    * 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
    * 在新标签或窗口打开一个页面会初始化一个新的会话，这点和 session cookies 的运行方式不同。
    * 应该注意的是，无论是 localStorage 还是 sessionStorage 中保存的数据都仅限于该页面的协议。
    *
    * 此处的 SessionStorage 设计理念为：
    *   KISP 中的 SessionStorage 是针对多个应用的存储，每个应用都有自己独立的存储空间。
    *   使用之前，一个应用请先配置应用的名称(通过配置 `SessionStorage` 模块的 `name` 字段)。
    *   为防止跟别的应用名称冲突，可以加一些随机数，如当前应用名称为 `kis-cloud`，则可以配置为 `kis-cloud-9DCA`。
    *   通过应用的名称来区分每个应用的独立的存储空间。
    *   在每个应用中，又可以创建多个 id 不同的 SessionStorage 的实例，每个 SessionStorage 实例都有自己的存储空间。
    *   每个 SessionStorage 实例中可以储存不同的 key 和 value。
    *   因此，从层级上来说，结构为：web 应用 -> SessionStorage 实例 -> 键值。
    *
    * @class
    * @name SessionStorage
    */
    define('SessionStorage', function (require, module, exports) {
        var Storage = require('Storage');
        var Defaults = require('Defaults');

        var storage = Storage('session');
        var mapper = new Map();

        /**
        * 构造器。
        *   id: '',         //当前 storage 实例的 id，拥有自己的存储空间。
        *   config = {
        *       name: '',   //必选，应用的名称。
        *   };
        */
        function SessionStorage(id, config) {
            config = Defaults.clone(module.id, config);

            var name = config.name;

            if (!name) {
                throw new Error('KISP.' + module.id + ' \u662F\u9488\u5BF9\u591A\u4E2A\u5E94\u7528\u7684\u5B58\u50A8\uFF0C\u6BCF\u4E2A\u5E94\u7528\u90FD\u6709\u81EA\u5DF1\u72EC\u7ACB\u7684\u5B58\u50A8\u7A7A\u95F4\u3002\n                \u8BF7\u5148\u6307\u5B9A\u6240\u5728\u5E94\u7528\u7684\u540D\u79F0(\u901A\u8FC7\u914D\u7F6E ' + module.id + ' \u6A21\u5757\u7684 name \u5B57\u6BB5) \u3002');
            }

            var meta = {
                'name': name, //应用名称。
                'id': id //
            };

            mapper.set(this, meta);
        }

        SessionStorage.prototype = {
            constructor: SessionStorage,

            /**
            * 设置一对键值。
            * 已重载 set(obj); 批量设置。
            * 已重载 set(key, value); 单个设置。
            * @param {string} key 要进行设置的键名称。
            * @param value 要进行设置的值，可以是任何类型。
            */
            set: function set(key, value) {
                var meta = mapper.get(this);
                var app = storage.get(meta.name) || {}; //每次都实时从存储中获取。
                var data = app[meta.id] || {};

                //重载 set({...}); 批量设置的情况。
                if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object') {
                    Object.assign(data, key);
                } else {
                    //单个设置
                    data[key] = value;
                }

                app[meta.id] = data;
                storage.set(meta.name, app);
            },

            /**
            * 根据给定的键获取关联的值。
            * 已重载 get() 获取全部的情况。
            * @param {string} [key] 要进行获取的键名称。
            * @return 返回该键所关联的值。
            */
            get: function get(key) {
                var meta = mapper.get(this);
                var app = storage.get(meta.name) || {}; //每次都实时从存储中获取。
                var data = app[meta.id];

                if (!data) {
                    return;
                }

                //重载 get(); 获取全部的情况
                if (arguments.length == 0) {
                    return data;
                }

                //重载 get(key); 获取指定键的值。
                return data[key];
            },

            /**
            * 移除给定的键所关联的项。
            * @param {string} key 要进行移除的键名称。
            */
            remove: function remove(key) {
                var meta = mapper.get(this);
                var app = storage.get(meta.name) || {}; //每次都实时从存储中获取。
                var data = app[meta.id];

                if (!data) {
                    return;
                }

                delete data[key];

                storage.set(meta.name, app);
            },

            /**
            * 清空所有项。
            */
            clear: function clear() {
                var meta = mapper.get(this);
                var app = storage.get(meta.name); //每次都实时从存储中获取。

                if (!app) {
                    return;
                }

                delete app[meta.id];
                storage.set(meta.name, app);
            }

        };

        //同时提供底层通用的静态方法。
        return Object.assign(SessionStorage, storage);
    });

    /**
    * SessionStorage 模块的默认配置
    * @name SessionStorage.defaults
    */
    define('SessionStorage.defaults', /**@lends SessionStorage.defaults*/{
        /**
        * 应用的名称。
        * 设定后即可创建与获取在该名称下的本地存储，从而避免跟其它应用的冲突。
        */
        name: ''
    });

    /**
    * 底层通用的存储工具。
    * 业务层不应该直接使用该模块，请使用 SessionStorage 或 LocalStorage。
    * @namespace
    * @name Storage
    */
    define('Storage', function (require, module, exports) {
        var CircularJSON = require('CircularJSON');

        //type 为 `session` 或 `local`
        var type$exports = {};

        /**
        * 
        */
        return function (type) {
            var exports = type$exports[type];

            //已创建，直接使用。
            if (exports) {
                return exports;
            }

            //----------------------------------------------------------
            //首次创建。
            var name = type + 'Storage'; //如 `sessionStorage`。
            var storage = window[name]; //发 window.sessionStorage。

            if (!storage) {
                throw new Error('\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 ' + name + ' \u5B58\u50A8\u3002');
            }

            var KISP = require('KISP');

            //如 `KISP.mobile.(8.1.0).16A7B9191751AE9B35DAE20DFA209532`。
            var key = 'KISP.' + KISP.name + '.(' + KISP.version + ').' + KISP.md5;
            var json = storage.getItem(key) || '{}'; //全部数据的字符串形式。
            var all = CircularJSON.parse(json) || {}; //全部数据的对象形式。  


            //保存到浏览器层面的存储。
            function save() {
                json = CircularJSON.stringify(all);
                storage.setItem(key, json);
            }

            //导出对象。
            return type$exports[type] = {

                /**
                * 设置一对键值。
                * @param {string} key 要进行设置的键名称。
                * @param value 要进行设置的值，可以是任何类型。
                */
                set: function set(key, value) {
                    all[key] = value;
                    save();
                },

                /**
                * 根据给定的键获取关联的值。
                * @param {string} key 要进行获取的键名称。
                * @return 返回该键所关联的值。
                */
                get: function get(key) {
                    return all[key];
                },

                /**
                * 移除给定的键所关联的项。
                * @param {string} key 要进行移除的键名称。
                */
                remove: function remove(key) {
                    delete all[key];
                    save();
                },

                /**
                * 清空所有项。
                */
                clear: function clear() {
                    all = {};
                    save();
                }

            };
        };
    });

    /**
    * ����ѭ�����õĶ���Ϊ JSON��
    *
    * https://github.com/WebReflection/circular-json
    */
    define('CircularJSON', function (require, module, exports) {

        var
        // should be a not so common char
        // possibly one JSON does not encode
        // possibly one encodeURIComponent does not encode
        // right now this char is '~' but this might change in the future
        specialChar = '~',
            safeSpecialChar = '\\x' + ('0' + specialChar.charCodeAt(0).toString(16)).slice(-2),
            escapedSafeSpecialChar = '\\' + safeSpecialChar,
            specialCharRG = new RegExp(safeSpecialChar, 'g'),
            safeSpecialCharRG = new RegExp(escapedSafeSpecialChar, 'g'),
            safeStartWithSpecialCharRG = new RegExp('(?:^|([^\\\\]))' + escapedSafeSpecialChar),
            indexOf = [].indexOf || function (v) {
            for (var i = this.length; i-- && this[i] !== v;) {}
            return i;
        },
            $String = String // there's no way to drop warnings in JSHint
        // about new String ... well, I need that here!
        // faked, and happy linter!
        ;

        function generateReplacer(value, replacer, resolve) {
            var doNotIgnore = false,
                inspect = !!replacer,
                path = [],
                all = [value],
                seen = [value],
                mapp = [resolve ? specialChar : '[Circular]'],
                last = value,
                lvl = 1,
                i,
                fn;
            if (inspect) {
                fn = (typeof replacer === 'undefined' ? 'undefined' : _typeof(replacer)) === 'object' ? function (key, value) {
                    return key !== '' && replacer.indexOf(key) < 0 ? void 0 : value;
                } : replacer;
            }
            return function (key, value) {
                // the replacer has rights to decide
                // if a new object should be returned
                // or if there's some key to drop
                // let's call it here rather than "too late"
                if (inspect) value = fn.call(this, key, value);

                // first pass should be ignored, since it's just the initial object
                if (doNotIgnore) {
                    if (last !== this) {
                        i = lvl - indexOf.call(all, this) - 1;
                        lvl -= i;
                        all.splice(lvl, all.length);
                        path.splice(lvl - 1, path.length);
                        last = this;
                    }
                    // console.log(lvl, key, path);
                    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value) {
                        // if object isn't referring to parent object, add to the
                        // object path stack. Otherwise it is already there.
                        if (indexOf.call(all, value) < 0) {
                            all.push(last = value);
                        }
                        lvl = all.length;
                        i = indexOf.call(seen, value);
                        if (i < 0) {
                            i = seen.push(value) - 1;
                            if (resolve) {
                                // key cannot contain specialChar but could be not a string
                                path.push(('' + key).replace(specialCharRG, safeSpecialChar));
                                mapp[i] = specialChar + path.join(specialChar);
                            } else {
                                mapp[i] = mapp[0];
                            }
                        } else {
                            value = mapp[i];
                        }
                    } else {
                        if (typeof value === 'string' && resolve) {
                            // ensure no special char involved on deserialization
                            // in this case only first char is important
                            // no need to replace all value (better performance)
                            value = value.replace(safeSpecialChar, escapedSafeSpecialChar).replace(specialChar, safeSpecialChar);
                        }
                    }
                } else {
                    doNotIgnore = true;
                }
                return value;
            };
        }

        function retrieveFromPath(current, keys) {
            for (var i = 0, length = keys.length; i < length; current = current[
            // keys should be normalized back here
            keys[i++].replace(safeSpecialCharRG, specialChar)]) {}
            return current;
        }

        function generateReviver(reviver) {
            return function (key, value) {
                var isString = typeof value === 'string';
                if (isString && value.charAt(0) === specialChar) {
                    return new $String(value.slice(1));
                }
                if (key === '') value = regenerate(value, value, {});
                // again, only one needed, do not use the RegExp for this replacement
                // only keys need the RegExp
                if (isString) value = value.replace(safeStartWithSpecialCharRG, '$1' + specialChar).replace(escapedSafeSpecialChar, safeSpecialChar);
                return reviver ? reviver.call(this, key, value) : value;
            };
        }

        function regenerateArray(root, current, retrieve) {
            for (var i = 0, length = current.length; i < length; i++) {
                current[i] = regenerate(root, current[i], retrieve);
            }
            return current;
        }

        function regenerateObject(root, current, retrieve) {
            for (var key in current) {
                if (current.hasOwnProperty(key)) {
                    current[key] = regenerate(root, current[key], retrieve);
                }
            }
            return current;
        }

        function regenerate(root, current, retrieve) {
            return current instanceof Array ?
            // fast Array reconstruction
            regenerateArray(root, current, retrieve) : current instanceof $String ?
            // root is an empty string
            current.length ? retrieve.hasOwnProperty(current) ? retrieve[current] : retrieve[current] = retrieveFromPath(root, current.split(specialChar)) : root : current instanceof Object ?
            // dedicated Object parser
            regenerateObject(root, current, retrieve) :
            // value as it is
            current;
        }

        var CircularJSON = {
            stringify: function stringify(value, replacer, space, doNotResolve) {
                return CircularJSON.parser.stringify(value, generateReplacer(value, replacer, !doNotResolve), space);
            },
            parse: function parse(text, reviver) {
                return CircularJSON.parser.parse(text, generateReviver(reviver));
            },
            // A parser should be an API 1:1 compatible with JSON
            // it should expose stringify and parse methods.
            // The default parser is the native JSON.
            parser: JSON
        };

        return CircularJSON;
    });

    /**
    * 本地存储工具类。
    * 此处的 LocalStorage 设计理念为：
    *   KISP 中的 LocalStorage 是针对多个应用的存储，每个应用都有自己独立的存储空间。
    *   使用之前，一个应用请先配置应用的名称(通过配置 `LocalStorage` 模块的 `name` 字段)。
    *   为防止跟别的应用名称冲突，可以加一些随机数，如当前应用名称为 `kis-cloud`，则可以配置为 `kis-cloud-9DCA`。
    *   通过应用的名称来区分每个应用的独立的存储空间。
    *   在每个应用中，又可以创建多个 id 不同的 LocalStorage 的实例，每个 LocalStorage 实例都有自己的存储空间。
    *   每个 LocalStorage 实例中可以储存不同的 key 和 value。
    *   因此，从层级上来说，结构为：web 应用 -> LocalStorage 实例 -> 键值。
    * @namespace
    * @name LocalStorage
    */
    define('LocalStorage', function (require, module, exports) {
        var Storage = require('Storage');
        var Defaults = require('Defaults');

        var storage = Storage('local');
        var mapper = new Map();

        function LocalStorage(id, config) {

            config = Defaults.clone(module.id, config);

            var name = config.name;

            if (!name) {
                throw new Error('KISP.' + module.id + ' \u662F\u9488\u5BF9\u591A\u4E2A\u5E94\u7528\u7684\u5B58\u50A8\uFF0C\u6BCF\u4E2A\u5E94\u7528\u90FD\u6709\u81EA\u5DF1\u72EC\u7ACB\u7684\u5B58\u50A8\u7A7A\u95F4\u3002\n                \u8BF7\u5148\u6307\u5B9A\u6240\u5728\u5E94\u7528\u7684\u540D\u79F0(\u901A\u8FC7\u914D\u7F6E ' + module.id + ' \u6A21\u5757\u7684 name \u5B57\u6BB5) \u3002');
            }

            var meta = {
                'name': name, //应用名称。
                'id': id //
            };

            mapper.set(this, meta);
        }

        LocalStorage.prototype = {
            constructor: LocalStorage,

            /**
            * 设置一对键值。
            * 已重载 set(obj); 批量设置。
            * 已重载 set(key, value); 单个设置。
            * @param {string} key 要进行设置的键名称。
            * @param value 要进行设置的值，可以是任何类型。
            */
            set: function set(key, value) {
                var meta = mapper.get(this);
                var app = storage.get(meta.name) || {}; //每次都实时从存储中获取。
                var data = app[meta.id] || {};

                //重载 set({...}); 批量设置的情况。
                if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object') {
                    Object.assign(data, key);
                } else {
                    //单个设置
                    data[key] = value;
                }

                app[meta.id] = data;
                storage.set(meta.name, app);
            },

            /**
            * 根据给定的键获取关联的值。
            * 已重载 get() 获取全部的情况。
            * @param {string} [key] 要进行获取的键名称。
            * @return 返回该键所关联的值。
            */
            get: function get(key) {
                var meta = mapper.get(this);
                var app = storage.get(meta.name) || {}; //每次都实时从存储中获取。
                var data = app[meta.id];

                if (!data) {
                    return;
                }

                //重载 get(); 获取全部的情况
                if (arguments.length == 0) {
                    return data;
                }

                //重载 get(key); 获取指定键的值。
                return data[key];
            },

            /**
            * 移除给定的键所关联的项。
            * @param {string} key 要进行移除的键名称。
            */
            remove: function remove(key) {
                var meta = mapper.get(this);
                var app = storage.get(meta.name) || {}; //每次都实时从存储中获取。
                var data = app[meta.id];

                if (!data) {
                    return;
                }

                delete data[key];

                storage.set(meta.name, app);
            },

            /**
            * 清空所有项。
            */
            clear: function clear() {
                var meta = mapper.get(this);
                var app = storage.get(meta.name); //每次都实时从存储中获取。

                if (!app) {
                    return;
                }

                delete app[meta.id];
                storage.set(meta.name, app);
            }

        };

        //同时提供底层通用的静态方法。
        return Object.assign(LocalStorage, storage);
    });

    /**
    * LocalStorage 模块的默认配置
    * @name LocalStorage.defaults
    */
    define('LocalStorage.defaults', /**@lends LocalStorage.defaults*/{
        /**
        * 应用的名称。
        * 设定后即可创建与获取在该名称下的本地存储，从而避免跟其它应用的冲突。
        */
        name: ''
    });

    define('Navigator/Hash', function (require, module, exports) {
        var $ = require('$');
        var $String = require('String');
        var $Date = require('Date');
        var Hash = require('Hash');

        return {
            /**
            * 
            */
            init: function init(meta) {
                //监听窗口 hash 的变化。
                Hash.onchange(window, true, function (hash, old, isImmediate) {
                    //
                    meta.hash = hash;

                    //已禁用。
                    //此值可给动态改变，因此需要每次都判断。
                    if (!meta.enabled) {
                        return;
                    }

                    //此次已临时禁用事件。
                    if (!meta.fireEvent) {
                        console.log('已设置为临时禁用事件。');
                        meta.fireEvent = true; //恢复启用事件，供下次使用。
                        return;
                    }

                    if (isImmediate) {
                        meta.emitter.fire('immediate', [hash, meta.hash$info]);
                    }

                    //空值。
                    if (!hash) {
                        old = meta.router.toView(old);
                        meta.emitter.fire('none', [old]);
                        return;
                    }

                    //通过点击前进/后退按钮(或调用浏览器的前进/后退接口)，
                    //或在地址栏中手动输入 hash 导致的变化。
                    //此时 hash 值肯定非空(因为如果为空，前面就已拦截了)。
                    var target = meta.hash$info[hash]; //可能为空。
                    var current = meta.hash$info[old]; //可能为空。

                    if (target) {
                        meta.emitter.fire('view', [target.view, target.args, {
                            'target': target,
                            'current': current,
                            'cache': true
                        }]);

                        if (current) {
                            var direction = target.timestamp > current.timestamp ? 'forward' : 'back';
                            meta.emitter.fire(direction, [current.view, target.view]);
                        }
                        return;
                    }

                    hash = meta.router.toView(hash);
                    old = meta.router.toView(old);

                    //说明页面一进来时，地址栏中就含有了 hash。
                    if (isImmediate) {
                        meta.emitter.fire('start', [hash, old]);
                    } else {
                        meta.emitter.fire('404', [hash, old]);
                    }
                });
            },

            /**
            * 
            */
            set: function set(meta, hash) {
                Hash.set(window, hash);
            }
        };
    });

    define('Navigator/Router', function (require, module, exports) {
        var $ = require('$');
        var $String = require('String');

        return {
            create: function create() {

                var $exports = {
                    //静态映射表。
                    //优先级高于动态映射函数的。
                    view$hash: {},
                    hash$view: {},

                    //动态映射函数。
                    //业务层可提供一个自定义的。
                    view2hash: null,
                    hash2view: null,

                    //以下两个函数内组件内部使用。

                    //把 view 转换成 hash。
                    //在调用 nav.to() 时进行调用的。
                    toHash: function toHash(view) {
                        var hash = view;

                        if (view in $exports.view$hash) {
                            hash = $exports.view$hash[view];
                        } else if (typeof $exports.view2hash == 'function') {
                            hash = $exports.view2hash(view);
                        }

                        hash = hash || '';

                        if (typeof hash != 'string') {
                            throw new Error('自定义的 view -> hash 的转换关系中，hash 必须为 string 类型。');
                        }

                        return hash;
                    },

                    //把 hash 转换成 view。
                    //在触发 `view` 事件时进行调用的。
                    toView: function toView(hash) {
                        var view = hash;

                        if (hash in $exports.hash$view) {
                            view = $exports.hash$view[hash];
                        } else if (typeof $exports.hash2view == 'function') {
                            view = $exports.hash2view(hash);
                        }

                        view = view || '';

                        if (typeof view != 'string') {
                            throw new Error('自定义的 hash -> view 的转换关系中，view 必须为 string 类型。');
                        }

                        return view;
                    }
                };

                return $exports;
            }
        };
    });

    /**
    *
    */
    define('App/Navigator/Views', function (require, module, exports) {
        var Tasks = require('Tasks');
        var $Array = require('Array');
        var Package = require('Package');

        var name$appended = {}; //记录视图对应的 html 内容是否已附加到容器中。


        function normalize(views) {
            views = Array.isArray(views) ? views : [views];

            views = $Array.map(views, function (item) {
                if (!item) {
                    return null;
                }

                if (typeof item == 'string') {
                    item = {
                        'view': item,
                        'args': []
                    };
                }

                return item;
            });

            return views;
        }

        return {
            /**
            * 加载多个视图。
            *   options = {
            *       container: 'body',  //视图所要附加到的容器。
            *       module: Module,     //业务层顶级的 module 对象。 即 KISP.launch() 方法中回调函数的第二个参数 `module`，用于加载视图。
            *   };
            */
            load: function load(views, options, done) {
                var list = normalize(views);
                var $module = options.module;
                var container = options.container;

                var tasks = new Tasks(list);

                //先异步加载完所有的视图模块。
                //可能是异步，也可能是直接加载。
                tasks.on('each', function (view, index, done) {
                    var name = view.view;
                    var M = $module.require(name);

                    //已加载过了。
                    if (M) {
                        done(M);
                        return;
                    }

                    Package.load(name, function (pack) {
                        if (!pack) {
                            throw new Error('\u603B\u5305\u4E2D\u4E0D\u5B58\u5728\u540D\u4E3A ' + name + ' \u7684\u914D\u7F6E\u8282\u70B9\u3002');
                        }

                        var item = pack['html'] || {};
                        var html = item.content;
                        var appended = name$appended[name];

                        //先处理 html 内容。
                        if (!appended && container && html) {
                            name$appended[name] = true;
                            $(container).append(html);
                        }

                        //再加载 js 模块。
                        //因为 js 模块可能会用到对应的 DOM 节点。
                        var M = $module.require(name);

                        if (!M) {
                            throw new Error('\u4E0D\u5B58\u5728\u540D\u4E3A ' + name + ' \u7684\u89C6\u56FE\u6A21\u5757');
                        }

                        done(M);
                    });
                });

                tasks.on('all', function (views) {
                    done && done.apply(undefined, _toConsumableArray(views));
                });

                tasks.parallel();
            }

        };
    });

    /**
    * 包资源加载器。
    * @namespace
    * @name Package
    */
    define('Package', function (require, module, exports) {
        var $ = require('$');
        var Tasks = require('Tasks');
        var Session = require('Session');
        var Defaults = require('Defaults');
        var All = module.require('All');
        var Loader = module.require('Loader');

        var defaults = Defaults.clone(module.id);
        var name$pack = {}; //分包名称对应包信息。
        var loading = null; //加载中 Loading 的实例。
        var prefix = 'KISP.' + module.id + '.' + Session.id;

        //实际加载函数。
        function _load(name, defaults, done) {
            var opt = defaults.load || {};
            var begin = opt.begin;
            var end = opt.end;

            //开始异步加载前的提示函数。
            //如可以在提示函数中创建 loading 实例，并 show() 出来。
            if (begin) {
                loading = begin(require, loading); //开始 loading 提示。
            }

            //加载总包。
            All.load(defaults, function (name$type$url) {
                var type$url = name$type$url[name]; //该名称对应的包资源。

                //不存在该配置节点。
                if (!type$url) {
                    console.warn('\u603B\u5305  ' + defaults.url + ' \u4E2D\u4E0D\u5B58\u5728\u540D\u4E3A ' + name + ' \u7684\u914D\u7F6E\u8282\u70B9\u3002');
                    end && end(require, loading); //结束 loading 提示。
                    done && done(null);
                    return;
                }

                //并行加载对应的资源文件，如 `css`、`html`、`js`。
                Loader.load(type$url, function (pack) {
                    //异步加载结束后的提示函数。
                    //如可以在提示函数中 loading.hide() 进行隐藏。
                    end && end(require, loading);

                    //给外面的回调函数提供一个非缓存版本，以指示是第一次加载的。
                    done && done(pack); //里面 pack.cache = false。
                });
            });
        }

        return {
            /**
            * 加载指定名称的包资源，并在加载完成后执行一个回调。
            * 对于分包资源的加载，支持同一个分包的多次并发请求，实际只会加载一次。 加载完成后会依次执行回调函数。
            * 已重载 load(done);       //加载总包文件。 此时回调函数接受到的数据结构为总包 json 文件中的结构。
            * 已重载 load(name, done); //加载指定名称的分包资源。
            * @param {string} name 分包的资源名称。
            * @param {function} done 加载完成后要执行的回调函数。
            *   该回调函数会接收到一个包资源的数据对象。
            *   可能会包含一种或多种类型。 
            *   也可能是接收到一个 null(说明不存在该名称对应的包信息)。
            *   该名称对应的包资源存在的情况下，回调函数的接收到参数结构：
            *   done({
            *       cache: true|false,  //指示是否从缓存中读取的。
            *       css: {
            *           type: '',       //资源类型。 如 `css`、`html`、`js`。
            *           url: '',        //资源地址。
            *           content: '',    //资源内容。 css 的为空串。
            *       },
            *       html: {
            *           type: '',       //资源类型
            *           url: '',
            *           content: '',
            *       },
            *       js: {
            *           type: '',       //资源类型
            *           url: '',
            *           content: '',
            *       },
            *   });
            */
            load: function load(name, done) {
                //重载 load(done); 
                //加载总包文件。
                if (typeof name == 'function') {
                    done = name;
                    All.load(defaults, done);
                    return;
                }

                //重载 load(name, done);
                //加载分包的资源。
                var pack = name$pack[name];

                //已加载过了，优先使用内存中的缓存。
                //如果为 null，说明已经加载过了但不存在该名称对应的配置节点。
                if (pack || pack === null) {
                    done && done(pack);
                    return;
                }

                //支持同一个分包的多次并发请求，实际只会加载一次。 
                //加载完成后会依次执行回调函数。
                var todo = { 'done': done }; //待办项。
                var sid = name + '@' + prefix;

                Tasks.todo(sid, todo, function (finish) {

                    _load(name, defaults, function (pack) {
                        if (pack) {
                            //保存一个新的缓存版本，供下次直接使用。
                            name$pack[name] = Object.assign({}, pack, {
                                cache: true
                            });
                        } else {
                            //显式填充一个值，用于下次再加载时直接使用。
                            name$pack[name] = null;
                        }

                        finish(function (todo) {
                            todo.done(pack);
                        });
                    });
                });
            }
        };
    });

    /**
    * Package 模块的默认配置
    * @name Package.defaults
    */
    define('Package.defaults', /**@lends Package.defaults*/{

        /**
        * 总包的 url 地址，相对于网站的根地址。
        */
        url: 'packages/all.json',

        /**
        * 是否在总包的 url 地址上加上随机 query 串以刷新缓存。
        */
        random: true,

        /**
        * 总包 url 地址的 query 部分，应该由自动化工具写入相应的 MD5 值。
        * 如果指定，则带在 url 的 query 部分。
        */
        query: null,

        /**
        * 加载总包或分包时的进度提示。
        */
        load: {
            /**
            * 开始加载时总包或分包时的提示函数。
            * @param {function} require 用于加载 KISP 内部模板的 require 方法。
            * @param {Object} loading 上一次创建出来的 Loading 实例。
            */
            begin: function begin(require, loading) {
                if (!loading) {
                    var Loading = require('Loading');
                    loading = new Loading();
                }

                loading.show();
                return loading;
            },

            /**
            * 结束加载时总包或分包时的提示函数。
            * @param {function} require 用于加载 KISP 内部模板的 require 方法。
            * @param {Object} loading 上一次创建出来的 Loading 实例。
            */
            end: function end(require, loading) {
                loading.hide();
            }
        }

    });

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

            var presetting = Presettings[options.presetting] || {}; //预设方案。
            var config = Defaults.clone(module.id, presetting, options); //合并预设配置。

            var emitter = new Emitter(this); //事件驱动器。
            var sample = Sample.get(config.sample); //加载相应的 HTML 模板。
            var style = Style.get(config); //从配置中过滤出样式成员，并进行规范化处理，style 是一个 {}。
            var masker = Masker.create(config); //

            var meta = Meta.create(config, {
                'sample': sample, //相应的 html 模板。
                'style': style, //从配置中过滤出样式成员，并进行规范化处理，style 是一个 {}。
                'emitter': emitter, //事件驱动器。
                'masker': masker, //遮罩层实例。
                'this': this //当前实例，方便内部使用。
            });

            mapper.set(this, meta);

            //对外暴露的属性。
            Object.assign(this, {
                'id': meta.id
            });
        }

        //实例方法
        Loading.prototype = /**@lends Loading#*/{
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
            render: function render() {
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
                    'cssClass': meta.cssClass
                });

                $(meta.container).append(html);

                meta.$ = this.$ = $('#' + meta.id);
                meta.$text = $('#' + meta.textId);

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
            show: function show(text, done) {
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
            hide: function hide() {
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
            remove: function remove() {
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
            on: function on() {
                var _meta$emitter3;

                var meta = mapper.get(this);
                (_meta$emitter3 = meta.emitter).on.apply(_meta$emitter3, arguments);
            },

            /**
            * 销毁本组件。
            */
            destroy: function destroy() {
                var meta = mapper.get(this);

                this.remove();
                meta.emitter.destroy();

                mapper.remove(this);
            }

        };

        return Loading;
    });

    /**
    * Loading 模块的默认配置
    * @name Loading.defaults
    */
    define('Loading.defaults', /**@lends Loading.defaults*/{

        /**
        * 加载中时要显示的文本。
        */
        text: '处理中...',

        /**
        * 是否启用 mask 层。
        */
        mask: false,

        /**
        * 组件用到的 html 模板。
        * 默认为 'IOS'。 业务层不需要关注该字段。
        */
        sample: 'IOS',

        /**
        * 组件添加到的容器。
        */
        container: 'body',

        /**
        * 显示的持续时间(毫秒)。
        * 0 表示一直显示。
        */
        duration: 0,

        /**
        * 组件用到的 css 类名。
        */
        cssClass: '',

        /**
        * 组件的 css 样式 z-index 值。
        * 为了给其它组件计算 `z-index`，此处需要显式提供一个值。
        * 因为仅用 css 中的会比较麻烦。
        */
        'z-index': 1024,

        /**
        * 组件宽度。
        * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
        */
        width: '',

        /**
        * 组件高度。
        * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
        */
        height: '',

        /**
        * 样式集合。
        * 外层的同名字段优先级高于里面的。
        */
        style: {}

    });

    /**
    * 样式工具。
    * @name Style
    */
    define('Style', function (require, module, exports) {
        var $Object = require('Object');

        function _pixelize(value) {
            if (typeof value == 'number') {
                return value + 'px';
            }

            if (typeof value == 'string') {
                var isPixel = /^\d+px$/g.test(value);
                var isEm = /^\d+em$/g.test(value);
                var isRem = /^\d+rem$/g.test(value);
                var isPercent = /^\d+%$/g.test(value);

                if (isPixel || isEm || isRem || isPercent) {
                    return value;
                }

                //尝试提取和转换数字部分。
                var v = parseInt(value);

                if (isNaN(v)) {
                    return value;
                }

                return v + 'px';
            }

            //其它情况。
            return value;
        }

        return exports = /**@lends Style*/{

            /**
            * 把一个样式字符串对象化。
            */
            objectify: function objectify(style) {
                if (!style) {
                    return {};
                }

                if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) == 'object') {
                    return style;
                }

                if (typeof style != 'string') {
                    return {};
                }

                var obj = {};
                var list = style.split(';');

                list.forEach(function (item) {
                    item = item.trim();
                    item = item.replace(/\n/g, '');

                    if (!item) {
                        return;
                    }

                    var a = item.split(':');
                    var key = a[0].trim();
                    var value = a[1].trim();

                    obj[key] = value;
                });

                return obj;
            },

            /**
            * 把一个样式对象字符串化。
            * 以用于 DOM 节点的 style 属性中或 style 标签中。
            * 已重载 stringify(style, spaces);             //
            * 已重载 stringify(style, replacer, spaces);   //style 为一个对象或字符串，replacer 为一个函数，spaces 为一个数值;  
            * 参数：
            *   style: '',      //样式对象或字符串。
            *   replace: fn,    //处理器函数，即替换函数。 如果指定，则针对每一项调用它以获得返回值。 如果不返回任何值，则扔掉该项。
            *   spaces: 4,      //要生成的前导空格数。 如果指定非 0 值，则生成多行的形式；否则生成行内形式。
            */
            stringify: function stringify(style, replacer, spaces) {
                if (!style) {
                    return '';
                }

                if (typeof style == 'string') {
                    style = exports.objectify(style);
                }

                //重载 stringify(style, spaces);
                if (typeof replacer == 'number') {
                    spaces = replacer;
                    replacer = null;
                }

                var a = [];

                $Object.each(style, function (key, value) {

                    //如果指定了处理器函数函数，则调用它以获得返回值。
                    value = replacer ? replacer(key, value) : value;

                    //扔掉空值: null、undefined、''。
                    if (value == null || value === '') {
                        return; // continue;
                    }

                    var s = key + ': ' + value; //如 `width: 100px`

                    if (spaces) {
                        s = new Array(spaces + 1).join(' ') + s; //产生前导空格，如 `    width: 100px`
                    }

                    a.push(s);
                });

                if (a.length == 0) {
                    return '';
                }

                style = spaces ? a.join('; \n') + '; \n' : //如果指定了前导空格，则生成多行形式的。
                a.join('; ') + '; '; //否则生成行内形式的。

                return style;
            },

            /**
            * 把一个样式对象像素化。
            */
            pixelize: function pixelize(style, keys) {
                //重载 pixelize(value);
                //直接传一个值进来，根据情况转换成带像素单位的形式。
                //如 pixelize(100); 得到 `100px`。
                if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) != 'object' && !keys) {
                    return _pixelize(style);
                }

                keys = keys || [];
                style = exports.objectify(style);

                style = $Object.map(style, function (key, value) {
                    //该项并非要处理的项。
                    if (!keys.includes(key)) {
                        return value;
                    }

                    return _pixelize(value);
                });

                return style;
            },

            /**
            * 去掉空值。
            * 即去掉值为 null、undefined、'' 的项。
            */
            trim: function trim(style) {
                var obj = {};

                //过滤掉空值。
                $Object.each(style, function (key, value) {
                    if (value == null || value === '') {
                        return;
                    }

                    obj[key] = value;
                });

                return obj;
            },

            /**
            * 对每一项进行空值过滤，再进行合并得到一个样式对象。
            */
            merge: function merge() {
                for (var _len7 = arguments.length, items = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                    items[_key7] = arguments[_key7];
                }

                //对一个 item 进行处理
                items = items.map(function (item) {
                    if (!item) {
                        return {};
                    }

                    item = exports.trim(item);
                    return item;
                });

                var obj = Object.assign.apply(Object, _toConsumableArray(items));

                return obj;
            }

        };
    });

    /**
    *
    */
    define('Loading/Sample', function (require, module, exports) {

        return {
            get: function get(name) {
                return module.require(name);
            }
        };
    });

    /**
    * 
    */
    define('Loading/Style', function (require, module, exports) {
        var $Object = require('Object');
        var Style = require('Style');

        return {
            /**
            * 从配置对象中过滤出样式成员，并进行规范化处理。
            * 返回一个样式对象 {}。
            */
            get: function get(config) {
                var obj = $Object.filter(config, ['height', 'width', 'z-index']);
                var style = Style.objectify(config.style);

                style = Style.merge(style, obj);
                style = Style.pixelize(style, ['height', 'width']);

                return style;
            }

        };
    });

    define('Loading/Meta', function (require, module, exports) {
        var $ = require('$');
        var $String = require('String');
        var RandomId = require('RandomId');

        var prefix = 'KISP-Loading-'; //用于生成组件 id 的前缀部分。
        var suffix = 4; //用于生成组件 id 的随机部分的长度。

        return {
            create: function create(config, others) {
                var id = RandomId.get(prefix, suffix);
                var textId = RandomId.get(prefix, 'text-', suffix);

                var meta = {
                    'id': id,
                    'textId': textId,
                    'text': config.text || '',
                    'cssClass': config.cssClass || '',
                    'container': config.container,
                    'duration': config.duration || 0,

                    'sample': '',
                    'masker': null, // Mask 的实例，重复使用。
                    'style': null, //样式对象。
                    'emitter': null, //事件驱动器。
                    'this': null, //当前实例，方便内部使用。
                    '$': null, //组件最外层的 DOM 节点的 jQuery 实例。
                    '$text': null //$(textId)。

                };

                Object.assign(meta, others);

                return meta;
            }
        };
    });

    /**
    * 随机 id 生成器。
    * @name RandomId
    */
    define('RandomId', function (require, module, exports) {

        var $String = require('String');

        return (/**@lends RandomId*/{

                /**
                * 根据指定的规则生成一个随机 id。
                */
                get: function get() {
                    for (var _len8 = arguments.length, list = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                        list[_key8] = arguments[_key8];
                    }

                    list = list.map(function (item, index) {

                        if (typeof item == 'number') {
                            item = $String.random(item);
                            item = item.toLowerCase();
                        }

                        return item;
                    });

                    return list.join('');
                }

            }
        );
    });

    define('Loading/Masker', function (require, module, exports) {
        var $ = require('$');

        return {
            create: function create(config) {
                var Mask = require('Mask');

                var defaults = {
                    'container': config.container
                };

                var options = Mask.normalize(defaults, config.mask); //返回一个 {} 或 null。

                if (!options) {
                    return null;
                }

                var masker = new Mask(options);
                var zIndex = config['z-index'] - 1;

                masker.on('render', function () {
                    masker.$.css({
                        'z-index': zIndex
                    });
                });

                return masker;
            }
        };
    });

    /**
    * 遮罩层组件。
    * @class
    * @name Mask
    */
    define('Mask', function (require, module, exports) {
        var Emitter = require('Emitter');
        var $String = require('String');
        var Defaults = require('Defaults');

        var Sample = module.require('Sample');
        var Style = module.require('Style');
        var Meta = module.require('Meta');

        var mapper = new Map();

        /**
        * 构造器。
        * @constructor
        */
        function Mask(config) {
            config = Defaults.clone(module.id, config);

            var emitter = new Emitter(this);
            var style = Style.get(config);

            var meta = Meta.create(config, {
                'sample': Sample, //相应的 html 模板。
                'style': style, //从配置中过滤出样式成员，并进行规范化处理，style 是一个 {}。
                'emitter': emitter, //事件驱动器。
                'this': this //当前实例，方便内部使用。
            });

            mapper.set(this, meta);

            //对外暴露的属性。
            Object.assign(this, {
                'id': meta.id
            });
        }

        Mask.prototype = /**@lends Mask#*/{
            constructor: Mask,

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
            * 渲染本组件。
            * 该方法会创建 DOM 节点，并且绑定事件，但没有调用 show()。
            * 该方法只需要调用一次。
            * 触发事件: `render`。
            */
            render: function render() {
                var meta = mapper.get(this);

                //已经渲染过了。
                if (meta.$) {
                    return;
                }

                //首次渲染
                var Style = require('Style');
                var style = Style.stringify(meta.style);

                var html = $String.format(meta.sample, {
                    'id': meta.id,
                    'style': style
                });

                $(meta.container).append(html);

                this.$ = meta.$ = $('#' + meta.id);

                //根据是否指定了易消失来绑定事件，即点击 mask 层就隐藏。
                meta.bindVolatile(function () {
                    var ok = meta.this.hide();

                    //在 hide() 中明确返回 false 的，则取消关闭。
                    if (ok === false) {
                        return;
                    }

                    //先备份原来的 opacity
                    var opacity = meta.$.css('opacity');

                    //显示一个完全透明的层 200ms，防止点透。
                    //并且禁用事件，避免触发 show 事件。
                    meta.$.css('opacity', 0);
                    meta.this.show({ quiet: true });

                    setTimeout(function () {
                        meta.$.css('opacity', opacity);
                        meta.$.hide();
                    }, 200);
                });

                meta.emitter.fire('render');
            },

            /**
            * 显示遮罩层。
            * 触发事件: `show`。
            *   config = {
            *       quiet: false,   //是否触发 `show` 事件。 该选项仅开放给组件内部使用。
            *       duration: 0,    //要持续显示的时间，单位是毫秒。 如果不指定，则使用创建实例时的配置。
            *   };
            */
            show: function show(config) {
                config = config || {};

                var meta = mapper.get(this);
                var duration = 'duration' in config ? config.duration : meta.duration;

                //尚未渲染。
                //首次渲染。
                if (!meta.$) {
                    this.render();
                }

                if (duration) {
                    setTimeout(function () {
                        meta.this.hide();
                    }, duration);
                }

                meta.$.show();

                //没有明确指定要使用安静模式，则触发事件。
                if (!config.quiet) {
                    meta.emitter.fire('show');
                }
            },

            /**
            * 隐藏遮罩层。
            * 触发事件: `hide`。
            */
            hide: function hide() {
                var meta = mapper.get(this);

                //尚未渲染。
                if (!meta.$) {
                    return;
                }

                var values = meta.emitter.fire('hide');

                //明确返回 false 的，则取消关闭。
                if (values.includes(false)) {
                    return false;
                }

                meta.$.hide();
            },

            /**
            * 移除本组件已生成的 DOM 节点。
            * 触发事件: `remove`。
            */
            remove: function remove() {
                var meta = mapper.get(this);

                //尚未渲染。
                if (!meta.$) {
                    return;
                }

                var div = meta.$.get(0);
                div.parentNode.removeChild(div);

                meta.$.off();

                this.$ = meta.$ = null;
                meta.emitter.fire('remove');
            },

            /**
            * 绑定事件。
            */
            on: function on() {
                var _meta$emitter4;

                var meta = mapper.get(this);
                (_meta$emitter4 = meta.emitter).on.apply(_meta$emitter4, arguments);
            },

            /**
            * 销毁本组件
            */
            destroy: function destroy() {
                var meta = mapper.get(this);

                this.remove();
                meta.emitter.destroy();

                mapper.delete(this);
            }

        };

        //静态方法
        Object.assign(Mask, /**@lends Mask*/{

            /**
            * 把配置参数规格化。
            * 已重载 normalize(0, 0);              //任意一个为数字，则当成透明度。 如果都为数字，则使用后者的。   
            * 已重载 normalize(defaults, false);   //第二个参数显式指定了要禁用 mask，返回 null。
            * 已重载 normalize({}, {});
            */
            normalize: function normalize(defaults, config) {

                //第二个参数显式指定了要禁用 mask。
                if (config === false) {
                    return null;
                }

                //输入的是数字，则当成是透明度。
                if (typeof defaults == 'number') {
                    //透明度
                    defaults = { 'opacity': defaults };
                }

                if (typeof config == 'number') {
                    //透明度
                    config = { 'opacity': config };
                }

                var type0 = typeof defaults === 'undefined' ? 'undefined' : _typeof(defaults);
                var type1 = typeof config === 'undefined' ? 'undefined' : _typeof(config);

                if (type0 == 'object' && type1 == 'object') {
                    return Object.assign({}, defaults, config);
                }

                //显式指定使用 mask。
                //如果 defaults 没有，则显式分配一个。
                if (config === true) {
                    return !defaults || type0 != 'object' ? {} : defaults;
                }

                //未指定，则使用默认配置指定的，有或没有
                if (config === undefined) {
                    return type0 == 'object' ? defaults : defaults ? {} : null;
                }

                return type1 == 'object' ? config : config ? {} : null;
            }

        });

        return Mask;
    });

    /**
    * Mask 模块的默认配置
    * @name Mask.defaults
    */
    define('Mask.defaults', /**@lends Mask.defaults*/{
        /**
        * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
        * 可取值为: true|false|"hide"|"remove"，默认为 false，即不易消失。
        */
        volatile: false,

        /**
        * 组件添加到的容器。
        */
        container: 'body',

        /**
        * 点击时需要用到的事件名。
        */
        eventName: 'click',

        /**
        * 需要持续显示的毫秒数。
        * 指定为 0 或不指定则表示一直显示。
        */
        duration: 0,

        /**
        * 组件用到的 css 类名。
        */
        cssClass: '',

        /**
        * 不透明度。
        */
        opacity: '',

        /**
        * 组件的 css 样式 z-index 值。
        */
        'z-index': 1024,

        /**
        * 样式集合。
        * 外层的同名字段优先级高于里面的。
        */
        style: {}

    });

    /**
    * Mask 模块的默认配置
    * @name Mask.config
    */
    define('Mask.config', /**@lends Mask.config*/{
        /**
        * 点击时需要用到的事件名。
        */
        eventName: 'click'

    });

    /*
    * Mask/Sample
    * 由 kisp-packer 生成。 
    * 来源: ../build/pc/8.1.0/src/ui/mask/Mask/Sample.html
    */
    define('Mask/Sample', ['<div id="{id}" class="KISP Mask" style="{style} display: none;"></div>'].join('\n'));

    /**
    *
    */
    define('Mask/Style', function (require, module, exports) {
        var $Object = require('Object');
        var Style = require('Style');

        return {

            /**
            * 从配置对象中过滤出样式成员，并进行规范化处理。
            * 返回一个样式对象 {}。
            */
            get: function get(config) {
                var obj = $Object.filter(config, ['opacity', 'z-index']);
                var style = Style.objectify(config.style);

                style = Style.merge(style, obj);

                return style;
            }
        };
    });

    define('Mask/Meta', function (require, module, exports) {
        var $ = require('$');
        var $String = require('String');
        var RandomId = require('RandomId');

        var prefix = 'KISP-Mask-'; //����������� id ��ǰ׺���֡�
        var suffix = 4; //����������� id ��������ֵĳ��ȡ�


        return {
            create: function create(config, others) {
                var id = RandomId.get(prefix, suffix);
                var eventName = config.eventName;
                var volatile = config.volatile;

                var meta = {
                    'id': id,
                    'sample': '',
                    'eventName': eventName, //���� PC �˺��ƶ��ˡ� PC �˵�Ϊ `click`���ƶ��˵�Ϊ `touch`��
                    'volatile': volatile, //�Ƿ�����ʧ�ġ� ��������Զ����ء�
                    'container': config.container, //���Ҫװ������� DOM �ڵ㡣
                    'duration': config.duration, //Ҫ������ʾ��ʱ�䣬��λ�Ǻ��롣

                    'emitter': null, //�¼���������
                    'style': null, //��ʽ����
                    'this': null, //��ǰʵ���������ڲ�ʹ�á�
                    '$': null, //��������� DOM �ڵ�� jQuery ʵ����

                    'bindVolatile': function bindVolatile(fn) {
                        if (!volatile) {
                            return;
                        }

                        if (eventName == 'touch') {
                            meta.$.touch(fn);
                        } else {
                            meta.$.on(eventName, fn);
                        }
                    }
                };

                Object.assign(meta, others);

                return meta;
            }
        };
    });

    /**
    * Loading 的预设配置。
    */
    define('Loading/Presettings', {

        fullscreen: {
            cssClass: 'FullScreen'
        },

        'scroller.pulldown': {
            sample: 'IOS',
            cssClass: 'SameLine Pulldown',
            text: '加载中...'

        },

        'scroller.pullup': {
            sample: 'IOS',
            cssClass: 'SameLine Pullup',
            text: '加载中...'
        }

    });

    /**
    * 会话。
    * @name Session
    */
    define('Session', function (require, module, exports) {
        var $String = require('String');
        var Defaults = require('Defaults');
        var defaults = Defaults.get(module.id);

        var length = defaults.length || 16;
        var id = $String.random(length); //每次运行首先确定，且不会再变。


        return {
            'id': id
        };
    });

    /**
    * Session 模块的默认配置
    * @name Session.defaults
    */
    define('Session.defaults', /**@lends Session.defaults*/{
        /**
        * 会话随机 id 的长度。
        */
        length: 16
    });

    /**
    * 总包。
    */
    define('Package/All', function (require, module, exports) {
        var $ = require('$');
        var Query = require('Query');
        var Url = require('Url');
        var Tasks = require('Tasks');
        var Session = require('Session');

        var sid = 'all@KISP.' + module.id + '.' + Session.id;
        var all = null;

        //根据配置项生成最终的 url 地址。
        function makeUrl(options) {
            var url = Url.root() + options.url;
            var query = options.query;

            if (typeof query == 'string') {
                query = Query.parse(query);
            }

            if (query) {
                url = Query.add(url, query);
            }

            if (options.random) {
                url = Query.random(url, 4);
            }

            return url;
        }

        function _load2(options, done) {
            var url = makeUrl(options);

            $.ajax({
                type: 'get',
                dataType: 'json',
                url: url,

                error: function error() {
                    all = {};
                    done && done(all);
                },

                success: function success(json) {
                    all = json;
                    done && done(all);
                }
            });
        }

        return {
            /**
            * 用异步的方式加载总包文件。
            * 即 `packages/all.json` 文件。
            * 该方法会优先使用之前加载过的缓存。
            *   options = {
            *       url: '',
            *       query: {},
            *       random: true,
            *   };
            */
            load: function load(options, done) {
                if (all) {
                    done && done(all);
                    return;
                }

                Tasks.todo(sid, done, function (finish) {

                    _load2(options, function (all) {
                        finish(function (done) {
                            done && done(all);
                        });
                    });
                });
            }
        };
    });

    define('Package/Loader', function (require, module, exports) {
        var Tasks = require('Tasks');

        //内部用的空函数。
        function noop() {}

        var type$load = {
            /**
            * 加载 css 文件。
            *   url: '',        //要加载的文件的 url 地载。
            *   success: fn,    //加载成功后的回调函数。
            */
            css: function css(url, success) {
                var link = document.createElement('link');

                link.onerror = function () {
                    throw new Error('css \u6587\u4EF6\u52A0\u8F7D\u5931\u8D25: ' + url);
                };

                link.onload = function () {
                    success && success({
                        'url': url,
                        'content': '' //这里无法也不需要获取内容。
                    });
                };

                link.rel = 'stylesheet';
                link.href = url;

                document.head.appendChild(link);
            },

            /**
            * 加载 html 文件。
            *   url: '',        //要加载的文件的 url 地载。
            *   success: fn,    //加载成功后的回调函数。
            */
            html: function html(url, _success) {
                $.ajax({
                    type: 'get',
                    url: url,
                    dataType: 'html',
                    cache: true, //不需要加随机数。
                    error: function error(ajax, msg, _error) {
                        throw _error;
                    },

                    success: function success(content, msg, ajax) {
                        _success && _success({
                            'url': url,
                            'content': content
                        });
                    }
                });
            },

            /**
            * 加载 js 文件。
            *   url: '',        //要加载的文件的 url 地载。
            *   success: fn,    //加载成功后的回调函数。
            */
            js: function js(url, _success2) {
                $.ajax({
                    type: 'get',
                    url: url,
                    dataType: 'script',
                    cache: true, //不需要加随机数。
                    error: function error(ajax, msg, _error2) {
                        throw _error2;
                    },
                    success: function success(content, msg, ajax) {
                        _success2 && _success2({
                            'url': url,
                            'content': content
                        });
                    }
                });
            },

            /**
            * 加载 json 文件。
            *   url: '',        //要加载的文件的 url 地载。
            *   done: fn,       //加载成功后的回调函数。
            */
            json: function json(url, done) {
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: url,

                    error: function error() {
                        done && done({});
                    },

                    success: function success(json) {
                        done && done(json);
                    }
                });
            }

        };

        return {
            /**
            * 并行加载指定的资源文件。
            */
            load: function load(type$url, done) {

                var types = Object.keys(type$url); //如 ['css', 'html', 'js'];

                //并行加载。
                Tasks.parallel(types, {

                    //针对加载完成某一项。
                    each: function each(type, index, done) {
                        var url = type$url[type];
                        var load = type$load[type];

                        if (!load) {
                            throw new Error('\u4E0D\u652F\u6301\u52A0\u8F7D ' + type + ' \u7C7B\u578B\u7684\u6587\u4EF6\u3002');
                        }

                        load(url, function (data) {
                            done({
                                'type': type,
                                'url': data.url,
                                'content': data.content
                            });
                        });
                    },

                    //全部完成。
                    all: function all(items) {

                        var pack = {
                            cache: false //指示不是从缓存中读取的。
                        };

                        items.forEach(function (item) {
                            pack[item.type] = item;
                        });

                        done && done(pack);
                    }
                });
            }
        };
    });

    /**
    * 视图组件。
    * View 是一种特殊的 Panel。
    * 设计 View 类型，是为了从语义上与 Panel 更合理地区分开来。
    * @class
    * @name View
    */
    define('View', function (require, module, exports) {
        var Defaults = require('Defaults');
        var Panel = require('Panel');

        var defaults = Defaults.get(module.id);

        /**
        * 构造器。
        * @constructor
        */
        function View(container, config) {
            config = Defaults.clone(module.id, config);

            var panel = new Panel(container, config);
            var background = config.background;

            panel.$.addClass('KISP View'); //这两个类名必须加上。

            //针对移动端的全屏视图模式。
            //这里只负责有针对性的加上 `FullScreen` 类，而不用去掉该类。
            //因为业务层可能自行加上了该类，但 fullscreen 为 false。
            if (config.fullscreen) {
                panel.$.addClass('FullScreen');
            }

            if (background) {
                panel.$.css('background', background);
            }

            return panel;
        }

        return Object.assign(View, {

            /**
            * 提供一种按标准方法定义视图的方式。
            */
            define: function define(id, factory) {
                Panel.define(id, factory, {
                    'constructor': View,
                    'defaults': defaults
                });
            },

            /**
            * 更新容器。
            * 已重载 update(id);   //更新单个。
            * 已重载 update(ids);  //更新多个。
            */
            update: function update(ids) {
                Panel.update(ids, {
                    'defaults': defaults
                });
            }

        });
    });

    /**
    * View 模块的默认配置
    * @name View.defaults
    */
    define('View.defaults', /**@lends View.defaults*/{
        /**
        * 所关联的 DOM 节点容器的选择器模板。
        */
        container: '[data-view="{id}"]',

        /**
        * 背景样式。
        */
        background: '',

        /**
        * 是否启用全屏视图模式。
        * 全屏视图主要针对移动端。
        */
        fullscreen: false

    });

    /**
    * View 模块的默认配置
    * @name View.config
    */
    define('View.config', /**@lends View.config*/{
        /**
        * 是否启用全屏视图模式。
        * 全屏视图主要针对移动端。
        */
        fullscreen: false

    });

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
                'moudle': null, //如果非空，则是由 Panel.define() 创建的，此时 container='[data-panel="xx"]'。
                'container': container, //
                '$emitter': new Emitter(), //供外部用的事件管理器。
                'emitter': new Emitter(this), //内部使用的事件管理器。
                '$': $(container), //当前实例关联的 DOM 节点对应的 jQuery 实例。
                'this': this //方便内部使用。
            });

            mapper.set(this, meta);

            //对外暴露的属性。
            Object.assign(this, {
                'container': container,
                'id': meta.id,
                '$': meta.$
            });
        }

        //实例方法
        Panel.prototype = /**@lends Panel#*/{
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
            render: function render() {
                var meta = mapper.get(this);
                var emitter = meta.emitter;

                //首次 render。

                for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                    args[_key9] = arguments[_key9];
                }

                if (!meta.rendered) {
                    meta.rendered = true; //要放在此处。
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
            show: function show() {
                var _meta$$;

                var meta = mapper.get(this);

                (_meta$$ = meta.$).show.apply(_meta$$, arguments);
                meta.visible = true;

                //外面可能会用到事件返回值。
                return meta.emitter.fire('show');
            },

            /**
            * 隐藏本组件。
            * 触发事件: `hide`。
            */
            hide: function hide() {
                var _meta$$2;

                var meta = mapper.get(this);

                (_meta$$2 = meta.$).hide.apply(_meta$$2, arguments);
                meta.visible = false;

                //外面可能会用到事件返回值。
                return meta.emitter.fire('hide');
            },

            /**
            * 切换显示或隐藏本组件。
            */
            toggle: function toggle(needShow) {
                var meta = mapper.get(this);

                //重载 toggle(); 
                //未指定参数，则根据原有状态进行切换。
                if (arguments.length == 0) {
                    meta.visible ? this.hide() : this.show();
                } else {
                    needShow ? this.show() : this.hide();
                }

                //返回更改后的可见状态。
                return meta.visible;
            },

            /**
            * 设置模板填充的规则，为模板填充进行预处理。
            */
            template: function template(process) {
                var meta = mapper.get(this);
                var tpl = meta.tpl;

                if (!tpl) {
                    tpl = meta.tpl = new Template(meta.container);
                }

                if (process) {
                    var _tpl;

                    (_tpl = tpl).process.apply(_tpl, arguments);
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
            fill: function fill(data, fn) {
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
            refresh: function refresh() {
                var meta = mapper.get(this);
                var args = meta.renderArgs;

                this.render.apply(this, _toConsumableArray(args));

                //外面可能会用到事件返回值。
                return meta.emitter.fire('refresh', args);
            },

            /**
            * 重置。
            * 触发事件: `reset`。
            */
            reset: function reset() {
                var meta = mapper.get(this);

                //外面可能会用到事件返回值。

                for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                    args[_key10] = arguments[_key10];
                }

                return meta.emitter.fire('reset', args);
            },

            /**
            * 获取一个状态，该状态表示本组件是否为显示状态。
            */
            visible: function visible() {
                var meta = mapper.get(this);
                return meta.visible;
            },

            /**
            * 获取一个状态，该状态表示本组件是否已渲染过。
            */
            rendered: function rendered() {
                var meta = mapper.get(this);
                return meta.rendered;
            },

            /**
            * 触发外部的事件。
            */
            fire: function fire() {
                var _meta$$emitter;

                var meta = mapper.get(this);

                //外面可能会用到事件返回值。
                return (_meta$$emitter = meta.$emitter).fire.apply(_meta$$emitter, arguments);
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
            $on: function $on(name, selector$fn) {
                var name$selector$fn = null;

                if (typeof name == 'string') {
                    //重载 $on(name, selector$fn);
                    //单个事件，多个元素的情况。
                    name$selector$fn = _defineProperty({}, name, selector$fn);
                } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
                    //重载 $on(name$selector$fn);
                    //多个事件，多个元素的情况。
                    name$selector$fn = name;
                } else {
                    throw new Error('\u65E0\u6CD5\u8BC6\u522B\u53C2\u6570 name \u7684\u7C7B\u578B\u3002');
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
            $bind: function $bind(selector, name$fn) {
                var selector$name$fn = null;

                if (typeof selector == 'string') {
                    //重载 $bind(selector, name$fn);
                    //单个元素，多个事件的情况。
                    selector$name$fn = _defineProperty({}, selector, name$fn);
                } else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') {
                    //重载 $bind(selector$name$fn);
                    //多个元素，多个事件的情况。
                    selector$name$fn = selector;
                } else {
                    throw new Error('\u65E0\u6CD5\u8BC6\u522B\u53C2\u6570 selector \u7684\u7C7B\u578B\u3002');
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
            wrap: function wrap(obj) {
                var meta = mapper.get(this);
                var panel = meta.panel;

                if (panel) {
                    return panel;
                }

                obj = obj || {};
                panel = meta.panel = {};

                //忽略的成员。
                var ignores = new Set(['constructor', 'fire', 'wrap']);

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
                    'off': meta.$emitter.off.bind(meta.$emitter)
                });

                return panel;
            },

            /**
            * 传播指定模块的事件列表。
            * 用于透传子模块的事件给父级。
            */
            propagate: function propagate(M, names) {
                var meta = mapper.get(this);

                names.forEach(function (name) {
                    M.on(name, function () {
                        for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                            args[_key11] = arguments[_key11];
                        }

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
            set: function set(key, value) {
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
                        throw new Error('\u76EE\u524D\u4E0D\u652F\u6301\u8BBE\u7F6E\u5C5E\u6027: ' + key);
                }
            },

            /**
            * 销毁本组件。
            */
            destroy: function destroy() {
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
            on: function on() {
                var _meta$emitter5;

                var meta = mapper.get(this);
                (_meta$emitter5 = meta.emitter).on.apply(_meta$emitter5, arguments);
            }

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
            define: function define(id, factory, options) {
                options = options || {
                    'constructor': Panel,
                    'defaults': defaults
                };

                OuterModule.define(id, function ($require, $module, $exports) {
                    var container = Container.get(id, options.defaults); //如 `[data-panel="/Users/Main"]`。
                    var panel = new options.constructor(container);
                    var meta = mapper.get(panel);

                    meta.module = panel.module = $module; //指示此 panel 由 Panel.define() 创建的。

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
            update: function update(ids, options) {
                ids = Array.isArray(ids) ? ids : [ids];

                options = options || {
                    'defaults': defaults
                };

                ids.forEach(function (id) {
                    var panel = id$panel[id];
                    var container = Container.get(id, options.defaults); //如 `[data-panel="/Users/Main"]`。

                    if (!panel) {
                        console.warn('\u4E0D\u5B58\u5728 ' + container + ' \u7684 Panel \u5B9E\u4F8B\u3002');
                        return;
                    }

                    panel.set('container', container);
                });
            }

        });

        return Panel;
    });

    /**
    * Panel 模块的默认配置
    * @name Panel.defaults
    */
    define('Panel.defaults', /**@lends Panel.defaults*/{
        /**
        * 所关联的 DOM 节点容器的选择器模板。
        */
        container: '[data-panel="{id}"]',

        /**
        * 是否在组件 render 后自动调用 show() 方法以进行显示。
        */
        show: true

    });

    /**
    * 模板类。
    */
    define('Template', function (require, module, exports) {
        var $String = require('String');
        var $Object = require('Object');
        var Emitter = require('Emitter');

        var Meta = module.require('Meta');
        var Parser = module.require('Parser');
        var Sample = module.require('Sample');
        var Child = module.require('Child');

        var mapper = new Map();

        /**
        * 构造器。
        * 参数：
        *   selector: '' | DOM | jQuery | {}, //DOM 节点或选择器。 也可以是一个分析到的数据结构对象。
        */
        function Template(selector) {
            //如果传入的是一个纯对象，则认为是内部解析到的数据结构。
            //即要从一个已解析到的数据对象中创建实例。
            var isParsedData = $Object.isPlain(selector);

            var meta = Meta.create({
                'emitter': new Emitter(this),
                'this': this
            });

            mapper.set(this, meta);

            //传入的是一个普通的 DOM 节点或其选择器。
            if (!isParsedData) {
                var node = $(selector).get(0); //包装、拆装，可以让入参多样化。

                if (!node) {
                    selector = selector instanceof $ ? selector.selector : selector;
                    throw new Error('不存在模板节点: ' + selector);
                }

                var isTPL = node.nodeName.toLowerCase() == 'template'; //判断是否为 <template> 模板节点。
                var html = node.innerHTML;
                var info = Parser.parse(html);

                meta.sample = Sample.between(html);
                meta.name = isTPL ? node.getAttribute('name') : '';
                meta.placeholder = isTPL ? node.getAttribute('placeholder') : '';
                meta.innerHTML = html;
                meta.outerHTML = node.outerHTML;
                meta.node = node;

                meta.tpls = info.tpls.map(function (item) {
                    var tpl = Child.create(Template, meta, item);
                    var sample = meta.sample;

                    meta.sample = Sample.replace(sample, item); //替换掉当前模板在父模板中的内容。

                    return tpl;
                });
            } else {
                //传入的是一个已解析到的数据对象。
                var item = selector;

                Meta.assign(meta, item);

                meta.tpls = item.items.map(function (item) {
                    var tpl = Child.create(Template, meta, item);

                    return tpl;
                });
            }

            /**
            * 这里增加个限制：
            * 某一层里只允许出现一个纯 `<template>` 标签，且不允许再嵌套子级 `<template>` 标签。
            * 纯 `<template>` 标签是指无 `name` 和 `placeholder` 属性的 `<template>` 标签。
            * 这段逻辑会把该 template 实例中的 sample 上升为父级实例的 sample 值。
            * 这样可以方便把一级模板用一对 `<template></template>` 标签括起来，等价于直接注释掉当模板的方式，
            * 但比后者多了个语法高亮的优点。 例如：
            *   <ul>
            *       <template>
            *           <li></li>
            *       </temlate>
            *   </ul>
            * 与传统的用注释方式是等价的：
            *   <ul>
            *       <!--
            *       <li></li>
            *       -->
            *   </ul>
            */
            (function () {
                //获取空白名称的直接子级 tpl。
                var tpl = meta.name$tpl[''];

                if (!tpl) {
                    return;
                }

                //空白名称的直接子级 tpl 对应 meta。
                var tplMeta = mapper.get(tpl);
                var keys = Object.keys(tplMeta.name$tpl);

                if (keys.length > 0) {
                    throw new Error('无名称的 template 标签下不能再嵌套子级 template。');
                }

                if (tplMeta.placeholder) {
                    throw new Error('无名称的 template 标签不能设置 placeholder 属性。');
                }

                //把空白名称的直接子级 tpl 的 sample 当成本级的 sample。
                meta.sample = tplMeta.sample;
            })();

            //对外暴露的属性。
            Object.assign(this, {
                'id': meta.id,
                '_meta': meta //用于测试。
            });
        }

        //实例成员。
        Template.prototype = {
            constructor: Template,

            /**
            * 当前实例的 id。
            */
            id: '',

            /**
            * 父实例。
            */
            parent: null,

            /**
            * 获取指定名称(或由多个名称组成的路径)节点所对应的下级 Template 实例。
            * 已重载 template(names);                      //传入子模板的名称列表。
            * 已重载 template(name0, name1, ..., nameN);   //依次传入多个子模板的名称。
            */
            template: function template(names) {
                //重载 template(name0, name1, ..., nameN); 
                if (!Array.isArray(names)) {
                    names = [].concat(Array.prototype.slice.call(arguments));
                }

                //从当前实例开始。
                var tpl = this;
                var meta = mapper.get(tpl);

                names.map(function (name) {
                    tpl = meta.name$tpl[name]; //取子级的实例。
                    meta = mapper.get(tpl); //子级实例对应的元数据。
                });

                return tpl;
            },

            /**
            * 获取指定名称(或由多个名称组成的路径)节点所对应的下级 sample 模板。
            */
            sample: function sample() {
                for (var _len12 = arguments.length, names = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                    names[_key12] = arguments[_key12];
                }

                var tpl = this.template.apply(this, names);
                var meta = mapper.get(tpl);

                if (!meta) {
                    throw new Error('\u5F53\u524D\u5B9E\u4F8B\u4E0B\u4E0D\u5B58\u5728\u540D\u79F0\u8DEF\u5F84\u4E3A ' + names.join(' ') + ' \u7684 Template \u5B50\u5B9E\u4F8B\u3002');
                }

                return meta.sample;
            },

            /**
            * 对当前模板进行填充，并用填充后的 html 字符串渲染容器节点。
            * @param {Object|Array} data 要填充的数据，可以是一个对象或数组。
            * @param {function} process 填充规则的处理器，即处理函数。
            * @return 填充后的 html 内容。
            */
            render: function render(data, process) {
                if (process) {
                    this.process(process);
                }

                var meta = mapper.get(this);
                var node = meta.node;
                var html = this.fill(data);

                if (node) {
                    node.innerHTML = html;
                }

                return html;
            },

            /**
            * 对当前模板及子模板(如果有)进行填充。
            * 已重载 fill(data);
            * 已重载 fill(data, param0, ..., paramN);
            * 已重载 fill(name0, name1, ..., nameN, data);
            * 已重载 fill(name0, name1, ..., nameN, data, param0, ..., paramN);
            * @return {string} 返回填充后的 html 字符串。
            */
            fill: function fill(data) {
                for (var _len13 = arguments.length, params = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
                    params[_key13 - 1] = arguments[_key13];
                }

                //重载 fill(name0, name1, ..., nameN, data, param0, ..., paramN);
                //即一步到位填充指定路径的子模板。

                //全部参数列表。
                var args = [].concat(Array.prototype.slice.call(arguments));

                //找出 data 在参数列表中所在的位置。
                var index = args.findIndex(function (item) {
                    return Array.isArray(item) || $Object.isPlain(item);
                });

                //参数列表中没找到任何可用于填充的数据。
                if (index < 0) {
                    throw new Error('填充模板时必须指定数据为一个数组或纯对象。');
                }

                //找到该数据，但它前面有子模板的名称。
                //使用子模板进行填充。
                if (index > 0) {
                    var names = args.slice(0, index); //子模板名称列表，[name0, name1, ..., nameN];
                    var tpl = this.template.apply(this, _toConsumableArray(names));

                    if (!tpl) {
                        throw new Error('\u4E0D\u5B58\u5728\u8DEF\u5F84\u4E3A ' + names.join('.') + ' \u7684\u6A21\u677F\u8282\u70B9\uFF0C\u8BF7\u68C0\u67E5 html \u6A21\u677F\u6811\u3002');
                    }

                    var rest = args.slice(index); //[data, param0, ..., paramN];
                    var html = tpl.fill.apply(tpl, _toConsumableArray(rest));
                    return html;
                }

                //以下情况是直接传入数据进行填充的，不存在传入子模板的情况。

                var meta = mapper.get(this);

                //这里不要缓存 sample，应该实时去获取 meta.sample，
                //因为它可能在 process 函数中给使用者调用了 this.fix() 更改了。
                //var sample = meta.sample; !!!

                //单个纯对象形式。
                if (!Array.isArray(data)) {
                    meta.emitter.fire('process', args);

                    //调用处理器获得填充数据。
                    //此处特意让处理器函数获得 `this` 执行环境。
                    data = meta.process.apply(meta.this, args);

                    //处理器已直接返回 html 内容，则不需要用模板去填充。
                    if (typeof data == 'string') {
                        return data;
                    }

                    var html = $String.format(meta.sample, data);
                    return html;
                }

                //传进来的是一个数组，则迭代每一项去填充。
                //每一项都会调用处理器函数，并传递一些参数。
                var htmls = data.map(function (item, index) {
                    //传给处理器的参数列表。
                    //除了传当前迭代的 item 和 index 外，还把 params 也一同传过去。
                    //params 就是用户在 fill(data, ...params) 传进来的、data 后面的其它参数。
                    //params 用于透传给处理器函数。
                    var args = [item, index].concat(params);

                    meta.emitter.fire('process', args);

                    //调用处理器获得填充数据。
                    //此处特意让处理器函数获得 `this` 执行环境。
                    var data = meta.process.apply(meta.this, args);

                    //处理器已直接返回 html 内容，则不需要用模板去填充。
                    if (typeof data == 'string') {
                        return data;
                    }

                    if (!data) {
                        return ''; //这里要返回空串。
                    }

                    var html = $String.format(meta.sample, data);
                    return html;
                });

                return htmls.join('');
            },

            /**
            * 设置模板填充的处理规则。
            * 已重载 process(fn);      //设置当前实例的处理器。
            * 已重载 process({...});   //批量设置当前实例以及子实例的处理器。                 
            * 已重载 process(name0, ..., nameN, fn);       //设置路径为 `name0->name1->...->nameN` 的子实例的处理器。
            * 已重载 process(name0, ..., nameN, {...});    //批量设置前缀路径为`name0->name1->...->nameN` 的子实例的处理器。
            */
            process: function process(_process) {
                var meta = mapper.get(this);

                //重载 process(fn); 
                //设置当前实例的 process 处理函数。
                if (typeof _process == 'function') {
                    meta.process = _process;
                    return;
                }

                var args = [].concat(Array.prototype.slice.call(arguments));

                //查找处理器所在的位置。
                var index = args.findIndex(function (item) {
                    return typeof item == 'function' || $Object.isPlain(item);
                });

                if (index < 0) {
                    throw new Error('\u6A21\u677F\u8282\u70B9 ' + meta.name + ' \u7F3A\u5C11\u5904\u7406\u5668\u3002');
                }

                //前面存在前缀名称，则跟后面的处理器合并为一个完整对象，方便后续统一处理。
                //如 process('A', 'B', 'C', process); 则合并为 { A: { B: { C: process } } };
                if (index > 0) {
                    var keys = args.slice(0, index); //如 ['A', 'B', ]
                    var item = args[index]; //

                    _process = $Object.make({}, keys, item); //此时 process 是一个 {...}。
                }

                //展开成扁平结构。
                //如：list = [ { keys: ['A', 'B', 'C'], value: fn, } ];
                var list = $Object.flat(_process);

                list.forEach(function (item) {
                    //去掉空字符串。 因为空串是代表自身。
                    var keys = item.keys.filter(function (key) {
                        return !!key;
                    });

                    var value = item.value;

                    if (typeof value != 'function') {
                        throw new Error('\u6A21\u677F\u8282\u70B9 ' + keys.join('.') + ' \u7684\u5904\u7406\u5668\u5FC5\u987B\u4E3A\u4E00\u4E2A\u51FD\u6570\u3002');
                    }

                    var tpl = meta.this.template(keys);

                    if (!tpl) {
                        console.warn('\u4E0D\u5B58\u5728\u6A21\u677F\u8282\u70B9: ' + keys.join('.'));
                        return;
                    }

                    //此时 value 为一个函数。
                    tpl.process(value);
                });
            },

            /**
            * 修正模板中指定的占位符。
            * 因为模板中的 html 给 DOM 解析和处理后，没有等号的占位符属性会给替换成有空值的属性值。
            * 如 `<img {test} />` 经过 DOM 解析后会变成 `<img {test}="" />`，这并不是我们想要的结果。
            * 因此我们需要手动修正以替换回我们写模板时的结果。
            */
            fix: function fix(keys) {
                var meta = mapper.get(this);
                var sample = meta.sample;

                keys = Array.isArray(keys) ? keys : [keys];

                keys.map(function (key) {
                    var target = '{' + key + '}';
                    var old = target + '=""';

                    sample = sample.split(old).join(target); //replaceAll
                });

                meta.sample = sample;
            },

            /**
            * 绑定事件。
            */
            on: function on() {
                var _meta$emitter6;

                var meta = mapper.get(this);
                (_meta$emitter6 = meta.emitter).on.apply(_meta$emitter6, arguments);
            },

            /**
            * 销毁本组件。
            */
            destroy: function destroy() {
                var meta = mapper.get(this);
                if (!meta) {
                    return;
                }

                meta.tpls.map(function (tpl) {
                    tpl.destroy();
                });

                meta.emitter.destroy();
                meta.node = null;
                meta.parent = null;
                meta.emitter = null;

                mapper.delete(this);
            }
        };

        //静态方法
        Object.assign(Template, {
            /**
            * 从一段 html 中解析出信息，并创建一个 Template 实例。
            */
            create: function create(html) {
                html = '<template>' + html + '</template>';

                var HTMLParser = require('HTMLParser');
                var dom = HTMLParser.parse(html);

                //if (dom.childNodes.length != 1) {
                //    throw new Error('要解析的 html 最外层只允许(必须)有一个节点。');
                //}

                var tpl = new Template(dom.childNodes[0]);

                return tpl;
            }
        });

        return Template;
    });

    /**
    * Parse a string of HTML into an HTML DOM.
    * 
    * https://github.com/developit/htmlParser
    */
    define('HTMLParser', function (require, module) {

        var exports = {},
            util = {},
            splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim,
            domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;

        util.extend = function (a, b) {
            for (var x in b) {
                if (b.hasOwnProperty(x)) {
                    a[x] = b[x];
                }
            }
            return a;
        };

        util.inherit = function (a, b) {
            var p = a.prototype;
            function F() {}

            F.prototype = b.prototype;
            a.prototype = new F();

            util.extend(a.prototype, p);
            a.prototype.constructor = a;
        };

        util.selfClosingTags = {
            img: 1,
            br: 1,
            hr: 1,
            meta: 1,
            link: 1,
            base: 1,
            input: 1
        };

        util.getElementsByTagName = function (el, tag) {
            var els = [],
                c = 0,
                i,
                n;
            if (!tag) {
                tag = '*';
            }
            tag = tag.toLowerCase();

            if (el.childNodes) {
                for (i = 0; i < el.childNodes.length; i++) {
                    n = el.childNodes[i];
                    if (n.nodeType === 1 && (tag === '*' || n.nodeName === tag)) {
                        els[c++] = n;
                    }

                    Array.prototype.splice.apply(els, [els.length, 0].concat(util.getElementsByTagName(n, tag)));
                    c = els.length;
                }
            }

            return els;
        };

        util.splitAttrs = function (str) {
            var obj = {},
                token;

            if (str) {
                splitAttrsTokenizer.lastIndex = 0;
                str = ' ' + (str || '') + ' ';

                while (token = splitAttrsTokenizer.exec(str)) {
                    obj[token[1]] = token[3];
                }
            }

            return obj;
        };

        util.ta = document.createElement('textarea');

        util.encodeEntities = function (str) {
            util.ta.value = str || '';
            return util.ta.innerHTML;
        };

        util.decodeEntities = function (str) {
            util.ta.innerHTML = str || '';
            return util.ta.value;
        };

        util.htmlToText = function (html) {
            html = html.replace(/<\/?[a-z].*?>/gim, '');
            return util.decodeEntities(html);
        };

        function HTMLElement() {
            this.childNodes = [];
        }

        util.extend(HTMLElement.prototype, {
            nodeType: 1,
            textContent: '',

            getElementsByTagName: function getElementsByTagName(tag) {
                return util.getElementsByTagName(this, tag);
            },

            getAttribute: function getAttribute(a) {
                if (this.attributes.hasOwnProperty(a)) {
                    return this.attributes[a];
                }
            },

            setAttribute: function setAttribute(name, value) {
                var lcName = (name + '').toLowerCase();
                this.attributes[name] = value + '';
                if (lcName === 'id' || lcName === 'name') {
                    this[lcName] = value;
                }
                if (lcName === 'class') {
                    this.className = value;
                }
            },

            getElementById: function getElementById(id) {
                var all = this.getElementsByTagName('*'),
                    i;
                for (i = all.length; i--;) {
                    if (all[i].id === id) {
                        return all[i];
                    }
                }
            },

            appendChild: function appendChild(child) {
                if (child.parentNode) {
                    child.parentNode.removeChild(child);
                }
                this.childNodes.push(child);
            },

            insertBefore: function insertBefore(child, sibling) {
                if (child.parentNode) {
                    child.parentNode.removeChild(child);
                }
                for (var i = 0; i < this.childNodes.length; i++) {
                    if (this.childNodes[i] === sibling) {
                        break;
                    }
                }
                this.childNodes.splice(i, 0, child);
            },

            removeChild: function removeChild(child) {
                for (var i = this.childNodes.length; i--;) {
                    if (this.childNodes[i] === child) {
                        this.childNodes.splice(i, 1);
                        break;
                    }
                }
            }
        });

        exports.HTMLElement = HTMLElement;

        function Node() {}

        util.extend(Node.prototype, {
            toString: function toString() {
                return this.textContent;
            }
        });

        function Document() {
            HTMLElement.call(this);
        }

        util.inherit(Document, HTMLElement);

        util.extend(Document.prototype, {
            nodeType: 9,
            nodeName: '#document'
        });

        exports.Document = Document;

        function TextNode() {}

        util.inherit(TextNode, Node);

        util.extend(TextNode.prototype, {
            nodeType: 3,
            nodeName: '#text'
        });

        exports.TextNode = TextNode;

        function CommentNode() {}

        util.inherit(CommentNode, Node);
        util.extend(CommentNode.prototype, {
            nodeType: 8,
            nodeName: '#comment'
        });

        exports.CommentNode = CommentNode;

        function CDATASectionNode() {}

        util.inherit(CDATASectionNode, Node);
        util.extend(CDATASectionNode.prototype, {
            nodeType: 4,
            nodeName: '#cdata-section'
        });
        exports.CDATASectionNode = CDATASectionNode;

        util.blockConstructors = {
            '<!--': CommentNode,
            '<![CDATA[': CDATASectionNode
        };

        /** Parse a string of HTML into an HTML DOM.
         *  @param {String} str		A string containing HTML
         *  @returns {Document}		A Node, the type corresponding to the type of the root HTML node.
         */
        exports.parse = function (str) {
            var tags, doc, parent, prev, token, text, i, bStart, bText, bEnd, BlockConstructor, commitTextNode, tag;
            tags = [];
            domParserTokenizer.lastIndex = 0;

            parent = doc = new Document();

            commitTextNode = function commitTextNode() {
                // note: this is moved out of the loop but still uses its scope!!
                if (parent && tags.length > 0) {
                    prev = tags[tags.length - 1];
                    i = (prev.documentPosition.closeTag || prev.documentPosition.openTag).end;
                    if (prev.parentNode === parent && i && i < tag.documentPosition.openTag.start) {
                        text = str.substring(i, tag.documentPosition.openTag.start);
                        if (text) {
                            text = util.decodeEntities(text);
                            parent.childNodes.push(util.extend(new TextNode(), {
                                textContent: text,
                                nodeValue: text,
                                parentNode: parent
                            }));
                        }
                    }
                }
            };

            while (token = domParserTokenizer.exec(str)) {
                bStart = token[5] || token[8];
                bText = token[6] || token[9];
                bEnd = token[7] || token[10];
                if (bStart === '<!--' || bStart === '<![CDATA[') {
                    i = domParserTokenizer.lastIndex - token[0].length;
                    BlockConstructor = util.blockConstructors[bStart];
                    if (BlockConstructor) {
                        tag = util.extend(new BlockConstructor(), {
                            textContent: bText,
                            nodeValue: bText,
                            parentNode: parent,
                            documentPosition: {
                                openTag: {
                                    start: i,
                                    end: i + bStart.length
                                },
                                closeTag: {
                                    start: domParserTokenizer.lastIndex - bEnd.length,
                                    end: domParserTokenizer.lastIndex
                                }
                            }
                        });
                        commitTextNode();
                        tags.push(tag);
                        tag.parentNode.childNodes.push(tag);
                    }
                } else if (token[1] !== '/') {
                    tag = util.extend(new HTMLElement(), {
                        nodeName: (token[2] + '').toLowerCase(),
                        attributes: util.splitAttrs(token[3]),
                        parentNode: parent,
                        documentPosition: {
                            openTag: {
                                start: domParserTokenizer.lastIndex - token[0].length,
                                end: domParserTokenizer.lastIndex
                            }
                        }
                    });
                    tag.className = tag.attributes['class'];
                    tag.id = tag.attributes.id;
                    tag.name = tag.attributes.name;
                    commitTextNode();
                    tags.push(tag);
                    tag.parentNode.childNodes.push(tag);
                    if (token[4] && token[4].indexOf('/') > -1 || util.selfClosingTags.hasOwnProperty(tag.nodeName)) {
                        tag.documentPosition.closeTag = tag.documentPosition.openTag;
                        tag.isSelfClosingTag = true;
                        tag.innerHTML = '';
                        tag.outerHTML = str.substring(tag.documentPosition.openTag.start, tag.documentPosition.closeTag.end);
                    } else {
                        parent = tag;
                    }
                } else {
                    // Close parent node if end-tag matches
                    if ((token[2] + '').toLowerCase() === parent.nodeName) {
                        tag = parent;
                        parent = tag.parentNode;
                        delete tag.isSelfClosingTag;
                        tag.documentPosition.closeTag = {
                            start: domParserTokenizer.lastIndex - token[0].length,
                            end: domParserTokenizer.lastIndex
                        };
                        tag.innerHTML = str.substring(tag.documentPosition.openTag.end, tag.documentPosition.closeTag.start);
                        tag.outerHTML = str.substring(tag.documentPosition.openTag.start, tag.documentPosition.closeTag.end);
                        tag.textContent = util.htmlToText(tag.innerHTML);
                    }
                    // account for abuse of self-closing tags when an end-tag is also provided:
                    else if ((token[2] + '').toLowerCase() === tags[tags.length - 1].nodeName && tags[tags.length - 1].isSelfClosingTag === true) {
                            tag = tags[tags.length - 1];
                            console.warn('HTML Error: discarding dangling <\/' + token[2] + '> tag. Already closed via: ' + tag.outerHTML);
                            delete tag.isSelfClosing;
                            tag.documentPosition.closeTag = {
                                start: domParserTokenizer.lastIndex - token[0].length,
                                end: domParserTokenizer.lastIndex
                            };
                        } else {
                            console.warn('tag mismatch: "' + token[2] + '" vs "' + tag.nodeName + '"', tag);
                        }
                }
            }

            doc.documentElement = doc.getElementsByTagName('html')[0];
            doc.body = doc.getElementsByTagName('body')[0];

            return doc;
        };

        return exports;
    });

    /**
    * 
    */
    define('Template/Meta', function (require, module, exports) {
        var $String = require('String');
        var $Object = require('Object');
        var RandomId = require('RandomId');

        var prefix = 'KISP-Template-'; //用于生成组件 id 的前缀部分。
        var suffix = 4; //用于生成组件 id 的随机部分的长度。


        //默认的处理函数。
        function process(data) {
            return data;
        }

        return {

            /**
            *
            */
            create: function create(others) {
                var id = RandomId.get(prefix, suffix);

                var meta = {
                    'id': id, //
                    'sample': '', //
                    'name': '', //
                    'placeholder': '', //
                    'innerHTML': '', //
                    'outerHTML': '', //

                    'tpls': [], //下级实例列表。
                    'name$tpl': {}, //命名的下级实例映射，方便按名称读取。

                    'node': null, //DOM 节点。
                    'parent': null, //父实例。
                    'emitter': null, //
                    'this': null, //

                    'process': process //默认的处理函数。
                };

                Object.assign(meta, others);

                return meta;
            },

            /**
            *
            */
            assign: function assign(meta, item) {
                Object.assign(meta, {
                    'sample': item.sample,
                    'name': item.name,
                    'placeholder': item.placeholder,
                    'innerHTML': item.innerHTML,
                    'outerHTML': item.outerHTML,
                    'node': item.node
                });
            }

        };
    });

    /**
    * 
    */
    define('Template/Parser', function (require, module, exports) {
        var HTMLParser = require('HTMLParser');
        var Templates = module.require('Templates');

        var beginTag = '<script type="text/template">';
        var endTag = '</script>';

        return {

            parse: function parse(html) {
                html = html.split(beginTag).join('');
                html = html.split(endTag).join('');

                var dom = HTMLParser.parse(html);
                var tpls = Templates.get(dom);

                return { dom: dom, tpls: tpls };
            }
        };
    });

    /**
    * 
    */
    define('Template/Parser/Templates', function (require, module, exports) {
        var $String = require('String');
        var $Object = require('Object');

        /**
        * ��ȡָ�� template �ڵ�ĸ��� template �ڵ�(��
        */
        function getParent(tpl) {
            tpl = tpl.parentNode;

            while (tpl) {

                if (tpl.nodeName == 'template') {
                    return tpl;
                }

                tpl = tpl.parentNode;
            }

            return null;
        }

        return {

            /**
            * �����е� template �ڵ���Ϣ��ȡ������
            * ����һ���ɶ��� template �ڵ��Ӧ��������Ϣ������ɵ����顣
            */
            get: function get(dom) {
                var tpls = dom.getElementsByTagName('template');
                var tpl$item = new Map();

                var list = tpls.map(function (tpl) {
                    var attributes = tpl.attributes;
                    var innerHTML = tpl.innerHTML;

                    var item = {
                        'id': tpl.id || '',
                        'name': tpl.name || '',
                        'placeholder': attributes.placeholder || '',
                        'innerHTML': innerHTML,
                        'outerHTML': tpl.outerHTML,
                        'node': tpl,
                        'sample': innerHTML,
                        'parent': null,
                        'attributes': attributes,
                        'items': [] //ֱ���¼��б�
                    };

                    tpl$item.set(tpl, item);

                    return item;
                });

                var roots = list.filter(function (item) {
                    var tpl = getParent(item.node);
                    var parent = tpl$item.get(tpl);

                    //�ռ����ڵ㡣
                    if (!parent) {
                        return true;
                    }

                    //˳�㴦��һ��������
                    item.parent = parent;
                    parent.items.push(item);

                    //�滻����ģ���ڸ�ģ���е����ݡ�
                    var sample = parent.sample;
                    var outerHTML = item.outerHTML;
                    var placeholder = item.placeholder;

                    if (placeholder) {
                        placeholder = '{' + placeholder + '}';
                    }

                    parent.sample = sample.replace(outerHTML, placeholder);
                });

                return roots;
            }

        };
    });

    /**
    * 
    */
    define('Template/Sample', function (require, module, exports) {
        var $String = require('String');
        var $Object = require('Object');

        var beginTag = '<script type="text/template">';
        var endTag = '</script>';

        return {

            /**
            * 替换掉子模板在父模板中的内容。
            *   sample: 父模板的内容。
            *   item: 解析到的模板数据结构。
            */
            replace: function replace(sample, item) {
                var outerHTML = item.outerHTML;
                var placeholder = item.placeholder;

                if (placeholder) {
                    placeholder = '{' + placeholder + '}';
                }

                sample = sample.split(beginTag).join('');
                sample = sample.split(endTag).join('');
                sample = sample.replace(outerHTML, placeholder); //这里不要用全部替换，否则可能会误及后面的。

                return sample;
            },

            /**
            * 提取 `<!--` 和 `-->` 之间的内容作为 sample。
            */
            between: function between(sample) {
                if (sample.includes('<!--') && sample.includes('-->')) {

                    sample = $String.between(sample, '<!--', '-->');
                }

                return sample;
            }

        };
    });

    /**
    * 
    */
    define('Template/Child', function (require, module, exports) {
        var $String = require('String');
        var $Object = require('Object');

        return {

            /**
            * 根据已解析到的数据节点创建一个子级实例，并设置父子关系等。
            */
            create: function create(Template, meta, item) {
                var name = item.name;
                var sibling = meta.name$tpl[name]; //兄弟节点。

                //检测同一级下是否已存在同名的模板。
                if (sibling) {
                    throw new Error('同一级下已存在名为 `' + name + '` 的模板。');
                }

                var tpl = new Template(item);

                meta.name$tpl[name] = tpl;
                meta.parent = meta.this; //设置父实例，内部使用的。
                tpl.parent = meta.this; //设置父实例，外部使用的。

                tpl.on('process', function () {
                    var args = Array.from(arguments);
                    meta.emitter.fire('process', args);
                });

                return tpl;
            }

        };
    });

    define('Panel/Meta', function (require, module, exports) {
        var $ = require('$');
        var $String = require('String');
        var RandomId = require('RandomId');

        var prefix = 'KISP-Panel-'; //用于生成组件 id 的前缀部分。
        var suffix = 4; //用于生成组件 id 的随机部分的长度。


        return {
            create: function create(config, others) {
                var id = RandomId.get(prefix, suffix);

                var meta = {
                    'id': id, //实例的 id，全局唯一。
                    'container': '', //容器的 DOM 节点(或其对应的选择器)。
                    'rendered': false, //是否已渲染过。
                    'renderArgs': [], //render() 时的参数数组，用于 refresh()。
                    'show': config.show, //是否在组件 render() 后自动调用 show() 方法以进行显示。
                    'visible': false, //当前组件是否可见。

                    'module': null, //如果非空，则是由 Panel.define() 创建的。 此时 container='[data-panel="xx"]' 的形式。
                    '$': null, //当前实例关联的 DOM 节点对应的 jQuery 实例。
                    '$emitter': null, //供外部用的事件管理器。
                    'emitter': null, //内部使用的事件管理器。
                    'tpl': null, //模板填充的 Template 实例。
                    'panel': null, //缓存调用 this.wrap() 后的返回结果。
                    'this': null //方便内部使用。
                };

                Object.assign(meta, others);

                return meta;
            }
        };
    });
    /**
    */
    define('Panel/Container', function (require, module, exports) {
        var $String = require('String');
        var Defaults = require('Defaults');

        return {
            /**
            * 获取容器对应的选择器。
            */
            get: function get(id, defaults) {

                //如 `[data-panel="/Users/Main"]`。
                var container = $String.format(defaults.container, {
                    'id': id
                });

                return container;
            },

            /**
            * 设置新的容器。
            */
            set: function set(meta, value) {
                //在 jQuery 3.x 版本，meta.$.selector 为 undefined。
                value = value || meta.$.selector;

                //空值，并且确定它是来源于 Panel.define() 创建的。
                //此时可以用回 meta.container，它为 `[data-panel="xx"]` 格式。
                if (!value && meta.module) {
                    value = meta.container;
                }

                if (!value) {
                    throw new Error('\u8BBE\u7F6E container \u65F6\uFF0C\u8BF7\u7ED9\u53C2\u6570 value \u63D0\u4F9B\u4E00\u4E2A\u6709\u6548\u7684\u503C\u3002');
                }

                meta.container = value;

                //先解除绑定旧容器的事件。
                meta.$.off();

                //构造新的容器。
                meta.$ = meta.this.$ = $(meta.container);

                //同时更新导出对象的 $ 字段。
                if (meta.panel) {
                    meta.panel.$ = meta.$;
                }

                //更新容器后，可能会产生两份完全一样的节点。
                //其中有一份完全是作废的，它们不在 DOM 树中。
                //这里检测并清理不在 DOM 树中的孤立节点。
                //重写 jQuery 中的 find 方法。
                var find = meta.$.find.bind(meta.$);

                meta.$.find = function () {
                    var $items = find.apply(undefined, arguments);

                    $items.each(function (index) {
                        var el = this;

                        if (!document.documentElement.contains(el)) {
                            el.parentNode.removeChild(el);
                        }
                    });

                    //重新获取一次。
                    $items = find.apply(undefined, arguments);

                    return $items;
                };
            }

        };
    });

    /**
    * alert 对话框。
    * @namespace
    * @name Alert
    * @private
    */
    define('Alert', function (require, module, exports) {
        var $String = require('String');
        var Dialog = module.require('Dialog');
        var Sample = module.require('Sample');

        return {
            /**
            * 显示一个 alert 对话框。 
            * 支持多次调用，会将多次调用加进队列，在显示完上一次后进行下一次的显示。
            */
            show: function show(text, text1, textN, fn) {
                //重载 show(obj); 
                //以方便程序员调试查看 json 对象。
                if ((typeof text === 'undefined' ? 'undefined' : _typeof(text)) == 'object') {
                    text = JSON.stringify(text, null, 4);
                    text = $String.format(Sample, { 'text': text });
                }

                var args = [].concat(Array.prototype.slice.call(arguments));

                //在参数列表中找到的第一个函数当作是回调函数，并忽略后面的参数。
                var index = args.findIndex(function (item, index) {
                    return typeof item == 'function';
                });

                if (index > 0) {
                    //找到回调函数
                    fn = args[index];
                    args = args.slice(0, index); //回调函数前面的都当作是要显示的文本
                } else {
                    fn = null;
                }

                text = $String.format.apply($String, _toConsumableArray(args));

                Dialog.add(text, fn);
            }
        };
    });

    /**
    * Alert 模块的默认配置
    * @name Alert.defaults
    */
    define('Alert.defaults', /**@lends Alert.defaults*/{
        volatile: false,
        mask: true,
        autoClose: true,
        width: '80%',
        'z-index': 99999,

        buttons: [{ text: '确定', cmd: 'ok', cssClass: 'OK' }]
    });

    /**
    * Alert 模块的默认配置
    * @name Alert.config
    */
    define('Alert.config', /**@lends Alert.config*/{
        width: 450

    });

    define('Alert/Dialog', function (require, module, exports) {
        var $String = require('String');
        var Defaults = require('Defaults');
        var Height = module.require('Height');

        var dialog = null;
        var visible = false;
        var list = [];
        var activeElement = null; //上次获得焦点的元素。
        var showFrom = 13; //记录一下是否由于按下回车键导致的显示。


        //创建对话框
        function create() {
            var Dialog = require('Dialog');
            var config = Defaults.clone(module.parent.id);

            var dialog = new Dialog({
                'cssClass': 'Alert',
                'volatile': config.volatile,
                'mask': config.mask,
                'autoClose': config.autoClose,
                'width': config.width,
                'z-index': config['z-index'],
                'buttons': config.buttons
            });

            dialog.on('button', 'ok', function () {
                var fn = dialog.data('fn');
                fn && fn();
            });

            dialog.on({
                'show': function show() {
                    visible = true;

                    showFrom = showFrom == 13 ? 'enter' : '';
                    activeElement = document.activeElement;
                    activeElement.blur();
                },

                'hide': function hide() {
                    visible = false;

                    var obj = list.shift();

                    if (obj) {
                        render(obj.text, obj.fn);
                    }

                    activeElement = null;
                    showFrom = '';
                }
            });

            //响应回车键
            $(document).on({
                'keydown': function keydown(event) {
                    showFrom = event.keyCode;
                },

                'keyup': function keyup(event) {
                    var invalid = event.keyCode != 13 || //不是回车键。
                    !visible || //已是隐藏，避免再次触发。
                    showFrom == 'enter'; //由于之前按下回车键导致的显示。

                    if (invalid) {
                        return;
                    }

                    dialog.hide();

                    var fn = dialog.data('fn');
                    fn && fn();
                }
            });

            return dialog;
        }

        function render(text, fn) {
            var height = Height.get(text);

            dialog = dialog || create();

            dialog.data('fn', fn);

            dialog.set({
                'content': text,
                'height': height
            });

            dialog.show();
        }

        return {
            /**
            * 把要显示的文本和要执行的回调函数加到队列里，并在特定时机显示出来。
            */
            add: function add(text, fn) {
                //首次显示，或之前显示的已经给隐藏了，立即显示出来。
                if (!visible) {
                    render(text, fn);
                    return;
                }

                //已经是显示的，加到队列里进行排队。
                list.push({
                    'text': text,
                    'fn': fn
                });
            }
        };
    });

    /**
    * 对话框组件。
    * @class
    * @name Dialog
    */
    define('Dialog', function (require, module, exports) {
        var $Object = require('Object');
        var Emitter = require('Emitter');
        var Defaults = require('Defaults');

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

            var emitter = new Emitter(this); //事件驱动器。
            var style = Style.get(config); //
            var masker = Masker.create(config); //

            var meta = Meta.create(config, {
                'style': style, //从配置中过滤出样式成员，并进行规范化处理，style 是一个 {}。
                'emitter': emitter, //事件驱动器。
                'masker': masker, //遮罩层实例。
                'this': this //当前实例，方便内部使用。
            });

            mapper.set(this, meta);

            //对外暴露的属性。
            Object.assign(this, {
                'id': meta.id
            });
        }

        //实例方法
        Dialog.prototype = /**@lends Dialog#*/{
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
            render: function render() {
                var meta = mapper.get(this);

                //已经渲染过了。
                if (meta.$) {
                    return;
                }

                var html = Template.fill(meta);

                $(meta.container).append(html);

                meta.$ = this.$ = $('#' + meta.id);
                meta.$header = $('#' + meta.headerId);
                meta.$content = $('#' + meta.contentId);
                meta.$footer = $('#' + meta.footerId);

                Events.bind(meta);

                meta.emitter.fire('render');
            },

            /**
            * 显示本组件。
            */
            show: function show() {
                var meta = mapper.get(this);
                var emitter = meta.emitter;

                //已是显示状态。
                if (meta.visible) {
                    return;
                }

                if (!meta.$) {
                    this.render();
                }

                meta.$.show();
                meta.visible = true;
                meta.masker && meta.masker.show();
                meta.emitter.fire('show');
            },

            /**
            * 隐藏本组件。
            */
            hide: function hide() {
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
            remove: function remove() {
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
            on: function on() {
                var _meta$emitter7;

                var meta = mapper.get(this);
                (_meta$emitter7 = meta.emitter).on.apply(_meta$emitter7, arguments);
            },

            /**
            * 销毁本组件。
            */
            destroy: function destroy() {
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
            set: function set(key, value) {
                this.render();

                var meta = mapper.get(this);
                var scroller = meta.scroller;
                var obj = (typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object' ? key : _defineProperty({}, key, value);

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
                            throw new Error(module.id + ' \u76EE\u524D\u4E0D\u652F\u6301\u8BBE\u7F6E\u5C5E\u6027: ' + key);
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
            data: function data(key, value) {
                var meta = mapper.get(this);
                var data = meta.data;

                var len = arguments.length;
                if (len == 0) {
                    //获取全部
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
            }

        };

        return Dialog;
    });

    /**
    * Dialog 模块的默认配置
    * @name Dialog.defaults
    */
    define('Dialog.defaults', /**@lends Dialog.defaults*/{

        /**
        * 组件添加到的容器。
        * 默认为 document.body。
        */
        container: 'body',

        /**
        * 是否启用 mask 层。
        */
        mask: true,

        /**
        * 点击按钮后是否自动关闭组件。
        * 可取值为: true|false，默认为 true，即自动关闭。
        */
        autoClose: true,

        /**
        * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
        * 可取值为: true|false，默认为不易消失。
        */
        volatile: false,

        /**
        * 组件的标题文本。
        */
        title: '',

        /**
        * 组件的内容文本。
        */
        content: '',

        /**
        * 点击按钮时需要用到的事件名。
        */
        eventName: 'click',

        /**
        * 组件用到的 css 类名。
        */
        cssClass: '',

        /**
        * 组件的 css 样式 z-index 值。
        */
        'z-index': 1024,

        /**
        * 组件宽度。
        * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
        */
        width: '80%',

        /**
        * 组件高度。
        * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
        */
        height: '50%',

        /**
        * 样式集合。
        * 外层里面的同名字段优先级高于里面的。
        */
        style: {},

        /**
        * 按钮数组。
        */
        buttons: []

    });

    /**
    * Dialog 模块的默认配置
    * @name Dialog.config
    */
    define('Dialog.config', /**@lends Dialog.config*/{

        /**
        * 内容区是否可滚动。
        * PC 端用不可滚动。
        */
        scrollable: false,

        /**
        * 针对滚动器的配置。
        * PC 端。
        */
        scroller: null,

        /**
        * 点击按钮时需要用到的事件名。
        * PC 端。
        */
        eventName: 'click',

        /**
        * 
        */
        width: 600

    });

    /**
    * 针对有继承关系的类提供同一个的 mapper 实例容器。
    * @namespace
    * @name Mapper
    */
    define('Mapper', function (require, module, exports) {
        var mapper = new Map();
        return mapper;
    });

    /**
    * 
    */
    define('Dialog/Style', function (require, module, exports) {
        var $Object = require('Object');
        var Style = require('Style');

        return {

            get: function get(config) {
                var obj = $Object.filter(config, ['height', 'width', 'z-index']);
                var style = Style.objectify(config.style);

                style = Style.merge(style, obj);
                style = Style.pixelize(style, ['height', 'width']);

                return style;
            }

        };
    });

    define('Dialog/Meta', function (require, module, exports) {
        var $ = require('$');
        var $String = require('String');
        var RandomId = require('RandomId');

        var prefix = 'KISP-Dialog-'; //用于生成组件 id 的前缀部分。
        var suffix = 4; //用于生成组件 id 的随机部分的长度。


        return {
            create: function create(config, others) {
                var id = RandomId.get(prefix, suffix);
                var buttons = config.buttons || [];

                buttons = buttons.map(function (item) {
                    return item == 'string' ? { 'text': item } : item;
                });

                var meta = {
                    'id': id,
                    'headerId': RandomId.get(prefix, 'header-', suffix),
                    'contentId': RandomId.get(prefix, 'content-', suffix),
                    'footerId': RandomId.get(prefix, 'footer-', suffix),

                    'scrollable': config.scrollable,
                    'scrollerConfig': config.scroller,
                    'eventName': config.eventName,
                    'title': config.title,
                    'content': config.content,
                    'buttons': buttons,
                    'z-index': config['z-index'], //生成透明层时要用到。
                    'width': config.width, //宽度。
                    'height': config.height, //高度。
                    'autoClose': config.autoClose, //点击任何一个按钮后是否自动关闭组件
                    'volatile': config.volatile, //是否易消失。 即点击对话框外的 masker 时自动关闭对话框。
                    'cssClass': config.cssClass || '', //
                    'container': config.container, //

                    'pressedClass': 'Pressed', //底部按钮按下去时的样式类名。
                    'visible': false, //记录当前组件是否已显示
                    'style': {}, //样式对象。
                    'data': {}, //供 this.data() 方法使用

                    'scroller': null, //针对移动端的滚动器。
                    'masker': null, //Mask 的实例，重复使用。
                    'emitter': null, //事件驱动器。
                    'this': null, //当前实例，方便内部使用。
                    '$': null, //组件最外层的 DOM 节点的 jQuery 实例。
                    '$header': null, //$(headerId)。
                    '$content': null, //$(contentId)。
                    '$footer': null //$(footerId)。
                };

                Object.assign(meta, others);

                return meta;
            }
        };
    });

    define('Dialog/Masker', function (require, module, exports) {
        var $ = require('$');

        return {
            create: function create(config) {
                var Mask = require('Mask');

                var defaults = {
                    'container': config.container
                };

                var options = Mask.normalize(defaults, config.mask); //返回一个 {} 或 null。

                if (!options) {
                    return null;
                }

                Object.assign(options, {
                    'volatile': config.volatile,
                    'z-index': config['z-index'] - 1
                });

                var masker = new Mask(options);

                return masker;
            }
        };
    });

    /**
    *
    */
    define('Dialog/Events', function (require, module, exports) {
        var Template = require('Template');
        var $Array = require('Array');
        var $String = require('String');

        return {
            bind: function bind(meta) {

                //监控 masker 层的隐藏。
                if (meta.masker && meta.volatile) {
                    meta.masker.on({
                        'show': function show() {},
                        'hide': function hide() {
                            meta.this.hide();
                        }
                    });
                }

                //底部按钮。
                (function () {
                    if (!meta.buttons.length) {
                        return;
                    }

                    var $footer = meta.$footer;
                    var eventName = meta.eventName;
                    var selector = 'button[data-index]';
                    var pressed = meta.pressedClass;

                    //移动端。
                    if (eventName == 'touch') {
                        $footer.touch(selector, handler, pressed);
                        return;
                    }

                    //PC 端。
                    $footer.on(eventName, selector, handler); //如 on('click', selector);

                    $footer.on('mousedown', selector, function (event) {
                        $(this).addClass(pressed);
                    });

                    $footer.on('mouseup mouseout', selector, function (event) {
                        $(this).removeClass(pressed);
                    });

                    //内部共用的处理器。
                    function handler(event) {
                        var button = this;
                        var index = +button.getAttribute('data-index');
                        var item = meta.buttons[index];
                        var cmd = item.cmd || String(index);
                        var fn = item.fn;

                        fn && fn(item, index);

                        meta.emitter.fire('button', cmd, [item, index]);
                        meta.emitter.fire('button', [item, index]);

                        // item.autoClose 优先级高于 meta.autoClose。
                        var autoClose = item.autoClose;

                        if (autoClose === undefined) {
                            autoClose = meta.autoClose;
                        }

                        if (autoClose) {
                            meta.this.hide();
                        }
                    }
                })();
            }
        };
    });

    /**
    *
    */
    define('Dialog/Template', function (require, module, exports) {
        var Template = require('Template');
        var $Array = require('Array');
        var $String = require('String');
        var Style = require('Style');

        var Sample = module.require('Sample');

        var tpl = Template.create(Sample);

        tpl.process({
            '': function _(data) {
                var header = this.fill('header', data);
                var content = this.fill('content', data);
                var footer = this.fill('footer', data);

                var style = Style.stringify(data.style);

                return {
                    'id': data.id,
                    'cssClass': data.cssClass || '',
                    'style': style,
                    'header': header,
                    'content': content,
                    'footer': footer
                };
            },

            'header': function header(data) {
                var title = data.title;

                if (!title) {
                    return '';
                }

                return {
                    'headerId': data.headerId,
                    'title': title
                };
            },

            'content': function content(data) {

                return {
                    'contentId': data.contentId,
                    'content': data.content,
                    'noHeader': data.title ? '' : 'NoHeader', //针对无标题时。
                    'noFooter': data.buttons.length > 0 ? '' : 'NoFooter' //针对无按钮时。
                };
            },

            'footer': {
                '': function _(data) {
                    var buttons = data.buttons;
                    var count = buttons.length;

                    if (!count) {
                        return '';
                    }

                    buttons = this.fill('button', buttons);

                    return {
                        'footerId': data.footerId,
                        'count': count,
                        'buttons': buttons
                    };
                },

                'button': function button(item, index) {

                    var style = Style.stringify(item.style);

                    return {
                        'index': index,
                        'text': item.text,
                        'cssClass': item.cssClass || '',
                        'style': style

                    };
                }
            }

        });

        return tpl;
    });

    /*
    * Dialog/Template/Sample
    * 由 kisp-packer 生成。 
    * 来源: ../build/pc/8.1.0/src/ui/dialog/Dialog/Template/Sample.html
    */
    define('Dialog/Template/Sample', ['', '<div id="{id}" class="KISP Dialog {cssClass}" style="{style} display: none;">', '    <template name="header" placeholder="header">', '        <header id="{headerId}">', '            {title}', '        </header>', '    </template>', '', '    <template name="content" placeholder="content">', '        <article class="{noHeader} {noFooter}">', '            <div id="{contentId}">{content}</div>', '        </article>', '    </template>', '', '    <template name="footer" placeholder="footer">', '        <footer id="{footerId}" class="Buttons-{count}">', '            <template name="button" placeholder="buttons">', '                <button data-index="{index}" class="{cssClass}" style="{style}">{text}</button>', '            </template>', '        </footer>', '    </template>', '</div>', ''].join('\n'));

    define('Alert/Dialog/Height', function (require, module, exports) {
        var $String = require('String');

        //根据文本来计算高度，大概值，并不要求很准确。
        function getHeightByLength(text) {
            text = String(text);

            var len = $String.getByteLength(text);
            var h = Math.max(len, 125);
            var max = document.documentElement.clientHeight;

            if (h >= max * 0.8) {
                h = '80%';
            }

            return h;
        }

        //根据文本来计算高度，大概值，并不要求很准确。
        function getHeightByLines(text) {
            text = String(text);

            var lines = text.split('\n');
            var h = lines.length * 25 + 60;
            var max = document.documentElement.clientHeight;

            if (h >= max * 0.8) {
                h = '80%';
            }

            return h;
        }

        return {
            /**
            * 根据文本获取对话框的高度。
            */
            get: function getHeight(text) {
                var h0 = getHeightByLength(text);
                var h1 = getHeightByLines(text);

                var h = Math.max(h0, h1);

                //保证取偶数。
                //因为奇数的高度，如 `height: 125px;`，
                //会导致 footer 的 `border-top` 变粗，暂未找到原因。
                if (typeof h == 'number') {
                    h = h % 2 == 1 ? h + 1 : h;
                }

                return h;
            }
        };
    });
    /*
    * Alert/Sample
    * 由 kisp-packer 生成。 
    * 来源: ../build/pc/8.1.0/src/ui/alert/Alert/Sample.html
    */
    define('Alert/Sample', ['<pre class="JSON">{text}</pre>'].join('\n'));

    /**
    * 简单的 confirm 对话框。
    * @namespace
    * @name Confirm
    * @private
    */
    define('Confirm', function (require, module, exports) {
        var $String = require('String');
        var Defaults = require('Defaults');

        var dialog = null;
        var visible = false;
        var list = [];
        var activeElement = null; //上次获得焦点的元素。
        var showFrom = 13; //记录一下是否由于按下回车键导致的显示。


        //创建对话框
        function create() {
            var Dialog = require('Dialog');
            var config = Defaults.clone(module.id);

            var dialog = new Dialog({
                'cssClass': module.id,
                'volatile': config.volatile,
                'mask': config.mask,
                'autoClose': config.autoClose,
                'height': config.height,
                'z-index': config['z-index'],
                'buttons': config.buttons
            });

            dialog.on('button', {
                'ok': function ok() {
                    var fn = dialog.data('ok');
                    fn && fn();
                },
                'cancel': function cancel() {
                    var fn = dialog.data('cancel');
                    fn && fn();
                }
            });

            dialog.on({
                'show': function show() {
                    visible = true;

                    showFrom = showFrom == 13 ? 'enter' : '';

                    //先暂存之前的焦点元素。
                    activeElement = document.activeElement;
                    activeElement.blur();

                    //让 `确定` 按钮获得焦点。
                    dialog.$.find('footer button').get(0).focus();
                },

                'hide': function hide() {
                    visible = false;

                    var item = list.shift();

                    if (item) {
                        render(item);
                    }

                    //恢复之前的焦点元素。
                    activeElement && activeElement.focus();
                    activeElement = null;
                    showFrom = '';
                }
            });

            //响应回车键
            $(document).on({
                'keydown': function keydown(event) {
                    showFrom = event.keyCode;
                },

                'keyup': function keyup(event) {
                    var invalid = event.keyCode != 13 || //不是回车键。
                    !visible || //已是隐藏，避免再次触发。
                    showFrom == 'enter'; //由于之前按下回车键导致的显示。

                    if (invalid) {
                        return;
                    }

                    dialog.hide();

                    var fn = dialog.data('ok');
                    fn && fn();
                }
            });

            return dialog;
        }

        function render(item) {
            dialog = dialog || create();

            dialog.data(item);

            dialog.set({
                'content': item.text
            });

            dialog.show();
        }

        return {
            /**
            * 显示一个 confirm 对话框。 
            * 支持多次调用，会将多次调用加进队列，在显示完上一次后进行下一次的显示。
            * 已重载 show({ text, ok, cancel });   //传入一个配置对象。
            * 已重载 show(text, ok, cancel);       //分开传入参数。
            * 参数：
            *   text: '',   //要显示的文本内容。
            *   ok: fn,     //可选，点击 `确定` 按钮后要执行的回调函数。
            *   cancel: fn, //可选，点击 `取消` 按钮后要执行的回调函数。
            */
            show: function show(text, ok, cancel) {

                var item = (typeof text === 'undefined' ? 'undefined' : _typeof(text)) == 'object' ? text : {
                    'text': text,
                    'ok': ok,
                    'cancel': cancel
                };

                //首次显示，或之前显示的已经给隐藏了，立即显示出来。
                if (!visible) {
                    render(item);
                    return;
                }

                //已经是显示的，加到队列里进行排队。
                list.push(item);
            }
        };
    });

    /**
    * Confirm 模块的默认配置
    * @name Confirm.defaults
    */
    define('Confirm.defaults', /**@lends Confirm.defaults*/{
        /**
        * 组件高度。
        * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
        */
        mask: true,
        height: 140,
        autoClose: true,
        volatile: false,
        'z-index': 99999,
        buttons: [{ text: '确定', cmd: 'ok', cssClass: 'OK' }, { text: '取消', cmd: 'cancel', cssClass: 'Cancel' }]

    });

    /**
    * 后台 API 接口请求类。
    * @class
    * @name API
    */
    define('API', function (require, module, exports) {

        var Emitter = require('Emitter');
        var Defaults = require('Defaults');
        var Fn = require('Fn');

        var mapper = require('Mapper'); //这里要用有继承关系的 Mapper


        /**
        * API 构造器。
        * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
        * @param {Object} [config] 配置对象。
        *   config = {
        *       
        *   };
        */
        function API(name, config) {

            //重载 API(config);
            if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
                config = name;
                name = '';
            }

            name = name || '';
            config = Defaults.clone(module.id, config);

            var emitter = new Emitter(this);
            var successCode = config.successCode;
            var proxy = config.proxy;

            //支持简写，代理的文件名跟 API 的名称一致。
            switch (proxy) {
                case true:
                    proxy = name + '.js';
                    break;
                case '.json':
                case '.js':
                    proxy = name + proxy;
                    break;
            }

            //发起 ajax 请求所需要的配置对象。
            var ajax = {
                'name': name,
                'data': config.data,
                'query': config.query,

                'url': config.url,
                'prefix': config.prefix,
                'ext': config.ext,
                'random': config.random,

                'successCode': successCode,
                'field': config.field,
                'proxy': proxy,
                'serialize': config.serialize,
                'timeout': config.timeout,

                success: function success(data, json, xhr) {
                    //成功
                    fireEvent('success', [data, json, xhr]);
                },

                fail: function fail(code, msg, json, xhr) {
                    //失败
                    fireEvent('fail', [code, msg, json, xhr]);
                },

                error: function error(xhr) {
                    //错误
                    if (meta.aborted) {
                        //避免因手动调用了 abort() 而导致触发 error 事件。
                        meta.aborted = false; //归位
                        return;
                    }

                    fireEvent('error', [xhr]);
                },

                ontimeout: function ontimeout(xhr) {
                    //超时，自定义的
                    fireEvent('timeout', [xhr]);
                }
            };

            var Ajax = module.require('Ajax');

            var meta = {
                'ajax': ajax,
                'status': '',
                'args': [],
                'emitter': emitter,
                'xhr': null, //缓存创建出来的 xhr 对象。
                'aborted': false, //指示是否已调用了 abort()。
                'fireEvent': fireEvent, //

                /**
                * 用于发起 ajax 请求的 get 方法。
                * 如果想实现自己的 get 方法，可以提供此函数。
                * 否则使用内部默认的 Ajax.get() 方法。
                */
                'get': config.get || Ajax.get,

                /**
                * 用于发起 ajax 请求的 post 方法。
                * 如果想实现自己的 post 方法，可以提供此函数。
                * 否则使用内部默认的 Ajax.post() 方法。
                */
                'post': config.post || Ajax.post
            };

            mapper.set(this, meta);

            //内部共用函数。
            function fireEvent(status, args, emitter) {
                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;
                meta.xhr = null; //请求已完成，针对 abort() 方法。

                var len = args.length;
                var xhr = args[len - 1];
                var json = args[len - 2];
                var isSuccess = status == 'success';
                var isFail = status == 'fail';

                Fn.delay(config.delay, function () {

                    //最先触发
                    var values = emitter.fire('response', [status, json, xhr]);

                    if (values.includes(false)) {
                        return;
                    }

                    //进一步触发具体 code 对应的事件
                    if (isSuccess || isFail) {
                        var code = isSuccess ? successCode : args[0];
                        values = emitter.fire('code', code, args);

                        if (values.includes(false)) {
                            return;
                        }
                    }

                    //在 Proxy 的响应中 xhr 为 null。
                    if (xhr) {
                        values = emitter.fire('status', xhr.status, args);

                        if (values.includes(false)) {
                            return;
                        }
                    }

                    //触发命名的分类事件，如 success|fail|error|timeout
                    values = emitter.fire(status, args);

                    if (values.includes(false)) {
                        return;
                    }

                    //触发总事件。
                    emitter.fire('done', [status, json, xhr]);
                });
            }
        }

        //实例方法
        API.prototype = /**@lends API#*/{
            constructor: API,

            /**
            * 发起网络 GET 请求。
            * 请求完成后会最先触发相应的事件。
            * @param {Object} [data] 请求的数据对象。
            *   该数据会给序列化成查询字符串以拼接到 url 中。
            * @example
                var api = new API('test');
                api.get({ name: 'micty' });
            */
            get: function get(data) {

                var meta = mapper.get(this);
                var emitter = meta.emitter;

                meta.aborted = false; //归位

                var obj = Object.assign({}, meta.ajax);
                if (data) {
                    obj.data = data;
                }

                data = obj.data; //这里用 obj.data

                emitter.fire('request', 'get', [data]);
                emitter.fire('request', ['get', data]);

                meta.xhr = meta.get(obj);
            },

            /**
            * 发起网络 POST 请求。
            * 请求完成后会最先触发相应的事件。
            * @param {Object} [data] POST 请求的数据对象。
            * @param {Object} [query] 查询字符串的数据对象。
            *   该数据会给序列化成查询字符串，并且通过 form-data 发送出去。
            * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
            */
            post: function post(data, query) {

                var meta = mapper.get(this);
                var emitter = meta.emitter;
                var ajax = meta.ajax;

                meta.aborted = false; //归位

                var obj = Object.assign({}, ajax, {
                    'data': data || ajax.data,
                    'query': query || ajax.query
                });

                data = obj.data; //这里用 obj.data
                query = obj.query; //这里用 obj.query

                emitter.fire('request', 'post', [data, query]);
                emitter.fire('request', ['post', data, query]);

                meta.xhr = meta.post(obj);
            },

            /**
            * 取消当前已发起但未完成的请求。
            * 只有已发起了请求但未完成，才会执行取消操作，并会触发 abort 事件。
            */
            abort: function abort() {
                var meta = mapper.get(this);
                var xhr = meta.xhr;
                if (!xhr) {
                    return;
                }

                meta.aborted = true; //先设置状态
                xhr.abort(); //会触发 ajax.error 事件。
                meta.emitter.fire('abort'); //
            },

            /**
            * 绑定事件。
            * 已重载 on({...}，因此支持批量绑定。
            * @param {string} name 事件名称。
            * @param {function} fn 回调函数。
            * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
            */
            on: function on(name, fn) {

                var meta = mapper.get(this);
                var emitter = meta.emitter;

                var args = [].slice.call(arguments, 0);
                emitter.on.apply(emitter, args);

                var status = meta.status;

                if (status) {
                    //请求已完成，立即触发
                    var emt = new Emitter(this); //使用临时的事件触发器。
                    emt.on.apply(emt, args);
                    meta.fireEvent(status, meta.args, emt);
                    emt.destroy();
                }
            },

            /**
            * 销毁本实例对象。
            */
            destroy: function destroy() {
                var meta = mapper.get(this);
                var emitter = meta.emitter;
                emitter.destroy();

                mapper.delete(this);
            }
        };

        return API;
    });

    /**
    * API 模块的默认配置
    * @name API.defaults
    */
    define('API.defaults', /**@lends API.defaults*/{
        /**
        * 成功的状态码。 
        * 只有状态码为该值是才表示成功，其它的均表示失败。
        */
        successCode: 200,

        /**
        * 字段映射。
        */
        field: {
            /**
            * 状态码。
            */
            code: 'code',
            /**
            * 消息。
            */
            msg: 'msg',
            /**
            * 主体数据。
            */
            data: 'data'
        },

        /**
        * 代理配置。
        */
        proxy: null,

        /**
        * 随机延迟时间，更真实模拟实际网络环境。
        * 可指定为 false，或如 { min: 500, max: 2000 } 的格式。
        */
        delay: false,

        /**
        * 在 url 中增加一个随机 key，以解决缓存问题。
        * 当指定为 false 时，则禁用。
        */
        random: true,

        /**
        * API 接口 Url 的主体部分。
        */
        url: '',

        /**
        * API 接口 Url 的前缀部分。
        */
        prefix: '',

        /**
        * API 接口 Url 的后缀部分。
        * 针对那些如 '.do'、'.aspx' 等有后缀名的接口比较实用。
        */
        ext: '',

        /**
        * 要发送的数据。 可选的。
        * 当发送方式为 get 时，该数据将会给序列化成查询字符串并附加到 url 查询参数中。
        * 当发送方式为 post 时，会用在表单中。
        */
        data: null,

        /**
        * 要发送的查询参数，仅当发送方式为 post 时有效 (可选的)。
        * 当发送方式为 post 时，该数据将会给序列化成查询字符串并附加到 url 查询参数中。
        */
        query: null,

        /**
        * 请求超时的最大值(毫秒)。
        * 0 表示由浏览器控制，代码层面不控制。
        */
        timeout: 0,

        /**
        * 把请求时的 data 中的第一级子对象进行序列化的方法。
        * @param {string} key 要进行处理的子对象的键。
        * @param {Object} value 要进行处理的子对象的值对象。
        * @return {string} 返回该子对象序列化的字符串。
        */
        serialize: function serialize(key, value) {
            var json = JSON.stringify(value);
            return encodeURIComponent(json);
        },

        /**
        * 用于发起 ajax 请求的 get 方法。
        * 如果想实现自己的 get 方法，可以提供此函数。
        * 否则使用内部默认的 Ajax.get() 方法。
        */
        get: null,

        /**
        * 用于发起 ajax 请求的 post 方法。
        * 如果想实现自己的 post 方法，可以提供此函数。
        * 否则使用内部默认的 Ajax.post() 方法。
        */
        post: null

    });

    /**
    *
    */
    define('API/Ajax', function (require, module, exports) {

        var $Object = require('Object');
        var $String = require('String');
        var Query = require('Query');

        //[XMLHttpRequest 增强功能](https://technet.microsoft.com/zh-cn/office/hh673569)
        //[XMLHttpRequest2 新技巧](http://www.html5rocks.com/zh/tutorials/file/xhr2/)
        //[XMLHttpRequest Level 2 使用指南](http://kb.cnblogs.com/page/157047/)

        /**
        * 发起 ajax 网络请求(核心方法)。
        *   method: 'get' | 'post', //网络请求的方式：'get' 或 'post'。
        *   config = {
        *       url: '',            //可选，请求的 url 地址。
        *       prefix: '',         //可选，url 的前缀。
        *       name: '',           //必选，后台接口的名称，会用在 url 中。
        *       ext: '',            //可选，要用在 url 中的后缀。
        *       successCode: 200,   //指示请求成功时的代码。 数字或字符串。
        *       random: true,       //是否给 url 加上随机数，以刷新缓存。
        *       proxy: false,       //是否启用代理。 要启用，可以指定为 true，或一个具体的 json 或 js 文件名。
        *       timeout: 0,         //超时时间。 如果指定为 0，则使用浏览器内置的超时管理，会调用 error 回调函数。
        *
        *       //该数据会给序列化成查询字符串，然后：
        *       //当 method 为 'get' 时，数据拼接在 url 中。
        *       //当 method 为 'post' 时，数据放在 form-data 表单中。
        *       data: {},           //可选，要发送的数据。 
        *       query: {},          //可选，要发送的查询字符串数据。 该字段仅在 method 为 'post' 时可用。
        *
        *       field: {            //响应中的映射字段。
        *           code: 'code',   //状态码。
        *           msg: 'msg',     //消息。
        *           data: 'data',   //主体数据。
        *       },
        *
        *       success: fn,        //请求成功时的回调函数。
        *       fail: fn,           //请求失败时的回调函数。
        *       error: fn,          //请求错误时的回调函数。
        *       ontimeout: fn,      //请求超时时的回调函数。
        *       serialize: fn,      //对 data 字段的子对象进行序列化的方法。
        *   };
        *
        * 返回： 
        *   XMLHTTPRequest 实例对象 xhr。 
        *   如果使用的是代理，则返回 null。
        */
        function request(method, config) {
            var proxy = config.proxy;

            if (proxy) {
                //使用了代理
                var Proxy = require('Proxy');
                Proxy.request(proxy, config);
                return null;
            }

            //完整的 url
            var url = [config.url, config.prefix, config.name, config.ext].join('');

            var data = config.data || null; // null 可能会在 xhr.send(data) 里用到。
            if (data) {

                var serialize = config.serialize; //对子对象进行序列化的方法。

                data = $Object.map(data, function (key, value) {
                    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && value) {
                        //子对象编码成 JSON 字符串
                        return serialize(key, value);
                    }

                    //其他的
                    return value; //原样返回
                });
            }

            if (method == 'post') {
                var query = config.query;
                if (query) {
                    url = Query.add(url, query);
                }
                if (data) {
                    data = Query.stringify(data);
                }
            } else if (data) {
                // 'get'
                url = Query.add(url, data);
                data = null; //要发送的数据已附加到 url 参数上
            }

            //增加一个随机字段，以使缓存失效
            var random = config.random;
            if (random) {
                random = $String.random(4);
                url = Query.add(url, random);
            }

            //同时启动超时器和发起请求，让它们去竞争。

            var isTimeout = false; //指示是否已超时
            var tid = null;
            var timeout = config.timeout || 0;

            if (timeout > 0) {
                tid = setTimeout(function () {
                    isTimeout = true;
                    xhr.abort(); //取消当前响应，关闭连接并且结束任何未决的网络活动。

                    var fn = config.ontimeout;
                    fn && fn(xhr);
                }, timeout);
            }

            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            xhr.onreadystatechange = function () {

                if (isTimeout || xhr.readyState != 4) {
                    return;
                }

                clearTimeout(tid);

                var successCode = config.successCode;
                var fnError = config.error;

                if (xhr.status != 200) {
                    fnError && fnError(xhr);
                    return;
                }

                var JSON = require('JSON');
                var json = JSON.parse(xhr.responseText);
                if (!json) {
                    fnError && fnError(xhr);
                    return;
                }

                var field = config.field;

                var code = json[field.code];
                if (code == successCode) {

                    var fnSuccess = config.success;
                    var data = field.data in json ? json[field.data] : {};

                    fnSuccess && fnSuccess(data, json, xhr);
                } else {
                    var fnFail = config.fail;
                    fnFail && fnFail(code, json[field.msg], json, xhr);
                }
            };

            if (method == 'post') {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }

            xhr.send(data);

            return xhr;
        }

        return (/**@lends Ajax*/{

                get: function get(config) {
                    return request('get', config);
                },

                post: function post(config) {
                    return request('post', config);
                }
            }
        );
    });

    /**
    * SSH.API 类
    * @class
    * @name SSH.API
    * @augments SSH
    */
    define('SSH.API', function (require, module, exports) {

        var $Object = require('Object');
        var Emitter = require('Emitter');
        var Defaults = require('Defaults');
        var SSH = require('SSH');

        var Fn = require('Fn');

        var mapper = require('Mapper'); //用于容纳所有 SSHAPI 实例的 meta 数据
        var $emitter = new Emitter(SSHAPI); //针对类的，而不是实例的。

        /**
        * SSHAPI 构造器。
        * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
        * @param {Object} [config] 配置对象。
        */
        function SSHAPI(name, config) {

            name = name || '';
            config = Defaults.clone(module.id, config);

            var prefix = config.prefix;
            var emitter = new Emitter(this);
            var successCode = config.successCode;

            var proxy = config.proxy;
            //支持简写，代理的文件名跟 API 的名称一致。
            switch (proxy) {
                case true:
                    proxy = name + '.js';
                    break;
                case '.json':
                case '.js':
                    proxy = name + proxy;
                    break;
            }

            //过滤出属于 SSH 的配置成员
            //这里使用过滤 + 复制的方式进行成员选取。
            var ssh = Object.assign($Object.filter(config, ['prefix', 'eid', 'openid', 'serialize', 'timeout',

            //可选的
            'appid', 'netid', 'pubacckey', 'timestamp', 'nonce', 'pubaccid']), {
                'proxy': proxy
            });

            var ajax = {
                'name': name,
                'successCode': successCode,
                'field': config.field,
                'data': config.data,

                'ssh': Object.assign(ssh, config.ssh), //再合并针对 ssh 的

                success: function success(data, json, xhr) {
                    //成功
                    fireEvent('success', [data, json, xhr]);
                },

                fail: function fail(code, msg, json, xhr) {
                    //失败
                    fireEvent('fail', [code, msg, json, xhr]);
                },

                error: function error(code, msg, json, xhr) {
                    //错误

                    //为了让业务层能知道 SSH 层发生了 fail，通过判断 json 是否为空即可。
                    //当 http 协议层连接错误，则 code, msg, json 三个参数都为 undefined。
                    msg = msg || config.msg;

                    fireEvent('error', [code, msg, json, xhr]);
                },

                timeout: function timeout(xhr) {
                    fireEvent('timeout', [xhr]);
                },

                abort: function abort() {
                    emitter.fire('abort');
                },

                //存在多个产品实例 (netid) 时触发。
                servers: function servers(list) {
                    //触发类的事件，而不是实例的。
                    $emitter.fire('servers', [list]);
                }
            };

            var meta = {
                'ajax': ajax,
                'status': '',
                'args': [],
                'emitter': emitter,
                'ssh': null, //缓存创建出来的 ssh 对象。
                'fireEvent': fireEvent //这里要设置进去，因为继续了 API 的关系。
            };

            mapper.set(this, meta);

            //内部共用函数
            function fireEvent(status, args, emitter) {

                meta.ssh = null; //请求已完成，针对 abort() 方法。

                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;

                emitter.fire('response', args); //最先触发

                //进一步触发具体 code 对应的事件
                if (status == 'success') {
                    emitter.fire('code', successCode, args);
                } else if (status == 'fail') {
                    emitter.fire('code', args[0], args.slice(1)); //错误码不在参数里
                }

                var xhr = args.slice(-1)[0]; //args[args.length - 1]
                if (xhr) {
                    //在 Proxy 的响应中 xhr 为 null
                    emitter.fire('status', xhr.status, args);
                }

                emitter.fire(status, args); //触发命名的分类事件，如 success、fail、error
                emitter.fire('done', args); //触发总事件
            }
        }

        //实例方法
        SSHAPI.prototype = Object.assign(new SSH(), /**@lends SSH.API#*/{

            constructor: SSHAPI,

            //避免调到父类的 get 方法，显式地抛出异常有助于发现错误。
            get: function get() {
                throw new Error(module.id + ' 不支持 get 方式的请求');
            },

            /**
            * 发起网络 post 请求。
            * 请求完成后会最先触发相应的事件。
            * @param {Object} [data] POST 请求的数据对象。
            * @return {SSHAPI} 返回当前 SSHAPI 的实例 this，因此进一步可用于链式调用。
            */
            post: function post(data) {

                var meta = mapper.get(this);
                var emitter = meta.emitter;
                var ajax = meta.ajax;

                var obj = Object.assign({}, ajax, {
                    'data': data || ajax.data || {}
                });

                emitter.fire('request', ['post', obj.data]);

                var Ajax = module.require('Ajax');
                meta.ssh = Ajax.post(obj);

                return this;
            },

            /**
            * 取消当前已发起但未完成的请求。
            * 只有已发起了请求但未完成，才会执行取消操作，并会触发 abort 事件。
            */
            abort: function abort() {
                var meta = mapper.get(this);
                var ssh = meta.ssh;
                if (!ssh) {
                    return;
                }

                ssh.abort();
            }
        });

        //静态成员
        return Object.assign(SSHAPI, { /**@lends SSHAPI*/

            /**
            * 当存在多个产品实例(NetID)时，设置需要使用的项。
            */
            'setServer': function setServer(item) {
                SSH.setServer(item);
            },

            'on': $emitter.on.bind($emitter)
        });
    });

    /**
    * SSH.API 模块的默认配置
    * @name SSH.API.defaults
    */
    define('SSH.API.defaults', /**@lends SSH.API.defaults*/{

        //解析 SSH 返回的 json 中的字段

        /**
        * 成功的状态码。 
        * 只有状态码为该值是才表示成功，其它的均表示失败。
        */
        successCode: 200,

        /**
        * 字段映射。
        */
        field: {
            /**
            * 状态码。
            */
            code: 'Result',
            /**
            * 消息。
            */
            msg: 'ErrMsg',
            /**
            * 主体数据。
            */
            data: 'Data'
        },

        // SSH 需要用到的。
        //下面这些字段在使用时会优先级会高于 SSH 节点中的

        /**
        * 代理配置。
        */
        proxy: null,

        /**
        * 接口名称中的前缀部分。
        * 主要针对一个轻应用中有公共前缀部分的批量接口，设置了公共前缀部分，后续的调用只用后部分简短名称即可。
        */
        prefix: '',

        /**
        * 请求超时的最大值(毫秒)。
        * 0 表示由浏览器控制，代码层面不控制。
        */
        timeout: 0,

        //必选的

        /**
        * 企业号。 必选。
        */
        eid: '',

        /**
        * openid。 必选。
        */
        openid: '',

        //可选的

        /**
        * appid。 可选的。
        */
        appid: '',

        /**
        * netid。 可选的。
        */
        netid: '',

        /**
        * pubacckey。 可选的。
        */
        pubacckey: '',

        /**
        * timestamp。 可选的。
        */
        timestamp: '',

        /**
        * nonce。 可选的。
        */
        nonce: '',

        /**
        * pubaccid。 可选的。
        */
        pubaccid: '',

        /**
        * 要发送的数据。 可选的。
        */
        data: null,

        /**
        * 当 http 协议层发送错误时的默认错误消息文本。
        */
        msg: '网络繁忙，请稍候再试'
    });

    /**
    * SSH 类。
    * @class
    * @name SSH
    * @augments API
    */
    define('SSH', function (require, module, exports) {

        var $Object = require('Object');
        var Emitter = require('Emitter');
        var Defaults = require('Defaults');
        var API = require('API');

        var mapper = require('Mapper'); //这里要用有继承关系的 Mapper

        /**
        * SSH 构造器。
        * @param {string} name 后台接口的名称。 
            简短名称，且不包括后缀。
        * @param {Object} [config] 配置对象。
        */
        function SSH(name, config) {

            name = name || '';
            config = Defaults.clone(module.id, config);

            var emitter = new Emitter(this);
            var successCode = config.successCode;
            var proxy = config.proxy;

            //先过滤出(已存在的)指定成员。
            var ajax = $Object.filter(config, ['ext', 'successCode', 'field', 'prefix', 'serialize', 'timeout',

            //必选的
            'eid', 'openid',

            //可选的
            'appid', 'netid', 'pubacckey', 'timestamp', 'nonce', 'pubaccid', 'data',

            //临时方案，给新版授权使用。
            'url', 'form']);

            //再复制。 
            ajax = Object.assign(ajax, {
                'name': name,
                'proxy': proxy,

                success: function success(data, json, xhr) {
                    //成功
                    fireEvent('success', [data, json, xhr]);
                },

                fail: function fail(code, msg, json, xhr) {
                    //失败
                    fireEvent('fail', [code, msg, json, xhr]);
                },

                error: function error(xhr) {
                    //错误
                    fireEvent('error', [xhr]);
                },

                //timeout字段已用来设置时间了，这里换个名称。
                ontimeout: function ontimeout(xhr) {
                    fireEvent('timeout', [xhr]);
                },

                abort: function abort() {
                    emitter.fire('abort');
                }

            });

            var meta = {
                'ajax': ajax,
                'console': config.console,
                'status': '',
                'args': [],
                'emitter': emitter,
                'api': null, //缓存创建出来的 api 对象。
                'fireEvent': fireEvent //这里要设置进去，因为继续了 API 的关系。
            };

            mapper.set(this, meta);

            //内部共用函数
            function fireEvent(status, args, emitter) {

                meta.api = null; //请求已完成，针对 abort() 方法。

                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;

                emitter.fire('response', args); //最先触发


                //进一步触发具体 code 对应的事件
                if (status == 'success') {
                    emitter.fire('code', successCode, args);
                } else if (status == 'fail') {
                    emitter.fire('code', args[0], args.slice(1)); //错误码不在参数里
                }

                var xhr = args.slice(-1)[0]; //args[args.length - 1]
                if (xhr) {
                    //在 Proxy 的响应中 xhr 为 null
                    emitter.fire('status', xhr.status, args);
                }

                emitter.fire(status, args); //触发命名的分类事件，如 success、fail、error
                emitter.fire('done', args); //触发总事件
            }
        }

        //实例方法
        SSH.prototype = Object.assign(new API(), /**@lends SSH#*/{

            constructor: SSH,

            /**
            * 发起网络 POST 请求。
            * 请求完成后会最先触发相应的事件。
            * @param {Object} [data] POST 请求的数据对象。
            * @param {Object} [query] 查询字符串的数据对象。
            *   该数据会给序列化成查询字符串，并且通过 form-data 发送出去。
            * @return {SSH} 返回当前 SSH 的实例 this，因此进一步可用于链式调用。
            */
            post: function post(data) {

                var meta = mapper.get(this);
                var emitter = meta.emitter;
                var ajax = meta.ajax;

                emitter.fire('request', ['post', data || ajax.data]);

                var Server = module.require('Server');

                Server.get({
                    data: {
                        'eid': ajax.eid,
                        'appid': ajax.appid,
                        'netid': ajax.netid
                    },
                    success: function success(server) {
                        //成功

                        var obj = Object.assign({}, ajax, {
                            'data': data || ajax.data,

                            //来自 Server 的
                            'secret': server['secret'],
                            'version': server['version'],
                            'fromTag': server['fromTag'],
                            'url': server['url'],
                            'netid': server['netid']
                        });

                        //临时方案，给新版授权使用。
                        if (ajax.url) {
                            obj.url = ajax.url;
                        }

                        //为了便于查看调用的 API 名称和 CustData 而打印到控制台。
                        if (meta.console) {
                            //var fullname = ajax.prefix + ajax.name; //api 的完整名称
                            //console.log(fullname, obj.data);

                            var msg = '%c' + ajax.prefix + '%c' + ajax.name;
                            var s0 = 'color:#61a7e5;';
                            //var s1 = 'color:#138df9;font-weight:bold;';
                            var s1 = 'color:#138df9;';

                            console.log(msg, s0, s1, obj.data);
                        }

                        var Ajax = module.require('Ajax');
                        meta.api = Ajax.post(obj);
                    },
                    fail: function fail(code, msg, json, xhr) {

                        if (code == 302) {
                            //存在多个 netid
                            var list = json['NetIDList'] || [];
                            emitter.fire('servers', [list, json, xhr]);
                            return;
                        }

                        var fail = ajax.fail;
                        fail && fail(code, msg, json, xhr);
                    },

                    error: ajax.error

                });

                return this;
            },

            /**
            * 取消当前已发起但未完成的请求。
            * 只有已发起了请求但未完成，才会执行取消操作，并会触发 abort 事件。
            */
            abort: function abort() {
                var meta = mapper.get(this);
                var api = meta.api;
                if (!api) {
                    return;
                }

                api.abort();
            }

        });

        //静态成员
        return Object.assign(SSH, { /**@lends SSH*/

            /**
            * 当存在多个产品实例(NetID)时，设置需要使用的项。
            */
            'setServer': function setServer(item) {
                var Server = module.require('Server');
                Server.set(item);
            }
        });
    });

    /**
    * SSH 模块的默认配置
    * @name SSH.defaults
    */
    define('SSH.defaults', /**@lends SSH.defaults*/{

        /**
        * API 接口 Url 的后缀部分。
        * 针对那些如 '.do'、'.aspx' 等有后缀名的接口比较实用。
        * 这里固定为空字符串，业务层不需要关注该字段。
        */
        ext: '',

        /**
        * 成功的状态码。 
        * 只有状态码为该值是才表示成功，其它的均表示失败。
        */
        successCode: 200,

        /**
        * 字段映射。
        */
        field: {
            /**
            * 状态码。
            */
            code: 'Result',
            /**
            * 消息。
            */
            msg: 'ErrMsg',
            /**
            * 主体数据。
            */
            data: 'DataJson'
        },

        /**
        * 代理配置。
        */
        proxy: null,

        /**
        * 接口名称中的前缀部分。
        * 主要针对一个轻应用中有公共前缀部分的批量接口，设置了公共前缀部分，后续的调用只用后部分简短名称即可。
        */
        prefix: '',

        //必选的

        /**
        * 企业号。 必选。
        */
        eid: '',

        /**
        * openid。 必选。
        */
        openid: '',

        //可选的

        /**
        * appid。 可选的。
        */
        appid: '',

        /**
        * netid。 可选的。
        */
        netid: '',

        /**
        * pubacckey。 可选的。
        */
        pubacckey: '',

        /**
        * timestamp。 可选的。
        */
        timestamp: '',

        /**
        * nonce。 可选的。
        */
        nonce: '',

        /**
        * pubaccid。 可选的。
        */
        pubaccid: '',

        /**
        * 要发送的数据。 可选的。
        */
        data: null,

        /**
        * 是否用 console 把 CustData 打印出来。
        * 由于 CustData 给编码了成字符串，为了便于查看原始对象结构而打印到控制台。
        */
        console: true,

        /**
        * 请求超时的最大值(毫秒)。
        * 0 表示由浏览器控制，代码层面不控制。
        */
        timeout: 0

    });

    /**
    * SSH/Server
    * @class
    */
    define('SSH/Server', function (require, module, exports) {

        var $Date = require('Date');
        var $String = require('String');
        var Defaults = require('Defaults');

        var defaults = Defaults.get(module.id);
        var storage = null;
        var args = null;

        var current = {
            config: null, //缓存 `Server/Config` 中的 get() 结果。
            server: null //缓存当前的 server 信息。
        };

        function getStorage() {

            //已经创建过了
            if (storage || storage === false) {
                return storage;
            }

            //首次创建
            var cache = defaults.cache;
            if (cache == 'session' || cache == 'local') {

                //为了让自动化工具分析出依赖，这里要用完整的字符串常量作为 require() 的第一个参数。
                var Storage = cache == 'session' ? require('SessionStorage') : require('LocalStorage');

                storage = new Storage(module.id, {
                    name: 'KISP'
                });
            } else {
                storage = false; //这里不能用 null，以表示创建过了。
            }

            return storage;
        }

        function ajax(data, config, fnSuccess, fnFail, fnError) {

            config = config || {
                url: '',
                secret: '',
                key: '',
                route: '',
                version: '',
                fromTag: ''
            };

            var API = require('API');
            var MD5 = require('MD5');

            var eid = data['eid'];
            var netid = data['netid'];
            var secret = config['secret'];

            var timestamp = $Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss'); //时间戳。
            var random = $String.random(16); //16位随机数。
            var sign = MD5.encrypt(eid, secret, timestamp, random); //签名。


            var defaults = Defaults.clone(module.id, {
                'url': config.url
                //proxy: 'server.json',
            });

            var api = new API('', defaults);

            api.get({
                'EID': eid,
                'AppID': data['appid'],
                'NetID': netid,
                'AccKey': config['key'],
                'Timestamp': timestamp,
                'State': random,
                'Sign': sign
            });

            api.on('success', function (data, json, xhr) {

                var server = current.server = {
                    'AppSecret': json['AppSecret'],
                    'ServerUrl': json['ServerUrl'],
                    'NetID': json['NetID'] || netid
                };

                use(config, server, fnSuccess);
            });

            api.on('fail', function (code, msg, json, xhr) {
                fnFail && fnFail(code, msg, json);
            });

            api.on('error', function (xhr) {
                fnError && fnError();
            });
        }

        function use(config, server, fn) {
            var Url = require('Url');
            var url = server['ServerUrl'] || '';

            if (!Url.isFull(url)) {
                url = 'http://' + url;
            }

            //当前真实的 netid 值，使用空字符串是为了兼容以前的写法，避免用到 undefined。
            var netid = server['NetID'] || '';

            var data = {
                'secret': server['AppSecret'],
                'version': config['version'],
                'fromTag': config['fromTag'],
                'url': url + config['route'], //类似 'http://120.132.144.214/Webapi/Router'
                'netid': netid
            };

            args = [data];

            var storage = getStorage();
            if (storage) {
                storage.set('args', args);
            }

            fn && fn.apply(null, args);
        }

        //
        return {
            /**
            * 获取服务器信息。
            */
            'get': function get(options) {

                var data = options.data;
                var fnSuccess = options.success;
                var fnFail = options.fail;
                var fnError = options.error;

                var cache = defaults.cache;

                if (cache && args) {
                    //只有启用缓存时才从内存中读取。
                    fnSuccess.apply(null, args);
                    return;
                }

                //可能页面刷新了，导致内存中的不存在，才判断 SessionStorage 或 LocalStroage 中的
                var storage = getStorage();
                if (storage) {
                    args = storage.get('args');
                    if (args) {
                        fnSuccess.apply(null, args);
                        return;
                    }
                }

                var Config = module.require('Config');
                Config.get(function (config) {

                    if (!config) {
                        fnError && fnError();
                        return;
                    }

                    current.config = config;

                    var server = current.server;
                    if (server) {
                        use(config, server, fnSuccess);
                        return;
                    }

                    ajax(data, config, fnSuccess, fnFail, fnError);
                });
            },

            /**
            * 当存在多个 NetID 时，需要手动选择并设置所使用的项。
            */
            'set': function set(server) {

                current.server = server;

                var config = current.config;
                if (config) {
                    use(config, server);
                }
            }
        };
    });

    /**
    * SSH/Server 模块的默认配置
    * @name SSH/Server.defaults
    */
    define('SSH/Server.defaults', /**@lends SSH/Server.defaults*/{
        ext: '',
        successCode: 200,
        field: {
            code: 'Result',
            msg: 'ErrMsg',
            data: 'Data'
        },

        /**
        * 是否启用缓存。
        * 可取的值为 false|true|'session'|'local'
        */
        cache: 'session'
    });

    /*
    * JavaScript MD5
    * https://github.com/blueimp/JavaScript-MD5
    *
    * Copyright 2011, Sebastian Tschan
    * https://blueimp.net
    *
    * Licensed under the MIT license:
    * https://opensource.org/licenses/MIT
    *
    * Based on
    * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
    * Digest Algorithm, as defined in RFC 1321.
    * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
    * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
    * Distributed under the BSD License
    * See http://pajhome.org.uk/crypt/md5 for more info.
    */
    define('MD5', function (require, module, exports) {

        /*
        * Add integers, wrapping at 2^32. This uses 16-bit operations internally
        * to work around bugs in some JS interpreters.
        */
        function safeAdd(x, y) {
            var lsw = (x & 0xffff) + (y & 0xffff);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return msw << 16 | lsw & 0xffff;
        }

        /*
        * Bitwise rotate a 32-bit number to the left.
        */
        function bitRotateLeft(num, cnt) {
            return num << cnt | num >>> 32 - cnt;
        }

        /*
        * These functions implement the four basic operations the algorithm uses.
        */
        function md5cmn(q, a, b, x, s, t) {
            return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
        }
        function md5ff(a, b, c, d, x, s, t) {
            return md5cmn(b & c | ~b & d, a, b, x, s, t);
        }
        function md5gg(a, b, c, d, x, s, t) {
            return md5cmn(b & d | c & ~d, a, b, x, s, t);
        }
        function md5hh(a, b, c, d, x, s, t) {
            return md5cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5ii(a, b, c, d, x, s, t) {
            return md5cmn(c ^ (b | ~d), a, b, x, s, t);
        }

        /*
        * Calculate the MD5 of an array of little-endian words, and a bit length.
        */
        function binlMD5(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << len % 32;
            x[(len + 64 >>> 9 << 4) + 14] = len;

            var i;
            var olda;
            var oldb;
            var oldc;
            var oldd;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;

            for (i = 0; i < x.length; i += 16) {
                olda = a;
                oldb = b;
                oldc = c;
                oldd = d;

                a = md5ff(a, b, c, d, x[i], 7, -680876936);
                d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

                a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5gg(b, c, d, a, x[i], 20, -373897302);
                a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

                a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5hh(d, a, b, c, x[i], 11, -358537222);
                c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

                a = md5ii(a, b, c, d, x[i], 6, -198630844);
                d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

                a = safeAdd(a, olda);
                b = safeAdd(b, oldb);
                c = safeAdd(c, oldc);
                d = safeAdd(d, oldd);
            }
            return [a, b, c, d];
        }

        /*
        * Convert an array of little-endian words to a string
        */
        function binl2rstr(input) {
            var i;
            var output = '';
            var length32 = input.length * 32;
            for (i = 0; i < length32; i += 8) {
                output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
            }
            return output;
        }

        /*
        * Convert a raw string to an array of little-endian words
        * Characters >255 have their high-byte silently ignored.
        */
        function rstr2binl(input) {
            var i;
            var output = [];
            output[(input.length >> 2) - 1] = undefined;
            for (i = 0; i < output.length; i += 1) {
                output[i] = 0;
            }
            var length8 = input.length * 8;
            for (i = 0; i < length8; i += 8) {
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
            }
            return output;
        }

        /*
        * Calculate the MD5 of a raw string
        */
        function rstrMD5(s) {
            return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
        }

        /*
        * Calculate the HMAC-MD5, of a key and some data (raw strings)
        */
        function rstrHMACMD5(key, data) {
            var i;
            var bkey = rstr2binl(key);
            var ipad = [];
            var opad = [];
            var hash;
            ipad[15] = opad[15] = undefined;
            if (bkey.length > 16) {
                bkey = binlMD5(bkey, key.length * 8);
            }
            for (i = 0; i < 16; i += 1) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5c5c5c5c;
            }
            hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
            return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
        }

        /*
        * Convert a raw string to a hex string
        */
        function rstr2hex(input) {
            var hexTab = '0123456789abcdef';
            var output = '';
            var x;
            var i;
            for (i = 0; i < input.length; i += 1) {
                x = input.charCodeAt(i);
                output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
            }
            return output;
        }

        /*
        * Encode a string as utf-8
        */
        function str2rstrUTF8(input) {
            return unescape(encodeURIComponent(input));
        }

        /*
        * Take string arguments and return either raw or hex encoded strings
        */
        function rawMD5(s) {
            return rstrMD5(str2rstrUTF8(s));
        }
        function hexMD5(s) {
            return rstr2hex(rawMD5(s));
        }
        function rawHMACMD5(k, d) {
            return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
        }
        function hexHMACMD5(k, d) {
            return rstr2hex(rawHMACMD5(k, d));
        }

        function md5(string, key, raw) {
            if (!key) {
                if (!raw) {
                    return hexMD5(string);
                }

                return rawMD5(string);
            }

            if (!raw) {
                return hexHMACMD5(key, string);
            }

            return rawHMACMD5(key, string);
        }

        return {

            //md5加密主方法
            encrypt: function encrypt(s) {

                if (arguments.length > 1) {
                    s = Array.from(arguments).join('');
                }

                return md5(s);
            }

        };
    });

    /**
    *
    */
    define('SSH/Server/Config', function (require, module, exports) {

        var Emitter = require('Emitter');
        var Defaults = require('Defaults');

        var json = null;
        var storage = null;

        function getStorage() {

            if (storage !== null) {
                //说明已经创建过了
                return storage;
            }

            //首次创建
            var defaults = Defaults.get(module.id);
            var cache = defaults.cache;

            if (cache == 'session' || cache == 'local') {

                //为了让自动化工具分析出依赖，这里要用完整的字符串常量作为 require() 的第一个参数。
                var Storage = cache == 'session' ? require('SessionStorage') : require('LocalStorage');

                storage = new Storage(module.id, {
                    name: 'KISP'
                });

                return storage;
            }

            storage = false; //这里不能用 null，以表示创建过了。
            return storage;
        }

        function ajax(fn) {

            var defaults = Defaults.get(module.id);
            var url = defaults.url;

            $.getJSON(url, function (data) {

                try {
                    var host = defaults.host || data['kisplusServerS']; //优先使用用户指定的 host。
                    var path = data['kisplusAppsecret'];

                    json = {
                        'version': data['ver'],
                        'fromTag': data['fromtag'],
                        'key': data['AccKey'],
                        'secret': data['AccSecret'],
                        'host': host,
                        'path': path,
                        'route': data['kisplusApiRouter'],
                        'url': host + path
                    };

                    var storage = getStorage();
                    if (storage) {
                        storage.set(json);
                    }
                } catch (ex) {
                    json = null;
                }

                fn && fn(json);

                if (!defaults.cache) {
                    json = null;
                }
            });
        }

        return {

            'get': function get(fn) {

                var defaults = Defaults.get(module.id);
                var cache = defaults.cache;

                if (cache && json) {
                    //只有启用缓存时才从内存中读。
                    fn(json);
                    return;
                }

                var storage = getStorage();
                if (storage) {
                    json = storage.get();

                    if (json) {
                        fn(json);
                        return;
                    }
                }

                ajax(fn);
            }
        };
    });

    /**
    * SSH/Server/Config 模块的默认配置
    * @name SSH/Server/Config.defaults
    */
    define('SSH/Server/Config.defaults', /**@lends SSH/Server/Config.defaults*/{

        url: 'http://mob.cmcloud.cn/kisplus/kisplusconfig.aspx?callback=?',

        /**
        * 是否启用缓存。
        * 可取的值为 false|true|'session'|'local'
        */
        cache: 'session',

        //默认使用服务器返回的(为 `http://kd.cmcloud.cn`)。
        //如果显式指定了该值，则忽略服务器返回的。
        host: ''

    });

    /**
    *
    */
    define('SSH/Ajax', function (require, module, exports) {

        var $Object = require('Object');
        var $Date = require('Date');
        var $String = require('String');
        var Query = require('Query');

        /**
        * 发起 ajax 网络请求(核心方法)。
        */
        function post(config) {
            var MD5 = require('MD5');

            //api 的完整名称
            var fullname = config['prefix'] + config['name'];

            var eid = config['eid'];
            var openid = config['openid'];

            var timestamp = $Date.get('yyyy-MM-dd HH:mm:ss');
            var random = $String.random(16); //16位随机数


            //临时方案，给新版授权使用。
            var form = config.form || {};
            var secret = form.secret || config.secret;

            form.Openid = form.Openid || openid;

            var data = {
                'EID': eid,
                'Openid': openid,
                'Method': fullname,
                'Timestamp': timestamp,
                'Ver': config['version'],
                'FromTag': config['fromTag'],
                'AppID': config['appid'],
                'NetID': config['netid'],

                'IsNewJson': 'Y',
                'IsEncrypt': 'N',

                //签名，值为 md5(EID + AppSecret + Method + Timetamp + State)
                'Sign': MD5.encrypt(eid, secret, fullname, timestamp, random),
                'State': random,

                'CustData': config['data']
            };

            //临时方案，给新版授权使用。
            Object.assign(data, form);
            delete data.secret;

            var query = {
                //'eid': eid,
                //'openid': config['openid'],
                //'pubacckey': config['pubacckey'],
                //'timestamp': config['timestamp'],
                //'nonce': config['nonce'],
                //'pubaccid': config['pubaccid']
            };

            var API = require('API');

            var defaults = $Object.filter(config, ['ext', 'successCode', 'field', 'url', 'proxy', 'serialize', 'timeout']);

            //为方便抓包查看，把完整的名称放在首位。
            defaults.url = Query.add(defaults.url, fullname);

            //这里的 api 名称为空，因为它是固定 url 的，url 中不需要名称。
            //如 url = 'http://120.132.144.214/Webapi/Router'
            var api = new API('', defaults);

            //预绑定事件。
            var events = $Object.filter(config, ['success', 'fail', 'error', 'abort']);

            // 'timeout' 字段已用来设置时间，这里要单独弄。
            events['timeout'] = config.ontimeout;

            api.on(events);

            api.post(data, query);

            return api;
        }

        return (/**@lends Ajax*/{
                'post': post
            }
        );
    });

    /**
    *
    */
    define('SSH.API/Ajax', function (require, module, exports) {

        var $Object = require('Object');

        /**
        * 发起 ajax 网络请求(核心方法)。
        */
        function post(config) {

            var SSH = require('SSH');
            var ssh = new SSH(config.name, config.ssh);

            var fnSuccess = config.success;
            var fnFail = config.fail;
            var fnError = config.error;

            var field = config.field;

            ssh.on({
                //SSH 层请求成功了
                'success': function success(json, root, xhr) {
                    //此处 data 为 json， json 为 root

                    if (!json) {
                        fnError && fnError(xhr);
                    }

                    var successCode = config.successCode;
                    var code = json[field.code];

                    if (code == successCode) {
                        fnSuccess && fnSuccess(json[field.data] || {}, json, xhr);
                    } else {
                        fnFail && fnFail(code, json[field.msg], json, xhr);
                    }
                },

                'fail': function fail(code, msg, json, xhr) {

                    //为了让业务层能知道 SSH 层发生了 fail，通过判断 json 是否为空即可。
                    fnError && fnError(code, msg, json, xhr);
                },

                'error': function error(xhr) {

                    //当 http 协议层连接错误，则 code, msg, json 三个参数都为 undefined。
                    fnError && fnError(undefined, undefined, undefined, xhr);
                },

                'timeout': config.timeout,
                'abort': config.abort,
                'servers': config.servers
            });

            var data = config.data;

            ssh.post({

                'openid': config.ssh.openid,

                'Result': '',
                'ErrMsg': '',
                'AccountDB': '',
                'TotalPage': '',

                'CurrentPage': data['pageNo'],
                'ItemsOfPage': data['pageSize'],

                'Data': $Object.remove(data, ['pageNo', 'pageSize'])
            });

            return ssh;
        }

        return (/**@lends Ajax*/{
                'post': post
            }
        );
    });

    /**
    * 页签列表控件。
    * @class
    * @name Tabs
    */
    define('Tabs', function (require, module, exports) {
        var Emitter = require('Emitter');
        var $Object = require('Object');
        var Template = require('Template');
        var Defaults = require('Defaults');

        //子模块
        var Events = module.require('Events');
        var Meta = module.require('Meta');

        var mapper = new Map();

        /**
        * 构造器。
        * 已重载 Tabs(config); //传入一个配置对象。
        * 已重载 Tabs(container, config); //容器从配置对象中分离出来。
        * @constructor
        */
        function Tabs(container, config) {
            //重载 Tabs(config)
            if ($Object.isPlain(container)) {
                config = container;
                container = config.container;
            }

            config = Defaults.clone(module.id, config);

            var emitter = new Emitter(this);

            var meta = Meta.create(config, {
                'container': container,
                'this': this,
                'emitter': emitter,
                '$': $(container) //
            });

            mapper.set(this, meta);

            //对外暴露的属性。
            Object.assign(this, {
                'container': container,
                'id': meta.id,
                '$': meta.$
            });
        }

        Tabs.prototype = /**@lends Tabs#*/{
            constructor: Tabs,

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
            * 设置模板填充的规则，为模板填充进行预处理。
            */
            template: function template(process) {
                var meta = mapper.get(this);
                var tpl = meta.tpl;

                if (!tpl) {
                    tpl = meta.tpl = new Template(meta.container);
                }

                if (process) {
                    var _tpl2;

                    (_tpl2 = tpl).process.apply(_tpl2, arguments);
                }

                //返回给外面，可能要用到。
                //通过 tabs.template() 即可取得 tpl。
                return tpl;
            },

            /**
            * 填充数据。
            * 触发事件: `fill`。
            */
            fill: function fill(list, process) {
                var meta = mapper.get(this);
                var tpl = this.template(process); //确保 meta.tpl 存在，同时设置填充规则。
                var html = tpl.fill(list);

                meta.$.html(html);
                meta.list = list;

                meta.reset();
                meta.emitter.fire('fill', [list]);

                return html;
            },

            /**
            * 渲染列表。
            * 触发事件: `render`。
            */
            render: function render(list, process) {
                var meta = mapper.get(this);

                //首次渲染。
                if (!meta.change) {
                    Events.bind(meta);
                }

                if (list) {
                    this.fill(list, process);
                }

                meta.emitter.fire('render', [list]);
            },

            /**
            * 激活指定的项。
            * 已重载 active(index);            //不传递任何附加数据，触发事件。
            * 已重载 active(index, true);      //不传递任何附加数据，触发事件。 
            * 已重载 active(index, options);   //传递一些附加数据，触发事件。
            * 已重载 active(index, false);     //不传递任何附加数据，也不触发事件，在某种场景下会用到。
            * @param {number} index 要激活的项的索引值。
            * @param {Object} options 要传递给事件的附加数据。 
            */
            active: function active(index, options) {
                var fireEvent = true; //默认为触发事件。

                //重载
                if (typeof options == 'boolean') {
                    fireEvent = options;
                    options = {};
                } else {
                    options = options || {};
                }

                var meta = mapper.get(this);
                var current = meta.current;

                //当前项已激活，并且配置指定了不允许激活重复的项。
                if (index == current.index && !meta.repeated) {
                    return;
                }

                var item = meta.list[index] || null;
                var actived = meta.activedClass;
                var old = Object.assign({}, current); //先备份。

                if (current.$) {
                    current.$.removeClass(actived); //移除上次已激活过的样式类名。
                }

                current.index = index;
                current.item = item;
                current.event = options.event;
                current.$ = meta.$.find(meta.selector + ':eq(' + index + ')'); //如 `>li:eq(2)`。


                var info = {
                    'current': current,
                    'old': old,
                    'options': options
                };

                meta.activing(info, function () {
                    current.$.addClass(actived);

                    //指定了使用安静模式，则不触发事件。
                    if (!fireEvent) {
                        return;
                    }

                    var args = [item, index, info];
                    var cmd = item ? item.cmd || '' : '';

                    meta.emitter.fire('before-change', args);
                    meta.emitter.fire('change', '' + index, args);

                    //触发指定的事件名。
                    if (cmd) {
                        meta.emitter.fire('change', cmd, args);
                    }

                    meta.emitter.fire('change', args);
                });
            },

            /**
            * 移除指定的项。
            * 仅处理数据和激活项的状态，不移除 DOM 节点。
            * 触发事件: `before-remove`、`remove`。
            */
            remove: function remove(index) {
                var meta = mapper.get(this);
                var activedIndex = meta.current.index;

                meta.fire('before-remove', [index]);

                //移除的是当前激活项之前的，则重新设置激活状态即可。
                if (index < activedIndex) {
                    this.active(activedIndex - 1, false);
                } else if (index == activedIndex) {
                    //移除的是当前的激活项
                    meta.reset();
                }

                meta.list.splice(index, 1);

                meta.fire('remove', [index]);
            },

            /**
            * 重置当前组件到未选中状态。
            */
            reset: function reset() {
                var meta = mapper.get(this);
                meta.reset();
            },

            /**
            * 获取当前实例激活的索引值。
            */
            getActivedIndex: function getActivedIndex() {
                var meta = mapper.get(this);

                return meta.current.index;
            },

            /**
            * 获取或设置 active 时的动画过渡效果函数。
            * 业务层可传入(设置)一个函数 fn 以实现页签激活的动画过渡效果。
            * 函数 fn 会接受到两个参数:
            *   info: { current, old, options, },   //激活过程中的相关信息。
            *   done: function,                     //完成后的回调函数。
            * 在函数 fn 中必须手动调用一下参数中传入的 done() 回调函数，以通知本组件进行后续处理。
            * @example:
            *   tabs.activing(function (info, done) { 
            *       console.log(info);
            *       done();
            *   });
            */
            activing: function activing(fn) {
                var meta = mapper.get(this);

                fn = fn || meta.activing;

                if (typeof fn != 'function') {
                    throw new Error('参数 fn 必须为 function 类型。');
                }

                meta.activing = fn;

                return fn; //业务层可能会到。
            },

            /**
            * 绑定事件。
            */
            on: function on() {
                var _meta$emitter8;

                var meta = mapper.get(this);
                (_meta$emitter8 = meta.emitter).on.apply(_meta$emitter8, arguments);
            },

            /**
            * 销毁本组件。
            */
            destroy: function destroy() {
                var meta = mapper.get(this);

                meta.emitter.destroy();
                meta.tpl.destroy();
                meta.$.off();

                mapper.delete(this);
            }

        };

        return Tabs;
    });

    /**
    * Tabs 模块的默认配置
    * @name Tabs.defaults
    */
    define('Tabs.defaults', /**@lends Tabs.defaults*/{

        /**
        * 创建实例后首先给激的项。
        */
        current: null,

        /**
        * 按下去时的样式的 css 类名。
        */
        pressedClass: '',

        /**
        * 项目给激活时的样式的 css 类名。
        */
        activedClass: '',

        /**
        * 要监听的事件名。
        */
        eventName: 'click',

        /**
        * 取得项目列表所需要用到的选择器。
        * 默认取全部直接子节点。
        */
        selector: '>*',

        /**
        * 是否允许重复激活相同的项。
        * 当指定为 true 时，方响应已给激活的项目的重新点击。
        */
        repeated: false

    });

    /**
    * Tabs 模块的默认配置
    * @name Tabs.config
    */
    define('Tabs.config', /**@lends Tabs.config*/{
        /**
        * 要监听的事件名。
        */
        eventName: 'click'

    });

    /**
    *
    */
    define('Tabs/Events', function (require, module, exports) {
        var $Array = require('Array');
        var $String = require('String');

        return {
            /**
            * 
            */
            bind: function bind(meta) {
                var eventName = meta.eventName;
                var selector = meta.selector;
                var pressed = meta.pressedClass;

                meta.change = function (event) {
                    var target = this;

                    //每次都重新获取列表。
                    //因为可能会动态添加或删除了子节点。
                    var items = meta.$.find(selector).toArray();

                    var index = items.findIndex(function (item) {
                        return item === target;
                    });

                    meta.this.active(index, {
                        'event': event
                    });
                };

                //针对移动端的。


                //针对 PC 端的。
                meta.$.on(eventName, selector, meta.change);

                meta.$.on('mousedown', selector, function (event) {
                    $(this).addClass(pressed);
                });

                meta.$.on('mouseup mouseout', selector, function (event) {
                    $(this).removeClass(pressed);
                });
            }

        };
    });

    define('Tabs/Meta', function (require, module, exports) {
        var $ = require('$');
        var $String = require('String');
        var RandomId = require('RandomId');

        var prefix = 'KISP-Tabs-'; //用于生成组件 id 的前缀部分。
        var suffix = 4; //用于生成组件 id 的随机部分的长度。


        return {
            create: function create(config, others) {
                var id = RandomId.get(prefix, suffix);

                var meta = {
                    'id': id,
                    'activedClass': config.activedClass || '', //激活时的 item 的样式类名。
                    'pressedClass': config.pressedClass || '', //按下时的 item 的样式类名。
                    'eventName': config.eventName || '', //
                    'selector': config.selector || '', //子项的选择器。
                    'repeated': !!config.repeated, //是否允许重复激活。
                    'list': config.list || [], //fill() 时对应的列表数据。


                    //当前激活的信息。
                    'current': {
                        index: -1,
                        item: null, //list[index];
                        event: null,
                        $: null
                    },

                    'container': null, //
                    'tpl': null, //
                    'emitter': null, //事件驱动器。
                    'this': null, //当前实例，方便内部使用。
                    '$': null, //组件最外层的 DOM 节点的 jQuery 实例。
                    'change': null, //change 事件处理函数。 如果非空，则说明已绑定。

                    'reset': function reset() {
                        meta.$.find(meta.selector).removeClass(meta.activedClass);

                        meta.current = {
                            index: -1,
                            item: null, //list[index];
                            event: null,
                            $: null
                        };
                    },

                    //在 acitve 过程中要执行的回调函数。 
                    //业务层可传入此函数以实现页签激活的动画过渡效果。
                    //若提供此函数，则必须手动调用一下参数中传入的 done() 回调函数，以通知本组件进行后续处理。
                    'activing': function activing(info, done) {
                        done();
                    }
                };

                Object.assign(meta, others);

                return meta;
            }
        };
    });

    /**
    * 简易信息提示组件。
    * @class
    * @name Toast
    */
    define('Toast', function (require, module, exports) {
        var $String = require('String');
        var Emitter = require('Emitter');
        var Defaults = require('Defaults');

        //子模块
        var Sample = module.require('Sample');
        var Style = module.require('Style');
        var Meta = module.require('Meta');
        var Masker = module.require('Masker');

        var mapper = new Map();

        /**
        * 构造器。
        * @constructor
        */
        function Toast(config) {
            config = Defaults.clone(module.id, config);

            var emitter = new Emitter(this); //事件驱动器。
            var style = Style.get(config); //
            var masker = Masker.create(config); //

            var meta = Meta.create(config, {
                'sample': Sample, //相应的 html 模板。
                'style': style, //从配置中过滤出样式成员，并进行规范化处理，style 是一个 {}。
                'emitter': emitter, //事件驱动器。
                'masker': masker, //遮罩层实例。
                'this': this //当前实例，方便内部使用。
            });

            mapper.set(this, meta);

            //对外暴露的属性。
            Object.assign(this, {
                'id': meta.id
            });
        }

        //实例方法
        Toast.prototype = /**@lends Toast#*/{
            constructor: Toast,

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
            * 该方法只允许调用一次。
            * 触发事件: `render`。
            */
            render: function render() {
                var meta = mapper.get(this);

                //已经渲染过了。
                if (meta.$) {
                    return;
                }

                var Style = require('Style');
                var style = Style.stringify(meta.style);

                var html = $String.format(meta.sample, {
                    'id': meta.id,
                    'icon': meta.icon,
                    'text': meta.text,
                    'textId': meta.textId,
                    'iconId': meta.iconId,
                    'cssClass': meta.cssClass,
                    'style': style
                });

                $(meta.container).append(html);

                meta.$ = this.$ = $('#' + meta.id);
                meta.$icon = $('#' + meta.iconId);
                meta.$text = $('#' + meta.textId);

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
            show: function show(text, done) {
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

                meta.$.toggleClass('NoIcon', !meta.icon);
                meta.$.toggleClass('NoText', !meta.text);
                meta.$.show();
                meta.emitter.fire('show');
            },

            /**
            * 隐藏本组件。
            * 触发事件: `hide`。
            */
            hide: function hide() {
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
            remove: function remove() {
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
                meta.$icon = null;
                meta.$text = null;
                meta.masker = null;

                meta.emitter.fire('remove');
            },

            /**
            * 绑定事件。
            */
            on: function on() {
                var _meta$emitter9;

                var meta = mapper.get(this);
                (_meta$emitter9 = meta.emitter).on.apply(_meta$emitter9, arguments);
            },

            /**
            * 销毁本组件
            */
            destroy: function destroy() {
                var meta = mapper.get(this);

                this.remove();

                meta.emitter.destroy();
                mapper.remove(this);
            }

        };

        return Toast;
    });

    /**
    * Toast 模块的默认配置
    * @name Toast.defaults
    */
    define('Toast.defaults', /**@lends Toast.defaults*/{

        /**
        * 提示文本。
        */
        text: '',

        /**
        * 组件添加到的容器。
        * 默认为 document.body。
        */
        container: 'body',

        /**
        * 是否启用 mask 层。
        */
        mask: false,

        /**
        * 用到的 font-awsome 的图标。
        */
        icon: 'check',

        /**
        * 显示的持续时间(毫秒)。
        * 0 表示一直显示。
        */
        duration: 0,

        /**
        * 组件用到的 css 类名。
        */
        cssClass: '',

        /**
        * 组件的 css 样式 z-index 值。
        * 为了给其它组件计算 `z-index`，此处需要显式提供一个值。
        * 因为仅用 css 中的会比较麻烦。
        */
        'z-index': 1024,

        /**
        * 组件宽度。
        * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
        */
        width: '',

        /**
        * 组件高度。
        * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
        */
        height: '',

        /**
        * 样式集合。
        * 外层的同名字段优先级高于里面的。
        */
        style: {}

    });

    /*
    * Toast/Sample
    * 由 kisp-packer 生成。 
    * 来源: ../build/pc/8.1.0/src/ui/toast/Toast/Sample.html
    */
    define('Toast/Sample', ['<div id="{id}" class="KISP Toast {cssClass}" style="{style}">', '    <div>', '        <i id="{iconId}" class="fa fa-{icon}"></i>', '    </div>', '    <span id="{textId}" class="Text">{text}</span>', '</div>'].join('\n'));

    /**
    * 
    */
    define('Toast/Style', function (require, module, exports) {
        var $Object = require('Object');
        var Style = require('Style');

        return {

            /**
            * 从配置对象中过滤出样式成员，并进行规范化处理。
            * 返回一个样式对象 {}。
            */
            get: function get(config) {
                var obj = $Object.filter(config, ['height', 'width', 'z-index']);
                var style = Style.objectify(config.style);

                style = Style.merge(style, obj);
                style = Style.pixelize(style, ['height', 'width']);

                return style;
            }

        };
    });

    define('Toast/Meta', function (require, module, exports) {
        var $ = require('$');
        var $String = require('String');
        var RandomId = require('RandomId');

        var prefix = 'KISP-Toast-'; //用于生成组件 id 的前缀部分。
        var suffix = 4; //用于生成组件 id 的随机部分的长度。


        return {
            create: function create(config, others) {
                var id = RandomId.get(prefix, suffix);
                var textId = RandomId.get(prefix, 'text-', suffix);
                var iconId = RandomId.get(prefix, 'icon-', suffix);
                var text = config.text;

                text = typeof text == 'number' ? String(text) : text;
                text = text || '';

                var meta = {
                    'id': id,
                    'icon': config.icon,
                    'text': text,
                    'textId': textId,
                    'iconId': iconId,
                    'cssClass': config.cssClass || '',
                    'container': config.container,
                    'duration': config.duration || 0,
                    'sample': '',
                    'style': '', //样式字符串。

                    'masker': null, // Mask 的实例，重复使用。
                    'emitter': null, //事件驱动器。
                    'this': null, //当前实例，方便内部使用。
                    '$': null, //组件最外层的 DOM 节点的 jQuery 实例。
                    '$icon': null, //$(iconId)。
                    '$text': null //$(textId)。

                };

                Object.assign(meta, others);

                return meta;
            }
        };
    });

    define('Toast/Masker', function (require, module, exports) {
        var $ = require('$');

        return {
            create: function create(config) {
                var Mask = require('Mask');

                var defaults = {
                    'container': config.container
                };

                var options = Mask.normalize(defaults, config.mask); //返回一个 {} 或 null。


                if (!options) {
                    return null;
                }

                Object.assign(options, {
                    'z-index': config['z-index'] - 1
                });

                var masker = new Mask(options);

                return masker;
            }
        };
    });
    /*
    * Scroller/Pulldown/Indicator/Sample
    * 由 kisp-packer 生成。 
    * 来源: ../build/pc/8.1.0/src/mobile/scroller/Scroller/pulldown/Pulldown/Indicator/Sample.html
    */
    define('Scroller/Pulldown/Indicator/Sample', ['', '', '<div id="{id}" class="Scroller-Pulldown-Indicator" style="display: none; transform: translateY({translateY}px);">下拉刷新</div>'].join('\n'));

    /*
    * Scroller/Pullup/Indicator/Sample
    * 由 kisp-packer 生成。 
    * 来源: ../build/pc/8.1.0/src/mobile/scroller/Scroller/pullup/Pullup/Indicator/Sample.html
    */
    define('Scroller/Pullup/Indicator/Sample', ['', '', '<div id="{id}" class="Scroller-Pullup-Indicator" style="display: none; transform: translateY({translateY}px); ">上拉加载更多</div>'].join('\n'));

    /*
    * Loading/Sample/IOS
    * 由 kisp-packer 生成。 
    * 来源: ../build/pc/8.1.0/src/ui/loading/Loading/Sample/IOS.html
    */
    define('Loading/Sample/IOS', ['<div id="{id}" class="KISP Loading-iOS {cssClass}" >', '    <div class="Main">', '        <div class="Item-0"></div>', '        <div class="Item-1"></div>', '        <div class="Item-2"></div>', '        <div class="Item-3"></div>', '        <div class="Item-4"></div>', '        <div class="Item-5"></div>', '        <div class="Item-6"></div>', '        <div class="Item-7"></div>', '        <div class="Item-8"></div>', '        <div class="Item-9"></div>', '        <div class="Item-10"></div>', '        <div class="Item-11"></div>', '    </div>', '    <span id="{textId}" class="Text">{text}</span>', '</div>'].join('\n'));

    (function (require) {
        var KISP = require('KISP');
        var OuterModule = require('OuterModule');

        global.KISP = KISP; //对外提供的命名空间 KISP。
        global.define = OuterModule.define; //这个 define 是对外的，跟内部用的 define 不是同一个。

    })(InnerModules.require);
})(window, // 在浏览器环境中。

top, parent, window, document, location, navigator, localStorage, sessionStorage, console, history, setTimeout, setInterval, Array, Boolean, Date, Error, Function, JSON, Map, Math, Number, Object, RegExp, String, window.jQuery, //不要省略前面的 `window.`，因为这样即使 jQuery 不存在也不会报错。

undefined);