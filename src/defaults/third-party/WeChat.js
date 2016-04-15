/**
* WeChat 模块的默认配置
* @name WeChat.defaults
*/
define('WeChat.defaults', /**@lends WeChat.defaults*/ {
    
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
});

