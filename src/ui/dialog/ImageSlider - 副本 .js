
/**
* 滑动图片列表查看器。
* @class
* @name ImageSlider
*/
define('ImageSlider', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Emitter = MiniQuery.require('Emitter');

   
    var Config = require('Config');
    var RandomId = require('RandomId');

    var mapper = require('Mapper');


    /**
    * 构造器。
    * @constructor
    */
    function ImageSlider(config) {


        mapper.setGuid(this, module);
        config = Config.clone(module.id, config);

        var emitter = new Emitter(this);


        //以下字段不属于 Dialog 构造器所需要的，移掉为安全起见。
        var cfg = $.Object.remove(config, [
            'sample',
        ]);


        var prefix = config.prefix;
        var suffix = config.suffix;
       
        var meta = {
            'divId': RandomId.get(prefix, 'div-', suffix),
            'sample': config.sample,
            'dialog': null,
            'slider': null,
            'emitter': emitter,

            //for slider
            'data': config.data,

            //for dialog
            'cfg': cfg,
            'eventName': config.eventName,
        };

        mapper.set(this, meta);
    }


    //实例方法
    ImageSlider.prototype =  /**@lends ImageSlider#*/ {
        constructor: ImageSlider,
        
        /**
        * 显示本组件。
        * @param {Array} [data] 要显示的图片的地址列表。
        */
        show: function (data) {

            var meta = mapper.get(this);
            var dialog = meta.dialog;
            var slider = meta.slider;
            var sample = meta.sample;

            data = meta.data = data || meta.data;

            var list = $.Array.keep(data, function (src, index) {
                var html = $.String.format(sample, {
                    'src': src,
                });

                return {
                    'content': html,
                };
            });

            if (slider) { //之前已经创建
                dialog.show();
                slider.loadData(list);
                return;
            }


            //首次创建
            var emitter = meta.emitter;
            var Dialog = require('Dialog');
            var dialog = new Dialog(meta.cfg);
            meta.dialog = dialog;

            dialog.on(meta.eventName + '-main', function () {
                dialog.hide();
            });

            dialog.on('hide', function () {
                emitter.fire('hide');
            });

            dialog.on('show', function () {
                emitter.fire('show');
            });


            var divId = meta.divId;
            var html = $.String.format('<div id="{0}"></div>', divId);
            dialog.set('text', html);
            dialog.show();
         

            var Slider = require('Slider');

            //这里可能会用使用到的 div 可能会跟 dialog 的创建有时间竞争关系。
            setTimeout(function () {

                var div = document.getElementById(divId);
               
                var slider = new Slider({
                    'dom': div,
                    'data': list,
                });
             
                meta.slider = slider;

            }, 0);
            

          
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

        to: function (index) {

            var meta = mapper.get(this);
            var slider = meta.slider;
            if (!slider) {
                return;
            }

            
            slider.slideTo(index);
        },


    };

    return ImageSlider;

});

