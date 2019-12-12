/**
* 配置工具类。
* 主要提供数据的存储与获取功能。
* @class
* @name Config
*/
define('Config', function (require, module,  exports) {
    var $Object = require('Object');
    var mapper = new Map();


    /**
    * 构造器。
    */
    function Config() {
        var meta = {
            'name$data': {},
        };

        mapper.set(this, meta);
    }



    //实例方法
    Config.prototype = /**@lends Config#*/ {
        constructor: Config,

        /**
        * 设置指定模块的默认配置。
        * 会深度合并传入的目标的子对象与原配置中的对应的子对象。
        * 已重载 set({...});       //批量设置多个 key，每个 key 有自己的值部分 。
        * 已重载 set(keys, data);  //批量设置多个 key，每个 key 共用一个值部分。
        * 已重载 set(name, data);  //单个设置一个 key 和一个值。
        *
        * @param {string} name 要设置的模块的名称。
        * @param {Object} data 要设置的默认配置对象。
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



            var meta = mapper.get(this);
            var name$data = meta.name$data;

            $Object.each(obj, function (name, data) {

                //首次设置
                if (!(name in name$data)) {
                    name$data[name] = data;
                    return;
                }


                //第二(+)次设置
                var old = name$data[name];

                if ($Object.isPlain(old)) { //纯对象
                    $Object.extendDeeply(old, data); //则深度合并。
                }
                else { //其他的，则重设
                    name$data[name] = data;
                }
            });

        },

        /**
        * 获取指定模块名称的默认配置。
        * @param {string|object} name 要获取的模块的名称。
        * @return {Object} 返回该模块的默认配置对象。
        */
        get: function (name) {
            var meta = mapper.get(this);

            return meta.name$data[name];
        },

        /**
        * 获取并深度克隆指定模块名称的默认配置。
        * @param {string} name 要获取的模块的名称。
        * @param {Object} [target] 需要合并的对象。
        *   如果需要提供额外的(深度)合并成员，可指定此参数。
        * @return {Object} 返回该模块的默认配置对象的克隆版本。
        */
        clone: function (name, ...targets) {
            var old = this.get(name);
            var all = $Object.extendDeeply({}, old, ...targets);

            return all;

        },

    };


    return Config;


});

