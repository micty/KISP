
/**
* SSH 类。
* @class
* @name SSH
* @augments API
*/
define('SSH', function (require, module, exports) {

    var $Object = require('Object');
    var Emitter = require('Emitter');
    var Defaults = require('Defaults');
    var API = require('API');

    var mapper = require('Mapper'); //这里要用有继承关系的 Mapper

    /**
    * SSH 构造器。
    * @param {string} name 后台接口的名称。 
        简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function SSH(name, config) {

        name = name || '';
        config = Defaults.clone(module.id, config);

        var emitter = new Emitter(this);
        var successCode = config.successCode;
        var proxy = config.proxy;

        //先过滤出(已存在的)指定成员。
        var ajax = $Object.filter(config, [
            'ext',
            'successCode',
            'field',

            'prefix',
            'serialize',
            'timeout',

            //必选的
            'eid',
            'openid',

            //可选的
            'appid',
            'netid',
            'pubacckey',
            'timestamp',
            'nonce',
            'pubaccid',
            'data',

            //临时方案，给新版授权使用。
            'url',
            'form',

        ]);

        //再复制。 
        ajax = Object.assign(ajax, {
            'name': name,
            'proxy': proxy,



            success: function (data, json, xhr) { //成功
                fireEvent('success', [data, json, xhr]);
            },

            fail: function (code, msg, json, xhr) { //失败
                fireEvent('fail', [code, msg, json, xhr]);
            },

            error: function (xhr) { //错误
                fireEvent('error', [xhr]);
            },

            //timeout字段已用来设置时间了，这里换个名称。
            ontimeout: function (xhr) {
                fireEvent('timeout', [xhr]);
            },

            abort: function () {
                emitter.fire('abort');
            },

        });



        var meta = {
            'ajax': ajax,
            'console': config.console,
            'status': '',
            'args': [],
            'emitter': emitter,
            'api': null,            //缓存创建出来的 api 对象。
            'fireEvent': fireEvent, //这里要设置进去，因为继续了 API 的关系。
        };

        mapper.set(this, meta);


        //内部共用函数
        function fireEvent(status, args, emitter) {

            meta.api = null; //请求已完成，针对 abort() 方法。

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
    SSH.prototype = Object.assign(new API(), /**@lends SSH#*/ {

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


            var Server = module.require('Server');


            Server.get({
                data: {
                    'eid': ajax.eid,
                    'appid': ajax.appid,
                    'netid': ajax.netid,
                },
                success: function (server) { //成功

                    var obj = Object.assign({}, ajax, {
                        'data': data || ajax.data,

                        //来自 Server 的
                        'secret': server['secret'],
                        'version': server['version'],
                        'fromTag': server['fromTag'],
                        'url': server['url'],
                        'netid': server['netid'],
                    });


                    //临时方案，给新版授权使用。
                    if (ajax.url) {
                        obj.url = ajax.url;
                    }


                    //为了便于查看调用的 API 名称和 CustData 而打印到控制台。
                    if (meta.console) {
                        //var fullname = ajax.prefix + ajax.name; //api 的完整名称
                        //console.log(fullname, obj.data);

                        var msg = '%c' + ajax.prefix + '%c' + ajax.name;
                        var s0 = 'color:#61a7e5;';
                        //var s1 = 'color:#138df9;font-weight:bold;';
                        var s1 = 'color:#138df9;';

                        console.log(msg, s0, s1, obj.data);
                    }

                    var Ajax = module.require('Ajax');
                    meta.api = Ajax.post(obj);

                },
                fail: function (code, msg, json, xhr) {

                    if (code == 302) { //存在多个 netid
                        var list = json['NetIDList'] || [];
                        emitter.fire('servers', [list, json, xhr]);
                        return;
                    }

                    var fail = ajax.fail;
                    fail && fail(code, msg, json, xhr);
                },

                error: ajax.error,

            });


            return this;

        },

        /**
        * 取消当前已发起但未完成的请求。
        * 只有已发起了请求但未完成，才会执行取消操作，并会触发 abort 事件。
        */
        abort: function () {
            var meta = mapper.get(this);
            var api = meta.api;
            if (!api) {
                return;
            }

            api.abort();
        },

    });

    //静态成员
    return Object.assign(SSH, { /**@lends SSH*/

        /**
        * 当存在多个产品实例(NetID)时，设置需要使用的项。
        */
        'setServer': function (item) {
            var Server = module.require('Server');
            Server.set(item);
        },
    });




});


