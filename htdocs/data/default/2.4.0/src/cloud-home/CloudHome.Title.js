
/**
* 云之家环境的页面标题
* @namespace
* @name CloudHome.Title
*/
define('CloudHome.Title', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Native = require('CloudHome.Native');


    var current = document.title;
    var iframeHTML = '<iframe src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="></iframe>';


    module.exports = exports = /**@lends CloudHome.Title*/ {


        /**
        * 设置页面标题。
        */
        set: function (title) {

            current = title;

            Native.invoke('setWebViewTitle', {
                'title': title
            });

            // hack 在微信等 webview 中无法修改 document.title 的情况
            try {
                document.title = title;
                
                var body = $('body');

                var iframe = $(iframeHTML).on('load', function () {
                    setTimeout(function () {
                        iframe.off('load').remove();
                    }, 0);
                }).appendTo(body);

            }
            catch (ex) {

            }

            
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
            Native.invoke('hideWebViewTitle');
        },

        /**
        * 切换显示或隐藏页面标题。
        */
        toggle: function (sw) {
            if (sw) {
                exports.show();
            }
            else {
                exports.hide();
            }
        },

    };

});
