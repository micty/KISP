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

