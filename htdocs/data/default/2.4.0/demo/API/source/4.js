
//这里请求一个不存在的 api，以模拟网络错误，会触发 error 事件
new KERP.API('demo/none', {

    pageSize: 10,
    pageNo: 1,

}).get().fail(function (code, msg, json) {

    debugger;

}).error(function () {

    debugger;

}).done(function (data, json) {

    debugger;

}).fail(function (code, msg, json) {

    debugger;

}).on({
    '200': function (data, json) {
        debugger;
    },

    '205': function (msg, json) {
        debugger;
    },

    'error': function (msg, json) {
        debugger;
    }
});