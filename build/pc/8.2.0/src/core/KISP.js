
/**
* KISP 框架命名空间
* @namespace
* @name KISP
*/
define('KISP', function (require, module, exports) {

    return /**@lends KISP*/ {

        /**
        * 名称。 
        * (由 packer 自动插入)
        */
        name: 'pc',

        /**
        * 版本号。 (由 packer 自动插入)
        */
        version: '8.2.0',

        /**
        * 类型号。 (由 packer 自动插入)
        * 值为 'debug' 或 'min'。
        */
        edition: /**{KISP.edition*/undefined/**KISP.edition}*/,

        /**
        * concat 版本的内容对应的 md5 值。 (由 packer 自动插入)
        * 内容不包括本字段动态生成的值部分。
        * 与生成的头部注释中的 md5 值是一致的。
        */
        md5: /**{KISP.md5*/''/**KISP.md5}*/,

        /**
        * babel 版本号。 (由 packer 自动插入)
        * 如果为空，则说明没有进行过 babel 转换。
        */
        babel: /**{KISP.babel*/''/**KISP.babel}*/,

        /**
        * KISP 对外公开可用的公共模块列表。 (由 packer 自动插入)
        */
        modules: /**{KISP.modules*/[]/**KISP.modules}*/,


        /**
        * 加载 KISP 框架内公开的模块。
        * @param {string} id 模块的名称(id)。
        * @return {Object} 返回模块的导出对象。
        * @example
        *   var API = KISP.require('API');    
        */
        require: function (id) {
            return require(id); //暂时全部可加载。
            //return InnerModules.expose(id) ? require(id) : null;
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
        create: function (id, ...args) {
            var M = require(id);
            return new M(...args);
        },


        /**
        * 获取或设置 KISP 内部模块的默认配置。
        * @function
        * @example
        *   KISP.config({});    
        */
        config: InnerModules.bind('Defaults', 'config'),


        /**
        * 获取或设置业务层的自定义数据。
        * 已重载 data(key); //获取指定键的数据。
        * 已重载 data(key, value); //设置指定键的数据。
        * 已重载 data(obj); //批量设置数据。
        * 
        * @param {string} key 要存储的数据的键。
        * @param value 要存储的数据的值，可以是任何类型。
        *   当不提供此参数时，则为 get 操作；
        *   否则为 set 操作。
        */
        data: InnerModules.bind('Data', 'data'),


        /**
        * 设置顶级私有模块的路由。
        */
        route: InnerModules.bind('Router', 'set'),

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
        proxy: InnerModules.bind('Proxy', 'response'),

        /**
        * 初始化执行环境，并启动应用程序。
        * 该方法会预先定义一些公共模块，然后定义一个匿名模块并启动它。
        * @param {function} factory 工厂函数，即启动函数。
        */
        launch: InnerModules.bind('App', 'launch'),
      
        /**
        * 用 KISP 标准的方法定义一个 View 视图实例。
        */
        view: InnerModules.bind('View', 'define'),

        /**
        * 用 KISP 标准的方法定义一个 Panel 面板实例。
        */
        panel: InnerModules.bind('Panel', 'define'),

        /**
        * 加载指定名称的包资源，并在加载完成后执行一个回调。
        * 或者加载总包文件。
        * 已重载 load(done);       //加载总包文件。 此时回调函数接受到的数据结构为总包 json 文件中的结构。
        * 已重载 load(name, done); //加载指定名称的分包资源。
        */
        load: InnerModules.bind('Package', 'load'),


        /**
        * 弹出 alert 虚拟窗口。
        * @param {string|Object} text 要显示的消息文本。
        *   如果指定为一个对象，则先调用 JSON.string(text, null, 4) 得到字符串再进行显示。
        * @param {function} fn 点击 `确定` 按钮后要执行的回调函数。
        */
        alert: InnerModules.bind('Alert', 'show'),

        /**
        * 弹出 confirm 虚拟窗口。
        * @param {string} text 要显示的消息文本。
        * @param {function} fnOK 点击 `确定` 按钮后要执行的回调函数。
        * @param {function} fnCancel 点击 `取消` 按钮后要执行的回调函数。
        */
        confirm: InnerModules.bind('Confirm', 'show'),
        
    };
});

