
define('Navigator/Router', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');



    return {
        create: function () {

            var $exports = {
                //静态映射表。
                //优先级高于动态映射函数的。
                view$hash: {},
                hash$view: {},

                //动态映射函数。
                //业务层可提供一个自定义的。
                view2hash: null,
                hash2view: null,


                //以下两个函数内组件内部使用。

                //把 view 转换成 hash。
                //在调用 nav.to() 时进行调用的。
                toHash: function (view) {
                    var hash = view;

                    if (view in $exports.view$hash) {
                        hash = $exports.view$hash[view];
                    }
                    else if (typeof $exports.view2hash == 'function') {
                        hash = $exports.view2hash(view);
                    }

                    hash = hash || '';

                    if (typeof hash != 'string') {
                        throw new Error('自定义的 view -> hash 的转换关系中，hash 必须为 string 类型。');
                    }

                    return hash;

                },

                //把 hash 转换成 view。
                //在触发 `view` 事件时进行调用的。
                toView: function (hash) {
                    var view = hash;

                    if (hash in $exports.hash$view) {
                        view = $exports.hash$view[hash];
                    }
                    else if (typeof $exports.hash2view == 'function') {
                        view = $exports.hash2view(hash);
                    }

                    view = view || '';

                    if (typeof view != 'string') {
                        throw new Error('自定义的 hash -> view 的转换关系中，view 必须为 string 类型。');
                    }

                    return view;
                },
            };

            return $exports;

        },
    };
});