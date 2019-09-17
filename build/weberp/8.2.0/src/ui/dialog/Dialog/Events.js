
/**
*
*/
define('Dialog/Events', function (require, module, exports) {
    var Template = require('Template');
    var $Array = require('Array');
    var $String = require('String');

  




    return {
        bind: function (meta) {
        

            //监控 masker 层的隐藏。
            if (meta.masker && meta.volatile) {
                meta.masker.on({
                    'show': function () {

                    },
                    'hide': function () {
                        meta.this.hide();
                    },
                });
            }


            //底部按钮。
            (function () {
                if (!meta.buttons.length) {
                    return;
                }

                var $footer = meta.$footer;
                var eventName = meta.eventName;
                var selector = 'button[data-index]';
                var pressed = meta.pressedClass;

                //移动端。
                if (eventName == 'touch') {
                    $footer.touch(selector, handler, pressed);
                    return;
                }

                //PC 端。
                $footer.on(eventName, selector, handler); //如 on('click', selector);

                $footer.on('mousedown', selector, function (event) {
                    $(this).addClass(pressed);
                });

                $footer.on('mouseup mouseout', selector, function (event) {
                    $(this).removeClass(pressed);
                });
              

                //内部共用的处理器。
                function handler(event) {
                    var button = this;
                    var index = +button.getAttribute('data-index');
                    var item = meta.buttons[index];
                    var cmd = item.cmd || String(index);
                    var fn = item.fn;

                    fn && fn(item, index);

                    meta.emitter.fire('button', cmd, [item, index]);
                    meta.emitter.fire('button', [item, index]);


                    // item.autoClose 优先级高于 meta.autoClose。
                    var autoClose = item.autoClose;

                    if (autoClose === undefined) {
                        autoClose = meta.autoClose;
                    }

                    if (autoClose) {
                        meta.this.hide();
                    }
                }

            })();

           

            
        },
    };

});

