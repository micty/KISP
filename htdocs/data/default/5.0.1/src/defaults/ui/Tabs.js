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
    * 要监听的事件名。
    * 当指定为 'touch' 时，会调用 $(container).touch()进行绑定。 
    */
    eventName: 'touch',

    /**
    * 压下去时的样式的 css 类名。
    * 当 eventName = 'touch' 时有效。
    */
    pressedClass: '',

    /**
    * 项目给激活时的样式的 css 类名。
    */
    activedClass: '',

    /**
    * 取得项目列表所需要用到的 jQuery 选择器。
    * 默认取直接子节点。
    */
    selector: '>*',

    /**
    * 是否允许重复激活相同的项。
    * 当指定为 true 时，方响应已给激活的项目的重新点击。
    */
    repeated: false,

    /**
    * 当调用 previous()、next() 激前/后一项时，是否启用循环模式。
    * 如果启用了循环模式时，则当达到第一项或最后一项时，则会从尾或头开始。
    */
    looped: false,


    /**
    * 字段映射。
    */
    field: {
        /**
        * 从 DOM 元素中取得项目列表中指定项的 index 的自定义字段名。 
        */
        index: 'data-index',

        /**
        * 当触发 change 事件时，需要同时触发对应的 item 上指定的事件名。
        * 例如当指定为 'name' 时，则在触发 change 事件时，会同时 item['name'] 对应的事件。 
        */
        event: '',
    },
});

