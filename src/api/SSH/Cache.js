
/**
* SSH 的 Cache 缓存类
* @class
* @name API
*/
define('SSH/Cache', function (require, module, exports) {

    var MiniQuery = require('MiniQuery');
    var Storage = MiniQuery.require('LocalStorage');

    var key = '__ServerUrl__';
    var all = Storage.get(key) || {};


    function get(eid) {
        return all[eid];
    }

    function set(eid, data) {
        all[eid] = data;
        Storage.set(key, all);
    }

    function remove(eid) {

        if (eid) { //指定了 eid, 则移除该项
            if (eid in all) {
                delete all[eid];
                Storage.set(key, all);
            }
        }
        else { //否则全部移除
            all = {};
            Storage.set(key, all);
        }
    }

    return {
        get: get,
        set: set,
        remove: remove
    };


});


