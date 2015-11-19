/**
* 视图组件
* @class
* @name View
*/
define('View', function (require, module, exports) {


    /**
    * 构造器。
    * @constructor
    */
    function View(container, config) {

        var Panel = require('Panel');
        var panel = new Panel(container, config);

        panel.$.addClass('KISP View');

        return panel;

    }


    return View;

});

