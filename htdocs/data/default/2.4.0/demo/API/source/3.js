
var api = KERP.API('demo/3', {

    pageSize: 10,
    pageNo: 1,

}).get().success(function (data, json) { //请求成功时触发

    debugger;

}).fail(function (code, msg, json) { //请求失败时触发

    debugger;

}).error(function () { //请求错误时触发

    debugger;

}).success(function (data, json) { //请求成功时触发

    debugger;

}).fail(function (code, msg, json) { //请求失败时触发

    debugger;

}).done(function () { //请求完成时触发

    debugger;
});

api.on({

    // code == 200 时触发。
    200: function (data, json) {
        debugger;
    },

    // code == 205 时触发。
    205: function (msg, json) {
        debugger;
    },

    // code == 206 时触发。
    206: function (msg, json) {
        debugger;
    }
});