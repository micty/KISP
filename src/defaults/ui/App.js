/**
* App 模块的默认配置
* @name App.defaults
*/
define('App.defaults', /**@lends App.defaults*/ {
    mask: {
        opacity: 0,
        duration: 500,
        'z-index': 99999,
    },

    animated: true,

    slide: {
        left: 0.75,     //下层视图隐藏在左边的宽度的百分比。
        right: 0.25,    //向右滑动的距离超过该值并松开滑动后才会触发滑动后退。
        k: 0.6,         //斜率
        time: 300,      //动画时间，单位 ms
        mask: 0.4,      //遮罩层的不透明度。
    },
});

