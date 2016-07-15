
define('Package', function (require, module, exports) {

    var $ = require('$');
    var Loader = module.require('Loader');

    var Config = require('Config');
    var defaults = Config.clone(module.id);

    var packages = null; //所有需要异步加载的视图的总配置
    var loading = null;

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
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: defaults.url,

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


    function load(name, fn) {

        var load = defaults.load || {};
        var begin = load.begin;
        var end = load.end;

        if (begin) {
            loading = begin(require, loading);
        }

        get(name, function (data) {

            if (!data) {
                end && end(require, loading);
                fn && fn();
                return;
            }

            //找到对应的配置节点，加载它所指定的资源文件
            Loader.load(data, function () {

                end && end(require, loading);
                fn && fn();

            });

        });

    }



    return {
        'load': load,
    };



});

