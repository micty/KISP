

(function (require) {

    var $ = require('$');

    if ($.fn.fadeOut) { //只测试一个
        return;
    }


    // Generate shortcuts for custom animations
    $.each({

        fadeIn: { opacity: 1 },
        fadeOut: { opacity: 0 },
        fadeToggle: { opacity: "toggle" },

    }, function (name, props) {

        $.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });






})(Module.require);


