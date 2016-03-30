
/**
*
*/
define('SSH/Ajax', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    /**
    * 发起 ajax 网络请求(核心方法)。
    */
    function post(config) {

        var MD5 = require('MD5');


        //api 的完整名称
        var fullname = config['prefix'] + config['name'];

        var eid = config['eid'];
        var openid = config['openid'];

        var timestamp = $.Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        var random = $.String.random(16); //16位随机数

        var data = {
            'EID': eid,
            'Openid': openid,
            'Method': fullname,
            'Timestamp': timestamp,
            'Ver': config['version'],
            'FromTag': config['fromTag'],
            'AppID': config['appid'],
            'NetID': config['netid'],

            'IsNewJson': 'Y',
            'IsEncrypt': 'N',

            //签名，值为 md5(EID + AppSecret + Method + Timetamp + State)
            'Sign': MD5.encrypt(eid, config['secret'], fullname, timestamp, random),
            'State': random,
           
            'CustData': config['data'],
        };


        var query = {
            'eid': eid,
            'openid': config['openid'],
            'pubacckey': config['pubacckey'],
            'timestamp': config['timestamp'],
            'nonce': config['nonce'],
            'pubaccid': config['pubaccid']
        };


        var API = require('API');

        var defaults = $.Object.filter(config, [
            'ext',
            'successCode',
            'field',
            'url',
            'proxy',
            'serialize',
            'timeout',
        ]);

        //这里的 api 名称为空，因为它是固定 url 的，url 中不需要名称。
        //如 url = 'http://120.132.144.214/Webapi/Router'
        var api = new API('', defaults);


        //预绑定事件。
        var events = $.Object.filter(config, [
            'success',
            'fail',
            'error',
        ]);

        // 'timeout' 字段已用来设置时间，这里要单独弄。
        events['timeout'] = config.timeoutFn;
    

        api.on(events);

        


        api.post(data, query);

        return api;
    }




    return /**@lends Ajax*/ {
        post: post,
    };

    

});


