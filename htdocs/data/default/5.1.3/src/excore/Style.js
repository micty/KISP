
/**
* Style 工具类
* @class
* @name Style
*/
define('Style', function (require, module,  exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Mapper = MiniQuery.require('Mapper');

    var Config = require('Config');


    //内部函数
    function getPixel(v) {

        var type = typeof v;

        if (type == 'number' || (/^\d+$/g).test(v)) { //数字或字符串形式的数字
            return v + 'px';
        }

        return v;
    }


   


    var pix_fields = [
        'border',
        'border-radius',
        'border-bottom-width',
        'border-left-width',
        'border-right-width',
        'border-top-width',
        'border-width',
        'bottom',
        'font-size',
        'height',
        'left',
        'letter-spacing',
        'line-height',
        'margin',
        'margin-bottom',
        'margin-left',
        'margin-right',
        'margin-top',
        'padding',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'padding-top',
        'right',
        'top',
        'width',
    ];


    var fields = pix_fields.concat([



    ]);



    module.exports = exports = /**@lends Style*/ {

        /**
        * 像素化。
        */
        pixelize: function (style, key) {

            //重载 getPixel(value) 
            if (typeof style != 'object') {
                return getPixel(style);
            }


            // 批量操作: pixelize(style, keys);
            if (key instanceof Array) {

                $.Array.each(key, function (key, index) {

                    var value = style[key];
                    if (value == null) { // null|undefined
                        return; //continue
                    }

                    style[key] = getPixel(value);
                });
            }
            else { //单个操作
                var value = style[key];
                if (value != null) { // null|undefined
                    style[key] = getPixel(value);
                }
            }

            return style;
        },

        checkUnit: function (value, unit) {
            return typeof value == 'string' &&
                value.slice(0 - unit.length) == unit;
        },


        filter: function (items, keys) {

            //重载 filter(obj, keys)
            if (!(items instanceof Array)) {
                items = [items];
            }

            var list = $.Array.map(items, function (item, index) {
                if (!item || typeof item != 'object') {
                    return null;
                }
                item = $.Object.filter(item, keys);
                return item;
            });

            //合并多个到一个新的 {}
            list = [{}].concat(list);
            var style = $.Object.extend.apply(null, list);
            style = exports.pixelize(style, pix_fields);

            return style;
        },


        parse: function (style) {


        },

        stringify: function (style, replacer, spaces) {

            if (!style) {
                return '';
            }

            if (typeof replacer == 'number') { //重载 stringify(style, spaces);
                spaces = replacer;
                replacer = null;
            }

            var a = [];

            $.Object.each(style, function (key, value) {
                
                value = replacer ? replacer(key, value) : value;

                if (value === undefined) { //扔掉值为 undefined 的项
                    return; // continue;
                }

                var s = key + ': ' + value;
                if (spaces) {
                    s = new Array(spaces + 1).join(' ') + s; //产生前导空格
                }

                a.push(s);

            });

            if (a.length == 0) {
                return '';
            }


            return spaces ? a.join(';\n') + ';\n' :
                a.join(';') + ';';
        },


        parsePercent: function (percent, total) {

            percent = parseInt(percent) / 100;
            return percent * total + 'px';

        },


    };



   
});


