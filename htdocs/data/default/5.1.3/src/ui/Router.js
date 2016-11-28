/**
* 路由
* @namespace
* @name Router
*/
define('Router', function (require, module, exports) {

    var name$fn = {};

    return {

        'set': function (name, fn) {
            if (name$fn[name]) {
                throw new Error('重复定义路由器: ' + name);
            }

            name$fn[name] = fn;
        },

        'get': function (require, module, nav) {

            var all = {};

            for (var name in name$fn) {
                var fn = name$fn[name];

                if (typeof fn == 'function') {
                    fn = fn(require, module, nav);
                }

                all[name] = fn;
            }

            return all;
        },
    };

   

});

