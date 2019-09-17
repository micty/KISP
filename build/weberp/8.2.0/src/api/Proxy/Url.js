/**
*
*/
define('Proxy/Url', function (require, module, exports) {

 
    var Defaults = require('Defaults');
    var Query = require('Query');
    var Url = require('Url');


    function get(url) {

        //绝对地址
        if (Url.isFull(url)) {
            return url;
        }
            

        //相对地址

        var defaults = Defaults.get(module.parent.id); //默认配置
        var base = defaults.base;

        if (Url.isFull(base)) {
            return base + url;
        }


        var root = Url.root();
        if (url.slice(0, 1) != '/') {
            root = root + base;
        }

        return root + url;
    }





    return {
        'get': function (url) {
            url = get(url);

            //增加随机查询字符串，确保拿到最新的
            return Query.random(url); 
        },
    };


});
