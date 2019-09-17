
/**
* SSH/Server
* @class
*/
define('SSH/Server', function (require, module, exports) {

    var $Date = require('Date');
    var $String = require('String');
    var Defaults = require('Defaults');

    var defaults = Defaults.get(module.id);
    var storage = null;
    var args = null;

    var current = {
        config: null,   //缓存 `Server/Config` 中的 get() 结果。
        server: null,   //缓存当前的 server 信息。
    };

    function getStorage() {

        //已经创建过了
        if (storage || storage === false) { 
            return storage;
        }


        //首次创建
        var cache = defaults.cache;
        if (cache == 'session' || cache == 'local') {

            //为了让自动化工具分析出依赖，这里要用完整的字符串常量作为 require() 的第一个参数。
            var Storage = cache == 'session' ?
                    require('SessionStorage') :
                    require('LocalStorage');

            storage = new Storage(module.id, {
                name: 'KISP',
            });
        }
        else {
            storage = false; //这里不能用 null，以表示创建过了。
        }


        return storage;


    }


    function ajax(data, config, fnSuccess, fnFail, fnError) {

        config = config || {
            url: '',
            secret: '',
            key: '',
            route: '',
            version: '',
            fromTag: '',
        };

        var API = require('API');
        var MD5 = require('MD5');

        var eid = data['eid'];
        var netid = data['netid'];
        var secret = config['secret'];

        var timestamp = $Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss');   //时间戳。
        var random = $String.random(16);                                   //16位随机数。
        var sign = MD5.encrypt(eid, secret, timestamp, random);             //签名。


        var defaults = Defaults.clone(module.id, {
            'url': config.url,
            //proxy: 'server.json',
        });

        var api = new API('', defaults);

        api.get({
            'EID': eid,
            'AppID': data['appid'],
            'NetID': netid,
            'AccKey': config['key'],
            'Timestamp': timestamp,
            'State': random,
            'Sign': sign,
        });


        api.on('success', function (data, json, xhr) {

            var server = current.server = {
                'AppSecret': json['AppSecret'],
                'ServerUrl': json['ServerUrl'],
                'NetID': json['NetID'] || netid,
            };

            use(config, server, fnSuccess);

        });

        api.on('fail', function (code, msg, json, xhr) {
            fnFail && fnFail(code, msg, json);
        });

        api.on('error', function (xhr) {
            fnError && fnError();
        });

    }



    function use(config, server, fn) {
        var Url = require('Url');
        var url = server['ServerUrl'] || '';

        if (!Url.isFull(url)) {
            url = 'http://' + url;
        }

        //当前真实的 netid 值，使用空字符串是为了兼容以前的写法，避免用到 undefined。
        var netid = server['NetID'] || '';   

        var data = {
            'secret': server['AppSecret'],
            'version': config['version'],
            'fromTag': config['fromTag'],
            'url': url + config['route'],   //类似 'http://120.132.144.214/Webapi/Router'
            'netid': netid,   
        };

        args = [data];

        var storage = getStorage();
        if (storage) {
            storage.set('args', args);
        }

        fn && fn.apply(null, args);
    }



    //
    return {
        /**
        * 获取服务器信息。
        */
        'get': function get(options) {

            var data = options.data;
            var fnSuccess = options.success;
            var fnFail = options.fail;
            var fnError = options.error;

            var cache = defaults.cache;

            if (cache && args) { //只有启用缓存时才从内存中读取。
                fnSuccess.apply(null, args);
                return;
            }

            //可能页面刷新了，导致内存中的不存在，才判断 SessionStorage 或 LocalStroage 中的
            var storage = getStorage();
            if (storage) {
                args = storage.get('args');
                if (args) {
                    fnSuccess.apply(null, args);
                    return;
                }
            }


            var Config = module.require('Config');
            Config.get(function (config) {

                if (!config) {
                    fnError && fnError();
                    return;
                }

                current.config = config;

                var server = current.server;
                if (server) {
                    use(config, server, fnSuccess);
                    return;
                }


                ajax(data, config, fnSuccess, fnFail, fnError);

            });
        },

        /**
        * 当存在多个 NetID 时，需要手动选择并设置所使用的项。
        */
        'set': function (server) {

            current.server = server;

            var config = current.config;
            if (config) {
                use(config, server);
            }
        },
    };


});


