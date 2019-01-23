
define('Scroller/Meta', function (require, module, exports) {
    var $ = require('$');
    var $Object = require('Object');
    var RandomId = require('RandomId');

    var prefix = 'KISP-Scroller-';  //用于生成组件 id 的前缀部分。
    var suffix = 4;                 //用于生成组件 id 的随机部分的长度。



    return {
        create: function (config, others) {
            var id = RandomId.get(prefix, suffix);

            //过滤用于构造 IScroll 实例的配置字段。
            var options = $Object.filter(config, [
                'scrollbars',
                'shrinkScrollbars',
                'preventDefault',
                'probeType',
            ]);


            var style = $Object.filter(config, [
                'top',
                'left',
                'right',
                'bottom',
                'width',
            ]);


            var pulldown = config.pulldown || {};
            var pullup = config.pullup || {};


            var meta = {
                'id': id,
                'enabled': true,
                'options': options,     //用于构造 IScroll 实例的配置字段。
                'style': style,         //
               

                'puller': {
                    binded: false,
                },

                //下拉。
                'pulldown': {
                    'min': pulldown.min,                //下拉开始生效的最小 y 值。
                    'max': pulldown.max,                //下拉结束生效的最大 y 值。
                    'top': pulldown.top,                //指示器最终停留的位置。
                    'release': pulldown.release,        //释放后回弹到的位置。
                    'translateY': pulldown.translateY,    //初始时，指示器隐藏的位置。
                    'tips': pulldown.tips,              //指示器的提示语集合。
                    'load': pulldown.load,              //加载函数。

                    'enabled': false,
                    'binded': false,
                },

                //上拉。
                'pullup': {
                    'min': pullup.min,                  //上拉开始生效的最小 y 值。
                    'max': pullup.max,                  //上拉结束生效的最大 y 值。
                    'bottom': pullup.bottom,            //指示器最终停留的位置。
                    'release': pullup.release,          //释放后回弹到的位置。
                    'translateY': pullup.translateY,    //初始时，指示器隐藏的位置。
                    'lastPage': pullup.lastPage,        //是否为最后一页。 如果是，则表示没有更多数据，则停用上拉加载更多功能。
                    'tips': pullup.tips,                //指示器的提示语集合。
                    'load': pullup.load,                //加载函数。

                    'enabled': false,
                    'binded': false,
                },


                'container': null,      //
                'scroller': null,       //IScroll 的实例。
                'emitter': null,        //事件驱动器。
                'this': null,           //当前实例，方便内部使用。
                '$': null,              //组件最外层的 DOM 节点的 jQuery 实例。
            };


            Object.assign(meta, others);

            return meta;
        },
    };
});