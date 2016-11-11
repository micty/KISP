
/**
*
*/
define('Toast/Sample', function (require, module, exports) {
    
    var name$sample = {};


    function get(name) {
        var sample = name$sample[name];
        if (sample) {
            return sample;
        }

        sample = require(module, name);
        name$sample[name] = sample;
        return sample;
    }



    return {
        get: get,
    };


});

