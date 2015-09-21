

module.exports = (function (grunt) {


    var $ = require('./MiniQuery');
    var Pather = require('./Pather');
    var Path = require('path');

    var banner = grunt.file.read('partial/banner.js');
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
    * 生成 banner 信息头
    */
    function get(type, list) {

        var total = list.length;

        return $.String.format(banner, {
            'name': pkg.name,
            'description': pkg.description,
            'type': type,
            'version': pkg.version,
            'datetime': $.Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            'count': total - 2,
            'total': total,
            'list': $.Array.keep(list, function (item, index) {
                return '*    ' + getRelaivePath(item);
            }).join('\n')
        });
    }


    return {
        get: get,
    };




})(require('grunt'));