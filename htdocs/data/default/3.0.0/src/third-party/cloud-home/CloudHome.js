
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
            return !!Url.hasQueryString(window, 'ticket');  //确保返回一个 bool 值。
        },

        /**
        * 关闭云之家打开的轻应用。
        */
        close: function () {
            Native.invoke('close');
        },


        /**
        * 分享到微信。
        * @param {Object} config 参数配置对象。 其中：
        * @param {string} title 标题。
        * @param {string} content 内容。
        * @param {string} icon 图标，base64格式。
        * @param {string} url 链接地址。
        * @param {function} success 分享成功后的回调函数。
        * @param {function} fail 分享失败后的回调函数。
        */
        shareWechat: function (config) {

            var API = require('CloudHome.API');
            var api = new API('socialShare');

            var success = config.success;
            if (success) {
                api.on('success', success);
            }

            var fail = config.fail;
            if (fail) {
                api.on('fail', fail);
            }


            api.invoke({
                'shareWay': 'wechat',
                'shareType': 3,
                'shareContent': {
                    'title': config.title,
                    'description': config.content,
                    'thumbData': config.icon,
                    'webpageUrl': config.url,
                },
            });
        },

        /**
        * 设置页面标题。
        * @param {string|boolean} title 要设置的标题或者显示或隐藏的开关。
            如果不指定或指定为 true，则显示之前的标题。
            如果指定为 false，则隐藏标题。
            如果指定为字符串，则设置为指定的内容。
        */
        setTitle: function (title) {

            var Title = require('CloudHome.Title');

            if (title === true) {
                Title.show();
            }
            else if (title === false) {
                Title.hide();
            }
            else if (title) {
                Title.set(title);
            }
            else {
                Title.show(); //显示之前的标题
            }
        },





    };

});
