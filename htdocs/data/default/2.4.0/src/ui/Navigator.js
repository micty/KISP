
/**
* 状态导航器
* @class
* @name Navigator
*/
define('Navigator', function (require, module,  exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Mapper = MiniQuery.require('Mapper');

    var mapper = new Mapper();


    /**
    * 创建一个视图导航管理器。
    * @param {Object} config，配置参数对象，其中字段：
    * @param {function|string|boolean} [config.hash] 指示是否使用 hash，并且给定 hash 的生成规则。
        当 hash 是一个函数时，则会调用该函数，会传递当前状态的名称作为参数，
            且函数内 this 指向当前实例，取得函数返回值作为当前的 hash 值。
        当 hash 是一个字符串时，则会以它为前缀，加上当前状态的名称作为为当前的 hash 值。
        当 hash 指定为 false 时，则不启用 hash 来记录状态的变化。
        当 hash 指定为 true 时，则使用一个随机字符串来作为当前的 hash 值。
    */
    function Navigator(config) {

        Mapper.setGuid(this);

        var hash = config.hash;

        var Emitter = MiniQuery.require('Emitter');
        var emitter = new Emitter(this);

        var meta = {
            emitter: emitter,
            statcks: [],
            quiet: false,
            hash: hash,
        };

        mapper.set(this, meta);

        if (hash) { //指定了使用 hash，则监听 hash 的变化
            var self = this;
            var Url = MiniQuery.require('Url');
            Url.hashchange(window, function (hash, oldHash) {
                emitter.fire('hash-change', [hash, oldHash]);
                var quiet = meta.quiet;
                if (quiet) { //说明是 to() 方法中引起的 hash 变化，忽略。
                    meta.quiet = false;
                    return;
                }
                self.back();
            });
        }

        //预绑定事件
        var events = $.Object.filter(config, [
            'back',
            'change',
            'before-change',
            'hash-change'
        ]);

        this.on(events);

        //跳到指定状态
        var current = config.current;
        if (current) {
            this.to(current);
        }
        

    }

    //实例方法
    Navigator.prototype = /**@lends Navigator#*/ {
        constructor: Navigator,

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);
        },


        /**
        * 跳转到指定的视图，并传递一些参数。
        */
        to: function (name, arg0, arg1) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var statcks = meta.statcks;

            var current = statcks.slice(-1)[0]; //取得最后一个
            if (current) {
                emitter.fire('before-to', current);
                emitter.fire('before-to', [current, name]); //总事件
            }

            
            statcks.push(name);
            var args = [].slice.call(arguments, 0);

            emitter.fire('to', name, args.slice(1)); //先触发具体视图的事件
            emitter.fire('to', args); //最后触发总的事件

            emitter.fire('change', [current, name]);


            var hash = meta.hash;
            hash = !hash ? false :
                (
                    typeof hash == 'function' ? hash.call(this, name) :
                    typeof hash == 'string' ? hash + name : 
                    hash === true ? $.String.random() : false
                );

            if (hash) { //指定了使用 hash，则设置 hash
                meta.quiet = true; //前进时会导致 hash 发生变化，设置此标志告诉到 hash-change 事件

                var Url = MiniQuery.require('Url');
                Url.setHash(window, hash);
            }
        },


        /**
        * 后退。
        */
        back: function () {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var statcks = meta.statcks;

            var lastIndex = statcks.length - 1;
            if (lastIndex == 0) {
                return;
            }

            var current = statcks.pop();
            var target = statcks[lastIndex - 1];
            emitter.fire('back', [current, target]);
            emitter.fire('change', [current, target]);


        },

        /**
        * 获取当前视图的名称。 
        */
        current: function () {
            var meta = mapper.get(this);
            var statcks = meta.statcks;
            return statcks.slice(-1)[0]; //取得最后一个
        },


    };



    module.exports = Navigator;

});


