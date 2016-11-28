
/**
* 配置工具的 Url 工具类。
* @namespace
*/
define('Config/Url', function (require, module,  exports) {

    var $ = require('$');

    /**
    * 递归扫描并转换 url 成真实的地址。
    */
    function format(config) {

        var Url = require('Url');

        return $.Object.map(config, function (key, value) {

            if (typeof value == 'string') {
                return Url.format(value);
            }

            if (value instanceof Array) {

                return $.Array.keep(value, function (item, index) {

                    if (typeof item == 'string') {
                        return Url.format(item);
                    }

                    if (typeof item == 'object') {
                        return format(item); //递归
                    }

                    return item;

                }, true);
            }

            return value;

        }, true); //深层次来扫描

    }


    return {
        format: format,
    };


});

