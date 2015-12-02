/**
*
*/
define('Proxy/Url', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Config = require('Config');
    var $Url = MiniQuery.require('Url');
    var Url = require('Url');


    function get(url) {

        //绝对地址
        if (Url.checkFull(url)) {
            return url;
        }
            

        //相对地址

        var defaults = Config.get(module.parent.id); //默认配置
        var base = defaults.base;

        if (Url.checkFull(base)) {
            return base + url;
        }


        var root = Url.root();
        if (url.slice(0, 1) != '/') {
            root = root + base;
        }

        return root + url;
    }





    return {
        get: function (url) {
            url = get(url);

            //增加随机查询字符串，确保拿到最新的
            return $Url.randomQueryString(url); 
        },
    };


});
