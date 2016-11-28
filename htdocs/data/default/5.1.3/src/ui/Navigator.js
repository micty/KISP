
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
            'emitter': emitter,
            'statcks': [],
            'quiet': false,
            'hash': hash,
        };

        mapper.set(this, meta);

        if (hash) { //指定了使用 hash，则监听 hash 的变化
            var self = this;
            var Url = MiniQuery.require('Url');

            Url.hashchange(window, function (hash, oldHash) {

                emitter.fire('hash-change', [hash, oldHash]);

                var quiet = meta.quiet;
                if (quiet) { //说明是 to() 方法中引起的 hash 变化或刻意不想引起，忽略。
                    meta.quiet = false;
                    return;
                }

                self.back();
            });
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
        * 已重载 back(false)，即只后退一步，并且不触发事件。 默认是触发事件的。
        * 采用不触发事件模式，是为了适应某些场景。
        * @param {Number} count 要后退的步数。 
            默认为 1，如果要一次性后退 n 步，请指定一个大于 0 的整型。
        */
        back: function (count) {

            var fireEvent = true;
            if (count === false) { //重载 back(false)，不触发事件。
                fireEvent = false;
            }

            count = count || 1;

            if (count < 0) {
                throw new Error('要后退的步数必须大于 0');
            }

            var meta = mapper.get(this);
            var statcks = meta.statcks;
           
            var currentIndex = statcks.length - 1;      //当前视图在最后一项
            var targetIndex = currentIndex - count;     //目标视图索引

            if (targetIndex < 0 ) {
                return; //直接忽略，不抛出异常。 因为实际场景中，用户可能会一直后退。
            }


            var current = statcks[currentIndex];
            var target = statcks[targetIndex];

            statcks.splice(targetIndex + 1); //删除目标视图后面的

            if (fireEvent) {
                var emitter = meta.emitter;
                emitter.fire('back', [current, target]);
                emitter.fire('change', [current, target]);
            }

            return target; //把当前视图返回去，业务层可能会用到。
        },


        /**
        * 从左边指定的位置开始移除指定数目的项。
        * @param {number} beginIndex 要进行移除的开始索引值，必须大于等于 0。
        * @param {number} [count=1] 要移除的个数。 如果不指定则默认为 1 个。
            注意: 当前视图 (堆栈最后一项) 是不能给移除的。
        */
        remove: function (beginIndex, count) {

            if (beginIndex < 0) {
                throw new Error('要移除的开始索引值必须大于或等于 0');
            }

            count = count || 1;

            if (count < 0) {
                throw new Error('要移除的个数必须大于 0');
            }


            var meta = mapper.get(this);
            var statcks = meta.statcks;

            var currentIndex = statcks.length - 1;
            var endIndex = beginIndex + count; 

            //要移除的范围为 [beginIndex, endIndex)，endIndex 不在移除的范围之内。
            if (endIndex > currentIndex) {
                throw new Error('要移除的结束索引不能包括当前索引: ' + currentIndex);
            }


            var list = statcks.splice(beginIndex, count);
            meta.emitter.fire('remove', [list]);
        },

        /**
        * 从右边指定的位置开始移除指定数目的项。
        * 已重载 removeLast(count)，此时相当于 removeLast(1, count)。
        * @param {number} beginIndex 要进行移除的开始索引值，必须大于 0。
            注意: 当前视图 (堆栈最后一项) 是不能给移除的，所以 beginIndex 必须从 1 开始
        * @param {number} [count=1] 要移除的个数。 如果不指定则默认为 1 个。
        */
        removeLast: function (beginIndex, count) {

            if (arguments.length == 1) { //重载 removeLast(count)
                count = beginIndex;
                beginIndex = 1;
            }
            else if (beginIndex < 1) {
                throw new Error('要移除的开始索引值必须大于等于 1');
            }

            if (count < 0) {
                throw new Error('要移除的个数必须大于 0');
            }


            var meta = mapper.get(this);
            var statcks = meta.statcks;

            statcks.reverse(); //先反转

            var list = statcks.splice(beginIndex, count);
            meta.statcks = statcks.reverse(); //再反转回去

            list = list.reverse();
            meta.emitter.fire('remove', [list]);

        },

        /**
        * 获取视图的总个数
        */
        count: function () {
            var meta = mapper.get(this);
            return meta.statcks.length;
        },

        /**
        * 获取堆栈历史中指定索引值的视图。
        * @param {Number} index 要获取的视图的索引值。
        *   从 0 开始，如果指定为0或正数，则从左边开始获取。
        *   如果指定为负数，则从右边开始获取。
        *   因为当此视图为 -1，倒数第二个为 -2，依次类推。
        */
        get: function (index) {
            var meta = mapper.get(this);
            var statcks = meta.statcks;
            var len = statcks.length;

            if (index < 0) {
                index = index + len;
            }

            return statcks[index];
        },

    };



    module.exports = Navigator;

});


