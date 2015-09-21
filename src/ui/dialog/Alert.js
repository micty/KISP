/**
* alert 对话框
* @namespace
* @name Alert
* @private
*/
define('Alert', function (require, module, exports) {

    var $ = require('$');


    //根据文本来计算高度，大概值，并不要求很准确
    function getHeight(text) {

        var len = $.String.getByteLength(text);
        var h = Math.max(len, 125);
        var max = document.documentElement.clientHeight;

        if (h >= max * 0.8) {
            h = '80%';
        }

        return h;
    }




    /**
    * 创建一个 alert 对话框。
    */
    function create(text, text1, textN, fn) {

        //重载 alert(obj); 以方便程序员调试查看 json 对象。
        if (typeof text == 'object') {
            var Sample = require(module, 'Sample');

            text = $.String.format(Sample, {
                'text': JSON.stringify(text, null, 4),
            });
        }


        var args = [].slice.call(arguments, 1);

        //在参数列表中找到的第一个函数当作是回调函数，并忽略后面的参数。
        var index = $.Array.findIndex(args, function (item, index) {
            return typeof item == 'function';
        });

        if (index >= 0) { //找到回调函数
            fn = args[index];
            args = args.slice(0, index); //回调函数前面的都当作是要显示的文本
        }
        else {
            fn = null;
        }

        args = [text].concat(args);
        text = $.String.format.apply(null, args);



        var Dialog = require('Dialog');

        var dialog = new Dialog({
            'text': text,
            'buttons': [{ text: '确定', fn: fn, }],
            'volatile': false,
            'mask': true,
            'autoClosed': true,
            'width': '80%',
            'z-index': 99999,
            'cssClass': 'Alert',
            'height': getHeight(text),
        });

        return dialog;

    }



    return {
        create: create,
    };

});

