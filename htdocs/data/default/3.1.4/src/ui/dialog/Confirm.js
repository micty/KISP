/**
* 简单的 confirm 虚拟对话框。
* @namespace
* @name Confirm
*/
define('Confirm', function (require, module, exports) {

    var dialog = null;

    function create() {

        if (dialog) {
            return dialog;
        }

        var Dialog = require('Dialog');

        dialog = new Dialog({
            autoClose: true,
            height: 140,
            'z-index': 99999,
            buttons: [
                { text: '取消', },
                { text: '确定', name: 'ok', color: 'red', },
            ],
        });

        dialog.on('button', 'ok', function () {
            var fn = dialog.data('fn');
            fn && fn();
        });

        return dialog;
    }


    function show(text, fn) {

        dialog = create();

        //有闭包的作用影响，这里要把回调函数 fn 保存起来
        dialog.data('fn', fn);
        dialog.set('text', text);
        dialog.show();

    }


    return {
        show: show,
    };



});