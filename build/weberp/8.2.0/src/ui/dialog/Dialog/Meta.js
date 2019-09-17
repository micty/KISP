
define('Dialog/Meta', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var RandomId = require('RandomId');

    var prefix = 'KISP-Dialog-';    //用于生成组件 id 的前缀部分。
    var suffix = 4;                 //用于生成组件 id 的随机部分的长度。



    return {
        create: function (config, others) {
            var id = RandomId.get(prefix, suffix);
            var buttons = config.buttons || [];


            buttons = buttons.map(function (item) {
                return item == 'string' ? { 'text': item, } : item;
            });

            var meta = {
                'id': id,
                'headerId': RandomId.get(prefix, 'header-', suffix),
                'articleId': RandomId.get(prefix, 'article-', suffix),
                'contentId': RandomId.get(prefix, 'content-', suffix),
                'footerId': RandomId.get(prefix, 'footer-', suffix),

                'scrollable': config.scrollable,
                'scrollerConfig': config.scroller,
                'eventName': config.eventName,
                'title': config.title,
                'content': config.content,
                'buttons': buttons,
                'z-index': config['z-index'],       //生成透明层时要用到。
                'width': config.width,              //宽度。
                'height': config.height,            //高度。
                'autoClose': config.autoClose,      //点击任何一个按钮后是否自动关闭组件
                'volatile': config.volatile,        //是否易消失。 即点击对话框外的 masker 时自动关闭对话框。
                'cssClass': config.cssClass || '',  //
                'container': config.container,      //
        
                'pressedClass': 'Pressed',  //底部按钮按下去时的样式类名。
                'visible': false,           //记录当前组件是否已显示
                'style': {},                //样式对象。
                'data': {},                 //供 this.data() 方法使用

                'scroller': null,           //针对移动端的滚动器。
                'masker': null,             //Mask 的实例，重复使用。
                'emitter': null,            //事件驱动器。
                'this': null,               //当前实例，方便内部使用。
                '$': null,                  //组件最外层的 DOM 节点的 jQuery 实例。
                '$header': null,            //$(headerId)。
                '$content': null,           //$(contentId)。
                '$footer': null,            //$(footerId)。
            };



            Object.assign(meta, others);


            return meta;


        },
    };
});