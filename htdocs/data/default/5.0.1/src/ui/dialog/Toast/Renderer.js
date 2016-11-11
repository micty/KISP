
/**
*
*/
define('Toast/Renderer', function (require, module, exports) {

    var $ = require('$');


    function render(meta, style) {

        var Style = require('Style');


        var id = meta.id;
        var sample = meta.sample;


        var html = $.String.format(sample, {
            'id': id,
            'icon': meta.icon,
            'icon-id': meta.iconId,
            'text-id': meta.textId,
            'text': meta.text,
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

        return div;

    }

    return {

        render: render,
    };

});

