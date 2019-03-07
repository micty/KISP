
define('Mask/Meta', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var RandomId = require('RandomId');


    var prefix = 'KISP-Mask-';  //用于生成组件 id 的前缀部分。
    var suffix = 4;             //用于生成组件 id 的随机部分的长度。



    return {
        create: function (config, others) {
            var id = RandomId.get(prefix, suffix);
            var eventName = config.eventName;
            var volatile = config.volatile;

            var meta = {
                'id': id,
                'sample': '',
                'eventName': eventName,         //兼容 PC 端和移动端。 PC 端的为 `click`，移动端的为 `touch`。
                'volatile': volatile,           //是否易消失的。 即点击后自动隐藏。
                'container': config.container,  //组件要装入的容器 DOM 节点。
                'duration': config.duration,    //要持续显示的时间，单位是毫秒。

                'emitter': null,    //事件驱动器。
                'style': null,      //样式对象。
                'this': null,       //当前实例，方便内部使用。
                '$': null,          //组件最外层的 DOM 节点的 jQuery 实例。

                'bindVolatile': function (fn) {
                    if (!volatile) {
                        return;
                    }

                    if (eventName == 'touch') {
                        meta.$.touch(fn);
                    }
                    else {
                        meta.$.on(eventName, fn);
                    }
                },
            };



            Object.assign(meta, others);

            return meta;


        },
    };
});