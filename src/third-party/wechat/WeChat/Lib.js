
/**
*
*/
define('WeChat/Lib', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
   
    var wx = window.wx;


    function load(url, fn) {

        if (wx) {
            fn && fn(wx);
            return;
        }

        var Script = MiniQuery.require('Script');

        Script.load(url, function () {
            wx = window.wx;
            fn && fn(wx);
        });
    }


    module.exports = exports = {
        load: load,
    };

});
