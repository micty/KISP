##API接口请求

>请求后台接口的模块。




- **多种使用方式，更加灵活**
- **面向对象的设计**
- **事件驱动**
- **实例方式**
- **静态方式**
- **提供基于错误码的分支回调**


#### 构造函数中的配置字段 config

名称 | 类型 | 必选 | 默认值 | 描述 
---- |
`name` | `string` | 是 | `null` | 后台接口的名称
`data` | `Object` | 否 |  `null` | 要发送的数据
`query` | `Object` | 否 |  `null` | 要发送的查询数据，仅在 post 时有效

#### 支持的事件类型
名称 | 功能 | 描述 
---- |
`done` | 请求`完成`时触发 | 不管请求完成后是成功、失败、错误，**都会触发，且会最先触发此类事件**。
`success` | 请求`成功`时触发 | 成功是指网络请求成功，且后台业务返回的数据包中的 code == `200` 的情形。
`fail` | 请求`失败`时触发 | 失败是指网络请求成功，但后台业务返回的数据包中的 code != `200` 的情形。
`error` | 请求`错误`时触发 | 错误是指网络请求不成功，如网络无法连接、`404`错误等。
`200` | 请求`成功`时触发 | 会先触发 `success` 事件，再触发此事件。
`500` | code == `500` 时触发 | 会先触发 `fail` 事件，再触发此事件。
`...` | code == `...` 时触发 | 会先触发 `fail` 事件，再触发此事件。

#### 实例方法

``` javascript
{

    /**
    * 发起 GET 网络请求。
    * 请求完成后会最先触发相应的事件。
    * @param {Object} [data] 请求的数据对象。
    *   该数据会给序列化成查询字符串以拼接到 url 中。
    * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
    */
    get: function (data) { },

    /**
    * 发起 POST 网络请求。
    * 请求完成后会最先触发相应的事件。
    * @param {Object} [data] POST 请求的数据对象。
    * @param {Object} [query] 查询字符串的数据对象。
    *   该数据会给序列化成查询字符串，并且通过 form-data 发送出去。
    * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
    */
    post: function (data, query) { },

    /**
    * 请求完成时触发。
    * 不管请求完成后是成功、失败、错误，都会触发，会最先触发此类事件。
    * @param {function} fn 回调函数。
    * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
    */
    done: function (fn) { },

    /**
    * 请求成功时触发。
    * 成功是指网络请求成功，且后台业务返回的数据包中的 code == 200 的情形。
    * @param {function} fn 回调函数。
    */
    success: function (fn) { },

    /**
    * 请求失败时触发。
    * 失败是指网络请求成功，但后台业务返回的数据包中的 code != 200 的情形。
    * @param {function} fn 回调函数。
    * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
    */
    fail: function (fn) { },

    /**
    * 请求错误时触发。
    * 错误是指网络请求不成功，如网络无法连接、404错误等。
    * @param {function} fn 回调函数。
    * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
    */
    error: function (fn) { },

    /**
    * 绑定事件。
    * 已重载 on({...}，因此支持批量绑定。
    * @param {string} name 事件名称。
    * @param {function} fn 回调函数。
    * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
    */
    on: function (name, fn) { },


    /**
    * 解除绑定事件。
    * 已重载 off({...}，因此支持批量解除绑定。
    * @param {string} [name] 事件名称。
    *   当不指定此参数时，则解除全部事件。
    * @param {function} [fn] 要解除绑定的回调函数。
    *   当不指定此参数时，则解除参数 name 所指定的类型的事件。
    * @return {API} 返回当前 API 的实例 this，因此进一步可用于链式调用。
    */
    off: function (name, fn) {  },
}
```