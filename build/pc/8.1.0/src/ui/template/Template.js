
/**
* 模板类。
*/
define('Template', function (require, module, exports) {
    var $String = require('String');
    var $Object = require('Object');
    var Emitter = require('Emitter');

    var Meta = module.require('Meta');
    var Parser = module.require('Parser');
    var Sample = module.require('Sample');
    var Child = module.require('Child');

    var mapper = new Map();


    /**
    * 构造器。
    * 参数：
    *   selector: '' | DOM | jQuery | {}, //DOM 节点或选择器。 也可以是一个分析到的数据结构对象。
    */
    function Template(selector) {
        //如果传入的是一个纯对象，则认为是内部解析到的数据结构。
        //即要从一个已解析到的数据对象中创建实例。
        var isParsedData = $Object.isPlain(selector);

        var meta = Meta.create({
            'emitter': new Emitter(this),
            'this': this,
        });

        mapper.set(this, meta);


        //传入的是一个普通的 DOM 节点或其选择器。
        if (!isParsedData) {
            var node = $(selector).get(0); //包装、拆装，可以让入参多样化。

            if (!node) {
                selector = (selector instanceof $) ? selector.selector : selector;
                throw new Error('不存在模板节点: ' + selector);
            }

            var isTPL = node.nodeName.toLowerCase() == 'template'; //判断是否为 <template> 模板节点。
            var html = node.innerHTML;
            var info = Parser.parse(html);

            meta.sample = Sample.between(html);
            meta.name = isTPL ? node.getAttribute('name') : '';
            meta.placeholder = isTPL ? node.getAttribute('placeholder') : '';
            meta.innerHTML = html;
            meta.outerHTML = node.outerHTML;
            meta.node = node;

            meta.tpls = info.tpls.map(function (item) {
                var tpl = Child.create(Template, meta, item);
                var sample = meta.sample;

                meta.sample = Sample.replace(sample, item); //替换掉当前模板在父模板中的内容。

                return tpl;
            });
        }
        else {//传入的是一个已解析到的数据对象。
            var item = selector;

            Meta.assign(meta, item);

            meta.tpls = item.items.map(function (item) {
                var tpl = Child.create(Template, meta, item);

                return tpl;
            });
        }


        /**
        * 这里增加个限制：
        * 某一层里只允许出现一个纯 `<template>` 标签，且不允许再嵌套子级 `<template>` 标签。
        * 纯 `<template>` 标签是指无 `name` 和 `placeholder` 属性的 `<template>` 标签。
        * 这段逻辑会把该 template 实例中的 sample 上升为父级实例的 sample 值。
        * 这样可以方便把一级模板用一对 `<template></template>` 标签括起来，等价于直接注释掉当模板的方式，
        * 但比后者多了个语法高亮的优点。 例如：
        *   <ul>
        *       <template>
        *           <li></li>
        *       </temlate>
        *   </ul>
        * 与传统的用注释方式是等价的：
        *   <ul>
        *       <!--
        *       <li></li>
        *       -->
        *   </ul>
        */
        (function () {
            //获取空白名称的直接子级 tpl。
            var tpl = meta.name$tpl[''];

            if (!tpl) {
                return;
            }

            //空白名称的直接子级 tpl 对应 meta。
            var tplMeta = mapper.get(tpl);
            var keys = Object.keys(tplMeta.name$tpl);

            if (keys.length > 0) {
                throw new Error('无名称的 template 标签下不能再嵌套子级 template。');
            }

            if (tplMeta.placeholder) {
                throw new Error('无名称的 template 标签不能设置 placeholder 属性。');
            }

            //把空白名称的直接子级 tpl 的 sample 当成本级的 sample。
            meta.sample = tplMeta.sample;

        })();


        //对外暴露的属性。
        Object.assign(this, {
            'id': meta.id,
            '_meta': meta, //用于测试。
        });

    }




    //实例成员。
    Template.prototype = {
        constructor: Template,

        /**
        * 当前实例的 id。
        */
        id: '',

        /**
        * 父实例。
        */
        parent: null,

        /**
        * 获取指定名称(或由多个名称组成的路径)节点所对应的下级 Template 实例。
        * 已重载 template(names);                      //传入子模板的名称列表。
        * 已重载 template(name0, name1, ..., nameN);   //依次传入多个子模板的名称。
        */
        template: function (names) {
            //重载 template(name0, name1, ..., nameN); 
            if (!Array.isArray(names)) {
                names = [...arguments];
            }

            //从当前实例开始。
            var tpl = this;
            var meta = mapper.get(tpl);

            names.map(function (name) {
                tpl = meta.name$tpl[name];  //取子级的实例。
                meta = mapper.get(tpl);     //子级实例对应的元数据。
            });

            return tpl;
        },

        /**
        * 获取指定名称(或由多个名称组成的路径)节点所对应的下级 sample 模板。
        */
        sample: function (...names) {
            var tpl = this.template(...names);
            var meta = mapper.get(tpl);

            if (!meta) {
                throw new Error(`当前实例下不存在名称路径为 ${names.join(' ')} 的 Template 子实例。`);
            }
            
            return meta.sample;
        },

        /**
        * 对当前模板进行填充，并用填充后的 html 字符串渲染容器节点。
        * @param {Object|Array} data 要填充的数据，可以是一个对象或数组。
        * @param {function} process 填充规则的处理器，即处理函数。
        * @return 填充后的 html 内容。
        */
        render: function (data, process) {
            if (process) {
                this.process(process);
            }

            var meta = mapper.get(this);
            var node = meta.node;
            var html = this.fill(data);

            if (node) {
                node.innerHTML = html;
            }

            return html;
        },

        /**
        * 对当前模板及子模板(如果有)进行填充。
        * 已重载 fill(data);
        * 已重载 fill(data, param0, ..., paramN);
        * 已重载 fill(name0, name1, ..., nameN, data);
        * 已重载 fill(name0, name1, ..., nameN, data, param0, ..., paramN);
        * @return {string} 返回填充后的 html 字符串。
        */
        fill: function (data, ...params) {
            //重载 fill(name0, name1, ..., nameN, data, param0, ..., paramN);
            //即一步到位填充指定路径的子模板。

            //全部参数列表。
            var args = [...arguments];


            //找出 data 在参数列表中所在的位置。
            var index = args.findIndex(function (item) {
                return Array.isArray(item) || $Object.isPlain(item);
            });

            //参数列表中没找到任何可用于填充的数据。
            if (index < 0) {
                throw new Error('填充模板时必须指定数据为一个数组或纯对象。');
            }

            //找到该数据，但它前面有子模板的名称。
            //使用子模板进行填充。
            if (index > 0) {
                var names = args.slice(0, index);   //子模板名称列表，[name0, name1, ..., nameN];
                var tpl = this.template(...names);

                if (!tpl) {
                    throw new Error(`不存在路径为 ${names.join('.')} 的模板节点，请检查 html 模板树。`);
                }

                var rest = args.slice(index);   //[data, param0, ..., paramN];
                var html = tpl.fill(...rest);
                return html;
            }


            //以下情况是直接传入数据进行填充的，不存在传入子模板的情况。

            var meta = mapper.get(this);


            //这里不要缓存 sample，应该实时去获取 meta.sample，
            //因为它可能在 process 函数中给使用者调用了 this.fix() 更改了。
            //var sample = meta.sample; !!!

            //单个纯对象形式。
            if (!Array.isArray(data)) {
                meta.emitter.fire('process', args);

                //调用处理器获得填充数据。
                //此处特意让处理器函数获得 `this` 执行环境。
                data = meta.process.apply(meta.this, args); 


                //处理器已直接返回 html 内容，则不需要用模板去填充。
                if (typeof data == 'string') {
                    return data;
                }
                
                var html = $String.format(meta.sample, data);
                return html;
            }

            //传进来的是一个数组，则迭代每一项去填充。
            //每一项都会调用处理器函数，并传递一些参数。
            var htmls = data.map(function (item, index) {
                //传给处理器的参数列表。
                //除了传当前迭代的 item 和 index 外，还把 params 也一同传过去。
                //params 就是用户在 fill(data, ...params) 传进来的、data 后面的其它参数。
                //params 用于透传给处理器函数。
                var args = [item, index, ...params];

                meta.emitter.fire('process', args);

                //调用处理器获得填充数据。
                //此处特意让处理器函数获得 `this` 执行环境。
                var data = meta.process.apply(meta.this, args);

                //处理器已直接返回 html 内容，则不需要用模板去填充。
                if (typeof data == 'string') {
                    return data;
                }

                if (!data) {
                    return ''; //这里要返回空串。
                }

                var html = $String.format(meta.sample, data);
                return html;
            });

            return htmls.join('');
        },

        /**
        * 设置模板填充的处理规则。
        * 已重载 process(fn);      //设置当前实例的处理器。
        * 已重载 process({...});   //批量设置当前实例以及子实例的处理器。                 
        * 已重载 process(name0, ..., nameN, fn);       //设置路径为 `name0->name1->...->nameN` 的子实例的处理器。
        * 已重载 process(name0, ..., nameN, {...});    //批量设置前缀路径为`name0->name1->...->nameN` 的子实例的处理器。
        */
        process: function (process) {
            var meta = mapper.get(this);

            //重载 process(fn); 
            //设置当前实例的 process 处理函数。
            if (typeof process == 'function') {
                meta.process = process;
                return;
            }


            var args = [...arguments];

            //查找处理器所在的位置。
            var index = args.findIndex(function (item) {
                return typeof item == 'function' || $Object.isPlain(item);
            });

            if (index < 0) {
                throw new Error(`模板节点 ${meta.name} 缺少处理器。`);
            }


            //前面存在前缀名称，则跟后面的处理器合并为一个完整对象，方便后续统一处理。
            //如 process('A', 'B', 'C', process); 则合并为 { A: { B: { C: process } } };
            if (index > 0) {
                var keys = args.slice(0, index);    //如 ['A', 'B', ]
                var item = args[index];             //

                process = $Object.make({}, keys, item); //此时 process 是一个 {...}。
            }


            //展开成扁平结构。
            //如：list = [ { keys: ['A', 'B', 'C'], value: fn, } ];
            var list = $Object.flat(process);

            list.forEach(function (item) {
                //去掉空字符串。 因为空串是代表自身。
                var keys = item.keys.filter(function (key) {
                    return !!key;
                });

                var value = item.value;

                if (typeof value != 'function') {
                    throw new Error(`模板节点 ${keys.join('.')} 的处理器必须为一个函数。`);
                }


                var tpl = meta.this.template(keys);

                if (!tpl) {
                    console.warn(`不存在模板节点: ${keys.join('.')}`);
                    return;
                }

                //此时 value 为一个函数。
                tpl.process(value);

            });

        },

        /**
        * 修正模板中指定的占位符。
        * 因为模板中的 html 给 DOM 解析和处理后，没有等号的占位符属性会给替换成有空值的属性值。
        * 如 `<img {test} />` 经过 DOM 解析后会变成 `<img {test}="" />`，这并不是我们想要的结果。
        * 因此我们需要手动修正以替换回我们写模板时的结果。
        */
        fix: function (keys) {
            var meta = mapper.get(this);
            var sample = meta.sample;

            keys = Array.isArray(keys) ? keys : [keys];

            keys.map(function (key) {
                var target = '{' + key + '}';
                var old = target + '=""';

                sample = sample.split(old).join(target); //replaceAll
            });

            meta.sample = sample;
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
            if (!meta) {
                return;
            }

            meta.tpls.map(function (tpl) {
                tpl.destroy();
            });

            meta.emitter.destroy();
            meta.node = null;
            meta.parent = null;
            meta.emitter = null;

            mapper.delete(this);

        },
    };



    //静态方法
    Object.assign(Template, {
        /**
        * 从一段 html 中解析出信息，并创建一个 Template 实例。
        */
        create: function (html) {
            html = `<template>${html}</template>`;

            var HTMLParser = require('HTMLParser');
            var dom = HTMLParser.parse(html);

            //if (dom.childNodes.length != 1) {
            //    throw new Error('要解析的 html 最外层只允许(必须)有一个节点。');
            //}

            var tpl = new Template(dom.childNodes[0]);

            return tpl;
        },
    });


    return Template;



});

