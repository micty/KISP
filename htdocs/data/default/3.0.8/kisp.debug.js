/*
* KISP - KISP JavaScript Library
* name: default 
* version: 3.0.8
* build: 2015-12-21 16:03:25
* files: 117(115)
*    partial/default/begin.js
*    core/Module.js
*    core/$.js
*    core/MiniQuery.js
*    core/IScroll.js
*    core/KISP.js
*    crypto/MD5.js
*    excore/Config.js
*    excore/Defaults.js
*    excore/Config/Url.js
*    excore/Edition.js
*    excore/File.js
*    excore/Fn.js
*    excore/JSON.js
*    excore/LocalStorage.js
*    excore/Mapper.js
*    excore/Module.js
*    excore/RandomId.js
*    excore/SessionStorage.js
*    excore/Style.js
*    excore/Url.js
*    api/API.js
*    api/API/Ajax.js
*    api/SSH.js
*    api/SSH/Ajax.js
*    api/SSH/Server.js
*    api/SSH/Server/Config.js
*    api/SSH.API.js
*    api/SSH.API/Ajax.js
*    api/Proxy.js
*    api/Proxy/Url.js
*    third-party/cloud-home/CloudHome/Native.js
*    third-party/cloud-home/CloudHome.API.js
*    third-party/cloud-home/CloudHome.js
*    third-party/cloud-home/CloudHome.Title.js
*    third-party/cloud-home/ImageReader/Renderer.js
*    third-party/cloud-home/ImageReader.js
*    third-party/wechat/WeChat/JsApiList.js
*    third-party/wechat/WeChat/Lib.js
*    third-party/wechat/WeChat/Signature.js
*    third-party/wechat/WeChat.js
*    ui/App.js
*    ui/App/Nav.js
*    ui/App/Transition.js
*    ui/dialog/Alert.js
*    ui/dialog/Alert/Dialog.js
*    ui/dialog/Alert/Sample.html
*    ui/dialog/Confirm.js
*    ui/dialog/Dialog.js
*    ui/dialog/Dialog/Sample/iOS.html
*    ui/dialog/Dialog/Renderer.js
*    ui/dialog/Dialog/Sample.js
*    ui/dialog/Dialog/Style.js
*    ui/dialog/ImageViewer.js
*    ui/dialog/Loading.js
*    ui/dialog/Loading/Sample/iOS.html
*    ui/dialog/Loading/Presettings.js
*    ui/dialog/Loading/Sample.js
*    ui/dialog/Loading/Style.js
*    ui/dialog/Mask.js
*    ui/dialog/Mask/Sample.html
*    ui/dialog/Mask/Style.js
*    ui/dialog/Toast.js
*    ui/dialog/Toast/Sample/font-awesome.html
*    ui/dialog/Toast/Renderer.js
*    ui/dialog/Toast/Sample.js
*    ui/dialog/Toast/Style.js
*    ui/Navigator.js
*    ui/NoData.js
*    ui/NoData/Renderer.js
*    ui/NoData/Sample.html
*    ui/NoData/Style.js
*    ui/NumberPad.js
*    ui/NumberPad/Renderer.js
*    ui/NumberPad/Sample.html
*    ui/NumberPad/Style.js
*    ui/Panel.js
*    ui/Scroller/pull.js
*    ui/Scroller.js
*    ui/Tabs.js
*    ui/Tabs/Helper.js
*    ui/Template.js
*    ui/Template/Multiple.js
*    ui/Template/Simple.js
*    ui/Template/Static.js
*    ui/View.js
*    jquery-plugin/touch.js
*    partial/default/defaults/api/API.js
*    partial/default/defaults/api/Proxy.js
*    partial/default/defaults/api/SSH.API.js
*    partial/default/defaults/api/SSH.js
*    partial/default/defaults/api/SSH/Server.js
*    partial/default/defaults/api/SSH/Server/Config.js
*    partial/default/defaults/excore/LocalStorage.js
*    partial/default/defaults/excore/Module.js
*    partial/default/defaults/excore/SessionStorage.js
*    partial/default/defaults/excore/Url.js
*    partial/default/defaults/third-party/CloudHome.API.js
*    partial/default/defaults/third-party/ImageReader.js
*    partial/default/defaults/third-party/WeChat.js
*    partial/default/defaults/third-party/WeChat/Signature.js
*    partial/default/defaults/ui/Alert.js
*    partial/default/defaults/ui/App.js
*    partial/default/defaults/ui/Dialog.js
*    partial/default/defaults/ui/ImageViewer.js
*    partial/default/defaults/ui/Loading.js
*    partial/default/defaults/ui/Mask.js
*    partial/default/defaults/ui/NoData.js
*    partial/default/defaults/ui/NumberPad.js
*    partial/default/defaults/ui/Panel.js
*    partial/default/defaults/ui/Scroller.js
*    partial/default/defaults/ui/Tabs.js
*    partial/default/defaults/ui/Template.js
*    partial/default/defaults/ui/Toast.js
*    partial/default/defaults/ui/View.js
*    partial/default/expose.js
*    partial/default/end.js
*/
;( function (
    global, 

    top,
    parent,
    window, 
    document,
    location,
    navigator,
    localStorage,
    sessionStorage,
    console,
    history,
    setTimeout,
    setInterval,

    JSON,

    Array, 
    Boolean,
    Date,
    Error,
    Function,
    Math,
    Number,
    Object,
    RegExp,
    String,
    
   
    //$,
    jQuery,
    MiniQuery,
    IScroll,

    undefined
) {



/**
* KISP 内部模块管理器
* @ignore
*/
var Module = (function () {

    var Module = MiniQuery.require('Module');

    var mod = new Module({
        seperator: '/',
        crossover: true,
        repeated: false, //不允许重复定义 
    });

    return {
        define: mod.define.bind(mod),
        require: mod.require.bind(mod), //该方法仅用于 end.js 中
        expose: mod.expose.bind(mod),
        modules: mod.modules.bind(mod),
        tree: mod.tree.bind(mod),

        /**
        * 绑定到指定模块的指定方法。
        * @param {string} id 模块的名称(id)。
        * @param {string} name 模块的方法名称。
        * @param {Object|boolean} context 绑定的方法执行时的上下文，即 this 变量的指向。
            如果传入 true，则表示当前要绑定的模块本身。
        * @return {function} 返回绑定后的方法。
        */
        bind: function (id, name, context) {
            return function () {
                var M = mod.require(id);
                var args = [].slice.call(arguments, 0);
                context = context === true ? M : context;
                M[name].apply(context || null, args);
            };
        },
    };

})();

//提供快捷方式
var define = Module.define;
var require = Module.require;





/**
* jQuery 框架命名空间。
* 该命名空间会融合 MiniQuery 的成员，因此大多数情况它既表示 jQuery，又表示 MiniQuery。
* @namespace
* @name $
*/
define('$', function (require, module, exports) {
    MiniQuery.use('jQuery');
    return jQuery;
    //return $;
});

/**
* MiniQuery 框架命名空间
* @namespace
* @name MiniQuery
*/
define('MiniQuery', function (require, module,  exports) {
    return MiniQuery;
});

/**
* IScroll ��������
* ��Ҫ�ṩֱ�Ӳ���ԭʼ�ĵ��������� iScroll ��������
* @class
* @name IScroll
*/
define('IScroll', function (require, module,  exports) {
    return IScroll;
});

/**
* KISP 框架命名空间
* @namespace
* @name KISP
*/
define('KISP', function (require, module, exports) {

    var cfg = null; //for data

    module.exports = exports = /**@lends KISP*/ {

        /**
        * 名称。 (由 grunt 自动插入)
        */
        name: 'default', //由 grunt 自动插入

        /**
        * 版本号。 (由 grunt 自动插入)
        */
        version: '3.0.8', //由 grunt 自动插入

        /**
        * 文件列表。 (由 grunt 自动插入)
        * 
        */
        files: [], //由 grunt 自动插入

        /**
        * 获取已经定义的所有模块的描述信息。
        * @function
        */
        modules: Module.modules,

        /**
        * 加载 KISP 框架内公开的模块。
        * @param {string} id 模块的名称(id)。
        * @return {Object} 返回模块的导出对象。
        * @example
        *   var API = KISP.require('API');    
        */
        require: function (id) {
            return Module.expose(id) ? require(id) : null;
        },

        /**
        * 调用 KISP 框架内公开的模块的指定方法，并可传递一些参数。
        * @param {string} id 模块的名称(id)。
        * @param {string} name 要调用的方法名称。
        * @param {Array} args 要传递参数列表。
        * @return 返回方法执行后的返回结果。
        */
        invoke: function (id, name, args) {
            var M = exports.require(id);
            if (!M) {
                throw new Error('不存在该模块或该模块为非公开模块。');
            }

            var fn = M[name];
            if (typeof fn != 'function') {
                throw new Error('模块 ' + id + ' 不存名为 ' + name + ' 的方法。');
            }

            return fn.apply(M, args);
        },

        /**
        * 加载 KISP 框架内公开的模块，并创建它的一个实例。
        * @param {string} id 模块的名称(id)
        * @param {Object} config 要创建实例时的配置参数。
        * @return {Object} 返回该模块所创建的实例。
        * @example
        *   var api = KISP.create('API', {});  
        *   //相当于
        *   var API = KISP.require('API');
        *   var api = new API({});
        */
        create: function (id, config) {
            var M = exports.require(id);

            if (typeof M != 'function') {
                return null;
            }

            var a = arguments;
            var len = a.length - 1;

            return len == 0 ? new M() : 
                len == 1 ? new M(config) :
                len == 2 ? new M(config, a[len]) :
                len == 3 ? new M(config, a[2], a[len]) :
                len == 4 ? new M(config, a[2], a[3], a[len]) : 
                len == 5 ? new M(config, a[2], a[3], a[4], a[len]) : null;
        },

        /**
        * 响应一个代理请求。
        * 相当于 Proxy.response() 的别名。
        * @function
        * @example
        *   KISP.proxy({
	            code: 200,
                msg: 'ok',
                data: {},
            });    
        */
        proxy: Module.bind('Proxy', 'response'),

        /**
        * 获取或 设置 KISP 内部模块的默认配置。
        * @function
        * @example
        *   KISP.config({});    
        */
        config: function (name, value) {

            var Defaults = require('Defaults');

            //get(name)
            if (typeof name == 'string' && arguments.length == 1) { 
                return Defaults.get(name);
            }

            //set
            Defaults.set(name, value);

        },

        /**
        * 给上层业务端提供存取配置数据的方法。
        * 已重载成 get 和 set 两种方式。 
        * 字符串中的 {~} 表示站头的根地址；{@} 表示使用的文件版本 debug 或 min。
        * @param {string} name 要存储的数据的名称。
        * @param value 要存储的数据的值，可以是任何类型。
        *   当不提供此参数时，则为 get 操作；否则为 set 操作。
        */
        data: function (name, value) {

            if (!cfg) { //首次使用
                var Config = require('Config');
                cfg = new Config();
            }

            // 重载批量设置 data({...})
            if (typeof name == 'object') { 
                cfg.set(name);
                return;
            }

            //重载 data(name)
            if (arguments.length == 1) {
                return cfg.get(name);
            }

            cfg.set(name, value);

        },

        /**
        * 弹出 alert 虚拟窗口。
        * @param {string|Object} text 要显示的消息文本。
            如果指定为一个对象，则先调用 JSON.string(text, null, 4) 得到字符串再进行显示。
        */
        alert: function (text, text1, textN, fn) {

            var args = [].slice.call(arguments, 0);

            var Alert = require('Alert');
            Alert.show.apply(null, args);
           
        },

        /**
        * 弹出简单的 confirm 虚拟窗口。
        * @param {string} text 要显示的消息文本。
        * @param {function} fn 点击“确定”按钮后执行的回调函数。
        */
        confirm: function (text, fn) {
            var Confirm = require('Confirm');
            Confirm.show(text, fn);
        },

        /**
        * 初始化执行环境，并启动应用程序。
        * 该方法会预先定义一些公共模块，然后定义一个匿名模块并启动它。
        * @param {function} factory 工厂函数，即启动函数。
        */
        launch: function (factory) {

            var App = require('App');
            var app = new App('');

            var Config = require('Config');
            var config = Config.clone('App');

            var type = config.type;
            if (type == 'standard') {
                app.render(factory);
            }
            else {
                app.launch(factory);
            }


        },


        

    };
});


define('MD5', function (require, module,  exports) {

    /*md5 生成算法*/
    var hexcase = 0;
    var chrsz = 8;


    function core_md5(x, len) {

        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }
    function str2binl(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
        }
        return bin;
    }
    function binl2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }



    return {

        //md5加密主方法
        encrypt: function (s) {

            if (arguments.length > 1) {
                s = Array.prototype.slice.call(arguments, 0).join('');
            }

            return binl2hex(core_md5(str2binl(s), s.length * chrsz));
        }

    };

});


/**
* 配置工具类。
* @class
* @name Config
*/
define('Config', function (require, module,  exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Mapper = MiniQuery.require('Mapper');
    var mapper = new Mapper();


    /**
    * 构造器。
    */
    function Config() {

        Mapper.setGuid(this);

        var meta = {
            'name$config': {},
            'name$formatted': {},
        };

        mapper.set(this, meta);
    }

    //实例方法
    Config.prototype = /**@lends Config#*/ {
        constructor: Config,

        /**
        * 设置指定模块的默认配置。
        * 已重载 set({...})，因此可以批量设置。
        * @param {string} name 要设置的模块的名称。
        * @param {Object} config 要设置的默认配置对象。
        */
        set: function (name, config) {

            var meta = mapper.get(this);
            var name$config = meta.name$config;
            var name$formatted = meta.name$formatted;

            if (typeof name == 'object') { //批量设置: set({...})
                $.Object.each(name, function (name, config) {
                    setItem(name, config);
                });
            }
            else { //单个设置 set(name, config)
                setItem(name, config);
            }
            

            //内部共用方法，设置单个模块的默认配置对象。
            function setItem(name, config) {

                var obj;

                if (name in name$config) {
                    obj = name$config[name];
                    if ($.Object.isPlain(obj)) { //纯对象
                        obj = $.Object.extend(obj, config); //则合并
                    }
                    else { //其他的，则重设
                        obj = name$config[name] = config;
                    }
                }
                else { //首次设置
                    obj = name$config[name] = config;
                }


                //第一次或重新设置了 config，让其 formatted 指示已失效
                name$formatted[name] = false;

                return obj;
            }

        },



        /**
        * 获取指定模块名称的默认配置。
        * @param {string|object} name 要获取的模块的名称。
        *   或者传入 module 对象，会读取其 id。
        * @return {Object} 返回该模块的默认配置对象。
        */
        get: function (name) {

            var meta = mapper.get(this);
            var name$config = meta.name$config;
            var name$formatted = meta.name$formatted;

            if (typeof name == 'object') { // 重载 get(module)
                name = name.id;
            }

            var config = name$config[name];

            if (!$.Object.isPlain(config)) { //非纯对象，直接返回即可
                return config;
            }

            //这个模块特殊，不用也不能转换，否则会构成 require 死循环。
            if (name == 'Url') { 
                return config;
            }

            var formatted = name$formatted[name];

            if (!formatted) { //该模块的配置对象里尚未格式化 url，

                var Url = module.require('Url');
                config = Url.format(config);
                name$config[name] = config; //回写
                name$formatted[name] = true;
            }

            return config;
        },

        /**
        * 获取并克隆指定模块名称的默认配置。
        * @param {string} name 要获取的模块的名称。
        * @param {Object} [target] 需要合并的对象。
        *   如果需要提供额外的合并成员，可指定此参数。
        * @return {Object} 返回该模块的默认配置对象的克隆版本。
        */
        clone: function (name, target, target1, targetN) {
            var config = this.get(name);

            var args = [].slice.call(arguments, 1);
            args = [{}, config].concat(args);

            return $.Object.extendDeeply.apply(null, args);

        },

    };


    var Defaults = require('Defaults');

    //静态方法
    return $.Object.extend(Config, /**@lends Config*/{

        'get': Defaults.get,
        'set': Defaults.set,
        'clone': Defaults.clone,

    });
});


/**
* KISP 内部模块使用的默认配置管理器。
* @namespace
* @name Defaults
*/
define('Defaults', function (require, module, exports) {

    var $ = require('$');

    var cfg = null;
    var name$used = {}; // { 模块名: 已经使用了默认配置 }



    //使用默认配置
    function use(name) {
        if (name$used[name]) {
            return;
        }

        if (!cfg) {
            var Config = require('Config');
            cfg = new Config();
        }

        var obj = require(name + '.defaults');
        cfg.set(name, obj);

        name$used[name] = true;
    }




    module.exports = exports = /**@lends Defaults*/ {

        set: function (name, config) {
            if (typeof name == 'object') { //批量设置: set({...})
                $.Object.each(name, function (name, config) {
                    use(name);
                    cfg.set(name, config);
                });
            }
            else { //单个设置 set(name, config)
                use(name);
                cfg.set(name, config);
            }
        },

        get: function (name) {
            if (typeof name == 'object') { // 重载 get(module)
                name = name.id;
            }

            use(name);
            return cfg.get(name);
        },


        clone: function (name, target, target1, targetN) {

            var config = exports.get(name);

            var args = [].slice.call(arguments, 1);
            args = [{}, config].concat(args);

            return $.Object.extendDeeply.apply(null, args);
        },

    };

});



/**
* 配置工具的 Url 工具类。
* @namespace
*/
define('Config/Url', function (require, module,  exports) {

    var $ = require('$');

    /**
    * 递归扫描并转换 url 成真实的地址。
    */
    function format(config) {

        var Url = require('Url');

        return $.Object.map(config, function (key, value) {

            if (typeof value == 'string') {
                return Url.format(value);
            }

            if (value instanceof Array) {

                return $.Array.keep(value, function (item, index) {

                    if (typeof item == 'string') {
                        return Url.format(item);
                    }

                    if (typeof item == 'object') {
                        return formatUrl(item); //递归
                    }

                    return item;

                }, true);
            }

            return value;

        }, true); //深层次来扫描

    }


    return {
        format: format,
    };


});



/**
* 版本工具类
* @namespace
* @name Edition
*/
define('Edition', function (require, module, exports) {

    var $ = require('$');
    var current = 'debug';


    return /**@lends Edition*/ {

        /**
        * 获取当前版本的名称。
        */
        get: function () {
            return current;
        },

        /**
        * 设置当前版本的名称。
        * @param {string} name 版本的名称，仅限于 'debug' 和 'min'。
        */
        set: function (name) {
            current = name;
        },

    };


});




/**
* 文件工具类
* @namesapce
* @name File
*/
define('File', function (require, module,  exports) {

    /**
    * 获取指定文件名称的后缀名。
    * @param {string} file 要检测的文件名。
    * @return {string} 返回后缀名，以 "." 开始。
    */
    function ext(file) {

        if (!file || typeof file != 'string') {
            return '';
        }

        var a = file.split('.');
        if (a.length < 2) {
            return '';
        }

        var ext = a.slice(-1)[0]; //取最后一项
        return '.' + ext;
    }


    /**
    * 检测指定的文件是否为特定的扩展名类型的文件。
    * @param {string} file 要检测的文件名。
    * @param {string} ext 要检测的扩展名，以 "." 开始。
    * @return {boolean} 如果该文件名以指定的扩展名结尾，则返回 true；否则返回 false。
    * @example 
        File.is('a/b/c/login.JSON', '.json'); //返回 true
    */
    function is(file, ext) {

        if (typeof file != 'string' || typeof ext != 'string') {
            return false;
        }

        return file.slice(0 - ext.length).toLowerCase() == ext.toLowerCase();
    }


    /**
    * 检测指定的文件是否为 js 文件。
    * @param {string} file 要检测的文件名。
    * @return {boolean} 如果该文件名以 '.js' 扩展名结尾，则返回 true；否则返回 false。
    * @example 
        File.is('a/b/c/login.JS', '.js'); //返回 true
    */
    function isJs(file) {
        return is(file, '.js');
    }

    /**
    * 检测指定的文件是否为 css 文件。
    * @param {string} file 要检测的文件名。
    * @return {boolean} 如果该文件名以 '.css' 扩展名结尾，则返回 true；否则返回 false。
    * @example 
        File.is('css/index.css', '.css'); //返回 true
    */
    function isCss(file) {
        return is(file, '.css');
    }

    /**
    * 检测指定的文件名是否为 json 文件。
    * @param {string} file 要检测的文件名。
    * @return {boolean} 如果该文件名以 '.json' 扩展名结尾，则返回 true；否则返回 false。
    * @example 
        File.is('data/demo.JSON', '.json'); //返回 true
    */
    function isJson(file) {
        return is(file, '.json');
    }



    return /**@lends File*/ {
        ext: ext,
        is: is,
        isJs: isJs,
        isCss: isCss,
        isJson: isJson
    };
});



/**
* 函数工具类
* @namespace
* @name Fn
*/
define('Fn', function (require, module, exports) {

    var $ = require('$');
    

    module.exports = exports = /**@lends Fn*/ {

        /**
        * 用一个的随机延迟时间去执行一个回调函数，并传递一些参数。
        * @param {Object} delay 延迟配置对象。
            如 {min: 500, max: 2000}，当不需要延迟时，则应为 null。
        * @param {function} fn 要延迟执行的函数。
        * @param {Array} [args] 要传递的参数数组。
        * @return {number} 返回 setTimeout 的结果。
        *   如果没有启用延迟，则不返回值。
        */
        delay: function (delay, fn, args) {
            if (!fn) {
                return;
            }


            if (delay === false || delay == null) { //不启用延迟
                fn.apply(null, args);
                return;
            }

            var timeout = typeof delay == 'number' ? delay : $.Math.randomInt(delay.min, delay.max);

            return setTimeout(function () {
                fn.apply(null, args);
            }, timeout);
        },

        
    };

});


/**
* JSON 工具类
* @class
* @name JSON
*/
define('JSON', function (require, module,  exports) {

    var JSON = window.JSON;

    module.exports = exports = /**@lends JSON*/ {

        /**
        * 把一个 JSON 字符串数据解析成对象。
        */
        parse: function (data) {

            try {
                return JSON.parse(data);
            }
            catch (ex) {
            }

            try {
                data = data.replace(/^(\r\n)+/g, '');
                return (new Function('return ' + data))();
            }
            catch (ex) {
            }

            return null;

        },

        /**
        * 把一个对象解析成 JSON 字符串。
        */
        stringify: function (data, spaces) {

            if (spaces === undefined) { //stringify(data)
                spaces = 4;
            }

            return JSON.stringify(data, null, spaces);
        },
    };

});



/**
* 本地存储工具类
* @class
* @name LocalStorage
*/
define('LocalStorage', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Storage = MiniQuery.require('LocalStorage');
    var Mapper = MiniQuery.require('Mapper');

    var Config = require('Config');

    var mapper = new Mapper();
    var skey = 'KISP.LocalStorage.B81138B047FC';
    var all = Storage.get(skey) || {}; //针对全部应用的



    function LocalStorage(id, config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var name = config.name;
        if (!name) {
            throw new Error('请先配置 name 字段');
        }

        var app = all[name];

        if (!app) { //针对该应用的首次分配
            app = all[name] = {};
        }

        var meta = {
            'id': id,
            'data': app[id],
            'app': app,
        };

        mapper.set(this, meta);

    }



    LocalStorage.prototype = {
        constructor: LocalStorage,

        /**
        * 设置一对键值。
        * 已重载 set(obj) 批量设置的情况。
        * @param {string} key 要进行设置的键名称。
        * @param value 要进行设置的值，可以是任何类型。
        */
        set: function (key, value) {

            var meta = mapper.get(this);
            var data = meta.data;
            var app = meta.app;
            var id = meta.id;

            //针对该实例的首次分配，或者因为调用了 clear() 而给清空了
            if (!data) {
                data = app[id] = meta.data = {};
            }

            if (typeof key == 'object') { //重载 set({...}); 批量设置的情况
                $.Object.extend(data, key);
            }
            else { //单个设置
                data[key] = value;
            }

            Storage.set(skey, all); //保存全部

        },

        /**
        * 根据给定的键获取关联的值。
        * 已重载 get() 获取全部的情况。
        * @param {string} [key] 要进行获取的键名称。
        * @return 返回该键所关联的值。
        */
        get: function (key) {
            var meta = mapper.get(this);
            var data = meta.data;

            if (!data) {
                return;
            }

            //重载 get(); 获取全部的情况
            if (arguments.length == 0) {
                return data;
            }

            return data[key];
        },

        /**
        * 移除给定的键所关联的项。
        * @param {string} key 要进行移除的键名称。
        */
        remove: function (key) {

            var meta = mapper.get(this);
            var data = meta.data;

            if (!data) {
                return;
            }

            delete data[key];

            Storage.set(skey, all); //保存全部

        },

        /**
        * 清空所有项。
        */
        clear: function () {
            var meta = mapper.get(this);
            var id = meta.id;
            var app = meta.app;

            delete app[id];
            meta.data = null;

            Storage.set(skey, all); //保存全部
        },

        /**
        * 对每一项进行迭代，并调用传入的回调函数。
        * @param {function} fn 迭代调用的回调函数。
            该函数会接收到两个参数: 
            key: 当前键的名称。
            value: 当前键所关联的值。
        */
        each: function (fn) {

            var meta = mapper.get(this);
            var data = meta.data;

            if (!data || !fn) {
                return;
            }

            for (var key in data) {
                fn(key, data[key]);
            }
        },

        /**
        * 获取所有的项的总个数。
        */
        length: function () {
            return this.keys().length;
        },

        /**
        * 获取所有的项的键数组。
        */
        keys: function () {

            var meta = mapper.get(this);
            var data = meta.data;

            if (!data) {
                return [];
            }

            if (typeof Object.keys == 'function') {
                return Object.keys(data);
            }

            var a = [];
            for (var key in data) {
                a.push(key);
            }

            return a;
        },

        /**
        * 获取所有的项的键数组指定中的项。
        * @param {number} index 键所对应的索引值。
        */
        key: function key(index) {
            return this.keys()[index];
        },

        /**
        * 获取所有的项的总个数。
        */
        length: function () {
            return this.keys().length;
        },

    };


    return LocalStorage;




});







/**
* 针对有继承关系的类提供同一个的 mapper 实例容器。
* @namespace
* @name Mapper
*/
define('Mapper', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');

    var mapper = new Mapper();



    return /**@lends Mapper*/ {

        /**
        * 获取指定键所关联的值。
        * @param key 要获取的值所关联的键，可以是任何类型。
        * @return 返回该键所关联的值。
        */
        get: function (key) {
            return mapper.get(key);
        },


        /**
        * 设置一对键和值。
        * @param key 要设置的键，可以是任何类型。
        * @param key 要设置的值，可以是任何类型。
        */
        set: function (key, value) {
            mapper.set(key, value);
        },


        /**
        * 给指定对象设置 Mapper 所使用的 GUID 属性。
        * @param {Object} obj 要设置的对象。
        * @param {Object} module 模块对象。
        */
        setGuid: function (obj, module) {
            var id = module.id;
            id = id + '-' + $.String.random();
            Mapper.setGuid(obj, id);
        },

        /**
        * 根据给定的键移除一对映射关系。
        * 注意：根据映射关系的键查找所关联的值时，对键使用的是全等比较，即区分数据类型。
        * @param key 映射关系的键，可以是任何类型。
        */
        remove: function (key) {
            mapper.remove(key);
        },

    };


});



/**
* 对外提供的页面级别的模块管理器。
* @namespace
* @name Module
*/
define('Module', function (require, module, exports) {

    var MiniQuery = require('MiniQuery');
    var Module = MiniQuery.require('Module');
    var Config = require('Config');

    var defaults = Config.get(module);

    var mod = new Module(defaults);


    return /**@lends Module*/ {

        /**
        * 定义指定名称的模块。
        * @function
        * @param {string} id 模块的名称。
        * @param {Object|function} factory 模块的导出函数或对象。
        */
        define: mod.define.bind(mod),

        /**
        * 加载指定的模块。
        * @function
        * @param {string} id 模块的名称。
        * @return 返回指定的模块。
        */
        require: mod.require.bind(mod),

        modules: mod.modules.bind(mod),
        tree: mod.tree.bind(mod),

    };

});


/**
* RandomId 工具类
* @name RandomId
*/
define('RandomId', function (require, module, exports) {

    var $ = require('$');

    module.exports = exports = /**@lends RandomId*/ {

        /**
        * 
        */
        get: function (item0, item1, item2, itemN) {

            var list = [].slice.call(arguments);

            list = $.Array.keep(list, function (item, index) {

                if (typeof item == 'number') {
                    return $.String.random(item).toLowerCase();
                }

                return item;
            });

            return list.join('');
        },

        
    };

});



/**
* 会话存储工具类
* @class
* @name SessionStorage
*/
define('SessionStorage', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Storage = MiniQuery.require('SessionStorage');
    var Mapper = MiniQuery.require('Mapper');

    var Config = require('Config');

    var mapper = new Mapper();
    var skey = 'KISP.SessionStorage.B81138B047FC';
    var all = Storage.get(skey) || {}; //针对全部应用的



    function SessionStorage(id, config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var name = config.name;
        if (!name) {
            throw new Error('请先配置 name 字段');
        }

        var app = all[name];

        if (!app) { //针对该应用的首次分配
            app = all[name] = {};
        }

        var meta = {
            'id': id,
            'data': app[id],
            'app': app,
        };

        mapper.set(this, meta);

    }



    SessionStorage.prototype = {
        constructor: SessionStorage,

        /**
        * 设置一对键值。
        * 已重载 set(obj) 批量设置的情况。
        * @param {string} key 要进行设置的键名称。
        * @param value 要进行设置的值，可以是任何类型。
        */
        set: function (key, value) {

            var meta = mapper.get(this);
            var data = meta.data;
            var app = meta.app;
            var id = meta.id;

            //针对该实例的首次分配，或者因为调用了 clear() 而给清空了
            if (!data) {
                data = app[id] = meta.data = {};
            }

            if (typeof key == 'object') { //重载 set({...}); 批量设置的情况
                $.Object.extend(data, key);
            }
            else { //单个设置
                data[key] = value;
            }

            Storage.set(skey, all); //保存全部

        },

        /**
        * 根据给定的键获取关联的值。
        * 已重载 get() 获取全部的情况。
        * @param {string} [key] 要进行获取的键名称。
        * @return 返回该键所关联的值。
        */
        get: function (key) {
            var meta = mapper.get(this);
            var data = meta.data;

            if (!data) {
                return;
            }

            //重载 get(); 获取全部的情况
            if (arguments.length == 0) {
                return data;
            }

            return data[key];
        },

        /**
        * 移除给定的键所关联的项。
        * @param {string} key 要进行移除的键名称。
        */
        remove: function (key) {

            var meta = mapper.get(this);
            var data = meta.data;

            if (!data) {
                return;
            }

            delete data[key];

            Storage.set(skey, all); //保存全部

        },

        /**
        * 清空所有项。
        */
        clear: function () {
            var meta = mapper.get(this);
            var id = meta.id;
            var app = meta.app;

            delete app[id];
            meta.data = null;

            Storage.set(skey, all); //保存全部
        },

        /**
        * 对每一项进行迭代，并调用传入的回调函数。
        * @param {function} fn 迭代调用的回调函数。
            该函数会接收到两个参数: 
            key: 当前键的名称。
            value: 当前键所关联的值。
        */
        each: function (fn) {

            var meta = mapper.get(this);
            var data = meta.data;

            if (!data || !fn) {
                return;
            }

            for (var key in data) {
                fn(key, data[key]);
            }
        },

        /**
        * 获取所有的项的总个数。
        */
        length: function () {
            return this.keys().length;
        },

        /**
        * 获取所有的项的键数组。
        */
        keys: function () {

            var meta = mapper.get(this);
            var data = meta.data;

            if (!data) {
                return [];
            }

            if (typeof Object.keys == 'function') {
                return Object.keys(data);
            }

            var a = [];
            for (var key in data) {
                a.push(key);
            }

            return a;
        },

        /**
        * 获取所有的项的键数组指定中的项。
        * @param {number} index 键所对应的索引值。
        */
        key: function key(index) {
            return this.keys()[index];
        },

        /**
        * 获取所有的项的总个数。
        */
        length: function () {
            return this.keys().length;
        },

    };


    return SessionStorage;




});







/**
* Style 工具类
* @class
* @name Style
*/
define('Style', function (require, module,  exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Mapper = MiniQuery.require('Mapper');

    var Config = require('Config');


    //内部函数
    function getPixel(v) {

        var type = typeof v;

        if (type == 'number' || (/^\d+$/g).test(v)) { //数字或字符串形式的数字
            return v + 'px';
        }

        return v;
    }


   


    var pix_fields = [
        'border',
        'border-radius',
        'border-bottom-width',
        'border-left-width',
        'border-right-width',
        'border-top-width',
        'border-width',
        'bottom',
        'font-size',
        'height',
        'left',
        'letter-spacing',
        'line-height',
        'margin',
        'margin-bottom',
        'margin-left',
        'margin-right',
        'margin-top',
        'padding',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'padding-top',
        'right',
        'top',
        'width',
    ];


    var fields = pix_fields.concat([



    ]);



    module.exports = exports = /**@lends Style*/ {

        /**
        * 像素化。
        */
        pixelize: function (style, key) {

            //重载 getPixel(value) 
            if (typeof style != 'object') {
                return getPixel(style);
            }


            // 批量操作: pixelize(style, keys);
            if (key instanceof Array) {

                $.Array.each(key, function (key, index) {

                    var value = style[key];
                    if (value == null) { // null|undefined
                        return; //continue
                    }

                    style[key] = getPixel(value);
                });
            }
            else { //单个操作
                var value = style[key];
                if (value != null) { // null|undefined
                    style[key] = getPixel(value);
                }
            }

            return style;
        },

        checkUnit: function (value, unit) {
            return typeof value == 'string' &&
                value.slice(0 - unit.length) == unit;
        },


        filter: function (items, keys) {

            //重载 filter(obj, keys)
            if (!(items instanceof Array)) {
                items = [items];
            }

            var list = $.Array.map(items, function (item, index) {
                if (!item || typeof item != 'object') {
                    return null;
                }
                item = $.Object.filter(item, keys);
                return item;
            });

            //合并多个到一个新的 {}
            list = [{}].concat(list);
            var style = $.Object.extend.apply(null, list);
            style = exports.pixelize(style, pix_fields);

            return style;
        },


        parse: function (style) {


        },

        stringify: function (style, replacer, spaces) {

            if (!style) {
                return '';
            }

            if (typeof replacer == 'number') { //重载 stringify(style, spaces);
                spaces = replacer;
                replacer = null;
            }

            var a = [];

            $.Object.each(style, function (key, value) {
                
                value = replacer ? replacer(key, value) : value;

                if (value === undefined) { //扔掉值为 undefined 的项
                    return; // continue;
                }

                var s = key + ': ' + value;
                if (spaces) {
                    s = new Array(spaces + 1).join(' ') + s; //产生前导空格
                }

                a.push(s);

            });

            if (a.length == 0) {
                return '';
            }


            return spaces ? a.join(';\n') + ';\n' :
                a.join(';') + ';';
        },


        parsePercent: function (percent, total) {

            percent = parseInt(percent) / 100;
            return percent * total + 'px';

        },


    };



   
});





/**
* 当前页面的 Url 工具类
* @namespace
* @name Url
*/
define('Url', function (require, module, exports) {

    var $ = require('$');
    


    function getBasic() {

        var Config = require('Config');
        var defaults = Config.get(module.id); //默认配置
        var obj = {};

        var replacer = defaults.replacer;
        if (!replacer) {
            return obj;
        }

        var key = replacer.root;
        if (key) {
            obj[key] = exports.root();
        }

        key = replacer.edition;
        if (key) {
            var Edition = require('Edition');
            obj[key] = Edition.get();
        }
        
        return obj;



    }


    module.exports = exports = /**@lends Url*/ {

        /**
        * 获取当前 Web 站点的根地址。
        */
        root: function () {
            var Config = require('Config');
            var defaults = Config.get(module.id); //默认配置
            return defaults.root;
        },

        /**
        * 检查给定的 url 是否为完整的 url。
        * 即是否以 'http://' 或 'https://' 开头。
        * @param {string} url 要检查的 url。
        */
        checkFull: function (url) {
            if (typeof url != 'string') {
                return false;
            }

            return url.indexOf('http://') == 0 || url.indexOf('https://') == 0;
        },

        /**
        * 用指定的数据格式化(填充)指定的 url。
        * @param {string} 要进行填充的 url 模板。
        * @param {Object} [data] 要进行填充的数据。
        * @return {string} 返回填充后的 url。
        */
        format: function (url, data) {

            if (typeof data != 'object') { // format(url, arg0, arg1, ... argN)

                var args = [].slice.call(arguments, 1);
                data = $.Array.toObject(args); 
                delete data['length'];
                // data = { 0: arg0, 1: arg1, ..., N: argN };
            }

            var basic = getBasic();
            data = data ? $.Object.extend(data, basic) : basic;


            return $.String.format(url, data);
        },

        
    };

});


/**
* 请求后台接口类
* @class
* @name API
*/
define('API', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var Fn = require('Fn');
    var mapper = require('Mapper');



    /**
    * API 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function API(name, config) {

        name = name || '';
        config = Config.clone(module.id, config);

        mapper.setGuid(this, module); //设置 guid, 提高 mapper 查找效率。
        var emitter = new Emitter(this);
        var successCode = config.successCode;

        var proxy = config.proxy;
        if (proxy && typeof proxy == 'object') { // proxy: { ... }，批量的情况
            proxy = proxy[name];        //找到属于当前 API 的这个
        }

        //支持简写，代理的文件名跟 API 的名称一致。
        if (proxy === true) {
            proxy = name + '.js';
        }


        //发起 ajax 请求所需要的配置对象。
        var ajax = {
            'name': name,
            'data': config.data,
            'query': config.query,

            'url': config.url,
            'ext': config.ext,
            'random': config.random,

            'successCode': successCode,
            'field': config.field,
            'proxy': proxy,
            'serialize': config.serialize,

            success: function (data, json, xhr) { //成功
                meta.fireEvent('success', [data, json, xhr]);
            },

            fail: function (code, msg, json, xhr) { //失败
                meta.fireEvent('fail', [code, msg, json, xhr]);
            },

            error: function (xhr) { //错误
                meta.fireEvent('error', [xhr]);
            },
        };


        var delay = config.delay;

        var meta = {
            'ajax': ajax,
            'status': '',
            'args': [],
            'emitter': emitter,

            fireEvent: function (status, args, emitter) {

                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;

                Fn.delay(delay, function () {

                    emitter.fire('response', args); //最先触发

                    //进一步触发具体 code 对应的事件
                    if (status == 'success') {
                        emitter.fire('code', successCode, args);
                    }
                    else if (status == 'fail') {
                        emitter.fire('code', args[0], args);
                    }

                    var xhr = args.slice(-1)[0]; //args[args.length - 1]
                    if (xhr) { //在 Proxy 的响应中 xhr 为 null
                        emitter.fire('status', xhr.status, args);
                    }

                    emitter.fire(status, args); //触发命名的分类事件，如 success、fail、error
                    emitter.fire('done', args); //触发总事件
                });
            },
        };

        mapper.set(this, meta);


        //预绑定事件
        var events = $.Object.filter(config, [
            'done',
            'success',
            'fail',
            'error',
            'code',
            'status',
        ]);

        this.on(events);
    }

    //实例方法
    API.prototype = /**@lends API#*/ {
        constructor: API,

        /**
        * 发起网络 GET 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] 请求的数据对象。
        *   该数据会给序列化成查询字符串以拼接到 url 中。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        * @example
            var api = new API('test');
            api.get({ name: 'micty' });
        */
        get: function (data) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var obj = $.Object.extend({}, meta.ajax);
            if (data) {
                obj.data = data;
            }

            data = obj.data;  //这里用 obj.data
           
            emitter.fire('request', 'get', [data]);
            emitter.fire('request', ['get', data]); 

            var Ajax = module.require('Ajax');
            Ajax.get(obj);

            return this;
        },

        /**
        * 发起网络 POST 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] POST 请求的数据对象。
        * @param {Object} [query] 查询字符串的数据对象。
        *   该数据会给序列化成查询字符串，并且通过 form-data 发送出去。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        post: function (data, query) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var ajax = meta.ajax;

            var obj = $.Object.extend({}, ajax, {
                'data': data || ajax.data,
                'query': query || ajax.query,
            });

            data = obj.data;    //这里用 obj.data
            query = obj.query;  //这里用 obj.query

            emitter.fire('request', 'post', [data, query]);
            emitter.fire('request', ['post', data, query]);

            var Ajax = module.require('Ajax');
            Ajax.post(obj);

            return this;

        },

        

        /**
        * 绑定事件。
        * 已重载 on({...}，因此支持批量绑定。
        * @param {string} name 事件名称。
        * @param {function} fn 回调函数。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        on: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);

            var status = meta.status;

            if (status) { //请求已完成，立即触发
                var emt = new Emitter(this); //使用临时的事件触发器。
                emt.on.apply(emt, args);
                meta.fireEvent(status, meta.args, emt);
                emt.destroy();
            }

            return this;

        },

        /**
        * 解除绑定事件。
        * 已重载 off({...}，因此支持批量解除绑定。
        * @param {string} [name] 事件名称。
        *   当不指定此参数时，则解除全部事件。
        * @param {function} [fn] 要解除绑定的回调函数。
        *   当不指定此参数时，则解除参数 name 所指定的类型的事件。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        off: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.off.apply(emitter, args);

            return this;
        },

        /**
        * 销毁本实例对象。
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            emitter.destroy();

            mapper.remove(this);
        },
    };


    return API;

});




/**
*
*/
define('API/Ajax', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');



    /**
    * 发起 ajax 网络请求(核心方法)。
    * @param {string} method 网络请求的方式：'get' 或 'post'。
    * @param {Object} config 配置对象。 其中：
    * @param {string} config.name 后台接口的名称，会用在 url 中。
    * @param {Object} [config.url] 请求的 url 地址。
    * @param {Object} [config.ext] 要用在 url 中的后缀。
    * @param {Object} [config.data] 要发送的数据。
        该数据会给序列化成查询字符串，然后：
        当 method 为 'get' 时，数据拼接在 url 中。
        当 method 为 'post' 时，数据放在 form-data 表单中。
    * @param {Object} [config.query] 要发送的查询字符串数据。
        该字段仅在 method 为 'post' 时可用。
    * @param {number||string} [config.successCode] 指示请求成功时的代码。
    * @param {Object} [config.field] 响应中的映射字段。
    * @param {function} [config.success] 请成功时的回调。
    * @param {function} [config.fail] 请失败时的回调。
    * @param {function} [config.error] 请错误时的回调。
    * @return {XMLHTTPRequest} 返回 xhr 对象。
    */
    function request(method, config) {

        var proxy = config.proxy;
        if (proxy) { //使用了代理
            var Proxy = require('Proxy');
            Proxy.request(proxy, config);
            return;
        }


        var url = [config.url, config.name, config.ext].join(''); //完整的 url

        var data = config.data || null; // null 可能会在 xhr.send(data) 里用到
        if (data) {

            var serialize = config.serialize; //对子对象进行序列化的方法

            data = $.Object.map(data, function (key, value) {
                if (typeof value == 'object' && value) { //子对象编码成 JSON 字符串
                    return serialize(key, value);
                }
                //其他的
                return value; //原样返回
            });
        }

        var Url = MiniQuery.require('Url');

        //增加一个随机字段，以使缓存失效
        var random = config.random;
        if (random) {
            random = 'rd_' + $.String.random(16);
            url = Url.addQueryString(url, random, '');
        }


        if (method == 'post') {
            var query = config.query;
            if (query) {
                url = Url.addQueryString(url, query);
            }
            if (data) {
                data = $.Object.toQueryString(data);
            }
        }
        else if (data) { // 'get'
            url = Url.addQueryString(url, data);
            data = null; //要发送的数据已附加到 url 参数上
        }



        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.onreadystatechange = function () {

            if (xhr.readyState != 4) {
                return;
            }

            var successCode = config.successCode;
            var fnError = config.error;

            if (xhr.status != 200) {
                fnError && fnError(xhr);
                return;
            }

            var JSON = require('JSON');
            var json = JSON.parse(xhr.responseText);
            if (!json) {
                fnError && fnError(xhr);
                return;
            }

            var field = config.field;

            var code = json[field.code];
            if (code == successCode) {

                var fnSuccess = config.success;
                var data = field.data in json ? json[field.data] : {};

                fnSuccess && fnSuccess(data, json, xhr);
            }
            else {
                var fnFail = config.fail;
                fnFail && fnFail(code, json[field.msg], json, xhr);
            }
        };

        if (method == 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        xhr.send(data);

        return xhr;
    }




    function get(config) {
        return request('get', config);
    }


    function post(config) {
        return request('post', config);
    }




    return /**@lends Ajax*/ {
        get: get,
        post: post,
    };

    

});




/**
* SSH 类。
* @class
* @name SSH
* @augments API
*/
define('SSH', function (require, module, exports) {


    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var API = require('API');

    var mapper = require('Mapper');

    /**
    * SSH 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function SSH(name, config) {

        name = name || '';
        config = Config.clone(module.id, config);

        mapper.setGuid(this, module); //设置 guid, 提高 mapper 查找效率。

        var prefix = config.prefix;
        var emitter = new Emitter(this);


        var successCode = config.successCode;

        var proxy = config.proxy;
        if (proxy && typeof proxy == 'object') { // proxy: { ... }
            proxy = proxy[name];
        }

        //这里使用过滤 + 复制的方式进行成员选取。 过滤的方式只会拷贝已存在的成员
        var ajax = $.Object.extend($.Object.filter(config, [
            'ext',
            'successCode',
            'field',
            //'proxy',
            'serialize',

            //必选的
            'eid',
            'openid',

            //可选的
            'appid',
            'netid',
            'pubacckey',
            'timestamp',
            'nonce',
            'pubaccid',
            'data',

        ]), {
            'proxy': proxy,

            //必选的
            'fullname': prefix + name,

            success: function (data, json, xhr) { //成功
                meta.fireEvent('success', [data, json, xhr]);
            },

            fail: function (code, msg, json, xhr) { //失败
                meta.fireEvent('fail', [code, msg, json, xhr]);
            },

            error: function (xhr) { //错误
                meta.fireEvent('error', [xhr]);
            },
        });



        var meta = {
            'ajax': ajax,
            'console': config.console,

            'status': '',
            'args': [],
            'emitter': emitter,

            fireEvent: function (status, args, emitter) {

                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;

                emitter.fire('response', args); //最先触发


                //进一步触发具体 code 对应的事件
                if (status == 'success') {
                    emitter.fire('code', successCode, args);
                }
                else if (status == 'fail') {
                    emitter.fire('code', args[0], args.slice(1)); //错误码不在参数里
                }

                var xhr = args.slice(-1)[0]; //args[args.length - 1]
                if (xhr) { //在 Proxy 的响应中 xhr 为 null
                    emitter.fire('status', xhr.status, args);
                }

                emitter.fire(status, args); //触发命名的分类事件，如 success、fail、error
                emitter.fire('done', args); //触发总事件

            },
        };

        mapper.set(this, meta);

    }

    //实例方法
    SSH.prototype = $.Object.extend(new API(), /**@lends SSH#*/ {

        constructor: SSH,

        /**
        * 发起网络 POST 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] POST 请求的数据对象。
        * @param {Object} [query] 查询字符串的数据对象。
        *   该数据会给序列化成查询字符串，并且通过 form-data 发送出去。
        * @return {SSH} 返回当前 SSH 的实例 this，因此进一步可用于链式调用。
        */
        post: function (data) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var ajax = meta.ajax;
 
            emitter.fire('request', ['post', data || ajax.data]);


            var Server = module.require('Server');


            Server.get({
                'eid': ajax.eid,
                'appid': ajax.appid,
                'netid': ajax.netid,

            }, function (server, json, xhr) { //成功

                var obj = $.Object.extend({}, ajax, {

                    'data': data || ajax.data,

                    //来自 Server 的
                    'secret': server['secret'],
                    'version': server['version'],
                    'fromTag': server['fromTag'],
                    'url': server['url'],
                });


                //为了便于查看调用的 API 名称和 CustData 而打印到控制台。
                if (meta.console) {
                    console.log(ajax.fullname, obj.data);
                }

                var Ajax = module.require('Ajax');
                Ajax.post(obj);

            }, ajax.fail, ajax.error);


            return this;

        },

    });

    return SSH;




});




/**
*
*/
define('SSH/Ajax', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    /**
    * 发起 ajax 网络请求(核心方法)。
    */
    function post(config) {

        var MD5 = require('MD5');


        var eid = config['eid'];
        var fullname = config['fullname'];
        var openid = config['openid'];

        var timestamp = $.Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        var random = $.String.random(16); //16位随机数

        var data = {
            'EID': eid,
            'Openid': openid,
            'Method': fullname,
            'Timestamp': timestamp,
            'Ver': config['version'],
            'FromTag': config['fromTag'],
            'AppID': config['appid'],
            'NetID': config['netid'],

            'IsNewJson': 'Y',
            'IsEncrypt': 'N',

            //签名，值为md5(EID + AppSecret + Method + Timetamp + State )
            'Sign': MD5.encrypt(eid, config['secret'], fullname, timestamp, random),
            'State': random,
           
            'CustData': config['data'],
        };


        var query = {
            'eid': eid,
            'openid': config['openid'],
            'pubacckey': config['pubacckey'],
            'timestamp': config['timestamp'],
            'nonce': config['nonce'],
            'pubaccid': config['pubaccid']
        };


        var API = require('API');

        var defaults = $.Object.filter(config, [
            'ext',
            'successCode',
            'field',
            'url',
            'proxy',
            'serialize',
        ]);

        var api = new API('', defaults);


        //预绑定事件。
        var events = $.Object.filter(config, [
            'success',
            'fail',
            'error',
        ]);
    
        api.on(events);


        api.post(data, query);

        return api;
    }




    return /**@lends Ajax*/ {
        post: post,
    };

    

});




/**
* SSH/Server
* @class
*/
define('SSH/Server', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Config = require('Config');

    var storage = null;


    function getStorage() {

        if (storage !== null) { //说明已经创建过了
            return storage;
        }

        //首次创建
        var defaults = Config.get(module.id);
        var cache = defaults.cache;


        if (cache == 'session' || cache == 'local') {

            //把首字母变大写
            cache = cache[0].toUpperCase() + cache.slice(1);

            var Storage = require(cache + 'Storage');
            storage = new Storage(module.id, {
                name: 'KISP',
            });

            return storage;
        }


        storage = false; //这里不能用 null，以表示创建过了。
        return storage;


    }


    function ajax(config, server, fnSuccess, fnFail, fnError) {

        server = server || {
            url: '',
            secret: '',
            key: '',
            route: '',
            version: '',
            fromTag: '',
        };

        var API = require('API');
        var MD5 = require('MD5');
        var Config = require('Config');

        var defaults = Config.clone(module.id, {
            'url': server.url,
        });

        var api = new API('', defaults);

        var eid = config['eid'];
        var timestamp = $.Date.format(new Date(), 'yyyy-MM-ddhh:mm:ss');
        var random = $.String.random(16); //16位随机数
        var sign = MD5.encrypt(eid, server['secret'], timestamp, random);

        api.get({
            'EID': eid,
            'AppID': config['appid'],
            'NetID': config['netid'],
            'AccKey': server['key'],
            'Timestamp': timestamp,
            'State': random,
            'Sign': sign,
        });


        api.on('success', function (data, json, xhr) {

            var Url = require('Url');
            var url = (json['ServerUrl'] || '') + server.route;

            if (!Url.checkFull(url)) {
                url = 'http://' + url;
            }

            data = {
                secret: json['AppSecret'],
                version: server['version'],
                fromTag: server['fromTag'],
                url: url,   // 类似于 'http://120.132.144.214/Webapi/Router'
            };

            args = [data, json];

            var storage = getStorage();
            if (storage) {
                storage.set('args', args);
            }

            fnSuccess.apply(null, args);

            if (!defaults.cache) {
                args = null;
            }

        });

        api.on('fail', function (code, msg, json, xhr) {
            fnFail && fnFail(code, msg, json);
        });

        api.on('error', function (xhr) {
            fnError && fnError();
        });
        
    }


    var args = null;


    function get(config, fnSuccess, fnFail, fnError) {


        if (!fnSuccess) {
            return;
        }

        if (args) {
            fnSuccess.apply(null, args);
            return;
        }

        var storage = getStorage();
        if (storage) {
            args = storage.get('args');
            if (args) {
                fnSuccess.apply(null, args);
                return;
            }
        }


        var Config = module.require('Config');

        Config.get(function (server) {

            if (!server) {
                fnError && fnError();
                return;
            }

            ajax(config, server, fnSuccess, fnFail, fnError);

        });
    }




    return {
        get: get,
    };


});




/**
*
*/
define('SSH/Server/Config', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Emitter = MiniQuery.require('Emitter');
    var Config = require('Config');

    var json = null;
    var storage = null;


    function getStorage() {

        if (storage !== null) { //说明已经创建过了
            return storage;
        }

        //首次创建
        var defaults = Config.get(module.id);
        var cache = defaults.cache;


        if (cache == 'session' || cache == 'local') {

            //把首字母变大写
            cache = cache[0].toUpperCase() + cache.slice(1);

            var Storage = require(cache + 'Storage');
            storage = new Storage(module.id, {
                name: 'KISP',
            });

            return storage;
        }


        storage = false; //这里不能用 null，以表示创建过了。
        return storage;

        
    }



    function ajax(fn) {

        var defaults = Config.get(module.id);
        var url = defaults.url;

        $.getJSON(url, function (data) {

            try {
                var host = defaults.host || data['kisplusServerS'];
                var path = data['kisplusAppsecret'];

                json = {
                    'version': data['ver'],
                    'fromTag': data['fromtag'],
                    'key': data['AccKey'],
                    'secret': data['AccSecret'],
                    'host': host,
                    'path': path,
                    'route': data['kisplusApiRouter'],
                    'url': host + path,
                };

                var storage = getStorage();
                if (storage) {
                    storage.set(json);
                }
            }
            catch (ex) {
                json = null;
            }

            fn && fn(json);

            if (!defaults.cache) {
                json = null;
            }

        });
    }


    function get(fn) {

        if (json) {
            fn(json);
            return;
        }

        var storage = getStorage();
        if (storage) {
            json = storage.get();
            if (json) {
                fn(json);
                return;
            }
        }


        ajax(fn);

    }



    return {
        get: get,
    };


});




/**
* SSH.API 类
* @class
* @name SSH.API
* @augments SSH
*/
define('SSH.API', function (require, module, exports) {


    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var SSH = require('SSH');


    var mapper = require('Mapper'); //用于容纳所有 SSHAPI 实例的 meta 数据

    /**
    * SSHAPI 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function SSHAPI(name, config) {

        name = name || '';
        config = Config.clone(module.id, config);

        mapper.setGuid(this, module); //设置 guid, 提高 mapper 查找效率。

        var prefix = config.prefix;
        var emitter = new Emitter(this);
        var successCode = config.successCode;

        var proxy = config.proxy;
        if (proxy && typeof proxy == 'object') { // proxy: { ... }
            proxy = proxy[name];
        }

        //支持简写，代理的文件名跟 API 的名称一致。
        if (proxy === true) { 
            proxy = name + '.js';
        }

        //过滤出属于 SSH 的配置成员
        //这里使用过滤 + 复制的方式进行成员选取。
        var ssh = $.Object.extend($.Object.filter(config, [
            'prefix',
            'eid',
            'openid',
            'serialize',

            //可选的
            'appid',
            'netid',
            'pubacckey',
            'timestamp',
            'nonce',
            'pubaccid',

        ]), {
            'proxy': proxy,
        });


        var ajax = {
            'name': name,
            'successCode': successCode,
            'field': config.field,
            'data': config.data,

            'ssh': $.Object.extend(ssh, config.ssh), //再合并针对 ssh 的

            success: function (data, json, xhr) { //成功
                meta.fireEvent('success', [data, json, xhr]);
            },

            fail: function (code, msg, json, xhr) { //失败
                meta.fireEvent('fail', [code, msg, json, xhr]);
            },

            error: function (code, msg, json, xhr) { //错误

                //为了让业务层能知道 SSH 层发生了 fail，通过判断 json 是否为空即可
                //当 http 协议层连接错误，则 code, msg, json 三个参数都为 undefined
                msg = msg || config.msg;

                meta.fireEvent('error', [code, msg, json, xhr]);
            },
        };


        var meta = {

            'ajax': ajax,

            'status': '',
            'args': [],
            'emitter': emitter,

            fireEvent: function (status, args, emitter) {

                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;

                emitter.fire('response', args); //最先触发

                //进一步触发具体 code 对应的事件
                if (status == 'success') {
                    emitter.fire('code', successCode, args);
                }
                else if (status == 'fail') {
                    emitter.fire('code', args[0], args.slice(1)); //错误码不在参数里
                }

                var xhr = args.slice(-1)[0]; //args[args.length - 1]
                if (xhr) { //在 Proxy 的响应中 xhr 为 null
                    emitter.fire('status', xhr.status, args);
                }

                emitter.fire(status, args); //触发命名的分类事件，如 success、fail、error
                emitter.fire('done', args); //触发总事件

            },
        };

        mapper.set(this, meta);

    }


    //实例方法
    SSHAPI.prototype = $.Object.extend(new SSH(), /**@lends SSH.API#*/ {

        constructor: SSHAPI,

        //避免调到父类的 get 方法，显式抛出错误有助于发现错误。
        get: function () {
            throw new Error(module.id + ' 不支持 get 方式的请求');
        },

        /**
        * 发起网络 post 请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] POST 请求的数据对象。
        * @return {SSHAPI} 返回当前 SSHAPI 的实例 this，因此进一步可用于链式调用。
        */
        post: function (data) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var ajax = meta.ajax;

            var obj = $.Object.extend({}, ajax, {
                'data': data || ajax.data || {},
            });

            emitter.fire('request', ['post', obj.data]);

            var Ajax = module.require('Ajax');
            Ajax.post(obj);

            return this;

        },
    });


    return SSHAPI;


});




/**
*
*/
define('SSH.API/Ajax', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    /**
    * 发起 ajax 网络请求(核心方法)。
    */
    function post(config) {
        

        var SSH = require('SSH');
        var ssh = new SSH(config.name, config.ssh);

        //预绑定事件。
        var events = $.Object.filter(config, [
            'success',
            'fail',
            'error',
        ]);


        var fnSuccess = config.success;
        var fnFail = config.fail;
        var fnError = config.error;

        var field = config.field;

        ssh.on({
            //SSH 层请求成功了
            'success': function (json, root, xhr) { //此处 data 为 json， json 为 root

                if (!json) {
                    fnError && fnError(xhr);
                }

                var successCode = config.successCode;
                var code = json[field.code];

                if (code == successCode) {
                    fnSuccess && fnSuccess(json[field.data] || {}, json, xhr);
                }
                else {
                    fnFail && fnFail(code, json[field.msg], json, xhr);
                }
            },

            'fail': function (code, msg, json, xhr) {
                //为了让业务层能知道 SSH 层发生了 fail，通过判断 json 是否为空即可
                fnError && fnError(code, msg, json, xhr); 
            },

            'error': function (xhr) {
                //当 http 协议层连接错误，则 code, msg, json 三个参数都为 undefined
                fnError && fnError(undefined, undefined, undefined, xhr);
            },
        });


        var data = config.data;

        ssh.post({

            'openid': config.ssh.openid,

            'Result': '',
            'ErrMsg': '',
            'AccountDB': '',
            'TotalPage': '',

            'CurrentPage': data['pageNo'],
            'ItemsOfPage': data['pageSize'],

            'Data': $.Object.remove(data, [
                'pageNo',
                'pageSize'
            ]),
        });

        return ssh;
    }




    return /**@lends Ajax*/ {
        post: post,
    };

    

});



/**
* 把请求后台接口代理到本地的工具类。
* @namespace
* @name Proxy
*/
define('Proxy', function (require, module,  exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Config = require('Config');
    var Fn = require('Fn');
    
    var current = null;     //当前请求到的代理文件的响应结果 factory



    //模拟一个网络的随机延迟时间去执行一个回调函数
    function delay(fn) {

        var defaults = Config.get(module.id); //默认配置
        var delay = defaults.delay;
        var args = [].slice.call(arguments, 1); //提取 fn 后面的参数

        Fn.delay(delay, fn, args);

    }




    /**
    * 加载指定的 js 代理文件。
    * 注意：加载完 js 代理文件后，会先执行 js 代理文件的逻辑，再触发 onload 事件。
    * 经过试验发现，并发加载多个 js 文件，也会严格地按上述顺序对应的进行。
    */
    function loadJs(file, config) {

        var Url = module.require('Url');
        var url = Url.get(file);

        var Script = MiniQuery.require('Script');
        Script.load(url, function () {

            var factory = current;
            current = null;

            if (typeof factory == 'function') {
                factory = factory(config.data, config);
            }

            done(factory, config);

        });
    }

    /**
    * 加载指定的 json 代理文件。
    */
    function loadJson(file, config) {

        var Url = module.require('Url');
        var url = Url.get(file);

        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);

        xhr.onreadystatechange = function () {

            if (xhr.readyState != 4) {
                return;
            }

            if (xhr.status != 200) {
                delay(config.error);
                return;
            }

            var JSON = require('JSON');
            var json = JSON.parse(xhr.responseText);
            done(json, config);
        };

        xhr.send(null);
    }


    //加载完成后，根据状态分发事件。
    function done(json, config) {
        if (!json) {
            delay(config.error);
            return;
        }

        var successCode = config.successCode;
        var field = config.field;
        var code = json[field.code];

        if (code == successCode) { // 成功
            var data = json[field.data] || {};
            delay(config.success, data, json);
        }
        else { //失败
            var msg = json[field.msg] || '';
            delay(config.fail, code, msg, json);
        }
    }




    module.exports = exports = /**@lends Proxy*/ {

        /**
        * 发起代理请求。
        * @param {string} file 代理响应的文件地址。
        * @param {Object} config 配置对象。
        */
        request: function (file, config) {
     
            var File = require('File');

            if (File.isJs(file)) { // 映射的响应是一个 js 文件
                loadJs(file, config);
                return;
            }

            if (File.isJson(file)) {
                loadJson(file, config);
                return;
            }

            throw new Error('不支持参数 file 的文件类型: ' + file);
        },

        /**
        * 响应代理请求。
        * 可以生成很复杂的动态数据，并根据提交的参数进行处理，具有真正模拟后台逻辑的能力。
        * 该方法仅用在代理响应文件中，且在调用之前必须先调用 request 方法。
        * 已重载 response(json)的情况。
        * @param {function|Object} factory 响应的处理函数或 json 对象。
        *   当传进来的 factory 为处理函数时，该函数会接收到两个参数：factory(data, config)。 其中：
        *   data 为发起 get 或 post 请求时最终的 data 字段；
        *   config 为发起 get 或 post 请求时全部的配置字段。
        */
        response: function (factory) {

            //var type = typeof factory;
            //var isValid = type == 'function' || type == 'object' && factory;

            //if (!isValid) {
            //    throw new Error('参数 factory 只能是函数或非空对象');
            //}
                
            current = factory;
        },

    };
});

/**
*
*/
define('Proxy/Url', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Config = require('Config');
    var $Url = MiniQuery.require('Url');
    var Url = require('Url');


    function get(url) {

        //绝对地址
        if (Url.checkFull(url)) {
            return url;
        }
            

        //相对地址

        var defaults = Config.get(module.parent.id); //默认配置
        var base = defaults.base;

        if (Url.checkFull(base)) {
            return base + url;
        }


        var root = Url.root();
        if (url.slice(0, 1) != '/') {
            root = root + base;
        }

        return root + url;
    }





    return {
        get: function (url) {
            url = get(url);

            //增加随机查询字符串，确保拿到最新的
            return $Url.randomQueryString(url); 
        },
    };


});

/**
* 调用云之家 native 方法的模块。
*/
define('CloudHome/Native', function (require, module, exports) {

    var cid = 0;    //回调 id 计数器，递增
    var id$fn = {}; //回调列表


    //该方法给云之家 native 调用，名称必须为这个
    window.XuntongJSBridge = {

        /**
        * 处理云之家的回调。
        * 该方法给云之家 native 调用
        */
        'handleMessageFromXT': function (id, json) {

            var fn = id$fn[id];
            if (!fn) {
                return;
            }

            fn(json || {});
        },
    };



    return /**@lends CloudHome.Native*/ {

        /**
        * 调用云之家原生接口。
        * @param {string} name 要调用的原生接口的名称。
        * @param {Object} [data] 要传递的数据对象。
        * @param {function} fn 回调函数。 会接收到一个参数: json 对象
        */
        invoke: function (name, data, fn) {

            if (typeof data == 'function') { //重载 invoke(name, fn)
                fn = data;
                data = null;
            }

            data = JSON.stringify(data || {});
            data = encodeURIComponent(data);

            var id = fn ? ++cid : 0;
            if (id) {
                id$fn[id] = fn;
            }

            var url = ['xuntong', name, id, data].join(':');

            var iframe = document.createElement('iframe');

            // for some reason we need to set a non-empty size for the iOS6 simulator
            iframe.setAttribute('height', '1px');
            iframe.setAttribute('width', '1px');

            iframe.setAttribute('src', url);

            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;


        },
    };


});


/**
* 云之家接口类
* @class
* @name CloudHome.API
*/
define('CloudHome.API', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var Fn = require('Fn');
 
    var mapper = new Mapper();


    /**
    * API 构造器。
    * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
    * @param {Object} [config] 配置对象。
    */
    function API(name, config) {

        Mapper.setGuid(this); //设置 guid, 提高 mapper 查找效率。

        name = name || '';
        config = Config.clone(module.id, config);


        var emitter = new Emitter(this);
        var delay = config.delay;

        var meta = {
            'name': name,
            'field': config.field,
            'status': '',
            'args': [],
            'emitter': emitter,

            fireEvent: function (status, args, emitter) {

                status = meta.status = status || meta.status;
                args = meta.args = args || meta.args;
                emitter = emitter || meta.emitter;

                Fn.delay(delay, function () {

                    //触发具体 code 对应的事件
                    if (status == 'fail') {
                        emitter.fire('code', args[0], args);
                    }

                    emitter.fire(status, args); //触发命名的分类事件，如 success、fail、error
                    emitter.fire('done', args); //触发总事件
                });
            },
        };

        mapper.set(this, meta);

    }



    //实例方法
    API.prototype = /**@lends CloudHome.API#*/ {
        constructor: API,

        /**
        * 发起云之家 native 调用请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] 请求的数据对象。
        *   该数据会给序列化成查询字符串以拼接到 url 中。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        * @example
            var api = new API('test');
            api.get({ name: 'micty' });
        */
        invoke: function (data) {

            var meta = mapper.get(this);
            var name = meta.name;
            var field = meta.field;

            var CloudHome = require('CloudHome');

            CloudHome.invoke(name, data, function (json) {

                //云之家返回的 success 字段竟然是字符串的 'true' 或 'false'
                var isSuccess = json[field.success];
                isSuccess = String(isSuccess).toLowerCase() == 'true';

                if (isSuccess) {
                    var data = json[field.data] || {};
                    meta.fireEvent('success', [data, json]);
                    return;
                }


                var code = json[field.code];
                var msg = json[field.msg];

                meta.fireEvent('fail', [code, msg, json]);

            });

            return this;
        },


        /**
        * 绑定事件。
        * 已重载 on({...}，因此支持批量绑定。
        * @param {string} name 事件名称。
        * @param {function} fn 回调函数。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        on: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);

            var status = meta.status;

            if (status) { //请求已完成，立即触发
                var emt = new Emitter(this); //使用临时的事件触发器。
                emt.on.apply(emt, args);
                meta.fireEvent(status, meta.args, emt);
                emt.destroy();
            }

            return this;

        },

        /**
        * 解除绑定事件。
        * 已重载 off({...}，因此支持批量解除绑定。
        * @param {string} [name] 事件名称。
        *   当不指定此参数时，则解除全部事件。
        * @param {function} [fn] 要解除绑定的回调函数。
        *   当不指定此参数时，则解除参数 name 所指定的类型的事件。
        * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
        */
        off: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.off.apply(emitter, args);

            return this;
        },

        /**
        * 销毁本实例对象。
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            emitter.destroy();

            mapper.remove(this);
        },
    };


    return API;




});




/**
* 云之家环境相关的模块
* @namespace
* @name CloudHome
*/
define('CloudHome', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Url = MiniQuery.require('Url');

    var Native = module.require('Native');


    module.exports = exports = /**@lends CloudHome*/ {

        invoke: Native.invoke,


        /**
        * 判断是否在云之家打开的。
        * 即判断当前环境是否支持云之家的 JSBridge。
        */
        check: function () {
            
            //详见：http://open.kdweibo.com/wiki/doku.php?id=jsbridge:%E4%BA%91%E4%B9%8B%E5%AE%B6jsbridge%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3
            //iOS：Qing/0.9.0;iPhone OS 9.1;Apple;iPhone7,1
            //Android：Qing/0.9.0;Android4.1.1;Xiaomi;MI 2 

            var reg = /Qing\/.*;(iPhone|Android).*/;
            return navigator.userAgent.match(reg) ? true : false;

            ////如 ?ticket=967cada703a6ca821790f048d55f1d32
            //return !!Url.hasQueryString(window, 'ticket'); //确保返回一个 bool 值。
        },


        /**
        * 关闭云之家打开的轻应用。
        */
        close: function () {
            Native.invoke('close');
        },


        /**
        * 分享到微信。
        * @param {Object} config 参数配置对象。 其中：
        * @param {string} title 标题。
        * @param {string} content 内容。
        * @param {string} icon 图标，base64 格式。
        * @param {string} url 链接地址。
        * @param {function} success 分享成功后的回调函数。
        * @param {function} fail 分享失败后的回调函数。
        */
        shareWechat: function (config) {

            var API = require('CloudHome.API');
            var api = new API('socialShare');

            var success = config.success;
            if (success) {
                api.on('success', success);
            }

            var fail = config.fail;
            if (fail) {
                api.on('fail', fail);
            }


            api.invoke({
                'shareWay': 'wechat',
                'shareType': 3,
                'shareContent': {
                    'title': config.title,
                    'description': config.content,
                    'thumbData': config.icon,
                    'webpageUrl': config.url,
                },
            });
        },

        /**
        * 设置页面标题。
        * @param {string|boolean} title 要设置的标题或者显示或隐藏的开关。
            如果不指定或指定为 true，则显示之前的标题。
            如果指定为 false，则隐藏标题。
            如果指定为字符串，则设置为指定的内容。
        */
        setTitle: function (title) {

            var Title = require('CloudHome.Title');

            if (title === true) {
                Title.show();
            }
            else if (title === false) {
                Title.hide();
            }
            else if (title  || title === '') {
                Title.set(title);
            }
            else {
                Title.show(); //显示之前的标题
            }
        },



    };

});


/**
* 云之家环境的页面标题
* @namespace
* @name CloudHome.Title
*/
define('CloudHome.Title', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var current = document.title;
    var isVisible = false;

    module.exports = exports = /**@lends CloudHome.Title*/ {


        /**
        * 设置页面标题。
        */
        set: function (title) {

            current = title;
            document.title = title;

            var CloudHome = require('CloudHome');
            CloudHome.invoke('setWebViewTitle', {
                'title': title
            });

            isVisible = true;
        },

        /**
        * 显示页面标题。
        */
        show: function () {
            exports.set(current);
        },

        /**
        * 隐藏页面标题。
        */
        hide: function () {
            current = document.title;
            var CloudHome = require('CloudHome');
            CloudHome.invoke('hideWebViewTitle');
            isVisible = false;
        },

        /**
        * 切换显示或隐藏页面标题。
        */
        toggle: function (needShow) {
            if (needShow) {
                exports.show();
            }
            else {
                exports.hide();
            }
        },

    };

});



define('ImageReader/Renderer', function (require, module, exports) {

    var $ = require('$');




    //针对 PC 浏览端的
    function renderPC(meta) {

        var emitter = meta.emitter;
        var loading = meta.loading;

        if (loading === true) {
            loading = KISP.create('Loading', {
                text: '读取中...',
            });
        }
        else if (typeof loading == 'string') {
            loading = KISP.create('Loading', {
                text: loading,
            });
        }


        $(meta.input).on('change', function (event) {

            var input = this; //这样是安全的，因为外面传进来的可能是一个 jQuery 选择器。
            var img = input.files[0];

            if (!img) { //第一次选择了，但第二次未选择时，为空
                emitter.fire('cancel');
                return;
            }


            var type = img.type;
            if (type.indexOf('image/') != 0) {
                emitter.fire('fail', [201, '所选择的文件类型不是图片', { img: img }]);
                return;
            }


            var reader = new FileReader();

            reader.onload = function (e) {

                loading && loading.hide();

                var data = e.target.result;
                emitter.fire('success', [data]);
            };

            loading && loading.show();

            reader.readAsDataURL(img);

        });
    }






    //针对云之家内嵌浏览器端的
    function renderCH(meta) {

        var emitter = meta.emitter;

        $(meta.input).on('click', function (event) {

            event.preventDefault();

            var API = require('CloudHome.API');
            var api = new API('selectPic');

            api.on('success', function (data, json) {

                var ext;
                var base64;

                try {
                    ext = data.fileExt;
                    base64 = data.fileData.replace(/[\r\n]/g, '');
                }
                catch (ex) {
                    var msg = '无法读取图片，云之家接口有问题: ' + ex.message;
                    emitter.fire('fail', [500, msg, json]);
                    return;
                }


                var image = 'data:image/' + ext + ';base64,' + base64;
                emitter.fire('success', [image]);

            });


            api.on('fail', function (code, msg, json) {

                if (code == 1) { //取消选择照片
                    emitter.fire('cancel');
                    return;
                }

                emitter.fire('fail', [code, msg, json]);
            });


            api.invoke();

        });
      
    }


    //是否为云之家环境，只需要判断一次
    var isCloudHome;


    return {

        render: function (meta) {

            if (isCloudHome === undefined) { //未判断
                var CloudHome = require('CloudHome');
                isCloudHome = CloudHome.check();
            }

            if (isCloudHome) {
                renderCH(meta);
            }
            else {
                renderPC(meta);
            }
        },
    };

});

/**
* 本地图片读取器。
* 兼容浏览器端和云之家端。
* @class
* @name ImageReader
*/
define('ImageReader', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Emitter = MiniQuery.require('Emitter');//事件驱动器
    var Mapper = MiniQuery.require('Mapper');

    var Config = require('Config');
    var Renderer = module.require('Renderer');

    var mapper = new Mapper();


    function ImageReader(input, config) {

        Mapper.setGuid(this);

        //重载 ImageReader(config)
        if ($.Object.isPlain(input)) {
            config = input;
            input = config['el'];
            delete config['el'];
        }

        config = Config.clone(module.id, config);


        var meta = {
            'emitter': new Emitter(this),
            'input': input,
            'loading': config.loading,
        };

        mapper.set(this, meta);

    }



    ImageReader.prototype = /**@lends ImageReader*/{
        constructor: ImageReader,

        /**
        * 渲染。
        */
        render: function () {

            var meta = mapper.get(this);
            Renderer.render(meta);
        },

        /**
        * 绑定事件。
        * 已重载 on({...}，因此支持批量绑定。
        * @param {string} name 事件名称。
        * @param {function} fn 回调函数。
        */
        on: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);
        },

    };



    return ImageReader;

});


/**
*
*/
define('WeChat/JsApiList', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
   

    function get(wx, reg) {

        if (reg instanceof Array) {
            return reg;
        }


        var list = Object.keys(wx);
        if (reg == '*') {
            return list;
        }

        //todo
        //��������������ʽ������ʵ��

        return [];
    }


    module.exports = exports = {
        get: get,
    };

});


/**
*
*/
define('WeChat/Lib', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
   
    var wx = window.wx;


    function load(url, fn) {

        if (wx) {
            fn && fn(wx);
            return;
        }

        var Script = MiniQuery.require('Script');

        Script.load(url, function () {
            wx = window.wx;
            fn && fn(wx);
        });
    }


    module.exports = exports = {
        load: load,
    };

});


/**
* 微信签名。
*/
define('WeChat/Signature', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Config = require('Config');
    var API = require('API');


    var defaults = null;


    function ajax(config, fn) {

        var api = new API(defaults.name, {
            url: defaults.url,
        });


        api.on('success', function (data, json) {
            fn && fn(data);
        });

        api.on('fail', function (code, msg, json) {
            console.dir(json);
        });

        api.on('error', function () {
            console.log(module.id + ': ajax error');
        });


        api.get({
            'eid': config.eid,
            'url': config.url,
            'timestamp': config.timestamp,    //时间戳
            'noncestr': config.noncestr,     //随机串
        });

    }


    function get(config, fn) {

        defaults = defaults || Config.clone(module.id);

        ajax(config, function (signature) {

            fn && fn({
                'timestamp': config.timestamp,
                'noncestr': config.noncestr,
                'url': config.url,
                'signature': signature,
            });

        });
    }



    module.exports = exports = {
        get: get,
    };

});

/**
* 微信。
* @namespace
* @name WeChat
*/
define('WeChat', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Config = require('Config');

    var Emitter = MiniQuery.require('Emitter');
    var Url = MiniQuery.require('Url');

    var emitter = new Emitter();
    var status = '';    // wx 的状态: ready 或 error
    var wx = null;      // jweixin.js 中对应的全局导致对象。
    var current = null; // 在 init() 中获得的 config


    module.exports = exports = /**@lends WeChat*/ {

        /**
        * 初始化微信环境。
        * 该方法会加载微信的 js 库，并进行签名验证，准备就绪后会触发 ready 事件。
        */
        init: function (config) {

            var JsApiList = module.require('JsApiList');
            var Lib = module.require('Lib');
            var Signature = module.require('Signature');


            config = current = Config.clone(module.id, config);

            //并行加载 js 库和验证签名，而不是串行去做
            var sg = null;

            Lib.load(config.js, function (wxObj) {
                wx = wxObj;
                checkReady(wxObj, sg);
            });

            Signature.get({
                'eid': config.eid,
                'url': config.url,
                'timestamp': config.timestamp,
                'noncestr': config.noncestr,

            }, function (data) {
                sg = data;
                checkReady(wx, data);
            });


            var count = 0;

            function checkReady(wx, data) {

                if (!wx || !data) {
                    count++;
                    if (count < 5) {
                        setTimeout(checkReady, 200);
                    }
                    return;
                }

                //这是一个异步操作
                wx.config({
                    'debug': config.debug,
                    'appId': config.appid,

                    'timestamp': data.timestamp,
                    'nonceStr': data.noncestr,
                    'signature': data.signature,

                    'jsApiList': JsApiList.get(wx, config.apis),
                });

                // config() 调用完成后的成功回调
                wx.ready(function () {
                    status = 'ready';
                    emitter.fire('ready', [wx]);
                });

                // config() 调用完成后的出错回调
                wx.error(function (json) {
                   
                    if (json.code == 42001 && config.retryAfterExpired) {
                        exports.init(config);  //签名过期时需要重新签名
                    }
                    else {
                        status = 'error';
                        emitter.fire('error', [wx]);
                    }
                });
            }
        },

        /**
        * 绑定事件。
        * 已重载 on({...}，因此支持批量绑定。
        * @param {string} name 事件名称。
        * @param {function} fn 回调函数。
        */
        on: function (name, fn) {

            var args = [].slice.call(arguments, 0);

            if (!status) { //请求尚未完成，先添加到回调列表
                emitter.on.apply(emitter, args);
                return;
            }

            //请求已完成，立即触发
            var emt = new Emitter(); //使用临时的事件触发器。
            emt.on.apply(emt, args);
            emt.fire(status, [wx]);
            emt.destroy();
            emt = null;

        },

        /**
        * 获取跳转到登录授权页面的 url，常用于在云之家分享到微信时需要打开的链接。
        * 已重载：
        *   getLoginUrl(eid, url, query);
        *   getLoginUrl(eid, url);
        *   getLoginUrl(url, query);
        *   getLoginUrl(url);
        * @param {string} [eid] 企业号。 
            如果不指定，则从参数 query 中取得，否则需要先调用 init() 方法以传入 eid。
        * @param {string} url 需要跳转到的目标 url。 
        * @param {Object} [query] 需要附加到目标 url 中的查询参数。 
        * @return {string} 返回一个完整的可用于在微信端打开并跳到目标页页的链接地址。
        */
        getLoginUrl: function (eid, url, query) {

            //重载其它三种情况，参数修正从后面开始
            switch (arguments.length) {
                case 1: //重载 getLoginUrl(url)
                    if (!current) {
                        throw new Error('当调用方式为 getLoginUrl(url) 时，请先调用 init() 方法以传入 eid 字段。');
                    }

                    query = null;
                    url = eid;
                    eid = current.eid;
                    break;

                case 2:
                    if (typeof url == 'object') {    //重载 getLoginUrl(url, query);
                        query = url;
                        url = eid;
                        eid = query.eid || current.eid;

                        if (!eid) {
                            throw new Error('当调用方式为 getLoginUrl(url, query) 时，请在参数 query 中指定 eid 字段，或先调用 init() 方法以传入 eid 字段。');
                        }
                    }
                    else { //重载 getLoginUrl(eid, url);
                        query = null;
                    }
                    break;

            }


            if (query) {
                url = Url.addQueryString(url, query);
            }


            var defaults = Config.get(module.id);
            var login = defaults.login;

            var data = $.Object.extend({}, login.data, {
                'eid': eid,
                'from_url': url,
            });

            
            url = Url.addQueryString(login.url, data);
            return url;

        },


        /**
        * 在微信就绪后绑定分享操作数据。
        * @param {string} type 分享的类型，可取的值有: 
        *   'AppMessage': 分享给朋友;
        *   'QQ': 分享给 QQ;
        *   'QZone': 分享到 QQ 空间;
        *   'Timeline': 分享到朋友圈;
        *   'Weibo': 分享到微博;
        * @param {Object} data 配置数据对象。 其中：
        * @param {string} data.title 要显示的标题。
        * @param {string} data.desc 要显示的描述内容。
        * @param {string} data.url (或 data.link)需要跳转到的目标页面 url。
        * @param {string} data.icon (或 data.imgUrl)要显示的图标。 支持 base64 格式。
        */
        share: function (type, data) {
            exports.on('ready', function (wx) {

                var url = data.link || data.url; //多名称方式
                url = exports.getLoginUrl(url); 

                data = $.Object.extend({}, data, {
                    'link': url,
                    'imgUrl': data.imgUrl || data.icon, //多名称方式
                });

                //下面两个字段不是微信接口层所需要的，安全起见，移除掉为好。
                data = $.Object.remove(data, [
                    'url',
                    'icon',
                ]);

                var name = 'onMenuShare' + type;
                var share = wx[name];
                if (typeof share != 'function') {
                    throw new Error('wx 对象中不存在方法: ' + name);
                }

                share = share.bind(wx);
                share(data);
            });

        },

        /**
        * 在微信就绪后调用 wx 对象中指定名称的方法。
        * 这是一个异步调用，并可传递一些参数。
        * @param {string} methodName 要调用的方法名称: 
        */
        invoke: function (methodName, arg0, argN) {

            exports.on('ready', function (wx) {

                var fn = wx[methodName];
                if (typeof fn != 'function') {
                    throw new Error('wx 对象中不存在方法: ' + methodName);
                }

                var args = [].slice.call(arguments, 1);
                fn.apply(wx, args);
            });

        },


        
    };

});




/**
* App 启动类
* @class
* @name App
*/
define('App', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Config = require('Config');


    var mapper = new Mapper();


    /**
    * 构造器。
    * @constructor
    */
    function App(name, config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var meta = {
            'name': name,
            'mask': config.mask,
            //'predefined': [],
            'animation': config.animation,
        };

        mapper.set(this, meta);


    }



    App.prototype = /**@lends App#*/ {
        constructor: App,

        /**
        * 初始化执行环境，并启动应用程序。
        * 该方法会预先定义一些公共模块，然后定义一个指定的(或匿名)模块并启动它。
        * @param {function} factory 工厂函数，即启动函数。
        */
        launch: function (factory) {

            var $ = require('jquery-plugin/touch') || require('$'); //
            var MiniQuery = require('MiniQuery');
            var KISP = require('KISP');
            var Module = require('Module');

            var define = Module.define;

            define('$', function () {
                return $;
            });

            define('MiniQuery', function () {
                return MiniQuery;
            });

            define('KISP', function () {
                return KISP;
            });

            var meta = mapper.get(this);
            var name = meta.name;

            define(name, factory);
            Module.require(name); //启动
        },
       
        /**
        * 初始化执行环境，创建导航管理器和相应的 UI 组件，并启动应用程序。
        * @param {function} factory 工厂函数，即启动函数。
        */
        render: function (fn) {
            var meta = mapper.get(this);
            var Nav = module.require('Nav');
            

            //不使用动画
            if (!meta.animation) { 
                this.launch(function (require, module) {
                    var nav = Nav.create(meta.mask);

                    //后退时触发
                    nav.on('back', function (current, target) {
                        document.activeElement.blur(); // 关闭输入法
                        current = module.require(current);
                        target = module.require(target);
                        current.hide();
                        target.show();
                    });

                    //跳转到目标视图之前触发，先隐藏当前视图
                    nav.on('before-to', function (current, target) {
                        current = module.require(current);
                        current.hide();
                    });

                    //统一绑定视图跳转动作，在调用 nav.to(...) 时会给触发
                    nav.on('to', function (name, arg0, arg1, argN) {
                        var args = [].slice.call(arguments, 1);
                        var M = module.require(name);
                        M.render.apply(M, args);
                    });

                    fn && fn(require, module, nav);
                });

                return;
            }



            //使用动画
            var Mask = require('Mask');
            var Transition = module.require('Transition');

            this.launch(function (require, module) {

                var name$bound = {}; //记录目标视图是否已绑定了 transitionend 事件。
                var eventName = Transition.getEventName();
                var nav = Nav.create();

                var mask = new Mask();
                mask.render();


                //后退时触发
                nav.on('back', function (current, target) {
                    document.activeElement.blur(); // 关闭输入法

                    target = module.require(target);
                    target.show(); //这里要触发 show 事件

                    current = module.require(current);
                    current.$.removeClass('Forward').addClass('Back');

                    target.$.css({ 'z-index': 1, });
                    current.$.css({ 'z-index': 3, });

                    mask.$.removeClass('BeforeForward Forward Back');
                    mask.$.addClass('BeforeBack');
                    mask.$.show();


                    //防止时间竞争
                    setTimeout(function () {
                        mask.$.addClass('Back');
                    }, 50);

                });


                //跳转到目标视图之前触发
                nav.on('before-to', function (current, target) {
                    var name = target;

                    current = module.require(current);
                    target = module.require(target);

                    current.$.css({ 'z-index': 1, });
                    target.$.css({ 'z-index': 3, });


                    
                    target.$.addClass('BeforeForward');
                    target.$.removeClass('Back');
                    target.$.show();

                    mask.$.removeClass('Back BeforeBack Forward')
                    mask.$.addClass('BeforeForward');
                    mask.$.show();

                    //防止时间竞争
                    setTimeout(function () {
                        mask.$.addClass('Forward');
                        target.$.addClass('Forward');
                    }, 50);

                    // css 动画结束后执行
                    var bound = name$bound[name];
                    if (!bound) { //首次绑定

                        target.$.on(eventName, function () {
                            if (target.$.hasClass('Forward')) { //前进
                                current.hide(); //要触发 hide 事件
                            }
                            else if (target.$.hasClass('Back')) { //后退
                                target.hide(); //要触发 hide 事件
                            }
                            mask.$.hide();
                        });

                        name$bound[name] = true;
                    }
                });


                //统一绑定视图跳转动作，在调用 nav.to(...) 时会给触发
                nav.on('to', function (name, arg0, arg1, argN) {
                    var args = [].slice.call(arguments, 1);
                    var target = module.require(name);
                    target.render.apply(target, args);
                });

                fn && fn(require, module, nav);

            });

        },

     

    };


    return App;

});



define('App/Nav', function (require, module, exports) {
    var $ = require('$');

   
    function create(config) {

        var Navigator = require('Navigator');

        var nav = new Navigator({
            hash: function (current) {
                //为了让 url 中的 hash 可读性更好，有助于快速定位到相应的模块。
                return [current, $.String.random(8)].join('-');
            },
        });


        if (config) {
            var Mask = require('Mask');

            var mask = new Mask({
                opacity: config.opacity,
                duration: config.duration,
                'z-index': config['z-index'],
            });

            mask.render(); //提前渲染但不显示，避免在视图切换时来不及创建 DOM 节点。

            function showMask() {
                mask.show();
            }

            //避免上一个视图的点透
            nav.on({
                'before-to': showMask,
                'back': showMask,
            });

        }


        //重写 nav.to 方法
        var to = nav.to;

        /**
        * 跳转(或延迟跳转)到指定的视图，并传递一些参数。
        */
        nav.to = function (delay, name, arg0, argN) {

            var args = [].slice.call(arguments);

            //重载 to(name, arg0, argN)
            if (typeof delay == 'string') {
                name = delay;
                delay = false;
            }
            else {
                args = args.slice(1);
            }

            if (delay) {
                setTimeout(function () {
                    to.apply(nav, args);
                }, delay);
            }
            else {
                to.apply(nav, args);
            }
        };

        return nav;
    }


    return {
        create: create,
    };



});



define('App/Transition', function (require, module, exports) {
    var $ = require('$');


    var p$eventName = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    };

    var eventName = '';

    function getEventName() {

        if (eventName) {
            return eventName;
        }


        var el = document.createElement('div');

        for (var p in p$eventName) {

            if (el.style[p] !== undefined) {
                eventName = p$eventName[p];
                return eventName;
            }
        }
    }


    return {
        getEventName: getEventName,
    };


});


/**
* alert 对话框
* @namespace
* @name Alert
* @private
*/
define('Alert', function (require, module, exports) {

    var $ = require('$');
    var Dialog = module.require('Dialog');



    /**
    * 显示一个 alert 对话框。 
    * 支持多次调用，会将多次调用加进队列，在显示完上一次后进行下一次的显示。
    */
    function show(text, text1, textN, fn) {

        //重载 get(obj); 以方便程序员调试查看 json 对象。
        if (typeof text == 'object') {
            var Sample = module.require('Sample');
            text = JSON.stringify(text, null, 4);
            text = $.String.format(Sample, { 'text': text, });
        }

        var args = [].slice.call(arguments, 1);

        //在参数列表中找到的第一个函数当作是回调函数，并忽略后面的参数。
        var index = $.Array.findIndex(args, function (item, index) {
            return typeof item == 'function';
        });

        if (index >= 0) { //找到回调函数
            fn = args[index];
            args = args.slice(0, index); //回调函数前面的都当作是要显示的文本
        }
        else {
            fn = null;
        }

        args = [text].concat(args);
        text = $.String.format.apply(null, args);



        Dialog.add(text, fn);
    }




    return {
        show: show,
    };

});



define('Alert/Dialog', function (require, module, exports) {

    var $ = require('$');

    var dialog = null;
    var visible = false;
    var list = [];


    //创建对话框
    function create() {

        var Config = require('Config');
        config = Config.clone('Alert');

        var Dialog = require('Dialog');
        var dialog = new Dialog({
            'cssClass': 'Alert',
            'volatile': config.volatile,
            'mask': config.mask,
            'autoClosed': config.autoClosed,
            'width': config.width,
            'z-index': config['z-index'],
            'buttons': [
               {
                   name: 'ok',
                   text: config.button,
               },
            ],
        });


        dialog.on('button', 'ok', function () {
            var fn = dialog.data('fn');
            fn && fn();
        });


        dialog.on({
            'show': function () {
                visible = true;
            },

            'hide': function () {
                visible = false;
                var obj = list.shift();
                if (obj) {
                    render(obj.text, obj.fn);
                }
            },
        });

        //响应回车键
        $(document).on('keyup', function (event) {
            if (event.keyCode == 13) { //
                dialog.hide();

                var fn = dialog.data('fn');
                fn && fn();
            }
        });

        return dialog;

    }


    

    //根据文本来计算高度，大概值，并不要求很准确
    function getHeight(text) {

        text = String(text);
        var len = $.String.getByteLength(text);
        var h = Math.max(len, 125);
        var max = document.documentElement.clientHeight;

        if (h >= max * 0.8) {
            h = '80%';
        }

        return h;
    }


    function render(text, fn) {

        var height = getHeight(text);

        dialog = dialog || create();
       
        dialog.data('fn', fn);
        dialog.set('text', text);
        dialog.set('height', height);

        dialog.show();

    }


    function add(text, fn) {

        //首次显示，或之前显示的已经给隐藏了，立即显示出来。
        if (!visible) {
            render(text, fn);
            return;
        }

        //已经是显示的，加到队列里进行排队。
        list.push({
            'text': text,
            'fn': fn,
        });
    }


    //add(0, function () { });
    //add(1, function () { });
    //add(2, function () { });


    return {
        add: add,
    };

});


/*
* Alert/Sample
* 由 grunt 生成，来源: ui/dialog/Alert/Sample.html
*/
define('Alert/Sample', [
    '<pre class="JSON">{text}</pre>',
].join('\n'));

/**
* 简单的 confirm 虚拟对话框。
* @namespace
* @name Confirm
*/
define('Confirm', function (require, module, exports) {

    var dialog = null;

    function create() {

        if (dialog) {
            return dialog;
        }

        var Dialog = require('Dialog');

        dialog = new Dialog({
            autoClose: true,
            height: 140,
            buttons: [
                { text: '取消', },
                { text: '确定', name: 'ok', color: 'red', },
            ],
        });

        dialog.on('button', 'ok', function () {
            var fn = dialog.data('fn');
            fn && fn();
        });

        return dialog;
    }


    function show(text, fn) {

        dialog = create();

        //有闭包的作用影响，这里要把回调函数 fn 保存起来
        dialog.data('fn', fn);
        dialog.set('text', text);
        dialog.show();

    }


    return {
        show: show,
    };



});

/**
* 对话框组件
* @class
* @name Dialog
*/
define('Dialog', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var RandomId = require('RandomId');

    //子模块
    var Sample = module.require('Sample');
    var Style = module.require('Style');
    var Renderer = module.require('Renderer');

    var mapper = require('Mapper');


    /**
    * 构造器。
    * @constructor
    */
    function Dialog(config) {


        mapper.setGuid(this, module); //设置 guid, 提高 mapper 查找效率。

        config = Config.clone(module.id, config);

        var emitter = new Emitter(this);

        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }

        var buttons = config.buttons;
        var eventName = config.eventName;

        var prefix = config.prefix;
        var suffix = config.suffix;

        var meta = {
            'id': RandomId.get(prefix, suffix),
            'articleId': RandomId.get(prefix, 'article-', suffix),
            'contentId': RandomId.get(prefix, 'content-', suffix),
            'footerId': RandomId.get(prefix, 'footer-', suffix),
            'div': null,
            'scrollable': config.scrollable,
            'scroller': null,
            'scrollerConfig': config['scroller'],
            'eventName': eventName,
            'title': config.title,
            'text': config.text,
            'buttons': buttons,
            'samples': Sample.get(config.sample),//加载相应的 HTML 模板
            'emitter': emitter,
            'mask': config.mask,
            'masker': null,                     // Mask 的实例，重复使用
            'layer': null,                      //用来防止点透用的透明层，
            'cssClass': cssClass,
            'style': Style.get(config),
            'autoClosed': config.autoClosed,    //点击任何一个按钮后是否自动关闭组件
            'visible': false,                   //记录当前组件是否已显示
            'volatile': config.volatile,
            'zIndex': config['z-index'],        //生成透明层时要用到
            'data': {},                         //供 this.data() 方法使用
            
        };

        mapper.set(this, meta);


        //预绑定事件
        if (buttons && buttons.length > 0) {
            $.Array.each(buttons, function (item, index) {
                var fn = item.fn;
                if (!fn) {
                    return;
                }

                var name = item.name || String(index);
                //这两个已废弃，建议使用 #2
                emitter.on(eventName, 'button', name, fn);

                //#2 建议使用
                emitter.on('button', name, fn);
            });
        }

        //当宽度或高度指定了百分比，需要监听窗口的大小变化，以使组件大小相适应
        var obj = $.Object.filter(config, ['width', 'height']);
        $(window).on('resize', function () {
            var p = Style.get(obj);
            $(meta.div).css(p);
        });

        
    }


    //实例方法
    Dialog.prototype = /**@lends Dialog#*/ {
        constructor: Dialog,

        /**
        * $(container) 的快捷方式。
        */
        $: null,

        /**
        * 渲染本组件。
        * 该方法会创建 DOM 节点，并且绑定事件，但没有调用 show()。
        */
        render: function () {
            var meta = mapper.get(this);
            var div = meta.div;

            //已经渲染过了
            if (div) {
                return;
            }

            div = meta.div = Renderer.render(meta, this);
            $(div).hide(); //先隐藏

            var Mask = require('Mask');
            var zIndex = meta.zIndex;

            meta.masker = new Mask({
                'z-index': zIndex - 1,
            });

            if (meta.volatile) {
                var self = this;
                meta.masker.on('click', function () {
                    self.hide();
                });
            }

            //防止点透
            meta.layer = new Mask({
                opacity: 0,
                'z-index': zIndex + 1,
            });
        },

        /**
        * 显示本组件。
        */
        show: function (mask) {
            var meta = mapper.get(this);
            this.render();


            var Mask = require('Mask');
            mask = Mask.filter(meta.mask, mask);

            //指定了启用 mask 层
            if (mask) {
                meta.masker.show(mask);
            }
            else {
                masker.hide();
            }

            meta.layer.show({ duration: 200 });

            //这个不能放在 setTimeout 里，因为外面可能已经调用了 set('height') 等改变了
            $(meta.div).css(meta.style);


            //这里要用异步稍微延迟一下，不然会跟 layer 的 show 几乎是同时的
            setTimeout(function () {
                $(meta.div).show();
            }, 0);

            //下面的两行不要放在上面的 setTimeout 里，
            //因为外面可能已经调用了 destroy() 而导致 emitter 不可用
            meta.visible = true;
            meta.emitter.fire('show');

        },

        /**
        * 隐藏本组件。
        * @param {number} [lastTime] 需要持续显示的时间。
        */
        hide: function () {
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div || !meta.visible) {
                return;
            }

            var masker = meta.masker;
            if (masker) {
                masker.hide();
            }

            $(div).hide();
            meta.visible = false;
            meta.emitter.fire('hide');

        },

        /**
        * 移除本组件对应的 DOM 节点。
        */
        remove: function () {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }


            var masker = meta.masker;
            if (masker) {
                masker.remove();
            }

            var layer = meta.layer;
            if (layer) {
                layer.remove();
            }

            //reset
            meta.div = null;
            meta.masker = null;
            meta.layer = null;
            meta.visible = false;

            $(div).off();

            div.parentNode.removeChild(div);
            meta.emitter.fire('remove');

        },

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
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            if (!meta) {
                throw new Error('该实例已给销毁，无法再次调用 destroy 方法。');
            }

            var emitter = meta.emitter;
            var scroller = meta.scroller;

            this.remove();
            emitter.destroy();
            scroller && scroller.destroy(); //在 PC 端为 null

            mapper.remove(this);
        },

        /**
        * 设置指定的属性。
        * @param {string} name 要设置的属性的名称。 目前支持的字段有： 
            'text',
            'height',
            'width',
        * @param value 要设置的属性的值，可以是任何类型。
        */
        set: function (name, value) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;

            this.render();

            switch (name) {
                case 'text':
                    $('#' + meta.contentId).html(value);
                    scroller && scroller.refresh();
                    break;

                case 'height':
                case 'width':
                    var obj = {};
                    obj[name] = value;
                    obj = Style.get(obj);
                    $.Object.extend(meta.style, obj); //回写，避免调用 show 时又给重置
                    $(meta.div).css(obj);
                    scroller && scroller.refresh(300);
                    break;

                default:
                    throw new Error('目前不支持设置属性: ' + name);
            }


        },

        /**
        * 获取或设置自定义数据。 
        * 已重载 data()、 data(key)、data(obj)、data(key, value)。
        * 在跨函数中传递数据时会比较方便。
        * @param {string|Object} key 要获取或设置的数据的名称(键)。
            当指定为一个纯对象 {} 时，则表示批量设置。
            当指定为字符串或可以转为字符串的类型时，则表示获取指定名称的数据。
        * @param value 要设置的数据的值。 只有显式提供该参数，才表示设置。
        * @return 返回获取到的或设置进来的值。
        */
        data: function (key, value) {
            var meta = mapper.get(this);
            var data = meta.data;

            var len = arguments.length;
            if (len == 0) { //获取全部
                return data;
            }

            //重载 data(obj); 批量设置
            if ($.Object.isPlain(key)) {
                $.Object.extend(data, key);
                return key;
            }

            //get(key)
            if (len == 1) {
                return data[key];
            }

            //set(key, value)
            data[key] = value;
            return value;

        },


    };

    return Dialog;

});


/*
* Dialog/Sample/iOS
* 由 grunt 生成，来源: ui/dialog/Dialog/Sample/iOS.html
*/
define('Dialog/Sample/iOS', [
    '#--div.begin--#',
    '<div id="{id}" class="KISP Dialog {cssClass}" style="{style}">',
    '    <header class="{no-header}" style="{header-style}">',
    '        {title}',
    '    </header>',
    '    <article id="{article-id}" class="buttons-{buttons-count} {no-header}">',
    '        <div id="{content-id}">{text}</div>',
    '    </article>',
    '    <footer id="{footer-id}" class="buttons-{buttons-count}">',
    '        #--button.begin--#',
    '        <span data-index="{index}" style="{style}">{text}</span>',
    '        #--button.end--#',
    '    </footer>',
    '</div>',
    '#--div.end--#',
].join('\n'));


/**
*
*/
define('Dialog/Renderer', function (require, module, exports) {

    var $ = require('$');
    var Style = require('Style');
    

    function getStyle(item) {

        if (!item) {
            return '';
        }

        var style = Style.filter(item, [
            'border-bottom',
            'color',
            'font-size',
            'font-weight',
            'width',
        ]);

        style = Style.stringify(style);
        return style;
    }

    


    function render(meta, dialog) {

        var buttons = meta.buttons || [];
        var emitter = meta.emitter;
        var id = meta.id;
        var articleId = meta.articleId;
        var footerId = meta.footerId;
        var style = meta.style;

        var samples = meta.samples;



        var title = meta.title;

        //标准化成一个 object
        if (title && typeof title != 'object') {
            title = { 'text': title || '', };
        }

        var html = $.String.format(samples['div'], {
            'id': id,
            'article-id': articleId,
            'content-id': meta.contentId,
            'footer-id': footerId,

            'cssClass': meta.cssClass,
            'style': Style.stringify(style),

            'title': title ? title.text : '',
            'text': meta.text,
            'no-header': title ? '' : 'no-header', //针对无标题时
            'header-style': getStyle(title),

            'buttons-count': buttons.length,
            'text-height': parseInt(style.height) - 44 * 2 - 2,

            'buttons': $.Array.keep(buttons, function (item, index) {

                if (typeof item == 'string') {
                    buttons[index] = item = {
                        'text': item,
                    };
                }

                return $.String.format(samples['button'], {
                    'index': index,
                    'text': item.text,
                    'style': getStyle(item),
                });

            }).join(''),
        });

        $(document.body).prepend(html);

        var eventName = meta.eventName;

        var article = $('#' + articleId);

        if (eventName == 'touch') {
            article.touch(function () {
                emitter.fire('touch-main');
            });
        }
        else {
            article.on(eventName, function () {
                emitter.fire(eventName + '-main');
            });
        }

        //指定了可滚动
        if (meta.scrollable) {
            var Scroller = require('Scroller');
            var scroller = new Scroller(article.get(0), meta.scrollerConfig);
            meta.scroller = scroller;
        }



        //底部按钮组
        var footer = $('#' + footerId);
        if (buttons.length > 0) { //有按钮时才绑定

            if (eventName == 'touch') { //移动端的，特殊处理
                footer.touch('[data-index]', fn, 'pressed');
            }
            else { // PC 端
                footer.on(eventName, '[data-index]', fn);

                footer.on('mousedown', '[data-index]', function (event) {
                    var button = this;
                    $(button).addClass('pressed');
                });

                footer.on('mouseup', '[data-index]', function (event) {
                    var button = this;
                    $(button).removeClass('pressed');
                });
            }

            function fn(event) {
                var button = this;
                var index = +button.getAttribute('data-index');
                var item = buttons[index];
                var name = item.name || String(index);


                //这两个已废弃，建议使用 #2
                emitter.fire('click', 'button', name, [item, index]);
                emitter.fire('click', 'button', [item, index]);

                //#2 建议使用
                emitter.fire('button', name, [item, index]);
                emitter.fire('button', [item, index]);

                // item.autoClosed 优先级高于 meta.autoClosed
                var autoClosed = item.autoClosed;
                if (autoClosed === undefined) {
                    autoClosed = meta.autoClosed;
                }

                if (autoClosed) {
                    dialog.hide();
                }

            }
        }
        

        var div = document.getElementById(id);

        //暴露一个 jQuery 对象给外面使用。 但为了安全起见，内部不使用这个对象。
        dialog.$ = $(div);

        return div;

    }


    return {

        render: render,
    };

});



define('Dialog/Sample', function (require, module, exports) {
    
    var $ = require('$');

    //去掉多余的换行和空格
    function trim(s) {
        return s.replace(/\n|\r|\r\n/g, ' ')
                .replace(/\s+/g, ' ');
    }


    function get(name) {

        var sample = require(module, name);
        var samples = $.String.getTemplates(sample, [
            {
                name: 'div',
                begin: '#--div.begin--#',
                end: '#--div.end--#',
                fn: trim,
            },
            {
                name: 'header',
                begin: '#--header.begin--#',
                end: '#--header.end--#',
                outer: '{header}',
                fn: trim,
            },
            {
                name: 'footer',
                begin: '#--footer.begin--#',
                end: '#--footer.end--#',
                outer: '{footer}',
                fn: trim,
            },
            {
                name: 'button',
                begin: '#--button.begin--#',
                end: '#--button.end--#',
                outer: '{buttons}',
                fn: trim,
            },
        ]);

        return samples;
    }





    return {
        get: get,
    };


});



/**
* 
*/
define('Dialog/Style', function (require, module, exports) {
    var $ = require('$');
    var Style = require('Style');
    

    function getMargin(v) {

        var type = typeof v;

        if (type == 'number') {
            return (0 - v / 2) + 'px';
        }

        if (type == 'string' && v.slice(-2) == 'px') {
            v = parseInt(v);
            return (0 - v / 2) + 'px';
        }

    }



    function get(config) {

        var style = Style.filter(config, [
            'background',
            'border',
            'border-radius',
            'height',
            'width',
            'z-index',
            'position',
        ]);

        var width = style.width;
        if (typeof width != 'number') {
            var maxWidth = document.documentElement.clientWidth;
            if (Style.checkUnit(width, '%')) {
                style.width = Style.parsePercent(width, maxWidth);
            }
            else if (!width) {
                style.width = maxWidth * 0.8 + 'px';
            }
        }
        

        var height = style.height;
        if (typeof height != 'number') {
            var maxHeight = document.documentElement.clientHeight;
            if (Style.checkUnit(height, '%')) {
                style.height = Style.parsePercent(height, maxHeight);
            }
            else if (!height) {
                style.height = maxHeight * 0.8 + 'px';
            }
        }

        //根据宽度计算 margin-left 和 margin-top，使其居中

        var v = getMargin(style.width);
        if (v) {
            style['margin-left'] = v;
        }

        v = getMargin(style.height);
        if (v) {
            style['margin-top'] = v;
        }

        return style;


    }




    

    return {
        get: get,
    };


});



/**
* 图片查看器。
* @class
* @name ImageViewer
*/
define('ImageViewer', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Emitter = MiniQuery.require('Emitter');
    var Config = require('Config');
    var RandomId = require('RandomId');

    var mapper = require('Mapper');


    /**
    * 构造器。
    * @constructor
    */
    function ImageViewer(img, config) {

        //重载 ImageViewer(config)
        if ($.Object.isPlain(img)) {
            config = img;
            img = config.img;
        }


        mapper.setGuid(this, module);
        config = Config.clone(module.id, config);

        var emitter = new Emitter(this);


        //以下字段不属于 Dialog 构造器所需要的，移掉为安全起见。
        var cfg = $.Object.remove(config, [
            'sample',
        ]);

        var Dialog = require('Dialog');
        var dialog = new Dialog(cfg);
        var eventName = config.eventName;

        dialog.on(eventName + '-main', function () {
            dialog.hide();
        });

        dialog.on('hide', function () {
            emitter.fire('hide');
        });

        dialog.on('show', function () {
            emitter.fire('show');
        });


        var prefix = config.prefix;
        var suffix = config.suffix;
       
        var meta = {
            'imgId': RandomId.get(prefix, 'img-', suffix),
            'img': img,
            'sample': config.sample,
            'dialog': dialog,
            'emitter': emitter,
        };

        mapper.set(this, meta);
    }


    //实例方法
    ImageViewer.prototype =  /**@lends ImageViewer#*/ {
        constructor: ImageViewer,
        
        /**
        * 显示本组件。
        * @param {string|jQuery|Elemenet} [img] 要显示的图片。
            可以直接传入一个图片 src 地址；或者传入要关联显示的 img 元素节点。
        */
        show: function (src) {

            var meta = mapper.get(this);
            var imgId = meta.imgId;
            var dialog = meta.dialog;

            var img = document.getElementById(imgId);

            if (img) { //之前已经创建
                if (src) {
                    //传入的是 DOM 元素或 jQuery 对象
                    if (typeof src == 'object') {
                        src = $(src).attr('src');
                    }
                    img.src = src;
                }

                dialog.show();

                return;
            }


            //首次创建

            src = src || meta.img;

            //传入的是 DOM 元素或 jQuery 对象
            if (typeof src == 'object') {
                src = $(src).attr('src');
            }

            var sample = meta.sample;

            var html = $.String.format(sample, {
                'id': imgId,
                'src': src,

            });

            dialog.set('text', html);
            dialog.show();

          
        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            var meta = mapper.get(this);
            var dialog = meta.dialog;
            dialog.hide();
        },

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);
        },


    };

    return ImageViewer;

});



/**
* 加载中提示组件
* @class
* @name Loading
*/
define('Loading', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var RandomId = require('RandomId');

    //子模块
    var Sample = module.require('Sample');
    var Style = module.require('Style');
    var Presettings = module.require('Presettings');

    var mapper = new Mapper();



    function render(style) {

        var meta = mapper.get(this);

        var id = meta.id;
        var sample = meta.sample;

        var Style = require('Style');

        var html = $.String.format(sample, {
            'id': id,
            'text-id': meta.textId,
            'text': meta.text,
            'style': Style.stringify(style),
            'cssClass': meta.cssClass,
        });

        var container = meta.container;
        if (meta.append) {
            $(container).append(html);
        }
        else {
            $(container).prepend(html);
        }

        var div = document.getElementById(id);
        meta.div = div;

        return div;

    }


   

    /**
    * 构造器。
    * @constructor
    */
    function Loading(config) {

        Mapper.setGuid(this);

    
        var presetting = config ? Presettings[config.presetting] : null;
        config = Config.clone(module.id, presetting, config);


        var emitter = new Emitter(this);

        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }

        var text = config.text;
        if (!text && text !== 0) { // 0 除外
            cssClass += ' NoText'; //注意，前面要有个空格
        }

        //向后兼容。
        cssClass = $.Array.keep(cssClass.split(' '), function (item, index) {
            if (item == 'same-line') {
                console.warn('类名 "same-line" 已过时，请使用 "SameLine"');
                return 'SameLine';
            }

            return item;
        }).join(' ');


        var prefix = config.prefix;
        var suffix = config.suffix;

        var meta = {
            'id': RandomId.get(prefix, suffix),
            'textId': RandomId.get(prefix, 'text-', suffix),
            'container': config.container,
            'prepend': config.prepend,
            'div': null,
            'sample': Sample.get(config.sample), //加载相应的 HTML 模板
            'text': text,
            'emitter': emitter,
            'mask': config.mask,
            'masker': null, // Mask 的实例，重复使用
            'style': Style.get(config),
            'showTime': 0, //开始显示时的时间点
            'cssClass': cssClass,
            'append': config.append,
        };

        mapper.set(this, meta);

    }


    //实例方法
    Loading.prototype = /**@lends Loading#*/ {
        constructor: Loading,

        /**
       * 渲染本组件。
       * 该方法会创建 DOM 节点，并且绑定事件，但没有调用 show()。
       */
        render: function () {
            
        },

        /**
        * 显示本组件。
        */
        show: function (text, config) {


            if (typeof text == 'object') { //重载 show(config)
                config = text;
                text = config.text;
            }

            config = config || {};


            var meta = mapper.get(this);
            var div = meta.div;
            var style = Style.get(meta.style, config);


            if (!div) { //首次 render
                div = render.call(this, style);
            }
            

            //在高版本的 iOS 上，样式必须重新设置，否则 background、top、bottom 
            // 的样式会不生效，至今也没有查出原因
            //else if(config) { //只有指定了 config，才有可能指定 style
            //  $(div).css(style);
            //}

            //用下面这种，相当于重复设置，但可以避免上述问题!!!
            $(div).css(style);

            var Mask = require('Mask');
            var mask = Mask.filter(meta.mask, config.mask);
            var masker = meta.masker;

            //指定了启用 mask 层
            if (mask) {
                if (!masker) {
                    masker = meta.masker = new Mask({
                        'container': meta.container,
                    });
                }

                masker.show(mask);
            }
            else {
                if (masker) { //之前已经创建了，并且可能是显示的。
                    masker.hide();
                }
            }


            if (text !== undefined && text != meta.text) {
                document.getElementById(meta.textId).innerHTML = text;
                meta.text = text;
            }

            meta.showTime = Date.now(); //记录开始显示的时间点

            $(div).show();
            meta.emitter.fire('show');


            var duration = config.duration;
            if (duration) {
                var self = this;
                setTimeout(function () {
                    self.hide();
                }, duration);
            }

        },

        /**
        * 隐藏本组件。
        * @param {number} [lastTime] 需要持续显示的时间。
        */
        hide: function (lastTime) {
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }
            
            if (!lastTime) { //未指定要持续显示的时间，则立即隐藏
                hide();
                return;
            }

            var now = Date.now();
            var showTime = meta.showTime;

            var useTime = now - showTime;       //已经显示的时间
            var leftTime = lastTime - useTime;  //剩余时间

            if (leftTime > 0) {
                setTimeout(hide, leftTime);
            }
            else { //立即隐藏
                hide();
            }

            //内部方法
            function hide() {
                var masker = meta.masker;
                if (masker) {
                    masker.hide();
                }
                meta.showTime = 0;
                $(div).hide();
                meta.emitter.fire('hide');
            }

        },

        /**
        * 移除本组件对应的 DOM 节点。
        */
        remove: function () {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }


            var masker = meta.masker;
            if (masker) {
                masker.remove();
            }

            //reset
            meta.div = null;
            meta.masker = null;
            meta.hasBind = false;

            $(div).off();

            document.body.removeChild(div);
            meta.emitter.fire('remove');

        },

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
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            this.remove();
            emitter.destroy();

            mapper.remove(this);
        },

    };

    return Loading;

});


/*
* Loading/Sample/iOS
* 由 grunt 生成，来源: ui/dialog/Loading/Sample/iOS.html
*/
define('Loading/Sample/iOS', [
    '<div id="{id}" class="KISP Loading-iOS {cssClass}" style="{style}">',
    '    <div class="Main">',
    '        <div class="Item-0"></div>',
    '        <div class="Item-1"></div>',
    '        <div class="Item-2"></div>',
    '        <div class="Item-3"></div>',
    '        <div class="Item-4"></div>',
    '        <div class="Item-5"></div>',
    '        <div class="Item-6"></div>',
    '        <div class="Item-7"></div>',
    '        <div class="Item-8"></div>',
    '        <div class="Item-9"></div>',
    '        <div class="Item-10"></div>',
    '        <div class="Item-11"></div>',
    '    </div>',
    '    <span id="{text-id}" class="Text">{text}</span>',
    '</div>',
].join('\n'));


/**
* Loading 的预设配置。
*/
define('Loading/Presettings', {

    fullscreen: {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        'font-size': 15,
        'margin-top': 0,
        'margin-left': 0,
        'margin-right': 0,
        'margin-bottom': 0,
        'border-radius': 0,
    },

    'scroller.pulldown': {
        sample: 'iOS',
        cssClass: 'SameLine',
        text: '加载中...',
        background: 'none',
        color: '#000',
        height: 26,
        width: '100%',
        left: 0,
        top: 0,
        bottom: 'initial',
        right: 'initial',
        'font-size': 15,
        'margin-top': 0,
        'border-radius': 0,
    },

    'scroller.pullup': {
        sample: 'iOS',
        cssClass: 'SameLine',
        text: '加载中...',
        background: 'none',
        color: '#000',
        height: 26,
        width: '100%',
        top: 'initial',
        right: 'initial',
        left: 0,
        bottom: 0,
        'font-size': 15,
        'margin-top': 0,
        'border-radius': 0,
    },

    

});



/**
*
*/
define('Loading/Sample', function (require, module, exports) {
    
    var name$sample = {};


    function get(name) {
        var sample = name$sample[name];
        if (sample) {
            return sample;
        }

        sample = require(module, name);
        name$sample[name] = sample;
        return sample;
    }



    return {
        get: get,
    };


});



/**
* 
*/
define('Loading/Style', function (require, module, exports) {
    var $ = require('$');
    var Style = require('Style');
    

    function getMargin(v) {

        var type = typeof v;

        if (type == 'number') {
            return (0 - v / 2) + 'px';
        }

        if (type == 'string' && v.slice(-2) == 'px') {
            v = parseInt(v);
            return (0 - v / 2) + 'px';
        }

        return '0px';
    }



    function get(item0, item1, itemN) {

        var list = [].slice.call(arguments);

        var style = Style.filter(list, [
            'background',
            'border-radius',
            'bottom',
            'color',
            'font-size',
            'height',
            'left',
            'margin-top',
            'right',
            'top',
            'width',
            'z-index',
            'position',
        ]);

        ////优先使用 bottom 而非 top
        //if (style['bottom'] != 'initial') {
        //    style['top'] = 'initial';
        //}

        ////优先使用 right 而非 left
        //if (style['right'] != 'initial') {
        //    style['left'] = 'initial';
        //}

        //根据宽度计算 margin-left，使用居中
        style['margin-left'] = getMargin(style.width);

        if (style['margin-top'] === undefined) { //未指定
            style['margin-top'] = getMargin(style.height);
        }




        return style;


    }


    return {
        get: get,
    };


});



/**
* 遮罩层
* @class
* @name Mask
*/
define('Mask', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');
    
    var Config = require('Config');
    var RandomId = require('RandomId');

    var Sample = module.require('Sample');
    var Style = module.require('Style');


    var mapper = new Mapper();


    /**
    * 构造器。
    * @constructor
    */
    function Mask(config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var prefix = config.prefix;
        var suffix = config.suffix;

        var emitter = new Emitter(this);

        var meta = {
            'id': RandomId.get(prefix, suffix),

            'div': null,
            'sample': Sample,
            'volatile': config.volatile,
            'emitter': emitter,
            'hasBind': false, //是否已绑定事件
            'style': Style.get(config),
            'showTime': 0, //开始显示时的时间点
            'container': config.container,
            'duration': config.duration,
            'append': config.append,
        };

        mapper.set(this, meta);

    }


    Mask.prototype = /**@lends Mask#*/ {
        constructor: Mask,

        /**
        * $(container) 的快捷方式。
        */
        $: null,

        /**
        * 渲染本组件。
        * 该方法会创建 DOM 节点，并且绑定事件，但没有调用 show()。
        */
        render: function () {

            var meta = mapper.get(this);

            var div = meta.div;
            if (div) {
                return div;
            }

            var id = meta.id;
            var sample = meta.sample;
            var html = $.String.format(sample, {
                'id': id,
            });


            var container = meta.container;
            if (meta.append) {
                $(container).append(html);
            }
            else {
                $(container).prepend(html);

            }

            div = meta.div = document.getElementById(id);

            //暴露一个 jQuery 对象给外面使用。 但为了安全起见，内部不使用这个对象。
            this.$ = $(div);

            var style = Style.get(meta.style);
            $(div).css(style);

            $(div).on('click', function () {
                meta.emitter.fire('click');
            });


            if (!meta.hasBind) {
                meta.hasBind = true;

                if (meta.volatile) { //指定了易消失，即点击 mask 层就隐藏

                    var self = this;

                    $(div).on('click', function () {
                        self.hide();

                        //先备份原来的 opacity
                        var opacity = $(div).css('opacity');

                        //显示一个完全透明的层 200ms，防止点透
                        self.show({ opacity: 0});

                        setTimeout(function () {
                            $(div).css('opacity', opacity).hide();
                        }, 200);
                    });
                }
            }

            return div;

        },

        /**
        * 显示遮罩层。
        */
        show: function (config) {

            if (typeof config == 'number') { //重载 show(duration);
                config = { 'duration': config, };
            }


            var meta = mapper.get(this);
            var emitter = meta.emitter;

            this.render();

            var div = $(meta.div);

            if (config) {
                var style = Style.get(meta.style, config);
                div.css(style);
            }

            meta.showTime = new Date(); //记录开始显示的时间点
            div.show();


            emitter.fire('show');


            var duration = config && ('duration' in config) ?
                    config.duration :
                    meta.duration;

            if (duration) {
                var self = this;

                setTimeout(function () {
                    self.hide();
                }, duration);
            }

        },

        /**
        * 隐藏遮罩层。
        * @param {number} [lastTime] 需要持续显示的时间。
        */
        hide: function (lastTime) {
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }

            if (!lastTime) {
                hide();
                return;
            }


            var now = new Date();
            var showTime = meta.showTime;

            var useTime = now - showTime;
            var leftTime = lastTime - useTime;

            if (leftTime > 0) {
                setTimeout(hide, leftTime);
            }



            function hide() {
                meta.showTime = 0;
                $(div).hide();
                meta.emitter.fire('hide');
            }

        },

        /**
        * 移除遮罩层。
        */
        remove: function () {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }

            //reset
            meta.div = null;
            meta.hasBind = false;

            $(div).off();

            div.parentNode.removeChild(div);
            meta.emitter.fire('remove');

        },

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
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            this.remove();
            emitter.destroy();

            mapper.remove(this);
        },

    };


    //静态方法
    $.Object.extend(Mask, /**@lends Mask*/{

        filter: function (defaults, config) {

            if (typeof defaults == 'number') { //透明度
                defaults = { 'opacity': defaults };
            }

            if (typeof config == 'number') { //透明度
                config = { 'opacity': config };
            }


            var type = typeof defaults;

            if (type == 'object' && typeof config == 'object') {
                return $.Object.extend({}, defaults, config);
            }

            //禁用 mask
            if (config === false) {
                return null;
            }

            //显式指定使用 mask，如果 defaults 没有，则显式分配一个
            if (config === true) {
                return !defaults || type != 'object' ? {} : defaults;
            }


            //未指定，则使用默认配置指定的，有或没有
            if (config === undefined) {
                return type == 'object' ? defaults :
                    defaults ? {} : null;
            }

            return typeof config == 'object' ? config :
                config ? {} : null;
        },

    });

    return Mask;

});


/*
* Mask/Sample
* 由 grunt 生成，来源: ui/dialog/Mask/Sample.html
*/
define('Mask/Sample', [
    '<div id="{id}" class="KISP Mask" style="display: none;"></div>',
].join('\n'));


/**
*
*/
define('Mask/Style', function (require, module, exports) {
    var $ = require('$');
    var Style = require('Style');
    

    function getMargin(v) {

        var type = typeof v;

        if (type == 'number') {
            return (0 - v / 2) + 'px';
        }

        if (type == 'string' && v.slice(-2) == 'px') {
            v = parseInt(v);
            return (0 - v / 2) + 'px';
        }

        return '0px';
    }



    function get(item0, item1, itemN) {

        var list = [].slice.call(arguments);

        var style = Style.filter(list, [
            'opacity',
            'top',
            'bottom',
            'background',
            'z-index',
            'position',
        ]);


        return style;

    }


    return {
        get: get,
    };


});



/**
* 简易信息提示组件
* @class
* @name Toast
*/
define('Toast', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var RandomId = require('RandomId');

    //子模块
    var Renderer = module.require('Renderer');
    var Sample = module.require('Sample');
    var Style = module.require('Style');

    var mapper = new Mapper();



    /**
    * 构造器。
    * @constructor
    */
    function Toast(config) {

        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var emitter = new Emitter(this);

        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }

        var text = config.text;
        if (!text && text !== 0) { // 0 除外
            cssClass += ' NoText'; //注意，前面要有个空格
        }
        else {
            cssClass += ' HasText';
        }

        var icon = config.icon;
        cssClass += icon ? ' HasIcon' : ' NoIcon';

        var prefix = config.prefix;
        var suffix = config.suffix;

        var meta = {

            'id': RandomId.get(prefix, suffix),
            'icon': icon,
            'iconId': RandomId.get(prefix, 'icon-', suffix),
            'textId': RandomId.get(prefix, 'text-', suffix),

            'div': null,
            'sample': Sample.get(config.sample), //加载相应的 HTML 模板
            'text': text,
            'emitter': emitter,
            'mask': config.mask,
            'masker': null, // Mask 的实例，重复使用
            'style': Style.get(config),
            'showTime': 0, //开始显示时的时间点
            'cssClass': cssClass,
            'duration': config.duration,
            'container': config.container,
            'append': config.append,
        };

        mapper.set(this, meta);

    }


    //实例方法
    Toast.prototype = /**@lends Toast#*/ {
        constructor: Toast,

        /**
        * 显示本组件。
        */
        show: function (text, config) {

            var type = typeof text;
            
            if (type == 'object') { //重载 show(config)
                config = text;
                text = config.text;
            }
            
            config = config || {};

            var meta = mapper.get(this);
            var div = meta.div;


            var style = Style.get(meta.style, config);

            if (!div) { //首次 render
                div = Renderer.render(meta, style);
            }


            $(div).css(style);

            var Mask = require('Mask');
            var mask = Mask.filter(meta.mask, config.mask);
            var masker = meta.masker;

            //指定了启用 mask 层
            if (mask) {
                if (!masker) {
                    masker = new Mask();
                    meta.masker = masker;
                }
                masker.show(mask);
            }
            else {
                if (masker) { //之前已经创建了，并且可能是显示的。
                    masker.hide();
                }
            }


            if (text !== undefined && text != meta.text) {
                $('#' + meta.textId).html(text);
                meta.text = text;
                $(div).removeClass('NoText').addClass('HasText');
            }


            if ('icon' in config) {
                var icon = config.icon;
                if (icon) {
                    $(div).removeClass('NoIcon').addClass('HasIcon');

                    if (icon != meta.icon) {
                        $('#' + meta.iconId).removeClass('fa-' + meta.icon).addClass('fa-' + icon);
                        meta.icon = icon;
                    }
                }
                else {
                    $(div).removeClass('HasIcon').addClass('NoIcon');
                }
            }


            meta.showTime = new Date(); //记录开始显示的时间点

            $(div).show();
            meta.emitter.fire('show');

            //优先使用参数中的，当不存在时，再使用 meta 的 
            var duration = 'duration' in config ? config.duration : meta.duration;

            if (duration) {
                var self = this;
                setTimeout(function () {
                    self.hide();
                }, duration);
            }
        },

        /**
        * 隐藏本组件。
        * @param {number} [lastTime] 需要持续显示的时间。
        */
        hide: function (lastTime) {
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }

            if (!lastTime) { //未指定要持续显示的时间，则立即隐藏
                hide();
                return;
            }

            var now = new Date();
            var showTime = meta.showTime;

            var useTime = now - showTime;       //已经显示的时间
            var leftTime = lastTime - useTime;  //剩余时间

            if (leftTime > 0) {
                setTimeout(hide, leftTime);
            }
            else { //立即隐藏
                hide();
            }

            //内部方法
            function hide() {
                var masker = meta.masker;
                if (masker) {
                    masker.hide();
                }
                meta.showTime = 0;
                $(div).hide();
                meta.emitter.fire('hide');
            }

        },

        /**
        * 移除本组件对应的 DOM 节点。
        */
        remove: function () {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }


            var masker = meta.masker;
            if (masker) {
                masker.remove();
            }

            //reset
            meta.div = null;
            meta.masker = null;
            meta.hasBind = false;

            $(div).off();

            document.body.removeChild(div);
            meta.emitter.fire('remove');

        },

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
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            this.remove();
            emitter.destroy();

            mapper.remove(this);
        },

    };

    return Toast;

});


/*
* Toast/Sample/font-awesome
* 由 grunt 生成，来源: ui/dialog/Toast/Sample/font-awesome.html
*/
define('Toast/Sample/font-awesome', [
    '<div id="{id}" class="KISP Toast-font-awesome {cssClass}">',
    '    <div>',
    '        <i id="{icon-id}" class="fa fa-{icon}"></i>',
    '    </div>',
    '    <span id="{text-id}" class="Text">{text}</span>',
    '</div>',
].join('\n'));


/**
*
*/
define('Toast/Renderer', function (require, module, exports) {

    var $ = require('$');


    function render(meta, style) {

        var Style = require('Style');


        var id = meta.id;
        var sample = meta.sample;


        var html = $.String.format(sample, {
            'id': id,
            'icon': meta.icon,
            'icon-id': meta.iconId,
            'text-id': meta.textId,
            'text': meta.text,
            'style': Style.stringify(style),
            'cssClass': meta.cssClass,
        });


        var container = meta.container;
        if (meta.append) {
            $(container).append(html);
        }
        else {
            $(container).prepend(html);
        }


        var div = document.getElementById(id);
        meta.div = div;

        return div;

    }

    return {

        render: render,
    };

});



/**
*
*/
define('Toast/Sample', function (require, module, exports) {
    
    var name$sample = {};


    function get(name) {
        var sample = name$sample[name];
        if (sample) {
            return sample;
        }

        sample = require(module, name);
        name$sample[name] = sample;
        return sample;
    }



    return {
        get: get,
    };


});



/**
* 
*/
define('Toast/Style', function (require, module, exports) {
    var $ = require('$');
    var Style = require('Style');
    

    function getMargin(v) {

        var type = typeof v;

        if (type == 'number') {
            return (0 - v / 2) + 'px';
        }

        if (type == 'string' && v.slice(-2) == 'px') {
            v = parseInt(v);
            return (0 - v / 2) + 'px';
        }

    }



    function get(item0, item1, itemN) {

        var list = [].slice.call(arguments);

        var style = Style.filter(list, [
            'background',
            'border-radius',
            'bottom',
            'color',
            'font-size',
            'height',
            'left',
            'margin-top',
            'right',
            'top',
            'width',
            'z-index',
            'position',
        ]);


        //根据宽度计算 margin-left 和 margin-top，使用居中

        var v = getMargin(style.width);
        if (v) {
            style['margin-left'] = v;
        }

        v = getMargin(style.height);
        if (v) {
            style['margin-top'] = v;
        }

        return style;


    }


    return {
        get: get,
    };


});



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
        * @param {Number} count 要后退的步数。 
            默认为 1，如果要一次性后退 n 步，请指定一个大于 0 的整型。
        */
        back: function (count) {

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

            var emitter = meta.emitter;
            emitter.fire('back', [current, target]);
            emitter.fire('change', [current, target]);

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


            statcks.splice(beginIndex, count);

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
            statcks.splice(beginIndex, count);

            meta.statcks = statcks.reverse(); //再反转回去

        },

        /**
        * 获取视图的总个数
        */
        count: function () {
            var meta = mapper.get(this);
            return meta.statcks.length;
        },



    };



    module.exports = Navigator;

});




/**
* 无数据提示面板控件。
* @class
* @name NoData
*/
define('NoData', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var IScroll = require('IScroll');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var RandomId = require('RandomId');
    var Config = require('Config');

    var Renderer = module.require('Renderer');
    var Sample = module.require('Sample');
    var Style = module.require('Style');

    var mapper = new Mapper();



    /**
    * 构造函数。
    */
    function NoData(container, config) {

        //重载 NoData(config)
        if ($.Object.isPlain(container)) {
            config = container;
        }
        else {
            config.container = container;
        }


        Mapper.setGuid(this);
        config = Config.clone(module.id, config);


        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }

        var prefix = config.prefix;
        var suffix = config.suffix;

        var meta = {
            'div': null,
            'top': config.top,
            'bottom': config.bottom,
            'icon': config.icon,
            'text': config.text,
            'emitter': new Emitter(this),
            'container': config.container,
            'append': config.append,

            'id': RandomId.get(prefix, suffix),
            'textId': RandomId.get(prefix, 'text-', suffix),
            'text': config.text,
            'cssClass': cssClass,
            'sample': Sample,
            'style': Style.get(config),
            'scrollable': config.scrollable,
            'pulldown': config.pulldown,
            'visible': false, //组件当前是否可见
        };

        mapper.set(this, meta);

    }


    //实例方法
    NoData.prototype = /**@lends NoData#*/ {
        constructor: NoData,

        show: function (text) {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) { //首次 render
                div = Renderer.render(meta, { 'text': text, });
            }
            else {
                $('#' + meta.textId).html(text || meta.text);
            }

            meta.visible = true;
            $(div).show();
            meta.emitter.fire('show');

        },

        hide: function () {

            var meta = mapper.get(this);
            var div = meta.div;

            if (!div) {
                return;
            }

            meta.visible = false;
            $(div).hide();
            meta.emitter.fire('hide');
        },

        toggle: function (needShow) {

            //重载 toggle( [] )，方便直接传入一个数据列表数组
            if (needShow instanceof Array) {
                needShow = needShow.length == 0;
            }

            var meta = mapper.get(this);
            var visible = meta.visible;

            if (arguments.length == 0) { //重载 toggle()
                if (visible) {
                    this.hide();
                }
                else {
                    this.show();
                }
            }
            else {
                if (visible && !needShow) {
                    this.hide();
                }
                else if(!visible && needShow) {
                    this.show();
                }
            }

        },


        /**
        * 监听事件。
        */
        on: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var scroller = meta.scroller;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);

        },


        /**
        * 销毁本实例对象。
        */
        destroy: function () {
            var meta = mapper.get(this);
            var scroller = meta.scroller;
            scroller.destroy();

            var emitter = meta.emitter;
            emitter.destroy();

            mapper.remove(this);
        },

        



    };


    return NoData;


});




/**
*
*/
define('NoData/Renderer', function (require, module, exports) {


    var $ = require('$');
    var Style = require('Style');


    function render(meta, data) {


        var id = meta.id;
        var sample = meta.sample;
        var style = meta.style;

        var text = data.text || meta.text;

        var html = $.String.format(sample, {
            'id': id,
            'text-id': meta.textId,
            'text': text,
            'style': Style.stringify(style),
            'cssClass': meta.cssClass,
        });

        var container = meta.container;

        if (meta.append) {
            $(container).append(html);
        }
        else {
            $(container).prepend(html);

        }


        var div = document.getElementById(id);
        meta.div = div;

        if (meta.scrollable) {

            var Scroller = require('Scroller');

            var scroller = new Scroller(div, {
                'top': meta.top,
                'bottom': meta.bottom,
            });

            var pulldown = meta.pulldown;
            if (pulldown) {
                scroller.pulldown(pulldown);
            }
        }

        return div;

    }


    return {

        render: render,
    };

});


/*
* NoData/Sample
* 由 grunt 生成，来源: ui/NoData/Sample.html
*/
define('NoData/Sample', [
    '<div id="{id}" class="KISP NoData {cssClass}" style="{style}">',
    '    <ul>',
    '        <li class="Icon"></li>',
    '        <li id="{text-id}" class="Text">{text}</li>',
    '    </ul>',
    '</div>',
    '',
    '',
].join('\n'));


/**
*/
define('NoData/Style', function (require, module, exports) {
    var $ = require('$');
    var Style = require('Style');
    




    function get(item0, item1, itemN) {

        var list = [].slice.call(arguments);

        var style = Style.filter(list, [
            'background',
            'bottom',
            'color',
            'font-size',
            'top',
            'z-index',
        ]);


        return style;

    }


    return {
        get: get,
    };


});



/**
* 虚拟的数字鱼键盘。
* @class
* @name NumberPad
*/
define('NumberPad', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');

    var Renderer = module.require('Renderer');
    var Sample = module.require('Sample');
    var Style = module.require('Style');

    var mapper = new Mapper();



    /**
    * 构造器。
    * @constructor
    */
    function NumberPad(config) {


        Mapper.setGuid(this);
        config = Config.clone(module.id, config);


        var cssClass = config.cssClass;
        if (cssClass instanceof Array) {
            cssClass = cssClass.join(' ');
        }


        var meta = {

            'emitter': new Emitter(this),
            'container': config.container,
            'append': config.append,
            
            'prefix': config.prefix,
            'suffix': config.suffix,

            'cssClass': cssClass,
            'sample': Sample,
            'style': Style.get(config),

            'visible': false,       //组件当前是否可见

            'headerId': '',         //第一个 ul 的 DOM 元素 id
            'textId': '',           //文字所对应的 DOM 元素 id
            'valueId': '',          //输入的数字所对应的 DOM 元素 id
            'footerId': '',         //最后一个 ul 的 DOM 元素 id

            'value': config.value,  //当前输入的值
            'oldValue': '',         //发生改变后，用来存放之前的值。

            'int': config.int,
            'decimal': config.decimal,
            'mask': config.mask,
            'masker': null,     //Mask实例
            'volatile': config.volatile,

            'text': config.text,
            'height': 0, //会动态计算
            'speed': config.speed,  //动画速度
        };

        mapper.set(this, meta);

    }


    //实例方法
    NumberPad.prototype = /**@lends NumberPad#*/ {
        constructor: NumberPad,

        /**
        * 显示本组件。
        */
        show: function () {

            var meta = mapper.get(this);
            if (meta.visible) {
                return;
            }


            var div = meta.div;
            if (!div) { //首次 render
                div = Renderer.render(meta, this);
            }
           
            var masker = meta.masker;
            if (masker) {
                masker.show();
            }


            $(div).show().animate({
                'bottom': 0,

            }, meta.speed, function () {
               
                meta.visible = true;
                meta.emitter.fire('show');
            });

        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            
            var meta = mapper.get(this);
            var div = meta.div;

            if (!div || !meta.visible) {
                return;
            }
          
            var masker = meta.masker;
            if (masker) {
                masker.hide();
            }
            
            $(div).animate({
                'bottom': -meta.height,

            }, meta.speed, function () {

                $(div).hide(); //隐藏一下，避免在手机端给输入法顶上去。

                meta.visible = false;
                meta.emitter.fire('hide');
            });

        },

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
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            this.remove();
            emitter.destroy();

            mapper.remove(this);
        },

        /**
        * 获取或设置当前输入的值。
        * @param {string} [value] 如果指定此参数，则设置当前控件的输入值为指定的值。
        * @return {string} 如果是获取操作，则返回当前控件的值。
        */
        value: function (value) {
            var meta = mapper.get(this);

            //重载 getValue()
            if (arguments.length == 0) {
                return meta.value;
            }

            //重载 setValue(value)
            value = String(value);
            var v = Number(value);

            if (isNaN(v)) {
                throw new Error('要设置的值必须为合法的数值');
            }

            var a = value.split('.');
            var int = a[0];
            var decimal = a[1] || '';

            //截取长度
            int = int.slice(0, meta.int);
            decimal = decimal.slice(0, meta.decimal);
            
            value = int;

            if (decimal) {
                value = value + '.' + decimal;
            }

            meta.value = value;
            $('#' + meta.valueId).html(value);
        },

        /**
        * 设置指定的属性。
        * @param {string} key 要设置的属性的名称。 可取的值有:
            'value': 相当于 this.value(value)。
            'text': 设置显示的提示文本。
            'int': 设置整数部分允许的长度，会导致值重新设置。
            'decimal': 设置小数部分允许的长度，会导致值重新设置。
        * @param {string|number} 要设置的值。
        */
        set: function (key, value) {
            
            var meta = mapper.get(this);

            if (value == meta[key]) { //没有发生变化
                return;
            }

            switch (key) {

                case 'value':
                    this.value(value);
                    return;

                case 'text':
                    meta.text = value;
                    $('#' + meta.textId).html(value);
                    $('#' + meta.headerId).toggleClass('has-text', !!value);
                    return;

                case 'decimal':
                    meta.decimal = value;
                    $('#' + meta.footerId).toggleClass('no-point', value == 0);
                    this.value(meta.value); //长度发生了变化，需要重新设置值
                    return;

                case 'int':
                    meta.int = value;
                    this.value(meta.value); //长度发生了变化，需要重新设置值
                    return;

                default:
                    throw new Error('不支持参数 key: ' + key);

            }
        },

    };

    return NumberPad;

});



/**
*
*/
define('NumberPad/Renderer', function (require, module, exports) {


    var $ = require('jquery-plugin/touch');
    var Style = require('Style');
    var RandomId = require('RandomId');


    function render(meta, self) {

        var sample = meta.sample;
        var prefix = meta.prefix;
        var suffix = meta.suffix;

        var id = RandomId.get(prefix, suffix);
        var textId = RandomId.get('text-', suffix);
        var valueId = RandomId.get('value-', suffix);
        var headerId = RandomId.get('ul-header-', suffix);
        var footerId = RandomId.get('ul-footer-', suffix);

        var text = meta.text;


        var html = $.String.format(sample, {
            'id': id,

            'header-id': headerId,
            'text-id': textId,
            'value-id': valueId,
            'footer-id': footerId,

            'style': Style.stringify(meta.style),
            'cssClass': meta.cssClass,

            'text': text,
            'has-text': text ? 'has-text' : '',
            'no-point': meta.decimal > 0 ? '' : 'no-point',
            'value': meta.value,
        });

        var container = meta.container;

        if (meta.append) {
            $(container).append(html);
        }
        else {
            $(container).prepend(html);
        }

        var div = document.getElementById(id);


        $.Object.extend(meta, {
            'div': div,
            'textId': textId,
            'valueId': valueId,
            'headerId': headerId,
            'footerId': footerId,
        });


        var $div = $(div);
        var height = $div.height();
        meta.height = height;

        $div.css('bottom', -height);


        var Mask = require('Mask');
        var mask = Mask.filter(meta.mask);
        
        if (mask) { //指定了启用 mask 层
            meta.masker = new Mask(mask);
        }
       

        bindEvents(meta, self);
        

        return div;

    }





    function bindEvents(meta, self) {

        var div = meta.div;
        var emitter = meta.emitter;

        var txt = document.getElementById(meta.valueId);


        if (meta.volatile) {
            meta.masker.on('click', function () {
                self.hide();
            });
        }

        function set(value) {

            meta.oldValue = meta.value;
            meta.value = txt.innerHTML = value;
        }



        $(div).touch({

            '[data-cmd="done"]': function () {
                emitter.fire('done', [meta.value]);
                self.hide(); //最后才隐藏比较合理。 因为用户可能在隐藏事件里做些清除操作
            },


            '[data-cmd="back"]': function () {

                var value = meta.value;
                value = value.slice(0, -1);

                set(value);
                emitter.fire('back', [meta.value, meta.oldValue]);
            },


            '[data-key]': function () {

                var span = this;
                var key = span.getAttribute('data-key');
                var value = meta.value;

                emitter.fire('key', key, [meta.value]);
                emitter.fire('key', [key, meta.value]);


                var hasPoint = value.indexOf('.') >= 0;

                if (key == '.') {
                    if (hasPoint) {
                        return;
                    }

                    if (!value) {
                        value = '0';
                    }
                }


                value = value + key;

                var parts = value.split('.');

                if (parts[0].length > meta.int) { //整数位超过长度限制
                    emitter.fire('overflow', 'int', [meta.value]);
                    emitter.fire('overflow', [meta.value]);
                    return;
                }


                if (hasPoint && parts[1].length > meta.decimal) { //小数位超过长度限制
                    emitter.fire('overflow', 'decimal', [meta.value]);
                    emitter.fire('overflow', [meta.value]);
                    return;
                }


                set(value);


            },

        }, 'pressed');
    }



    return {

        render: render,
    };

});


/*
* NumberPad/Sample
* 由 grunt 生成，来源: ui/NumberPad/Sample.html
*/
define('NumberPad/Sample', [
    '',
    '<div id="{id}" class="KISP NumberPad {cssClass}" style="{style}">',
    '    <ul id="{header-id}" class="header {has-text}">',
    '        <li id="{text-id}" class="text">{text}</li>',
    '        <li id="{value-id}" class="value">{value}</li>',
    '        <li class="ok">',
    '            <span data-cmd="done">完成</span>',
    '        </li>',
    '    </ul>',
    '    <div class="main">',
    '        <ul>',
    '            <li><span data-key="1">1</span></li>',
    '            <li><span data-key="2">2</span></li>',
    '            <li><span data-key="3">3</span></li>',
    '        </ul>',
    '        <ul>',
    '            <li><span data-key="4">4</span></li>',
    '            <li><span data-key="5">5</span></li>',
    '            <li><span data-key="6">6</span></li>',
    '        </ul>',
    '        <ul>',
    '            <li><span data-key="7">7</span></li>',
    '            <li><span data-key="8">8</span></li>',
    '            <li><span data-key="9">9</span></li>',
    '        </ul>',
    '        <ul id="{footer-id}" class="special {no-point}">',
    '            <li class="key-point"><span data-key=".">.</span></li>',
    '            <li><span data-key="0" class="zero">0</span></li>',
    '            <li><span data-cmd="back" class="icon-back"></span></li>',
    '        </ul>',
    '    </div>',
    '</div>',
].join('\n'));


/**
*/
define('NumberPad/Style', function (require, module, exports) {
    var $ = require('$');
    var Style = require('Style');
    




    function get(item0, item1, itemN) {

        var list = [].slice.call(arguments);

        var style = Style.filter(list, [
            'background',
            'bottom',
            'color',
            'font-size',
            'top',
            'z-index',
        ]);


        return style;

    }


    return {
        get: get,
    };


});


/**
* 面板组件
* @class
* @name Panel
*/
define('Panel', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');

    var mapper = new Mapper();

    /**
    * 构造器。
    * @constructor
    */
    function Panel(container, config) {

        Mapper.setGuid(this);

        //重载 { el: container, ... }
        if ($.Object.isPlain(container)) {
            config = container;
            container = config['el'];
            delete config['el'];
        }

        config = Config.clone(module.id, config);


        var meta = {
            'emitter': new Emitter(this),
            'outerEmitter': new Emitter(), //供外部用的 emitter

            'container': container,
            'rendered': false,
            'showAfterRender': config.showAfterRender,
            'cssClass': config.cssClass,
            'visible': false,
            'byRender': false, //记录 show 事件是否由 render() 触发的。
        };

        mapper.set(this, meta);

        //暴露一个 jQuery 对象给外面使用。 但为了安全起见，内部不使用这个对象。
        this.$ = $(container);

    }


    //实例方法
    Panel.prototype = /**@lends Panel#*/ {
        constructor: Panel,

        /**
        * $(container) 的快捷方式。
        */
        $: null,

        /**
        * 显示本组件。
        */
        show: function () {

            var meta = mapper.get(this);
            var container = meta.container;
            var emitter = meta.emitter;

            container = $(container);
            var args = [].slice.call(arguments);
            container.show.apply(container, args);

            meta.visible = true;

            var byRender = meta.byRender;
            meta.byRender = false; //重置

            emitter.fire('show', [byRender]);

        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            var meta = mapper.get(this);
            var container = meta.container;
            var emitter = meta.emitter;

            container = $(container);
            var args = [].slice.call(arguments);
            container.hide.apply(container, args);

            meta.visible = false;
            emitter.fire('hide');

        },

        /**
        * 切换显示或隐藏本组件。
        */
        toggle: function (needShow) {
            var meta = mapper.get(this);
            var visible = meta.visible;

            if (arguments.length == 0) { //重载 toggle()
                if (visible) {
                    this.hide();
                }
                else {
                    this.show();
                }
            }
            else {
                if (visible && !needShow) {
                    this.hide();
                }
                else if (!visible && needShow) {
                    this.show();
                }
            }
        },



        /**
        * 对本组件进行简单的模板填充。
        */
        fill: function (data, fn) {

            var Template = require('Template');

            var meta = mapper.get(this);
            var container = meta.container;
            var emitter = meta.emitter;

            Template.fill(container, data, fn);

            emitter.fire('fill', [data]);
        },


        /**
        * 渲染。
        */
        render: function () {

            var args = [].slice.call(arguments);

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var container = meta.container;
            var cssClass = meta.cssClass;

            var rendered = meta.rendered;
            if (!rendered) { //首次 render
                emitter.fire('init', args);
            }

            emitter.fire('before-render', args);
            $(container).addClass(cssClass);

            emitter.fire('render', args);
            meta.rendered = true;

            if (meta.showAfterRender) {
                meta.byRender = true;
                this.show();
            }

            emitter.fire('after-render', args);
        },

        /**
        * 刷新，会触发 refresh 事件。
        */
        refresh: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var args = [].slice.call(arguments);
            emitter.fire('refresh', args);

        },

        /**
        * 重置，会触发 reset 事件。
        */
        reset: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var args = [].slice.call(arguments);
            emitter.fire('reset', args);

        },

        /**
        * 获取一个状态，该状态表示本组件是否为显示状态。
        */
        visible: function () {
            var meta = mapper.get(this);
            return meta.visible;
        },

        /**
        * 获取一个状态，该状态表示本组件是否已渲染过。
        */
        rendered: function () {
            var meta = mapper.get(this);
            return meta.rendered;
        },

    

        /**
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            emitter.destroy();
            mapper.remove(this);
        },

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
        * 触发外部的事件。
        */
        fire: function (name, args) {
            var meta = mapper.get(this);
            var outerEmitter = meta.outerEmitter;
            var args = [].slice.call(arguments, 0);
            outerEmitter.fire.apply(outerEmitter, args);
        },


        /**
        * 包装一个新对象，使其拥有当前实例的部分成员和新对象的成员。
        * @param {Object} [obj] 要需要包装的对象。 
            如果不指定，则只包装当前实例对象。
        * @return {Object} 返回一个由当前实例的部分成员和要包装对象的成员组成的新对象。
        * @example
            var panel = KISP.create('Panel');
            var obj = panel.wrap();
            obj.show();

            var obj1 = panel.wrap({ a: 100 });
            console.log(obj1.a);
        */
        wrap: function (obj) {

            var meta = mapper.get(this);
            var outerEmitter = meta.outerEmitter;

            var panel = {
                //重写 on，让事件绑定到外部的事件管理器上，而不是 this 内部使用的 emitter
                on: function () {
                    var args = [].slice.call(arguments, 0);
                    outerEmitter.on.apply(outerEmitter, args);
                },
            };


            for (var key in this) {

                //忽略的成员。
                if (key.slice(0, 1) == '_' ||
                    (/^(constructor|fire|on|wrap)$/g).test(key)) {
                    continue;
                }

                var value = this[key];

                //实例方法静态化
                if (typeof value == 'function') {
                    value = value.bind(this); 
                }

                panel[key] = value;
            }

            return obj ? $.Object.extend(panel, obj) : panel;
        },


    };

    return Panel;

});



/**
* 监听下拉或上拉动作。
*/
define('Scroller/pull', function (require, module,  exports) {

    var $ = require('$');


    return function (meta) {

        //state 采用 3 bit 来表示 2-1-0，最多只有一个位为 1， 因此有 000、001、010、100 四种情况。
        //即对应的值为 0、1、2、4，采用与操作即可判断第几位为 1，这样可提高 scroll 中函数的性能。
        var state = 0;

        var isUp = false;
        var name = 'pulldown';
        var min = 0;
        var max = 0;

        var emitter = meta.emitter;
        var scroller = meta.scroller;

        scroller.on('scrollStart', function () {
            state = 0;

            var directionY = this.directionY;
            var distY = this.distY;

            //当 directionY 为 0 时，判断 distY; 
            //否则直接判断 directionY，1: 下拉;  -1: 下拉
            isUp = directionY == 0 ? distY < 0 : directionY > 0;

            name = isUp ? 'pullup' : 'pulldown';
            this.isWaitingForManualReset = false;

            //根据拉动的方向，重新设置正确的环境变量
            if (isUp) {
                // 上拉时 maxScrollY 可能发生了变化，比如上拉加载更多，
                // 填充了更多的数据，需要重新计算
                var maxScrollY = scroller.maxScrollY; //负值
                var pullup = meta.pullup;
                min = pullup.min - maxScrollY; //正值
                max = pullup.max - maxScrollY; //正值
            }
            else {
                var pulldown = meta.pulldown;
                min = pulldown.min; //正值
                max = pulldown.max; //正值
            }
            
        });


        //该事件会给频繁触发，要注意性能控制
        scroller.on('scroll', function () {

            var y = this.y;

            if (isUp) {
                y = -y; //取成正值，容易理解
            }

            if (y < min) {  //( , min)
                if ((state & 1) == 0) {     // xx0
                    state = 1;              // 001
                    emitter.fire(name, 'start');
                }
            }
            else if (min <= y && y < max) { //[min, max]
                if ((state & 2) == 0) {     // x0x
                    state = 2;              // 010
                    emitter.fire(name, 'enter');
                }
            }
            else if (y >= max) { // [max, )
                if ((state & 4) == 0) {     // 0xx
                    state = 4;              // 100
                    emitter.fire(name, 'reach');
                }
            }
        });

        scroller.on('beforeScrollEnd', function () {

            if ((state & 4) == 4) { // 1xx
                this.isWaitingForManualReset = true;
                emitter.fire(name, 'release');
            }
            else {
                emitter.fire(name, 'start');
            }
        });

    };


});




/**
* 移动端滚动器。
* 对 iScroll 组件的进一步封装。
* @class
* @name Scroller
*/
define('Scroller', function (require, module,  exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var IScroll = require('IScroll');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');
    var Style = require('Style');

    var mapper = new Mapper();


    //阻止原生的 touchmove 事件
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);


    /**
    * 滚动器构造函数。
    */
    function Scroller(el, config) {

        //重载 Scroller(config)
        if ($.Object.isPlain(el)) {
            config = el;
            el = config.el;
        }


        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        //过滤出 iScroll 的所用到的字段
        var obj = $.Object.filter(config, [
            'scrollbars',
            'shrinkScrollbars',
            'preventDefault',
            'probeType',
        ]);
        
        var scroller = new IScroll(el, obj);


        var style = Style.filter(config, [
            'top',
            'left',
            'right',
            'bottom',
            'width',
        ]);

        $(el).addClass('KISP Scroller').css(style);


        var emitter = new Emitter(this);

        //jQuery 包装后的滚动条的数组。
        var indicators = scroller.indicators || [];

        indicators = $.Array.keep(indicators, function (item, index) {
            item = $(item.indicator);
            item.hide();
            return item;
        });


        var meta = {
            'emitter': emitter,
            'scroller': scroller,
            'enabled': config.enabled,
            'indicators': indicators,
            'pulldown': {},
            'pullup': {},
            'hasBindPull': false, //是否已绑定 pull 中要用到的事件
            'el': el,

        };

        mapper.set(this, meta);

        
        //判断是否有滚动条。
        function hasScrollBar() {
            var hasX = scroller.hasHorizontalScroll;
            var hasY = scroller.hasVerticalScroll;
            var len = indicators.length;

            return (len == 1 && (hasX || hasY)) ||
                (len == 2 && (hasX && hasY));
        }


        scroller.on('scroll', function () {
            if (!this.hasVerticalScroll) {
                this._translate(0, (this.distY * 0.5) >> 0);
            }
        });

        var timeoutId = null;
        var isScrolling = false;

        //按下并开始滚动时触发
        scroller.on('scrollStart', function () {
            isScrolling = true;
            clearTimeout(timeoutId);
            if (!hasScrollBar()) {
                return;
            }

            $.Array.each(indicators, function (item, index) {
                item.css('opacity', 1); // for zepto
                item.show();
            });
        });

        scroller.on('scrollEnd', function () {
            isScrolling = false;

            //当第一个 scrollEnd 中的 fadeOut 还没执行完就又开始第二个 beforeScrollStart 时，
            //就会有时间先后的竞争关系。 这会导致第二个 beforeScrollStart 中的 show 失效
            timeoutId = setTimeout(function () {
                if (!hasScrollBar()) {
                    return;
                }

                $.Array.each(indicators, function (item, index) {
                    //在 zepto 中没有 fadeOut 方法，因此是补充实现的
                    item.fadeOut('fast', function () {
                        if (isScrolling) {
                            item.css('opacity', 1); // for zepto
                            item.show();
                        }
                    });
                });
            }, 100);
        });



        if (!config.enabled) {
            this.disable();
        }
    }


    //实例方法
    Scroller.prototype = /**@lends Scroller#*/ {
        constructor: Scroller,

        /**
        * 监听事件。
        */
        on: function (name, fn) {

            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var scroller = meta.scroller;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);

        },

        /**
        * 刷新。
        */
        refresh: function (delay) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;
            var indicators = meta.indicators;
            var args = [].slice.call(arguments, 1);

            var Fn = require('Fn');

            Fn.delay(delay, function () {
                scroller.refresh.apply(scroller, args);

                //隐藏全部滚动条
                $.Array.each(indicators, function (item, index) {
                    item.hide();
                });
            });
            

        },

        /**
        * 重置。
        */
        reset: function () {
            var meta = mapper.get(this);
            var scroller = meta.scroller;
            scroller.isWaitingForManualReset = false;
            scroller.resetPosition(scroller.options.bounceTime);
        },

        /**
        * 监控下拉动作。
        * @param {number} min 开始时的 y 值。
        * @param {number} max 结束时的 y 值。
        */
        pulldown: function (min, max) {
            var meta = mapper.get(this);
            meta.pulldown = {
                'min': min,
                'max': max,
            };

            if (!meta.hasBindPull) {
                var pull = module.require('pull');
                pull(meta);
                meta.hasBindPull = true;
            }

        },


        /**
        * 监控上拉动作。
        * @param {number} min 开始时的 y 值。
        * @param {number} max 结束时的 y 值。
        */
        pullup: function (min, max) {

            var meta = mapper.get(this);

            meta.pullup = {
                'min': min,
                'max': max,
            };

            if (!meta.hasBindPull) {
                var pull = module.require('pull');
                pull(meta);
                meta.hasBindPull = true;
            }
        },

        /**
        * 滚动到距离顶部的指定位置。
        * @param {number} y 相对于顶部的距离。
        */
        to: function (y) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;
            var options = scroller.options;

            scroller.scrollTo(0, y, options.bounceTime, options.bounceEasing);
        },

        /**
        * 滚动到距离底部的指定位置。
        * @param {number} y 相对于底部的距离。
        */
        toBottom: function (y) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;
            var options = scroller.options;
            var maxScrollY = scroller.maxScrollY;

            y = maxScrollY - y;

            scroller.scrollTo(0, y, options.bounceTime, options.bounceEasing);
        },

        /**
        * 启用本组件。
        */
        enable: function () {
            var meta = mapper.get(this);
            meta.enabled = true;

            var scroller = meta.scroller;
            scroller.enable();
        },

        /**
        * 禁用本组件。
        */
        disable: function () {
            var meta = mapper.get(this);
            meta.enabled = false;

            var scroller = meta.scroller;
            scroller.disable();
        },

        /**
        * 切换启用或禁用。
        * @param {boolean} [needEnabled] 显示指定是否启用。 
            如果不指定则根据组件的当前状态进行切换。
        */
        toggleEnable: function (needEnabled) {
            var meta = mapper.get(this);
            var enabled = meta.enabled;

            if (arguments.length == 0) { //重载 toggleEnable()

                if (enabled) {
                    this.disable();
                }
                else {
                    this.enable();
                }

            }
            else { //toggleEnable(needEnabled)

                if (enabled && !needEnabled) {
                    this.disable();
                }
                else if (!enabled && needEnabled) {
                    this.enable();
                }
            }
        },


        /**
        * 销毁本实例对象。
        */
        destroy: function () {
            var meta = mapper.get(this);

            var scroller = meta.scroller;
            scroller.destroy();

            var emitter = meta.emitter;
            emitter.destroy();

            mapper.remove(this);
        },

        /**
        * 获取原生 scroller 实例的属性值。
        * @param {string} key 要获取的属性名称。
        * @return 返回原生 scroller 实例指定的属性值。
        */
        get: function (key) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;

            return scroller[key];
        },

        /**
        * 调用原生 scroller 实例的方法(call 方式)。
        * @param {string} name 要调用的方法名称。
        * @param arg0 要传递的第一个参数。
        * @param arg1 要传递的第二个参数。
        */
        invoke: function (name, arg0, arg1) {

            var meta = mapper.get(this);
            var scroller = meta.scroller;
            var args = [].slice.call(arguments, 1);

            return scroller[name].apply(scroller, args);
        },


    };


    return Scroller;


});




/**
* 页签列表控件
* @class
* @name Tabs
*/
define('Tabs', function (require, module, exports) {
    var $ = require('$');
    var MiniQuery = require('MiniQuery');

    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');
    
    var Config = require('Config');
    var RandomId = require('RandomId');

    //子模块
    var Helper = module.require('Helper');

    var mapper = new Mapper();


    /**
    * 构造器。
    * @constructor
    */
    function Tabs(container, config) {

        Mapper.setGuid(this);

        //重载 Tabs(config)
        if ($.Object.isPlain(container)) {
            config = container;
            container = config.container;
        }

        config = Config.clone(module.id, config);

        var meta = {
            'emitter': new Emitter(this),
            'container': container, 

            'activedIndex': -1,
            'activedNode': null, 
            'activedClass': config.activedClass,
            'pressedClass': config.pressedClass,
            'repeated': config.repeated,

            'eventName': config.eventName,
            'list': [],
            'indexKey': config.field['index'],
            'eventKey': config.field['event'],
            'nodes': null,
            'selector': config.selector,
            'change': null, //内部记录绑定的 change 事件处理函数，用于可解除绑定
            'old': null,
        };

        mapper.set(this, meta);


        var list = config.list;
        if (list) {
            this.render(list);
        }

        var current = config.current;
        if (typeof current == 'number') {
            this.active(current);
        }

        var change = config.change;
        if (change) {
            this.on('change', change);
        }

    }




    Tabs.prototype = /**@lends Tabs#*/ {
        constructor: Tabs,

        render: function (list, fn) {

            var meta = mapper.get(this);
            var container = meta.container;

            if (list) {
                var Template = require('Template');
                Template.fill(container, list, fn);
                meta.list = list;

                //数据发生了变化
                meta.nodes = null; 
                meta.activedNode = null;
                meta.activedIndex = -1;
            }


            if (!meta.change) { //首次绑定事件

                var eventName = meta.eventName;
                var selector = meta.selector;
                var pressedClass = meta.pressedClass;

                var self = this;

                var change = meta.change = function (event) {
                    var index = Helper.getIndex(meta, this);
                    self.active(index);
                };

                if (eventName == 'touch') { //特殊处理
                    var $ = require('jquery-plugin/touch');
                    $(container).touch(selector, change, pressedClass);
                }
                else {
                    var $ = require('$');
                    $(container).on(eventName, selector, change);
                }
            }


        },

        /**
        * 激活指定的项。
        * @param {number} index 要激活的项的索引值。
        * @param {boolean} [quiet=false] 是否使用安静模式。 
            当指定为 true 时，则不会触发事件，这在某种场景下会用到。
            否则会触发事件(默认情况)。
        */
        active: function (index, quiet) {

            var meta = mapper.get(this);
            var list = meta.list;

            //重载其他情况
            if (typeof index != 'number') {
                index = Helper.findIndex(list, index, arguments[1]);
            }

            var activedIndex = meta.activedIndex;
            var isSame = index == activedIndex;

            //当前项已激活，并且配置指定了不允许激活重复的项
            if (isSame && !meta.repeated) {
                return;
            }

           

            var activedNode = meta.activedNode;

            if (!isSame) { //激活的项跟上次的不一样

                activedIndex = meta.activedIndex = index;
                var activedClass = meta.activedClass;
                
                if (activedNode) { //上次已激活过
                    $(activedNode).removeClass(activedClass);
                }

                activedNode = meta.activedNode = Helper.getNode(meta, index);
                $(activedNode).addClass(activedClass);
            }

            
            var emitter = meta.emitter;
            var item = list[index];

            var current = {
                'item': item,
                'index': index,
                'element': activedNode,
                'event': event,
            };

            var old = meta.old;
            meta.old = current;


            if (quiet) { //显式指定了使用安静模式，则不触发事件。
                return;
            }


            var args = [item, index, current, old];

            emitter.fire('before-change', args);
            emitter.fire('change', index, args);

            //触发指定的事件名
            var eventKey = meta.eventKey;
            if (eventKey) {
                emitter.fire('change', String(item[eventKey]), args);
            }

            emitter.fire('change', args);


        },

        /**
        * 显示本组件。
        */
        show: function (config) {
            var meta = mapper.get(this);
            var container = meta.container;
            $(container).show();

        },

        /**
        * 隐藏本组件。
        * @param {number} [lastTime] 需要持续显示的时间。
        */
        hide: function (lastTime) {
            var meta = mapper.get(this);
            var container = meta.container;
            $(container).hide();

        },

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
        * 销毁本组件
        */
        destroy: function () {
            var meta = mapper.get(this);
            
            var emitter = meta.emitter;
            emitter.destroy();

            //移除 DOM 事件
            var container = meta.container;
            var eventName = meta.eventName;
            var selector = meta.selector;
            var change = meta.change;

            $(container).off(eventName, selector, change);

            mapper.remove(this);
        },

    };


    //静态方法
    $.Object.extend(Tabs, /**@lends Tabs*/{

        

    });

    return Tabs;

});



/**
*
*/
define('Tabs/Helper', function (require, module, exports) {

    var $ = require('$');
    



    
    function getNodes(meta) {

        //取得子节点列表
        var nodes = meta.nodes;
        if (!nodes) {
            nodes = meta.nodes = $(meta.container).find(meta.selector).toArray();
        }

        return nodes;

    }


    function getIndex(meta, node) {

        var key = meta.indexKey;
        var index = node.getAttribute(key);

        if (index) { //字符串的，不用担心 '0' 这样的情况
            return +index;
        }

        //没有指定 index，则迭代搜索
        var nodes = getNodes(meta);
        return $.Array.findIndex(nodes, function (item, index) {
            return item === node;
        });

    }

    function getNode(meta, index) {

        //取得子节点列表
        var nodes = getNodes(meta);
        return nodes[index];

    }


    function findIndex(list, key, value) {
        
        var type = typeof key;

        //findIndex(list, item)
        if (type == 'object') {
            return $.Array.findIndex(list, function (item, index) {
                return key === item;
            });
        }

        //findIndex(list, key, value)
        if (type == 'string') {
            return $.Array.findIndex(list, function (item, index) {
                return item[key] === value;
            });
        }

        //findIndex(list, fn)
        if (type == 'function') {
            return $.Array.findIndex(list, key);
        }
        
        throw new Error('无法识别的参数 key: ' + type);

    }


    return {
        getIndex: getIndex,
        getNode: getNode,
        findIndex: findIndex,

    };

});



/**
* 模板填充
* @class
* @name Template
*/
define('Template', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    
    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');

    var Multiple = module.require('Multiple');
    var Simple = module.require('Simple');
    var Static = module.require('Static');

    var mapper = new Mapper();
    
    

    function Template(container, config) {
        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var meta = {
            'container': container,
            'names': config.names,
            'list': config.list,
            'fn': config.fn,

            'outer': config.outer,
            'root': config.root,
            'item': config.item,

            
            'emitter': new Emitter(),
            'info': null,
            'sample': '',
        };

        mapper.set(this, meta);
    }


    Template.prototype = {
        constructor: Template,

        fill: function (list, fn) {
           
            if (typeof list == 'function') {  //重载 fill(fn)
                fn = list;
                list = null;
            }

            var meta = mapper.get(this);

            list = list || meta.list;
            fn = fn || meta.fn;
            

            var names = meta.names;

            var html = !names || !names.length ?
                    Simple.getHTML(meta, list, fn) :
                    Multiple.getHTML(meta, 0, list, fn);

            $(meta.container).html(html);

            meta.emitter.fire('fill');
        },

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);
        },

    };


    return $.Object.extend(Template, Static);

});


/**
*/
define('Template/Multiple', function (require, module, exports) {


    var $ = require('$');




    
    function getInfo(meta) {

        var names = meta.names;
        var len = meta.outer;
        var begin = meta.item.begin;
        var end = meta.item.end;

        var name$outer = {};

        var tags = $.Array.keep(names, function (name, index) {

            var outer = $.String.random(len);
            name$outer[name] = outer;

            var data = {
                'name': name,
            };

            var tag = {
                'name': name,
                'begin': $.String.format(begin, data),
                'end': $.String.format(end, data),
                'outer': '{' + outer + '}',
            };

            return tag;
        });

        tags = [{
            'name': $.String.random(),
            'begin': meta.root.begin,
            'end': meta.root.end,

        }].concat(tags);

        var container = meta.container;
        var html = $(container).html();
        var samples = $.String.getTemplates(html, tags);

        return {
            'name$outer': name$outer,
            'tags': tags,
            'samples': samples,
        };

    }


    function getHTML(meta, level, list, fn) {

        var info = meta.info = meta.info || getInfo(meta);

        var tags = info.tags;
        var samples = info.samples;
        var name$outer = info.name$outer;

        //内部方法，获取指定层级的 html
        function get(level, list, fn) {

            var tag = tags[level];
            var name = tag.name;
            var sample = samples[name];

            return $.Array.keep(list, function (item, index) {

                var obj = fn(item, index);
                var data = obj.data || {};

                var lv = level + 1;
                var tag = tags[lv];

                if (tag) {
                    var outer = name$outer[tag.name];

                    if (outer) {
                        data[outer] = get(lv, obj.list, obj.fn);
                    }
                }

                var html = $.String.format(sample, data);

                return html;

            }).join('');
        }

        return get(level, list, fn);

    }

    return {
        getHTML: getHTML,
    };


});


/**
*/
define('Template/Simple', function (require, module, exports) {


    var $ = require('$');



    
    function getSample(meta) {

        var container = meta.container;
        var root = meta.root;

        var html = $(container).html();
        var sample = $.String.between(html, root.begin, root.end);

        return sample;

    }


    function getHTML(meta, list, fn) {

        var sample = meta.sample = meta.sample || getSample(meta);

        var html;

        if (list instanceof Array) {
            html = $.Array.keep(list, function (item, index) {
                if (fn) {
                    item = fn(item, index);
                }

                return $.String.format(sample, item);

            }).join('');
        }
        else {
            html = $.String.format(sample, list);
        }

        $(meta.container).html(html);


    }

    return {
        getHTML: getHTML,
    };


});



define('Template/Static', function (require, module, exports) {

    var $ = require('$');
    var Config = require('Config');
    var format = $.String.format;

    //缓存已处理过的节点的模板，从而可以再次填充
    var id$sample = {};


    //用于保存在节点中的自定义属性的键名称，为避免冲突，后缀加个首次运行时就确定的随机串
    var idKey = 'data-template-id-' + $.String.random(4).toLowerCase();

    var defaults = Config.get(module.parent.id);


    /**
    * 对指定的 DOM 节点进行简单的模板填充。 
    * @param {DOMElement|string|Object} node DOM 节点或其 id，可以以 # 开始。
        如果指定一个 {} 的纯对象，则会迭代每个 key: value 并递归调用，这相当于批量操作。
    * @param {Object|Array} data 要填充的数据，数据中的字段名必须跟模板中要用到的一致。 
        如果是数组，则会迭代数组每项进行填充。
        如果是对象，则只填充一次。
    * @param {function} [fn] 迭代调用时的函数。
        当参数 data 为数组时，会进行迭代调用该函数 fn，fn 会接收到 item 和 index 作为参数，
        然后以 fn 的返回结果作为当前项的数据来进行填充。
    */
    function fill(node, data, fn) {

        //重载，批量填充 fill({ key: value }, fn);
        if ($.Object.isPlain(node)) { 
            fn = data; //修正参数位置。
            $.Object.each(node, function (key, value) {
                fill(key, value, fn);
            });
            return;
        }

        if (typeof node == 'string') { // node 是 id
            var id = node;
            if (id.indexOf('#') == 0) { //以 # 开始
                id = id.slice(1);
            }
            node = document.getElementById(id);
        }

        var sample = get(node);

        if (data instanceof Array) {
            node.innerHTML = $.Array.keep(data, function (item, index) {
                if (fn) {
                    item = fn(item, index);
                }
                return format(sample, item);
            }).join('');
        }
        else {
            node.innerHTML = format(sample, data);
        }

    }



    /**
    * 获取指定的 DOM 节点的模板。 
    * 该方法会对模板进行缓存，从而可以多次获取，即使该节点的 innerHTMl 已发生改变。
    * @param {DOMElement|string} node DOM 节点或基 id，可以以 # 开始。
    * @return {string} 返回该节点的模板字符串。
    */
    function get(node) {

        var id;

        if (typeof node == 'string') { // node 是 id
            id = node;
            if (id.indexOf('#') == 0) { //以 # 开始
                id = id.slice(1);
            }
            node = document.getElementById(id);
        }
        else { // node 是 DOM 节点
            id = node.id;
            if (!id) {
                id = node.getAttribute(idKey);
                if (!id) {
                    id = node.tagName.toLowerCase() + '-' + $.String.random();
                    node.setAttribute(idKey, id);
                }
            }
        }


        var sample = id$sample[id];

        if (!sample) { //首次获取
           
            var tag = defaults.root;
            sample = $.String.between(node.innerHTML, tag.begin, tag.end);
            id$sample[id] = sample;
        }

        return sample;
    }





    return  {
        fill: fill,
        get: get,
    };


});

/**
* 视图组件
* @class
* @name View
*/
define('View', function (require, module, exports) {


    var Config = require('Config');

    /**
    * 构造器。
    * @constructor
    */
    function View(container, config) {

        config = Config.clone(module.id, config);

        var Panel = require('Panel');
        var panel = new Panel(container, config);

        panel.$.addClass('KISP View');

        var background = config.background;
        if (background) {
            panel.$.css('background', background);
        }

        return panel;

    }


    return View;

});




define('jquery-plugin/touch', function (require, module,  exports) {

    var $ = require('$');


    function touch(selector, fn, cssClass) {

        //重载 touch( { }, cssClass) 批量的情况
        if ($.Object.isPlain(selector)) {

            var self = this;
            cssClass = fn;
            fn = null;

            $.Object.each(selector, function (key, fn) {
                touch.call(self, key, fn, cssClass);
            });

            return this;
        }

        var x = 0;
        var y = 0;


        //重载 touch(fn, cssClass)，
        //如 $(div).touch(fn, cssClass)
        if (typeof selector == 'function') {

            cssClass = fn;
            fn = selector;
            selector = null;

            return $(this).on({
                'touchstart': function (event) {

                    var t = event.originalEvent.changedTouches[0];
                    x = t.pageX;
                    y = t.pageY;

                    if (cssClass) {
                        $(this).addClass(cssClass);
                    }

                    event.preventDefault();
                },

                'touchend': function (event) {

                    if (cssClass) {
                        $(this).removeClass(cssClass);
                    }

                    var t = event.originalEvent.changedTouches[0];
                    var dx = t.pageX - x;
                    var dy = t.pageY - y;
                    var dd = Math.sqrt(dx * dx + dy * dy);

                    x = 0;
                    y = 0;

                    if (dd > 10) {
                        return;
                    }

                    var args = [].slice.call(arguments);
                    fn.apply(this, args);
                },
            });
        }



        //此时为 $(div).touch(selector, fn, cssClass)
        return $(this).delegate(selector, {

            'touchstart': function (event) {
                var t = event.originalEvent.changedTouches[0];
                x = t.pageX;
                y = t.pageY;


                if (cssClass) {
                    $(this).addClass(cssClass);
                }
                event.preventDefault();
            },

            'touchend': function (event) {

                if (cssClass) {
                    $(this).removeClass(cssClass);
                }

                var t = event.originalEvent.changedTouches[0];
                var dx = t.pageX - x;
                var dy = t.pageY - y;
                var dd = Math.sqrt(dx * dx + dy * dy);

                x = 0;
                y = 0;

                if (dd > 10) {
                    return;
                }

                var args = [].slice.call(arguments, 0);
                fn.apply(this, args);
            }
        });
    }


    //扩展 jQuery
    $.Object.extend($.fn, {
        touch: touch
    });


    return $;

});





/**
* API 模块的默认配置
* @name API.defaults
*/
define('API.defaults', /**@lends API.defaults*/ {
    /**
    * 成功的状态码。 
    * 只有状态码为该值是才表示成功，其它的均表示失败。
    */
    successCode: 200,

    /**
    * 字段映射。
    */
    field: {
        /**
        * 状态码。
        */
        code: 'code',
        /**
        * 消息。
        */
        msg: 'msg',
        /**
        * 主体数据。
        */
        data: 'data',
    },

    /**
    * 代理配置。
    */
    proxy: null,

    /**
    * 随机延迟时间，更真实模拟实际网络环境。
    * 可指定为 false，或如 { min: 500, max: 2000 } 的格式。
    */
    delay: false,

    /**
    * 在 url 中增加一个随机 key，以解决缓存问题。
    * 当指定为 false 时，则禁用。
    */
    random: true,

    /**
    * API 接口 Url 的主体部分，即 url 的 prefix 部分。
    */
    url: '',

    /**
    * API 接口 Url 的后缀部分。
    * 针对那些如 '.do'、'.aspx' 等有后缀名的接口比较实用。
    */
    ext: '',

    /**
    * 要发送的数据。 可选的。
    * 当发送方式为 get 时，该数据将会给序列化成查询字符串并附加到 url 查询参数中。
    * 当发送方式为 post 时，会用在表单中。
    */
    data: null,

    /**
    * 要发送的查询参数，仅当发送方式为 post 时有效 (可选的)。
    * 当发送方式为 post 时，该数据将会给序列化成查询字符串并附加到 url 查询参数中。
    */
    query: null,


    /**
    * 把请求时的 data 中的第一级子对象进行序列化的方法。
    * @param {string} key 要进行处理的子对象的键。
    * @param {Object} value 要进行处理的子对象的值对象。
    * @return {string} 返回该子对象序列化的字符串。
    */
    serialize: function (key, value) {
        var $ = require('$');
        var json = $.Object.toJson(value);
        return encodeURIComponent(json);
    },

});


/**
* Proxy 模块的默认配置
* @name Proxy.defaults
*/
define('Proxy.defaults', /**@lends Proxy.defaults*/ {
    /**
    * 加载代理响应文件的起始位置(或目录)。
    */
    base: '',

    /**
    * 为模拟真实网络环境而随机延迟的时间。
    * 格式为 { min: 500, max: 3000 }。
    * 当指定为 false 时，则禁用延迟。
    */
    delay: {
        /**
        * 随机延迟的最小毫秒数。
        */
        min: 500,
        /**
        * 随机延迟的最大毫秒数。
        */
        max: 3000
    },
});


/**
* SSH.API 模块的默认配置
* @name SSH.API.defaults
*/
define('SSH.API.defaults', /**@lends SSH.API.defaults*/ {
    
    //解析 SSH 返回的 json 中的字段

    /**
    * 成功的状态码。 
    * 只有状态码为该值是才表示成功，其它的均表示失败。
    */
    successCode: 200,

    /**
    * 字段映射。
    */
    field: {
        /**
        * 状态码。
        */
        code: 'Result',
        /**
        * 消息。
        */
        msg: 'ErrMsg',
        /**
        * 主体数据。
        */
        data: 'Data',
    },

    // SSH 需要用到的。
    //下面这些字段在使用时会优先级会高于 SSH 节点中的

    /**
    * 代理配置。
    */
    proxy: null,

    /**
    * 接口名称中的前缀部分。
    * 主要针对一个轻应用中有公共前缀部分的批量接口，设置了公共前缀部分，后续的调用只用后部分简短名称即可。
    */
    prefix: '',

    //必选的

    /**
    * 企业号。 必选。
    */
    eid: '',

    /**
    * openid。 必选。
    */
    openid: '',

    //可选的

    /**
    * appid。 可选的。
    */
    appid: '',

    /**
    * netid。 可选的。
    */
    netid: '',

    /**
    * pubacckey。 可选的。
    */
    pubacckey: '',

    /**
    * timestamp。 可选的。
    */
    timestamp: '',

    /**
    * nonce。 可选的。
    */
    nonce: '',

    /**
    * pubaccid。 可选的。
    */
    pubaccid: '',

    /**
    * 要发送的数据。 可选的。
    */
    data: null,

    /**
    * 当 http 协议层发送错误时的默认错误消息文本。
    */
    msg: '网络繁忙，请稍候再试',
});


/**
* SSH 模块的默认配置
* @name SSH.defaults
*/
define('SSH.defaults', /**@lends SSH.defaults*/ {

    /**
    * API 接口 Url 的后缀部分。
    * 针对那些如 '.do'、'.aspx' 等有后缀名的接口比较实用。
    * 这里固定为空字符串，业务层不需要关注该字段。
    */
    ext: '',

    /**
    * 成功的状态码。 
    * 只有状态码为该值是才表示成功，其它的均表示失败。
    */
    successCode: 200,

    /**
    * 字段映射。
    */
    field: {
        /**
        * 状态码。
        */
        code: 'Result',
        /**
        * 消息。
        */
        msg: 'ErrMsg',
        /**
        * 主体数据。
        */
        data: 'DataJson',
    },

    /**
    * 代理配置。
    */
    proxy: null,

    /**
    * 接口名称中的前缀部分。
    * 主要针对一个轻应用中有公共前缀部分的批量接口，设置了公共前缀部分，后续的调用只用后部分简短名称即可。
    */
    prefix: '',

    //必选的

    /**
    * 企业号。 必选。
    */
    eid: '',

    /**
    * openid。 必选。
    */
    openid: '',

    //可选的

    /**
    * appid。 可选的。
    */
    appid: '',

    /**
    * netid。 可选的。
    */
    netid: '',

    /**
    * pubacckey。 可选的。
    */
    pubacckey: '',

    /**
    * timestamp。 可选的。
    */
    timestamp: '',

    /**
    * nonce。 可选的。
    */
    nonce: '',

    /**
    * pubaccid。 可选的。
    */
    pubaccid: '',

    /**
    * 要发送的数据。 可选的。
    */
    data: null,

    /**
    * 是否用 console 把 CustData 打印出来。
    * 由于 CustData 给编码了成字符串，为了便于查看原始对象结构而打印到控制台。
    */
    console: true,

});


/**
* SSH/Server 模块的默认配置
* @name SSH/Server.defaults
*/
define('SSH/Server.defaults', /**@lends SSH/Server.defaults*/ {
    ext: '',
    successCode: 200,
    field: {
        code: 'Result',
        msg: 'ErrMsg',
        data: 'Data',
    },

    /**
    * 是否启用缓存。
    * 可取的值为 false|true|'session'|'local'
    */
    cache: 'session',
});


/**
* SSH/Server/Config 模块的默认配置
* @name SSH/Server/Config.defaults
*/
define('SSH/Server/Config.defaults', /**@lends SSH/Server/Config.defaults*/ {

    url: 'http://mob.cmcloud.cn/kisplus/kisplusconfig.aspx?callback=?',
    //cache: 'session', // false|'memory'|'session'|'local'
    /**
    * 是否启用缓存。
    * 可取的值为 false|true|'session'|'local'
    */
    cache: 'session',

    //默认使用服务器返回的(为 'http://kd.cmcloud.cn')。
    //如果指定了，则忽略服务器的。
    host: '',


});


/**
* LocalStorage 模块的默认配置
* @name LocalStorage.defaults
*/
define('LocalStorage.defaults', /**@lends LocalStorage.defaults*/ {
    /**
    * 应用的名称。
    * 设定后即可创建与获取在该名称下的本地存储，从而避免跟其它应用的冲突。
    */
    name: '',
});


/**
* Module 模块的默认配置
* @name Module.defaults
*/
define('Module.defaults', /**@lends Module.defaults*/ {
    seperator: '/',     //私有模块的分隔符
    crossover: false,   //不允许跨级调用
    repeated: false,    //不允许重复定义同名的模块
});


/**
* SessionStorage 模块的默认配置
* @name SessionStorage.defaults
*/
define('SessionStorage.defaults', /**@lends SessionStorage.defaults*/ {
    /**
    * 应用的名称。
    * 设定后即可创建与获取在该名称下的本地存储，从而避免跟其它应用的冲突。
    */
    name: '',
});


/**
* Url 模块的默认配置。
* 字符串中的 {~} 表示站头的根地址；{@} 表示使用的文件版本 debug 或 min。
* @name Url.defaults
*/
define('Url.defaults', /**@lends Url.defaults*/ {

    //注意：这里取当前页的路径作为根地址，只适用于当前页面在根目录的情况。
    root: location.origin + location.pathname.split('/').slice(0, -1).join('/') + '/',

    replacer: {
        root: '~',
        edition: '@'
    },

});


/**
* CloudHome.API 模块的默认配置
* @name CloudHome.API.defaults
*/
define('CloudHome.API.defaults', /**@lends CloudHome.API.defaults*/ {
    
    field: {
        success: 'success',
        code: 'errorCode',
        msg: 'error',
        data: 'data',
    },

    delay: false, //格式为 { min: 500, max: 2000 }
});


/**
* ImageReader 模块的默认配置
* @name ImageReader.defaults
*/
define('ImageReader.defaults', /**@lends ImageReader.defaults*/ {
    loading: '读取中...',
});


/**
* WeChat 模块的默认配置
* @name WeChat.defaults
*/
define('WeChat.defaults', /**@lends WeChat.defaults*/ {
    
    debug: false,
    appid: '',
    eid: '',

    'timestamp': parseInt(new Date().getTime() / 1000),
    'noncestr': Math.random().toString(36).slice(2),
    'url': window.location.href.split('#')[0],

    js: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',

    /**
    * 跳转到登录授权页的 url
    */
    login: {
        url: 'http://mob.cmcloud.cn/servercloud/weixin/kisapp',
        data: {
            focus: 0,
            type: 1,
            eid: '',
            from_url: '',
        },
    },

    apis: '*', //表示所有

    retryAfterExpired: true, //签名过期时需要重试
});


/**
* WeChat/Signature 模块的默认配置
* @name WeChat/Signature.defaults
*/
define('WeChat/Signature.defaults', /**@lends WeChat/Signature.defaults*/ {
    name: 'Jsapi_Signature',
    url: 'http://mob.cmcloud.cn/servercloud/weixin/',
});


/**
* Alert 模块的默认配置
* @name Alert.defaults
*/
define('Alert.defaults', /**@lends Alert.defaults*/ {
    'button': '确定',
    'volatile': false,
    'mask': true,
    'autoClosed': true,
    'width': '80%',
    'z-index': 99999,

});


/**
* App 模块的默认配置
* @name App.defaults
*/
define('App.defaults', /**@lends App.defaults*/ {
    mask: {
        opacity: 0,
        duration: 500,
        'z-index': 99999,
    },

    type: 'simple', //只做最基础的初始化，向后兼容

});


/**
* Dialog 模块的默认配置
* @name Dialog.defaults
*/
define('Dialog.defaults', /**@lends Dialog.defaults*/ {

    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-Dialog-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    /**
    * 是否启用 mask 层。
    */
    mask: true,

    /**
    * 内容区是否可滚动。
    */
    scrollable: true,

    /**
    * 针对滚动器的配置。
    */
    scroller: { },

    /**
    * 点击按钮后是否自动关闭组件。
    * 可取值为: true|false，默认为 true，即自动关闭。
    */
    autoClosed: true,

    /**
    * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
    * 可取值为: true|false，默认为不易消失。
    */
    volatile: false,

    /**
    * 组件的标题文本。
    */
    title: '',

    /**
    * 组件的内容文本。
    */
    text: '',

    /**
    * 组件的 css 样式 z-index 值。
    */
    'z-index': 1024,

    /**
    * 组件用到的 html 模板。
    * 默认为 'iOS'。 业务层不需要关注该字段。
    */
    sample: 'iOS',

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 点击按钮时需要用到的事件名。
    * 针对移动端的是虚拟事件 'touch'。
    */
    eventName: 'touch',

    /**
    * 组件宽度。
    * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
    */
    width: '80%',

    /**
    * 组件高度。
    * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
    */
    height: '50%',

    /**
    * 按钮数组。
    */
    buttons: [],


});


/**
* ImageViewer 模块的默认配置
* @name ImageViewer.defaults
*/
define('ImageViewer.defaults', /**@lends ImageViewer.defaults*/ {
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    border: 'none',
    'border-radius': 0,

    /**
    * 组件用到的 css 类名。
    */
    cssClass: 'main-fullscreen',

    /**
    * 点击时需要用到的事件名。
    * 针对移动端的是虚拟事件 'touch'。
    */
    eventName: 'touch',

    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-ImageViewer-',

    /**
    * 给 img 元素生成的 id 的随机后缀的长度。
    */
    suffix: 4,
    sample: '<img id="{id}" style="max-width: 100%; max-height: 100%;" src="{src}" />',

    /**
    * 针对滚动器的配置。
    */
    scroller: {
        scrollbars: false,  //隐藏滚动条
    },

});


/**
* Loading 模块的默认配置
* @name Loading.defaults
*/
define('Loading.defaults', /**@lends Loading.defaults*/ {
    
    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-Loading-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    /**
    * 加载中时要显示的文本。
    */
    text: '处理中...',

    /**
    * 是否启用 mask 层。
    */
    mask: false,

    /**
    * 组件用到的 html 模板。
    * 默认为 'iOS'。 业务层不需要关注该字段。
    */
    sample: 'iOS',

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 组件添加到的容器。
    * 默认为 document.body。
    */
    container: document.body,

    /**
    * 把组件添加到容器的方式，是否使用追加的方式。
    * 默认用 prepend 的方式。
    */
    append: false,

    //默认样式
    'background': 'rgba(0, 0, 0, 0.7)',
    'border-radius': 10,
    'bottom': 'initial',
    'color': '#fff',
    'font-size': '15px',
    'height': 102,
    'left': '50%',
    'right': 'initial',
    'top': '50%',
    'width': 120,

    /**
    * 组件的 css 样式 z-index 值。
    */
    'z-index': 1024,
});


/**
* Mask 模块的默认配置
* @name Mask.defaults
*/
define('Mask.defaults', /**@lends Mask.defaults*/ {
    
    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-Mask-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    /**
    * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
    * 可取值为: true|false|"hide"|"remove"，默认为 false，即不易消失。
    */
    volatile: false,

    /**
    * 组件添加到的容器。
    * 默认为 document.body。
    */
    container: document.body,

    /**
    * 把组件添加到容器的方式，是否使用追加的方式。
    * 默认用 prepend 的方式。
    */
    append: false,

    /**
    * 组件的 css 样式 z-index 值。
    */
    'top': 0,

    /**
    * 组件的 css 样式 bottom 值。
    */
    'bottom': 0,

    /**
    * 组件的 css 样式 opacity 值。
    */
    'opacity': 0.5,

    /**
    * 组件的 css 样式 background 值。
    */
    'background': '#000',

    /**
    * 组件的 css 样式 z-index 值。
    */
    'z-index': 1024,
});


/**
* NoData 模块的默认配置
* @name NoData.defaults
*/
define('NoData.defaults', /**@lends NoData.defaults*/ {
    
    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-NoData-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    text: '暂无数据',

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 组件添加到的容器。
    * 默认为 document.body。
    */
    container: document.body,

    /**
    * 把组件添加到容器的方式，是否使用追加的方式。
    * 默认用 prepend 的方式。
    */
    append: false,

    /**
    * 是否可滚动。
    * 当可滚动时，会创建相应的 scroller。
    */
    scrollable: true,

    pulldown: null,

    ////默认样式
    //'bottom': 0,
    //'top': 0,
    //'z-index': 1024,
});


/**
* NumberPad 模块的默认配置
* @name NumberPad.defaults
*/
define('NumberPad.defaults', /**@lends NumberPad.defaults*/ {
    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-NumberPad-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 组件添加到的容器。
    * 默认为 document.body。
    */
    container: document.body,

    /**
    * 把组件添加到容器的方式，是否使用追加的方式。
    * 默认用 prepend 的方式。
    */
    append: false,

    /**
    * 允许的最多小数位数。
    */
    decimal: 4, //允许的最多小数位数

    /**
    * 允许的最多整数位数。
    */
    int: 12,

    /**
    * mask 层的配置。
    * 当指定为一个小数时，则表示 mask 层的不透明度 opacity。
    */
    mask: 0.5,

    /**
    * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
    * 可取值为: true|false，默认为易消失。
    */
    volatile: true,

    /**
    * 显示的提示文本。
    */
    text: '',

    /**
    * 初始值。
    */
    value: '',

    /**
    * jQuery 中的显示/隐藏的动画速度。
    */
    speed: 'fast',

});


/**
* Panel 模块的默认配置
* @name Panel.defaults
*/
define('Panel.defaults', /**@lends Panel.defaults*/ {

    /**
    * 是否在组件 render 后自动调用 show() 方法以进行显示。
    */
    showAfterRender: true,

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

});


/**
* Scroller 模块的默认配置
* @name Scroller.defaults
*/
define('Scroller.defaults', /**@lends Scroller.defaults*/ {

    /**
    * 是否显示滚动条。 
    * 取值为 true|false。
    */
    scrollbars: true,           //

    /**
    * shrinkScrollbars。
    */
    shrinkScrollbars: 'scale',  //

    /**
    * preventDefault。
    * 取值为 true|false。
    */
    preventDefault: false,      //默认为 true

    /**
    * probeType。
    * 设置了此值，scroll 事件才会触发，可取的值为 1，2，3
    */
    probeType: 2,

    //支持的样式
    //'top': 0,
    //'left': 0,
    //'right': 0,
    //'bottom': 0,
    //'width': '100%',

    /**
    * 是否启用滚动器。 
    * 如果设置为 false，则在创建实例后会自动调用 scroller.disable(); 
    * 后续必须手动调用 scroller.enable() 以启用。
    */
    enabled: true,

});


/**
* Tabs 模块的默认配置
* @name Tabs.defaults
*/
define('Tabs.defaults', /**@lends Tabs.defaults*/ {
    
    /**
    * 创建实例后首先给激的项。
    */
    current: null,

    /**
    * 要监听的事件名。
    * 当指定为 'touch' 时，会调用 $(container).touch()进行绑定。 
    */
    eventName: 'touch',

    /**
    * 压下去时的样式的 css 类名。
    * 当 eventName = 'touch' 时有效。
    */
    pressedClass: '',

    /**
    * 项目给激活时的样式的 css 类名。
    */
    activedClass: '',

    /**
    * 取得项目列表所需要用到的 jQuery 选择器。
    * 默认取直接子节点。
    */
    selector: '>*',

    /**
    * 是否允许重复激活相同的项。
    * 当指定为 true 时，方响应已给激活的项目的重新点击。
    */
    repeated: false,

    /**
    * 字段映射。
    */
    field: {
        /**
        * 从 DOM 元素中取得项目列表中指定项的 index 的自定义字段名。 
        */
        index: 'data-index',

        /**
        * 当触发 change 事件时，需要同时触发对应的 item 上指定的事件名。
        * 例如当指定为 'name' 时，则在触发 change 事件时，会同时 item['name'] 对应的事件。 
        */
        event: '',
    },
});


/**
* Template 模块的默认配置
* @name Template.defaults
*/
define('Template.defaults', /**@lends Template.defaults*/ {

    /**
    * 模板最外层的标记。
    */
    root: {
        /**
        * 模板最外层的起始标记。
        */
        begin: '<!--',

        /**
        * 模板最外层的结束标记。
        */
        end: '-->',
    },

    /**
    * 子模板的标记。
    */
    item: {
        /**
        * 子模板的起始标记。
        */
        begin: '#--{name}.begin--#',

        /**
        * 子模板的结束标记。
        */
        end: '#--{name}.end--#',
    },

    /**
    * 生成子模板的随机占位串的长度。
    * 业务层不需要关注该属性。
    */
    outer: 64,

});


/**
* Toast 模块的默认配置
* @name Toast.defaults
*/
define('Toast.defaults', /**@lends Toast.defaults*/ {
    
    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-Toast-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    /**
    * 提示文本。
    */
    text: '',

    /**
    * 组件添加到的容器。
    * 默认为 document.body。
    */
    container: document.body,

    /**
    * 把组件添加到容器的方式，是否使用追加的方式。
    * 默认用 prepend 的方式。
    */
    append: false,

    /**
    * 是否启用 mask 层。
    */
    mask: false,

    /**
    * 组件用到的 html 模板。
    * 业务层不需要关注该字段。
    */
    sample: 'font-awesome',

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 用到的 font-awsome 的图标。
    */
    icon: 'check',

    /**
    * 显示的持续时间(毫秒)。
    * 0 表示一直显示。
    */
    duration: 0,

    //默认样式
});


/**
* View 模块的默认配置
* @name View.defaults
*/
define('View.defaults', /**@lends View.defaults*/ {
    background: false, //禁用背景色。
});




//设置对外暴露的模块
Module.expose({

    //api
    'API': true,
    //'Proxy': true, //私有模块
    'SSH.API': true,
    //'SSH': true,

    //cloud-home
    'CloudHome.API': true,
    'CloudHome': true,
    'CloudHome.Title': true,
    'ImageReader': true,

    //wechat
    'WeChat': true,

    //core
    '$': true,
    'MiniQuery': true,
    'IScroll': true, //test

    //crypto
    'MD5': true,

    //excore
    //'DOM': true,
    'Edition': true,
    'LocalStorage': true,
    'Mapper': true,
    'Module': true,
    'SessionStorage': true,
    'Style': true,
    'Url': true,

    //jquery-plugin
    'jquery-plugin/touch': true,

    //ui
    'Dialog': true,
    'ImageViewer': true,
    'Loading': true,
    'Mask': true,
    'Navigator': true,
    'NoData': true,
    'NumberPad': true,
    'Panel': true,
    'Scroller': true,
    'Tabs': true,
    'Template': true,
    'Toast': true,
    'View': true,

});




(function(require){

    var KISP = require('KISP');
    global.KISP = KISP;


    delete global['$'];
    delete global['MiniQuery'];

})(Module.require);


})(
    window,  // 在浏览器环境中

    top,
    parent,
    window, 
    document,
    location,
    navigator,
    window.localStorage,
    window.sessionStorage,
    window.console,
    history,
    setTimeout,
    setInterval,

    window.JSON,

    Array, 
    Boolean,
    Date,
    Error,
    Function,
    Math,
    Number,
    Object,
    RegExp,
    String,

    //$,
    jQuery,
    MiniQuery,
    IScroll

    /*, undefined */
);
