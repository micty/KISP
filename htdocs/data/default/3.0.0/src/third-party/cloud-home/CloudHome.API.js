
/**
* 云之家接口类
* @class
* @name CloudHome.API
*/
define('CloudHome.API', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var Fn = require('Fn');
 
    var mapper = new Mapper();


    /**
    * API 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function API(name, config) {

        Mapper.setGuid(this); //设置 guid, 提高 mapper 查找效率。

        name = name || '';
        config = Config.clone(module.id, config);


        var emitter = new Emitter(this);
        var delay = config.delay;

        var meta = {
            'name': name,
            'field': config.field,
            'status': '',
            'args': [],
            'emitter': emitter,

            fireEvent: function (status, args, emitter) {

                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;

                Fn.delay(delay, function () {

                    //触发具体 code 对应的事件
                    if (status == 'fail') {
                        emitter.fire('code', args[0], args);
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
        ]);

        this.on(events);
    }



    //实例方法
    API.prototype = /**@lends CloudHome.API#*/ {
        constructor: API,

        /**
        * 发起云之家 native 调用请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] 请求的数据对象。
        *   该数据会给序列化成查询字符串以拼接到 url 中。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        * @example
            var api = new API('test');
            api.get({ name: 'micty' });
        */
        invoke: function (data) {

            var meta = mapper.get(this);
            var name = meta.name;
            var field = meta.field;

            var CloudHome = require('CloudHome');

            CloudHome.invoke(name, data, function (json) {

                //云之家返回的 success 字段竟然是字符串的 'true' 或 'false'
                var isSuccess = String(json[field.success]).toLowerCase() == 'true';

                if (isSuccess) {
                    var data = json[field.data] || {};
                    meta.fireEvent('success', [data, json]);
                    return;
                }


                var code = json[field.code];
                var msg = json[field.msg];

                meta.fireEvent('fail', [code, msg, json]);

            });

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


