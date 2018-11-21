
define('Dialog/Masker', function (require, module, exports) {
    var $ = require('$');



    return {
        create: function (config) {
            var Mask = require('Mask');

            var defaults = {
                'container': config.container,
            };

            var options = Mask.normalize(defaults, config.mask); //返回一个 {} 或 null。

            if (!options) {
                return null;
            }


            Object.assign(options, {
                'volatile': config.volatile,
                'z-index': config['z-index'] - 1,
            });


            var masker = new Mask(options);
            
            return masker;



        },
    };
});