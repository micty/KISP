
/**
* jQuery 框架命名空间。
* 该命名空间会融合 MiniQuery 的成员，因此大多数情况它既表示 jQuery，又表示 MiniQuery。
* @namespace
* @name $
*/
define('$', function (require, module, exports) {
    MiniQuery.use('jQuery');
    return jQuery;
    //return $;
});