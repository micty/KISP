
/**
* б�ʡ�
*/
define('ViewSlider/Slide/Gradient', function (require, module, exports) {


    return {
        /**
        * ���㻬���ľ���б�ʡ�
        * �������ϻ��������»�����ȡ��ֵ����ȷ��б��Ϊ����
        */
        get: function (y0, y1, dx) {
            var dy = y0 - y1;
            var k = dy / dx;

            return Math.abs(k);
        },
    };


});

