
#微信接口
---------------------------------------------------------------

目前提供了云之家和微信的第三方运行环境接口。
微信的模块为 `WeChat`，包括了微信依赖的 js 库文件的加载、微信签名验证等。


``` javascript

var WeChat = KISP.require('WeChat');

//初始化微信运行环境，包括微信依赖的 js 库文件的加载和微信签名验证。
WeChat.init({
    'appid': 'appid',
    'eid': 'eid',
});

//在成功后会触发 ready 事件
WeChat.on('ready', function (wxObj) {
    //
});

```