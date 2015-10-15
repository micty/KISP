
/**
* SSH 类。
* @class
* @name SSH
* @augments API
*/
define('SSH', function (require, module, exports) {


    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var API = require('API');

    var mapper = require('Mapper');

    /**
    * SSH 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function SSH(name, config) {

        name = name || '';
        config = Config.clone(module.id, config);

        mapper.setGuid(this, module); //设置 guid, 提高 mapper 查找效率。

        var prefix = config.prefix;
        var emitter = new Emitter(this);


        var successCode = config.successCode;

        var proxy = config.proxy;
        if (typeof proxy == 'object') { // proxy: { ... }
            proxy = proxy[name];
        }

        //这里使用过滤 + 复制的方式进行成员选取。 过滤的方式只会拷贝已存在的成员
        var ajax = $.Object.extend($.Object.filter(config, [
            'ext',
            'successCode',
            'field',
            'proxy',
            'serialize',

            //必选的
            'eid',
            'openid',

            //可选的
            'appid',
            'pubacckey',
            'timestamp',
            'nonce',
            'pubaccid',
            'data',

        ]), {
            'proxy': proxy,

            //必选的
            'fullname': prefix + name,

            success: function (data, json, xhr) { //成功
                meta.fireEvent('success', [data, json, xhr]);
            },

            fail: function (code, msg, json, xhr) { //失败
                meta.fireEvent('fail', [code, msg, json, xhr]);
            },

            error: function (xhr) { //错误
                meta.fireEvent('error', [xhr]);
            },
        });



        var meta = {
            'ajax': ajax,
            'console': config.console,

            'status': '',
            'args': [],
            'emitter': emitter,

            fireEvent: function (status, args, emitter) {

                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;

                emitter.fire('response', args); //最先触发


                //进一步触发具体 code 对应的事件
                if (status == 'success') {
                    emitter.fire('code', successCode, args);
                }
                else if (status == 'fail') {
                    emitter.fire('code', args[0], args.slice(1)); //错误码不在参数里
                }

                var xhr = args.slice(-1)[0]; //args[args.length - 1]
                if (xhr) { //在 Proxy 的响应中 xhr 为 null
                    emitter.fire('status', xhr.status, args);
                }

                emitter.fire(status, args); //触发命名的分类事件，如 success、fail、error
                emitter.fire('done', args); //触发总事件

            },
        };

        mapper.set(this, meta);

    }

    //实例方法
    SSH.prototype = $.Object.extend(new API(), /**@lends SSH#*/ {

        constructor: SSH,

        /**
        * 发起网络 POST 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] POST 请求的数据对象。
        * @param {Object} [query] 查询字符串的数据对象。
        *   该数据会给序列化成查询字符串，并且通过 form-data 发送出去。
        * @return {SSH} 返回当前 SSH 的实例 this，因此进一步可用于链式调用。
        */
        post: function (data) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var ajax = meta.ajax;
 
            emitter.fire('request', ['post', data || ajax.data]);


            var Server = require(module, 'Server');


            Server.get({
                'eid': ajax.eid,
                'appid': ajax.appid,

            }, function (server, json, xhr) { //成功

                var obj = $.Object.extend({}, ajax, {

                    'data': data || ajax.data,

                    //来自 Server 的
                    'secret': server['secret'],
                    'version': server['version'],
                    'fromTag': server['fromTag'],
                    'url': server['url'],
                });


                //为了便于查看调用的 API 名称和 CustData 而打印到控制台。
                if (meta.console) {
                    console.log(ajax.fullname, obj.data);
                }

                var Ajax = require(module, 'Ajax');
                Ajax.post(obj);

            }, ajax.fail, ajax.error);


            return this;

        },

    });

    return SSH;




});


