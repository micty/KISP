
/**
* 请求后台接口类
* @class
* @name API
*/
define('API', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var Fn = require('Fn');
    var mapper = require('Mapper');



    /**
    * API 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function API(name, config) {

        name = name || '';
        config = Config.clone(module.id, config);

        mapper.setGuid(this, module); //设置 guid, 提高 mapper 查找效率。
        var emitter = new Emitter(this);
        var successCode = config.successCode;

        var proxy = config.proxy;
        if (typeof proxy == 'object') { // proxy: { ... }
            proxy = proxy[name];
        }



        //发起 ajax 请求所需要的配置对象。
        var ajax = {
            'name': name,
            'data': config.data,
            'query': config.query,

            'url': config.url || '',
            'ext': config.ext || '',
            'random': config.random,

            'successCode': successCode,
            'field': config.field,
            'proxy': proxy,
            'serialize': config.serialize,

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


        var delay = config.delay;

        var meta = {
            'ajax': ajax,
            'status': '',
            'args': [],
            'emitter': emitter,

            fireEvent: function (status, args, emitter) {

                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;

                Fn.delay(delay, function () {

                    emitter.fire('response', args); //最先触发

                    //进一步触发具体 code 对应的事件
                    if (status == 'success') {
                        emitter.fire('code', successCode, args);
                    }
                    else if (status == 'fail') {
                        emitter.fire('code', args[0], args);
                    }

                    var xhr = args.slice(-1)[0]; //args[args.length - 1]
                    if (xhr) { //在 Proxy 的响应中 xhr 为 null
                        emitter.fire('status', xhr.status, args);
                    }

                    emitter.fire(status, args); //触发命名的分类事件，如 success、fail、error
                    emitter.fire('done', args); //触发总事件
                });
            },
        };

        mapper.set(this, meta);


        //预绑定事件
        var events = $.Object.filter(config, [
            'done',
            'success',
            'fail',
            'error',
            'code',
            'status',
        ]);

        this.on(events);
    }

    //实例方法
    API.prototype = /**@lends API#*/ {
        constructor: API,

        /**
        * 发起网络 GET 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] 请求的数据对象。
        *   该数据会给序列化成查询字符串以拼接到 url 中。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        * @example
            var api = new API('test');
            api.get({ name: 'micty' });
        */
        get: function (data) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var obj = $.Object.extend({}, meta.ajax);
            if (data) {
                obj.data = data;
            }

            emitter.fire('request', ['get', obj.data]); //这里用 obj.data

            var Ajax = module.require('Ajax');
            Ajax.get(obj);

            return this;
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

            var obj = $.Object.extend({}, ajax, {
                'data': data || ajax.data,
                'query': query || ajax.query,
            });

            emitter.fire('request', ['post', obj.data, obj.query]);

            var Ajax = module.require('Ajax');
            Ajax.post(obj);

            return this;

        },

        /**
        * 请求完成时触发。
        * 不管请求完成后是成功、失败、错误，都会触发，会最先触发此类事件。
        * @param {function} fn 回调函数。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        done: function (fn) {
            this.on('done', fn);
            return this;
        },

        /**
        * 请求成功时触发。
        * 成功是指网络请求成功，且后台业务返回的数据包中的 code == successCode 的情形。
        * @param {function} fn 回调函数。
        */
        success: function (fn) {
            this.on('success', fn);
            return this;
        },

        /**
        * 请求失败时触发。
        * 失败是指网络请求成功，但后台业务返回的数据包中的 code != successCode 的情形。
        * @param {function} fn 回调函数。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        fail: function (fn) {
            this.on('fail', fn);
            return this;
        },

        /**
        * 请求错误时触发。
        * 错误是指网络请求不成功，如网络无法连接、404错误等。
        * @param {function} fn 回调函数。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        error: function (fn) {
            this.on('error', fn);
            return this;
        },

        status: function (status, fn) {
            var args = [].slice.call(arguments, 0);
            this.on.apply(this, ['status'].concat(args));
        },

        code: function (code, fn) {
            var args = [].slice.call(arguments, 0);
            this.on.apply(this, ['code'].concat(args));
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

            return this;

        },

        /**
        * 解除绑定事件。
        * 已重载 off({...}，因此支持批量解除绑定。
        * @param {string} [name] 事件名称。
        *   当不指定此参数时，则解除全部事件。
        * @param {function} [fn] 要解除绑定的回调函数。
        *   当不指定此参数时，则解除参数 name 所指定的类型的事件。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        off: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.off.apply(emitter, args);

            return this;
        },

        /**
        * 销毁本实例对象。
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            emitter.destroy();

            mapper.remove(this);
        },
    };


    return API;

});


