
/**
* 版本工具类
* @namespace
* @name Edition
*/
define('Edition', function (require, module, exports) {

    var $ = require('$');
    var current = 'debug';


    return /**@lends Edition*/ {

        /**
        * 获取当前版本的名称。
        */
        get: function () {
            return current;
        },

        /**
        * 设置当前版本的名称。
        * @param {string} name 版本的名称，仅限于 'debug' 和 'min'。
        */
        set: function (name) {
            current = name;
        },

    };


});

