
define('Mask/Meta', function (require, module, exports) {
    var $ = require('$');
    var $String = require('String');
    var RandomId = require('RandomId');


    var prefix = 'KISP-Mask-';  //����������� id ��ǰ׺���֡�
    var suffix = 4;             //����������� id ��������ֵĳ��ȡ�



    return {
        create: function (config, others) {
            var id = RandomId.get(prefix, suffix);
            var eventName = config.eventName;
            var volatile = config.volatile;

            var meta = {
                'id': id,
                'sample': '',
                'eventName': eventName,         //���� PC �˺��ƶ��ˡ� PC �˵�Ϊ `click`���ƶ��˵�Ϊ `touch`��
                'volatile': volatile,           //�Ƿ�����ʧ�ġ� ��������Զ����ء�
                'container': config.container,  //���Ҫװ������� DOM �ڵ㡣
                'duration': config.duration,    //Ҫ������ʾ��ʱ�䣬��λ�Ǻ��롣

                'emitter': null,    //�¼���������
                'style': null,      //��ʽ����
                'this': null,       //��ǰʵ���������ڲ�ʹ�á�
                '$': null,          //��������� DOM �ڵ�� jQuery ʵ����

                'bindVolatile': function (fn) {
                    if (!volatile) {
                        return;
                    }

                    if (eventName == 'touch') {
                        meta.$.touch(fn);
                    }
                    else {
                        meta.$.on(eventName, fn);
                    }
                },
            };



            Object.assign(meta, others);

            return meta;


        },
    };
});