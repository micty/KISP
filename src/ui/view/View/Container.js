/**
*/
define('View/Container', function (require, module, exports) {
    var $String = require('String');
    var Defaults = require('Defaults');

    var defaults = Defaults.get(module.parent.id);


    return {
        /**
        * 获取容器对应的选择器。
        */
        get: function (id) {

            //如 `[data-view="/Users"]`。
            var container = $String.format(defaults.container, {
                'id': id,
            });

            return container;
        },


    };
});

