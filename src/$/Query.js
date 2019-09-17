
/**
* Query 工具类
* @namespace
* @name Query
*/
define('Query', function (require, module, exports) {

    var $Object = require('Object');


    //把指定的 url 中的查询字符串替换成目标查询字符串。 
    //同时会保留原有的 hash 串。
    function replace(url, qs) {
        qs = qs || '';

        if (typeof qs == 'object') {
            qs = exports.stringify(qs);
        }
        
        if (qs) {
            qs = '?' + qs;
        }

        var hasQuery = url.includes('?');
        var hasHash = url.includes('#');
        var parts = [];


        if (hasQuery && hasHash) {
            parts = url.split(/\?|#/g);
            return parts[0] + qs + '#' + parts[2];
        }

        if (hasQuery) {
            parts = url.split('?');
            return parts[0] + qs;
        }

        if (hasHash) {
            parts = url.split('#');
            return parts[0] + qs + '#' + parts[1];
        }


        return url + qs;
    }




    return exports = /**@lends Query */ {


        /**
        * 把 url 中的查询字符串解析为等价结构的 Object 对象。
        * @param {string} url 要进行解析的查询字符串。
        * @param {boolean} [isShallow=false] 指示是否使用浅层次进行解析。
            当显式指定 isShallow 参数为 true 时，则使用浅层次来解析(只解析一层，不进行递归解析)；
            否则(默认)使用深层次解析。
        * @param {boolean} [isCompatible=false] 指示是否使用兼容模式进行解码。
            当指定 isCompatible 参数为 true 时，将使用 unescape 来编码；
            否则(默认)使用 decodeURIComponent。
        * @return {Object} 返回一个包含键值对的 Object 对象。
            当参数 url 非法时，返回空对象 {}。
        * @example
            var url = 'a=1&b=2&c=A%3D100%26B%3D200';
            var obj = Query.parse(url);
        得到 obj = {a: 1, b:2, c: {A: 100, B: 200}};
        */
        parse: function (url, isShallow, isCompatible) {

            if (!url || typeof url != 'string') {
                return {}; //这里不要返回 null，免得外部调用出错
            }

            var $String = require('String');

            var decode = isCompatible ? unescape : decodeURIComponent;  //解码方法，默认用后者
            var isDeep = !isShallow;    //深层次解析，为了语义上更好理解，换个名称
            var toValue = $String.toValue; //缓存一下方法，以提高循环中的性能


            var obj = {};

            url.split('&').map(function (item) {
                var pair = item.split('=');
                var name = decode(pair[0]);
                var value = pair[1];

                if (pair.length > 1) {
                    value = decode(value);

                    //深层次解析
                    if (isDeep && value.indexOf('=') > 0) { //还出现=号，说明还需要进一层次解码
                        value = exports.parse(value); //递归调用
                    }
                    else { //处理一下字符串类型的 0|1|true|false|null|undefined|NaN
                        value = toValue(value); //还原常用的数据类型
                    }
                }

                var existed = name in obj;

                if (!existed) {
                    obj[name] = value;
                    return;
                }


                //支持重复名称，如果有则放到一个数组里。
                var old = obj[name];

                if (old instanceof Array) {
                    old.push(value);
                }
                else {
                    obj[name] = [old, value];
                }

            });



            return obj;
        },

        /**
        * 把一个对象编码成等价结构的 url 查询字符串。
        * @param {Object} obj 要进行编码的对象
        * @param {boolean} [isCompatible=false] 
            指定是否要使用兼容模式进行编码。
            当需要使用 escape 进行编码时，请指定 true；
            否则要使用 encodeURIComponent 进行编码，请指定 false 或不指定。
        * @return {string} 返回一个经过编码的 url 查询字符串
        * @example
            var obj = {
                a: 1,
                b: 2,
                c: { A: 100, B: 200 },
                d: null,
                e: undefined,
                f: ['a', 'b', 'c']
            };
            var s = Query.stringify(obj);
            console.log(s); 
            //结果 a=1&b=2&c=A%3D100%26B%3D200&d=null&e=undefined&f=%5Ba%2C%20b%5D
        */
        stringify: function (obj, isCompatible) {

            if (obj == null) {     // null 或 undefined
                return String(obj);
            }

            switch (typeof obj) {
                case 'string':
                case 'number':
                case 'boolean':
                    return obj;
            }

            if (obj instanceof String || obj instanceof Number || obj instanceof Boolean || obj instanceof Date) {
                return obj.valueOf();
            }

            if (Array.isArray(obj)) {
                return '[' + obj.join(', ') + ']';
            }

            var encode = isCompatible ? escape : encodeURIComponent;
            var pairs = [];



            $Object.each(obj, function (key, value) {
                key = encode(key);

                if (value === undefined) {
                    pairs.push(key);
                    return;
                }

                value = exports.stringify(value);
                value = encode(value);

                pairs.push(key + '=' + value);

            });


            return pairs.join('&');

        },


        /**
        * 获取指定 url 的查询字符串中指定的键所对应的值。
        * 已重载 get(url, key, ignoreCase);
        * 已重载 get(location, key, ignoreCase);
        * 已重载 get(window, key, ignoreCase);
        * @param {string} url 要进行获取的 url 字符串。
        * @param {string} [key] 要检索的键。
        * @param {boolean} [ignoreCase=false] 是否忽略参数 key 的大小写。 默认区分大小写。
            如果要忽略 key 的大小写，请指定为 true；否则不指定或指定为 false。
            当指定为 true 时，将优先检索完全匹配的键所对应的项；若没找到然后再忽略大小写去检索。
        * @retun {string|Object|undefined} 返回一个查询字符串值。
            当不指定参数 key 时，则获取全部查询字符串，返回一个等价的 Object 对象。
            当指定参数 key 为一个空字符串，则获取全部查询字符串，返回一个 string 类型值。
        * @example
            Query.get('http://test.com?a=1&b=2#hash', 'a');  //返回 '1'
            Query.get('http://test.com?a=1&b=2#hash', 'c');  //返回 undefined
            Query.get('http://test.com?a=1&A=2#hash', 'A');  //返回 2
            Query.get('http://test.com?a=1&b=2#hash', 'A', true);//返回 1
            Query.get('http://test.com?a=1&b=2#hash', '');   //返回 'a=1&b=2'
            Query.get('http://test.com?a=1&b=2#hash');       //返回 {a: '1', b: '2'}
            Query.get('http://test.com?a=&b=');              //返回 {a: '', b: ''}
            Query.get('http://test.com?a&b');                //返回 {a: '', b: ''}
            Query.get('http://test.com?a', 'a');             //返回 ''
        */
        get: function (url, key, ignoreCase) {

            //重载 get(location, key, ignoreCase)
            //重载 get(window, key, ignoreCase)
            if (typeof url == 'object') {
                url = ('href' in url) ? url.href :  //location
                    url.location.href;              //window
            }

            var beginIndex = url.indexOf('?');
            if (beginIndex < 0) { //不存在查询字符串
                return;
            }

            var endIndex = url.indexOf('#');
            if (endIndex < 0) {
                endIndex = url.length;
            }

            var qs = url.slice(beginIndex + 1, endIndex);
            if (key === '') { //获取全部查询字符串的 string 类型
                return decodeURIComponent(qs);
            }


            var obj = exports.parse(qs);

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
        * 给指定的 url 添加一个查询字符串。
        * 注意，该方法会保留之前的查询字符串，并且覆盖同名的查询字符串。
        * @param {string} url 组装前的 url。
        * @param {string|Object} key 要添加的查询字符串的键。
            当传入一个 Object 对象时，会对键值对进行递归组合编码成查询字符串。
        * @param {string} [value] 要添加的查询字符串的值。
        * @retun {string} 返回组装后的新的 url。
        * @example
            //返回 'http://test.com?a=1&b=2&c=3#hash'
            Query.add('http://test.com?a=1&b=2#hash', 'c', 3);  
            
            //返回 'http://test.com?a=3&b=2&d=4#hash'
            Query.add('http://test.com?a=1&b=2#hash', {a: 3, d: 4});  
        */
        add: function (url, key, value) {


            var qs = exports.get(url) || {}; //先取出原来的

            if (typeof key == 'object') {
                Object.assign(qs, key);
            }
            else {
                qs[key] = value;
            }


            //过滤掉值为 null 的项
            var obj = {};

            for (var key in qs) {
                var value = qs[key];

                if (value === null) {
                    continue;
                }
                else {
                    obj[key] = value;
                }

            }

            return exports.set(url, obj);


        },


        /**
        * 删除指定的 url 的查询字符串。
        * 已重载 remove(url);          //删除全部查询字符串。
        * 已重载 remove(url, key);     //删除指定键的查询字符串。
        * 已重载 remove(window);       //删除指定 window 窗口的全部查询字符串，会导致页面刷新。
        * 已重载 remove(window, key);  //删除指定 window 窗口的指定键查询字符串，会导致页面刷新。
        * 已重载 remove(location);     //删除指定 location 窗口的全部查询字符串，会导致页面刷新。
        * 已重载 remove(location, key);//删除指定 location 窗口的指定键查询字符串，会导致页面刷新。
        */
        remove: function (url, key) {
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


            var qs = '';

            if (key) {
                qs = exports.get(url);
                delete qs[key];
            }

            url = replace(url, qs);

            //设置整个 location.href 会刷新
            if (location) {
                location.href = url;
            }

            return url;

        },


        /**
        * 给指定的 url 添加一个随机查询字符串。
        * 注意，该方法会保留之前的查询字符串，并且添加一个键名为随机字符串而值为空字符串的查询字符串。
        * @param {string} url 组装前的 url。
        * @param {number} [len] 随机键的长度。
        * @retun {string} 返回组装后的新的 url。
        * @example
            //返回值类似 'http://test.com?a=1&b=2&7A8CEBAFC6B4=#hash'
            Query.random('http://test.com?a=1&b=2#hash');  
            
            //返回值类似 'http://test.com?a=1&b=2&7A8CE=#hash' 
            Query.random('http://test.com?a=1&b=2#hash', 5); //随机键的长度为 5
    
        */
        random: function (url, len) {
            var $String = require('String');
            var key = $String.random(len);
            return exports.add(url, key, undefined);
        },



        /**
        * 把指定的 url 和查询字符串组装成一个新的 url。
        * 注意，该方法会删除之前的查询字符串。
        * @param {string} url 组装前的 url。
        * @param {string|Object} key 要设置的查询字符串的键。
            当传入一个 Object 对象时，会对键值对进行递归组合编码成查询字符串。
        * @param {string} [value] 要添加的查询字符串的值。
        * @retun {string} 返回组装后的新的 url。
        * @example
            //返回 'http://test.com?c=3#hash'
            Query.set('http://test.com?a=1&b=2#hash', 'c', 3);  
            
            //返回 'http://test.com?a=3&d=4#hash'
            Query.set('http://test.com?a=1&b=2#hash', {a: 3, d: 4});  
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


            var qs = '';
            var type = typeof key;
            var isValueType = (/^(string|number|boolean)$/).test(type);

            //set(url, qs);
            if (arguments.length == 2 && isValueType) {
                qs = encodeURIComponent(key);
            }
            else {
                qs = type == 'object' ? key : $Object.make(key, value);
            }


            url = replace(url, qs);


            //设置整个 location.href 会刷新
            if (location) {
                location.href = url;
            }

            return url;


        },

        /**
        * 判断指定的 url 是否包含特定名称的查询字符串。
        * @param {string} url 要检查的 url。
        * @param {string} [key] 要提取的查询字符串的键。
        * @param {boolean} [ignoreCase=false] 是否忽略参数 key 的大小写，默认区分大小写。
            如果要忽略 key 的大小写，请指定为 true；否则不指定或指定为 false。
            当指定为 true 时，将优先检索完全匹配的键所对应的项；若没找到然后再忽略大小写去检索。
        * @retun {boolean} 如果 url 中包含该名称的查询字符串，则返回 true；否则返回 false。
        * @example
            Query.has('http://test.com?a=1&b=2#hash', 'a');  //返回 true
            Query.has('http://test.com?a=1&b=2#hash', 'b');  //返回 true
            Query.has('http://test.com?a=1&b=2#hash', 'c');  //返回 false
            Query.has('http://test.com?a=1&b=2#hash', 'A', true); //返回 true
            Query.has('http://test.com?a=1&b=2#hash');       //返回 true
        */
        has: function (url, key, ignoreCase) {

            //重载 has(location, key, ignoreCase)
            //重载 has(window, key, ignoreCase)
            if (typeof url == 'object') {
                url = ('href' in url) ? url.href :  //location
                    url.location.href;              //window
            }

            var obj = exports.get(url); //获取全部查询字符串的 Object 形式

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
        * 对查询字符串中的值部分进行转换过滤。
        * 如 `http://www.test.com/?a=XXX`，其中 `XXX` 就是要过滤的部分。
        * @return {String}
        */
        escape: function (string) {
            var s = String(string);
            return escape(s).replace(/\+/g, "%2B");
        },


    };

});


