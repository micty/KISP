
/**
* 云之家环境相关的模块
* @namespace
* @name CloudHome
*/
define('CloudHome', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Url = MiniQuery.require('Url');

    var Native = module.require('Native');


    module.exports = exports = /**@lends CloudHome*/ {

        invoke: Native.invoke,


        /**
        * 判断是否在云之家打开的。
        * 即判断当前环境是否支持云之家的 JSBridge。
        * @param {boolean} [strict=false] 是否使用云之家官方文档上的严格模式进行判断。
            默认只从 url 中判断是否包含有 ticket 字段。
            如果要使用严格模式，请指定为 true。
        * @param {boolean} 返回一个布尔值，指示是否在云之家环境打开的。
        */
        check: function (strict) {
            
            //详见：http://open.kdweibo.com/wiki/doku.php?id=jsbridge:%E4%BA%91%E4%B9%8B%E5%AE%B6jsbridge%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3
            //iOS：Qing/0.9.0;iPhone OS 9.1;Apple;iPhone7,1
            //Android：Qing/0.9.0;Android4.1.1;Xiaomi;MI 2 

            if (strict) {
                var reg = /Qing\/.*;(iPhone|Android).*/;
                return navigator.userAgent.match(reg) ? true : false;
            }
           

            //如 ?ticket=967cada703a6ca821790f048d55f1d32
            return !!Url.hasQueryString(window, 'ticket'); //确保返回一个 bool 值。
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
        * @param {string} icon 图标，base64 格式。
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
            else if (title  || title === '') {
                Title.set(title);
            }
            else {
                Title.show(); //显示之前的标题
            }
        },



    };

});
