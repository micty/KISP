
/**
*
*/
define('SSH/Ajax', function (require, module, exports) {

    var $Object = require('Object');
    var $Date = require('Date');
    var $String = require('String');
    var Query = require('Query');


    /**
    * 发起 ajax 网络请求(核心方法)。
    */
    function post(config) {
        var MD5 = require('MD5');


        //api 的完整名称
        var fullname = config['prefix'] + config['name'];

        var eid = config['eid'];
        var openid = config['openid'];

        var timestamp = $Date.get('yyyy-MM-dd HH:mm:ss');
        var random = $String.random(16); //16位随机数


        //临时方案，给新版授权使用。
        var form = config.form || {};
        var secret = form.secret || config.secret;

        form.Openid = form.Openid || openid;

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
            'Sign': MD5.encrypt(eid, secret, fullname, timestamp, random),
            'State': random,
           
            'CustData': config['data'],
        };


        //临时方案，给新版授权使用。
        Object.assign(data, form);
        delete data.secret;



        var query = {
            //'eid': eid,
            //'openid': config['openid'],
            //'pubacckey': config['pubacckey'],
            //'timestamp': config['timestamp'],
            //'nonce': config['nonce'],
            //'pubaccid': config['pubaccid']
        };


        var API = require('API');

        var defaults = $Object.filter(config, [
            'ext',
            'successCode',
            'field',
            'url',
            'proxy',
            'serialize',
            'timeout',
        ]);

        //为方便抓包查看，把完整的名称放在首位。
        defaults.url = Query.add(defaults.url, fullname);




        //这里的 api 名称为空，因为它是固定 url 的，url 中不需要名称。
        //如 url = 'http://120.132.144.214/Webapi/Router'
        var api = new API('', defaults);


        //预绑定事件。
        var events = $Object.filter(config, [
            'success',
            'fail',
            'error',
            'abort',
        ]);

        // 'timeout' 字段已用来设置时间，这里要单独弄。
        events['timeout'] = config.ontimeout;
    

        api.on(events);

        


        api.post(data, query);

        return api;
    }




    return /**@lends Ajax*/ {
        'post': post,
    };

    

});


