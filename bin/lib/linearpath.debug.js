
/*!
* LinearPath Util JavaScript Library for node
* version: 0.1.0
*/
;( function (
    global, 
    module,
    undefined
) {





//数组辅助工具类
var $Array = {

    keep: function (array, fn) {
        var a = [];
        for (var i = 0, len = array.length; i < len; i++) {
            var item = array[i];
            var value = fn(item, i);
            a.push(value);
        }
        return a;
    },

    /**
    * 给数组降维，返回一个新数组。
    * 可以指定降维次数，当不指定次数，默认为 1 次。
    */
    reduceDimension: function (array, count) {
        count = count || 1;

        var a = array;
        var concat = [].concat; //缓存一下方法引用，以提高循环中的性能

        for (var i = 0; i < count; i++) {
            a = concat.apply([], a);
        }

        return a;
    },

};




var LinearPath = (function ($Array) {

    /**
    * 内部方法
    * @inner
    */
    function combine(dir, files, state) {

        if (dir && dir.slice(-1) != '/') { //确保以 '/' 结束，统一约定，不易出错
            dir += '/';
        }

        var depth = 1;

        return $Array.keep(files, function (item, index) {

            if (typeof item == 'string') {
                return dir + item;
            }

            depth++;

            if (state) {
                state.depth = depth;
            }

            return combine(dir + item.dir, item.files, state); //递归
        });
    }

    /**
    * 把一个对象/数组表示的路径结构线性化成一个一维的数组。
    */
    function linearize(dir, files) {

        if (dir instanceof Array) { //linearize([]);
            files = dir;
            dir = '';
        }
        else if (typeof dir == 'object') { //linearize( { dir: '', files: [] } );
            files = dir.files;
            dir = dir.dir;
        }

        var state = {
            depth: 0
        };

        var a = combine(dir, files, state);
        var b = $Array.reduceDimension(a, state.depth); //降维

        return b;
    }



    /**
    * 组合路径，主要用于 grunt-copy 中的路径表示。
    */
    function pair(src, dest, files) {
        if (typeof src == 'object') { //pair( { src: '', dest: '', files: [] })
            files = src.files;
            dest = src.dest;
            src = src.src;
        }


        var srcs = linearize(src, files);
        var dests = linearize(dest, files);

        return $Array.keep(srcs, function (src, index) {
            return {
                src: src,
                dest: dests[index]
            };
        });
    }



    return {
        linearize: linearize,
        pair: pair
    };

})($Array);



module.exports = LinearPath;

})(
    global, // 在 Node 中，全局对象是 global；其他环境是 this
    module
    /*, undefined -> undefined */
);

