
/**
* 触摸手势。
*/
define('ViewSlider/Slide/Touch', function (require, module, exports) {
    var Mask = require('Mask');

    //在两个视图中间的遮罩层，动画结束后隐藏。
    //用于产生随 touchmove 的明暗变化效果。
    var masker = new Mask({
        'z-index': 2,       //源视图和目标视图分别为3 和 1。
        'fadeIn': false,    //禁用淡入。
        'fadeOut': false,   //禁用淡出。
    });

    //在两个视图上面的遮罩层，动画结束后隐藏。
    //用于 touchend 后在动画过程中锁住视图，防止用户操作。
    var masker2 = new Mask({
        'z-index': 4,
        'opacity': 0,
        'fadeIn': false,    //禁用淡入。
        'fadeOut': false,   //禁用淡出。
    });

    //关闭动画效果的样式。
    var none = {
        'transition': 'none',
        '-webkit-transition': 'none',  //兼容低版本的。
    };

    //给指定的视图产生平移动画。
    function animate(view, time, translateX) {
        view.$.css({
            'transform': `translateX(${translateX})`,           //如 `translateX(100%)`。
            'transition': `transform ${time}`,                  //恢复动画。
            '-webkit-transition': `-webkit-transform ${time}`,  //兼容低版本的。
        });
    }


    return {
        /**
        * 在滑动开始前做一些准备工作。
        *   options = {
        *       leftPercent: '60%', //下层视图隐藏在左边的宽度的百分比。
        *       args: [],           //target 视图渲染所需要的参数。
        *   };
        */
        ready: function (current, target, options) {
            var rendered = target.rendered();
            var args = options.args || [];

            //目标视图可能还没渲染。
            //比如在 current 视图时刷新了浏览器，则所有其它视图都会变成尚未渲染。
            if (!rendered) {
                target.render(...args);
            }

            masker.render();

            //设置相对层级。
            //         <-- current(3)
            //     masker(2)
            // target(1)
            current.$.css('z-index', 3);
            target.$.css('z-index', 1);

            //先全部关闭动画。
            current.$.css(none);
            masker.$.css(none);
            target.$.css(none);

            current.$.addClass('Shadow');
            target.$.css('transform', `translateX(${options.leftPercent})`);  //先隐藏到左边的位置。

            target.show();  //这里要触发 show 事件。
            masker.show();
        },

        /**
        * 滑动过程中产生变化效果。
        * 该函数会给频繁调用，要注意控制代码性能。
        *   options = {
        *       left: 0.6,          //下层视图隐藏在左边的宽度的百分比。
        *       mask: 0.1,          //遮罩层的不透明度。
        *       deltaX: 100,        //在 x 方向产生的位移。
        *       clientWidth: 0,     //页面视图的宽度。
        *   };
        */
        move: function (current, target, options) {
            var deltaX = options.deltaX;
            var left = options.left;
            var mask = options.mask;
            var clientWidth = options.clientWidth;

            var opacity = mask * (1 - 2 * deltaX / clientWidth);    //让遮罩层的不透明度跟着变化。
            var x = (deltaX - clientWidth) * left;                  //让 target 跟着 current 移动，但移动的速度要比 current 慢。
           
            opacity = Math.max(opacity, 0); //不透明度不能小于 0。
            x = Math.min(x, 0);             //不能大于 0，否则左边就会给移过头而出现空白。


            current.$.css('transform', `translateX(${deltaX}px)`);
            masker.$.css('opacity', opacity);
            target.$.css('transform', `translateX(${x}px)`);

        },

        /**
        * 滑动结束后的效果。
        *   options = {
        *       deltaX: 100,        //在 x 方向产生的位移。
        *       mask: 0.1,          //遮罩层的不透明度。
        *       right: 0.25,        //向右滑动的距离超过该值并松开滑动后才会触发滑动后退。
        *       time: '0.4s',       //动画时间。
        *       leftPercent: '60%', //下层视图隐藏在左边的宽度的百分比。
        *       clientWidth: 0,     //页面视图的宽度。
        *   };
        */
        end: function (current, target, options) {
            var right = options.right;
            var clientWidth = options.clientWidth;


            if (right < 1) { //是小数，则当成百分比。
                right = clientWidth * right;
            }

            var aborted = options.deltaX < right;           //水平滑动距离小于指定值，中止。
            var mask = options.mask;                        //
            var leftPercent = options.leftPercent;          //
            var time = options.time;


            masker.$.css({
                'opacity': aborted ? mask : 0,      //如果滑动生效，则渐变到 0。 否则恢复到滑动之前的。
                'transition': `opacity ${time}`,    //恢复动画。
            });

            masker2.show();
      

            animate(current, time, aborted ? 0 : '100%');
            animate(target, time, aborted ? leftPercent : 0);


            return {
                'aborted': aborted,
                'masker': masker,
                'masker2': masker2,
            };

        },
    };


});

