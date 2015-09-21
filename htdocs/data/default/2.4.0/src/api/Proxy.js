
/**
* 把请求后台接口代理到本地的工具类。
* @namespace
* @name Proxy
*/
define('Proxy', function (require, module,  exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Config = require('Config');
    var Fn = require('Fn');
    
    var url$config = {}; // {请求地址: 请求的配置对象}   

    //模拟一个网络的随机延迟时间去执行一个回调函数
    function delay(fn) {

        var defaults = Config.get(module.id); //默认配置
        var delay = defaults.delay;
        var args = [].slice.call(arguments, 1); //提取 fn 后面的参数

        Fn.delay(delay, fn, args);

    }

    /**
    * 根据指定的模块获取对应的请求配置对象。
    */
    function getConfig(module) {

        var url = module['uri']; // module.uri
        var obj = url$config[url];
        delete url$config[url]; //已获取使用了，没必要保留了

        return obj;
    }

    function getUrl(file) {
        var Url = require('Url');
        var $Url = MiniQuery.require('Url');

        var url = Url.checkFull(file) ? file : Url.root() + file;
        url = $Url.randomQueryString(url); //增加随机查询字符串，确保拿到最新的

        return url;
    }


    /**
    * 加载指定的 js 代理文件。
    */
    function loadJs(file, config) {

        var url = getUrl(file);
        url$config[url] = config; //把本次请求的参数保存下来

        var Seajs = require('Seajs');

        Seajs.use(url, function (json) {
            done(json, config);
        });
    }

    /**
    * 加载指定的 json 代理文件。
    */
    function loadJson(file, config) {

        var url = getUrl(file);

        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);

        xhr.onreadystatechange = function () {

            if (xhr.readyState != 4) {
                return;
            }

            if (xhr.status != 200) {
                delay(config.error);
                return;
            }

            var JSON = require('JSON');
            var json = JSON.parse(xhr.responseText);
            done(json, config);
        };

        xhr.send(null);
    }


    function done(json, config) {
        if (!json) {
            delay(config.error);
            return;
        }

        var successCode = config.successCode;
        var field = config.field;

        var code = json[field.code];

        if (code == successCode) { // 成功
            var data = json[field.data] || {};
            delay(config.success, data, json);
        }
        else { //失败
            var msg = json[field.msg] || '';
            delay(config.fail, code, msg, json);
        }
    }


    module.exports = exports = /**@lends Proxy*/ {

        /**
        * 发起代理请求。
        * @param {string} file 代理响应的文件地址。
        * @param {Object} config 配置对象。
        * @return {boolean} 返回一个布尔值，指示该后台接口是否启用了代理映射。
        */
        request: function (file, config) {

            var File = require('File');

            if (File.isJs(file)) { // 映射的响应是一个 js 文件
                loadJs(file, config);
                return;
            }

            if (File.isJson(file)) {
                loadJson(file, config);
                return;
            }

            throw new Error('不支持参数 file 的文件类型: ' + file);

        },

        /**
        * 响应代理请求。
        * 可以生成很复杂的动态数据，并根据提交的参数进行处理，具有真正模拟后台逻辑的能力。
        * 该方法仅用在代理响应文件中。
        * 已重载 response({})、response(fn)、和 response('', {}) 的情况。
        * @param {string} action 响应的分支名称。
        * @param {Object} fns 响应的分支逻辑。
        */
        response: function (action, fns) {

            var Seajs = require('Seajs');

            //这里注意，CMD 规范的参数顺序是 (require, exports, module)，而我的设计搞错了。
            Seajs.define(function (require, exports, module) {

                if ($.Object.isPlain(action)) { // response({})
                    return action;
                }

                var config = getConfig(module);
                var data = config.data;

                var fn = typeof action == 'function' ? action   // response(fn)
                    : fns[data[action]];                        // response('', {})

                if (!fn) {
                    return {};
                }

                return fn(data, config) || {};
            });
        },

    };
});
