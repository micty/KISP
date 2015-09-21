

(function(require){

    var KISP = require('KISP');
    var defaults = require('defaults');

    KISP.config(defaults);
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
