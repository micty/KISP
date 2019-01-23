
define('Alert/Dialog/Height', function (require, module, exports) {
    var $String = require('String');



    //根据文本来计算高度，大概值，并不要求很准确。
    function getHeightByLength(text) {
        text = String(text);

        var len = $String.getByteLength(text);
        var h = Math.max(len, 125);
        var max = document.documentElement.clientHeight;

        if (h >= max * 0.8) {
            h = '80%';
        }


        return h;
    }

    //根据文本来计算高度，大概值，并不要求很准确。
    function getHeightByLines(text) {
        text = String(text);

        var lines = text.split('\n');
        var h = lines.length * 25 + 60;
        var max = document.documentElement.clientHeight;

        if (h >= max * 0.8) {
            h = '80%';
        }


        return h;
    }

    



    



    return {
        /**
        * 根据文本获取对话框的高度。
        */
        get: function getHeight(text) {
            var h0 = getHeightByLength(text);
            var h1 = getHeightByLines(text);

            var h = Math.max(h0, h1);


            //保证取偶数。
            //因为奇数的高度，如 `height: 125px;`，
            //会导致 footer 的 `border-top` 变粗，暂未找到原因。
            if (typeof h == 'number') {
                h = h % 2 == 1 ? h + 1 : h;
            }

            return h;

        },
    };

});