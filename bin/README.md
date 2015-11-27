
KISP 框架
==============================================================
--------------------------------------------------------------

###简介 

> KISP 是一个轻量级的 JavaScript 框架，采用 CMD 模式进行模块化的封装，
提供了一些模块和接口，*可以用于 Web 和轻应用的开发*。



###专题介绍
- [JavaScript 开发规范](?file=specification/js/index.md)
- [通用模块定义与加载](?file=docs/CMD.md)
- [后台数据请求](?file=docs/API.md)
- [通道数据请求](?file=docs/SSH.API.md)
- [本地代理模拟服务器响应](?file=docs/Proxy.md)
- [使用微信接口](?file=docs/WeChat.md)
- [使用云之家接口](?file=docs/CloudHome.md)
- [将配置数据从代码中分离出来](?file=docs/Config-and-Code.md)
- [将HTML模板从代码中分离出来](?file=docs/HTML-and-Code.md)

### {type} - {version}

- [KISP 接口文档 {version}](?type={type}&version={version})
- [kisp.debug.js](?file={type}/{version}/kisp.debug.js) [源文件](data/{type}/{version}/kisp.debug.js)
- [kisp.debug.css](?file={type}/{version}/kisp.debug.css) [源文件](data/{type}/{version}/kisp.debug.css)
- [kisp.min.js](?file={type}/{version}/kisp.min.js) [源文件](data/{type}/{version}/kisp.min.js)
- [kisp.min.css](?file={type}/{version}/kisp.min.css) [源文件](data/{type}/{version}/kisp.min.css)

### 更新记录


####v3.0.5
2015-11-27
- 优化 `Scroller` 模块的 pulldown 和 pullup 方法。

2015-11-24
- 给 `Mask` 增加了 `$` 快捷字段，以访问对应的工DOM 节点的 jQuery 包装对象。
- 给视图切换动画增加了 mask 层，会随着视图的切换动画而进行 opacity 的变化。


####v3.0.4
2015-11-24
- 修改模块的 css 类名为大写开头，避免无意中被业务层影响。 涉及的模块有: `NoData`、`Alert`、`Toast`、`App`、`View`。
- 给模块 `SSH/Server/Config` 增加了配置字段 `host`，可以指定为 ip，以应对 `http://kd.cmcloud.cn` 域名无法解析的问题。


####v3.0.3
2015-11-23
- 修复 Loading 配置中的 append 字段无效。
- 删除了 Loading 中的 spinner 模板。
- 把 Loading 模块的 css 类名改成大写开头，避免跟业务层冲突，同时兼容旧的名称 `same-line`，建议使用新的 `SameLine`。
- 优化 Loading 模块的 css 类名，改写成更简短的方式。
- 修复 Loading 中的 Mask 层的 container 指向问题，让它与 Loading 的一致。

2015-11-20
- 优化模块方法 Mask.remove()。
- 优化模块方法 Dialog.remove()。
- 优化模块方法 Dialog/Style.get()。
- 增加模块方法 Dialog.render()。
- 优化模块 Alert 的实现，支持多次调用并依次显示出 alert 对话框（之前的只能显示最后一次的 alert 调用）。
- 把子模块的调用方式由 require(module, 'ABC') 改成 module.require('ABC');
- 给模块 `SSH.API` 增加了默认错误消息: `网络繁忙，请稍候再试`，当 http 协议请求错误时将使用该消息。
- 模块 `View` 的背景色需要在配置中指定，否则不会生成背景色。 


####v3.0.2
2015-11-19

- 修复了视图动画后退时没有触发 show 事件的 bug。
- 修复了视图前进时动画有时不起作用的 bug（通过增加延迟的方式）。

2015-11-17 

- 增加了视图切换（前进和后退）时使用动画效果。 同时兼容原有的无动画方式。 


####v3.0.1

2015-11-12 
- 增加了 UI 组件：图片查看器 `ImageViewer`。
- 修复了 `Scroller` 组件中当禁用滚动条时的 bug，scroller.indicators 为 undefined。



2015-11-10 
- 增加了 UI 组件：确认对话框 `Confirm`，并提供了快捷方式: `KISP.confirm(text, fn)`。


2015-11-05 
- 增加了模块 `LocalStorage`。
- 增加了模块 `SessionStorage`。

-------------------------------------------------------------------













