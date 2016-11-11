
/**
*/
define('NoData/Style', function (require, module, exports) {
    var $ = require('$');
    var Style = require('Style');
    




    function get(item0, item1, itemN) {

        var list = [].slice.call(arguments);

        var style = Style.filter(list, [
            'background',
            'bottom',
            'color',
            'font-size',
            'top',
            'z-index',
        ]);


        return style;

    }


    return {
        get: get,
    };


});

