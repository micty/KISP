
/**
*
*/
define('API/Ajax', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    //[XMLHttpRequest 增强功能](https://technet.microsoft.com/zh-cn/office/hh673569)
    //[XMLHttpRequest2 新技巧](http://www.html5rocks.com/zh/tutorials/file/xhr2/)
    //[XMLHttpRequest Level 2 使用指南](http://kb.cnblogs.com/page/157047/)

    /**
    * 发起 ajax 网络请求(核心方法)。
    * @param {string} method 网络请求的方式：'get' 或 'post'。
    * @param {Object} config 配置对象。 其中：
    * @param {string} config.name 后台接口的名称，会用在 url 中。
    * @param {Object} [config.url] 请求的 url 地址。
    * @param {Object} [config.ext] 要用在 url 中的后缀。
    * @param {Object} [config.data] 要发送的数据。
        该数据会给序列化成查询字符串，然后：
        当 method 为 'get' 时，数据拼接在 url 中。
        当 method 为 'post' 时，数据放在 form-data 表单中。
    * @param {Object} [config.query] 要发送的查询字符串数据。
        该字段仅在 method 为 'post' 时可用。
    * @param {number||string} [config.successCode] 指示请求成功时的代码。
    * @param {Object} [config.field] 响应中的映射字段。
    * @param {function} [config.success] 请成功时的回调。
    * @param {function} [config.fail] 请失败时的回调。
    * @param {function} [config.error] 请错误时的回调。
    * @return {XMLHTTPRequest} 返回 xhr 对象。
        如果使用的是代理，则返回 null。
    */
    function request(method, config) {

        var proxy = config.proxy;
        if (proxy) { //使用了代理
            var Proxy = require('Proxy');
            Proxy.request(proxy, config);
            return null;
        }

        //完整的 url
        var url = [
            config.url,
            config.prefix,
            config.name,
            config.ext,
        ].join('');


        var data = config.data || null; // null 可能会在 xhr.send(data) 里用到
        if (data) {

            var serialize = config.serialize; //对子对象进行序列化的方法

            data = $.Object.map(data, function (key, value) {
                if (typeof value == 'object' && value) { //子对象编码成 JSON 字符串
                    return serialize(key, value);
                }
                //其他的
                return value; //原样返回
            });
        }

        var Url = MiniQuery.require('Url');

        //增加一个随机字段，以使缓存失效
        var random = config.random;
        if (random) {
            random = 'rd_' + $.String.random(16);
            url = Url.addQueryString(url, random, '');
        }


        if (method == 'post') {
            var query = config.query;
            if (query) {
                url = Url.addQueryString(url, query);
            }
            if (data) {
                data = $.Object.toQueryString(data);
            }
        }
        else if (data) { // 'get'
            url = Url.addQueryString(url, data);
            data = null; //要发送的数据已附加到 url 参数上
        }


      

        //同时启动超时器和发起请求，让它们去竞争。
       
        var isTimeout = false; //指示是否已超时
        var tid = null;
        var timeout = config.timeout || 0;

        if (timeout > 0) {
            tid = setTimeout(function () {
                isTimeout = true;
                xhr.abort(); //取消当前响应，关闭连接并且结束任何未决的网络活动。

                var fn = config.ontimeout;
                fn && fn(xhr);

            }, timeout);
        }


        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.onreadystatechange = function () {

            if (isTimeout || xhr.readyState != 4) {
                return;
            }


            clearTimeout(tid);

            var successCode = config.successCode;
            var fnError = config.error;

            if (xhr.status != 200) {
                fnError && fnError(xhr);
                return;
            }

            var JSON = require('JSON');
            var json = JSON.parse(xhr.responseText);
            if (!json) {
                fnError && fnError(xhr);
                return;
            }

            var field = config.field;

            var code = json[field.code];
            if (code == successCode) {

                var fnSuccess = config.success;
                var data = field.data in json ? json[field.data] : {};

                fnSuccess && fnSuccess(data, json, xhr);
            }
            else {
                var fnFail = config.fail;
                fnFail && fnFail(code, json[field.msg], json, xhr);
            }
        };

        if (method == 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        xhr.send(data);


        return xhr;
    }






    return /**@lends Ajax*/ {

        get: function (config) {
            return request('get', config);
        },

        post: function (config) {
            return request('post', config);
        },
    };

    

});


