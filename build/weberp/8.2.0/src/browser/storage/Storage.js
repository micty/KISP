
/**
* 底层通用的存储工具。
* 业务层不应该直接使用该模块，请使用 SessionStorage 或 LocalStorage。
* @namespace
* @name Storage
*/
define('Storage', function (require, module, exports) {
    var CircularJSON = require('CircularJSON');

    //type 为 `session` 或 `local`
    var type$exports = {};


    /**
    * 
    */
    return function (type) {
        var exports = type$exports[type];

        //已创建，直接使用。
        if (exports) {
            return exports;
        }



        //----------------------------------------------------------
        //首次创建。
        var name = `${type}Storage`;    //如 `sessionStorage`。
        var storage = window[name];     //发 window.sessionStorage。

        if (!storage) {
            throw new Error(`当前浏览器不支持 ${name} 存储。`);
        }


        var KISP = require('KISP');

        //如 `KISP.mobile.(8.1.0).16A7B9191751AE9B35DAE20DFA209532`。
        var key = `KISP.${KISP.name}.(${KISP.version}).${KISP.md5}`;    
        var json = storage.getItem(key) || '{}';    //全部数据的字符串形式。
        var all = CircularJSON.parse(json) || {};   //全部数据的对象形式。  


        //保存到浏览器层面的存储。
        function save() {
            json = CircularJSON.stringify(all);
            storage.setItem(key, json);
        }


        //导出对象。
        return type$exports[type] = {

            /**
            * 设置一对键值。
            * @param {string} key 要进行设置的键名称。
            * @param value 要进行设置的值，可以是任何类型。
            */
            set: function (key, value) {
                all[key] = value;
                save();
            },

            /**
            * 根据给定的键获取关联的值。
            * @param {string} key 要进行获取的键名称。
            * @return 返回该键所关联的值。
            */
            get: function (key) {
                return all[key];
            },

            /**
            * 移除给定的键所关联的项。
            * @param {string} key 要进行移除的键名称。
            */
            remove: function (key) {
                delete all[key];
                save();
            },

            /**
            * 清空所有项。
            */
            clear: function () {
                all = {};
                save();
            },

        };

    };



});





