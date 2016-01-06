
/**
* 针对有继承关系的类提供同一个的 mapper 实例容器。
* @namespace
* @name Mapper
*/
define('Mapper', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');

    var mapper = new Mapper();



    return /**@lends Mapper*/ {

        /**
        * 获取指定键所关联的值。
        * @param key 要获取的值所关联的键，可以是任何类型。
        * @return 返回该键所关联的值。
        */
        get: function (key) {
            return mapper.get(key);
        },


        /**
        * 设置一对键和值。
        * @param key 要设置的键，可以是任何类型。
        * @param key 要设置的值，可以是任何类型。
        */
        set: function (key, value) {
            mapper.set(key, value);
        },


        /**
        * 给指定对象设置 Mapper 所使用的 GUID 属性。
        * @param {Object} obj 要设置的对象。
        * @param {Object} module 模块对象。
        */
        setGuid: function (obj, module) {
            var id = module.id;
            id = id + '-' + $.String.random();
            Mapper.setGuid(obj, id);
        },

        /**
        * 根据给定的键移除一对映射关系。
        * 注意：根据映射关系的键查找所关联的值时，对键使用的是全等比较，即区分数据类型。
        * @param key 映射关系的键，可以是任何类型。
        */
        remove: function (key) {
            mapper.remove(key);
        },

    };


});

