

module.exports = (function (grunt) {


    var $ = require('./MiniQuery');
    var Pather = require('./Pather');
    var Path = require('path');

    // CMD 模块 js 文件的模板
    var sample = grunt.file.read('partial/sample.js');

    var pkg = grunt.file.readJSON('package.json');



    /**
    * 获取相对于 ../src/ 的路径表示。
    */
    function getRelaivePath(path) {
        
        path = Pather.format(path);

        return Path.relative(pkg.dir.src, path)
            .replace(/\\/ig, '/') ;
    }


    /**
    * 把 html 文件转生 js 文件
    */
    function get(html, file) {

        file = file.split('\\').join('/');

        var names = file.split('/');

        //查找第一个大写字母开头的词组。
        var index = $.Array.findIndex(names, function (name, index) {

            if (name == '..') {
                return false;
            }

            var c = name.slice(0, 1);
            return c.toUpperCase() == c;

        });

        var name = names.slice(index).join('/');
        name = name.slice(0, -5);

        var lines = html.split('\r\n');


        return $.String.format(sample, {
            'name': name,
            'file': getRelaivePath(file),
            'html': $.Array.keep(lines, function (item, index) {

                var s = "    '" + item + "',";
                return s;

            }).join('\n'),
        });
    }


    return {
        get: get,
    };




})(require('grunt'));