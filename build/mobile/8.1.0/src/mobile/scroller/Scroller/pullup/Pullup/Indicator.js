
/**
* 
*/
define('Scroller/Pullup/Indicator', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var Panel = require('Panel');
    var Sample = module.require('Sample');



   

    return {
        /**
        * 创建一个指示器 Panel 实例。
        *   options = {
        *       container: Element,     //Scroller 容器节点。
        *       translateY: 40,         //隐藏在底部的位置。
        *   };
        */
        create: function (options) {
            var id = $String.random();

            var html = $String.format(Sample, {
                'id': id,
                'translateY': options.translateY,
            });

            $(options.container).append(html);


            var panel = new Panel(`#${id}`);

            return panel;



        },
    };




});


