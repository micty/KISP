
/**
* jQuery ��������ռ䡣
* �������ռ���ں� MiniQuery �ĳ�Ա����˴����������ȱ�ʾ jQuery���ֱ�ʾ MiniQuery��
* @namespace
* @name $
*/
define('$', function (require, module, exports) {
    MiniQuery.use('jQuery');
    return jQuery;
    //return $;
});