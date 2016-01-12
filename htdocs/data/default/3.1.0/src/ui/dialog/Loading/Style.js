
/**
* 
*/
define('Loading/Style', function (require, module, exports) {
    var $ = require('$');
    var Style = require('Style');
    

    function getMargin(v) {

        var type = typeof v;

        if (type == 'number') {
            return (0 - v / 2) + 'px';
        }

        if (type == 'string' && v.slice(-2) == 'px') {
            v = parseInt(v);
            return (0 - v / 2) + 'px';
        }

        return '0px';
    }



    function get(item0, item1, itemN) {

        var list = [].slice.call(arguments);

        var style = Style.filter(list, [
            'background',
            'border-radius',
            'bottom',
            'color',
            'font-size',
            'height',
            'left',
            'margin-top',
            'right',
            'top',
            'width',
            'z-index',
            'position',
        ]);

        ////优先使用 bottom 而非 top
        //if (style['bottom'] != 'initial') {
        //    style['top'] = 'initial';
        //}

        ////优先使用 right 而非 left
        //if (style['right'] != 'initial') {
        //    style['left'] = 'initial';
        //}

        //根据宽度计算 margin-left，使用居中
        style['margin-left'] = getMargin(style.width);

        if (style['margin-top'] === undefined) { //未指定
            style['margin-top'] = getMargin(style.height);
        }




        return style;


    }


    return {
        get: get,
    };


});

