
/**
* SSH/Server
* @class
*/
define('SSH/Server', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Config = require('Config');

    var storage = null;


    function getStorage() {

        if (storage !== null) { //说明已经创建过了
            return storage;
        }

        //首次创建
        var defaults = Config.get(module.id);
        var cache = defaults.cache;


        if (cache == 'session' || cache == 'local') {

            //把首字母变大写
            cache = cache[0].toUpperCase() + cache.slice(1);

            var Storage = require(cache + 'Storage');
            storage = new Storage(module.id, {
                name: 'KISP',
            });

            return storage;
        }


        storage = false; //这里不能用 null，以表示创建过了。
        return storage;


    }


    function ajax(config, server, fnSuccess, fnFail, fnError) {

        config = config || {
            eid: '',
            appid: '',
        };

        server = server || {
            url: '',
            secret: '',
            key: '',
            route: '',
            version: '',
            fromTag: '',
        };

        var API = require('API');
        var MD5 = require('MD5');
        var Config = require('Config');

        var defaults = Config.clone(module.id, {
            'url': server.url,
        });

        var api = new API('', defaults);

        var eid = config['eid'];
        var timestamp = $.Date.format(new Date(), 'yyyy-MM-ddhh:mm:ss');
        var random = $.String.random(16); //16位随机数
        var sign = MD5.encrypt(eid, server['secret'], timestamp, random);

        api.get({
            'EID': eid,
            'AppID': config['appid'] || '',
            'AccKey': server['key'] || '',
            'Timestamp': timestamp,
            'State': random,
            'Sign': sign,
        });


        api.on('success', function (data, json, xhr) {

            var Url = require('Url');
            var url = (json['ServerUrl'] || '') + server.route;

            if (!Url.checkFull(url)) {
                url = 'http://' + url;
            }

            data = {
                secret: json['AppSecret'],
                version: server['version'],
                fromTag: server['fromTag'],
                url: url,   // 类似于 'http://120.132.144.214/Webapi/Router'
            };

            args = [data, json];

            var storage = getStorage();
            if (storage) {
                storage.set('args', args);
            }

            fnSuccess.apply(null, args);

            if (!defaults.cache) {
                args = null;
            }

        });

        api.on('fail', function (code, msg, json, xhr) {
            fnFail && fnFail(code, msg, json);
        });

        api.on('error', function (xhr) {
            fnError && fnError();
        });
        
    }


    var args = null;


    function get(config, fnSuccess, fnFail, fnError) {

        config = config || {
            eid: '',
            appid: '',
        };

        if (!fnSuccess) {
            return;
        }

        if (args) {
            fnSuccess.apply(null, args);
            return;
        }

        var storage = getStorage();
        if (storage) {
            args = storage.get('args');
            if (args) {
                fnSuccess.apply(null, args);
                return;
            }
        }


        var Config = module.require('Config');

        Config.get(function (server) {

            if (!server) {
                fnError && fnError();
                return;
            }

            ajax(config, server, fnSuccess, fnFail, fnError);

        });
    }




    return {
        get: get,
    };


});


