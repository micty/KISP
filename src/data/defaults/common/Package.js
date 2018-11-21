/**
* Package 模块的默认配置
* @name Package.defaults
*/
define('Package.defaults', /**@lends Package.defaults*/ {


    /**
    * 总包的 url 地址，相对于网站的根地址。
    */
    url: 'packages/all.json',

    /**
    * 是否在总包的 url 地址上加上随机 query 串以刷新缓存。
    */
    random: true,

    /**
    * 总包 url 地址的 query 部分，应该由自动化工具写入相应的 MD5 值。
    * 如果指定，则带在 url 的 query 部分。
    */
    query: null,

    /**
    * 加载总包或分包时的进度提示。
    */
    load: {
        /**
        * 开始加载时总包或分包时的提示函数。
        * @param {function} require 用于加载 KISP 内部模板的 require 方法。
        * @param {Object} loading 上一次创建出来的 Loading 实例。
        */
        begin: function (require, loading) {
            if (!loading) {
                var Loading = require('Loading');
                loading = new Loading();
            }
            
            loading.show();
            return loading;
        },

        /**
        * 结束加载时总包或分包时的提示函数。
        * @param {function} require 用于加载 KISP 内部模板的 require 方法。
        * @param {Object} loading 上一次创建出来的 Loading 实例。
        */
        end: function (require, loading) {
            loading.hide();
        },
    },

});

