
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
            'tree': new Tree(),
        };

        mapper.set(this, meta);

    }

    //实例方法
    Emitter.prototype = /**@lends Emitter.prototype */ {
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
        on: function (name, fn) {

            //重载 on([]); 分两种情况。
            if (Array.isArray(name)) {
                if (fn) { //重载 on(names, fn); 把多个事件名称绑定到同一个回调函数。
                    name.map(function (name) {
                        this.on(name, fn);
                    }, this);
                }
                else {  //重载 on(args); 主要是为了方便调用方快速重绑定自己的 on() 方法。
                    this.on(...name);
                }

                return;
            }


            var meta = mapper.get(this);
            var tree = meta.tree;
            var args = Array.from(arguments);

            //重载 on(name0, name1, ..., nameN, {...}) 的情况。
            //先尝试找到 {} 所在的位置。
            var index = args.findIndex(function (item, index) {
                return typeof item == 'object';
            });

            if (index >= 0) {
                var obj = args[index];              //{} 部分。
                var names = args.slice(0, index);   //前缀部分 [name0, name1, ..., nameN]。
                var list = $Object.flat(obj);       //{} 部分扁平化。

                list.forEach(function (item, index) {
                    var keys = names.concat(item.keys); //完整路径。

                    var node = tree.get(keys) || {
                        'list': [],         //本节点的回调列表。
                        'count': 0,         //本节点触发的次数计数。
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
                'list': [],         //本节点的回调列表。
                'count': 0,         //本节点触发的次数计数。
                'enabled': true,    //当为 false 时，表示本节点的回调被禁用。
                'spreaded': true,   //当为 false 时，表示子节点的回调被禁用。
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
        off: function (name, fn) {
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
                return typeof item == 'object';
            });

            if (index >= 0) {
                var obj = args[index];              //{} 对象。
                var names = args.slice(0, index);   //前缀部分 [name0, name1, ..., nameN]。
                var list = $Object.flat(obj);       //{} 对象部分扁平化。

                list.forEach(function (item, index) {
                    var keys = names.concat(item.keys); //完整路径。
                    var node = tree.get(keys);          //该路径对应的节点。
                    
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
            }
            else { //未指定处理函数，则清空列表
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
        fire: function (name, params) {
            var meta = mapper.get(this);
            var tree = meta.tree;
            var context = meta.context;
            var args = Array.from(arguments);

            var index = args.findIndex(function (item, index) {
                return Array.isArray(item);
            });

            if (index < 0) {
                index = args.length;
            }

            var names = args.slice(0, index);
            var node = tree.get(names);
            var returns = [];

            if (!node) { //不存在该事件名对应的节点。
                return returns;
            }

            params = args[index] || [];
            node.count++;

            node.list.forEach(function (fn, index) {
                //让 fn 内的 this 指向 context，并收集返回值。
                var value = fn.apply(context, params);
                returns.push(value);
            });

            return returns;

        },

        /**
        * 设置指定的属性为指定的值。
        * 如可以在触发事件前动态改变 context 值。
        */
        set: function (key, value) {
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
        destroy: function () {
            var meta = mapper.get(this);
            meta.tree.destroy();
            mapper.delete(this);
        },


    };

    
    return Emitter;

});