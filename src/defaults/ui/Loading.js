/**
* Loading 模块的默认配置
* @name Loading.defaults
*/
define('Loading.defaults', /**@lends Loading.defaults*/ {
    
    /**
    * 生成的 id 的前缀。
    */
    prefix: 'KISP-Loading-',

    /**
    * 生成的 id 的随机后缀的长度。
    */
    suffix: 4,

    /**
    * 加载中时要显示的文本。
    */
    text: '处理中...',

    /**
    * 是否启用 mask 层。
    */
    mask: false,

    /**
    * 组件用到的 html 模板。
    * 默认为 'iOS'。 业务层不需要关注该字段。
    */
    sample: 'iOS',

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

    //默认样式
    'background': 'rgba(0, 0, 0, 0.7)',
    'border-radius': 10,
    'bottom': 'initial',
    'color': '#fff',
    'font-size': '15px',
    'height': 102,
    'left': '50%',
    'right': 'initial',
    'top': '50%',
    'width': 120,

    /**
    * 组件的 css 样式 z-index 值。
    */
    'z-index': 1024,
});

