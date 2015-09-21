//以下文件由 ant 合并生成于 2013-09-23 15:21:29




/**
* Field 基类的私有辅助工具
*/
var FieldHelper = (function ($, Haf, ClassManager, ComponentHelper, ComponentStyle) {


    var xtype$sample = {};

    function getSample(xtype) {

        var sample = xtype$sample[xtype];
        if (!sample) {
            sample = xtype$sample[xtype] = Haf.create({
                xtype: xtype
            });
        }

        return sample;
    }



    function hook(self, listeners) {

        //钩子函数，让函数内部的 this 指向当前的复合组件实例
        var obj = $.Object.map(listeners, function (key, value) {

            if (typeof value == 'function') {
                return function () {
                    var args = $.Array.parse(arguments);
                    value.apply(self, args);
                }
            }

            if ($.Object.isPlain(value)) {
                var fn = value.fn;
                if (typeof fn != 'function') {
                    throw Haf.error('listners.{0} 中的 fn 成员必须为一个函数', key);
                }

                return $.Object.extend({}, value, {
                    fn: function () {
                        var args = $.Array.parse(arguments);
                        fn.apply(self, args);
                    }
                });
            }

            throw Haf.error('无法识别 listeners.{0} 中的值', key);
        });

        return obj;
    }


    

    //创建 field 项
    function createFieldItem(self, compositeConfig) {
        
        //创建样本，一个 xtype 只创建一次，以后复用
        var xtype = self.fieldXtype;
        var sample = getSample(xtype);
        

        //首先用排除法，从复合的 config 中移除已经明确不属于自己的成员。
        var config = $.Object.remove(compositeConfig, [
            'id',
            'name',
            'value',
            'label',
            'labelWidth'
        ]);

        //移除所有样式，因为样式是属于整个复合控件的
        config = ComponentStyle.removeStyles(config, true);

        //config = $.Object.grep(config, function (key, value) {

        //    return ComponentHelper.isNativeProp(sample, key) ||
        //        ComponentHelper.isNativeEvent(sample, key);
        //});

        var listeners = compositeConfig.listeners;
        if (listeners) {
            listeners = $.Object.grep(listeners, function (key, value) {
                return ComponentHelper.isNativeEvent(sample, key);
            });

            config.listeners = hook(self, listeners);
        }

        var handlers = $.Object.grep(config, function (key, value) {
            return typeof value == 'function' &&
                ComponentHelper.isNativeEvent(sample, key);
        });
        handlers = hook(self, handlers);

        $.Object.extend(config, handlers, {
            xtype: xtype,
            valign2container: 'middle',
            width: 'fill' //默认使用填满的方式，但指定了 labelWidth 为百分比的时候，width 会给设为 0 以禁用。
        });

        var valueField = self.valueField;
        if (valueField) { //指定了 valueField，表示要进行关联 self -> filedItem
            config[valueField] = compositeConfig.value;

            //监听 self.set('value', value)
            self.onchange('value', function (newValue, oldValue) {
                fieldItem.set(valueField, newValue);
            });
        }

        var fieldItem = Haf.create(config);
        return fieldItem;
    }




    //创建 label 项
    function createLabelItem(self, compositeConfig) {

        var config = {
            xtype: 'label',
            autoUpdateUI: true,
            height: 'fill',
            valign2container: 'middle'
        };

        var required = compositeConfig.required;

        var label = compositeConfig.label;
        if ($.Object.isPlain(label)) {
            if (required) {
                label.text += '*';
            }
            $.Object.extendSafely(config, label);
        }
        else {
            if (required) {
                label += '*';
            }

            config.text = label;
        }

        var labelWidth = compositeConfig.labelWidth;
        if ($.String(labelWidth).endsWith('%')) {
            config.flex = parseInt(labelWidth);
            config.width = 0;
        }
        else if (labelWidth) {
            config.width = labelWidth;
        }

        var labelItem = Haf.create(config);

        if (compositeConfig.required) {
            
        }


        self.onchange({
            label: function (newValue, oldValue) {
                if ($.Object.isPlain(newValue)) {
                    labelItem.set(newValue);
                }
                else {
                    labelItem.set('text', newValue);
                }
            },

            labelWidth: function (newValue, oldValue) {

                if ($.String(newValue).endsWith('%')) {
                    var flex = parseInt(newValue);

                    labelItem.set({
                        flex: flex,
                        width: 0 //禁用 width
                    });

                    self.getFieldItem().set('flex', 100 - flex);
                }
                else {
                    labelItem.set('width', newValue);
                }
            }
        });


        return labelItem;
    }

    function getStyles(compositeConfig) {

        return ComponentStyle.filterStyles(compositeConfig, true);
    }


    return {
        createLabelItem: createLabelItem,
        createFieldItem: createFieldItem,
        getStyles: getStyles
    };


})(Haf, Haf, ClassManager, ComponentHelper, ComponentStyle);






; (function ($, Haf, FieldHelper) {


/**
* Field 抽象类。
* 复合控件，提供一个 Box 容器，内含一个 Label 和一个 Field 组件。
*/
Haf.define('Haf.view.Field', {
    extend: 'Haf.view.Box',
    xtype: 'field',
    'abstract': true,

    config: {
        label: '',
        labelWidth: '',
        name: '',
        value: '',
        required: false
    },

    initialize: function (compositeConfig) {
        
        var labelItem = FieldHelper.createLabelItem(this, compositeConfig);
        var fieldItem = FieldHelper.createFieldItem(this, compositeConfig);

        var flex = labelItem.get('flex');
        if (flex) {
            fieldItem.set({
                flex: 100 - flex,
                width: 0 //禁用 width
            }, true);
        }


        var config = $.Object.extend({}, compositeConfig, {

            xtype: 'box',
            layout: 'vbox',
            width: 'fill',

            //移除 fieldItem 中的 native 事件
            listeners: $.Object.remove(compositeConfig.listeners, fieldItem.nativeEvents),

            items: [
                {
                    xtype: 'box',
                    layout: 'hbox',
                    valign: 'middle',
                    //backgroundColor: '#80000000',
                    background: '#F7F7F7',

                    scrollable: false, //横向布局时，这个要禁用，不然无法填满宽度
                    width: 'fill',
                    height: 'auto',

                    items: [
                        labelItem,
                        fieldItem
                    ]
                },
                {
                    xtype: 'label',
                    height: '2px',
                    width: 'fill',
                    border: compositeConfig.noLine ? null : 'solid 1px #DDDDDD'
                }
            ]
            
        });

        this.callSuper(arguments, config);

    },

    getLabelItem: function () {

        return this.getItem(0).getItem(0);
    },

    getFieldItem: function () {

        return this.getItem(0).getItem(1);
    },

    get: function (key) {

        var valueField = this.valueField;
        if (valueField && key == 'value') { //get('value')
            var fieldItem = this.getFieldItem();
            var value = fieldItem.get(valueField);
            return value;
        }

        return this.callSuper(arguments, key);
    },

    getValue: function () {
        return this.get('value');
    },

    setValue: function (value) {
        this.set('value', value);
    },

    reset: function () {

    }
});



})(Haf, Haf, FieldHelper);







; (function (Haf, $) {


/**
* 多个表单字段容器。
*/
Haf.define('Haf.view.FieldSet', {
    extend: 'Haf.view.Box',
    xtype: 'fieldset',

    config: {
       
    },

    initialize: function (config) {


        this.callSuper(arguments, {
            layout: 'vbox',
            //background: '#EEEEEE',
            background: 'blue',
            defaults: {
                margin: 20
            },

            items: [
                {
                    xtype: 'label',
                    text: config.title,
                    fontSize: 20,
                    fontColor: '#333333'
                },
                {
                    xtype: 'box',
                    border: 'solid 1px red',
                    layout: 'vbox',
                    borderRadius: 10,
                    background: '#F7F7F7',
                    //background: 'green',
                    defaults: config.defaults,
                    items: config.items
                },
                {
                    xtype: 'label',
                    text: config.instructions,
                    fontSize: 12,
                    fontColor: '#808080'
                }
            ]
        });
       

    }
});



})(Haf, Haf);





/**
* 单行输入框
*/
Haf.define('Haf.view.TextField', {
    extend: 'Haf.view.Field',
    xtype: 'textfield',
    fieldXtype: 'textinput',

    valueField: 'value',

    config: {

    }


});



/**
* 数字输入框
*/
Haf.define('Haf.view.NumberField', {
    extend: 'Haf.view.TextField',
    xtype: 'numberfield',


    config: {
        minValue: null,
        maxValue: null
    },

    initialize: function (config) {

        this.callSuper({}, config, {
            keyboard: 'number'
        });


    },

    configListeners: {
        value: {
            when: 'before',
            fn: function (value, oldValue) {
                if (typeof value != 'number') {
                    throw Haf.error('value 的类型必须为 number');
                }

                var minValue = this.get('minValue');
                if (minValue !== null && value < minValue) {
                    throw Haf.error('value 的最小值不能小于 {0}', minValue);
                }

                var maxValue = this.get('maxValue');
                if (maxValue !== null && value > maxValue) {
                    throw Haf.error('value 的最大值不能大于 {0}', maxValue);
                }

                return value;
            }
        }
    },


    get: function (key) {

        if (key == 'value') { //get('value')
            var fieldItem = this.getFieldItem();
            var value = fieldItem.get(key);
            return Number(value);
        }

        return this.callSuper(arguments, key);
    }


});



/**
* 多行输入框
*/
Haf.define('Haf.view.TextAreaField', {
    extend: 'Haf.view.TextField',
    xtype: 'textareafield',
    fieldXtype: 'textarea',

    config: {

    }

});




; (function (Haf, $) {


/**
* ToggleField 类。
*/
Haf.define('Haf.view.ToggleField', {
    extend: 'Haf.view.Field',
    xtype: 'togglefield',
    fieldXtype: 'toggle',

    config: {

    }
});



})(Haf, Haf);






/**
* 单行输入框
*/
Haf.define('Haf.view.SliderField', {
    extend: 'Haf.view.Field',
    xtype: 'sliderfield',

    fieldXtype: 'slider',
    valueField: 'value'

});


/**
* 单行输入框
*/
Haf.define('Haf.view.NavigationView', {
    extend: 'Haf.view.Card',
    xtype: 'navigationview',


    config: {

    },

    push: function (item) {
        item = this.addItem(item);
        this.setActiveItem(item);
        this.trigger('push', [item]);
    },

    pop: function () {
        var item = this.callSuper(arguments); //先移除最后一项

        var count = this.getCount();
        if (count > 0) {
            this.setActiveItem(count - 1);
        }

        this.trigger('pop', [item]);
    }

});

