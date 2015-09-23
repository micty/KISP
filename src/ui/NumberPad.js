
/**
* 虚拟的数字鱼键盘。
* @class
* @name NumberPad
*/
define('NumberPad', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');

    var Renderer = require(module, 'Renderer');
    var Sample = require(module, 'Sample');
    var Style = require(module, 'Style');

    var mapper = new Mapper();



    /**
    * 构造器。
    * @constructor
    */
    function NumberPad(config) {


        Mapper.setGuid(this);
        config = Config.clone(module.id, config);


        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }


        var meta = {

            'emitter': new Emitter(this),
            'container': config.container,
            'append': config.append,
            
            'prefix': config.prefix,
            'suffix': config.suffix,

            'cssClass': cssClass,
            'sample': Sample,
            'style': Style.get(config),

            'visible': false,       //组件当前是否可见

            'headerId': '',         //第一个 ul 的 DOM 元素 id
            'textId': '',           //文字所对应的 DOM 元素 id
            'valueId': '',          //输入的数字所对应的 DOM 元素 id
            'footerId': '',         //最后一个 ul 的 DOM 元素 id

            'value': config.value,  //当前输入的值
            'oldValue': '',         //发生改变后，用来存放之前的值。

            'int': config.int,
            'decimal': config.decimal,
            'mask': config.mask,
            'masker': null,     //Mask实例
            'volatile': config.volatile,

            'text': config.text,
            'height': 0, //会动态计算
            'speed': config.speed,  //动画速度
        };

        mapper.set(this, meta);

    }


    //实例方法
    NumberPad.prototype = /**@lends NumberPad#*/ {
        constructor: NumberPad,

        /**
        * 显示本组件。
        */
        show: function () {

            var meta = mapper.get(this);
            if (meta.visible) {
                return;
            }


            var div = meta.div;
            if (!div) { //首次 render
                div = Renderer.render(meta, this);
            }
           
            var masker = meta.masker;
            if (masker) {
                masker.show();
            }


            $(div).show().animate({
                'bottom': 0,

            }, meta.speed, function () {
               
                meta.visible = true;
                meta.emitter.fire('show');
            });

        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div || !meta.visible) {
                return;
            }
          
            var masker = meta.masker;
            if (masker) {
                masker.hide();
            }
            
            $(div).animate({
                'bottom': -meta.height,

            }, meta.speed, function () {

                $(div).hide(); //隐藏一下，避免在手机端给输入法顶上去。

                meta.visible = false;
                meta.emitter.fire('hide');
            });

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

            this.remove();
            emitter.destroy();

            mapper.remove(this);
        },

        /**
        * 获取或设置当前输入的值。
        * @param {string} [value] 如果指定此参数，则设置当前控件的输入值为指定的值。
        * @return {string} 如果是获取操作，则返回当前控件的值。
        */
        value: function (value) {
            var meta = mapper.get(this);

            //重载 getValue()
            if (arguments.length == 0) {
                return meta.value;
            }

            //重载 setValue(value)
            value = String(value);
            var v = Number(value);

            if (isNaN(v)) {
                throw new Error('要设置的值必须为合法的数值');
            }

            var a = value.split('.');
            var int = a[0];
            var decimal = a[1] || '';

            //截取长度
            int = int.slice(0, meta.int);
            decimal = decimal.slice(0, meta.decimal);
            
            value = int;

            if (decimal) {
                value = value + '.' + decimal;
            }

            meta.value = value;
            $('#' + meta.valueId).html(value);
        },

        /**
        * 设置指定的属性。
        * @param {string} key 要设置的属性的名称。 可取的值有:
            'value': 相当于 this.value(value)。
            'text': 设置显示的提示文本。
            'int': 设置整数部分允许的长度，会导致值重新设置。
            'decimal': 设置小数部分允许的长度，会导致值重新设置。
        * @param {string|number} 要设置的值。
        */
        set: function (key, value) {
            
            var meta = mapper.get(this);

            if (value == meta[key]) { //没有发生变化
                return;
            }

            switch (key) {

                case 'value':
                    this.value(value);
                    return;

                case 'text':
                    meta.text = value;
                    $('#' + meta.textId).html(value);
                    $('#' + meta.headerId).toggleClass('has-text', !!value);
                    return;

                case 'decimal':
                    meta.decimal = value;
                    $('#' + meta.footerId).toggleClass('no-point', value == 0);
                    this.value(meta.value); //长度发生了变化，需要重新设置值
                    return;

                case 'int':
                    meta.int = value;
                    this.value(meta.value); //长度发生了变化，需要重新设置值
                    return;

                default:
                    throw new Error('不支持参数 key: ' + key);

            }
        },

    };

    return NumberPad;

});

