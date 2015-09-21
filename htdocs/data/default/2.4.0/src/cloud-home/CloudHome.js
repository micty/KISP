
/**
* 云之家环境相关的模块
* @namespace
* @name CloudHome
*/
define('CloudHome', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Url = MiniQuery.require('Url');

    var iframeHTML = '<iframe src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="></iframe>';

    module.exports = exports = /**@lends CloudHome*/ {

        /**
        * 判断是否在云之家打开的。
        */
        check: function () {
            return Url.hasQueryString(window, 'ticket'); 
        },




    };

});
