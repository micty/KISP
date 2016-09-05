
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
            success: function (content, msg, ajax) {
                fn && fn(content);
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
            success: function (content, msg, ajax) {
                fn && fn(content);
            },
        });
    }



    function checkReady(obj, fn) {

        for (var type in obj) {
            var item = obj[type];

            if (!item.ready) {
                return;
            }
        }
    
        fn && fn(obj);
    }


    
    



    return {

        /**
        * 并行的去加载全部资源。
        */
        'load': function (data, fn) {

            var obj = {};
            var Url = require('Url');
            var root = Url.root();

            $.Object.each(loader, function (type, load) {
                var url = data[type];
                if (!url) {
                    return;
                }
          
                
                url = root + url;

                obj[type] = {
                    'url': url,
                    'ready': false,
                    'content': '',
                };
            });



            //并行去加载。
            $.Object.each(obj, function (type, item) {

                var url = item.url;
                var load = loader[type]; //对应的 load 方法。

                load(url, function (content) {

                    item.ready = true;
                    item.content = content || '';

                    checkReady(obj, fn);
                });
            });

        },
    };



});

