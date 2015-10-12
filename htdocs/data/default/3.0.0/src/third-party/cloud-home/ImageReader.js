/**
* 本地图片读取器。
* 兼容浏览器端和云之家端。
* @class
* @name ImageReader
*/
define('ImageReader', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Emitter = MiniQuery.require('Emitter');//事件驱动器
    var Mapper = MiniQuery.require('Mapper');

    var mapper = new Mapper();
    var Renderer = require(module, 'Renderer');


    function ImageReader(input, config) {

        Mapper.setGuid(this);

        var emitter = new Emitter();

        var meta = {
            'emitter': emitter,
            'input': input,
            'loading': config.loading,
        };

        mapper.set(this, meta);

    }



    ImageReader.prototype = /**@lends ImageReader*/{
        constructor: ImageReader,

        /**
        * 渲染。
        */
        render: function () {

            var meta = mapper.get(this);
            Renderer.render(meta);
        },

        /**
        * 绑定事件。
        * 已重载 on({...}，因此支持批量绑定。
        * @param {string} name 事件名称。
        * @param {function} fn 回调函数。
        */
        on: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);
        },

    };



    return ImageReader;

});
