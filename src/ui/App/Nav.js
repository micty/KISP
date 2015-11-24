
define('App/Nav', function (require, module, exports) {
    var $ = require('$');

   
    function create(config) {

        var Navigator = require('Navigator');

        var nav = new Navigator({
            hash: function (current) {
                //为了让 url 中的 hash 可读性更好，有助于快速定位到相应的模块。
                return [current, $.String.random(8)].join('-');
            },
        });


        if (config) {
            var Mask = require('Mask');

            var mask = new Mask({
                opacity: config.opacity,
                duration: config.duration,
                'z-index': config['z-index'],
            });

            mask.render(); //提前渲染但不显示，避免在视图切换时来不及创建 DOM 节点。

            function showMask() {
                mask.show();
            }

            //避免上一个视图的点透
            nav.on({
                'before-to': showMask,
                'back': showMask,
            });

        }


        //重写 nav.to 方法
        var to = nav.to;

        /**
        * 跳转(或延迟跳转)到指定的视图，并传递一些参数。
        */
        nav.to = function (delay, name, arg0, argN) {

            var args = [].slice.call(arguments);

            //重载 to(name, arg0, argN)
            if (typeof delay == 'string') {
                name = delay;
                delay = false;
            }
            else {
                args = args.slice(1);
            }

            if (delay) {
                setTimeout(function () {
                    to.apply(nav, args);
                }, delay);
            }
            else {
                to.apply(nav, args);
            }
        };

        return nav;
    }


    return {
        create: create,
    };



});

