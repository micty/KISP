
/**
* App 启动类
* @class
* @name App
*/
define('App', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Config = require('Config');


    var mapper = new Mapper();


    /**
    * 构造器。
    * @constructor
    */
    function App(name, config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var meta = {
            'name': name,
            'mask': config.mask,
            //'predefined': [],
        };

        mapper.set(this, meta);


    }



    App.prototype = /**@lends App#*/ {
        constructor: App,

        /**
        * 初始化执行环境，并启动应用程序。
        * 该方法会预先定义一些公共模块，然后定义一个指定的(或匿名)模块并启动它。
        * @param {function} factory 工厂函数，即启动函数。
        */
        launch: function (factory) {

            var $ = require('jquery-plugin/touch') || require('$'); //
            var MiniQuery = require('MiniQuery');
            var KISP = require('KISP');
            var Module = require('Module');

            var define = Module.define;

            define('$', function () {
                return $;
            });

            define('MiniQuery', function () {
                return MiniQuery;
            });

            define('KISP', function () {
                return KISP;
            });

            var meta = mapper.get(this);
            var name = meta.name;

            define(name, factory);
            Module.require(name); //启动
        },
       
        /**
        * 初始化执行环境，创建导航管理器和相应的 UI 组件，并启动应用程序。
        * @param {function} factory 工厂函数，即启动函数。
        */
        render: function (fn) {

            var meta = mapper.get(this);

            var Nav = module.require('Nav');
            var nav = Nav.create(meta.mask);


            this.launch(function (require, module) {

                //后退时触发
                nav.on('back', function (current, target) {

                    document.activeElement.blur(); // 关闭输入法

                    current = module.require(current);
                    target = module.require(target);

                    current.hide();
                    target.show();

                });


                //跳转到目标视图之前触发，先隐藏当前视图
                nav.on('before-to', function (current, target) {

                    current = module.require(current);
                    current.hide();

                });


                //统一绑定视图跳转动作，在调用 nav.to(...) 时会给触发
                nav.on('to', function (name, arg0, arg1, argN) {

                    var args = [].slice.call(arguments, 1);

                    var M = module.require(name);
                    M.render.apply(M, args);

                });


                fn && fn(require, module, nav);

            });

        },

     

    };


    return App;

});

