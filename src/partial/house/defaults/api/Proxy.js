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

