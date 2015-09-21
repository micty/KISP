//以下文件由 ant 合并生成于 2013-09-23 13:56:36




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


})(Haf, console);



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
    var dv = Device,          //native注入的对象
        vp = ViewPort,        //native注入的对象
        dpis = {
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
        dpi: dpis[dv.density],
        /**
         * 设备的cpu频率，单位Mhz
         */
        cpu: dv.cpu,
        /**
         * 获取设备的物理内存
         */
        mem: dv.mem,
        /**
         * phone/pad
         */
        profile: dv.screenInch > 4.5 ? 'pad' : 'phone',
        /**
         * Android/iOS
         */
        os: dv.os,
        /**
         * 操作系统版本
         */
        osVersion: dv.osVersion,
        /**
         * 获取设备厂商信息
         */
        vendor: dv.vendor,
        /**
         * 返回设备型号，类似.iPhone4/S3等信息
         */
        model: dv.model,
        /**
         * 获取viewport的宽度,这里的单位为程序坐标！
         */
        viewportWidth: vp.absoluteWidth / dv.density,
        /**
         * 获取viewport的高度,这里的单位为程序坐标！
         */
        viewportHeight: vp.absoluteHeight / dv.density,
        /**
         * 将包含适配信息的路径替换为实际的路径
         * @image的写法时参照android的
         * res/@image/abc.png==>res/image-hdpi/abc.png
         * @param path
         */
        adapterPath: function (path) {
            return path.replace(/@(\w*)/g, function (m) {
                var v = m.replace('@', '');
                return v + '-' + dpis[dv.density];
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

    var totalKey = 'ClassManager.createGuid.total';
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
    var name$superDatas = {};   //维护 { className: [父类A.data, ... 当前类.data] } 的关系，其中 A 是 N 的父类


    //一对多的关系
    var xtype$childXtypes = {}; //维护 { xtype: [直接子类xtype] } 的关系
    var name$childNames = {};   //维护 { clasName: [直接子类className] } 的关系


    /**
    * 获取指定类名的所有父类名，返回一个数组。
    * 该方法从继承层次上向上搜索所有的父类类名，但不包括根类 Haf.Base。
    */
    function getSuperNames(className, includingSelf) {
        
        if (typeof className == 'object') { //此时传进来的是一个实例
            className = className.getType();
        }

        var a = includingSelf ? [ className ] : [];

        var superName = name$superName[className];
        while (superName) {

            a.push(superName);
            superName = name$superName[superName];
        }

        a.length = a.length - 1; //去掉最后一项 Haf.Base

        return a;
    }

    /**
    * 获取指定 xtype 的所有父类的 xtype，返回一个数组
    * 该方法从继承层次上向上搜索所有父类的 xtype，但不包括根类 Haf.Base。
    */
    function getSuperXtypes(xtype, includingSelf) {

        var className = xtype$name[xtype]; //xtype -> className

        var list = getSuperNames(className, includingSelf);

        return $.Array.map(list, function (name, index) {

            var data = getData(name);
            var xtype = data.xtype;

            if (xtype) {
                return xtype;
            }

            throw Haf.error('{0} 类的 xtype 不存在。', name);
        });
    }


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

        //维护 {className: config} 的集合
        var superConfig = name$config[superName]; //父类的 config
        name$config[className] = $.Object.extend({}, superConfig, data.config);


        //维护 {className: superClassName} 的关系
        name$superName[className] = superName;


        var superDatas = name$superDatas[superName] || [];
        superDatas.push(data);
        name$superDatas[className] = superDatas;



        //把当前类的 className 存入 name$childNames 对应的父类数组中
        var childNames = name$childNames[superName] || [];
        childNames.push(className);
        name$childNames[superName] = childNames;

        if (xtype) { //创建类时指定了 xtype

            //找到父类的 xtype
            var superXtype = superName == baseName ?
                baseXtype : 
                getData(superName).xtype;

            xtype$superXtype[xtype] = superXtype;

            //找到父类所关联的子 xtype 数组，并把当前的 xtype 添加进去。
            var childXtypes = xtype$childXtypes[superXtype] || [];
            childXtypes.push(xtype);
            xtype$childXtypes[superXtype] = childXtypes;
            
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

    function isSingleton(className) {

        var data = name$data[className];
        if (!data) {
            return false;
        }

        return data.singleton === true;
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

            //if ($.Object.isArray(item)) { //优化 #3-0
            if( item instanceof Array) { //优化 #3-1
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



    /**
    * 创建指定类名的 guid。
    * 该 guid 由该类的类名、由该类的创建出来的实例总数、总的实例数三部分组成。
    * @param {string} className 创建实例时所用的类名。
    * @return {string} 返回一个具有全局唯一性的 guid 字符串。
    */
    function createGuid(className) {

        //var formatter = $.String.format('{className}:{index}/{id}', {
        //    className: className,       //
        //    index: '{0}',               //标识当前类创建出来的实例总数
        //    id: $.Guid.get(totalKey)    //标识创建出来的实例总数
        //});
        //return $.Guid.get(className, formatter);

        return className + ':' + $.Guid.next(className) + '/' + $.Guid.next(totalKey);
    }
    

    //ClassManager = 
    return {

        getSuperNames: getSuperNames,
        getSuperXtypes: getSuperXtypes,

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

        getSuperDatas: function (className) {
            return name$superDatas[className];
        },

        getSuperListeners: function (className) {
            var datas = name$superDatas[className];
            var a = $.Array.map(datas, function (data, index) {
                return data.listeners || null;
            });

            return a.length > 0 ? a : null;
        },

        getSuperConfigListeners: function (className) {
            var datas = name$superDatas[className];
            var a = $.Array.map(datas, function (data, index) {
                return data.configListeners || null;
            });
            return a.length > 0 ? a : null;
        },

        setClass: setClass,
        getClass: getClass,

        isSingleton: isSingleton,

        createPrototype: createPrototype,
        bindConfigListeners: bindConfigListeners,

        isInstanceOf: isInstanceOf,
        createGuid: createGuid,

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


        var listeners = ClassManager.getSuperListeners(className);
        var configListeners = ClassManager.getSuperConfigListeners(className);
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

        ////通知外部 define 完成
        //ClassEvent.trigger(className);

        //if (data.xtype) { //外部请不要同时绑定 className 和 xtype 的，否则都会触发
        //    ClassEvent.triggerXtype(data.xtype);
        //}

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



; (function (Haf, $, ClassManager) {




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

})(Haf, Haf, ClassManager);


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


