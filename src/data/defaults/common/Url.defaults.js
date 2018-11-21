
/**
* Url 模块的默认配置。
* @name Url.defaults
*/
define('Url.defaults',  {

    id: 'script-KISP',

    //这里取当前页面的路径作为根地址。
    //注意：只适用于当前页面在根目录的情况。
    //IE10 及以下 location.origin 不存在。
    root: `${location.protocol}//${location.host}${location.pathname.split('/').slice(0, -1).join('/')}/`,


});

