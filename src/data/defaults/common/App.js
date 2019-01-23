/**
* App 模块的默认配置
* @name App.defaults
*/
define('App.defaults', /**@lends App.defaults*/ {
    root: '',
  
    /**
    * 应用的唯一名称。
    * 用于在存储中区分其它应用。
    */
    name: '',

    navigator: 'default-navigator',

    /**
    * 是否预绑定路由。
    */
    prebind: true,

    /**
    * 针对视图的配置。
    */
    view: {
       
    },


    /**
    * 给业务层预定义的模块。
    * 即把 KISP 内部的模块预定义成业务层的模块。
    */
    predefines: [
        'KISP',
        '$',
    ],


});

