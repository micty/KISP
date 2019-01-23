
/**
* 
*/
define('Scroller/Pulldown/Indicator', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var Panel = require('Panel');
    var Sample = module.require('Sample');



   

    return {
        /**
        * 创建一个Panel 实例指示器。
        *   options = {
        *       container: Element,     //Scroller 容器节点。
        *       translateY: -40,        //隐藏在顶部的位置。
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


