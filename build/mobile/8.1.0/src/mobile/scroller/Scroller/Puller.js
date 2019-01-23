
/**
* 底层的监听上拉和下拉动作。
*/
define('Scroller/Puller', function (require, module, exports) {


    return {
        bind: function (meta) {
            var puller = meta.puller;
            var scroller = meta.scroller;
            var pulldown = meta.pulldown;
            var pullup = meta.pullup;
            var enabled = pulldown.enabled || pullup.enabled;


            //尚未渲染，或已绑定。
            if (!scroller || !enabled || puller.binded) {
                return;
            }

            puller.binded = true;



            //state 采用 3 个 bit 来表示 2-1-0，最多只有一个位为 1。 
            //因此有 `000`、`001`、`010`、`100` 四种情况。
            //即对应的值为 0、1、2、4，采用 `与` 操作即可判断第几位为 1，
            //这样可提高 scroll 中函数的性能。
            var state = 0;

            var isUp = false;       //
            var name = '';          // `pulldown` 或 `pullup`。
            var min = 0;
            var max = 0;
            


            scroller.on('scrollStart', function () {
                var directionY = this.directionY;
                var distY = this.distY;

                //当 directionY 为 0 时，判断 distY。
                //否则直接判断 directionY，1: 下拉； -1: 上拉。
                isUp = directionY == 0 ? distY < 0 : directionY > 0;
                name = isUp ? 'pullup' : 'pulldown';
                state = 0;
                scroller.isWaitingForManualReset = false;


                //根据拉动的方向，重新设置正确的环境变量。
                if (isUp) {
                    //上拉时 maxScrollY 可能发生了变化，比如上拉加载更多，
                    //填充了更多的数据，需要重新计算。
                    min = pullup.min - this.maxScrollY; //正值
                    max = pullup.max - this.maxScrollY; //正值
                }
                else {
                    min = pulldown.min; //正值
                    max = pulldown.max; //正值
                }
            });


            //该事件会给频繁触发，要注意性能控制。
            scroller.on('scroll', function () {
                var y = this.y;

                if (isUp) {
                    y = -y; //取成正值，容易理解
                }

                meta.emitter.fire(name, 'scroll', [y, this]);


                if (y < min) {  //( , min)
                    if ((state & 1) == 0) {     // xx0
                        state = 1;              // 001
                        meta.emitter.fire(name, 'start');
                    }
                }
                else if (min <= y && y < max) { //[min, max]
                    if ((state & 2) == 0) {     // x0x
                        state = 2;              // 010
                        meta.emitter.fire(name, 'enter');
                    }
                }
                else if (y >= max) { // [max, )
                    if ((state & 4) == 0) {     // 0xx
                        state = 4;              // 100
                        meta.emitter.fire(name, 'reach');
                    }
                }
            });

            scroller.on('beforeScrollEnd', function () {
                if ((state & 4) == 4) { // 1xx
                    //根据方向启用 hold 住不让 reset。
                    scroller.isWaitingForManualReset = isUp ? pullup.enabled : pulldown.enabled;
                    meta.emitter.fire(name, 'release');
                }
                else {
                    meta.emitter.fire(name, 'cancel');
                }
            });
        },


    };




});


