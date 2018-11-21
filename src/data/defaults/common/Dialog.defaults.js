/**
* Dialog 模块的默认配置
* @name Dialog.defaults
*/
define('Dialog.defaults', /**@lends Dialog.defaults*/ {

    /**
    * 组件添加到的容器。
    * 默认为 document.body。
    */
    container: 'body',

    /**
    * 是否启用 mask 层。
    */
    mask: true,

    /**
    * 点击按钮后是否自动关闭组件。
    * 可取值为: true|false，默认为 true，即自动关闭。
    */
    autoClose: true,

    /**
    * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
    * 可取值为: true|false，默认为不易消失。
    */
    volatile: false,

    /**
    * 组件的标题文本。
    */
    title: '',

    /**
    * 组件的内容文本。
    */
    content: '',

    /**
    * 点击按钮时需要用到的事件名。
    */
    eventName: 'click',

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 组件的 css 样式 z-index 值。
    */
    'z-index': 1024,

    /**
    * 组件宽度。
    * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
    */
    width: '80%',

    /**
    * 组件高度。
    * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
    */
    height: '50%',

    /**
    * 样式集合。
    * 外层里面的同名字段优先级高于里面的。
    */
    style: {},

    /**
    * 按钮数组。
    */
    buttons: [],


});

