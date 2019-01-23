
/**
* KISP 内部使用的模块管理器。
*/
var InnerModules = (function (ModuleManager) {

    //内部使用的模块管理器。
    var mm = new ModuleManager({
        cross: true,       //内部的，要允许跨级加载模块。 用于在一步到位加载某个模块的默念配置，如 `SSH/Server.defaults`
    });

    //记录要对外暴露的模块。
    var id$exposed = {};


    return {
        'has': mm.has.bind(mm),
        'define': mm.define.bind(mm),       //本文件的底部即用到。
        'require': mm.require.bind(mm),     //在 `partial/end.js` 中用到。

        /**
        * 绑定到指定模块的指定方法。
        * @param {string} id 模块的 id。
        * @param {string} name 要绑定的模块方法的名称。
        * @param {Object|boolean} context 绑定的方法执行时的上下文，即 this 变量的指向。
            如果传入 true，则表示当前要绑定的模块本身。
        * @return {function} 返回绑定后的方法。
        */
        bind: function (id, name, context) {

            return function (...args) {
                var M = mm.require(id);
                var fn = M[name];

                if (typeof fn != 'function') {
                    throw new Error(`要绑定的模块 ${id} 中不存在名为 ${name} 的方法或函数。`);
                }

                context = context === true ? M : context || null;

                return fn.call(context, ...args);
            };
        },


        /**
        * 获取或设置模块的暴露状态。
        * 已重载 expose([]); //批量设置指定的模块列表为暴露状态。
        * 已重载 expose({}); //批量设置暴露状态。
        * 已重载 expose(id, exposed); //单个设置暴露状态。
        * 已重载 expose(id); //获取单个的暴露状态。
        */
        expose: function (id, exposed) {

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
            if (typeof id == 'object') {
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

        },
    };

})(ModuleManager);

//内部使用的 define。
var define = InnerModules.define;    


