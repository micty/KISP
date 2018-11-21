
/**
*
*/
define('Loading/Sample', function (require, module, exports) {

    return {
        get: function (name) {
            return module.require(name);
        },
    };


});

