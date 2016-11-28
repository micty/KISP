
/**
* 页签列表控件
* @class
* @name Tabs
*/
define('Tabs', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');
    
    var Config = require('Config');
    var RandomId = require('RandomId');

    //子模块
    var Helper = module.require('Helper');

    var mapper = new Mapper();


    /**
    * 构造器。
    * @constructor
    */
    function Tabs(container, config) {

        Mapper.setGuid(this);

        //重载 Tabs(config)
        if ($.Object.isPlain(container)) {
            config = container;
            container = config.container;
        }

        config = Config.clone(module.id, config);

        var meta = {
            'emitter': new Emitter(this),
            'container': container, 

            'activedIndex': -1,
            'activedNode': null, 
            'activedClass': config.activedClass,
            'pressedClass': config.pressedClass,
            'repeated': config.repeated,
            'looped': config.looped,

            'eventName': config.eventName,
            'list': [],
            'indexKey': config.field['index'],
            'eventKey': config.field['event'],
            'nodes': null,
            'selector': config.selector,
            'change': null, //内部记录绑定的 change 事件处理函数，用于可解除绑定
            'old': null,
        };

        mapper.set(this, meta);


        var list = config.list;
        if (list) {
            this.render(list);
        }

        var current = config.current;
        if (typeof current == 'number') {
            this.active(current);
        }

        var change = config.change;
        if (change) {
            this.on('change', change);
        }

    }




    Tabs.prototype = /**@lends Tabs#*/ {
        constructor: Tabs,

        render: function (list, fn) {

            var meta = mapper.get(this);
            var container = meta.container;

            if (list) {
                var Template = require('Template');
                Template.fill(container, list, fn);
                meta.list = list;

                //数据发生了变化
                meta.nodes = null; 
                meta.activedNode = null;
                meta.activedIndex = -1;
            }


            if (!meta.change) { //首次绑定事件

                var eventName = meta.eventName;
                var selector = meta.selector;
                var pressedClass = meta.pressedClass;

                var self = this;

                var change = meta.change = function (event) {
                    var index = Helper.getIndex(meta, this);
                    self.active(index);
                };

                if (eventName == 'touch') { //特殊处理
                    var $ = require('jquery-plugin/touch');
                    $(container).touch(selector, change, pressedClass);
                }
                else {
                    var $ = require('$');
                    $(container).on(eventName, selector, change);
                }
            }


        },

        /**
        * 激活指定的项。
        * @param {number} index 要激活的项的索引值。
        * @param {boolean} [quiet=false] 是否使用安静模式。 
            当指定为 true 时，则不会触发事件，这在某种场景下会用到。
            否则会触发事件(默认情况)。
        */
        active: function (index, quiet) {

            var meta = mapper.get(this);
            var list = meta.list;

            //重载其他情况
            if (typeof index != 'number') {
                index = Helper.findIndex(list, index, arguments[1]);
            }

            var activedIndex = meta.activedIndex;
            var isSame = index == activedIndex;

            //当前项已激活，并且配置指定了不允许激活重复的项
            if (isSame && !meta.repeated) {
                return;
            }

           

            var activedNode = meta.activedNode;

            if (!isSame) { //激活的项跟上次的不一样

                activedIndex = meta.activedIndex = index;
                var activedClass = meta.activedClass;
                
                if (activedNode) { //上次已激活过
                    $(activedNode).removeClass(activedClass);
                }

                activedNode = meta.activedNode = Helper.getNode(meta, index);
                $(activedNode).addClass(activedClass);
            }

            
            var emitter = meta.emitter;
            var item = list[index];

            var current = {
                'item': item,
                'index': index,
                'element': activedNode,
                'event': event,
            };

            var old = meta.old;
            meta.old = current;


            if (quiet) { //显式指定了使用安静模式，则不触发事件。
                return;
            }


            var args = [item, index, current, old];

            emitter.fire('before-change', args);
            emitter.fire('change', index, args);

            //触发指定的事件名
            var eventKey = meta.eventKey;
            if (eventKey) {
                emitter.fire('change', String(item[eventKey]), args);
            }

            emitter.fire('change', args);


        },

        /**
        * 激活前一项。
        * @param {boolean} [quiet=false] 是否使用安静模式。 
            当指定为 true 时，则不会触发事件，这在某种场景下会用到。
            否则会触发事件(默认情况)。
        */
        previous: function (qiuet) {
            var meta = mapper.get(this);
            var list = meta.list;
            var looped = meta.looped;
            var index = meta.activedIndex;

            if (index == 0) {
                if (!looped) {
                    return;
                }

                index = list.length;
            }
          
            this.active(index - 1, qiuet);
        },

        /**
        * 激活后一项。
        * @param {boolean} [quiet=false] 是否使用安静模式。 
            当指定为 true 时，则不会触发事件，这在某种场景下会用到。
            否则会触发事件(默认情况)。
        */
        next: function (qiuet) {
            var meta = mapper.get(this);
            var list = meta.list;
            var looped = meta.looped;
            var index = meta.activedIndex;

            if (index == list.length - 1) {
                if (!looped) {
                    return;
                }

                index = -1;
            }

            this.active(index + 1, qiuet);
        },

        /**
        * 显示本组件。
        */
        show: function (config) {
            var meta = mapper.get(this);
            var container = meta.container;
            $(container).show();

        },

        /**
        * 隐藏本组件。
        * @param {number} [lastTime] 需要持续显示的时间。
        */
        hide: function (lastTime) {
            var meta = mapper.get(this);
            var container = meta.container;
            $(container).hide();

        },

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);
        },

        /**
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            
            var emitter = meta.emitter;
            emitter.destroy();

            //移除 DOM 事件
            var container = meta.container;
            var eventName = meta.eventName;
            var selector = meta.selector;
            var change = meta.change;

            $(container).off(eventName, selector, change);

            mapper.remove(this);
        },

    };


    //静态方法
    $.Object.extend(Tabs, /**@lends Tabs*/{

        

    });

    return Tabs;

});

