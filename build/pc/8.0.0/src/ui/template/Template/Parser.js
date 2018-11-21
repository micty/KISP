
/**
* 
*/
define('Template/Parser', function (require, module, exports) {
    var HTMLParser = require('HTMLParser');
    var Templates = module.require('Templates');



    var beginTag = '<script type="text/template">';
    var endTag = '</script>';



    return {


        parse: function (html) {
            html = html.split(beginTag).join('');
            html = html.split(endTag).join('');

            var dom = HTMLParser.parse(html);
            var tpls = Templates.get(dom);

            return { dom, tpls, };


        },
    };


});

