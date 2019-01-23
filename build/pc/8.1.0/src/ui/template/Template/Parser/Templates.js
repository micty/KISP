
/**
* 
*/
define('Template/Parser/Templates', function (require, module, exports) {
    var $String = require('String');
    var $Object = require('Object');


    /**
    * ��ȡָ�� template �ڵ�ĸ��� template �ڵ�(��
    */
    function getParent(tpl) {
        tpl = tpl.parentNode;

        while (tpl) {

            if (tpl.nodeName == 'template') {
                return tpl;
            }

            tpl = tpl.parentNode;
        }

        return null;
    }




    return {


        /**
        * �����е� template �ڵ���Ϣ��ȡ������
        * ����һ���ɶ��� template �ڵ��Ӧ��������Ϣ������ɵ����顣
        */
        get: function (dom) {
            var tpls = dom.getElementsByTagName('template');
            var tpl$item = new Map();

            var list = tpls.map(function (tpl) {
                var attributes = tpl.attributes;
                var innerHTML = tpl.innerHTML;

                var item = {
                    'id': tpl.id || '',
                    'name': tpl.name || '',
                    'placeholder': attributes.placeholder || '',
                    'innerHTML': innerHTML,
                    'outerHTML': tpl.outerHTML,
                    'node': tpl,
                    'sample': innerHTML,
                    'parent': null,
                    'attributes': attributes,
                    'items': [],    //ֱ���¼��б�
                };

                tpl$item.set(tpl, item);

                return item;
            });


            var roots = list.filter(function (item) {
                var tpl = getParent(item.node);
                var parent = tpl$item.get(tpl);

                //�ռ����ڵ㡣
                if (!parent) {
                    return true;
                }

                //˳�㴦��һ��������
                item.parent = parent;
                parent.items.push(item);

                //�滻����ģ���ڸ�ģ���е����ݡ�
                var sample = parent.sample;
                var outerHTML = item.outerHTML;
                var placeholder = item.placeholder;

                if (placeholder) {
                    placeholder = '{' + placeholder + '}';
                }

                parent.sample = sample.replace(outerHTML, placeholder);

            });

            return roots;
        },

    };


});

