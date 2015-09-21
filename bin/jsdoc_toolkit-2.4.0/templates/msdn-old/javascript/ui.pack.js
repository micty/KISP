//以下文件由 ant 合并生成于 2013-09-23 15:15:45



/**
* 内部使用的组件辅助工具类。
* @namespace
*/
var ComponentHelper = (function (Haf, $, ClassManager) {

    //  haf.xtype -> native.xtype
    var xtype$native = {

        actionsheet: 'ActionSheet',
        box: 'Box',
        button: 'Button',
        card: 'Card',
        carousel: 'Carousel',
        datepicker: 'DatePicker',
        dialog: 'Dialog',
        framelayer: 'FrameLayer',
        image: 'Image',
        label: 'Label',
        list: 'List',
        mask: 'ScreenMask',
        popupwindow: 'PopupWindow',
        progressbar: 'ProgressBar',
        select: 'Select',
        slider: 'Slider',
        textarea: 'TextArea',
        textinput: 'TextInput',
        toast: 'Toast',
        toggle: 'Toggle',
        webview: 'WebView'
    };

    //维护 { className: nativeXtype } 的关系。
    var className$nativeXtype = {};

    /**
    * 获取指定组件实例的真实的 native 层的 xtype。
    * 该方法会从继承关系层次向上追溯，直到找到最近的 native 层的 xtype。
    */
    function getNativeXtype(self) {

        //先从直接映射表查找
        var xtype = xtype$native[self.xtype];
        if (xtype) {
            return xtype;
        }

        //从缓存中查找
        var className = self.getType();
        xtype = className$nativeXtype[className];
        if (xtype) {
            return xtype;
        }
        
        //再从继承树查找
        var classNames = ClassManager.getSuperNames(self);

        $.Array.each(classNames, function (name, index) {

            var data = ClassManager.getData(name);
            xtype = xtype$native[data.xtype];

            if (xtype) {
                return false; //相当于 break
            }

        });

        className$nativeXtype[className] = xtype; //缓存起来
        return xtype;
    }

    
    function getNativeProps(self) {

        var props = self.nativeProps;

        if (!props) {
            return {};
        }


        var config = self.config;

        var obj =
            props instanceof Array ? //是数组，直接从 config 中把同名称的成员过滤出来
                $.Object.filter(config, props) :

            typeof props == 'object' ? //是纯对象，则重新映射
                $.Object.map(props, function (key, item) {

                    //是一个key，表示仅仅是换了名称
                    if (typeof item == 'string') {
                        return config[item];
                    }

                    if ($.Object.isPlain(item)) { //此时 item = { name: '', values: {} }

                        var name = item.name;
                        if (!(name in config)) { //config 中不包含 item.name 所指定所成员
                            return undefined;
                        }
                        
                        var value = config[name];

                        if (value in item.values) {
                            return item.values[value];
                        }

                        throw Haf.error('config.{0} 中的值不符合 nativeProps.{1} 的转换要求', name, key);

                    }

                    throw Haf.error('无法识别 nativeProps.{0} 所对应的值', key);

                }) : {}; //否则
                

        return $.Object.trim(obj);  // natvie 比较敏感，必须过滤掉非法值 null, undefined
    }



    /**
    * 判断指定的事件名称是否为指定组件的 native 事件。
    */
    function isNativeEvent(obj, name) {

        var events = isValidComponent(obj) ? obj.nativeEvents : obj;

        return $.Object.isArray(events) ?
                    $.Array.contains(events, name) :
                    (name in events);
    }

    //根据 haf 的属性名反向查找　native 属性名。
    function getNativePropName(obj, name) {

        var props = isValidComponent(obj) ? obj.nativeProps : obj; //就保持这样的重载，更灵活

        // props 是一个数组，则表示 native 的名称与 config 中的名称一致
        if ($.Object.isArray(props) && $.Array.contains(props, name)) {
            return name;
        }

        //否则，迭代查找每个成员
        return $.Object.findKey(props, function (key, item) {

            return item === name ||
                $.Object.isPlain(item) && item.name === name;
        });
    }

    /**
    * 判断指定的属性名称是否为指定组件的 native 属性。
    */
    function isNativeProp(obj, name) {

        return !!getNativePropName(obj, name);
    }

    
    
    /**
    * 判断指定的对象是否为合法的组件。
    */
    function isValidComponent(obj) {

        if (!obj || typeof obj != 'object') { //优化
            return false;
        }

        return ClassManager.isInstanceOf(obj, 'Haf.view.Component' );
    }

    

    //为了复用
    function onchangeHandler(newConfig, oldConfig) {

        var self = this;
        var isPropName = ComponentHelper.isNativeProp;
        var isStyleName = ComponentStyle.isValidName;

        $.Object.each(newConfig, function (key, value) {

            if (value === oldConfig[key]) { //值没发生改变
                return;
            }

            if (isStyleName(key) || isPropName(self, key)) {

                self.updateUI();
                return false; //break;
            }
        });
    }




    return {
        isValidComponent: isValidComponent,
        isNativeEvent: isNativeEvent,
        isNativeProp: isNativeProp,

        getNativeXtype: getNativeXtype,

        getNativeProps: getNativeProps,
        getNativePropName: getNativePropName,

        onchangeHandler: onchangeHandler
    };

})(Haf, Haf, ClassManager);



/**
* 组件管理器，在实例化/销毁组件时，需要在这里进行注册/取消注册。
* 支持根据 selector 查找组件。
*/
var ComponentManager = (function ($, Haf, ClassManager) {

    var id$component = {},

        xtype$id$component = {},

        //判断mode的正则，mode有两种：>和空格
        modeRe = /^(\s?([>\^])\s?|\s|$)/,

        //选择符表达式中分离单个选择符的正则
        tokenRe = /^(#)?([\w\-]+|\*)/;

    //Matches a token with possibly (true|false) appended for the "shallow" parameter
    //这是原st的正则
    //tokenRe = /^(#)?([\w\-]+|\*)(?:\((true|false)\))?/,

    /**
     * 从items中过滤出xtype为指定参数的组件实例数组
     */
    function filterByXType(items, xtype) {
        var result = [],
            i = 0,
            length = items.length,
            candidate;
        for (; i < length; i++) {
            candidate = items[i];
            if (candidate.xtype == xtype) {
                result.push(candidate);
            }
        }
        return result;
    }
    /**
     * 从items中过滤出id为指定参数的组件实例数组
     */
    function filterById(items, id) {
        var result = [],
            i = 0,
            length = items.length,
            candidate;
        for (; i < length; i++) {
            candidate = items[i];
            if (candidate.get('id') === id) {
                result.push(candidate);
            }
        }
        return result;
    }
    /**
     * 获取容器container的下级组件实例，deep为false表示只获取一级，true表示获取多级
     */
    function getChildren(container, deep) {
        var result = [],
            children = container.getItems ? container.getItems() : null,
            child, i;
        if (children && children.length > 0) {
            result = result.concat(children);
            if (deep) {
                for (i = 0; i < children.length; i++) {
                    child = children[i];
                    result = result.concat(getChildren(child, true));
                }
            }
        }
        return result;
    }
    /**
     * 获取items的下级组件实例，mode为>表示直接下级，其他表示所有下级
     */
    function getItems(items, mode) {
        var result = [],
            i = 0,
            length = items.length,
            candidate,
            deep = mode !== '>';

        for (; i < length; i++) {
            candidate = items[i];
            result = result.concat(getChildren(candidate, deep));
        }
        return result;
    }
    /**
     * 解析selector，返回解析结果，对于"queryformview #fieldset1 textfield"
     * 这样的选择符，解析后的结果为：
     * [
     *      {
     *          method:filterByXType,
     *          args:['queryformview']
     *      },
     *      {
     *          mode:' '
     *      },
     *      {
     *          method:filterById,
     *          args:['fieldset1']
     *      },
     *      {
     *          mode:' '
     *      },
     *      {
     *          method:filterByXType,
     *          args:['textfield']
     *      }
     * ]
     */
    function parseSelector(selector) {
        var operations = [],
            lastSelector,
            tokenMatch,
            matchedChar,
            modeMatch;

        // We are going to parse the beginning of the selector over and
        // over again, slicing off the selector any portions we converted into an
        // operation, until it is an empty string.
        while (selector && lastSelector !== selector) {
            lastSelector = selector;

            // First we check if we are dealing with a token like #, * or an xtype
            tokenMatch = selector.match(tokenRe);

            if (tokenMatch) {
                matchedChar = tokenMatch[1];

                // If the token is prefixed with a # we push a filterById operation to our stack
                if (matchedChar === '#') {
                    operations.push({
                        method: filterById,
                        args: [Haf.String.trim(tokenMatch[2])]
                    });
                }
                    // If the token is a * or an xtype string, we push a filterByXType
                    // operation to the stack.
                else {
                    operations.push({
                        method: filterByXType,
                        args: [Haf.String.trim(tokenMatch[2])]
                    });
                }

                // Now we slice of the part we just converted into an operation
                selector = selector.replace(tokenMatch[0], '');
            }
            modeMatch = selector.match(modeRe);

            // Now we are going to check for a mode change. This means a space
            // or a > to determine if we are going to select all the children
            // of the currently matched items, or a ^ if we are going to use the
            // ownerCt axis as the candidate source.
            if (modeMatch && modeMatch[1]) { // Assignment, and test for truthiness!
                operations.push({
                    mode: modeMatch[2] || modeMatch[1]
                });
                selector = selector.replace(modeMatch[0], '');
            }
        }
        return operations;
    }
    /**
     * 对items,执行operations操作，返回符合条件的结果
     */
    function executeOperations(items, operations) {
        var i = 0,
            length = operations.length,
            operation,
            workingItems = items;

        // We are going to loop over our operations and take care of them
        // one by one.
        for (; i < length; i++) {
            operation = operations[i];

            // The mode operation requires some custom handling.
            // All other operations essentially filter down our current
            // working items, while mode replaces our current working
            // items by getting children from each one of our current
            // working items. The type of mode determines the type of
            // children we get. (e.g. > only gets direct children)
            if (operation.mode) {
                workingItems = getItems(workingItems, operation.mode);
            } else {
                workingItems = operation.method.apply(this, [workingItems].concat(operation.args));
            }

            // If this is the last operation, it means our current working
            // items are the final matched items. Thus return them!
            if (i === length - 1) {
                return workingItems;
            }
        }
        return [];
    }

    



    return {
        /**
         * 注册组件，在每个组件create时(Haf.view.Component.initialize时)，会在这里注册
         * @param container
         * @param component
         */
        register: function (component) {
            var id = component.get('id');
            var xtype = component.xtype;

            if (id$component[id]) {
                throw Haf.error('该 id 值已给占用: {0}', id);
            }

            id$component[id] = component;

            var list = xtype$id$component[xtype];
            if (!list) {
                list = xtype$id$component[xtype] = {};
            }

            list[id] = component;
        },
        /**
         * 取消注册，在组件销毁时，要进行取消注册
         * @param component
         */
        unregister: function (component) {
            var id = component.get('id');
            var xtype = component.xtype;
            delete id$component[id];
            delete xtype$id$component[xtype][id];
        },
        /**
         * 根据组件id获取组件实例，类似Ext.getCmp
         * @param compId
         * @return {*}
         */
        getCmp: function (compId) {
            return id$component[compId];
        },

        get: function (componentId) {
            return id$component[componentId];
        },

        /**
         * 根据组件xtype返回该组件创建的所有实例，返回值中以id为key，实例为value
         * 可以用于调试组件有多个实例
         * @param xtype
         * @return {*}
         */
        getCmpsByXtype: function (xtype) {
            return xtype$id$component[xtype];
        },
        /**
         * 在container下按照selector选择器进行选择，如果没有置顶container，
         * 则在viewport(组件书的根)下查找
         * @param root
         * @param selector
         * selector支持的选择符：
         * 1.xtype选择符
         * 2.id选择符
         *
         * 支持直接下级选择符(>)间接下级选择符(空格),例如：selector1 selector2
         */
        query: function (selector, container) {
            var root = container || Haf.Viewport,
                deepItems = getChildren(root, true);
            operations = parseSelector(selector, container);
            return executeOperations(deepItems, operations);
        },

        /**
        * 规格化指定的对象，并返回等价的组件实例。
        * @param {Object|Component|string} component 要进行规格化的对象。 
            如果是一个纯对象，则会根据其 xtype 值创建组件实例，并返回它的引用；
            如果是一个组件实例，则不做处理，直接返回该参数；
            如果是一个字符串，则当成组件的 id 进行查找，然后返回该组件实例的引用。
        */
        normalize: function (value) {

            if ($.Object.isPlain(value)) { //纯对象 {}
                return Haf.create(value);
            }

            if ($.Object.isNonNull(value)) { //非空的对象
                return ComponentHelper.isValidComponent( value ) ? value : null;
            }

            if ($.Object.isString(value)) { //字符串 id
                return ComponentManager.get(value);
            }

            throw Haf.error('无法识别参数 value');
        }

        
    };



})(Haf, Haf, ClassManager);

Haf.ComponentManager = ComponentManager;



var Animator = (function ($, Haf) {




//不透明度
var Opacity = (function () {

    function parse(config) {

        var opacity = config.opacity;
        var type = typeof opacity;

        switch (type) {

            case 'string':
                opacity = $.Math.parsePercent(opacity);
                if (isNaN(opacity)) {
                    throw Haf.error('无法识别 opacity 的值');
                }
            case 'number':
                opacity = [1, opacity];
                break;
        }

        return $.Object.isArray(opacity) ? {
            type: 3,
            fromAlpha: opacity[0],
            toAlpha: opacity[1]
        } : null;
           
    }

    return {
        parse: parse
    };

})(); //结束 Opacity


//缩放
var Scale = (function () {

    function getPair(v) {

        var type = typeof v;
        if (type == 'number') {
            return [v, v];
        }

        if (type == 'string') {
            v = $.Math.parsePercent(v);
            if (isNaN(v)) {
                throw Haf.error('无法识别参数 v 的值: {0}', v);
            }
            return [v, v];
        }

        if ($.Object.isArray(v)) {
            return v;
        }

    }


    function parse(config) {

        var scale = config.scale;
        if (scale === undefined) {
            return null;
        }


        var from;
        var to;
        var dest;

        if ($.Object.isPlain(scale)) {
            from = scale.from;
            to = scale.to;
            dest = scale.dest;
        }
        else {
            to = scale;
        }

        to = getPair(to);
        if (!to) {
            return null;
        }

        from = getPair(from) || [1, 1];
        dest = getPair(dest) || [0, 5, 0.5];

        return {
            type: 4,

            fromXScale: from[0],
            fromYScale: from[1],

            toXScale: to[0],
            toYScale: to[1],

            destinationX: dest[0],
            destinationY: dest[1]
        };
    }

    return {
        parse: parse
    };
})(); //结束 Scale


//平移
var Shift = (function () {


    function getPair(v) {

        var type = typeof v;
        if (type == 'number') {
            return [v, v];
        }

        if (type == 'string') {
            v = $.Math.parsePercent(v);
            if (isNaN(v)) {
                throw Haf.error('无法识别参数 v 的值: {0}', v);
            }
            return [v, v];
        }

        if ($.Object.isArray(v)) {
            return v;
        }

    }

    function parse(config) {

        var shift = config.shift;
        if (shift === undefined) {
            return null;
        }

        var from;
        var to;

        if ($.Object.isPlain(shift)) {
            from = shift.from;
            to = shift.to;
        }
        else {
            to = shift;
        }

        to = getPair(to);
        if (!to) {
            return null;
        }

        from = getPair(from) || [0, 0];

        return {
            type: 1,
            fromX: from[0],
            fromY: from[1],

            toX: to[0],
            toY: to[1]
        };
    }

    return {
        parse: parse
    };
})();



//旋转
var Rotate = (function () {


    function getDegree(degree) {

        var type = typeof degree;
        if (type == 'number') {
            return [0, degree];
        }

        if (type == 'string') {
            var circles = $.Math.parsePercent(degree);
            if (isNaN(circles)) {
                throw Haf.error('无法识别参数 degree 的值: {0}', degree);
            }

            degree = 360 * circles;
            return [0, degree];
        }

        if ($.Object.isArray(degree)) {
            return degree;
        }

        throw Haf.error('无法识别参数 degree 的类型');

    }

    function getCenter(center) {

        if (center == null ) { //undefined 或 null
            return [0.5, 0.5];
        }

        var type = typeof center;
        if (type == 'number') {
            return [center, center];
        }

        if (type == 'string') {
            center = $.Math.parsePercent(center);
            if (isNaN(center)) {
                throw Haf.error('无法识别参数 center 的值: {0}', center);
            }
            return [center, center];
        }

        if ($.Object.isArray(center)) {
            return center;
        }

        throw Haf.error('无法识别参数 center 的类型');
    }


    function parse(config) {

        var rotate = config.rotate;
        if (rotate === undefined) {
            return null;
        }

        var degree;
        var center;

        if ($.Object.isPlain(rotate)) {
            degree = rotate.degree;
            center = rotate.center;
        }
        else {
            degree = rotate;
        }

        degree = getDegree(degree);
        center = getCenter(center);

        return {
            type: 2,
            fromDegrees: degree[0],
            toDegrees: degree[1],
            centerX: center[0],
            centerY: center[1]
        };

    }

    return {
        parse: parse
    };

})();



return {
    parse: function (config) {

        var list = [
            Opacity.parse(config),
            Shift.parse(config),
            Scale.parse(config),
            Rotate.parse(config)
        ];


        var duration = config.duration;
        duration = duration == 'slow' ? 3000 :
            duration == 'normal' ? 2000 :
            duration == 'fast' ? 1000 :
            duration === undefined ? 2000 : duration;

        var delay = config.delay || 0;

        return {
            duration: duration,
            startOffSet: delay,
            animations: $.Array.trim(list)
        };
    }
};





})(Haf, Haf);




; (function ($, Haf, Hae, ComponentManager, ComponentHelper, ComponentStyle, Animator) {




/**
* 组件类。
* 这是一个抽象类，所有 ui 组件的基类，子类应该提供自己的实现。
*/
Haf.define('Haf.view.Component', {
    extend: 'Haf.Base',
    xtype: 'component',

    'abstract': true,   //表示是抽象类

    /**
    * nativeEvents 是 native 的事件，在 on 时，需要给 native 控件添加事件处理，
    * 不是在这个列表中的事件属于普通的 js 事件，在 js 层内循环。
    */
    nativeEvents: [],

    /**除了 style 外的其他属性，子类必须指定属于自己的 nativeProps 列表*/
    nativeProps: {
       
    },

    /**与 native 层对应的 config 对象，仅用于展示数据，不会实际影响 native 层*/
    nativeConfig: {
        id: 0, 
        xtype: '', 
        props: {},
        style: {}
    },

    config: {
        id: '',
        autoUpdateUI: true, //表示当 style 或 props 发生改变时，是否自动更新到 native 层的 UI 上
        listeners: {}
        //样式部分已统一移到 ComponentStyle 工具类中进行处理

    },

    configListeners: {

        //防止再次修改 id
        id: function (id, oldId) {
            throw Haf.error('组件的 id 只能在初始化时进行赋值');
        }
    },


    initialize: function (config) {

        this.callSuper(arguments, config);

        var id = this.get('id');
        if (!id) {
            id = this.getGuid(); //用当前实例的 guid 作为默认 id
            this.set('id', id, true);
        }

        ComponentManager.register(this);


        //this.nativeConfig = ComponentHelper.createNative(this);

        var nativeConfig = this.nativeConfig = {
            id: this.getNativeId(),
            xtype: ComponentHelper.getNativeXtype(this),
            style: ComponentStyle.get(this),
            props: ComponentHelper.getNativeProps(this)
        };

        Hae.UI.createComponent(nativeConfig);

        
        var listeners = this.get('listeners');
        if (listeners) {
            this.on(listeners);
        }

        if (this.get('autoUpdateUI') === true) {
            this.onchange(ComponentHelper.onchangeHandler);
        }
    },

    /**
    * 这是一个模板方法，此处提供 Component 组件的实现。
    * 该方法区分普通的 js 事件和 native 层的事件，并且不提供重载。
    */
    bind: function (eventName, handler, isOnce) {

        var self = this;
        var isNativeEvent = ComponentHelper.isNativeEvent(this, eventName);

        // 即普通的 js 事件
        if (!isNativeEvent) {
            $.Event.bind(this, eventName, handler, isOnce);
            return;
        }

        // native 事件。
        var nativeId = this.getNativeId();

        var nativeEvents = this.nativeEvents;
        if ($.Object.isPlain(nativeEvents)) { //设置了新的映射名称，则进行转换
            eventName = nativeEvents[eventName]; // haf -> hae
        }

        //钩子函数
        function exFn() {
            var args = $.Array.parse(arguments);
            handler.apply(self, args); //让 handler 函数中的 this 指向当前实例。

            if (isOnce) {
                Hae.UI.removeEventListener(nativeId, eventName, exFn);
            }
        }

        var mapper = Meta.get(this, 'bind.nativeEvents.mapper', new $.Mapper());
        mapper.set(handler, exFn); // 用 mapper 找到关系： handler -> exFn

        Hae.UI.addEventListener(nativeId, eventName, exFn);

    },

    /**
    * 给本实例解除绑定事件处理函数。
    * @param {string} [eventName] 要解除绑定的事件名称。
        如果不指定，则移除所有的事件。
    * @param {function} [handler] 要解除绑定事件处理函数。
        如果不指定，则移除 eventName 所关联的所有事件。
    */
    off: function (eventName, handler) {

        var isNativeEvent = ComponentHelper.isNativeEvent(this, eventName);
        if (!isNativeEvent) {
            $.Event.unbind(this, eventName, handler);
            return;
        }

        var mapper = Meta.get(this, 'bind.nativeEvents.mapper');
        if (!mapper) { //尚未绑定过 native 事件
            return;
        }

        var exFn = mapper.get(handler); //handler -> exFn
        var nativeId = this.getNativeId();
        Hae.UI.removeEventListener(nativeId, eventName, exFn);
        

    },

   

    /**
    * 触本实例上的特定类型事件。
    * @param {string} eventName 要触发的事件名称。
    * @param {Array} [args] 要向事件处理函数传递的参数数组。
    * @return 返回最一后一个事件处理函数的返回值。
    */
    trigger: function (eventName, args) {

        if ( ComponentHelper.isNativeEvent(this, eventName) ) {
            throw Haf.error('目前暂时不支持用代码去触发 ui 事件');
        }

        return $.Event.trigger(this, eventName, args);
    },

    /**
    * 销毁本实例，同时执行一些清理操作。
    * 该方法会释放所有关联的资源，包括元数据和事件，并且会从组件树中移除本组件。
    */
    dispose: function () {

        var nativeId = this.getNativeId(); //先缓存起来

        this.callSuper(arguments);


        ComponentManager.unregister(this); //从组件树中移除
        Hae.UI.destroyComponent(nativeId);


    },

    /**
    * 获取 config 对象中指定成员的值。
    * 如果获取的成员是属性名/样式名，则从 native 层获取值，并且转换成 haf 层所使用的值。
    */
    get: function (key) {

        var nativeName =
                ComponentStyle.isNativeName(key) ? key :
                ComponentHelper.getNativePropName(this, key);

        if (nativeName) { //尝试作为属性名去获取，如果是属性名，则获取 native 层对应的值

            var nativeValue = this.getNativeProp(nativeName);
            
            var item = this.nativeProps[nativeName]; 
            if ($.Object.isPlain(item)) { //把 nativeValue 转成 haf 层所使用的 value

                return $.Object.findKey(item.values, function (key, value) {
                    return value === nativeValue;
                });
            }

            return nativeValue;
        }
        
        return this.config[key];
    },

    /**
    * 获取父容器
    */
    getParent: function () {
        return Meta.get(this, 'parent');
    },

    /**
    * 从父容器中移除
    */
    removeFromParent: function () {
        this.getParent().remove(this);
    },

    /**
    * 调用本组件的 native 方法。
    * 这是一个受保护的方法，仅供子类使用。
    */
    callNative: function (methodName) {

        var nativeId = this.getNativeId();
        var args = [nativeId, methodName];
        
        if (arguments.length > 1) {

            var isComponent = ComponentHelper.isValidComponent;
            var list = $.Array.parse(arguments).slice(1);
            
            list = $.Array.keep(list, function (item, index) {

                return isComponent(item) ? item.getNativeId() : item;
            });

            args = args.concat(list);
        }
        
        Hae.UI.invokeComponentMethod.apply(Hae.UI, args); // native 的调用方式中的是参数个数可变的

    },

    show: function () {
        this.set('visible', 'show', true);
        this.setNativeProp('visible', 'show');
    },

    hide: function () {
        this.set('visible', 'gone', true);
        this.setNativeProp('visible', 'gone');
    },

    toggle: function (isVisible) {

        if (isVisible === undefined) {
            var visible = this.get('visible');
            if (visible === 'show' || visible === undefined) {
                this.hide();
            }
            else {
                this.show();
            }
        }
        else if (isVisible === true) {
            this.show();
        }
        else if (isVisible === false) {
            this.hide();
        }
        else {
            throw Haf.error('无法识别参数 isVisible 的值');
        }
    },

    animate: function (config) {

        var nativeId = this.getNativeId();
        var animator = Animator.parse(config);

        Hae.UI.startAnimation(nativeId, animator);

    },

    /**
    * 通过不透明度的变化来实现组件的淡入效果。
    * 在动画完成后可选地触发一个回调函数。
    * 这个动画只调整组件的不透明度，高度和宽度不会发生变化。
    */
    fadeIn: function (duration, fn) {

        if (typeof duration == 'function') {
            fn = duration;
            duration = 'normal';
        }

        this.animate({
            duration: duration,
            opacity: [0, 1],
            fn: fn
        });
    },

    /**
    * 通过不透明度的变化来实现组件的淡出效果。
    * 在动画完成后可选地触发一个回调函数。
    * 这个动画只调整组件的不透明度，高度和宽度不会发生变化。
    */
    fadeOut: function (duration, fn) {

        if (typeof duration == 'function') {
            fn = duration;
            duration = 'normal';
        }

        this.animate({
            duration: duration,
            opacity: [1, 0],
            fn: fn
        });
    },

    /**
    * 通过高度变化（向上减小）来动态地隐藏组件。
    * 在隐藏完成后可选地触发一个回调函数。
    * 这个动画只调整组件的高度，可以使匹配的元素以“滑动”的方式隐藏起来。
    */
    slideUp: function (duration, fn) {

        if (typeof duration == 'function') {
            fn = duration;
            duration = 'normal';
        }

        this.animate({
            duration: duration,
            scale: {
                from: [1, 1],
                to: [1, 0],
                dest: [0, 0]
            },
            fn: fn
        });
    },

    /**
    * 通过高度变化（向下增大）来动态地显示组件。
    * 在显示完成后可选地触发一个回调函数。
    * 这个动画只调整组件的高度，可以使匹配的元素以“滑动”的方式隐藏起来。
    */
    slideDown: function (duration, fn) {

        if (typeof duration == 'function') {
            fn = duration;
            duration = 'normal';
        }

        this.animate({
            duration: duration,
            scale: {
                from: [1, 0],
                to: [1, 1],
                dest: [0, 0]
            },
            fn: fn
        });
    },

    /**
    * 更新 UI，包括 props 和 style。
    */
    updateUI: function (key, value) {

        if (typeof key == 'string') {
            this.set(key, value, true);  //不触发事件
        }
        else if ($.Object.isPlain(key)) {
            this.set(key, true);
        }
        

        var props = ComponentHelper.getNativeProps(this);
        var style = ComponentStyle.get(this);

        var obj = $.Object.extend({}, style, props);

        this.setNativeProp(obj);


    },

    /**
    * 获取本组件实例的本地 id。
    * hae id 是和 native 组件联系的纽带。
    * @return {string} 返回一个本实例的 guid 字符串值。
    */
    getNativeId: function () {
        return Meta.getGuid(this);
    },


    /**
    * 获取指定的 native 的属性或样式值。
    * 这是一个受保护的方法。
    */
    getNativeProp: function (name) {

        var nativeId = this.getNativeId();
        return Hae.UI.getComponentProp(nativeId, name);
    },

    /**
    * 设置指定的 native 的属性或样式值。
    * 这是一个受保护的方法。
    */
    setNativeProp: function (name, value) {

        var props = typeof name == 'string' ? $.Object.make(name, value) : name;

        var nativeId = this.getNativeId();
        Hae.UI.setComponentProp(nativeId, props);

        //更新到元数据
        var nativeConfig = this.nativeConfig;

        var style = ComponentStyle.filterStyles(props); //过滤出所有样式字段
        $.Object.extend(nativeConfig.style, style);

        props = ComponentStyle.removeStyles(props, true); //移除所有(包括复合)样式字段，剩下的当作属性字段
        $.Object.extend(nativeConfig.props, props);
    }
    
});






})(Haf, Haf, Hae, ComponentManager, ComponentHelper, ComponentStyle, Animator);





; (function ($, Haf, Hae, Meta, ComponentManager, ComponentHelper, Logger) {



/**
 * 容器类。
 * 所有容器类组件的基类，无法直接实例化。
 */
Haf.define('Haf.view.Container', {
    extend: 'Haf.view.Component',
    xtype: 'container',
    'abstract': true,

    /**与 native 层对应的 config 对象，仅用于展示数据，不会实际影响 native 层*/
    nativeConfig: {
        id: 0,
        xtype: '',
        props: {},
        style: {},
        childs: []
    },

    config: {
        defaults: {},
        items: []
    },


    initialize: function (config, noCallSuper) {

        if (noCallSuper !== true) { //为 true 时，不调用 callSuper，主要是针对 Viewport
            this.callSuper(arguments, config);
        }


        //收集子组件的实例，这里不要写到类的定义中，因为那是写到原型上的。
        //为了私有数据的保护，不写在 this.items 中，而是当成元数据。
        Meta.set(this, 'items', []);

        this.nativeConfig.childs = []; //分配个数组

        var items = this.get('items');
        if (items) { //创建子组件
            this.add(items);
        }

    },

    /**
    * 获取所有的子组件，返回一个新的数组。
    * 该接口是提供给外部使用的，本类内部请使用 Meta.get(this, 'items')
    */
    getItems: function () {
        var items = Meta.get(this, 'items');
        return items.slice(0); //拷贝一份数组，避免使用者修改原 items 的元素。
    },

    /**
    * 获取当前容器的直接下级子组件的个数。
    */
    getCount: function () {
        var items = Meta.get(this, 'items');
        return items.length;
    },

    /**
    * 向容器内添加一个或多个子组件。
    * @param {Component|Object|Array} item 要添加的子组件。
        可以是一个组件实例，也可以是一个纯对象，也可以是一个数组。
    */
    add: function (item) {

        var self = this;

        if ($.Object.isArray(item)) {
            return $.Array.map(item, function (item, index) {
                return self.addItem(item) || null;
            });
        }

        return this.addItem(item);
    },

    /**
    * 向容器内添加一个子组件。
    * 该方法只针对单项，不重载批量的情况。
    * 这是一个受保护的模板方法，仅供当前类和子类调用，子类可重写以提供自己的实现。
    * 开发者应该调用 add 方法。
    * @param {Component|Object|string} item 要添加的子组件。
        可以是一个组件实例，也可以是一个纯对象，也可以是组件实例的 id 值。
    * @param {function} [fnNativeAdd=Hae.UI.addComponent2Container] 向容器添加子组件的 native 方法。
        当子类需要调用自己的 native 方法时，可以提供该参数。
        该参数方法会接受到两个参数：item 的 nativeId 和 当前容器组件的 nativeId。
    * @return 返回被添加后的子组件实例。
    */
    addItem: function (item, fnNativeAdd) {

        var defaults = this.get('defaults');
        var isInstance = true; //指示 item 是否已给是组件实例。 先假设是。

        if ($.Object.isPlain(item)) {
            isInstance = false;
            item = $.Object.extend({}, defaults, item);
        }

        item = ComponentManager.normalize(item);

        if (!item) {
            throw Haf.error('参数 item 不是(或不能从它创建出)一个有效的组件。');
        }

        if (this.contains(item)) {
            throw Haf.error('参数 item 所对应的子组件已在容器中，不能重复添加。');
        }

        if (isInstance) { //已是组件实例，则更新 UI
            defaults = $.Object.remove(defaults, ['xtype', 'id']);
            item.updateUI(defaults);
        }

        var items = Meta.get(this, 'items');
        items.push(item);

        Meta.set(item, 'parent', this); //设置 item 的 parent 

        var childs = this.nativeConfig.childs;
        childs.push(item.nativeConfig);


        var itemId = item.getNativeId();
        var containerId = this.getNativeId();

        if (fnNativeAdd) {
            fnNativeAdd.call(this, itemId, containerId);
        }
        else {
            //注意，不要用一个变量缓存 Hae.UI.addComponent2Container，
            //因为它的 this 指向 Hae.UI，它不是一个真正的静态方法。
            Hae.UI.addComponent2Container(itemId, containerId);
        }

        //Logger.debug('容器添加子组件: {0} + {1}', this.getGuid(), item.getGuid());


        return item;
    },

    /**
    * 从容器中移除一个子组件。
    * @param {Component|string|number} item 要移除的子组件。
    *   可以是一个组件实例，或一个组件的　id 字符串，或子组件中容器中的索引位置。
    * @param {function} [fnNativeRemove=Hae.UI.removeComponent4Container] 向容器添加子组件的 native 方法。
        当子类需要调用自己的 native 方法移除子组件时，应该重定本方法，可以提供该参数。
        该参数方法会接受到两个参数：item 的 nativeId 和 当前容器组件的 nativeId。
    */
    remove: function (item, fnNativeRemove) {

        item = this.getItem(item);

        if (!item) {
            throw Haf.error('容器中不存在该组件');
        }


        var items = Meta.get(this, 'items');
        items = $.Array.remove(items, item);  //从集合中移除
        Meta.set(this, 'items', items);


        var childs = this.nativeConfig.childs;
        this.nativeConfig.childs = $.Array.remove(childs, item.nativeConfig);



        var itemId = item.getNativeId();
        var containerId = this.getNativeId();

        if (fnNativeRemove) {
            fnNativeRemove.call(this, itemId, containerId);
        }
        else {
            Hae.UI.removeComponent4Container(itemId, containerId);
        }

        //Logger.debug('容器移除子组件: {0} - {1}', containerId, itemId);

        return item;

    },

    /**
    * 移除所有子组件
    */
    removeAll: function () {

        var self = this;
        var items = Meta.get(this, 'items');

        $.Array.each(items, function (item, index) {

            self.remove(item);
            
        });
    },

    push: function (item) {
        return this.add(item);
    },

    pop: function () {

        var count = this.getCount();
        if (count > 0) {
            return this.remove(count - 1); //移除最后一项
        }

        return null;
    },


    getItem: function (item) {

        var items = Meta.get(this, 'items');
        var type = typeof item;

        if (type == 'number') {
            return items[item];
        }

        item =
            type == 'string' ? ComponentManager.get(item) :
            //type == 'number' ? items[item] :
            ComponentHelper.isValidComponent(item) ? item : null;

        return item && $.Array.contains(items, item) ? item : null;
    },

    getLastItem: function () {
        var count = this.getCount();
        return count > 0 ? this.getItem(count - 1) : null;
    },

    /**
    * 检测本容器实例是否包含指定的子组件。
    * @param {Component|string|number} item 要进行检测的子组件。
        可以是一个组件实例；
        或一个字符串，表示组件的 id；
        或一个数字，表示该组件在容器中的索引值。
    * @return {boolean} 如果容器中包含该子组件则返回 true；否则返回 false。
    */
    contains: function (item) {
        return !!this.getItem(item);
    },

    /**
    * 销毁本实例，同时执行一些清理操作。
    * 该方法会释放所有关联的资源，包括元数据和事件，并且会从组件树中移除本组件。
    */
    dispose: function () {

        //销毁子组件。
        var items = Meta.get(this, 'items');

        $.Array.each(items, function (item, index) {
            item.dispose();
        });

        //销毁自己
        this.callSuper(arguments);

    }


    
});


})(Haf, Haf, Hae, Meta, ComponentManager, ComponentHelper, Logger);



; (function ($, Haf) {




/**
* 可以选择一个或者多个的选择控件，选择内容为弹出框。
* @class Haf.view.ActionSheet
*/
Haf.define('Haf.view.ActionSheet', {
    extend: 'Haf.view.Component',
    xtype: 'actionsheet',
    nativeEvents: ['buttonTap'],

    nativeProps: [
        'buttons'
    ],

    config: {
        
    },

    initialize: function (config) {

        var buttons = config.buttons;

        var buttonTexts = $.Array.map(buttons, function (item, index) {
            return item.text || null;
        }).join(',');

        this.set('buttons', buttonTexts, true);

        this.callSuper(arguments, config);

        this.on('buttonTap', function (index) {

            var item = buttons[index];
            var fn = item.tap;

            if (fn) {
                fn.call(this, item, index);
            }
        });
    },

    show: function () {
        this.callNative('show');
        this.callSuper(arguments);
    },

    hide: function () {
        this.callNative('hide');
        this.callSuper(arguments);
    }
    
});


})(Haf, Haf);




; (function (Haf, $) {


/**
* Box容器，可以横向/纵向布局。
*/
Haf.define('Haf.view.Box', {
    extend: 'Haf.view.Container',
    xtype: 'box',

    nativeProps: {

        scrollable: 'scrollable',

        //换名称，也换值
        orientation: {
            name: 'layout',
            values: {
                hbox: 'Horizontal',
                vbox: 'Vertical'
            }
        }
    },


    config: {
        /**
        * 方向, hbox|vbox
        */
        layout: 'hbox',

        /**
        * 是否可滚动, true|false
        */
        scrollable: false
    },

    addItem: function (item) {
        
        var layout = this.get('layout');
        item = this.callSuper(arguments, item);

        //box 容器中的控件的 flex 优先级高于 width/height
        if (item.get('flex')) {
            item.set(layout == 'hbox' ? 'width' : 'height', 0);
            if (!item.get('autoUpdateUI')) {
                item.updateUI();
            }
        }

        return item;
    }
});



})(Haf, Haf);




//
; (function ($, Haf) {



/**
 * 按钮
 */
Haf.define('Haf.view.Button', {
    extend: 'Haf.view.Component',
    xtype: 'button',
    nativeEvents: ['tap', 'longPress'],
    nativeProps: [
        'text',
        'backgroundImgPressed', /**按下状态图片路径*/
        'backgroundImgFocus',  /**焦点状态图片路径*/
        'backgroundImgDisable' /**不可用状态图片路径*/
    ],

    config: {
        
    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        var tap = config.tap; //处理快捷方式
        if (tap) {
            this.on('tap', tap);
        }

    }
});


})(Haf, Haf);




; (function (Haf, $, Meta) {


/**
* Card 容器
*/
Haf.define('Haf.view.Card', {
    extend: 'Haf.view.Container',
    xtype: 'card',
    nativeProps: [],

    config: {

    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        var item = this.getItem(0);
        if (item) { //默认激活第一项(如果有)
            this.setActiveItem(0);
        }
        else {
            Meta.set(this, 'activeIndex', -1);
        }

    },

    /**
    * 设置指定的组件为当前显示的组件
    * @param item
    */
    setActiveItem: function (item) {

        var index = item; //先假设传进来的是数字，当成 index

        item = this.getItem(item);
        if (!item) {
            throw Haf.error('容器中不存在该组件');
        }

        
        if (typeof index != 'number') {
            var items = Meta.get(this, 'items');
            index = $.Array.indexOf(items, item);
        }

        var activeIndex = this.getActiveIndex();

        if (index == activeIndex) {
            return;
        }

        Meta.set(this, 'activeIndex', index);
        this.callNative('showView', item);

        var oldItem = this.getItem(activeIndex);

        this.trigger('activeitemchange', [item, index, oldItem, activeIndex]);

    },

    getActiveItem: function () {
        var index = this.getActiveIndex();
        if (index < 0) {
            return null;
        }

        var items = Meta.get(this, 'items');
        return items[index] || null;
    },

    getActiveIndex: function () {
        return Meta.get(this, 'activeIndex');
    },

    next: function (isCircled) {

        var activeIndex = this.getActiveIndex();
        var count = this.getCount();


        var index =
            activeIndex < 0 ? 0 :
            isCircled === true ? $.Math.next(activeIndex, count) :
            Math.min(activeIndex + 1, count - 1);

        if (index == activeIndex) {
            return;
        }

        this.setActiveItem(index);
    },

    previous: function (isCircled) {
        var activeIndex = this.getActiveIndex();
        var count = this.getCount();

        var index =
            activeIndex < 0 ? count :
            isCircled === true ? $.Math.previous(activeIndex, count) :
            Math.max(activeIndex - 1, 0);

        if (index == activeIndex) {
            return;
        }

        this.setActiveItem(index);
    }
});

})(Haf, Haf, Meta);



/**
* 滑动面板
*/
Haf.define('Haf.view.Carousel', {
    extend: 'Haf.view.Container',
    xtype: 'carousel',
    nativeEvents: [],
    nativeProps: {

        visible: 'pager',

        pageControlOrientation: {
            name: 'direction',
            values: {
                'horizontal': 1,
                'vertical': 2
            }
        }
    },

    config: {
        direction: 'horizontal',
        pager: true
    },

    //调用容器类的 addItem 方法，同时提供自己的 native 方法。 
    addItem: function (item) {

        return this.callSuper(arguments, item, function (itemId, containerId) {
            this.callNative('addPage', itemId);
        });
    },

    //调用容器类的 remove 方法，同时提供自己的 native 方法。 
    remove: function (item) {
        return this.callSuper(arguments, item, function (itemId, containerId) {
            this.callNative('removePage', itemId);
        });
    }

     
});





;(function($, Haf, Hae){


/**
* 类似对话框。界面里面有日期/时间选择，和确定/取消两个按钮。
*/
Haf.define('Haf.view.DatePicker', {
    extend: 'Haf.view.Component',
    xtype: 'datepicker',
    nativeEvents: ['change'],
    nativeProps: {

        model: {
            name: 'model',
            values: {
                'date': 1,
                'time': 2,
                'datetime': 3
            }
        },

        year: 'year',
        month: 'month',
        day: 'day',
        hour: 'hour',
        minute: 'minute',
        second: 'second',

        title: 'title',
        ellipsize: 'ellipsize',
        isPassword: 'isPassword',
        message: 'message',
        wholeDate: 'wholeDate'
    },

    config: {
        model: 'date',
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        second: '',

        title: '',
        ellipsize: '',
        isPassword: '',
        message: '',
        wholeDate: '' // 目前 hae 还有问题，必须指定类似 "1989-06-21 19:26:37" 的全格式
    },

    initialize: function (config) {

        //先设置参数
        var now = new Date();

        var obj = $.Object.extend({
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds()
        }, config);

        this.set( obj, true );

        this.callSuper(arguments, config);
    },

    setValue: function (value) {
        value = $.Date(value).toString('yyyy-MM-dd HH:mm:ss');
        this.callNative('setValue', value);
    },

    show: function () {
        this.callNative('show');
    },

    hide: function () {
        this.callNative('hide');
    }
});


})(Haf, Haf, Hae);




; (function ($, Haf) {

/**
* 模式提示框
*/
Haf.define('Haf.view.Dialog', {
    extend: 'Haf.view.Component',
    xtype: 'dialog',

    nativeEvents: ['buttonTap'],

    nativeProps: {

        buttons: 'buttons',
        icon: 'icon',
        title: 'title',
        message: 'message'
    },

    config: {
        
    },

    initialize: function (config) {

        var buttons = config.buttons;

        config.buttons = $.Array.map(buttons, function (item, index) {
            return item.text || null;
        }).join(',');

        this.callSuper(arguments, config);
        
        this.on('buttonTap', function (index) {

            var item = buttons[index];
            var fn = item.tap;

            if (fn) {
                fn.call(this, item, index);
            }
        });
    },

    show: function () {
        this.callNative('show');
    },

    hide: function () {
        this.callNative('hide');
    }
});


})(Haf, Haf);



/**
* 叠加层。
* 一个可叠加的层容器控件，加入到层中的元素都是从左上角原点出现的。
*/
Haf.define('Haf.view.FrameLayer', {
    extend: 'Haf.view.Container',
    xtype: 'framelayer',
    nativeEvents: [],
    nativeProps: {
    },

    config: {
        
    },

    exchange: function (item1, item2) {
        
        item1 = this.getItem(item1);
        if (!item1) {
            throw Haf.error('容器中不包含 item1 的子组件');
        }

        item2 = this.getItem(item2);
        if (!item2) {
            throw Haf.error('容器中不包含 item2 的子组件');
        }

        this.callNative('exChangeLayerIndex', item1, item2);
    }


});




/**
* 按钮
*/
Haf.define('Haf.view.Image', {
    extend: 'Haf.view.Component',
    xtype: 'image',

    nativeEvents: [
        'tap'
    ],

    nativeProps: [
        'src'
    ],

    config: {
        

    }
});





; (function (Haf, $) {




/**
 * 文字标签
 */
Haf.define('Haf.view.Label', {
    extend: 'Haf.view.Component',
    xtype: 'label',

    nativeProps: [
        'text',
        'singleLine',
        'ellipsize'
    ],

    config: {

        text: '',

        /**
         * 是否单行, false 则可以换行
         */
        singleLine: false,

        /**
         * 单行情况下，如果显示不完，省略号的位置
         * 可选: start/end/middle 三个值
         */
        ellipsize: 'end'
    }

});



})(Haf, Haf);






; (function (Haf, $) {


/**
* Box容器，可以横向/纵向布局。
*/
Haf.define('Haf.view.List', {
    extend: 'Haf.view.Container',
    xtype: 'list',

    nativeEvents: {
        itemtap: 'rowTap',
        pullup: 'pullUpLoading',
        pulldown: 'pullDownLoading',
        indexChange: 'indexChange'
    },


    nativeProps: {
        
        template: 'template',
        itemViewCallback: 'itemViewCallback',

        pullUpLoadingEnabled: 'pullupLoading',
        pullUpAreaHint: 'pullupText',
        pullUpLoadingHint: 'loadingText',
        pullDownLoadingEnabled: 'pulldownLoading',
        pullDownAreaHint: 'pulldownText',

        indexBarEnabled: 'indexBarEnabled',

        scrollable: 'scrollable'
    },



    config: {
        
        pullupLoading: true,
        pullupText: '上拉翻页',

        loadingText: '正在获取数据...',

        pulldownLoading: true,
        pulldownText: '下拉刷新',

        indexBarEnabled: false,

        /**
        * 是否可滚动, true|false
        */
        scrollable: true,

        data: [],
        itemTpl: {}
    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        var itemTpl = this.get('itemTpl'); 
        if (itemTpl) { //指定了 itemTpl，则解析

            itemTpl = ComponentManager.normalize(itemTpl);

            if (!itemTpl) {
                throw Haf.error('无法识别 itemTpl 的类型');
            }

            Meta.set(this, 'itemTpl', itemTpl.nativeConfig); //解析成 native 的 itemTpl
        }

        if (this.get('autoUpdateUI') === true) {

            this.setData();

            this.onchange('data', function () {
                this.setData();
            });
        }
    },

    setData: function (data) {

        if (!data) {
            data = this.get('data');
        }
        else {
            this.set('data', data, true);
        }

        itemTpl = Meta.get(this, 'itemTpl');
        this.callNative('adapter', data, itemTpl, null);
    },

    appendData: function (data) {

        this.callNative('appendData', data);
    },

    reload: function () {

        this.callNative('reload');
    }
});

    

})(Haf, Haf);





/**
 * 可以选择一个或者多个的选择控件，选择内容为弹出框。
 */
Haf.define('Haf.view.Mask', {
    extend: 'Haf.view.Component',
    xtype: 'mask',
    
    nativeProps: [
        'icon',
        'message'
    ],

    config: {},

    show: function () {
        this.callNative('show');
        this.set('visible', 'show', true);
    },

    hide: function () {
        this.callNative('hide');
        this.set('visible', 'gone', true);
    }

});




; (function ($, Haf, ComponentManager) {


/**
* 弹出窗口容器。
*/
Haf.define('Haf.view.PopupWindow', {
    extend: 'Haf.view.Container',
    xtype: 'popupwindow',
    nativeEvents: {
        hide: 'dismiss'
    },

    nativeProps: {

        losable: 'losable',
        mask: 'mask',
        maskColor: 'maskColor',
        hasBorder: 'hasBorder',

        popAnimationType: {
            name: 'animation',
            values: {
                top: 2,
                right: 0,
                bottom: 3,
                left: 1
            }
        }
    },

    config: {
        losable: true, //是否易消失的，即点击窗口外部会自动关闭本窗口
        hasBorder: true,

        mask: {
            color: 'black',
            opacity: '80%'
        }
    },

    initialize: function (config) {

        var mask = config.mask;
        if (mask) {
            var color = 'black';
            var opacity = 0.5;

            if ($.Object.isPlain(mask)) {
                color = mask.color || color;
                opacity = mask.opacity === undefined ? opacity : mask.opacity;
            }

            this.set({
                mask: true,
                maskColor: Colors.get(color, opacity)

            }, true);
        }

        this.callSuper(arguments, config);
    },

    showAt: function (anchor, direction) {

        switch (typeof anchor) {
            case 'string':
                if (direction === undefined) { //此时为 showAt(alignType)
                    var alignType = Aligns[anchor];
                    if (alignType === undefined) {
                        throw Haf.error('无法识别的 anchor 参数: {0}', alignType);
                    }

                    this.callNative('showByAlignType', alignType);
                    break;
                }
                //注意，这里没有 break;

            case 'object':  //此时为 showAt(anchor, direction)
                anchor = ComponentManager.normalize(anchor);
                direction = Directions[direction];

                if (!direction) {
                    throw Haf.error('无法识别的 direction 参数: {0}', direction);
                }

                this.callNative('show', anchor, direction);
                break;

            case 'number': //此时为 showAt(x, y)
                var x = anchor;
                var y = direction;
                this.callNative('showAtPoint', x, y);
                break;

            default:
                throw Haf.error('无法识别参数 anchor 的类型');
        }

    },

    show: function () {
        this.showAt('center');
    },

    hide: function () {
        this.callNative('hide');
    }
});

//私有的
var Directions = {
    'left': 1,
    'top': 2,
    'right': 3,
    'bottom': 4
};

var Aligns = {
    'west north': 0,
    'north west': 0,
    'left top': 0,
    'top left': 0,

    'north': 1,
    'top': 1,

    'east north': 2,
    'north east': 2,
    'right top': 2,
    'top right': 2,

    'west': 3,
    'left': 3,

    'middle': 4,
    'center': 4,

    'east': 5,
    'right': 5,

    'west south': 6,
    'south west': 6,
    'left bottom': 6,
    'bottom left': 6,

    'south': 7,
    'bottom': 7,

    'east south': 8,
    'south east': 8,
    'right bottom': 8,
    'bottom right': 8
};

})(Haf, Haf, ComponentManager);





/**
 * 进度条。
 */
Haf.define('Haf.view.ProgressBar', {
    extend: 'Haf.view.Component',
    xtype: 'progressbar',
    nativeEvents:[],
    nativeProps: {
        progress: 'value'
    },

    config: {
        value: 0
    },

    getValue: function () {
        return this.get('value');
    },

    setValue: function (value) {
        this.updateUI('value', value);
    }
});



/**
* 可以选择一个或者多个的选择控件，选择内容为弹出框。
*/
Haf.define('Haf.view.Select', {
    extend: 'Haf.view.Component',
    xtype: 'select',
    nativeEvents: ['change'],
    nativeProps: [
        'hintText', //没有选中任何内容时，展示的信息
        'mode',     //single/mutiple。单选/多选
        'ellipsize' //省略号位置
    ],

    config: {
        hintText: '',       //没有选中任何内容时，展示的信息
        mode: 'single',     //单选/多选，single|mutiple。
        ellipsize: 'end',    //省略号位置，start|end|middle 三个值

        data: []
    },

    initialize: function (config) {
        var data = this.get('data');

        if (data.length > 0) {
            this.setData(data);
        }
    },

    setData: function (items) {
        this.callNative('setData', items);
    },

    setSelectedIndex: function (indexList) {
        this.callNative('setSelectedIndex', indexList);
    },

    getSelectedIndex: function () {
        return this.callNative('getSelectedIndex');
    }
    
});





/**
* 水平滑动条。
*/
Haf.define('Haf.view.Slider', {
    extend: 'Haf.view.Component',
    xtype: 'slider',
    nativeEvents: {
        slide: 'change'
    },
    nativeProps: {
        maxValue: 'max',
        currentValue: 'value'
    },

    config: {
        max: 100,
        value: 50
    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        var slide = config.slide; //处理快捷方式
        if (slide) {
            this.on('slide', slide);
        }

    }
});





; (function ($, Haf) {
/**
* 单行输入框
*/
Haf.define('Haf.view.TextInput', {
    extend: 'Haf.view.Component',
    xtype: 'textinput',

    nativeEvents: [
        'change',
        'focus',
        'blur'
    ],


    nativeProps: {
        
        text: 'value',
        hintText: 'placeHolder', //没有内容时候输入框的提示
        ellipsize: 'ellipsize',  //省略号位置

        //键盘类型（n数字/a字母/p密码)
        keyboardType: {
            name: 'keyboard',
            values: {
                number: 'n',
                alphabet: 'a',
                password: 'p',
                n: 'n',
                a: 'a',
                p: 'p'
            }
        },
         
        readOnly: 'readOnly',
        imeOption: 'imeOption'
    },


    config: {
        keyboard: 'alphabet',
        value: ''
    },

    reset: function () {

    }


});


})(Haf, Haf);




; (function ($, Haf) {

/**
* 多行输入框
*/
Haf.define('Haf.view.TextArea', {
    extend: 'Haf.view.TextInput',
    xtype: 'textarea',
    config: {
        maxRows: 0
    }

});

})(Haf, Haf);



; (function ($, Haf) {



/**
* 
*/
Haf.define('Haf.view.Toast', {
    extend: 'Haf.view.Component',
    xtype: 'toast',
    nativeEvents: [],
    nativeProps: [
        'message',
        'valign' // top|middle|bottom
    ],

    config: {
        message: '',
        valign: 'middle'
    },

    show: function (duration) {
        this.callNative('show', duration);
    }
});


})(Haf, Haf);




/**
* Toogle 开关
*/
Haf.define('Haf.view.Toggle', {
    extend: 'Haf.view.Component',
    xtype: 'toggle',

    nativeEvents: {
        toggle: 'change'
    },

    nativeProps: [
        'checked'
    ],

    config: {

    }

});




; (function (Haf, $) {



/**
* Viewport 单实例，代表应用的可展示区域。
*/
Haf.define('Haf.Viewport', {
    extend: 'Haf.view.Container',
    singleton: true,

    config: {
              
    },

    initialize: function (config) {

        this.callSuper(arguments, config, true);
        Meta.set(this, 'parent', this); //让 Haf.Viewport 的 parent 指向自己
    },

    addItem: function (component) {

        return this.callSuper(arguments, component, function (componentId, containerId) {
            Hae.ViewPort.addComponent(componentId);
        });
        
    },

    remove: function (component) {

        //调用容器类的 remove 方法，同时提供自己的 native 方法。 
        return this.callSuper(arguments, component, function (componentId, containerId) {
            Hae.ViewPort.removeComponent(componentId);
        });
    }
    
});





})(Haf, Haf);






; (function ($, Haf) {



/**
* 渲染 Web 内容的控件
*/
Haf.define('Haf.view.WebView', {
    extend: 'Haf.view.Component',
    xtype: 'webview',
    nativeEvents: [],
    nativeProps: {
        zoomControlEnabled: 'zoomable'
    },

    config: {
        zoomable: true,
        html: '',
        url: ''
    },

    initialize: function (config) {

        this.callSuper(arguments, config);

        if (config.html) {
            this.loadHtml(config.html);
        }
        else if (config.url) {
            this.loadUrl(config.url);
        }
    },

    loadHtml: function (html) {
        this.callNative('loadHTML', html);
    },

    loadUrl: function (url) {

        this.callNative('loadUrl', url);
    }
});


})(Haf, Haf);

