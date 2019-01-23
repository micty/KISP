
/**
*
*/
define('Mask/Style', function (require, module, exports) {
    var $Object = require('Object');
    var Style = require('Style');
    

    


    return {

        /**
        * 从配置对象中过滤出样式成员，并进行规范化处理。
        * 返回一个样式对象 {}。
        */
        get: function (config) {
            var obj = $Object.filter(config, ['opacity', 'z-index']);
            var style = Style.objectify(config.style);

            style = Style.merge(style, obj);

            return style;

        },
    };


});

