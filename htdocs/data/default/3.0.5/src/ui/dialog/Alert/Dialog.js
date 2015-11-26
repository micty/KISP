
define('Alert/Dialog', function (require, module, exports) {

    var $ = require('$');

    var dialog = null;
    var visible = false;
    var list = [];


    //创建对话框
    function create() {

        var Config = require('Config');
        config = Config.clone('Alert');

        var Dialog = require('Dialog');
        var dialog = new Dialog({
            'cssClass': 'Alert',
            'volatile': config.volatile,
            'mask': config.mask,
            'autoClosed': config.autoClosed,
            'width': config.width,
            'z-index': config['z-index'],
            'buttons': [
               {
                   name: 'ok',
                   text: config.button,
               },
            ],
        });


        dialog.on('button', 'ok', function () {
            var fn = dialog.data('fn');
            fn && fn();
        });


        dialog.on({
            'show': function () {
                visible = true;
            },

            'hide': function () {
                visible = false;
                var obj = list.shift();
                if (obj) {
                    render(obj.text, obj.fn);
                }
            },
        });

        //响应回车键
        $(document).on('keyup', function (event) {
            if (event.keyCode == 13) { //
                dialog.hide();

                var fn = dialog.data('fn');
                fn && fn();
            }
        });

        return dialog;

    }


    

    //根据文本来计算高度，大概值，并不要求很准确
    function getHeight(text) {

        text = String(text);
        var len = $.String.getByteLength(text);
        var h = Math.max(len, 125);
        var max = document.documentElement.clientHeight;

        if (h >= max * 0.8) {
            h = '80%';
        }

        return h;
    }


    function render(text, fn) {

        var height = getHeight(text);

        dialog = dialog || create();
       
        dialog.data('fn', fn);
        dialog.set('text', text);
        dialog.set('height', height);

        dialog.show();

    }


    function add(text, fn) {

        //首次显示，或之前显示的已经给隐藏了，立即显示出来。
        if (!visible) {
            render(text, fn);
            return;
        }

        //已经是显示的，加到队列里进行排队。
        list.push({
            'text': text,
            'fn': fn,
        });
    }


    //add(0, function () { });
    //add(1, function () { });
    //add(2, function () { });


    return {
        add: add,
    };

});

