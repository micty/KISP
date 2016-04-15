/**
* NumberPad 模块的默认配置
* @name NumberPad.defaults
*/
define('NumberPad.defaults', /**@lends NumberPad.defaults*/ {
    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-NumberPad-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

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
    * 允许的最多小数位数。
    */
    decimal: 4, //允许的最多小数位数

    /**
    * 允许的最多整数位数。
    */
    int: 12,

    /**
    * mask 层的配置。
    * 当指定为一个小数时，则表示 mask 层的不透明度 opacity。
    */
    mask: 0.5,

    /**
    * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
    * 可取值为: true|false，默认为易消失。
    */
    volatile: true,

    /**
    * 显示的提示文本。
    */
    text: '',

    /**
    * 初始值。
    */
    value: '',

    /**
    * jQuery 中的显示/隐藏的动画速度。
    */
    speed: 'fast',

});

