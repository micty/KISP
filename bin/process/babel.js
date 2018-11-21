

var babel = require('babel-core');



/**
* 
* 生成 babel 版的文件。
*/
module.exports = function (require, packer) {
    var $ = require('$');
    var $String = $.require('String');
    var File = require('File');
    var Path = require('Path');
    var Js = require('Js');

    var options = packer.options;



    //转换。
    function transform(content) {


        //把 KISP.babel 的值改成 babel.version 值。
        content = $String.replaceBetween(content, '/**{KISP.babel*/', '/**KISP.babel}*/', `'${babel.version}'`);

        var info = babel.transform(content, {
            'presets': [
                'es2015',
            ],
            'plugins': [],
        });

        content = info.code;

        var useStrict =
            content.startsWith("'use strict';") ||
            content.startsWith('"use strict";');

        if (useStrict) {
            content = [
                '//' + content.slice(0, 13) + ' //取消 babel 自动生成的严格模式。',
                content.slice(14),
            ].join('\r\n');
        }

        return content;
    }


    //压缩。
    function minify(content, dest) {
        //把 KISP.editon 的值改成 'min'。
        content = $String.replaceBetween(content, '/**{KISP.edition*/', '/**KISP.edition}*/', `'min'`);

        Js.minify({
            'content': content,
            'dest': dest,
        });
    }


    //构建完成后触发。
    packer.on('build', function () {
        var opt = options.babel;
        var src = opt.src;
        var debug = opt.debug;
        var min = opt.min;
        var content = File.read(src);

        console.log('babel 转换'.bgCyan, src.cyan);
        content = transform(content);


        if (debug) {
            File.write(debug, content);
        }


        if (min) {
            minify(content, min);
        }

        
    });
};
