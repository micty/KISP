
/**
* 
*/
define('Template/Sample', function (require, module, exports) {
    var $String = require('String');
    var $Object = require('Object');


    var beginTag = '<script type="text/template">';
    var endTag = '</script>';



    return {

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


            sample = sample.split(beginTag).join('');
            sample = sample.split(endTag).join('');
            sample = sample.replace(outerHTML, placeholder); //这里不要用全部替换，否则可能会误及后面的。

            return sample;

        },

        /**
        * 提取 `<!--` 和 `-->` 之间的内容作为 sample。
        */
        between: function (sample) {
            if (sample.includes('<!--') &&
                sample.includes('-->')) {

                sample = $String.between(sample, '<!--', '-->');
            }

            return sample;
        },


    };


});

