//以下文件由 ant 合并生成于 2013-06-23 10:05:53


//开始 MiniQuery 大闭包 ----------------------------------------------------------------------------
;(function(window, document, location, undefined)
{







//先备份原来的 MiniQuery，以防止重写其他库使用的 MiniQuery
var _MiniQuery = window.MiniQuery;




/**
* @namespace
*/
function MiniQuery()
{
}



/**
* 定义一个针对 MiniQuery 的全局名称，可用作当前运行时确定的标识符。
*/
MiniQuery.expando = 'MiniQuery' + String(Math.random()).replace(/\D/g, '');

/**
* 用指定的值去扩展指定的目标对象，返回目标对象。<br />
* 注意：该方法使用 for in 来枚举 values，在 低版本的 IE 中是枚举不到重写的内置成员的，比如 toString。
* @param {Object} target 要进行扩展的目标对象。
* @param {Object} values 要进行拷贝的值集合。
* @return {Object} 返回扩展的目标对象，即第一个参数 target。
*/
MiniQuery.extend = function ( target, values )
{
    var len = arguments.length;
    if(len == 0)
    {
        return {};
    }
    
    var target = arguments[0];
    if(len == 1)
    {
        return target;
    }
    
    for(var i=1; i<len; i++)
    {
        var obj = arguments[i];
        
        for(var name in obj)
        {
            target[name] = obj[name];
        }
    }

    return target;
};




/**
* 以安全的方式给 MiniQuery 使用一个新的命名空间。
* 比如 MiniQuery.use('$')，则 window.$ 基本上等同于 window.MiniQuery；
* 当 window 中未存在指定的命名空间或参数中指定了要全量覆盖时，则使用全量覆盖的方式，
* 该方式会覆盖原来的命名空间，可能会造成成一些错误，不推荐使用；
* 当 window 中已存在指定的命名空间时，则只拷贝不冲突的部分到该命名空间，
* 该方式是最安全的方式，也是默认和推荐的方式。
*/
MiniQuery.use = function ( newNamespace, isOverried )
{
    if ( !window[newNamespace] || isOverried ) //未存在或明确指定了覆盖
    {
        window[newNamespace] = MiniQuery; //全量覆盖
    }
    else //已经存在，则拷贝部分成员
    {
        var obj = window[newNamespace];
   
        for ( var key in MiniQuery )
        {
            if ( !( key in obj ) ) //只拷贝不冲突的部分
            {
                obj[key] = MiniQuery[key];
            }
        }
    }
};





	




/**
* @fileOverview 对象工具
*/



/**
* 对象工具
* @class
* @param {Object} obj 要进行包装的对象
* @return {MiniQuery.Object} 返回一个经过包装后的 MiniQuery.Object 对象
* @example
    $.Object( {a:1, b:2} );
或  new $.Object( {a:1, b:2} );
*/  
MiniQuery.Object = function(obj)
{
    return new MiniQuery.Object.prototype.init(obj);
};



/**
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
    如果被拷贝的对象是一个数组，则直接拷贝其中的元素。<br />
* @example 
    var obj = {a: 1, b:2};
    var obj2 = $.Object.extend(obj, {b:3}, {c:4}, ['hello', 'world']);
结果：
    obj = {a:1, b:3, c:4, 0:'hello', 1:'world'}; 
    并且 obj === obj2 为 true
*/
MiniQuery.Object.extend = function()
{
    var len = arguments.length;
    if(len == 0)
    {
        return null;
    }
    
    var target = arguments[0];
    if(len == 1)
    {
        return target;
    }
    
    for(var i=1; i<len; i++)
    {
        var obj = arguments[i];
        
        //这里不要用 MiniQuery.Object.isArray(obj)，因为该接口还没定义
        if( obj instanceof Array || Object.prototype.toString.call(obj) == '[object Array]' ) //数组
        {
            for(var index=0, size=obj.length; index < size; index++)
            {
                target[index] = obj[index];
            }
        }
        else
        {
            for(var name in obj)
            {
                target[name] = obj[name];
            }
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
MiniQuery.Object.toString = function(nameValues, innerSeparator, pairSeparator)
{
    innerSeparator = innerSeparator || '=';
    pairSeparator = pairSeparator || '&';
    
    var pairs = [];
    for(var name in nameValues)
    {
        pairs.push(name + innerSeparator + nameValues[name]);
    }
    
    return pairs.join(pairSeparator);
    
};



MiniQuery.Object.extend( MiniQuery.Object, /**@lends MiniQuery.Object */
{   

/**
* 用一种安全的方式来扩展对象。
* 当目标对象不存在指定的成员时，才给该目标对象添加(扩展)该成员。
*/
extendSafely: function()
{
    var len = arguments.length;
    if(len == 0)
    {
        return null;
    }
    
    var target = arguments[0];
    if(len == 1)
    {
        return target;
    }
    
    for(var i=1; i<len; i++)
    {
        var obj = arguments[i];

        for(var key in obj)
        {
            if( key in target ) //目标对象中已含有该成员，略过
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
* 深度克隆一个对象。
* @param {Object} obj 要进行克隆的对象
* @return {Object} 克隆后的对象
* @example
    var obj = {a: 1, b: 2, c: {a: 10, b: 20} };
    var obj2 = $.Object.clone( obj );
    console.dir( obj2 );          //与 obj 一致
    console.log( obj2 === obj );  //false
*/
clone: function(obj)
{
    if(obj === null || obj === undefined)
    {
        return obj;
    }
    
    //处理值类型，直接返回相应的包装类
    var type = typeof obj;
    
    var Wrappers = 
    {
        'string': String,
        'number': Number,
        'boolean': Boolean
    };
    
    if(Wrappers[type])
    {
        return new Wrappers[type](obj);
    }
    
    
    var target = {};
    
    for(var name in obj)
    {
        var value = obj[name];
        
        switch(typeof value)
        {
            case 'string':
            case 'number':
            case 'boolean':
            case 'function':
                target[name] = value;
                break;
            case 'object':
                target[name] = arguments.callee(value);   //递归调用
                break;
            default:
                target[name] = undefined;
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
each: function(obj, fn, isDeep)
{       
    var each = arguments.callee;
    
    for(var key in obj)
    {
        var value = obj[key];
        
        if(isDeep === true && value && typeof value == 'object') //指定了深迭代，并且当前 value 为非 null 的对象
        {
            each(value, fn, isDeep); //递归
        }
        else
        {
            if( fn(key, value) === false ) // 只有在 fn 中明确返回 false 才停止循环
            {
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
getType: function(obj)
{
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
isArray: function(obj, useStrict)
{
    if(useStrict === true) //指定了要严格判断
    {
        return obj instanceof Array;
    }
    
    //高端浏览器，如 IE9+、Firefox 4+、Safari 5+、Opera 10.5+ 和 Chrome
    if( typeof Array.isArray == 'function' ) //优先使用原生的
    {
        return Array.isArray(obj);
    }
    
    //加上 obj instanceof Array 并且优先检测，是为了优化，也是为了安全起见。
    return (obj instanceof Array) || 
        (MiniQuery.Object.getType(obj) == 'Array');
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
isBuiltinType: function(obj)
{
    var types = [String, Number, Boolean, Array, Date, RegExp, Function];
    
    for(var i=0, len=types.length; i<len; i++)
    {
        if(obj instanceof types[i])
        {
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
isEmpty: function(obj)
{
    for (var name in obj) 
    {
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
isPlain: function(obj)
{
    if(!obj || typeof obj != 'object' || obj.nodeType || MiniQuery.Object.isWindow(obj))
    {
        return false;
    }
    
    try 
    {
	    // Not own constructor property must be Object
	    if (obj.constructor && 
	        !Object.prototype.hasOwnProperty.call(obj, "constructor") && 
	        !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) 
		{
		    return false;
	    }
    } 
    catch ( e ) 
    {
	    // IE8,9 Will throw exceptions on certain host objects #9897
	    return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    var key;
    for ( key in obj ) 
    {
    }

    return key === undefined || Object.prototype.hasOwnProperty.call(obj, key);
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
isValueType: function(obj)
{
    return (/^(string|number|boolean)$/g).test(typeof obj);
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
isWindow: function(obj)
{
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
isDocument: function(obj)
{
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
isWrappedType: function(obj)
{
    var types = [String, Number, Boolean];
    for(var i=0, len=types.length; i<len; i++)
    {
        if(obj instanceof types[i])
        {
            return true;
        }
    }
    
    return false;
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
map: function(obj, fn, isDeep)
{
    var map = arguments.callee; //引用自身，用于递归
    var target = {};
    
    for(var key in obj)
    {
        var value = obj[key];
        
        if(isDeep && value && typeof value == 'object') //指定了深迭代，并且当前 value 为非 null 的对象
        {
            target[key] = map(value, fn, isDeep); //递归
        }
        else
        {
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
namespace: function(arg0, arg1, arg2)
{
    //这个是最原始的方式：MiniQuery.Object.namespace(obj, 'A.B.C', {a:1, b:2});
    function fn(container, path, value)
    {
        var list = path.split('.'); //路径
        var obj = container;
        
        var len = list.length;      //路径长度
        var lastIndex = len - 1;    //路径中最后一项的索引
        
        for(var i=0; i<len; i++) //迭代路径
        {
            var key = list[i];
            
            if(i < lastIndex)
            {
                obj[key] = obj[key] || {};
                obj = obj[key]; //为下一轮做准备
            }
            else //最后一项
            {
                if(value === undefined) //不指定值时，则为空对象 {}
                {
                    value = {};
                }
                
                if( obj[key] ) //已经存在，则扩展
                {
                    MiniQuery.Object.extend( obj[key], value );
                    value = obj[key]; //引用一下，在最后的 return 时用到。
                }
                else //否则，全量赋值
                {
                    obj[key] = value;
                }
            }
        }
        
        return value;
    }
    
    //此时为最原始的
    //MiniQuery.Object.namespace(container, 'A.B.C', value );
    if(typeof arg1 == 'string')
    {
        var container = arg0;
        var path = arg1;
        var value = arg2;
        
        return fn(container, path, value);
    }
    
    //此时为
    //MiniQuery.Object.namespace('A.B.C', value)
    if(typeof arg0 == 'string')
    {
        var container = window;
        var path = arg0;
        var value = arg1;
        
        return fn(container, path, value);
    }
    

    /*
    此时为：
        MiniQuery.Object.namespace(source,
        {
            'Object': '$.Object',   //source.Object -> $.Object
            'Array': '$.Array'      //source.Array -> $.Array
        });
    要实现的功能：
        $.Object = source.Object;
        $.Array = source.Array;
    */
    if( MiniQuery.Object.isPlain(arg1) && arg2 === undefined )
    {
        //换个名称更容易理解
        var source = arg0;      //此时第一个参数为要被遍历拷贝的对象 source
        var maps = arg1;        //此时第二个参数为键值对映射表 maps
        var container = window; //此时目标容器为当前的 window
        
        //遍历映射表
        MiniQuery.Object.each(maps, function(key, path)
        {
            if(typeof path != 'string')
            {
                throw new Error('当指定第二个参数为键值对映射表时，值必须为 string 类型');
            }
            
            var value = source[key];
            fn( container, path, value );
        });
        
        return container;
    }
    
    //
    /*
    此时为： 
        MiniQuery.Object.namespace(container, source, ['Object', 'Array']);
    要实现的功能：
        container.Object = source.Object;
        container.Array = source.Array;    
    */
    if( MiniQuery.Object.isArray(arg2) )
    {
        //换个名称更容易理解
        var container = arg0;   //此时第一个参数为目标容器 container
        var source = arg1;      //此时第二个参数为要被遍历拷贝的对象 source
        var keys = arg2;        //此时第三个参数是要拷贝的键列表
        
        //遍历键列表
        MiniQuery.Array.each(keys, function(key)
        {
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
parseJson: function(data)
{
    if (typeof data !== "string" || !data) 
    {
	    return null;
    }
    
    data = MiniQuery.String.trim(data);
    
    if (window.JSON && window.JSON.parse) //标准方法
    {
	    return window.JSON.parse(data);
    }
     
    var rvalidchars = /^[\],:{}\s]*$/,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
    
    data = data.replace(rvalidescape, '@')
               .replace(rvalidtokens, ']' )
               .replace(rvalidbraces, '');
    
    if (!rvalidchars.test(data)) 
	{
	    throw new Error('非法的 JSON 数据: ' + data);
    }
    
    return (new Function('return ' + data ))();
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
parseQueryString: function(url, isShallow, isCompatible)
{
    if(!url || typeof url != 'string')
    {
        return {}; //这里不要返回 null，免得外部调用出错
    }
    
    var fn = arguments.callee;
    var decode = isCompatible ? unescape : decodeURIComponent;  //解码方法，默认用后者
    var isDeep = !isShallow;    //深层次解析，为了语义上更好理解，换个名称
    var toValue = MiniQuery.String.toValue; //缓存一下方法，以提高循环中的性能
    
    
    var obj = {};
    
    var pairs = url.split('&');
    
    for(var i=0, len=pairs.length; i<len; i++)
    {
        var name_value = pairs[i].split('=');
        
        if(name_value.length > 1)
        {
            var name = decode( name_value[0] );
            var value = decode( name_value[1] );
            
            //深层次解析
            if(isDeep && value.indexOf('=') > 0) //还出现=号，说明还需要进一层次解码
            {
                value = fn( value ); //递归调用
            }
            else //处理一下字符串类型的 0|1|true|false|null|undefined|NaN
            {
                value = toValue( value ); //还原常用的数据类型
            }
            
            
            obj[name] = value;
        }
    }
    
    return obj;
},


/**
* 删除对象中指定的成员，返回一个新对象。
* 指定的成员可以以单个的方式指定，也可以以数组的方式指定(批量)。
* @param {Object} obj 要进行处理的对象
* @param {String|Array} 要删除的成员名称，可以是单个，也可以是批量
* @return {Object} 返回一个被删除相应成员后的新对象
*/
remove: function(obj, keys)
{
    var target = MiniQuery.Object.extend({}, obj); //浅拷贝一份
    
    if( typeof keys == 'string' )
    {
        delete target[keys];
    }
    else
    {
        for(var i=0, len=keys.length; i<len; i++)
        {
            delete target[ keys[i] ];
        }
    }
    
    return target;
},


/**
* 用一组指定的名称-值对中的值去替换指定名称对应的值。
* 当指定第三个参数为 true 时，将进行第一层次的搜索与替换，否则替换所有同名的成员为指定的值
*/
replaceValues: function(target, nameValues, isShallow)
{
    for(var key in target)
    {
        var val = target[key];
        switch(typeof val)
        {
            case 'string':
            case 'number':
            case 'boolean':
                for(var name in nameValues)
                {
                    if(key == name)
                    {
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
toArray: function(obj, rule, isDeep)
{
    var toArray = arguments.callee; //引用自身，用于递归
    
    
    if( !rule ) //未指定 rule
    {
        var a = [];
        
        for(var key in obj)
        {
            var value = obj[key];
            if(isDeep === true && value && typeof value == 'object')
            {
                value = toArray(value, rule, isDeep);
            }
            a.push( value );
        }
        
        return a;
    }
    
    //否则，指定了 rule 转换规则。
    
    // 传进来的是一个 key 数组
    if( rule instanceof Array ) 
    {
        //注意，这里不要用 MiniQuery.Array.map 来过滤，
        //因为 map 会忽略掉 null 和 undefined 的值，这是不合适的
        
        var keys = rule; //换个名称更好理解
        var a = [];
        
        for(var i=0, len=keys.length; i<len; i++) //此时没有深迭代，因为 keys 只用于第一层
        {
            var value = obj[ keys[i] ]; //取得当前 key 所对应的 value
            a.push( value  ); // keys[i] -> key -> value
        }
        
        return a;
    }
    
    //指定了保留 key，则返回一个二维数组
    if(rule === true) 
    {
        var a = [];
        for(var key in obj)
        {
            var value = obj[key];
            if(isDeep === true && value && typeof value == 'object')
            {
                value = toArray(value, rule, isDeep);
            }
            a.push( [key, value] );
        }
        
        return a; //此时为 [ [key, value], [key, value], ... ]
    }
    
    //传进来的是处理函数
    if(typeof rule == 'function') 
    {
        var fn = rule;
        var a = [];
        
        for(var key in obj)
        {
            var value = obj[key];
            
            if(isDeep === true && value && typeof value == 'object')
            {
                value = toArray(value, rule, isDeep);
            }
            else
            {
                value = fn(key, value); //调用处理函数以取得返回值
            }
            
            if(value === null)
            {
                continue;
            }
            
            if(value === undefined)
            {
                break;
            }
            
            a.push( value );
        }
        
        return a;
    }
},

/**
* 把一个对象转成 JSON 字符串
* @param {Object} obj 要进行转换的对象
* @return {String} 返回一个 JSON 字符串
*/
toJSON: function(obj)
{
    if(obj == null) // null 或 undefined
    {
        return String(obj);
    }
    
    switch(typeof obj)
    {
        case 'string':
            return '"' + obj + '"';
        case 'number':
        case 'boolean':
            return obj;
        case 'function':
            return obj.toString();
    }
    
    //处理包装类和日期
    if(obj instanceof String || obj instanceof Number || obj instanceof Boolean || obj instanceof Date)
    {
        return arguments.callee(obj.valueOf());
    }
    
    //处理正则表达式
    if(obj instanceof RegExp)
    {
        return arguments.callee(obj.toString());
    }
    
    //处理数组
    if( MiniQuery.Object.isArray(obj) )
    {
        var list = [];
        for(var i=0, len=obj.length; i<len; i++)
        {
            list.push(arguments.callee(obj[i]));
        }
        
        return '[' + list.join(', ') + ']';
    }
    
    var pairs = [];
    for(var name in obj)
    {
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
toQueryString: function(obj, isCompatible)
{
    if(obj == null)     // null 或 undefined
    {
        return String(obj);
    }

    switch(typeof obj)
    {
        case 'string':
        case 'number':
        case 'boolean':
            return obj;
    }
    
    if(obj instanceof String || obj instanceof Number || obj instanceof Boolean || obj instanceof Date)
    {
        return obj.valueOf();
    }
    
    if( MiniQuery.Object.isArray(obj) )
    {
        return '[' + obj.join(', ') + ']';
    }
    
    var fn = arguments.callee;
    var encode = isCompatible ? escape : encodeURIComponent;
    
    var pairs = [];
    for(var name in obj)
    {
        pairs.push(  encode(name) + '=' + encode( fn(obj[name]) )  ); 
    }
    
    return pairs.join('&');
},



/**
* 删除对象的成员中值为 null 或 undefined 的成员。返回一个全新的对象。
* @param {Object} obj 要进行处理的对象
* @param {boolean} [isDeep=false] 指定是否深层次搜索，如果要深层次搜索，请指定 true；否则，请指定 false 或不指定
* @return {Object} 返回一个经过删除成员的新对象，该对象中不包含值为 null 或 undefined 的成员。
* @example
    var d = {A: 11, B: null, C: undefined};
    var obj = {a: 1, b: null, c: undefined, d: d};
    var obj2 = $.Object.trim(obj, true );
    
    console.dir(obj);   //结果没变
    console.dir(obj2);  //结果为 {a: 1, d: {AA: 11}}
    console.dir(d);     //结果没变
    console.log(obj.d === d); //true
*/
trim: function(obj, isDeep)
{
    var trim = arguments.callee; //引用自身，递归要用到
    
    var target = MiniQuery.Object.extend( {}, obj); //浅拷贝一份
    
    for(var key in target)
    {
        var value = target[key];
        if(value == null) //null 或 undefined
        {
            delete target[key]; //注意，这里不能用 delete value
            continue;
        }
        
        if(isDeep === true && typeof value == 'object')
        {
            value = MiniQuery.Object.extend( {}, value); //浅拷贝一份
            target[key] = trim(value, isDeep); //递归
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
create: function(obj)
{
    //下面使用了惰性载入函数的技巧，即在第一次调用时检测了浏览器的能力并重写了接口
    var fn = typeof Object.create === 'function' ? Object.create : function ( obj )
    {
        function F()
        {
        }

        F.prototype = obj;
        F.prototype.constructor = F;

        return new F();
    }

    MiniQuery.Object.create = fn;

    return fn( obj );
}


    
});






//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法

MiniQuery.Object.prototype = /**@inner*/
{
    constructor: MiniQuery.Object,
    value: {},
    
    
    init: function(obj)
    {
        this.value = Object(obj);
    },
    
    /**
    * 拆包装，获取 Object 对象。
    */
    valueOf: function()
    {
        return this.value;
    },
    
    
    clone: function()
    {
        return MiniQuery.Object.clone(this.value);
    },
    
    
    each: function(fn, isDeep)
    {
        MiniQuery.Object.each(this.value, fn, isDeep);
        return this;
    },
    
    
    extend: function()
    {
        //其实是想执行 MiniQuery.Object.extend(this.value, arguments[0], arguments[1], …);
        var args = [this.value];
        args = args.concat( Array.prototype.slice.call(arguments, 0) );
        this.value = MiniQuery.Object.extend.apply(null, args);
        return this;
    },
    
    
    getType: function()
    {
        return MiniQuery.Object.getType(this.value);
    },
    
    
    isArray: function(isStrict)
    {
        return MiniQuery.Object.isArray(this.value, isStrict);
    },
    
    
    isBuiltinType: function()
    {
        return MiniQuery.Object.isBuiltinType(this.value);
    },
    
    
    isEmpty: function()
    {
        return MiniQuery.Object.isEmpty(this.value);
    },
    
    
    isPlain: function()
    {
        return MiniQuery.Object.isPlain(this.value);
    },
    
    
    isValueType: function()
    {
        return MiniQuery.Object.isValueType(this.value);
    },
    
    
    isWindow: function()
    {
        return MiniQuery.Object.isWindow(this.value);
    },
    
    
    isWrappedType: function()
    {
        return MiniQuery.Object.isWrappedType(this.value);
    },
    
    
    map: function(fn, isDeep)
    {
        this.value = MiniQuery.Object.map(this.value, fn, isDeep);
        return this;
    },
    
    
    namespace: function(path, value)
    {
        this.value = MiniQuery.Object.namespace(this.value, path, value);
        return this;
    },
    
    
    parseJson: function(data)
    {
        this.value = MiniQuery.Object.parseJson(data);
        return this;
    },
    
    
    parseQueryString: function(url, isShallow, isCompatible)
    {
        this.value = MiniQuery.Object.parseQueryString(url, isShallow, isCompatible);
        return this;
    },
    
    
    remove: function(keys)
    {
        this.value = MiniQuery.Object.remove(this.value, keys);
        return this;
    },
    
    
    replaceValues: function(nameValues, isShallow)
    {
        this.value = MiniQuery.Object.replaceValues(this.value, nameValues, isShallow);
        return this;
    },
    
    
    toArray: function(rule, isDeep)
    {
        return MiniQuery.Object.toArray(this.value, rule, isDeep);
    },
    
     
    toJSON: function()
    {
        return MiniQuery.Object.toJSON(this.value);
    },
    
    
    toQueryString: function(isCompatible)
    {
        return MiniQuery.Object.toQueryString(this.value, isCompatible);
    },
    
    
    toString: function(innerSeparator, pairSeparator)
    {
        return MiniQuery.Object.toString(this.value, innerSeparator, pairSeparator);
    },
    
    
    trim: function(isDeep)
    {
        this.value = MiniQuery.Object.trim(this.value, isDeep);
        return this;
    }
    
    
};

MiniQuery.Object.prototype.init.prototype = MiniQuery.Object.prototype;

/**
* 数组工具
* @class
*/
MiniQuery.Array = function(array)
{
    return new MiniQuery.Array.prototype.init(array);
};


MiniQuery.extend( MiniQuery.Array,  /**@lends MiniQuery.Array*/
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
each: function(array, fn, isReversed)
{
    var len = array.length;
    
    if(isReversed === true) //使用反序。根据<<高性能 JavaScript>>的论述，这种循环性能可以比 else 中的提高 50% 以上
    {
        for(var i=len; i--; ) //这里只能用后减减，而不能用前减减，因为这里是测试条件，先测试，再减减
        {
            //如果用 callback.call(array[i], i)，
            //则在 callback 中的 this 就指参数中的 array[i]，但类型全部为 object
            if(fn(array[i], i) === false) // 只有在 fn 中明确返回 false 才停止循环
            {
               break;
            }
        }
    }
    else
    {
        for(var i=0; i<len; i++)
        {
            if(fn(array[i], i) === false)
            {
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
parse: function(obj, useForIn)
{
    //本身就是数组。
    //这里不要用 $.Object.isArray(obj)，因为跨页面得到的obj，即使 $.Object.getType(obj) 返回 'Array'，
    //但在 IE 下 obj instanceof Array 仍为 false，从而对 obj 调用数组实例的方法就会出错。
    //即使该方法确实存在于 obj 中，但 IE 仍会报“意外地调用了方法或属性访问”的错误。
    //
    if( obj instanceof Array ) 
    {
        return obj;
    }
    
    
    var a = [];
    
    if(useForIn === true) //没有 length 属性，或者不方便使用 length，则使用 for in
    {
        for(var name in obj)
        {
            if(name === 'length') //忽略掉 length 属性
            {
                continue;
            }
            
            a.push(obj[name]);
        }
        
        return a;
    }
    
    
    if(!obj || !obj.length) //参数非法
    {
        return [];
    }
    
    
    
    try //标准方法
    {
        a = Array.prototype.slice.call(obj, 0);
    }
    catch(ex)
    {
        for(var i=0, len=obj.length; i<len; i++)
        {
            a.push( obj[i] );
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
toObject: function(array, maps)
{
    //参数非法
    if(!array || !MiniQuery.Object.isArray(array) )
    {
        return null;
    }
    
    var obj = {};
    
    //未指定参数 maps
    if(maps === undefined) 
    {
        var len = array.length;
        obj.length = len;
        
        for(var i=0; i<len; i++)
        {
            obj[i] = array[i];
        }
        
        return obj;
    }
    
    // maps 是数组 [ key0, key1, … ]，即键的列表
    if( MiniQuery.Object.isArray(maps) ) 
    {
        var len = maps.length; //键的个数
        
        for(var i=0; i<len; i++)
        {
            var key = maps[i];
            var value = array[i];
            
            obj[key] = value;
        }
        
        obj.length = len;
        
        return obj;
    }
    
    
    // maps 是对象 { key0: 0, key1: 1, … }，即键跟索引的映射
    if( MiniQuery.Object.isPlain(maps) )
    {
        var len = 0;
        
        for(var key in maps)
        {
            obj[key] = array[ maps[key] ];
            len++; //计数
        }
        
        obj.length = len;
        
        return obj;
    }
    
    //maps 是一个处理函数
    if( typeof maps == 'function' )
    {
        var len = array.length;
        
        for(var i=0; i<len; i++)
        {
            var v = maps( array[i], i ); //调用处理函数以获得处理结果
            
            if( v instanceof Array ) //处理函数返回的是数组
            {
                var key = v[0];     //第0个元素作为键
                var value = v[1];   //第1个元素作为值
                
                obj[key] = value;   //建立键值的映射关系
            }
            else if( MiniQuery.Object.isPlain( v ) ) //返回的是一个对象
            {
                for(var key in v) //只处理第一个key，其他的忽略
                {
                    obj[key] = v[key]; //建立键值的映射关系
                    break;
                }
            }
            else
            {
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
map: function(array, fn)
{
    var a = [];
    
    for(var i=0, len=array.length; i<len; i++)
    {
        var value = fn(array[i], i);
        
        if(value === null)
        {
            continue;
        }
        
        if(value === undefined) //注意，当回调函数 fn 不返回值时，迭代会给停止掉
        {
            break;
        }
        
        a.push(value);
    }
    
    return a;
},

/**
* 使用过滤函数过滤数组元素，返回一个新数组。
* 此函数至少传递两个参数：待过滤数组和过滤函数。过滤函数必须返回 true 以保留元素或 false 以删除元素。
* 转换函数可以返回转换后的值：
*/
grep: function(array, fn)
{
    var a = [];
    
    for(var i=0, len=array.length; i<len; i++)
    {
        var item = array[i];
        
        if(fn(item, i) === true)
        {
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
indexOf: function(array, item)
{
    if(typeof array.indexOf == 'function') //内置方法
    {
        return array.indexOf(item);
    }
    
    for(var i=0, len=array.length; i<len; i++)
    {
        if(array[i] === item)
        {
            return i;
        }
    }
    
    return -1;  
},

/**
* 判断数组中是否包含特定的元素，返回 true 或 false。
*/
contains: function(array, item)
{
    return MiniQuery.Array.indexOf(array, item) > -1;
},


/**
* 从数组中删除特定的元素，返回一个新数组。
*/
remove: function(array, target)
{
    return MiniQuery.Array.map(array, function(item, index)
    {
        return target === item ? null : item;
    });
},

/**
* 从数组中删除特定索引位置的元素，返回一个新数组。
*/
removeAt: function(array, index)
{
    if(index < 0 || index >= array.length)
    {
        return array.slice(0);
    }
    
    return MiniQuery.Array.map(array, function(item, i)
    {
        return index === i ? null : item;
    });
},

/**
* 反转数组，返回一个新数组。
*/
reverse: function(array)
{
    var a = [];
    
    for(var i = array.length-1; i >= 0; i--)
    {
        a.push( array[i] );
    }
    
    return a;
},

/**
* 批量合并数组，返回一个新数组。
*/
merge: function()
{
    var a = [];
    
    for(var i=0, len=arguments.length; i<len; i++)
    {
        var arg = arguments[i];
        if(arg === undefined)
        {
            continue;
        }
        
        a = a.concat(arg);
    }
    
    return a;
},

/**
* 批量合并数组，并删除重复的项，返回一个新数组。
*/
mergeUnique: function()
{
    var list = [];
    
    var argsLen = arguments.length;
    var contains = MiniQuery.Array.contains; //缓存一下方法引用，以提高循环中的性能
    
    for(var index=0; index<argsLen; index++)
    {
        var arg = arguments[index];
        var len = arg.length;
        
        for(var i=0; i<len; i++)
        {
            if( !contains(list, arg[i]) )
            {
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
unique: function(a)
{
    return MiniQuery.Array.mergeUnique(a);
},

/**
* 给数组删除（如果已经有该项）或添加（如果还没有项）一项，返回一个新数组。
*/
toggle: function(array, item)
{
    if(MiniQuery.Array.contains(array, item))
    {
        return MiniQuery.Array.remove(array, item);
    }
    else
    {
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
find: function(array, fn, startIndex)
{
    return MiniQuery.Array.findIndex(array, fn, startIndex) > -1;
},


/**
* 查找符合条件的单个元素的索引，返回第一次找到的元素的索引值，否则返回 -1。
* 只有在回调函数中明确返回 true，才算找到。
*/
findIndex: function(array, fn, startIndex)
{
    startIndex = startIndex || 0;
    
    for(var i=startIndex, len=array.length; i<len; i++)
    {
        if(fn(array[i], i) === true) // 只有在 fn 中明确返回 true 才停止循环
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
findItem: function(array, fn, startIndex)
{
    startIndex = startIndex || 0;
    
    for(var i=startIndex, len=array.length; i<len; i++)
    {
        var item = array[i];
        if(fn(item, i) === true) // 只有在 fn 中明确返回 true 才算是找到
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
random: function(list)
{
    var array = list.slice(0);
            
    for(var i=0, len=array.length; i<len; i++)
    {
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
randomItem: function(array)
{
    var len = array.length;
    if(len < 1)
    {
        return undefined;
    }
    
    var index = MiniQuery.Math.randomInt(0, len - 1);
    return array[index];
    
},

/**
* 获取数组中指定索引位置的元素。
* 如果传入负数，则从后面开始算起。如果不传参数，则返回一份拷贝的新数组。
*/
get: function(array, index)
{
    var len = array.length;
    
    if(index >= 0   &&   index < len)   //在常规区间
    {
        return array[index];
    }
    
    var pos = index + len;
    if(index < 0   &&   pos >= 0)
    {
        return array[pos];
    }
    
    if(index == null)  // undefined 或 null
    {
        return array.slice(0);
    }
},

/**
* 删除数组中为 null 或 undefined 的项，返回一个新数组
*/
trim: function(array)
{
    return MiniQuery.Array.map(array, function(item, index)
    {
        return item == null ? null : item;  //删除 null 或 undefined 的项
    });
},

/**
* 创建分组，即把转成二维数组。返回一个二维数组。
* 当指定第三个参数为 true 时，可在最后一组向右对齐数据。
*/
group: function(array, size, isPadRight)
{
    var groups = MiniQuery.Array.slide(array, size, size);
    
    if(isPadRight === true)
    {
        groups[ groups.length - 1 ] = array.slice(-size); //右对齐最后一组
    }
    
    return groups;
},

/**
* 用滑动窗口的方式创建分组，即把转成二维数组。返回一个二维数组。
* 可以指定窗口大小和步长。步长默认为1。
*/
slide: function(array, windowSize, stepSize)
{
    if(windowSize >= array.length) //只够创建一组
    {
        return [array];
    }
    
    stepSize = stepSize || 1;
    
    var groups = [];
    
    for(var i=0, len=array.length; i<len; i=i+stepSize)
    {
        var end= i + windowSize;
        
        groups.push( array.slice(i, end) );
        
        if(end >= len)
        {
            break; //已达到最后一组
        }
    }
    
    return groups;
},

/**
* 用圆形的方式截取数组片段，返回一个新的数组。
* 即把数组看成一个首尾相接的圆圈，然后从指定位置开始截取指定长度的片段。
*/
circleSlice: function(array, startIndex, size)
{
    var a = array.slice(startIndex, startIndex + size);
    var b = [];
    
    var d = size - a.length;
    if(d > 0) //该片段未达到指定大小，继续从数组头部开始截取
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
circleSlide: function(array, windowSize, stepSize)
{
    if(array.length < windowSize)
    {
        return [array];
    }
    
    stepSize = stepSize || 1;
    
    var groups = [];
    var circleSlice = MiniQuery.Array.circleSlice; //缓存方法的引用，以提高循环中的性能
    
    for(var i=0, len=array.length; i<len; i=i+stepSize)
    {
        groups.push( circleSlice(array, i, windowSize) );
    }
    
    return groups;
},

/**
* 对一个数组的所有元素进行求和。
* 当指定第二个参数为 true 时，可以忽略掉 NaN 的元素。
* 当指定第三个参数时，将读取数组元素中的对应的成员，该使用方式主要用于由 json 组成的的数组中。
*/
sum: function(array, ignoreNaN, key)
{
    var sum = 0;
    
    var hasKey = !(key === undefined);
    
    for(var i=0, len=array.length; i<len; i++)
    {
        var value = hasKey ? array[i][key] : array[i];
        
        if( isNaN(value) )
        {
            if(ignoreNaN === true)
            {
                continue;
            }
            else
            {
                throw new Error('第 ' + i + ' 个元素的值为 NaN');
            }
        }
        else
        {
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
max: function(array, ignoreNaN, key)
{
    var max = 0;
    
    var hasKey = !(key === undefined);
    
    for(var i=0, len=array.length; i<len; i++)
    {
        var value = hasKey ? array[i][key] : array[i];
        
        if( isNaN(value) )
        {
            if(ignoreNaN === true)
            {
                continue;
            }
            else
            {
                throw new Error('第 ' + i + ' 个元素的值为 NaN');
            }
        }
        else
        {
            value = Number(value); //可以处理 string
            if(value > max)
            {
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
hasItem: function(array)
{
    return MiniQuery.Object.isArray(array) && 
        array.length > 0;
},

/**
* 给数组降维，返回一个新数组。
* 可以指定降维次数，当不指定次数，默认为 1 次。
*/
reduceDimension: function(array, count)
{
    count = count || 1;
    
    var a = array;
    var concat = Array.prototype.concat; //缓存一下方法引用，以提高循环中的性能
    
    for(var i=0; i<count; i++)
    {
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
descartes: function(arrayA, arrayB)
{
    var list = fn(arrayA, arrayB); //常规情况，两个数组
    
    for(var i=2, len=arguments.length; i<len; i++) //(如果有)多个数组，递归处理
    {
        list = fn(list, arguments[i], true);
    }
    
    return list;
    
    
    /*仅内部使用的一个方法*/
    function fn(A, B, reduced) 
    {
        var list = [];
        
        for(var i=0, len=A.length; i<len; i++)
        {
            for(var j=0, size=B.length; j<size; j++)
            {
                var item = [];
                
                if(reduced) //参数多于两个的情况，降维
                {
                    item = item.concat( A[i] ); //此时的 A[i] 为一个数组，如此相较于 item[0] = A[i] 可降维
                    item.push( B[j] ); //把 A[i] 的所有元素压入 item 后，再把 B[j] 作为一个元素压入item
                }
                else //下面组成一个有序的二元组
                {
                    item[0] = A[i];
                    item[1] = B[j]; //这里也相当于 item.push( B[j] )
                }
                
                list.push( item );
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
divideDescartes: function(array, sizes)
{
    var rows = array.length; // "局部数组"的长度，从整个数组开始
    
    var list = [];
    
    for(var i=0, len=sizes.length; i<len; i++) //sizes的长度，就是因子的个数
    {
        var size = sizes[i];    //当前因子的长度
        var step = rows/size;   //当前因子中的元素出现的步长(也是每个元素重复次数)
        
        var a = []; //分配一个数组来收集当前因子的 size 个元素
        
        for(var s=0; s<size; s++) //收集当前因子的 size 个元素
        {
            a.push( array[s*step][i] ); //因为因子中的每个元素重复出现的次数为 step，因此采样步长为 step
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
transpose: function(array)
{
    var A = array; //换个名称，代码更简洁，也更符合线性代数的表示
    
    var list = [];
    
    var rows = A.length;    //行数
    var cols = 1;           //列数，先假设为 1 列，在扫描行时，会更新成该行的最大值
    
    for(var c=0; c<cols; c++) //从列开始扫描
    {
        var a = [];
        
        for(var r=0; r<rows; r++) //再扫描行
        {
            if(A[r].length > cols) //当前行的列数比 cols 要大，更新 cols
            {
                cols = A[r].length;
            }
            
            a.push( A[r][c] );
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
intersection: function(arrayA, arrayB)
{
    var list = arrayA;
    
    for(var i=1, len=arguments.length; i<len; i++)
    {
        list = fn(list, arguments[i]);
    }
    
    return list;
    
    
    function fn(A, B)
    {
        var list = [];
        
        for(var i=0, len=A.length; i<len; i++)
        {
            var item = A[i];
            
            for(var j=0, size=B.length; j<size; j++)
            {
                if( item === B[j] )
                {
                    list.push(item);
                    break;
                }
            }
        }
        
        return MiniQuery.Array.unique(list);
    }
},

/**
* 判断两个数组是否相等。
* 只有同为数组并且长度一致时，才有可能相等。
* 如何定义两个元素相等，或者定义两个元素相等的标准，由参数 fn 指定。
* 当不指定 fn 时，由使用全等(严格相等)来判断
*/
isEqual: function(A, B, fn)
{
    //确保都是数组，并且长度一致
    if( !(A instanceof Array) || !(B instanceof Array) ||  A.length != B.length)
    {
        return false;
    }
    
    //如何定义两个元素相等，或者定义两个元素相等的标准，由参数 fn 指定。
    //当不指定时，由使用全等来判断(严格相等)
    fn = fn || function(x, y)
    {
        return x === y;
    };
    
    for(var i=0, len=A.length; i<len; i++)
    {
        if( !fn(A[i], B[i]) )//只要有一个不等，整个结果就是不等
        {
            return false;
        }
    }
    
    return true;
},

/**
* 判断第一个数组 A 是否包含于第二个数组 B，即 A 中所有的元素都可以在 B 中找到。
*/
isContained: function(A, B)
{
    return MiniQuery.Array.intersection(A, B).length == A.length;
},


/**
* 右对齐此数组，在左边用指定的项填充以达到指定的总长度，返回一个新数组。
* 当指定的总长度小实际长度时，将从右边开始算起，做截断处理，以达到指定的总长度。
*/
padLeft: function(array, totalLength, paddingItem)
{
    var delta = totalLength - array.length; //要填充的数目
    
    if(delta <= 0)
    {
        return array.slice(-delta); //-delta为正数
    }
    
    var a = [];
    for(var i=0; i<delta; i++)
    {
        a.push( paddingItem );
    }
    
    a = a.concat( array );
    
    return a;
},

/**
* 左对齐此数组，在右边用指定的项填充以达到指定的总长度，返回一个新数组。
* 当指定的总长度小实际长度时，将从左边开始算起，做截断处理，以达到指定的总长度。
*/
padRight: function(array, totalLength, paddingItem)
{
    var delta = totalLength - array.length;
    
    if(delta <= 0)
    {
        return array.slice(0, totalLength);
    }
    
    
    var a = array.slice(0); //克隆一份
    
    for(var i=0; i<delta; i++)
    {
        a.push( paddingItem );
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
pad: function(start, end, step)
{
    if(start == end)
    {
        return [];
    }
    
    step = Math.abs(step || 1);
    
    var a = [];
    
    if(start < end) //升序
    {
        for(var i=start; i<end; i+=step)
        {
            a.push(i);
        }
    }
    else //降序
    {
        for(var i=start; i>end; i-=step)
        {
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
aggregate: function(array, getKey, getValue)
{
    var isKey = typeof getKey == 'string';
    var changed = typeof getValue == 'function';
    
    var obj = {};
    
    for(var i=0, len=array.length; i<len; i++)
    {
        var item = array[i];
        var key = isKey ? item[getKey] : getKey(item, i);
        
        if( !obj[key] )
        {
            obj[key] = [];
        }
        
        var value = item;
        
        if( changed ) //指定了要变换值
        {
            value = getValue(item, i);
            
            if(value === null)
            {
                continue;
            }
            
            if(value === undefined)
            {
                break;
            }
        }
        
        obj[key].push( value );
    }
    
    return obj;
    
    
}



});




//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法

MiniQuery.Array.prototype = /**@inner*/
{
    constructor: MiniQuery.Array,
    value: [],
    
    
    init: function(array)
    {
        this.value = MiniQuery.Array.parse(array);
    },
    
    
    toString: function(separator)
    {
        separator = separator === undefined ? '' : separator;
        return this.value.join(separator);
    },
    
    valueOf: function()
    {
        return this.value;
    },
    
    
    each: function(fn, isReversed)
    {
        MiniQuery.Array.each(this.value, fn, isReversed);
        return this;
    },
    
    
    toObject: function(maps)
    {
        return MiniQuery.Array.toObject(this.value, maps);
    },
    
    
    map: function(fn)
    {
        this.value = MiniQuery.Array.map(this.value, fn);
        return this;
    },
    
    
    grep: function(fn)
    {
        this.value = MiniQuery.Array.grep(this.value, fn);
        return this;
    },
    
    
    indexOf: function(item)
    {
        return MiniQuery.Array.indexOf(this.value, item);
    },
    
    
    contains: function(item)
    {
        return MiniQuery.Array.contains(this.value, item);
    },
    
    
    remove: function(target)
    {
        this.value = MiniQuery.Array.remove(this.value, target);
        return this;
    },
    
    
    removeAt: function(index)
    {
        this.value = MiniQuery.Array.removeAt(this.value, index);
        return this;
    },
    
    
    reverse: function()
    {
        this.value = MiniQuery.Array.reverse(this.value);
        return this;
    },
    
    
    merge: function()
    {
        //其实是想执行 MiniQuery.Array.merge(this.value, arguments[0], arguments[1], …);
        var args = [this.value];
        args = args.concat( Array.prototype.slice.call(arguments, 0) );
        this.value = MiniQuery.Array.merge.apply(null, args);
        return this;
    },
    
    
    mergeUnique: function()
    {
        //其实是想执行 MiniQuery.Array.mergeUnique(this.value, arguments[0], arguments[1], …);
        var args = [this.value];
        args = args.concat( Array.prototype.slice.call(arguments, 0) );
        this.value = MiniQuery.Array.mergeUnique.apply(null, args);
        return this;
    },
    
    
    unique: function()
    {
        this.value = MiniQuery.Array.unique(this.value);
        return this;
    },
    
    
    toggle: function(item)
    {
        this.value = MiniQuery.Array.toggle(this.value, item);
        return this;
    },
    
    
    find: function(fn, startIndex)
    {
        return MiniQuery.Array.find(this.value, fn, startIndex);
    },
    
    
    findIndex: function(fn, startIndex)
    {
        return MiniQuery.Array.findIndex(this.value, fn, startIndex);
    },
    
    
    findItem: function(fn, startIndex)
    {
        return MiniQuery.Array.findItem(this.value, fn, startIndex);
    },
    
    
    random: function()
    {
        this.value = MiniQuery.Array.random(this.value);
        return this;
    },
    
    
    randomItem: function()
    {
        return MiniQuery.Array.randomItem(this.value);
    },
    
    
    get: function(index)
    {
        return MiniQuery.Array.get(this.value, index);
    },
    
    
    trim: function()
    {
        this.value = MiniQuery.Array.trim(this.value);
        return this;
    },
    
    
    group: function(size, isPadRight)
    {
        this.value = MiniQuery.Array.group( this.value, size, isPadRight );
        return this;
    },
    
    
    slide: function(windowSize, stepSize)
    {
        this.value = MiniQuery.Array.slide(this.value, windowSize, stepSize);
        return this;
    },
    
    
    circleSlice: function(startIndex, size)
    {
        this.value = MiniQuery.Array.circleSlice(this.value, startIndex, size);
        return this;
    },
    
    
    circleSlide: function(windowSize, stepSize)
    {
        this.value = MiniQuery.Array.circleSlide(this.value, windowSize, stepSize);
        return this;
    },
    
    
    sum: function(ignoreNaN, key)
    {
        return MiniQuery.Array.sum(this.value, ignoreNaN, key);
    },
    
    
    max: function(ignoreNaN, key)
    {
        return MiniQuery.Array.max(this.value, ignoreNaN, key);
    },
    
    
    hasItem: function()
    {
        return MiniQuery.Array.hasItem(this.value);
    },
    
    
    reduceDimension: function(count)
    {
        this.value = MiniQuery.Array.reduceDimension(this.value, count);
        return this;
    },
    
    //注意：
    //  $.Array(A).descartes(B, C) 并不等于
    //  $.Array(A).descartes(B).descartes(C) 中的结果
    
    descartes: function()
    {
        var args = MiniQuery.Array.parse(arguments); //转成数组
        args = [this.value].concat(args);
        
        this.value = MiniQuery.Array.descartes.apply(null, args );
        return this;
    },
    
    
    divideDescartes: function(sizes)
    {
        this.value = MiniQuery.Array.divideDescartes(this.value, sizes);
        return this;
    },
    
    
    transpose: function()
    {
        this.value = MiniQuery.Array.transpose(this.value);
        return this;
    },
    
    //注意：
    // $.Array(a).intersection(b, c) 等于
    // $.Array(a).intersection(b).intersection(c)
    
    intersection: function()
    {
        var args = MiniQuery.Array.parse(arguments); //转成数组
        args = [this.value].concat(args);
        
        this.value = MiniQuery.Array.intersection.apply(null, args);
        return this;
    },
    
    
    isEqual: function(array, fn)
    {
        return MiniQuery.Array.isEqual(this.value, array, fn);
    },
    
    
    isContained: function(B)
    {
        return MiniQuery.Array.isContained(this.value, B);
    },
    
    
    padLeft: function(totalLength, paddingItem)
    {
        this.value = MiniQuery.Array.padLeft( this.value, totalLength, paddingItem );
        return this;
    },
    
    
    padRight: function(totalLength, paddingItem)
    {
        this.value = MiniQuery.Array.padRight( this.value, totalLength, paddingItem );
        return this;
    },
    
    
    pad: function(start, end, step)
    {
        this.value = MiniQuery.Array.pad(start, end, step);
        return this;
    }
};

MiniQuery.Array.prototype.init.prototype = MiniQuery.Array.prototype;


/**
* 字符串工具类
* @class
*/
MiniQuery.String = function(string)
{
    if(arguments.length > 1) // 此时当作 $.String('{0}{1}..', arg1, arg2); 这样的调用
    {
        var args = Array.prototype.slice.call(arguments, 1);
        return MiniQuery.String.format(string, args);
    }
    
    return new MiniQuery.String.prototype.init(string);
};



MiniQuery.extend( MiniQuery.String, /**@lends MiniQuery.String */
{

/**
* 用指定的值去填充一个字符串。
* 当不指定字符串的填充标记时，则默认为 {}。
* @param {String} string 要进行格式填充的字符串模板。
* @param {Array} arg1 模板中所使用的标记。如果不指定，则默认为 "{" 和 "}"。
* @parma {Array|Object|Number} 要进行填充的值，可以是任何类型。
* @return 返回一个用值去填充后的字符串。
* @example
* 用法：
    $.String.format('<%0%><%1%>',     ['<%', '%>'], ['a', 'b']           ); //#1 
    $.String.format('<%id%><%type%>', ['<%', '%>'], {id: 1, type: 'app'} ); //#2 
    $.String.format('{0}{1}',         ['a',   'b']                       ); //#3 
    $.String.format('<%0%><%1%>',     ['<%', '%>'], 'a', 'b'             ); //#4 
    
    $.String.format('{id}{type}',     {id: 1, type: 'app'}               ); //#5 //常用的调用方式
    $.String.format('{2}{0}{1}',      'a', 'b', 'c'                      ); //#6 
*/
format: function(string, arg1, arg2)
{
    var fn = arguments.callee;

    if( MiniQuery.Array.hasItem(arg1) ) //#1 到 #4
    {
        if( MiniQuery.Array.hasItem(arg2) ) //#1
        {
            var tags = arg1;
            var list = arg2;
            
            var s = string;
            
            for(var i=0, len=list.length; i<len; i++)
            {
                var sample = tags[0] + '' + i + tags[1]; // <%i%> 或 {i}
                s = MiniQuery.String.replaceAll(s, sample, list[i]); // <%i%>  -->  list[i]
            }
            
            return s;
        }

        if(typeof arg2 == 'object')//#2
        {
            var tags = arg1;
            var nameValues = arg2;
            
            var s = string;
            for(var name in nameValues)
            {
                var sample = tags[0] + name + tags[1];
                s = MiniQuery.String.replaceAll(s, sample,  nameValues[name]);
            }
            
            return s;
        }
        
        if(arg2 === undefined) //#3
        {
            var tags = ['{', '}'];
            var list = arg1;
            return MiniQuery.String.format(string, tags, list);
        }
        
        //#4
        var args = Array.prototype.slice.call(arguments, 2);
        return fn(string, arg1, args);  //转到 #1
        
    } 
    else // #5 到 #6
    {
        if(typeof arg1 == 'object') //#5
        {
            return fn(string, ['{', '}'], arg1); //转到 #2
        }
        
        //#6
        var args = Array.prototype.slice.call(arguments, 1);
        return fn(string, ['{', '}'], args); //转到 #1
    }
    
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
replaceAll: function(target, src, dest)
{
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
replaceBetween: function(string, startTag, endTag, newString)
{
    var startIndex = string.indexOf( startTag );
    if ( startIndex < 0 )
    {
        return string;
    }

    var endIndex = string.indexOf( endTag );
    if ( endIndex < 0 )
    {
        return string;
    }
    
    var prefix = string.slice(0, startIndex);
    var suffix = string.slice(endIndex + endTag.length);
    
    return prefix + newString + suffix;
},


/**
* 移除指定的字符子串。
* @param {String} target 要进行替换的目标字符串。
* @param {String} src 要进行移除的子串。
* @return {String} 返回一个替换后的字符串。
* @example
    $.String.removeAll('hi js hi abc', 'hi') 
    //结果为 ' js  abc'
*/
removeAll: function(target, src)
{
    return MiniQuery.String.replaceAll(target, src, '');
},

/**
* 从当前 String 对象移除所有前导空白字符和尾部空白字符。
* @param {String} 要进行操作的字符串。
* @return {String} 返回一个新的字符串。
* @expample
    $.String.trim('  abc def mm  '); //结果为 'abc def mm'
*/
trim: function(string)
{
    return string.replace(/(^\s*)|(\s*$)/g, '');
},

/**
* 从当前 String 对象移除所有前导空白字符。
* @param {String} 要进行操作的字符串。
* @return {String} 返回一个新的字符串。
* @expample
    $.String.trimStart('  abc def mm '); //结果为 'abc def mm  '
*/
trimStart: function(string)
{
    return string.replace(/(^\s*)/g, '');
},

/**
* 从当前 String 对象移除所有尾部空白字符。
* @param {String} 要进行操作的字符串。
* @return {String} 返回一个新的字符串。
* @expample
    $.String.trimStart('  abc def mm '); //结果为 '  abc def mm'
*/
trimEnd: function(string)
{
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
padLeft: function(string, totalWidth, paddingChar)
{
    string = String(string); //转成字符串
    
    var len = string.length;
    if(totalWidth <= len) //需要的长度短于实际长度，做截断处理
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
padRight: function(string, totalWidth, paddingChar)
{
    string = String(string); //转成字符串
    
    var len = string.length;
    if(len >= totalWidth)
    {
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
between: function(string, tag0, tag1)
{
    var startIndex = string.indexOf(tag0);
    if (startIndex < 0)
    {
	    return '';
    }
	
    startIndex += tag0.length;
	
    var endIndex = string.indexOf(tag1, startIndex);
    if (endIndex < 0)
    {
	    return '';
    }
	
    return string.substr(startIndex,  endIndex - startIndex);
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
random: function(formater)
{
    if ( formater === undefined )
    {
        formater = 12;
    }

    //如果传入的是数字，则生成一个指定长度的格式字符串 'xxxxx...'
    if ( typeof formater == 'number' )
    {
        var size = formater + 1;
        if ( size < 0 )
        {
            size = 0;
        }
        formater = [];
        formater.length = size;
        formater = formater.join( 'x' );
    }

    return formater.replace( /x/g, function ( c )
    {
        var r = Math.random() * 16 | 0;
        return r.toString( 16 );
    }).toUpperCase();
}

});//--------------------------------------------------------------------------------------





//---------------判断部分 -----------------------------------------------------
MiniQuery.extend( MiniQuery.String, /**@lends MiniQuery.String */
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
startsWith: function(str, dest, ignoreCase)
{
    if(ignoreCase)
    {
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
endsWith: function(str, dest, ignoreCase)
{
    var len0 = str.length;
    var len1 = dest.length;
    var delta = len0 - len1;
    
    
    if(ignoreCase)
    {
        var src = str.substring(delta, len0);
        return src.toUpperCase() === dest.toString().toUpperCase();
    }
    
    return str.lastIndexOf(dest) == delta;
},

/**
* 确定一个字符串是否包含指定的子字符串。
* @param {String} string 要进行检测的大串。
* @param {String} target 要进行检测模式子串。
* @return {boolean} 返回一个 bool 值。如果大串中包含模式子串，则返回 true；否则返回 false。
* @example
    $.String.contains('javascript is ok', 'scr');   //true
    $.String.contains('javascript is ok', 'iis');      //false
*/
contains: function(string, target)
{
    return string.indexOf(target) > -1;    
}


});//--------------------------------------------------------------------------------------




//---------------转换部分 -----------------------------------------------------
MiniQuery.extend( MiniQuery.String, /**@lends MiniQuery.String */
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
    $.String.toHyphenate('backgroundItemColor') //结果为 'background-item-color'
*/
toCamelCase: function(string) 
{
    var rmsPrefix = /^-ms-/;
    var rdashAlpha = /-([a-z]|[0-9])/ig;
    
    return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, function(all, letter) 
    {          
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
toHyphenate: function(string)
{
	return string.replace(/[A-Z]/g, function(match)
	{
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
toUtf8: function(string)
{
    var encodes = [];
	
    MiniQuery.Array.each( string.split(''), function(ch, index)
    {
	    var code = ch.charCodeAt(0);
        if (code < 0x80) 
        {
            encodes.push(code);
        }
        else if (code < 0x800) 
        {
            encodes.push(((code & 0x7C0) >> 6) | 0xC0);
            encodes.push((code & 0x3F) | 0x80);
        }
        else 
        {
            encodes.push(((code & 0xF000) >> 12) | 0xE0);
            encodes.push(((code & 0x0FC0) >> 6) | 0x80);
            encodes.push(((code & 0x3F)) | 0x80);
        }
    });
	
    return '%' + MiniQuery.Array.map(encodes, function(item, index)
    {
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
toValue: function(value)
{
    if(typeof value != 'string') //拦截非字符串类型的参数
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
MiniQuery.extend( MiniQuery.String, /**@lends MiniQuery.String */
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
split: function(string, separators)
{
    var list = String(string).split( separators[0] );
    
    for(var i=1, len=separators.length; i<len; i++)
    {
        list = fn(list, separators[i], i);
    }
    
    return list;
    
    
    //一个内部方法
    function fn(list, separator, dimension)
    {
        dimension--;
        
        return MiniQuery.Array.map(list, function(item, index)
        {
            return dimension == 0 ? 
            
                String(item).split( separator ) :
                
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
slide: function ( string, windowSize, stepSize )
{
    var chars = String( string ).split( '' ); //按字符切成单个字符的数组

    return MiniQuery.Array( chars ).slide( windowSize, stepSize ).map( function ( group, index )
    {
        return group.join( '' );
    } ).valueOf();

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
segment: function ( string, size )
{
    return MiniQuery.String.slide( string, size, size );
}


});//--------------------------------------------------------------------------------------

//---------------过滤部分 -----------------------------------------------------
MiniQuery.extend( MiniQuery.String, /**@lends MiniQuery.String */
{
    

/**
* 用做过滤直接放到HTML里的
* @return {String}
*/
escapeHtml: function(string)
{
    string = String(string);
    
    var reg = /[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g;
	string = string.replace(reg, function(r)
	{
		return "&#" + r.charCodeAt(0) + ";"
		
	});
	
	string = string.replace(/ /g, "&nbsp;");
    string = string.replace(/\r\n/g, "<br />");
	string = string.replace(/\n/g, "<br />");
	string = string.replace(/\r/g, "<br />");
	
	return string;
},

/**
* 用做过滤HTML标签里面的东东 比如这个例子里的<input value="XXX"> XXX就是要过滤的
* @return {String}
*/
escapeElementAttribute: function(string)
{
    string = String(string);
    var reg = /[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g;
    
    return string.replace(reg, function(r)
	{
		return "&#" + r.charCodeAt(0) + ";"
	});
	
},

/**
 * 用做过滤直接放到HTML里js中的
 * @return {String}
 */
escapeScript: function(string)
{
    string = String(string);
    var reg = /[\\"']/g;
    
    string = string.replace(reg, function(r)
	{
		return "\\" + r;
	})
	
	string = string.replace(/%/g, "\\x25");
    string = string.replace(/\n/g, "\\n");
    string = string.replace(/\r/g, "\\r");
    string = string.replace(/\x01/g, "\\x01");
    
    return string;
},

/**
 * 用做过滤直接 URL 参数里的 比如 http://www.baidu.com/?a=XXX XXX就是要过滤的
 * @return {String}
 */
escapeQueryString: function(string)
{
    string = String(string);
    
    return window.escape(string).replace(/\+/g, "%2B");
},

/**
 * 用做过滤直接放到<a href="javascript:alert('XXX')">中的XXX
 * @return {String}
 */
escapeHrefScript: function(string)
{
    string = MiniQuery.String.escapeScript( string );
    string = string.replace(/%/g, "%25"); //escMiniUrl
    string = MiniQuery.String.escapeElementAttribute( string );
    return string;
    
},

/**
 * 用做过滤直接放到正则表达式中的
 * @return {String}
 */
escapeRegExp: function(string)
{
    string = String(string);
    
    var reg = /[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g;
    
    return string.replace(reg, function(a, b)
    {
	    return "\\" + a;
    });
}

  
    
    
} );//--------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法

MiniQuery.String.prototype = /**@inner*/
{
    constructor: MiniQuery.String,
    value: '',
    
    
    init: function(string)
    {
        this.value = String(string);

    },
    
    
    toString: function()
    {
        return this.value;
    },
    
    valueOf: function()
    {
        return this.value;
    },
    
    
    format: function(arg1, arg2)
    {
        this.value = MiniQuery.String.format(this.value, arg1, arg2);
        return this;
    },
    
    replaceAll: function(src, dest)
    {
        this.value = MiniQuery.String.replaceAll(this.value, src, dest);
        return this;
    },
    
    
    replaceBetween: function(startTag, endTag, newString)
    {
        this.value = MiniQuery.String.replaceBetween( this.value, startTag, endTag, newString );
        return this;
    },
    
    
    removeAll: function(src)
    {
        this.value = MiniQuery.String.replaceAll(this.value, src, '');
        return this;
    },
    
    random: function(size)
    {
        this.value = MiniQuery.String.random(size);
        return this;
    },
    
    
    trim: function()
    {
        this.value = MiniQuery.String.trim(this.value);
        return this;
    },
    
    
    trimStart: function()
    {
        this.value = MiniQuery.String.trimStart(this.value);
        return this;
    },
    
    
    trimEnd: function()
    {
        this.value = MiniQuery.String.trimEnd(this.value);
        return this;
    },
    
    
    split: function(separators)
    {
        return MiniQuery.String.split(this.value, separators);
    },
    
    
    startsWith: function(dest, ignoreCase)
    {
        return MiniQuery.String.startsWith(this.value, dest, ignoreCase);
    },
    
    
    endsWith: function(dest, ignoreCase)
    {
        return MiniQuery.String.endsWith(this.value, dest, ignoreCase);
    },
    
    
    contains: function(target)
    {
        return MiniQuery.String.contains(this.value, target);
    },
    
    
    padLeft: function(totalWidth, paddingChar)
    {
        this.value = MiniQuery.String.padLeft(this.value, totalWidth, paddingChar);
        return this;
    },
    
    
    padRight: function(totalWidth, paddingChar)
    {
        this.value = MiniQuery.String.padRight(this.value, totalWidth, paddingChar);
        return this;
    },
    
    
    toCamelCase: function() 
    {
        this.value = MiniQuery.String.toCamelCase(this.value);
        return this;
    },
    
    
    toHyphenate: function()
    {
        this.value = MiniQuery.String.toHyphenate(this.value);
        return this;
    },
    
    
    between: function(tag0, tag1)
    {
        this.value = MiniQuery.String.between(this.value, tag0, tag1);
        return this;
    },
    
    
    toUtf8: function()
    {
        this.value = MiniQuery.String.toUtf8(this.value);
        return this;
    },
    
    
    toValue: function(value)
    {
        return MiniQuery.String.toValue( this.value );
    },

    slide: function ( windowSize, stepSize )
    {
        return MiniQuery.String.slide( this.value, windowSize, stepSize );
    },

    segment: function ( size )
    {
        return MiniQuery.String.segment( this.value, size, size );
    }
};

MiniQuery.String.prototype.init.prototype = MiniQuery.String.prototype;

/**
* Boolean 工具类
* @class
* @param {Object} b 要进行进换的值，可以是任何类型。
* @return {MiniQuery.Boolean} 返回一个 MiniQuery.Boolean 的实例。
*/
MiniQuery.Boolean = function(b)
{
    return new MiniQuery.Boolean.prototype.init(b);
};



MiniQuery.extend( MiniQuery.Boolean, /**@lends MiniQuery.Boolean */
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
    parse: function(arg)
    {
        if(!arg) // null、undefined、0、NaN、false、''
        {
            return false;
        }
        
        if(typeof arg == 'string' || arg instanceof String)
        {
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
    toInt: function(arg)
    {
        return MiniQuery.Boolean.parse(arg) ? 1 : 0;
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
    reverse: function(arg)
    {
        return !MiniQuery.Boolean.parse(arg);
    },

    /**
    * 产生一个随机布尔值。
    * @return {boolean} 返回一个随机的 true 或 false。
    * @example
        $.Boolean.random();
    */
    random: function()
    {
        return !!Math.floor( Math.random() * 2 ); //产生随机数 0 或 1
    }
});



//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法

MiniQuery.Boolean.prototype = /**@inner*/
{
    constructor: MiniQuery.Boolean,
    value: false,
    
    
    init: function(b)
    {
        this.value = MiniQuery.Boolean.parse(b);
    },
    
    
    valueOf: function()
    {
        return this.value;
    },
    
    
    toString: function()
    {
        return this.value.toString();
    },
    
    
    toInt: function()
    {
        return this.value ? 1 : 0;
    },
    
    
    reverse: function()
    {
        this.value = !this.value;
        return this;
    },
    
    random: function()
    {
        this.value = MiniQuery.Boolean.random();
        return;
    }
};


MiniQuery.Boolean.prototype.init.prototype = MiniQuery.Boolean.prototype;

/**
* 函数工具
* @class
* @param {function} fn 要进行包装的函数
*/
MiniQuery.Function = function(fn)
{
    return new MiniQuery.Function.prototype.init(fn);
};

MiniQuery.extend( MiniQuery.Function, /**@lends MiniQuery.Function*/
{
    /**
    * 定义一个通用的空函数。
    * 实际使用中应该把它当成只读的，而不应该对它进行赋值。
    * @return 返回一个空函数，不执行任何操作。
    */
    empty: function()
    {
    },
    
    /**
    * 把函数绑定到指定的对象上，从而该函数内部的 this 指向该对象。
    * @param {Object} obj 要绑定的对象，即 this 要指向的对象
    * @param {function} fn 要绑定的函数，内部的 this 指向 obj
    * @return {function} 返回一个新的函数。
    * @example
        var p = { msg: 'hi js' };
        var obj = {
            msg: 'hello',
            hi: function(a, b, c) {
                console.log(this.msg); // 'hi js'
                console.log(a, b, c);
            }
        };
        $.Function.bind(p, obj.hi, 1, 2)(3); //传递附加参数
        $.Function.bind(p, obj.hi)(4, 5, 6); //传递附加参数
    */
    bind: function(obj, fn)
    {
        var args = Array.prototype.slice.call(arguments, 2); //通过 bind 传进来的参数(除了 obj 和 fn)
        return function()
        {
            var list = Array.prototype.slice.call(arguments, 0); //return 的这个函数传进来的参数
            list = args.concat( list ); //合并外层的，即 bind 传进来的参数
            fn.apply(obj, list);
        }
    },
    
    /**
    * 间隔执行函数。
    * 该方法用 setTimeout 的方式实现间隔执行，可以指定要执行的次数。
    * 在回调函数中，会接收到当次执行次数。
    * @param {function} fn 要执行的函数。该函数的参数中会接收到当前的执行次数
    * @param {number|int} delay 时间间隔，单位为毫秒。
    * @param {number|int} [count] 要执行的次数，如果指定了，则在执行到该次数后自动停止。
    * @example
        //每隔 500ms执行一次，最多执行 23 次
        $.Function.setInterval(function(index)
        {
            console.log('A: ', index);
        }, 500, 23);
        
        //每隔 200ms执行一次，当次数达到 10 以上时，停止
        $.Function.setInterval(function(index)
        {
            console.log('B: ', index);
            if(index >=15)
            {
                return null; //返回 null 以停止
            }
            
        }, 200);
    */
    setInterval: function(fn, delay, count)
    {
        //把每个传进来的函数当作一个 cache，而不是缓存在 arguments.callee，
        //因为是静态的，这样可以避免多个并发调用作产生混乱。
        var cache = fn; 
        var next = arguments.callee;
        var key = '__MiniQuery.Funcion.setInterval.count__'; //一个私有的变量，尽可能不干扰原有的 fn
        cache[key] = (cache[key] || 0) + 1;
        
        var id = setTimeout(function()
        {
            var value = fn( cache[key] );
            if(value === null)
            {
                clearTimeout(id);
                return;
            }
            
            if(count === undefined || cache[key] < count) //未传入 count 或 未达到指定次数
            {
                next(fn, delay, count);
            }
            
        }, delay);

    }
    
    
});


MiniQuery.Function.prototype = /**@inner*/
{
    constructor: MiniQuery.Function,
    value: null,
    
    init: function(fn)
    {
        if(typeof fn != 'function')
        {
            throw new Error('参数 fn 必须是一个函数');
        }
        
        this.value = fn;
    },
    
    valueOf: function()
    {
        return this.value;
    },
    
    bind: function(obj)
    {
        var args = [obj, this.value];
        args = args.concat( Array.prototype.slice.call(arguments, 1) );
        
        this.value = MiniQuery.Function.bind.apply(null, args);
        return this;
    },
    
    setInterval: function(delay, count)
    {
        var fn = this.value;
        
        MiniQuery.Function.setInterval(function(index)
        {
            fn(index);
            
        }, delay, count);
        
        return this;
    }
    
};

MiniQuery.Function.prototype.init.prototype = MiniQuery.Function.prototype;

/**
* 日期时间工具
* @class
*/
MiniQuery.Date = function(date)
{
    return new MiniQuery.Date.prototype.init(date);
};

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
MiniQuery.Date.toString = function(datetime, formater)
{
    if(typeof datetime == 'string') //此时为 toString(formater)
    {
        formater = datetime;
        datetime = new Date();
    }
    
    return MiniQuery.Date.format(datetime, formater);
    
};//这里不要弄到下面的 extend 中，因为它使用的是 for in，而在 IE6/IE8 中，是枚举不到重写的内置成员的


MiniQuery.extend( MiniQuery.Date, /**@lends MiniQuery.Date */
{
    /**
    * 获取当前系统时间。
    * @return 返回当前系统时间实例。
    * @example
        $.Date.now();
    */
    now: function()
    {
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
    parse: function(value)
    {
        if(value instanceof Date)
        {
            if( isNaN( value.getTime()) )
            {
                throw new Error('参数是非法的日期实例');
            }
            
            return value;
        }
        
        if(typeof value != 'string')
        {
            throw new Error('不支持该类型的参数：' + typeof value);
        }
        
        
        //标准方式
        var date = new Date(value);
        if( !isNaN(date.getTime()) )
        {
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
        
        function GetDate(s)
        {
            var now = new Date();
            
            var separator = 
                s.indexOf('.') > 0 ? '.' :
                s.indexOf('-') > 0 ? '-' :
                s.indexOf('/') > 0 ? '/' :
                s.indexOf('_') > 0 ? '_' : null;
                
            if(!separator)
            {
                throw new Error('无法识别的日期格式：' + s);
            }
            
            var ps = s.split(separator);
            
            return {
                yyyy: ps[0],
                MM: ps[1] || 0,
                dd: ps[2] || 1
            };
        }
        
        function GetTime(s)
        {
            var separator = s.indexOf(':') > 0 ? ':' : null;
            if(!separator)
            {
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
        if(!parts[0])
        {
            throw new Error('无法识别的格式1：' + value);
        }
        
        var date = parts[0].indexOf(':') > 0 ? null : parts[0];
        var time = parts[0].indexOf(':') > 0 ? parts[0] : (parts[1] || null);
        
        if(date || time)
        {
            if(date && time)
            {
                var d = GetDate(date);
                var t = GetTime(time);
                return new Date(d.yyyy, d.MM-1, d.dd, t.HH, t.mm, t.ss);
            }
            
            if(date)
            {
                var d = GetDate(date);
                return new Date(d.yyyy, d.MM-1, d.dd);
            }
            
            if(time)
            {
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
    format: function(datetime, formater)
    {
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        var hour = datetime.getHours();
        var minute = datetime.getMinutes();
        var second = datetime.getSeconds();
        
        var padLeft = function(value, length)
        {
            return MiniQuery.String.padLeft(value, length, '0');
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
        
        for(var key in map)
        {
            s = MiniQuery.String.replaceAll(s, key, map[key]);
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
    addYears: function ( datetime, value )
    {
        //重载 addYear( value )
        if ( !( datetime instanceof Date ) )
        {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }


        var dt = new Date( datetime ); //新建一个副本，避免修改参数
        dt.setFullYear( datetime.getFullYear() + value );

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
    addMonths: function ( datetime, value )
    {
        //重载 addMonths( value )
        if ( !( datetime instanceof Date ) )
        {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date( datetime );//新建一个副本，避免修改参数
        dt.setMonth( datetime.getMonth() + value );

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
    addDays: function ( datetime, value )
    {
        //重载 addDays( value )
        if ( !( datetime instanceof Date ) )
        {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date( datetime );//新建一个副本，避免修改参数
        dt.setDate( datetime.getDate() + value );

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
    addHours: function ( datetime, value )
    {
        //重载 addHours( value )
        if ( !( datetime instanceof Date ) )
        {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date( datetime );//新建一个副本，避免修改参数
        dt.setHours( datetime.getHours() + value );

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
    addMinutes: function ( datetime, value )
    {
        //重载 addMinutes( value )
        if ( !( datetime instanceof Date ) )
        {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date( datetime );//新建一个副本，避免修改参数
        dt.setMinutes( datetime.getMinutes() + value );

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
    addSeconds: function ( datetime, value )
    {
        //重载 addSeconds( value )
        if ( !( datetime instanceof Date ) )
        {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date( datetime );//新建一个副本，避免修改参数
        dt.setSeconds( datetime.getSeconds() + value );
        
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
    addMilliseconds: function ( datetime, value )
    {
        //重载 addMilliseconds( value )
        if ( !( datetime instanceof Date ) )
        {
            value = datetime;
            datetime = new Date(); //默认为当前时间
        }

        var dt = new Date( datetime );//新建一个副本，避免修改参数
        dt.setMilliseconds( datetime.getMilliseconds() + value );
        
        return dt;
    },



    /**@inner*/
    getFromServer: function(url, fn)
    {
        if(typeof url == 'function' && fn === undefined) //此时为 MiniQuery.Date.getFromServer(fn)
        {
            fn = url;
            url = window.location.href;
        }
        
        var xhr = MiniQuery.XHR.create();
        
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 && xhr.status == "200") 
            {
                var date = new Date(Date.parse( xhr.getResponseHeader("Date") ));
                fn && fn(date);
            }
        };
        
        xhr.open("GET", url, true);
        xhr.send(null);
        
    }
    
});


MiniQuery.Date.prototype = /**@inner*/
{
    constructor: MiniQuery.Date,
    value: new Date(),
    
    
    init: function(date)
    {
        // 注意 Date(xxx)只返回一个 string，而不是一个 Date 实例。
        this.value = date === undefined ? 
            new Date() :                    //未指定参数，则使用当前日期时间
            MiniQuery.Date.parse( date );   //把参数解析成日期时间
    },
    
    
    valueOf: function()
    {
        return this.value;
    },
    
    
    toString: function(formater)
    {
        return MiniQuery.Date.format(this.value, formater);
    },
    
    
    format: function(formater)
    {
        return MiniQuery.Date.format(this.value, formater);
    },


    addYears: function ( value )
    {
        this.value = MiniQuery.Date.addYears(this.value, value);
        return this;
    },

    addMonths: function ( value )
    {
        this.value = MiniQuery.Date.addMonths( this.value, value );
        return this;
    },

    addDays: function ( value )
    {
        this.value = MiniQuery.Date.addDays( this.value, value );
        return this;
    },

    addHours: function ( value )
    {
        this.value = MiniQuery.Date.addHours( this.value, value );
        return this;
    },

    addMinutes: function ( value )
    {
        this.value = MiniQuery.Date.addMinutes( this.value, value );
        return this;
    },

    addSeconds: function ( value )
    {
        this.value = MiniQuery.Date.addSeconds( this.value, value );
        return this;
    },

    addMilliseconds: function ( value )
    {
        this.value = MiniQuery.Date.addMilliseconds( this.value, value );
        return this;
    }
    
};

MiniQuery.Date.prototype.init.prototype = MiniQuery.Date.prototype;

/**
* 数学工具类
* @namespace
*/
MiniQuery.Math = 
{
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
        return MiniQuery.Math.slide(index, size, 1);
    },
    
    /**
    * 上一个求模数
    */
    previous: function(index, size, step)
    {
        return MiniQuery.Math.slide(index, size, -1);
    },
    
    /**
    * 把一个字符串解析成十进制的整型
    */
    parseInt: function(string)
    {
        return parseInt(string, 10);
    }
};



/**
* 队列工具
* @class
* @param {Array} list 要执行的函数列表
*/
MiniQuery.Queue = (function()
{

function Queue(list)
{
    return new Queue.prototype.init(list);
}

Queue.prototype = /**@lends MiniQuery.Queue.prototype */
{
    constructor: Queue,
    
    init: function(list) //应该看成是一个构造器
    {
        var list = list ? list.slice(0) : this.list;
        var queue = [];
        
        for(var i=0, len=list.length; i<len; i++)
        {
            queue[i] = (function(i) //这里必须加一个闭包
            {
                return function()
                {
                    list[i](queue[i+1]);
                };
            })(i);
        }
        
        queue.push(this.noop);
        
        this.list = list;
        this.queue = queue;
    },
    
    noop: function(){},

    size: function()
    {
        return this.list.length;
    },
    
    run: function()
    {
        this.queue[0]();
        return this;
    },
    
    push: function(fn)
    {
        var queue = this.queue;
        
        var lastIndex = queue.length - 1;
        
        queue[lastIndex] = (function(i)
        {
            return function()
            {
                fn(queue[i+1]);
            };
        })(lastIndex);
        
        queue.push(this.noop);
        this.queue = queue;
        this.list.push(fn);
        
        return this;
    },
    
    shift: function()
    {
        this.list.shift()(this.noop);
        this.init();
        
        return this;
    },
    
    pop: function()
    {
        this.list.pop()(this.noop);
        this.queue.length -= 2;
        this.queue.push(this.noop);
        return this;
    }
    
};

//修正引用
Queue.prototype.init.prototype = Queue.prototype;

return Queue;
    
    
    
    
})();

/**
* 页面的缓存类工具
* @class
* @param {string} key
* @param {window} cacheWindow
* @param {Object} data
*/
MiniQuery.PageCache = (function()
{


/**@inner*/
function PageCache(key, cacheWindow, data)
{
    return new PageCache.prototype.init(key, cacheWindow, data);
}

var guid = '__MiniQuery.PageCache__'; //定义一个常量的键，以指向某个 window 中的一个对象 {}

PageCache.prototype = /**@lends MiniQuery.PageCache.prototype */
{
    constructor: PageCache, //修正构造器引用
    key: null,
    cacheWindow: window,    //要在上面缓存数据的 window 对象，如可以指定为 top；否则为当前的 window
    hasDone: false,
    
    //真正的构造器在此
    /**@inner*/
    init: function(key, cacheWindow, data)
    {
        this.key = key;
        
        if(cacheWindow !== undefined) //指定了 cacheWindow 参数
        {
            if( !MiniQuery.Object.isWindow(cacheWindow) ) //非法的 window 对象
            {
                throw new Error('指定的 cacheWindow 参数不是一个真正的 window 对象');
            }
            
            this.cacheWindow = cacheWindow;
        }
        
        if( !this.cacheWindow[guid] ) //当前 window 尚未存在 cache 的容器
        {
            this.cacheWindow[guid] = {}; //创建一个 cache 容器，以后所有缓存数据都装到这里
        }
        
        
        if(data !== undefined) //指定了要缓存的数据，则顺便缓存起来
        {
            if( !this.get() ) //当前 cacheWindow 尚未缓存过该数据。这样检查可避免覆盖掉之前缓存过的数据。
            {
                this.set(data);
            }
        }
        
    },
    
    get: function()
    {
        return this.cacheWindow[guid][this.key];
    },
    
    set: function(data)
    {
        this.cacheWindow[guid][this.key] = data;
        return this;
    },
    
    clear: function()
    {
        this.hasDone = false;
        this.cacheWindow[guid][this.key] = undefined;
        return this;
    },
    
    ready: function(fnLoad, fnDone)
    {
        var self = this;
        var data = self.get();
        
        if(data !== undefined) //已经存在数据
        {
            fnDone && fnDone(data); //直接让回调处理数据
            return this;
        }
        
        //否则，先加载数据
        fnLoad && fnLoad(function(data, notCached)
        {
            if(data === undefined) //加载数据失败，或者没有数据
            {
                self.clear();
                return;
            }
            
            //否则，加载数据成功
            if(notCached === true) //明确指定不要缓存
            {
                self.clear();
            }
            else
            {
                self.set(data);     //把数据缓存起来
            }
            
            fnDone && fnDone(data); //让回调处理数据
            
        });
        
        return this;
        
    }
};

PageCache.prototype.init.prototype = PageCache.prototype;

return PageCache;

    
})(); //结束 MiniQuery.PageCache 模块的定义

/**
* XMLHttpRequest 类工具
* @namespace
*/
MiniQuery.XHR = 
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
        
        
        MiniQuery.XHR.create = fn;
        
        return fn();
    }
        
};


/**
* XML 类工具
* @namespace
*/
MiniQuery.XML = (function($)
{



/**
* 针对 IE 创建最优版本的 XMLDocument 对象。
* @inner
*/
function createDocument()
{
    var cache = arguments.callee;
    
    if(!cache['version']) //首次创建
    {
        var versions = 
        [
            'MSXML2.DOMDocument.6.0',
            'MSXML2.DOMDocument.3.0',
            'MSXML2.DOMDocument'
        ];
        
        for(var i=0, len=versions.length; i<len; i++)
        {
            try
            {
                var xmldoc = new ActiveXObject(versions[i]);
                cache['version'] = versions[i]; //缓存起来
                return xmldoc;
            }
            catch(ex) //跳过
            {
            }
        }
    }
    
    return new ActiveXObject( cache['version'] );
}


/**
* 解析一个 XML 节点的属性集合成一个键/值形式的 Object 对象。
* 可以指定第二个参数是否为深层解析，即属性值中包含查询字符串编码时，可以进一步解析成对象。
* @inner
*/
function parseAttributes(node, deep)
{
    var obj = {};
    
    var attrs = $.Array.parse(node.attributes); //把类数组对象转成真正的数组
    
    $.Array.each(attrs, function(item, index)
    {
        if(item.specified) //兼容性写法，过滤出自定义特性，可用于 HTML 节点的 attributes
        {
            if(deep && item.value.indexOf('=') > 0) //深层次解码
            {
                obj[item.name] = $.Object.parseQueryString(item.value);
            }
            else
            {
                obj[item.name] = item.value;
            }
        }
        
    });
    
    return obj;
}

/**
* 跨浏览器解析 XML 数据(字符串)，返回一个 XMLDocument 对象。
* @inner
*/
function parseString(data)
{
    var xmldoc = null;
    var impl = document.implementation;
    
    if(window.DOMParser) //标准
    {
        xmldoc = (new DOMParser()).parseFromString(data, 'text/xml');
        var errors = xmldoc.getElementsByTagName('parsererror');
        if(errors.length > 0)
        {
            throw new Error('XML 解析错误: ' + errors[0].textContent);
        }
    }
    else if(impl.hasFeature('LS', '3.0')) // DOM3
    {
        var parser = impl.createLSParser(impl.MODE_SYNCHRONOUS, null);
        var input = impl.createInput();
        input.stringData = data;
        xmldoc = parser.parse(input); //如果解析错误，则抛出异常
    }
    else // IE
    {
        xmldoc = createDocument();
        xmldoc.loadXML(data);
        if(xmldoc.parseError.errorCode != 0)
        {
            throw new Error('XML 解析错误: ' + xmldoc.parseError.reason);
        }
    }
    
    if(!xmldoc)
    {
        throw new Error('没有可用的 XML 解析器');
    }
    
    return xmldoc;
}

/**
* 把一个 Object 对象转成等价的 XML 字符串。
*
* 注意：传入的 Object 对象中，简单属性表示该节点自身的属性；
        数组表示该节点的子节点集合；
*       属性值只能是 string、number、boolean 三种值类型。
* @inner
*/
function Object_to_String(obj, name)
{
    var fn = arguments.callee;
    
    if(!name) //处理(重载) Object_to_String(obj) 的情况
    {
        for(name in obj)
        {
            return fn(obj[name], name);
        }
        
        throw new Error('参数 obj 中不包含任何成员');
    }
    
    
    //正常情况 Object_to_String(obj, name)
    
    var attributes = [];
    var children = [];
    
    for(var key in obj)
    {
        if( MiniQuery.Object.isArray(obj[key]) ) //处理子节点
        {
            $.Array.each(obj[key], function(child, index)
            {
                children.push( fn(child, key) );
            });
            continue;
        }
        
        //处理属性
        var type = typeof obj[key];
        if(type == 'string' || type == 'number' || type == 'boolean')
        {
            var value =  String(obj[key]).replace(/"/g, '\\"');
            attributes.push( $.String.format('{0}="{1}"', key, value) );
        }
        else
        {
            throw new Error('非法数据类型的属性值: ' + key);
        }
    }
    
    return $.String.format('<{name} {attributes}>{children}</{name}>',
    {
        name: name,
        attributes: attributes.join(' '),
        children: children.join(' \r\n')
    });
}


    
// MiniQuery.XML 真正指向这里
return {

    /**
    * 跨浏览器解析 XML 数据(字符串)或者一个等价结构的 Object 对象成一个 XMLDocument 对象。
    * @param {string|Object} data 要进行解析的 XML 数据，可以为字符串或等价结构的对象。
    * @return {XMLDocument} 返回一个 XMLDocument 对象。
    * @example
        <xmp>
        var data =
            '<Person num="2" code="0"> \
    	        <user id="1" name="micty" age="28"> \
    		        <book id="1" name="C++" price="100"></book> \
    		        <book id="2" name="C#.NET" price="256"></book> \
    		        <book id="3" name="JavaScript" price="218"></book> \
    	        </user> \
    	        <user id="2" name="solomon" age="25"> \
    		        <book id="1" name="CPP" price="100"></book> \
    		        <book id="2" name="Linux" price="156"></book> \
    	        </user> \
            </Person>';
        var xmldoc = $.XML.parse(data);
        console.dir(xmldoc);
        </xmp>
    */
    parse: function(data)
    {
        var string = '';
        if(typeof data == 'string')
        {
            string = data;
        }
        else if(typeof data == 'object' && data)
        {
            string = Object_to_String(data);
        }
        
        if(!string)
        {
            throw new Error('非法的参数 data');
        }
        
        return parseString(string);
    },
    
    
    /**
    * 把一个 XMLDocument 对象或一个 XML 节点或一个 Object 对象解析成等价的 XML 字符串。
    * @param {Object} obj 要进行解析的对象。<br />
    * 注意：<br />
    *   传入的 Object 对象中，简单属性表示该节点自身的属性；<br />
    *   数组表示该节点的子节点集合；<br />
    *   属性值只能是 string、number、boolean 三种值类型。
    * @return 返回一个 XML 字符串。
    * @example
        var obj = {
            Person: {
                num: "2", code: "0",
                user: [
                {
                    id: "1", name: "micty", age: "28",
                    book: [
                        { id: "1", name: "C++", price: "100" },
                        { id: "2", name: "C#.NET", price: "256" },
                        { id: "3", name: "JavaScript", price: "218" }
                    ]
                },
                {
                    id: "2", name: "solomon", age: "25",
                    book: [
                        { id: "1", name: "CPP", price: "100" },
                        { id: "2", name: "Linux", price: "156" }
                    ]
                }]
            }
        };
        var xml = $.XML.toString(obj);
        console.log(xml);
    得到：<xmp>
        xml = '
            <Person num="2" code="0"> \
                <user id="1" name="micty" age="28"> \
                    <book id="1" name="C++" price="100"></book> \
                    <book id="2" name="C#.NET" price="256"></book> \
                    <book id="3" name="JavaScript" price="218"></book> \
                </user> \
                    <user id="2" name="solomon" age="25"> \
                    <book id="1" name="CPP" price="100"></book> \
                    <book id="2" name="Linux" price="156"></book> \
                </user> \
            </Person>'     </xmp>
    */
    toString: function(obj)
    {
        if( !obj || typeof obj != 'object' )
        {
            return '';
        }
        
        if(obj.nodeName) //传入的是 node 节点( XMLDocument 对象 或 XML 节点)
        {
            var node = obj; //换个名称更容易理解
            
            if(window.XMLSerializer) //标准
            {
                return ( new XMLSerializer() ).serializeToString( node ); 
            }
            
            if(document.implementation.hasFeature('LS', '3.0')) // DOM3
            {
                return document.implementation.createLSSerializer().writeToString( node );
            }
            
            //IE
            return node.xml;
        }
        
        //否则，使用标准的
        return Object_to_String( obj );
        
    },
    
    
    /**
    * 把一个 XML 字符串或 XMLDocument 对象或 XML 节点解析成等价结构的 Object 对象
    * @param {string|XMLDocument|XMLNode} node 
        要进行解析的 XML 字符串或 XMLDocument 对象或 XML 节点。<br />
        注意：表示 XML 节点中的属性名不能跟直接子节点中的任何一个节点名相同。
    * @param {boolean} deep 
        指示是否对节点值中进一步按查询字符串的解析成等价的对象。<br />
        如 "a=1&b=2&c=A%3D100%26B%3D200" 会被解析成对象 {a:1, b:2, c:{A:100, B:200}}
    * @return {Object} 返回一个等价的对象。<br />
        返回的 Object 对象中，属性表示该节点自身的属性；数组表示该节点的子节点集合。
    *@example
    <xmp>
        var xml = '
            <Person num="2" code="0"> \
                <user id="1" name="micty" age="28"> \
                    <book id="1" name="C++" price="100"></book> \
                    <book id="2" name="C#.NET" price="256"></book> \
                    <book id="3" name="JavaScript" price="218"></book> \
                </user> \
                    <user id="2" name="solomon" age="25"> \
                    <book id="1" name="CPP" price="100"></book> \
                    <book id="2" name="Linux" price="156"></book> \
                </user> \
            </Person>';
    </xmp>
        var obj = $.XML.toObject(xml); 
    得到：
        obj = {
            Person: {
                num: "2", code: "0",
                user: [
                {
                    id: "1", name: "micty", age: "28",
                    book: [
                        { id: "1", name: "C++", price: "100" },
                        { id: "2", name: "C#.NET", price: "256" },
                        { id: "3", name: "JavaScript", price: "218" }
                    ]
                },
                {
                    id: "2", name: "solomon", age: "25",
                    book: [
                        { id: "1", name: "CPP", price: "100" },
                        { id: "2", name: "Linux", price: "156" }
                    ]
                }]
            }
        };
    */
    toObject: function(node, deep)
    {
        var $ = MiniQuery;
        var fn = arguments.callee;  //引用自身，递归用到
        
        if(typeof node == 'string') //传入的是 XML 的字符串
        {
            var data = node;
            var xmlDoc = parseString(data); //把字符串解析成 XMLDocument 对象
            return fn(xmlDoc, deep);
        }
        
        if(node && node.documentElement) //传入的是 XMLDocument 对象
        {
            var xmlDoc = node;
            var obj = {};
            obj[ xmlDoc.documentElement.nodeName ] = fn( xmlDoc.documentElement, deep ); //取根节点进行解析
            return obj;
        }
        
        
        //以下处理的是 XML 节点的情况
        
        if( !node || !node.nodeName )
        {
            throw new Error('参数 node 错误：非法的 XML 节点');
        }
        

        var obj = parseAttributes(node, deep); //把节点属性转成键值对 obj
        
        var childNodes = $.Array.parse( node.childNodes ); //把类数组的子节点列表转成真正的数组
        
        //处理 <abc ...>xxx</abc> 这样的情况：obj.value = xxx;
        if(childNodes.length == 1) //只有一个子节点
        {
            var leaf = childNodes[0];
            if(leaf.nodeType == 3) // TextNode 文本节点
            {
                obj['value'] = leaf.nodeValue; //增加一个默认字段 value
                return obj;
            }
        }
        
        //过虑出真正的元素节点。IE 中 node 节点 没有 children 属性，因此用 childNodes 是兼容的写法
        $.Array( childNodes ).grep( function(item, index)
        {
            return item.nodeType === 1; //元素节点
            
        }).each( function(child, index)
        {
            var name = child.nodeName; //标签名，如 div
            
            if( !obj[name] ) //同类标签名，汇合到同一个数组中
            {
                obj[name] = [];
            }
            
            obj[name].push( fn(child) );
        });
        
        return obj;
        
    }
    
}; //结束 return



})( MiniQuery ); //结束 MiniQuery.XML 模块的定义





/**
* 带数据类型的 XML 工具类
* @namespace
*/
MiniQuery.XML.DataTypeXML = (function($)
{

var defaults = 
{
    //typeof 的值
    'string': '<string name="{key}">{value}</string>',
    'number': '<int name="{key}">{value}</int>',
    'boolean': '<bool name="{key}">{value}</bool>',
    'function': '<function name="{key}">{value}</function>',
    
    'object': '<object name="{key}">{value}</object>',
    
    //'undefined': '', //这个用不到
    
    //构造器
    'Array': '<array name="{key}">{value}</array>',
    'Date': '<date name="{key}">{value}</date>',
    
    //顶层
    'root': '<object>{value}</object>'
};

var templates = null;

/**
* 根据键和值，获取相应的 XML 字符串。
* @inner
*/
function getXml(key, value)
{
    if(value == null) // 拦截 null 或 undefined
    {
        return '';
    }
    
    var type = typeof value;
    var sample = templates[ type ];
    
    if( type != 'object') // string、number、boolean、function 会进入
    {
        return sample ? $.String.format( sample, 
        {
            key: key,
            value: value.toString()
            
        }) : '';
    }
    
    //以下是 type == 'object' 会进入的分支
    
    var getXml = arguments.callee; //递归要用到：引用自身，避免外部改名而影响到内部的使用
    
    if( $.Object.isArray(value) ) // value 是一个数组
    {
        return $.String.format( templates['Array'], 
        {
            key: key,
            
            value: $.Array.map( value, function(item, index) // map 中的 value 就是一个数组
            {
                var key = index;
                var value = item;
                
                return getXml(key, value);
                
            }).join('')
        });
    }
    
    //针对一些内置的对象类，获取构造器名称，如 Date、RegExp 等
    type = $.Object.getType(value);
    sample = templates[type];
    
    if( sample )
    {
        return $.String.format( sample, 
        {
            key: key,
            value: value.toString() //这里简单处理
        });
    }
    
    
    return $.String.format( templates['object'],
    {
        key: key,
        
        value: $.Object.isPlain(value) ? $.Object.toArray(value, function(key, value)
        {
            return getXml(key, value);
            
        }).join('') : value.toString()
    });
    
}


/**
* 即根据类型和相应的列表，转换成键值对的 Object 对象
* @inner
*/
function getObject(type, list)
{
    var fn = arguments.callee; //引用自身，递归用到
    var obj = {};
    
    var fns = 
    {
        'string': function()
        {
            $.Array.each(list, function(item, index)
            {
                obj[ item.name ] = item.value.toString();    
            });
        },
        
        'int': function()
        {
            $.Array.each(list, function(item, index)
            {
                obj[ item.name ] = Number( item.value );    
            });
        },
        
        'bool': function()
        {
            $.Array.each(list, function(item, index)
            {
                obj[ item.name ] = $.Boolean.parse( item.value );    
            });
        },
        
        'function': function()
        {
            $.Array.each(list, function(item, index)
            {
                var f = new Function('return ' + item.value); //创建一个函数
                obj[ item.name ] = f();
            });
        },
        
        'date': function()
        {
            $.Array.each(list, function(item, index)
            {
                obj[ item.name ] = $.Date.parse( item.value );
            });
        },
        
        'array': function()
        {
            $.Array.each(list, function(item, index)
            {
                obj[ item.name ] = [];
                
                $.Object.each(item, function(type, list)
                {
                    if(type == 'name')
                    {
                        return true; //continue
                    }
                    
                    var o = fn(type, list);
                    $.Object.extend( obj[ item.name ], o); //合并到 a 中，这样 o 中的 key 刚好是 a 中的索引
                    
                });
            });
        },
        
        'object': function()
        {
            $.Array.each(list, function(item, index)
            {
                obj[ item.name ] = {};
                
                $.Object.each(item, function(type, list)
                {
                    if(type == 'name')
                    {
                        return true;
                    }
                    
                    var o = fn(type, list);
                    $.Object.extend( obj[ item.name ], o);
                });
            });
        }
    };
    
    ( fns[type] )();
    
    return obj;
    
}



// MiniQuery.XML.DataTypeXML 指向这里
return {

    /**
    * 把一个 XMLDocument 对象或一个 XML 节点或一个 Object 对象解析成等价的 XML 字符串。
    *
    * 注意：当未指定第二个参数 templates 时，
    *           传入的 Object 对象中，简单属性表示该节点自身的属性；
    *           数组表示该节点的子节点集合；
    *           属性值只能是 string、number、boolean 三种值类型。
    */
    toString: function(obj, tmpl)
    {
        //合并参数指定的模板(如果有)
        templates = $.Object.extend({}, defaults, tmpl);
        
        return $.String.format( templates['root'], 
        {
            value: $.Object.toArray(obj, function(key, value)
            {
                return getXml(key, value);
                
            }).join('')
        });
    },
    
    /**
    * 把一个 XML 字符串或 XMLDocument 对象或 XML 节点解析成等价结构的 Object 对象
    * 
    * 注意：表示 XML 节点中的属性名不能跟直接子节点中的任何一个节点名相同。
    * 返回的 Object 对象中，属性表示该节点自身的属性；数组表示该节点的子节点集合。
    */
    toObject: function(data)
    {
        var xmlObj = $.XML.toObject( data ); //把字符串解析成标准的 Object
        for(var key in xmlObj) //只取第一个成员，其实就是 xmlObj['object']，这样写是为了通用性
        {
            xmlObj = xmlObj[key];
            break;
        }
     
        var obj = {};
        $.Object.each(xmlObj, function(type, list)
        {
            var o = getObject(type, list);
            $.Object.extend( obj, o );
            
        });
        
        return obj;
    }
};


})(MiniQuery);

/**
* Url 工具类
* @class
* @param {String} url Url字符串。
* @return {MiniQuery.Url} 返回一个 MiniQuery.Url 的实例。
*/
MiniQuery.Url = function(url)
{
    return new MiniQuery.Url.prototype.init(url);
};



MiniQuery.extend( MiniQuery.Url, /**@lends MiniQuery.Url */
{
   
   
/**
* 获取指定的 Url 的查询字符串中指定的键所对应的值。
* @param {String} [url=window.location.href] 要进行获取的 url，如果不指定，则默认为当前窗口的 Url。
* @param {String|null} [name] 要提取的查询字符串的键。
* @retun {String|Object} 返回一个查询字符串值。<br />
    如果参数 name 为 String 类型，则返回 String 类型的值。
    如果参数 name 为 null 或 undefined，则返回 Object 类型的值。
    
    当不指定参数 name 时，则获取全部查询字符串<br />
    如果参数 name 指定为一个非空字符串，则返回一个查询字符串的string 类型值
    (如果不存在该键，则返回空字符串)
* @example
    $.Url.getQueryString('http://www.abc.com?a=1&b=2#my', 'a'); //返回 '1'
    $.Url.getQueryString('http://www.abc.com?a=1&b=2#my', 'c'); //返回 ''，因为不存在
    $.Url.getQueryString('http://www.abc.com?a=1&b=2#my', null);//返回 {a: '1', b: '2'}
    
    //以下几个例子假如当前窗口的 Url='http://www.abc.com?a=1&b=2#my'
    $.Url.getQueryString('a');  //返回 '1'
    $.Url.getQueryString('c');  //返回 ''，因为不存在
    $.Url.getQueryString();     //返回 {a: '1', b: '2'}
    $.Url.getQueryString(null); //返回 {a: '1', b: '2'}
    $.Url.getQueryString('');   //返回 'a=1&b=2'，因为不指定 name，但 name 为空字符串
*/
getQueryString: function(url, name)
{
    if( name === undefined) //重载 getQueryString(name)
    {
        name = url;
        url = window.location.href;
    }
    
    var beginIndex = url.indexOf('?');
    if(beginIndex < 0) //不存在查询字符串
    {
        return name === '' ? '' : 
            name == null ? {} : '';
    }
    
    var endIndex = url.indexOf('#');
    if(endIndex < 0)
    {
        endIndex = url.length;
    }
    
    var qs = url.substring(beginIndex + 1, endIndex);
    if(name === '') //获取全部查询字符串的 string 类型
    {
        return qs;
    }
    
    
    var obj = MiniQuery.Object.parseQueryString(qs);
    
    return name == null ? obj :         //未定指名称: null 或 undefined，则获取全部
        name in obj ? obj[name] : '';   //指定了名称，如果存在，则返回该名称对应的值，否则空字符串
    
},

//待实现。
getHash: function(url, index)
{
    if( index === undefined) //重载 getHash(index)
    {
        index = url;
        url = window.location.href;
    }
    
    var list = [];
    
    if(url == window.location.href)
    {
        list = window.location.hash.split('#');
    }
},


hasQueryString: function(url, name)
{
    if(name === undefined) //hasQueryString(name)
    {
        name = url;
        url = window.location.href;
    }
    
    if(name === undefined) //hasQueryString()
    {
        return url.indexOf('?') >= 0;
    }
    
    
    var obj = MiniQuery.Url.getQueryString(url, null); //获取全部查询字符串的 object 形式
    
    if(name === '')
    {
        return !MiniQuery.Object.isEmpty(obj); //不指定名称，则只要有数据，就为 true
    }
    
    
    return name in obj;
    
    
},


make: function(url, queryString)
{
    if(queryString === undefined) //make(queryString)
    {
        queryString = url;
        url = window.location.href;
    }
    
    
    if( url.indexOf('?') < 0 )
    {
        url = url + '?';
    }
    else if(url.indexOf('=') > 0 )
    {
        url  = url + '&';
    }
    
    if( MiniQuery.Object.isPlain(queryString) ) // queryString 是一个 Object
    {
        queryString = MiniQuery.Object.toQueryString( queryString );
    }
    
    url = url + queryString;
    return url;
    
}
    
    
    
});


/**
* 表示当前窗口 Url 的全部查询字符串所对应的 map 对象。
* 该对象应该只读的。
* @example 
    可以用 $.Url.QueryString[name] 来取得对应的值
    假如当前窗口的 Url='http://www.abc.com?a=1&b=2#my'
    $.Url.QueryString['a']; //得到 1
    $.Url.QueryString; //得到 {a:1, b:2}
*/
MiniQuery.Url.QueryString = (function(url)
{
    return MiniQuery.Url.getQueryString(url, null);
    
})(window.location.href);






//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法

MiniQuery.Url.prototype = /**@inner*/
{
    constructor: MiniQuery.Url,
    value: window.location.href,
    
    init: function(url)
    {
        this.value = url || window.location.href;
    },
    
    
    valueOf: function()
    {
        return this.value;
    },
    
    
    toString: function()
    {
        return this.value.toString();
    },
    
    getQueryString: function(name)
    {
        return MiniQuery.Url.getQueryString(this.value, name);
    }
};


MiniQuery.Url.prototype.init.prototype = MiniQuery.Url.prototype;

/**
* 提供创建类的工厂方法
* @namespace
*/
MiniQuery.Class = 
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
    create: function( instances, statics )
    {
        var prototype = instances;
        
        //如果未提供构造函数，则使用一个默认的实现
        prototype.constructor = prototype.constructor || function(){};
        prototype.constructor.prototype = prototype;
        
        MiniQuery.extend( prototype.constructor, statics ); //静态成员
        
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
    inherit: function( SuperClass, instances, statics )
    {
        instances = MiniQuery.extend( new SuperClass(), instances );
        statics = MiniQuery.extend( {}, SuperClass, statics );
        
        return MiniQuery.Class.create( instances, statics );
    }
   
};


/**
* CSS 类工具
* @class
*/
MiniQuery.CssClass = function(node)
{
    return new MiniQuery.CssClass.prototype.init(node);
};


MiniQuery.extend( MiniQuery.CssClass, /**@lends MiniQuery.CssClass*/
{
    /**
    * 获取某个 DOM 元素的 class 类名；
    * 或者把一个用空格分隔的字符串转成 class 类名；
    * 返回一个数组。
    */
    get: function(node)
    {
        var names = '';
        if(node.className)
        {
            names = node.className;
        }
        else if(typeof node == 'string')
        {
            names = node;
        }
        
        return MiniQuery.Array( names.split(' ') ).unique().map(function(item, index)
        {
            return item == '' ? null : item;
            
        }).valueOf();
        
        
    },
    
    /**
    * 判断某个 DOM 节点是否包含指定的 class 类名。
    * 如果是，则返回 true；否则返回 false。
    */
    contains: function(node, name)
    {
        var list = this.get(node);
        return MiniQuery.Array.contains(list, name);    
    },
    
    /**
    * 给某个 DOM 节点添加指定的 class 类名（一个或多个）。
    */
    add: function(node, names)
    {
        var list = this.get(node);
        var classNames = MiniQuery.Object.isArray(names) ? names : this.get(names);
        
        list = MiniQuery.Array.mergeUnique(list, classNames);   //合并数组，并去掉重复的项
        node.className = list.join(' ');
        
        return this;
    },
    
    /**
    * 给某个 DOM 节点移除指定的 class 类名（一个或多个）。
    */
    remove: function(node, names)
    {
        var list = this.get(node);
        var classNames = MiniQuery.Object.isArray(names) ? names : this.get(names);
        
        MiniQuery.Array.each(classNames, function(item, index)  //逐项移除
        {
            list = MiniQuery.Array.remove(list, item);
        });
        
        node.className = list.join(' ');
        return this;
    },
    
    /**
    * 给某个 DOM 节点切换指定的 class 类名（一个或多个）。
    * 切换是指：如果之前已经有，则移除；否则添加进去。
    */
    toggle: function (node, names)
    {
        var list = this.get(node);
        var classNames = MiniQuery.Object.isArray(names) ? names : this.get(names);
        MiniQuery.Array.each(classNames, function(item, index)  //逐项切换
        {
            list = MiniQuery.Array.toggle(list, item);
        });
        
        node.className = list.join(' ');
        return this;
    }
});


//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法

MiniQuery.CssClass.prototype = /**@inner*/
{
    constructor: MiniQuery.CssClass,
    value: null,
    
    
    init: function(node)
    {
        this.value = node;
    },
    
    
    toString: function()
    {
        return this.get().join(' ');
    },
    
    
    valueOf: function()
    {
        return this.get(); //返回一个数组
    },
    
    
    get: function()
    {
        return MiniQuery.CssClass.get(this.value);
    },
    
    
    contains: function(name)
    {
        return MiniQuery.CssClass.contains(this.value, name);
    },
    
    
    add: function(names)
    {
        MiniQuery.CssClass.add(this.value, names);
        return this;
    },
    
    
    remove: function(names)
    {
        MiniQuery.CssClass.remove(this.value, names);
        return this;
    },
    
    
    toggle: function(names)
    {
        MiniQuery.CssClass.toggle(this.value, names);
        return this;
    }
};


MiniQuery.CssClass.prototype.init.prototype = MiniQuery.CssClass.prototype;




/**
* Script脚本工具
* @namespace
*/
MiniQuery.Script = (function($)
{
    
    /**
    * 加载单个
    * @inner
    */
    function loadSingle(url, charset, document, fn)
    {
        var head = document.getElementsByTagName('head')[0];
        
        var script = document.createElement('script');
        script.type = 'text/javascript';
        
        if(charset)
        {
            script.charset = charset;
        }
        
        if(script.readyState) //IE
        {
            script.onreadystatechange = function()
            {
                if(script.readyState == 'loaded' || script.readyState == 'complete')
                {
                    script.onreadystatechange = null; //避免重复执行回调
                    head.removeChild(script); //已加载完毕，移除该 script 标签，减少 DOM 节点
                    fn && fn();
                }
            };
        }
        else //标准
        {
            script.onload = function()
            {
                head.removeChild( script ); //已加载完毕，移除该 script 标签，减少 DOM 节点
                fn && fn();
            };
        }
        
        script.src = url;
        head.appendChild(script);
    }
    
    /**
    * 加载批量
    * @inner
    */
    function loadBatch(urls, charset, document, fn)
    {
        var index = 0;
        
        (function()
        {
            var next = arguments.callee;
            var url = urls[index];
            
            loadSingle( url, charset, document, function()
            {
                index++;
                
                if(index < urls.length)
                {
                    next();
                }
                else
                {
                    fn && fn();
                }
            });
            
        })();
        
        return;
        
    }
    

    /**
    * 跨浏览器动态加载 JS 文件，并在加载完成后执行指定的回调函数。
    * @memberOf MiniQuery.Script
    * @param {string|Array} params.url 
        要加载的 JS 文件的 url 地址，如果要批量加载，则为一个地址数组。
    * @param {string} [params.charset="utf-8"] 
        要加载的 JS 文件的字符编码，默认为 utf-8。
    * @param {Document} [params.document=window.document] 
        要加载的 JS 文件的上下文环境的 document，默认为当前窗口的 document 对象。
    * @param {function} [params.onload] 
        加载成功后的回调函数。
    * @example
        $.Script.load(
        {
            url: 'a.js',
            charset: 'utf-8',
            document: document,
            onload: function (){ }
        });

        $.Script.load('a.js', 'utf-8', document, function(){});
        $.Script.load('a.js', 'utf-8', function(){});
        $.Script.load('a.js', document, function(){});
        $.Script.load('a.js', function(){});
    */
    function load(params)
    {
        var obj = 
        {
            url: '',
            charset: 'utf-8',
            document: window.document,
            onload: function ()
            {
            }
        };

        if ( $.Object.isPlain( obj ) )
        {
            $.Object.extend( obj, params );
        }
        else
        {
            obj.url = params;
            
            switch ( typeof arguments[1] )
            {
                case 'string':
                    obj.charset = arguments[1];
                    break;
                case 'object':
                    obj.document = arguments[1];
                    break;
                case 'function':
                    obj.onload = arguments[1];
                    break;
            }
            switch ( typeof arguments[2] )
            {
                case 'object':
                    obj.document = arguments[2];
                    break;
                case 'function':
                    obj.onload = arguments[2];
                    break;
            }

            if ( arguments[3] )
            {
                obj.onload = arguments[3];
            }
        }

        
        
        if ( $.Object.isArray( obj.url ) )
        {
            loadBatch( obj.url, obj.charset, obj.document, obj.onload );
        }
        else if ( typeof obj.url == 'string' )
        {
            loadSingle( obj.url, obj.charset, obj.document, obj.onload );
        }
        else
        {
            throw new Error('参数 params.url 必须为 string 或 string 的数组');
        }
    }

    /**
    * 单个写入
    * @inner
    */
    function document_write( url, charset, document )
    {
        var html = $.String.format( '<script type="text/javascript" src="{src}" {charset} ><\/script>',
        {
            'src': url,
            'charset': charset ? $.String.format( 'charset="{0}"', charset ) : ''
        } );

        document.write( html );
    }

    /**
    * 用 document.write 的方式加载 JS 文件。
    * @memberOf MiniQuery.Script
    * @param {string|Array} params.url 
        要加载的 JS 文件的 url 地址，如果要批量加载，则为一个地址数组。
    * @param {string} [params.charset="utf-8"] 
        要加载的 JS 文件的字符编码，默认为 utf-8。
    * @param {Document} [params.document=window.document] 
        要加载的 JS 文件的上下文环境的 document，默认为当前窗口的 document 对象。
    * @example
        $.Script.write(
        {
            url: 'a.js',
            charset: 'utf-8',
            document: document
        });

        $.Script.write('a.js', 'utf-8', document);
        $.Script.write('a.js', 'utf-8');
        $.Script.write('a.js', document);
    */
    function write( params )
    {
        var obj =
        {
            url: '',
            charset: '',
            document: window.document
        };

        if ( $.Object.isPlain( params ) )
        {
            $.Object.extend( obj, params );
        }
        else
        {
            obj.url = params;
            switch ( typeof arguments[1] )
            {
                case 'string':
                    obj.charset = arguments[1];
                    break;
                case 'object':
                    obj.document = arguments[1];
                    break;
            }

            if ( arguments[2] )
            {
                obj.document = arguments[2];
            }
                
        }

        if ( $.Object.isArray( obj.url ) )
        {
            var urls = obj.url;
            for ( var i = 0, len = urls.length; i < len; i++ )
            {
                document_write( urls[i], obj.charset, obj.document );
            }
        }
        else
        {
            document_write( obj.url, obj.charset, obj.document );
        }
    }


    /**
    * 创建一个 script 标签，并插入 JS 代码。
    * @memberOf MiniQuery.Script
    * @param {string} params.code 
        要插入的 JS 代码。
    * @param {string} [params.id] 
        创建的 script 标签中的 id。
    * @param {Document} [params.document=window.document] 
         创建的 script 标签的上下文环境的 document，默认为当前窗口的 document 对象。
    * @example
        $.Script.insert(
        {
            code: 'alert(0);',
            id: 'myScript',
            document: document
        });

        $.Script.insert('alert(0);', 'myScript', document);
        $.Script.insert('alert(0);', 'myScript');
        $.Script.insert('alert(0);', document);
    */
    function insert( params )
    {
        var obj = 
        {
            code: '',
            id: '',
            document: window.document
        };

        if ( $.Object.isPlain( params ) )
        {
            $.Object.extend( obj, params );
        }
        else
        {
            obj.code = params;

            switch ( typeof arguments[1] )
            {
                case 'string':
                    obj.id = arguments[1];
                    break;
                case 'object':
                    obj.document = arguments[1];
                    break;
            }

            if ( arguments[2] )
            {
                obj.document = arguments[2];
            }
        }



        var script = obj.document.createElement('script');
        script.type = 'text/javascript';
        
        if(obj.id)
        {
            script.id = obj.id;
        }
        
        try // 标准，IE 除外
        {
            script.appendChild( obj.document.createTextNode(obj.code) );
        }
        catch(ex) // IE，但不限于 IE
        {
            script.text = obj.code;
        }
        
        obj.document.getElementsByTagName('head')[0].appendChild(script);
    }
    
    
    //MiniQuery.Script = 
    return {
        load: load,
        write: write,
        insert: insert
    };
    
} )( MiniQuery );




/**
* Style 样式类工具
* @namespace
*/
MiniQuery.Style = (function()
{
    
var iframe,
    iframeDoc;
    
    
return { /**@exports as MiniQuery.Style */

    getComputed: function(node, propertyName)
    {
        var name = MiniQuery.String.toCamelCase(propertyName);
	    var style = node.currentStyle || document.defaultView.getComputedStyle(node, null);
	    return style ? style[name] : null;
    },

    getDefault: function(nodeName, propertyName)
    {
        var cache = arguments.callee;
        if(!cache[nodeName])
        {
            cache[nodeName] = {};
        }
        
        if(!cache[nodeName][propertyName])
        {
            if(!iframe) //尚未存在 iframe，先创建它
            {
	            iframe = document.createElement( "iframe" );
	            iframe.frameBorder = iframe.width = iframe.height = 0;
	        }
	        
	        document.body.appendChild( iframe );
	        
	        /*
	            首次运行时，创建一个可缓存的版本。
	            IE 和 Opera 允许在没有重写假 HTML 到它的情况下重用 iframeDoc；
	            WebKit 和 Firefox 不允许重用 iframe document
	        */
            if (!iframeDoc || !iframe.createElement) 
            {
	            iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
	            iframeDoc.write((document.compatMode === 'CSS1Compat' ? 
	                '<!doctype html>' : '') + '<html><body>');
	            iframeDoc.close();
	        }

	        var node = iframeDoc.createElement(nodeName);
	        iframeDoc.body.appendChild(node);

            cache[nodeName][propertyName] = MiniQuery.Style.getComputed(node, propertyName);
            
	        document.body.removeChild(iframe);
        }
        
        return cache[nodeName][propertyName];
        
    },
    
    load:function(url, id)
    {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        
        if(id !== undefined)
        {
            link.id = id;
        }
        
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    
    insert: function(css, id)
    {
        var style = document.createElement('style');
        style.type = 'text/css';
        
        if(id !== undefined)
        {
            style.id = id;
        }
        
        try //标准
        {
            style.appendChild( document.createTextNode(css) );
        }
        catch(ex) //IE
        {
            style.styleSheet.cssText = css;
        }
        
        document.getElementsByTagName('head')[0].appendChild(style);
    },
    
    write: function(href)
    {
        document.write('<link rel="stylesheet" rev="stylesheet" href="' + href + '" type="text/css" media="screen" />');
    },
    
    addRule: function(sheet, selectorText, cssText, index)
    {
        if(sheet.insertRule) //标准
        {
            sheet.inertRule(selectorText + '{' + cssText + '}', index);
        }
        else if(sheet.addRule) //IE
        {
            sheet.addRule(selectorText, cssText, index);
        }
        else
        {
            throw new Error('无法插入样式规则!');
        }
    },
    
    removeRule: function(sheet, index)
    {
        if(sheet.deleteRule)
        {
            sheet.deleteRule(index);
        }
        else if(sheet.romveRule)
        {
            sheet.removeRule(index);
        }
        else
        {
            throw new Error('无法删除样式规则!');
        }
    }
}
    
})();



/**
* DOM 类工具
* @namespace
*/
MiniQuery.DOM = 
{
    /**
    * 检测一个节点(refNode)是否包含另一个节点(otherNode)
    */
	contains: function(refNode, otherNode)
	{
	    //下面使用了惰性载入函数的技巧，即在第一次调用时检测了浏览器的能力并重写了接口
	    var fn = typeof refNode.contains == 'function' ? function(refNode, otherNode)
        {
            return refNode.contains(otherNode);
            
        } : typeof refNode.compareDocumentPosition == 'function' ? function(refNode, otherNode)
        {
            return !!(refNode.compareDocumentPosition(otherNode) & 16);
            
        } : function(refNode, otherNode)
        {
            var node = otherNode.parentNode;
            do
            {
                if(node === refNode)
                {
                    return true;
                }
    	        
                node = node.parentNode;
            }
            while(node !== null);
    	    
            return false;
        };
	    
	    MiniQuery.DOM.contains = fn;
	    
	    return fn(refNode, otherNode);
	},
	
    /**
   * 获取指定节点的 innerText
   */
	getInnerText: function(node)
	{
	    var fn = typeof node.textContent == 'string' ? function(node) //DOM3级: FF、Safari、Opera、Chrome
        {
            return node.textContent;
            
        } : function(node) //标准: IE、Safari、Opera、Chrome
        {
            return node.innerText;
        };
	    
	    MiniQuery.DOM.getInnerText = fn;
	    
	    return fn(node);
	},
	
    /**
    * 设置指定节点的 innerText
    */
	setInnerText: function(node, text)
	{
	    var fn = typeof node.textContent == 'string' ? function(node, text) //DOM3级: FF、Safari、Opera、Chrome
        {
            node.textContent = text;
            
        } : function(node, text) //标准: IE、Safari、Opera、Chrome
        {
            node.innerText = text;
        };
	    
	    MiniQuery.DOM.setInnerText = fn;
	    
	    fn(node, text);
	},
	
    /**
    * 判断指定节点是否可见
    */
    isVisible: function(o)
    {
        var style = null;
        if(document.defaultView)
        {
            style = document.defaultView.getComputedStyle(o, null);
        }
        else if(o.currentStyle)
        {
            style = o.currentStyle;
        }
        else
        {
            throw new Error('未能判断!');
        }
        
        if (style.display == 'none' || style.visible == 'false') 
        {
            return false;
        }
        if(o.parentNode && o.parentNode.tagName.toLowerCase() != 'html')
        {
            return arguments.callee(o.parentNode);
        }
        return true;
    },
    
    /**
    * 显示指定的节点
    */
    show: function(o)
    {
        
        if(document.defaultView)
        {
            var computedStyle = document.defaultView.getComputedStyle(o, null);
            if(computedStyle.display == 'none')
            {
                o.style.display = 'inline';
            }
            if(computedStyle.visible == 'false')
            {
                o.style.visible = 'true';
            }
        }
        else if(o.currentStyle)
        {
            if(o.currentStyle.display == 'none')
            {
                o.style.display = 'inline';
            }
            if(o.currentStyle.visible == 'false')
            {
                o.style.visible = 'true';
            }
        }

        
        if(o.parentNode && o.parentNode.tagName.toLowerCase() != 'html')
        {
            arguments.callee(o.parentNode);
        }
        
    }
};

/**
* 数据缓存类工具
* @class
* @param {DOMElement} node 要进行缓存数据的 DOM 节点
*/
MiniQuery.Data = (function()
{
    var cache = {};
    var uuid = 0;
    var expando = MiniQuery.expando;
    
    var noData = 
    {
	    "embed": true,
	    
	    // Ban all objects except for Flash (which handle expandos)
	    "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
	    "applet": true
    };
    
    /**
    * 判断指定的节点能否缓存数据。
    * @memberOf MiniQuery.Data
    * @param {NodeElement} node 要进行判断的 DOM 节点
    * @return {boolean} 如果节点能缓存数据，则返回 true；否则，返回 false。
    * @example
        $.Data.acceptData(document.body);
    */
    function acceptData(node)
    {
        if(!node || !node.nodeName)
        {
            return false;
        }
        
        var match = noData[node.nodeName.toLowerCase()];
        if(match)
        {
            return !(match === true || node.getAttribute("classid") !== match);
        }
        
        return true;
    }
    
    /**
    * 给某个节点设置指定键值的数据。
    * 当键不是 string、number、boolean 类型时，则用该键覆盖该节点的全部数据。
    * @memberOf MiniQuery.Data
    */
    function set(node, key, value)
    {
        if( !acceptData(node) )
        {
            throw new Error('无法在该节点上缓存数据!');
        }
        
        var id = node[expando];
        
        if(!id) //不存在id，说明是第一次给该节点设置数据
        {
            id = ++uuid;
            node[expando] = id; //分配唯一的 id
        }
        
        if(!cache[id]) //不存在该节点关联的数据
        {
            cache[id] = {};
        }
        
        if(MiniQuery.Object.isValueType(key))
        {
            cache[id][String(key)] = value;
        }
        else // object、function、...
        {
            cache[id] = key; //此时忽略 value，直接把 key 当成 value
        }
    }
    
    /**
    * 获取某个节点指定键的数据。
    * 当不指定键时，则获取该节点关联的全部数据，返回一个 Object 对象。
    * @memberOf MiniQuery.Data
    */
    function get(node, key)
    {
        var id = node[expando];
        
        return key === undefined ? cache[id] || null :
            cache[id] ? cache[id][key] : null;
    }
    
    /**
    * 移除某个节点指定键的数据。
    * 当不指定键时，则移除该节点关联的全部数据
    * @memberOf MiniQuery.Data
    */
    function remove(node, key)
    {
        var id = node[expando];
        if(cache[id])
        {
            if(key === undefined)
            {
                cache[id] = null;
            }
            else
            {
                delete cache[id][key];
            }
        }
    }
    
    

    /**
    * 构造器
    * @inner
    */
    function Data(node)
    {
        return new MiniQuery.Data.prototype.init(node);
    }
    
    //静态成员
    MiniQuery.extend( Data,
    {   
        set: set, 
        get: get,
        remove: remove,
        acceptData: acceptData
    });
    
    return Data;

    
    
})(); //结束  MiniQuery.Data 模块的定义



//----------------------------------------------------------------------------------------------------------------
//包装类的实例方法
MiniQuery.Data.prototype =  /**@inner*/
{
    constructor: MiniQuery.Data,
    node: null,
    
    init: function(node)
    {
        this.node = node;
    },
    
    set: function(key, value)
    {
        MiniQuery.Data.set(this.node, key, value);
        return this;
    },
    
    get: function(key)
    {
        return MiniQuery.Data.get(this.node, key);
    },
    
    remove: function(key)
    {
        MiniQuery.Data.remove(this.node, key);
        return this;
    },
    
    acceptData: function()
    {
        return MiniQuery.Data.acceptData(this.node);
    }
    
};

MiniQuery.Data.prototype.init.prototype = MiniQuery.Data.prototype;

/**
* 映射器工具类
* @class
* @param
* @example
    var mapper = new $.Mapper();
*/
MiniQuery.Mapper = (function( $ )
{


/**
* 构造函数
* @inner
*/
function Mapper()
{
    this.all = 
    {
        'false': {}, //针对 false|null|undefined|''|0|NaN
        
        'string': {},
        'number': {},
        'boolean': {}, //只针对 true
        
        'object': {},
        'function': {},
        
        'undefined': {} //这个用不到
    };
}


$.Object.extend( Mapper.prototype, /**@lends MiniQuery.Mapper.prototype */
{
    /**
    * 设置一对映射关系。
    * @param src 映射关系的键，可以是任何类型。
    * @param target 映射关系要关联的值，可是任何类型。
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
    set: function(src, target)
    {
        var all = this.all;
        
        if( !src ) // false|null|undefined|''|0|NaN
        {
            all['false'][ String(src) ] = target;
            return;
        }
        
        var type = typeof src;
        var key = src.toString();
        
        switch(type)
        {
            case 'string':
            case 'number':
            case 'boolean':
                all[type][key] = target;
                break;
                
            case 'object':
            case 'function':
                var list = all[type][key];
                if( list ) //已存在对应字符串的列表
                {
                    var pair = $.Array.findItem( list, function(pair, index)
                    {
                        return pair[0] === src;
                    });
                    
                    if(pair) //已存在，
                    {
                        pair[1] = target; //改写值
                    }
                    else //未找到，创建新的，添加进去
                    {
                        list.push( [src, target] );
                    }
                }
                else //未存在，则创建并添加
                {
                    list = [ [src, target] ];
                }
                
                all[type][key] = list; //回写
        }
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
    setBatch: function(list)
    {
        var self = this;
        
        $.Array.each(list, function(item, index)
        {
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
    get: function(src)
    {
        var all = this.all;
        
        if( !src ) // false|null|undefined|''|0|NaN
        {
            return all['false'][ String(src) ];
        }
        
        
        var type = typeof src;
        var key = src.toString();
        
        switch(type)
        {
            //值类型的，直接映射
            case 'string':
            case 'number':
            case 'boolean':
                return all[type][key];
            
            //引用类型的，通过 toString() 映射到一个二维数组，每个二维数组项为 [src, target]
            case 'object':
            case 'function':
                var list = all[type][key];
                if( list ) //已存在对应字符串的列表
                {
                    var pair = $.Array.findItem( list, function(pair, index)
                    {
                        return pair[0] === src;
                    });
                    
                    if( pair )
                    {
                        return pair[1];
                    }
                }
        }
        
        return undefined;
    }
});

//MiniQuery.Mapper = 
return Mapper;
    
    
})( MiniQuery );





/**
* 事件类工具
* @namespace
*/
MiniQuery.Event = (function( $ )
{

var expando = $.expando;
var mapper = new $.Mapper();


function Event(value)
{
    return new MiniQuery.Event.prototype.init(value);
}

/**
* 一个管理事件列表的辅助类
* @inner
*/
var List = (function()
{
    var key = '__EventList__' + String(Math.random()).replace('.', '');
    
    /**@inner*/
    function add(node, type, fn)
    {
        var list = $.Data.get(node, key) || {};
        if( !list[type] ) //尚未存在该类型的事件
        {
            list[type] = [];
        }
            
        list[type].push( fn );
            
        $.Data.set(node, key, list); //这里一定要写回去
    }
    
    /**@inner*/
    function remove(node, type, fn)
    {
        var list = $.Data.get(node, key);   // list 是一个 {}
        if( list && list[type] )            // list[type] 是一个 []
        {
            list[type] = $.Array.remove( list[type], fn); //从 list[type] 中移除 fn
            //MiniQuery.Data.set(node, key, list); //这里一定要写回去
        }
    }
        
    /**@inner*/
    function clear(node, type)
    {
        var list = $.Data.get(node, key);   // list 是一个 {}
        if(list && list[type])              // list[type] 是一个 []
        {
            list[type] = [];
            //$.Data.set(node, key, list); //这里一定要写回去
        }
    }
        
    /**@inner*/
    function get(node, type)
    {
        var list = $.Data.get(node, key) || {}; // list 是一个 {}
        if(type === undefined) //未指定类型，则获取全部
        {
            return list;
        }
            
        return list[type] || [];
    }
        

        
    return {
        add: add,
        remove: remove,
        clear: clear,
        get: get
    };
})();







    

//MiniQuery.Event 指向这里
return MiniQuery.extend( Event,
{ 
    /**
    * 给 DOM 节点绑定一个事件处理函数，同时可以向该事件处理函数传递参数(如果需要)。
    * 该事件处理函数会接收到一个事件对象和传递进来的参数(如果有)。
    * 接收到的事件对象中包含标准的 preventDefault 和 stopPropagation 方法。
    * 如果既想取消默认的行为，又想阻止事件起泡，这个事件处理函数可以返回 false。
    */
    bind: function(node, type, fn, args, isOne)
    {
        //处理 MiniQuery.Event.bind(node, {click: function(){}, focus: function(){}});
        if( $.Object.isPlain(type) )
        {
            var maps = type;
            var bind = arguments.callee;
            $.Object.each(maps, function(type, fn)
            {
                bind(node, type, fn, args, isOne);
            });
            return;
        }
            
            
        function exFn(event)  //钩子函数，扩展原有的 fn 方法
        {
            event = $.Event.normalizeEvent(event);
                
            args = [event].concat(args || []);
            var value = fn.apply(node, args); //在 fn 中使用 this 指向当前 DOM 节点
            
            if( isOne )//只执行一次
            {
                $.Event.unbind(node, type, fn);
            }
            
            if(value === false)
            {
                $.Event.stop(event);
            }
                
        }
            
        List.add(node, type, fn);
        mapper.set(fn, exFn); //保存 exFn 的引用，以便在 unbind 中能引用到
            
        if(node.addEventListener) //DOM 2 级，标准
        {
            node.addEventListener(type, exFn, false); //第三个参数 false 表示不使用事件捕捉模型，而使用冒泡模型
        }
        else if(node.attachEvent) //DOM 2 级，IE
        {
            node.attachEvent('on' + type, exFn);
        }
        else //DOM 0 级
        {
            node['on' + type] = exFn;
        }
        


    }, 
    
    /**
    * 解除绑定 DOM 节点指定的事件处理函数
    */
    unbind: function(node, type, fn)
    {
        List.remove(node, type, fn);
       
        var exFn = mapper.get(fn) || fn;
        
        if(node.removeEventListener)//标准
        {
            node.removeEventListener(type, exFn, false);
        }
        else if(node.detachEvent)   //IE
        {
            node.detachEvent('on' + type, exFn);
        }
        else
        {
            node['on' + type] = null;
        }
    },
        
    /**
    * 清空 DOM 节点指定类型的全部事件处理函数
    */
    clear: function(node, type)
    {
        var list = List.get(node, type);
            
        $.Array.each(list, function(fn, index)
        {
            MiniQuery.Event.unbind(node, type, fn);
        });
    },
        
    /**
    * 清空 DOM 节点全部类型的全部事件处理函数
    */
    clearAll: function(node)
    {
        var all = List.get(node);
        for(var type in all)
        {
            MiniQuery.Event.clear(node, type);
        }
    },
        
        
    /**
    * 这个特别的方法将会触发 DOM 节点指定的事件类型上所有绑定的处理函数。
    * 但不会执行浏览器默认动作，也不会产生事件冒泡。
    * 返回的是最后一个事件处理函数的返回值
    */
    triggerHandler: function(node, type, args)
    {
        var value;
            
        var list = List.get(node, type);
        $.Array.each(list, function(fn, index)
        {
            value = fn.apply(node, args);
        });
            
        return value;
    },
    
    /**
    * 标准化事件对象，使其尽可能多地具有标准的方法和属性。
    */
    normalizeEvent: function(event)
    {
        event = event || window.event;
        
        //当相应的成员不存在时，才扩展该成员
        $.Object.extendSafely( event, 
        {
            stopPropagation: function()
            {
                event.cancelBubble = true;
            },
            
            preventDefault: function()
            {
                event.returnValue = false;
            },
            
            target: event.srcElement,
            relatedTarget: event.toElement || event.fromElement
        });
        
        
        return event;
        
    },
    
    /**
    * 获取事件对象。
    */
    getEvent: function(event)
    {
        return event || window.event;
    },
    
    /**
    * 获取事件的目标对象。
    */
    getTarget: function(event)
    {
        return event.target || event.srcElement;
    },
        
    /**
    * 阻止事件的默认行为。
    */
    preventDefault: function(event)
    {
        if(event.preventDefault)
        {
            event.preventDefault();
        }
        else //IE
        {
            event.returnValue = false;
        }
    },
        
    /**
    * 阻止事件冒泡。
    */
    stopPropagation: function(event)
    {
        if(event.stopPropagation)
        {
            event.stopPropagation();
        }
        else //IE
        {
            event.cancelBubble = true;
        }
    },
        
    /**
    * 停止事件，即先阻止事件冒泡，再阻止事件的默认行为。
    */
    stop: function(event)
    {
        MiniQuery.Event.stopPropagation(event);
        MiniQuery.Event.preventDefault(event);
    },
        
    /**
    * 获取事件的相对目标对象。
    */
    getRelatedTarget: function(event)
    {
        return event.relatedTarget || event.toElement || event.fromElement || null;
    },
      
    /**
    * 获取事件的按钮。
    */
    getButton: function(event)
    {
        if( document.implementation.hasFeature('MouseEvents', '2.0') )
        {
            return event.button;
        }
            
        //         0  1  2  3  4  5  6  7
        var map = [0, 0, 2, 0, 1, 0, 2, 0];
        return map[event.button];
    },
       
    /**
    * 获取鼠标中间按钮转动的格数。
    */
    getWheelDelta: function(event)
    {
        return event.wheelDelta || (-event.detail * 40);
    },
        
        
        
    /**
    * 当 DOM 载入就绪可以查询及操纵时，绑定一个要执行的函数。
    * @function
    * @param {function} fn 要进行绑定的回调函数。
    * @example
        $.Event.ready(function()
        {
            console.log('DOM 已经就绪');
        });
    */
    ready: (function()
    {
        var isReady = false;
        var readyList = [];
            
        // 文档已加载完
        if (document.readyState === "complete") 
        {  
            //异步执行，让脚本有机会做其他事
            return setTimeout(DOMContentLoaded, 1);  
        }  
            
        if(document.addEventListener) //标准浏览器
        {
            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                
            // 如果注册 DOMContentLoaded 事件句柄失败，注册到 window 的 onload 上作为后手  
            window.addEventListener("load", DOMContentLoaded, false);  
        }
        else if(document.attachEvent) //IE浏览器
        {
            // 如果是 iframe, 绑定到 onreadystatechange, 会在 window.onload 前触发 
            document.attachEvent("onreadystatechange", DOMContentLoaded);
                
            // 同样注册到 onload 上作为后手
            window.attachEvent("onload", DOMContentLoaded);
          
            // 如果不是一个 iframe，检查 DOM 是否加载完毕
            var isTopLevel = false;
		    try 
		    {
			    isTopLevel = (window.frameElement == null);
		    } 
		    catch(e) 
		    {
		    }

		    if (isTopLevel && document.documentElement.doScroll) 
		    {
			    doScrollCheck();
		    }
        }
            
        function DOMContentLoaded()
        {
            if(isReady) //已执行过
            {
                return;
            }
                
            isReady = true;
                
            for(var i=0, len=readyList.length; i<len; i++)
            {
                readyList[i].apply(document); //回调方法中的 this 指向 document
            }
            readyList = null; //清空列表
                
            //执行完毕回调列表，解除绑定 DOM 的就绪事件
            if(document.removeEventListener) //标准浏览器
            {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            }
            else if(document.detachEvent) //IE浏览器
            {
                document.detachEvent("onreadystatechange", DOMContentLoaded);
            }
        }
            
        function doScrollCheck()
        {
            try
            {
                document.documentElement.doScroll("left");
            }
            catch(e)
            {
                setTimeout(doScrollCheck, 1);
                return;
            }
                
            DOMContentLoaded();
        }
            
        //这里就是 MiniQuery.Event.ready
        return function(fn)
        {
            if(isReady)
            {
                fn.call(document);  // fn 中，this 指向 document 
            }
            else
            {
                readyList.push(fn);
            }
        }
    })()
    
});
    


})( MiniQuery );




/**
* Cookie 工具
* @class
*/

MiniQuery.Cookie = function()
{
    return new MiniQuery.Cookie.prototype.init();
};

MiniQuery.extend( MiniQuery.Cookie, /**@lends MiniQuery.Cookie */
{
    set: function(name, value, expires, domain, path)
    {
        
    },
    
    get: function(name, key, cookie)
    {
        var obj = MiniQuery.Cookie.parse( cookie || document.cookie );
        
        if(name === undefined) //未指定名称，全量返回
        {
            return obj;
        }
        
        var item = obj[name];
        
        if(!item || key === undefined) // null、undefined、false、''、0、NaN 或 未指定 key
        {
            return item;
        }
        
        return item[key];
        
    },
    
    remove: function()
    {
    },
    
    toObject: function(cookie)
    {
        var cache = arguments.callee;
        var obj = cache[cookie];
        
        if(obj)
        {
            return obj;
        }
        
        
        obj = {};
            
        var $ = MiniQuery;
        
        $.Array( cookie.split(';') ).map(function(item, index)
        {
            var pos = item.indexOf('=');
            
            var name = item.substring(0, pos);
            var value = item.substring(pos + 1);
            
            if(value.indexOf('=') > 0)
            {
                value = $.Object.parseQueryString(value, false);    //复合值
            }
            
            return [name, value];
            
        }).each(function(item,  index)
        {
            var name = item[0];
            var value = item[1];
            
            obj[name] = value;
        });
        
        cache[cookie] = obj; //缓存起来
            
        return obj;
    }
    
    
    
});





/**
* 插件类工具
* @namespace
*/
MiniQuery.Plugin = 
{
    has: function(name)
    {
        var has = false;
        
        name = name.toLowerCase();
        var plugins = navigator.plugins;
        
        for(var i=0, len=plugins.length; i<len; i++)
        {
            if(plugins[i].name.toLowerCase().indexOf(name) >= 0)
            {
                has = true;
                break;
            }
        }
        
        if(!has)
        {
            try
            {
                new ActiveXObject(name);
                has = true;
            }
            catch(ex)
            {
                has = false;
            }
        }
        
        return has;
    },
    
    hasFlash: function()
    {
        var yes = MiniQuery.Plugin.has('Flash');
        if(!yes)
        {
            yes = MiniQuery.Plugin.has('ShockwaveFlash.ShockwaveFlash');
        }
        
        return yes;
    },
    
    hasQuickTime: function()
    {
        var yes = MiniQuery.Plugin.has('QuickTime');
        if(!yes)
        {
            yes = MiniQuery.Plugin.has('QuickTime.QuickTime');
        }
        
        return yes;
    }

};





window.MiniQuery = MiniQuery;

})( window, window.document, window.document.location /*, undefined*/ ); 
//结束 MiniQuery 大闭包-----------------------------------------------------------------------------------

