
/**
* 路径解析器。
*/
module.exports = (function (grunt) {

    'use strict';

    var Path = require('path');
    var $ = require('./MiniQuery');

    /**
    * 把 grunt 使用的占位符格式成真实的路径。
    */
    function format(path) {
        var config = grunt.config.get();
        return grunt.template.process(path, config);
    }

    /**
    * 解析路径，获取基本信息。
    */
    function parse(src) {

        var dir = Path.dirname(src) + '/';
        var ext = Path.extname(src);
        var filename = Path.basename(src);
        var basename = Path.basename(src, ext);

        return {
            'dir': dir,
            'name': dir + basename,
            'fullname': src,
            'filename': filename,
            'basename': basename,
            'ext': ext,
        };
    }

    return {

        format: format,
        parse: parse,
    };



})(require('grunt'));

