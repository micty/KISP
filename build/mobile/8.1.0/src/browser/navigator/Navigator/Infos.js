
define('Navigator/Infos', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var $Date = require('Date');



    //把视图信息按时间先后进行升排序。
    function sort(hash$info) {

        var list = Object.keys(hash$info).map(function (hash) {
            return hash$info[hash];
        });


        list = list.sort(function (a, b) {
            return a.timestamp > b.timestamp ? 1 : -1;
        });

        return list;

    }



    return {
        /**
        * 设置视图信息。
        * 会把该视图信息的时间戳更新成最新的。
        */
        set: function (meta, view, args) {
            var hash = meta.router.toHash(view);
            var hash$info = meta.hash$info;
            var storage = meta.storage;

            var now = new Date();
            var datetime = $Date.stringify(now);
            var timestamp = now.getTime();

            var info = hash$info[hash] = {
                'view': view,           //视图名称。
                'hash': hash,           //视图对应的 hash 串。
                'datetime': datetime,   //此字段仅为了方便调试和查看。
                'timestamp': timestamp, //时间戳数值。
                'args': args || [],     //渲染视图对应的参数列表。
                //'cache': false,       //这个值会给动态写入，并且很快删除。　这里只是占位，方便阅读。 请不要在此加入该字段。
            };

            //重新排序。
            meta.infos = sort(hash$info);


            if (storage) {
                storage.set('hash$info', hash$info);
            }


            return info;

        },

        /**
        * 获取视图信息。
        * 已重载 get();        //获取全部视图信息，返回一个数组，按时间升序排序。
        * 已重载 get(offset);  //获取指定偏移位置的目标视图信息，返回一个对象。
        * 已重载 get(view);    //获取指定视图名称的目标视图信息，返回一个对象。
        * 参数：
        *   view: '',   //目标视图名称。
        *   offset: 0,  //当前视图的偏移量为 0，比当前视图时间更早的，则为负数；否则为正数。
        */
        get: function (meta, view) {
            var hash$info = meta.hash$info;

            //此时为 get(view); 
            //获取指定视图名称的目标视图信息，返回一个对象。
            if (typeof view == 'string') {
                var hash = meta.router.toHash(view);

                return hash$info[hash];
            }


            var offset = view;
            var list = meta.infos;

            //此时为 get();
            ///获取全部视图信息，返回一个数组，按时间升序排序。
            if (typeof offset != 'number') {
                return list;
            }


            //此时为 get(offset);
            //获取指定偏移位置的目标视图信息，返回一个对象。

            //当前 hash 对应的视图信息。
            var current = hash$info[meta.hash];         

            //当前视图信息所在的位置。
            var index = list.findIndex(function (info) {
                return info === current;
            });


            //要获取的目标视图信息。
            var target = list[index + offset];

            return target;

        },

    };
});