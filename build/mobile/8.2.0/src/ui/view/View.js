/**
* 视图组件。
* View 是一种特殊的 Panel。
* 设计 View 类型，是为了从语义上与 Panel 更合理地区分开来。
* @class
* @name View
*/
define('View', function (require, module, exports) {
    var Defaults = require('Defaults');
    var Panel = require('Panel');

    //<for:mobile---->
    //仅针对移动端的代码。
    var ViewSlider = require('ViewSlider');
    //<----for:mobile>

    var defaults = Defaults.get(module.id);
    var mapper = require('Mapper');         //这里要用有继承关系的 Mapper。 因为作为子类。


    /**
    * 构造器。
    * @constructor
    */
    function View(container, config) {
        config = Defaults.clone(module.id, config);

        Panel.call(this, container, config);

        this.$.addClass('KISP View'); //这两个类名必须加上。

        //针对移动端的全屏视图模式。
        //这里只负责有针对性的加上 `FullScreen` 类，而不用去掉该类。
        //因为业务层可能自行加上了该类，但 fullscreen 为 false。
        if (config.fullscreen) {
            this.$.addClass('FullScreen');
        }


        if (config.background) {
            this.$.css('background', config.background);
        }

    }

  



    //从 Panel 类继承。
    //扩展的实例成员。
    View.prototype = Object.assign(new Panel(), {

        //<for:mobile---->
        //仅针对移动端的代码。
        /**
        * 启用/禁用视图的滑动返回。
        */
        slider: function (enabled) {
            ViewSlider.slide(this, enabled);
        },
        //<----for:mobile>


    });



    return Object.assign(View, {

        /**
        * 提供一种按标准方法定义视图的方式。
        */
        define: function (id, factory) {
            Panel.define(id, factory, {
                'constructor': View,
                'defaults': defaults,
            });
        },

        /**
       * 更新容器。
       * 已重载 update(id);   //更新单个。
       * 已重载 update(ids);  //更新多个。
       */
        update: function (ids) {
            Panel.update(ids, {
                'defaults': defaults,
            });
        },


    });


});

