
/**
* RandomId 工具类
* @name RandomId
*/
define('RandomId', function (require, module, exports) {

    var $ = require('$');

    module.exports = exports = /**@lends RandomId*/ {

        /**
        * 
        */
        get: function (item0, item1, item2, itemN) {

            var list = [].slice.call(arguments);

            list = $.Array.keep(list, function (item, index) {

                if (typeof item == 'number') {
                    return $.String.random(item).toLowerCase();
                }

                return item;
            });

            return list.join('');
        },

        
    };

});


