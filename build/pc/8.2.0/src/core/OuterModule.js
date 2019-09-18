
/**
* 对外提供的业务层的模块管理器。
* @namespace
* @name OuterModule
*/
define('OuterModule', function (require, module, exports) {
    var $String = require('String');
    var $Object = require('Object');
    var Defaults = require('Defaults');
    var Emitter = require('Emitter');


    var defaults = Defaults.clone(module.id, {
        'Emitter': Emitter, //事件驱动器的构造器。
    });


    //对外给业务层使用的模块管理器。
    var mm = new ModuleManager(defaults);

    //针对模板模块。
    var id$factory = {};


    return /**@lends Module*/ {
        /**
        * 默认配置。
        */
        'defaults': defaults,

        /**
        * 定义指定名称的模块。
        * 该方法对外给业务层使用的。
        * @function
        * @param {string} id 模块的名称。 可以是一个模板。
        * @param {Object|function} factory 模块的导出函数或对象。
        */
        'define': function (id, factory) {
            
            var isTPL = id.includes('{') && id.includes('}');   // id 为一个模板字符串，如 `{prefix}/Address`。

            if (isTPL) {
                id$factory[id] = factory;   //定义一个模板模块，则先缓存起来。
            }
            else {
                mm.define(id, factory);
            }

        },

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
     
        /**
        * 填充一个模板模块，以生成（定义）一个真正的模块。
        *   sid: '',    //模板模板的 id，如 `{prefix}/Address`
        *   data: {},   //要填充的数据，如 { prefix: 'Demo/User', }
        */
        'fill': function (sid, data) {

            //需要扫描所有模板，同时填充它的子模块。
            $Object.each(id$factory, function (id, factory) {

                //如 sid 为 `{prefix}/Address`，
                //则所有以它为开头的模板模块都要填充，
                //如 id 为 `{prefix}/Address/API`
                if (!id.startsWith(sid)) {
                    return;
                }

                //填充成完整的模块 id。
                id = $String.format(id, data); 

                console.log(`动态定义模块: ${id}`);

                mm.define(id, factory);

            });


    

        },

    };

});
