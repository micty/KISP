
/**
* 云之家环境的页面标题
* @namespace
* @name CloudHome.Title
*/
define('CloudHome.Title', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var current = document.title;
    var isVisible = false;

    module.exports = exports = /**@lends CloudHome.Title*/ {


        /**
        * 设置页面标题。
        */
        set: function (title) {

            current = title;

            var CloudHome = require('CloudHome');
            CloudHome.invoke('setWebViewTitle', {
                'title': title
            });

            isVisible = true;
        },

        /**
        * 显示页面标题。
        */
        show: function () {
            exports.set(current);
        },

        /**
        * 隐藏页面标题。
        */
        hide: function () {
            current = document.title;
            var CloudHome = require('CloudHome');
            CloudHome.invoke('hideWebViewTitle');
            isVisible = false;
        },

        /**
        * 切换显示或隐藏页面标题。
        */
        toggle: function (needShow) {
            if (needShow) {
                exports.show();
            }
            else {
                exports.hide();
            }
        },

    };

});
