
/**
* 
*/
define('Scroller/Pullup/Loading', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var Loading = require('Loading');




    return {
        /**
        * 
        *   options = {
        *       container: Element,
        *       bottom: 10,
        *   };
        */
        create: function (options) {
            var loading = new Loading({
                'container': options.container,
                'text': options.text,
                'presetting': 'scroller.pullup',
                'z-index': 9999,

                'style': {
                    'bottom': options.bottom,
                },
            });

            return loading;
        },
    };




});


