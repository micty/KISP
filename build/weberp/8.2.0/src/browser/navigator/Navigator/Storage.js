
define('Navigator/Storage', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');





    return {
        /**
        * 根据配置创建一个 storage 实例。
        *
        *   options = {
        *       storage: 'session',     //存储的类型，只能是 'session' 或 'local'，否则将不会提供存储功能。
        *       id: '',                 //Navigator 实例的 id。 用于区分不同实例对应的存储空间。
        *   };
        */
        create: function (options) {
            var storage = options.storage;
            var id = options.id;

            if (!storage) {
                return null;
            }



            storage = storage.toLowerCase();


            //为了方便自动化工具分析模块的依赖关系，
            //必须在 require 里使用完整的、常量的模块名称，
            //而不能使用变量或动态拼接出来的名称，如 'Session' + 'Storage'。
            var Storage =
                storage == 'session' ? require('SessionStorage') :
                storage == 'local' ? require('LocalStorage') : null;

            if (!Storage) {
                throw new Error(`${module.id} 不支持 Storage 类型: ${storage}，请指定为 'session' 或 'local'。 `);
            }


            storage = new Storage(id);

            return storage;
        },
    };
});