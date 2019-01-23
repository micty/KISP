/**
* Scroller 模块的默认配置
* @name Scroller.defaults
*/
define('Scroller.defaults', /**@lends Scroller.defaults*/ {
    /**
    * 是否显示滚动条。 
    * 取值为 true|false。
    */
    scrollbars: true,           //

    /**
    * shrinkScrollbars。
    */
    shrinkScrollbars: 'scale',  //

    /**
    * preventDefault。
    * 取值为 true|false。
    */
    preventDefault: false,      //默认为 true

    /**
    * probeType。
    * 设置了此值，scroll 事件才会触发，可取的值为 1，2，3
    */
    probeType: 2,

    //支持的样式
    //'top': 0,
    //'left': 0,
    //'right': 0,
    //'bottom': 0,
    //'width': '100%',


    pulldown: {
        min: 35,
        max: 85,
        top: 10,
        release: 50,
        translateY: -40,

        tips: {
            start: '↓ 下拉刷新',
            reach: '↑ 释放立即刷新',
            loading: '加载中...',
            success: '√ 刷新成功',
        },

        load: null,
    },

    pullup: {
        min: 35,
        max: 85,
        bottom: 10,
        release: 50,
        translateY: 40,
        lastPage: false,

        tips: {
            start: '↑ 上拉加载更多',
            reach: '↓ 释放立即加载',
            loading: '加载中...',
            lastPage: '已是最后一页',
        },

        load: null,
    },

});

