
/**
*
*/
define('NoData/Renderer', function (require, module, exports) {


    var $ = require('$');
    var Style = require('Style');


    function render(meta, data) {


        var id = meta.id;
        var sample = meta.sample;
        var style = meta.style;

        var text = data.text || meta.text;

        var html = $.String.format(sample, {
            'id': id,
            'text-id': meta.textId,
            'text': text,
            'style': Style.stringify(style),
            'cssClass': meta.cssClass,
        });

        var container = meta.container;

        if (meta.append) {
            $(container).append(html);
        }
        else {
            $(container).prepend(html);

        }


        var div = document.getElementById(id);
        meta.div = div;

        if (meta.scrollable) {

            var Scroller = require('Scroller');

            var scroller = new Scroller(div, {
                'top': meta.top,
                'bottom': meta.bottom,
            });

            var pulldown = meta.pulldown;
            if (pulldown) {
                scroller.pulldown(pulldown);
            }
        }

        return div;

    }


    return {

        render: render,
    };

});

