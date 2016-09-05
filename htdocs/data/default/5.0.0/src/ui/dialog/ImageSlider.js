
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

  
        var meta = {
            'sample': config.sample,

            //初始时存放 Mask 的 config 数据，构造出实例后，存放实例对象。
            'mask': $.Object.filter(config, [
                'prefix',
                'suffix',
                'volatile',
                'opacity',
                'background',
            ]),

            'slider': null,
            'emitter': new Emitter(this),

            //for slider
            'data': config.data,

        };

        mapper.set(this, meta);
    }


    //实例方法
    ImageSlider.prototype =  /**@lends ImageSlider#*/ {
        constructor: ImageSlider,
        
        /**
        * 显示本组件。
        * @param {Array} [data] 要显示的图片地址列表。
        */
        show: function (data) {

            var meta = mapper.get(this);
            var mask = meta.mask;
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

            //之前已经创建
            if (slider) { 
                mask.show();
                slider.loadData(list);
                return;
            }


            //首次创建
            var emitter = meta.emitter;
            var Mask = require('Mask');

            mask = meta.mask = new Mask(mask);

            mask.on('hide', function () {
                emitter.fire('hide');
            });

            mask.on('show', function () {
                emitter.fire('show');
            });

            mask.show();

            var div = mask.$.get(0);
            var Slider = require('Slider');
            var slider = new Slider({
                'dom': div,
                'data': list,
            });
             
            meta.slider = slider;

          
        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            var meta = mapper.get(this);
            var mask = meta.mask;
            if (!mask) {
                return;
            }


            mask.hide();
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
        * 滚动到指定索引值所对应的场景。
        */
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

