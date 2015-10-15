
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


        var eid = config['eid'];
        var fullname = config['fullname'];
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

            'IsNewJson': 'Y',
            'IsEncrypt': 'N',

            //签名，值为md5(EID + AppSecret + Method + Timetamp + State )
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
        ]);

        var api = new API('', defaults);


        //预绑定事件。
        var events = $.Object.filter(config, [
            'success',
            'fail',
            'error',
        ]);
    
        api.on(events);


        api.post(data, query);

        return api;
    }




    return /**@lends Ajax*/ {
        post: post,
    };

    

});


