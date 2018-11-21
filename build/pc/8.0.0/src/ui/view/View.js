/**
* 视图组件。
* View 是一种特殊的 Panel。
* 设计 View 类型，是为了从语义上与 Panel 更合理地区分开来。
* @class
* @name View
*/
define('View', function (require, module, exports) {
    var Module = require('Module');
    var Defaults = require('Defaults');
    var Panel = require('Panel');
    var Container = module.require('Container');

    var defaults = Defaults.get(module.id);


    /**
    * 构造器。
    * @constructor
    */
    function View(container, config) {
        config = Defaults.clone(module.id, config);

        var panel = new Panel(container, config);
        var background = config.background;


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

            Module.define(id, function (require, module, exports) {
                var container = Container.get(id);  //如 `[data-view="/Users"]`。
                var view = new View(container);

                exports = factory(require, module, view);
                exports = view.wrap(exports);

                return exports;
            });
        },
    });


});

