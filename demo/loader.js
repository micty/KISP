


(function (global) {


    var version = '1.3.0';
    var type = 1;



    function write(src) {
        document.write('<scr' + 'ipt src="' + src + '"><\/scr' + 'ipt>');
    }

    function loadJs(a) {

        if (typeof a == 'string') {
            write(a);
        }
        else {
            for (var i = 0, len = a.length; i < len; i++) {
                write(a[i]);
            }
        }
    }



    switch (type) {

        case 0:
            global['global'] = global;

            loadJs([

                '../sdk/jquery-2.1.1.js',
                '../sdk/miniquery.debug.js',
                '../sdk/iscroll-probe.mod.debug.js',


                '../src/core/Module.js',
                '../src/core/$.js',
                '../src/core/jQuery.js',
                '../src/core/MiniQuery.js',
                '../src/core/IScroll.js',

                '../src/crypto/Base64.js',
                '../src/crypto/DES.js',
                '../src/crypto/MD5.js',
                '../src/crypto/Token.js',

                '../src/api/API.js',
                '../src/api/ServerConfig.js',
                '../src/api/ServerUrl.js',

                '../src/ui/jQuery.fn.touch.js',
                '../src/ui/Scroller.js',
                '../src/ui/Views.js',

                '../src/KISP.js',

            ]);
            break;

        case 1:
            loadJs('../sdk/kisp.all-' + version + '.debug.js');
            break;


        case 2:
            loadJs('../sdk/kisp.all-' + version + '.min.js');
            break;
    }


})(this);