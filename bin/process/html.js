
/**
* 处理 html 文件。
*/
module.exports = function (require, packer) {
    var $ = require('$');
    var $String = $.require('String');
    var Path = require('Path');
    var Html = require('Html');
    var File = require('File');

    var options = packer.options;


    packer.on('process', 'html', function (file, content, info) {
        var src = options.src;
        var dest = options.home;
        var minify = options.process.html.minify;



        content = Html.minify(content, minify);

        file = Path.relative(src, file);
        file = Path.join(dest, file);

        console.log(src, dest, file);

        File.write(file, content);


    });

};
