
(function(require){
    var KISP = require('KISP');
    var Module = require('Module');

    global.KISP = KISP;
    global.define = Module.define;  //这个 define 是对外的，跟内部用的 define 不是同一个。


})(InnerModules.require);




})(
    window,  // 在浏览器环境中

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

    Array, 
    Boolean,
    Date,
    Error,
    Function,
    JSON,
    Map,
    Math,
    Number,
    Object,
    RegExp,
    String,

    window.jQuery,   //不要省略前面的 `window.`，因为这样即使 jQuery 不存在也不会报错。

    undefined
);
