
/**
* 对外提供的业务层的模块管理器。
* @namespace
* @name Module
*/
define('Module', function (require, module, exports) {
    var Defaults = require('Defaults');
    var Emitter = require('Emitter');


    var defaults = Defaults.clone(module.id, {
        'Emitter': Emitter, //事件驱动器的构造器。
    });


    //对外给业务层使用的模块管理器。
    var mm = new ModuleManager(defaults);


    return /**@lends Module*/ {

        /**
        * 定义指定名称的模块。
        * @function
        * @param {string} id 模块的名称。
        * @param {Object|function} factory 模块的导出函数或对象。
        */
        'define': mm.define.bind(mm),

        /**
        * 加载指定的模块。
        * @function
        * @param {string} id 模块的名称。
        * @return 返回指定的模块。
        */
        'require': mm.require.bind(mm),

    };

});
