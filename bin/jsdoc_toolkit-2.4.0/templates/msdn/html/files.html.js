

; (function (PageNs, files) {



//侧边栏
var Sidebar = (function () {


    var ul = document.getElementById('ulSidebar');
    var sample = $.String.between(ul.innerHTML, '<!--', '-->');

    var classes = $.Object.toArray(ClassList);

    function render(list) {

        list = list || classes;

        ul.innerHTML = $.Array.map(list, function (item, index) {
            return $.String.format(sample, {
                alias: item.alias
            });
        }).join('');
    }


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





//方法列表
var FileList = (function () {

    var div = document.getElementById('divFileList');

    var samples = getSamples(div.innerHTML, [
        { name: 'table', begin: '<!--', end: '-->', outer: '{table}' },
        { name: 'tr', begin: '#tr.begin#', end: '#tr.end#', outer: '{trs}' }
    ]);

    function render() {

        div.innerHTML = $.String.format(samples['top'], {
            table: $.String.format(samples['table'], {
                trs: $.Array.map(files, function (item, index) {

                    var alias = item.alias;

                    var paths = $.Array.map(alias.split('\\'), function (item, index) {
                        if (item == '..') {
                            return null;
                        }

                        return item;
                    });

                    return $.String.format(samples['tr'], {
                        path: alias.slice(6),
                        desc: item.desc,
                        srcPageName: paths.join('_') + '.html'
                    });
                }).join('')
            })
        });
    }

    return {
        render: render
    };

})();




(function () {

    Sidebar.render();


    FileList.render();


})();




})(window.PageNs = {}, __files__);