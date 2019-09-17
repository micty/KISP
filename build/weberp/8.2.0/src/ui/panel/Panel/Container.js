/**
*/
define('Panel/Container', function (require, module, exports) {
    var $String = require('String');
    var Defaults = require('Defaults');


    return {
        /**
        * 获取容器对应的选择器。
        */
        get: function (id, defaults) {

            //如 `[data-panel="/Users/Main"]`。
            var container = $String.format(defaults.container, {
                'id': id,
            });

            return container;
        },

        /**
        * 设置新的容器。
        */
        set: function (meta, value) {
            //在 jQuery 3.x 版本，meta.$.selector 为 undefined。
            value = value || meta.$.selector;

            //空值，并且确定它是来源于 Panel.define() 创建的。
            //此时可以用回 meta.container，它为 `[data-panel="xx"]` 格式。
            if (!value && meta.module) {
                value = meta.container;
            }

            if (!value) {
                throw new Error(`设置 container 时，请给参数 value 提供一个有效的值。`);
            }

            meta.container = value;

            //先解除绑定旧容器的事件。
            meta.$.off();

            //构造新的容器。
            meta.$ = meta.this.$ = $(meta.container);

            //同时更新导出对象的 $ 字段。
            if (meta.panel) {
                meta.panel.$ = meta.$;
            }



            //更新容器后，可能会产生两份完全一样的节点。
            //其中有一份完全是作废的，它们不在 DOM 树中。
            //这里检测并清理不在 DOM 树中的孤立节点。
            //重写 jQuery 中的 find 方法。
            var find = meta.$.find.bind(meta.$);

            meta.$.find = function (...args) {
                var $items = find(...args);

                $items.each(function (index) {
                    var el = this;

                    if (!document.documentElement.contains(el)) {
                        el.parentNode.removeChild(el);
                    }

                });

                //重新获取一次。
                $items = find(...args);

                return $items;
            };


        },

    };
});

