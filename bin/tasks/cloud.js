
module.exports = function (grunt) {

    'use strict';

    var $ = require('../lib/MiniQuery');
    var LinearPath = require('../lib/LinearPath');
    var Tasks = require('../lib/Tasks');
    var Banner = require('../lib/Banner');
    var Sample = require('../lib/Sample');
    var Path = require('path');


    var name = 'cloud';

    var srcFiles = [
        'partial/' + name + '/begin.js',
        {
            dir: 'core',
            files: [
                'Module.js',
                '$.js',
                'MiniQuery.js',
                'IScroll.js',
                'iSlider.js',
                'KISP.js',
            ]
        },
        //{
        //    dir: 'compatible',
        //    files: [
        //        {
        //            dir: 'jquery',
        //            files: [
        //                'animate.js',
        //            ],
        //        },
        //    ],
        //},
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
                //'DOM.js',
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
                'CloudAPI.js',

                //'SSH.js',
                //{
                //    dir: 'SSH',
                //    files: [
                //        'Ajax.js',
                //        'Server.js',
                //        {
                //            dir: 'Server',
                //            files: [
                //                'Config.js'
                //            ],
                //        },
                //    ]
                //},
                //'SSH.API.js',
                //'SSH.API/Ajax.js',

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
            dir: 'third-party',
            files: [
                {
                    dir: 'cloud-home',
                    files: [
                        {
                            dir: 'CloudHome',
                            files: [
                                'Native.js'
                            ],
                        },
                        'CloudHome.API.js',
                        'CloudHome.js',
                        'CloudHome.Title.js',
                        {
                            dir: 'ImageReader',
                            files: [
                                'Renderer.js'
                            ],
                        },
                        'ImageReader.js',
                    ],
                },
                //{
                //    dir: 'seajs',
                //    files: [
                //        'Seajs.js',
                //    ],
                //},
                {
                    dir: 'wechat',
                    files: [
                        {
                            dir: 'WeChat',
                            files: [
                                'JsApiList.js',
                                'Lib.js',
                                'Signature.js',
                            ],
                        },
                        'WeChat.js',
                    ],
                },
            ],
        },
        {
            dir: 'ui',
            files: [
                'App.js',
                {
                    dir: 'App',
                    files: [
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
                        'ImageSlider.js',
                        'ImageViewer.js',
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
                'NoData.js',
                {
                    dir: 'NoData',
                    files: [
                        'Renderer.js',
                        'Sample.html',
                        'Style.js',
                    ],
                },
                'NumberPad.js',
                {
                    dir: 'NumberPad',
                    files: [
                        'Renderer.js',
                        'Sample.html',
                        'Style.js',
                    ],
                },
                'Panel.js',
                'Scroller/pull.js',
                'Scroller.js',
                'Slider.js',
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
        {
            dir: 'jquery-plugin',
            files: [
                'touch.js',
            ]
        },
        {
            dir: 'partial/' + name,
            files: [
                {
                    dir: 'defaults',
                    files: [
                        {
                            dir: 'api',
                            files: [
                                'API.js',
                                'CloudAPI.js',
                                'Proxy.js',
                                //'SSH.API.js',
                                //'SSH.js',
                                //'SSH/Server.js',
                                //'SSH/Server/Config.js',
                            ],
                        },
                        {
                            dir: 'excore',
                            files: [
                                //'DOM.js',
                                'LocalStorage.js',
                                'Module.js',
                                'SessionStorage.js',
                                'Url.js',
                            ],
                        },
                        {
                            dir: 'third-party',
                            files: [
                                'CloudHome.API.js',
                                'ImageReader.js',
                                'WeChat.js',
                                'WeChat/Signature.js',
                            ],
                        },
                        {
                            dir: 'ui',
                            files: [
                                'Alert.js',
                                'App.js',
                                'Dialog.js',
                                'ImageSlider.js',
                                'ImageViewer.js',
                                'Loading.js',
                                'Mask.js',
                                'NoData.js',
                                'NumberPad.js',
                                'Panel.js',
                                'Scroller.js',
                                'Tabs.js',
                                'Template.js',
                                'Toast.js',
                                'View.js',
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
    * 运行 grunt cloud 即可调用本任务
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
                //src: '<%=dir.less2%>**/*.less',
                
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




        //生成 jsdoc.bat 到 {home} 目录
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

        //生成 sidebar.json 到 {home} 目录
        Tasks.run('copy', name + '/sidebar', {
            src: './sidebar.json',
            dest: home + '/sidebar.json',
            options: {
                process: function (s) {
                    var pkg = grunt.file.readJSON('package.json');

                    return $.String.format(s, {
                        'title': pkg.name,
                        'version': pkg.version,
                    });
                },
            }
        });

        //生成 readme.md 到 htdocs/data/ 目录
        Tasks.run('copy', name + '/data/readme', {
            src: './readme.md',
            dest: '<%=dir.htdocs%>data/readme.md',
            options: {
                process: function (s) {
                    var pkg = grunt.file.readJSON('package.json');

                    return $.String.format(s, {
                        'type':name,
                        'version': pkg.version,
                    });
                },
            }
        });

        //拷贝 htdocs/data/readme.md 到 / 根目录
        Tasks.run('copy', name + '/readme', {
            src: '<%=dir.htdocs%>data/readme.md',
            dest: '<%=dir.root%>readme.md',
        });



        //for test

        //生成到 vStore 目录
        Tasks.run('copy', name + '/vStore', {
            files: LinearPath.pair(home, 'E:/Kingdee/vStore/htdocs/f/kisp', [
                'kisp.debug.js',
                'kisp.min.js',
                'kisp.debug.css',
                'kisp.min.css',
            ]),

        });

        //生成到 vGuide 目录
        Tasks.run('copy', name + '/vGuide', {
            files: LinearPath.pair(home, 'E:/Kingdee/vGuide/htdocs/f/kisp', [
                'kisp.debug.js',
                'kisp.min.js',
                'kisp.debug.css',
                'kisp.min.css',
            ]),

        });



    });


};