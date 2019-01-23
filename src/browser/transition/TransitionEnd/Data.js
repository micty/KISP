
/**
* 自定义数据。
*/
define('TransitionEnd/Data', function (require, module, exports) {

    var view$data = new Map();


    return {

        /**
        * 获取指定视图模块关联的数据。
        * 如果该视图模块尚未存在任何数据，则先创建并分配一个 {} 作为数据容器，并返回它。
        */
        get: function (view) {
            var data = view$data.get(view);

            //尚未存在，则分配一个。
            if (!data) {
                data = {
                    'binded': false,
                    'sid': '',
                    'sid$fn': {},
                };

                view$data.set(view, data);
            }

            return data;

        },

    };


});

