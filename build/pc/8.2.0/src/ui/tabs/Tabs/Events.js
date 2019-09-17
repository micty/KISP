
/**
*
*/
define('Tabs/Events', function (require, module, exports) {
    var $Array = require('Array');
    var $String = require('String');
  




    return {
        /**
        * 
        */
        bind: function (meta) {
            var eventName = meta.eventName;
            var selector = meta.selector;
            var pressed = meta.pressedClass;

            meta.change = function (event) {
                var target = this;

                //每次都重新获取列表。
                //因为可能会动态添加或删除了子节点。
                var items = meta.$.find(selector).toArray(); 

                var index = items.findIndex(function (item) {
                    return item === target;
                });

                meta.this.active(index, {
                    'event': event,
                });
            };

            //针对移动端的。
            


            //针对 PC 端的。
            meta.$.on(eventName, selector, meta.change);

            meta.$.on('mousedown', selector, function (event) {
                $(this).addClass(pressed);
            });

            meta.$.on('mouseup mouseout', selector, function (event) {
                $(this).removeClass(pressed);
            });
        },

    };

});

