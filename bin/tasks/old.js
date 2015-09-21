
module.exports = function (grunt) {

    'use strict';

    var Tasks = require('../lib/Tasks');


    grunt.registerTask('old', function () {

        var baseDir = 'E:/Kingdee/kiscode/js/KISP-old/';

        Tasks.run('uglify', 'KISP-old', {
            files: [

                {
                    src: baseDir + '1.3.0/kisp.all-1.3.0.debug.js',
                    dest: baseDir + '1.3.0/kisp.all-1.3.0.min.js',
                },


                {
                    src: baseDir + '1.2.0/kisp.all.debug.js',
                    dest: baseDir + '1.2.0/kisp.all.min.js',
                },

                {
                    src: baseDir + '1.1.0/kisp.all-1.1.0.debug.js',
                    dest: baseDir + '1.1.0/kisp.all-1.1.0.min.js',
                },
                {
                    src: baseDir + '1.1.0/kisp-1.1.0.debug.js',
                    dest: baseDir + '1.1.0/kisp-1.1.0.min.js',
                },

                {
                    src: baseDir + '1.1/kisp.all.debug.js',
                    dest: baseDir + '1.1/kisp.all.min.js',
                },
                {
                    src: baseDir + '1.1/kisp.debug.js',
                    dest: baseDir + '1.1/kisp.min.js',
                },


                {
                    src: baseDir + '1.0/kisp.all.debug.js',
                    dest: baseDir + '1.0/kisp.all.min.js',
                },
                {
                    src: baseDir + '1.0/kisp.debug.js',
                    dest: baseDir + '1.0/kisp.min.js',
                },
            ],
        });


    });


};