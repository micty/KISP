
define('Panel/Meta', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var RandomId = require('RandomId');

    var prefix = 'KISP-Panel-';     //用于生成组件 id 的前缀部分。
    var suffix = 4;                 //用于生成组件 id 的随机部分的长度。


    return {
        create: function (config, others) {
            var id = RandomId.get(prefix, suffix);


            var meta = {
                'id': id,               //实例的 id，全局唯一。
                'container': '',        //容器的 DOM 节点(或其对应的选择器)。
                'rendered': false,      //是否已渲染过。
                'renderArgs': [],       //render() 时的参数数组，用于 refresh()。
                'show': config.show,    //是否在组件 render() 后自动调用 show() 方法以进行显示。
                'visible': false,       //当前组件是否可见。

                'module': null,         //如果非空，则是由 Panel.define() 创建的。 此时 container='[data-panel="xx"]' 的形式。
                '$': null,              //当前实例关联的 DOM 节点对应的 jQuery 实例。
                '$emitter': null,       //供外部用的事件管理器。
                'emitter': null,        //内部使用的事件管理器。
                'tpl': null,            //模板填充的 Template 实例。
                'panel': null,          //缓存调用 this.wrap() 后的返回结果。
                'this': null,           //方便内部使用。
            };



            Object.assign(meta, others);


            return meta;


        },
    };
});