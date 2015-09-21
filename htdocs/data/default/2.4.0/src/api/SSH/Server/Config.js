
/**
*
*/
define('SSH/Server/Config', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');

    var key = '__' + module.id + '__';
    var json = null;


    function getStorage() {

        var defaults = Config.get(module.id);
        var cache = defaults.cache;

        if (!cache) {
            return null;
        }

        if (cache == 'session' || cache == 'local') {
            cache = cache[0].toUpperCase() + cache.slice(1); //把首字母变大写
            return MiniQuery.require(cache + 'Storage');
        }

        return null;
    }



    function ajax(fn) {

        var defaults = Config.get(module.id);
        var url = defaults.url;

        $.getJSON(url, function (data) {

            try {
                var host = data['kisplusServerS'];
                var path = data['kisplusAppsecret'];

                json = {
                    'version': data['ver'],
                    'fromTag': data['fromtag'],
                    'key': data['AccKey'],
                    'secret': data['AccSecret'],
                    'host': host,
                    'path': path,
                    'route': data['kisplusApiRouter'],
                    'url': host + path,
                };

                var Storage = getStorage();
                if (Storage) {
                    Storage.set(key, json);
                }
            }
            catch (ex) {
                json = null;
            }

            fn && fn(json);

            if (!defaults.cache) {
                json = null;
            }

        });
    }


    function get(fn) {

        if (!fn) {
            return;
        }

        if (json) {
            fn(json);
            return;
        }

        var Storage = getStorage();
        if (Storage) {
            json = Storage.get(key);
            if (json) {
                fn(json);
                return;
            }
        }


        ajax(fn);

    }



    return {
        get: get,
    };


});


