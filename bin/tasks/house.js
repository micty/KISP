
module.exports = function (grunt) {

    'use strict';

    var $ = require('../lib/MiniQuery');
    var LinearPath = require('../lib/LinearPath');
    var Tasks = require('../lib/Tasks');
    var Banner = require('../lib/Banner');
    var Sample = require('../lib/Sample');
    var Path = require('path');


    var name = 'house';

    var srcFiles = [
        'partial/' + name + '/begin.js',
        {
            dir: 'core',
            files: [
                'Module.js',
                '$.js',
                'MiniQuery.js',
                'KISP.js',
            ]
        },
        {
            dir: 'crypto',
            files: [
                'MD5.js',
            ]
        },
        {
            dir: 'excore',
            files: [
                'Config.js',
                'Defaults.js',
                'Config/Url.js',
                'Edition.js',
                'File.js',
                'Fn.js',
                'JSON.js',
                'LocalStorage.js',
                'Mapper.js',
                'Module.js',
                'RandomId.js',
                'SessionStorage.js',
                'Style.js',
                'Url.js',
            ]
        },
        {
            dir: 'api',
            files: [
                'API.js',
                'API/Ajax.js',
                'Proxy.js',
                {
                    dir: 'Proxy',
                    files: [
                        'Url.js',
                    ],
                },
            ]
        },
        {
            dir: 'ui',
            files: [
                'App.js',
                {
                    dir: 'App',
                    files: [
                        'Module.js',
                        'Nav.js',
                        'Transition.js',
                    ],
                },
                {
                    dir: 'dialog',
                    files: [
                        'Alert.js',
                        {
                            dir: 'Alert',
                            files: [
                                'Dialog.js',
                                'Sample.html',
                            ],
                        },
                        'Confirm.js',
                        'Dialog.js',
                        {
                            dir: 'Dialog',
                            files: [
                                {
                                    dir: 'Sample',
                                    files: [
                                        'iOS.html',
                                    ],
                                },
                                'Renderer.js',
                                'Sample.js',
                                'Style.js',
                            ],
                        },
                        'Loading.js',
                        {
                            dir: 'Loading',
                            files: [
                                {
                                    dir: 'Sample',
                                    files: [
                                        'iOS.html',
                                    ],
                                },
                                'Presettings.js',
                                'Sample.js',
                                'Style.js',
                            ],
                        },
                        'Mask.js',
                        {
                            dir: 'Mask',
                            files: [
                                'Sample.html',
                                'Style.js',
                            ],
                        },
                        'Toast.js',
                        {
                            dir: 'Toast',
                            files: [
                                {
                                    dir: 'Sample',
                                    files: [
                                        'font-awesome.html',
                                    ],
                                },
                                'Renderer.js',
                                'Sample.js',
                                'Style.js',
                            ],
                        },
                    ],
                },

                'Navigator.js',
                'Package.js',
                {
                    dir: 'Package',
                    files: [
                        'Loader.js',
                    ],
                },
                'Panel.js',
                'Tabs.js',
                {
                    dir: 'Tabs',
                    files: [
                        'Helper.js',
                    ],
                },
                'Template.js',
                {
                    dir: 'Template',
                    files: [
                        'Multiple.js',
                        'Simple.js',
                        'Static.js',
                    ],
                },

                'View.js',
            ]
        },
        {   //通用配置
            dir: 'defaults',
            files: [
                {
                    dir: 'api',
                    files: [
                        'API.js',
                        'Proxy.js',
                    ],
                },
                {
                    dir: 'excore',
                    files: [
                        'LocalStorage.js',
                        'Module.js',
                        'SessionStorage.js',
                        'Url.js',
                    ],
                },
                {
                    dir: 'ui',
                    files: [
                        'Alert.js',
                        'App.js',
                        'Dialog.js',
                        'Loading.js',
                        'Mask.js',
                        'Panel.js',
                        'Tabs.js',
                        'Template.js',
                        'Toast.js',
                        'View.js',
                    ],
                },
            ],
        },
        {
            dir: 'partial/' + name,
            files: [
                {   //差异化的配置
                    dir: 'config',
                    files: [
                        {
                            dir: 'ui',
                            files: [
                                'Alert.js',
                                'Dialog.js',
                                'Loading.js',
                                'Mask.js',
                                'Tabs.js',
                                'Toast.js',
                            ],
                        },
                    ],
                },
                'expose.js',
                'end.js',
            ]
        },
    ];


    var list = LinearPath.linearize({
        dir: '<%=dir.src%>',
        files: srcFiles,
    });

    console.dir(list);



    

    /*
    * 运行 grunt default 即可调用本任务
    */
    grunt.registerTask(name, function (level) {
        

        var pkg = grunt.file.readJSON('package.json');
        var home = '<%=dir.build%>' + name + '/<%=pkg.version%>';
        var destSrc = home + '/src/';
  
        var destList = LinearPath.linearize({
            dir: destSrc,
            files: srcFiles,
        });
     
        var files = LinearPath.linearize({
            dir: home,
            files: [
                'kisp.debug.js',
                'kisp.min.js',
                'kisp.min.js.map'
            ]
        });
     
        Tasks.run('clean', name, {
            src: home,
            options: {
                force: true //允许删除当前工作目录外的其他文件
            }
        });
      
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
                    compress: compressed,
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
                dest: home + '/kisp.' + type + '.css',
                src: '<%=dir.css%>**/*.' + type + '.css',
            });
        }


        var sample = grunt.file.read('partial/sample.js');
     
        //预处理，插入 grunt 标记相关的信息
        Tasks.run('copy', name, {
            dest: destSrc,
            src: list,
            options: {
               
                process: function (content, file) {
                    file = file.split('\\').join('/');

                    var ext = Path.extname(file).toLowerCase();

                    if (ext == '.html') {
                        return Sample.get(content, file);
                    }


                    // js 文件
                    return replace(content, {
                        'name': "'" + name + "'",
                        'version': "'" + pkg.version + "'",


                        'files': (function (list) {

                            return '[]'; //暂时置空吧，为了减小文件大小。


                            list = LinearPath.linearize({
                                dir: '',
                                files: list,
                            });

                            list = JSON.stringify(list, null, 4).split('\n');

                            return $.Array.keep(list, function (item, index) {
                                if (index == 0) {
                                    return item;
                                }

                                return '        ' + item.replace(/"/g, "'");

                            }).join('\n');

                        })(srcFiles),
                    });

                    

                    
                },
            },
        });
       
        Tasks.run('concat', name, {
            dest: files[0],
            src: destList,
            options: {
                banner: Banner.get(name, list),
            },
        });


        Tasks.run('uglify', name, {
            src: files[0],
            dest: files[1],
            options: {
                sourceMap: level > 0
            }
        });


        //css
        style(false);
        style(true);




        //生成 jsdoc.bat 到 build/{home} 目录
        Tasks.run('copy', name + '/jsdoc', {
            src: './jsdoc.bat',
            dest: home + '/jsdoc.bat',
            options: {
                process: function (s) {
                    var pkg = grunt.file.readJSON('package.json');

                    return $.String.format(s, {
                        'name': name,
                        'version': pkg.version,
                        'list': $.Array.keep(list.slice(1, -2), function (item, index) {
                            item = item.replace('<%=dir.src%>', '%src%');
                            return item;

                        }).join(' ^\r\n'),
                    });
                },
            }
        });



        //for test

        //生成到 house 目录

        //Tasks.run('copy', name + '/house-admin', {
        //    files: LinearPath.pair(home, 'I:/Studio/house/admin/htdocs/f/kisp', [
        //        'kisp.debug.js',
        //        'kisp.min.js',
        //        'kisp.debug.css',
        //        'kisp.min.css',
        //    ]),
        //});

        //Tasks.run('copy', name + '/house-demo', {
        //    files: LinearPath.pair(home, 'I:/Studio/house/demo/htdocs/f/kisp', [
        //        'kisp.debug.js',
        //        'kisp.min.js',
        //        'kisp.debug.css',
        //        'kisp.min.css',
        //    ]),
        //});



        Tasks.run('copy', name + '/house-admin', {
            files: LinearPath.pair(home, 'E:/Kingdee/house/admin/htdocs/f/kisp', [
                'kisp.debug.js',
                'kisp.debug.css',
                'kisp.min.js',
                'kisp.min.css',
            ]),

        });

        Tasks.run('copy', name + '/house-demo', {
            files: LinearPath.pair(home, 'E:/Kingdee/house/demo/htdocs/f/kisp', [
                'kisp.debug.js',
                'kisp.debug.css',
                'kisp.min.js',
                'kisp.min.css',
            ]),

        });
       
      


    });


};