
/**
* 
*/
define('Scroller/Pulldown/Loading', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var Loading = require('Loading');



   

    return {
        /**
        * ����һ������ָʾ����
        *   options = {
        *       container: Element,     //Scroller �����ڵ㡣
        *       text: '',               //Ҫ��ʾ���ı����� `������...`��
        *       top: 10,                //��ʽ `top` ֵ��
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


