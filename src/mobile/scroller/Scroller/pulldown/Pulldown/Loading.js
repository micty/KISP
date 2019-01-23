
/**
* 
*/
define('Scroller/Pulldown/Loading', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var Loading = require('Loading');



   

    return {
        /**
        * 创建一个加载指示器。
        *   options = {
        *       container: Element,     //Scroller 容器节点。
        *       text: '',               //要显示的文本，如 `加载中...`。
        *       top: 10,                //样式 `top` 值。
        *   };
        */
        create: function (options) {
            var loading = new Loading({
                'container': options.container,
                'text': options.text,
                'presetting': 'scroller.pulldown',
                'z-index': 9999,

                'style': {
                    'top': options.top,
                },
            });

            return loading;
        },
    };




});


