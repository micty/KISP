
#页面重构开发规范
---------------------------------------------------------------

###1.绪论


页面重构是 Web 开发流程中很重要的一个环节，其输出的静态页面的质量，在一定程度上直接影响着 Web 站点质量和 JS 开发的效率和质量。
页面重构师作为一个独立的角色和职位，更需要向专业化、规范化的方向发展，因此也需要一份完整的页面重构的开发规范。


###2.HTML规范
####2.1缩进及引号
所有的代码都要按结构化进行缩进，缩进大小为 4 个空格。主要涉及到的有 js、css、html、json、xml 等文件。
在 html 中用统一用双引号，而在 js 中统一用单引号，以避免单双引号带来的麻烦。html 标签的属性值要用双引号包裹起来。

推荐的写法：
```html
<ul style="display: none;">
	<li>
		<input type="text" placeholder="姓名" />
	</li>
</ul>
```

####2.2类名

class 的命名推荐用纯小写，单词与单词之间用连字符 `-` 连接。 不推荐用大小写混合的形式，也不要用下划线 `_` 对单词进行连接，更不允许把两个小写的单词直接写在一起。

推荐的写法：
```html
<div class="method-summary"></div>
<ul class="list">
	<li></li>
</ul>
```

不推荐的写法：
```html
<div class="methodsummary"></div>
<div class="methodSummary"></div>
<div class="method_summary"></div>
```
####2.3页面整体结构
css 样式文件在 `<head>`与 `</head>` 标签内引入。
js 脚本文件在 `</body>` 标签结束之前引入。
js 代码单独放在 js 文件中，不要混合写在页面中。

####2.4必要的标签
文档字符编码统一使用不带 `BOM` 头的 `UTF-8`，加上特定的 html 文档的 `DOCTYPE` 声明，浏览器会利用文档的 `DOCTYPE` 进行文档的有效性验证。
更重要的是，`DOCTYPE` 声明会影响浏览器对文档的解析以及渲染，浏览器会对没有正确使用 `DOCTYPE` 声明的文档采用混杂模式进行呈现，而我们需要浏览器对我们的文档以标准模式呈现。
`html5` 文档 `DOCTYPE` 声明为 `<!DOCTYPE html>`，本规范统一使用 `html5` 的 `DOCTYPE` 声明。

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>KIS 微导购</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
</head>
<body>
</body>
</html>
```

####2.5关闭所有标签
html 中原先就有关闭标签的，就要按照规定关闭标签，比如 `<div></div>`,`<table></table>`,`<tr></tr>` 等标签。
属于不带关闭标记的独立标签，则要按照独立标签的规定结束标签，比如`<meta />`,`<img />`,`<link />` 等标签需要在结束前的 `>` 前加上 `/`。

####2.6必要的代码注释
页面中往往需要切换某些 class 以达到某种显示效果，为了便于页面重构师与 JS 开发工程师的分工与合作，某些时候，页面重构师在 html 中加上一些必要的注释以告诉 JS 开发工程师类名的使用和切换，可以提高两个角色的沟通效率。

JS 开发工程师在实际页面开发中，必须把这种注释去掉，以减小文件大小。

html 文档注释语法为`<!--这是注释-->`

如页面重构师提供的静态页面：
```html
<!--on类代表搜索获取焦点，has类代表已输入文字出现的样式-->
<div class="search on has">
    <input type="text" placeholder="输入客户名称/代码" />
    <span class="delete"></span>
    <span class="search-icon">确定</span>
</div>
```
####2.7不要在页面中绑定事件
尽量少使用 `onclick`，`onmouseover` 等等属性来绑定事件处理器，更加不要直接将事件处理函数的 js 代码直接写在 html 标签属性值中。利用 html 标签属性绑定事件处理器会使 html 代码中夹杂了 js 代码，html 代码变得混乱，难于维护。

####2.8 给img标签加上必要的alt属性
如果由于某些原因图片无法显示，`alt` 属性中的文本会替代图片显示给用户，给 `img` 标签加上alt属性时，有利于在图片无法显示时提供有关于图片的描述信息，推荐在文档的每个图像中都使用这个属性。这样即使图像无法显示，用户还是可以看到关于丢失了什么东西的一些信息。而且对于残疾人来说，`alt` 属性通常是他们了解图像内容的唯一方式。

####2.9自定义属性
需要为 html 元素添加自定义属性的时候，首先要考虑下有没有默认的已有的合适标签去设置, 如果没有, 可以使用须以 `data-` 为前缀来添加自定义属性，以区分标准的属性。


####2.10省去不需要的属性
`style` 标签的 `type` 属性默认为 `text/css`， 可以省去。
`link` 标签用于引入 css 资源时, 可省去 `media` (默认为 `all` ) 和 `type` (默认为 `text/css`) 属性。
`script` 标签的 `type` 属性可以省去（默认为 `text/script`）。

```html
<link href="f/kisp/kisp.debug.css" rel="stylesheet" />
```
```html
<style>
	.list {
    
    }
</style>
```

```html
<script src="config.js"></script>
```

####2.11 避免使用标签属性定义元素样式
关于定义文档应该如何展现的内容应该交个 css 去处理，而不是在 html 标签属性中定义，同样，混乱的 html 代码会变得难看，同时也不利于 html 跟 css 的分离，也就是结构以及展现的分离，除非必要时候使用 `width` 以及 `height` 属性定义 `img` 宽高。如：
```html
<img width="100px" height="50px" />
```

####2.12一些优化细节
- 页面尽量减少图片 `img` 标签的使用，尽量写到 css 上，用背景表现。
- 给所有的属性赋值，不要出现属性值为空的情况。
- 在文档中引入尽量少的样式和脚本。
- 每个页面必须有且仅有一个 `<title></title>` 标签;
- 省略图像、媒体文件、样式表和脚本等 URL 协议头部声明 (`http:`、`https:` )。 如果不是这两个声明的 URL 则不省略。
- 用类似这样的工具 W3C HTML validator 来对文档有效性进行测试。
- 在页面中尽量避免使用内联样式属性 style。
- 严格遵守 xhtml 规范，标签、属性全部小写。
- 特殊符号使尽可能使用代码替代，如 `α`用 `&alpha;`，`©`用 `&copy;` 代替。


###3.CSS规范
#####3.1选择器
