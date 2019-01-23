
define('Toast/Meta', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var RandomId = require('RandomId');

    var prefix = 'KISP-Toast-';     //用于生成组件 id 的前缀部分。
    var suffix = 4;                 //用于生成组件 id 的随机部分的长度。



    return {
        create: function (config, others) {
            var id = RandomId.get(prefix, suffix);
            var textId = RandomId.get(prefix, 'text-', suffix);
            var iconId = RandomId.get(prefix, 'icon-', suffix);
            var text = config.text;

            text = typeof text == 'number' ? String(text) : text;
            text = text || '';


            var meta = {
                'id': id,
                'icon': config.icon,
                'text': text,
                'textId': textId,
                'iconId': iconId,
                'cssClass': config.cssClass || '',
                'container': config.container,
                'duration': config.duration || 0,
                'sample': '',
                'style': '',                //样式字符串。

                'masker': null,             // Mask 的实例，重复使用。
                'emitter': null,            //事件驱动器。
                'this': null,               //当前实例，方便内部使用。
                '$': null,                  //组件最外层的 DOM 节点的 jQuery 实例。
                '$icon': null,              //$(iconId)。
                '$text': null,              //$(textId)。

            };



            Object.assign(meta, others);


            return meta;


        },
    };
});