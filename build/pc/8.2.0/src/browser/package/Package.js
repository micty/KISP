
/**
* 包资源加载器。
* @namespace
* @name Package
*/
define('Package', function (require, module, exports) {
    var $ = require('$');
    var Tasks = require('Tasks');
    var Session = require('Session');
    var Defaults = require('Defaults');
    var All = module.require('All');
    var Loader = module.require('Loader');

    var defaults = Defaults.clone(module.id);
    var name$pack = {};     //分包名称对应包信息。
    var loading = null;     //加载中 Loading 的实例。
    var prefix = `KISP.${module.id}.${Session.id}`;


    //实际加载函数。
    function load(name, defaults, done) {
        var opt = defaults.load || {};
        var begin = opt.begin;
        var end = opt.end;

        //开始异步加载前的提示函数。
        //如可以在提示函数中创建 loading 实例，并 show() 出来。
        if (begin) {
            loading = begin(require, loading);  //开始 loading 提示。
        }


        //加载总包。
        All.load(defaults, function (name$type$url) {
            var type$url = name$type$url[name]; //该名称对应的包资源。

            //不存在该配置节点。
            if (!type$url) {
                console.warn(`总包  ${defaults.url} 中不存在名为 ${name} 的配置节点。`);
                end && end(require, loading);   //结束 loading 提示。
                done && done(null);
                return;
            }

            //并行加载对应的资源文件，如 `css`、`html`、`js`。
            Loader.load(type$url, function (pack) {
                //异步加载结束后的提示函数。
                //如可以在提示函数中 loading.hide() 进行隐藏。
                end && end(require, loading);

                //给外面的回调函数提供一个非缓存版本，以指示是第一次加载的。
                done && done(pack); //里面 pack.cache = false。
            });


        });

    }




    return {
        /**
        * 加载指定名称的包资源，并在加载完成后执行一个回调。
        * 对于分包资源的加载，支持同一个分包的多次并发请求，实际只会加载一次。 加载完成后会依次执行回调函数。
        * 已重载 load(done);       //加载总包文件。 此时回调函数接受到的数据结构为总包 json 文件中的结构。
        * 已重载 load(name, done); //加载指定名称的分包资源。
        * @param {string} name 分包的资源名称。
        * @param {function} done 加载完成后要执行的回调函数。
        *   该回调函数会接收到一个包资源的数据对象。
        *   可能会包含一种或多种类型。 
        *   也可能是接收到一个 null(说明不存在该名称对应的包信息)。
        *   该名称对应的包资源存在的情况下，回调函数的接收到参数结构：
        *   done({
        *       cache: true|false,  //指示是否从缓存中读取的。
        *       css: {
        *           type: '',       //资源类型。 如 `css`、`html`、`js`。
        *           url: '',        //资源地址。
        *           content: '',    //资源内容。 css 的为空串。
        *       },
        *       html: {
        *           type: '',       //资源类型
        *           url: '',
        *           content: '',
        *       },
        *       js: {
        *           type: '',       //资源类型
        *           url: '',
        *           content: '',
        *       },
        *   });
        */
        load: function (name, done) {
            //重载 load(done); 
            //加载总包文件。
            if (typeof name == 'function') {
                done = name;
                All.load(defaults, done);
                return;
            }


            //重载 load(name, done);
            //加载分包的资源。
            var pack = name$pack[name];

            //已加载过了，优先使用内存中的缓存。
            //如果为 null，说明已经加载过了但不存在该名称对应的配置节点。
            if (pack || pack === null) {
                done && done(pack);
                return;
            }


            //支持同一个分包的多次并发请求，实际只会加载一次。 
            //加载完成后会依次执行回调函数。
            var todo = { 'done': done, }; //待办项。
            var sid = `${name}@${prefix}`;

            Tasks.todo(sid, todo, function (finish) {

                load(name, defaults, function (pack) {
                    if (pack) {
                        //保存一个新的缓存版本，供下次直接使用。
                        name$pack[name] = Object.assign({}, pack, {
                            cache: true,
                        });
                    }
                    else {
                        //显式填充一个值，用于下次再加载时直接使用。
                        name$pack[name] = null;         
                    }

                    finish(function (todo) {
                        todo.done(pack);
                    });

                });
            });


        },
    };



});

