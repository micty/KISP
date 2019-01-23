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

    var defaults = Defaults.get(module.id);


    /**
    * 构造器。
    * @constructor
    */
    function View(container, config) {
        config = Defaults.clone(module.id, config);

        var panel = new Panel(container, config);
        var background = config.background;

        panel.$.addClass('KISP View'); //这两个类名必须加上。

        //针对移动端的全屏视图模式。
        //这里只负责有针对性的加上 `FullScreen` 类，而不用去掉该类。
        //因为业务层可能自行加上了该类，但 fullscreen 为 false。
        if (config.fullscreen) {
            panel.$.addClass('FullScreen');
        }

        if (background) {
            panel.$.css('background', background);
        }


        return panel;

    }



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

