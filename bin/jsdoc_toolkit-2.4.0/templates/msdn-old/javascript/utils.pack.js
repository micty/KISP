//文件 utils.pack.js 由 ant 合并生成于 2014-02-19 11:37:34


//================================================================================================================>
//开始 utils.js
;( function (global, window, undefined) {










/**
* utils 内部用的一个 Haf 容器
* @namespace
* @inner
*/
function Haf()
{
}

var $ = Haf; //内部使用的 $ 符号


/**
* 定义一个针对 Haf 的全局名称，可用作当前运行时确定的标识符。
*/
Haf.expando = 'Haf' + String(Math.random()).replace(/\D/g, '');



/**
* 用指定的值去扩展指定的目标对象，返回目标对象。<br />
*/
Haf.extend = function (target, obj1, obj2) {

    //针对最常用的情况作优化
    if (obj1 && typeof obj1 == 'object') {
        for (var key in obj1) {
            target[key] = obj1[key];
        }
    }

    if (obj2 && typeof obj2 == 'object') {
        for (var key in obj2) {
            target[key] = obj2[key];
        }
    }

    var startIndex = 3;
    var len = arguments.length;
    if (startIndex >= len) { //已处理完所有参数
        return target;
    }

    //更多的情况
    for (var i = startIndex; i < len; i++) {
        var obj = arguments[i];
        for (var name in obj) {
            target[name] = obj[name];
        }
    }

    return target;
};



	




/**
* @fileOverview 对象工具
*/



/**
* 对象工具
* @class
* @param {Object} obj 要进行包装的对象
* @return {Haf.Object} 返回一个经过包装后的 Haf.Object 对象
* @example
    $.Object( {a:1, b:2} );
或  new $.Object( {a:1, b:2} );
*/
Haf.Object = function (obj) {
    return new Haf.Object.prototype.init(obj);
};



; (function ($, This) {

/**
* @exports as Haf.Object.extend
* 用一个或多个其他对象来扩展一个对象，返回被扩展的对象。<br />
* 注意：该方法执行的是使用 for in 进行浅拷贝，而在 IE6/IE8 中，是枚举不到重写的内置成员的，比如 toString。
* @param {Object} arguments[0] 要进行扩展的对象 <br />
* @param {Object} arguments[1] 要进行复制的第1个对象
* @param {Object} arguments[n] 要进行复制的第n个对象，依次类推
* @return {Object} 
    返回被扩展的对象，即第一个参数。<br />
    如果参数为空，则返回 {}。<br />
    如果只有一个参数，则直接返回该参数。<br />
    否则：把第二个参数到最后一个参数的成员拷贝到第一个参数对应中去，并返回第一个参数。<br />
* @example 
    var obj = {
        a: 1, 
        b: 2
    };
    var obj2 = $.Object.extend(obj, {b:3}, {c:4});
结果：
    //obj = {a:1, b:3, c:4}; 
    //并且 obj === obj2 为 true
*/
This.extend = function (target, obj1, obj2) {

    //针对最常用的情况作优化
    if (obj1 && typeof obj1 == 'object') {
        for (var key in obj1) {
            target[key] = obj1[key];
        }
    }

    if (obj2 && typeof obj2 == 'object') {
        for (var key in obj2) {
            target[key] = obj2[key];
        }
    }

    var startIndex = 3;
    var len = arguments.length;
    if (startIndex >= len) { //已处理完所有参数
        return target;
    }

    //更多的情况
    for (var i = startIndex; i < len; i++) {
        var obj = arguments[i];
        for (var name in obj) {
            target[name] = obj[name];
        }
    }

    return target;
};

/**
* 把一个对象的名称-值对转成用指定分隔符连起来的字符串。
* @param {Object} nameValues 键值表 
* @param {String} innerSeparator 内部分隔符，如果不指定则默认为 "=" 号
* @param {String} pairSeparator 键值对的分隔符，如果不指定则默认为 "&" 号
* @return {String} 用分隔符进行连接的字符串
* @example 
    $.Object.toString( {a:1, b:2, c:3}, '=', '&' );
或：$.Object.toString( {a:1, b:2, c:3} );
返回：'a=1&b=2&c=3'
*/
// 这里不要弄到的 extend 中，因为它使用的是 for in，而在 IE6/IE8 中，是枚举不到重写的内置成员的
This.toString = function (nameValues, innerSeparator, pairSeparator) {
    innerSeparator = innerSeparator || '=';
    pairSeparator = pairSeparator || '&';

    var pairs = [];
    for (var name in nameValues) {
        pairs.push(name + innerSeparator + nameValues[name]);
    }

    return pairs.join(pairSeparator);

};









This.extend(This, /**@lends Haf.Object */
{

    /**
    * 用一种安全的方式来扩展对象。
    * 当目标对象不存在指定的成员时，才给该目标对象添加(扩展)该成员。
    */
    extendSafely: function () {
        var len = arguments.length;
        if (len == 0) {
            return null;
        }

        var target = arguments[0];
        if (len == 1) {
            return target;
        }

        for (var i = 1; i < len; i++) {
            var obj = arguments[i];

            for (var key in obj) {
                if (key in target) //目标对象中已含有该成员，略过
                {
                    continue;
                }

                //否则，添加
                target[key] = obj[key];
            }
        }

        return target;
    },

    /**
    * 用多个对象深度扩展一个对象。
    */
    extendDeeply: function (target, obj1, obj2) {

        function fn(A, B) {
            A = A || {};

            for (var key in B) {
                var value = B[key];

                if (This.isPlain(value)) {
                    value = fn(A[key], value);
                }

                A[key] = value;
            }

            return A;
        }


        //针对最常用的情况作优化
        if (obj1 && typeof obj1 == 'object') {
            target = fn(target, obj1);
        }

        if (obj2 && typeof obj2 == 'object') {
            target = fn(target, obj2);
        }

        var startIndex = 3;
        var len = arguments.length;
        if (startIndex >= len) { //已处理完所有参数
            return target;
        }

        //更多的情况
        for (var i = startIndex; i < len; i++) {
            var objI = arguments[i];
            target = fn(target, objI);
        }

        return target;

    },


    /**
    * 深度克隆一个纯对象或数组。
    * @param {Object|Array} obj 要进行克隆的对象或数组。
        如果 obj 是数组，则返回一个拷贝数组，并且会对数组中的每项调用 clone 。
        如果 obj 不是纯对象，则直接返回该对象，不进行克隆。
    * @return {Object|Array} 克隆后的对象或数组。
    * @example
        var obj = {a: 1, b: 2, c: {a: 10, b: 20} };
        var obj2 = $.Object.clone( obj );
        console.dir( obj2 );          //与 obj 一致
        console.log( obj2 === obj );  //false
    */
    clone: function (obj) {

        var clone = arguments.callee;

        var $ = Haf;

        if (This.isArray(obj)) {
            return $.Array.keep(obj, function (item, index) {
                //优化，避免再次进入 clone 方法
                if (!item || This.isValueType(item) || !This.isPlain(item)) {
                    return item;
                }

                return clone(item);
            });
        }

        // null、undefined、0、NaN、false、''
        // 值类型：string、number、boolean
        // 非纯对象
        if (!obj || This.isValueType(obj) || !This.isPlain(obj)) {
            return obj;
        }


        var target = {};

        for (var key in obj) {

            var value = obj[key];

            switch (typeof value) {
                case 'string':
                case 'number':
                case 'boolean':
                case 'function':
                case 'undefined':
                    target[key] = value;
                    break;

                case 'object':
                    target[key] = clone(value);   //递归调用
                    break;
                
            }
        }

        return target;
    },

    /**
    * 对一个对象进行迭代。
    * 该方法可以代替 for in 的语句。
    * 只有在回调函数中明确返回 false 才停止循环。
    * @param {Object} obj 要进行迭代处理的对象
    * @param {function} fn 要进行迭代处理的回调函数，该函数中会接收到当前对象迭代的到 key 和 value 作为参数
    * @param {boolean} [isDeep=false] 
        指示是否要进行深层次的迭代，如果是，请指定 true；
        否则请指定 false 或不指定。默认为 false，即浅迭代
    * @example
        var obj = {a: 1, b: 2, c: {A: 11, B: 22} };
        $.Object.each(obj, function(key, value)
        {
            console.log(key, ': ', value);
        }, true);
    输出：
        a: 1,
        b: 2,
        A: 11,
        B: 22
    */
    each: function (obj, fn, isDeep) {

        var each = arguments.callee;

        for (var key in obj) {
            var value = obj[key];

            //指定了深迭代，并且当前 value 为非 null 的对象
            if (isDeep === true && value && typeof value == 'object') {
                each(value, fn, true); //递归
            }
            else {
                // 只有在 fn 中明确返回 false 才停止循环
                if (fn(key, value) === false) {
                    break;
                }
            }
        }
    },

    /**
    * 获取一个对象的真实类型的字符串描述。
    * @param obj 要检测的对象，可以是任何类型。
    * @return {String} 返回该对象的类型的字符串描述。
        当参数为 null、undefined 时，返回 null、undefined；<br />
        当参数为 string、number、boolean 的值类型时，返回 string、number、boolean；<br />
        否则返回参数的实际类型的字符串描述(构造函数的名称)：<br />
        如 Array、String、Number、Boolean、Object、Function、RegExp、Date 等
    * @example
        $.Object.getType();         //'undefined'
        $.Object.getType(null);     //'null'
        $.Object.getType('hello');  //'string'
        $.Object.getType(100);      //'number'
        $.Object.getType(false);    //'boolean'
        $.Object.getType({});       //'Object'
        $.Object.getType(function(){});//'Function'
        $.Object.getType([0, 1, 2]);   //'Array'
    */
    getType: function (obj) {
        return obj === null ? 'null' :
            obj === undefined ? 'undefined' :

            //处理值类型
            typeof obj == 'string' ? 'string' :
            typeof obj == 'number' ? 'number' :
            typeof obj == 'boolean' ? 'boolean' :

            //处理对象类型、包装类型
            Object.prototype.toString.call(obj).slice(8, -1); //去掉 "[object" 和 "]"
    },

    /**
    * 判断一个对象是否为数组类型。<br />
    * 注意：如果是跨窗口取得的数组，请使用非严格判断。<br />
    * 由于 IE 的兼容性问题，对于跨窗口取得的数组，请在使用其实例方法之前把它转成真正的数组，否则会报错。
    * @param {Object} obj 要进行判断的对象，可以是任何类型
    * @param {boolean} [useStrict] 指定是否要进行严格判断，如果是请传入 true；否则当成非严格判断
    * @return {boolean} 一个判断结果，如果为数组则返回 true；否则返回 false
    * @example
        $.Object.isArray([]) //true
        $.Object.isArray({}) //false
    */
    isArray: function (obj, useStrict) {
        if (useStrict === true) //指定了要严格判断
        {
            return obj instanceof Array;
        }

        //高端浏览器，如 IE9+、Firefox 4+、Safari 5+、Opera 10.5+ 和 Chrome
        if (typeof Array.isArray == 'function') //优先使用原生的
        {
            return Array.isArray(obj);
        }

        //加上 obj instanceof Array 并且优先检测，是为了优化，也是为了安全起见。
        return (obj instanceof Array) ||
            (This.getType(obj) == 'Array');
    },

    /**
    * 判断一个对象是否为字符串字类型。
    * @param {Object} obj 要进行判断的对象，可以是任何类型。
    * @return {boolean} 一个判断结果，如果为字符串则返回 true；否则返回 false。
    * @example
        $.Object.isString( new String(100) ) //false
        $.Object.isString( '100' ) //true
    */
    isString: function (obj) {
        return typeof obj == 'string';
    },

    /**
    * 判断一个对象是否为数字类型。
    * @param {Object} obj 要进行判断的对象，可以是任何类型。
    * @return {boolean} 一个判断结果，如果为数字则返回 true；否则返回 false。
    * @example
        $.Object.isNumber( new Number(100) ) //false
        $.Object.isNumber( 100 ) //true
    */
    isNumber: function (obj) {
        return typeof obj == 'number';
    },

    /**
    * 判断一个对象是否为函数类型。
    * @param {Object} obj 要进行判断的对象，可以是任何类型。
    * @return {boolean} 一个判断结果，如果为函数则返回 true；否则返回 false。
    * @example
        $.Object.isFunction([]) //false
        $.Object.isFunction(function(){}) //true
    */
    isFunction: function (obj) {
        return typeof obj == 'function';
    },


    /**
    * 判断一个对象是否为内置类型。<br />
    * 内置类型是指 String, Number, Boolean, Array, Date, RegExp, Function。
    * @param {Object} obj 要进行判断的对象，可以是任何类型
    * @return {boolean} 一个判断结果，如果为内置类型则返回 true；否则返回 false
    * @example
        $.Object.isBuiltinType( 100 );   //false
        $.Object.isBuiltinType( new Number(100) ); //true
        $.Object.isBuiltinType( {} );    //false
        $.Object.isBuiltinType( [] );    //true
    */
    isBuiltinType: function (obj) {
        var types = [String, Number, Boolean, Array, Date, RegExp, Function];

        for (var i = 0, len = types.length; i < len; i++) {
            if (obj instanceof types[i]) {
                return true;
            }
        }

        return false;
    },


    /**
    * 检测对象是否是空对象(不包含任何属性)。<br />
    * 该方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使用 hasOwnProperty )。<br />
    * 该实现为 jQuery 的版本。
    * @param {Object} obj 要进行检测的对象，可以是任何类型
    * @return {boolean} 一个检测结果，如果为空对象则返回 true；否则返回 false
    * @example
        $.Object.isEmpty( {} );      //true
        $.Object.isEmpty( window );  //false
        
        function Person(){ }
        Person.prototype.name = 'abc';
        var p = new Person();
        $.Object.isEmpty( p );   //false
    */
    isEmpty: function (obj) {
        for (var name in obj) {
            return false;
        }

        return true;
    },



    /**
    * 检测一个对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）。<br />
    * 该实现为 jQuery 的版本。
    * @param {Object} obj 要进行检测的对象，可以是任何类型
    * @return {boolean} 一个检测结果，如果为纯粹的对象则返回 true；否则返回 false
    * @example
        $.Object.isPlain( {} );             //true
        $.Object.isPlain( {a: 1, b: {} } );  //true
        $.Object.isPlain( window );          //false
        
        function Person(){ }
        var p = new Person();
        $.Object.isPlain( p );   //false
    */
    isPlain: function (obj) {
        if (!obj || typeof obj != 'object' /*|| obj.nodeType || This.isWindow(obj) */ ) {
            return false;
        }

        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var constructor = obj.constructor;

        try {
            // Not own constructor property must be Object
            if (constructor &&
                !hasOwnProperty.call(obj, "constructor") &&
                !hasOwnProperty.call(constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        }
        catch (e) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key;
        for (key in obj) {
        }

        return key === undefined || hasOwnProperty.call(obj, key);
    },

    /**
    * 判断一个对象是否为值类型。<br />
    * 即 typeof 的结果是否为 string、number、boolean 中的一个。
    * @param {Object} obj 要进行检测的对象，可以是任何类型
    * @return {boolean} 一个检测结果，如果为 值类型则返回 true；否则返回 false
    * @example
        $.Object.isValueType(100);              //true
        $.Object.isValueType( new Number(100) );//false
    */
    isValueType: function (obj) {
        //不要用这种，否则在 rhino 的 js 引擎中会不稳定
        //return (/^(string|number|boolean)$/g).test(typeof obj); 
        var type = typeof obj;
        return type == 'string' || type == 'number' || type == 'boolean';
    },


    /**
    * 一个简单的方法来判断一个对象是否为 window 窗口。
    * 该实现为 jQuery 的版本。
    * @param {Object} obj 要进行检测的对象，可以是任何类型
    * @return {boolean} 一个检测结果，如果为 window 窗口则返回 true；否则返回 false
    * @example
        $.Object.isWindow( {} ); //false
        $.Object.isWindow(top);  //true
    */
    isWindow: function (obj) {
        return obj &&
            typeof obj == 'object' &&
            'setInterval' in obj;
    },

    /**
    * 一个简单的方法来判断一个对象是否为 document 对象。
    * @param {Object} obj 要进行检测的对象，可以是任何类型
    * @return {boolean} 一个检测结果，如果为  document 对象则返回 true；否则返回 false
    * @example
        $.Object.isDocument( {} );      //false
        $.Object.isDocument(document);  //true
    */
    isDocument: function (obj) {
        return obj &&
            typeof obj == 'object' &&
            'getElementById' in obj;
    },


    /**
    * 判断一个对象是否为包装类型。<br />
    * 包装类型是指 String, Number, Boolean 的 new 的实例。
    * @param {Object} obj 要进行检测的对象，可以是任何类型
    * @return {boolean} 一个检测结果，如果包装类型则返回 true；否则返回 false
    * @example
        console.log( $.Object.isWrappedType(100) ); //false
        console.log( $.Object.isWrappedType( new Number(100) ) );  //true
        console.log( $.Object.isWrappedType('abc') );  //false
        console.log( $.Object.isWrappedType( new String('abc') ) );  //true
        console.log( $.Object.isWrappedType(true) );  //false
        console.log( $.Object.isWrappedType( new Boolean(true) ) );  //true
    */
    isWrappedType: function (obj) {
        var types = [String, Number, Boolean];
        for (var i = 0, len = types.length; i < len; i++) {
            if (obj instanceof types[i]) {
                return true;
            }
        }

        return false;
    },

    /**
    * 判断一个对象是否为非空的对象。
    * 非空对象是指 typeof 结果为 object 或 function，并且不是 null。
    * @param {Object} obj 要进行检测的对象，可以是任何类型
    * @return {boolean} 一个检测结果，如果是非空的对象则返回 true；否则返回 false。
    * @example
        console.log( $.Object.isNonNull( null ) );  //false
        console.log( $.Object.isNonNull( {} ) );  //true
        console.log( $.Object.isNonNull( window ) );  //true
        console.log( $.Object.isNonNull(100) ); //false
        console.log( $.Object.isNonNull( new Number(100) ) );  //true
        console.log( $.Object.isNonNull('abc') );  //false
        console.log( $.Object.isNonNull( new String('abc') ) );  //true
        console.log( $.Object.isNonNull(true) );  //false
        console.log( $.Object.isNonNull( new Boolean(true) ) );  //true
    */
    isNonNull: function (obj) {
        if (!obj) { //false、null、undefined、''、NaN、0
            return false;
        }

        var type = typeof obj;
        return type == 'object' || type == 'function';
    },


    /**
    * 对象映射转换器，返回一个新的对象。
    * @param {Object} obj 要进行迭代处理的对象
    * @param {function} fn 要进行迭代处理的回调函数，该函数中会接收到当前对象迭代的到 key 和 value 作为参数
    * @param {boolean} [isDeep=false] 指示是否要进行深层次的迭代。
        如果是，请指定 true；
        否则请指定 false 或不指定。
        默认为 false，即浅迭代
    * @return {Object} 返回一个新的对象，key 仍为原来的 key，value 由回调函数得到
    * @example
        var obj = {a: 1, b: 2, c: {A: 11, B: 22} };
        var obj2 = $.Object.map(obj, function(key, value)
        {
            return value * 100;
        }, true);
        console.dir(obj2);
    结果：
        obj2 = {a: 100, b: 200, c: {A: 1100, B: 2200}};
    */
    map: function (obj, fn, isDeep) {
        var map = arguments.callee; //引用自身，用于递归
        var target = {};

        for (var key in obj) {
            var value = obj[key];

            if (isDeep && value && typeof value == 'object') //指定了深迭代，并且当前 value 为非 null 的对象
            {
                target[key] = map(value, fn, isDeep); //递归
            }
            else {
                target[key] = fn(key, value);
            }
        }

        return target;
    },


    /**
    * 给指定的对象快速创建多层次的命名空间，返回创建后的最内层的命名空间所指的对象。
    * @param {Object} [arg0=window] 
        要在其上面创建命名空间的对象容器。当不指定时，则默认为当前的 window 对象。
    * @param {string} arg1 命名空间，以点号进行分隔
    * @param {Object} arg2 命名空间最终指向的对象
    * @return {Object} 返回创建后的最内层的命名空间所指的对象
    * @example
        //给 obj 对象创建一个 A.B.C 的命名空间，其值为 {a:1, b:2}
        $.Object.namespace(obj, 'A.B.C', {a:1, b:2});
        console.dir( obj.A.B.C ); //结果为 {a:1, b:2}
        
        //给当前的 window 对象创建一个 A.B.C 的命名空间，其值为 {a:1, b:2}
        $.Object.namespace('A.B.C', {a:1, b:2});
        console.dir( A.B.C ); //结果为 {a:1, b:2}
        
        //给当前的 window 象分别创建一个 $.AA 和 $.BB 的命名空间，其值为分别 source.A 和 source.B
        $.Object.namespace(source,
        {
            'A': '$.AA', //source.AA -> $.A
            'B': '$.BB'  //source.BB -> $.B
        });
        
        //给 obj 对象分别创建 obj.A 和 obj.B 命名空间，其值分别为  source.A 和 source.B
        $.Object.namespace(obj, source, ['A', 'B']);
    * 
    */
    namespace: function (arg0, arg1, arg2) {

        //这个是最原始的方式：This.namespace(obj, 'A.B.C', {a:1, b:2});
        function fn(container, path, value) {
            var list = path.split('.'); //路径
            var obj = container;

            var len = list.length;      //路径长度
            var lastIndex = len - 1;    //路径中最后一项的索引

            var isGet = value === undefined; //指示是否为取值操作，当不指定 value 时，则认为是取值操作

            for (var i = 0; i < len; i++) //迭代路径
            {
                var key = list[i];

                //是获取操作，但不存在该级别
                if (isGet && !(key in obj) ) {
                    return; //退出，避免产生副作用(创建对象)
                }

                if (i < lastIndex) {
                    obj[key] = obj[key] || {};
                    obj = obj[key]; //为下一轮做准备
                }
                else //最后一项
                {
                    if (value === undefined) //不指定值时，则为获取
                    {
                        return obj[key];
                    }

                    //指定了值
                    obj[key] = value; //全量赋值

                }
            }

            return value;
        }

        //此时为最原始的
        //This.namespace(container, 'A.B.C', value );
        if (typeof arg1 == 'string') {
            var container = arg0;
            var path = arg1;
            var value = arg2;

            return fn(container, path, value);
        }

        //此时为
        //This.namespace('A.B.C', value)
        if (typeof arg0 == 'string') {
            var container = window;
            var path = arg0;
            var value = arg1;

            return fn(container, path, value);
        }


        /*
        此时为：
            This.namespace(source,
            {
                'Object': '$.Object',   //source.Object -> $.Object
                'Array': '$.Array'      //source.Array -> $.Array
            });
        要实现的功能：
            $.Object = source.Object;
            $.Array = source.Array;
        */
        if (This.isPlain(arg1) && arg2 === undefined) {
            //换个名称更容易理解
            var source = arg0;      //此时第一个参数为要被遍历拷贝的对象 source
            var maps = arg1;        //此时第二个参数为键值对映射表 maps
            var container = window; //此时目标容器为当前的 window

            //遍历映射表
            This.each(maps, function (key, path) {
                if (typeof path != 'string') {
                    throw new Error('当指定第二个参数为键值对映射表时，值必须为 string 类型');
                }

                var value = source[key];
                fn(container, path, value);
            });

            return container;
        }

        //
        /*
        此时为： 
            This.namespace(container, source, ['Object', 'Array']);
        要实现的功能：
            container.Object = source.Object;
            container.Array = source.Array;    
        */
        if (This.isArray(arg2)) {
            //换个名称更容易理解
            var container = arg0;   //此时第一个参数为目标容器 container
            var source = arg1;      //此时第二个参数为要被遍历拷贝的对象 source
            var keys = arg2;        //此时第三个参数是要拷贝的键列表

            //遍历键列表
            Haf.Array.each(keys, function (key) {
                container[key] = source[key];
            });

            return container;
        }
    },

    /**
    * 把 JSON 字符串解析成一个 Object 对象。
    * 该方法是 jQuery 的实现。
    * @param {String} data 要进行解析的 JSON 字符串
    * @return {Object} 返回一个等价的对象
    */
    parseJson: function (data) {
        if (typeof data !== "string" || !data) {
            return null;
        }

        data = Haf.String.trim(data);

        if (window.JSON && window.JSON.parse) //标准方法
        {
            return window.JSON.parse(data);
        }

        var rvalidchars = /^[\],:{}\s]*$/,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

        data = data.replace(rvalidescape, '@')
                   .replace(rvalidtokens, ']')
                   .replace(rvalidbraces, '');

        if (!rvalidchars.test(data)) {
            throw new Error('非法的 JSON 数据: ' + data);
        }

        return (new Function('return ' + data))();
    },


    /**
    * 把 Url 中的查询字符串解析为等价结构的 Object 对象。
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
        var obj = $.Object.parseQueryString(url);
    得到 obj = {a: 1, b:2, c: {A: 100, B: 200}};
    */
    parseQueryString: function (url, isShallow, isCompatible) {
        if (!url || typeof url != 'string') {
            return {}; //这里不要返回 null，免得外部调用出错
        }

        var fn = arguments.callee;
        var decode = isCompatible ? unescape : decodeURIComponent;  //解码方法，默认用后者
        var isDeep = !isShallow;    //深层次解析，为了语义上更好理解，换个名称
        var toValue = Haf.String.toValue; //缓存一下方法，以提高循环中的性能


        var obj = {};

        var pairs = url.split('&');

        for (var i = 0, len = pairs.length; i < len; i++) {
            var name_value = pairs[i].split('=');

            if (name_value.length > 1) {
                var name = decode(name_value[0]);
                var value = decode(name_value[1]);

                //深层次解析
                if (isDeep && value.indexOf('=') > 0) //还出现=号，说明还需要进一层次解码
                {
                    value = fn(value); //递归调用
                }
                else //处理一下字符串类型的 0|1|true|false|null|undefined|NaN
                {
                    value = toValue(value); //还原常用的数据类型
                }


                obj[name] = value;
            }
        }

        return obj;
    },


    /**
    * 删除对象中指定的成员，返回一个新对象。
    * 指定的成员可以以单个的方式指定，也可以以数组的方式指定(批量)。
    * @param {Object} obj 要进行处理的对象。
    * @param {String|Array|Object} keys 要删除的成员名称，可以是单个，也可以是批量。
    * @return {Object} 返回一个被删除相应成员后的新对象。
    * @example
        var obj = {
            a: 1, 
            b: 2, 
            c: 3
        };

        var o = $.Object.remove(obj, ['a', 'c']); //移除成员 a 和 c 
        console.dir(o); //得到 o = { b: 2 };

        o = $.Object.remove(obj, {a: 1, b: 2});
        console.dir(o); //得到 o = { c: 3 };
    */
    remove: function (obj, keys) {
        var target = This.extend({}, obj); //浅拷贝一份

        if (typeof keys == 'string') {
            delete target[keys];
        }
        else if (This.isArray(keys)) {
            for (var i = 0, len = keys.length; i < len; i++) {
                delete target[keys[i]];
            }
        }
        else {
            for (var key in keys) {
                delete target[key];
            }
        }

        return target;
    },


    /**
    * 用一组指定的名称-值对中的值去替换指定名称对应的值。
    * 当指定第三个参数为 true 时，将进行第一层次的搜索与替换，否则替换所有同名的成员为指定的值
    */
    replaceValues: function (target, nameValues, isShallow) {
        for (var key in target) {
            var val = target[key];
            switch (typeof val) {
                case 'string':
                case 'number':
                case 'boolean':
                    for (var name in nameValues) {
                        if (key == name) {
                            target[key] = nameValues[name];
                            break;
                        }
                    }
                    break;
                case 'object':
                    !isShallow && arguments.callee(val, nameValues);
                    break;
            }
        }
        return target;
    },




    /**
    * 把一个 Object 对象转成一个数组。
    * @param {Object} obj 要进行转换的对象
    * @param {Array|boolean|function} [rule=undefined] 转换映射规则。<br />
    *   当未指定参数 rule 时，则使用 for in 迭代收集 obj 中的值，返回一个一维的值数组；<br />
    *   当指定参数 rule 为一个数组时，则按 rule 中的顺序迭代收集 obj 中的值，返回一个一维的值的数组；<br />
    *   当指定参数 rule 为 true 时，则使用 for in 迭代收集 obj 中的名称和值，返回一个[key, value] 的二维数组，<br />
    *       即该数组中的每一项的第0个元素为名称，第1个元素为值。<br />
    *   当指定参数 rule 为一个处理函数时，将使用该处理函数的返回值作为收集到数组的值，<br />
    *       处理函数会接收到两个参数：该对象迭代的 key 和 value。<br />
    *       当返回值为 null 时，将忽略它（相当于 continue）；<br />
    *       当返回值为 undefined 时，将停止迭代（相当于 break）；<br />
    * @param {boolean} [isDeep=false] 指定是否递归处理。
        若要递归转换，请指定 true；否则请指定 false 或不指定
    * @return 返回一个数组
    * @example
        var obj = 
        { 
            a: 1, 
            b: 2, 
            c: 
            { 
                A: 100, 
                B: 200, 
                C: 
                {
                    aa: 'a', 
                    bb: 'b'
                } 
            } 
        };
        
        var a = $.Object.toArray(obj, null, true);
        console.dir(a);
        
        var b = $.Object.toArray(obj, ['b', 'c', 'a']);
        console.dir(b);
        
        var c = $.Object.toArray(obj, true, true);
        console.dir(c);
        
        var d = $.Object.toArray(obj, function(key, value)
        {
            return value + 1000;
        }, true);
        
        console.dir(d);
    * 
    */
    toArray: function (obj, rule, isDeep) {

        var toArray = arguments.callee; //引用自身，用于递归

        if (!rule) //未指定 rule: undefined|null|false
        {
            return This.getValues(obj, isDeep);
        }

        //否则，指定了 rule 转换规则。

        // 传进来的是一个 key 数组
        if (rule instanceof Array) {
            //注意，这里不要用 Haf.Array.map 来过滤，
            //因为 map 会忽略掉 null 和 undefined 的值，这是不合适的

            var keys = rule; //换个名称更好理解
            var a = [];

            for (var i = 0, len = keys.length; i < len; i++) //此时没有深迭代，因为 keys 只用于第一层
            {
                var value = obj[keys[i]]; //取得当前 key 所对应的 value
                a.push(value); // keys[i] -> key -> value
            }

            return a;
        }

        //指定了保留 key，则返回一个二维数组
        if (rule === true) {
            var a = [];
            for (var key in obj) {
                var value = obj[key];
                if (isDeep === true && value && typeof value == 'object') {
                    value = toArray(value, rule, isDeep);
                }
                a.push([key, value]);
            }

            return a; //此时为 [ [key, value], [key, value], ... ]
        }

        //传进来的是处理函数
        if (typeof rule == 'function') {
            var fn = rule;
            var a = [];

            for (var key in obj) {
                var value = obj[key];

                if (isDeep === true && value && typeof value == 'object') {
                    value = toArray(value, rule, isDeep);
                }
                else {
                    value = fn(key, value); //调用处理函数以取得返回值
                }

                if (value === null) {
                    continue;
                }

                if (value === undefined) {
                    break;
                }

                a.push(value);
            }

            return a;
        }
    },

    /**
    * 把一个对象转成 JSON 字符串
    * @param {Object} obj 要进行转换的对象
    * @return {String} 返回一个 JSON 字符串
    */
    toJSON: function (obj) {
        if (obj == null) // null 或 undefined
        {
            return String(obj);
        }

        switch (typeof obj) {
            case 'string':
                return '"' + obj + '"';
            case 'number':
            case 'boolean':
                return obj;
            case 'function':
                return obj.toString();
        }

        //处理包装类和日期
        if (obj instanceof String || obj instanceof Number || obj instanceof Boolean || obj instanceof Date) {
            return arguments.callee(obj.valueOf());
        }

        //处理正则表达式
        if (obj instanceof RegExp) {
            return arguments.callee(obj.toString());
        }

        //处理数组
        if (This.isArray(obj)) {
            var list = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                list.push(arguments.callee(obj[i]));
            }

            return '[' + list.join(', ') + ']';
        }

        var pairs = [];
        for (var name in obj) {
            pairs.push('"' + name + '": ' + arguments.callee(obj[name]));
        }
        return '{ ' + pairs.join(', ') + ' }';
    },


    /**
    * 把一个对象编码成等价结构的 Url 查询字符串。
    * @param {Object} obj 要进行编码的对象
    * @param {boolean} [isCompatible=false] 
        指定是否要使用兼容模式进行编码。<br />
        当需要使用 escape 进行编码时，请指定 true；<br />
        否则要使用 encodeURIComponent 进行编码，请指定 false 或不指定。
    * @return {string} 返回一个经过编码的 Url 查询字符串
    * @example
        var obj = 
        {
            a: 1,
            b: 2,
            c: { A: 100, B: 200 },
            d: null,
            e: undefined,
            f: ['a', 'b', 'c']
        };
        var s = $.Object.toQueryString(obj);
        console.log(s); 
        //结果 a=1&b=2&c=A%3D100%26B%3D200&d=null&e=undefined&f=%5Ba%2C%20b%5D
    */
    toQueryString: function (obj, isCompatible) {
        if (obj == null)     // null 或 undefined
        {
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

        if (This.isArray(obj)) {
            return '[' + obj.join(', ') + ']';
        }

        var fn = arguments.callee;
        var encode = isCompatible ? escape : encodeURIComponent;

        var pairs = [];
        for (var name in obj) {
            pairs.push(encode(name) + '=' + encode(fn(obj[name])));
        }

        return pairs.join('&');
    },



    /**
    * 删除对象的成员中值为指定的值列表中的成员，返回一个新对象。
    * @param {Object} obj 要进行处理的对象
    * @param {Array} [values=[undefined, null]] 要进行删除的值的列表。
        只要成员中包含该列表中的值，就会给删除。
        默认会删除值为 undefined 和 null 的成员。
    * @param {boolean} [isDeep=false] 指定是否深层次(递归)搜索。
        如果要深层次搜索，请指定 true；
        否则，请指定 false 或不指定。
    * @return {Object} 返回一个经过删除成员的新对象。
        该对象中不包含值为指定的值列表中的项的成员。
    * @example
        var d = {
            A: 11, 
            B: null, 
            C: undefined,
            D: '0'
        };
        var obj = {
            a: 1, 
            b: null, 
            c: undefined, 
            d: d
        };
        var obj2 = $.Object.trim(obj, [null, undefined, '0'], true );
        
        console.dir(obj);   //结果没变
        console.dir(obj2);  //结果为 {a: 1, d: {AA: 11}}
        console.dir(d);     //结果没变
        console.log(obj.d === d); //true
    */
    trim: function (obj, values, isDeep) {

        if (!values && !isDeep) { //针对最常用的情况 trim(obj) 作优化
            var target = {};

            for (var key in obj) {
                var value = obj[key];
                if (value == null) { // undefined、null
                    continue;
                }

                target[key] = value;
            }

            return target;
        }


        var trim = arguments.callee; //引用自身，递归要用到
        var contains = Haf.Array.contains;  //缓存一下，提高循环中的性能
        var extend = This.extend;     //缓存一下，提高循环中的性能

        if (typeof values == 'boolean') { //重载 trim(obj, isDeep);
            isDeep = values;
            values = undefined;
        }

        if (!values) {
            values = [null, undefined];
        }

        var target = extend({}, obj); //浅拷贝一份

        for (var key in target) {
            var value = target[key];

            if (contains(values, value)) {
                delete target[key]; //注意，这里不能用 delete value
                continue;
            }

            if (isDeep === true && typeof value == 'object' && value) {
                value = extend({}, value);          //浅拷贝一份
                target[key] = trim(value, values, true);  //递归
            }
        }

        return target;
    },

    /**
    * 跨浏览器的 Object.create 方法。
    * 该方法会优化使用原生的 Object.create 方法，当不存在时，才使用自己的实现。
    * @example
        var obj = $.Object.create(
        {
            name: 'micty',
    
            sayHi: function()
            {
                console.log( this.name );
            }
        });
    
        obj.sayHi();
    */
    create: function (obj) {
        //下面使用了惰性载入函数的技巧，即在第一次调用时检测了浏览器的能力并重写了接口
        var fn = typeof Object.create === 'function' ? Object.create : function (obj) {
            function F() {
            }

            F.prototype = obj;
            F.prototype.constructor = F;

            return new F();
        }

        This.create = fn;

        return fn(obj);
    },

    /**
    * 对一个对象进行成员过滤，返回一个过滤后的新对象。
    * 该方法可以以某个模板对指定对象进行成员拷贝。
    * @param {Object} src 要进行拷贝的对象，即数据来源。
    * @param {Array|Object|string} samples 要拷贝的成员列表(模板)。
    * @return {Object} 返回一个过滤后的新对象。
    * @example
        var src = {
            a: 100,
            b: 200,
            c: 300,
            d: 400
        };

        var samples = {
            a: 1,
            b: 2
        };

        //或 samples = ['a', 'b'];

        var obj = $.Object.filter(src, samples);
        console.dir(obj); //得到 obj = { a: 100, b: 200 }; 只保留 samples 中指定的成员，其他的去掉.
    */
    filter: function (src, samples) {

        var obj = {};

        if (This.isArray(samples)) {
            $.Array.each(samples, function (key, index) {

                if (key in src) {
                    obj[key] = src[key];
                }
            });
        }
        else if (This.isPlain(samples)) {
            This.each(samples, function (key, value) {

                if (key in src) {
                    obj[key] = src[key];
                }
            });
        }
        else if (typeof samples == 'string') {
            var key = samples;
            if (key in src) {
                obj[key] = src[key];
            }

        }
        else {
            throw new Error('无法识别参数 samples 的类型');
        }

        
        return obj;
    },


    /**
    * 对一个源对象进行成员过滤，并把过滤后的结果扩展到目标对象上。
    * 该方法可以从指定的对象上拷贝指定的成员到目标对象上。
    * @param {Object} target 接收成员的目标对象。
    * @param {Object} src 要进行拷贝的对象，即数据来源。
    * @param {Array|Object|string} samples 要拷贝的成员列表(模板)。
    * @return {Object} 返回一个过滤后的新对象。
    * @example
        var target = {
            myName: 'micty'
        };

        var src = {
            a: 100,
            b: 200,
            c: 300,
            d: 400
        };

        var samples = {
            a: 1,
            b: 2
        };

        //或 samples = ['a', 'b'];

        $.Object.filterTo(target, src, samples);
        console.dir(target); //得到 target = { myName: 'micty', a: 100, b: 200 };
    */
    filterTo: function (target, src, samples) {

        var obj = This.filter(src, samples);
        return This.extend(target, obj);
    },

    /**
    * 使用过滤函数对指定的对象进行过滤数，返回一个新对象。
    * @param {Object} target 要进行过滤的对象。
    * @param {function} fn 过滤函数。
    *   过滤函数会接收到两个参数：当前对象中迭代中的 key 和 value。
    *   过滤函数必须明确返回 true 以保留该成员，其它值则删除该成员。
    * @return {Object} 返回一个过滤后的纯对象。
    */
    grep: function (target, fn) {

        var obj = {};

        for (var key in target) {
            var value = target[key];
            if (fn(key, value) === true) { //只有回调函数中明确返回 true 才保留该成员
                obj[key] = value;
            }
        }

        return obj;
    },

    /**
    * 判断符合条件的元素是否存在。 
    * 只有在回调函数中明确返回 true，才算找到，此时本方法停止迭代，并返回 true 以指示找到； 
    * 否则迭代继续直至完成，并返回 false 以指示不存在符合条件的元素。
    * @param {Object} obj 要进行查找的对象，将在其成员中进行迭代。
    * @param {function} fn 自定义查找的函数。
        只有在回调函数中明确返回 true 才算找到，此时本方法停止迭代。
    * @param {boolean} isDeep 指示是否深层次迭代查找。
    * @return {boolean} 如果找到符合条件的元素，则返回 true；否则返回 false。
    * @example
        var obj = {
            a: 1,
            b: 2,
            c: 2,
            d: {
                a: 1,
                b: 1,
                c: 2
            }
        };

        var found = $.Object.find(obj, function (key, value) {
            if (key == 'b' && value == 1) {
                return true;
            }
        }, true);
        console.log(found); //true
    */
    find: function (obj, fn, isDeep) {

        var found = false;

        This.each(obj, function (key, value) {
            if (fn(key, value) === true) {
                found = true;
                return false;  // break
            }
        }, isDeep);

        return found;
    },

    /**
    * 查找符合条件的元素，返回一个键值的二元组[key, value]。
    * @param {Object} obj 要进行查找的对象，将在其成员中进行迭代。
    * @param {function} fn 自定义查找的函数。
        只有在回调函数中明确返回 true 才算找到，此时本方法停止迭代。
    * @param {boolean} isDeep 指示是否深层次迭代查找。
    * @return {boolean} 如果找到符合条件的元素，则返回该项的键值二元组[key, value]。
    * @example
        var obj = {
            a: 1,
            b: 2,
            c: 2,
            d: {
                a: 10,
                b: 10,
                c: 20
            }
        };

        var item = $.Object.findItem(obj, function (key, value) {
            return value == 20;
        }, true);
        console.log(item); //['c', 20]
    */
    findItem: function (obj, fn, isDeep) {

        var item = [];

        This.each(obj, function (key, value) {

            if (fn(key, value) === true) {
                item = [key, value];
                return false;  // break
            }

        }, isDeep);

        return item;
    },

    /**
    * 查找符合条件的元素，返回该元素的键。
    * @param {Object} obj 要进行查找的对象，将在其成员中进行迭代。
    * @param {function} fn 自定义查找的函数。
        只有在回调函数中明确返回 true 才算找到，此时本方法停止迭代。
    * @param {boolean} isDeep 指示是否深层次迭代查找。
    * @return {boolean} 如果找到符合条件的元素，则返回该项的键；否则返回 undefined。
    * @example
        var obj = {
            a: 1,
            b: 2,
            c: 2,
            d: {
                a: 10,
                b: 10,
                c: 20
            }
        };

        var key = $.Object.findKey(obj, function (key, value) {
            return value == 20;
        }, true);
        console.log(key); // 'c'
    */
    findKey: function (obj, fn, isDeep) {
        var item = This.findItem(obj, fn, isDeep);
        return item[0];
    },

    /**
    * 查找符合条件的元素，返回该元素的值。
    * @param {Object} obj 要进行查找的对象，将在其成员中进行迭代。
    * @param {function} fn 自定义查找的函数。
        只有在回调函数中明确返回 true 才算找到，此时本方法停止迭代。
    * @param {boolean} isDeep 指示是否深层次迭代查找。
    * @return {boolean} 如果找到符合条件的元素，则返回该元素的值；否则返回 undefined。
    * @example
        var obj = {
            a: 1,
            b: 2,
            c: 2,
            d: {
                a: 10,
                b: 10,
                cc: 20
            }
        };

        var value = $.Object.findValue(obj, function (key, value) {
            return key == 'cc';
        }, true);
        console.log(value); //20
    */
    findValue: function (obj, fn, isDeep) {
        var item = This.findItem(obj, fn, isDeep);
        return item[1];
    },

    /**
    * 获取指定的对象指定成员所对应的值。
    * 当对象中不存在该成员时，返回一个备用值。
    * @param {Object} obj 要获取值的对象。
    * @param key 要获取值的成员。
    * @param backupValue 备用值。。
    * @return 如果对象中存在该成员，则返回该成员所对应的值；否则，返回备用值。
    * @example
        var value = $.Object.get({}, 'a', 2);
        console.log(value); //得到 2;

        var value = $.Object.get({a: 1 }, 'a', 2);
        console.log(value); //得到 1;

        var value = $.Object.get(null, 'a', 1);
        console.log(value); //得到 1;
    */
    get: function (obj, key, backupValue) {

        if (!obj) {
            return backupValue;
        }

        if (key in obj) {
            return obj[key];
        }

        return backupValue;
    },

    /**
    * 给指定的对象设置一个键和一个值。
    * @param {Object} obj 要设置的对象。
    * @param key 设置对象所用的键。
    * @param value 设置对象所用的值。
    * @return {Object} 返回第一个参数 obj，即设置的对象。
    * @example
        var obj = $.Object.set({}, 'a', 1);
        console.dir(obj); //得到 obj = { a: 1 };
    */
    set: function (obj, key, value) {
        obj[key] = value;
        return obj;
    },

    /**
    * 用指定的键和值组合生成一个对象，支持批量操作。
    * @param {string|number|boolean|Array} key 生成对象所用的键。
        当是数组时，表示批量操作，格式必须是二元组。
    * @param value 生成对象所用的值。
    * @return {Object} 返回一个生成后的对象。
    * @example

        //单个操作
        var obj = $.Object.make('a', 1);
        console.dir(obj); //得到 obj = { a: 1 };

        //批量操作
        var obj = $.Object.make( 
            ['a', 1], 
            ['b', 2], 
            ['c', 3]
        );
        console.dir(obj); //得到 obj = { a: 1, b: 2, c: 3};
    */
    make: function (key, value) {

        var $ = Haf;
        var obj = {};

        if ($.Object.isArray(key)) {
            $.Array(arguments).each(function (pair, index) {
                obj[pair[0]] = pair[1];
            });
        }
        else {
            obj[key] = value;
        }

        return obj;
    },

    /**
    * 获取指定对象的所有成员中的值，返回一个数组。
    * @param {Object} obj 要进行获取值的对象。
    * @param {boolean} [isDeep=false] 指示是否要进行递归获取。
        如果要对成员中值类型为 object 的非 null 值递归处理，请指定 true，此时返回一个多维数组；
        否则指定为 false，此时为返回一个一维数组。
    * @return 返回一个由值组成的一维或多维数组。
    */
    getValues: function (obj, isDeep) {

        var fn = arguments.callee;

        var a = [];

        for (var key in obj) {
            var value = obj[key];

            if (isDeep === true &&
                typeof value == 'object' && 
                value !== null) {

                value = fn(value, isDeep);
            }

            a.push(value);
        }

        return a;
    },

    /**
    * 获取指定对象的所有成员中的键和值，返回一个二元组 [key, value] 的数组。
    * @param {Object} obj 要进行获取值的对象。
    * @param {boolean} [isDeep=false] 指示是否要进行递归获取。
        如果要对成员中值类型为 object 的非 null 值递归处理，请指定 true，此时返回一个多维数组；
        否则指定为 false，此时为返回一个一维数组。
    * @return 返回一个由二元组 [key, value] 组成的数组。
    */
    getItems: function (obj, isDeep) {

        return This.toArray(obj, true, isDeep);
    }



});




})(Haf, Haf.Object);


//----------------------------------------------------------------------------------------------------------------
//Haf.Object 包装类的实例方法

; (function (This) {




This.prototype = /**@inner*/
{
    constructor: This,
    value: {},


    init: function (obj) {
        this.value = Object(obj);
    },

    /**
    * 拆包装，获取 Object 对象。
    */
    valueOf: function () {
        return this.value;
    },


    clone: function () {
        return This.clone(this.value);
    },


    each: function (fn, isDeep) {
        This.each(this.value, fn, isDeep);
        return this;
    },


    extend: function () {
        //其实是想执行 This.extend(this.value, arguments[0], arguments[1], …);
        var args = [this.value];
        args = args.concat(Array.prototype.slice.call(arguments, 0));
        this.value = This.extend.apply(null, args);
        return this;
    },

    extendSafely: function () {
        //其实是想执行 This.extendSafely(this.value, arguments[0], arguments[1], …);
        var args = [this.value];
        args = args.concat(Array.prototype.slice.call(arguments, 0));
        this.value = This.extendSafely.apply(null, args);
        return this;
    },


    getType: function () {
        return This.getType(this.value);
    },


    isArray: function (isStrict) {
        return This.isArray(this.value, isStrict);
    },


    isBuiltinType: function () {
        return This.isBuiltinType(this.value);
    },


    isEmpty: function () {
        return This.isEmpty(this.value);
    },


    isPlain: function () {
        return This.isPlain(this.value);
    },


    isValueType: function () {
        return This.isValueType(this.value);
    },


    isWindow: function () {
        return This.isWindow(this.value);
    },


    isWrappedType: function () {
        return This.isWrappedType(this.value);
    },


    map: function (fn, isDeep) {
        this.value = This.map(this.value, fn, isDeep);
        return this;
    },


    namespace: function (path, value) {
        this.value = This.namespace(this.value, path, value);
        return this;
    },


    parseJson: function (data) {
        this.value = This.parseJson(data);
        return this;
    },


    parseQueryString: function (url, isShallow, isCompatible) {
        this.value = This.parseQueryString(url, isShallow, isCompatible);
        return this;
    },


    remove: function (keys) {
        this.value = This.remove(this.value, keys);
        return this;
    },


    replaceValues: function (nameValues, isShallow) {
        this.value = This.replaceValues(this.value, nameValues, isShallow);
        return this;
    },


    toArray: function (rule, isDeep) {
        return This.toArray(this.value, rule, isDeep);
    },


    toJSON: function () {
        return This.toJSON(this.value);
    },


    toQueryString: function (isCompatible) {
        return This.toQueryString(this.value, isCompatible);
    },


    toString: function (innerSeparator, pairSeparator) {
        return This.toString(this.value, innerSeparator, pairSeparator);
    },


    trim: function (values, isDeep) {
        this.value = This.trim(this.value, values, isDeep);
        return this;
    },

    filter: function (samples) {
        this.value = This.filter(this.value, samples);
        return this;
    },

    filterTo: function (src, samples) {
        this.value = This.filterTo(this.value, src, samples);
        return this;
    },

    grep: function (fn) {
        this.value = This.grep(this.value, fn);
        return this;
    },

    find: function (fn, isDeep) {
        return This.find(this.value, fn, isDeep);
    },

    findItem: function (fn, isDeep) {
        return This.findItem(this.value, fn, isDeep);
    },

    findKey: function (fn, isDeep) {
        return This.findKey(this.value, fn, isDeep);
    },

    findValue: function (fn, isDeep) {
        return This.findValue(this.value, fn, isDeep);

    },

    get: function (key, backupValue) {
        return This.get(this.value, key, backupValue);
    },

    set: function (key, value) {
        This.set(this.value, key, value);
        return this;
    },

    make: function (key, value) {
        this.value = This.make(key, value);
        return this;
    },

    getValues: function (isDeep) {
        return This.getValues(this.value, isDeep);
    },

    getItems: function (isDeep) {
        return This.getItems(this.value, isDeep);
    }


};

This.prototype.init.prototype = This.prototype;




})(Haf.Object);

/**
* 数组工具
* @class
*/
Haf.Array = function (array) {
    return new Haf.Array.prototype.init(array);
};


; (function ($, This) {


$.extend(This,  /**@lends Haf.Array*/
{


    /**
    * 对数组进行迭代，即对数组中的每个元素执行指定的操作。
    * @param {Array} array 要进行迭代的数组。
    * @param {function} fn 要执行处理的回调函数，会接受到当前元素和其索引作为参数。<br />
    *   只有在 fn 中明确返回 false 才停止循环(相当于 break)。
    * @param {boolean} [isReversed=false] 指定是否使用倒序进行迭代。
        如果要使用倒序来进行迭代，请指定 true；否则默认按正序。
    * @return {Array} 返回当前数组。
    * @example
        $.Array.each([0, 1, 2, 3], function(item, index)
        {
            if(index == 2)
            {
                return false;
            }
    
            console.log(index, ': ', item);
        });
    */
    each: function (array, fn, isReversed) {
        var len = array.length;

        if (isReversed === true) //使用反序。 根据<<高性能 JavaScript>>的论述，这种循环性能可以比 else 中的提高 50% 以上
        {
            for (var i = len; i--;) //这里只能用后减减，而不能用前减减，因为这里是测试条件，先测试，再减减
            {
                //如果用 callback.call(array[i], i)，
                //则在 callback 中的 this 就指参数中的 array[i]，但类型全部为 object
                if (fn(array[i], i) === false) // 只有在 fn 中明确返回 false 才停止循环
                {
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                if (fn(array[i], i) === false) {
                    break;
                }
            }
        }

        return array;
    },

    /**
    * 把一个对象转成数组。
    * @param {Object} obj 要进行转换的对象。<br />
    * @param {boolean} [useForIn=false] 指示是否使用 for in 来枚举要 obj 对象。<br />
    * @return {Array} 返回一个数组。<br />
        如果 obj 本身就是数组，则直接返回该对象（数组）。<br />
        如果 obj 没有 length 属性，或者不方便使用 length，请指定 useForIn 为 true，
        则使用 for in 来枚举该对象并填充到一个新数组中然后返回该数组；<br />
        否则如果 useForIn 指定为 false 或者不指定，并且该对象：<br />
        1.为 undefined <br />
        2.或 null <br />
        3.或不是对象<br />
        4.或该对象不包含 length 属性<br />
        5.或 length 为 0<br />
        
        则返回空数组；<br />
        否则按 obj.length 进行枚举并填充到一个数组里进行返回。
    */
    parse: function (obj, useForIn) {
        //本身就是数组。
        //这里不要用 $.Object.isArray(obj)，因为跨页面得到的obj，即使 $.Object.getType(obj) 返回 'Array'，
        //但在 IE 下 obj instanceof Array 仍为 false，从而对 obj 调用数组实例的方法就会出错。
        //即使该方法确实存在于 obj 中，但 IE 仍会报“意外地调用了方法或属性访问”的错误。
        //
        if (obj instanceof Array) {
            return obj;
        }


        var a = [];

        if (useForIn === true) //没有 length 属性，或者不方便使用 length，则使用 for in
        {
            for (var name in obj) {
                if (name === 'length') //忽略掉 length 属性
                {
                    continue;
                }

                a.push(obj[name]);
            }

            return a;
        }


        if (!obj || !obj.length) //参数非法
        {
            return [];
        }



        try //标准方法
        {
            a = Array.prototype.slice.call(obj, 0);
        }
        catch (ex) {
            for (var i = 0, len = obj.length; i < len; i++) {
                a.push(obj[i]);
            }
        }

        return a;
    },

    /**
    * 已重载。
    * 把一个数组转成 Object 对象。
    * @param {Array} array 要进行转换的数组。 
    * @param {Array|Object|Function} [maps] 转换的映射规则。
    <pre>
        1.当不指定第二个参数 maps 时，将得到一个类数组的对象（arguments 就是这样的对象）。
        否则，用参数 maps 指定的映射规则去填充一个新的对象并返回该对象，其中：
            2.当 maps 为数组时，则作为键的列表[ key0,…, keyN ]一一对应去建立键值映射关系，即 {keyN: array[N]}；
            3.当 maps 为对象时，则作为键-索引的映射关系去建立对象；
            4.当 maps 为函数时，则会调用该函数取得一个处理结果。
            其中该处理函数会接受到当前处理的数组项 item 和索引 index 作为参数。
            如果处理函数返回一个数组，则第1个元素作为键，第2个元素作为值，存到目标对象上。
            如果处理函数返回一个对象，则第1个成员的键作为键，第1个成员的值作为值，存到目标对象上，其他的忽略。
            
        如果参数非法，则返回 null；
        否则把数组的元素拷贝到一个新的 Object 对象上并返回它。
    </pre>
    * @return {Object} 返回一个 Object 对象，该对象上包含数组的处理结果，并且包含一个 length 成员。
    * @example
        //例子1: 不指定第二个参数 maps，得到一个类数组的对象（arguments 就是这样的对象）。
        var obj = $.Array.toObject(array);
        //等价于：
        var obj = {
            0: array[0],
            1: array[1],
            ...
            length: array.length    
        };
        
        //例子2: maps 为数组，则作为键的列表[key0,…, keyN]一一对应去建立键值映射关系，即{keyN: array[N]}
        var obj = $.Array.toObject(array, ['a', 'b', 'c']);
        //等价于
        var obj = {
            a: array[0], //maps[0] --> array[0]
            b: array[1], //maps[1] --> array[1]
            c: array[2]  //maps[2] --> array[2]
        };
        
        //例子3:  maps 为对象，则作为键-索引的映射关系去建立对象
        var obj = $.Array.toObject(array, 
        {
            a: 1,
            b: 1,
            c: 2
        });
        //等价于
        var obj = {
            a: array[1], //maps['a'] --> array[1]
            b: array[1], //maps['b'] --> array[1]
            c: array[2]  //maps['c'] --> array[2]
        };
        
        //例子4: maps 为函数，则会调用该函数取得一个处理结果
        var obj = $.Array.toObject(['a', 'b', 'c'], function(item, index)
        {
            return [item, index + 1000]; //第1个元素作为键，第2个元素作为值
        });
        //得到 
        obj = {
            a: 1000,
            b: 1001
            c: 1002
        };
        
        //又如：
        var obj = $.Array.toObject(['a', 'b', 'c'], function(item, index)
        {
            //处理函数返回一个对象，则第1个成员的键作为键，第1个成员的值作为值，存到目标对象上，其他的忽略。
            var obj = {};
            obj[item] = index + 1000;
            return obj;
            
        });
        //得到 
        obj = {
            a: 1000,
            b: 1001
            c: 1002
        };
    */
    toObject: function (array, maps) {

        //参数非法
        if (!array || !$.Object.isArray(array)) {
            return null;
        }

        var obj = {};

        //未指定参数 maps
        if (maps === undefined) {
            var len = array.length;
            obj.length = len;

            for (var i = 0; i < len; i++) {
                obj[i] = array[i];
            }

            return obj;
        }

        // maps 是数组 [ key0, key1, … ]，即键的列表
        if ($.Object.isArray(maps)) {

            var count = 0;
            var len = maps.length; //键的个数

            for (var i = 0; i < len; i++) {
                var key = maps[i];
                if (key in obj) {
                    continue;
                }

                obj[key] = array[i];
                count++;
            }

            obj.length = count; //maps 中可能含有相同的元素

            return obj;
        }


        // maps 是对象 { key0: 0, key1: 1, … }，即键跟索引的映射
        if ($.Object.isPlain(maps)) {
            var len = 0;

            for (var key in maps) {
                obj[key] = array[maps[key]];
                len++; //计数
            }

            obj.length = len;

            return obj;
        }

        //maps 是一个处理函数
        if (typeof maps == 'function') {
            var len = array.length;

            for (var i = 0; i < len; i++) {
                var v = maps(array[i], i); //调用处理函数以获得处理结果

                if (v instanceof Array) //处理函数返回的是数组
                {
                    var key = v[0];     //第0个元素作为键
                    var value = v[1];   //第1个元素作为值

                    obj[key] = value;   //建立键值的映射关系
                }
                else if ($.Object.isPlain(v)) //返回的是一个对象
                {
                    for (var key in v) //只处理第一个key，其他的忽略
                    {
                        obj[key] = v[key]; //建立键值的映射关系
                        break;
                    }
                }
                else {
                    throw new Error('处理函数 maps 返回结果的格式不可识别');
                }
            }

            obj.length = len;

            return obj;
        }

        return obj;
    },

    /*
    
        var obj = $.Array.toObject(array, 
        {
            xclsID: 0,
            mallsn: 2,
            a: 1,
            b: 1,
            c: 2
        });
    
        //等价于
    
        var obj = 
        {
            xclsID: array[0],
            mallsn: array[2],
            a: array[1],
            b: array[1],
            c: array[2]
        };
    
    
        var obj = $.Object.mapArray(array, 
        {
            xclsID: 0,
            mallsn: 2,
            a: 1,
            b: 1,
            c: 2
        });
    
    */



    /**
    * 将一个数组中的元素转换到另一个数组中，返回一个新数组。
    * 作为参数的转换函数会为每个数组元素调用，而且会给这个转换函数传递一个表示被转换的元素和该元素的索引作为参数。
    * 转换函数可以返回转换后的值：
    *   null：删除数组中的项目；
    *   undefined：删除此项目到数组最后一个元素
    */
    map: function (array, fn) {
        var a = [];

        for (var i = 0, len = array.length; i < len; i++) {
            var value = fn(array[i], i);

            if (value === null) {
                continue;
            }

            if (value === undefined) //注意，当回调函数 fn 不返回值时，迭代会给停止掉
            {
                break;
            }

            a.push(value);
        }

        return a;
    },

    /**
    * 将一个数组中的元素转换到另一个数组中，并且保留所有的元素，返回一个新数组。
    * 作为参数的转换函数会为每个数组元素调用，并把当前元素和索引作为参数传给转换函数。
    * 该方法与 map 的区别在于本方法会保留所有的元素，而不管它的返回是什么。
    */
    keep: function (array, fn) {

        var a = [];

        for (var i = 0, len = array.length; i < len; i++) {
            var value = fn(array[i], i);
            a.push(value);
        }

        return a;
    },

    /**
    * 使用过滤函数过滤数组元素，返回一个新数组。
    * 此函数至少传递两个参数：待过滤数组和过滤函数。过滤函数必须返回 true 以保留元素或 false 以删除元素。
    * 转换函数可以返回转换后的值：
    */
    grep: function (array, fn) {
        var a = [];

        for (var i = 0, len = array.length; i < len; i++) {
            var item = array[i];

            if (fn(item, i) === true) {
                a.push(item);
            }
        }

        return a;
    },

    /**
    * 检索特定的元素在数组中第一次出现的索引位置。
    * 注意，该方法用的是全等的比较操作。
    * @param {Array} array 要进行检索的数组。
    * @param {任意类型} item 要进行检索的项。
    * @return 返回一个整数，表示检索项在数组第一次出现的索引位置。
    *   如果不存在该元素，则返回 -1。
    * @example
        $.Array.indexOf(['a', '10', 10, 'b'], 10); //使用的是全等比较，结果为 2
        
    */
    indexOf: function (array, item) {
        if (typeof array.indexOf == 'function') //内置方法
        {
            return array.indexOf(item);
        }

        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === item) {
                return i;
            }
        }

        return -1;
    },

    /**
    * 判断数组中是否包含特定的元素，返回 true 或 false。
    */
    contains: function (array, item) {
        return This.indexOf(array, item) > -1;
    },


    /**
    * 从数组中删除特定的元素，返回一个新数组。
    */
    remove: function (array, target) {

        //不要用 map 方法，因为会把原有的 null 或 undefined 也删除掉，这不是本意。
        var a = [];
        for (var i = 0, len = array.length; i < len; i++) {

            var item = array[i];
            if (item === target) {
                continue;
            }

            a.push(item);
        }

        return a;
    },

    /**
    * 从数组中删除特定索引位置的元素，返回一个新数组。
    */
    removeAt: function (array, index) {
        var a = array.slice(0); //拷贝一份。
        a.splice(index, 1);
        return a;
    },

    /**
    * 反转数组，返回一个新数组。
    */
    reverse: function (array) {
        var a = [];

        for (var i = array.length - 1; i >= 0; i--) {
            a.push(array[i]);
        }

        return a;
    },

    /**
    * 批量合并数组，返回一个新数组。
    */
    merge: function () {
        var a = [];

        for (var i = 0, len = arguments.length; i < len; i++) {
            var arg = arguments[i];
            if (arg === undefined) {
                continue;
            }

            a = a.concat(arg);
        }

        return a;
    },

    /**
    * 批量合并数组，并删除重复的项，返回一个新数组。
    */
    mergeUnique: function () {
        var list = [];

        var argsLen = arguments.length;
        var contains = This.contains; //缓存一下方法引用，以提高循环中的性能

        for (var index = 0; index < argsLen; index++) {
            var arg = arguments[index];
            var len = arg.length;

            for (var i = 0; i < len; i++) {
                if (!contains(list, arg[i])) {
                    list.push(arg[i]);
                }
            }
        }

        return list;
    },

    /**
    * 删除重复的项，返回一个新数组。
    * 定义该接口，是为了语义上更准确。
    */
    unique: function (a) {
        return This.mergeUnique(a);
    },

    /**
    * 给数组删除（如果已经有该项）或添加（如果还没有项）一项，返回一个新数组。
    */
    toggle: function (array, item) {

        if (This.contains(array, item)) {
            return This.remove(array, item);
        }
        else {
            var list = array.slice(0);
            list.push(item);
            return list;
        }
        
    },


    /**
    * 判断符合条件的元素是否存在。
    * 只有在回调函数中明确返回 true，才算找到，此时本方法停止迭代，并返回 true 以指示找到；
    * 否则迭代继续直至完成，并返回 false 以指示不存在符合条件的元素。
    */
    find: function (array, fn, startIndex) {
        return This.findIndex(array, fn, startIndex) > -1;
    },


    /**
    * 查找符合条件的单个元素的索引，返回第一次找到的元素的索引值，否则返回 -1。
    * 只有在回调函数中明确返回 true，才算找到。
    */
    findIndex: function (array, fn, startIndex) {
        startIndex = startIndex || 0;

        for (var i = startIndex, len = array.length; i < len; i++) {
            if (fn(array[i], i) === true) // 只有在 fn 中明确返回 true 才停止循环
            {
                return i;
            }
        }

        return -1;
    },

    /**
    * 查找符合条件的单个元素，返回第一次找到的元素，否则返回 null。
    * 只有在回调函数中中明确返回 true 才算是找到。
    */
    findItem: function (array, fn, startIndex) {
        startIndex = startIndex || 0;

        for (var i = startIndex, len = array.length; i < len; i++) {
            var item = array[i];
            if (fn(item, i) === true) // 只有在 fn 中明确返回 true 才算是找到
            {
                return item;
            }
        }

        return null;
    },

    /**
    * 对此数组的元素进行随机排序，返回一个新数组。
    * @param {Array} list 要进行排序的数组。
    * @return {Array} 返回一个随机排序的新数组。
    * @example
        $.Array.random( ['a', 'b', 'c', 'd'] ); 
    */
    random: function (list) {
        var array = list.slice(0);

        for (var i = 0, len = array.length; i < len; i++) {
            var index = parseInt(Math.random() * i);
            var tmp = array[i];
            array[i] = array[index];
            array[index] = tmp;
        }

        return array;
    },

    /**
    * 随机获取数组中的一个元素。
    * @param {Array} array 要进行获取元素的数组。
    * @return 随机返回一个数组项。
        当数组为空时，返回 undefined。
    * @example
        $.Array.randomItem( ['a', 'b', 'c', 'd'] ); 
    */
    randomItem: function (array) {
        var len = array.length;
        if (len < 1) {
            return undefined;
        }

        var index = $.Math.randomInt(0, len - 1);
        return array[index];

    },

    /**
    * 获取数组中指定索引位置的元素。
    * 如果传入负数，则从后面开始算起。如果不传参数，则返回一份拷贝的新数组。
    */
    get: function (array, index) {
        var len = array.length;

        if (index >= 0 && index < len)   //在常规区间
        {
            return array[index];
        }

        var pos = index + len;
        if (index < 0 && pos >= 0) {
            return array[pos];
        }

        if (index == null)  // undefined 或 null
        {
            return array.slice(0);
        }
    },

    /**
    * 删除数组中为 null 或 undefined 的项，返回一个新数组
    */
    trim: function (array) {
        return This.map(array, function (item, index) {
            return item == null ? null : item;  //删除 null 或 undefined 的项
        });
    },

    /**
    * 创建分组，即把转成二维数组。返回一个二维数组。
    * 当指定第三个参数为 true 时，可在最后一组向右对齐数据。
    */
    group: function (array, size, isPadRight) {
        var groups = This.slide(array, size, size);

        if (isPadRight === true) {
            groups[groups.length - 1] = array.slice(-size); //右对齐最后一组
        }

        return groups;
    },

    /**
    * 用滑动窗口的方式创建分组，即把转成二维数组。返回一个二维数组。
    * 可以指定窗口大小和步长。步长默认为1。
    */
    slide: function (array, windowSize, stepSize) {
        if (windowSize >= array.length) //只够创建一组
        {
            return [array];
        }

        stepSize = stepSize || 1;

        var groups = [];

        for (var i = 0, len = array.length; i < len; i = i + stepSize) {
            var end = i + windowSize;

            groups.push(array.slice(i, end));

            if (end >= len) {
                break; //已达到最后一组
            }
        }

        return groups;
    },

    /**
    * 用圆形的方式截取数组片段，返回一个新的数组。
    * 即把数组看成一个首尾相接的圆圈，然后从指定位置开始截取指定长度的片段。
    */
    circleSlice: function (array, startIndex, size) {
        var a = array.slice(startIndex, startIndex + size);
        var b = [];

        var d = size - a.length;
        if (d > 0) //该片段未达到指定大小，继续从数组头部开始截取
        {
            b = array.slice(0, d);
        }

        return a.concat(b);
    },

    /**
    * 用圆形滑动窗口的方式创建分组，返回一个二维数组。
    * 可以指定窗口大小和步长。步长默认为 1。
    * 即把数组看成一个首尾相接的圆圈，然后开始滑动窗口。
    */
    circleSlide: function (array, windowSize, stepSize) {
        if (array.length < windowSize) {
            return [array];
        }

        stepSize = stepSize || 1;

        var groups = [];
        var circleSlice = This.circleSlice; //缓存方法的引用，以提高循环中的性能

        for (var i = 0, len = array.length; i < len; i = i + stepSize) {
            groups.push(circleSlice(array, i, windowSize));
        }

        return groups;
    },

    /**
    * 对一个数组的所有元素进行求和。
    * 当指定第二个参数为 true 时，可以忽略掉 NaN 的元素。
    * 当指定第三个参数时，将读取数组元素中的对应的成员，该使用方式主要用于由 json 组成的的数组中。
    */
    sum: function (array, ignoreNaN, key) {
        var sum = 0;

        var hasKey = !(key === undefined);

        for (var i = 0, len = array.length; i < len; i++) {
            var value = hasKey ? array[i][key] : array[i];

            if (isNaN(value)) {
                if (ignoreNaN === true) {
                    continue;
                }
                else {
                    throw new Error('第 ' + i + ' 个元素的值为 NaN');
                }
            }
            else {
                sum += Number(value); //可以处理 string
            }
        }

        return sum;
    },

    /**
    * 查找一个数组的所有元素中的最大值。
    * 当指定第二个参数为 true 时，可以忽略掉 NaN 的元素。
    * 当指定第三个参数时，将读取数组元素中的对应的成员，该使用方式主要用于由 json 组成的的数组中。
    */
    max: function (array, ignoreNaN, key) {
        var max = 0;

        var hasKey = !(key === undefined);

        for (var i = 0, len = array.length; i < len; i++) {
            var value = hasKey ? array[i][key] : array[i];

            if (isNaN(value)) {
                if (ignoreNaN === true) {
                    continue;
                }
                else {
                    throw new Error('第 ' + i + ' 个元素的值为 NaN');
                }
            }
            else {
                value = Number(value); //可以处理 string
                if (value > max) {
                    max = value;
                }
            }
        }

        return max;
    },

    /**
    * 判断数组中是否包含元素。
    * 当传入的参数为数组，并且其 length 大于 0 时，返回 true；否则返回 false。
    */
    hasItem: function (array) {
        return $.Object.isArray(array) &&
            array.length > 0;
    },

    /**
    * 给数组降维，返回一个新数组。
    * 可以指定降维次数，当不指定次数，默认为 1 次。
    */
    reduceDimension: function (array, count) {
        count = count || 1;

        var a = array;
        var concat = Array.prototype.concat; //缓存一下方法引用，以提高循环中的性能

        for (var i = 0; i < count; i++) {
            a = concat.apply([], a);
        }

        return a;
    },


    /**
    * 求两个或多个数组的笛卡尔积，返回一个二维数组。
    * 
    * 例如： 
    *   A = [a, b]; 
    *   B = [0, 1, 2]; 求积后结果为：
    *   C = 
    *   [ 
    *       [a, 0], [a, 1], [a, 2], 
    *       [b, 0], [b, 1], [b, 2] 
    *   ];
    * 注意：
    *   $.Array.descartes(A, B, C)并不等于（但等于$.Array(A).descartes(B, C)的结果）
    *   $.Array.descartes($.Array.descartes(A, B), C)（但等于$.Array(A).descartes(B).descartes(C)的结果）
    */
    descartes: function (arrayA, arrayB) {
        var list = fn(arrayA, arrayB); //常规情况，两个数组

        for (var i = 2, len = arguments.length; i < len; i++) //(如果有)多个数组，递归处理
        {
            list = fn(list, arguments[i], true);
        }

        return list;


        /*仅内部使用的一个方法*/
        function fn(A, B, reduced) {
            var list = [];

            for (var i = 0, len = A.length; i < len; i++) {
                for (var j = 0, size = B.length; j < size; j++) {
                    var item = [];

                    if (reduced) //参数多于两个的情况，降维
                    {
                        item = item.concat(A[i]); //此时的 A[i] 为一个数组，如此相较于 item[0] = A[i] 可降维
                        item.push(B[j]); //把 A[i] 的所有元素压入 item 后，再把 B[j] 作为一个元素压入item
                    }
                    else //下面组成一个有序的二元组
                    {
                        item[0] = A[i];
                        item[1] = B[j]; //这里也相当于 item.push( B[j] )
                    }

                    list.push(item);
                }
            }

            return list;
        }
    },

    /**
    * 把笛卡尔积分解成因子，返回一个二维数组。
    * 该方法是求笛卡尔积的逆过程。
    * 参数 sizes 是各因子的长度组成的一维数组。
    */
    divideDescartes: function (array, sizes) {
        var rows = array.length; // "局部数组"的长度，从整个数组开始

        var list = [];

        for (var i = 0, len = sizes.length; i < len; i++) //sizes的长度，就是因子的个数
        {
            var size = sizes[i];    //当前因子的长度
            var step = rows / size;   //当前因子中的元素出现的步长(也是每个元素重复次数)

            var a = []; //分配一个数组来收集当前因子的 size 个元素

            for (var s = 0; s < size; s++) //收集当前因子的 size 个元素
            {
                a.push(array[s * step][i]); //因为因子中的每个元素重复出现的次数为 step，因此采样步长为 step
            }

            rows = step; //更新下一次迭代中的"局部数组"所指示的长度

            list[i] = a; //引用到因子收集器中
        }

        return list;
    },

    /**
    * 对数组进行转置，即把数组的行与列对换，返回一个新数组。
    *   [
            ['a', 'b', 'c'],
            [100, 200, 300]
        ]
        ====>
        [
            ['a', 100],
            ['b', 200],
            ['c', 300],
        ]
    */
    transpose: function (array) {
        var A = array; //换个名称，代码更简洁，也更符合线性代数的表示

        var list = [];

        var rows = A.length;    //行数
        var cols = 1;           //列数，先假设为 1 列，在扫描行时，会更新成该行的最大值

        for (var c = 0; c < cols; c++) //从列开始扫描
        {
            var a = [];

            for (var r = 0; r < rows; r++) //再扫描行
            {
                if (A[r].length > cols) //当前行的列数比 cols 要大，更新 cols
                {
                    cols = A[r].length;
                }

                a.push(A[r][c]);
            }

            list[c] = a;
        }

        return list;
    },

    /**
    * 求两个或多个数组的交集，返回一个最小集的新数组。
    * 即返回的数组中，已对元素进行去重。
    * 元素与元素的比较操作用的是全等关系
    */
    intersection: function (arrayA, arrayB) {
        var list = arrayA;

        for (var i = 1, len = arguments.length; i < len; i++) {
            list = fn(list, arguments[i]);
        }

        return list;


        function fn(A, B) {
            var list = [];

            for (var i = 0, len = A.length; i < len; i++) {
                var item = A[i];

                for (var j = 0, size = B.length; j < size; j++) {
                    if (item === B[j]) {
                        list.push(item);
                        break;
                    }
                }
            }

            return This.unique(list);
        }
    },

    /**
    * 判断两个数组是否相等。
    * 只有同为数组并且长度一致时，才有可能相等。
    * 如何定义两个元素相等，或者定义两个元素相等的标准，由参数 fn 指定。
    * 当不指定 fn 时，由使用全等(严格相等)来判断
    */
    equals: function (A, B, fn) {
        //确保都是数组，并且长度一致
        if (!(A instanceof Array) || !(B instanceof Array) || A.length != B.length) {
            return false;
        }

        //如何定义两个元素相等，或者定义两个元素相等的标准，由参数 fn 指定。
        //当不指定时，由使用全等来判断(严格相等)
        fn = fn || function (x, y) {
            return x === y;
        };

        for (var i = 0, len = A.length; i < len; i++) {

            if (!fn(A[i], B[i]))//只要有一个不等，整个结果就是不等
            {
                return false;
            }
        }

        return true;
    },

    /**
    * 判断第一个数组 A 是否包含于第二个数组 B，即 A 中所有的元素都可以在 B 中找到。
    */
    isContained: function (A, B) {
        return This.intersection(A, B).length == A.length;
    },


    /**
    * 右对齐此数组，在左边用指定的项填充以达到指定的总长度，返回一个新数组。
    * 当指定的总长度小实际长度时，将从右边开始算起，做截断处理，以达到指定的总长度。
    */
    padLeft: function (array, totalLength, paddingItem) {
        var delta = totalLength - array.length; //要填充的数目

        if (delta <= 0) {
            return array.slice(-delta); //-delta为正数
        }

        var a = [];
        for (var i = 0; i < delta; i++) {
            a.push(paddingItem);
        }

        a = a.concat(array);

        return a;
    },

    /**
    * 左对齐此数组，在右边用指定的项填充以达到指定的总长度，返回一个新数组。
    * 当指定的总长度小实际长度时，将从左边开始算起，做截断处理，以达到指定的总长度。
    */
    padRight: function (array, totalLength, paddingItem) {
        var delta = totalLength - array.length;

        if (delta <= 0) {
            return array.slice(0, totalLength);
        }


        var a = array.slice(0); //克隆一份

        for (var i = 0; i < delta; i++) {
            a.push(paddingItem);
        }

        return a;
    },

    /**
    * 产生一个区间为 [start, end) 的半开区间的数组。
    * @param {number} start 半开区间的开始值。
    * @param {number} end 半开区间的结束值。
    * @param {number} [step=1] 填充的步长，默认值为 1。可以指定为负数。
    * @return {Array} 返回一个递增（减）的数组。<br />
    *   当 start 与 end 相等时，返回一个空数组。
    * @example
        $.Array.pad(1, 9, 2); //产生一个从1到9的数组，步长为2，结果为[1, 3, 5, 7]
        $.Array.pad(5, 2, -1); //产生一个从5到2的数组，步长为-1，结果为[5, 4, 3]
    */
    pad: function (start, end, step) {
        if (start == end) {
            return [];
        }

        step = Math.abs(step || 1);

        var a = [];

        if (start < end) //升序
        {
            for (var i = start; i < end; i += step) {
                a.push(i);
            }
        }
        else //降序
        {
            for (var i = start; i > end; i -= step) {
                a.push(i);
            }
        }

        return a;
    },

    /**
    * 对一个数组进行分类聚合。<br />
    * 该方法常用于对一个 JSON 数组按某个字段的值进行分组而得到一个新的 Object 对象。
    * @param {Array} array 要进行分类聚合的数组。一般是 JSON 数组。
    * @param {string|function} getKey 用于分类聚合的键，即要对 JSON 数组中的每项取哪个成员进行分类。<br />
        可以提供一个字符串值，也可以提供一个函数以返回一个键值。<br />
        如果提供的是函数，则会在参数中接收到当前处理的数组项和索引。
    * @param {function} [getValue] 用于处理当前数组项的函数，返回一个新值代替原来的数组项。<br />
        如果指定该参数，则会在参数中接收到当前处理的数组项和索引，然后返回一个新值来代替原来的数组项。<br />
        注意：类似于 $.Array.map 的规定用法，<br />
            当返回 null 时，则会 continue，忽略该返回值；<br />
            当返回 undefined 时，则会 break，停止再迭代数组；
    * @return {Object} 返回一个经过分类聚合的 Object 对象。
    * @example
        var books = [
            { name: 'C++', type: '计算机', year: 2012 },   
            { name: 'JavaScript', type: '计算机', year: 2011 },
            { name: '简爱', type: '文学', year: 2011 },
            { name: '数据结构', type: '计算机', year: 2013 },
            { name: '人生', type: '文学', year: 2012 },
            { name: '大学物理', type: '物理', year: 2012 },
            { name: '高等数学', type: '数学', year: 2011 },
            { name: '微积分', type: '数学', year: 2013 }
        ];
        //按 type 进行聚合(分组)
        var byTypes = $.Array.aggregate( books, 'type' );  
        
        //按 year 进行聚合(分组)，并重新返回一个值。
        var byYears = $.Array.aggregate( books, 'year', function(item, index)
        {
            return { name: item.name, type: item.type, year: '出版年份：' + item.year };
        });   
    
        则 byTypes = {
            '计算机': [
                { name: 'C++', type: '计算机', year: 2012 },   
                { name: 'JavaScript', type: '计算机', year: 2011 },
                { name: '数据结构', type: '计算机', year: 2013 }
            ],
            '文学': [
                { name: '简爱', type: '文学', year: 2011 }
            ],
            '物理': [
                { name: '大学物理', type: '物理', year: 2012 }
            ],
            '数学': [
                { name: '高等数学', type: '数学', year: 2011 },
                { name: '微积分', type: '数学', year: 2013 }
            ]
        };
    
        byYears = {
            2011: [
                { name: 'JavaScript', type: '计算机', year: '出版年份：2011' },
                { name: '简爱', type: '文学', year: '出版年份：2011' },
                { name: '高等数学', type: '数学', year: '出版年份：2011' }
            ],
            2012: [
                { name: 'C++', type: '计算机', year: '出版年份：2012' },
                { name: '人生', type: '文学', year: '出版年份：2012' },
                { name: '大学物理', type: '物理', year: '出版年份：2012' }
            ],
            2013: [
                { name: '数据结构', type: '计算机', year: '出版年份：2013' },
                { name: '微积分', type: '数学', year: '出版年份：2013' }
            ]
        };
    */
    aggregate: function (array, getKey, getValue) {
        var isKey = typeof getKey == 'string';
        var changed = typeof getValue == 'function';

        var obj = {};

        for (var i = 0, len = array.length; i < len; i++) {
            var item = array[i];
            var key = isKey ? item[getKey] : getKey(item, i);

            if (!obj[key]) {
                obj[key] = [];
            }

            var value = item;

            if (changed) //指定了要变换值
            {
                value = getValue(item, i);

                if (value === null) {
                    continue;
                }

                if (value === undefined) {
                    break;
                }
            }

            obj[key].push(value);
        }

        return obj;


    },

    /**
    * 从一个数组拷贝一份并添加一个项目，返回一个新的数组。
    * @param {Array} array 要进行拷贝的数组。 
    * @param item 要进行添加的元素。
    * @return {Array} 返回一个包含新添加的元素的新数组。
    * @example
        var a = ['a', 'b'];
        var b = $.Array.add(a, 'c');
        console.dir(a); //结果没变，仍为 ['a', 'b']
        console.dir(b); //结果为 ['a', 'b', 'c'];

        var c = $.Array.add(null, 'c'); //结果为 ['c'];
        var d = $.Array.add(undefined, 'c'); //结果为 ['c'];
    */
    add: function (array, item) {
        var a = array ? array.slice(0) : [];
        a.push(item);
        return a;
    }



});


})(Haf, Haf.Array);



//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法

; (function (This) {


This.prototype = /**@inner*/
{
    constructor: This,
    value: [],


    init: function (array) {
        this.value = This.parse(array);
    },


    toString: function (separator) {
        separator = separator === undefined ? '' : separator;
        return this.value.join(separator);
    },

    valueOf: function () {
        return this.value;
    },


    each: function (fn, isReversed) {
        This.each(this.value, fn, isReversed);
        return this;
    },


    toObject: function (maps) {
        return This.toObject(this.value, maps);
    },


    map: function (fn) {
        this.value = This.map(this.value, fn);
        return this;
    },

    keep: function (fn) {
        this.value = This.keep(this.value, fn);
        return this;
    },


    grep: function (fn) {
        this.value = This.grep(this.value, fn);
        return this;
    },


    indexOf: function (item) {
        return This.indexOf(this.value, item);
    },


    contains: function (item) {
        return This.contains(this.value, item);
    },


    remove: function (target) {
        this.value = This.remove(this.value, target);
        return this;
    },


    removeAt: function (index) {
        this.value = This.removeAt(this.value, index);
        return this;
    },


    reverse: function () {
        this.value = This.reverse(this.value);
        return this;
    },


    merge: function () {
        //其实是想执行 Haf.Array.merge(this.value, arguments[0], arguments[1], …);
        var args = [this.value];
        args = args.concat(Array.prototype.slice.call(arguments, 0));
        this.value = This.merge.apply(null, args);
        return this;
    },


    mergeUnique: function () {
        //其实是想执行 Haf.Array.mergeUnique(this.value, arguments[0], arguments[1], …);
        var args = [this.value];
        args = args.concat(Array.prototype.slice.call(arguments, 0));
        this.value = This.mergeUnique.apply(null, args);
        return this;
    },


    unique: function () {
        this.value = This.unique(this.value);
        return this;
    },


    toggle: function (item) {
        this.value = This.toggle(this.value, item);
        return this;
    },


    find: function (fn, startIndex) {
        return This.find(this.value, fn, startIndex);
    },


    findIndex: function (fn, startIndex) {
        return This.findIndex(this.value, fn, startIndex);
    },


    findItem: function (fn, startIndex) {
        return This.findItem(this.value, fn, startIndex);
    },


    random: function () {
        this.value = This.random(this.value);
        return this;
    },


    randomItem: function () {
        return This.randomItem(this.value);
    },


    get: function (index) {
        return This.get(this.value, index);
    },


    trim: function () {
        this.value = This.trim(this.value);
        return this;
    },


    group: function (size, isPadRight) {
        this.value = This.group(this.value, size, isPadRight);
        return this;
    },


    slide: function (windowSize, stepSize) {
        this.value = This.slide(this.value, windowSize, stepSize);
        return this;
    },


    circleSlice: function (startIndex, size) {
        this.value = This.circleSlice(this.value, startIndex, size);
        return this;
    },


    circleSlide: function (windowSize, stepSize) {
        this.value = This.circleSlide(this.value, windowSize, stepSize);
        return this;
    },


    sum: function (ignoreNaN, key) {
        return This.sum(this.value, ignoreNaN, key);
    },


    max: function (ignoreNaN, key) {
        return This.max(this.value, ignoreNaN, key);
    },


    hasItem: function () {
        return This.hasItem(this.value);
    },


    reduceDimension: function (count) {
        this.value = This.reduceDimension(this.value, count);
        return this;
    },

    //注意：
    //  $.Array(A).descartes(B, C) 并不等于
    //  $.Array(A).descartes(B).descartes(C) 中的结果

    descartes: function () {
        var args = This.parse(arguments); //转成数组
        args = [this.value].concat(args);

        this.value = This.descartes.apply(null, args);
        return this;
    },


    divideDescartes: function (sizes) {
        this.value = This.divideDescartes(this.value, sizes);
        return this;
    },


    transpose: function () {
        this.value = This.transpose(this.value);
        return this;
    },

    //注意：
    // $.Array(a).intersection(b, c) 等于
    // $.Array(a).intersection(b).intersection(c)

    intersection: function () {
        var args = This.parse(arguments); //转成数组
        args = [this.value].concat(args);

        this.value = This.intersection.apply(null, args);
        return this;
    },


    equals: function (array, fn) {
        return This.equals(this.value, array, fn);
    },


    isContained: function (B) {
        return This.isContained(this.value, B);
    },


    padLeft: function (totalLength, paddingItem) {
        this.value = This.padLeft(this.value, totalLength, paddingItem);
        return this;
    },


    padRight: function (totalLength, paddingItem) {
        this.value = This.padRight(this.value, totalLength, paddingItem);
        return this;
    },


    pad: function (start, end, step) {
        this.value = This.pad(start, end, step);
        return this;
    }
};

This.prototype.init.prototype = This.prototype;

})(Haf.Array);


/**
* 字符串工具类
* @class
*/
Haf.String = function (string) {
    if (arguments.length > 1) // 此时当作 $.String('{0}{1}..', arg1, arg2); 这样的调用
    {
        var args = Array.prototype.slice.call(arguments, 1);
        return Haf.String.format(string, args);
    }

    return new Haf.String.prototype.init(string);
};


; (function ($, This) {





$.extend(This, { /**@lends Haf.String */


    /**
    * 用指定的值去填充一个字符串。
    * 当不指定字符串的填充标记时，则默认为 {}。
    * @param {String} string 要进行格式填充的字符串模板。
    * @param {Object} obj 要填充的键值对的对象。
    * @return 返回一个用值去填充后的字符串。
    * @example
    * 用法：
        $.String.format('{id}{type}', {id: 1, type: 'app'});
        $.String.format('{2}{0}{1}', 'a', 'b', 'c');
    */
    format: function (string, obj, arg2) {

        var s = string;

        if (typeof obj == 'object')
        {
            for (var key in obj) {
                s = This.replaceAll(s, '{' + key + '}', obj[key]);
            }

        }
        else {
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, len = args.length; i < len; i++) {
                s = This.replaceAll(s, '{' + i + '}', args[i]);
            }
        }

        return s;

    },



    /**
    * 对字符串进行全局替换。
    * @param {String} target 要进行替换的目标字符串。
    * @param {String} src 要进行替换的子串，旧值。
    * @param {String} dest 要进行替换的新子串，新值。
    * @return {String} 返回一个替换后的字符串。
    * @example
        $.String.replaceAll('abcdeabc', 'bc', 'BC') //结果为 aBCdeBC
    */
    replaceAll: function (target, src, dest) {
        return target.split(src).join(dest);
    },


    /**
    * 对字符串进行区间内的替换。
    * 该方法会把整个区间替换成新的字符串，包括区间标记。
    * @param {String} string 要进行替换的目标字符串。
    * @param {String} startTag 区间的开始标记。
    * @param {String} endTag 区间的结束标记
    * @param {String} newString 要进行替换的新子串，新值。
    * @return {String} 返回一个替换后的字符串。<br />
    *   当不存在开始标记或结束标记时，都会不进行任何处理而直接返回原字符串。
    * @example
        $.String.replaceBetween('hello #--world--# this is #--good--#', '#--', '--#', 'javascript') 
        //结果为 'hello javascript this is javascript'
    */
    replaceBetween: function (string, startTag, endTag, newString) {
        var startIndex = string.indexOf(startTag);
        if (startIndex < 0) {
            return string;
        }

        var endIndex = string.indexOf(endTag);
        if (endIndex < 0) {
            return string;
        }

        var prefix = string.slice(0, startIndex);
        var suffix = string.slice(endIndex + endTag.length);

        return prefix + newString + suffix;
    },


    /**
    * 移除指定的字符子串。
    * @param {String} target 要进行替换的目标字符串。
    * @param {String|Array} src 要进行移除的子串。
        支持批量的形式，传一个数组。
    * @return {String} 返回一个替换后的字符串。
    * @example
        $.String.removeAll('hi js hi abc', 'hi') 
        //结果为 ' js  abc'
    */
    removeAll: function (target, src) {

        if (Haf.Object.isArray(src)) {
            Haf.Array.each(src, function (item, index) {
                target = Haf.String.replaceAll(target, item, '');
            });
            return target;
        }

        return Haf.String.replaceAll(target, src, '');
    },

    /**
    * 从当前 String 对象移除所有前导空白字符和尾部空白字符。
    * @param {String} 要进行操作的字符串。
    * @return {String} 返回一个新的字符串。
    * @expample
        $.String.trim('  abc def mm  '); //结果为 'abc def mm'
    */
    trim: function (string) {
        return string.replace(/(^\s*)|(\s*$)/g, '');
    },

    /**
    * 从当前 String 对象移除所有前导空白字符。
    * @param {String} 要进行操作的字符串。
    * @return {String} 返回一个新的字符串。
    * @expample
        $.String.trimStart('  abc def mm '); //结果为 'abc def mm  '
    */
    trimStart: function (string) {
        return string.replace(/(^\s*)/g, '');
    },

    /**
    * 从当前 String 对象移除所有尾部空白字符。
    * @param {String} 要进行操作的字符串。
    * @return {String} 返回一个新的字符串。
    * @expample
        $.String.trimStart('  abc def mm '); //结果为 '  abc def mm'
    */
    trimEnd: function (string) {
        return string.replace(/(\s*$)/g, '');
    },

    /**
    * 右对齐此实例中的字符，在左边用指定的 Unicode 字符填充以达到指定的总长度。
    * 当指定的总长度小实际长度时，将从右边开始算起，做截断处理，以达到指定的总长度。
    * @param {String} string 要进行填充对齐的字符串。
    * @param {Number} totalWidth 填充后要达到的总长度。
    * @param {String} paddingChar 用来填充的模板字符串。
    * @return {String} 返回一个经过填充对齐后的新字符串。
    * @example
        $.String.padLeft('1234', 6, '0'); //结果为 '001234'，右对齐，从左边填充 '0'
        $.String.padLeft('1234', 2, '0'); //结果为 '34'，右对齐，从左边开始截断
    */
    padLeft: function (string, totalWidth, paddingChar) {
        string = String(string); //转成字符串

        var len = string.length;
        if (totalWidth <= len) //需要的长度短于实际长度，做截断处理
        {
            return string.substr(-totalWidth); //从后面算起
        }

        paddingChar = paddingChar || ' ';

        var arr = [];
        arr.length = totalWidth - len + 1;


        return arr.join(paddingChar) + string;
    },


    /**
    * 左对齐此字符串中的字符，在右边用指定的 Unicode 字符填充以达到指定的总长度。
    * 当指定的总长度小实际长度时，将从左边开始算起，做截断处理，以达到指定的总长度。
    * @param {String} string 要进行填充对齐的字符串。
    * @param {Number} totalWidth 填充后要达到的总长度。
    * @param {String} paddingChar 用来填充的模板字符串。
    * @return {String} 返回一个经过填充对齐后的新字符串。
    * @example
        $.String.padLeft('1234', 6, '0'); //结果为 '123400'，左对齐，从右边填充 '0'
        $.String.padLeft('1234', 2, '0'); //结果为 '12'，左对齐，从右边开始截断
    */
    padRight: function (string, totalWidth, paddingChar) {
        string = String(string); //转成字符串

        var len = string.length;
        if (len >= totalWidth) {
            return string.substring(0, totalWidth);
        }

        paddingChar = paddingChar || ' ';

        var arr = [];
        arr.length = totalWidth - len + 1;


        return string + arr.join(paddingChar);
    },

    /**
    * 获取位于两个标记子串之间的子字符串。
    * @param {String} string 要进行获取的大串。
    * @param {String} tag0 区间的开始标记。
    * @param {String} tag1 区间的结束标记。
    * @return {String} 返回一个子字符串。当获取不能结果时，统一返回空字符串。
    * @example
        $.String.between('abc{!hello!} world', '{!', '!}'); //结果为 'hello' 
    */
    between: function (string, tag0, tag1) {
        var startIndex = string.indexOf(tag0);
        if (startIndex < 0) {
            return '';
        }

        startIndex += tag0.length;

        var endIndex = string.indexOf(tag1, startIndex);
        if (endIndex < 0) {
            return '';
        }

        return string.substr(startIndex, endIndex - startIndex);
    },

    /**
    * 产生指定格式或长度的随机字符串。
    * @param {string|int} [formater=12] 随机字符串的格式，或者长度（默认为12个字符）。
        格式中的每个随机字符用 'x' 来占位，如 'xxxx-1x2x-xx'
    * @return {string} 返回一个指定长度的随机字符串。
    * @example
        $.String.random();      //返回一个 12 位的随机字符串
        $.String.random(64);    //返回一个 64 位的随机字符串
        $.String.random('xxxx-你好xx-xx'); //类似 'A3EA-你好B4-DC'
    */
    random: function (formater) {
        if (formater === undefined) {
            formater = 12;
        }

        //如果传入的是数字，则生成一个指定长度的格式字符串 'xxxxx...'
        if (typeof formater == 'number') {
            var size = formater + 1;
            if (size < 0) {
                size = 0;
            }
            formater = [];
            formater.length = size;
            formater = formater.join('x');
        }

        return formater.replace(/x/g, function (c) {
            var r = Math.random() * 16 | 0;
            return r.toString(16);
        }).toUpperCase();
    }

});//--------------------------------------------------------------------------------------





//---------------判断部分 -----------------------------------------------------
Haf.extend(Haf.String, /**@lends Haf.String */
{

    /**
    * 确定一个字符串的开头是否与指定的字符串匹配。
    * @param {String} str 要进行判断的大字符串。
    * @param {String} dest 要进行判断的子字符串，即要检测的开头子串。
    * @param {boolean} [ignoreCase=false] 指示是否忽略大小写。默认不忽略。
    * @return {boolean} 返回一个bool值，如果大串中是以小串开头，则返回 true；否则返回 false。
    * @example
        $.String.startsWith('abcdef', 'abc') //结果为 true。
        $.String.startsWith('abcdef', 'Abc', true) //结果为 true。
    */
    startsWith: function (str, dest, ignoreCase) {
        if (ignoreCase) {
            var src = str.substring(0, dest.length);
            return src.toUpperCase() === dest.toString().toUpperCase();
        }

        return str.indexOf(dest) == 0;
    },


    /**
    * 确定一个字符串的末尾是否与指定的字符串匹配。
    * @param {String} str 要进行判断的大字符串。
    * @param {String} dest 要进行判断的子字符串，即要检测的末尾子串。
    * @param {boolean} [ignoreCase=false] 指示是否忽略大小写。默认不忽略。
    * @return {boolean} 返回一个bool值，如果大串中是以小串结尾，则返回 true；否则返回 false。
    * @example
        $.String.endsWith('abcdef', 'def') //结果为 true。
        $.String.endsWith('abcdef', 'DEF', true) //结果为 true。
    */
    endsWith: function (str, dest, ignoreCase) {
        var len0 = str.length;
        var len1 = dest.length;
        var delta = len0 - len1;


        if (ignoreCase) {
            var src = str.substring(delta, len0);
            return src.toUpperCase() === dest.toString().toUpperCase();
        }

        return str.lastIndexOf(dest) == delta;
    },

    /**
    * 确定一个字符串是否包含指定的子字符串。
    * @param {String} src 要进行检测的大串。
    * @param {String} target 要进行检测模式子串。
    * @return {boolean} 返回一个 bool 值。如果大串中包含模式子串，则返回 true；否则返回 false。
    * @example
        $.String.contains('javascript is ok', 'scr');   //true
        $.String.contains('javascript is ok', 'iis');      //false
    */
    contains: function (src, target, useOr) {
        var $ = Haf;
        src = String(src);

        if ($.Object.isArray(target)) {

            var existed;

            if (useOr === true) { // or 关系，只要有一个存在，则结果为 true
                existed = false;
                $.Array.each(target, function (item, index) {
                    existed = src.indexOf(item) > -1;
                    if (existed) {
                        return false; //break;
                    }
                });
            }
            else { // and 关系，只要有一个不存在，则结果为 false
                existed = true;
                $.Array.each(target, function (item, index) {
                    existed = src.indexOf(item) > -1;
                    if (!existed) {
                        return false; //break;
                    }
                });
            }

            return existed;
        }

        return src.indexOf(target) > -1;
    }


});//--------------------------------------------------------------------------------------




//---------------转换部分 -----------------------------------------------------
Haf.extend(Haf.String, /**@lends Haf.String */
{


    /**
    * 转成骆驼命名法。
    * 
    */
    /**
    * 把一个字符串转成骆驼命名法。。
    * 如 'font-size' 转成 'fontSize'。
    * @param {String} string 要进行转换的字符串。
    * @return 返回一个骆驼命名法的新字符串。
    * @example
        $.String.toCamelCase('background-item-color') //结果为 'backgroundItemColor'
    */
    toCamelCase: function (string) {
        var rmsPrefix = /^-ms-/;
        var rdashAlpha = /-([a-z]|[0-9])/ig;

        return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, function (all, letter) {
            return letter.toString().toUpperCase();
        });

        /* 下面的是 mootool 的实现
        return string.replace(/-\D/g, function(match)
        {
            return match.charAt(1).toUpperCase();
        });
        */
    },

    /**
    * 把一个字符串转成短线连接法。
    * 如 fontSize 转成 font-size
    * @param {String} string 要进行转换的字符串。
    * @return 返回一个用短线连接起来的新字符串。
    * @example
        $.String.toHyphenate('backgroundItemColor') //结果为 'background-item-color'
    */
    toHyphenate: function (string) {
        return string.replace(/[A-Z]/g, function (match) {
            return ('-' + match.charAt(0).toLowerCase());
        });
    },

    /**
    * 把一个字符串转成 UTF8 编码。
    * @param {String} string 要进行编码的字符串。
    * @return {String} 返回一个 UTF8 编码的新字符串。
    * @example
        $.String.toUtf8('你好'); //结果为 ''
    */
    toUtf8: function (string) {
        var encodes = [];

        Haf.Array.each(string.split(''), function (ch, index) {
            var code = ch.charCodeAt(0);
            if (code < 0x80) {
                encodes.push(code);
            }
            else if (code < 0x800) {
                encodes.push(((code & 0x7C0) >> 6) | 0xC0);
                encodes.push((code & 0x3F) | 0x80);
            }
            else {
                encodes.push(((code & 0xF000) >> 12) | 0xE0);
                encodes.push(((code & 0x0FC0) >> 6) | 0x80);
                encodes.push(((code & 0x3F)) | 0x80);
            }
        });

        return '%' + Haf.Array.map(encodes, function (item, index) {
            return item.toString(16);
        }).join('%');
    },

    /**
    * 把一个字符串转成等价的值。
    * 主要是把字符串形式的 0|1|true|false|null|undefined|NaN 转成原来的数据值。
    * 当参数不是字符串或不是上述值之一时，则直接返回该参数，不作转换。
    * @param {Object} value 要进行转换的值，可以是任何类型。
    * @return {Object} 返回一个等价的值。
    * @example
        $.String.toValue('NaN') //NaN
        $.String.toValue('null') //null
        $.String.toValue('true') //true
        $.String.toValue({}) //不作转换，直接原样返回
    */
    toValue: function (value) {
        if (typeof value != 'string') //拦截非字符串类型的参数
        {
            return value;
        }


        var maps =
        {
            '0': 0,
            '1': 1,
            'true': true,
            'false': false,
            'null': null,
            'undefined': undefined,
            'NaN': NaN
        };

        return value in maps ? maps[value] : value;

    }


});//--------------------------------------------------------------------------------------





//---------------分裂和提取部分 -----------------------------------------------------
Haf.extend(Haf.String, /**@lends Haf.String */
{

    /**
    * 对一个字符串进行多层次分裂，返回一个多维数组。
    * @param {String} string 要进行分裂的字符串。
    * @param {Array} separators 分隔符列表数组。
    * @return {Array} 返回一个多维数组，该数组的维数，跟指定的分隔符 separators 的长度一致。
    * @example
        var string = 'a=1&b=2|a=100&b=200;a=111&b=222|a=10000&b=20000';
        var separators = [';', '|', '&', '='];
        var a = $.String.split(string, separators);
        //结果 a 为
        a = 
        [                           // ';' 分裂的结果
            [                       // '|'分裂的结果
                [                   // '&'分裂的结果
                    ['a', '1'],     // '='分裂的结果
                    ['b', '2']
                ],
                [
                    ['a', '100'],
                    ['b', '200']
                ]
            ],
            [
                [
                    ['a', '111'],
                    ['b', '222']
                ],
                [
                    ['a', '10000'],
                    ['b', '20000']
                ]
            ]
        ];
    * 
    */
    split: function (string, separators) {
        var list = String(string).split(separators[0]);

        for (var i = 1, len = separators.length; i < len; i++) {
            list = fn(list, separators[i], i);
        }

        return list;


        //一个内部方法
        function fn(list, separator, dimension) {
            dimension--;

            return Haf.Array.map(list, function (item, index) {
                return dimension == 0 ?

                    String(item).split(separator) :

                    fn(item, separator, dimension); //递归
            });
        }


    },


    /**
    * 用滑动窗口的方式创建分组，返回一个子串的数组。
    * @param {string|number} string 要进行分组的字符串。会调用 String(string) 转成字符串。
    * @param {number} windowSize 滑动窗口的大小。
    * @param {number} [stepSize=1] 滑动步长。默认为1。
    * @return {Array} 返回一个经过滑动窗口方式得到的子串数组。
    * @example
    *   $.String.slide('012345678', 4, 3); //滑动窗口大小为4，滑动步长为3
        //得到 [ '0123', '3456', '678' ] //最后一组不足一组
    */
    slide: function (string, windowSize, stepSize) {
        var chars = String(string).split(''); //按字符切成单个字符的数组

        return Haf.Array(chars).slide(windowSize, stepSize).map(function (group, index) {
            return group.join('');
        }).valueOf();

    },

    /**
    * 对一个字符串进行分段，返回一个分段后的子串数组。
    * @param {string|number} string 要进行分段的字符串。会调用 String(string) 转成字符串。
    * @param {number} size 分段的大小。
    * @return {Array} 返回一个分段后的子串数组。
    * @example
    *   $.String.segment('0123456789', 3); //进行分段，每段大小为3
        //得到 [ '012', '345', '678', '9' ] //最后一组不足一组
    */
    segment: function (string, size) {
        return Haf.String.slide(string, size, size);
    }


});//--------------------------------------------------------------------------------------



})(Haf, Haf.String);

//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法

; (function (This) {


This.prototype = /**@inner*/
{
    constructor: This,
    value: '',


    init: function (string) {
        this.value = String(string);

    },


    toString: function () {
        return this.value;
    },

    valueOf: function () {
        return this.value;
    },


    format: function (arg1, arg2) {
        this.value = This.format(this.value, arg1, arg2);
        return this;
    },

    replaceAll: function (src, dest) {
        this.value = This.replaceAll(this.value, src, dest);
        return this;
    },


    replaceBetween: function (startTag, endTag, newString) {
        this.value = This.replaceBetween(this.value, startTag, endTag, newString);
        return this;
    },


    removeAll: function (src) {
        this.value = This.replaceAll(this.value, src, '');
        return this;
    },

    random: function (size) {
        this.value = This.random(size);
        return this;
    },


    trim: function () {
        this.value = This.trim(this.value);
        return this;
    },


    trimStart: function () {
        this.value = This.trimStart(this.value);
        return this;
    },


    trimEnd: function () {
        this.value = This.trimEnd(this.value);
        return this;
    },


    split: function (separators) {
        return This.split(this.value, separators);
    },


    startsWith: function (dest, ignoreCase) {
        return This.startsWith(this.value, dest, ignoreCase);
    },


    endsWith: function (dest, ignoreCase) {
        return This.endsWith(this.value, dest, ignoreCase);
    },


    contains: function (target, useOr) {
        return This.contains(this.value, target, useOr);
    },


    padLeft: function (totalWidth, paddingChar) {
        this.value = This.padLeft(this.value, totalWidth, paddingChar);
        return this;
    },


    padRight: function (totalWidth, paddingChar) {
        this.value = This.padRight(this.value, totalWidth, paddingChar);
        return this;
    },


    toCamelCase: function () {
        this.value = This.toCamelCase(this.value);
        return this;
    },


    toHyphenate: function () {
        this.value = This.toHyphenate(this.value);
        return this;
    },


    between: function (tag0, tag1) {
        this.value = This.between(this.value, tag0, tag1);
        return this;
    },


    toUtf8: function () {
        this.value = This.toUtf8(this.value);
        return this;
    },


    toValue: function (value) {
        return This.toValue(this.value);
    },

    slide: function (windowSize, stepSize) {
        return This.slide(this.value, windowSize, stepSize);
    },

    segment: function (size) {
        return This.segment(this.value, size, size);
    }
};

This.prototype.init.prototype = This.prototype;

})(Haf.String);

/**
* Boolean 工具类
* @class
* @param {Object} b 要进行进换的值，可以是任何类型。
* @return {Haf.Boolean} 返回一个 Haf.Boolean 的实例。
*/
Haf.Boolean = function (b) {
    return new Haf.Boolean.prototype.init(b);
};



; (function ($, This) {



$.extend(This, /**@lends Haf.Boolean */
{
    /**
    * 解析指定的参数为 bool 值。
    * null、undefined、0、NaN、false、'' 及其相应的字符串形式会转成 false；
    * 其它的转成 true
    * @param {Object} arg 要进行进换的值，可以是任何类型。
    * @return {boolean} 返回一个 bool 值。
    * @example
        $.Boolean.parse(null); //false;
        $.Boolean.parse('null'); //false;
        $.Boolean.parse(undefined); //false;
        $.Boolean.parse('undefined'); //false;
        $.Boolean.parse(0); //false;
        $.Boolean.parse('0'); //false;
        $.Boolean.parse(NaN); //false;
        $.Boolean.parse('NaN'); //false;
        $.Boolean.parse(false); //false;
        $.Boolean.parse('false'); //false;
        $.Boolean.parse(''); //false;
        $.Boolean.parse(true); //true;
        $.Boolean.parse({}); //true;
    */
    parse: function (arg) {
        if (!arg) // null、undefined、0、NaN、false、''
        {
            return false;
        }

        if (typeof arg == 'string' || arg instanceof String) {
            var reg = /^(false|null|undefined|0|NaN)$/g;

            return !reg.test(arg);
        }


        return true;
    },

    /**
    * 解析指定的参数为 int 值：0 或 1。
    * null、undefined、0、NaN、false、'' 及其相应的字符串形式会转成 0；
    * 其它的转成 1
    * @param {Object} 要进行转换的值，可以是任何类型。
    * @return {int} 返回一个整型值 0 或 1。
    * @example
        $.Boolean.toInt(null); //0;
        $.Boolean.toInt('null'); //0;
        $.Boolean.toInt(undefined); //0;
        $.Boolean.toInt('undefined'); //0;
        $.Boolean.toInt(0); //0;
        $.Boolean.toInt('0'); //0;
        $.Boolean.toInt(NaN); //0;
        $.Boolean.toInt('NaN'); //0;
        $.Boolean.toInt(false); //0;
        $.Boolean.toInt('false'); //0;
        $.Boolean.toInt(''); //0;
        $.Boolean.toInt(true); //1;
        $.Boolean.toInt({}); //1;
    */
    toInt: function (arg) {
        return This.parse(arg) ? 1 : 0;
    },

    /**
    * 反转一个 boolean 值，即 true 变成 false；false 变成 true。
    * @param {Object} 要进行反转的值，可以是任何类型。
    * @return {int} 返回一个 bool 值。
    * @example
        $.Boolean.reverse(null); //true;
        $.Boolean.reverse('null'); //true;
        $.Boolean.reverse(undefined); //true;
        $.Boolean.reverse('undefined'); //true;
        $.Boolean.reverse(0); //true;
        $.Boolean.reverse('0'); //true;
        $.Boolean.reverse(NaN); //true;
        $.Boolean.reverse('NaN'); //true;
        $.Boolean.reverse(false); //true;
        $.Boolean.reverse('false'); //true;
        $.Boolean.reverse(''); //true;
        $.Boolean.reverse(true); //false;
        $.Boolean.reverse({}); //false;
    */
    reverse: function (arg) {
        return !This.parse(arg);
    },

    /**
    * 产生一个随机布尔值。
    * @return {boolean} 返回一个随机的 true 或 false。
    * @example
        $.Boolean.random();
    */
    random: function () {
        return !!Math.floor(Math.random() * 2); //产生随机数 0 或 1
    }
});

})(Haf, Haf.Boolean);



//----------------------------------------------------------------------------------------------------------------
//Haf.Boolean 包装类的实例方法

; (function (This) {


This.prototype = /**@inner*/
{
    constructor: This,
    value: false,


    init: function (b) {
        this.value = This.parse(b);
    },


    valueOf: function () {
        return this.value;
    },


    toString: function () {
        return this.value.toString();
    },


    toInt: function () {
        return this.value ? 1 : 0;
    },


    reverse: function () {
        this.value = !this.value;
        return this;
    },

    random: function () {
        this.value = This.random();
        return;
    }
};


This.prototype.init.prototype = This.prototype;

})(Haf.Boolean);

/**
* 日期时间工具
* @class
*/
Haf.Date = function (date) {
    return new Haf.Date.prototype.init(date);
};

; (function ($, This) {



/**
* 把指定的时间或当前时间转成一定格式的字符串。
* @param {Date} [datetime=new Date()] 要进行转换的日期时间。<br />
    如果不指定，则默认为当前时间。
* @param {string} formater 格式化字符串。详见 format 方法的说明。
* @return {string} 返回一个格式化后的日期时间字符串。
* @example
    //返回当前时间的格式字符串，类似 '2013-04-29 09:21:59 上午'
    $.Date.toString('yyyy-MM-dd HH:mm:ss TT'); 

    //返回当前时间的格式字符串，类似 '2013年4月29日 9:21:59 星期一'
    $.Date.toString(new Date(), 'yyyy年M月d日 h:m:s dddd')
*/
This.toString = function (datetime, formater) {
    if (typeof datetime == 'string') //此时为 toString(formater)
    {
        formater = datetime;
        datetime = new Date();
    }

    return This.format(datetime, formater);

};//这里不要弄到下面的 extend 中，因为它使用的是 for in，而在 IE6/IE8 中，是枚举不到重写的内置成员的


$.extend(This, /**@lends Haf.Date */
{
    /**
    * 获取当前系统时间。
    * @return 返回当前系统时间实例。
    * @example
        $.Date.now();
    */
    now: function () {
        return new Date();
    },

    /**
    * 把参数 value 解析成等价的日期时间实例。
    * 当无法解析时，会抛出异常。
    * @param {Date|string} value 要进行解析的参数，可接受的类型为：<br />
    *   1.Date 实例<br />
    *   2.string 字符串，包括调用 Date 实例的 toString 方法得到的字符串，也包括以下格式: 
        <pre>
            yyyy-MM-dd
            yyyy.MM.dd
            yyyy/MM/dd
            yyyy_MM_dd
                
            HH:mm:ss
                
            yyyy-MM-dd HH:mm:ss
            yyyy.MM.dd HH:mm:ss
            yyyy/MM/dd HH:mm:ss
            yyyy_MM_dd HH:mm:ss
        </pre>
    * @return 返回一个日期时间的实例。
    * @example
        $.Date.parse('2013-04-29 09:31:20');
    */
    parse: function (value) {
        if (value instanceof Date) {
            if (isNaN(value.getTime())) {
                throw new Error('参数是非法的日期实例');
            }

            return value;
        }

        if (typeof value != 'string') {
            throw new Error('不支持该类型的参数：' + typeof value);
        }


        //标准方式
        var date = new Date(value);
        if (!isNaN(date.getTime())) {
            return date;
        }

        /*
            自定义方式：
                yyyy-MM-dd
                yyyy.MM.dd
                yyyy/MM/dd
                yyyy_MM_dd
                
                HH:mm:ss
                
                yyyy-MM-dd HH:mm:ss
                yyyy.MM.dd HH:mm:ss
                yyyy/MM/dd HH:mm:ss
                yyyy_MM_dd HH:mm:ss
                
        */

        function GetDate(s) {
            var now = new Date();

            var separator =
                s.indexOf('.') > 0 ? '.' :
                s.indexOf('-') > 0 ? '-' :
                s.indexOf('/') > 0 ? '/' :
                s.indexOf('_') > 0 ? '_' : null;

            if (!separator) {
                throw new Error('无法识别的日期格式：' + s);
            }

            var ps = s.split(separator);

            return {
                yyyy: ps[0],
                MM: ps[1] || 0,
                dd: ps[2] || 1
            };
        }

        function GetTime(s) {
            var separator = s.indexOf(':') > 0 ? ':' : null;
            if (!separator) {
                throw new Error('无法识别的时间格式0：' + s);
            }

            var ps = s.split(separator);

            return {
                HH: ps[0] || 0,
                mm: ps[1] || 0,
                ss: ps[2] || 0
            };
        }


        var parts = value.split(' ');
        if (!parts[0]) {
            throw new Error('无法识别的格式1：' + value);
        }

        var date = parts[0].indexOf(':') > 0 ? null : parts[0];
        var time = parts[0].indexOf(':') > 0 ? parts[0] : (parts[1] || null);

        if (date || time) {
            if (date && time) {
                var d = GetDate(date);
                var t = GetTime(time);
                return new Date(d.yyyy, d.MM - 1, d.dd, t.HH, t.mm, t.ss);
            }

            if (date) {
                var d = GetDate(date);
                return new Date(d.yyyy, d.MM - 1, d.dd);
            }

            if (time) {
                var now = new Date();
                var t = GetTime(time);
                return new Date(now.getFullYear(), now.getMonth(), now.getDate(), t.HH, t.mm, t.ss);
            }
        }

        throw new Error('无法识别的格式2：' + value);



    },

    /**
    * 把日期时间格式化指定格式的字符串。
    * @param {Date} datetime 要进行格式化的日期时间。
    * @param {string} formater 格式化的字符串。<br />
        其中保留的占位符有：
    <pre>
        'yyyy': 4位数年份
        'yy': 2位数年份
        'MM': 2位数的月份(01-12)
        'M': 1位数的月份(1-12)
        'dddd': '星期日|一|二|三|四|五|六'
        'dd': 2位数的日份(01-31)
        'd': 1位数的日份(1-31)
        'HH': 24小时制的2位数小时数(00-23)
        'H': 24小时制的1位数小时数(0-23)
        'hh': 12小时制的2位数小时数(00-12)
        'h': 12小时制的1位数小时数(0-12)
        'mm': 2位数的分钟数(00-59)
        'm': 1位数的分钟数(0-59)
        'ss': 2位数的秒钟数(00-59)
        's': 1位数的秒数(0-59)
        'tt': 上午：'AM'；下午: 'PM'
        't': 上午：'A'；下午: 'P'
        'TT': 上午： '上午'； 下午: '下午'
        'T': 上午： '上'； 下午: '下'
    </pre>
    * @return {string} 返回一个格式化的字符串。
    * @example
        //返回当前时间的格式字符串，类似 '2013年4月29日 9:21:59 星期一'
        $.Date.format(new Date(), 'yyyy年M月d日 h:m:s dddd')
    */
    format: function (datetime, formater) {
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        var hour = datetime.getHours();
        var minute = datetime.getMinutes();
        var second = datetime.getSeconds();

        var padLeft = function (value, length) {
            return Haf.String.padLeft(value, length, '0');
        };


        var isAM = hour <= 12;

        var map =
        {
            'yyyy': padLeft(year, 4),
            'yy': String(year).substr(-2),
            'MM': padLeft(month, 2),
            'M': month,
            'dddd': '星期' + ('日一二三四五六'.charAt(datetime.getDay())),
            'dd': padLeft(date, 2),
            'd': date,
            'HH': padLeft(hour, 2),
            'H': hour,
            'hh': padLeft(isAM ? hour : hour - 12, 2),
            'h': isAM ? hour : hour - 12,
            'mm': padLeft(minute, 2),
            'm': minute,
            'ss': padLeft(second, 2),
            's': second,
            'tt': isAM ? 'AM' : 'PM',
            't': isAM ? 'A' : 'P',
            'TT': isAM ? '上午' : '下午',
            'T': isAM ? '上' : '下'
        };

        var s = formater;

        for (var key in map) {
            s = Haf.String.replaceAll(s, key, map[key]);
        }

        return s;

    },

    /**
    * 将指定的年份数加到指定的 Date 实例上。
    * @param {Date} [datetime=new Date()] 要进行操作的日期时间，如果不指定则默认为当前时间。
    * @param {Number} value 要增加/减少的年份数。可以为正数，也可以为负数。
    * @return {Date} 返回一个新的日期实例。<br />
        此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
    * @example
        $.Date.addYear(new Date(), 5); //假如当前时间是2013年，则返回的日期实例的年份为2018
        $.Date.addYear(-5);//假如当前时间是2013年，则返回的日期实例的年份为2008
    */
    addYears: function (datetime, value) {
        //重载 addYear( value )
        if (!(datetime instanceof Date)) {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }


        var dt = new Date(datetime); //新建一个副本，避免修改参数
        dt.setFullYear(datetime.getFullYear() + value);

        return dt;
    },

    /**
    * 将指定的月份数加到指定的 Date 实例上。
    * @param {Date} [datetime=new Date()] 要进行操作的日期时间，如果不指定则默认为当前时间。
    * @param {Number} value 要增加/减少的月份数。可以为正数，也可以为负数。
    * @return {Date} 返回一个新的日期实例。<br />
        此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
    * @example
        $.Date.addMonths(new Date(), 15); //给当前时间加上15个月
    */
    addMonths: function (datetime, value) {
        //重载 addMonths( value )
        if (!(datetime instanceof Date)) {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date(datetime);//新建一个副本，避免修改参数
        dt.setMonth(datetime.getMonth() + value);

        return dt;
    },

    /**
    * 将指定的天数加到指定的 Date 实例上。
    * @param {Date} datetime 要进行操作的日期时间，如果不指定则默认为当前时间。
    * @param {Number} value 要增加/减少的天数。可以为正数，也可以为负数。
    * @return {Date} 返回一个新的日期实例。。<br />
        此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
    * @example
        $.Date.addDays(new Date(), 35); //给当前时间加上35天
    */
    addDays: function (datetime, value) {
        //重载 addDays( value )
        if (!(datetime instanceof Date)) {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date(datetime);//新建一个副本，避免修改参数
        dt.setDate(datetime.getDate() + value);

        return dt;
    },

    /**
    * 将指定的小时数加到指定的 Date 实例上。
    * @param {Date} datetime 要进行操作的日期时间，如果不指定则默认为当前时间。
    * @param {Number} value 要增加/减少的小时数。可以为正数，也可以为负数。
    * @return {Date} 返回一个新的日期实例。<br />
        此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
    * @example
        $.Date.addHours(new Date(), 35); //给当前时间加上35小时
    */
    addHours: function (datetime, value) {
        //重载 addHours( value )
        if (!(datetime instanceof Date)) {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date(datetime);//新建一个副本，避免修改参数
        dt.setHours(datetime.getHours() + value);

        return dt;
    },

    /**
    * 将指定的分钟数加到指定的 Date 实例上。
    * @param {Date} datetime 要进行操作的日期时间，如果不指定则默认为当前时间。
    * @param {Number} value 要增加/减少的分钟数。可以为正数，也可以为负数。
    * @return {Date} 返回一个新的日期实例。<br />
        此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
    * @example
        $.Date.addMinutes(new Date(), 90); //给当前时间加上90分钟
    */
    addMinutes: function (datetime, value) {
        //重载 addMinutes( value )
        if (!(datetime instanceof Date)) {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date(datetime);//新建一个副本，避免修改参数
        dt.setMinutes(datetime.getMinutes() + value);

        return dt;
    },

    /**
    * 将指定的秒数加到指定的 Date 实例上。
    * @param {Date} datetime 要进行操作的日期时间，如果不指定则默认为当前时间。
    * @param {Number} value 要增加/减少的秒数。可以为正数，也可以为负数。
    * @return {Date} 返回一个新的日期实例。<br />
        此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
    * @example
        $.Date.addSeconds(new Date(), 90); //给当前时间加上90秒
    */
    addSeconds: function (datetime, value) {
        //重载 addSeconds( value )
        if (!(datetime instanceof Date)) {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date(datetime);//新建一个副本，避免修改参数
        dt.setSeconds(datetime.getSeconds() + value);

        return dt;
    },



    /**
    * 将指定的毫秒数加到指定的 Date 实例上。
    * @param {Date} datetime 要进行操作的日期时间，如果不指定则默认为当前时间。
    * @param {Number} value 要增加/减少的毫秒数。可以为正数，也可以为负数。
    * @return {Date} 返回一个新的日期实例。<br />
        此方法不更改参数 datetime 的值。而是返回一个新的 Date，其值是此运算的结果。
    * @example
        $.Date.addMilliseconds(new Date(), 2000); //给当前时间加上2000毫秒
    */
    addMilliseconds: function (datetime, value) {
        //重载 addMilliseconds( value )
        if (!(datetime instanceof Date)) {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date(datetime);//新建一个副本，避免修改参数
        dt.setMilliseconds(datetime.getMilliseconds() + value);

        return dt;
    }

});


})(Haf, Haf.Date);



;(function(This){


This.prototype = /**@inner*/
{
    constructor: This,
    value: new Date(),


    init: function (date) {
        // 注意 Date(xxx)只返回一个 string，而不是一个 Date 实例。
        this.value = date === undefined ?
            new Date() :                    //未指定参数，则使用当前日期时间
            This.parse(date);   //把参数解析成日期时间
    },


    valueOf: function () {
        return this.value;
    },


    toString: function (formater) {
        return This.format(this.value, formater);
    },


    format: function (formater) {
        return This.format(this.value, formater);
    },


    addYears: function (value) {
        this.value = This.addYears(this.value, value);
        return this;
    },

    addMonths: function (value) {
        this.value = This.addMonths(this.value, value);
        return this;
    },

    addDays: function (value) {
        this.value = This.addDays(this.value, value);
        return this;
    },

    addHours: function (value) {
        this.value = This.addHours(this.value, value);
        return this;
    },

    addMinutes: function (value) {
        this.value = This.addMinutes(this.value, value);
        return this;
    },

    addSeconds: function (value) {
        this.value = This.addSeconds(this.value, value);
        return this;
    },

    addMilliseconds: function (value) {
        this.value = This.addMilliseconds(this.value, value);
        return this;
    }

};

This.prototype.init.prototype = This.prototype;

})(Haf.Date);

/**
* 数学工具类
* @namespace
*/
Haf.Math = {


    /**
    * 产生指定闭区间的随机整数。
    * @param {number} [minValue=0] 闭区间的左端值。
        当只指定一个参数时，minValue 默认为 0；
    * @param {number} [maxValue] 闭区间的右端值。
    * @return 返回一个整数。<br />
        当不指定任何参数时，则用 Math.random() 产生一个已移除了小数点的随机整数。
    * @example
        $.Math.randomInt(100, 200); //产生一个区间为 [100, 200] 的随机整数。
        $.Math.randomInt(100); //产生一个区间为 [0, 200] 的随机整数。
        $.Math.randomInt(); //产生一个随机整数。
    */
    randomInt: function(minValue, maxValue)
    {
        if(minValue === undefined && maxValue === undefined) // 此时为  Math.randomInt()
        {
            //先称除小数点，再去掉所有前导的 0，最后转为 number
            return Number(String(Math.random()).replace('.', '').replace(/^0*/g, ''));
        }
        else if(maxValue === undefined)
        {
            maxValue = minValue;    //此时相当于 Math.randomInt(minValue)
            minValue = 0;
        }
        
        var count = maxValue - minValue + 1;
        return Math.floor(Math.random() * count + minValue);
    },
    
    /**
    * 圆形求模方法。
    * 即用圆形链表的方式滑动一个数，返回一个新的数。
    * 即可正可负的双方向求模。
    * 可指定圆形链表的长度(size) 和滑动的步长(step)，滑动步长的正负号指示了滑动方向
    */
    slide: function(index, size, step)
    {
        step = step || 1; //步长默认为1
        
        index += step;
        if(index >= 0)
        {
            return index % size;
        }
        
        return (size - (Math.abs(index) % size)) % size;
    },
    
    /**
    * 下一个求模数
    */
    next: function(index, size)
    {
        return Haf.Math.slide(index, size, 1);
    },
    
    /**
    * 上一个求模数
    */
    previous: function(index, size, step)
    {
        return Haf.Math.slide(index, size, -1);
    },
    
    /**
    * 把一个字符串解析成十进制的整型
    */
    parseInt: function(string)
    {
        return parseInt(string, 10);
    },

    /**
    * 把一个含有百分号的字符串解析成等值的小数。
    * @param {string} v 要解析的参数。
        期望得到 string 类型，实际可传任何类型。
    * @return {Number} 返回一个小数。
        只有参数是字符串，并且去掉前后空格后以百分号结尾才会进行转换；否则直接返回参数。
        如果解析失败，则返回 NaN。
    */
    parsePercent: function (v) {

        if (typeof v == 'string' && Haf.String(v).trim().endsWith('%')) {
            return parseInt(v) / 100;
        }

        return v;
    }
};


/**
* 提供创建类的工厂方法
* @namespace
*/
Haf.Class =
{
    /**
    * 用工厂模式创建一个类。
    * @param {Object} instances 类中的实例成员，即 prototype 的中成员。
    * @param {function} [instances.constructor] 构造函数，要创建的类的真正的构造函数；
        如果不提供，则使用一个默认的空函数实现。
    * @param {Object} [statics] 类中的静态成员。
        如果想给类提供一些静态成员，则可指定此参数。
    * @return {function} 返回一个类的构造器。
    * @example
        var Person = $.Class.create( //实例成员
        {
            //构造函数
            constructor: function(name, age)
            {
                this.name = name;
                this.age = age;
                this.type = Person.getType();
            },
            
            sayHi: function()
            {
                console.log(' hi, my type is ' + this.type );
                console.log(' and my name is ' + this.name );
                console.log(' and I am ' + this.age + ' years old');
            }
        }, //静态成员
        {
            getType: function()
            {
                return 'Person';
            }
        });
        
        var man = new Person('micty', 29);
        man.sayHi();
        console.log( Person.getType() );
    */
    create: function (instances, statics) {
        var prototype = instances;

        //如果未提供构造函数，则使用一个默认的实现
        prototype.constructor = prototype.constructor || function () { };
        prototype.constructor.prototype = prototype;

        Haf.extend(prototype.constructor, statics); //静态成员

        return prototype.constructor;
    },

    /**
    * 用继续一个类的方式去创建一个新的类。
    * @param {function} SuperClass 要继续的超类，即父类。
    * @param {Object} instances 类中的实例成员，即 prototype 的中成员。
    * @param {function} [instances.constructor] 构造函数，要创建的类的真正的构造函数；
        如果不提供，则使用一个默认的空函数实现。
    * @param {Object} [statics] 类中的静态成员。
        如果想给类提供一些静态成员，则可指定此参数。
    * @return {function} 返回一个类的构造器。
    * @example
        var Person = $.Class.create( //实例成员
        {
            //构造函数
            constructor: function(name, age)
            {
                this.name = name;
                this.age = age;
                this.type = Person.getType();
            },
            
            sayHi: function()
            {
                console.log(' hi, my type is ' + this.type );
                console.log(' and my name is ' + this.name );
                console.log(' and I am ' + this.age + ' years old');
            }
        }, //静态成员
        {
            getType: function()
            {
                return 'Person';
            }
        });
        
        var Student = $.Class.inherit(Person, 
        {
            constructor: function(name, age, school)
            {
                Person.call(this, name, age);
                this.school = school;
                this.type = Student.getType();
            },
            
            sayHi: function()
            {
                Person.prototype.sayHi.call(this);
                console.log(' and I am at ' + this.school + ' school' );
            }
        },
        {
            getType: function()
            {
                return 'Student';
            }
        });
        
        var pp = new Person('abc', 31);
        pp.sayHi();
        console.log(Person.getType());
        
        var st = new Student('micty', 29, 'SZU');
        st.sayHi();
        console.log( Student.getType() );
        console.log( st instanceof Student );   //true
        console.log( st instanceof Person );    //true
        console.log( st instanceof Object );    //true
        
    */
    inherit: function (SuperClass, instances, statics) {
        instances = Haf.extend(new SuperClass(), instances);
        statics = Haf.extend({}, SuperClass, statics);

        return Haf.Class.create(instances, statics);
    }

};





/**
* 映射器工具类。
* 实现任意类型的两个变量的关联。
* @class
* @param
* @example
    var mapper = new $.Mapper();
*/
Haf.Mapper = (function ($) {


    //这里要保持跟 core/Meta.js 中的一致，是为了优化。
    //从分层来说，不应该依赖上层。
    var guidKey = '__guid__'; 


    /**
    * 构造函数
    * @inner
    */
    function Mapper(key, value) {


        //分配本实例对应的容器
        this.all = {

            'guid': {},     //针对有 guid 属性的对象作特殊存取，以求一步定位。

            'false': {},    //针对 false|null|undefined|''|0|NaN

            'string': {},
            'number': {},
            'boolean': {}, //只针对 true

            'object': {},
            'function': {},

            'undefined': {} //这个用不到
        };


        if (arguments.length > 0) { //这里不要判断 key，因为 key 可以为任何值。
            this.set(key, value);
        }
    }


    function getString(obj) {

        if (!obj) // false|null|undefined|''|0|NaN
        {
            return String(obj);
        }

        if (obj instanceof Date || 
            obj instanceof Array //||
            //obj instanceof RegExp ||
            //obj instanceof String ||
            //obj instanceof Number ||
            //obj instanceof Boolean
            ) {

            return $.Object.getType(obj); //返回相应构造器的名称，不要用　toString，因为可能会变
        }

        return obj.toString(); // obj.toString() 必须返回一个 string，而且是每次调用都返回相同的值。

    }



    $.Object.extend(Mapper.prototype, /**@lends Haf.Mapper.prototype */
    {
        /**
        * 设置一对映射关系。
        * @param src 映射关系的键，可以是任何类型。
        * @param target 映射关系要关联的值，可是任何类型。
        * @return 返回第二个参数 target。
        * @example
            var obj = { a: 1, b: 2 };
            var fn = function(a, b)
            {
                console.log(a+b);
            };
            var mapper = new $.Mapper();
            mapper.set(obj, fn);
            mapper.set('a', 100);
            mapper.set(100, 'abc');
            mapper.set('100', 'ABC');
            mapper.set(null, 'abc');
            
        */
        set: function (src, target) {

            var all = this.all;

            if (!src) // false|null|undefined|''|0|NaN
            {
                all['false'][String(src)] = target;
                return target;
            }

            var type = typeof src;

            if (type == 'object' && guidKey in src) { //针对含有 guid 属性的对象作优先处理
                var guid = src[guidKey];
                all['guid'][guid] = target; //一步定位
                return;
            }




            switch (type) {
                case 'string':
                case 'number':
                case 'boolean':
                    all[type][String(src)] = target;
                    break;

                case 'object':
                case 'function':
                    var key = getString(src); //这里确保 key 一定是一个 string
                    var list = all[type][key];
                    if (list) //已存在对应字符串的列表
                    {
                        var pair = $.Array.findItem(list, function (pair, index) {
                            return pair[0] === src;
                        });

                        if (pair) //已存在，
                        {
                            pair[1] = target; //改写值
                        }
                        else //未找到，创建新的，添加进去一对二元组 [src, target]
                        {
                            list.push([src, target]);
                        }
                    }
                    else //未存在，则创建并添加
                    {
                        list = [[src, target]];
                    }

                    all[type][key] = list; //回写
            }

            return target;
        },

        /**
        * 批量设置映射关系。
        * @param {Array} list 映射关系的列表，是一个二维数组，每个数组项为[src, target] 的格式。
        * @example
            var mapper = new $.Mapper();
            mapper.setBatch(
            [
                ['a', 100],
                ['b', 200]
                ['c', false]
            ]);
        */
        setBatch: function (list) {
            var self = this;

            $.Array.each(list, function (item, index) {
                self.set(item[0], item[1]);
            });
        },

        /**
        * 获取一对映射关系所关联的值。<br />
        * 注意：根据映射关系的键查找所关联的值时，对键使用的是全等比较，即区分数据类型。
        * @param src 映射关系的键，可以是任何类型。
        * @return 返回映射关系所关联的值。
        * @example
            var obj = { a: 1, b: 2 };
            var fn = function(a, b)
            {
                console.log(a+b);
            };
            
            var mapper = new $.Mapper();
            mapper.set(obj, fn);
            
            var myFn = mapper.get(obj); //获取到之前关联的 fn
            myFn(100, 200);
        */
        get: function (src) {

            var all = this.all;

            // false|null|undefined|''|0|NaN
            if (!src) {
                return all['false'][String(src)];
            }


            var type = typeof src;

            if (type == 'object' && guidKey in src) { //针对含有 guid 属性的对象作优先处理
                var guid = src[guidKey];
                return all['guid'][guid]; //一步定位
            }



            switch (type) {
                //值类型的，直接映射
                case 'string':
                case 'number':
                case 'boolean':
                    return all[type][String(src)];


                //引用类型的，通过 key 映射到一个二维数组，每个二维数组项为 [src, target]
                case 'object':
                case 'function':
                    var key = getString(src);
                    var list = all[type][key];
                    if (list) //已存在对应字符串的列表
                    {
                        var pair = $.Array.findItem(list, function (pair, index) {
                            return pair[0] === src;
                        });

                        if (pair) {
                            return pair[1];
                        }
                    }
            }

            return undefined;
        },


        /**
        * 根据给定的键移除一对映射关系。
        * 注意：根据映射关系的键查找所关联的值时，对键使用的是全等比较，即区分数据类型。
        * @param src 映射关系的键，可以是任何类型。
        * @example
            var obj = { a: 1, b: 2 };
            var fn = function(a, b)
            {
                console.log(a+b);
            };
            
            var mapper = new $.Mapper();
            mapper.set(obj, fn);
            
            mapper.remove(obj);
            fn = mapper.get(obj);
            console.log( typeof fn); // undefined
        */
        remove: function (src) {

            var all = this.all;

            // false|null|undefined|''|0|NaN
            if (!src) {
                delete all['false'][String(src)];
                return;
            }

            var type = typeof src;

            if (type == 'object' && guidKey in src) { //针对含有 guid 属性的对象作优先处理
                var guid = src[guidKey];
                delete all['guid'][guid]; //一步定位
                return;
            }



            switch (type) {
                //值类型的，直接映射
                case 'string':
                case 'number':
                case 'boolean':
                    delete all[type][String(src)];
                    break;

                //引用类型的，通过 key 映射到一个二维数组，每个二维数组项为 [src, target]
                case 'object':
                case 'function':
                    var key = getString(src);
                    var list = all[type][key];
                    if (list) //已存在对应字符串的列表
                    {
                        //移除 src 的项
                        all[type][key] = $.Array.grep(list, function (pair, index) {
                            return pair[0] !== src;
                        });
                    }
            }
        },


        /**
        * 销毁本实例。
        * 这会移除所有的映射关系，并且移除本实例内部使用的存放映射关系的容器对象。
        */
        dispose: function () {

            var all = this.all;
            for (var key in all) {
                delete all[key];
            }

            delete this['all'];
        }

    });



    //Haf.Mapper = 
    return Mapper;



})(Haf);





/**
* 全局唯一标识符工具类（GUID: Globally Unique Identifier）。
* 提供全局 ID 生成和管理的方法，可用于给组件创建 ID。
* @namespace
*/
Haf.Guid = (function ($) {

    var counters = {};  //分组计数器，从 1 开始
    var guids = {};     //用于 id 的注册，以判断某个 id 在全局内是否已存在

    /**
    * 获取指定分组的下一个计数器。
    * 如果尚未存在该分组，则从 1 开始计数。
    * @param {string} [groupName] 分组的名称。 如果不指定，则默认为空字符串。
    * @return {int} 返回一个整数。
    * @example 
        $.Guid.next('group1'); //1
        $.Guid.next('group2'); //1
        $.Guid.next('group2'); //2
        $.Guid.next('group1'); //2
    */
    function next(groupName) {

        var id = counters[groupName] || 0;
        id = id + 1;
        counters[groupName] = id;

        return id;
    }

    /**
    * 获取指定分组的并且按指定字符串格式化的 id 值。
    * 如果尚未存在该分组，则从 1 开始计数。
    * @param {string} groupName 分组的名称。 
    * @param {string} formater 要填充的格式化字符串。
    * @return {string} 返回格式化后的 id 字符串。
    * @example 
        $.Guid.get('group1', 'label_{0}_{1}'); // 'label_1_2'
        $.Guid.get('group1', 'label_{0}_{1}'); // 'label_3_4'
        $.Guid.get('group2', 'button_{0}_{1}'); // 'button_1_2'
        $.Guid.get('group2', 'button_{0}_{0}'); // 'button_3_3'
    */
    function get(groupName, formater) {

        formater = formater || '{0}';
        var reg = /\{\d+\}/g;
        var items = formater.match(reg); //把所有的 {0}、{1} 等提取出来

        var ids = $.Array.map(items, function (item, index) {
            return next(groupName);
        });

        var id = $.String.format(formater, ids);
        add(id);

        return id;
    }


    /**
    * 把指定的 id 值添加(注册)到 guid 列表中，以表示该 id 已被占用。
    * @param {string} id 字符串的 ID 值。
    * @example 
        $.Guid.add('myId');
    */
    function add(id) {
        guids[id] = true;
    }

    /**
    * 把指定的 id 值从 guid 列表中移除，以表示该 id 已被释放。
    * @param {string} id 字符串的 ID 值。
    * @example 
        $.Guid.remove('myId');
    */
    function remove(id) {
        delete guids[id];
    }

    /**
    * 判断指定的 id 值已给占用。
    * @param {string} id 字符串的 ID 值。
    * @example 
        $.Guid.exist('myId');
    */
    function exist(id) {
        return !!guids[id];
    }

    /**@exports as Haf.Guid */
    return {
        next: next,
        get: get,
        add: add,
        remove: remove,
        exist: exist
    };

})(Haf);



/**
* 事件工具类
* @class
* @param {Object} obj 要进行绑定事件的目标对象。
* @return {Haf.Event} 返回一个 Haf.Event 的实例。
*/
Haf.Event = (function( $ )
{

var expando = $.expando;
var mapper = new $.Mapper();
var anonymousName = 'anonymous_' + $.String.random();


/**@inner*/
function Event(obj)
{
    return new $.Event.prototype.init(obj);
}


//for test
//Event.mapper = mapper;

    

//Haf.Event 指向这里
return Haf.extend( Event,
{ 
    /**
    * 给指定的对象绑定事件处理函数。
    * @param {Object} obj 要进行绑定事件的目标对象。
    * @param {string} eventName 要绑定的事件名称。
    * @param {function} handler 事件处理函数，函数内部的 this 指向参数 obj 对象。
    * @param {boolean} [isOnce=false] 指示是否只执行一次事件处理函数，
        如果指定为 true，则执行事件处理函数后会将该处理函数从事件列表中移除。
    */
    bind: function(obj, eventName, handler, isOnce)
    {
        var all = mapper.get(obj); //获取 obj 所关联的全部事件的容器 {}
        if (!all) {
            all = {};
            mapper.set(obj, all);
        }

        switch (typeof eventName) {

            case 'string':  //标准的，单个绑定
                bindItem(eventName, handler);
                break;

            case 'object':  //此时类似为 bind(obj, {click: fn, myEvent: fn}, isOnce)
                //if (!$.Object.isPlain(eventName)) {
                //    throw new Error('当别参数 eventName 为 object 类型时，必须为纯对象');
                //}

                isOnce = handler; //参数位置修正
                $.Object.each(eventName, function (key, value) {
                    bindItem(key, value);   //批量绑定
                });
                break;

            case 'function': //此时为 bind(obj, handler, isOnce)
                //参数位置修正
                isOnce = handler;
                handler = eventName;
                eventName = anonymousName; //匿名事件，则为总事件
                bindItem(eventName, handler);
                break;

            default:
                throw new Error('无法识别参数 eventName 的类型');
                break;
                
        }

        //一个内部的共用函数
        function bindItem(eventName, handler) {
            var list = all[eventName] || [];

            list.push({
                handler: handler,
                isOnce: isOnce
            });

            all[eventName] = list;
        }

    },

    /**
    * 给指定的对象绑定一个一次性的事件处理函数。
    * @param {Object} obj 要进行绑定事件的目标对象。
    * @param {string} eventName 要绑定的事件名称。
    * @param {function} handler 事件处理函数，函数内部的 this 指向参数 obj 对象。
    */
    once: function (obj, eventName, handler) {

        switch (typeof eventName) {

            case 'string':  //标准的，单个绑定
                $.Event.bind(obj, eventName, handler, true);
                break;

            case 'function'://此时为 once(obj, handler)
            case 'object':  //此时类似为 once(obj, {click: fn, myEvent: fn})
                $.Event.bind(obj, eventName,true);
        }
    },
    
    /**
    * 给指定的对象解除绑定事件处理函数。
    * @param {Object} obj 要进行解除绑定事件的目标对象。
    * @param {string} [eventName] 要解除绑定的事件名称。
        如果不指定，则移除所有的事件。
    * @param {function} [handler] 要解除绑定事件处理函数。
        如果不指定，则移除 eventName 所关联的所有事件。
    */
    unbind: function(obj, eventName, handler)
    {
        var all = mapper.get(obj); //获取 obj 所关联的全部事件的容器 {}
        if (!all) { //尚未存在对象 obj 所关联的事件列表
            return;
        }

        if (typeof eventName == 'function') { //匿名事件，此时为 unbind(obj, handler)
            handler = eventName;
            eventName = anonymousName;
        }

        //未指定事件名，则移除所有的事件
        if (!eventName) {
            mapper.remove(obj);
            return;
        }

        var list = all[eventName];
        if (!list) { //尚未存在该事件名所对应的事件列表
            return;
        }

        //未指定事件处理函数，则移除该事件名的所有事件处理函数
        if (!handler) {
            all[eventName] = [];
            return;
        }

        //移除 handler 的项
        all[eventName] = $.Array.grep(list, function (item, index) {

            return item.handler !== handler;
        });
    },

    /**
    * 触发指定的对象上的特定类型事件。
    * @param {Object} obj 要触发事件的目标对象。
    * @param {string} eventName 要触发的事件名称。
    * @param {Array} [args] 要向事件处理函数传递的参数数组。
    * @return 返回最一后一个事件处理函数的返回值。
    */
    trigger: function (obj, eventName, args) {

        var all = mapper.get(obj); // all = {...}
        if (!all) {
            return;
        }

        var isAnonymous = false;

        //注意， 因为 args 是可选的，不要判断 eventName 是否为数组
        //或者这样判断也行：eventName === undefined || $.Object.isArray(eventName)
        if (typeof eventName != 'string') { //此时为 trigger(obj, args);
            args = eventName;
            eventName = anonymousName;
            isAnonymous = true;
        }

        var list = all[eventName]; //取得回调列表
        if (!list) {
            return;
        }

        args = args || [];
        var value;

        //依次执行回调列表中的函数，并且移除那些只需要执行一次的
        all[eventName] = $.Array.map(list, function (item, index) {
            value = item.handler.apply(obj, args); //让 handler 内的 this 指向 obj
            return item.isOnce ? null : item;
        });

        //非匿名事件，则触发总事件。
        if (!isAnonymous) {
            list = all[anonymousName]; //取得回调列表
            if (list) {
                all[anonymousName] = $.Array.map(list, function (item, index) {
                    item.handler.apply(obj, args); //这里的返回值不要
                    return item.isOnce ? null : item;
                });
            }
        }

        return value;
    },

    /**
    * 检测指定的对象上是否包含特定类型的事件。
    * @param {Object} obj 要检测的目标对象。
    * @param {string} [eventName] 要检测的事件名称。
        当不指定时，则判断是否包含了任意类型的事件。
    * @return 如果目标对象上包含指否类型的事件，则返回 true；否则返回 false。
    */
    has: function (obj, eventName) {

        var all = mapper.get(obj); // all = {...}
        if (!all) {   //尚未绑定任何类型的事件
            return false;
        }

        if (!eventName) {   //未指定事件名，则判断是否包含了任意类型的事件
            if ($.Object.isEmpty(all)) { // 空对象 {}
                return false;
            }

            var hasEvent = false;

            $.Object.each(all, function (eventName, list) {
                if (list && list.length > 0) {
                    hasEvent = true;
                    return false; // break, 只有在回调函数中明确返回 false 才停止循环。
                }
            });

            return hasEvent;
        }


        //指定了事件名
        var list = all[eventName]; //取得回调列表
        if (!list || list.length == 0) {
            return false;
        }

        return true;

    }

    //for test
    //, __mapper__: mapper
    
});
    


})( Haf );







//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法


; (function (This) {


This.prototype = /**@inner*/
{
    constructor: This,
    value: {},

    init: function (obj) {
        this.value = obj;
    },


    valueOf: function () {
        return this.value;
    },

    on: function (eventName, handler, isOnce) {
        This.bind(this.value, eventName, handler, isOnce);
        return this;
    },

    off: function (eventName, handler) {
        This.unbind(this.value, eventName, handler);
        return this;
    },

    bind: function (eventName, handler, isOnce) {
        This.bind(this.value, eventName, handler, isOnce);
        return this;
    },

    unbind: function (eventName, handler) {
        This.unbind(this.value, eventName, handler);
        return this;
    },

    once: function (eventName, handler) {
        This.once(this.value, eventName, handler);
        return this;
    },

    trigger: function (eventName, args) {
        return This.trigger(this.value, eventName, args);
    },

    has: function (eventName) {
        return This.has(this.value, eventName);
    }


};


This.prototype.init.prototype = This.prototype;

})(Haf.Event);

/**
* XMLHttpRequest 类工具
* @namespace
*/
Haf.XHR = 
{
    /**
    * 跨浏览器创建一个 XMLHttpRequest 对象。
    * 由于内存原因，不建议重用创建出来的 xhr 对象。
    */
    create: function()
    {
        //下面使用了惰性载入函数的技巧，即在第一次调用时检测了浏览器的能力并重写了接口
        var fn = window.XMLHttpRequest ? function() //标准方法
        {
            return new XMLHttpRequest();
            
        }: window.ActiveXObject ? function() //IE
        {
            var cache = arguments.callee;
            var key = 'version';
            
            if(!cache[key]) //首次创建
            {
                var versions = 
                [
                    'MSXML2.XMLHttp.6.0',
                    'MSXML2.XMLHttp.3.0',
                    'MSXML2.XMLHttp'
                ];
                
                for(var i=0, len=versions.length; i<len; i++)
                {
                    try
                    {
                        var xhr = new ActiveXObject(versions[i]);
                        cache[key] = versions[i];
                        return xhr;
                    }
                    catch(ex) //跳过
                    {
                    }
                }
            }
            
            return new ActiveXObject(cache[key]);
            
        }: function()
        {
            throw new Error('没有可用的 XHR 对象');
        };
        
        
        Haf.XHR.create = fn;
        
        return fn();
    }
        
};




//安全拷贝
var _Haf = global.Haf;

if (!_Haf) {
    _Haf = global.Haf = {};
}

for(var key in Haf) {
    
    //忽略这个成员
    if( key == 'expando' || key == 'extend' ) {
        continue;
    }

    //只拷贝不存在的成员
    if( !(key in _Haf) ) {
        _Haf[key] = Haf[key];
    }
}


})( this, this /*, undefined*/ ); 



if( typeof global == 'undefined' ){
    global = this;
}

//结束文件 utils.js
//<================================================================================================================


