





//KISP.API.post({
//    name: 'kis.APP002129.uequery.KisMobileController.GetTasksDetails',
//    eid: '17992',
//    openid: 'U0001-U0001-U0001-U0009',
//    data: {
//        Result: '',
//        ErrMsg: '',
//        AccountDB: '',
//        TotalPage: '',
//        CurrentPage: 1,
//        ItemsOfPage: 9999,
//        Data: {
//            Status: 3
//        }
//    }

//}, function (data, json) { //sucess

//    console.dir(data);
//}, function (code, msg, json) { //fail
//    console.dir(json);
//    console.dir(json);
//}, function () {//error
//    console.log('网络出错');
//});


var url = location.href;

if (!$.Url.hasQueryString(url, 'eid')) {

    var eid = '19953';
    var openid = 'U0001';
    var token = KISP.Token.encrypt(eid, openid);
    url = $.Url.addQueryString(url, 'token', token);
    //location.href = url;
    console.log(url);

    document.getElementById('txt').value = url;
}





