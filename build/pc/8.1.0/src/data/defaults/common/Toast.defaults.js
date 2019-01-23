/**
* Toast 模块的默认配置
* @name Toast.defaults
*/
define('Toast.defaults', /**@lends Toast.defaults*/ {
    
    /**
    * 提示文本。
    */
    text: '',

    /**
    * 组件添加到的容器。
    * 默认为 document.body。
    */
    container: 'body',

    /**
    * 是否启用 mask 层。
    */
    mask: false,


    /**
    * 用到的 font-awsome 的图标。
    */
    icon: 'check',

    /**
    * 显示的持续时间(毫秒)。
    * 0 表示一直显示。
    */
    duration: 0,

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 组件的 css 样式 z-index 值。
    * 为了给其它组件计算 `z-index`，此处需要显式提供一个值。
    * 因为仅用 css 中的会比较麻烦。
    */
    'z-index': 1024,

    /**
    * 组件宽度。
    * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
    */
    width: '',

    /**
    * 组件高度。
    * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
    */
    height: '',

    /**
    * 样式集合。
    * 外层的同名字段优先级高于里面的。
    */
    style: {},

});

