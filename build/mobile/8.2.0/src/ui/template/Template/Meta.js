
/**
* 
*/
define('Template/Meta', function (require, module, exports) {
    var $String = require('String');
    var $Object = require('Object');
    var RandomId = require('RandomId');


    var prefix = 'KISP-Template-';   //用于生成组件 id 的前缀部分。
    var suffix = 4;                 //用于生成组件 id 的随机部分的长度。



    //默认的处理函数。
    function process(data) {
        return data;
    }


    return {

        /**
        *
        */
        create: function (others) {
            var id = RandomId.get(prefix, suffix);

            var meta = {
                'id': id,               //
                'sample': '',           //
                'name': '',             //
                'placeholder': '',      //
                'innerHTML': '',        //
                'outerHTML': '',        //

                'tpls': [],             //下级实例列表。
                'name$tpl': {},         //命名的下级实例映射，方便按名称读取。

                'node': null,           //DOM 节点。
                'parent': null,         //父实例。
                'emitter': null,        //
                'this': null,           //

                'process': process,     //默认的处理函数。
            };


            Object.assign(meta, others);

            return meta;

        },

        /**
        *
        */
        assign: function (meta, item) {
            Object.assign(meta, {
                'sample': item.sample,
                'name': item.name,
                'placeholder': item.placeholder,
                'innerHTML': item.innerHTML,
                'outerHTML': item.outerHTML,
                'node': item.node,
            });
        },

    };


});

