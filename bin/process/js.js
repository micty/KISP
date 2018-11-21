

/**
* 处理 js 文件。
*/
module.exports = function (require, packer) {
    var $ = require('$');
    var $String = $.require('String');
    var options = packer.options;

    var keys = [
        'name',
        'version',
        'edition',
    ];



    //动态替换掉由特殊标记对包裹起来的内容。
    //如 `/**{KISP.version*/.../**KISP.version}*/`
    function replaceFields(content) {
        
        keys.forEach(function (key) {
            var value = options[key];
            var begin = `/**{KISP.${key}*/`;
            var end = `/**KISP.${key}}*/`;

            if (typeof value == 'string') {
                value = "'" + value + "'";
            }

            //这里保留 KISP.edition 的值带有特殊标记，以便在 uglify 阶段进一步处理。
            if (key == 'edition') {
                value = begin + value + end;
            }

            content = $String.replaceBetween(content, {
                'begin': begin,     //如 `/**{KISP.edition*/`。
                'end': end,         //如 `/**KISP.edition}*/`。
                'value': value,     //
            });
        });

        return content;
    }



    /**
    * 只保留特定标记内的代码，其它的全删除。
    */
    function processCodes(content) {
        var regexp = /\/\/<for:[\s\S]*?>/g;
        var tags = content.match(regexp);

        if (!tags) {
            return content;
        }


        //去重
        tags = new Set(tags);
        tags = Array.from(tags); //如 tags = [ '//<for:mobile>', '//<for:pc>' ];


        console.log(tags);

        tags.forEach(function (tag) {
            //如从 `//<for:mobile>` 提取出 `mobile`。
            var name = tag.replace('//<for:', '').replace('>', '');

            if (name == options.name) {
                return;
            }


            var begin = '//<for:' + name + '>'; //如  `//<for:mobile>`
            var end = '//</for:' + name + '>';  //如  `//</for:mobile>`


            while (
                content.includes(begin) &&
                content.includes(end)) {

                content = $String.replaceBetween(content, {
                    'begin': begin,
                    'end': end,
                    'value': '',
                });
            }
        });


        return content;
    }




    packer.on('process', 'js', function (file, content, info) {

        content = replaceFields(content);
        content = processCodes(content);

        return content;

    });

};
