
/**
*
*/
define('SSH/Server/Config', function (require, module, exports) {

    var Emitter = require('Emitter');
    var Defaults = require('Defaults');

    var json = null;
    var storage = null;


    function getStorage() {

        if (storage !== null) { //说明已经创建过了
            return storage;
        }

        //首次创建
        var defaults = Defaults.get(module.id);
        var cache = defaults.cache;


        if (cache == 'session' || cache == 'local') {

            //为了让自动化工具分析出依赖，这里要用完整的字符串常量作为 require() 的第一个参数。
            var Storage = cache == 'session' ?
                    require('SessionStorage') :
                    require('LocalStorage');

            storage = new Storage(module.id, {
                name: 'KISP',
            });

            return storage;
        }


        storage = false; //这里不能用 null，以表示创建过了。
        return storage;

        
    }



    function ajax(fn) {

        var defaults = Defaults.get(module.id);
        var url = defaults.url;

        $.getJSON(url, function (data) {

            try {
                var host = defaults.host || data['kisplusServerS']; //优先使用用户指定的 host。
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

                var storage = getStorage();
                if (storage) {
                    storage.set(json);
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


    



    return {

        'get': function (fn) {

            var defaults = Defaults.get(module.id);
            var cache = defaults.cache;


            if (cache && json) { //只有启用缓存时才从内存中读。
                fn(json);
                return;
            }

            var storage = getStorage();
            if (storage) {
                json = storage.get();

                if (json) {
                    fn(json);
                    return;
                }
            }


            ajax(fn);

        },
    };


});


