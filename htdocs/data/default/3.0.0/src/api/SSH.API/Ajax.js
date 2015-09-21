
/**
*
*/
define('SSH.API/Ajax', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    /**
    * 发起 ajax 网络请求(核心方法)。
    */
    function post(config) {
        

        var SSH = require('SSH');
        var ssh = new SSH(config.name, config.ssh);

        //预绑定事件。
        var events = $.Object.filter(config, [
            'success',
            'fail',
            'error',
        ]);


        var fnSuccess = config.success;
        var fnFail = config.fail;
        var fnError = config.error;

        var field = config.field;

        ssh.on({
            //SSH 层请求成功了
            'success': function (json, root, xhr) { //此处 data 为 json， json 为 root

                if (!json) {
                    fnError && fnError(xhr);
                }

                var successCode = config.successCode;
                var code = json[field.code];

                if (code == successCode) {
                    fnSuccess && fnSuccess(json[field.data] || {}, json, xhr);
                }
                else {
                    fnFail && fnFail(code, json[field.msg], json, xhr);
                }
            },

            'fail': function (code, msg, json, xhr) {
                //为了让业务层能知道 SSH 层发生了 fail，通过判断 json 是否为空即可
                fnError && fnError( code, msg, json, xhr); 
            },

            'error': function (xhr) {
                //当 http 协议层连接错误，则 code, msg, json 三个参数都为 undefined
                fnError && fnError(undefined, undefined, undefined, xhr);
            },
        });


        var data = config.data;

        ssh.post({

            'openid': config.ssh.openid,

            'Result': '',
            'ErrMsg': '',
            'AccountDB': '',
            'TotalPage': '',

            'CurrentPage': data['pageNo'],
            'ItemsOfPage': data['pageSize'],

            'Data': $.Object.remove(data, [
                'pageNo',
                'pageSize'
            ]),
        });

        return ssh;
    }




    return /**@lends Ajax*/ {
        post: post,
    };

    

});


