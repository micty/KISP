

/**
* 多任务处理工具类。
* @namesapce
* @name Tasks
*/
define('Tasks', function (require, module,  exports) {
    var Emitter = require('Emitter');
    var mapper = new Map();

    /**
    * 构造器。
    */
    function Tasks(list) {
        var meta = {
            'emitter': new Emitter(this),
            'list': list || [],
        };

        mapper.set(this, meta);
    }


    //实例成员。
    Tasks.prototype = {
        constructor: Tasks,

        /**
        * 并行处理。
        * @param {Array} [list] 要处理的任务列表。 如果不指定，则使用构造器中的。
        */
        parallel: function (list) {
            var meta = mapper.get(this);
            list = list || meta.list;

            //空的任务列表。
            if (!list.length) {
                meta.emitter.fire('all', []);
                return;
            }

            //非空的任务列表。
            var total = list.length;        //总项数。
            var count = total;              //待处理的项数。
            var values = new Array(total);  //收集每项异步操作的返回值。
            var dones = new Array(total);   //[true, undefined, true, ..., ] 记录对应的项是否已完成。

            list.forEach(function (item, index) {
                //done(index) 是异步调用，要多一层闭包。
                (function (index) {
                    //第三个参数是一个回调函数，即 done(value); 
                    //由业务层调用，以通知异步操作完成。
                    //done(value); 接受一个参数作为此项异步操作的返回值进行收集，
                    //最后会在全部完成后一起传过去给业务层。
                    meta.emitter.fire('each', [item, index, function (value) {
                        values[index] = value; //需要收集的值，由调用者传入。
                        dones[index] = true;
                        count--;

                        //计数为 0 时，不一定就全部完成了，
                        //因为调用者可能会恶意多次调用 done() 以使计数减少到 0。
                        //但有一点可以肯定的：只要计数不为 0，说明至少有一项未完成。
                        if (count > 0) { //性能优化
                            return;
                        }

                        //安全起见，检查每项的完成状态。
                        for (var i = 0; i < total; i++) {
                            if (!dones[i]) {
                                return;
                            }
                        }

                        //至此，全部项都已完成。
                        meta.emitter.fire('all', [values]);
                    }]);

                })(index);

            });



        },

        /**
        * 串行处理。
        * @param {Array} [list] 要处理的任务列表。 如果不指定，则使用构造器中的。
        */
        serial: function (list) {
            var meta = mapper.get(this);
            list = list || meta.list;


            //空的任务列表。
            if (!list.length) {
                meta.emitter.fire('all', []);
                return;
            }

            //非空的任务列表。
            var total = list.length;        //总项数。
            var values = new Array(total);  //收集每项异步操作的返回值。


            function process(index) {
                var item = list[index];

                //第三个参数是一个回调函数，即 done(value); 
                //由业务层调用，以通知异步操作完成。
                //done(value); 接受一个参数作为此项异步操作的返回值进行收集，
                //最后会在全部完成后一起传过去给业务层。
                meta.emitter.fire('each', [item, index, function (value) {
                    values[index] = value; //需要收集的值，由调用者传入。
                    index++;

                    if (index < total) {
                        process(index);
                    }
                    else {
                        meta.emitter.fire('all', [values]);
                    }
                }]);
            }

            process(0);

        },

        /**
        * 绑定事件。
        */
        on: function (...args) {
            var meta = mapper.get(this);
            meta.emitter.on(...args);
        },

    };


    //静态成员。
    Object.assign(Tasks, {
        /**
        * 并行执行任务列表。
        *   list: [],   //任务列表。
        *   options: {
        *       //处理每一项时的回调函数。 
        *       //在异步处理完成当前项时，须手动调用参数中的 done(value) 函数以通知处理器进行处理。
        *       each: function (item, index, done) { }, 
        *       
        *       //全部项完成时的回调函数。
        *       //会接收到每一项异步完成时的回调函数传过来的值组成的数组。
        *       all: function (values) { },
        *   },
        */
        parallel: function (list, options) {
            if (!options) {
                return;
            }

            var tasks = new Tasks(list);

            tasks.on(options);
            tasks.parallel();
        },

        /**
        * 串行执行任务列表。
        *   list: [],   //任务列表。
        *   options: {
        *       //处理每一项时的回调函数。 
        *       //在异步处理完成当前项时，须手动调用参数中的 done(value) 函数以通知处理器进行处理。
        *       each: function (item, index, done) { }, 
        *       
        *       //全部项完成时的回调函数。
        *       //会接收到每一项异步完成时的回调函数传过来的值组成的数组。
        *       all: function (values) { },
        *   },
        */
        serial: function (list, options) {
            if (!options) {
                return;
            }

            var tasks = new Tasks(list);

            tasks.on(options);
            tasks.serial();
        },

    });


    return Tasks;





    //var tasks = new Tasks([]);

    //tasks.on('each', function (item, index, done) {

    //});

    //tasks.on('all', function (values) {

    //});


    //tasks.parallel();



});
