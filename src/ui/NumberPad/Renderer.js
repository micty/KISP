
/**
*
*/
define('NumberPad/Renderer', function (require, module, exports) {


    var $ = require('jquery-plugin/touch');
    var Style = require('Style');
    var RandomId = require('RandomId');


    function render(meta, self) {

        var sample = meta.sample;
        var prefix = meta.prefix;
        var suffix = meta.suffix;

        var id = RandomId.get(prefix, suffix);
        var textId = RandomId.get('text-', suffix);
        var valueId = RandomId.get('value-', suffix);
        var headerId = RandomId.get('ul-header-', suffix);
        var footerId = RandomId.get('ul-footer-', suffix);

        var text = meta.text;


        var html = $.String.format(sample, {
            'id': id,

            'header-id': headerId,
            'text-id': textId,
            'value-id': valueId,
            'footer-id': footerId,

            'style': Style.stringify(meta.style),
            'cssClass': meta.cssClass,

            'text': text,
            'has-text': text ? 'has-text' : '',
            'no-point': meta.decimal > 0 ? '' : 'no-point',
            'value': meta.value,
        });

        var container = meta.container;

        if (meta.append) {
            $(container).append(html);
        }
        else {
            $(container).prepend(html);

        }

        var div = document.getElementById(id);


        $.Object.extend(meta, {
            'div': div,
            'textId': textId,
            'valueId': valueId,
            'headerId': headerId,
            'footerId': footerId,
        });


        var $div = $(div);
        var height = $div.height();
        meta.height = height;

        $div.css('bottom', -height);


        var Mask = require('Mask');
        var mask = Mask.filter(meta.mask);
        
        if (mask) { //指定了启用 mask 层
            meta.masker = new Mask(mask);
        }
       

        bindEvents(meta, self);
        

        return div;

    }





    function bindEvents(meta, self) {

        var div = meta.div;
        var emitter = meta.emitter;

        var txt = document.getElementById(meta.valueId);


        if (meta.volatile) {
            meta.masker.on('click', function () {
                self.hide();
            });
        }

        function set(value) {

            meta.oldValue = meta.value;
            meta.value = txt.innerHTML = value;
        }



        $(div).touch({

            '[data-cmd="done"]': function () {
                self.hide();
                emitter.fire('done', [meta.value]);
            },


            '[data-cmd="back"]': function () {

                var value = meta.value;
                value = value.slice(0, -1);

                set(value);
                emitter.fire('back', [meta.value, meta.oldValue]);
            },


            '[data-key]': function () {

                var span = this;
                var key = span.getAttribute('data-key');
                var value = meta.value;

                emitter.fire('key', key, [meta.value]);
                emitter.fire('key', [key, meta.value]);


                var hasPoint = value.indexOf('.') >= 0;

                if (key == '.') {
                    if (hasPoint) {
                        return;
                    }

                    if (!value) {
                        value = '0';
                    }
                }


                value = value + key;

                var parts = value.split('.');

                if (parts[0].length > meta.int) { //整数位超过长度限制
                    emitter.fire('overflow', 'int', [meta.value]);
                    emitter.fire('overflow', [meta.value]);
                    return;
                }


                if (hasPoint && parts[1].length > meta.decimal) { //小数位超过长度限制
                    emitter.fire('overflow', 'decimal', [meta.value]);
                    emitter.fire('overflow', [meta.value]);
                    return;
                }


                set(value);


            },

        }, 'pressed');
    }



    return {

        render: render,
    };

});

