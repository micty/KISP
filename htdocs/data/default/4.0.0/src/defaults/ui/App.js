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
        width: 0.25,    //向右滑动的距离超过该值并松开滑动后才会触发滑动后退。
        k: 0.6,         //斜率
        time: 300,      //过渡时间，单位ms
    },
});

