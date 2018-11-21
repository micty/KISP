
/**
* 处理合并后的文件。
* 主要完成：
*   加上注释头。
*/
module.exports = function (require, packer) {
    var $ = require('$');
    var $String = $.require('String');
    var $Date = $.require('Date');
    var File = require('File');
    var Path = require('Path');
    var Lines = require('Lines');
    var MD5 = require('MD5');

    var options = packer.options;
    var sample = File.read('./sample/concat.js');


    /**
    * 添加注释头。
    */
    function addHeader(files, content) {
        var total = files.length;
        var dir = options.concat.dir;

        var list = files.map(function (item, index) {
            item = Path.relative(dir, item);

            return '*    ' + item;
        });

        var md5 = MD5.get(content);
        var datetime = $Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss');

        var info = {
            'name': options.name,
            'description': options.description,
            'type': options.name,
            'version': options.version,
            'datetime': datetime,
            'md5': md5,
            'count': total - 2,
            'total': total,
            'list': list.join('\n'),
        };

        //为避免误填充到 content 中的以下字段，这里先填充模板头部。
        var sample2 = $String.format(sample, info);


        //再填充内容区。
        content = $String.format(sample2, {
            'content': content,
        });


        return Object.assign({}, info, {
            'content': content,
        });
    }



    /**
    * 获取对外公开的模块列表。
    */
    function getModules() {
        var file = `${options.home}meta/id$file.json`;
        var id$file = File.readJSON(file);
        var ids = Object.keys(id$file);

        //过滤掉私有模块。
        var modules = ids.filter(function (id) {
            return !id.includes('/'); 
        });

        return modules;
    }

    //转成符合格式的代码文本。
    function processModules(modules) {
        modules = JSON.stringify(modules, null, 4);     //
        modules = modules.replace(/"/g, "'");           //把双引号替换成单引号。
        modules = Lines.split(modules);                 //分裂成行数组。

        //调整缩进。
        var lines = modules.slice(1);
        var maxIndex = lines.length - 2;            //最后一个模块的 index。

        lines = Lines.pad(lines, 8);
        lines[maxIndex] = lines[maxIndex] + ',';    //给最后一个模块加个逗号结尾，以求统一。
        lines = [modules[0], ...lines];

        return Lines.join(lines);

    }



    packer.on('concat', function (files, content) {
        //获取可以公开的模块列表，替换掉占位符。
        //即动态写入 KISP.modules = [...];
        var begin = `/**{KISP.modules*/`;
        var end = `/**KISP.modules}*/`;
        var modules = getModules();
        var value = processModules(modules);

        content = $String.replaceBetween(content, begin, end, value);

        //生成头部。
        var info = addHeader(files, content);


        //动态写入 KISP.md5。
        //KISP.md5 与头部的注释中的 md5 是一致的。
        var begin = `/**{KISP.md5*/`;
        var end = `/**KISP.md5}*/`;
        var value = `'${info.md5}'`;

        content = $String.replaceBetween(info.content, begin, end, value);


        return content;
    });

};
