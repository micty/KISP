

//定义 Token 模块
define('Token', function (require, module,  exports) {

    var $ = require('$');
    var Base64 = require('Base64');
    var DES = require('DES');

    function encrypt() {

        var args = [].slice.call(arguments, 0);
        var ts = new Date().getTime();
        args.push(ts);
        args = args.join('&');


        var key = $.String.random(3);
        var base64 = Base64.encode(key);

        var des = DES.encrypt(key, args);

        var token = base64 + des;
        return token;
    }


    /**
    * 解密指定的 token 字符串。
    * @return {Array|null} 返回解密后的信息数组。
        当解密失败时，返回 null。
    */
    function decrypt(token) {

        try {
            var base64 = token.slice(0, 4);
            var des = token.slice(4);

            var key = Base64.decode(base64);

            var a = DES.decrypt(key, des);
            a = a.split('&');

            return a;
        }
        catch (ex) {
            return null;
        }
        
    }

    /**
    * 调用指定的方法，并传递一些参数。
    */
    function invoke(fn, arg0, arg1) {

        if (!fn) {
            return;
        }

        var args = [].slice.call(arguments, 1);
        return fn.apply(null, args);
    }


    /**
    * 验证指定的 url 地址。
    */
    function validate(url, config) {

        config = config || {};

        var qs = $.Url.getQueryString(url);
        if (!qs) {
            invoke(config.fail);
            return;
        }


        var token = qs['token'];

        if (token) { //首次进来

            var a = decrypt(token);
            if (!a) {
                invoke(config.fail);
                return;
            }

            var ts = a.pop();
            ts = parseInt(ts, 10);
            var now = new Date().getTime();
            if (now - ts > 10 * 1000) { //10s
                invoke(config.timeout);
                return;
            }

            var eid = a[0];
            var openid = a[1];
            var key = DES.encrypt(eid, openid);
            token = DES.encrypt(key, token);
            $.SessionStorage.set(key, token);

            url = $.Url.addQueryString(url, {
                eid: eid,
                openid: openid,
                token: null //删除
            });

            invoke(config.success, url);
        }
        else { //第二次进来

            var eid = qs['eid'];
            var openid = qs['openid'];

            if (!eid || !openid) {
                invoke(config.fail);
                return;
            }

            var key = DES.encrypt(eid, openid);

            token = $.SessionStorage.get(key);
            if (!token) {
                invoke(config.fail);
                return;
            }

            token = DES.decrypt(key, token);
            var a = decrypt(token);

            if (a && a[0] == eid && a[1] == openid) {
                invoke(config.success);
            }
            else {
                invoke(config.fail);
            }
        }

    }


    //module.exports = 
    return {
        encrypt: encrypt,
        decrypt: decrypt,
        validate: validate
    };




});