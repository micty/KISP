
/**
* DOM 工具类
* @class
* @name DOM
*/
define('DOM', function (require, module,  exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Mapper = MiniQuery.require('Mapper');

    var Config = require('Config');

    var mapper = new Mapper();



    function DOM(config) {

        //重载 DOM(suffix)
        if (typeof config != 'object') {
            config = {
                'suffix': config
            };
        }

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var meta = {
            'prefix': config.prefix,
            'suffix': config.suffix,
            'seperator': config.seperator,
        };

        mapper.set(this, meta);

    }

    DOM.prototype = /**@lends DOM#*/ {
        constructor: DOM,

        get: function (id) {
            id = this.getId(id);
            return document.getElementById(id);
        },

        getId: function (id) {

            var meta = mapper.get(this);
            var prefix = meta.prefix;
            var suffix = meta.suffix;
            var seperator = meta.seperator;

            prefix = prefix ? prefix + seperator : '';
            suffix = suffix ? seperator + suffix : '';

            return prefix + id + suffix;

        },


    };

    return DOM;

   
});


