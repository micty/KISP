
/**
* 页签列表控件。
* @class
* @name Tabs
*/
define('Tabs', function (require, module, exports) {
    var Emitter = require('Emitter');
    var $Object = require('Object');
    var Template = require('Template');
    var Defaults = require('Defaults');

    //子模块
    var Events = module.require('Events');
    var Meta = module.require('Meta');

    var mapper = new Map();

    
    /**
    * 构造器。
    * 已重载 Tabs(config); //传入一个配置对象。
    * 已重载 Tabs(container, config); //容器从配置对象中分离出来。
    * @constructor
    */
    function Tabs(container, config) {
        //重载 Tabs(config)
        if ($Object.isPlain(container)) {
            config = container;
            container = config.container;
        }

        config = Defaults.clone(module.id, config);


        var meta = Meta.create(config, {
            'container': container,
            'this': this,
            'emitter': new Emitter(this),
            '$': $(container),              //
        });

        mapper.set(this, meta);


        //对外暴露的属性。
        Object.assign(this, {
            'id': meta.id,
            '$': meta.$,
        });

    }




    Tabs.prototype = /**@lends Tabs#*/ {
        constructor: Tabs,

        /**
        * 当前实例的 id。
        */
        id: '',

        /**
        * 当前实例关联的 DOM 节点对应的 jQuery 实例。
        * 即 $(container) 的快捷方式。
        */
        $: null,

        /**
        * 设置模板填充的规则，为模板填充进行预处理。
        */
        template: function (process) {
            var meta = mapper.get(this);
            var tpl = meta.tpl;

            if (!tpl) {
                tpl = meta.tpl = new Template(meta.container);
            }

            if (process) {
                tpl.process(...arguments);
            }

            //返回给外面，可能要用到。
            //通过 tabs.template() 即可取得 tpl。
            return tpl;
        },

        /**
        * 填充数据。
        * 触发事件: `fill`。
        */
        fill: function (list, process) {
            var meta = mapper.get(this);
            var tpl = this.template(process); //确保 meta.tpl 存在，同时设置填充规则。
            var html = tpl.fill(list);

            meta.$.html(html);
            meta.list = list;

            meta.reset();
            meta.emitter.fire('fill', [list]);

            return html;
        },

        /**
        * 渲染列表。
        * 触发事件: `render`。
        */
        render: function (list, process) {
            var meta = mapper.get(this);

            //首次渲染。
            if (!meta.change) {
                Events.bind(meta);
            }

            if (list) {
                this.fill(list, process);
            }

            meta.emitter.fire('render', [list]);

        },

        /**
        * 激活指定的项。
        * 已重载 active(index);            //不传递任何附加数据，触发事件。
        * 已重载 active(index, true);      //不传递任何附加数据，触发事件。 
        * 已重载 active(index, options);   //传递一些附加数据，触发事件。
        * 已重载 active(index, false);     //不传递任何附加数据，也不触发事件，在某种场景下会用到。
        * @param {number} index 要激活的项的索引值。
        * @param {Object} options 要传递给事件的附加数据。 
        */
        active: function (index, options) {
            var fireEvent = true; //默认为触发事件。

            //重载
            if (typeof options == 'boolean') {
                fireEvent = options;
                options = {};
            }
            else {
                options = options || {};
            }

            var meta = mapper.get(this);
            var current = meta.current;


            //当前项已激活，并且配置指定了不允许激活重复的项。
            if (index == current.index && !meta.repeated) {
                return;
            }


            var item = meta.list[index] || null;
            var actived = meta.activedClass;
            var old = Object.assign({}, current);           //先备份。

            current.$ && current.$.removeClass(actived);    //移除上次已激活过的样式类名。

            current.index = index;
            current.item = item;
            current.event = options.event;
            current.$ = meta.$.find(`${meta.selector}:eq(${index})`); //如 `>li:eq(2)`。


            var info = {
                'current': current,
                'old': old,
                'options': options,
            };


            meta.activing(info, function () {
                current.$.addClass(actived);

                //指定了使用安静模式，则不触发事件。
                if (!fireEvent) {
                    return;
                }
                

                var args = [item, index, info];
                var cmd = item ? item.cmd || '' : '';

                meta.emitter.fire('before-change', args);
                meta.emitter.fire('change', `${index}`, args);

                //触发指定的事件名。
                if (cmd) {
                    meta.emitter.fire('change', cmd, args);
                }

                meta.emitter.fire('change', args);
            });

        },

        /**
        * 移除指定的项。
        * 仅处理数据和激活项的状态，不移除 DOM 节点。
        * 触发事件: `before-remove`、`remove`。
        */
        remove: function (index) {
            var meta = mapper.get(this);
            var activedIndex = meta.current.index;

            meta.fire('before-remove', [index]);

            //移除的是当前激活项之前的，则重新设置激活状态即可。
            if (index < activedIndex) {
                this.active(activedIndex - 1, false);
            }
            else if (index == activedIndex) {
                //移除的是当前的激活项
                meta.reset();
            }

            meta.list.splice(index, 1);

            meta.fire('remove', [index]);

        },

        /**
        * 获取当前实例激活的索引值。
        */
        getActivedIndex: function () {
            var meta = mapper.get(this);

            return meta.current.index;
        },

        /**
        * 获取或设置 active 时的动画过渡效果函数。
        * 业务层可传入(设置)一个函数 fn 以实现页签激活的动画过渡效果。
        * 函数 fn 会接受到两个参数:
        *   info: { current, old, options, },   //激活过程中的相关信息。
        *   done: function,                     //完成后的回调函数。
        * 在函数 fn 中必须手动调用一下参数中传入的 done() 回调函数，以通知本组件进行后续处理。
        * @example:
        *   tabs.activing(function (info, done) { 
        *       console.log(info);
        *       done();
        *   });
        */
        activing: function (fn) {
            var meta = mapper.get(this);

            fn = fn || meta.activing;

            if (typeof fn != 'function') {
                throw new Error('参数 fn 必须为 function 类型。');
            }

            meta.activing = fn;

            return fn; //业务层可能会到。
        },

        /**
        * 绑定事件。
        */
        on: function (...args) {
            var meta = mapper.get(this);
            meta.emitter.on(...args);
        },

        /**
        * 销毁本组件。
        */
        destroy: function () {
            var meta = mapper.get(this);

            meta.emitter.destroy();
            meta.tpl.destroy();
            meta.$.off();

            mapper.delete(this);
        },




        
    };



    return Tabs;

});

