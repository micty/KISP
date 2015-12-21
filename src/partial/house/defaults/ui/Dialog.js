/**
* Dialog 模块的默认配置
* @name Dialog.defaults
*/
define('Dialog.defaults', /**@lends Dialog.defaults*/ {

    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-Dialog-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    /**
    * 是否启用 mask 层。
    */
    mask: true,

    /**
    * 内容区是否可滚动。
    * PC 端用不可滚动。
    */
    scrollable: false,

    /**
    * 针对滚动器的配置。
    */
    scroller: null,

    /**
    * 点击按钮后是否自动关闭组件。
    * 可取值为: true|false，默认为 true，即自动关闭。
    */
    autoClosed: true,

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
    text: '',

    /**
    * 组件的 css 样式 z-index 值。
    */
    'z-index': 1024,

    /**
    * 组件用到的 html 模板。
    * 默认为 'iOS'。 业务层不需要关注该字段。
    */
    sample: 'iOS',

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 点击按钮时需要用到的事件名。
    */
    eventName: 'click',

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
    * 按钮数组。
    */
    buttons: [],


    //PC 端的用 fixed定位
    position: 'fixed',
});

