/**
* Mask 模块的默认配置
* @name Mask.defaults
*/
define('Mask.defaults', /**@lends Mask.defaults*/ {
    /**
    * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
    * 可取值为: true|false|"hide"|"remove"，默认为 false，即不易消失。
    */
    volatile: false,

    /**
    * 组件添加到的容器。
    */
    container: 'body',

    /**
    * 点击时需要用到的事件名。
    */
    eventName: 'click',

    /**
    * 需要持续显示的毫秒数。
    * 指定为 0 或不指定则表示一直显示。
    */
    duration: 0,


    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 不透明度。
    */
    opacity: '',

    /**
    * 组件的 css 样式 z-index 值。
    */
    'z-index': 1024,

    /**
    * 样式集合。
    * 外层的同名字段优先级高于里面的。
    */
    style: {},

});

