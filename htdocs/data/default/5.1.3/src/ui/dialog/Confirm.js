/**
* 简单的 confirm 弹出层对话框。
* @namespace
* @name Confirm
*/
define('Confirm', function (require, module, exports) {

    var dialog = null;

    function create() {

        if (dialog) {
            return dialog;
        }

        var Config = require('Config');
        var Dialog = require('Dialog');

        var config = Config.clone(module.id);

        dialog = new Dialog(config);

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