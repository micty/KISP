
define('Tabs/Meta', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var RandomId = require('RandomId');

    var prefix = 'KISP-Tabs-';  //用于生成组件 id 的前缀部分。
    var suffix = 4;             //用于生成组件 id 的随机部分的长度。



    return {
        create: function (config, others) {
            var id = RandomId.get(prefix, suffix);

            var meta = {
                'id': id,
                'activedClass': config.activedClass || '',  //激活时的 item 的样式类名。
                'pressedClass': config.pressedClass || '',  //按下时的 item 的样式类名。
                'eventName': config.eventName || '',        //
                'selector': config.selector || '',          //子项的选择器。
                'repeated': !!config.repeated,              //是否允许重复激活。
                'list': config.list || [],                  //fill() 时对应的列表数据。


                //当前激活的信息。
                'current': {
                    index: -1,
                    item: null,     //list[index];
                    event: null,
                    $: null,
                },

                'container': null,      //
                'tpl': null,            //
                'emitter': null,        //事件驱动器。
                'this': null,           //当前实例，方便内部使用。
                '$': null,              //组件最外层的 DOM 节点的 jQuery 实例。
                'change': null,         //change 事件处理函数。 如果非空，则说明已绑定。

                'reset': function () {
                    meta.$.find(meta.selector).removeClass(meta.activedClass);

                    meta.current = {
                        index: -1,
                        item: null,     //list[index];
                        event: null,
                        $: null,
                    };
                },

                //在 acitve 过程中要执行的回调函数。 
                //业务层可传入此函数以实现页签激活的动画过渡效果。
                //若提供此函数，则必须手动调用一下参数中传入的 done() 回调函数，以通知本组件进行后续处理。
                'activing': function (info, done) {
                    done();
                },
            };




            Object.assign(meta, others);


            return meta;


        },
    };
});