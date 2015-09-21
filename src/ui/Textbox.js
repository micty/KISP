
/**
* 带删除按钮的文本输入框。
* @class
* @name Textbox
*/
define('Textbox', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var RandomId = require('RandomId');


    var mapper = new Mapper();




    /**
    * 构造器。
    * @constructor
    */
    function Textbox(txt, config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var emitter = new Emitter(this);


        var meta = {

        };

        mapper.set(this, meta);

    }


    //实例方法
    Textbox.prototype = /**@lends Textbox#*/ {
        constructor: Textbox,

        /**
        * 显示本组件。
        */
        show: function () {

        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            

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

    };

    return Textbox;

});

