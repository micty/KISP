
/**
* 处理压缩后的文件。
*/
module.exports = function (require, packer) {
    var $ = require('$');
    var $String = $.require('String');
    var File = require('File');
    var Path = require('Path');
    var Lines = require('Lines');

    var options = packer.options;


    packer.on('before-minify', function (dest, content) {

        //把 KISP.editon 的值改成 'min'。
        var begin = '/**{KISP.edition*/';
        var end = '/**KISP.edition}*/';
        var value = "'min'";

        content = $String.replaceBetween(content, begin, end, value);

        return content;
    });
};
