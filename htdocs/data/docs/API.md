
#后台数据请求
---------------------------------------------------------------

>任何 Web 开发都离不开后台数据的请求，尤其在前后端分离的开发模式下，前端通过 Ajax 请求后台获取业务数据更是必不可少的。

##数据来源
在金蝶 KIS 的 Web 业务中，后台数据的来源一般分为两种：
- Cloud 服务器（云服务器）
- SSH 服务器（通道服务器）


**云服务器**：这种情况最简单，根据给定 Url 直接请求服务器即可拿到业务数据。

**SSH 服务器**：这种情况稍微复杂点，需要先请求一台中转服务器，以拿到一些必需的信息(`中转信息`)，再以这些信息去请求真实的服务器方可获取到业务数据。当然，仅第一次请求时需要去中转服务器获取中转信息，然后缓存起来，在后续的请求中，可以复用缓存的中转信息，直接请求真实的服务器。

##对服务器的要求

要使用 KISP 框架去请求后台数据，需要服务器满足两方面的要求：
- 1.允许跨域。
- 2.返回指定格式的数据。

###跨域
由于浏览器安全策略的限制，Ajax 请求会受到跨域的限制，即请求域必须要和响应域是同一个域，否则浏览器报错。解决跨域问题的方法很多，在 HTML5 的标准下，最简单的方法是让服务器在响应头里添加一个 HTTP 头：

`Access-Control-Allow-Origin: *`

在不考虑安全性时，该方法最简单快捷，在开发阶段也非常方便，是目前金蝶 KIS 普遍使用的方法。

###数据格式
解决了跨域问题，还需要后台返回指定格式的数据，否则 KISP 无法正确解析响应数据。我们先来讨论最简单的情况 --- 云服务器，一个完整的、标准的后台数据格式应该如下：


``` json
{
                    "code": 200,
    "msg": "ok",
     
     
         "data": { }
}

``` 



字段含义：

名称 | 类型 | 作用 
------ | ---- | ---- 
`code` | `string` 或 `number` | 状态码，用于表示业务处理的结果状态，是成功还是失败。成功码只有一个，其它的均表示失败。
`msg` | `string` | 描述消息。用于描述结果状态，尤其在失败时，给出失败的原因描述，有助于前端开发者快速理解失败的原因。
`data` | `Object` | 业务的主体数据。业务所有的数据均可包装在该字段里，格式可以自定义。

以上三个字段是标准的字段，当后台返回的字段名跟标准字段不一样时，业务开发者需要配置字段映射关系。假如某业务后台返回的数据格式如下：

``` json

{
      "Result": 200,
      "ErrMsg": "ok",
      "Data": { }
}


```


为了让 KISP 能正确解析该数据，需要作字段映射的配置：

``` javascript

KISP.config({
    'API': {
        field: {
            code: 'Result',
            msg: 'ErrMsg',
            data: 'Data',
        },
    },
});

```

即把标准的 `code` 映射到 `Result`；`msg` 映射到 `ErrMsg`；`data` 映射到 `Data`。

注意：**当业务数据字段与标准字段不一致时，必须作映射配置**。

##状态码
对于 http 协议层来说，一个 http 请求的结果无非两种：成功和错误。错误 表示网络错误、网络无法连接等，根本无法与后台服务器进行通信。成功则表示请求后台有数据回来，从业务逻辑上可进一步分成功和失败，其中失败表示响应数据无法满足业务要求。具体区别如下：

名称 | 状态 | 描述
------| ----- | ------
`success` | 成功 | http 请求成功，响应数据符合业务要求。
`fail` | 失败 | http 请求**成功**，但响应数据不满足业务要求。
`error` | 错误 | http 请求失败，如网络错误无法连接服务器等。


当 http 请求成功时，为了表示出响应数据是否满足业务要求，我们用一个状态码来表示结果。成功的状态码只有一个，其它的都表示失败。当失败时，用状态码表示出具体的失败原因，如无权限、操作错误等，具体的状态码含义由业务层的后台与前端约定使用，KISP 框架不作限制。

在 KISP 里，默认的成功状态码是 `200`，如果业务中要用别的状态码表示成功，则需要配置：

``` javascript
KISP.config({
	'API': {
	    successCode: 0, //假设成功码为 0，其它的均表示失败
    }
});

```

##后台接口 Url 的组成

在一个轻应用业务中，前端一般要请求多个后台 API 接口才能完成某种操作，而这些 API 接口往往具有某些共同的特征，如接口 Url 的前缀和后缀都是相同的，只有中间部分的短名称是不同的。为了让业务开发者以更简单的方式去使用这些有共同特征的 API 接口，KISP 框架把 API 接口的 Url 进行了拆分，以提高复用性。

序号 | 名称 | 类型 | 必选 | 描述 
------| ---- |  ---- | ---- |----
0 | prefix | 前缀 | 是 | url 的前缀部分
1 | name | 短名称 | 是 |url 中的 API 接口名称
2 | ext | 扩展名 | 否 | url 中的 API 接口名称的扩展名

一个完整的 `url = prefix + name + ext`;
我们来看一个具体的例子：
- http://mob.cmcloud.cn/ServerCloud/vCRM/GetCardList.do
- http://mob.cmcloud.cn/ServerCloud/vCRM/GetCard.do
- http://mob.cmcloud.cn/ServerCloud/vCRM/CreateCard.do

这三个 API 接口中，前缀共同部分都是 `http://mob.cmcloud.cn/ServerCloud/vCRM/`，
扩展名都是 `.do`，而短名称分别为 `GetCardList`、`GetCard`、`CreateCard`。
因此，在使用 API 前，可以先进行配置：

``` javascript

KISP.config({
	'API': {
		url: 'http://mob.cmcloud.cn/ServerCloud/vCRM/', //表示前缀
        ext: '.do',
	},
});
```
然后加载 KISP 框架的 API 公开模块，使用短名称构造 API 实例即可。

``` javascript

var API = KISP.require('API');
var api = new API('GetCardList');
//var api = new API('GetCard');
//var api = new API('CreateCard');

```
通过能后台 API 接口 Url 的拆分，我们可以以一种简单的方式来使用，提高效率。

##事件

> 在 KISP 里，http 的请求都是异步的，这意味着发起一个请求后，后续代码逻辑会继续执行而无需中断以等待返回结果。请求后的结果，有成功、失败和错误三种，当失败时，不同的状态码又有不同的含义。

###回调函数的方式

接收异步请求的返回结果，传统的方式是使用回调函数，即在发起请求之前把要接收返回结果的回调函数作为参数传进去，当请求结束时，会根据请求结果进行相应的调用，对应三种结果，须提供三个回调函数：
- 成功：fnSuccess
- 失败：fnFail
- 错误：fnError

``` javascript
//假如发起调用的方法名为 ajax()
ajax(config, fnSuccess, fnFail, fnError);
```
一般三个回调函数是匿名函数，会直接写在调用方法 ajax() 的参数里，如
``` javascript
ajax({
	//一些必需的参数和数据
	
}, function (data, json) { //成功时的回调，即 fnSuccess
	//这里处理请求成功时的逻辑
	
}, function (code, msg, json) { //失败时的回调，即 fnFail
	//这里处理请求失败时的逻辑
	
}, function (xhr) { //错误时的回调，即 fnError
	//这里处理请求错误时的逻辑
	
});
```
这种方式直观、简单，易实现，但代码可读性很不好，尤其在三个回调函数逻辑比较多、代码量比较大时更加严重。当然，也可以把三个回调函数直接弄到参数 config 中，但仍然没改变要讨论的问题。

###事件驱动的方式

为了解决传统调用方式带来的代码可读性差的问题，KISP 在处理接收异步请求返回的结果时使用了 **事件驱动** 的方式，即把回调函数注册到特定状态所对应的事件里，当异步请求返回结果时，会根据结果状态触发特定的事件，从而执行回调函数。我们来看：

``` javascript
	var API = KISP.require('API');
	var api = new API('GetCardList');
	
	api.on('success', function (data, json) {
		//这里处理请求成功时的逻辑
	});
	
	api.on('fail', function (code, msg, json) {
		//这里处理请求失败时的逻辑 --1
	});
	
	//作为示例，这里重复绑定 fail 事件，也是允许的
    api.on('fail', function (code, msg, json) {
		//这里处理请求失败时的逻辑 --2
	});
	
	api.on('error', function (xhr) {
		//这里处理请求错误时的逻辑
	});
	
	//作为示例，这里绑定一个永远不会触发的事件 'my-test'
    api.on('my-test', function (code, msg, json) {
		
	});
	
	api.post({ }); //这里发起 post 请求，并传递一些数据
```
通过事件注册(事件绑定)的方式，代码的可读性提高了很多。这还带来额外的好处：事件绑定可以多处使用，即使对同一个事件名进行多次的绑定也是允许的；甚至绑定一个不存在的事件名也是允许的，唯一的后果只是它永远不会给触发而执行。因此如果有必要，可以把很大的回调函数拆分成多个小函数并绑定到特定事件上，让代码可读性更好。

注意：事件绑定与发起请求(get/post)是分开的，两者没有顺序关系。 这意味着你可以先发起请求，即使请求结果已经返回了，你再绑定事件也是允许的并且会正确执行。KISP 在实现这种机制时使用了类似于 jQuery 中的延迟对象 Deferred 的技术，具体来说，当结果已经返回后再绑定事件，被绑定的事件回调函数会立即触发；否则会被注册到回调列表中等待触发调用。

###事件列表

除了上述三种事件，KISP 的 API 的模块里还提供更多的事件，并且它们有一定的触发条件和时序的：

序号 | 事件名 | 触发时机 | 作用
------ | ----- | ----- | ------
1 | `request` | 发起请求前 | 发起 `get` 或 `post` 请求前会触发，适用于请求前的预处理，如显示 `加载中...` 组件
2 | `response` | 接收到响应后 | 在接收到响应后会首先触发该事件，适用于请求后的统一处理，如隐藏 `加载中...` 组件
3 | `code` | 接收到响应后 | 会触发 `code` 及其值所对应所组成的二级事件，如 `('code', 200)`，适用于绑定具体错误码对应的处理逻辑
4 | `status` | 接收到响应后，且不使用 `proxy` 时 | 会触发 `xhr.status` 及其值所对应所组成的二级事件，如 `('status', 404)`，适用于绑定 `http` 协议层状态码对应的处理逻辑
5 | `success` | 接收到响应后，且 `code == successCode` 时  | 业务主要逻辑要注册到该事件上
5 | `fail` | 接收到响应后，且 `code != successCode` 时 | 响应数据不满足业务要求时
5 | `error` | 请求完成，且无响应结果 | 网络错误、网络无法连接等，发生的概率较小，但也要监听
6 | `done` | 请求完成 | 请求结束后总会触发该事件，不管成功与失败，适用于作些后期处理

###事件绑定

如前面的例子所示，要给一个 `API` 实例绑定事件很简单，只需要调用 `on(name, fn)` 进行绑定即可。
实际上 `on()` 方法还支持批量绑定，只需要传一个 Object 对象 {} 进去即可 `on({ ... })`。 如：

``` javascript
    var API = KISP.require('API');
    var api = new API('Test');
    api.on({
        'request': function () { },
        'response': function () { },
        'success': function () { },
        'fail': function () { },
        'error': function () { },
        'done': function () { },

        'code': { //二级事件
            200: function () { },
            500: function () { },
        },

        'status': { //二级事件
            304: function () { },
            404: function () { },
        },
    });
```

除了调用标准的 `on()` 方法进行绑定外，API 类还提供了以下几个方式进行对应事件的快速绑定：
- `success(fn)`
- `fail(fn)`
- `error(fn)`
- `done(fn)`
- `status(status, fn)`
- `code(code, fn)`

如 `success(fn)` 等价于 `on('success', fn)` 的调用，其它的类似。
注意 `status()` 和 `code()` 绑定的为二级事件：
- `status(status, fn)` 等价于 `on('status', status, fn)`，如 `status('404', fn)`
- `code(code, fn)` 等价于 `on('code', code, fn)`，如 `code('200', fn)`

**推荐：使用标准的 `on()` 进行绑定更安全更直观，可防止后续 KISP 库升级导致的快捷绑定不可用。**


##发起请求

如前述例子所示，发起请求的方式有 `GET` 和 `POST` 两种，API 类也提供了对应的 `get()` 和 `post()` 两个方法。 
要使用何种方式，要基于以下几点进行考虑：
- 发送的数据量
- 安全性要求
- 服务器接口的支持

### get 请求
当要发送的数据量比较小，且对安全性要求不高时，可使用 `get` 方式进行请求。 发送 `get` 请求时，要发送的数据将会序列化成查询字符串，并且拼接在 url 中。
由于不同浏览器对 url 的长度有不同的限制，因此 `get` 方式不适合发送大数据量。 我们来看一个具体的 `get` 请求：

``` javascript

    var API = KISP.require('API');
    var api = new API('GetCardList', {
        url: 'http://mob.cmcloud.cn/ServerCloud/vCRM/',
    });
    api.get({
        pageNo: 1,
        pageSize: 10,
        eid: 517531,
        skey: '',
    });
```
抓包后的结果是：
`http://mob.cmcloud.cn/ServerCloud/vCRM/GetCardList?pageNo=1&pageSize=10&skey=&eid=517531`

由此可见，要发送的数据会给序列化成查询字符串并附加到 url 中，因此只适合用于发送轻量级数据的请求。

### post 请求
跟 `get` 请求不同，`post` 请求使用更自由，对发送的数据量没有限制，同时安全性也更高，几乎任何可以使用 `get` 方式的场景都可以使用 `post` 方式(当然要服务器支持才行)。
但要慎用、少用，因为 `post` 请求是个重量级的方式，在性能消耗上比 `get` 方式更高。 因此应该优先考虑使用 `get` 方式而不是 `post` 方式，只有当 `get` 方式无法满足要求时才使用 `post` 方式。

``` javascript

    var API = KISP.require('API');
    var api = new API('GetCardList', {
        url: 'http://mob.cmcloud.cn/ServerCloud/vCRM/',
    });

    var data = { //表单数据
        pageNo: 1,
        pageSize: 10,
        eid: 517531,
        skey: '',
    };

    var query = { //该数据会给序列化成查询字符串并附加到 url 后
        a: 100,
        b: 200,
    };

    api.post(data, query);

```
抓包后的结果是：
`http://mob.cmcloud.cn/ServerCloud/vCRM/GetCardList?a=100&b=200`
而表单数据会在 `Form-Data` 中存在，这里不进行详细的讨论，有兴趣的同学可以自行抓包分析。
值得注意的是：使用 `post` 请求时，依然可以传递一些查询参数，是可选的，该数据会给序列化成查询字符串并附加到 url 后。

##本地代理
本地代理可以让对一个 API 的请求映射到本地的一个 js 或 json 文件，从而模拟服务器响应。 
在开发阶段代理技术提供了一种快速模拟服务器响应内容的方法，可以很方便的给前端提供数据，而不必请求真实的后台接口。
具体请见 [Proxy 本地代理](?file=docs/Proxy.md)

##KISP 中的 API 模块的默认配置
为了方便业务开发者，KISP 框架的模块会内置了一些默认的配置，在大多数的情况下，开发者无需配置即可直接使用里面的模块。当然，框架也提供了让开发者重新配置的能力，新的配置和会默认配置进行深度合并覆盖。以下是  KISP 的 API模块的默认配置。
``` javascript
KISP.config({
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

		url: '',
		ext: '',
		name: '',
		
		//发起 get/post 请求的时要发送的数据
		data: null,
		
		//发起 post 请求时要附加在 url 中的数据，仅在 post 有效
		query: null,

		//代理
		proxy: null,
		
		//预绑定事件，如果指定则会在构造实例时调用 this.on() 进行绑定
		done: null,
        success: null,
        fail: null,
        error: null,
        code: null,
        status: null,

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
    }
});
``` 

---------------------------------------------------------------