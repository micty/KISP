
define('App/Transition', function (require, module, exports) {
    var $ = require('$');


    var p$eventName = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    };

    var eventName = '';

    function getEventName() {

        if (eventName) {
            return eventName;
        }


        var el = document.createElement('div');

        for (var p in p$eventName) {

            if (el.style[p] !== undefined) {
                eventName = p$eventName[p];
                return eventName;
            }
        }
    }


    return {
        getEventName: getEventName,
    };


});

