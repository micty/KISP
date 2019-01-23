

/**
* 当前页面的 Url 工具。
* @namespace
* @name Url
*/
define('Url', function (require, module, exports) {
    var $String = require('String');


    var meta = {
        root: '',   //网站的根地址。
        url: '',    //kisp.js 文件所在的地址。
        dir: '',    //kisp.js 文件所在的地址所对应的目录。
    };



    return exports = /**@lends Url*/ {

        /**
        * 获取当前 web 站点的根目录。
        */
        root: function () {
            if (meta.root) {
                return meta.root;
            }

            var Defaults = require('Defaults');
            var defaults = Defaults.get(module.id); //默认配置

            var root = defaults.root;

            if (typeof root == 'function') {
                root = root();
            }

            //确保以 '/' 结尾。
            if (!root.endsWith('/')) {
                root += '/';
            }

            meta.root = root;

            return root;
        },

        /**
        * 获取 KISP 框架文件所对应的 url 地址目录。
        */
        dir: function () {
            if (meta.dir) {
                return meta.dir;
            }

            var url = exports.get();
            var dir = url.split('/').slice(0, -1).join('/') + '/';

            meta.dir = dir;

            return dir;
        },



        /**
        * 获取 KISP 框架文件所对应的 url 地址。
        */
        get: function () {
            if (meta.url) {
                return meta.url;
            }

            var Defaults = require('Defaults');
            var defaults = Defaults.get(module.id); //默认配置
            var id = defaults.id;

            //使用 `<script id="script-KISP" src="xxx"></script>` 的模式。
            if (!id) {
                throw new Error('必须给引用了 KISP 框架文件的 <script> 标签分配一个 id。');
            }

            var script = document.getElementById(id);
            var url = script.src.split('?')[0];

            meta.url = url;

            return url;

        },

        /**
        * 获取 url 的主体部分，即去掉 query 和 hash 后的部分。
        */
        main: function (url) {
            url = url.split('#')[0];
            url = url.split('?')[0];

            return url;
        },


        /**
       * 检查给定的 url 是否为完整的 url。
       * 即是否以 'http://' 或 'https://' 开头。
       * @param {string} url 要检查的 url。
       */
        isFull: function (url) {
            if (typeof url != 'string') {
                return false;
            }

            return url.startsWith('http://') ||
                url.startsWith('https://');
        },


        /**
        * 检测指定的 url 是否为特定的扩展名类型的文件。
        * @param {string} url 要检测的文件名。
        * @param {string} ext 要检测的扩展名，以 "." 开始。
        * @return {boolean} 如果该文件名以指定的扩展名结尾，则返回 true；否则返回 false。
        * @example 
            Url.is('a/b/c/login.JSON', '.json'); //返回 true
        */
        isExt: function (url, ext) {

            if (typeof url != 'string' || typeof ext != 'string') {
                return false;
            }

            url = exports.main(url);

            return url.slice(0 - ext.length).toLowerCase() == ext.toLowerCase();
        },



        /**
        * 解析路径。
        * 这是一个第三方库的方法 resolveUrl。
        */
        resolve: function (baseUrl /* ...urls */) {
            var len = arguments.length;
            if (len == 0) {
                throw new Error('resolveUrl requires at least one argument; got none.');
            }

            var base = document.createElement('base');
            base.href = baseUrl;

            if (len == 1) {
                return base.href;
            }


            var head = document.head;
            head.insertBefore(base, head.firstChild);

            var url = '';
            var a = document.createElement('a');
            

            for (var i = 1; i < len; i++) {
                a.href = arguments[i];
                url = a.href;
                base.href = url;
            }

            head.removeChild(base);

            return url;
        },
        
    };

});
