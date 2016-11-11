/**
* Confirm 模块的默认配置
* @name Confirm.defaults
*/
define('Confirm.defaults', /**@lends Confirm.defaults*/ {

    /**
    * 组件高度。
    * 可以指定为百分比的字符串，或指定具体的数值（单位为像素），
    */
    height: 140,

    autoClose: true,
    'z-index': 99999,
    buttons: [
        { text: '取消', },
        { text: '确定', name: 'ok', color: 'red', },
    ],


});

