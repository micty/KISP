
/**
* 会话。
* @name Session
*/
define('Session', function (require, module, exports) {
    var $String = require('String');
    var Defaults = require('Defaults');
    var defaults = Defaults.get(module.id);

    var length = defaults.length || 16;
    var id = $String.random(length);     //每次运行首先确定，且不会再变。


    return {
        'id': id,
    };
    



});


