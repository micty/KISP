/**
* 视图组件
* @class
* @name View
*/
define('View', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');

    var mapper = new Mapper();

    /**
    * 构造器。
    * @constructor
    */
    function View(container, config) {

        var cssClass = ' KISP View';

        if (config) {
            if (!config.cssClass) {
                config.cssClass = cssClass;
            }
            else {
                config.cssClass += cssClass;
            }
        }
        else {
            config = { cssClass: cssClass };
        }


        var Panel = require('Panel');
        var panel = new Panel(container, config);
        return panel;

    }


    return View;

});

