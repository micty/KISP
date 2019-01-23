
define('Navigator/Meta', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var $Date = require('Date');

    var id$existed = {}; //根据 id 记录对应的实例是否已创建。 同一个 id 共用同一个 storage 空间。




    return {
        create: function (config, others) {
            var id = config.id;

            if (!id) {
                throw new Error(`创建 ${module.parent.id} 实例时，必须指定 id 字段。`);
            }

            if (id$existed[id]) {
                throw new Error(`${module.parent.id} 已存在 id 为 ${id} 的实例。`);
            }

            id$existed[id] = true;



            var storage = others.storage;
            var hash$info = storage ? storage.get('hash$info') || {} : {};



            var meta = {
                'id': id,                   //实例 id，由业务层传入，确保唯一。
                'hash': '',                 //当前的 hash 值。
                'fireEvent': true,          //指示某一次(时刻)是否需要触发事件。
                'rendered': false,          //记录是否调用过 render()。 
                'enabled': config.enabled,  //是否启用。

                'hash$info': hash$info,     //hash 对应的视图信息。
                'infos': [],                //视图信息列表，按时间升排序。
                
                'storage': null,            //持久存储实例。
                'emitter': null,            //事件驱动器。

                //hash 与 view 映射转换关系。 
                //默认不进行转换，即 hash 与 view 相同。
                //例如，若要在地址栏 hash 中显示的是 `/user-list.html`，
                //对应的视图却是 `UserList`，则要提供自定义的映射关系。
                'router': null,

                'this': null,               //当前实例，方便内部使用。

            };



            Object.assign(meta, others);

            return meta;

        },
    };
});