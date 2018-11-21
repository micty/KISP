
define('Loading/Masker', function (require, module, exports) {
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

            var masker = new Mask(options);
            var zIndex = config['z-index'] - 1;

            masker.on('render', function () {
                masker.$.css({
                    'z-index': zIndex,
                });
            });

            return masker;



        },
    };
});