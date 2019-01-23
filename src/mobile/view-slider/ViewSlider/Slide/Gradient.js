
/**
* 斜率。
*/
define('ViewSlider/Slide/Gradient', function (require, module, exports) {


    return {
        /**
        * 计算滑动的绝对斜率。
        * 不管向上滑还是向下滑，都取正值，以确保斜率为正。
        */
        get: function (y0, y1, dx) {
            var dy = y0 - y1;
            var k = dy / dx;

            return Math.abs(k);
        },
    };


});

