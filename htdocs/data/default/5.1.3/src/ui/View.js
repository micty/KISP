/**
* 视图组件
* @class
* @name View
*/
define('View', function (require, module, exports) {


    var Config = require('Config');

    /**
    * 构造器。
    * @constructor
    */
    function View(container, config) {

        config = Config.clone(module.id, config);

        var Panel = require('Panel');
        var panel = new Panel(container, config);

        panel.$.addClass('KISP View');

        var background = config.background;
        if (background) {
            panel.$.css('background', background);
        }

        return panel;

    }


    return View;

});

