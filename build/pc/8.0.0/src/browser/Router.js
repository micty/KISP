/**
* 路由。
* @namespace
* @name Router
*/
define('Router', function (require, module, exports) {

    var $Object = require('Object');
    var name$factory = {};


    //示例解释：
    /*
    KISP.route('User', function (require, module) {
        //以下两种写法是等价的。
        //如果是写法一，则 KISP 内部也会进一步转换成写法二。
        //写法一简单明了，但写法二功能更自由、丰富。
        //一般情况下用写法一，必要时可用写法二。

        //写法一。
        return {
            'login': function () { },
            'logout': function () { },
        };

        //写法二。
        return function (User) {
            User.on({
                'login': function () { },
                'logout': function () { },
            });
        };
    });
    */



    return {

        /**
        * 设置路由。
        * @param {string} name 路由的名称。
        * @param {function} factory 路由处理函数。
        *   也可以是一个导出对象。
        */
        set: function (name, factory) {
            if (name$factory[name]) {
                throw new Error(`重复定义的路由器: ${name}`);
            }

            name$factory[name] = factory;
        },

        /**
        * 获取全部路由。
        */
        get: function (...args) {

            var all = $Object.map(name$factory, function (name, factory) {

                if (typeof factory == 'function') {
                    factory = factory(...args);
                }

                return factory;

            });

            return all;
        },
    };

   

});

