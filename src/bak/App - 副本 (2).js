
/**
* App 启动类
* @class
* @name App
*/
define('App', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Config = require('Config');

    var Nav = module.require('Nav');

    var mapper = new Mapper();


    /**
    * 构造器。
    * @constructor
    */
    function App(name, config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var meta = {
            'name': name,
            'mask': config.mask,
            'animated': config.animated,
            'slide': config.slide,
        };

        mapper.set(this, meta);


    }



    App.prototype = /**@lends App#*/ {
        constructor: App,

        /**
        * 初始化执行环境，并启动应用程序。
        * 该方法会预先定义一些公共模块，然后定义一个指定的(或匿名)模块并启动它。
        * @param {function} factory 工厂函数，即启动函数。
        */
        init: function (factory) {

            var $ = require('jquery-plugin/touch') || require('$'); //
            var MiniQuery = require('MiniQuery');
            var KISP = require('KISP');
            var Module = require('Module');

            var define = Module.define;

            define('$', function () {
                return $;
            });

            define('MiniQuery', function () {
                return MiniQuery;
            });

            define('KISP', function () {
                return KISP;
            });

            var meta = mapper.get(this);
            var name = meta.name;

            define(name, factory);
            Module.require(name); //启动
        },

        /**
        * 使用普通版来启动应用。
        */
        normal: function (factory) {

            this.init(function (require, module) {

                
                var nav = Nav.create(meta.mask);

                //后退时触发
                nav.on('back', function (current, target) {
                    document.activeElement.blur(); // 关闭输入法
                    current = module.require(current);
                    target = module.require(target);
                    current.hide();
                    target.show();
                });

                //跳转到目标视图之前触发，先隐藏当前视图
                nav.on('before-to', function (current, target) {
                    current = module.require(current);
                    current.hide();
                });

                //统一绑定视图跳转动作，在调用 nav.to(...) 时会给触发
                nav.on('to', function (name, arg0, arg1, argN) {
                    var args = [].slice.call(arguments, 1);
                    var M = module.require(name);
                    M.render.apply(M, args);
                });

                factory && factory(require, module, nav);
            });

        },

        /**
        * 使用动画版来启动应用。
        */
        animate: function (factory) {

            var Mask = require('Mask');
            var Transition = module.require('Transition');

            var meta = mapper.get(this);

            this.init(function (require, module) {

                var view$bind = {}; //记录目标视图是否已绑定了 transitionend 事件。
                var eventName = Transition.getEventName();
                var mask = new Mask();
                var nav = Nav.create();

                var slide = {
                    view$bind: {},
                    enabled: false,     //记录是否触发了滑动后退。
                    aborted: false,     //记录是否取消了滑动后退。

                };


                //绑定滑动返回。 跳转到目标视图之前触发。
                nav.on('before-to', function (current, target) {
                    if (slide.view$bind[target]) {
                        return;
                    }

                    slide.view$bind[target] = true;
                    current = module.require(current);
                    target = module.require(target);

                    var maxK = meta.slide.k; //允许的最大斜率。
                    var clientWidth = document.body.clientWidth;
                    var k = 0;          //滑动的斜率。
                    var startX = 0;     //开始滑动时的 x 坐标。
                    var startY = 0;     //开始滑动时的 y 坐标。
                    var deltaX = 0;     //当前的 x 坐标与开始时的 x 坐标的差值。
                    var hasTranslated = false;  //记录是否已发生了滑动变换。

                    var slideWidth = meta.slide.width;
                    if (slideWidth < 1) { //是小数，则当成百分比。
                        slideWidth = clientWidth * slideWidth;
                    }


                    target.$.on({
                        'touchstart': function (event) {
                            var touch = event.originalEvent.touches[0];

                            //复位。
                            k = 0;
                            deltaX = 0;
                            hasTranslated = false;
                            slide.enabled = false;
                            slide.aborted = false;

                            startX = touch.pageX;
                            startY = touch.pageY;
                        },
                        'touchmove': function (event) {
                            var touch = event.originalEvent.touches[0];
                            deltaX = touch.pageX - startX;

                            if (deltaX <= 0) {   //向左滑，或滑动距离为零。
                                return;
                            }

                            //不管向上滑还是向下滑，都取正值，以确保斜率为正。
                            var deltaY = Math.abs(touch.pageY - startY);
                            k = deltaY / deltaX; //斜率


                            if (!hasTranslated) {
                                if (k > maxK) {
                                    return;
                                }

                                current.$.css({ 'z-index': 1, });   //当前视图为 1
                                //mask.$.css({ 'z-index': 2, });    //遮罩层的为 2，已在 css 里固定写死。
                                target.$.css({ 'z-index': 3, });    //目标视图为 3

                                target.$.css('transition', 'none'); //先关闭动画。

                                current.show(); //这里要触发 show 事件。
                                mask.$.show();

                                mask.$.css({
                                    'z-index': 2,
                                    'transition': 'none',   //关闭动画。
                                });

                                current.$.css({
                                    'transition': 'none',               //先关闭动画。
                                    'transform': 'translateX(-75%)',    //先隐藏到左边 75% 的位置。
                                });

                                mask.$.removeClass('BeforeForward Forward BeforeBack Back');
                                hasTranslated = true;
                            }

                            //让遮罩层的透明度跟着变化。
                            var opacity = 0.4 * (1 - deltaX / clientWidth);
                            mask.$.css('opacity', opacity);
                            target.$.css('transform', 'translateX(' + deltaX + 'px)');

                            var x = clientWidth * (-0.75) + deltaX * 0.8;
                            current.$.css('transform', 'translateX(' + x + 'px)');

                        },
                        'touchend': function (event) {

                            if (!hasTranslated) {
                                return;
                            }

                            hasTranslated = false;  //复位。
                            slide.enabled = true;   //指示滑动已生效，用于通知 css 动画结束函数。

                            //水平滑动距离小于指定值，或滑动斜率大于指定值，都中止。
                            var aborted = slide.aborted = deltaX < slideWidth || k > maxK;
                            var translateX = aborted ? 0 : '100%';

                            if (!aborted) { //滑动后退生效。
                                nav.back();

                                mask.$.css({
                                    'opacity': 0,
                                    'transition': 'opacity 0.5s',   //恢复动画。
                                });

                            }

                            target.$.removeClass('Forward');
                            target.$.css({
                                'transition': 'transform 0.5s',     //恢复动画。
                                'transform': 'translateX(' + translateX + ')',
                            });

                            current.$.data('animated', false);      //暂时关闭动画。
                            current.$.css({
                                'transition': 'transform 0.5s',     //恢复动画。
                                'transform': 'translateX(' + (aborted ? '-75%' : 0) + ')',
                            });

                        },
                    });

                });

                //跳转到目标视图之前触发
                nav.on('before-to', function (current, target) {
                    current = module.require(current);
                    target = module.require(target);

                    current.$.css({ 'z-index': 1, });   //当前视图为 1
                    //mask.$.css({ 'z-index': 2, });    //遮罩层的为 2，已在 css 里固定写死。
                    target.$.css({ 'z-index': 3, });    //目标视图为 3

                    target.$.addClass('BeforeForward'); //先把目标视图移到最右端。
                    target.$.removeClass('Back');
                    target.$.show();

                    mask.$.removeClass('BeforeBack Back Forward')
                    mask.$.addClass('BeforeForward');   //先完全变透明
                    mask.$.show();

                    //为了防止跟上面的产生时间竞争，这里延迟一定时间后再开始动画。
                    setTimeout(function () {
                        mask.$.addClass('Forward');
                        target.$.addClass('Forward');
                    }, 50);

                });



                //跳转到目标视图之前触发
                nav.on('before-to', function (current, target) {
                    if (view$bind[target]) {
                        return;
                    }

                    //首次绑定
                    view$bind[target] = true;
                    current = module.require(current);
                    target = module.require(target);

                    // css 动画结束后执行
                    target.$.on(eventName, function () {

                        var animated = target.$.data('animated');
                        target.$.data('animated', true);    //恢复使用动画。

                        if (animated === false) {           //明确指定了不使用动画。
                            return;
                        }



                        if (slide.enabled) { //说明是滑动后退触发的
                            if (slide.aborted) {
                                target.$.addClass('Forward');
                                current.hide(); //在滑动过程中已给显示出来了，这里要重新隐藏。
                                current.$.css('transform', 'translateX(0)'); //为下次常规后退作准备。
                            }
                            else {
                                target.hide();  //要触发 hide 事件
                            }

                            //不管是否中断了滑动后退，都要重置。 否则会影响到常规的后退。
                            target.$.css('transition', '');
                            target.$.css('transform', '');
                            slide.enabled = false;              //复位。
                        }
                        else { //常规后退触发的。
                            if (target.$.hasClass('Forward')) {     //前进
                                current.hide();                     //要触发 hide 事件
                            }
                            else if (target.$.hasClass('Back')) {   //后退
                                target.hide();                      //要触发 hide 事件
                            }
                        }

                        mask.$.hide();  //动画结束后，隐藏遮罩层。
                    });

                });


                //后退时触发
                nav.on('back', function (current, target) {

                    if (slide.enabled) { //是由滑动导致的返回，忽略掉。
                        return;
                    }

                    document.activeElement.blur(); // 关闭输入法

                    current = module.require(current);
                    target = module.require(target);

                    target.$.css({ 'z-index': 1, });    //目标视图为 1
                    //mask.$.css({ 'z-index': 2, });    //遮罩层的为 2，已在 css 里固定写死。
                    current.$.css({ 'z-index': 3, });   //当前视图为 3

                    target.show();  //这里要触发 show 事件

                    current.$.removeClass('Forward');   //还有一个 BeforeForward 在里面，确保在最右边躲着。
                    current.$.addClass('Back');         //立即添加动画

                    //先把遮罩层恢复为半透明，并且关闭动画。
                    mask.$.removeClass('BeforeForward Forward Back');
                    mask.$.addClass('BeforeBack');
                    mask.$.show();

                    //为了防止跟上面的产生时间竞争，这里延迟一定时间后再开始动画。
                    setTimeout(function () {
                        mask.$.addClass('Back');    //让遮罩层动画变到完全透明。
                    }, 50);

                });

                //统一绑定视图跳转动作，在调用 nav.to('...') 时会给触发
                nav.on('to', function (name, arg0, arg1, argN) {
                    var args = [].slice.call(arguments, 1);
                    var target = module.require(name);
                    target.render.apply(target, args);

                });


                mask.render();
                factory && factory(require, module, nav);

            });
        },



        /**
        * 初始化执行环境，创建导航管理器和相应的 UI 组件，并启动应用程序。
        * @param {function} factory 工厂函数，即启动函数。
        */
        launch: function (factory) {
            var meta = mapper.get(this);
           
            if (meta.animated) {
                this.animate(factory); //使用动画
            }
            else {
                this.normal(factory);    //不使用动画
            }
        },

     

    };


    return App;

});

