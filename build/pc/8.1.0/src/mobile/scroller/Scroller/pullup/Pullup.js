
/**
* 简单的上拉加载更多。
*/
define('Scroller/Pullup', function (require, module, exports) {
    var Indicator = module.require('Indicator');
    var Loading = module.require('Loading');




    return {
        bind: function (meta) {
            var opt = meta.pullup;

            if (!opt.load || !opt.enabled || opt.binded) {
                return;
            }



            var isLoading = false;  //是否正在加载中。
            var tips = opt.tips;    //提示语集合。

            var indicator = Indicator.create({
                'container': meta.container,
                'translateY': opt.translateY,
            });

            var loading = Loading.create({
                'container': meta.container,
                'text': tips.loading,
                'bottom': opt.bottom,
            });


            opt.binded = true;


            //下拉时，把上拉的提示隐藏。
            meta.this.on('pulldown', {
                'start': function () {
                    loading.hide();
                    indicator.hide();
                },
            });




            meta.this.on('pullup', {

                'scroll': function (y, scroller) {
                    var maxScrollY = scroller.maxScrollY;   //负数。
                    var dy = -(y + maxScrollY) + opt.translateY;

                    dy = Math.max(dy, -opt.bottom);

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

                    if (opt.lastPage) {
                        indicator.$.html(tips.lastPage);
                    }
                    else {
                        indicator.$.html(tips.start);
                    }
                },

                'enter': function () {
                    if (isLoading) {
                        loading.show();
                    }
                },

                'reach': function () {
                    if (opt.lastPage || isLoading) {
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
                    //最后一页。
                    if (opt.lastPage) {
                        loading.hide();
                        indicator.hide();
                        meta.this.reset();
                        return;
                    }


                    meta.this.toBottom(opt.release); //回弹到指定的位置。

                    if (isLoading) {
                        return;
                    }



                    loading.show();
                    indicator.hide();
                    isLoading = true;

                    opt.load(function () {
                        isLoading = false;

                        loading.hide();
                        meta.this.reset();
                    });
                },
            });


        },


    };




});


