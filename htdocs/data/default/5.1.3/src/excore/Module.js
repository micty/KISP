
/**
* 对外提供的页面级别的模块管理器。
* @namespace
* @name Module
*/
define('Module', function (require, module, exports) {

    var MiniQuery = require('MiniQuery');
    var Module = MiniQuery.require('Module');
    var Config = require('Config');

    var defaults = Config.get(module);

    var mod = new Module(defaults);


    return /**@lends Module*/ {

        /**
        * 定义指定名称的模块。
        * @function
        * @param {string} id 模块的名称。
        * @param {Object|function} factory 模块的导出函数或对象。
        */
        define: mod.define.bind(mod),

        /**
        * 加载指定的模块。
        * @function
        * @param {string} id 模块的名称。
        * @return 返回指定的模块。
        */
        require: mod.require.bind(mod),

        modules: mod.modules.bind(mod),
        tree: mod.tree.bind(mod),

    };

});
