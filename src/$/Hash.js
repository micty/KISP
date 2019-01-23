
/**
* Hash 工具类
* @namespace
* @name Hash
*/
define('Hash', function (require, module, exports) {
    var $Object = require('Object');



    return exports = /**@lends Hash */ {

        /**
        * 获取指定 url 的 hash 中指定的键所对应的值。
        * @param {string} url 要进行获取的 url 字符串。
        * @param {string} [key] 要检索的键。
        * @param {boolean} [ignoreCase=false] 是否忽略参数 key 的大小写。 默认区分大小写。
            如果要忽略 key 的大小写，请指定为 true；否则不指定或指定为 false。
            当指定为 true 时，将优先检索完全匹配的键所对应的项；若没找到然后再忽略大小写去检索。
        * @retun {string|Object|undefined} 返回一个查询字符串值。
            当不指定参数 key 时，则获取全部 hash 值，对其进行 unescape 解码，
            然后返回一个等价的 Object 对象。
            当指定参数 key 为一个空字符串，则获取全部 hash (不解码)，返回一个 string 类型值。
        * @example
            Hash.get('http://test.com?query#a%3D1%26b%3D2', 'a');  //返回 '1'
            Hash.get('http://test.com?query#a%3D1%26b%3D2', 'c');  //返回 undefined
            Hash.get('http://test.com?query#a%3D1%26A%3D2', 'A');  //返回 2
            Hash.get('http://test.com?query#a%3D1%26b%3D2', 'A', true);//返回 1
            Hash.get('http://test.com?query#a%3D1%26b%3D2', '');   //返回 'a%3D1%26b%3D2'
            Hash.get('http://test.com?query#a%3D1%26b%3D2');       //返回 {a: '1', b: '2'}
            Hash.get('http://test.com?query#a%3D%26b%3D');         //返回 {a: '', b: ''}
            Hash.get('http://test.com??query#a%26b');              //返回 {a: '', b: ''}
            Hash.get('http://test.com?query#a', 'a');              //返回 ''
        */
        get: function (url, key, ignoreCase) {

            //重载 get(location, key, ignoreCase)
            //重载 get(window, key, ignoreCase)
            if (typeof url == 'object') {
                url = ('href' in url) ? url.href :  //location
                    url.location.href;              //window
            }


            var beginIndex = url.indexOf('#');
            if (beginIndex < 0) { //不存在查询字符串
                return;
            }

            var endIndex = url.length;

            var hash = url.slice(beginIndex + 1, endIndex);
            hash = unescape(hash); //解码

            if (key === '') { //获取全部 hash 的 string 类型
                return hash;
            }

            

            var Query = require('Query');
            var obj = Query.parse(hash);

            if (key === undefined) { //未指定键，获取整个 Object 对象
                return obj;
            }

            if (!ignoreCase || key in obj) { //区分大小写或有完全匹配的键
                return obj[key];
            }


            //以下是不区分大小写
            key = key.toString().toLowerCase();

            for (var name in obj) {
                if (name.toLowerCase() == key) {
                    return obj[name];
                }
            }
        },

        /**
        * 把指定的 hash 设置到指定的 url 上。
        * 该方法会对 hash 进行 escape 编码，再设置到 url 上，以避免 hash 破坏原有的 url。
        * 同时原有的 hash 会移除掉而替换成新的。
        * @param {string} url 要设置的 url 字符串。
        * @param {string|number|boolean|Object} key 要设置的 hash 的键。
            当传入一个 Object 对象时，会对键值对进行递归编码成查询字符串， 然后用 escape 编码来设置 hash 。
            当传入的是一个 string|number|boolean 类型，并且不传入第三个参数， 则直接用 escape 编码来设置 hash 。
        * @param {string} [value] 要添加的 hash 的值。
        * @retun {string} 返回组装后的新的 url 字符串。
        * @example
            //返回 'http://test.com?#a%3D1'
            Hash.set('http://test.com', 'a', 1);  
            
            //返回 'http://test.com?query#a%3D3%26d%3D4'
            Hash.set('http://test.com?query#a%3D1%26b%3D2', {a: 3, d: 4});  
    
            //返回 'http://test.com?query#a%3D3%26d%3D4'
            Hash.set('http://test.com?query#a%3D1%26b%3D2', 'a=3&b=4'); 
            
        */
        set: function (url, key, value) {

            var location = null;

            if (typeof url == 'object') {
                if ('href' in url) {
                    location = url;         //location
                }
                else {
                    location = url.location; //window
                }
                url = location.href;
            }



            var type = typeof key;
            var isValueType = (/^(string|number|boolean)$/).test(type);


            var hash = '';

            if (arguments.length == 2 && isValueType) {
                hash = String(key);
            }
            else {
                var Query = require('Query');
                var obj = type == 'object' ? key : $Object.make(key, value);
                hash = Query.stringify(obj);
            }


            hash = escape(hash); //要进行编码，避免破坏原有的 url

            var index = url.lastIndexOf('#');
            if (index > -1) {
                url = url.slice(0, index);
            }

            url = url + '#' + hash;

            if (location) {
                location.hash = hash; //不要设置整个 location.href，否则会刷新
            }

            return url;

        },

        /**
        * 判断指定的 url 是否包含特定名称的 hash。
        * @param {string} url 要检查的 url。
        * @param {string} [key] 要提取的查询字符串的键。
        * @param {boolean} [ignoreCase=false] 是否忽略参数 key 的大小写，默认区分大小写。
            如果要忽略 key 的大小写，请指定为 true；否则不指定或指定为 false。
            当指定为 true 时，将优先检索完全匹配的键所对应的项；若没找到然后再忽略大小写去检索。
        * @retun {boolean} 如果 url 中包含该名称的查询字符串，则返回 true；否则返回 false。
        * @example
            Hash.has('http://test.com?a=1&b=2#hash', 'a');  //返回 true
            Hash.has('http://test.com?a=1&b=2#hash', 'b');  //返回 true
            Hash.has('http://test.com?a=1&b=2#hash', 'c');  //返回 false
            Hash.has('http://test.com?a=1&b=2#hash', 'A', true); //返回 true
            Hash.has('http://test.com?a=1&b=2#hash');       //返回 true
        */
        has: function (url, key, ignoreCase) {

            //重载 has(location, key, ignoreCase)
            //重载 has(window, key, ignoreCase)
            if (typeof url == 'object') {
                url = ('href' in url) ? url.href :  //location
                    url.location.href;              //window
            }


            var obj = exports.get(url); //获取全部 hash 字符串的 Object 形式

            if (!obj) {
                return false;
            }


            if (!key) { //不指定名称，
                return !$Object.isEmpty(obj); //只要有数据，就为 true
            }

            if (key in obj) { //找到完全匹配的
                return true;
            }


            if (ignoreCase) { //明确指定了忽略大小写

                key = key.toString().toLowerCase();

                for (var name in obj) {
                    if (name.toLowerCase() == key) {
                        return true;
                    }
                }
            }

            //区分大小写，但没找到
            return false;

        },


        /**
        * 监听指定窗口 url 的 hash 变化，并触发一个回调函数。
        * 已重载　onchange(window, fn);
        * 已重载　onchange(window, immediate, fn);
        * @param {Window} window 要监听的 window 窗口。
        * @param {boolean} [immediate=false] 指示初始时是否要立即执行回调函数。
            初始时如果要立即执行回调函数，请指定该参数为 true；
            否则不指定或指定为 false。
        * @param {function} fn 当监听窗口的 hash 发生变化时，要触发的回调函数。
        *   该回调函数会接收到两个参数：hash 和 old，当前的 hash 值和旧的 hash 值。
        *   注意，hash 和 old 都去掉了 '#' 号而直接保留 hash 值。
        *   如果 old 不存在，则为 null。
        *   该回调函数内部的 this 指向监听的窗口。
        * @example
            Hash.onchange(top, function (hash, old) {
                console.log('new hash: ' + hash);
                console.log('old hash: ' + old);
                console.log(this === top); //true
            });
        */
        onchange: function (window, immediate, fn) {
            //重载 onchange(window, fn);
            if (typeof immediate == 'function') {
                fn = immediate;
                immediate = false;
            }


            var hash = exports.get(window, '');


            //指定了要立即触发，则立即触发。
            if (immediate) {
                fn.call(window, hash, null, immediate); 
            }


            $(window).on('hashchange', function () {
                var old = hash;

                hash = exports.get(window, '');
                fn && fn(hash, old, false);
            });
          

        },

    };

});


