
(function(require){
    var KISP = require('KISP');
    var OuterModule = require('OuterModule');

    global.KISP = KISP;                     //对外提供的命名空间 KISP。
    global.define = OuterModule.define;     //这个 define 是对外的，跟内部用的 define 不是同一个。
    global.define.fill = OuterModule.fill;  //提供一个快捷方式。


})(InnerModules.require);




})(
    window,  // 在浏览器环境中。

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
