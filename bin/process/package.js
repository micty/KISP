




/**
* 构建完成后，把 package.json 文件复制出来。
*/
module.exports = function (require, packer) {
    var File = require('File');
    var Directory = require('Directory');

    var options = packer.options;



    //构建完成后触发。
    packer.on('build', function () {
        var src = `${options.src}package.json`;
        var dest = `${options.home}package.json`;

        File.copy(src, dest);
    });
};

