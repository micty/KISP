
define('Package/Loader', function (require, module, exports) {
    var $ = require('$');


    var loader = {
        'css': loadCss,
        'html': loadHtml,
        'js': loadJs,
    };

    function loadCss(url, fn) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';

        link.onload = function () {
            fn && fn();
        };

        link.onerror = function () {
            throw new Error('css 文件加载失败: ' + url);
        };

        link.href = url;
        document.head.appendChild(link);
    }

    function loadHtml(url, fn) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'html',
            cache: true,            //不需要加随机数。
            error: function (ajax, msg, error) {
                throw error;
            },
            success: function (html) {
                $('body').append(html);
                fn && fn();
            },
        });
    }

    function loadJs(url, fn) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'script',
            cache: true,            //不需要加随机数。
            error: function (ajax, msg, error) {
                throw error;
            },
            success: function () {
                fn && fn();
            },
        });
    }



    function checkReady(list, fn) {
        var len = list.length;

        for (var i = 0; i < len; i++) {
            var item = list[i];
            if (!item.ready) {
                return;
            }
        }

        fn && fn();
    }


    /**
    * 并行的去加载全部资源。
    */
    function loadAll(data, fn) {

        var list = ['css', 'html', 'js'];

        list = $.Array.map(list, function (type) {

            var url = data[type];
            if (!url) {
                return null;
            }

            return {
                'url': url,
                'load': loader[type], //对应的 load 方法。
                'ready': false,
            };
        });


        //并行去加载。
        $.Array.each(list, function (item) {

            var url = item.url;
            var load = item.load;

            load(url, function () {

                item.ready = true;
                checkReady(list, fn);
            });
        });

    }



    return {
        'load': loadAll,
    };



});

