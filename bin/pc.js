
var _require = require;
var packer = require('kisp-packer');
var defaults = require('./config/defaults.js');     //加载用于 new Packer(defaults) 的配置参数。

packer.launch(function (require, module, exports) {
    var File = require('File');
    var Directory = require('Directory');
    var pack = File.readJSON('../src/package.json');

    Directory.delete('../src/node_modules/');

    defaults.version = pack.version;
    defaults.name = 'pc';


    //要合并的模块。
    defaults.define.modules = [
        'Array',
        'Date',
        'Emitter',
        'Escape',
        'Fn',
        'Hash',
        'JSON',
        'Math',
        'Object',
        'Query',
        'Script',
        'String',
        'StyleSheet',
        'Tasks',
        'Tree',

        'KISP',
        'API',
        'Proxy',
        //'SSH.API',
        'Navigator',

        'Dialog',
        'Loading',
        'Mask',
        'Panel',
        'Tabs',
        'Template',
        'Toast',
        'View',

        '&.defaults',
        '&.config',
    ];



    packer.on('init', function (require, module, exports) {
        var File = require('File');
        var packer = exports.packer;
        var options = packer.options;

        function load(file) {
            _require(file)(require, packer);
        }

        load('./process/js.js');
        load('./process/html2js.js');
        load('./process/html.js');
        load('./process/define.js');
        load('./process/concat.js');
        load('./process/minify.js');
        load('./process/babel.js');
        load('./process/copy.js');
    });



    //拷到其它项目里。
    packer.on('init', function (require, module, exports) {
        var Directory = require('Directory');
        var packer = exports.packer;
        var options = packer.options;

        var dirs = [
            {
                src: `${options.home}`,
                //dest: `E:/Web/study/htdocs/f/kisp/`,
                dest: `E:/Web/kis-cloud/htdocs/f/kisp/`,
                //dest: `E:/Studio/markdoc/htdocs/f/kisp/`,
                
            },
            {
                src: `${options.home}`,
                dest: `E:/Web/kis-o2o/htdocs/f/kisp/`,
            },
            //{
            //    src: `${options.home}`,
            //    dest: `E:/Studio/markdoc-admin/htdocs/f/kisp/`,
            //},
            //{
            //    src: `${options.home}`,
            //    dest: `E:/Studio/markdoc/htdocs/f/kisp/`,
            //},
        ];


        packer.on('build', function () {

            dirs.forEach(function (item) {
                //Directory.delete(item.dest);
                Directory.copy(item.src, item.dest);
            });
        });
    });



    packer.build({
        'defaults': defaults,
    });

});




