

/**
* 动态加载模块类。
* 对 seajs 的进一步封装，以适合本项目的使用。
* @namespace
* @name Seajs
*/
define('Seajs', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Config = require('Config');

    var seajs = window['seajs'];


    function ready(fn) {

        if (seajs) {
            fn && fn(seajs);
            return;
        }


        //先加载 seajs 库
        var defaults = Config.get(module.id); //默认配置
        var url = defaults.url;

        var Script = MiniQuery.require('Script');
        Script.load({
            url: url,
            id: 'seajsnode', //提供 id，提高性能。 详见 https://github.com/seajs/seajs/issues/260

            onload: function () {
                seajs = window['seajs'];
                seajs.config(defaults);

                fn && fn(seajs);
            }
        });

    }

    

    module.exports = exports = /**@lends Seajs*/ {

        use: function () {

            var args = [].slice.call(arguments, 0);

            ready(function (seajs) {
                seajs.use.apply(seajs, args);
            });

        },

        define: function () {

            var args = [].slice.call(arguments, 0);

            ready(function (seajs) {
                seajs.Module.define.apply(seajs, args);
            });
        }
    };




});

