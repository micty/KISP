
define('Navigator/Meta', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var $Date = require('Date');

    var id$existed = {}; //根据 id 记录对应的实例是否已创建。


    function createStorage(type, id) {
        if (!type) {
            return null;
        }

        type = type.toLowerCase();


        //为了方便自动化工具分析模块的依赖关系，必须在 require 里使用完速的常量的模块名称，
        //而不能使用变量或动态拼接出来的名称，如 'Session' + 'Storage'。
        var Storage =
            type == 'session' ? require('SessionStorage') :
            type == 'local' ? require('LocalStorage') : null;

        if (!Storage) {
            throw new Error(`不支持的 Storage 类型: ${type}`);
        }

        return new Storage(id);

    }



    return {
        create: function (config, others) {
            var id = config.id;

            if (!id) {
                throw new Error(`创建 ${module.parent.id} 实例时，必须指定 id 字段。`);
            }

            if (id$existed[id]) {
                throw new Error(`已存在 id 为 ${id} 的实例。`);
            }

            id$existed[id] = true;


            var storage = createStorage(config.storage, id);
            var hash$info = storage ? storage.get('hash$info') || {} : {};

            var meta = {
                'id': id,                   //实例 id，由业务层传入，确保唯一。
                'hash': '',                 //当前的 hash 值。
                'fireEvent': true,          //指示某一次(时刻)是否需要触发事件。
                'rendered': false,          //记录是否调用过 render()。 
                'enabled': config.enabled,  //是否启用。

                'storage': storage,         //持久存储实例。
                'hash$info': hash$info,     //hash 对应的视图信息。
                
                'emitter': null,            //事件驱动器。
                'this': null,               //当前实例，方便内部使用。



                //hash 与 view 映射转换关系。 
                //默认不进行转换，即 hash 与 view 相同。
                //例如，若要在地址栏 hash 中显示的是 `/user-list.html`，
                //对应的视图却是 `UserList`，则要提供自定义的映射关系。
                'router': null,

                //设置视图信息。
                'setInfo': function (view, args) {
                    var hash = meta.router.toHash(view);
                    var now = new Date();
                    var datetime = $Date.stringify(now);
                    var timestamp = now.getTime();

                    var info = meta.hash$info[hash] = { //不要用外面的那个本函数外的那个 hash$info，因为它有可能改引用了。
                        'view': view,
                        'hash': hash,
                        'datetime': datetime,   //此字段仅为了方便调试和查看。
                        'timestamp': timestamp,
                        'args': args || [],
                        //'cache': false, //这个值会给动态写入，并且很快删除。　这里只是占位，方便阅读。 请不要在此加入该字段。
                    };

                    if (storage) {
                        storage.set('hash$info', meta.hash$info);
                    }

                    return info;
                },

            


            };

            Object.assign(meta, others);

            return meta;

        },
    };
});