
/**
* SSH.API 类
* @class
* @name SSH.API
* @augments SSH
*/
define('SSH.API', function (require, module, exports) {


    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var SSH = require('SSH');


    var mapper = require('Mapper'); //用于容纳所有 SSHAPI 实例的 meta 数据

    /**
    * SSHAPI 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function SSHAPI(name, config) {

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

        //过滤出属于 SSH 的配置成员
        var ssh = $.Object.filter(config, [
            'prefix',
            'eid',
            'openid',

            'proxy',
            'serialize',

            //可选的
            'appid',
            'pubacckey',
            'timestamp',
            'nonce',
            'pubaccid',
        ]);


        var ajax = {
            'name': name,
            'successCode': successCode,
            'field': config['field'],
            'data': config['data'] || {},

            'ssh': $.Object.extend(ssh, config.ssh), //再合并针对 ssh 的

            success: function (data, json, xhr) { //成功
                meta.fireEvent('success', [data, json, xhr]);
            },

            fail: function (code, msg, json, xhr) { //失败
                meta.fireEvent('fail', [code, msg, json, xhr]);
            },

            error: function (xhr) { //错误
                meta.fireEvent('error', [xhr]);
            },
        };


        var meta = {

            'ajax': ajax,

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
    SSHAPI.prototype = $.Object.extend(new SSH(), /**@lends SSH.API#*/ {

        constructor: SSHAPI,

        //避免调到父类的 get 方法，显式抛出错误有助于发现错误。
        get: function () {
            throw new Error(module.id + ' 不支持 get 方式的请求');
        },

        /**
        * 发起网络 POST 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] POST 请求的数据对象。
        * @param {Object} [query] 查询字符串的数据对象。
        *   该数据会给序列化成查询字符串，并且通过 form-data 发送出去。
        * @return {SSHAPI} 返回当前 SSHAPI 的实例 this，因此进一步可用于链式调用。
        */
        post: function (data) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var ajax = meta.ajax;

            var obj = $.Object.extend({}, ajax, {
                'data': data || ajax.data,
            });

            emitter.fire('request', ['post', obj.data]);

            var Ajax = require(module, 'Ajax');
            Ajax.post(obj);

            return this;

        },
    });


    return SSHAPI;


});


