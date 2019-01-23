
/**
* 针对各浏览器的动画结束事件名称。
*/
define('TransitionEnd/EventName', function (require, module, exports) {

    //针对各浏览器的动画结束事件名称。
    var prop$name = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
    };


    function get() {
        var div = document.createElement('div');

        var prop = Object.keys(prop$name).find(function (prop) {
            return div.style[prop] !== undefined;
        });

        return prop$name[prop];
    }


    var name = '';



    return {

        /**
        * 
        */
        get: function () {
           
            if (!name) {
                name = get();
            }

            return name;

        },

    };


});

