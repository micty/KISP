

/**
* 函数工具类
* @namespace
* @name Fn
*/
define('Fn', function (require, module, exports) {

    return /**@lends Fn*/ {
        /**
        * 空函数。
        * 提供一个什么也不做、直接原样返回入参的空操作函数。
        * 在很多场合可以用来提供给模块配置，以要求的回调函数不为空。
        */
        noop: function (...args) {
            return args[0];
        },


        /**
        * 用一个的随机延迟时间去执行一个回调函数，并传递一些参数。
        * @param {Object} delay 延迟配置对象。
            如 { min: 500, max: 2000, }，当不需要延迟时，则应为 null。
        * @param {function} fn 要延迟执行的函数。
        * @param {Array} [args] 要传递的参数数组。
        * @return {number} 返回 setTimeout 的结果。
        *   如果没有启用延迟，则不返回值。
        */
        delay: function (delay, fn, args) {
            if (!fn) {
                return;
            }


            if (delay === false || delay == null) { //不启用延迟
                fn.apply(null, args);
                return;
            }

            var $Math = require('Math');

            var timeout = typeof delay == 'number' ? delay :
                    $Math.randomInt(delay.min, delay.max);

            return setTimeout(function () {
                fn.apply(null, args);

            }, timeout);
        },

        
        
    };

});
