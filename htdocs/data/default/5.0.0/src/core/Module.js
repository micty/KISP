
/**
* KISP 内部模块管理器
* @ignore
*/
var Module = (function () {

    var Module = MiniQuery.require('Module');

    var mod = new Module({
        seperator: '/',
        crossover: true,
        repeated: false, //不允许重复定义 
    });

    return {
        define: mod.define.bind(mod),
        require: mod.require.bind(mod), //该方法仅用于 end.js 中
        expose: mod.expose.bind(mod),
        modules: mod.modules.bind(mod),
        tree: mod.tree.bind(mod),

        /**
        * 绑定到指定模块的指定方法。
        * @param {string} id 模块的名称(id)。
        * @param {string} name 模块的方法名称。
        * @param {Object|boolean} context 绑定的方法执行时的上下文，即 this 变量的指向。
            如果传入 true，则表示当前要绑定的模块本身。
        * @return {function} 返回绑定后的方法。
        */
        bind: function (id, name, context) {
            return function () {
                var M = mod.require(id);
                var args = [].slice.call(arguments, 0);
                context = context === true ? M : context;
                M[name].apply(context || null, args);
            };
        },
    };

})();

//提供快捷方式
var define = Module.define;
var require = Module.require;



