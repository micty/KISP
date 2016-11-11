
/**
* 监听下拉或上拉动作。
*/
define('Scroller/pull', function (require, module,  exports) {

    var $ = require('$');


    return function (meta) {

        //state 采用 3 bit 来表示 2-1-0，最多只有一个位为 1， 因此有 000、001、010、100 四种情况。
        //即对应的值为 0、1、2、4，采用与操作即可判断第几位为 1，这样可提高 scroll 中函数的性能。
        var state = 0;

        var isUp = false;
        var name = 'pulldown';
        var min = 0;
        var max = 0;

        var emitter = meta.emitter;
        var scroller = meta.scroller;

        scroller.on('scrollStart', function () {
            state = 0;

            var directionY = this.directionY;
            var distY = this.distY;

            //当 directionY 为 0 时，判断 distY; 
            //否则直接判断 directionY，1: 下拉;  -1: 下拉
            isUp = directionY == 0 ? distY < 0 : directionY > 0;

            name = isUp ? 'pullup' : 'pulldown';
            this.isWaitingForManualReset = false;

            //根据拉动的方向，重新设置正确的环境变量
            if (isUp) {
                // 上拉时 maxScrollY 可能发生了变化，比如上拉加载更多，
                // 填充了更多的数据，需要重新计算
                var maxScrollY = scroller.maxScrollY; //负值
                var pullup = meta.pullup;
                min = pullup.min - maxScrollY; //正值
                max = pullup.max - maxScrollY; //正值
            }
            else {
                var pulldown = meta.pulldown;
                min = pulldown.min; //正值
                max = pulldown.max; //正值
            }
            
        });


        //该事件会给频繁触发，要注意性能控制
        scroller.on('scroll', function () {

            var y = this.y;

            if (isUp) {
                y = -y; //取成正值，容易理解
            }

            if (y < min) {  //( , min)
                if ((state & 1) == 0) {     // xx0
                    state = 1;              // 001
                    emitter.fire(name, 'start');
                }
            }
            else if (min <= y && y < max) { //[min, max]
                if ((state & 2) == 0) {     // x0x
                    state = 2;              // 010
                    emitter.fire(name, 'enter');
                }
            }
            else if (y >= max) { // [max, )
                if ((state & 4) == 0) {     // 0xx
                    state = 4;              // 100
                    emitter.fire(name, 'reach');
                }
            }
        });

        scroller.on('beforeScrollEnd', function () {

            if ((state & 4) == 4) { // 1xx
                this.isWaitingForManualReset = true;
                emitter.fire(name, 'release');
            }
            else {
                emitter.fire(name, 'start');
            }
        });

    };


});


