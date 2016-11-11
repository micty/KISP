
/**
*/
define('Template/Multiple', function (require, module, exports) {


    var $ = require('$');




    
    function getInfo(meta) {

        var names = meta.names;
        var len = meta.outer;
        var begin = meta.item.begin;
        var end = meta.item.end;

        var name$outer = {};

        var tags = $.Array.keep(names, function (name, index) {

            var outer = $.String.random(len);
            name$outer[name] = outer;

            var data = {
                'name': name,
            };

            var tag = {
                'name': name,
                'begin': $.String.format(begin, data),
                'end': $.String.format(end, data),
                'outer': '{' + outer + '}',
            };

            return tag;
        });

        tags = [{
            'name': $.String.random(),
            'begin': meta.root.begin,
            'end': meta.root.end,

        }].concat(tags);

        var container = meta.container;
        var html = $(container).html();
        var samples = $.String.getTemplates(html, tags);

        return {
            'name$outer': name$outer,
            'tags': tags,
            'samples': samples,
        };

    }


    function getHTML(meta, level, list, fn) {

        var info = meta.info = meta.info || getInfo(meta);

        var tags = info.tags;
        var samples = info.samples;
        var name$outer = info.name$outer;

        //内部方法，获取指定层级的 html
        function get(level, list, fn) {

            var tag = tags[level];
            var name = tag.name;
            var sample = samples[name];

            return $.Array.keep(list, function (item, index) {

                var obj = fn(item, index);
                var data = obj.data || {};

                var lv = level + 1;
                var tag = tags[lv];

                if (tag) {
                    var outer = name$outer[tag.name];

                    if (outer) {
                        data[outer] = get(lv, obj.list, obj.fn);
                    }
                }

                var html = $.String.format(sample, data);

                return html;

            }).join('');
        }

        return get(level, list, fn);

    }

    return {
        'getHTML': getHTML,
    };


});
