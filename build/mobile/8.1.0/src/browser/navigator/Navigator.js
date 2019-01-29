
/**
* 基于浏览器地址栏 hash 的状态导航器。
* @class
* @name Navigator
*/
define('Navigator', function (require, module, exports) {
    var $String = require('String');
    var Defaults = require('Defaults');
    var Emitter = require('Emitter');
    var Back = module.require('Back');
    var Meta = module.require('Meta');
    var Hash = module.require('Hash');
    var Infos = module.require('Infos');
    var Router = module.require('Router');
    var Storage = module.require('Storage');

    var mapper = new Map();


    /**
    * 构造器。
    * 已重载 Navigator(config);
    * 已重载 Navigator(id, config);
    */
    function Navigator(id, config) {
        if (typeof id == 'object') {
            config = id;
        }
        else {
            config = Object.assign({ 'id': id, }, config);
        }


        config = Defaults.clone(module.id, config);

        var emitter = new Emitter(this);
        var router = Router.create();
        var storage = Storage.create(config);


        var meta = Meta.create(config, {
            'emitter': emitter,
            'router': router,
            'storage': storage,
            'this': this,
        });

        mapper.set(this, meta);


        Object.assign(this, {
            'id': meta.id,
            '_meta': meta,   //暂时暴露。
        });

        //是否启用模拟传统多页面的路由转换器。
        if (config.simulate) {
            this.route(Navigator.simulate);
        }
    }



    Navigator.prototype = {
        constructor: Navigator,

        /**
        * 当前实例 id。
        */
        id: '',

        /**
        * 渲染。
        * 启用并开始 hash 监听。
        */
        render: function () {
            var meta = mapper.get(this);

            //自动启用。
            this.enable(true);

            if (!meta.rendered) {
                Hash.init(meta);
            }
        },

        /**
        * 设置 hash 与 view 的路由关系。
        * 即 hash 与 view 之间的映射转换关系。
        *   options = {
        *       静态如果明确指定为 null，则清空之前的。
        *       否则，合并覆盖。
        *       view$hash: {},
        *       hash$view: {},
        *
        *       //视图到 hash 的转换函数。 
        *       //在调用 to() 方法时会先调用此函数。 
        *       //如 `UserList` -> `/user-list.html`。
        *       //该函数会接收到参数: view，传入的视图名，如 `UserList`。 
        *       //该函数应该返回要生成的 hash 值，如 `/user-list.html`。
        *       toHash: function (view) { },
        *
        *       //hash 到视图的转换函数。 
        *       //在触发某个事件时，会把相应的 hash 作转换，以还原回原来的视图名。 
        *       //如 `/user-list.html` -> `UserList`
        *       //该函数会接收到参数: hash，地址栏中的 hash 值，如 `/user-list.html`。 
        *       //该函数应该返回要还原的视图名，如 `UserList`。
        *       toView: function (hash) { },
        *   };
        */
        route: function (options) {
            var meta = mapper.get(this);
            var router = meta.router;
            var view$hash = options.view$hash;
            var hash$view = options.hash$view;
            var toHash = options.toHash;
            var toView = options.toView;

            //如果明确指定为 null，则清空之前的。
            //否则，合并覆盖。
            if (hash$view === null) {
                router.hash$view = {};
            }
            else {
                Object.assign(router.hash$view, hash$view);
            }

            if (view$hash === null) {
                router.view$hash = {};
            }
            else {
                Object.assign(router.view$hash, view$hash);
            }
            

            if (typeof toHash == 'function') {
                router.view2hash = toHash;
            }

            if (typeof toView == 'function') {
                router.hash2view = toView;
            }

        },

        /**
        * 跳转到新视图，并传递一些参数。
        * @return {Object} 返回目标视图信息。
        */
        to: function (view, ...args) {
            if (typeof view != 'string') {
                throw new Error('参数 name 必须为 string 类型。');
            }


            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var current = meta.hash$info[meta.hash];    //跳转之前，原来的 hash 对应的视图信息。
            var target = Infos.set(meta, view, args);   //


            //已禁用。
            if (!meta.enabled) {
                return target;
            }

            
            if (target.hash != meta.hash) {
                meta.fireEvent = false;
                Hash.set(target.hash);
            }

            var cache = false;

            //优先用指定的。
            if ('cache' in target) {
                cache = target.cache;
                delete target.cache;    //一次性的，用完即删。
            }


            if (current) {
                emitter.fire('to', [current.view, view, {
                    'cache': cache,  
                    'current': current,
                    'target': target,
                }]);
            }

            //此处的 target 必不为空。
            emitter.fire('view', [view, args, {
                'cache': cache,
                'current': current,
                'target': target,
            }]);

            if (current) {
                emitter.fire('forward', [current.view, view]);
            }

            return target;

        },

        /**
        * 后退。
        * 已重载 back();           //只回退一步，且触发事件。
        * 已重载 back(fireEvent);  //只回退一步，且指定是否触发事件。
        * 已重载 back(step);       //回退到指定的步数，且触发事件。
        * 已重载 back(target);     //回退指定的视图，且触发事件。
        * 已重载 back(options);    //更多配置。
        *   options = {
        *       fireEvent: true,    //是否触发事件。
        *       target: 1,          //后退的步数，只能是正数。
        *       target: '',         //后退的目标视图名。
        *
        *       //后退到目标视图，是否要禁用缓存。 
        *       //如果指定为 false，则目标视图会强制刷新。 
        *       //该字段是一次性的，只针对本次后退有效。
        *       cache: false,
        *   };
        */
        back: function (options) {
            switch (typeof options) {
                case 'boolean':
                    options = { 'fireEvent': options, };
                    break;

                case 'number':
                case 'string':
                    options = { 'target': options, };
                    break;

                default:
                    options = options || {};
            }

            var meta = mapper.get(this);
            var offset = Back.getOffset(meta, options.target);  //为负数。
            var fireEvent = options.fireEvent;
            var cache = options.cache;
            var target = this.get(offset);


            meta.fireEvent = fireEvent === undefined ? true : !!fireEvent;  //如果未指定，则为 true。

            if (target && typeof cache == 'boolean') {
                target.cache = cache;
            }

            history.go(offset);

            return target;
        },

        /**
        * 获取指定的目标视图信息。
        * 已重载 get();        //获取全部视图信息，返回一个数组，按时间升序排序。
        * 已重载 get(offset);  //获取指定偏移位置的目标视图信息，返回一个对象。
        * 已重载 get(view);    //获取指定视图名称的目标视图信息，返回一个对象。
        * 参数：
        *   view: '',   //目标视图名称。
        *   offset: 0,  //当前视图的偏移量为 0，比当前视图时间更早的，则为负数；否则为正数。
        */
        get: function (view) {
            var meta = mapper.get(this);
            return Infos.get(meta, view);
        },


        /**
        * 清空缓存和地址栏中的 hash。
        */
        clear: function () {
            var meta = mapper.get(this);

            if (meta.storage) {
                meta.storage.clear();
            }

            meta.fireEvent = false;
            meta.hash$info = {};
            Hash.set('');
          
        },

        /**
        * 除了指定的视图信息，其它的全清除。
        */
        reserve: function (view) {
            var meta = mapper.get(this);
            var hash = meta.router.toHash(view);
            var info = meta.hash$info[hash];

            meta.hash$info = {
                [hash]: info,
            };

            if (meta.storage) {
                meta.storage.set('hash$info', meta.hash$info);
            }
        },

        /**
        * 设置启用或禁用。
        */
        enable: function (enabled) {
            var meta = mapper.get(this);
            meta.enabled = !!enabled;
        },

        /**
        * 绑定事件。
        */
        on: function (...args) {
            var meta = mapper.get(this);
            meta.emitter.on(...args);
        },

    };


    //静态成员。
    
    Object.assign(Navigator, {

        /**
        * 提供一种常用的模拟传统多页面的路由转换器。
        * 设置 hash 与 view 的双向映射转换关系。
        * 如 `AccountUsers` <-> `/account-users.html`。
        */
        simulate: {
            //把 view 转成 hash。
            toHash: function (view) {
                if (!view) {
                    return view;
                }

                view = $String.toHyphenate(view);   // `AccountUsers` -> `-account-users`。
                view = view.slice(1);               //`-account-users` -> `account-users`。
                view = `/${view}.html`;             //`account-users` -> `/account-users.html`。

                return view;
            },

            //把 hash 转成 view。
            toView: function (hash) {
                //确保如 `/xx.html` 的格式。
                if (!(/^\/.+\.html$/).test(hash)) {
                    return hash;
                }

                hash = hash.slice(1, -5);
                hash = $String.toCamelCase(hash);
                hash = hash[0].toUpperCase() + hash.slice(1);

                return hash;
            },
        },

    });

    return Navigator;


});


