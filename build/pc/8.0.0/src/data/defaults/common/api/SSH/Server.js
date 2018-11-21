/**
* SSH/Server 模块的默认配置
* @name SSH/Server.defaults
*/
define('SSH/Server.defaults', /**@lends SSH/Server.defaults*/ {
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
});

