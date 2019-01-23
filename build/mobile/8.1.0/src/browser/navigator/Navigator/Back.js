
define('Navigator/Back', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');



    return {
        /**
        * 获取指定目标视图相当于当前视图的偏移量。
        */
        getOffset: function (meta, target) {
            if (!target) {
                return -1;
            }


            var type = typeof target;

            if (type == 'number') {
                if (target < 0) {
                    throw new Error(`要回退的步数(参数 target) 如果指定为数字时，只能是正数。`);
                }

                return 0 - (target || 1); //确保为负数。
            }

            //此时，把 target 当作一个 string，即目标视图名称。

            if (type != 'string') {
                throw new Error(`要回退的目标视图(参数 target) 只能是 number 或 string 类型。`);
            }


            var info = meta.hash$info[meta.hash]; //当前视图对应的信息。

            if (!info) {
                throw new Error(`当前视图为空，无法回退。`);
            }


            var list = meta.this.get();
            var current = info.view;
            var targetIndex = -1;
            var currentIndex = -1;

            list.forEach(function (info, index) {
                var view = info.view;

                if (view == target) {
                    targetIndex = index;
                }

                if (view == current) {
                    currentIndex = index;
                }
            });


            if (targetIndex < 0) {
                throw new Error(`历史记录中不存在名为 ${target} 的目标视图。`);
            }


            var offset = targetIndex - currentIndex;

            if (offset == 0) {
                throw new Error(`要回退到的目标视图 ${target} 即为当前视图。`);
            }

            if (offset > 0) {
                throw new Error(`要回退到的目标视图 ${target} 在当前视图的后面，应该用前进。`);
            }


            return offset;



        },
    };
});