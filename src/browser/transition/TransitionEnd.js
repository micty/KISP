
/**
* 针对各浏览器的动画结束事件。
* 此模块主要提供：
* 1，给多个不同的模块针对同一个 DOM 元素多次绑定动画结束事件。
*    同一个模块中对同一个元素的多次绑定，实际只会绑定一次。
* 2，在触发一个元素的动画结束事件之前，可以设置该元素的事件来源以进行标识。
*    从区分开第 1 点中的多个不同的绑定，只有触发源与绑定源相一致时，才会执行相应的回调。
*/
define('TransitionEnd', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var Data = module.require('Data');
    var EventName = module.require('EventName');

    
    var transitionend = '';


    return {
        /**
        * 绑定指定视图的 css 动画结束事件。
        *   view: M,        //视图模块。
        *   sid: '',        //此次绑定所关联的会话 id。 
        *   fn: function,   //要绑定的回调函数。
        */
        bind: function (view, sid, fn) {
            var data = Data.get(view); // data = { binded: false, sid: '',  sid$fn: {}, };
            var sid$fn = data.sid$fn;

            //添加到回调映射集里。
            sid$fn[sid] = fn;  

            //该视图已绑定过了。
            if (data.binded) {
                return;
            }
            
            //首次绑定。
            data.binded = true;
            transitionend = transitionend || EventName.get();

            //绑定动画结束事件。
            view.$.on(transitionend, function (event) {
                //忽略掉视图内部的子节点冒泡上来的动画结束事件。 
                if (event.target !== this) {
                    return;
                }


                var sid = data.sid;     //当前激活的会话 id。
                var fn = sid$fn[sid];   //取出相应的回调。

                if (!fn) {
                    return;
                }

                console.log(sid, view);

                delete sid$fn[sid];     //一次性的，删除。
                fn.call(this, event);
            });
        },

        /**
        * 在触发动画结束事件之前，设置要激活的会话。
        * 从而可以在动画结束事件回调里仅执行该会话相关的回调函数。
        */
        active: function (view, sid) {
            var data = Data.get(view);

            data.sid = sid;

        },
    };


});

