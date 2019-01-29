
/**
* 两个视图间的跳转动画，包括前进或后退。
*/
define('ViewSlider/Jump', function (require, module, exports) {
    var $String = require('String');
    var Defaults = require('Defaults');
    var TransitionEnd = require('TransitionEnd');
    var Mask = require('Mask');

    //前进或后退的动画过程中锁住视图，防止用户操作。
    var masker = new Mask({
        'opacity': 0,
    });



    function normalize(options) {
        var defaults = Defaults.clone(module.parent.id, options);
        var leftPercent = -defaults.left * 100 + '%';
        var time = defaults.time / 1000 + 's';

        console.log(leftPercent, time);

        return {
            'time': time,
            'leftPercent': leftPercent,
        };
    }


    function animate(view, time, translateX) {
        view.$.css({
            'transform': `translateX(${translateX})`,           //如 `translateX(100%)`。
            'transition': `transform ${time}`,                  //恢复动画。
            '-webkit-transition': `-webkit-transform ${time}`,  //兼容低版本的。
        });
    }


    function zIndex(view1, view3) {
        view1.$.css('z-index', 1);
        view3.$.css('z-index', 3);
    }





    return {
        /**
        * 开始两个视图间的后退动画。
        * 两个视图都从左向向滑动到右边。
        * 初始时，current 视图在屏幕中全部显示； target 视图隐藏在最左边(约 -60% 的位置)。
        * 已重载 back(current, target);        //使用默认配置的动画版。
        * 已重载 back(current, target, {});    //使用指定配置的动画版。
        * 已重载 back(current, target, false); //禁用动画版。
        *   current: M,     //当前视图模块。
        *   target: M,      //目标视图模块。 即要后退回到的视图。
        *   options = {     //可选。
        *       left: 0.6,  //下层视图隐藏在左边的宽度的百分比。
        *       time: 400,  //动画时间，单位 ms。
        *   };
        */
        back: function (current, target, options) {
            options = normalize(options);

            var time = options.time;
            var leftPercent = options.leftPercent;
            var sid = module.id + '.back.' + $String.random();


            document.activeElement.blur(); // 关闭输入法

            //绑定动画结束事件。
            //在同一个模块里，同一个元素只会实际绑定一次。
            TransitionEnd.bind(current, sid, function (event) {
                current.$.removeClass('Shadow');
                current.hide();                      //要触发 hide 事件
            });

            TransitionEnd.bind(target, sid, function (event) {
                target.show();
                masker.hide();
            });

            //设置两个视图的层级关系：
            //          <-- current(3)
            // target(1)
            zIndex(target, current);

            //先把目标视图移到最左端。
            target.$.css({
                'transform': `translateX(${leftPercent})`,  //如 `translateX(-60%)`。
                'transition': 'none',                       //准备工作阶段，先暂时关闭动画。
                '-webkit-transition': 'none',               //兼容低版本的。
            });

            target.show();  //这里要触发 show 事件
            masker.show();



            //为了防止跟上面的产生时间竞争，这里延迟一定时间后再开始动画。
            setTimeout(function () {
                //在开始动画之前，设置事件来源。
                //从而区分别的模块的动画事件，确保此次的动画只会执行上面绑定的回调。
                //别的模块针对本元素的动画事件，不会执行上面绑定的回调。
                TransitionEnd.active(current, sid);
                TransitionEnd.active(target, sid);

                current.$.addClass('Shadow');

                animate(current, time, '100%');
                animate(target, time, '0px');


            }, 50);
        },

        /**
        * 开始两个视图间的前进动画。
        * 两个视图都从右向左滑动到左边。
        * 初始时，current 视图在屏幕中全部显示； target 视图隐藏在最右边。
        * 滑动过程中，current 和 target 都向左滑动，
        * 但 target 的速度比 current 的要快且层级在上面，从而产生部分的重叠效果。
        * 已重载 forward(current, target);        //使用默认配置的动画版。
        * 已重载 forward(current, target, {});    //使用指定配置的动画版。
        * 已重载 forward(current, target, false); //禁用动画版。
        *   current: M,     //当前视图模块。
        *   target: M,      //目标视图模块。 即要后退回到的视图。
        *   options = {     //可选。 
        *       left: 0.6,  //下层视图隐藏在左边的宽度的百分比。
        *       time: 400,  //动画时间，单位 ms。
        *   };
        */
        forward: function (current, target, options) {
            options = normalize(options);

            var time = options.time;
            var leftPercent = options.leftPercent;
            var sid = module.id + '.forward.' + $String.random();

            document.activeElement.blur(); // 关闭输入法

            //绑定动画结束事件。
            //在同一个模块里，同一个元素只会实际绑定一次。
            TransitionEnd.bind(current, sid, function (event) {
                current.hide();
            });

            TransitionEnd.bind(target, sid, function (event) {
                masker.hide();
            });


        
            //设置两个视图的层级关系：
            //              target(3)
            //current(1) --> 
            zIndex(current, target);


            //先把目标视图移到最右端。
            target.$.css({
                'transform': 'translateX(100%)',
                'transition': 'none',               //准备工作阶段，先暂时关闭动画。
                '-webkit-transition': 'none',       //兼容低版本的。
            });

            target.$.show();

            masker.show();


            //为了防止跟上面的产生时间竞争，这里延迟一定时间后再开始动画。
            setTimeout(function () {
                //在触发动画结束事件之前，设置视图要激活的会话。
                //从而可以在动画结束事件回调里仅执行该会话相关的回调函数。
                TransitionEnd.active(target, sid);
                TransitionEnd.active(current, sid);

                target.$.addClass('Shadow');

                animate(target, time, '0px');           
                animate(current, time, leftPercent);

            }, 50);
        },

    };


});

