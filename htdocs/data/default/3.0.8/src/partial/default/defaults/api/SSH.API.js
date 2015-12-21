/**
* SSH.API 模块的默认配置
* @name SSH.API.defaults
*/
define('SSH.API.defaults', /**@lends SSH.API.defaults*/ {
    
    //解析 SSH 返回的 json 中的字段

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
        data: 'Data',
    },

    // SSH 需要用到的。
    //下面这些字段在使用时会优先级会高于 SSH 节点中的

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
    * 当 http 协议层发送错误时的默认错误消息文本。
    */
    msg: '网络繁忙，请稍候再试',
});

