/**
* Alert 模块的默认配置
* @name Alert.defaults
*/
define('Alert.defaults', /**@lends Alert.defaults*/ {
    volatile: false,
    mask: true,
    autoClose: true,
    width: '80%',
    'z-index': 99999,

    buttons: [
       { text: '确定', cmd: 'ok', cssClass: 'OK', },
    ],
});

