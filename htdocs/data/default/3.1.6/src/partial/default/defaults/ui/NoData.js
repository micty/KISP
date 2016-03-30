/**
* NoData 模块的默认配置
* @name NoData.defaults
*/
define('NoData.defaults', /**@lends NoData.defaults*/ {
    
    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-NoData-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    text: '暂无数据',

    /**
    * 组件用到的 css 类名。
    */
    cssClass: '',

    /**
    * 组件添加到的容器。
    * 默认为 document.body。
    */
    container: document.body,

    /**
    * 把组件添加到容器的方式，是否使用追加的方式。
    * 默认用 prepend 的方式。
    */
    append: false,

    /**
    * 是否可滚动。
    * 当可滚动时，会创建相应的 scroller。
    */
    scrollable: true,

    pulldown: null,

    ////默认样式
    //'bottom': 0,
    //'top': 0,
    //'z-index': 1024,
});

