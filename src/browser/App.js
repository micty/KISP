
/**
* App 启动类。 
* @class
* @name App
*/
define('App', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var $String = require('String');
    var Defaults = require('Defaults');
    var Module = require('Module');     //对外给页面提供的模块管理器。
    var Router = require('Router');
   

    var defaults = Defaults.get(module.id);
    


    return /**@lends App#*/ {


        /**
        * 初始化执行环境，并启动应用程序。
        * @param {function} factory 工厂函数，即启动函数。
        */
        launch: function (factory) {
            var name = defaults.name;       //app 的名称，一般为空字符串。

            Module.define('KISP', function () {
                return KISP;
            });

            Module.define('$', function () {
                return $;
            });

            //先定义一个顶级的模块。
            Module.define(name, function ($require, $module, $exports) {

                var routers = Router.get($require, $module, $exports);

                $module.bind(routers);

                factory && factory($require, $module, $exports);

            });


            //定义完后马上加载即可启动。
            Module.require(name);

        },

    };



});

