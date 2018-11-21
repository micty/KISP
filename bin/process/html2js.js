
/**
* 把 html 文件转成 js 模块。
*/
module.exports = function (require, packer) {
    var $ = require('$');
    var $String = $.require('String');
    var File = require('File');
    var Path = require('Path');
    var Lines = require('Lines');

    var options = packer.options;
    var modules = options.define.modules;
    var sample = File.read('./sample/html2js.js');


    packer.on('process', 'html2js', function (file, content, info) {
        var lines = Lines.split(content);
        var parts = file.split('/');

        console.log('解析 html 文件名:'.bgGreen, file);


        //查找第一个大写字母开头的词组。
        var index = parts.findIndex(function (id, index) {
            return (/^[A-Z]$/g).test(id[0]);
        });

        var id = parts.slice(index).join('/');  //如 `Loading/Sample/iOS.html`。
        var ext = Path.ext(id);                 //如 `.html`。

        id = id.slice(0, 0 - ext.length);       //去掉后缀，如 `Loading/Sample/iOS`。

        console.log('生成 js 模块:'.bgCyan, id.cyan);
        modules.push(id);


        lines = lines.map(function (item, index) {
            return `    '${item}',`;
        });

        var html = Lines.join(lines);
        var dest = file + '.js';

        content = $String.format(sample, {
            'id': id,
            'file': file,
            'html': html,
        });

        File.write(dest, content);

    });

};
