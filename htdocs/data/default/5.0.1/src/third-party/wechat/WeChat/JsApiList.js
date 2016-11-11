
/**
*
*/
define('WeChat/JsApiList', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
   

    function get(wx, reg) {

        if (reg instanceof Array) {
            return reg;
        }


        var list = Object.keys(wx);
        if (reg == '*') {
            return list;
        }

        //todo
        //��������������ʽ������ʵ��

        return [];
    }


    module.exports = exports = {
        get: get,
    };

});
