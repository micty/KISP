﻿


module.exports = function (grunt) {

    
    'use strict';

    var Tasks = require('./lib/Tasks');
    var pkg = grunt.file.readJSON('package.json');

    Tasks.setConfig({
        pkg: pkg,
        dir: pkg.dir
    });


    Tasks.load();
    Tasks.register();


    require('./tasks/cloud.js')(grunt);
    require('./tasks/default.js')(grunt);
    require('./tasks/house.js')(grunt);
    require('./tasks/old.js')(grunt);






};