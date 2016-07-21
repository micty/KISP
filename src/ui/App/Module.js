
define('App/Module', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Emitter = MiniQuery.require('Emitter');



    function enhance(module) {

        var emitter = new Emitter();
        var requireSub = module.require.bind(module);
        var name$required = {};


        function bind(name, events) {
            //重载 bind(name, fn)
            if (typeof events == 'function') {
                module.on('require', name, events);
                return;
            }

            var args = [].slice.call(arguments, 1);

            module.on('require', name, function (M) {
                M.on.apply(M, args);
            });
        }



        $.Object.extend(module, {

            'require': function (name) {

                var M = requireSub(name);

                if (M && !name$required[name]) {
                    name$required[name] = true;
                    emitter.fire('require', name, [M]); //触发首次加载事件。
                }

                return M;
            },

            /**
            * 绑定模块事件。
            */
            'bind': function (name, events) {
                //重载 bind({})，多个模块的批量绑定。
                if (typeof name == 'object') {
                    $.Object.each(name, function (name, events) {
                        bind(name, events);
                    });
                }
                else { //绑定单个模块
                    bind(name, events);
                }
            },

            /**
            * 加载指定的子模块并调用 render 方法，可向其传递一些参数。
            * @param {string} name 要加载的子模块名称。
            * @return {Object} 返回加载到的子模块实例。
            */
            'render': function (name, arg0, arg1, argN) {
                var args = [].slice.call(arguments, 1);
                var M = module.require(name);
                M.render.apply(M, args);
                return M;
            },


            /**
            * 异步加载指定的子模块并执行回调函数。
            * 该方法会先尝试用同步方式加载子模块，如果成功则直接调用回调函数；否则使用异步方式加载。
            * 一旦加载成功，在第二次及以后都会使用同步方式。
            * @param {string} name 要加载的子模块名称。
            * @param {string|Object} [container] 加载到的子模块的 html 内容需要附加到的容器(jQuery选择器)。
            *   只有指定了该参数，并且加载到的 html 内容不为空才会附加到容器。
            * @param {function} fn 加载成功后要执行的回调函数。
            *   该函数会接收一个参数: 加载到的子模块实例。
            */
            'load': function (name, container, fn) {

                //重载 load(name, fn);
                if (typeof container == 'function') {
                    fn = container;
                    container = null;
                }

                var M = module.require(name);
                if (M) {
                    fn && fn(M);
                    return;
                }

                var Package = require('Package');
                Package.load(name, function (pack) {

                    var item = pack['html'];
                    if (container && item && item.content) {
                        $(container).append(item.content);
                    }
                    

                    var M = module.require(name);

                    if (!M) {
                        throw new Error('不存在名为 ' + name + ' 的子模块');
                    }

                    fn && fn(M);

                });
            },

            'on': emitter.on.bind(emitter),


        });

    }

    return {
        'enhance': enhance,
    };


});

