/**
* Tabs 模块的默认配置
* @name Tabs.defaults
*/
define('Tabs.defaults', /**@lends Tabs.defaults*/ {
    
    /**
    * 创建实例后首先给激的项。
    */
    current: null,

    /**
    * 按下去时的样式的 css 类名。
    */
    pressedClass: '',

    /**
    * 项目给激活时的样式的 css 类名。
    */
    activedClass: '',

    /**
    * 要监听的事件名。
    */
    eventName: 'click',

    /**
    * 取得项目列表所需要用到的选择器。
    * 默认取全部直接子节点。
    */
    selector: '>*',

    /**
    * 是否允许重复激活相同的项。
    * 当指定为 true 时，方响应已给激活的项目的重新点击。
    */
    repeated: false,

});

