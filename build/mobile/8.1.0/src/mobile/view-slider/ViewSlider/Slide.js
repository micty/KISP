
/**
* 滑动返回。
*/
define('ViewSlider/Slide', function (require, module, exports) {
    var Fn = require('Fn');
    var Defaults = require('Defaults');

    var TransitionEnd = module.require('TransitionEnd');
    var Gradient = module.require('Gradient');
    var Touch = module.require('Touch');

    var mapper = new Map();

    var defaults = Defaults.clone(module.parent.id);
    var leftPercent = -defaults.left * 100 + '%';    //
    var time = defaults.time / 1000 + 's';           //



    return {
        /**
        * 绑定视图的滑动返回手势支持。
        *   options = {
        *       args: [],   //可选。 target 视图渲染所需要的参数。 如果该视图尚未渲染，则会先调用 render(...args);
        *       abort: fn,  //可选。 滑动返回中止后要执行的回调函数。
        *       back: fn,   //可选。 滑动返回生效后要执行的回调函数。
        *       done: fn,   //可选。 滑动返回完成时要执行的回调函数。 不管滑动返回是中止还是生效，此函数都会执行。
        *   };
        */
        bind: function (current, target, options) {
            // target <-- current

            var meta = mapper.get(current);

            //已绑定过了，更新参数。
            //仅判断 meta 是不够的，因为 enable() 方法可能会创建一个不带 sid 的。
            if (meta && meta.sid) {
                Object.assign(meta, {
                    'target': target,
                    'args': options.args || meta.args,
                    'abort': options.abort || meta.abort,
                    'back': options.back || meta.back,
                    'done': options.done || meta.done,
                });

                meta.sid = TransitionEnd.bind(current, meta);

                return;
            }

            //针对该视图的的首次绑定。
            var $meta = {
                'sid': '',          //会话 id。 稍候写入。
                'target': target,   //视图模块。
                'disabled': false,  //针对该视图，是否禁用滑动返回。 可以由业务层动态启用或禁用当前视图的滑动返回。

                'args': options.args || [],
                'abort': options.abort || Fn.noop,
                'back': options.back || Fn.noop,
                'done': options.done || Fn.noop,

                'startX': 0,        //开始滑动时的 x 坐标。
                'startY': 0,        //开始滑动时的 y 坐标。
                'deltaX': 0,        //`touchmove` 滑动时当前的 x 坐标与开始时的 x 坐标的差值。
                'clientWidth': 0,   //页面视图的宽度。
                'ready': false,     //记录滑动变换是否已就绪。

                //这两个字段由 `touchend` 事件动态写入。
                'aborted': false,
                'masker': null,
                'masker2': null,

            };

            if (meta) {
                //为了让 enable() 方法中的 meta 与 本方法中的 meta 是同一个引用；
                //以及优先使用 enabled() 中的字段。
                Object.assign(meta, $meta, meta); 
            }
            else {
                meta = $meta;
            }



            mapper.set(current, meta);
            meta.sid = TransitionEnd.bind(current, meta);


            current.$.on('touchstart', function (event) {
                //已禁用。
                if (meta.disabled) {
                    return;
                }

                var touch = event.originalEvent.touches[0];

                meta.startX = touch.pageX;
                meta.startY = touch.pageY;

                //复位。
                meta.deltaX = 0;
                meta.clientWidth = document.body.clientWidth; //页面宽度须每次实时获取，因为它可能发生了变化。

                meta.ready = false;
                meta.aborted = false;
                meta.masker = null;
                meta.masker2 = null;

            });

            //该事件会给频繁触发，要注意控制代码性能。
            current.$.on('touchmove', function (event) {
                //已禁用。
                if (meta.disabled) {
                    return;
                }

                var touch = event.originalEvent.touches[0];
                var deltaX = meta.deltaX = touch.pageX - meta.startX;

                //向左滑，或滑动距离为零。
                if (deltaX <= 0) {
                    return;
                }

                
                if (!meta.ready) {
                    //不管向上滑还是向下滑，都取正值，以确保斜率为正。
                    var k = Gradient.get(touch.pageY, meta.startY, deltaX); //斜率

                    //超过允许的最大斜率。
                    if (k > defaults.gradient) { 
                        return;
                    }

                    meta.ready = true;
                    document.activeElement.blur(); // 关闭输入法

                    Touch.ready(current, meta.target, {
                        'args': meta.args,
                        'leftPercent': leftPercent,
                    });
                }

                Touch.move(current, meta.target, {
                    'left': defaults.left,
                    'mask': defaults.mask,
                    'deltaX': deltaX,
                    'clientWidth': meta.clientWidth,
                });
            });


            current.$.on('touchend', function (event) {
                //尚未就绪，或已禁用。
                if (!meta.ready || meta.disabled) {
                    return;
                }


                meta.ready = false;    //复位。

                //在开始动画之前，设置事件来源。
                //从而区分别的模块的动画事件，确保此次的动画只会执行上面绑定的回调。
                //别的模块针对本元素的动画事件，不会执行上面绑定的回调。
                TransitionEnd.active(current, meta.sid);

                //info = { aborted, masker, masker2, };
                var info = Touch.end(current, meta.target, {
                    'deltaX': meta.deltaX,
                    'mask': defaults.mask,
                    'right': defaults.right,
                    'time': time,
                    'leftPercent': leftPercent,
                    'clientWidth': meta.clientWidth,
                });

                Object.assign(meta, info);
             
            });


        },

        /**
        * 临时启用或禁用某个视图的滑动返回。
        */
        enable: function (view, enabled) {
            //说明是通过 KISP.panel() 或 KISP.view() 定义的，
            //即通过 Panel.define() 或 View.define() 定义的，
            //此时真正的导出对象在 view.module.exports。
            if (view.module) {
                view = view.module.exports;
            }

            var meta = mapper.get(view);

            if (!meta) {
                meta = {};
                mapper.set(view, meta);
            }

            meta.disabled = !enabled; //内部存储的用 disabled;

        },
    };


});

