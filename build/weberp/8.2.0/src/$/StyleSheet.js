

/**
* StyleSheet 样式类工具
* @namespace
* @name StyleSheet
*/
define('StyleSheet', function (require, module, exports) {

    var iframe;
    var iframeDoc;



    var defaults = {
        url: '',
        id: '',
        charset: 'utf-8',
        document: window.document,
        onload: null,
    };



    /**
    * 加载单个文件。 
    * @inner
    */
    function loadItem(url, charset, document, onload) {

        var id;

        if (typeof url == 'object') { //传入的是一个 {} 
            var config = url;

            id = config.id;
            url = config.url;
            charset = config.charset;
            document = config.document;
            onload = config.onload;
        }


        var link = document.createElement('link');

        

        if (onload) { //指定了回调函数，则设置它

            if (link.readyState) { //IE

                link.onreadystatechange = function () {

                    var readyState = link.readyState;

                    if (readyState == 'loaded' || readyState == 'complete') {
                        link.onreadystatechange = null; //避免重复执行回调
                        onload();
                    }
                };
            }
            else { //标准
                link.onload = onload;
            }

        }


        link.href = url;
        link.rel = 'stylesheet';

        if (charset) {
            link.charset = charset;
        }

        if (id) {
            link.id = id;
        }

      
        document.head.appendChild(link);
    }

    /**
    * 顺序加载批量
    * @inner
    */
    function loadList(urls, charset, document, fn) {

        if (urls.length == 0) {
            fn && fn();
            return;
        }


        var index = 0;

        (function () {
            var next = arguments.callee;
            var url = urls[index];

            loadItem(url, charset, document, function () {

                index++;

                if (index < urls.length) {
                    next();
                }
                else {
                    fn && fn();
                }
            });

        })();


    }




    return /**@lends Style */ {

        /**
        * 跨浏览器动态加载 JS 文件，并在加载完成后执行指定的回调函数。
        * @memberOf MiniQuery.Script
        * @param {string|Array} params.url 
            要加载的 JS 文件的 url 地址，如果要批量加载，则为一个地址数组。
        * @param {string} [params.charset="utf-8"] 
            要加载的 JS 文件的字符编码，默认为 utf-8。
        * @param {Document} [params.document=window.document] 
            要加载的 JS 文件的上下文环境的 document，默认为当前窗口的 document 对象。
        * @param {function} [params.onload] 
            加载成功后的回调函数。
        * @example
            Style.load({
                url: 'a.css',
                charset: 'utf-8',
                document: document,
                id: 'myScript',
                onload: function (){ }
            });

            Style.load('a.css', 'utf-8', document, function(){});
            Style.load('a.css', 'utf-8', function(){});
            Style.load('a.css', document, function(){});
            Style.load('a.css', function(){});

            //批量加载
            Style.load(['a.css', 'b.css'], function(){});
        */
        load: function (params) {

            var $Object = require('Object');

            var obj = Object.assign({}, defaults); //复制一份

            //注意，params 有可能是个数组，不能用 typeof 为 'object'
            if ($Object.isPlain(params)) { //纯对象 {}
                Object.assign(obj, params);
            }
            else {

                obj.url = params;

                switch (typeof arguments[1]) {
                    case 'string':
                        obj.charset = arguments[1];
                        break;
                    case 'object':
                        obj.document = arguments[1];
                        break;
                    case 'function':
                        obj.onload = arguments[1];
                        break;
                }

                switch (typeof arguments[2]) {
                    case 'object':
                        obj.document = arguments[2];
                        break;
                    case 'function':
                        obj.onload = arguments[2];
                        break;
                }

                if (arguments[3]) {
                    obj.onload = arguments[3];
                }
            }




            var url = obj.url;

            if (typeof url == 'string') {
                loadItem(obj);
            }
            else if (url instanceof Array) {
                loadList(url, obj.charset, obj.document, obj.onload);
            }
            else {
                throw new Error('参数 params.url 必须为 string 或 string 的数组');
            }
        },

       
    };

});


