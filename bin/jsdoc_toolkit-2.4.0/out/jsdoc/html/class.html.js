

; (function (PageNs) {



//侧边栏
var Sidebar = (function () {


    var ul = document.getElementById('ulSidebar');
    var sample = $.String.between(ul.innerHTML, '<!--', '-->');

    var classes = $.Object.toArray(ClassList);
    classes.sort(function (x, y) {
        return x.alias < y.alias ? -1 :
            x.alias > y.alias ? 1 : 0;
    });

    function render(list) {

        list = list || classes;


        ul.innerHTML = $.Array.map(list, function (item, index) {
            return $.String.format(sample, {
                alias: item.alias
            });
        }).join('');
    }

    //过滤
    $('#txtFilter').keyup(function () {
        var txt = this;
        var value = txt.value;

        var list = $.Array.grep(classes, function (item, index) {
            return item.alias.indexOf(value) >= 0;
        });

        render(list);

    });


    function setActiveItem(alias) {
        $(ul).find('li>a').each(function (item) {
            
            var a = this;
            var li = a.parentNode;

            var isCurrent = $(a).attr('href') == '#' + alias;
            $(li).toggleClass('current', isCurrent);
        });
    }


    return {
        render: render,
        setActiveItem: setActiveItem
    };

})();



//顶部信息
var HeadInfos = (function () {

    var header = document.getElementById('divHeadInfos');
    var sample = $.String.between(header.innerHTML, '<!--', '-->');

    function render(alias) {

        var item = ClassList[alias];

        header.innerHTML = $.String.format(sample, {

            alias: item.alias,
            desc: (item.classDesc || item.desc).replace(/ /g, '&nbsp;&nbsp;').replace(/\n/g, '<br />'),
            typeDesc: item.typeDesc,
            srcFileName: item.srcFileName,
            srcPageName: item.srcPageName
        });

        document.title = item.alias + ' ' + item.typeDesc;
        
    }

    return {
        render: render
    };

})();


//继承层次结构
var InheritList = (function () {
    
    var div = document.getElementById('divInheritList');
    var ul = document.getElementById('ulInheritList');
    var sample = $.String.between(ul.innerHTML, '<!--', '-->');


    function render(alias) {
        
        var item = ClassList[alias];
        var supers = item.supers;

        if (!item.isClass || supers.length == 0) {
            div.style.display = 'none';
            return;
        }

        

        supers = supers.concat(alias);
        ul.innerHTML = $.Array.map(supers, function (item, index) {

            return $.String.format(sample, {
                alias: item == alias ? item : $.String.format('<a href="#{0}">{0}</a>', item),
                paddingLeft: 20 * index
            });

        }).join('');

        div.style.display = '';

    }

    return {
        render: render
    };

})();


//方法列表
var MethodList = (function () {

    var div = document.getElementById('divMethodList');
    var nav = $(div).find('nav').get(0);
    var chk = document.getElementById('chkHideInheritedMethods');

    var samples = getSamples(div.innerHTML, [
        { name: 'table', begin: '<!--', end: '-->', outer: '{table}' },
        { name: 'tr', begin: '#tr.begin#', end: '#tr.end#', outer: '{trs}' },
        { name: 'static', begin: '#static.begin#', end: '#static.end#', outer: '{static}' }
    ]);

    var lastAlias;

    $(chk).click(function () {
        render(lastAlias);
        $(chk).parent().toggleClass('checked', chk.checked);
    });

    function render(alias) {

        lastAlias = alias;
        var hideInherited = chk.checked;

        var list = ClassList[alias].methods;

        if (!list || list.length == 0) { //无数据
            div.style.display = 'none';
            return;
        }



        nav.innerHTML = $.String.format(samples['table'], {

            trs: $.Array.map(list, function (item, index) {

                var isInherited = item.memberOf != alias;

                if (hideInherited && isInherited) {
                    return null;
                }

                var obj = $.Object.extend({}, item, {
                    display: isInherited ? '' : 'display:none',
                    'static': item.isStatic ? samples['static'] : ''
                });

                return $.String.format(samples['tr'], obj);
            }).join('')

        });

        div.style.display = '';

    }


    return {
        render: render
    };

})();


//属性列表
var PropertyList = (function () {

    var div = document.getElementById('divPropertyList');
    var nav = $(div).find('nav').get(0);
    var chk = document.getElementById('chkHideInheritedProperties');

    var samples = getSamples(div.innerHTML, [
        { name: 'table', begin: '<!--', end: '-->', outer: '{table}' },
        { name: 'tr', begin: '#tr.begin#', end: '#tr.end#', outer: '{trs}' }
    ]);

    var lastAlias;


    $(chk).click(function () {
        render(lastAlias);
        $(chk).parent().toggleClass('checked', chk.checked);
    });

    function render(alias) {

        lastAlias = alias;
        var  hideInherited = chk.checked;

        var list = ClassList[alias].properties;

        if (!list || list.length == 0) {
            div.style.display = 'none';
            return;
        }
        

        nav.innerHTML = $.String.format(samples['table'], {

            trs: $.Array.map(list, function (item, index) {

                var isInherited = item.memberOf != alias;

                if (hideInherited && isInherited) {
                    return null;
                }

                var obj = $.Object.extend({}, item, {
                    display: isInherited ? '' : 'display:none'
                });

                return $.String.format(samples['tr'], obj);
            }).join('')
        });

        div.style.display = '';
    }


    

    return {
        render: render
    };
    
})();


//事件列表
var EventList = (function () {

    var div = document.getElementById('divEventList');
    var nav = $(div).find('nav').get(0);
    var chk = document.getElementById('chkHideInheritedEvents');

    var samples = getSamples(div.innerHTML, [
        { name: 'table', begin: '<!--', end: '-->', outer: '{table}' },
        { name: 'tr', begin: '#tr.begin#', end: '#tr.end#', outer: '{trs}' }
    ]);

    var lastAlias;


    $(chk).click(function () {
        render(lastAlias);
        $(chk).parent().toggleClass('checked', chk.checked);
    });

    function render(alias) {

        lastAlias = alias;
        var hideInherited = chk.checked;

        var list = ClassList[alias].events;

        if (!list || list.length == 0) {
            div.style.display = 'none';
            return;
        }



        nav.innerHTML = $.String.format(samples['table'], {

            trs: $.Array.map(list, function (item, index) {

                var isInherited = item.memberOf != alias;

                if (hideInherited && isInherited) {
                    return null;
                }

                var obj = $.Object.extend({}, item, {
                    display: isInherited ? '' : 'display:none',
                    name: item.name.slice(6) //去掉 'event:' 前缀
                });

                return $.String.format(samples['tr'], obj);
            }).join('')
        });

        div.style.display = '';
    }

    

    return {
        render: render
    };

})();





(function () {

    Sidebar.render();


    $(document).hashchange(function (e, data) {

        var alias = data.after.slice(1);

        Sidebar.setActiveItem(alias);
        HeadInfos.render(alias);
        InheritList.render(alias);
        PropertyList.render(alias);
        EventList.render(alias);
        MethodList.render(alias);

    });


    $(document).delegate('.collapse', 'click', function () {
        var span = this;
        $(span).parent().next().slideToggle(function () {
            $(span).toggleClass('collapseColosed');
            $(span).next().toggle();
        });
    });


    var hash = location.hash;
    if (!hash) { //当前还没有 hash，则默认跳到第一个
        hash = $('#ulSidebar>li:eq(0)>a').attr('href');
        location.hash = hash;
    }


})();




})(window.PageNs = {});