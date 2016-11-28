/**
* 调用云之家 native 方法的模块。
*/
define('CloudHome/Native', function (require, module, exports) {

    var cid = 0;    //回调 id 计数器，递增
    var id$fn = {}; //回调列表


    //该方法给云之家 native 调用，名称必须为这个
    window.XuntongJSBridge = {

        /**
        * 处理云之家的回调。
        * 该方法给云之家 native 调用
        */
        'handleMessageFromXT': function (id, json) {

            var fn = id$fn[id];
            if (!fn) {
                return;
            }

            fn(json || {});
        },
    };



    return /**@lends CloudHome.Native*/ {

        /**
        * 调用云之家原生接口。
        * @param {string} name 要调用的原生接口的名称。
        * @param {Object} [data] 要传递的数据对象。
        * @param {function} fn 回调函数。 会接收到一个参数: json 对象
        */
        invoke: function (name, data, fn) {

            if (typeof data == 'function') { //重载 invoke(name, fn)
                fn = data;
                data = null;
            }

            data = JSON.stringify(data || {});
            data = encodeURIComponent(data);

            var id = fn ? ++cid : 0;
            if (id) {
                id$fn[id] = fn;
            }

            var url = ['xuntong', name, id, data].join(':');

            var iframe = document.createElement('iframe');

            // for some reason we need to set a non-empty size for the iOS6 simulator
            iframe.setAttribute('height', '1px');
            iframe.setAttribute('width', '1px');

            iframe.setAttribute('src', url);

            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;


        },
    };


});
