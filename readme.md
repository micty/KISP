
KISP 框架
==============================================================
--------------------------------------------------------------

###简介 

> KISP 是一个轻量级的 JavaScript 框架，采用 CMD 模式进行模块化的封装，
提供了一些模块和接口，*可以用于 Web 和轻应用的开发*。




###专题介绍
- [JavaScript 开发规范](?file=specification/js/index.md)
- [HTML 页面开发规范](?file=specification/refactor/index.md)
- [通用模块定义与加载](?file=docs/CMD.md)
- [后台数据请求](?file=docs/API.md)
- [通道数据请求](?file=docs/SSH.API.md)
- [本地代理模拟服务器响应](?file=docs/Proxy.md)
- [使用微信接口](?file=docs/WeChat.md)
- [使用云之家接口](?file=docs/CloudHome.md)
- [将配置数据从代码中分离出来](?file=docs/Config-and-Code.md)
- [将HTML模板从代码中分离出来](?file=docs/HTML-and-Code.md)
- [Web 客户端存储](?file=docs/Storage.md)
- [同源策略](?file=article/Same-origin-policy.md)

### default - 5.1.3

- [KISP 接口文档 5.1.3](?type=default&version=5.1.3)
- [kisp.debug.js](?file=default/5.1.3/kisp.debug.js) [源文件](data/default/5.1.3/kisp.debug.js)
- [kisp.debug.css](?file=default/5.1.3/kisp.debug.css) [源文件](data/default/5.1.3/kisp.debug.css)
- [kisp.min.js](?file=default/5.1.3/kisp.min.js) [源文件](data/default/5.1.3/kisp.min.js)
- [kisp.min.css](?file=default/5.1.3/kisp.min.css) [源文件](data/default/5.1.3/kisp.min.css)


### 更新记录

####v5.1.3

2016-11-28
- 修复模块 `Navigator` 因删除视图导致的某些视图不能隐藏的问题。 KISP 通过监听 `remove` 事件来自动隐藏。


####v5.1.2

2016-11-14
- 修复组件 `Dialog` 因多次调用 show() 后无法隐藏 mask 层的问题（该问题是由于修改组件 `Dialog` 的属性 `volatile` 无效的问题引入的）


####v5.1.1

2016-11-11
- 修复组件 `Dialog` 的属性 `volatile` 无效的问题。


2016-11-10
- 增加模块 `Router` 和给 `KISP` 增加方法 `route(name, fn)`，以设定分路由。


####v5.0.1
2016-09-05
- 忽略掉视图内部的子节点冒泡上来的动画结束事件。


####v5.0.0

2016-08-31
- 视图导航恢复使用动画和无动画两种版本，主要考虑到兼容 PC 版的要求。
- 针对 PC 版的提供默认无动画版的视图导航配置。

2016-08-25
- 优化模块 `Url` 的 `root()` 方法，增加检测并确保获取到的网站根地址以 `/` 结尾。
- 为确保加载总包及分包资源时使用的地址是相对于网站根目录（这在页面不在网站根目录下的时候会表现出来），修复模块 `Package` 和 `Package/Loader` 中相应的问题。
- 优化配置模块 `Package.defaults` 的注释信息。
 
2016-08-15
- 修复 `Scroller` 中下拉刷新后无法回到原位置的问题。
- 修复 `IScroll.js` 和 `iSlider.js` 中文注释乱码的问题。


2016-07-21
-优化模块 `Package` 中的中加载资源的方法，优化使用已加载过的缓存，已加载过的包在再次加载时不会重复发起请求，而是使用缓存结果。

2016-07-19
- 优化模块 `Package/Loader` 中加载资源的方法，使加载成功后的结果通过回调函数传出去给调用者。
- 给 `KISP` 增加快捷方法 `load(name, fn)`，以便让用户可以快捷调用内部方法 `Package.load(name, fn)`。

2016-07-18
- 修复 `Package/Loader` 当加载 js 中错误时的提示错误。

2016-05-19 ~ 2016-07-15
- 增加按视图的分布式加载功能，对应的增加模块 `Package`、`Package/Loader`。
- 增加程序启动函数里的 `module` 对象绑定视图事件的新方式 `module.bind({ ... })`，增加 `module.on('require', fn)` 事件绑定，优化了视图加载时的性能。


2016-05-11
- 视图跳转中，不再支持延迟跳转，即第一个参数为数字的用法。 若要延迟跳转，请自行使用 `setTimeout()` 方式。
- 地址栏中的 hash 值，随机串部分由原来的 8 位改成 4位，在确保随机唯一的前提下，更简洁。
- 修复视图后退中的问题: 当两个视图连续快速后退时，最后一次的后退视图没有给隐藏和去掉阴影。


####v4.1.0

2016-05-10
- 优化视图的前进和后退动画的配置参数。

2016-05-09
- 优化视图的前进和后退动画，去掉前进和后退时的遮罩层，去掉样式类名，改成可配置的内联样式来实现。


####v4.0.1

2016-05-05
- 优化视图的滑动后退逻辑。
- 模块 `Config` 和 `Defaults` 在 `set` 时使用深度拷贝的方式，这使配置对象中的子对象也可以部分拷贝。
- 把视图的滑动后退部分参数抽离到配置中。


####v4.0.0

2016-05-04
- 解决滑动后退中针对低版本 iOS 的兼容性问题。
- 缩短视图中的前进和后退的动画时间。

2016-04-28 - 2016-05-03
- 增加视图间的滑动返回，并且兼容以前的常规的返回。 很酷的体验!
- 模块 `Navigator` 增加方法 `get(index)`，以获取指定索引值的视图名称。 支持传一个负数进来。
- 模块 `Navigator` 重载方法 `back(false)`，当传入一个 `false` 时，将不会触发事件。
- 修改模块 `App` 的配置字段 `animation` 为 `animated`，并指定默认值为 `true`，即默认开启视图间的切换动画。



####v3.4.0

2016-04-27
- 修改针对 PC 版的配置模块 `Dialog.defaults`，增加 `width: 600`，以解决在 PC 端对话框默认宽度过大的问题。
- 增加通用配置模块 `Confirm.defaults` 和针对 PC 端的配置模块 `Confirm.config`，并把模块 `Confirm` 中的配置分离出去。

2016-04-26
- 给模块 `Panel` 增加实例方法 `template`，以设定针对复杂模板填充的规则。 
- 修改模块 `Panel` 实例方法  `fill`，以支持复杂模板填充的情况。 如果需要使用复杂模板填充，则在调用 `panel.fill(data, fn)` 之前，需要先调用 `panel.template(config)` 进行规则设定。 否则只会当成简单模板填充。

####v3.3.2

2016-04-22
- 合并时补上针对 PC 端的配置文件，主要是 UI 组件。


####v3.3.1

2016-04-20
- 解决 `CityPicker` 在 `iPhone 6 Plus` 下高度不足而给遮挡住的问题。 主要是内嵌的 iframe 的 html 节点使用了媒体查询，从而在 KISP 层面也需要使用相应的媒体查询来设置对话 iframe 标签的高度。


####v3.3.0

2016-04-15
- 优化 `Template` 模块。 增加支持重载 template.fill({}) 的情况，以适应传入的数据不是一个数组的情况。
- 给配置模块 `Mask.defaults` 增加 `duration: 0` 的默认值，以在 jsdoc 文档里能显示出来该字段。
- 组件 `Tabs` 新增方法 `previous()` 和 `next()`，以支持快速激活前一项和后一项。 并支持在构造器 `Tabs({ looped:true|false })` 里传入 `looped` 字段来启用或禁用循环模式。
- 给配置模块 `Tabs.defaults` 增加 `looped: false` 的默认值，禁用循环模式。

2016-04-14
- 优化 `省市区选择器` `CityPicker` 控件。 


2016-04-13
- 增加`省市区选择器` `CityPicker`，引入第三方框架并使用嵌入的 iframe 页面来调用。




####v3.2.0
2016-04-06
- 把通用默认配置提升到 `defaults` 公共目录，差异化的配置则保留在原来的 `partial` 目录。 通用默认配置采用 `{Name}.defaults` 的命名方式，差异化的配置采用 `{Name}.config` 的命名。 以适用多移动端和 PC 端等环境下的合并和应用。


####v3.1.6

2016-03-30
- 修改模块 `SSH`，当返回多个产品实例时，产品实例列表的字段名，由原来的 `Data` 改为 `NetIDList`，并在 `servers` 事件中增加了 `json` 和 `xhr` 输出参数。

2016-03-21
- 修改模块 `Url`，使其接受配置字段 `root` 为一个函数的情况。 当传一个函数进来时，则会首次调用该函数以其返回值作为网站的根地址，后续则会缓存并使用该值。

####v3.1.5

2016-03-15
- 修改配置模块 `CloudAPI.defaults` 字段 `url` 值为 `http://183.2.171.10/basecloud/common/BusinessAction`。

2016-03-14
- 给模块 `CloudAPI` 打印 `post` 中的数据到 `console` 的功能，由于 data 给编码了成字符串，为了便于查看原始对象结构而打印到控制台。
- 给配置模块 `CloudAPI.defaults` 增加字段 `console: true`， 即默认会打印 `post` 中的 `method`和 `data` 到控制台中。
-

####v3.1.4

2016-03-14
- 给模块 `API` 增加配置字段 `prefix`，用于更加细分 API 接口的 url 地址部分。即接口的完整地址为 `url = url + prefix + name + ext`。默认为空字符串。
- 增加模块 `CloudAPI`，用于云基础平台请求后台。
- 增加配置模块 `CloudAPI.defaults`，用于针对模块 `CloudAPI` 的默认配置。

2016-03-08
- 修改模块`SSH/Server`，让其支持多个产品实例(`netid`)。
- 修改模块 `SSH.API`，当请求时发现后台返回多个 `netid`，则触发类级别的事件 `servers`，并把 `netid` 列表作为参数传递过去。
- 修改模块 `SSH.API` 的默认配置，让字段 `netid` 支持 `-1` 的情况，表示让后台自己去获取 `netid`，此情况仅适用于只有一个产品实例的情况。当存在多个 时，会触发类事件 `servers`，此时应该业务层弹出对话框让用户手动去选择产品实例(`netid`)。

2016-03-07
- 模块`SSH/Server` 的字段 `Timestamp` 由 `yyyy-MM-ddhh:mm:ss` 改为 `yyyy-MM-dd HH:mm:ss`。
- 优化模块`SSH/Server` 的 `ajax` 方法和 `get` 方法。
- 优化模块 `SSH` 的 `post` 方法。


2016-03-04
- 针对 `SSH/Server/Config` 和 `SSH/Server` 模块的配置字段 `cache` 作增强，当 `cache` 字段指定为 `fasle` 时，则禁用缓存。 这意味着内存中的缓存也不使用，每次请求都会重新拉取最新的值。完全禁用缓存，在开发调试时可能会用到。

2016-03-01
- 去掉 `Scroller` 的 `reset` 方法中的 `resetPosition()` 调用，以解决列表滚动器 reset 后跳一下。
- 给 `Dialog` 的 `set` 方法的滚动器刷新加入 200ms 的延迟，以解决设置 `text` 引起的高度变化导致的刷新失效问题。

####v3.1.3

2016-02-18
- 优化组件 `Dialog` 的渲染逻辑，当没有标题或按钮时，不创建对应的 header 和 footer 节点。
- 把组件 `Confirm` 的 `z-index` 由默认的 `1024` 提升到 `99999`，避免给其它覆盖。
- 优化组件 `Mask`: 增加 `touch` 虚拟事件支持；优化渲染逻辑，去掉了对外触发的 `click` 事件；
- 组件 `ImageSlider` 改用 `Mask` 实现，更轻量(之前用的是 `Dialog`)。
- 给组件 `ImageReader` 的 `render` 方法增加数据传递，针对云之家选取图片时需要用到的参数。 
- 优化模块 `CloudHome` 的 `check` 方法，增加一个 `strict` 参数，以控制是否使用云之家官方文档上的严格模式进行判断。默认只从 url 中判断是否包含有 ticket 字段。主要用于用云之家打开PC端的开发版页面方便调试。

2016-02-17
- 修复模块 `SSH` 的打印完整 API 名称显示为 `undefined` 的问题。
- 新增模块 `ImageSlider`，用于滚动查看图片列表。


####v3.1.2

2016-01-29
- 给模块 `API`、`SSH` 和 `SSH.API` 增加了 `abort` 方法，用于取消当前已发起但未完成的请求，会触发 `abort` 事件。
- 优化模块 `API`、 `SSH` 和 `SSH/Ajax` 的逻辑，把内部的 `timeoutFn` 改成 `ontimeout`。



####v3.1.1

2016-01-25
- 为简化设计，把模块 `API` 中的构造函数预绑定事件去掉。 需要绑定事件请单独调用 `on()` 方法。
- 给模块 `API`、`SSH` 和 `SSH.API` 增加了请求超时控制，当在 `config` 中传入了 `timeout` 字段(单位为毫秒)，则当请求超时时，会触发 `timeout` 事件。
- 优化模块 `SSH` 和 `SSH/Ajax` 的逻辑。

####v3.1.0

2016-01-12
- 修复模块 `Dialog` 中的文本框无法获得输入焦点的问题。 主要由于 touch() 方法把默认动作禁用了。


####v3.0.9

2016-01-06
- 修复模块 `Toast` 的样式问题。 把 class 名 `.text` 换成 `.Text`，之前的优化类名为大写时修改不完全导致的。


####v3.0.8

2015-12-21
- 去掉模块 `DOM`。
- 优化模块 `Url`。
- 把模块 `MD5` 设置为公开模块。

2015-12-16
- 优化模块 `CloudHome` 的 `check` 方法，改成云之家官方文档上的实现。

2015-12-15
- 去掉模块 `KISP` 的 `files` 属性，因为该属性不会用到。
- 完善注释：`IScroll`、`$`、`MiniQuery`。
- 


2015-12-07
- 优化模块 `SSH`，去掉重复的 `proxy` 字段读取。
- 完善默认配置字段的注释：`LocalStorage`、`SessionStorage`。
- 给模块 `API` 的　`request` 事件增加二级事件 `get` 和 `post`。
- 优化模块 `API` 的 `get` 和 `post` 方法。

####v3.0.7

2015-12-07
- 给模块 `SSH.API`、`SSH`、`SSH/Server`、`SSH/Ajax` 加上可选配置字段 `netid`。
- 去掉模块 `SSH/Server` 的默认 `config` 对象，因为它不可能为空。
- 完善模块 `SSH.API`、`SSH`、`API` 的默认配置的注释和增加相应的字段。
- 优化模块　`SSH.API` 的 `post` 方法。

2015-12-04
- 把默认配置的定义由 `defaults.ABC` 修改成 `ABC.defaults` 的形式，让它在 jsdoc 文档中直接成为 `ABC` 的一个属性。
- 修改模块 `Defaults` 的加载，由 `defaults.ABC` 修改成 `ABC.defaults` 的形式。
- 完善默认配置的字段注释。

2015-12-03
- 把 KISP 内部模块用到的默认配置 `defaults` 拆分成单个独立的子配置，方便维护和管理。
- 把模块 `SSH` 设置成私有模块，因为外部不会直接用到它，而是使用模块 `SSH.API` 比较常见。
- 修改了模块 `Config` 的静态方法。
- 增加了模块 `Defaults`，针对 KISP 内部模块使用的默认配置管理器。

####v3.0.6

2015-12-01
- 优化模块 `SSH/Server/Config` 的 `get` 方法，当不传入回调函数时也可以发起调用。
- 把模块 `Proxy` 对 Url 的解析单独成一个子模块 `Proxy/Url`。
- 给模块 `Proxy` 增加配置字段 `base`，以指定起始的代理目录。当 `API` 中的 `proxy` 以 `/` 开头，则不使用 `base` 所指定的目录。 
- 给模块 `API` 和 `SSH.API` 的 `proxy` 字段增加 `proxy: true` 的支持。此时等价于 `proxy: '{ApiName}.js'`。 
- 修复了模块 `SSH.API` 中 `proxy` 字段失效的问题。
- 修复模块 `Dialog` 设置了 `text` 和 `height` 后无法向下滚动的问题。


2015-11-30
- 把模块 `Proxy` 对 `Seajs` 的依赖去掉，用回自己实现的来动态加载 js 文件。
- 把模块 `Seajs` 从 KISP 中移除掉，因为它之前一直都是私有模块。
- 优化模块 `SSH/Server/Config` 的 `get` 方法，当不传入回调函数时也可以发起调用。

####v3.0.5

2015-11-30
- 去掉了模块 `API` 中不常用的几种事件绑定方法：`done`、`success`、`fail`、`error`、`status`、`code`，可以改为 on() 实现。
- 把模块 `Proxy` 设置为私有模块，因为外部不需要直接用到它。
- 优化模块 `Proxy` 中的 `request` 的 JsDoc 注释。
- 去掉了模块 `Proxy` 中的 `response` 对 action 的响应模块。只保留更通用的 `response(json)` 和 `response(fn)` 两种。
- 补充完整模块 `Seajs` 中的 `use` 方法的参数，对实际使用无影响，仅为了代码更可读。


2015-11-27
- 优化 `Scroller` 模块的 `pulldown` 和 `pullup` 方法。

2015-11-24
- 给 `Mask` 增加了 `$` 快捷字段，以访问对应的工DOM 节点的 jQuery 包装对象。
- 给视图切换动画增加了 mask 层，会随着视图的切换动画而进行 opacity 的变化。


####v3.0.4
2015-11-24
- 修改模块的 css 类名为大写开头，避免无意中被业务层影响。 涉及的模块有: `NoData`、`Alert`、`Toast`、`App`、`View`。
- 给模块 `SSH/Server/Config` 增加了配置字段 `host`，可以指定为 ip，以应对 `http://kd.cmcloud.cn` 域名无法解析的问题。


####v3.0.3
2015-11-23
- 修复模块 `Loading` 配置中的 `append` 字段无效的问题。
- 删除了模块 `Loading` 中的 `spinner` 模板，该模板目前没有用到。
- 把模块 `Loading` 的 css 类名改成大写开头，避免跟业务层冲突，同时兼容旧的名称 `same-line`，建议使用新的 `SameLine`。
- 优化模块 `Loading` 的 css 类名，改写成更简短的方式。
- 修复模块 `Loading` 中的 Mask 层的 `container` 指向问题，让它与 `Loading` 的一致。

2015-11-20
- 优化模块方法 `Mask.remove()`。
- 优化模块方法 `Dialog.remove()`。
- 优化模块方法 `Dialog/Style.get()`。
- 增加模块方法 `Dialog.render()`。
- 优化模块 `Alert` 的实现，支持多次调用并依次显示出 alert 对话框（之前的只能显示最后一次的 alert 调用）。
- 把子模块的调用方式由 `require(module, 'ABC')` 改成 `module.require('ABC')`;
- 给模块 `SSH.API` 增加了默认错误消息: `网络繁忙，请稍候再试`，当 http 协议请求错误时将使用该消息。
- 模块 `View` 的背景色需要在配置中指定，否则不会生成背景色。 


####v3.0.2
2015-11-19

- 修复了视图动画后退时没有触发 `show` 事件的 bug。
- 修复了视图前进时动画有时不起作用的 bug（通过增加延迟的方式）。

2015-11-17 

- 增加了视图切换（前进和后退）时使用动画效果。 同时兼容原有的无动画方式。 


####v3.0.1

2015-11-12 
- 增加了 UI 组件：图片查看器 `ImageViewer`。
- 修复了 `Scroller` 组件中当禁用滚动条时的 bug，此时　`scroller.indicators` 为 `undefined`。



2015-11-10 
- 增加了 UI 组件：确认对话框 `Confirm`，并提供了快捷方式: `KISP.confirm(text, fn)`。


2015-11-05 
- 增加了模块 `LocalStorage`。
- 增加了模块 `SessionStorage`。

-------------------------------------------------------------------













