/**
* SSH 模块的默认配置
* @name SSH.defaults
*/
define('SSH.defaults', /**@lends SSH.defaults*/ {

    /**
    * API 接口 Url 的后缀部分。
    * 针对那些如 '.do'、'.aspx' 等有后缀名的接口比较实用。
    * 这里固定为空字符串，业务层不需要关注该字段。
    */
    ext: '',

    /**
    * 成功的状态码。 
    * 只有状态码为该值是才表示成功，其它的均表示失败。
    */
    successCode: 200,

    /**
    * 字段映射。
    */
    field: {
        /**
        * 状态码。
        */
        code: 'Result',
        /**
        * 消息。
        */
        msg: 'ErrMsg',
        /**
        * 主体数据。
        */
        data: 'DataJson',
    },

    /**
    * 代理配置。
    */
    proxy: null,

    /**
    * 接口名称中的前缀部分。
    * 主要针对一个轻应用中有公共前缀部分的批量接口，设置了公共前缀部分，后续的调用只用后部分简短名称即可。
    */
    prefix: '',

    //必选的

    /**
    * 企业号。 必选。
    */
    eid: '',

    /**
    * openid。 必选。
    */
    openid: '',

    //可选的

    /**
    * appid。 可选的。
    */
    appid: '',

    /**
    * netid。 可选的。
    */
    netid: '',

    /**
    * pubacckey。 可选的。
    */
    pubacckey: '',

    /**
    * timestamp。 可选的。
    */
    timestamp: '',

    /**
    * nonce。 可选的。
    */
    nonce: '',

    /**
    * pubaccid。 可选的。
    */
    pubaccid: '',

    /**
    * 要发送的数据。 可选的。
    */
    data: null,

    /**
    * 是否用 console 把 CustData 打印出来。
    * 由于 CustData 给编码了成字符串，为了便于查看原始对象结构而打印到控制台。
    */
    console: true,

    /**
    * 请求超时的最大值(毫秒)。
    * 0 表示由浏览器控制，代码层面不控制。
    */
    timeout: 0,

});

