
define('Dialog/Sample', function (require, module, exports) {
    
    var $ = require('$');

    //去掉多余的换行和空格
    function trim(s) {
        return s.replace(/\n|\r|\r\n/g, ' ')
                .replace(/\s+/g, ' ');
    }


    function get(name) {

        var sample = require(module, name);
        var samples = $.String.getTemplates(sample, [
            {
                name: 'div',
                begin: '#--div.begin--#',
                end: '#--div.end--#',
                fn: trim,
            },
            {
                name: 'header',
                begin: '#--header.begin--#',
                end: '#--header.end--#',
                outer: '{header}',
                fn: trim,
            },
            {
                name: 'footer',
                begin: '#--footer.begin--#',
                end: '#--footer.end--#',
                outer: '{footer}',
                fn: trim,
            },
            {
                name: 'button',
                begin: '#--button.begin--#',
                end: '#--button.end--#',
                outer: '{buttons}',
                fn: trim,
            },
        ]);

        return samples;
    }





    return {
        get: get,
    };


});

