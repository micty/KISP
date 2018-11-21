
/**
* 生成依赖描述文件。
*/
module.exports = function (require, packer) {
    var $ = require('$');
    var $String = $.require('String');
    var File = require('File');
    var Path = require('Path');
    var Lines = require('Lines');

    var options = packer.options;


    packer.on('define', function (data) {
        //克隆一下，避免影响原业务。
        data = JSON.stringify(data);
        data = JSON.parse(data);

        //修剪掉主路径，保留相对路径。
        var home = options.home;
        var dir = options.home + 'meta/';


        var files = data.files.map(function (file) {
            return Path.relative(home, file);
        });

        var id$mod = data.id$mod;

        Object.keys(id$mod).forEach(function (id) {
            var mod = id$mod[id];
            mod.file = Path.relative(home, mod.file);
        });


        var id$file = data.id$file;

        Object.keys(id$file).forEach(function (id) {
            var file = id$file[id];
            id$file[id] = Path.relative(home, file);
        });



        File.writeJSON(`${dir}files.json`, files);
        File.writeJSON(`${dir}id$mod.json`, id$mod);
        File.writeJSON(`${dir}id$file.json`, id$file);
        File.writeJSON(`${dir}dep$ids.json`, data.dep$ids);

    });
};
