
module.exports = function (grunt) {
    
    'use strict';

    var Tasks = require('./lib/Tasks');
    var $ = require('./lib/MiniQuery');
    var LinearPath = require('./lib/LinearPath');
    var Banner = require('./lib/Banner');
    var Sample = require('./lib/Sample');
    var Path = require('path');


    var pkg = grunt.file.readJSON('package.json');

    Tasks.setConfig({
        pkg: pkg,
        dir: pkg.dir
    });

    Tasks.load();
    Tasks.register();


    var name = this.cli.tasks[0] || 'default';

    grunt.registerTask(name, function () {

        var config = require('./task/' + name + '.js');
        var srcFiles = config.srcFiles;
        var htmlFiles = config.htmlFiles; //需要单独存在的 html 文件。

        var home = '<%=dir.build%>' + name + '/<%=pkg.version%>/';
        var destSrc = home + 'src/';

        var list = LinearPath.linearize({
            dir: '<%=dir.src%>',
            files: srcFiles,
        });


        var destList = LinearPath.linearize({
            'dir': destSrc,
            'files': srcFiles,
        });

        var files = LinearPath.linearize({
            dir: home,
            files: [
                'kisp.debug.js',
                'kisp.min.js',
            ],
        });

        Tasks.run('clean', name, {
            src: home,
            options: {
                force: true, //允许删除当前工作目录外的其他文件
            },
        });



        //把源文件拷到 build 目录，并作预处理，插入相关的信息。
        copy({
            src: '<%=dir.src%>',
            dest: destSrc,
            files: srcFiles,

            process: function (content, file) {
                var ext = Path.extname(file).toLowerCase();
                if (ext == '.html') {
                    return Sample.get(content, file);
                }

                // js 文件
                return replace(content, {
                    'name': "'" + name + "'",
                    'version': "'" + pkg.version + "'",
                    'files': '[]',
                });
            }
        });


        //处理需要独立存在的 html 文件。
        if (htmlFiles) {
            copy({
                src: '<%=dir.src%>',
                dest: destSrc,
                files: htmlFiles,
            });
        }


        //合并。
        Tasks.run('concat', name, {
            dest: files[0],
            src: destList,
            options: {
                banner: Banner.get(name, list),
            },
        });

        //压缩。
        Tasks.run('uglify', name, {
            src: files[0],
            dest: files[1],
            options: {
                sourceMap: false,
            },
        });


        //css
        style(false);
        style(true);



        //生成 jsdoc.bat 到 build/{home} 目录
        copy({
            src: './jsdoc.bat',
            dest: home + 'jsdoc.bat',
          
            process: function (s) {

                return $.String.format(s, {
                    'name': name,
                    'version': pkg.version,
                    'list': $.Array.keep(list.slice(1, -2), function (item, index) {
                        item = item.replace('<%=dir.src%>', '%src%');
                        return item;

                    }).join(' ^\r\n'),
                });
            },
        });





        //生成 sidebar.json 到 {home} 目录
        copy({
            src: './sidebar.json',
            dest: home + 'sidebar.json',

            process: function (s) {
                return $.String.format(s, {
                    'title': pkg.name,
                    'version': pkg.version,
                });
            },
        });





        if (name == 'default') {

            //处理需要独立存在的 html 文件。
            if (htmlFiles) {
                //copy({
                //    src: destSrc,
                //    dest: home,
                //    files: htmlFiles,
                //});

                Tasks.run('htmlmin', $.String.random(), {
                 
                    files: LinearPath.pair(destSrc, home, htmlFiles),

                    options: {
                        collapseWhitespace: true,
                        removeEmptyAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        removeRedundantAttributes: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                        keepClosingSlash: true,
                    }
                });
            }



            //生成 readme.md 到 htdocs/data/ 目录
            copy({
                src: './readme.md',
                dest: '<%=dir.htdocs%>data/readme.md',
                process: function (s) {
                    return $.String.format(s, {
                        'type': name,
                        'version': pkg.version,
                    });
                },
            });

            //拷贝 htdocs/data/readme.md 到 / 根目录
            copy({
                src: '<%=dir.htdocs%>data/readme.md',
                dest: '<%=dir.root%>readme.md',
            });

        }
      



        //顺便要把生成好的文件拷到其它项目中。
        var copyTo = config.copyTo;
        if (copyTo && !Array.isArray(copyTo)) {
            copyTo = [copyTo];
        }

        copyTo.forEach(function (dest) {

            var files = [
                'kisp.debug.js',
                'kisp.debug.css',
                'kisp.min.js',
                'kisp.min.css',
            ];

            if (htmlFiles) {
                files = files.concat(htmlFiles);
            }

            console.log(files)

            copy({
                src: home,
                dest: dest,
                files: files,
            });


        });



        //----------------------------------------------

   
        function copy(src, dest, files, process) {

            //重载 copy({});
            if (typeof src == 'object') {
                var obj = src;
                src = obj.src;
                dest = obj.dest;
                files = obj.files;
                process = obj.process;
            }


            //重载:
            //  copy(src, dest, process);
            //  copy(src, dest);
            if (!Array.isArray(files)) {
                process = files;
                files = null;
            }

            var target = $.String.random();
            var options = process ? { 'process': process } : null;


            if (files) {
                files = LinearPath.pair(src, dest, files);

                Tasks.run('copy', target, {
                    'files': files,
                    'options': options,
                });
            }
            else {
                Tasks.run('copy', target, {
                    'src': src,
                    'dest': dest,
                    'options': options,
                });
            }
        }



        function replace(content, name, value) {

            if (typeof name == 'object') { // 重载 replace(content, {...})
                $.Object.each(name, function (name, value) {
                    content = replace(content, name, value);
                });

                return content;
            }

            var begin = '/**grunt-' + name + '-begin*/';
            var end = '/**grunt-' + name + '-end*/';

            return $.String.replaceBetween(content, begin, end, value);
        }


        //处理 css
        function style(compressed) {

            var type = compressed ? 'min' : 'debug';

            Tasks.run('less', type, {
                options: {
                    'compress': compressed,
                },

                expand: true,
                ext: '.' + type + '.css',
                src: '<%=dir.less%>**/*.less',

                //生成 .css 到 /css/ 目录
                rename: function (src, dest) {
                    var basename = Path.basename(dest);
                    dest = pkg.dir.css;

                    return Path.join(dest, basename);
                },
            });

            Tasks.run('concat', 'css-' + type, {
                dest: home + 'kisp.' + type + '.css',
                src: '<%=dir.css%>**/*.' + type + '.css',
            });
        }

    });


    





    


};