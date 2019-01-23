
/**
* 树型结构的 CMD 模块管理器类。
* 主要实现模块的定义 (define) 和加载 (require) 功能。
* @class
* @name ModuleManager
*/
var ModuleManager = (function (Module) {

    var mapper = new Map();

    //默认配置。
    var defaults = {
        seperator: '/',     //模块 id 内的名称分隔符，如 `Users/List/API`。
        cross: false,       //是否允许跨级加载模块。
        repeated: false,    //是否允许重复定义同一个 id 的模块。
        Emitter: null,      //事件驱动器类。
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
            'seperator': config.seperator,  //父子模块命名中的分隔符，如 `User/List/API`。
            'cross': config.cross,          //是否允许跨级加载模块。
            'repeated': config.repeated,    //是否允许重复定义模块。
            'emitter': emitter,             //当前 `模块管理器` 的全局事件管理器。
            'Emitter': Emitter,             //事件管理器构造器。 用于 define() 中，以便针对每个模块创建它私有的 emitter。
            'this': this,                   //方便内部访问 this 对象。

          
            /**
            * 用于给工厂函数加载公共模块。
            * 同时限制为仅允许加载公共模块。
            * 即 factory(require, module, exports){ } 中的第一个参数 `require`。
            */
            'require': function (id) {
                return meta.this.require(id, false);
            },

            /**
            * 内部使用的，触发全局事件。
            */
            'fire': function () {
                emitter && emitter.fire(...arguments);
            },

            /**
            * 内部使用的，获取指定 id 对应的父模块对象。
            * 如 `User/List/API` 的父模块 id 为 ``User/List`。
            */
            'getParent': function (id) {
                var seperator = meta.seperator;
                var names = id.split(seperator);

                //顶级模块。
                if (names.length == 1) {
                    return null;
                }

                //如 `Users/List`
                var pid = names.slice(0, -1).join(seperator);

                return meta.id$module[pid] || null;
            },

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
    ModuleManager.prototype = /**@lends ModuleManager#*/ {
        constructor: ModuleManager,

        /**
        * 判断指定的模块是否已定义。
        */
        has: function (id) {
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
        define: function (id, factory) {
            if (typeof id != 'string') {
                throw new Error(`参数 id 的类型必须为 string，当前为: ${typeof id}`);
            }

            var meta = mapper.get(this);
            var id$module = meta.id$module;

            if (!meta.repeated && id$module[id]) {
                throw new Error(`配置设定了不允许定义重复的模块: 已存在名为 ${id} 的模块`);
            }

            var Emitter = meta.Emitter;
            var emitter = Emitter ? new Emitter() : null;
            var name = id.split(meta.seperator).slice(-1)[0];      //取最项一项作为短名称，如 `API`。

            id$module[id] = {
                'id': id,           //全名称，如 `Users/List/API`。
                'name': name,       //短名称，如 `API`。 如果 name == id，则说明是顶级模块，即不含有 `/`。
                'factory': factory, //原始的工厂函数或导出对象。
                'emitter': emitter, //用于工厂函数第二个参数 `module` 的事件驱动器。

                //以下的在 require() 后肯定会给改写。
                'parent': null,     //父级对象。 如果为空，则说明是顶级模块。
                'required': false,  //指示是否已经 require 过。
                'count': 0,         //require 的次数统计。

                //以下的在 require() 后可能会给改写。
                'exports': null,    //最终的导出对象。 要么是 factory 本身，要么是 factory 运行后的结果。
                'mod': null,        //工厂函数第二个参数 `module`。 如果工厂函数是一个直接导出对象，则它为空。

                //触发当前模块级别的事件。
                'fire': function () {
                    emitter && emitter.fire(...arguments);
                },
            };


        },

        /**
        * 加载指定的模块。
        * @param {string} id 模块的名称。
        * @param {boolean} cross 是否允许跨级加载模块。
        *   如果不指定，则根据创建实例时指定的 cross 来决定。
        * @return 返回指定的模块的导出对象。
        */
        require: function (id, cross) {
            if (typeof id != 'string') {
                throw new Error(`参数 id 的类型必须为 string，当前为: ${typeof id}`);
            }

            var meta = mapper.get(this);
            var seperator = meta.seperator;


            //未指定，则使用创建实例时的配置。
            if (cross === undefined) {
                cross = meta.cross;
            }

           
            if (!cross && id.includes(seperator)) {
                throw new Error(`参数指定了或配置设定了不允许跨级加载模块: ${id}`);
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
                'exports': exports,                     //模块的导出对象。
                'parent': parent ? parent.mod : null,   //父模块实例。
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
        on: function (...args) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            emitter && emitter.on(...args);
        },

        /**
        * 销毁本实例。
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            emitter && emitter.destroy();
            mapper.delete(this);

        },
    };


    return ModuleManager;

})(Module);

