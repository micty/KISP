
/**
* 
*/
define('Template/Sample', function (require, module, exports) {
    var $String = require('String');
    var $Object = require('Object');


    var script = {
        begin: '<script type="text/template">',
        end: '</script>',
    };

    var comment = {
        begin: '<!--',
        end: '-->',
    };





    return exports = {

        /**
        * 替换掉子模板在父模板中的内容。
        *   sample: 父模板的内容。
        *   item: 解析到的模板数据结构。
        */
        replace: function (sample, item) {
            var outerHTML = item.outerHTML;
            var placeholder = item.placeholder;

            if (placeholder) {
                placeholder = '{' + placeholder + '}';
            }


         
            sample = exports.removeScript(sample);

            sample = sample.replace(outerHTML, placeholder); //这里不要用全部替换，否则可能会误及后面的。

            return sample;

        },

        /**
        * 提取 `<!--` 和 `-->` 之间的内容作为 sample。
        */
        betweenComment: function (sample) {
            if (sample.includes(comment.begin) &&
                sample.includes(comment.end)) {

                sample = $String.between(sample, comment.begin, comment.end);   //这里用提取。
            }

            return sample;
        },

        /** 
        * 移除 html 中的 `<script type="text/template">` 和 `</script>` 标签。
        * 如果不存在 script 包裹标签，则原样返回。
        */
        removeScript: function (html) {
            if (html.includes(script.begin) &&
                html.includes(script.end)) {

                html = html.split(script.begin).join('');   //这里用删除。
                html = html.split(script.end).join('');     
            }

            return html;
        },


    };


});

