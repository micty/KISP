
define('App/Module', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Emitter = MiniQuery.require('Emitter');



    function enhance(module) {

        var emitter = new Emitter();
        var require = module.require.bind(module);
        var name$required = {};

        $.Object.extend(module, {

            'require': function (name) {

                var M = require(name);

                if (M && !name$required[name]) {
                    name$required[name] = true;
                    emitter.fire('require', name, [M]);
                }


                return M;
            },

            'on': emitter.on.bind(emitter),


        });

    }


    return {
        'enhance': enhance,
    };



});

