
/**
* 
*/
define('Style/Margin', function (require, module,  exports) {





    return {


        /**
        * 
        */
        get: function (v) {
            switch (typeof v) {
                case 'number':
                    return (0 - v / 2) + 'px';

                case 'string':
                    if (v.endsWith('px')) {
                        v = parseInt(v);
                        return (0 - v / 2) + 'px';
                    }
            }


        },

    };



   
});


