
/**
* KISP 框架的默认配置
* @namespace
* @name defaults
*/
define('defaults', /**@lends defaults*/ {

    /**
    * Url 模块的默认配置。
    * 字符串中的 {~} 表示站头的根地址；{@} 表示使用的文件版本 debug 或 min
    */
    'Url': {
        //注意：这里取当前页的路径作为根地址，只适用于页面在根目录的情况。
        root: location.origin + location.pathname.split('/').slice(0, -1).join('/') + '/',
        replacer: {
            root: '~',
            edition: '@'
        },
    },

    'Module': {
        seperator: '/',     //私有模块的分隔符
        crossover: false,   //不允许跨级调用
        repeated: false,    //不允许重复定义同名的模块
    },

    /**
    * API 模块的默认配置
    */
    'API': {
        successCode: 200,
        field: {
            code: 'code',
            msg: 'msg',
            data: 'data',
        },

        /**
        * 随机延迟时间，更真实模块实际网络
        */
        delay: false, //格式为 { min: 500, max: 2000 }

        /**
        * 在 url 中增加一个随机 key，以解决缓存问题。
        */
        random: true,

        /**
        * 把请求时的 data 中的第一级子对象进行序列化的方法。
        * @param {string} key 要进行处理的子对象的键。
        * @param {Object} value 要进行处理的子对象的值对象。
        * @return {string} 返回该子对象序列化的字符串。
        */
        serialize: function (key, value) {
            var $ = require('$');
            var json = $.Object.toJson(value);
            return encodeURIComponent(json);
        },
    },

    /**
    * Proxy 模块的默认配置
    */
    'Proxy': {
        delay: {
            min: 500,
            max: 3000
        },
    },

    /**
    * Template 模块的默认配置
    */
    'Template': {
       
        root: {
            begin: '<!--',
            end: '-->',
        },

        item: {
            begin: '#--{name}.begin--#',
            end: '#--{name}.end--#',
        },

        outer: 64,
    },

    'DOM': {
        prefix: '',
        suffix: '',
        seperator: '-',
    },

    /**
    * Scroller 模块的默认配置
    */
    'Scroller': {
        scrollbars: true,           //
        shrinkScrollbars: 'scale',  //
        preventDefault: false,      //默认为 true
        probeType: 2,               //设置了此值，scroll 事件才会触发，可取的值为 1，2，3

        //支持的样式
        //'top': 0,
        //'left': 0,
        //'right': 0,
        //'bottom': 0,
        //'width': '100%',

        /**
        * 是否启用。 
        * 如果设置为 false，则在创建实例后会自动调用 scroller.disable(); 
        * 后续必须手动调用 scroller.enable() 以启用。
        */
        enabled: true,      
    },


    'SSH/Server/Config': {

        url: 'http://mob.cmcloud.cn/kisplus/kisplusconfig.aspx?callback=?',
        //cache: 'session', // false|'memory'|'session'|'local'
        /**
        * 是否启用缓存。
        * 可取的值为 false|true|'session'|'local'
        */
        cache: 'session',

    },

    'SSH/Server': {
        ext: '',
        successCode: 200,
        field: {
            code: 'Result',
            msg: 'ErrMsg',
            data: 'Data',
        },

        /**
        * 是否启用缓存。
        * 可取的值为 false|true|'session'|'local'
        */
        cache: 'session',
    },

    'SSH': {
        ext: '',
        successCode: 200,
        field: {
            code: 'Result',
            msg: 'ErrMsg',
            data: 'DataJson',
        },

        proxy: {},

        //必选的
        eid: '',
        openid: '',

        //可选的
        appid: '',
        pubacckey: '',
        timestamp: '',
        nonce: '',
        pubaccid: '',

        data: null,

        console: true, //为了便于查看 CustData 而打印到控制台。

    },

    'SSH.API': {

        //解析 SSH 返回的 json 中的字段
        successCode: 200,
        field: {
            code: 'Result',
            msg: 'ErrMsg',
            data: 'Data',
        },

        // SSH 需要用到的。
        //下面这些字段在使用时会优先级会高于 SSH 节点中的
        proxy: {},

        //必选的
        eid: '',
        openid: '',

        //可选的
        appid: '',
        pubacckey: '',
        timestamp: '',
        nonce: '',
        pubaccid: '',

        data: null,


    },

    'CloudHome.API': {

        field: {
            success: 'success',
            code: 'errorCode',
            msg: 'error',
            data: 'data',
        },

        delay: false, //格式为 { min: 500, max: 2000 }
    },

    'Dialog': {

        /**
        * 生成的 id 的前缀。
        */
        prefix: 'KISP-Dialog-',

        /**
        * 生成的 id 的随机后缀的长度。
        */
        suffix: 4,

        /**
        * 是否启用 mask 层。
        */
        mask: true,

        /**
        * 内容区是否可滚动。
        */
        scrollable: true,

        autoClosed: true,

        /**
        * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
        * 可取值为: true|false，默认为不易消失。
        */
        volatile: false,
        title: '',
        text: '',
        'z-index': 1024,

        sample: 'iOS',
        cssClass: '',
        eventName: 'click',
        width: '80%',
        height: '50%',
        buttons: [],
    },

    /**
    * 遮罩层模块的默认配置。
    */
    'Loading': {
        /**
        * 生成的 id 的前缀。
        */
        prefix: 'KISP-Loading-',

        /**
        * 生成的 id 的随机后缀的长度。
        */
        suffix: 4,

        text: '处理中...',

        /**
        * 是否启用 mask 层。
        */
        mask: false,


        sample: 'iOS',
        cssClass: '',
        container: document.body,
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
        'z-index': 1024,
    },

    'Alert': {
        'button': '确定',
        'volatile': false,
        'mask': true,
        'autoClosed': true,
        'width': '80%',
        'z-index': 99999,
    },

    /**
    * 遮罩层模块的默认配置。
    */
    'Mask': {
        /**
        * 生成的 id 的前缀。
        */
        prefix: 'KISP-Mask-',
        
        /**
        * 生成的 id 的随机后缀的长度。
        */
        suffix: 4,

        /**
        * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
        * 可取值为: true|false|"hide"|"remove"，默认为 false，即不易消失。
        */
        volatile: false,
        container: document.body,
        append: false,

        'top': 0,
        'bottom': 0,
        'opacity': 0.5,
        'background': '#000',
        'z-index': 1024,
    },

    'Tabs': {
        current: null,
        eventName: 'touch', //当指定为 'touch' 时，会调用 $(container).touch()进行绑定。 
        pressedClass: '',   //仅当 eventName = 'touch' 时有效。
        activedClass: '',
        selector: '>*', //取直接子节点
        repeated: false, //是否允许重复激活相同的项。
        field: {
            index: 'data-index',
            event: '',
        },
    },

    /**
    * 遮罩层模块的默认配置。
    */
    'Toast': {
        /**
        * 生成的 id 的前缀。
        */
        prefix: 'KISP-Toast-',

        /**
        * 生成的 id 的随机后缀的长度。
        */
        suffix: 4,
        text: '',

        container: document.body,
        append: false,

        /**
        * 是否启用 mask 层。
        */
        mask: false,

        sample: 'font-awesome',
        cssClass: '',

        icon: 'check',
        duration: 0, // 0 表示一直显示。
        //默认样式
        
    },

    'Panel': {
        showAfterRender: true,
        cssClass: '',
    },


    
    'NoData': {
        /**
        * 生成的 id 的前缀。
        */
        prefix: 'KISP-NoData-',

        /**
        * 生成的 id 的随机后缀的长度。
        */
        suffix: 4,

        text: '暂无数据',


        cssClass: '',
        container: document.body,
        append: false,


        scrollable: true,
        pulldown: null,

        ////默认样式
        //'bottom': 0,
        //'top': 0,
        //'z-index': 1024,
    },


    'NumberPad': {
        /**
        * 生成的 id 的前缀。
        */
        prefix: 'KISP-NumberPad-',

        /**
        * 生成的 id 的随机后缀的长度。
        */
        suffix: 4,

        cssClass: '',
        container: document.body,
        append: false,

        decimal: 4, //允许的最多小数位数
        int: 12,    //允许的最多整数位数

        mask: 0.5,

        /**
        * 指定是否易消失，即点击 mask 层就是否隐藏/移除。
        * 可取值为: true|false，默认为易消失。
        */
        volatile: true,

        text: '',
        value: '',
        speed: 'fast', // jQuery 中的显示/隐藏的动画速度

    },

    'Seajs': {
        url: '', // seajs.js 文件所在的 url，具体应用时请指定。
    },

    'WeChat/Signature': {
        name: 'Jsapi_Signature',
        url: 'http://mob.cmcloud.cn/servercloud/weixin/',
    },

    /**
    * 微信相关配置
    */
    'WeChat': {

        debug: false,
        appid: '',
        eid: '',

        'timestamp': parseInt(new Date().getTime() / 1000),
        'noncestr': Math.random().toString(36).slice(2),
        'url': window.location.href.split('#')[0],

        js: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',

        /**
        * 跳转到登录授权页的 url
        */
        login: {
            url: 'http://mob.cmcloud.cn/servercloud/weixin/kisapp',
            data: {
                focus: 0,
                type: 1,
                eid: '',
                from_url: '',
            },
        },

        apis: '*', //表示所有

        retryAfterExpired: true, //签名过期时需要重试
    },


    'ImageReader': {

        loading: '读取中...',
    },

    'LocalStorage': {
        name: '',
    },
    'SessionStorage': {
        name: '',
    },

});

