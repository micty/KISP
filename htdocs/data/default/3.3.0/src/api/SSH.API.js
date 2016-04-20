
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


    var mapper = require('Mapper');     //用于容纳所有 SSHAPI 实例的 meta 数据
    var $emitter = new Emitter(SSHAPI); //针对类的，而不是实例的。

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
        if (proxy && typeof proxy == 'object') { // proxy: { ... }
            proxy = proxy[name];
        }

        //支持简写，代理的文件名跟 API 的名称一致。
        if (proxy === true) { 
            proxy = name + '.js';
        }

        //过滤出属于 SSH 的配置成员
        //这里使用过滤 + 复制的方式进行成员选取。
        var ssh = $.Object.extend($.Object.filter(config, [
            'prefix',
            'eid',
            'openid',
            'serialize',
            'timeout',

            //可选的
            'appid',
            'netid',
            'pubacckey',
            'timestamp',
            'nonce',
            'pubaccid',

        ]), {
            'proxy': proxy,
        });


        var ajax = {
            'name': name,
            'successCode': successCode,
            'field': config.field,
            'data': config.data,

            'ssh': $.Object.extend(ssh, config.ssh), //再合并针对 ssh 的

            success: function (data, json, xhr) { //成功
                fireEvent('success', [data, json, xhr]);
            },

            fail: function (code, msg, json, xhr) { //失败
                fireEvent('fail', [code, msg, json, xhr]);
            },

            error: function (code, msg, json, xhr) { //错误

                //为了让业务层能知道 SSH 层发生了 fail，通过判断 json 是否为空即可。
                //当 http 协议层连接错误，则 code, msg, json 三个参数都为 undefined。
                msg = msg || config.msg;

                fireEvent('error', [code, msg, json, xhr]);
            },

            timeout: function (xhr) {
                fireEvent('timeout', [xhr]);
            },

            abort: function () {
                emitter.fire('abort');
            },

            //存在多个产品实例 (netid) 时触发。
            servers: function (list) {
                //触发类的事件，而不是实例的。
                $emitter.fire('servers', [list]);
            },
        };


        var meta = {
            'ajax': ajax,
            'status': '',
            'args': [],
            'emitter': emitter,
            'ssh': null,            //缓存创建出来的 ssh 对象。
            'fireEvent': fireEvent, //这里要设置进去，因为继续了 API 的关系。
        };

        mapper.set(this, meta);




        //内部共用函数
        function fireEvent(status, args, emitter) {

            meta.ssh = null;    //请求已完成，针对 abort() 方法。

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

        }

    }


    //实例方法
    SSHAPI.prototype = $.Object.extend(new SSH(), /**@lends SSH.API#*/ {

        constructor: SSHAPI,

        //避免调到父类的 get 方法，显式地抛出异常有助于发现错误。
        get: function () {
            throw new Error(module.id + ' 不支持 get 方式的请求');
        },

        /**
        * 发起网络 post 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] POST 请求的数据对象。
        * @return {SSHAPI} 返回当前 SSHAPI 的实例 this，因此进一步可用于链式调用。
        */
        post: function (data) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var ajax = meta.ajax;

            var obj = $.Object.extend({}, ajax, {
                'data': data || ajax.data || {},
            });

            emitter.fire('request', ['post', obj.data]);

            var Ajax = module.require('Ajax');
            meta.ssh = Ajax.post(obj);

            return this;

        },

        /**
        * 取消当前已发起但未完成的请求。
        * 只有已发起了请求但未完成，才会执行取消操作，并会触发 abort 事件。
        */
        abort: function () {
            var meta = mapper.get(this);
            var ssh = meta.ssh;
            if (!ssh) {
                return;
            }

            ssh.abort();
        },
    });




    //静态成员
    return $.Object.extend(SSHAPI, { /**@lends SSHAPI*/

        /**
        * 当存在多个产品实例(NetID)时，设置需要使用的项。
        */
        setServer: function (item) {
            SSH.setServer(item);
        },

        on: $emitter.on.bind($emitter),
    });

});


