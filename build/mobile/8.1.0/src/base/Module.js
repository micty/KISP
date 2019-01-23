
/**
* 用于工厂函数中的第二个参数 `module` 的构造器。
* 工厂函数原型为: factory(require, module, exports) { }
*/
var Module = (function () {

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
                    value: function (name) {
                        throw new Error(`禁止通过父模块来加载同级模块：模块 ${id} 尝试加载同级模块 ${name}。`);
                    },
                },
            });
        }


        //内部方法使用的字段。
        //安全起见，不使用暴露给外面的的那份，防止调用方恶意去改。
        var meta = {
            'id': id,                   //模块 id，`Users/List/API`。
            'seperator': seperator,     //上下级模块名称的分隔符，如 `/`。
            'emitter': config.emitter,  //事件驱动器。 可以为空。
            'mm': config.mm,            //所属的模块管理器。
            'this': this,               //方便访问自己。
        };

        mapper.set(this, meta);



        //暴露给外部使用的属性。
        Object.assign(this, {
            'id': id,
            'name': name,
            'seperator': seperator,

            //扩展到 this 的成员。
            'exports': config.exports,  //模块的导出对象。
            'parent': parent,           //父模块。
        });
    }

    

    //实例方法。
    Module.prototype = {
        constructor: Module,

        id: '',         //模块的 id，如 `Users/List/API`。
        name: '',       //模块的(短)名称，如 `API`。
        seperator: '',  //模块 id 中的分隔符，如 `/`。 
        exports: null,  //模块的导出对象。
        parent: null,   //父模块。

        /**
        * 在当前模块上绑定事件。
        */
        on: function (...args) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            emitter && emitter.on(...args);
        },

        /**
        * 加载直接子模块。
        * 即工厂函数 factory(require, module, exports) {} 中的第二个参数要用到的方法如：
        *   var Helper = module.require('Helper');
        * @param {string} name 直接下级模块的短名称。
        *   注意：短名称中不允许包含分隔符，如 `/`。
        */
        require: function (name) {
            var meta = mapper.get(this);
            var seperator = meta.seperator;
            var id = meta.id + seperator + name;    //完整名称，如 `Users/List/API/Helper`。

            if (name.includes(seperator)) {
                throw new Error(`模块 ${meta.id} 不允许跨级加载模块: ${id}`);
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
        bind: function (name, events) {
            //把单个绑定和批量绑定统一形式。
            var name$events = typeof name == 'object' ? name : { [name]: events, };
            var meta = mapper.get(this);

            Object.keys(name$events).forEach(function (name) {
                var events = name$events[name];

                var fn = (typeof events == 'function') ? events : function (M) {
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
        render: function (name, ...args) {
            var M = this.require(name);

            if (!M) {
                throw new Error(`模块 ${meta.id} 不存在名为 ${name} 的直接子模块`);
            }

            M.render(...args);
            return M;
        },



    };


    return Module;

})();
