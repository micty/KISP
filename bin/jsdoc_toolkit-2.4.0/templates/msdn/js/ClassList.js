




MiniQuery.use('$');

var ClassList = (function (classes) {

    var list = {};

    //把类排在前面
    classes.sort(function (x, y) {
        if (x.isa.toLowerCase() == 'constructor' && y.isa.toLowerCase() != 'constructor') {
            return -1;
        }

        if (x.isa.toLowerCase() != 'constructor' && y.isa.toLowerCase() == 'constructor') {
            return 1;
        }
        
        //再按名称排序
        return x.alias < y.alias ? -1 :
            x.alias > y.alias ? 1 : 0;
    });


    $.Array.each(classes, function (item, index) {

        var srcFile = item.srcFile.split('\\');
        var paths = $.Array.map(srcFile, function (item, index) {
            if (item == '..') {
                return null;
            }

            return item;
        });


        //先整体排序
        item.methods.sort(function (x, y) {
            return x.name < y.name ? -1 :
                x.name > y.name ? 1 : 0;
        })


        var events = [];
        var methods = [];

        $.Array.each(item.methods, function (item) {
            if (item.isEvent) {
                events.push(item);
            }
            else {
                methods.push(item);
            }
        })


        var obj = $.Object.extend({}, item, {
            superClass: item.inheritsFrom[0],
            supers: [],
            derives: [],
            events: events,
            methods: methods,
            properties: item.properties.sort(function (x, y) {
                return x.name < y.name ? -1 :
                    x.name > y.name ? 1 : 0;
            }),

            isClass: item.isa.toLowerCase() == 'constructor',
            srcPageName: paths.join('_') + '.html',
            srcFileName: paths.slice(1).join('/')
        });

        obj.typeDesc = '';
        if (obj.isClass) {
            obj.typeDesc += '类';
        }
        
        if (obj.isNamespace) {
            obj.typeDesc += '命名空间';
        }

        list[item.alias] = obj;
    });

    $.Object.each(list, function (key, item) {

        var supers = item.supers;
        var superClass = item.superClass;
            
        while (superClass) {
            supers.push(superClass);
            superClass = list[superClass].superClass;
        }

        supers.reverse();


        superClass = item.superClass;
        if (superClass) {
            list[superClass].derives.push(item.alias);
        }
    });

  
    return list;

})(__classes__ );







function getSamples(innerHTML, tags) {
    var html = innerHTML;

    var samples =
    {
        original: html
    };

    if ($.Object.isArray(tags[0])) //传进来的是数组的数组，转成 json 数组
    {
        tags = $.Array.map(tags, function (item, index) {
            return {
                name: item[0],
                begin: item[1],
                end: item[2],
                outer: item[3]
            };
        });
    }

    for (var i = tags.length - 1; i >= 0; i--) {

        var tag = tags[i];

        samples[tag.name || i] = $.String.between(html, tag.begin, tag.end);

        html = $.String.replaceBetween(html, tag.begin, tag.end, tag.outer);


        if (i == 0) //最顶层
        {
            samples['top'] = html;
        }
    }

    return samples;

}