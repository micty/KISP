/**
* 本地存储工具类
* @class
* @name LocalStorage
*/
define('LocalStorage', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Storage = MiniQuery.require('LocalStorage');
    var Mapper = MiniQuery.require('Mapper');

    var Config = require('Config');

    var mapper = new Mapper();
    var skey = 'KISP.LocalStorage.B81138B047FC';
    var all = Storage.get(skey) || {}; //针对全部应用的



    function LocalStorage(id, config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var name = config.name;
        if (!name) {
            throw new Error('请先配置 name 字段');
        }

        var app = all[name];

        if (!app) { //针对该应用的首次分配
            app = all[name] = {};
        }

        var meta = {
            'id': id,
            'data': app[id],
            'app': app,
        };

        mapper.set(this, meta);

    }



    LocalStorage.prototype = {
        constructor: LocalStorage,

        /**
        * 设置一对键值。
        * 已重载 set(obj) 批量设置的情况。
        * @param {string} key 要进行设置的键名称。
        * @param value 要进行设置的值，可以是任何类型。
        */
        set: function (key, value) {

            var meta = mapper.get(this);
            var data = meta.data;
            var app = meta.app;
            var id = meta.id;

            //针对该实例的首次分配，或者因为调用了 clear() 而给清空了
            if (!data) {
                data = app[id] = meta.data = {};
            }

            if (typeof key == 'object') { //重载 set({...}); 批量设置的情况
                $.Object.extend(data, key);
            }
            else { //单个设置
                data[key] = value;
            }

            Storage.set(skey, all); //保存全部

        },

        /**
        * 根据给定的键获取关联的值。
        * 已重载 get() 获取全部的情况。
        * @param {string} [key] 要进行获取的键名称。
        * @return 返回该键所关联的值。
        */
        get: function (key) {
            var meta = mapper.get(this);
            var data = meta.data;

            if (!data) {
                return;
            }

            //重载 get(); 获取全部的情况
            if (arguments.length == 0) {
                return data;
            }

            return data[key];
        },

        /**
        * 移除给定的键所关联的项。
        * @param {string} key 要进行移除的键名称。
        */
        remove: function (key) {

            var meta = mapper.get(this);
            var data = meta.data;

            if (!data) {
                return;
            }

            delete data[key];

            Storage.set(skey, all); //保存全部

        },

        /**
        * 清空所有项。
        */
        clear: function () {
            var meta = mapper.get(this);
            var id = meta.id;
            var app = meta.app;

            delete app[id];
            meta.data = null;

            Storage.set(skey, all); //保存全部
        },

        /**
        * 对每一项进行迭代，并调用传入的回调函数。
        * @param {function} fn 迭代调用的回调函数。
            该函数会接收到两个参数: 
            key: 当前键的名称。
            value: 当前键所关联的值。
        */
        each: function (fn) {

            var meta = mapper.get(this);
            var data = meta.data;

            if (!data || !fn) {
                return;
            }

            for (var key in data) {
                fn(key, data[key]);
            }
        },

        /**
        * 获取所有的项的总个数。
        */
        length: function () {
            return this.keys().length;
        },

        /**
        * 获取所有的项的键数组。
        */
        keys: function () {

            var meta = mapper.get(this);
            var data = meta.data;

            if (!data) {
                return [];
            }

            if (typeof Object.keys == 'function') {
                return Object.keys(data);
            }

            var a = [];
            for (var key in data) {
                a.push(key);
            }

            return a;
        },

        /**
        * 获取所有的项的键数组指定中的项。
        * @param {number} index 键所对应的索引值。
        */
        key: function key(index) {
            return this.keys()[index];
        },

        /**
        * 获取所有的项的总个数。
        */
        length: function () {
            return this.keys().length;
        },

    };


    return LocalStorage;




});





