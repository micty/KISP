
/**
* 云之家环境相关的模块
* @namespace
* @name CloudHome
*/
define('CloudHome', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Url = MiniQuery.require('Url');

    var Native = require(module, 'Native');



    module.exports = exports = /**@lends CloudHome*/ {

        invoke: Native.invoke,


        /**
        * 判断是否在云之家打开的。
        */
        check: function () {
            return Url.hasQueryString(window, 'ticket'); 
        },

        close: function () {
            Native.invoke('close');
        },






    };

});
