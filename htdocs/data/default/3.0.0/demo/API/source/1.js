

KERP.Tips.hide();

var API = KERP.require('API');
var api = new API('demo/1');

//请求失败时触发。
api.fail(function (code, msg, json) {
    debugger;
});

//请求错误时触发。
api.on('error', function (data, json) {
    debugger;
});

api.on({

    //请求完成时触发。
    //不管请求完成后是成功、失败、错误，都会触发，会最先触发此类事件。
    'done': function () {
        debugger;
        KERP.Tips.info('请求完成!', 2000);
    },

    //请求成功时触发。
    //成功是指网络请求成功，且后台业务返回的数据包中的 code == 200 的情形。
    'success': function (data, json) {
        debugger;
    },

    //请求失败时触发。
    //失败是指网络请求成功，但后台业务返回的数据包中的 code != 200 的情形。
    'fail': function (code, msg, json) {
        debugger;

    },

    //请求错误时触发。
    //错误是指网络请求不成功，如网络无法连接、404错误等。
    'error': function () {
        debugger;
    },
});

KERP.Tips.loading('请求中...');

//发起 GET 请求
api.get({
    pageSize: 10,
    pageNo: 1,
});

//请求成功时触发。
api.on('success', function (data, json) {
    debugger;
});