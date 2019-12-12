/**
* KISP 内部模块使用的默认配置管理器。
* KISP 内部模块使用的配置，包括三个层面：
*   1，通用的、底层的默认配置，以 `*.defaults` 命名的模块，如 `Dialog.defaults`，此类模块定义在 KISP 内部。
*   2，针对某一环境(如移动端)的默认配置，以 `*.config` 命名的模块，如 `Dialog.config`，此类模块定义在 KISP 内部。
*   3，业务层指定的配置，以 KISP.config() 方式手动调用的，此类调用定义在业务层，推荐写在 config.js 里。
*
* KISP 会把这三个配置深度合并成一个对象作为相应的模块配置，合并顺序为上述的顺序关系。
* 因此业务层可以根据需要覆盖某个模块的特定配置或字段。
* 
* @namespace
* @name Defaults
*/
define('Defaults', function (require, module, exports) {
    var $Object = require('Object');
    var Config = require('Config');

    var cfg = new Config(); //存取器。
    var name$init = {};     //记录对应的模块是否已给处理。


    /**
    * 初始化 KISP 内部的原始配置。
    * 原始配置是指 `*.defaults` 和 `*.config` 的模块。
    * 使用之前，会先把 `*.defaults` 和 `*.config` 的模块进行合并。
    * `*.defaults` 是通用的、底层的默认配置。
    * `*.config` 是针对某一环境(如移动端)的默认配置。
    */
    function init(name) {
        if (name$init[name]) {
            return;
        }


        //首次获取，先进行合并。
        var defaults = require(`${name}.defaults`); //如 `Dialog.defaults`。
        var config = require(`${name}.config`);     //如 `Dialog.config`。
        var all = $Object.extendDeeply({}, defaults, config);

        name$init[name] = true;

        cfg.set(name, all);
    }

    

    return exports = /**@lends Defaults*/ {

        /**
        * 设置。
        * 会深度合并传入的目标的子对象与原配置中的对应的子对象。
        * 已重载 set(obj); //批量设置。
        * 已重载 set(name, data); //单个设置。
        */
        set: function (name, data) {
            var obj = {};

            //此时为 set(keys, data); 
            //即多个 key 共用一个 data 作为值。
            if (Array.isArray(name)) {
                var keys = name;

                keys.forEach(function (key) {
                    obj[key] = data;
                });
            }
            else {
                obj = typeof name == 'object' ? name : { [name]: data, };
            }



            $Object.each(obj, function (name, data) {
                init(name);

                cfg.set(name, data);
            });

        },

        /**
        * 获取。
        */
        get: function (name) {
            init(name);
            return cfg.get(name);
        },

        /**
        * 深度克隆。
        */
        clone: function (name, ...targets) {
            init(name);
            return cfg.clone(...arguments);
        },

        /**
        * 获取或设置 KISP 内部模块的默认配置。
        * 已重载 config(name); //获取指定名称的模块的默认配置。
        * 已重载 config(name, value); //单个设置指定名称的模块的默认配置。
        * 已重载 config(obj); //批量设置模块的默认配置。
        * @function
        * @example
        *   KISP.config({});    
        */
        config: function (name, value) {
            //get(name)
            if (arguments.length == 1 && typeof name == 'string') {
                return exports.get(name);
            }

            //set()
            exports.set(...arguments);
        },

      
    };

});

