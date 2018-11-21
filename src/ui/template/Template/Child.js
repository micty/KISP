
/**
* 
*/
define('Template/Child', function (require, module, exports) {
    var $String = require('String');
    var $Object = require('Object');


   

    return {

        /**
        * 根据已解析到的数据节点创建一个子级实例，并设置父子关系等。
        */
        create: function (Template, meta, item) {
            var name = item.name;
            var sibling = meta.name$tpl[name]; //兄弟节点。

            //检测同一级下是否已存在同名的模板。
            if (sibling) {
                throw new Error('同一级下已存在名为 `' + name + '` 的模板。');
            }

            var tpl = new Template(item);

            meta.name$tpl[name] = tpl;
            meta.parent = meta.this;    //设置父实例，内部使用的。
            tpl.parent = meta.this;     //设置父实例，外部使用的。

            tpl.on('process', function () {
                var args = Array.from(arguments);
                meta.emitter.fire('process', args);
            });

            return tpl;

        },

      


    };


});

