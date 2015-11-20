/**
* alert 对话框
* @namespace
* @name Alert
* @private
*/
define('Alert', function (require, module, exports) {

    var $ = require('$');
    var Dialog = module.require('Dialog');



    /**
    * 显示一个 alert 对话框。 
    * 支持多次调用，会将多次调用加进队列，在显示完上一次后进行下一次的显示。
    */
    function show(text, text1, textN, fn) {

        //重载 get(obj); 以方便程序员调试查看 json 对象。
        if (typeof text == 'object') {
            var Sample = module.require('Sample');
            text = JSON.stringify(text, null, 4);
            text = $.String.format(Sample, { 'text': text, });
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



        Dialog.add(text, fn);
    }




    return {
        show: show,
    };

});

