/**
* 业务层的自定义数据管理器。
* 即针对业务层的 KISP.data() 的功能，用于存储和获取自定义数据。
* @namespace
* @name Data
*/
define('Data', function (require, module, exports) {
    var $Object = require('Object');
    var Config = require('Config');

    var cfg = new Config(); 
    


    return /**@lends Data*/ {

        /**
        * 获取或设置业务层的自定义数据。
        * 已重载 data(key); //获取指定键的数据。
        * 已重载 data(key, value); //设置指定键的数据。
        * 已重载 data(obj); //批量设置数据。
        * 
        * @param {string} key 要存储的数据的键。
        * @param value 要存储的数据的值，可以是任何类型。
        *   当不提供此参数时，则为 get 操作；
        *   否则为 set 操作。
        */
        data: function (key, value) {
            //get(key)
            if (arguments.length == 1 && typeof key == 'string') {
                return cfg.get(key);
            }

            //set
            cfg.set(...arguments);
        },
    };

});

