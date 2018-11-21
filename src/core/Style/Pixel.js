
/**
* 样式中的像素工具。
*/
define('Style/Pixel', function (require, module,  exports) {

    var $Object = require('Object');


    
    /**
    * 提取对应值的数字部分作为像素值。
    * 如果不成功，则原样返回。
    * 如 `120abc`，提取出数字部分 `120` 后，返回 `120px`。  
    */
    function getPixel(v) {

        var type = typeof v;

        //数字或字符串形式的数字。
        if (type == 'number' || (/^\d+$/g).test(v)) { 
            return v + 'px';
        }

        return v;
    }

   
    return {

        /**
        * 把一个样式对象特定的成员像素化。
        * 已重载 normalize(value);         // value 为 ''，提取对应值的数字部分作为像素值。
        * 已重载 normalize(style, keys);   // style 为 {}, keys 为 ['', '', ...]，批量像素化 style 对象中的 keys 成员。
        */
        normalize: function (style, keys) {
            //重载 normalize(value);
            // value 为 ''，提取对应值的数字部分作为像素值。
            if (typeof style != 'object') {
                return getPixel(style);
            }


            //重载 normalize(style, keys);
            //重载 normalize(style, key);
            //统一转化成数组形式进行处理。
            keys.forEach(function (key, index) {

                var value = style[key];

                if (value == null) { // null|undefined
                    return;
                }

                style[key] = getPixel(value);
            });

            return style;
        },

        /**
        * 把百分比转成具体的像素值。
        * 如 parsePercent(15, 1000); 返回 `150px`。
        */
        parsePercent: function (percent, total) {

            percent = parseInt(percent) / 100;

            return percent * total + 'px';

        },

    };



   
});


