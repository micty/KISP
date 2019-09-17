
/**
* 
*/
define('Template/Parser', function (require, module, exports) {
    var $String = require('String');
    var HTMLParser = require('HTMLParser');
    var Templates = module.require('Templates');




    return {


        parse: function (html) {

            var dom = HTMLParser.parse(html);

            var tpls = Templates.get(dom);

            return { dom, tpls, };


        },
    };


});

