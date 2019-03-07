
/**
* 后台 API 接口请求类。
* @class
* @name API
*/
define('API', function (require, module, exports) {
    var Emitter = require('Emitter');
    var Defaults = require('Defaults');
    var Fn = require('Fn');

    var mapper = require('Mapper'); //这里要用有继承关系的 Mapper



    /**
    * API 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    *   config = {
    *       
    *   };
    */
    function API(name, config) {
        //重载 API(config);
        if (typeof name == 'object') {
            config = name;
            name = '';
        }

        name = name || '';
        config = Defaults.clone(module.id, config);


        var emitter = new Emitter(this);
        var successCode = config.successCode;
        var proxy = config.proxy;

        //支持简写，代理的文件名跟 API 的名称一致。
        switch (proxy) {
            case true:
                proxy = name + '.js';
                break;
            case '.json':
            case '.js':
                proxy = name + proxy;
                break;
        }


        

        //发起 ajax 请求所需要的配置对象。
        var ajax = {
            'name': name,
            'data': config.data,
            'query': config.query,

            'url': config.url,
            'prefix': config.prefix,
            'ext': config.ext,
            'random': config.random,

            'successCode': successCode,
            'field': config.field,
            'proxy': proxy,
            'serialize': config.serialize,
            'timeout': config.timeout,

            success: function (data, json, xhr) { //成功
                fireEvent('success', [data, json, xhr]);
            },

            fail: function (code, msg, json, xhr) { //失败
                fireEvent('fail', [code, msg, json, xhr]);
            },

            error: function (xhr) { //错误
                if (meta.aborted) { //避免因手动调用了 abort() 而导致触发 error 事件。
                    meta.aborted = false; //归位
                    return;
                }

                fireEvent('error', [xhr]);
            },

            ontimeout: function (xhr) { //超时，自定义的
                fireEvent('timeout', [xhr]);
            },
        };


        var Ajax = module.require('Ajax');

        var meta = {
            'ajax': ajax,
            'status': '',
            'args': [],
            'emitter': emitter,
            'xhr': null,            //缓存创建出来的 xhr 对象。
            'aborted': false,       //指示是否已调用了 abort()。
            'fireEvent': fireEvent, //

            /**
            * 用于发起 ajax 请求的 get 方法。
            * 如果想实现自己的 get 方法，可以提供此函数。
            * 否则使用内部默认的 Ajax.get() 方法。
            */
            'get': config.get || Ajax.get,

            /**
            * 用于发起 ajax 请求的 post 方法。
            * 如果想实现自己的 post 方法，可以提供此函数。
            * 否则使用内部默认的 Ajax.post() 方法。
            */
            'post': config.post || Ajax.post,    
        };

        mapper.set(this, meta);


        //内部共用函数。
        function fireEvent(status, args, emitter) {
            status = meta.status = status || meta.status;
            args = meta.args = args || meta.args;
            emitter = emitter || meta.emitter;
            meta.xhr = null; //请求已完成，针对 abort() 方法。

            var len = args.length;
            var xhr = args[len - 1];
            var json = args[len - 2];
            var isSuccess = status == 'success';
            var isFail = status == 'fail';


            Fn.delay(config.delay, function () {

                //最先触发
                var values = emitter.fire('response', [status, json, xhr]); 

                if (values.includes(false)) {
                    return;
                }


                //进一步触发具体 code 对应的事件
                if (isSuccess || isFail) {
                    var code = isSuccess ? successCode : args[0];
                    values = emitter.fire('code', code, args);

                    if (values.includes(false)) {
                        return;
                    }
                }


                //在 Proxy 的响应中 xhr 为 null。
                if (xhr) { 
                    values = emitter.fire('status', xhr.status, args);

                    if (values.includes(false)) {
                        return;
                    }
                }

                //触发命名的分类事件，如 success|fail|error|timeout
                values = emitter.fire(status, args);

                if (values.includes(false)) {
                    return;
                }

                //触发总事件。
                emitter.fire('done', [status, json, xhr]);
            });
        }

     
    }



    //实例方法
    API.prototype = /**@lends API#*/ {
        constructor: API,

        /**
        * 发起网络 GET 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] 请求的数据对象。
        *   该数据会给序列化成查询字符串以拼接到 url 中。
        * @example
            var api = new API('test');
            api.get({ name: 'micty' });
        */
        get: function (data) {
            var meta = mapper.get(this);    //API 类给继承后，this 就是子类的实例。 比如 SSH 继承 API，则 this 为 SSH 的实例，不再是 API 的实例。
            var emitter = meta.emitter;

            meta.aborted = false; //归位

            var obj = Object.assign({}, meta.ajax);
            if (data) {
                obj.data = data;
            }

            data = obj.data;  //这里用 obj.data
           
            emitter.fire('request', 'get', [data]);
            emitter.fire('request', ['get', data]); 

            meta.xhr = meta.get(obj);
      
        },

        /**
        * 发起网络 POST 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] POST 请求的数据对象。
        * @param {Object} [query] 查询字符串的数据对象。
        *   该数据会给序列化成查询字符串，并且通过 form-data 发送出去。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        post: function (data, query) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var ajax = meta.ajax;

            meta.aborted = false; //归位

            var obj = Object.assign({}, ajax, {
                'data': data || ajax.data,
                'query': query || ajax.query,
            });

            data = obj.data;    //这里用 obj.data
            query = obj.query;  //这里用 obj.query

            emitter.fire('request', 'post', [data, query]);
            emitter.fire('request', ['post', data, query]);

     
            meta.xhr = meta.post(obj);

        },

        /**
        * 取消当前已发起但未完成的请求。
        * 只有已发起了请求但未完成，才会执行取消操作，并会触发 abort 事件。
        */
        abort: function () {
            var meta = mapper.get(this);
            var xhr = meta.xhr;
            if (!xhr) {
                return;
            }

            meta.aborted = true;        //先设置状态
            xhr.abort();                //会触发 ajax.error 事件。
            meta.emitter.fire('abort'); //
        },
        

        /**
        * 绑定事件。
        * 已重载 on({...}，因此支持批量绑定。
        * @param {string} name 事件名称。
        * @param {function} fn 回调函数。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        on: function (name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);

            var status = meta.status;

            if (status) { //请求已完成，立即触发
                var emt = new Emitter(this); //使用临时的事件触发器。
                emt.on.apply(emt, args);
                meta.fireEvent(status, meta.args, emt);
                emt.destroy();
            }

        },

       

        /**
        * 销毁本实例对象。
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            emitter.destroy();

            mapper.delete(this);
        },
    };


    return API;

});


