
/**
* Toast/Style
* @namespace
* @name Toast/Style
*/
define('Toast/Style', function (require, module, exports) {
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
        ]);


        return style;


    }


    return {
        get: get,
    };


});

