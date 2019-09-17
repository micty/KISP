
define('Panel/Params', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var $Object = require('Object');



    return {
        /**
        * 针对方法 panel.$on() 提供标准化参数的能力，以支持多样化的重载情况。
        * 已重载 $on(name$selector$fn);            //绑定多个(委托)事件到多个元素上。
        * 已重载 $on(name$fn);                     //绑定多个事件到当前元素上。

        * 已重载 $on(name, selector$fn);           //绑定单个(委托)事件到多个元素上。
        * 已重载 $on(name, fn);                    //绑定单个事件到当前元素上。

        * 已重载 $on(name, sample, selector$fn);   //绑定单个(委托)事件到多个元素上，这些元素的选择器有共同的填充模板。
        * 已重载 $on(name, selector, fn);          //绑定单个(委托)事件到单个元素上。
        */
        normalize: function (name, sample, selector$fn) {
            var type = typeof name;

            //重载 $on(name$selector$fn);
            //重载 $on(name$fn);
            if (type == 'object') {
                return name;
            }

            //此时要求 name 必须为一个 string。
            if (type != 'string') {
                throw new Error(`无法识别参数 name 的类型。`);
            }


            type = typeof sample;

            //重载 $on(name, selector$fn); 
            //重载 $on(name, fn);      
            if (type == 'object' || type == 'function') {
                return { [name]: sample, };
            }


            //此时要求 sample 必须为一个 string。
            if (type != 'string') {
                throw new Error(`无法识别参数 sample 的类型。`);
            }

            type = typeof selector$fn;


            //重载 $on(name, selector, fn);
            if (type == 'function') {
                return {
                    [name]: {
                        [sample]: selector$fn,  //此时 sample 为 selector，而 selector$fn 为 fn。
                    },
                };
            }

            //重载 $on(name, sample, selector$fn);
            if (type == 'object') {
                var all = {};

                $Object.each(selector$fn, function (selector, fn) {
                    //如填充前的 sample 为 `[data-cmd="{value}"]`，且 selector 为 `print`，
                    //则填充后的 selector 为 `[data-cmd="print"]`。
                    selector = $String.format(sample, {
                        'value': selector,
                    });

                    all[selector] = fn;
                });

                return {
                    [name]: all,
                };
            }


            throw new Error(`无法识别参数 selector$fn 的类型。`);

        },
    };
});