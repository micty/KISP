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

    /**
    * 是否启用滚动器。 
    * 如果设置为 false，则在创建实例后会自动调用 scroller.disable(); 
    * 后续必须手动调用 scroller.enable() 以启用。
    */
    enabled: true,

});

