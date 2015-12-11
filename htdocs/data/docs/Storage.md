#Web 客户端存储

##1.原生 localStorage 和 sessionStorage
###1.1概述
HTML5 提供了两种在客户端存储数据的新方法：
- `localStorage`：没有时间限制的数据存储。
- `sessionStorage`：针对一个会话的数据存储。

之前，这些都是由 `cookie` 完成的。 但是 `cookie` 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 `cookie` 速度很慢而且效率也不高。

###1.2区别和联系
- `localStorage` 和 `sessionStorage` 一样都是用来存储客户端临时信息的对象。 它们均只能存储字符串类型的对象，虽然规范中可以存储其他原生类型的对象，但是目前为止没有浏览器对其进行实现。
- `localStorage` 生命周期是永久，这意味着除非用户显式地在浏览器提供的界面上或用 js 调用相应方法来清除 `localStorage` 信息，否则这些信息将永远存在。
- `sessionStorage` 生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过 `sessionStorage` 存储的数据也就被清空了。
- 不同浏览器无法共享 `localStorage` 或 `sessionStorage` 中的信息。
- 相同浏览器的不同页面间可以共享相同的 `localStorage`（页面属于相同域名和端口）。
- 相同浏览器的不同页面或标签页间无法共享 `sessionStorage` 的信息。这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个 `iframe` 标签且它们属于同源页面，那么它们之间是可以共享 `sessionStorage` 的。


###1.3原生存储的局限

####1.3.1无法保持数据类型

浏览器提供的原生 `localStorage` 和 `sessionStorage` 只能存储字符串类型的值，如果传进去的值不是字符串类型的，则浏览器会先转为字符串再进行存储。如：
```javascript
var value = 123;
console.log(typeof value); //输出 'number'
sessionStorage.setItem('test', value);
value = sessionStorage.getItem('test');
console.log(typeof value);	//输出 'string'
```
由上面的例子可以看出，`set` 之前和 `get` 之后的值发生了转换，而这种转换不是我们期望的，因为更多时候，我们期望的是存储什么类型的值，取出来的还是什么类型的值。

####1.3.2无法存储复杂对象
由于原生的 `localStorage` 和 `sessionStorage` 只能存储字符串类型的值，因此也无法存储复杂对象的数据类型：
```javascript
sessionStorage.setItem('obj', {a: 123});
var obj = sessionStorage.getItem('obj');
console.log(obj);	//输出 '[object Object]'
```
我们期望取到的 obj 是 `{a: 123}`，而不是 `'[object Object]'`。发生这样的转换，原因就是浏览器会把非字符串的数据直接转换为字符串再进行存储。
对于对象，会调用 `toString()` 方法来获得字符串值。

##2.KISP中的客户端存储
###2.1改进后的存储
为了实现我们的 `set` 和 `get` 值的类型保持一致的目标，KISP 对原生 `localStorage` 和 `sessionStorage` 进行了封装，以实现开发者在 `set` 和 `get` 过程中值的数据类型透明化，即取出来的值跟存储进去的值，在类型和值上完全一样。

要实现该目标很简单，KISP 在内部维护一个全局的存储容器对象，在存储时会把该对象序列化成 JSON 字符串进行存储；在取出来过程中，会对该 JSON 字符串进行反序列化成对象。由于 JSON 在序列化和反序列化双向过程中不会丢失数据类型，并且是完全可逆的，因此非常适合存储复杂类型的数据。

我们来看一个例子：
```javascript
var json = {
	value: 123,
};

console.log(typeof json.value); //输出 'number'

//模拟 set 操作
json = JSON.stringify(json);
sessionStorage.setItem('json', json);

//模拟 get 操作
json = sessionStorage.getItem('json');
json = JSON.parse(json);
console.log(typeof json.value); //输出 'number'
```
由此可见，通过 JSON 对复杂类型进行序列化和反序列化，可以保持数据类型不发生转换，从而达到我们的期望和要求。在 KISP 中，实现会更复杂些，但基本原理不变。

KISP 实现了两个类：`LocalStorage`、`SessionStorage`，分别对应于原生的 `localStorage`、`sessionStorage`，不同的是，KISP 是以类的方式实现的，因此需要先创建实例，再调用实例上的 `set` 和 `get` 方法。

###2.2多个轻应用中的客户端存储

####2.1.1命名冲突问题
在实际开发中，往往多个轻应用都用到客户端存储，为了避免多个轻应用之间在存储和读取时会产生命名冲突，以及让每个轻应用在使用客户端存储时有自己独立的命名空间和简短的命名方式，KISP 对每个轻应用的存储采用独立沙箱的机制。

我们来看一个例子：在`轻应用 A` 中，可能会用到 
```javascript
Storgage.set('abc', 123); 
```
在`轻应用 B` 中，开发者并不知道`轻应用 A` 已经使用了 `abc` 的健存储了一个值，因此可能也会用到
```javascript
Storgage.set('abc', 456); 
```
那么问题来了，键为 `abc` 的值到底是多少呢？两个轻应用存储的数据是否会互相影响？答案是否定的。

####2.2.2独立沙箱机制
 KISP 采用了沙箱机制确保每个轻应用都在自己的空间中进行存储和读取，而不会越界到别的轻应用中。这点就像 Windows 操作系统中对进程内存的管理一样。

要实现每个轻应用独立存储的目标，需要每个轻应用在使用类`LocalStorage`、`SessionStorage` 之前进行配置。假如当前轻应用起名为 `vGuide`，则配置为：
```javascript
KISP.config({
	'LocalStorage': {
		name: 'vGuide',
	},
	'SessionStorage': {
		name: 'vGuide',
	},
});
```
经过设置后，KISP 中的 `LocalStorage`、`SessionStorage` 所有的操作就会限制在名为 `vGuide` 命名空间里，而此命名空间正是当前轻应用的名称，因此跟其它轻应用冲突的概率就小得多了。

如果你还担心别的轻应用刚好使用了名为 `vGuide` 的名称，那你可以加一个确定的随机串，如 `vGuide-5108BAC7A275`。需要注意的是，为了确保浏览器刷新后命名空间的名称不变，随机串必须是首次确定的，即确定后在浏览器刷新、关闭后都不会再发生变化的。

####2.2.3基于模块的存储空间
上面设置了针对整个轻应用的命名空间，解决了多个轻应用中的命名冲突问题。在实际开发中，往往有多个模块需要单独管理自己的客户端存储，因此也需要独立的命名空间，用类似的原理，KISP 做到了基于模块的存储空间，在创建存储实例时指定一个名称即可。

我们以 `SessionStorage` 为例：
```javascript
//加载 SessionStorage 模块的类
var SessionStorage = KISP.require('SessionStorage');

//创建一个针对当前模块存储空间名为 test 的实例
var storage = new SessionStorage('test');
storage.set('abc', 123);
console.log(storage.get('abc')); //输出 123

//创建一个针对当前模块存储空间名为 foo 的实例
var storage2 = new SessionStorage('foo');
storage2.set('abc', 456);
console.log(storage2.get('abc')); //输出 456
```

类似的，模块内的命名空间，在当前轻应用内是共用的，为了避免跟其它模块的冲突，也可以给名称加上确定的随机的串来解决。




```javascript
//加载 SessionStorage 模块的类
var SessionStorage = KISP.require('SessionStorage');

//创建一个针对当前模块存储空间名为 test-A343C69C3189 的实例
var storage = new SessionStorage('test-A343C69C3189');
```

需要注意的是，为了确保浏览器刷新后命名空间的名称不变，随机串必须是首次确定的，即确定后在浏览器刷新、关闭后都不会再发生变化的。

###2.3改进后的优势
- KISP 通过维护内部一个总容器对象来管理所有的存储，使用 JSON 的序列化和反序列化技术，实现了数据类型的不变存储与读取，以及对复杂对象存储和读取。
- KISP 通过对轻应用设置客户端存储的命名空间，解决了多个轻应用的命名冲突问题，避免了每个轻应用内部在实际存储时再去管理很长的一串名称，简化了轻应用的业务代码。
- KISP 通过提供 `LocalStorage`、`SessionStorage` 两个类来让轻应用的模块独立的创建存储实例，解决了多个模块操作客户端存储时的命名冲突问题，可以更加方便多个模块独立的管理和维护客户端存储。

-----------------------------------------