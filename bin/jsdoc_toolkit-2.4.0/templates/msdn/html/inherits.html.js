

; (function (PageNs) {





var InheritList = (function () {
    
    var div = document.getElementById('divInheritList');
    var ul = document.getElementById('ulInheritList');
    var sample = $.String.between(ul.innerHTML, '<!--', '-->');


    function getHtml(list) {

        return $.Array.map(list, function (item, index) {

            var childs = $.Array.map(item.derives, function (item, index) {
                return ClassList[item];
            });

           
            return $.String.format(sample, {
                display: childs.length == 0 ? 'display: none;' : '',
                alias: item.alias,
                childs: childs.length == 0 ?
                    '' :
                    '<ul style="margin-bottom: 0;">' + getHtml(childs) + '</ul>',
                desc: item.classDesc || item.desc
            });

        }).join('');
    }

    function render(alias) {
        
        
        var list = $.Object.toArray(ClassList);
        var roots = $.Array.grep(list, function (item, index) {
            return item.superClass === undefined;
        });

        ul.innerHTML = getHtml(roots);

    }

    return {
        render: render
    };

})();






(function () {




    
    InheritList.render();

    $(document).hashchange(function (e, data) {
        var hash = data.after.slice(1);
        InheritList.render(hash);
    });

    $.observeHashChange();


    $("#ulInheritList").delegate("li", "click", function (event) {
        var li = this;
        var ul = li.getElementsByTagName('ul')[0];
        if (ul) {
            $(ul).slideToggle('fast', function () {
                var img = $(li).find('img').get(0);
                var src = img.src;

                if (src.indexOf('-') > 0) {
                    img.src = src.replace('-', '+');
                }
                else {
                    img.src = src.replace('+', '-');
                }
            });
        }

        event.stopPropagation();
    });

})();




})(window.PageNs = {});