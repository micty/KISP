/**
* 构建完成后:
*   把 jquery 目录复制出来。
*   把 package.json 文件复制出来。
*   把 readme.md 文件复制出来。
*/
module.exports = function (require, packer) {
    var File = require('File');
    var Directory = require('Directory');

    var options = packer.options;



    //把 jquery 目录复制出来。
    packer.on('build', function () {
        var opt = options.jquery;
        var src = opt.src;
        var dest = opt.dest;

        console.log('复制目录:', src.yellow, '→', dest.yellow);

        Directory.copy(src, dest);

    });


    //把 package.json 文件复制出来。
    //把 readme.md 文件复制出来。
    packer.on('build', function () {
        var files = [
            'package.json',
            'readme.md',
        ];

        files.forEach(function (file) {
            var src = `${options.src}${file}`;
            var dest = `${options.home}${file}`;

            File.copy(src, dest);

        });
    });

};

