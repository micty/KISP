
/**
* 随机 id 生成器。
* @name RandomId
*/
define('RandomId', function (require, module, exports) {

    var $String = require('String');

    return /**@lends RandomId*/ {

        /**
        * 根据指定的规则生成一个随机 id。
        */
        get: function (...list) {

            list = list.map(function (item, index) {

                if (typeof item == 'number') {
                    item = $String.random(item);
                    item = item.toLowerCase();
                }

                return item;
            });


            return list.join('');
        },

        
    };

});


