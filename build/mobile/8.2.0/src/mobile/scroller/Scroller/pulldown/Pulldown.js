
/**
* 简单的下拉刷新。
*/
define('Scroller/Pulldown', function (require, module, exports) {
    var Indicator = module.require('Indicator');
    var Loading = module.require('Loading');




    return {
        bind: function (meta) {
            var opt = meta.pulldown;

            if (!opt.load || !opt.enabled || opt.binded) {
                return;
            }


            var tips = opt.tips;
            var isLoading = false;

            var indicator = Indicator.create({
                'container': meta.container,
                'translateY': opt.translateY,
            });

            var loading = Loading.create({
                'container': meta.container,
                'top': opt.top,
                'text': tips.loading,
            });


            opt.binded = true;


            //上拉时，把下拉的提示隐藏。
            meta.this.on('pullup', {
                'start': function () {
                    loading.hide();
                    indicator.hide();
                },
            });


            meta.this.on('pulldown', {

                //让指示器跟着拉动位置，实现一种从上往下拉出来的效果。
                'scroll': function (y, scroller) {
                    var dy = y + opt.translateY;

                    dy = Math.min(dy, 10);

                    indicator.$.css({
                        'transform': `translateY(${dy}px)`,
                    });
                },

                'start': function () {
                    if (isLoading) {
                        return;
                    }

                    loading.hide();
                    indicator.show();
                    indicator.$.html(tips.start);
                },

                'enter': function () {
                    if (isLoading) {
                        loading.show();
                    }
                },

                'reach': function () {
                    if (isLoading) {
                        return;
                    }

                    indicator.$.html(tips.reach);
                },

                'cancel': function () {
                    loading.hide();

                    indicator.$.css({
                        'transform': `translateY(${opt.translateY}px)`,
                    });
                },

                'release': function () {
                    meta.this.to(opt.release);  //回弹到指定的位置。


                    if (isLoading) {
                        return;
                    }


                    isLoading = true;
                    loading.show();
                    indicator.hide();

                    //回调函数作为 done，传给使用者，必须显式调用一次以通知 load 结束。
                    opt.load(function () {
                        isLoading = false;
                        loading.hide();

                        indicator.$.html(tips.success);
                        indicator.show();

                        setTimeout(function () { //reset
                            indicator.hide();
                            indicator.$.html(tips.start);
                            meta.this.reset();

                        }, 500);
                    });
                },
            });


        },


    };




});


