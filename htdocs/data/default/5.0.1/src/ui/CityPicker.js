
/**
* 省市区级联选择器。
* @class
* @name CityPicker
*/
define('CityPicker', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');
    var Config = require('Config');

    var mapper = new Mapper();
    var id$picker = {};


    //跟 iframe 通信
    window.addEventListener('message', function (event) {

        var data = event.data;
        if (!data || data.from != 'KISP.CityPicker') {
            return;
        }

        var id = data.id;
        if (!id) {
            return;
        }

        var picker = id$picker[id];
        if (!picker) {
            return;
        }


        var meta = mapper.get(picker);
        var emitter = meta.emitter;


        var values = data.values;
        var action = data.action;

        switch (action) {

            case 'ok':
            case 'cancel':
                emitter.fire(action, [values]);
                picker.hide();
                break;

            case 'ready':
                emitter.fire(action, [values]);
                break;
        }

    });



    /**
    * 构造器。
    * @constructor
    */
    function CityPicker(config) {

        Mapper.setGuid(this);
        config = Config.clone(module.id, config);

        var id = 'iframe-' + $.String.random().toLowerCase();

        id$picker[id] = this;

        var meta = {
            'emitter': new Emitter(this),
            'dialog': null,
            'id': id,

            'cssClass': config.cssClass,
            'height': config.height,
            'width': config.width,
            'mask': config.mask,
            'sample': config.sample,
            'title': config.title || '', //当不指定时，这里确保为一个字符串。
        };

        mapper.set(this, meta);

      
    }


    //实例方法
    CityPicker.prototype = /**@lends CityPicker#*/ {
        constructor: CityPicker,

        /**
        * 显示本组件。
        */
        show: function () {

            var meta = mapper.get(this);
            var dialog = meta.dialog;

            if (!dialog) {

                var Url = require('Url');
                var Dialog = require('Dialog');

                dialog = meta.dialog = new Dialog({
                    'cssClass': meta.cssClass,
                    'height': meta.height,
                    'width': meta.width,
                    'mask': meta.mask,

                    text: $.String.format(meta.sample, {
                        'id': meta.id,
                        'dir': Url.dir(),
                        'title': encodeURIComponent(meta.title),
                    }),
                   
                });
            }

            dialog.show();

        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            
            var meta = mapper.get(this);
            var dialog = meta.dialog;

            if (!dialog) {
                return;
            }

            dialog.hide();

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

            delete id$picker[meta.id];

            var emitter = meta.emitter;

            this.remove();
            emitter.destroy();

            mapper.remove(this);
        },

        /**
        * 获取或设置当前输入的值。
        * @param {string} [values] 如果指定此参数，则设置当前控件的输入值为指定的值。
        * @return {string} 如果是获取操作，则返回当前控件的值。
        */
        setValues: function (values) {
            var meta = mapper.get(this);
            var id = meta.id;

            var iframe = document.getElementById(id);

            iframe.contentWindow.postMessage({
                method: 'setValue',
                args: [values],

            }, '*');
            
            
        },

        
    };

    return CityPicker;

});

