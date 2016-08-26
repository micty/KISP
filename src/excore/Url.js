

/**
* 当前页面的 Url 工具类
* @namespace
* @name Url
*/
define('Url', function (require, module, exports) {

    var $ = require('$');
    var root = '';  //网站的根地址。
    var url = '';   //kisp.debug.js 或 kisp.min.js 文件所在的地址。
    var dir = '';   //kisp.debug.js 或 kisp.min.js 文件所在的目录。


    function getBasic() {

        var Config = require('Config');
        var defaults = Config.get(module.id); //默认配置
        var obj = {};

        var replacer = defaults.replacer;
        if (!replacer) {
            return obj;
        }

        var key = replacer.root;
        if (key) {
            obj[key] = exports.root();
        }

        key = replacer.edition;
        if (key) {
            var Edition = require('Edition');
            obj[key] = Edition.get();
        }
        
        return obj;



    }


    module.exports = exports = /**@lends Url*/ {

        /**
        * 获取当前 Web 站点的根地址。
        */
        root: function () {
            if (!root) {
                var Config = require('Config');
                var defaults = Config.get(module.id); //默认配置
                root = defaults.root;

                if (typeof root == 'function') {
                    root = root();
                }

                //确保以 '/' 结尾。
                if (root.slice(-1) != '/') {
                    root += '/';
                }
            }

            return root;
           
        },

        /**
        * 检查给定的 url 是否为完整的 url。
        * 即是否以 'http://' 或 'https://' 开头。
        * @param {string} url 要检查的 url。
        */
        checkFull: function (url) {
            if (typeof url != 'string') {
                return false;
            }

            return url.indexOf('http://') == 0 || url.indexOf('https://') == 0;
        },

        /**
        * 用指定的数据格式化(填充)指定的 url。
        * @param {string} 要进行填充的 url 模板。
        * @param {Object} [data] 要进行填充的数据。
        * @return {string} 返回填充后的 url。
        */
        format: function (url, data) {

            if (typeof data != 'object') { // format(url, arg0, arg1, ... argN)

                var args = [].slice.call(arguments, 1);
                data = $.Array.toObject(args); 
                delete data['length'];
                // data = { 0: arg0, 1: arg1, ..., N: argN };
            }

            var basic = getBasic();
            data = data ? $.Object.extend(data, basic) : basic;


            return $.String.format(url, data);
        },


        /**
        * 获取 kisp 框架文件所对应的 url 地址。
        */
        get: function () {

            if (url) {
                return url;
            }


            var Config = require('Config');
            var defaults = Config.get(module.id); //默认配置
            var id = defaults.id;
            var script = null;

            if (id) {
                script = document.getElementById(id);
            }

            if (!script) {
                var Edition = require('Edition');
                var type = Edition.get();
                var file = $.String.format('script[src*="kisp.{0}.js"]', type);
                script = $(file).get(0);
            }

            url = script.src;
            return url;

        },

        /**
        * 获取 kisp 框架文件所对应的 url 地址目录。
        */
        dir: function () {
            if (dir) {
                return dir;
            }

            var url = exports.get();
            dir = url.split('/').slice(0, -1).join('/') + '/';
            return dir;
        },

        
    };

});
