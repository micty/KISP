
/**
*
*/
define('Dialog/Renderer', function (require, module, exports) {

    var $ = require('$');
    var Style = require('Style');
    

    function getStyle(item) {

        if (!item) {
            return '';
        }

        var style = Style.filter(item, [
            'border-bottom',
            'color',
            'font-size',
            'font-weight',
            'width',
        ]);

        style = Style.stringify(style);
        return style;
    }

    //去掉多余的换行和空格
    function trim(s) {
        return s.replace(/\n|\r|\r\n/g, ' ')
        .replace(/\s+/g, ' ');
    }

    function getSamples(sample) {

        var samples = $.String.getTemplates(sample, [
            {
                name: 'div',
                begin: '#--div.begin--#',
                end: '#--div.end--#',
                fn: trim,
            },
            {
                name: 'button',
                begin: '#--button.begin--#',
                end: '#--button.end--#',
                outer: '{buttons}',
                fn: trim,
            },
        ]);

        return samples;
    }


    function render(meta, dialog) {

        var buttons = meta.buttons || [];
        var emitter = meta.emitter;
        var id = meta.id;
        var textId = meta.textId;
        var footerId = meta.footerId;
        var style = meta.style;

        var samples = getSamples(meta.sample);


        var height = parseInt(style.height);
        var textHeight = height - 44 * 2 - 2;
        var title = meta.title;

        //标准化成一个 object
        if (title && typeof title != 'object') {
            title = { 'text': title || '', };
        }

        var html = $.String.format(samples['div'], {
            'id': id,
            'text-id': textId,
            'footer-id': footerId,

            'cssClass': meta.cssClass,
            'style': Style.stringify(style),

            'title': title ? title.text : '',
            'text': meta.text,
            'no-header': title ? '' : 'no-header', //针对无标题时
            'header-style': getStyle(title),

            'buttons-count': buttons.length,
            'text-height': textHeight,

            'buttons': $.Array.keep(buttons, function (item, index) {

                if (typeof item == 'string') {
                    buttons[index] = item = {
                        'text': item,
                    };
                }

                return $.String.format(samples['button'], {
                    'index': index,
                    'text': item.text,
                    'style': getStyle(item),
                });

            }).join(''),
        });

        $(document.body).prepend(html);

        //指定了可滚动
        if (meta.scrollable) {
            var Scroller = require('Scroller');
            var scroller = meta.scroller = new Scroller('#' + textId);
        }

        //底部按钮组
        var footer = $('#' + footerId);
        if (!footer.hasClass('buttons-0')) { //有按钮时才绑定

            footer.on('click', '[data-index]', function (event) {
                var button = this;
                var index = +button.getAttribute('data-index');
                var item = buttons[index];
                var name = item.name || String(index);
                var eventName = meta.eventName;

                emitter.fire(eventName, 'button', name, [item, index]);
                emitter.fire(eventName, 'button', [item, index]);

                // item.autoClosed 优先级高于 meta.autoClosed
                var autoClosed = item.autoClosed;
                if (autoClosed === undefined) {
                    autoClosed = meta.autoClosed;
                }

                if (autoClosed) {
                    dialog.hide();
                }

            });
        }
        

        var div = document.getElementById(id);
        return div;

    }


    return {

        render: render,
    };

});

