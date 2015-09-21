

; (function (PageNs, ClassList) {




var Sidebar = (function () {

    var divSidebarTitle = document.getElementById('divSidebarTitle');
    var ul = document.getElementById('ulSidebar');
    var sample = $.String.between(ul.innerHTML, '<!--', '-->');


    function render(memberOf) {

        var classItem = ClassList[memberOf];
        var list = classItem.methods;

        divSidebarTitle.innerHTML = memberOf + ' 方法列表';


        ul.innerHTML = $.Array.map(list, function (item, index) {
            return $.String.format(sample, $.Object.extend({}, item, {
                inheritDesc: item.memberOf == memberOf ? '' : ('(继承自 ' + item.memberOf + ')'),
                alias: item.memberOf + '-' + item.name
            }));
        }).join('');
    }


    function setActiveItem(methodItem) {

        var memberOf = methodItem.memberOf;
        var name = methodItem.name;

        $(ul).find('li>a').each(function (item) {

            var a = this;
            var li = a.parentNode;

            var isCurrent =
                $(a).attr('href') == '#' + memberOf + '-' + name;

            $(li).toggleClass('current', isCurrent);
        });
    }


    return {
        render: render,
        setActiveItem: setActiveItem
    };

})();



var MethodItems = (function () {
    
    
    var list = {};


    function parse(alias) {

        var values = alias.split('-');
        var memberOf = values[0];
        var name = values[1];

        var classItem = ClassList[memberOf];
        return $.Array.findItem(classItem.methods, function (item, index) {
            return item.memberOf == memberOf && item.name == name;
        });

    }

    function get(alias) {
        
        var item = list[alias];
        if (!item) {
            item = parse(alias);
            list[alias] = item;
        }

        return item;
    }

    return {
        get: get
    };

})();


var Details = (function () {


    var spanTitle = document.getElementById('spanTitle');
    var divDesc = document.getElementById('divDesc');
    var ddSyntax = document.getElementById('ddSyntax');

    var samples = {

        title: $.String.between(spanTitle.innerHTML, '<!--', '-->'),
        desc: $.String.between(divDesc.innerHTML, '<!--', '-->'),
        syntax: $.String.between(ddSyntax.innerHTML, '<!--', '-->')
    };

    


    function render(methodItem) {
        
        var classItem = ClassList[methodItem.memberOf];
        var isStatic = methodItem.isStatic || methodItem.alias.indexOf('-') > 0;


        spanTitle.innerHTML = $.String.format(samples.title, $.Object.extend({}, methodItem, {
            typeDesc: isStatic ? '静态' : '实例',
            memeberOf_desc: classItem.alias + ' ' + classItem.typeDesc + ': ' + (classItem.classDesc || classItem.desc)
        }));

        document.title = $.String.format('{memberOf}.{name} 方法', {
            memberOf: methodItem.memberOf,
            name: methodItem.name
        });


        divDesc.innerHTML = $.String.format(samples.desc, {
            desc: methodItem.desc.replace(/ /g, '&nbsp;&nbsp;').replace(/\n/g, '<br />')
        });


        ddSyntax.innerHTML = $.String.format(samples.syntax, {
            memberOf: methodItem.memberOf,
            name: methodItem.name,
            params: $.Array.map(methodItem.params, function (item, index) {
                return item.name;

            }).join(', ')
        });
    }

    return {
        render: render
    };
    
})();

var Syntax = (function () {

})();


var Params = (function () {

    var dl = document.getElementById('dlParams');

    var samples = getSamples(dl.innerHTML, [
        { name: 'all', begin: '<!--', end: '-->' },
        { name: 'params', begin: '#params.begin#', end: '#params.end#', outer: '{params}' }
    ]);

    function render(methodItem) {

        var params = methodItem.params;

        dl.innerHTML = $.String.format(samples.all, {
            params: $.Array.map(params, function (item, index) {

                var obj = $.Object.extend({}, item, {
                    desc: item.desc.replace(/\n/g, '<br />')
                });

                return $.String.format(samples.params, obj);
            }).join('')
        });
    }

    return {
        render: render
    };

})();

var Returns = (function () {

    var dl = document.getElementById('dlReturns');

    var samples = getSamples(dl.innerHTML, [
        { name: 'all', begin: '<!--', end: '-->' },
        { name: 'returns', begin: '#returns.begin#', end: '#returns.end#', outer: '{returns}' }
    ]);

    function render(methodItem) {

        var returns = methodItem.returns;

        dl.innerHTML = $.String.format(samples.all, {
            returns: $.Array.map(returns, function (item, index) {
                return $.String.format(samples.returns, item);
            }).join('')
        });
    }

    return {
        render: render
    };
})();


var Examples = (function () {

    var dl = document.getElementById('dlExamples');

    var sample = $.String.between(dl.innerHTML, '<!--', '-->');

    function render(methodItem) {

        var examples = methodItem.example;
        if (examples.length == 0) {
            examples.push({ desc: '        (暂无)' });
        }

        dl.innerHTML = $.Array.map(examples, function (item, index) {
            return $.String.format(sample, {
                desc: item.desc
            });
        }).join('');
    }

    return {
        render: render
    };
})();


(function () {


    $(document).hashchange(function (e, data) {
        var alias = data.after.slice(1);
        var methodItem = MethodItems.get(alias);

        Sidebar.render(methodItem.memberOf);
        Sidebar.setActiveItem(methodItem);
        Details.render(methodItem);
        Params.render(methodItem);
        Returns.render(methodItem);
        Examples.render(methodItem);

        $('pre code').each(function (i, e) {
            hljs.highlightBlock(e);
        });

    });

})();




})(window.PageNs = {}, ClassList);