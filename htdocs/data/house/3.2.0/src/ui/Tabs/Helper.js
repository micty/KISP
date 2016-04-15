
/**
*
*/
define('Tabs/Helper', function (require, module, exports) {

    var $ = require('$');
    



    
    function getNodes(meta) {

        //取得子节点列表
        var nodes = meta.nodes;
        if (!nodes) {
            nodes = meta.nodes = $(meta.container).find(meta.selector).toArray();
        }

        return nodes;

    }


    function getIndex(meta, node) {

        var key = meta.indexKey;
        var index = node.getAttribute(key);

        if (index) { //字符串的，不用担心 '0' 这样的情况
            return +index;
        }

        //没有指定 index，则迭代搜索
        var nodes = getNodes(meta);
        return $.Array.findIndex(nodes, function (item, index) {
            return item === node;
        });

    }

    function getNode(meta, index) {

        //取得子节点列表
        var nodes = getNodes(meta);
        return nodes[index];

    }


    function findIndex(list, key, value) {
        
        var type = typeof key;

        //findIndex(list, item)
        if (type == 'object') {
            return $.Array.findIndex(list, function (item, index) {
                return key === item;
            });
        }

        //findIndex(list, key, value)
        if (type == 'string') {
            return $.Array.findIndex(list, function (item, index) {
                return item[key] === value;
            });
        }

        //findIndex(list, fn)
        if (type == 'function') {
            return $.Array.findIndex(list, key);
        }
        
        throw new Error('无法识别的参数 key: ' + type);

    }


    return {
        getIndex: getIndex,
        getNode: getNode,
        findIndex: findIndex,

    };

});

