
/**
* 对 Grunt 提供一些集成的任务和配置管理方法。
*/
module.exports = (function (grunt, $) {

    'use strict';


    var list = [];          //有序的任务名称列表
    var name$config = {};   //所有任务的 config 集合，即 grunt 使用的总 config


    /**
    * 添加一个指定的任务名称、任务目标和配置对象到任务列表中。
    * 重载: 
        add(name, config);
        add(name, target, config);
    * @param {string} name 任务名称。
    * @param {string} [target] 任务目标。
    * @param {Object} config 任务的配置对象。
    */
    function add(name, target, config) {

        // 重载 add(name, config)
        if (typeof target == 'object') { 
            name$config[name] = config;
            list.push(name);
            grunt.initConfig(name$config);
            return;
        }

        //重载 add(name, target, config)
        var obj = name$config[name] = name$config[name] || {};
        obj[target] = config;
        name = name + ':' + target; //设置正确的任务名称
        list.push(name);
        grunt.initConfig(name$config);

    }



    /**
    * 设置配置对象。
    */
    function setConfig(config) {
        $.Object.extend(name$config, config);
        grunt.initConfig(name$config);
    }



    /**
    * 加载任务。
    * 重载: 
        load();
        load(names);
        load(name);
    */
    function load(names) {

        if (!names) {
            //自动分析 package.json 文件，并加载所找到的 grunt 模块
            //详见 https://www.npmjs.com/package/load-grunt-tasks/
            require('load-grunt-tasks')(grunt);
        }
        else if (names instanceof Array) {
            $.Array.each(names, function (name, index) {
                grunt.loadNpmTasks(name);
            });
        }
        else if (typeof names == 'string') {
            grunt.loadNpmTasks(names);
        }
        else {
            throw new Error('参数非法。');
        }
        
    }


    /**
    * 运行指定名称和目标的任务。
    * 重载:
        run(name, config);
        run(name, target, config);
    */
    function run(name, target, config) {
     
        if (typeof target == 'object') { //重载 run(name, config)
            config = target;
            add(name, config);
        }
        else { //重载 run(name, target, config);
            add(name, target, config);
            name = name + ':' + target
        }

        grunt.task.run(name);

    }

    /**
    * 注册任务。
    * 重载: 
        register(name, tasks);
        register(tasks);
        register(name, fn);
    */
    function register(name, tasks) {

        if (name instanceof Array) { //register(tasks)
            tasks = name;
            name = 'default';
        }

        grunt.registerTask(name || 'default', tasks || list);
    }




    return {
        add: add,
        run: run,
        load: load,
        setConfig: setConfig,
        register: register,
    };


})(require('grunt'), require('./MiniQuery'));

