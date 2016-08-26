
/**
* 包资源加载器。
* @namespace
* @name Package
*/
define('Package', function (require, module, exports) {

    var $ = require('$');
    var Loader = module.require('Loader');

    var Config = require('Config');
    var defaults = Config.clone(module.id);

    var packages = null;    //所有需要异步加载的包的总配置。
    var loading = null;
    var name$pack = {};     //分包加载成功后的结果缓存。




    //加载总的包文件。
    function get(name, fn) {

        if (packages) {
            fn && fn(packages[name]);
            return;
        }

        //说明不存在总配置文件。
        if (packages === false) {
            fn && fn();
            return;
        }


        //首次加载总的 json 文件。

        var Url = require('Url');
        var url = Url.root() + defaults.url;

        $.ajax({
            type: 'get',
            dataType: 'json',
            url: url,

            error: function () {
                packages = false;   //显示指定为 false，表示已尝试加载过了。
                fn && fn();
            },

            success: function (json) {
                packages = json;
                fn && fn(json[name]);
            },
        });

    }


    



    return /**@lends Package*/{

        /**
        * 加载指定名称的包资源，并在加载完成后执行一个回调。
        * @param {string} name 包资源的名称。
        * @param {function} fn 加载完成后要执行的回调。
            该回调函数会接收到一个包资源的数据对象。
        */
        'load': function (name, fn) {

            //优化使用内存中的缓存。
            var pack = name$pack[name];
            if (pack || pack === null) {
                fn && fn(pack);
                return;
            }


            var load = defaults.load || {};
            var begin = load.begin;
            var end = load.end;

            if (begin) {
                loading = begin(require, loading);
            }

            get(name, function (data) {

                //不存在该配置节点。
                if (!data) {
                    name$pack[name] = null; //显式填充一个值，用于下次再加载时直接使用。
                    end && end(require, loading);

                    fn && fn();
                    return;
                }


                //首次加载，找到对应的配置节点，加载它所指定的资源文件。
                Loader.load(data, function (pack) {

                    name$pack[name] = pack;
                    end && end(require, loading);

                    fn && fn(pack);

                });

            });

        },
    };



});

