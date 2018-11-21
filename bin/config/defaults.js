


module.exports = {
    name: 'pc',
    version: '',

    home: '../build/{name}/{version}/',
    src: '{home}src/',

    console: {
        file: '{home}meta/console.log',
        timestamp: true,
    },

    //构建前的复制。
    copy: {
        src: '../src/',
        dest: '{src}',
    },


    process: {
        js: {
            dir: '{src}',
            files: [
                '**/*.js',
            ],
        },

        html2js: {
            dir: '{src}',
            files: [
                '**/*.html',

                '!iframe/**/*.html',
            ],
        },

        html: {
            dir: '{src}',
            files: [
                'iframe/**/*.html',
            ],
            minify: {
                collapseWhitespace: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeRedundantAttributes: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
                keepClosingSlash: true,
            },
        },
    },

    define: {
        dir: '{src}',

        files: [
            '**/*.js',

            '!bak/**/*.js',
            '!**/*副本*.js',

            '!partial/**/*',
            '!data/defaults/**/*',
            '!data/config/**/*',

            '&data/defaults/common/**/*.js',
            '&data/defaults/{name}/**/*.js',
            '&data/config/{name}/**/*.js',
        ],

        modules: [
            //'KISP',
            //'Loading',

            //'&.defaults',
            //'&.config',
        ],
    },

    concat: {
        dir: '{src}',

        begins: [
            'partial/begin.js',
            'base/Module.js',
            'base/ModuleManager.js',
            'base/InnerModules.js',
        ],
        ends: [
            'partial/end.js',
        ],

        dest: '{home}kisp.debug.js',
    },

    minify: {
        src: '{concat.dest}',
        dest: '{home}kisp.min.js',
    },

    less: {
        dir: '{src}',
        files: [
            '**/*.less',
        ],

        debug: '{home}kisp.debug.css',
        min: '{home}kisp.min.css',
    },

    babel: {
        src: '{home}kisp.debug.js',
        debug: '{home}kisp.babel.debug.js',
        min: '{home}kisp.babel.min.js',
    },

    jquery: {
        src: '{src}f/jquery',
        dest: '{home}jquery',
    },

};