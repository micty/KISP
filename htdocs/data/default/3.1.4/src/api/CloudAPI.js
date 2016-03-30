
/**
* 云基础平台请求后台接口类。
* @class
* @name CloudAPI
*/
define('CloudAPI', function (require, module, exports) {

    var $ = require('$');
    var Config = require('Config');
    var API = require('API');

    /**
    * CloudAPI 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function CloudAPI(name, config) {

        config = Config.clone(module.id, config);


        var method = config.prefix + name;

        var token = config.token;
        if (typeof token == 'function') {
            token = token();
        }

        var encrypted = config.encrypted;

        var defaults = $.Object.remove(config, [
           'prefix',
           'token',
           'encrpy',
        ]);

        var api = new API('', defaults);
        var post = api.post.bind(api);

        var query = {
            'eid': config.eid,
            'openid': config.openid,
            'appid': config.appid,
        };

        //重写
        api.post = function (data) {

            var form = {
                'apiToken': token,
                'encrypted': encrypted ? 'Y' : 'N',
                'method': method,
                'data': data || null,
            };

            post(form, query);
        };

        return api;
    }




    return CloudAPI;

});


