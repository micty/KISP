
define('App/Module', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Emitter = MiniQuery.require('Emitter');



    function enhance(module) {

        var emitter = new Emitter();
        var require = module.require.bind(module);
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

                var M = require(name);

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

            'on': emitter.on.bind(emitter),


        });

    }

    return {
        'enhance': enhance,
    };


});

