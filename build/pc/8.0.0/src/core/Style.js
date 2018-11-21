
/**
* 样式工具。
* @name Style
*/
define('Style', function (require, module,  exports) {
    var $Object = require('Object');
    var Margin = module.require('Margin');
    var Pixel = module.require('Pixel');

    function pixelize(value) {
        if (typeof value == 'number') {
            return value + 'px';
        }

        if (typeof value == 'string') {
            var isPixel = (/^\d+px$/g).test(value);
            var isEm = (/^\d+em$/g).test(value);
            var isRem = (/^\d+rem$/g).test(value);
            var isPercent = (/^\d+%$/g).test(value);

            if (isPixel || isEm || isRem || isPercent) {
                return value;
            }

            //尝试提取和转换数字部分。
            var v = parseInt(value);

            if (isNaN(v)) {
                return value;
            }

            return v + 'px';
        }

        //其它情况。
        return value;
    }



    return /**@lends Style*/ {

        /**
        * 把一个样式字符串对象化。
        */
        objectify: function (style) {
            if (!style) {
                return {};
            }

            if (typeof style == 'object') {
                return style;
            }

            if (typeof style != 'string') {
                return {};
            }

            var obj = {};
            var list = style.split(';');

            list.forEach(function (item) {
                item = item.trim();
                item = item.replace(/\n/g, '');

                if (!item) {
                    return;
                }

                var a = item.split(':');
                var key = a[0].trim();
                var value = a[1].trim();

                obj[key] = value;

            });

            return obj;

        },

        /**
        * 把一个样式对象字符串化。
        * 以用于 DOM 节点的 style 属性中或 style 标签中。
        * 已重载 stringify(style, spaces);             //
        * 已重载 stringify(style, replacer, spaces);   //style 为一个对象或字符串，replacer 为一个函数，spaces 为一个数值;  
        * 参数：
        *   style: '',      //样式对象或字符串。
        *   replace: fn,    //处理器函数，即替换函数。 如果指定，则针对每一项调用它以获得返回值。 如果不返回任何值，则扔掉该项。
        *   spaces: 4,      //要生成的前导空格数。 如果指定非 0 值，则生成多行的形式；否则生成行内形式。
        */
        stringify: function (style, replacer, spaces) {
            if (!style) {
                return '';
            }

            if (typeof style == 'string') {
                style = module.exports.objectify(style);
            }


            //重载 stringify(style, spaces);
            if (typeof replacer == 'number') {
                spaces = replacer;
                replacer = null;
            }


            var a = [];

            $Object.each(style, function (key, value) {

                //如果指定了处理器函数函数，则调用它以获得返回值。
                value = replacer ? replacer(key, value) : value;

                //扔掉空值: null、undefined、''。
                if (value == null || value === '') {
                    return; // continue;
                }

                var s = key + ': ' + value; //如 `width: 100px`

                if (spaces) {
                    s = new Array(spaces + 1).join(' ') + s; //产生前导空格，如 `    width: 100px`
                }

                a.push(s);

            });

            if (a.length == 0) {
                return '';
            }

            style = spaces ?
                a.join('; \n') + '; \n' :   //如果指定了前导空格，则生成多行形式的。
                a.join('; ') + '; ';        //否则生成行内形式的。

            return style;
        },

        /**
        * 把一个样式对象像素化。
        */
        pixelize: function (style, keys) {
            //重载 pixelize(value);
            //直接传一个值进来，根据情况转换成带像素单位的形式。
            //如 pixelize(100); 得到 `100px`。
            if (typeof style != 'object' && !keys) {
                return pixelize(style);
            }


            keys = keys || [];
            style = module.exports.objectify(style);


            style = $Object.map(style, function (key, value) {
                //该项并非要处理的项。
                if (!keys.includes(key)) {
                    return value;
                }

                return pixelize(value);
            });

            return style;
        },

        /**
        * 去掉空值。
        * 即去掉值为 null、undefined、'' 的项。
        */
        trim: function (style) {
            var obj = {};

            //过滤掉空值。
            $Object.each(style, function (key, value) {
                if (value == null || value === '') {
                    return;
                }

                obj[key] = value;
            });

            return obj;
        },


        /**
        * 对每一项进行空值过滤，再进行合并得到一个样式对象。
        */
        merge: function (...items) {

            //对一个 item 进行处理
            items = items.map(function (item) {
                if (!item) {
                    return {};
                }

                item = module.exports.trim(item);
                return item;

            });


            var obj = Object.assign(...items);

            return obj;

        },



    };



   
});


