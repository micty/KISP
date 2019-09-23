
KISP 前端框架
===========================================

## 简介 

> KISP 是一个轻量级的、综合性的 JavaScript 应用框架。它借鉴了 `Node.js`、`Sea.js`、`Require.js`、`Backbone.js`、`Ext.js`、`jQuery.js` 等框架的优秀设计理念，在 `CMD` 模块化的基础上，对模块增加了树型结构的约束关系，形成了特有的 **`TMD`(树型模块定义)** 的模块系统；模块之间采用事件驱动的方式进行通信；并提供了通用的 UI 模块定义、灵活的模板填充等。可以非常高效地用于 PC 端和移动端的 Web 页面前端开发。

``` js
//程序入口，主控制器。
KISP.launch(function (require, module, nav) {
	//加载 KISP 内部的公有模块。
	var Emitter = KISP.require('Emitter');   
    
    //加载业务层的公有模块。
	var API = require('API');		
    
    //加载业务层的私有模块。
    var Login = module.require('Login');	 
    
    //绑定事件。
    Login.on({
    	'success': function (user) {
        	//跳转到 `Master` 视图。
        	nav.to('Master');	
        },
        
        'reset': function () {
        	//跳转到 `Reset` 视图。
        	nav.to('Reset');	
        },
    });
    
    //开始执行渲染。
    Login.render();
});
```

 - **高效、易用、灵活、一致**

    KISP 框架更多关注的是为团队提供一种高效、易用、灵活、一致的**开发模式**，而非仅关注 UI 层和视图层。

 - **强约束规范**

    KISP 通过一系列的措施和约束，确保前端团队的开发人员能写出风格和结构基本一致的代码，提高项目的可维护性，提高开发人员的可替换性，降低项目风险。
 
 - **满足大多数 Web 开发场景**
 
    KISP 提供一系列的常用的、基础的模块、类和 UI 组件等，满足大多数常用的 Web 开发场景。
    
 - **适用于 PC 端和移动端**
 
 	KISP 内部提供的模块既可以用于 PC 端，也可以用于移动端，差异化部分采用了配置的方式进行解决。
 
 - **支持 IE (9+)**
 
    通过引入 `babel` 版本和 `polyfill` 垫片库，可以支持到 `IE9` 或以上。
 
 - **模块化和片段化开发**

   配合 Web 自动化开发工具 `web-master`，采用 html 片段化和模块化的开发方式，动态自动批量引入 css 文件和 js 文件，自动监控文件变化和编译页面，非常适合团队成员分工协作、共同开发单页应用。

 - **支持单页应用（SPA）**
 
   KISP 专为单页应用设计的，提供了视图路由导航、视图状态保持等功能，支持浏览器传统的前进、后退、刷新功能，支持移动端的视图跳转过渡、滑动返回、下拉刷新、上拉加载更多等接近原生 App 的体验。
   
 - **简单、灵活的配置系统**
   
   KISP 通过框架层和业务层的配置选项，控制模块的默认行为逻辑，用户在简便性方面几乎可以零配置使用模块，在灵活性上可以自由指定默认配置。
   
 - **业务层程序结构清晰，定位快速、直观**
 
    通过树型结构的模块化管理、规范的文件和目录命名、DOM 元素模块化等手段，可以在团队成员之间非常方便的分工协作、交叉协作，定位代码非常直观和快速。
 
   
   
 - **面向各个层次的开发者**

   KISP 面向的是各个层次和水平的前端开发者。
      - 对于新人，可以在指定的模板模块中通过 **“填充”** 代码的方式快速实现功能。
      - 对于高级开发人员，通过模块化系统的分而治之原则，可以快速实现任何想要的复杂功能。
 
 - **纯原生前端开发，符合 W3C 标准**
    - 纯原生的 html、css、js 开发，无任何自创的、不符合 W3C 标准的规则、语法和标记等。
    - 学习曲线非常平缓。作为一名前端者，只要你懂 W3C 标准，，只需要很小的学习成本即可上手使用。
	- 对前端人员更友好，前后端完全分离，前端人员更专注在原生的、传统的和标准的页面开发。
	- 避免学习新的文件类型、语法和标签，如 `.vue`、`.jsx` 等非标准文件，`v-bind`、`v-for` 等非 W3C 标准的语法。
	- html、js 代码互相分离，避免 js 里掺杂 html 内容。
    

## 架构图

### KISP 架构
![](http://www.definejs.com/data/upload/paste/2019-09-03/152524-FFFF.png)


### 应用架构

![](http://www.definejs.com/data/upload/paste/2019-09-05/113508-6023.png)


## 模块管理

 > KISP 提供了模块管理的能力，管理着 KISP 的内部模块和项目应用中的业务层模块，它们在模块定义的风格、模块特性和约束等方面上完全是一致的。通过模块化管理，把相关的资源、代码、和文件放到模块专用目录，可以让团队成员更专注的完成自己的功能模块。

KISP 内部模块和外部的业务层模块分属于两个独立的模块管理器，可以重复使用同一个模块名称。比如 KISP 内部有一个 `API` 模块，业务层也可以定义一个 `API` 模块，它们在加载方式上有所不同。

``` js
//业务层的文件 `API.js`
//定义一个公共模块 `API`。
define('API', function (rquire, module, exports) {
	var API = KISP.require('API'); //加载 KISP 内部的模块 `API`。
    
    //...
});



```

在某个业务层模块内，加载业务层的 `API` 模块：

``` js
define('Test', function (rquire, module, exports) {
	var API = require('API'); //加载业务层的公共模块 API。
    
    //...
});

```

### CMD 通用模块定义的风格

在模块风格上，借鉴了 Node.js 和 Sea.js 等业界的优秀成果，在 CMD 模式的基础上进行了改进和优化来定义模块。

``` js
//通过工厂函数的方式，定义一个名为 User 的公共模块。
define('User', function (require, module, exports) {
	//do something 1
    //do something 2
    //...
    //do something n
    
    //需要对外暴露（导出）的模块成员。
    return  {
    	foo: 'KISP',
        bar: function (){ },
    };
});

//通过导出对象的方式，定义一个名为 Config 的公共模块。
define('Config', {
	foo: 'name',
    bar: 123,
});

```



### 模块网
众多模块之间形成一个模块系统，如果不对它们进行一个有效的管理和约束，那它们就是一个杂乱无章的 “系统”，是一盘散沙。模块与模块之间形成各种错综复杂的关系，无意中形成了强耦合。修改一个模块，都有可能影响其它未知数量的模块，对开发人员来是一个噩梦。

![](http://www.definejs.com/data/upload/paste/2018-05-08/150359-F963.png)

### 模块树
参考人类社会的组织构架和管理模式，KISP 对繁多的模块进行了类似金字塔的分层，以进行有效的管理。模块与模块之间具有上下级的关系，一个模块能调用哪些模块以及它是如何跟上级模块通信的，都有明确的规定和约束。通过此方式，众多模块就形成了树型结构的模块系统，层次结构清晰明了。

树型结构的模块组织方式，非常符合人类分析和解决问题的思维方式：分而治之。即把一个复杂的问题分解成若干个小问题，集中精力解决每个小问题，再它们的结果汇总给上级进行进一步的处理。

在树型结构的模块化系统中，模块与模块组成了一棵树，我们称为**模块树**。

![](http://www.definejs.com/data/upload/paste/2018-05-08/163512-7299.png)


### 模块的分类

#### 从可见性来分
在模块树中，从可见性来分，模块分为**公共模块**和**私有模块**。

 - **公共模块**。对所有的模块都可见，任何模块都可以直接调用它来做事。一个公共模块可以是一个单一的模块，也可以是一个复合模块。
   
 - **私有模块**。仅对直接上级模块可见。只有直接上级模块可以调用它来做事并取得它的返回结果，或者监听它的事件。
 
#### 从组成结构来分
 
从组成结构来分，模块分为**单一模块**和**复合模块**。

 - **单一模块**。即叶子模块，在模块树中处于最末端，不含有下级模块，完成单一的功能。
 - **复合模块**。即含有下级模块的模块，是一个 “小领导” 的角色，可以调用直接下级模块做事、监听直接下级模块的事件，并可向上级模块传达运行结果。
 
在实际应用中，可以根据需要把一个叶子模块变成一个复合模块。此时说明了叶子模块的功能逻辑比较复杂，需要进一步`分而治之`来划分更多的子模块，让子模块来完成各自的功能逻辑。

也可以把一个复合模块变成一个叶子模块。此时说明了复合模块的功能逻辑变得简单了（比如产品需求发生了变更），不再需要下级模块。

不管一个模块如何修改，它只会影响它的直接上级模块，即它的父亲模块，而不会影响其它模块。因此，对模块的修改、移除等，都将不会触一发而动全身影响整个模块系统，仅仅影响有限的、可预知的模块，把修改的风险和成本降到最低，并且能预知它的后果，从而避免了模块网结构中的强耦合关系。
 

详见【模块系统】

### 模块系统

多个公共模块、多棵模块树组成了一个模块系统。公共模块对所有模块都可见，提供公共的方法和接口供其它模块调用，模块树中，根节点模块为公共模块时，该棵模块树才能成为公共的组件供别人调用。

定义模块时，我们要遵循一个原则：**优先使用私有模块，尽量减少公共模块的定义和使用**。

因为公共模块本质上是一堆零散的、自由的模块，它们之间很容易形成上面讨论的`网状结构`。公共模块会给很多别的模块引用，对公共模块的改动将会对依赖于它的其它模块产生很大影响，从而带来维护上的困难。

私有模块仅对直接上级模块（即父亲模块）可见，因此是隐私和安全的，对它的改动仅会影响到父亲模块，风险和成本相对小得多，结果也可预知和可控，可以避免公共模块的一些缺点。

在代码复用和隐私安全方面，要综合衡量来决定是要定义成公共模块还是私有模块。




## 事件（消息）驱动

现代的各大框架和技术领域中，事件是一个很重要的概念。在浏览器端，我们熟悉的 UI 事件有 `click`、`focus`、`mousemove`、`keydown` 等，这是浏览器原生实现的用户交互事件，让我们可以很方便跟页面进行互动。

在 JavaScript 的模块系统内，我们还可以自定义事件，用于模块与模块之间的交互和通信。模块交互，是通过自定义事件进行驱动的，具体地简单来说，就是 `模块A` 预先绑定 `模块B` 的某些事件，`模块B` 在某个状态下触发特定的事件，触发了绑定事件的 `模块A` 中的特定代码以执行。



### 一级事件

熟悉 Node.js 的开发者都知道，Node.js 提供了 `EventEmitter` 类对事件进行监听和触发。

```js

var EventEmitter = require('events').EventEmitter; 
var emitter = new EventEmitter(); 

//监听事件。
emitter.on('update', function() {      
    console.log('update 事件触发了'); 
}); 

//模拟在某个特定的时刻触发事件。
setTimeout(function() { 
    emitter.emit('update');   //出发事件
}, 1000);

```

KISP 提供了 Emitter 类，用于管理事件的监听和触发。

这种事件称为一级事件，因为事件名是一个单一的、有可读意义字符串，是最常用事件模式。一个模块可以通过不同的事件名来表示出该模块内部某个状态的出现，以通知外部的监听者。只要事件名是可读性的字符串即可，理论上只有一级事件也是够用的，但在某些场合下，只通过一个单一的字符串去表示一个事件名， 还不如把它拆成一个字符串的数组去表示更合理。这就需要多级事件。



### 多级事件

KISP 中的 `Emitter` 类，除了支持一级事件，还支持多级事件。

``` js
var Emitter = KISP.require('Emitter');
var emitter = new Emitter();

//绑定事件。
emitter.on('click', 'update', function (value) {
	console.log('click 中的 update 事件触发了，收到的值为：', value);
});

emitter.on('click', 'delete', function (value) {
	console.log('click 中的 delete 事件触发了，收到的值为：', value);
});


//触发事件。
emitter.fire('click', 'update', [100]);
emitter.fire('click', 'delete', [200]);

```

以上绑定多级事件的写法等价于：

``` js
//批量绑定的方式。
emitter.on('click', {
	'update': function (value) {
		console.log('click 中的 update 事件触发了，收到的值为：', value);
	},
    
    'delete': function (value) {
		console.log('click 中的 delete 事件触发了，收到的值为：', value);
	},
});

```


### 多样化的绑定方式

在绑定事件的方式上，借鉴了 `jQuery` 的优秀写法，并进行了扩展。`Emitter` 除了支持普通的单个绑定，也支持传入一个 Object 对象进行批量绑定，或者是两者的结合，非常灵活多样化，实际应用中可以根据需要选择一种或多种方式。

#### 线性绑定方式


一般来说，线性绑定（写法一）：
``` js
emitter.on('name0', 'name1', ..., 'nameN', fn);

```

#### 树型绑定方式
等价于树型绑定（写法二）：

``` js
emitter.on({
	'name0': {
    	'name1': {
        	...
            'nameN': fn,
        },
    },
});
```

`Emitter` 内部会把 Object 形式的绑定扁平化成写法一进行绑定。

树型绑定方式更直观，结构化更清晰，扩展性更好。不管是一级事件还是多级事件，都推荐使用此方式。



## 后台接口数据请求

KISP 提供了 `API` 类去请求后台接口以获取数据：

``` js
var API = KISP.require('API');
var api = new API('test/get_user_list');

//绑定各种事件。
api.on({
	//发起请求之前触发。
	'request': function () {
    	//loading.show('加载中...');
    },
    
    //接收到响应后触发。
    'response': function () {
    	//loading.hide();
    },
    
    //成功时触发。
    'success': function (data, json, xhr) {
    
    },
    
    //失败时触发。
    'fail': function (code, msg, json, xhr) {
    
    },
    
    //错误时触发。
    'error': function () {
    
    },
});

//发起请求。
api.post({
	//....	各种数据字段
});
```

## 本地代理模拟服务器响应

 > 在前后端完全分离的开发模式中，后端对于前端来说，相当于一个数据存取的角色。前端通过发起 Ajax 请求向后台接口获取数据，后台根据前端请求返回相应的响应数据。



![](http://www.definejs.com/data/upload/paste/2018-05-08/111904-55E1.png)


![](http://www.definejs.com/data/upload/paste/2018-05-08/112203-CD0E.png)

### 优势与好处

使用本地代理模拟服务器响应数据有以下好处：

 1. 前端页面可以脱离后台接口运行，提高并行开发的效率，更直接提高了前端的开发效率。
 2. 方便前端修改业务数据，针对不同的业务数据进行测试，更容易发现由于数据的不同而导致的问题。
 3. 避免后台接口不可用而影响前端的开发进度。
 4. 真正实现前后端完全分离、并发开发的利器，让前端有自己独立的设计和开发模式。
 5. 业务层对数据的来源一无所知，避免底层数据的改动而导致业务层逻辑的改动。
 
### 代理方式

KISP 提供了 `Proxy` 类来建立本地代理以模拟服务器响应，需要配合 `API` 类来使用 。本地代理可以使用 `.js`、`.json` 文件，响应内容的格式要符合后台接口的规定。

传入给 `API` 类构造器中的字段 `proxy` 即可指定要使用的响应文件及类型。该字段支持简写，此时代理的文件名跟 `API` 实例的名称一致。

``` js
var API = KISP.require('API');

var api = new API('get_user_list', {
	proxy: '.json', 	//等价于 `get_user_list.json`。
    proxy: '.js',	   //等价于 `get_user_list.js`。
    proxy: true,	    //等价于 proxy: '.js'。
    proxy: '...',	   //指定为其它具体的名称。
});

```

#### 使用 json 文件模拟响应

可以在本地指定一个 `.json` 文件来作为代理响应：

文件 `htdocs/api/get_user_list.json`：

``` json 
{
	"code": 200,
    "msg": "success",
    "data": [
    	{ "id": 1001, "name": "李明", "age": 30 },
        { "id": 1002, "name": "张小婷", "age": 25 },
    ],

}

```

使用 `.json` 文件作为代理响应的好处是简单、直观，可以直接把后台接口文档提供的示例数据保存成该类型，方便快捷。缺点是要严格符合 JSON 语法格式，且无法在数据内进行注释。

#### 使用 js 文件模拟响应

可以在在本地指定一个 `.js` 文件来作为代理响应，由于 js 文件是一段可执行的代码，因此需要通过一个 `proxy` 方法来包装响应数据。根据响应的内容，可以分为两种情况：



##### 静态 js 响应数据
直接使用 `proxy` 方法来包装要响应的模拟数据即可。

文件 `htdocs/api/get_user_list.js`：

``` js
KISP.proxy({
	code: 200,
    msg: 'success',
    data: [
    	{ id: 1001, name: '李明', age: 30 },
        { id: 1002, name: '张小婷', age: 25 },
    ],
});
```

静态 js 数据比 json 文件更灵活些，语法和格式更自由，也可以很方便添加注释等，但不能根据请求动态生成数据。

##### 动态 js 响应数据

实际项目中，我们常到这样的情况，希望本地代理可以根据不同的请求返回不同的响应数据，甚至希望通过一些规则可以大批量地产生数据。比如显示一个分页的列表，希望可以根据不同的页码显示不同的内容。此时，需要在代理中动态去构造数据。



只需要给 `KISP.proxy()` 方法传入一个回调函数（称为 `factory` 函数）即可成为动态响应数据的方式。`factory` 函数接受两个参数：

- `data` 为发起 `get` 或 `post` 请求时最终的数据字段
- `config` 为发起 `get` 或 `post` 请求时全部的配置字段。

文件 `htdocs/api/get_user_list.js`：

``` js
KISP.proxy(function (data, config) {
	
    //可以根据传入的 data 来动态构造数据。
    //此处可以有很复杂的构造数据逻辑，如生成随机数据、分页、存取本地数据等。
    var list = [ ]; 
    
    return {
    	code: 200,
        msg: 'success',
        data: list,
    };
});
```
 
**该方式可以生成很复杂的动态数据，并根据提交的参数进行处理，具有真正模拟后台逻辑的能力。**



## 模板填充

模板填充按填充所在的位置分为前端填充和后端填充。

大多数 Web 动态语言如 `JSP`、`ASP.NET`、`PHP` 等都是后台填充。此处关注的是前端填充，作为对比，它们的架构关系为：

![](http://www.definejs.com/data/upload/paste/2019-09-02/160840-0330.png)

### 前端模板填充

 > 模板填充是前端开发中非常重要且常用的一项技术。它可以快速地把 JS 数据生成到页面上进行展示。通过模板填充技术，可以把开发者的关注点从繁杂的 DOM 结点操作转移到 `String`、`Array` 和 `Object` 等 JS 对象的操作，从而对 DOM 的操作很少，几乎成了纯 JS 端的编程，对 JS 开发工程师更友好、更高效，也更容易维护和调试。
 
 > 在 DOM 性能上，通过填充后的内容字符串，一次性设置到容器 DOM 结点的 innerHTML 属性，可以极大提高渲染性能。
 
![](http://www.definejs.com/data/upload/paste/2019-09-02/160438-7981.png)
 
KISP 使用符合 W3C 标准的模板标签 `<template>...</template>` 对 HTML 模板内容进行表示。`<template>` 标签已在 HTML5 标准中原生支持，是存放 HTML 模板内容的最好的容器。

 - 支持一级模板填充。
 - 支持多级模板填充。
 - 支持根据条件进行模板选择。
 - 支持任意级别组合的模板填充。
 - HTML 模板与 JS 填充逻辑互相分离。
 - HTML 模板与 JS 数据结构互相对应，非常直观易用。
 
### 模板内容与填充控制逻辑相分离


KISP 推荐把 html 模板内容从 js 代码中分离出来。这里包含两个层面：

#### 文件内容与类型相一致

把 html 模板内容写在 `.html` 文件中，控制填充逻辑写在 `.js` 文件中。这样做的好处有：
 1. js 代码更清晰简洁，更容易维护。
 2. html 模板更容易修改，不易出错。
 3. js 性能更好，避免了字符串的拼接。
 4. js 代码和 html 模板更容易复用和共享。
   
#### 模板内容与控制逻辑相分离

从 html 模板中移除所有的控制和填充逻辑标记。

   - 让 html 模板内容回归纯粹的 html 字符串，不含有任何的控制 js 运行的逻辑。模板内容不会反过来影响 js 的流程、分支和判断等，避免引入不符合 W3C 标准的、自创的、特殊的、用于控制逻辑的标记和标签，如 `VUE` 中的 `v-if`、`v-for`，避免学习一门新的语言、语法等，可以让开发者更容易理解和放心使用。
   
   
   - 控制填充的逻辑全由 js 实现。控制逻辑写在 js 中，更容易断点和调试，更符合 js 程序员的思维，只需要懂填充规则和 js 语法即可，无需学习额外的语法和标签，回归最原生、最纯粹的前端开发，避免无意中要学习一门新的、实现在前端的动态语言。
   
   

这样做的好处：

 1. js 代码更清晰简洁，更容易维护。
 2. html 模板更容易修改，不易出错。
 3. js 性能更好，避免了字符串的拼接。
 4. js 代码和 html 模板更容易复用和共享。
 
 

 
### 一级模板


### 多级模板




## Web 客户端存储

针对原生的 `sessionStorage` 和 `localStorage` 上的一些设计不足，KISP 在它们的基础上封装了增强版的 `SessionStorage` 和 `LocalStorage` 类，主要解决了以下问题，可以让开发者更加方便地使用客户端存储功能：
 - 多个应用的命名冲突。
 - 同一应用中不同模块的命名冲突。
 - 数据类型保持。
 - 存取复杂对象。

``` js
//加载 SessionStorage 模块的类。
var SessionStorage = KISP.require('SessionStorage');

//创建一个名为 `test` 的实例。
var storage = new SessionStorage('test');

storage.set('abc', 123);
console.log(storage.get('abc')); //输出 123



//创建一个名为 `foo` 的实例。
var storage2 = new SessionStorage('foo');

storage2.set('abc', 456);
console.log(storage2.get('abc')); //输出 456

```

## 通用语言工具类
KISP 针对 JavaScript 语言自身的一些设计不足，提供了若干个语言工具类，用来提高开发效率。KISP 内部会使用这些语言工具类，业务开发者可根据需要选用。

 - **Array** 数组工具。
 - **Date** 日期时间工具，解析和格式化等。
 - **Hash** 浏览器地址栏 hash 工具，监听、解析、获取、设置 hash 等。
 - **JSON** 增强型的 JSON 工具，解析和字符串化等。
 - **Math** 数学相关工具。
 - **Object** 对象工具。
 - **Query** 浏览器地址栏 query 工具，解析、获取、设置 query 等。
 - **String** 字符串工具。
 - **Tasks** 多任务处理工具类，提供并行、串行处理任务列表。
 - **Tree** 树形结构的存储类，多级事件用到。
 - 更多...



## 配置和自定义数据

### 配置

 > KISP 内部包含了很多模块，每个模块需要一些配置选项来决定自身的逻辑和行为。为了简化开发者使用模块，KISP 内部提供了一套默认的、通用的的配置，能满足大多数场合，开发者无需传入繁多的配置选项字段即可快速使用。

实际应用中，每个项目可能各有不同，需要根据自身的情况去定制 KISP 内部模块的行为，因此需要一份自定义配置去（部分或全部）覆盖 KISP 内部提供默认配置。影响 KISP 内部模块的配置自底向上可以分为四个层次，层次上面配置的会覆盖下层的配置，换言之，越上层的配置优先级越高。对于复合对象，它们使用的是深度合并。

![](http://www.definejs.com/data/upload/paste/2019-09-04/113256-1ECD.png)

### 框架层通用默认配置

KISP 内部中通过 `模块名.defaults` 定义的配置为通用的默认配置，是最基础的配置。如 `API.defaults` 定义在 `API.defaults.js` 中：

``` js
//API 模块的默认配置
define('API.defaults', {
	//配置字段...
});

```

### 框架层终端差异化配置

KISP 内部的某些模块，既可用于 PC 端，也可用于移动端，差异可能仅仅是使用的配置不同。因此针对两个不同的环境，KISP 会提供两套配置。它们定义在 `模块名.config` 模块中，如 `Dialog.config` 定义在两个 `Dialog.config.js` 文件中，KISP 在打包自身时会根据使用的环境而选择对应的 `Dialog.config.js` 文件打包进去。

PC 端：

``` js
define('Dialog.config', {
    /**
    * 点击按钮时需要用到的事件名。
    * PC 端。
    */
    eventName: 'click',
});
```

移动端：

``` js
define('Dialog.config', {
    /**
    * 点击按钮时需要用到的事件名。
    * 针对移动端的是虚拟事件 'touch'。
    */
    eventName: 'touch',
});

```

通过对配置进行分层，可以最大化复用模块逻辑，做到模块可配置化。

由于框架层的配置对于业务层不可更改，业务层能提供的配置只有全局配置和实例化配置。

#### 业务层全局配置

- 一般在 `config.js` 文件中通过批量的方式进行配置：

``` js
//批量配置的方式。
KISP.config({
	//针对 `API` 模块的配置。
	'API': {
    	url: 'http://kisapp.kingdee.com:88/api/user/', 
        successCode: '0000',
    },
    
	//更多模块的配置...
});

```
- 也可以在具体某个业务模块的 `js` 文件里为单个模块指定全局配置：

``` js
KISP.config('API', {
	url: 'http://kisapp.kingdee.com:88/api/user/', 
	successCode: '0000',
});

```

#### 业务层实例化配置

此配置方式仅针对构造器模块，即可以通过 `new` 创建一个实例的模块。

``` js
var API = KISP.require('API');.

//在创建实例时传入配置。
var api = new API('get_user_list', {
	url: 'http://kisapp.kingdee.com:88/api/user/', 
	successCode: '0000',
});

```


### 自定义数据

**自定义数据是指针对业务层模块的配置数据。**

为减少、杜绝业务层的全局变量的使用，KISP 提供了针对业务层模块存取自定义数据的方法。
我们推荐统一在根目录下的 `config.js` 文件中设置自定义数据：


``` js
//批量设置的方式。
KISP.data({
	
    //针对模块 `/Products/Main/API` 自定义数据。
	'/Products/Main/API': {
    	//配置选项...
    },

});


//单个设置的方式。
//针对模块 `/Products/Main/API` 自定义数据。
KISP.data('/Products/Main/API', {
	//配置选项...
});

```

在模块 `/Products/Main/API.js` 文件中读取数据：

``` js
define('/Products/Main/API', function (require, module, exports) {
	//获取当前模块的自定义数据。
	var defaults = KISP.data(module.id);
    
    //...
});

```

因为自定义数据相当于交由 KISP 管理的某种程度上的 “全局数据”，为避免交叉影响，建议在设置自定义数据时，严格遵循以模块 id 为主键，不要用其它随意命名的主键，这样可以让使用对象和作用范围更清晰，避免修改后无意中影响到别的模块。

如以下为不推荐的方式：

``` js 
//不推荐。
KISP.data({
	//此自定义数据针对的使用对象不清晰，
    //时间长了、模块数增多后不敢修改。
	'pager': {
    	
    },
});
```





## 移动端
 > 通过把移动端的模块和配置打包进 KISP，就能用于移动端的开发（如轻应用），可以提供接近原生 App 的用户体验，而对于开发者来说，就跟开发 PC 端的 Web 应用一样，非常简单、高效和灵活。

### 滚动器
在移动端，在原生 App 有一个非常炫的功能，就是页面的上拉、下拉功能。KISP 基于第三方库 `iScroll` 实现了一个增强版的 UI 滚动器：`Scroller` 类：

 - 接近原生 App 的滚动体验，上拉、下拉，松手反弹回原处的动画效果。
 - 下拉刷新。
 - 上拉加载更多。

``` js
var Scroller = KISP.require('Scroller');

var scroller = new Scroller({
	top: '100px',
    bottom: '50px',
    container: 'div',
});

//启用下拉刷新。
scroller.pulldown(function (done) {
	//请求后台接口重新拉取数据。
    //完成后执行传入的回调函数 done()。
    
});

//启用上拉加载更多。
scroller.pullup(function (done) {
	//请求后台接口拉取下一页数据。
    //完成后执行传入的回调函数 done()。
});

//开始启动。
scroller.render();


```

### 视图过渡



#### 过渡动画

#### 滑动返回手势支持





## 视图导航器

 > 在单页应用（`SPA`）中，浏览器的地址都是指向同一个页面。浏览器的前进、后退按钮已变得不可用，因为并未发生页面的跳转。视图成了单页应用中的 “逻辑页面”，要表示出视图间的顺序关系，恢复传统的浏览器前进、后退、刷新功能，就很有必要实现一个视图导航器。
 
![](http://www.definejs.com/data/upload/paste/2019-09-03/170326-DEC2.png)

### 优点

通过视图导航器，单页应用几乎可以完全模仿了传统的多页面导航方式，同时保留了单页应用的优点：
 - 通过浏览器的前进、后退按钮进行导航，保留了用户的使用习惯。
 - 维持了视图的状态，按刷新按钮可以停留在当前视图，并直接刷新当前视图（重新渲染）。
 - 更方便开发者调试，可以快速定位到目标视图。
 
### 使用方式
KISP 提供了 `Navigator` 类来管理视图的导航，并通过事件来告知发生了不同的行为和进入了相应的状态。
`Navigator` 类是基于浏览器地址栏 `hash` 的状态导航器，通过监听 `hash` 的变化来检测当前的状态。

KISP 在启动入口会传入一个 `Navigator` 的实例 `nav`，业务层直接使用它进行事件绑定即可：

``` js
KISP.launch(function (require, module, nav) {
	
    nav.on({
        //只要视图发生变化就触发。
        'view': function (view, args, info) {
            
        },

		//状态栏无任何视图名时触发。
        'none': function () {
            nav.to('Login');	//
        },
		
        //页面开始运行时触发。
        'start': function (hash, old) {
		
        },
    });

	//开始解析和监听地址栏中的 hash。
    nav.render();
    
    //跳转到指定视图。
    nav.to('Products');
    
    //后退。
    nav.back(1);

});

```

### hash 与视图之间的路由关系

默认情况下，浏览器地址栏中的 `hash` 即为当前的视图名（因为在单页应用中，每个视图名是不同的、唯一的）。如当前视图为 `Products`，则地址栏中的 `hash` 为 `#Products`。此表示方法非常直观、简单，根据 `hash` 即可识别出当前显示的视图，进而定位到逻辑中去调试。

某些场合下，我们可能想把 hash 表示成另一种形式，而不是直接显示对应的视图名。此时可以进行 hash 与 view 之间的路由映射和转换。

#### 静态映射

通过静态映射可以让 view 与 hash 进行双向的一一映射，适应于个别的、可枚举的视图。

``` js

//静态路由。
nav.route({
	/**
    * 把视图名映射成 hash。
    */
    view$hash: {
        'Login': '/index.html',
    },

	/**
    * 把 hash 映射成视图名。
    */
    hash$view: {
        '/index.html': 'Login',
    },

});

```

#### 动态映射

动态映射适用于非特定的视图，按一定的算法规则进行转换的场合。

例如可以把视图名 `Products` 转成 `/products.html` 显示在 hash 上。

``` js

//动态路由。
nav.route({
    //把 view 转成 hash。
    toHash: function (view) {
        
    },

    //把 hash 转成 view。
    toView: function (hash) {

    },
});

```


## 通用 UI 模块化

前端页面经典的三层结构：

![](http://www.definejs.com/data/upload/paste/2019-09-02/111307-3F03.png)

### HTML 模块

在前端页面中，JS 是行为层，KISP 使用树型结构的模块系统对它们进行有效的管理。

对应于行为层，HTML 是页面的结构层，是 UI 层的基础。为了方便管理，KISP 把 HTML 进行了模块化管理。对应于 `JS 模块`，我们把 HTML 结构层的模块称为 `HTML 模块`。

通过在 HTML 标记指定的 DOM 节点为 `data-panel="id"` 即可声明一个 `HTML 模块`。

![](http://www.definejs.com/data/upload/paste/2019-09-02/112937-17EC.png)

### UI 模块


`JS 模块` 与 `HTML 模块` 的关系更像是一对夫妻关系，它们可以各自单身，但是一旦成为夫妻，要严格执行`一夫一妻制`。换言之，`JS 模块` 与 `HTML 模块` 可以不进行对应，一旦进行对应，则只能是一一对应，而不能进行一对多、多对一、多对多的关系。

一般来说，我们建立一个 `HTML 模块`，是为了方便用对应的 `JS 模块` 去操纵它，而不会让它成为一个孤立的 UI 模块。因此，从这个角度来说，一个 `HTML 模块` 必定有一个同名（id）的 `JS 模块` 存在并且维护它的功能逻辑。`HTML 模块` 和对应的 `JS 模块` 组成了一个通用的 `UI 模块`。即：

![](http://www.definejs.com/data/upload/paste/2019-09-02/112609-313E.png)


### 通用 UI 模块类：`Panel`

KISP 提供一个 `Panel` 类来定义（实例化）一个 `UI 模块`，并且提供了一些标准的方法和事件。这样做的好处是通过提供一个统一的代码模板来约束和规范业务代码，让 JS 代码同质同构化，提高项目代码在团队内的可维护性。

`Panel` 实例有自己的生命周期，最重要的表现是会按顺序触发一系列的事件。有些事件只会触发一次，有些事件则会触发多次，每个事件有自己的适用范围，适合用来绑定相应的业务逻辑，非常灵活、方便。

``` js
KISP.panel(id, function (require, module, panel) {

    /**
    * 初始化。
    * 只会执行一次，适合用来绑定事件。
    */
	panel.on('init', function () {
    
    });
    
    /**
    * 渲染。
    * 每调次调用 render() 都会执行。
    */
    panel.on('render', function (...args) {
    
    });
    
    /**
    * 显示时触发。
    */
    panel.on('show', function () {
    
    });
    
    /**
    * 隐藏时触发。
    */
    panel.on('hide', function () {
    
    });
    
    //还有更多事件...
    
    /**
    * 需要对外暴露的方法和成员。
    */
    return {
    
    };
});

```

### 方便调试

对于一个前端团队来说，功能模块分给不同人员的交叉开发（维护）是很常有的事。如何让 A 同学快速接手、切入 B 同学之前写的逻辑，是个很关键问题。KISP 提供的 `HTML 模块` 与 `JS 模块` 一一对应的特性可以很好地解决了此问题。

 1. 在页面上确定 UI 位置。
 2. 通过查看 DOM 元素，得到该 HTML 模块的 id。
 3. 根据 HTML 模块的  id 确定 JS 模块的 id，两个 id 是一致的。
 4. 根据 JS 模块 id 与目录命名规则的关系，快速定位到 JS 模块所在目录和位置。
 5. 根据 Panel 的生命周期和事件特性等，快速定位到具体的代码位置。
 
 
 例如：
 
 1. 首先在页面上确定 UI 位置：
 ![](http://www.definejs.com/data/upload/paste/2019-09-02/110014-5F5D.png)
 
 2. 通过查看 DOM 元素，确定它所在的 HTML 模块为 `/AccountUsers/Main/List`：
![](http://www.definejs.com/data/upload/paste/2019-09-02/110041-EF85.png)

 3. 根据 HTML 模块的 id 确定 JS 模块为 `/AccountUsers/Main/List`。
 
 4. 在项目中找到 JS 模块：
![](http://www.definejs.com/data/upload/paste/2019-09-02/110654-005F.png)

 5. 进一步确定要修改的代码位置。
 
 
### 多样化的批量绑定事件方式

如果你熟悉 `jQuery` 的事件绑定方式，那么 KISP 提供的针对 UI 的原生事件批量绑定方式将非常好用。

按绑定的目标，分两种情况：**按事件名** 和 **按 DOM 元素**。

#### 按事件名批量绑定多个元素

在一个 `UI 模块内`，我们经常遇到需要按事件名对多个 DOM 元素进行绑定。此时，被绑定的多个 DOM 元素共用同一个事件名，比如对一组不同的元素绑定 `click` 事件：

``` js
//对一组不同的元素绑定 `click` 事件。
panel.$on('click', {
	'[data-cmd="update"]': function (event) {
    	
    },
    
    'input[type="text"]': function (event) {
    
    },
    
    'button': function (event) {
    
    },
    
    //更多元素...
});

//为方便代码聚合，还可以把多个事件合并写在一起。
panel.$on({
	'click': {
		'[data-cmd="update"]': function (event) {

        },

        'input[type="text"]': function (event) {

        },

        'button': function (event) {

        },

        //更多元素...
    },
    
    'keydown': {
    	'button': function (event) {

        },
        //更多元素...
    },

});

```

#### 按元素批量绑定多个事件

在一个 `UI 模块内`，我们还经常遇到需要对同一个元素绑定多个事件的。此时，多个事件给批量绑定到同一个元素上，比如对一个文本输入框 `input[type="text"]` 绑定一组不同的事件：

``` js
//对一个文本输入框批量绑定事件。
panel.$bind('input[type="text"]', {
	'focus': function (event) {
    	
    },
    
    'blur': function (event) {
    
    },
    
    'change': function (event) {
    
    },
    
    //更多事件...
});


//为方便代码聚合，还可以把多个元素合并写在一起。
panel.$bind({
	'input[type="text"]': {
    	'focus': function (event) {
    	
      	},

      	'blur': function (event) {

      	},

      	'change': function (event) {

      	},

      	//更多事件...
    },
    
    'button': {
    	'click': function (event) { 
        
        },
        
        'keydown': function (event) {
        
        },
        
        //更多事件...
    },

});
```

## 分布式独立包资源加载

 > 在单页应用的模式下，我们使用 `KISP` 作为前端开发框架，结合 `web-master` 自动化开发工具，在 Web 项目中享受到了很多开发中的好处，也提升了用户体验。随着 Web 项目功能越来越复杂，视图和模块数越来越多，纯粹的单页应用模式也暴露了致命的问题：**文件体积过大，首屏加载太慢，严重影响了用户体验**。

![](http://www.definejs.com/data/upload/paste/2019-09-04/160939-D5F1.png)

### 为什么需要分布式加载

![](http://www.definejs.com/data/upload/paste/2019-09-04/161204-E5CB.png)

### 独立包

分布式加载的单位：独立包。

一个独立包就是一组具有相关性的模块和资源文件的集合及其描述信息。它包含如下信息：
 - 名称。一个，具有全局唯一性。
 - 资源类型。零到多个，具有包内唯一性，包括 `css`、`js`、`html`。
 - 资源路径。零到多个，包括 `css`、`js`、`html`。
 - 资源文件。真实存在的实体物理文件。

经过 `web-master` 自动化开发工具编译后，生成一个总的描述信息到 `htdocs/packages/all.json` 文件中，KISP 在页面加载时会首先加载该文件，以确定需要分布式加载的独立包。

总的描述信息文件 `htdocs/packages/all.json` 结构如下：

``` json
{
    "Products": {
        "css": "style/css/Products.css?7027",
        "js": "packages/items/Products.js?B1A0",
        "html": "packages/items/Products.html?442E"
    },
}

```
一般来说，我们以视图为单位作为一个独立包，视图名即为独立包的名称，如上面文件中的 `Products`。
当首次进入到 `Products` 视图时，KISP 会自动加载该独立包关联的资源文件。

### 加载方式

#### 自动加载

如果独立包是对应一个视图，在首次进入该视图时，KISP 会自动加载该视图对应的独立包及其资源文件，加载成功后再渲染该视图。这一切都是发生在背后的，用户只需要按正常的视图导航方式进入该视图即可，无需干预。

例如针对上面的例子，用户进入视图 `Products` 后，KISP 会从总的描述信息包 `all.json` 中获取到该独立包的资源路径，并采用异步的方式进行自动加载，加载成功后再渲染该视图。

![](http://www.definejs.com/data/upload/paste/2019-09-04/164924-7EC2.png)

![](http://www.definejs.com/data/upload/paste/2019-09-04/164949-404F.png)

#### 手动加载

有时需要把一组模块打包成一个独立包，并在特定场合下才能使用到，比如日期选择组件 `DatePicker`。只有在需要用到它的时候，才去加载（按需加载），也是一种很好的优化方案。此时需要开发者手动去加载独立包。

``` js
KISP.load('DatePicker', function (info) {
	
});
```

![](http://www.definejs.com/data/upload/paste/2019-09-04/165514-956A.png)

### 生命周期

在页面的整个生命期间：

 - 总的描述信息包 `all.json` 文件只加载一次，成功或失败后结果都会缓存起来。
 - 指定名称的独立包中的资源文件，只加载一次，成功或失败后结果都会缓存起来。
 - 指定名称的独立包中的资源文件，采用并行方式进行加载，在全部加载成功后执行回调。
 - 加载资源文件时会优先考虑浏览器的缓存策略（通过文件内容 md5 命名确保缓存生效）。
 
### 适用于独立包的情况


适合把一组模块和资源文件独立打包的情况

 - 首屏不需要用到的功能模块和资源文件。
 - 独立视图的功能模块和资源文件。
 - 特定条件下用到的大型数据。
 - 特定条件下用到的功能模块和资源文件。
 
### 单页应用与独立包的关系

 - ** 单页应用：`合` **

    把所有的模块、视图和资源合到单一页面中运行，通过多个独立视图的方式来模拟传统PC端的多页面方式，避免多页面跳转的重新加载问题。

 - ** 独立包：`分` **

    把首屏视图中不需要用到的模块、视图和资源等剥离出去单独打包，在需要到时再加载到单页中运行，让首屏加载瘦身，提高加载速度，提升用户体验。

 > 分与合是一种对立、统一的关系，互为补充、互相促进。

![](http://www.definejs.com/data/upload/paste/2019-09-04/170338-C17C.png)
![](http://www.definejs.com/data/upload/paste/2019-09-04/170358-2906.png)



## 内置 UI 组件
 > 发展到如今，KISP 给应用到大大小小的项目中，过程中不断完善，在功能和接口上，越来越稳定。KISP 遵循最小够用原则，针对大多数的项目，提供了若干个相对常用的 UI 组件。这些组件不是 KISP 的核心，它们只是为用户提供一些简单易用和常用的功能，以加速项目的开发。开发者可根据情况选用或不用，也可以覆盖它们的内置样式，以满足项目自身的需要。

### Dialog 对话框

![](http://www.definejs.com/data/upload/paste/2019-09-04/110636-FA84.png)

``` js
var Dialog = KISP.require('Dilaog');

var dialog = new Dialog({
	title: '标题',
    content: '你好，内容',
    width: 400,
    height: 200,
});

dialog.show();

```

### Alert 对话框
模仿浏览器原生的 `alert` 对话框，提供了一个更美观、简洁的弹出层 `alert` 对话框。

![](http://www.definejs.com/data/upload/paste/2019-09-04/104806-E0F8.png)

``` js
KISP.alert('hello', function () {
	//点击 `确定` 后要执行的回调函数。该函数是可选的。
});
```

可以连续多次调用 `KISP.alert()`，它们会被放进一个队列里依次调用并显示出来。即它们会在上一个 `alert` 点击 `确定` 后再显示下一个 `alert`，而不会一下子全部显示出来。



### Confirm 对话框
模仿浏览器原生的 `confirm` 对话框，提供了一个更美观、简洁的弹出层 `confirm` 对话框。

![](http://www.definejs.com/data/upload/paste/2019-09-04/105446-37A4.png)

``` js
KISP.confirm('你确定要执行此操作吗？', function () {
	//点击 `确定` 后要执行的回调函数。该函数是可选的。
    
}, function () {
	//点击 `取消` 后要执行的回调函数。该函数是可选的。
});
```

可以连续多次调用 `KISP.confirm()`，它们会被放进一个队列里依次调用并显示出来。即它们会在上一个 `confirm` 点击 `确定` 或 `取消` 后再显示下一个 `confirm`，而不会一下子全部显示出来。

### Toast 对话框

![](http://www.definejs.com/data/upload/paste/2019-09-04/111033-FFA9.png)![](http://www.definejs.com/data/upload/paste/2019-09-04/111119-9C33.png)![](http://www.definejs.com/data/upload/paste/2019-09-04/111710-3FAC.png)

``` js
var Toast = KISP.require('Toast');

//成功图标。
var toast1 = new Toast({
	icon: 'check',
    duration: 1500,		//1500 毫秒后自动消失。
});

toast1.show('操作成功');


//失败图标。
var toast2 = new Toast({
	icon: 'close',
});

toast2.show('操作失败');



//无图标。
var toast3 = new Toast({
	icon: '',
});

toast2.show('提示信息');
```



### Loading 加载中组件
![](http://www.definejs.com/data/upload/paste/2019-09-05/094351-A8F3.png)

``` js

var loading = KISP.create('Loading');

loading.show('加载中...');

//loading.hide();

```

### Tabs 通用页签组件
具有互斥性质的列表项，都可以用 `Tabs` 组件来管理。

![](http://www.definejs.com/data/upload/paste/2019-09-05/094726-178F.png)

![](http://www.definejs.com/data/upload/paste/2019-09-05/094809-E8D8.png)

``` html
<ul data-panel="/AccountBaks/Tabs" class="change-tab">
    <template>
        <li data-index="{index}">{text}</li>
    </template>
</ul>
```

``` js

KISP.panel('/AccountBaks/Tabs', function (require, module, panel) {
    var KISP = require('KISP');
    var tabs = null;
    
    var list = [
        { text: '公有云手动备份', cmd: 'manual', },
        { text: '公有云自动备份', cmd: 'auto', },
        { text: '私有云备份', cmd: 'private', },
    ];

	/**
    * 初始化。
    * 只会执行一次，适合用来绑定事件。
    */
    panel.on('init', function () {
    	//创建实例。
        tabs = KISP.create('Tabs', {
            container: panel.$,             //页签的容器。
            selector: '>li',                //页签项的元素选择器。
            activedClass: 'on',             //激活项的 css 类名。
            eventName: 'click',             //监听的事件名。
            repeated: true,                 //允许重复点击。
        });

        //设定填充规则。
        tabs.template(function (item, index) {
            return {
                'index': index,
                'text': item.text,
            };
        });

        //绑定事件。
        tabs.on('change', function (item, index) {
            panel.fire('change', item.cmd, [item]);
        });

    });

	/**
    * 渲染。
    * 每调次调用 render() 都会执行。
    */
    panel.on('render', function () {
        tabs.render(list);	//填充并渲染。
        tabs.active(1);	   //激活指定的项。
    });

});
```
### Mask 遮罩层组件

提供默认的遮罩层实现，可以监听 `show`、`hide` 事件，也可以指定是否为易消失的（即点击遮罩层后自动消失）。

![](http://www.definejs.com/data/upload/paste/2019-09-05/095950-24F2.png)

``` js
//创建实例。
var masker = KISP.create('Mask', {
    volatile: true,     //指定为易消失的，即点击后自动隐藏。
    duration: 1500,     //要持续显示的时间，单位是毫秒。
});

//绑定事件。
masker.on({
	//显示时触发。
    'show': function () {
    
    },
    
    //隐藏时触发。
    'hide': function () {
    
    },
});

//显示组件。
masker.show();
```

