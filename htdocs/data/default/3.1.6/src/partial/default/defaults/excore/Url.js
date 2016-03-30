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

