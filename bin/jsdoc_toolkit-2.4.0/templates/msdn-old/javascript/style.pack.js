//以下文件由 ant 合并生成于 2013-09-23 15:00:56


/**
* 颜色工具。
* 提供一份命名的颜色值，某些颜色名称在 native 层是不支持的。
* @namespace
*/
var Colors = (function ($) {
    
    //要增加条目，请把名称转成小写，并且按升序进行存放。
    var list = {

        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dodgerblue: '#1e90ff',
        feldspar: '#d19275',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgrey: '#d3d3d3',
        lightgreen: '#90ee90',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslateblue: '#8470ff',
        lightslategray: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370d8',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#d87093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        violetred: '#d02090',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    var colors = $.Object.getValues(list);


    //解析 rgb(11, 22, 33) 这样的格式
    function parseRGB(s) {

        var rgb = $.String.removeAll(s, ['rgb', '(', ')']).split(',');

        if (rgb.length != 3) {
            throw Haf.error('非法的 rgb 格式：{0}', s);
        }

        rgb = $.Array.map(rgb, function (item, index) {
            item = parseInt(item, 10);

            if (0 <= item && item <= 255) {
                item = item.toString(16);
                return $.String.padLeft(item, 2, '0');
            }

            throw Haf.error('非法的 rgb 值：', item);

        });

        return '#' + rgb.join('');

    }

    //解析 rgba(11, 22, 33, 44) 这样的格式
    function parseRGBA(s) {

        var rgba = $.String.removeAll(s, ['rgba', '(', ')']).split(',');

        if (rgba.length != 4) {
            throw Haf.error('非法的 rgba 格式：{0}', s);
        }

        rgba = $.Array.map(rgba, function (item, index) {
            item = Number(item);

            if (0 <= item && item <= 255) {
                item = item.toString(16);
                return $.String.padLeft(item, 2, '0');
            }

            throw Haf.error('非法的 rgba 值：', item);

        });

        return '#' + rgba[3] + rgba.slice(0, 3).join('');
    }

    function get(color, opacity) {

        if (!color || typeof color != 'string') {
            return color;
        }

        color = color.toLowerCase();

        color = list[color] ? list[color] :
            $.String(color).contains(['rgba', '(', ')']) ? parseRGBA(color) :
            $.String(color).contains(['rgb', '(', ')']) ? parseRGB(color) : color;

        if (opacity !== undefined) {
            opacity = $.Math.parsePercent(opacity);

            if (isNaN(opacity) || opacity < 0 || opacity > 1) {
                throw Haf.error('参数 opacity 的值非法: {0}', opacity);
            }

            opacity = Math.floor(opacity * 256).toString(16);

            if (opacity.length < 2) {
                opacity = $.String.padLeft(opacity, '0', 2);
            }

            color = '#' + opacity + color.slice(color.length == 9 ? 3 : 1);
        }

        return color;

    }

    function random() {
        return $.Array.randomItem(colors);
    }



    return {
        get: get,
        random: random
    };


})(Haf);



/**
* 复合样式工具类。
* 内部工具。
* @namespace
*/
var CompositeStyle = (function ($, Colors) {

    
    var fields = [
        'border',
        'background'
    ];


    /**
    * 分解复合的 border 样式值
    */
    function decomposeBorder(obj) {

        var border = obj.border;

        if (border === 0 || border === '0') {
            obj.borderWidth = 0;
            return;
        }

        if (!border) {
            return;
        }

        border = $.Array.toObject(border.split(' '), {
            'borderStyle': 0,
            'borderWidth': 1,
            'borderColor': 2
        });

        border = $.Object.trim(border);

        var width = border.borderWidth;
        if (width) { //string
            border.borderWidth = parseInt(width, 10);
        }

        var color = border.borderColor;
        if (color) {
            border.borderColor = Colors.get(color) || color;
        }

        $.Object.extend(obj, border);
    }

    /**
    * 分解复合的 background 样式值
    */
    function decomposeBackground(obj) {

        var background = obj.background;
        if (!background) {
            return;
        }

        background = $.Array.toObject(background.split(' '), {
            'backgroundColor': 0,
            'backgroundImage': 1,
            'backgroundImageStyle': 2
        });

        background = $.Object.trim(background);

        var color = background.backgroundColor;
        if (color) {
            background.backgroundColor = Colors.get(color) || color;
        }

        $.Object.extend(obj, background);
    }

    function normalizeMargin(obj) {

        var margin = obj.margin;

        if (margin === 0 || margin === '0') {
            obj.margin = 0;
            return;
        }

        if (!margin) {
            return;
        }

        margin = String(margin).split(' ', 4);
        var len = margin.length;

        if (len == 2) {
            margin = margin.concat(margin); //['a', 'b'] --> ['a', 'b', 'a', 'b'];
        }
        else if (len == 3) {
            margin.push(margin[1]); // ['a', 'b', 'c'] --> ['a', 'b', 'c', 'b'];
        }

        obj.margin = $.Array.map(margin, function (item, index) {

            return parseInt(item, 10);

        }).join(',');
    }


    function removeStyles(obj) {
        return $.Object.remove(obj, fields);
    }

    function filterStyles(obj) {
        return $.Object.filter(obj, fields);
    }

    //CompositeStyle = 
    return {

        border: {
            decompose: decomposeBorder
        },

        background: {
            decompose: decomposeBackground
        },

        margin: {
            normalize: normalizeMargin
        },

        removeStyles: removeStyles,
        filterStyles: filterStyles
    };

    


})(Haf, Colors);



/**
* 组件样式工具类。
* 内部工具。
* @namespace
*/
var ComponentStyle = (function ($, ClassManager, CompositeStyle, Logger) {


    //样式的字段名称，请按升序排列
    var fields = [
        'align',
        'align2container',
        'backgroundColor',
        'backgroundImage',
        'backgroundImageStyle',
        'borderColor',
        'borderRadius',
        'borderStyle',
        'borderWidth',
        'boxShadow',
        'disabled',
        'display', //取值: show|none|hidden
        'dock',
        'flex',
        'font',
        'fontColor',
        'fontSize',
        'fontStyle',
        'height',
        'margin',
        'padding',
        'textShadow',
        'valign',
        'valign2container',
        'width'
    ];



    //以 fields 中的项作为键，值为 null 组装成一个 {}
    var empty = $.Array.toObject(fields, function (item, index) {
        return [item, null];
    });


    //维护一份合并后的　{xtype: style} 集合。
    //style 是由 Haf.style() 和 Haf.define() 的合并结果。
    var xtype$style = {};
    var class$style = {};



    ////监听 xtype 创建事件。 当有 xtype 被创建时触发。
    ////即当通过 Haf.define() 创建了一个带有 xtype 的类时，会触发本事件。
    //Haf.ondefinextype(function (data, className) {

    //    var xtype = data.xtype;

    //    if (!xtype) {
    //        return;
    //    }

    //    var style = makeFinalStyle(xtype);
    //    set(xtype, style);

    //});


    /**
    * 根据给定的 xtype，沿着继承层次向上获取所有的样式，合并并返回当前类的最终样式。
    */
    function makeFinalStyle(xtype) {

        var list = ClassManager.getSuperXtypes(xtype, true); //获取所有父类的 xtype (包括自己)
        list = list.reverse(); //倒序后，父类在前，子类在后。

        //根据类的继承链，按序获取得相应样式，优先级高的在后面
        list = $.Array.keep(list, function (item, index) {
            return xtype$style[item];
        });

        var style = {};
        var args = [style].concat(list);
        style = $.Object.extend.apply(null, args);

        return style;
    }

    /**
    * 规格化。
    * 把复合的样式值分解成 native 层所接受的格式。
    */
    function normalize(obj) {

        //解析 { border: 'solid 1 red' } 这样的字符串
        if ('border' in obj) {
            CompositeStyle.border.decompose(obj);
        }

        //解析 { backgound: 'red' } 这样的字符串
        if ('background' in obj) {
            CompositeStyle.background.decompose(obj);
        }

        if ('margin' in obj) {
            CompositeStyle.margin.normalize(obj);
        }

        var width = obj.width;
        obj.width = 
            width == 'auto' ? -2 : 
            width == 'fill' ? -1 : width;

        var height = obj.height;
        obj.height =
            height == 'auto' ? -2 :
            height == 'fill' ? -1 : height;


        //obj = $.Object.filter(obj, fields);                 //过滤出样式字段
        //obj = $.Object.trim(obj, [null, undefined, '']);    // natvie 比较敏感，必须过滤掉非法值

        
        //$.Array.each(fields, function (key, index) {
        //    var value = obj[key];
        //    if (value == null) {
        //        return;
        //    }

        //    style[key] = value;
        //});

        //过滤出样式字段
        var style = {};
        for (var i = 0, len = fields.length; i < len; i++) {
            var key = fields[i];
            var value = obj[key];
            if (value == null || value === '') { // natvie 比较敏感，必须过滤掉非法值
                continue;
            }

            style[key] = value;
        }

        return style;
    }



    function set(xtype, style) {

        var item = xtype$style[xtype] || {};
        xtype$style[xtype] = $.Object.extend(item, style);


        //当前 xtype 所对应的类的样式发生改变，它的直接子类都要重新计算。
        //要避免此情况，可以把 Haf.style() 放在 Haf.define() 即类定义之前引入。
        var childXtypes = ClassManager.getChildXtypes(xtype);
        if (childXtypes) {
            $.Array.each(childXtypes, function (xtype, index) {
                var style = makeFinalStyle(xtype);
                set(xtype, style); //递归，计算直接子类，从而 “联动” 继承层次上的所有子类
            });
        }
         
        //Logger.debug('设置样式: {0}', xtype);
    }
     
    /**
    * 获取指定组件实例的最终有效的样式。
    * 优化级从低到高： Haf.style() < Haf.define() < Haf.create()
    */
    function get(self) {

        var xtype = self.xtype;
        var config = self.config;

        //优先级高的在后面，其中 config 中已包含了 Haf.define() 和 Haf.create() 中的样式
        var style = xtype$style[xtype]; // xtype 级的 style

        if (!style) { //动态地去生成
            style = makeFinalStyle(xtype);
            set(xtype, style);
        }

        var obj = $.Object.extend({}, style, config);

        return normalize(obj);

    }

    /**
    * 判断指定的名称是否为合法的样式名称。
    */
    function isValidName(name) {
        return (name in empty) || (name in CompositeStyle);
    }

    /**
    * 判断指定的名称是否为 native 的样式名称。
    */
    function isNativeName(name) {
        return name in empty;
    }

    /**
    * 移除所有样式字段。
    * @param {Object} 要进行移除的对象 {}。
    * @param {boolean} [removeCompositeStyles=false] 是否同时移除复合样式字段。
        默认为 false。 如果指定为 true，则也会移除复合样式的字段。
    * @return {Object} 返回一个移除了样式字段的对象。
    */
    function removeStyles(obj, removeCompositeStyles) {

        obj = $.Object.remove(obj, fields);

        if (removeCompositeStyles === true) {
            obj = CompositeStyle.removeStyles(obj);
        }

        return obj;
    }

    function filterStyles(obj, keepCompositeStyles) {

        var obj = $.Object.filter(obj, fields);

        if (keepCompositeStyles === true) {
            var composited = CompositeStyle.filterStyles(obj);
            $.Object.extend(obj, composited);
        }

        return obj;

    }


    //ComponentStyle = 
    return {
        set: set,
        get: get,
        isValidName: isValidName,
        isNativeName: isNativeName,
        removeStyles: removeStyles,
        filterStyles: filterStyles,

        //只读
        empty: empty,
    };


})(Haf, ClassManager, CompositeStyle, Logger);





; (function (Haf, $, ComponentStyle, Colors) {



/**
* HAF: Hybrid Application Framework
* 混合应用框架，一个基于手机端 App 开发的纯 JavaScript 框架，提供一整套功能丰富的 API。
* 
*/


//创建快捷方式
$.Object.extend(Haf, {

    style: ComponentStyle.set,
    color: Colors.random

});


})(Haf, Haf, ComponentStyle, Colors);




/**
*  定义组件的缺省样式
*/
Haf.style('component', {

    align: null,
    align2container: null,
    backgroundColor: null,
    backgroundImage: null,
    backgroundImageStyle: null,
    borderColor: null,
    borderRadius: null,
    borderStyle: null,
    borderWidth: null,
    boxShadow: null,

    disabled: false,
    //display: 'show',

    dock: null,
    flex: null,
    font: null,
    fontColor: null,
    fontSize: null,
    fontStyle: null,

    height: 'auto',

    margin: null,
    padding: null,
    textShadow: null,
    valign: null,
    valign2container: null,


    width: null


});




/**
*  定义组件的缺省样式
*/
Haf.style('container', {

    


});



/**
* Hae App 自己的样式定义
*/
Haf.style('box', {

    backgroundColor: 'white',
    height: 'auto',
    width: 'fill',
    align: 'left', //控件内容在控件内的水平对齐方式 left/right/center
    valign: 'top' //控件内容在控件内的垂直对齐方式 top/middle/bottom


});







/**
* 定义组件的缺省样式
*/
Haf.style('button', {

    width: 100,
    height: 50

});





/**
*  Hae App自己的样式定义
*/
Haf.style('label', {

    height: 'auto',
    width: 'auto',
    background: '#F7F7F7',
    fontSize: 13,
    fontColor: '#333333',
    align: 'center', //控件内容在控件内的水平对齐方式 left/right/center
    valign: 'middle' //控件内容在控件内的垂直对齐方式 top/middle/bottom


});







Haf.style('progressbar', {
    height: 'auto',
    width: 'fill'
});


 


Haf.style('slider', {
    height: 'auto',
    width: 'fill'
});




Haf.style('progressbar', {
    height: 'auto',
    width: 'fill'
});


 


Haf.style('textinput', {
    height: 35,
    width: 150,
    fontSize: 12,
    //border: 'solid 1px gray',
    align: 'left', //控件内容在控件内的水平对齐方式 left/right/center
    valign: 'middle' //控件内容在控件内的垂直对齐方式 top/middle/bottom
});


 
 


Haf.style('textarea', {
    
    height: 200,
    width:  'fill'
});


 
 

