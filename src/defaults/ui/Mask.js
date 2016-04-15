/**
* Mask 模块的默认配置
* @name Mask.defaults
*/
define('Mask.defaults', /**@lends Mask.defaults*/ {
    
    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-Mask-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    /**
    * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
    * 可取值为: true|false|"hide"|"remove"，默认为 false，即不易消失。
    */
    volatile: false,

    /**
    * 组件添加到的容器。
    * 默认为 document.body。
    */
    container: document.body,

    /**
    * 把组件添加到容器的方式，是否使用追加的方式。
    * 默认用 prepend 的方式。
    */
    append: false,

    /**
    * 点击时需要用到的事件名。
    * 针对移动端的是虚拟事件 'touch'。
    */
    eventName: 'touch',

    /**
    * 需要持续显示的毫秒数。
    * 指定为 0 或不指定则表示一直显示。
    */
    duration: 0,

    /**
    * 组件的 css 样式 z-index 值。
    */
    'top': 0,

    /**
    * 组件的 css 样式 bottom 值。
    */
    'bottom': 0,

    /**
    * 组件的 css 样式 opacity 值。
    */
    'opacity': 0.5,

    /**
    * 组件的 css 样式 background 值。
    */
    'background': '#000',

    /**
    * 组件的 css 样式 z-index 值。
    */
    'z-index': 1024,
});

