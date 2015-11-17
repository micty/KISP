
/**
* 图片查看器。
* @class
* @name ImageViewer
*/
define('ImageViewer', function (require, module, exports) {
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
    function ImageViewer(img, config) {

        //重载 ImageViewer(config)
        if ($.Object.isPlain(img)) {
            config = img;
            img = config.img;
        }


        mapper.setGuid(this, module);
        config = Config.clone(module.id, config);

        var emitter = new Emitter(this);


        //以下字段不属于 Dialog 构造器所需要的，移掉为安全起见。
        var cfg = $.Object.remove(config, [
            'sample',
        ]);

        var Dialog = require('Dialog');
        var dialog = new Dialog(cfg);
        var eventName = config.eventName;

        dialog.on(eventName + '-main', function () {
            dialog.hide();
        });

        dialog.on('hide', function () {
            emitter.fire('hide');
        });

        dialog.on('show', function () {
            emitter.fire('show');
        });


        var prefix = config.prefix;
        var suffix = config.suffix;
       
        var meta = {
            'imgId': RandomId.get(prefix, 'img-', suffix),
            'img': img,
            'sample': config.sample,
            'dialog': dialog,
            'emitter': emitter,
        };

        mapper.set(this, meta);
    }


    //实例方法
    ImageViewer.prototype =  /**@lends ImageViewer#*/ {
        constructor: ImageViewer,
        
        /**
        * 显示本组件。
        * @param {string|jQuery|Elemenet} [img] 要显示的图片。
            可以直接传入一个图片 src 地址；或者传入要关联显示的 img 元素节点。
        */
        show: function (src) {

            var meta = mapper.get(this);
            var imgId = meta.imgId;
            var dialog = meta.dialog;

            var img = document.getElementById(imgId);

            if (img) { //之前已经创建
                if (src) {
                    //传入的是 DOM 元素或 jQuery 对象
                    if (typeof src == 'object') {
                        src = $(src).attr('src');
                    }
                    img.src = src;
                }

                dialog.show();

                return;
            }


            //首次创建

            src = src || meta.img;

            //传入的是 DOM 元素或 jQuery 对象
            if (typeof src == 'object') {
                src = $(src).attr('src');
            }

            var sample = meta.sample;

            var html = $.String.format(sample, {
                'id': imgId,
                'src': src,

            });

            //一定要先 show，再 set
            dialog.show();
            dialog.set('text', html);

          
        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            var meta = mapper.get(this);
            var dialog = meta.dialog;
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


    };

    return ImageViewer;

});

