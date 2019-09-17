
/**
*
*/
define('App/Navigator', function (require, module, exports) {
    var Tasks = require('Tasks');
    var Navigator = require('Navigator');

    

    var Views = module.require('Views');
    


    return {
        /**
        * 创建一个带视图滑动效果和滑动返回手势支持的导航器。
        *   options = {
        *       container: 'body',  //视图所要附加到的容器。
        *       preload: true,      //是否按需提前加载视图的分包资源。
        *       slide: true,        //是否启用滑动返回手势支持。
        *       animate: true,      //是否启用视图间的前进/后退的过渡动画效果。
        *       name: '',           //导航器的唯一名称。 因为一个应用里可以存在多个导航器，为区分存储中的数据，须提供一个名称。
        *       module: Module,     //业务层顶级的 module 对象。 即 KISP.launch() 方法中回调函数的第二个参数 `module`，用于加载视图。
        *   };
        */
        create: function (options) {
            var $module = options.module;
            var nav = new Navigator(options.name);

            var animateEnabled = options.animate;
            var slideEnabled = options.slide;


            //针对滑动返回的。
            //让浏览器的地址栏跟随着后退，但不触发 KISP 内部相应的事件。
            var back = function () {
                nav.back(false);
            };

            /**
            * 跳到指定视图时触发。
            * 包括主动跳转、前进、后退、刷新。
            * 实现根据目标视图的状态信息进行显示或渲染。
            */
            nav.on('view', function (target, args, info) {
                //target 可能尚未加载回来。
                Views.load(target, options, function (target) {
                    if (info.cache && target.rendered()) {
                        target.show();
                    }
                    else {
                        target.render(...args);
                    }
                });
            });

            
            if (options.preload) {
                /**
                * 通过输入地址栏的地址，或刷新浏览器时触发。
                * 根据缓存到的视图信息，按时间戳进行排序，重建滑动返回顺序的手势支持。
                */
                nav.on('immediate', function (hash, hash$info) {
                    //视图信息列表。
                    var infos = Object.keys(hash$info).map(function (hash) {
                        return hash$info[hash];
                    });

                    //按时间戳降序排序。
                    infos = infos.sort(function (a, b) {
                        return a.timestamp > b.timestamp ? -1 : 1;
                    });

                    Views.load(infos, options, function () {
                        if (!slideEnabled) {
                            return;
                        }

                        
                    });


                });
            }


            


            /**
            * 通过浏览器的前进时触发。
            * 实现从当前视图到目标视图的滑动过渡效果。
            */
            nav.on('forward', function (current, target) {
                current = $module.require(current);

                //target 可能尚未加载回来。
                Views.load(target, options, function (target) {
                    
                        current.hide();
                        target.show();
                    

                });

            });

            /**
            * 通过浏览器的后退时触发。
            * 实现从目标视图到当前视图的滑动过渡效果。
            */
            nav.on('back', function (current, target) {
                current = $module.require(current);

                Views.load(target, options, function (target) {
                    
                        current.hide();
                        target.show();

                    
                });

            });

            return nav;

        },

    };
    



  


});

