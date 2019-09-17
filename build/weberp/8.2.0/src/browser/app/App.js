
/**
* App 启动类。 
* @class
* @name App
*/
define('App', function (require, module, exports) {
    var $String = require('String');
    var Defaults = require('Defaults');
    var OuterModule = require('OuterModule');     //对外给页面提供的，即业务层的模块管理器。
    var Router = require('Router');
   
    var Navigator = module.require('Navigator');
    var defaults = Defaults.get(module.id);
    


    return exports = /**@lends App*/ {


        /**
        * 初始化执行环境，并启动应用程序。
        * @param {function} factory 工厂函数，即启动函数。
        */
        init: function (factory) {
            var name = defaults.name;
            var root = defaults.root;                       //app 的名称，一般为空字符串。
            var seperator = OuterModule.defaults.seperator; //父子模块的分隔符，一般为 `/`。
            var predefines = defaults.predefines || [];     //业务层需要预定义的 KISP 内部模块，映射到业务层自己的模块。 一般为 `KISP` 和 `$`。

            if (!name) {
                throw new Error('必须首先给应用分配一个唯一的名称，用于在存储中与其它应用区分开。');
            }

            if (typeof root != 'string') {
                throw new Error('应用的顶级模块名称必须为一个 string。');
            }

            if (root.includes(seperator)) {
                throw new Error('应用的顶级模块名称不能含有父子模块的分隔符: ' + seperator);
            }


            //让 app 的名称同时用于以下模块。
            ['SessionStorage', 'LocalStorage', ].forEach(function (item) {
                // InnerModules 是 KISP 内部的变量，定义在 base 目录。
                if (!InnerModules.has(item)) {
                    return;
                }

                Defaults.set(item, {
                    'name': name,
                });
            });
            

            //注意，下面注释掉的 require() 语句，是给 KISP 自动化打包工具使用的。
            //使用显式的模块加载，可以让自动化工具分析出模块的依赖关系。
            //数目与 App.defaults.js 里的 predefines 一致。
            //var KISP = require('KISP');
            //var $ = require('$');
            predefines.forEach(function (name) {
                OuterModule.define(name, function () {
                    return require(name);
                });
            });



            //先定义一个顶级的模块。
            OuterModule.define(root, function ($require, $module, $exports) {
                if (defaults.navigator) {
                    $exports = Navigator.create({
                        'container': defaults.view.container,
                        'preload': defaults.view.preload,
                        'slide': defaults.view.slide,
                        'animate': defaults.view.animate,

                        'name': defaults.navigator,
                        'module': $module,
                    });
                }


                if (defaults.prebind) {
                    Router.bind($require, $module, $exports);
                }


                factory && factory($require, $module, $exports);

            });


        

        },


        /**
        * 启动应用程序。
        * @param {function} factory 工厂函数，即启动函数。
        */
        launch: function (factory) {
            exports.init(factory);

            

            //定义完后马上加载即可启动。
            OuterModule.require(defaults.root);

        },
    };



});

