/**
* ImageViewer 模块的默认配置
* @name ImageViewer.defaults
*/
define('ImageViewer.defaults', /**@lends ImageViewer.defaults*/ {
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    border: 'none',
    'border-radius': 0,

    /**
    * 组件用到的 css 类名。
    */
    cssClass: 'main-fullscreen',

    /**
    * 点击时需要用到的事件名。
    * 针对移动端的是虚拟事件 'touch'。
    */
    eventName: 'touch',

    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-ImageViewer-',

    /**
    * 给 img 元素生成的 id 的随机后缀的长度。
    */
    suffix: 4,
    sample: '<img id="{id}" style="max-width: 100%; max-height: 100%;" src="{src}" />',

    /**
    * 针对滚动器的配置。
    */
    scroller: {
        scrollbars: false,  //隐藏滚动条
    },

});

