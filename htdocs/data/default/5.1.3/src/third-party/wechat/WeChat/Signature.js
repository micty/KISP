
/**
* 微信签名。
*/
define('WeChat/Signature', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Config = require('Config');
    var API = require('API');


    var defaults = null;


    function ajax(config, fn) {

        var api = new API(defaults.name, {
            url: defaults.url,
        });


        api.on('success', function (data, json) {
            fn && fn(data);
        });

        api.on('fail', function (code, msg, json) {
            console.dir(json);
        });

        api.on('error', function () {
            console.log(module.id + ': ajax error');
        });


        api.get({
            'eid': config.eid,
            'url': config.url,
            'timestamp': config.timestamp,    //时间戳
            'noncestr': config.noncestr,     //随机串
        });

    }


    function get(config, fn) {

        defaults = defaults || Config.clone(module.id);

        ajax(config, function (signature) {

            fn && fn({
                'timestamp': config.timestamp,
                'noncestr': config.noncestr,
                'url': config.url,
                'signature': signature,
            });

        });
    }



    module.exports = exports = {
        get: get,
    };

});
