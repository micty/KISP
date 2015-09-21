//以下文件由 ant 合并生成于 2013-10-09 14:17:24




//===============================================================================================================>
//开始 haf.js
;(function(global, Haf, undefined){



  

    
/**
* Hae 对象模拟器。 
* 用于模拟设备上的 Hae 对象，使之可以运行在浏览器环境。
*
* 真正发布后，可以去掉该文件。
*/
; (function (global, $, Hae) {


if (Hae) {
    return;
}


function log(name, value) {

    if (arguments.length < 2) {
        console.log(name);
        return;
    }

    var type = $.Object.getType(value);

    if (typeof value == 'object') {
            
        console.log( $.String.format('参数 ({type}) {name} = ', {
            type: type,
            name: name
        }));

        console.dir(value);
    }
    else {
        console.log( $.String.format('参数 ({type}) {name} = {value}', {
            type: type,
            name: name,
            value: value
        }));
    }
}


global.Hae = {

    App: {
        /**
        * 用同步的方式去加载一个 JS 文件并执行其代码。
        */
        loadJS: function (url) {

            log('开始调用 HaeMock.App.loadJS:');
            log('url', url);


            var xhr = $.XHR.create();
            xhr.open('GET', url, false); //同步方式
            xhr.send(null);

            var code = xhr.responseText;
            //其实用eval(code)也可以

            var script = global.document.createElement('script');
            script.type = 'text/javascript';

            try {   // 标准，IE 除外
                script.appendChild(global.document.createTextNode(code));
            }
            catch (ex) { // IE，但不限于 IE
                script.text = code;
            }

            global.document.getElementsByTagName('head')[0].appendChild(script);

            log('结束调用 HaeMock.App.loadJS。');

        }
    },

    UI: {
        createComponent: function (config) {
            log('开始调用 HaeMock.UI.createComponent:');
            log('config', config);
        },

        destroyComponent: function (componentId) {
            log('开始调用 HaeMock.UI.destroyComponent:');
            log('componentId', componentId);
        },

        setComponentProp: function (componentId, props) {
            log('开始调用 HaeMock.UI.setComponentProp:');
            log('componentId', componentId);
            log('props', props);
        },

        getComponentProp: function (componentId, propName) {
            log('开始调用 HaeMock.UI.getComponentProp:');
            log('componentId', componentId);
            log('propName', propName);
            return propName;
        },

        setComponentStyle: function (componentId, style) {
            log('开始调用 HaeMock.UI.setComponentStyle:');
            log('componentId', componentId);
            log('style', style);
        },

        getComponentStyle: function (componentId, styleName) {
            log('开始调用 HaeMock.UI.getComponentStyle:');
            log('componentId', componentId);
            log('styleName', styleName);
            return styleName;
        },

        addComponent2Container: function (componentId, containerId) {
            log('开始调用 HaeMock.UI.addComponent2Container:');
            log('componentId', componentId);
            log('containerId', containerId);
        },

        removeComponent4Container: function (componentId, containerId) {
            log('开始调用 HaeMock.UI.removeComponent4Container:');
            log('componentId', componentId);
            log('containerId', containerId);
        },

        addEventListener: function (componentId, eventName, handler) {
            log('开始调用 HaeMock.UI.addEventListener:');
            log('componentId', componentId);
            log('eventName', eventName);
            log('handler', handler);
        },

        removeEventListener: function (componentId, eventName, handler) {
            log('开始调用 HaeMock.UI.removeEventListener:');
            log('componentId', componentId);
            log('eventName', eventName);
            log('handler', handler);
        },

        invokeComponentMethod: function (componentId, methodName, args) {
            log('开始调用 HaeMock.UI.invokeComponentMethod:');
            log('componentId', componentId);
            log('methodName', methodName);
            log('args', args);
        },

        startAnimation: function (componentId, animator) {
            log('开始调用 HaeMock.UI.startAnimation:');
            log('componentId', componentId);
            log('animator', animator);
        }
    },


    ViewPort: {
        absoluteWidth: 640,
        absoluteHeight: 960,
        addComponent: function (componentId) {

            log('开始调用 HaeMock.ViewPort.add:');
            log('componentId', componentId);
        }
    },

    Device: {
        cpu: 1024,
        mem: 1024,
        os: 'iOS',
        osVersion: '5.1.1',
        vendor: 'Apple',
        model: '4S',
        density: 2,
        screenInch: 3.5
    }
        
};




})(global, Haf, global.Hae);




var Timer = (function () {
    

    var all = {};

    function add(name) {
        var t = new Date();
        var a = all[name] || [];
        a.push(t);

        all[name] = a;
    }

    function get(name) {
        var a = all[name];

        if (!a) {
            return -1;
        }

        if (a.length % 2 != 0) {
            throw new Error('长度必须为 2 的倍数');
        }

        var groups = $.Array.group(all[name], 2);

        var list = $.Array.map(groups, function (item, index) {
            var start = item[0];
            var end = item[1];
            return end - start;
        });

        return $.Array.sum(list);

    }

    function log(name) {

        var time = get(name);

        if (time < 0) {
            Logger.debug('{0} : null', name);
            return;
        }

        var count = all[name].length / 2;
        var av = Math.floor(time / count);

        Logger.debug('{0} : t={1}, n={2}, a={3}', name, time, count, av);
    }


    return {
        all: all,

        add: add,
        get: get,
        log: log
    };


})();


/**
* 异常类。
* @namespace
*/
var Exception = (function ($) {

    /**
    * 获取一个异常对象。
    */
    function error(formater, v1, v2, v3) {

        var args = $.Array.parse(arguments);
        var msg = $.String.format.call(null, args);

        return new Error(msg);
    }

    return {
        error: error
    };

})(Haf);



/**
* 日志类
* @namespace
*/
var Logger = (function ($, console) {

    if (!console) {
        console = {
            log: function (s) {

            }
        };
    }


    var DEBUG = 1,
        INFO = 2,
        ERROR = 4,
        logLevel = 1;

    /**
    * @inner
    */
    function log($arguments) {

        var formater = $arguments[0];
        var args = Array.prototype.slice.call($arguments, 1);
        var msg = $.String.format(formater, args);

        console.log(msg);
    }

    return {

        /**
        * debug用于记录最详细的日志，主要用于开发期调试，是给开发人员看的。一般在产品发布时，不会输出
        * 调用前，需要首先调用isDebug判断一下
        * @param msg
        */
        debug: function (msg) {
            if (logLevel <= DEBUG) {
                log(arguments);
            }
        },

        /**
        * info用于记录程序逻辑的大致走向，带有一定的业务含义，产品发布后，需要输出
        * @param msg
        */
        info: function (msg) {
            if (logLevel <= INFO) {
                log(arguments);
            }
        },

        /**
        * error记录发生异常时的信息，必须记录
        * @param msg
        */
        error: function (msg) {

            log(arguments);
        },


        /**
        * 设置日志级别
        * @param level
        * 1:输出debug,info,error三个方法的日志
        * 2:输入info,error的日志
        * 4:只输入error日志
        */
        setLevel: function (level) {
            logLevel = level;
        },

        /**
        * 是否需要输出debug日志，增加此方法的目的是减少debug(msg)中msg的计算
        * @return {Boolean}
        */
        isDebug: function () {
            return logLevel <= DEBUG;
        }
    };


})(Haf, global.console);



/**
* 加载器
* @namespace
*/
var Loader = (function ($, Logger, App) {



    /**
    * 动态加载一个 js 文件，js文件的相对路径是 App 的根目录
    * @param jsFile
    */
    function load(jsFile) {

        Logger.debug('加载文件: {0}', jsFile);
        App.loadJS(jsFile); // native的加载方法
    }


    /**
    * 动态加载一个 className 指定的 js 文件
    * MyApp.view.Main==>app/view/Main.js
    * @param className
    */
    function loadClass(className) {

        var F = $.Object.namespace(global, className); //get
        if (F) { //已存在该类
            return;
        }

        var paths = className.split('.');
        paths[0] = 'app';

        var jsFile = paths.join('/') + '.js';

        App.loadJS(jsFile);
    }

    /**
    * 动态加载一个或多个class
    * @param className
    */
    function requires(className) {

        if (!className) {
            return;
        }

        if ($.Object.isArray(className)) {

            $.Array.each(className, function (item, index) {
                loadClass(item);
            });
        }
        else {
            loadClass(className);
        }
    }

    //Loader = 
    return {

        load: load,
        loadClass: loadClass,
        requires: requires
    };

})(Haf, Logger, Hae.App);



/**
* 硬件信息。
* @namespace
*/
var Device = (function ($, Device, ViewPort) {

    /**
    * HAE 需要返回的 Native 的硬件信息 Device，包括:
    * {
    *    cpu:800,          //单位Mhz
    *    mem:1024,         //单位M,
    *    os:'Android',     //操作系统:Android/iOS
    *    osVersion:'4.0',  //操作系统版本
    *    vendor:'sumsang', //设备厂商
    *    model:'galaxy s3',//设备型号
    *    density:1,        //屏幕密度，Android下取值0.75,1,1.5,2,iOS取值1,2
    *    screenInch:3.5,   //屏幕尺寸(对角线)，单位英寸
    *    getRotation:function(){}  //屏幕旋转角度，0~3,分别代表逆时针旋转的0,90,180,270度
    *    setRotation:function(rotation){}
    * },
    *
    * Viewport 为程序可以显示的区域
    * {
    *    absoluteWidth:320, //viewport的绝对宽度,单位px,iphone4s上按照640*960来算
    *    absoluteHeight:460,//viewport的绝对高度,单位px,和app.xml是否设置了状态栏有关
    * }
    */

    /**@inner*/
    var dpis = {
        "0.75": 'ldpi',
        "1": 'mdpi',
        "1.5": 'hdpi',
        "2": 'xhdpi'
    };

    return {

        /**
        * 获取设备的dpi，分四种:ldpi,mdpi,hdpi,xhdpi,分别和Android对应
        * 对于iOS，非视网膜屏对应mdpi，视网膜屏对应xhdpi
        */
        dpi: dpis[Device.density],

        /**
        * 设备的cpu频率，单位Mhz
        */
        cpu: Device.cpu,

        /**
        * 获取设备的物理内存
        */
        mem: Device.mem,

        /**
        * phone/pad
        */
        profile: Device.screenInch > 4.5 ? 'pad' : 'phone',

        /**
        * Android/iOS
        */
        os: Device.os,

        /**
        * 操作系统版本
        */
        osVersion: Device.osVersion,

        /**
        * 获取设备厂商信息
        */
        vendor: Device.vendor,

        /**
        * 返回设备型号，类似.iPhone4/S3等信息
        */
        model: Device.model,

        /**
        * 获取viewport的宽度,这里的单位为程序坐标！
        */
        viewportWidth: ViewPort.absoluteWidth / Device.density,

        /**
        * 获取viewport的高度,这里的单位为程序坐标！
        */
        viewportHeight: ViewPort.absoluteHeight / Device.density,

        /**
        * 将包含适配信息的路径替换为实际的路径
        * @image的写法时参照android的
        * res/@image/abc.png==>res/image-hdpi/abc.png
        * @param path
        */
        adapterPath: function (path) {
            return path.replace(/@(\w*)/g, function (m) {
                var v = m.replace('@', '');
                return v + '-' + dpis[Device.density];
            });
        }
    };


})(Haf, Hae.Device, Hae.ViewPort);


/**
* 元数据管理器，提供统一的方法来管理对象的中的私有数据。
* 内部使用的工具类。
* @namespace
*/
var Meta = (function ($) {

    var all = { };
    var name = '__guid__';

   

    /**
    * 获取指定对象中的 guid 值。
    */
    function getGuid(obj, autoAdd) {
        
        //优化 #1-0
        //if (!$.Object.isNonNull(obj)) { //空对象，即不能设置属性的对象
        //    return undefined;
        //}



        if (obj.hasOwnProperty(name)) { //只取自己的，不取继承下来的
            return obj[name];
        }

        if (autoAdd === true) {
            var guid = $.Guid.get(name, 'auto-guid_{0}');
            obj[name] = guid;
            return guid;
        }

        return undefined;
    }

    /**
    * 给指定对象设置 guid 值。
    */
    function setGuid(obj, guid) {
        obj[name] = guid;
    }


    /**
    * 给指定对象设置元数据。
    * @param {Object} obj 要设置元数据的目标对象。
    * @param {string} key 元数据的键名称。
    * @param value 元数据的值。
    * param {boolean} [isSafely=false] 是否安全的写入。
        默认为 false。 当指定为 true 时，采用不覆盖的方式进行写入。
        即只有目标对象不存在 key 所对应的元数据时，才会写入；否则忽略。
    */
    function set(obj, key, value, isSafely) {

        var guid = getGuid(obj, true);

        var list = all[guid];
        if (!list) {
            list = all[guid] = {};
        }

        if (typeof key == 'object') { //重载 key = { a:1, b:2 } 的情况，此时为 set(obj, maps, isSafely)

            //参数修正
            var maps = key;
            isSafely = value;

            if (isSafely) {
                $.Object.extendSafely(list, maps);
            }
            else {
                $.Object.extend(list, maps);
            }
        }
        else { // key 为字符串
            if (!isSafely || !(key in list)) {
                list[key] = value;
            }
        }

    }

    /**
    * 安全地设置(当不存在该元数据时，才会写入；否则忽略)
    */
    function setSafely(obj, key, value) {
        if ($.Object.isPlain(key)) {
            set(obj, key, true);
        }
        else {
            set(obj, key, value, true);
        }
    }


    /**
    * 获取指定对象的指定键所对应的值。
    * @param {Object|function} 要获取的关联对象。
    * @param {string} key 要获取的键。
    * @param [value] 如果指定，则表示当要获取的值不存在时，自动把该值添加进去。 
        如果已存在，则不覆盖。
    */
    function get(obj, key, value) {

        //如果指定了 value，则表示当不存在 key 对应的值时，自动把参数 value 添加进去
        var autoAdd = value !== undefined;

        var guid = getGuid(obj, autoAdd);
        if (!guid) {

            if (autoAdd) { //指定了要自动添加，但无法完成
                throw Haf.error('给参数 obj 分配 guid 失败，请确保 obj 为非空对象');
            }

            return undefined;
        }
        
        if (autoAdd) {
            setSafely(obj, key, value);
        }

        var list = all[guid];
        return list ? list[key] : undefined;

    }

    /**
    * 移除元数据。
    */
    function remove(obj, key) {

        var guid = getGuid(obj);
        if (!guid) { // obj 尚未有元数据
            return;
        }

        //未指定键，则移除全部
        if (key === undefined) {
            delete all[guid];
            return;
        }
        
        //否则只移除指定键的
        var list = all[guid];
        if (!list) {
            return;
        }

        delete list[key];
    }



    //静态方法
    return {
        get: get,
        set: set,
        setSafely: setSafely,

        getGuid: getGuid,
        setGuid: setGuid,
        remove: remove

        //for test
        , _all: all
    };

})(Haf);

//





/**
* 维护由 Haf.define 创建的类的列表。
* 内部使用的工具类。
* @namespace
*/
var ClassManager = (function ($, Haf, Loader, Meta) {

    var baseName = 'Haf.Base';
    var baseXtype = 'base';

    //Haf.define(className, data) 中的 data 中的具有特殊作用的保留字段。 
    var reservedFields = [ //为方便维护，请按升序存放。
        'abstract',
        'config',
        'configListeners',
        'extend',
        'listeners',
        'requires',
        'singleton',
        'statics',
        'xtype'
    ];

    //一对一的关系
    var name$data = {};         //维护 { className: data } 这样的原始集合
    var name$superName = {};    //维护 { className: 直接父类 className } 的关系
    var xtype$superXtype = {};  //维护 { xtype: 直接父类 xtype } 的关系
    var xtype$name = {};        //维护 { xtype: className } 的关系
    var name$class = {};        //维护 { className: constructor} 的关系，对 singleton 的特别有用
    var name$config = {};       //维护 { className: 自上而下合并后的 config } 的关系，实现字段继承

    //采用预先计算的技术，避免在需要时再去实时计算取结果。
    //因为 y = f(x)，当 x 确定时，y 也随之确定，可以先计算出结果放在 { x: y } 映射关系里维护起来。
    var name$familyDatas = {};  //维护 { className: [父类A.data, ... 当前类.data] } 的关系，其中 A 是 N 的父类
    var name$familyNames = {};  //维护 { className: [父类A.className, ... 当前类.className] } 的关系
    var xtype$familyXtypes = {};//维护 { xtype: [父类A.xtype, ... 当前类.xtype] } 的关系


    //一对多的关系
    var name$childNames = {};   //维护 { clasName: [直接子类className] } 的关系
    var xtype$childXtypes = {}; //维护 { xtype: [直接子类xtype] } 的关系


    


    /**
    * 建立起各种映射关系。
    * @param {string} className 类的名称
    * @param {Object} data 类的配置数据
    */
    function setData(className, data) {

        //维护 {xtype: className} 的关系
        var xtype = data.xtype;
        if (xtype) {
            if (xtype in xtype$name) {
                throw Haf.error('xtype: {0} 已给 {1} 类占用', xtype, xtype$name[xtype]);
            }

            xtype$name[xtype] = className;
        }


        var superName = data.extend || baseName;

        //维护 {className: data} 这样的原始集合
        data.extend = superName;
        name$data[className] = data;

        //维护 {className: config} 的集合。
        //父类的 config 与当前类的 config 进行合并，从而实现 config 字段的继承
        name$config[className] = $.Object.extend({}, name$config[superName], data.config);


        //维护 {className: superClassName} 的关系
        name$superName[className] = superName;



        name$familyDatas[className] = $.Array.add(name$familyDatas[superName], data);
        name$familyNames[className] = $.Array.add(name$familyNames[superName], className);


        //把当前类的 className 存入 name$childNames 对应的父类数组中
        name$childNames[superName] = $.Array.add(name$childNames[superName], className);


        if (xtype) { //创建类时指定了 xtype

            //找到父类的 xtype
            var superXtype = superName == baseName ?
                    baseXtype :
                    name$data[superName].xtype;

            xtype$superXtype[xtype] = superXtype;

            xtype$familyXtypes[xtype] = $.Array.add(xtype$familyXtypes[superXtype], xtype);


            //找到父类所关联的子 xtype 数组，并把当前的 xtype 添加进去。
            xtype$childXtypes[superXtype] = $.Array.add(xtype$childXtypes[superXtype], xtype);
            
        }

        //给每个方法分配一个 guid 和元数据。
        //这会对方法产生一个字段的污染，但不影响使用。
        $.Object.each(data, function (key, fn) {
            if (typeof fn != 'function') {
                return;
            }

            var guid = $.String.format('{0}.{1}', className, key);

            Meta.setGuid(fn, guid);

            //设置元数据
            Meta.set(fn, {
                'className': className,
                'methodName': key
            }); 
        });
    }

    /**
    * 获取指定类的类定义数据。
    * 该方法可以获取 Haf.define(className, data) 中的 data 对象。
    * @param {string} className 要获取的类的名称。
    * @param {number} [upLevel=0] 相对于 className 所在的类(当前类)，沿着继承层次向上的层数。
        当前类为 0；当前类的父类为 1；当前类的父类的父类为 2；依次类推。
    * @return {Object} 返回类定义时的数据对象。
        如果不存在该类对应的定义数据，则返回一个默认的对象。
    */
    function getData(className, upLevel) {

        //传进来的是一个实例，则默认取其 className 元数据
        if (typeof className == 'object') {
            className = Meta.get(className, 'className');
        }


        upLevel = upLevel || 0; //向上追着

        while (upLevel > 0) { //向上追溯的层次
            className = name$superName[className];
            upLevel--;
        }

        return name$data[className] || {
            extend: baseName,
            requires: [],
            config: {},
            statics: {}
        };
    }

    /**
    * 获取指定 xtype 所对应的类定义数据。
    * 该方法可以获取 Haf.define(className, data) 中的 data 对象。
    * @param {string} xtype 要获取的类的 xtype。
    * @param {number} [upLevel=0] 相对于 xtype 所在的类(当前类)，沿着继承层次向上的层数。
        当前类为 0；当前类的父类为 1；当前类的父类的父类为 2；依次类推。
    * @return {Object} 返回类定义时的数据对象。
        如果不存在该类对应的定义数据，则返回一个默认的对象。
    */
    function getDataByXtype(xtype, upLevel) {

        var className = xtype$name[xtype]; //xtype -> className

        if (!className) {
            throw Haf.error('不存在 xtype 为 {0} 的类', xtype);
        }

        return getData(className, upLevel);
    }

    /**
    * 关联一个类名和构造函数。
    */
    function setClass(className, constructor) {

        name$class[className] = constructor; //内部维护一份关系: 类名 -> 构造器
        $.Object.namespace(global, className, constructor); //set
        return constructor;
    }

    /**
    * 通过类名获取该类的构造器。
    * 该类必须是通过 Haf.define 的方式定义实现的。
    * 当不存在该类，则尝试用同步方式动态加载并返回该类的构造器。
    * @param {string} className 要加载的类的完全名称。
    * @param {int} [upLevel=0] 向上追溯的层次。
        0: 表示当前类; 
        1: 表示父类;
        2: 表示父类的父类;
        依次类推
    * @return {Function} 返回该类的构造器。
    */
    function getClass(className, upLevel, autoLoad) {

        switch (typeof upLevel) {

            case 'undefined': //此时为  getClass(className)
                upLevel = 0; //向上追溯
                autoLoad = true;
                break;

            case 'number':  //此时为 getClass(className, upLevel) 或 getClass(className, upLevel, autoLoad)
                if (autoLoad === undefined) { //此时为 getClass(className, upLevel)
                    autoLoad = true;
                }
                break;

            case 'boolean': //此时为 getClass(className, autoLoad)
                autoLoad = upLevel;
                upLevel = 0;
                break;

            default:
                throw Haf.error('无法识别参数 upLevel 的类型');
        }

        while (upLevel > 0) { //向上追溯的层次
            className = name$superName[className];
            upLevel--;
        }

        // 这里用原始的，可以获取到 singleton 的构造器。
        // 而 $.Object.namespace(global, className) 会获取到 singleton 的实例，而不是构造器。
        // 另外，Haf.Base 不在 name$class 的列表中，而 $.Object.namespace(global, className) 是可以获取到 Haf.Base 的。
        var F = name$class[className] || $.Object.namespace(global, className);
        if (!F && autoLoad) {

            Loader.loadClass(className);
            F = name$class[className] || $.Object.namespace(global, className);
        }

        return F;
    }

    


    /**
    * 根据配置数据去创建当前类的 prototype 实例
    */
    function createPrototype($data) {

        var className = $data.extend;   //父类的类名称

        var prototype;
        if (className == 'Haf.Base') {
            prototype = new Haf.Base();
        }
        else {
            var data = getData(className);  //父类的配置数据
            var F = getClass(className);    //父类的构造器，会去同步地动态加载(如果还没有)
            prototype = new F(data.config, true);
        }

        //移除保留的成员，只保留用户自定义的成员。
        var props = $.Object.remove($data, reservedFields);

        //把当前类的其他成员拷到原型对象上，从而实现继续和重写(同名的覆盖)
        $.Object.extend(prototype, props);

        return prototype;
    }

   
    /**
    * 给指定实例的 config 中的成员绑定事件处理函数。
    */
    function bindConfigListeners(self, listeners) {
        
        //这里只对 listeners 作迭代，而不是去迭代 config。
        //因为 listeners 包含的成员是 config 的成员的一个子集，从而可以减少迭代次数。
        $.Object.each(listeners, function (key, item) {

            if ($.Object.isArray(item)) { //优化 #3-0
                $.Array.each(item, function (item, index) {
                    bind(item);
                });
            }
            else {
                bind(item);
            }

            //内部的公用函数
            function bind(item) {

                if (typeof item == 'function') {

                    self.onchange(key, item);
                }
                else if ($.Object.isPlain(item)) {

                    var when = item.when;
                    if (when == 'before') {
                        self.onbeforechange(key, item.fn);
                    }
                    else if (when == 'after') {
                        self.onchange(key, item.fn);
                    }
                    else {
                        throw new Error('未识别的 when 字段: ' + when);
                    }
                }
                else {
                    throw new Error('未识别的配置成员值: ', +key);
                }
            }
            
        });
    }



    /**
    * 判断指定的对象是否为指定类的实例。
    * 该方法会检测指定类及原型链上的类。
    * @param {Object} obj 要进行检测的对象。
    */
    function isInstanceOf(obj, className) {

        if ( !obj || typeof obj != 'object' ) {
            return false;
        }

        var type = typeof className;

        //构造器
        var F = type == 'string' ? getClass(className) :
            type == 'function' ? className : null;

        if (!F) {
            return false;
        }

        return obj instanceof F;
    }



    
    

    //ClassManager = 
    return {


        /**
        * 获取指定 className 的所有父类的 className，返回一个数组(包括自己)。
        * 该方法从继承层次上向上搜索所有父类的 className，但不包括根类 Haf.Base。
        */
        getFamilyNames: function (className) {
            return name$familyNames[className];
        },

        /**
        * 获取指定 xtype 的所有父类的 xtype，返回一个数组
        * 该方法从继承层次上向上搜索所有父类的 xtype，但不包括根类 Haf.Base。
        */
        getFamilyXtypes: function (xtype) {
            return xtype$familyXtypes[xtype];
        },


        getChildXtypes: function(xtype) {
            return xtype$childXtypes[xtype];
        },

        setData: setData,
        getData: getData,

        getDataByXtype: getDataByXtype,

        getClassNameByXtype: function (xtype) {
            return xtype$name[xtype];
        },

        getConfig: function (className) {
            var config =  name$config[className];
            return $.Object.extend({}, config); //拷贝一份，因为类的 config 是共用的，不能直接暴露出去
        },

        getFamilyListeners: function (className) {
            var datas = name$familyDatas[className];
            var a = $.Array.map(datas, function (data, index) {
                return data.listeners || null;
            });

            return a.length > 0 ? a : null;
        },

        getFamilyConfigListeners: function (className) {
            var datas = name$familyDatas[className];
            var a = $.Array.map(datas, function (data, index) {
                return data.configListeners || null;
            });
            return a.length > 0 ? a : null;
        },

        setClass: setClass,
        getClass: getClass,

        /**
        * 判断指定的类是否为单实例的类。
        */
        isSingleton: function (className) {

            var data = name$data[className];
            if (!data) {
                return false;
            }

            return data.singleton === true;
        },


        createPrototype: createPrototype,
        bindConfigListeners: bindConfigListeners,

        isInstanceOf: isInstanceOf,

        noInitialize: function() {
            throw Haf.error('initialize 方法仅允许在类的定义中给调用，且只允许调用一次。');
        },

        getXtypeTree: function () {
            return $.Object.map(xtype$childXtypes, function (key, item) {
                return item.slice(0);
            });
        },

        getClassTree: function () {
            return $.Object.map(name$childNames, function (key, item) {
                return item.slice(0);
            });
        }
    };



})(Haf, Haf, Loader, Meta); //结束内部使用的 ClassManager


//

/**
* 针对创建类的事件通知
* @namespace
*/
var ClassEvent = (function ($, ClassManager) {

    var guid = 'ClassEvent.eventTarget.' + $.String.random();

    //为了提高事件绑定速度
    var eventTarget = {
        toString: function () {
            return guid;
        }
    };


    function ondefine(className, fn) {

        var eventName = 'defineClass:';

        var type = typeof className;
        if (type == 'function') { //此时为 ondefine(fn)
            fn = className;
            className = undefined;
        }
        else if (type == 'string') {
            eventName += className;
        }
        else {
            throw Haf.error('无法识别参数 className 的类型');
        }

        $.Event.bind(eventTarget, eventName, fn);


        if (className) { //此时为 ondefine(className, fn)
            var F = ClassManager.getClass(className, false); //这里不要自动去加载类

            if (F) { //已经定义了该类，立即触发
                var data = ClassManager.getData(className);
                fn(data, className); //这里不用 trigger(className)，因为这样会把别的 handler 也触发

                trigger(); //触发总事件
            }
        }

    }

    //仅供 define 方法内部调用
    function trigger(className) {

        var args;

        if (className) {

            var F = ClassManager.getClass(className, false);
            if (!F) {
                throw Haf.error('不存在 className 为 {0} 的类', className);
            }

            var data = ClassManager.getData(className);
            args = [data, className];
            $.Event.trigger(eventTarget, 'defineClass:' + className, args);
        }

        //最后触发总事件
        $.Event.trigger(eventTarget, 'defineClass:', args);

    }



    function ondefinextype(xtype, fn) {

        var eventName = 'defineXtype:';

        var type = typeof xtype;
        if (type == 'function') { //此时为 ondefinextype( fn )
            fn = xtype;
            xtype = undefined;
        }
        else if (type == 'string') {
            eventName += xtype;
        }
        else {
            throw Haf.error('无法识别参数 xtype 的类型');
        }

        $.Event.bind(eventTarget, eventName, fn);

        if (xtype) { //此时为 ondefinextype(xtype, fn)

            var className = ClassManager.getClassNameByXtype(xtype);
            if (className) { //已经定义了该 xtype，立即触发
                var data = ClassManager.getData(className);
                fn(data, className); //这里不用 triggerXtype(xtype)，因为这样会把别的 handler 也触发
                triggerXtype(); //触发总事件
            }
        }
    }

    //仅供 define 方法内部调用
    function triggerXtype(xtype) {

        var args;

        if (xtype) {

            var className = ClassManager.getClassNameByXtype(xtype);
            if (!className) {
                throw Haf.error('不在存在 xtype 为 {0} 的类', xtype);
            }

            var data = ClassManager.getData(className);
            args = [data, className];

            $.Event.trigger(eventTarget, 'defineXtype:' + xtype, args);
        }

        //最后触发总事件
        $.Event.trigger(eventTarget, 'defineXtype:', args);

    }

    return {
        trigger: trigger,
        ondefine: ondefine,
        triggerXtype: triggerXtype,
        ondefinextype: ondefinextype
    };
})(Haf, ClassManager);

/**
* 提供类的定义和创建实例的工具类。
* @namespace
*/
var Class = (function ($, Haf, ClassManager, ClassEvent, Loader, Logger, Meta) {


    /**
    * 定义一个类。
    * @param {string} className 类的名称，可以包括命名空间。
    * @param {Object} data 配置数据。 保留的字段名：
        'abstract': true/false，表示是否为抽象类，只能用字符串引起来；
        config: {}，字段成员，实例化后可以通过 set/get 进行存取，并会触发相应的 onbeforechange 和 onchange 事件；
        configListeners: {}，针对 config 中的成员的 onbeforechange 和 onchange 事件处理函数；
        extend: string，要继承的父类完全名称；
        listeners: {}，自定义事件处理函数，实例化可以通过 trigger(eventName) 来触发；
        requires: string|[]，依赖的类，会先加载依赖项；
        singleton: true/false，表示是否为单实例，如果为 true，则在定义好类之后立即创建一个实例覆盖类变量；
        statics: {}，类的静态成员；
        xtype: string，类的简短别名，具有唯一性，即一个 xtype 只能用于一个类；

    * @return {function} 返回类的构造函数。
    */
    function define(className, data) {


        if (data.extend) { //先加载父类(如果有)
            Loader.loadClass(data.extend);
        }
        else { //未指定父类，则默认为 Haf.Base(不需要加载)
            data.extend = 'Haf.Base'; //这里修改了原始数据，但影响不大。
        }

        if (data.requires) { //先加载依赖的类(如果有)
            Loader.requires(data.requires);
        }


        //必须先让父类加载进来，因为当前类的 config 会用到父类的 config
        ClassManager.setData(className, data);  //把原始数据维护起来


        var listeners = ClassManager.getFamilyListeners(className);
        var configListeners = ClassManager.getFamilyConfigListeners(className);
        var isAbstract = data['abstract'] === true;
        
        // isInnerCall: 
        //  undefined: 创建普通实例时当前类的调用，即通过 Haf.create() 的调用;
        //  true: 创建原型实例时的调用，即通过 ClassManager.createPrototype(data) 的调用;

        //当前类的构造器
        var F = ClassManager.setClass(className, function (config, isInnerCall) {

            //只针对当前类，忽略原型和父类。 abstract 是关键字，在 hae 中会引起错误
            if (isAbstract && !isInnerCall) {
                throw Haf.error('{0} 是一个抽象类，不能创建它的实例。', className);
            }

            //分配 guid
            var guid = className + ':' + $.Guid.next(className) + '/' + $.Guid.next('totalInstance');
            Meta.setGuid(this, guid);
            Meta.set(this, 'className', className);
            

            //实例字段
            this.config = ClassManager.getConfig(className); //获取当前类的 config (已与父类的 config 合并)
            this.xtype = data.xtype; // xtype 只属于实例自己的，不在原型上，不具有继承特性


            //创建普通实例时
            if (!isInnerCall) { //创建原型实例时，不需要绑定实例事件和字段事件

                var self = this;

                if (listeners) { //实例事件
                    $.Array.each(listeners, function (item, index) {
                        self.on(item);
                    });
                }

                if (configListeners) { //字段事件
                    $.Array.each(configListeners, function (item, index) {
                        ClassManager.bindConfigListeners(self, item);
                    });
                }

                this.initialize(config);
                this.initialize = ClassManager.noInitialize; //重写，不允许再调用 initialize

            }

            //Logger.debug('创建实例: {0}', guid);

        });

        var prototype = ClassManager.createPrototype(data); //创建原型，会动态加载父类
        prototype.constructor = F; //修正构造器

        //链接原型
        F.prototype = prototype;

        //静态成员
        var statics = data.statics;
        if (statics) {
            $.Object.extend(F, statics);
        }

        Meta.setGuid(F, className);

        //通知外部 define 完成
        ClassEvent.trigger(className);

        if (data.xtype) { //外部请不要同时绑定 className 和 xtype 的，否则都会触发
            ClassEvent.triggerXtype(data.xtype);
        }

        //Logger.debug('定义类: {0}', className);


        //单实例，用创建出来的实例覆盖类名。
        if (data.singleton === true) {
            return $.Object.namespace(className, new F(data.config));
        }

        return F; //返回创建出来的类构造器
    }


    /**
    * 创建指定类的实例。
    * @param {string} [className] 要创建的类名。
        如果不指定类名，则使用参数 config 中的 xtype 或 xclass 来创建。
    * @param {Object} config 实例的数据成员。
    * @return {Object} 返回指定类的实例。
    */
    function create(className, config) {

        if (typeof className == 'object') { //此时为 { xtype: '' }
            config = className;

            var xtype = config.xtype;
            var xclass = config.xclass;

            if (xclass) {
                className = xclass;
            }
            else if (xtype) {
                className = ClassManager.getClassNameByXtype(xtype);
                if (!className) {
                    throw new Haf.error('不存在 xtype 为 {0} 的类', xtype);
                }
            }
            else {
                throw new Haf.error('通过 config 对象创建实例时，必须指定 xtype 或 xclass');
            }
        }

        //if (ClassManager.isSingleton(className)) {
        //    throw Haf.error('{0} 是一个单实例的类，无法创建它的实例。', className);
        //}

        var F = ClassManager.getClass(className); //
        var obj = new F(config || {});
        return obj;
    }


    //Class = 
    return {

        define: define,
        create: create
    };

})(Haf, Haf, ClassManager, ClassEvent, Loader, Logger, Meta);




; (function ($, Haf, Meta, ClassManager) {




/**
* Haf 框架的基类，提供最基本的方法和能力。
* @class Haf.Base
*/
Haf.Base = function () { 

};



Haf.Base.prototype = {

    constructor: Haf.Base, //修正构造器
    
    xtype: 'base', //为了统一

    /**
    * 获取当前实例的真实类型。
    * 返回一个类的字符串描述。
    */
    getType: function () {
        return Meta.get(this, 'className');
    },

    /**
    * 获取本实例的全局唯一标识符。
    * 该标识符在创建实例时自动分配的。
    */
    getGuid: function () {
        return Meta.getGuid(this);
    },

    /**
    * 获取 config 对象中指定成员的值。
    * 本方法为针对 config 对象中的成员的 getter 方法。
    */
    get: function (key) {
        return this.config[key];
    },

    /**
    * 设置 config 对象中指定成员的值。
    * 该方法针对 config 对象中的成员的 setter 方法。
    * 会触发成员的 onbeforechange 和 onchange 事件(除非在调用时指定了安静模式)。
    * @param {string|Object} fieldName 要设置的成员的名称。
        当要进行批量设置时，可传入一个 key-value 的对象。
    * @param [newValue] 要设置的成员的值。
    * @param {boolean} [isQuiet=false] 是否采用安静模式。
        若指定为 true，则表示采用安静模式，不触发任何事件。
    */
    set: function (fieldName, newValue, isQuiet) {

        var isBatch = typeof fieldName == 'object';
        if (isBatch) { //此时为 set({}, isQuiet);
            isQuiet = newValue; //参数修正
            newValue = undefined;
        }

        var config = this.config;

        if (isQuiet === true) { //安静模式，不触发事件。
            if (isBatch) {
                $.Object.extend(config, fieldName);
            }
            else {
                config[fieldName] = newValue;
            }
            return;
        }


        var self = this;
        var hasAnyChange = false; //指示是否有字段的值发生了改变
        var oldConfig = $.Object.extend({}, config); //设置前，拷贝一份作为旧的

        if (isBatch) { // 此时为 set({}, isQuiet);
            $.Object.each(fieldName, set);
        }
        else { //单个的情况
            set(fieldName, newValue);
        }

        if (hasAnyChange) { //最后触发总事件
            self.trigger('change:', [config, oldConfig]); //全部字段
        }
        

        //一个共用的内部方法：只针对单项，并且会触发事件。
        function set(fieldName, newValue) {

            var oldValue = self.get(fieldName);
            var finalValue = newValue;

            var beforeEventName = 'beforechange:' + fieldName;

            if ($.Event.has(self, beforeEventName)) { //已绑定了 beforechange 事件

                //最后一个处理函数的返回值就是最终的返回值
                finalValue = self.trigger(beforeEventName, [newValue, oldValue]);

                //事件处理器返回 undefined，则使用回原来的值
                if (finalValue === undefined) {
                    finalValue = oldValue;
                }
            }

            //只有有一个字段发生了变化，hasAnyChange 就一直保持为 true。
            hasAnyChange = hasAnyChange || (finalValue !== oldValue); 

            //值发生改变
            if (finalValue !== oldValue) { //这里不能用 hasAnyChange，因它可能是上个字段的结果。
                config[fieldName] = finalValue;
                self.trigger('change:' + fieldName, [finalValue, oldValue]); //指定字段
            }
        }

    },

    
    /**
    * 调用父类的指定方法，参数传递形式为类似 call。
    * 只能由具有继承关系的实例方法去调用，而且调用方式为 this.callSuper(arguments)
    */
    callSuper: function ($arguments) {

        var caller = $arguments.callee;
        var className = Meta.get(caller, 'className');
        //if (!className || !ClassManager.isInstanceOf(this, className)) {
        //    throw Haf.error('callSuper 必须在同一个类体系中的实例方法内被调用');
        //}
        
        //下面的逻辑才是真正的主流程
        var SuperClass = ClassManager.getClass(className, 1); //取得父类的构造函数
        
        var methodName = Meta.get(caller, 'methodName');

        //这里一定要从原型上取得方法引用，因为这样可以使用继承特性。
        //不能从原始的 data 中取，因为该 data 是孤立的，它可能不包含该方法。
        var fn = SuperClass.prototype[methodName]; //可能是 SuperClass 自己的方法，也可能是继承下来的。

        if (!fn) {
            throw Haf.error('父类中不存在名为 {0} 的方法', methodName);
            return;
        }

        //var args = $.Array.parse(arguments).slice(1);
        var args = Array.prototype.slice.call(arguments, 1);
        return fn.apply(this, args);
        
    },

    /**
    * 给 config 对象中的成员绑定一个 beforechange 事件。
    * 该事件会在 config 对象中的成员的值更新前触发，
    * 事件处理函数必须返回一个值作为该成员最终的值，否则继续使用原来的新值。
    */
    onbeforechange: function (key, fn) {

        var self = this;
        var $Event = $.Event;

        if ($.Object.isPlain(key)) { //针对 { a: fnA, b: fnB } 批量设置的情况

            var maps = key; //换个名称更容易理解

            $.Object.each(maps, function (key, fn) {
                $Event.bind(self, 'beforechange:' + key, fn);
            });
        }
        else {
            $Event.bind(self, 'beforechange:' + key, fn);
        }

    },

    /**
    * 给 config 对象中的成员绑定一个 change 事件。
    * 该事件会在 config 对象中的成员的值更新后触发，以前通知值已更新。
    */
    onchange: function (key, fn) {

        var self = this;

        if ($.Object.isPlain(key)) { //重截 { a: fnA, b: fnB } 批量设置的情况

            var maps = key; //换个名称更容易理解

            $.Object.each(maps, function (key, fn) {
                $.Event.bind(self, 'change:' + key, fn);
            });
        }
        else if (typeof key == 'function') { //重载 onchange(fn) 的情况

            fn = key;
            $.Event.bind(self, 'change:', fn);
        }
        else if ($.Object.isArray(key)) {

            var keys = $.Array.toObject(keys, keys); // 建立起 {a:'a', b:'b'} 这样的关系，可避免搜索数组
            $.Event.bind(self, 'change:', function (newConfig, oldConfig) {
                $.Object.each(newConfig, function (key, value) {
                    if (key in keys) {
                        fn.call(self, newConfig, oldConfig);
                        return false; //break;
                    }
                });
            });
        }
        else {
            $.Event.bind(self, 'change:' + key, fn);
        }

    },

    /**
    * 给本实例绑定事件处理函数。
    * @param {Object|string} eventName 要绑定的事件名称。
        如果为 Object，则表示批量绑定。
    * @param {function} handler 事件处理函数，函数内部的 this 指向本实例。
    * @param {boolean} [isOnce=false] 指示是否只执行一次事件处理函数，
        如果指定为 true，则执行事件处理函数后会将该处理函数从事件列表中移除。
    */
    on: function (eventName, handler, isOnce) {

        var self = this;

        if (typeof eventName == 'object') { //此时为 on( {...}, isOnce );

            var listeners = eventName;
            isOnce = handler;
            handler = undefined;

            $.Object.each(listeners, function (key, value) {

                if (typeof value == 'function') { //此时为 { eventName: fn }
                    self.bind(key, value, isOnce);
                }
                else if (typeof value == 'object') { //此时为 { eventName: {...} }
                    var fn = value.fn;
                    if (typeof fn != 'function') {
                        throw Haf.error('成员 {0} 的值为一个对象时，必须指定该对象中的 fn 为一个函数', key);
                    }
                    var single = 'single' in value ? value.single : isOnce;
                    self.bind(key, fn, single);
                }
                else {
                    throw Haf.error('无法识别 key 为 {0} 的所对应的值', key);
                }
            });
        }
        else {
            self.bind(eventName, handler, isOnce);
        }
       

    },

    /**
    * 绑定单个事件。
    * 这是一个模板方法，此处提供一个默认实现。
    * 当子类想在 on 绑定事件时，请覆盖本方法。
    */
    bind: function (eventName, handler, isOnce) {
        $.Event.bind(this, eventName, handler, isOnce);
    },


    /**
    * 给本实例解除绑定事件处理函数。
    * @param {string} [eventName] 要解除绑定的事件名称。
        如果不指定，则移除所有的事件。
    * @param {function} [handler] 要解除绑定事件处理函数。
        如果不指定，则移除 eventName 所关联的所有事件。
    */
    off: function (eventName, handler) {
        $.Event.unbind(this, eventName, handler);
    },

    /**
    * 给本实例绑定一次性的事件处理函数。
    * @param {string} eventName 要绑定的事件名称。
    * @param {function} handler 事件处理函数，函数内部的 this 指向本实例。
    */
    once: function (eventName, handler) {
        this.on(eventName, handler, true);
        //$.Event.once(this, eventName, handler); //不要用这个，因为子类可能会在 bind 中有自己的实现
    },

    /**
    * 触本实例上的特定类型事件。
    * @param {string} eventName 要触发的事件名称。
    * @param {Array} [args] 要向事件处理函数传递的参数数组。
    * @return 返回最一后一个事件处理函数的返回值。
    */
    trigger: function (eventName, args) {
        return $.Event.trigger(this, eventName, args);
    },

    /**
    * 获取本实例的字符串描述。
    * 默认返回本实例的 guid，在 Mapper 中会用到该 guid 以产生良好的分布。
    * 如果子类要重写该方法，请确保每次调用都会返回相同的字符串值，否则在事件绑定与触发时可能会产生异常。
    */
    toString: function () {
        return Meta.getGuid(this);
    },

    


    /**
    * 提供默认的初始化方法，会在创建实例时调用。
    * 子类如果要执行自己的操作，请覆盖本方法，并且显式调用 this.callSuper(arguments, config)。
    */
    initialize: function (config) {

        $.Object.extend(this.config, config);
    },

    /**
    * 销毁本实例，同时执行一些清理操作。
    * 该方法会释放所有关联的资源，包括元数据和事件。
    * 子类如果要执行自己的操作，请覆盖本方法，并且务必要调用 this.callSuper(arguments) 来执行清理操作。
    */
    dispose: function () {

        Meta.remove(this);  //1, 移除关联的元数据
        this.off();         //2, 移除绑定的事件

        //3, 如果是组件，要从组件树中清理，并且要调用 native 的清理操作
    },

    /**
    * 调用本实例中的 config 中指定的方法。
    * 方法中的 this 会指向当前实例。
    */
    invoke: function (methodName) {

        var fn = this.get(methodName);
        if (typeof fn != 'function') {
            throw Haf.error('不存在名为 {0} 的方法', methodName);
        }

        var args = $.Array.parse(arguments).slice(1);
        return fn.apply(this, args);
    }


};

})(Haf, Haf, Meta, ClassManager);


//
; (function (global, Haf, $, ClassManager, ClassEvent) {



/**
* HAF: Hybrid Application Framework
* 混合应用框架，一个基于手机端 App 开发的纯 JavaScript 框架，提供一整套功能丰富的 API。
* 
*/


//创建快捷方式，并且把所有要暴露出去的集中这里。
$.Object.extend(Haf, {

    define: Class.define,
    create: Class.create,

    //ondefine: ClassEvent.ondefine,
    //ondefinextype: ClassEvent.ondefinextype,

    error: Exception.error,
    load: Loader.load,

    Device: Device,
    Loader: Loader,
    Logger: Logger,

    Timer: Timer,
    
    getClassTree: ClassManager.getClassTree,
    getXtypeTree: ClassManager.getXtypeTree,

    /**
    * 一个可复用的空函数和透传函数。
    */
    noop: function (value) {
        return value;
    }

    
});




})(global, Haf, Haf, ClassManager, ClassEvent);



/**
* 颜色工具。
* 提供一份命名的颜色值，某些颜色名称在 native 层是不支持的。
* @namespace
*/
var Colors = (function ($) {
    
    //要增加条目，请把名称转成小写，并且按升序进行存放。
    var list = {

        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dodgerblue: '#1e90ff',
        feldspar: '#d19275',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgrey: '#d3d3d3',
        lightgreen: '#90ee90',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslateblue: '#8470ff',
        lightslategray: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370d8',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#d87093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        violetred: '#d02090',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    var colors = $.Object.getValues(list);


    //解析 rgb(11, 22, 33) 这样的格式
    function parseRGB(s) {

        var rgb = $.String.removeAll(s, ['rgb', '(', ')']).split(',');

        if (rgb.length != 3) {
            throw Haf.error('非法的 rgb 格式：{0}', s);
        }

        rgb = $.Array.map(rgb, function (item, index) {
            item = parseInt(item, 10);

            if (0 <= item && item <= 255) {
                item = item.toString(16);
                return $.String.padLeft(item, 2, '0');
            }

            throw Haf.error('非法的 rgb 值：', item);

        });

        return '#' + rgb.join('');

    }

    //解析 rgba(11, 22, 33, 44) 这样的格式
    function parseRGBA(s) {

        var rgba = $.String.removeAll(s, ['rgba', '(', ')']).split(',');

        if (rgba.length != 4) {
            throw Haf.error('非法的 rgba 格式：{0}', s);
        }

        rgba = $.Array.map(rgba, function (item, index) {
            item = Number(item);

            if (0 <= item && item <= 255) {
                item = item.toString(16);
                return $.String.padLeft(item, 2, '0');
            }

            throw Haf.error('非法的 rgba 值：', item);

        });

        return '#' + rgba[3] + rgba.slice(0, 3).join('');
    }

    function get(color, opacity) {

        if (!color || typeof color != 'string') {
            return color;
        }

        color = color.toLowerCase();

        color = list[color] ? list[color] :
            $.String(color).contains(['rgba', '(', ')']) ? parseRGBA(color) :
            $.String(color).contains(['rgb', '(', ')']) ? parseRGB(color) : color;

        if (opacity !== undefined) {
            opacity = $.Math.parsePercent(opacity);

            if (isNaN(opacity) || opacity < 0 || opacity > 1) {
                throw Haf.error('参数 opacity 的值非法: {0}', opacity);
            }

            opacity = Math.floor(opacity * 256).toString(16);

            if (opacity.length < 2) {
                opacity = $.String.padLeft(opacity, '0', 2);
            }

            color = '#' + opacity + color.slice(color.length == 9 ? 3 : 1);
        }

        return color;

    }

    function random() {
        return $.Array.randomItem(colors);
    }



    return {
        get: get,
        random: random
    };


})(Haf);



/**
* 复合样式工具类。
* 内部工具。
* @namespace
*/
var CompositeStyle = (function ($, Colors) {

    
    var fields = [
        'border',
        'background'
    ];


    /**
    * 分解复合的 border 样式值
    */
    function decomposeBorder(obj) {

        var border = obj.border;

        if (border === 0 || border === '0') {
            obj.borderWidth = 0;
            return;
        }

        if (!border) {
            return;
        }

        border = $.Array.toObject(border.split(' '), {
            'borderStyle': 0,
            'borderWidth': 1,
            'borderColor': 2
        });

        border = $.Object.trim(border);

        var width = border.borderWidth;
        if (width) { //string
            border.borderWidth = parseInt(width, 10);
        }

        var color = border.borderColor;
        if (color) {
            border.borderColor = Colors.get(color) || color;
        }

        $.Object.extend(obj, border);
    }

    /**
    * 分解复合的 background 样式值
    */
    function decomposeBackground(obj) {

        var background = obj.background;
        if (!background) {
            return;
        }

        background = $.Array.toObject(background.split(' '), {
            'backgroundColor': 0,
            'backgroundImage': 1,
            'backgroundImageStyle': 2
        });

        background = $.Object.trim(background);

        var color = background.backgroundColor;
        if (color) {
            background.backgroundColor = Colors.get(color) || color;
        }

        $.Object.extend(obj, background);
    }

    function normalizeMargin(obj) {

        var margin = obj.margin;

        if (margin === 0 || margin === '0') {
            obj.margin = 0;
            return;
        }

        if (!margin) {
            return;
        }

        margin = String(margin).split(' ', 4);
        var len = margin.length;

        if (len == 2) {
            margin = margin.concat(margin); //['a', 'b'] --> ['a', 'b', 'a', 'b'];
        }
        else if (len == 3) {
            margin.push(margin[1]); // ['a', 'b', 'c'] --> ['a', 'b', 'c', 'b'];
        }

        obj.margin = $.Array.map(margin, function (item, index) {

            return parseInt(item, 10);

        }).join(',');
    }


    function removeStyles(obj) {
        return $.Object.remove(obj, fields);
    }

    function filterStyles(obj) {
        return $.Object.filter(obj, fields);
    }

    //CompositeStyle = 
    return {

        border: {
            decompose: decomposeBorder
        },

        background: {
            decompose: decomposeBackground
        },

        margin: {
            normalize: normalizeMargin
        },

        removeStyles: removeStyles,
        filterStyles: filterStyles
    };

    


})(Haf, Colors);



/**
* 组件样式工具类。
* 内部工具。
* @namespace
*/
var ComponentStyle = (function ($, ClassManager, CompositeStyle, Logger) {


    //样式的字段名称，请按升序排列
    var fields = [
        'align',
        'align2container',
        'backgroundColor',
        'backgroundImage',
        'backgroundImageStyle',
        'borderColor',
        'borderRadius',
        'borderStyle',
        'borderWidth',
        'boxShadow',
        'disabled',
        'display', //取值: show|none|hidden
        'dock',
        'flex',
        'font',
        'fontColor',
        'fontSize',
        'fontStyle',
        'height',
        'margin',
        'padding',
        'textShadow',
        'valign',
        'valign2container',
        'width'
    ];



    //以 fields 中的项作为键，值为 null 组装成一个 {}
    var empty = $.Array.toObject(fields, function (item, index) {
        return [item, null];
    });


    //维护一份合并后的　{xtype: style} 集合。
    //style 是由 Haf.style() 和 Haf.define() 的合并结果。
    var xtype$style = {};
    var class$style = {};



    ////监听 xtype 创建事件。 当有 xtype 被创建时触发。
    ////即当通过 Haf.define() 创建了一个带有 xtype 的类时，会触发本事件。
    //Haf.ondefinextype(function (data, className) {

    //    var xtype = data.xtype;

    //    if (!xtype) {
    //        return;
    //    }

    //    var style = makeFinalStyle(xtype);
    //    set(xtype, style);

    //});


    /**
    * 根据给定的 xtype，沿着继承层次向上获取所有的样式，合并并返回当前类的最终样式。
    */
    function makeFinalStyle(xtype) {

        Timer.add('ComponentStyle.makeFinalStyle');


        var list = ClassManager.getFamilyXtypes(xtype); //获取所有的 xtype (包括自己)

        //根据类的继承链，按序获取得相应样式，优先级高的在后面
        list = $.Array.keep(list, function (item, index) {
            return xtype$style[item];
        });

        var style = {};
        var args = [style].concat(list);
        style = $.Object.extend.apply(null, args);

        Timer.add('ComponentStyle.makeFinalStyle');

        return style;
    }

    /**
    * 规格化。
    * 把复合的样式值分解成 native 层所接受的格式。
    */
    function normalize(obj) {

        Timer.add('ComponentStyle.normalize');

        //解析 { border: 'solid 1 red' } 这样的字符串
        if ('border' in obj) {
            CompositeStyle.border.decompose(obj);
        }

        //解析 { backgound: 'red' } 这样的字符串
        if ('background' in obj) {
            CompositeStyle.background.decompose(obj);
        }

        if ('margin' in obj) {
            CompositeStyle.margin.normalize(obj);
        }

        var width = obj.width;
        obj.width = 
            width == 'auto' ? -2 : 
            width == 'fill' ? -1 : width;

        var height = obj.height;
        obj.height =
            height == 'auto' ? -2 :
            height == 'fill' ? -1 : height;


        //过滤出样式字段
        var style = {};
        for (var i = 0, len = fields.length; i < len; i++) {
            var key = fields[i];
            var value = obj[key];
            if (value == null || value === '') { // natvie 比较敏感，必须过滤掉非法值
                continue;
            }

            style[key] = value;
        }

        Timer.add('ComponentStyle.normalize');

        return style;
    }


    function set(xtype, style) {

        Timer.add('ComponentStyle.set');

        var item = xtype$style[xtype] || {};
        xtype$style[xtype] = $.Object.extend(item, style);


        //当前 xtype 所对应的类的样式发生改变，它的直接子类都要重新计算。
        //要避免此情况，可以把 Haf.style() 放在 Haf.define() 即类定义之前引入。
        var childXtypes = ClassManager.getChildXtypes(xtype);
        if (childXtypes) {
            $.Array.each(childXtypes, function (xtype, index) {
                var style = makeFinalStyle(xtype);
                set(xtype, style); //递归，计算直接子类，从而 “联动” 继承层次上的所有子类
            });
        }
         
        //Logger.debug('设置样式: {0}', xtype); 

        Timer.add('ComponentStyle.set');

    }
     

    /**
    * 获取指定组件实例的最终有效的样式。
    * 优化级从低到高： Haf.style() < Haf.define() < Haf.create()
    */
    function get(self) {

        Timer.add('ComponentStyle.get');



        var xtype = self.xtype;
        var config = self.config;

        //优先级高的在后面，其中 config 中已包含了 Haf.define() 和 Haf.create() 中的样式
        var style = xtype$style[xtype]; // xtype 级的 style

        if (!style) { //动态地去生成
            style = makeFinalStyle(xtype);
            set(xtype, style);
        }

        var obj = $.Object.extend({}, style, config);
        obj = normalize(obj);


        Timer.add('ComponentStyle.get');

        return obj;

    }

    /**
    * 判断指定的名称是否为合法的样式名称。
    */
    function isValidName(name) {
        return (name in empty) || (name in CompositeStyle);
    }

    /**
    * 判断指定的名称是否为 native 的样式名称。
    */
    function isNativeName(name) {
        return name in empty;
    }

    /**
    * 移除所有样式字段。
    * @param {Object} 要进行移除的对象 {}。
    * @param {boolean} [removeCompositeStyles=false] 是否同时移除复合样式字段。
        默认为 false。 如果指定为 true，则也会移除复合样式的字段。
    * @return {Object} 返回一个移除了样式字段的对象。
    */
    function removeStyles(obj, removeCompositeStyles) {

        obj = $.Object.remove(obj, fields);

        if (removeCompositeStyles === true) {
            obj = CompositeStyle.removeStyles(obj);
        }

        return obj;
    }

    function filterStyles(obj, keepCompositeStyles) {

        var obj = $.Object.filter(obj, fields);

        if (keepCompositeStyles === true) {
            var composited = CompositeStyle.filterStyles(obj);
            $.Object.extend(obj, composited);
        }

        return obj;

    }

    //ComponentStyle = 
    return {

        set: set,
        get: get,
        isValidName: isValidName,
        isNativeName: isNativeName,
        removeStyles: removeStyles,
        filterStyles: filterStyles,

        //只读
        empty: empty,
    };


})(Haf, ClassManager, CompositeStyle, Logger);





; (function (Haf, $, ComponentStyle, Colors) {



/**
* HAF: Hybrid Application Framework
* 混合应用框架，一个基于手机端 App 开发的纯 JavaScript 框架，提供一整套功能丰富的 API。
* 
*/


//创建快捷方式
$.Object.extend(Haf, {

    style: ComponentStyle.set,
    color: Colors.random

});


})(Haf, Haf, ComponentStyle, Colors);




/**
*  定义组件的缺省样式
*/
Haf.style('component', {

    align: null,
    align2container: null,
    backgroundColor: null,
    backgroundImage: null,
    backgroundImageStyle: null,
    borderColor: null,
    borderRadius: null,
    borderStyle: null,
    borderWidth: null,
    boxShadow: null,

    disabled: false,
    //display: 'show',

    dock: null,
    flex: null,
    font: null,
    fontColor: null,
    fontSize: null,
    fontStyle: null,

    height: 'auto',

    margin: null,
    padding: null,
    textShadow: null,
    valign: null,
    valign2container: null,


    width: null


});




/**
*  定义组件的缺省样式
*/
Haf.style('container', {

    


});



/**
* Hae App 自己的样式定义
*/
Haf.style('box', {

    backgroundColor: 'white',
    height: 'auto',
    width: 'fill',
    align: 'left', //控件内容在控件内的水平对齐方式 left/right/center
    valign: 'top' //控件内容在控件内的垂直对齐方式 top/middle/bottom


});







/**
* 定义组件的缺省样式
*/
Haf.style('button', {

    width: 100,
    height: 50

});





/**
*  Hae App自己的样式定义
*/
Haf.style('label', {

    height: 'auto',
    width: 'auto',
    background: '#F7F7F7',
    fontSize: 13,
    fontColor: '#333333',
    align: 'center', //控件内容在控件内的水平对齐方式 left/right/center
    valign: 'middle' //控件内容在控件内的垂直对齐方式 top/middle/bottom


});







Haf.style('progressbar', {
    height: 'auto',
    width: 'fill'
});


 


Haf.style('slider', {
    height: 'auto',
    width: 'fill'
});




Haf.style('textarea', {
    
    height: 200,
    width:  'fill'
});


 
 


Haf.style('textinput', {
    height: 35,
    width: 150,
    fontSize: 12,
    //border: 'solid 1px gray',
    align: 'left', //控件内容在控件内的水平对齐方式 left/right/center
    valign: 'middle' //控件内容在控件内的垂直对齐方式 top/middle/bottom
});


 
 



/**
* 内部使用的组件辅助工具类。
* @namespace
*/
var ComponentHelper = (function ($, Haf, ClassManager, ComponentStyle) {

    //维护 { xtype: nativeXtype } 的关系。
    var xtype$native = {

        actionsheet: 'ActionSheet',
        box: 'Box',
        button: 'Button',
        card: 'Card',
        carousel: 'Carousel',
        datepicker: 'DatePicker',
        dialog: 'Dialog',
        framelayer: 'FrameLayer',
        image: 'Image',
        label: 'Label',
        list: 'List',
        mask: 'ScreenMask',
        popupwindow: 'PopupWindow',
        progressbar: 'ProgressBar',
        select: 'Select',
        slider: 'Slider',
        textarea: 'TextArea',
        textinput: 'TextInput',
        toast: 'Toast',
        toggle: 'Toggle',
        webview: 'WebView'
    };

    //维护 { className: nativeXtype } 的关系。
    //会动态增长
    var name$native = {};

    //维护 { className: { propName: nativeProp } } 的关系
    var name$prop$native = {};


    /**
    * 获取指定组件实例的真实的 native 层的 xtype。
    * 该方法会从继承关系层次向上追溯，直到找到最近的 native 层的 xtype。
    */
    function getNativeXtype(self) {

        Timer.add('ComponentHelper.getNativeXtype');

        var nativeXtype;
        var xtype = self.xtype;

        if (xtype) { //指定了 xtype

            //先从直接映射表查找
            nativeXtype = xtype$native[xtype];
            if (nativeXtype) {
                Timer.add('ComponentHelper.getNativeXtype');
                return nativeXtype;
            }
        }

        //再从缓存中读取
        var className = self.getType();

        nativeXtype = name$native[className];
        if (nativeXtype) {
            Timer.add('ComponentHelper.getNativeXtype');

            return nativeXtype;
        }
        
        //再从继承树查找
        var list = ClassManager.getFamilyNames(className);
        list = list.slice(1, -1);  //去头去尾，因为 list[0] 为 Component，而最后一项肯定是不用检查的。

        $.Array.each(list, function (name, index) {

            var data = ClassManager.getData(name);
            var xtype = data.xtype;

            if (!xtype) {
                return; //相当于 continue
            }

            nativeXtype = xtype$native[xtype];

            if (nativeXtype) { //找到
                return false; //相当于 break
            }

        }, true); //倒序


        if (!nativeXtype) {
            throw Haf.error('无法找到合适的 native 的 xtype');
        }

        name$native[className] = nativeXtype; //缓存起来

        Timer.add('ComponentHelper.getNativeXtype');

        return nativeXtype;
    }

    



    function getNativeProps(self) {
        Timer.add('ComponentHelper.getNativeProps');

        var props = self.nativeProps;

        if (!props) {
            Timer.add('ComponentHelper.getNativeProps');

            return {};
        }


        var config = self.config;

        var obj =
            props instanceof Array ? //是数组，直接从 config 中把同名称的成员过滤出来
                $.Object.filter(config, props) :

            typeof props == 'object' ? //是纯对象，则重新映射
                $.Object.map(props, function (key, item) {

                    //是一个key，表示仅仅是换了名称
                    if (typeof item == 'string') {
                        return config[item];
                    }

                    if ($.Object.isPlain(item)) { //此时 item = { name: '', values: {} }

                        var name = item.name;
                        if (!(name in config)) { //config 中不包含 item.name 所指定所成员
                            return undefined;
                        }
                        
                        var value = config[name];

                        if (value in item.values) {
                            return item.values[value];
                        }

                        throw Haf.error('config.{0} 中的值不符合 nativeProps.{1} 的转换要求', name, key);

                    }

                    throw Haf.error('无法识别 nativeProps.{0} 所对应的值', key);

                }) : {}; //否则
                
        Timer.add('ComponentHelper.getNativeProps');

        return $.Object.trim(obj);  // natvie 比较敏感，必须过滤掉非法值 null, undefined
    }



    /**
    * 判断指定的事件名称是否为指定组件的 native 事件。
    */
    function isNativeEvent(obj, name) {

        var events = isValidComponent(obj) ? obj.nativeEvents : obj;

        return $.Object.isArray(events) ?
                    $.Array.contains(events, name) :
                    (name in events);
    }

    //根据 haf 的属性名反向查找　native 属性名。
    function getNativePropName(self, name) {

        var className = self.getType();

        var list = name$prop$native[className];

        if (!list) { //尚未存在该类的列表
            list = name$prop$native[className] = {};
        }

        if (name in list) { //已存在，则使用
            return list[name];
        }

        //否则，尚未建立起映射关系，则建立它
        var maps = self.nativeProps;

        var nativeName =
            // maps 是一个数组，则表示 native 的名称与 config 中的名称一致
            $.Object.isArray(maps) && $.Array.contains(maps, name) ? name :

            //否则，迭代查找每个成员
            $.Object.findKey(maps, function (key, item) {

                return item === name || //直接映射的
                    $.Object.isPlain(item) && item.name === name;
            });

        list[name] = nativeName; //缓存起来

        return nativeName;

    }

    /**
    * 判断指定的属性名称是否为指定组件的 native 属性。
    */
    function isNativeProp(obj, name) {

        return !!getNativePropName(obj, name);
    }

    
    
    /**
    * 判断指定的对象是否为合法的组件。
    */
    function isValidComponent(obj) {

        if (!obj || typeof obj != 'object') { //优化
            return false;
        }

        return ClassManager.isInstanceOf(obj, 'Haf.view.Component' );
    }

    

    //为了复用
    function onchangeHandler(newConfig, oldConfig) {

        var self = this;
        var isPropName = isNativeProp;
        var isStyleName = ComponentStyle.isValidName;

        $.Object.each(newConfig, function (key, value) {

            if (value === oldConfig[key]) { //值没发生改变
                return;
            }

            if (isStyleName(key) || isPropName(self, key)) {

                self.updateUI();
                return false; //break;
            }
        });
    }




    return {
        isValidComponent: isValidComponent,
        isNativeEvent: isNativeEvent,
        isNativeProp: isNativeProp,

        getNativeXtype: getNativeXtype,

        getNativeProps: getNativeProps,
        getNativePropName: getNativePropName,

        onchangeHandler: onchangeHandler
    };

})(Haf, Haf, ClassManager, ComponentStyle);



/**
* 组件管理器，在实例化/销毁组件时，需要在这里进行注册/取消注册。
* 支持根据 selector 查找组件。
*/
var ComponentManager = (function ($, Haf, ClassManager) {

    var guid$component = {};
    var id$component = {};
    var xtype$id$component = {};
    
    var modeRe = /^(\s?([>\^])\s?|\s|$)/; //判断mode的正则，mode有两种：>和空格
    var tokenRe = /^(#)?([\w\-]+|\*)/; //选择符表达式中分离单个选择符的正则

    //Matches a token with possibly (true|false) appended for the "shallow" parameter
    //这是原 st 的正则
    //tokenRe = /^(#)?([\w\-]+|\*)(?:\((true|false)\))?/,

    /**
    * 从items中过滤出xtype为指定参数的组件实例数组
    */
    function filterByXType(items, xtype) {
        var result = [],
            i = 0,
            length = items.length,
            candidate;
        for (; i < length; i++) {
            candidate = items[i];
            if (candidate.xtype == xtype) {
                result.push(candidate);
            }
        }
        return result;
    }
    /**
     * 从items中过滤出id为指定参数的组件实例数组
     */
    function filterById(items, id) {
        var result = [],
            i = 0,
            length = items.length,
            candidate;
        for (; i < length; i++) {
            candidate = items[i];
            if (candidate.get('id') === id) {
                result.push(candidate);
            }
        }
        return result;
    }
    /**
     * 获取容器container的下级组件实例，deep为false表示只获取一级，true表示获取多级
     */
    function getChildren(container, deep) {
        var result = [],
            children = container.getItems ? container.getItems() : null,
            child, i;
        if (children && children.length > 0) {
            result = result.concat(children);
            if (deep) {
                for (i = 0; i < children.length; i++) {
                    child = children[i];
                    result = result.concat(getChildren(child, true));
                }
            }
        }
        return result;
    }
    /**
     * 获取items的下级组件实例，mode为>表示直接下级，其他表示所有下级
     */
    function getItems(items, mode) {
        var result = [],
            i = 0,
            length = items.length,
            candidate,
            deep = mode !== '>';

        for (; i < length; i++) {
            candidate = items[i];
            result = result.concat(getChildren(candidate, deep));
        }
        return result;
    }
    /**
     * 解析selector，返回解析结果，对于"queryformview #fieldset1 textfield"
     * 这样的选择符，解析后的结果为：
     * [
     *      {
     *          method:filterByXType,
     *          args:['queryformview']
     *      },
     *      {
     *          mode:' '
     *      },
     *      {
     *          method:filterById,
     *          args:['fieldset1']
     *      },
     *      {
     *          mode:' '
     *      },
     *      {
     *          method:filterByXType,
     *          args:['textfield']
     *      }
     * ]
     */
    function parseSelector(selector) {
        var operations = [],
            lastSelector,
            tokenMatch,
            matchedChar,
            modeMatch;

        // We are going to parse the beginning of the selector over and
        // over again, slicing off the selector any portions we converted into an
        // operation, until it is an empty string.
        while (selector && lastSelector !== selector) {
            lastSelector = selector;

            // First we check if we are dealing with a token like #, * or an xtype
            tokenMatch = selector.match(tokenRe);

            if (tokenMatch) {
                matchedChar = tokenMatch[1];

                // If the token is prefixed with a # we push a filterById operation to our stack
                if (matchedChar === '#') {
                    operations.push({
                        method: filterById,
                        args: [Haf.String.trim(tokenMatch[2])]
                    });
                }
                    // If the token is a * or an xtype string, we push a filterByXType
                    // operation to the stack.
                else {
                    operations.push({
                        method: filterByXType,
                        args: [Haf.String.trim(tokenMatch[2])]
                    });
                }

                // Now we slice of the part we just converted into an operation
                selector = selector.replace(tokenMatch[0], '');
            }
            modeMatch = selector.match(modeRe);

            // Now we are going to check for a mode change. This means a space
            // or a > to determine if we are going to select all the children
            // of the currently matched items, or a ^ if we are going to use the
            // ownerCt axis as the candidate source.
            if (modeMatch && modeMatch[1]) { // Assignment, and test for truthiness!
                operations.push({
                    mode: modeMatch[2] || modeMatch[1]
                });
                selector = selector.replace(modeMatch[0], '');
            }
        }
        return operations;
    }
    /**
     * 对items,执行operations操作，返回符合条件的结果
     */
    function executeOperations(items, operations) {
        var i = 0,
            length = operations.length,
            operation,
            workingItems = items;

        // We are going to loop over our operations and take care of them
        // one by one.
        for (; i < length; i++) {
            operation = operations[i];

            // The mode operation requires some custom handling.
            // All other operations essentially filter down our current
            // working items, while mode replaces our current working
            // items by getting children from each one of our current
            // working items. The type of mode determines the type of
            // children we get. (e.g. > only gets direct children)
            if (operation.mode) {
                workingItems = getItems(workingItems, operation.mode);
            } else {
                workingItems = operation.method.apply(this, [workingItems].concat(operation.args));
            }

            // If this is the last operation, it means our current working
            // items are the final matched items. Thus return them!
            if (i === length - 1) {
                return workingItems;
            }
        }
        return [];
    }

    


    // ComponentManager = 
    return {

        /**
        * 注册组件。 内部方法。
        * 在每个组件 create 时(Haf.view.Component.initialize时)，会在这里注册。
        * @param container
        * @param component
        */
        register: function (component) {

            var id = component.getId(); //用户指定的 id 或程序分配的 id
            if (id$component[id]) {
                throw Haf.error('该 id 值已给占用: {0}', id);
            }

            id$component[id] = component;

            //
            var guid = component.getGuid();
            guid$component[guid] = component;


            var xtype = component.xtype;

            var list = xtype$id$component[xtype];
            if (!list) {
                list = xtype$id$component[xtype] = {};
            }

            list[id] = component;
        },

        /**
        * 取消注册，在组件销毁时，要进行取消注册。
        * 内部方法。
        * @param component
        */
        unregister: function (component) {
            var id = component.getId();
            delete id$component[id];

            var guid = component.getGuid();
            delete guid$component[guid];

            var xtype = component.xtype;
            delete xtype$id$component[xtype][id];
        },


        /**
        * 根据组件id获取组件实例，类似Ext.getCmp
        * @param compId
        * @return {*}
        */
        getCmp: function (compId) {
            return id$component[compId];
        },

        /**
        * 根据组件 id 获取组件实例。
        * @param {string} id 组件实例的 id。
        * @return {Component} 返回一个组件实例。
        */
        get: function (id) {
            return id$component[id];
        },

        /**
         * 根据组件xtype返回该组件创建的所有实例，返回值中以id为key，实例为value
         * 可以用于调试组件有多个实例
         * @param xtype
         * @return {*}
         */
        getCmpsByXtype: function (xtype) {
            return xtype$id$component[xtype];
        },
        /**
         * 在container下按照selector选择器进行选择，如果没有置顶container，
         * 则在viewport(组件书的根)下查找
         * @param root
         * @param selector
         * selector支持的选择符：
         * 1.xtype选择符
         * 2.id选择符
         *
         * 支持直接下级选择符(>)间接下级选择符(空格),例如：selector1 selector2
         */
        query: function (selector, container) {
            var root = container || Haf.Viewport,
                deepItems = getChildren(root, true);
            operations = parseSelector(selector, container);
            return executeOperations(deepItems, operations);
        },

        /**
        * 规格化指定的对象，并返回等价的组件实例。
        * @param {Object|Component|string} value 要进行规格化的对象。 
            如果是一个纯对象，则会根据其 xtype 值创建组件实例，并返回它的引用；
            如果是一个组件实例，则不做处理，直接返回该参数；
            如果是一个字符串，则当成组件的 id 进行查找，然后返回该组件实例的引用。
        */
        normalize: function (value) {

            if (!value) {
                return null;
            }

            if ($.Object.isPlain(value)) { //纯对象 {}
                Timer.add('ComponentManager.normalize>Haf.create');
                var obj = Haf.create(value);
                Timer.add('ComponentManager.normalize>Haf.create');
                return obj;

            }


            var type = typeof value;
            if (type == 'object') { //非空的对象
                
                var guid = Meta.getGuid(value); //尝试去获取该对象的 guid
                if (!guid) {
                    return null;
                }

                return guid$component[guid] || null;
            }

            if (type == 'string') { //字符串 id
                return id$component[value] || null;
            }

            return null;

        }

        
    };



})(Haf, Haf, ClassManager);



var Animator = (function ($, Haf) {




//不透明度
var Opacity = (function () {

    function parse(config) {

        var opacity = config.opacity;
        var type = typeof opacity;

        switch (type) {

            case 'string':
                opacity = $.Math.parsePercent(opacity);
                if (isNaN(opacity)) {
                    throw Haf.error('无法识别 opacity 的值');
                }
            case 'number':
                opacity = [1, opacity];
                break;
        }

        return $.Object.isArray(opacity) ? {
            type: 3,
            fromAlpha: opacity[0],
            toAlpha: opacity[1]
        } : null;
           
    }

    return {
        parse: parse
    };

})(); //结束 Opacity


//缩放
var Scale = (function () {

    function getPair(v) {

        var type = typeof v;
        if (type == 'number') {
            return [v, v];
        }

        if (type == 'string') {
            v = $.Math.parsePercent(v);
            if (isNaN(v)) {
                throw Haf.error('无法识别参数 v 的值: {0}', v);
            }
            return [v, v];
        }

        if ($.Object.isArray(v)) {
            return v;
        }

    }


    function parse(config) {

        var scale = config.scale;
        if (scale === undefined) {
            return null;
        }


        var from;
        var to;
        var dest;

        if ($.Object.isPlain(scale)) {
            from = scale.from;
            to = scale.to;
            dest = scale.dest;
        }
        else {
            to = scale;
        }

        to = getPair(to);
        if (!to) {
            return null;
        }

        from = getPair(from) || [1, 1];
        dest = getPair(dest) || [0, 5, 0.5];

        return {
            type: 4,

            fromXScale: from[0],
            fromYScale: from[1],

            toXScale: to[0],
            toYScale: to[1],

            destinationX: dest[0],
            destinationY: dest[1]
        };
    }

    return {
        parse: parse
    };
})(); //结束 Scale


//平移
var Shift = (function () {


    function getPair(v) {

        var type = typeof v;
        if (type == 'number') {
            return [v, v];
        }

        if (type == 'string') {
            v = $.Math.parsePercent(v);
            if (isNaN(v)) {
                throw Haf.error('无法识别参数 v 的值: {0}', v);
            }
            return [v, v];
        }

        if ($.Object.isArray(v)) {
            return v;
        }

    }

    function parse(config) {

        var shift = config.shift;
        if (shift === undefined) {
            return null;
        }

        var from;
        var to;

        if ($.Object.isPlain(shift)) {
            from = shift.from;
            to = shift.to;
        }
        else {
            to = shift;
        }

        to = getPair(to);
        if (!to) {
            return null;
        }

        from = getPair(from) || [0, 0];

        return {
            type: 1,
            fromX: from[0],
            fromY: from[1],

            toX: to[0],
            toY: to[1]
        };
    }

    return {
        parse: parse
    };
})();



//旋转
var Rotate = (function () {


    function getDegree(degree) {

        var type = typeof degree;
        if (type == 'number') {
            return [0, degree];
        }

        if (type == 'string') {
            var circles = $.Math.parsePercent(degree);
            if (isNaN(circles)) {
                throw Haf.error('无法识别参数 degree 的值: {0}', degree);
            }

            degree = 360 * circles;
            return [0, degree];
        }

        if ($.Object.isArray(degree)) {
            return degree;
        }

        throw Haf.error('无法识别参数 degree 的类型');

    }

    function getCenter(center) {

        if (center == null ) { //undefined 或 null
            return [0.5, 0.5];
        }

        var type = typeof center;
        if (type == 'number') {
            return [center, center];
        }

        if (type == 'string') {
            center = $.Math.parsePercent(center);
            if (isNaN(center)) {
                throw Haf.error('无法识别参数 center 的值: {0}', center);
            }
            return [center, center];
        }

        if ($.Object.isArray(center)) {
            return center;
        }

        throw Haf.error('无法识别参数 center 的类型');
    }


    function parse(config) {

        var rotate = config.rotate;
        if (rotate === undefined) {
            return null;
        }

        var degree;
        var center;

        if ($.Object.isPlain(rotate)) {
            degree = rotate.degree;
            center = rotate.center;
        }
        else {
            degree = rotate;
        }

        degree = getDegree(degree);
        center = getCenter(center);

        return {
            type: 2,
            fromDegrees: degree[0],
            toDegrees: degree[1],
            centerX: center[0],
            centerY: center[1]
        };

    }

    return {
        parse: parse
    };

})();



return {
    parse: function (config) {

        var list = [
            Opacity.parse(config),
            Shift.parse(config),
            Scale.parse(config),
            Rotate.parse(config)
        ];


        var duration = config.duration;
        duration = duration == 'slow' ? 3000 :
            duration == 'normal' ? 2000 :
            duration == 'fast' ? 1000 :
            duration === undefined ? 2000 : duration;

        var delay = config.delay || 0;

        return {
            duration: duration,
            startOffSet: delay,
            animations: $.Array.trim(list)
        };
    }
};





})(Haf, Haf);




; (function ($, Haf, UI, ComponentManager, ComponentHelper, ComponentStyle, Animator, Logger) {




/**
* 组件类。
* 这是一个抽象类，所有 ui 组件的基类，子类应该提供自己的实现。
*/
Haf.define('Haf.view.Component', {
    extend: 'Haf.Base',
    xtype: 'component',

    'abstract': true,   //表示是抽象类

    /**
    * nativeEvents 是 native 的事件，在 on 时，需要给 native 控件添加事件处理，
    * 不是在这个列表中的事件属于普通的 js 事件，在 js 层内循环。
    */
    nativeEvents: [],

    /**除了 style 外的其他属性，子类必须指定属于自己的 nativeProps 列表*/
    nativeProps: {
       
    },

    /**与 native 层对应的 config 对象，仅用于展示数据，不会实际影响 native 层*/
    nativeConfig: {
        id: 0, 
        xtype: '', 
        props: {},
        style: {}
    },

    config: {
        id: '',
        autoUpdateUI: true, //表示当 style 或 props 发生改变时，是否自动更新到 native 层的 UI 上
        listeners: {}
        //样式部分已统一移到 ComponentStyle 工具类中进行处理

    },

    configListeners: {

        //防止再次修改 id
        id: function (id, oldId) {
            throw Haf.error('组件的 id 只能在初始化时进行赋值');
        }
    },


    initialize: function (config) {

        Timer.add('Component>this.callSuper');
        this.callSuper(arguments, config);
        Timer.add('Component>this.callSuper');

        var id = this.getId();
        if (!id) {
            id = this.getGuid();        //用当前实例的 guid 作为默认 id
            this.config['id'] = id;
        }

        Timer.add('Component>ComponentManager.register');
        ComponentManager.register(this);
        Timer.add('Component>ComponentManager.register');


        var nativeConfig = this.nativeConfig = {
            id: this.getNativeId(),
            xtype: ComponentHelper.getNativeXtype(this),
            style: ComponentStyle.get(this),
            props: ComponentHelper.getNativeProps(this)
        };

        Timer.add('Component>UI.createComponent');
        UI.createComponent(nativeConfig);
        Timer.add('Component>UI.createComponent');


        
        var listeners = this.config.listeners;
        if (listeners) {
            Timer.add('Component>this.on');
            this.on(listeners);
            Timer.add('Component>this.on');

        }

        if (this.config.autoUpdateUI) {
            Timer.add('Component>this.onchange');
            this.onchange(ComponentHelper.onchangeHandler);
            Timer.add('Component>this.onchange');

        }
    },

    /**
    * 这是一个模板方法，此处提供 Component 组件的实现。
    * 该方法区分普通的 js 事件和 native 层的事件，并且不提供重载。
    */
    bind: function (eventName, handler, isOnce) {

        var self = this;
        var isNativeEvent = ComponentHelper.isNativeEvent(this, eventName);

        // 即普通的 js 事件
        if (!isNativeEvent) {
            $.Event.bind(this, eventName, handler, isOnce);
            return;
        }


        // native 事件。
        var nativeId = this.getNativeId();

        var nativeEvents = this.nativeEvents;
        if ($.Object.isPlain(nativeEvents)) { //设置了新的映射名称，则进行转换
            eventName = nativeEvents[eventName]; // haf -> hae
        }

        //钩子函数
        function exFn() {
            var args = $.Array.parse(arguments);
            handler.apply(self, args); //让 handler 函数中的 this 指向当前实例。

            if (isOnce) {
                UI.removeEventListener(nativeId, eventName, exFn);
            }
        }

        var mapper = Meta.get(this, 'bind.nativeEvents.mapper', new $.Mapper());
        mapper.set(handler, exFn); // 用 mapper 找到关系： handler -> exFn

        UI.addEventListener(nativeId, eventName, exFn);

    },

    /**
    * 给本实例解除绑定事件处理函数。
    * @param {string} [eventName] 要解除绑定的事件名称。
        如果不指定，则移除所有的事件。
    * @param {function} [handler] 要解除绑定事件处理函数。
        如果不指定，则移除 eventName 所关联的所有事件。
    */
    off: function (eventName, handler) {

        var isNativeEvent = ComponentHelper.isNativeEvent(this, eventName);
        if (!isNativeEvent) {
            $.Event.unbind(this, eventName, handler);
            return;
        }

        var mapper = Meta.get(this, 'bind.nativeEvents.mapper');
        if (!mapper) { //尚未绑定过 native 事件
            return;
        }

        var exFn = mapper.get(handler); //handler -> exFn
        var nativeId = this.getNativeId();
        UI.removeEventListener(nativeId, eventName, exFn);
        

    },

   

    /**
    * 触本实例上的特定类型事件。
    * @param {string} eventName 要触发的事件名称。
    * @param {Array} [args] 要向事件处理函数传递的参数数组。
    * @return 返回最一后一个事件处理函数的返回值。
    */
    trigger: function (eventName, args) {

        if ( ComponentHelper.isNativeEvent(this, eventName) ) {
            throw Haf.error('目前暂时不支持用代码去触发 ui 事件');
        }

        return $.Event.trigger(this, eventName, args);
    },

    /**
    * 销毁本实例，同时执行一些清理操作。
    * 该方法会释放所有关联的资源，包括元数据和事件，并且会从组件树中移除本组件。
    */
    dispose: function () {

        var nativeId = this.getNativeId(); //先缓存起来

        this.callSuper(arguments);


        ComponentManager.unregister(this); //从组件树中移除
        UI.destroyComponent(nativeId);


    },

    /**
    * 获取 config 对象中指定成员的值。
    * 如果获取的成员是属性名/样式名，则从 native 层获取值，并且转换成 haf 层所使用的值。
    */
    get: function (key) {

        Timer.add('Component.get');

        var nativeName =
                ComponentStyle.isNativeName(key) ? key :        //native 的样式名称
                ComponentHelper.getNativePropName(this, key);   //native 的属性名称

        if (nativeName) { //尝试作为属性名去获取，如果是属性名，则获取 native 层对应的值

            var nativeValue = this.getNativeProp(nativeName);
            
            var item = this.nativeProps[nativeName]; 
            if ($.Object.isPlain(item)) { //把 nativeValue 转成 haf 层所使用的 value

                return $.Object.findKey(item.values, function (key, value) {
                    return value === nativeValue;
                });
            }

            Timer.add('Component.get');
            return nativeValue;
        }

        Timer.add('Component.get');
        return this.config[key];
    },

    getId: function () {
        return this.config['id'];
    },

    /**
    * 获取父容器
    */
    getParent: function () {
        return Meta.get(this, 'parent');
    },

    /**
    * 从父容器中移除
    */
    removeFromParent: function () {
        this.getParent().remove(this);
    },

    /**
    * 调用本组件的 native 方法。
    * 这是一个受保护的方法，仅供子类使用。
    */
    callNative: function (methodName) {

        var nativeId = this.getNativeId();
        var args = [nativeId, methodName];
        
        if (arguments.length > 1) {

            var isComponent = ComponentHelper.isValidComponent;
            var list = $.Array.parse(arguments).slice(1);
            
            list = $.Array.keep(list, function (item, index) {

                return isComponent(item) ? item.getNativeId() : item;
            });

            args = args.concat(list);
        }
        
        UI.invokeComponentMethod.apply(UI, args); // native 的调用方式中的是参数个数可变的

    },

    show: function () {
        this.set('visible', 'show', true);
        this.setNativeProp('visible', 'show');
    },

    hide: function () {
        this.set('visible', 'gone', true);
        this.setNativeProp('visible', 'gone');
    },

    toggle: function (isVisible) {

        if (isVisible === undefined) {
            var visible = this.get('visible');
            if (visible === 'show' || visible === undefined) {
                this.hide();
            }
            else {
                this.show();
            }
        }
        else if (isVisible === true) {
            this.show();
        }
        else if (isVisible === false) {
            this.hide();
        }
        else {
            throw Haf.error('无法识别参数 isVisible 的值');
        }
    },

    animate: function (config) {

        var nativeId = this.getNativeId();
        var animator = Animator.parse(config);

        UI.startAnimation(nativeId, animator);

    },

    /**
    * 通过不透明度的变化来实现组件的淡入效果。
    * 在动画完成后可选地触发一个回调函数。
    * 这个动画只调整组件的不透明度，高度和宽度不会发生变化。
    */
    fadeIn: function (duration, fn) {

        if (typeof duration == 'function') {
            fn = duration;
            duration = 'normal';
        }

        this.animate({
            duration: duration,
            opacity: [0, 1],
            fn: fn
        });
    },

    /**
    * 通过不透明度的变化来实现组件的淡出效果。
    * 在动画完成后可选地触发一个回调函数。
    * 这个动画只调整组件的不透明度，高度和宽度不会发生变化。
    */
    fadeOut: function (duration, fn) {

        if (typeof duration == 'function') {
            fn = duration;
            duration = 'normal';
        }

        this.animate({
            duration: duration,
            opacity: [1, 0],
            fn: fn
        });
    },

    /**
    * 通过高度变化（向上减小）来动态地隐藏组件。
    * 在隐藏完成后可选地触发一个回调函数。
    * 这个动画只调整组件的高度，可以使匹配的元素以“滑动”的方式隐藏起来。
    */
    slideUp: function (duration, fn) {

        if (typeof duration == 'function') {
            fn = duration;
            duration = 'normal';
        }

        this.animate({
            duration: duration,
            scale: {
                from: [1, 1],
                to: [1, 0],
                dest: [0, 0]
            },
            fn: fn
        });
    },

    /**
    * 通过高度变化（向下增大）来动态地显示组件。
    * 在显示完成后可选地触发一个回调函数。
    * 这个动画只调整组件的高度，可以使匹配的元素以“滑动”的方式隐藏起来。
    */
    slideDown: function (duration, fn) {

        if (typeof duration == 'function') {
            fn = duration;
            duration = 'normal';
        }

        this.animate({
            duration: duration,
            scale: {
                from: [1, 0],
                to: [1, 1],
                dest: [0, 0]
            },
            fn: fn
        });
    },

    /**
    * 更新 UI，包括 props 和 style。
    */
    updateUI: function (key, value) {

        if (typeof key == 'string') {
            this.set(key, value, true);  //不触发事件
        }
        else if ($.Object.isPlain(key)) {
            this.set(key, true);
        }
        

        var props = ComponentHelper.getNativeProps(this);
        var style = ComponentStyle.get(this);

        var obj = $.Object.extend({}, style, props);

        this.setNativeProp(obj);


    },

    /**
    * 获取本组件实例的本地 id。
    * hae id 是和 native 组件联系的纽带。
    * @return {string} 返回一个本实例的 guid 字符串值。
    */
    getNativeId: function () {
        return Meta.getGuid(this);
    },


    /**
    * 获取指定的 native 的属性或样式值。
    * 这是一个受保护的方法。
    */
    getNativeProp: function (name) {

        var nativeId = this.getNativeId();
        return UI.getComponentProp(nativeId, name);
    },

    /**
    * 设置指定的 native 的属性或样式值。
    * 这是一个受保护的方法。
    */
    setNativeProp: function (name, value) {

        var props = typeof name == 'string' ? $.Object.make(name, value) : name;

        var nativeId = this.getNativeId();
        UI.setComponentProp(nativeId, props);

        //更新到元数据
        var nativeConfig = this.nativeConfig;

        var style = ComponentStyle.filterStyles(props); //过滤出所有样式字段
        $.Object.extend(nativeConfig.style, style);

        props = ComponentStyle.removeStyles(props, true); //移除所有(包括复合)样式字段，剩下的当作属性字段
        $.Object.extend(nativeConfig.props, props);
    }
    
});






})(Haf, Haf, Hae.UI, ComponentManager, ComponentHelper, ComponentStyle, Animator, Logger);





; (function ($, Haf, UI, Meta, ComponentManager, ComponentHelper, Logger) {



/**
 * 容器类。
 * 所有容器类组件的基类，无法直接实例化。
 */
Haf.define('Haf.view.Container', {
    extend: 'Haf.view.Component',
    xtype: 'container',
    'abstract': true,

    /**与 native 层对应的 config 对象，仅用于展示数据，不会实际影响 native 层*/
    nativeConfig: {
        id: 0,
        xtype: '',
        props: {},
        style: {},
        childs: []
    },

    config: {
        defaults: null,
        items: []
    },


    initialize: function (config, noCallSuper) {

        if (noCallSuper !== true) { //为 true 时，不调用 callSuper，主要是针对 Viewport
            this.callSuper(arguments, config);
        }


        //收集子组件的实例，这里不要写到类的定义中，因为那是写到原型上的。
        //为了私有数据的保护，不写在 this.items 中，而是当成元数据。
        Meta.set(this, 'items', []);

        this.nativeConfig.childs = []; //分配个数组

        //var items = this.get('items');
        var items = this.config.items;
        if (items) { //创建子组件
            this.add(items);
        }

    },

    /**
    * 获取所有的子组件，返回一个新的数组。
    * 该接口是提供给外部使用的，本类内部请使用 Meta.get(this, 'items')
    */
    getItems: function () {
        var items = Meta.get(this, 'items');
        return items.slice(0); //拷贝一份数组，避免使用者修改原 items 的元素。
    },

    /**
    * 获取当前容器的直接下级子组件的个数。
    */
    getCount: function () {
        var items = Meta.get(this, 'items');
        return items.length;
    },

    /**
    * 向容器内添加一个或多个子组件。
    * @param {Component|Object|Array} item 要添加的子组件。
        可以是一个组件实例，也可以是一个纯对象，也可以是一个数组。
    */
    add: function (item) {

        var self = this;

        if ($.Object.isArray(item)) {
            return $.Array.map(item, function (item, index) {
                return self.addItem(item) || null;
            });
        }

        return this.addItem(item);
    },

    /**
    * 向容器内添加一个子组件。
    * 该方法只针对单项，不重载批量的情况。
    * 这是一个受保护的模板方法，仅供当前类和子类调用，子类可重写以提供自己的实现。
    * 开发者应该调用 add 方法。
    * @param {Component|Object|string} item 要添加的子组件。
        可以是一个组件实例，也可以是一个纯对象，也可以是组件实例的 id 值。
    * @param {function} [fnNativeAdd=UI.addComponent2Container] 向容器添加子组件的 native 方法。
        当子类需要调用自己的 native 方法时，可以提供该参数。
        该参数方法会接受到两个参数：item 的 nativeId 和 当前容器组件的 nativeId。
    * @return 返回被添加后的子组件实例。
    */
    addItem: function (item, fnNativeAdd) {

        Timer.add('Container.addItem');

        var defaults = this.config.defaults;

        var isInstance = true; //指示 item 是否已是组件实例。 先假设是。

        if ($.Object.isPlain(item)) { // item 是一个 {} 配置对象
            isInstance = false;
            if (defaults) { //
                item = $.Object.extend({}, defaults, item); //与 defaults 合并
            }
        }

        Timer.add('Container.addItem>ComponentManager.normalize');
        item = ComponentManager.normalize(item);
        Timer.add('Container.addItem>ComponentManager.normalize');

        if (!item) {
            throw Haf.error('参数 item 不是(或不能从它创建出)一个有效的组件。');
        }

        if (this.contains(item)) {
            throw Haf.error('参数 item 所对应的子组件已在容器中，不能重复添加。');
        }

        if (isInstance && defaults) { //参数传进来已是组件实例，则更新 UI
            defaults = $.Object.remove(defaults, ['xtype', 'id']); //移除这两个成员

            if (!$.Object.isEmpty(defaults)) { //忽略 defaults = {} 空对象的情况

                Timer.add('Container.addItem>item.updateUI');

                item.updateUI(defaults);

                Timer.add('Container.addItem>item.updateUI');
            }
        }

        var items = Meta.get(this, 'items');
        items.push(item);

        Meta.set(item, 'parent', this); //设置 item 的 parent 

        var childs = this.nativeConfig.childs;
        childs.push(item.nativeConfig);


        var itemId = item.getNativeId();
        var containerId = this.getNativeId();

        if (fnNativeAdd) {
            fnNativeAdd.call(this, itemId, containerId);
        }
        else {
            //注意，不要用一个变量缓存 UI.addComponent2Container，
            //因为它的 this 指向 UI，它不是一个真正的静态方法。
            UI.addComponent2Container(itemId, containerId);
        }

        //Logger.debug('容器添加子组件: {0} + {1}', this.getGuid(), item.getGuid());

        Timer.add('Container.addItem');

        return item;
    },

    /**
    * 从容器中移除一个子组件。
    * @param {Component|string|number} item 要移除的子组件。
    *   可以是一个组件实例，或一个组件的　id 字符串，或子组件中容器中的索引位置。
    * @param {function} [fnNativeRemove=UI.removeComponent4Container] 向容器添加子组件的 native 方法。
        当子类需要调用自己的 native 方法移除子组件时，应该重定本方法，可以提供该参数。
        该参数方法会接受到两个参数：item 的 nativeId 和 当前容器组件的 nativeId。
    */
    remove: function (item, fnNativeRemove) {

        item = this.getItem(item);

        if (!item) {
            throw Haf.error('容器中不存在该组件');
        }


        var items = Meta.get(this, 'items');
        items = $.Array.remove(items, item);  //从集合中移除
        Meta.set(this, 'items', items);


        var childs = this.nativeConfig.childs;
        this.nativeConfig.childs = $.Array.remove(childs, item.nativeConfig);



        var itemId = item.getNativeId();
        var containerId = this.getNativeId();

        if (fnNativeRemove) {
            fnNativeRemove.call(this, itemId, containerId);
        }
        else {
            UI.removeComponent4Container(itemId, containerId);
        }

        //Logger.debug('容器移除子组件: {0} - {1}', containerId, itemId);

        return item;

    },

    /**
    * 移除所有子组件
    */
    removeAll: function () {

        var self = this;
        var items = Meta.get(this, 'items');

        $.Array.each(items, function (item, index) {

            self.remove(item);
            
        });
    },

    push: function (item) {
        return this.add(item);
    },

    pop: function () {

        var count = this.getCount();
        if (count > 0) {
            return this.remove(count - 1); //移除最后一项
        }

        return null;
    },


    getItem: function (item) {

        var items = Meta.get(this, 'items');
        var type = typeof item;

        if (type == 'number') {
            return items[item];
        }

        item =
            type == 'string' ? ComponentManager.get(item) :
            //type == 'number' ? items[item] :
            ComponentHelper.isValidComponent(item) ? item : null;

        return item && $.Array.contains(items, item) ? item : null;
    },

    getLastItem: function () {
        var count = this.getCount();
        return count > 0 ? this.getItem(count - 1) : null;
    },

    /**
    * 检测本容器实例是否包含指定的子组件。
    * @param {Component|string|number} item 要进行检测的子组件。
        可以是一个组件实例；
        或一个字符串，表示组件的 id；
        或一个数字，表示该组件在容器中的索引值。
    * @return {boolean} 如果容器中包含该子组件则返回 true；否则返回 false。
    */
    contains: function (item) {
        return !!this.getItem(item);
    },

    /**
    * 销毁本实例，同时执行一些清理操作。
    * 该方法会释放所有关联的资源，包括元数据和事件，并且会从组件树中移除本组件。
    */
    dispose: function () {

        //销毁子组件。
        var items = Meta.get(this, 'items');

        $.Array.each(items, function (item, index) {
            item.dispose();
        });

        //销毁自己
        this.callSuper(arguments);

    }


    
});


})(Haf, Haf, Hae.UI, Meta, ComponentManager, ComponentHelper, Logger);



; (function ($, Haf) {




/**
* 可以选择一个或者多个的选择控件，选择内容为弹出框。
* @class Haf.view.ActionSheet
*/
Haf.define('Haf.view.ActionSheet', {
    extend: 'Haf.view.Component',
    xtype: 'actionsheet',
    nativeEvents: ['buttonTap'],

    nativeProps: [
        'buttons'
    ],

    config: {
        
    },

    initialize: function (config) {

        var buttons = config.buttons;

        var buttonTexts = $.Array.map(buttons, function (item, index) {
            return item.text || null;
        }).join(',');

        this.set('buttons', buttonTexts, true);

        this.callSuper(arguments, config);

        this.on('buttonTap', function (index) {

            var item = buttons[index];
            var fn = item.tap;

            if (fn) {
                fn.call(this, item, index);
            }
        });
    },

    show: function () {
        this.callNative('show');
        this.callSuper(arguments);
    },

    hide: function () {
        this.callNative('hide');
        this.callSuper(arguments);
    }
    
});


})(Haf, Haf);




; (function (Haf, $) {


/**
* Box容器，可以横向/纵向布局。
*/
Haf.define('Haf.view.Box', {
    extend: 'Haf.view.Container',
    xtype: 'box',

    nativeProps: {

        scrollable: 'scrollable',

        //换名称，也换值
        orientation: {
            name: 'layout',
            values: {
                hbox: 'Horizontal',
                vbox: 'Vertical'
            }
        }
    },


    config: {
        /**
        * 方向, hbox|vbox
        */
        layout: 'hbox',

        /**
        * 是否可滚动, true|false
        */
        scrollable: false
    },

    addItem: function (item) {
        
        var layout = this.get('layout');
        item = this.callSuper(arguments, item);

        //box 容器中的控件的 flex 优先级高于 width/height
        if (item.get('flex')) {
            item.set(layout == 'hbox' ? 'width' : 'height', 0);
            if (!item.get('autoUpdateUI')) {
                item.updateUI();
            }
        }

        return item;
    }
});



})(Haf, Haf);




//
; (function ($, Haf) {



/**
 * 按钮
 */
Haf.define('Haf.view.Button', {
    extend: 'Haf.view.Component',
    xtype: 'button',
    nativeEvents: ['tap', 'longPress'],
    nativeProps: [
        'text',
        'backgroundImgPressed', /**按下状态图片路径*/
        'backgroundImgFocus',  /**焦点状态图片路径*/
        'backgroundImgDisable' /**不可用状态图片路径*/
    ],

    config: {
        
    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        var tap = config.tap; //处理快捷方式
        if (tap) {
            this.on('tap', tap);
        }

    }
});


})(Haf, Haf);




; (function (Haf, $, Meta) {


/**
* Card 容器
*/
Haf.define('Haf.view.Card', {
    extend: 'Haf.view.Container',
    xtype: 'card',
    nativeProps: [],

    config: {

    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        var item = this.getItem(0);
        if (item) { //默认激活第一项(如果有)
            this.setActiveItem(0);
        }
        else {
            Meta.set(this, 'activeIndex', -1);
        }

    },

    /**
    * 设置指定的组件为当前显示的组件
    * @param item
    */
    setActiveItem: function (item) {

        var index = item; //先假设传进来的是数字，当成 index

        item = this.getItem(item);
        if (!item) {
            throw Haf.error('容器中不存在该组件');
        }

        
        if (typeof index != 'number') {
            var items = Meta.get(this, 'items');
            index = $.Array.indexOf(items, item);
        }

        var activeIndex = this.getActiveIndex();

        if (index == activeIndex) {
            return;
        }

        Meta.set(this, 'activeIndex', index);
        this.callNative('showView', item);

        var oldItem = this.getItem(activeIndex);

        this.trigger('activeitemchange', [item, index, oldItem, activeIndex]);

    },

    getActiveItem: function () {
        var index = this.getActiveIndex();
        if (index < 0) {
            return null;
        }

        var items = Meta.get(this, 'items');
        return items[index] || null;
    },

    getActiveIndex: function () {
        return Meta.get(this, 'activeIndex');
    },

    next: function (isCircled) {

        var activeIndex = this.getActiveIndex();
        var count = this.getCount();


        var index =
            activeIndex < 0 ? 0 :
            isCircled === true ? $.Math.next(activeIndex, count) :
            Math.min(activeIndex + 1, count - 1);

        if (index == activeIndex) {
            return;
        }

        this.setActiveItem(index);
    },

    previous: function (isCircled) {
        var activeIndex = this.getActiveIndex();
        var count = this.getCount();

        var index =
            activeIndex < 0 ? count :
            isCircled === true ? $.Math.previous(activeIndex, count) :
            Math.max(activeIndex - 1, 0);

        if (index == activeIndex) {
            return;
        }

        this.setActiveItem(index);
    }
});

})(Haf, Haf, Meta);



/**
* 滑动面板
*/
Haf.define('Haf.view.Carousel', {
    extend: 'Haf.view.Container',
    xtype: 'carousel',
    nativeEvents: [],
    nativeProps: {

        visible: 'pager',

        pageControlOrientation: {
            name: 'direction',
            values: {
                'horizontal': 1,
                'vertical': 2
            }
        }
    },

    config: {
        direction: 'horizontal',
        pager: true
    },

    //调用容器类的 addItem 方法，同时提供自己的 native 方法。 
    addItem: function (item) {

        return this.callSuper(arguments, item, function (itemId, containerId) {
            this.callNative('addPage', itemId);
        });
    },

    //调用容器类的 remove 方法，同时提供自己的 native 方法。 
    remove: function (item) {
        return this.callSuper(arguments, item, function (itemId, containerId) {
            this.callNative('removePage', itemId);
        });
    }

     
});





;(function($, Haf, Hae){


/**
* 类似对话框。界面里面有日期/时间选择，和确定/取消两个按钮。
*/
Haf.define('Haf.view.DatePicker', {
    extend: 'Haf.view.Component',
    xtype: 'datepicker',
    nativeEvents: ['change'],
    nativeProps: {

        model: {
            name: 'model',
            values: {
                'date': 1,
                'time': 2,
                'datetime': 3
            }
        },

        year: 'year',
        month: 'month',
        day: 'day',
        hour: 'hour',
        minute: 'minute',
        second: 'second',

        title: 'title',
        ellipsize: 'ellipsize',
        isPassword: 'isPassword',
        message: 'message',
        wholeDate: 'wholeDate'
    },

    config: {
        model: 'date',
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        second: '',

        title: '',
        ellipsize: '',
        isPassword: '',
        message: '',
        wholeDate: '' // 目前 hae 还有问题，必须指定类似 "1989-06-21 19:26:37" 的全格式
    },

    initialize: function (config) {

        //先设置参数
        var now = new Date();

        var obj = $.Object.extend({
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds()
        }, config);

        this.set( obj, true );

        this.callSuper(arguments, config);
    },

    setValue: function (value) {
        value = $.Date(value).toString('yyyy-MM-dd HH:mm:ss');
        this.callNative('setValue', value);
    },

    show: function () {
        this.callNative('show');
    },

    hide: function () {
        this.callNative('hide');
    }
});


})(Haf, Haf, Hae);




; (function ($, Haf) {

/**
* 模式提示框
*/
Haf.define('Haf.view.Dialog', {
    extend: 'Haf.view.Component',
    xtype: 'dialog',

    nativeEvents: ['buttonTap'],

    nativeProps: {

        buttons: 'buttons',
        icon: 'icon',
        title: 'title',
        message: 'message'
    },

    config: {
        
    },

    initialize: function (config) {

        var buttons = config.buttons;

        config.buttons = $.Array.map(buttons, function (item, index) {
            return item.text || null;
        }).join(',');

        this.callSuper(arguments, config);
        
        this.on('buttonTap', function (index) {

            var item = buttons[index];
            var fn = item.tap;

            if (fn) {
                fn.call(this, item, index);
            }
        });
    },

    show: function () {
        this.callNative('show');
    },

    hide: function () {
        this.callNative('hide');
    }
});


})(Haf, Haf);



/**
* 叠加层。
* 一个可叠加的层容器控件，加入到层中的元素都是从左上角原点出现的。
*/
Haf.define('Haf.view.FrameLayer', {
    extend: 'Haf.view.Container',
    xtype: 'framelayer',
    nativeEvents: [],
    nativeProps: {
    },

    config: {
        
    },

    exchange: function (item1, item2) {
        
        item1 = this.getItem(item1);
        if (!item1) {
            throw Haf.error('容器中不包含 item1 的子组件');
        }

        item2 = this.getItem(item2);
        if (!item2) {
            throw Haf.error('容器中不包含 item2 的子组件');
        }

        this.callNative('exChangeLayerIndex', item1, item2);
    }


});





; (function (Haf, $) {




/**
 * 文字标签
 */
Haf.define('Haf.view.Label', {
    extend: 'Haf.view.Component',
    xtype: 'label',

    nativeProps: [
        'text',
        'singleLine',
        'ellipsize'
    ],

    config: {

        text: '',

        /**
         * 是否单行, false 则可以换行
         */
        singleLine: false,

        /**
         * 单行情况下，如果显示不完，省略号的位置
         * 可选: start/end/middle 三个值
         */
        ellipsize: 'end'
    }

});



})(Haf, Haf);






; (function (Haf, $) {


/**
* Box容器，可以横向/纵向布局。
*/
Haf.define('Haf.view.List', {
    extend: 'Haf.view.Container',
    xtype: 'list',

    nativeEvents: {
        itemtap: 'rowTap',
        pullup: 'pullUpLoading',
        pulldown: 'pullDownLoading',
        indexChange: 'indexChange'
    },


    nativeProps: {
        
        template: 'template',
        itemViewCallback: 'itemViewCallback',

        pullUpLoadingEnabled: 'pullupLoading',
        pullUpAreaHint: 'pullupText',
        pullUpLoadingHint: 'loadingText',
        pullDownLoadingEnabled: 'pulldownLoading',
        pullDownAreaHint: 'pulldownText',

        indexBarEnabled: 'indexBarEnabled',

        scrollable: 'scrollable'
    },



    config: {
        
        pullupLoading: true,
        pullupText: '上拉翻页',

        loadingText: '正在获取数据...',

        pulldownLoading: true,
        pulldownText: '下拉刷新',

        indexBarEnabled: false,

        /**
        * 是否可滚动, true|false
        */
        scrollable: true,

        data: [],
        itemTpl: {}
    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        var itemTpl = this.get('itemTpl'); 
        if (itemTpl) { //指定了 itemTpl，则解析

            itemTpl = ComponentManager.normalize(itemTpl);

            if (!itemTpl) {
                throw Haf.error('无法识别 itemTpl 的类型');
            }

            Meta.set(this, 'itemTpl', itemTpl.nativeConfig); //解析成 native 的 itemTpl
        }

        if (this.get('autoUpdateUI') === true) {

            this.setData();

            this.onchange('data', function () {
                this.setData();
            });
        }
    },

    setData: function (data) {

        if (!data) {
            data = this.get('data');
        }
        else {
            this.set('data', data, true);
        }

        itemTpl = Meta.get(this, 'itemTpl');
        this.callNative('adapter', data, itemTpl, null);
    },

    appendData: function (data) {

        this.callNative('appendData', data);
    },

    reload: function () {

        this.callNative('reload');
    }
});

    

})(Haf, Haf);





/**
 * 可以选择一个或者多个的选择控件，选择内容为弹出框。
 */
Haf.define('Haf.view.Mask', {
    extend: 'Haf.view.Component',
    xtype: 'mask',
    
    nativeProps: [
        'icon',
        'message'
    ],

    config: {},

    show: function () {
        this.callNative('show');
        this.set('visible', 'show', true);
    },

    hide: function () {
        this.callNative('hide');
        this.set('visible', 'gone', true);
    }

});




; (function ($, Haf, ComponentManager) {


/**
* 弹出窗口容器。
*/
Haf.define('Haf.view.PopupWindow', {
    extend: 'Haf.view.Container',
    xtype: 'popupwindow',
    nativeEvents: {
        hide: 'dismiss'
    },

    nativeProps: {

        losable: 'losable',
        mask: 'mask',
        maskColor: 'maskColor',
        hasBorder: 'hasBorder',

        popAnimationType: {
            name: 'animation',
            values: {
                top: 2,
                right: 0,
                bottom: 3,
                left: 1
            }
        }
    },

    config: {
        losable: true, //是否易消失的，即点击窗口外部会自动关闭本窗口
        hasBorder: true,

        mask: {
            color: 'black',
            opacity: '80%'
        }
    },

    initialize: function (config) {

        var mask = config.mask;
        if (mask) {
            var color = 'black';
            var opacity = 0.5;

            if ($.Object.isPlain(mask)) {
                color = mask.color || color;
                opacity = mask.opacity === undefined ? opacity : mask.opacity;
            }

            this.set({
                mask: true,
                maskColor: Colors.get(color, opacity)

            }, true);
        }

        this.callSuper(arguments, config);
    },

    showAt: function (anchor, direction) {

        switch (typeof anchor) {
            case 'string':
                if (direction === undefined) { //此时为 showAt(alignType)
                    var alignType = Aligns[anchor];
                    if (alignType === undefined) {
                        throw Haf.error('无法识别的 anchor 参数: {0}', alignType);
                    }

                    this.callNative('showByAlignType', alignType);
                    break;
                }
                //注意，这里没有 break;

            case 'object':  //此时为 showAt(anchor, direction)
                anchor = ComponentManager.normalize(anchor);
                direction = Directions[direction];

                if (!direction) {
                    throw Haf.error('无法识别的 direction 参数: {0}', direction);
                }

                this.callNative('show', anchor, direction);
                break;

            case 'number': //此时为 showAt(x, y)
                var x = anchor;
                var y = direction;
                this.callNative('showAtPoint', x, y);
                break;

            default:
                throw Haf.error('无法识别参数 anchor 的类型');
        }

    },

    show: function () {
        this.showAt('center');
    },

    hide: function () {
        this.callNative('hide');
    }
});

//私有的
var Directions = {
    'left': 1,
    'top': 2,
    'right': 3,
    'bottom': 4
};

var Aligns = {
    'west north': 0,
    'north west': 0,
    'left top': 0,
    'top left': 0,

    'north': 1,
    'top': 1,

    'east north': 2,
    'north east': 2,
    'right top': 2,
    'top right': 2,

    'west': 3,
    'left': 3,

    'middle': 4,
    'center': 4,

    'east': 5,
    'right': 5,

    'west south': 6,
    'south west': 6,
    'left bottom': 6,
    'bottom left': 6,

    'south': 7,
    'bottom': 7,

    'east south': 8,
    'south east': 8,
    'right bottom': 8,
    'bottom right': 8
};

})(Haf, Haf, ComponentManager);





/**
 * 进度条。
 */
Haf.define('Haf.view.ProgressBar', {
    extend: 'Haf.view.Component',
    xtype: 'progressbar',
    nativeEvents:[],
    nativeProps: {
        progress: 'value'
    },

    config: {
        value: 0
    },

    getValue: function () {
        return this.get('value');
    },

    setValue: function (value) {
        this.updateUI('value', value);
    }
});



/**
* 可以选择一个或者多个的选择控件，选择内容为弹出框。
*/
Haf.define('Haf.view.Select', {
    extend: 'Haf.view.Component',
    xtype: 'select',
    nativeEvents: ['change'],
    nativeProps: [
        'hintText', //没有选中任何内容时，展示的信息
        'mode',     //single/mutiple。单选/多选
        'ellipsize' //省略号位置
    ],

    config: {
        hintText: '',       //没有选中任何内容时，展示的信息
        mode: 'single',     //单选/多选，single|mutiple。
        ellipsize: 'end',    //省略号位置，start|end|middle 三个值

        data: []
    },

    initialize: function (config) {
        var data = this.get('data');

        if (data.length > 0) {
            this.setData(data);
        }
    },

    setData: function (items) {
        this.callNative('setData', items);
    },

    setSelectedIndex: function (indexList) {
        this.callNative('setSelectedIndex', indexList);
    },

    getSelectedIndex: function () {
        return this.callNative('getSelectedIndex');
    }
    
});





/**
* 水平滑动条。
*/
Haf.define('Haf.view.Slider', {
    extend: 'Haf.view.Component',
    xtype: 'slider',
    nativeEvents: {
        slide: 'change'
    },
    nativeProps: {
        maxValue: 'max',
        currentValue: 'value'
    },

    config: {
        max: 100,
        value: 50
    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        var slide = config.slide; //处理快捷方式
        if (slide) {
            this.on('slide', slide);
        }

    }
});





; (function ($, Haf) {
/**
* 单行输入框
*/
Haf.define('Haf.view.TextInput', {
    extend: 'Haf.view.Component',
    xtype: 'textinput',

    nativeEvents: [
        'change',
        'focus',
        'blur'
    ],


    nativeProps: {
        
        text: 'value',
        hintText: 'placeHolder', //没有内容时候输入框的提示
        ellipsize: 'ellipsize',  //省略号位置

        //键盘类型（n数字/a字母/p密码)
        keyboardType: {
            name: 'keyboard',
            values: {
                number: 'n',
                alphabet: 'a',
                password: 'p',
                n: 'n',
                a: 'a',
                p: 'p'
            }
        },
         
        readOnly: 'readOnly',
        imeOption: 'imeOption'
    },


    config: {
        keyboard: 'alphabet',
        value: ''
    },

    reset: function () {

    }


});


})(Haf, Haf);




; (function ($, Haf) {

/**
* 多行输入框
*/
Haf.define('Haf.view.TextArea', {
    extend: 'Haf.view.TextInput',
    xtype: 'textarea',
    config: {
        maxRows: 0
    }

});

})(Haf, Haf);



; (function ($, Haf) {



/**
* 
*/
Haf.define('Haf.view.Toast', {
    extend: 'Haf.view.Component',
    xtype: 'toast',
    nativeEvents: [],
    nativeProps: [
        'message',
        'valign' // top|middle|bottom
    ],

    config: {
        message: '',
        valign: 'middle'
    },

    show: function (duration) {
        this.callNative('show', duration);
    }
});


})(Haf, Haf);




/**
* Toogle 开关
*/
Haf.define('Haf.view.Toggle', {
    extend: 'Haf.view.Component',
    xtype: 'toggle',

    nativeEvents: {
        toggle: 'change'
    },

    nativeProps: [
        'checked'
    ],

    config: {

    }

});




; (function (Haf, $) {



/**
* Viewport 单实例，代表应用的可展示区域。
*/
Haf.define('Haf.Viewport', {
    extend: 'Haf.view.Container',
    singleton: true,

    config: {
              
    },

    initialize: function (config) {

        this.callSuper(arguments, config, true);
        Meta.set(this, 'parent', this); //让 Haf.Viewport 的 parent 指向自己
    },

    addItem: function (component) {

        return this.callSuper(arguments, component, function (componentId, containerId) {
            Hae.ViewPort.addComponent(componentId);
        });
        
    },

    remove: function (component) {

        //调用容器类的 remove 方法，同时提供自己的 native 方法。 
        return this.callSuper(arguments, component, function (componentId, containerId) {
            Hae.ViewPort.removeComponent(componentId);
        });
    }
    
});





})(Haf, Haf);






; (function ($, Haf) {



/**
* 渲染 Web 内容的控件
*/
Haf.define('Haf.view.WebView', {
    extend: 'Haf.view.Component',
    xtype: 'webview',
    nativeEvents: [],
    nativeProps: {
        zoomControlEnabled: 'zoomable'
    },

    config: {
        zoomable: true,
        html: '',
        url: ''
    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        if (config.html) {
            this.loadHtml(config.html);
        }
        else if (config.url) {
            this.loadUrl(config.url);
        }
    },

    loadHtml: function (html) {
        this.callNative('loadHTML', html);
    },

    loadUrl: function (url) {

        this.callNative('loadUrl', url);
    }
});


})(Haf, Haf);




/**
* Field 基类的私有辅助工具
*/
var FieldHelper = (function ($, Haf, ClassManager, ComponentHelper, ComponentStyle) {


    var xtype$sample = {};

    function getSample(xtype) {

        var sample = xtype$sample[xtype];
        if (!sample) {
            sample = xtype$sample[xtype] = Haf.create({
                xtype: xtype
            });
        }

        return sample;
    }



    function hook(self, listeners) {

        //钩子函数，让函数内部的 this 指向当前的复合组件实例
        var obj = $.Object.map(listeners, function (key, value) {

            if (typeof value == 'function') {
                return function () {
                    var args = $.Array.parse(arguments);
                    value.apply(self, args);
                }
            }

            if ($.Object.isPlain(value)) {
                var fn = value.fn;
                if (typeof fn != 'function') {
                    throw Haf.error('listners.{0} 中的 fn 成员必须为一个函数', key);
                }

                return $.Object.extend({}, value, {
                    fn: function () {
                        var args = $.Array.parse(arguments);
                        fn.apply(self, args);
                    }
                });
            }

            throw Haf.error('无法识别 listeners.{0} 中的值', key);
        });

        return obj;
    }


    

    //创建 field 项
    function createFieldItem(self, compositeConfig) {
        
        //创建样本，一个 xtype 只创建一次，以后复用
        var xtype = self.fieldXtype;
        var sample = getSample(xtype);
        

        //首先用排除法，从复合的 config 中移除已经明确不属于自己的成员。
        var config = $.Object.remove(compositeConfig, [
            'id',
            'name',
            'value',
            'label',
            'labelWidth'
        ]);

        //移除所有样式，因为样式是属于整个复合控件的
        config = ComponentStyle.removeStyles(config, true);

        //config = $.Object.grep(config, function (key, value) {

        //    return ComponentHelper.isNativeProp(sample, key) ||
        //        ComponentHelper.isNativeEvent(sample, key);
        //});

        var listeners = compositeConfig.listeners;
        if (listeners) {
            listeners = $.Object.grep(listeners, function (key, value) {
                return ComponentHelper.isNativeEvent(sample, key);
            });

            config.listeners = hook(self, listeners);
        }

        var handlers = $.Object.grep(config, function (key, value) {
            return typeof value == 'function' &&
                ComponentHelper.isNativeEvent(sample, key);
        });
        handlers = hook(self, handlers);

        $.Object.extend(config, handlers, {
            xtype: xtype,
            valign2container: 'middle',
            width: 'fill' //默认使用填满的方式，但指定了 labelWidth 为百分比的时候，width 会给设为 0 以禁用。
        });

        var valueField = self.valueField;
        if (valueField) { //指定了 valueField，表示要进行关联 self -> filedItem
            config[valueField] = compositeConfig.value;

            //监听 self.set('value', value)
            self.onchange('value', function (newValue, oldValue) {
                fieldItem.set(valueField, newValue);
            });
        }

        var fieldItem = Haf.create(config);
        return fieldItem;
    }




    //创建 label 项
    function createLabelItem(self, compositeConfig) {

        var config = {
            xtype: 'label',
            autoUpdateUI: true,
            height: 'fill',
            valign2container: 'middle'
        };

        var required = compositeConfig.required;

        var label = compositeConfig.label;
        if ($.Object.isPlain(label)) {
            if (required) {
                label.text += '*';
            }
            $.Object.extendSafely(config, label);
        }
        else {
            if (required) {
                label += '*';
            }

            config.text = label;
        }

        var labelWidth = compositeConfig.labelWidth;
        if ($.String(labelWidth).endsWith('%')) {
            config.flex = parseInt(labelWidth);
            config.width = 0;
        }
        else if (labelWidth) {
            config.width = labelWidth;
        }

        var labelItem = Haf.create(config);

        if (compositeConfig.required) {
            
        }


        self.onchange({
            label: function (newValue, oldValue) {
                if ($.Object.isPlain(newValue)) {
                    labelItem.set(newValue);
                }
                else {
                    labelItem.set('text', newValue);
                }
            },

            labelWidth: function (newValue, oldValue) {

                if ($.String(newValue).endsWith('%')) {
                    var flex = parseInt(newValue);

                    labelItem.set({
                        flex: flex,
                        width: 0 //禁用 width
                    });

                    self.getFieldItem().set('flex', 100 - flex);
                }
                else {
                    labelItem.set('width', newValue);
                }
            }
        });


        return labelItem;
    }

    function getStyles(compositeConfig) {

        return ComponentStyle.filterStyles(compositeConfig, true);
    }


    return {
        createLabelItem: createLabelItem,
        createFieldItem: createFieldItem,
        getStyles: getStyles
    };


})(Haf, Haf, ClassManager, ComponentHelper, ComponentStyle);






; (function ($, Haf, FieldHelper) {


/**
* Field 抽象类。
* 复合控件，提供一个 Box 容器，内含一个 Label 和一个 Field 组件。
*/
Haf.define('Haf.view.Field', {
    extend: 'Haf.view.Box',
    xtype: 'field',
    'abstract': true,

    config: {
        label: '',
        labelWidth: '',
        name: '',
        value: '',
        required: false
    },

    initialize: function (compositeConfig) {
        
        var labelItem = FieldHelper.createLabelItem(this, compositeConfig);
        var fieldItem = FieldHelper.createFieldItem(this, compositeConfig);

        var flex = labelItem.get('flex'); //label 指定了 flex
        if (flex) {
            fieldItem.set({
                flex: 100 - flex,
                width: 0 //禁用 width
            }, true);
            fieldItem.updateUI();
        }


        var config = $.Object.extend({}, compositeConfig, {

            xtype: 'box',
            layout: 'vbox',
            width: 'fill',

            //移除 fieldItem 中的 native 事件
            listeners: $.Object.remove(compositeConfig.listeners, fieldItem.nativeEvents),

            items: [
                {
                    xtype: 'box',
                    layout: 'hbox',
                    valign: 'middle',
                    //backgroundColor: '#80000000',
                    background: '#F7F7F7',

                    scrollable: false, //横向布局时，这个要禁用，不然无法填满宽度
                    width: 'fill',
                    height: 'auto',

                    items: [
                        labelItem,
                        fieldItem
                    ]
                },
                {
                    xtype: 'label',
                    height: '2px',
                    width: 'fill',
                    border: compositeConfig.noLine ? null : 'solid 1px #DDDDDD'
                }
            ]
            
        });

        this.callSuper(arguments, config);

    },

    getLabelItem: function () {

        return this.getItem(0).getItem(0);
    },

    getFieldItem: function () {

        return this.getItem(0).getItem(1);
    },

    get: function (key) {

        var valueField = this.valueField;
        if (valueField && key == 'value') { //get('value')
            var fieldItem = this.getFieldItem();
            var value = fieldItem.get(valueField);
            return value;
        }

        return this.callSuper(arguments, key);
    },

    getValue: function () {
        return this.get('value');
    },

    setValue: function (value) {
        this.set('value', value);
    },

    reset: function () {

    }
});



})(Haf, Haf, FieldHelper);







; (function (Haf, $) {


/**
* 多个表单字段容器。
*/
Haf.define('Haf.view.FieldSet', {
    extend: 'Haf.view.Box',
    xtype: 'fieldset',

    config: {
       
    },

    initialize: function (config) {


        this.callSuper(arguments, {
            layout: 'vbox',
            //background: '#EEEEEE',
            background: 'blue',
            defaults: {
                margin: 20
            },

            items: [
                {
                    xtype: 'label',
                    text: config.title,
                    fontSize: 20,
                    fontColor: '#333333'
                },
                {
                    xtype: 'box',
                    border: 'solid 1px red',
                    layout: 'vbox',
                    borderRadius: 10,
                    background: '#F7F7F7',
                    //background: 'green',
                    defaults: config.defaults,
                    items: config.items
                },
                {
                    xtype: 'label',
                    text: config.instructions,
                    fontSize: 12,
                    fontColor: '#808080'
                }
            ]
        });
       

    }
});



})(Haf, Haf);





/**
* 单行输入框
*/
Haf.define('Haf.view.TextField', {
    extend: 'Haf.view.Field',
    xtype: 'textfield',
    fieldXtype: 'textinput',

    valueField: 'value',

    config: {

    }


});



/**
* 数字输入框
*/
Haf.define('Haf.view.NumberField', {
    extend: 'Haf.view.TextField',
    xtype: 'numberfield',


    config: {
        minValue: null,
        maxValue: null
    },

    initialize: function (config) {

        this.callSuper({}, config, {
            keyboard: 'number'
        });


    },

    configListeners: {
        value: {
            when: 'before',
            fn: function (value, oldValue) {
                if (typeof value != 'number') {
                    throw Haf.error('value 的类型必须为 number');
                }

                var minValue = this.get('minValue');
                if (minValue !== null && value < minValue) {
                    throw Haf.error('value 的最小值不能小于 {0}', minValue);
                }

                var maxValue = this.get('maxValue');
                if (maxValue !== null && value > maxValue) {
                    throw Haf.error('value 的最大值不能大于 {0}', maxValue);
                }

                return value;
            }
        }
    },


    get: function (key) {

        if (key == 'value') { //get('value')
            var fieldItem = this.getFieldItem();
            var value = fieldItem.get(key);
            return Number(value);
        }

        return this.callSuper(arguments, key);
    }


});



/**
* 多行输入框
*/
Haf.define('Haf.view.TextAreaField', {
    extend: 'Haf.view.TextField',
    xtype: 'textareafield',
    fieldXtype: 'textarea',

    config: {

    }

});




; (function (Haf, $) {


/**
* ToggleField 类。
*/
Haf.define('Haf.view.ToggleField', {
    extend: 'Haf.view.Field',
    xtype: 'togglefield',
    fieldXtype: 'toggle',

    config: {

    }
});



})(Haf, Haf);






/**
* 单行输入框
*/
Haf.define('Haf.view.SliderField', {
    extend: 'Haf.view.Field',
    xtype: 'sliderfield',

    fieldXtype: 'slider',
    valueField: 'value'

});


/**
* 单行输入框
*/
Haf.define('Haf.view.NavigationView', {
    extend: 'Haf.view.Card',
    xtype: 'navigationview',


    config: {

    },

    push: function (item) {
        item = this.addItem(item);
        this.setActiveItem(item);
        this.trigger('push', [item]);
    },

    pop: function () {
        var item = this.callSuper(arguments); //先移除最后一项

        var count = this.getCount();
        if (count > 0) {
            this.setActiveItem(count - 1);
        }

        this.trigger('pop', [item]);
    }

});



; (function (global, $, Haf, ComponentManager) {




//重写 global.Haf 为一个有实际意义的函数
//同时提供 $ 的别名
global.Haf = global.$ = function (name, config) {


    if ($.Object.isPlain(name)) {
        config = name;
        name = undefined;
        return Haf.create(config);
    }

    if (typeof name == 'string') {
        if ($.Object.isPlain(config)) {
            return Haf.define(name, config);
        }

        if (config === undefined) {
            return ComponentManager.get(name.slice(1)); //$('#id')
        }
    }
};

$.Object.extend(global.Haf, Haf);


})(global, Haf, Haf, ComponentManager);






})( this, Haf /*, undefined*/ ); 
//结束 haf.js
//<================================================================================================================

