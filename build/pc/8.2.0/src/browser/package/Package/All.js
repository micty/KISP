
/**
* 总包。
*/
define('Package/All', function (require, module, exports) {
    var $ = require('$');
    var Query = require('Query');
    var Url = require('Url');
    var Tasks = require('Tasks');
    var Session = require('Session');

    var sid = `all@KISP.${module.id}.${Session.id}`;
    var all = null;


    //根据配置项生成最终的 url 地址。
    function makeUrl(options) {
        var url = Url.root() + options.url;
        var query = options.query;

        if (typeof query == 'string') {
            query = Query.parse(query);
        }

        if (query) {
            url = Query.add(url, query);
        }

        if (options.random) {
            url = Query.random(url, 4);
        }

        return url;
    }



    function load(options, done) {
        var url = makeUrl(options);


        $.ajax({
            type: 'get',
            dataType: 'json',
            url: url,

            error: function () {
                all = {};
                done && done(all);
            },

            success: function (json) {
                all = json;
                done && done(all);
            },
        });
    }



    return {
        /**
        * 用异步的方式加载总包文件。
        * 即 `packages/all.json` 文件。
        * 该方法会优先使用之前加载过的缓存。
        *   options = {
        *       url: '',
        *       query: {},
        *       random: true,
        *   };
        */
        load: function (options, done) {
            if (all) {
                done && done(all);
                return;
            }


            Tasks.todo(sid, done, function (finish) {

                load(options, function (all) {
                    finish(function (done) {
                        done && done(all);
                    });
                });
            });


        },
    };



});

