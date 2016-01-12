/**
* KISP 内部模块使用的默认配置管理器。
* @namespace
* @name Defaults
*/
define('Defaults', function (require, module, exports) {

    var $ = require('$');

    var cfg = null;
    var name$used = {}; // { 模块名: 已经使用了默认配置 }



    //使用默认配置
    function use(name) {
        if (name$used[name]) {
            return;
        }

        if (!cfg) {
            var Config = require('Config');
            cfg = new Config();
        }

        var obj = require(name + '.defaults');
        cfg.set(name, obj);

        name$used[name] = true;
    }




    module.exports = exports = /**@lends Defaults*/ {

        set: function (name, config) {
            if (typeof name == 'object') { //批量设置: set({...})
                $.Object.each(name, function (name, config) {
                    use(name);
                    cfg.set(name, config);
                });
            }
            else { //单个设置 set(name, config)
                use(name);
                cfg.set(name, config);
            }
        },

        get: function (name) {
            if (typeof name == 'object') { // 重载 get(module)
                name = name.id;
            }

            use(name);
            return cfg.get(name);
        },


        clone: function (name, target, target1, targetN) {

            var config = exports.get(name);

            var args = [].slice.call(arguments, 1);
            args = [{}, config].concat(args);

            return $.Object.extendDeeply.apply(null, args);
        },

    };

});

