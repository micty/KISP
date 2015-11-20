
/**
*/
define('Template/Simple', function (require, module, exports) {


    var $ = require('$');



    
    function getSample(meta) {

        var container = meta.container;
        var root = meta.root;

        var html = $(container).html();
        var sample = $.String.between(html, root.begin, root.end);

        return sample;

    }


    function getHTML(meta, list, fn) {

        var sample = meta.sample = meta.sample || getSample(meta);

        var html;

        if (list instanceof Array) {
            html = $.Array.keep(list, function (item, index) {
                if (fn) {
                    item = fn(item, index);
                }

                return $.String.format(sample, item);

            }).join('');
        }
        else {
            html = $.String.format(sample, list);
        }

        $(meta.container).html(html);


    }

    return {
        getHTML: getHTML,
    };


});
