
/**
* 
*/
define('Dialog/Style', function (require, module, exports) {
    var $Object = require('Object');
    var Style = require('Style');
    



    

    return {

        get: function (config) {
            var obj = $Object.filter(config, ['height', 'width', 'z-index']);
            var style = Style.objectify(config.style);

            style = Style.merge(style, obj);
            style = Style.pixelize(style, ['height', 'width', ]);

            return style;

        },


    };


});

