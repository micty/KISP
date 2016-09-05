
/**
* 模板填充
* @class
* @name Template
*/
define('Template', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    
    var Mapper = MiniQuery.require('Mapper');
    var Emitter = MiniQuery.require('Emitter');

    var Config = require('Config');

    var Multiple = module.require('Multiple');
    var Simple = module.require('Simple');
    var Static = module.require('Static');

    var mapper = new Mapper();
    
    

    function Template(container, config) {
        Mapper.setGuid(this);

        config = Config.clone(module.id, config);

        var meta = {
            'container': container,
            'names': config.names,
            'list': config.list,
            'fn': config.fn,

            'outer': config.outer,
            'root': config.root,
            'item': config.item,

            
            'emitter': new Emitter(),
            'info': null,
            'sample': '',
        };

        mapper.set(this, meta);
    }


    Template.prototype = {
        constructor: Template,

        fill: function (list, fn) {
           
            if (typeof list == 'function') {  //重载 fill(fn)
                fn = list;
                list = null;
            }
            else if (!(list instanceof Array)) { //重载 fill({})
                list = [list];
            }



            var meta = mapper.get(this);

            list = list || meta.list;
            fn = fn || meta.fn;
            

            var names = meta.names;

            var html = !names || !names.length ?
                    Simple.getHTML(meta, list, fn) :
                    Multiple.getHTML(meta, 0, list, fn);

            $(meta.container).html(html);

            meta.emitter.fire('fill');
        },

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;

            var args = [].slice.call(arguments, 0);
            emitter.on.apply(emitter, args);
        },

    };


    return $.Object.extend(Template, Static);

});
