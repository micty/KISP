/**
* Dialog 模块的默认配置
* @name Dialog.config
*/
define('Dialog.config', /**@lends Dialog.config*/ {
    /**
    * 内容区是否可滚动。
    * PC 端用不可滚动。
    */
    scrollable: false,

    /**
    * 针对滚动器的配置。
    * PC 端。
    */
    scroller: null,

    /**
    * 点击按钮时需要用到的事件名。
    * PC 端。
    */
    eventName: 'click',

    //PC 端的用 fixed定位。
    position: 'fixed',
});

