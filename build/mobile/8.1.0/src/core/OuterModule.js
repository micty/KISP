
/**
* 对外提供的业务层的模块管理器。
* @namespace
* @name OuterModule
*/
define('OuterModule', function (require, module, exports) {
    var Defaults = require('Defaults');
    var Emitter = require('Emitter');


    var defaults = Defaults.clone(module.id, {
        'Emitter': Emitter, //事件驱动器的构造器。
    });


    //对外给业务层使用的模块管理器。
    var mm = new ModuleManager(defaults);


    return /**@lends Module*/ {
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
        'require': mm.require.bind(mm),

    };

});
