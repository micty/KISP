
define('Alert/Dialog', function (require, module, exports) {
    var $String = require('String');
    var Defaults = require('Defaults');
    var Height = module.require('Height');

    var dialog = null;
    var visible = false;
    var list = [];
    var activeElement = null;   //上次获得焦点的元素。
    var showFrom = 13;          //记录一下是否由于按下回车键导致的显示。


    //创建对话框。
    function create() {
        var Dialog = require('Dialog');
        var config = Defaults.clone(module.parent.id);

        var dialog = new Dialog({
            'cssClass': 'Alert',
            'volatile': config.volatile,
            'mask': config.mask,
            'autoClose': config.autoClose,
            'width': config.width,
            'z-index': config['z-index'],
            'buttons': config.buttons,
            'scrollable': config.scrollable,
        });



        dialog.on('button', {
            'ok': function () {
                var fn = dialog.data('fn');
                fn && fn();
            },
        });


        dialog.on({
            'show': function () {
                visible = true;

                showFrom = showFrom == 13 ? 'enter' : '';
                activeElement = document.activeElement;
                activeElement.blur();
            },

            'hide': function () {
                visible = false;

                var item = list.shift();

                if (item) {
                    render(item.text, item.fn);
                }

                activeElement = null;
                showFrom = '';
            },
        });

        //响应回车键。
        $(document).on({
            'keydown': function (event) {
                showFrom = event.keyCode;
            },

            'keyup': function (event) {
                var invalid =
                        event.keyCode != 13 ||  //不是回车键。
                        !visible ||             //已是隐藏，避免再次触发。
                        showFrom == 'enter';    //由于之前按下回车键导致的显示。

                if (invalid) {
                    return;
                }

                dialog.hide();

                var fn = dialog.data('fn');
                fn && fn();
            },
        });


        return dialog;

    }





    function render(text, fn) {
        var height = Height.get(text);

        dialog = dialog || create();

        dialog.data('fn', fn);

        dialog.set({
            'content': text,
            'height': height,
        });

        dialog.show();

    }


    



    return {
        /**
        * 把要显示的文本和要执行的回调函数加到队列里，并在特定时机显示出来。
        */
        add: function (text, fn) {
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
        },
    };

});