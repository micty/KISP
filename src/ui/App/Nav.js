
define('App/Nav', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Navigator = require('Navigator');

    var Package = null;


    function create(module) {

        var nav = new Navigator({
            hash: function (current) {
                //为了让 url 中的 hash 可读性更好，有助于快速定位到相应的模块。
                return current + '-' + $.String.random(4);
            },
        });


        //重写 nav.to 方法
        var to = nav.to;

        /**
        * 跳转到指定的视图，并传递一些参数。
        */
        nav.to = function (name, arg0, argN) {

            var args = [].slice.call(arguments);

            //已加载过，或者是同步方式存在的。
            var M = module.require(name);
            if (M) {
                to.apply(nav, args);
                return;
            }

            //尝试以异步方式去加载。
            Package = Package || require('Package');

            Package.load(name, function () {
                var M = module.require(name);

                if (!M) {
                    throw new Error('不存在名为 ' + name + ' 的视图');
                }

                to.apply(nav, args);
            });

        };




        return nav;
    }




    return {
        'create': create,
    };



});

