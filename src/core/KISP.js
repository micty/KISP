
/**
* KISP 框架命名空间
* @namespace
* @name KISP
*/
define('KISP', function (require, module, exports) {

    var cfg = null; //for data
    var dlg = null; //for alert

    module.exports = exports = /**@lends KISP*/ {

        /**
        * 名称。 (由 grunt 自动插入)
        */
        name: /**grunt-name-begin*/''/**grunt-name-end*/, //由 grunt 自动插入

        /**
        * 版本号。 (由 grunt 自动插入)
        */
        version: /**grunt-version-begin*/''/**grunt-version-end*/, //由 grunt 自动插入

        /**
        * 文件列表。 (由 grunt 自动插入)
        */
        files: /**grunt-files-begin*/[]/**grunt-files-end*/, //由 grunt 自动插入

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
        * @function
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
        * 相当于 Config.get(name) 或　Config.set(name, value)  的别名。
        * @function
        * @example
        *   KISP.config({});    
        */
        config: function (name, value) {

            var Config = require('Config');

            if (typeof name == 'string' && arguments.length == 1) { //get(name)
                return Config.get(name);
            }

            //set
            Config.set(name, value);

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

            if (dlg) {
                dlg.destroy();
            }

            var Alert = require('Alert');

            var args = [].slice.call(arguments, 0);
            dlg = Alert.create.apply(null, args);

            dlg.show();
           
        },

        /**
        * 初始化执行环境，并启动应用程序。
        * 该方法会预先定义一些公共模块，然后定义一个指定的(或匿名)模块并启动它。
        * 已重载 launch(factory);
        * @param {string} name 启动模块的名称。 若不指定，则默认为空字符串。
        * @param {function} factory 工厂函数，即启动函数。
        */
        launch: function (name, factory) {

            if (typeof name == 'function') { //重载 launch(factory)
                factory = name;
                name = '';
            }

            var Module = require('Module');
            var $ = require('jquery-plugin/touch');
            var MiniQuery = require('MiniQuery');

            var define = Module.define;

            define('$', function () {
                return $;
            });

            define('MiniQuery', function () {
                return MiniQuery;
            });

            define('KISP', function () {
                return exports;
            });

            define(name, factory);
            Module.require(name); //启动
        },


        

    };
});