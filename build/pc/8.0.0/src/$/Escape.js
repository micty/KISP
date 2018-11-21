

/**
* HTML 转码工具。
* @namespace
* @name Escape
*/
define('Escape', function (require, module, exports) {

    module.exports = exports = /**@lends Escape*/ {

        /**
        * 把用户产生的内容做转换，以便可以安全地放在 html 里展示。
        * @return {String}
        */
        html: function (string) {
            var s = String(string);
            var reg = /[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g;

            s = s.replace(reg, function (r) {
                return "&#" + r.charCodeAt(0) + ";"
            });

            s = s.replace(/ /g, "&nbsp;");
            s = s.replace(/\r\n/g, "<br />");
            s = s.replace(/\n/g, "<br />");
            s = s.replace(/\r/g, "<br />");

            return s;
        },

        /**
        * 把用户产生的内容做转换，以便可以安全地放在节点的属性里展示。
        * @example 如 `<input value="XXX">`，`XXX` 就是要转换的部分。
        * @return {String}
        */
        attribute: function (string) {
            var s = String(string);
            var reg = /[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g;

            return s.replace(reg, function (r) {
                return "&#" + r.charCodeAt(0) + ";"
            });
        },

        /**
        * 用做过滤直接放到 HTML 里 j s中的。
        * @return {String}
        */
        script: function (string) {
            var s = String(string);
            var reg = /[\\"']/g;

            s = s.replace(reg, function (r) {
                return "\\" + r;
            });

            s = s.replace(/%/g, "\\x25");
            s = s.replace(/\n/g, "\\n");
            s = s.replace(/\r/g, "\\r");
            s = s.replace(/\x01/g, "\\x01");

            return s;
        },

        /**
        * 对查询字符串中的值部分进行转换。
        * 如 `http://www.test.com/?a=XXX`，其中 `XXX` 就是要过滤的部分。
        * @return {String}
        */
        query: function (string) {
            var s = String(string);
            return escape(s).replace(/\+/g, "%2B");
        },

        /**
        * 用做过滤直接放到<a href="javascript:alert('XXX')">中的XXX
        * @return {String}
        */
        hrefScript: function (string) {
            var s = exports.escapeScript(string);

            s = s.replace(/%/g, "%25"); //escMiniUrl
            s = exports.escapeElementAttribute(s);
            return s;

        },

        /**
        * 用做过滤直接放到正则表达式中的。
        * @return {String}
        */
        regexp: function (string) {
            var s = String(string);
            var reg = /[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g;

            return s.replace(reg, function (a, b) {
                return "\\" + a;
            });
        },

        
    };


});
