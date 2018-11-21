
define('Package/Loader', function (require, module, exports) {
    var Tasks = require('Tasks');

    //内部用的空函数。
    function noop() { }

    
    var type$load = {
        /**
        * 加载 css 文件。
        *   url: '',        //要加载的文件的 url 地载。
        *   success: fn,    //加载成功后的回调函数。
        */
        css: function (url, success) {
            var link = document.createElement('link');

            link.onerror = function () {
                throw new Error(`css 文件加载失败: ${url}`);
            };

            link.onload = function () {
                success && success({
                    'url': url,
                    'content': '', //这里无法也不需要获取内容。
                });
            };

            link.rel = 'stylesheet';
            link.href = url;

            document.head.appendChild(link);
        },

        /**
        * 加载 html 文件。
        *   url: '',        //要加载的文件的 url 地载。
        *   success: fn,    //加载成功后的回调函数。
        */
        html: function (url, success) {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'html',
                cache: true,            //不需要加随机数。
                error: function (ajax, msg, error) {
                    throw error;
                },

                success: function (content, msg, ajax) {
                    success && success({
                        'url': url,
                        'content': content,
                    });
                },
            });
        },

        /**
        * 加载 js 文件。
        *   url: '',        //要加载的文件的 url 地载。
        *   success: fn,    //加载成功后的回调函数。
        */
        js: function (url, success) {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'script',
                cache: true,            //不需要加随机数。
                error: function (ajax, msg, error) {
                    throw error;
                },
                success: function (content, msg, ajax) {
                    success && success({
                        'url': url,
                        'content': content,
                    });
                },
            });
        },

        /**
        * 加载 json 文件。
        *   url: '',        //要加载的文件的 url 地载。
        *   done: fn,       //加载成功后的回调函数。
        */
        json: function (url, done) {
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: url,

                error: function () {
                    done && done({});
                },

                success: function (json) {
                    done && done(json);
                },
            });
        },

    };



    return {
        /**
        * 并行加载指定的资源文件。
        */
        load: function (type$url, done) {

            var types = Object.keys(type$url); //如 ['css', 'html', 'js'];

            //并行加载。
            Tasks.parallel(types, {

                //针对加载完成某一项。
                each: function (type, index, done) {
                    var url = type$url[type];
                    var load = type$load[type];

                    if (!load) {
                        throw new Error(`不支持加载 ${type} 类型的文件。`);
                    }


                    load(url, function (data) {
                        done({
                            'type': type,
                            'url': data.url,
                            'content': data.content,
                        });
                    });
                },

                //全部完成。
                all: function (items) {

                    var pack = {
                        cache: false,  //指示不是从缓存中读取的。
                    };

                    items.forEach(function (item) {
                        pack[item.type] = item;
                    });

                    done && done(pack);
                },
            });
        },
    };

});

