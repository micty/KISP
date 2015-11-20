
/**
* 
*/
define('Dialog/Style', function (require, module, exports) {
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

    }



    function get(config) {

        var style = Style.filter(config, [
            'background',
            'border',
            'border-radius',
            'height',
            'width',
            'z-index',
            'position',
        ]);

        var width = style.width;
        if (typeof width != 'number') {
            var maxWidth = document.documentElement.clientWidth;
            if (Style.checkUnit(width, '%')) {
                style.width = Style.parsePercent(width, maxWidth);
            }
            else if (!width) {
                style.width = maxWidth * 0.8 + 'px';
            }
        }
        

        var height = style.height;
        if (typeof height != 'number') {
            var maxHeight = document.documentElement.clientHeight;
            if (Style.checkUnit(height, '%')) {
                style.height = Style.parsePercent(height, maxHeight);
            }
            else if (!height) {
                style.height = maxHeight * 0.8 + 'px';
            }
        }

        //根据宽度计算 margin-left 和 margin-top，使其居中

        var v = getMargin(style.width);
        if (v) {
            style['margin-left'] = v;
        }

        v = getMargin(style.height);
        if (v) {
            style['margin-top'] = v;
        }

        return style;


    }




    

    return {
        get: get,
    };


});

