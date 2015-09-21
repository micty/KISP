
##后台数据请求
---------------------------------------------------------------

>任何 Web 开发都离不开后台数据的请求，尤其在前后端分离的开发模式下，前端通过 Ajax 请求后台获取业务数据更是必不可少的。

###数据来源
在金蝶 KIS 的 Web 业务中，后台数据的来源一般分为两种：
- Cloud 服务器（云服务器）
- SSH 服务器（通道服务器）


**云服务器**：这种情况最简单，根据给定 Url 直接请求服务器即可拿到业务数据。

**SSH 服务器**：这种情况稍微复杂点，需要先请求一台中转服务器，以拿到一些必需的信息(`中转信息`)，再以这些信息去请求真实的服务器方可获取到业务数据。当然，仅第一次请求时需要去中转服务器获取中转信息，然后缓存起来，在后续的请求中，可以复用缓存的中转信息，直接请求真实的服务器。

###对服务器的要求
要使用 KISP 框架去请求后台数据，需要服务器满足两方面的要求：
- 1.允许跨域。
- 2.返回指定格式的数据。

####跨域
由于浏览器安全策略的限制，Ajax 请求会受到跨域的限制，即请求域必须要和响应域是同一个域，否则浏览器报错。解决跨域问题的方法很多，在 HTML5 的标准下，最简单的方法是让服务器在响应头里添加一个 HTTP 头：

`Access-Control-Allow-Origin: *`

在不考虑安全性时，该方法最简单快捷，在开发阶段也非常方便，是目前金蝶 KIS 普遍使用的方法。

####数据格式
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

值得注意的是，**当业务数据字段与标准字段一致时，则不需要作映射配置**。

###状态码
对于 http 协议层来说，请求的结果无非两种：成功和错误。错误 表示网络错误、网络无法连接等，根本无法与后台服务器进行通信。成功则表示请求后台有数据回来，从业务逻辑上可进一步分成功和失败，其中失败表示响应数据无法满足业务要求。具体区别如下：

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

###后台接口 Url 的组成

在一个轻应用业务中，前端一般要请求多个后台 API 接口，这些 API 接口往往具有某些共同的特征，如接口 Url 的前缀和后缀都是相同的，只有中间部分的接口名是不同的。为了让业务开发者以更简单的方式去使用这些有共同特征的 API 接口，KISP 框架把 API 接口的 Url 进行了拆分，以提高复用性。

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

这三个 API 接口中，前缀部分都是 `http://mob.cmcloud.cn/ServerCloud/vCRM/`，
扩展名为 `.do`，而短名称分别为 `GetCardList`、`GetCard`、`CreateCard`。
因此，在使用 API 前，可以先进行配置：

``` javascript

KISP.config({
	'API': {
		url: 'http://mob.cmcloud.cn/ServerCloud/vCRM/',
        ext: '.do',
	},
});
```
然后加载 API 模块，使用短名称构造 API 实例即可。

``` javascript

var API = KISP.require('API');
var api = new API('GetCardList');
//var api = new API('GetCard');
//var api = new API('CreateCard');

```




KISP 中的 API 模块的默认配置：
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