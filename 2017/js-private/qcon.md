# 编程语言如何演化
	—— 以 JS 的 private 为例

##	Introduction of
	My Company
	and Myself

百姓网
www.baixing.com

github: @hax
zhihu: 贺师俊
weibo: @johnhax


编程语言

两种
极端

你用什么语言？	,
（鄙视脸）

语言都一样！,
（鄙视脸）

人们总是

高估短期
低估长期

不太可能是
项目成败的
决定性因素

影响团队的
长期生产力

主题：演化

新特性

What/How

Why

为什么要引入新特性？

为什么长这样？

静态 -> 动态

剧烈演化

Rust/Swift

Go

JS

矛盾体

## private

讨论历史可以追溯到ES4
贯穿了整个ES6的开发历史
最终决定postpone到ES7+
先后至少有4份proposal

对于JS程序员
并没有立即可
用的实践价值

Stage 2

ES ?

对工程实践
中系统演化
有借鉴意义

### 可见性
- public
- private
- protected

### 可见性
- package-private
- internal
- internal protected
- friend（友元）

最基本的是
public
private

## private
	in JS

### ES5-
No Class
All public

### ES2015
MM Class
All public

Maximally-Minimal
Class

MM Class
- constructor
- static methods
- prototype methods

```js
class RGBColor {
	constructor(r, g, b) {
		this._c = [r, g, b]
	}
	toString() {
		const [r, g, b] = this._c
		return `rgb(${r}, ${g}, ${b})`
	}
	get red()   { return this._c[0] }
	get green() { return this._c[1] }
	get blue()  { return this._c[2] }
	static equals(c1, c2) {
		return c1.red   === c2.red
			&&   c1.green === c2.green
			&&   c1.blue  === c2.blue
	}
}
```

```js
function RGBColor(r, g, b) {
	this._c = [r, g, b]
}
RGBColor.prototype.toString = function () {
	const [r, g, b] = this._c
	return `rgb(${r}, ${g}, ${b})`
}
Object.defineProperty(RGBColor.prototype,
	'red', {
		get: function () { return this._c[0] }
	})
...
RGBColor.equals = function (c1, c2) {
	return c1.red   === c2.red
		&&   c1.green === c2.green
		&&   c1.blue  === c2.blue
}
```

Only methods
No data properties

为何有此限制？

prototype 的坑

```js
function A() {}
A.prototype.myData = {name: 'hax'}
let a1 = new A()
a1.myData.name  // 'hax'
a1.myData.name = 'a1'  // 👈 坑
```

```js
function A() {}
A.prototype.myData = {name: 'hax'}
let a1 = new A(), a2 = new A()
a1.myData.name = 'a1'  // 👈 坑
a2.myData.name  // 'a1' --- WTF!
```

```js
function A() {}
A.prototype.myData = {name: 'hax'}
let a1 = new A, a2 = new A
a1.myData = {name: 'a1'}  // “正确”写法
a2.myData.name  // 'hax'
```

什么样的属性可以放
在 prototype 上？

- 读 primitive ✅
- 写 primitive ✅
- 读 object ✅
- 写 object ✅
- 读 object 上的属性 ✅
- 写 object 上的属性 ❌

MM Class
Only methods

method
所有实例共享


拖
Postpone

Maximally-Minimal
Class

求同存异
分而治之

反而避免
久拖不决

让实践说话

拖延大法好


为什么要有 Private ？

实践证明了...

## Prior Art

- 命名约定（如下划线前缀）
- 名称变换（如python）
- 基于Symbol
- 基于闭包
- 基于WeakMap

### 命名约定

```js
class RGBColor {
	constructor(r, g, b) {
		this._hex = r * 0x10000 + g * 0x100 + b
	}
	get red()   { return  this._hex >> 16         }
	get green() { return (this._hex >>  8) & 0xff }
	get blue()  { return  this._hex        & 0xff }
	static equals(c1, c2) {
		return c1._hex === c2._hex
	}
}
```

命名约定
Pros and Cons

- 简单易行
- 无性能损失
- 可能命名冲突
- 很容易绕过
- 更接近 protected

### 名称变换

```js
\
class RGBColor {
	constructor(r, g, b) {
		this._hex = r * 0x10000 + g * 0x100 + b
	}
	get red()   { return  this._hex >> 16         }
	get green() { return (this._hex >>  8) & 0xff }
	get blue()  { return  this._hex        & 0xff }
	static equals(c1, c2) {
		return c1._hex === c2._hex
	}
}
```

```js
const hex = 'RGBColor:field:hex'
class RGBColor {
	constructor(r, g, b) {
		this[hex] = r * 0x10000 + g * 0x100 + b
	}
	get red()   { return  this[hex] >> 16         }
	get green() { return (this[hex] >>  8) & 0xff }
	get blue()  { return  this[hex]        & 0xff }
	static equals(c1, c2) {
		return c1[hex] === c2[hex]
	}
}
```

名称变换
Pros and Cons

- 简单易行
- 无性能损失
- 可能命名冲突
- 很容易绕过
- 更接近 protected

- 简单易行，写法略微麻烦
- 无性能损失
- ~~可能命名冲突~~
- 可以被绕过
- ~~更接近 protected~~

### 基于Symbol

```js
const hex = 'RGBColor:field:hex'
class RGBColor {
	constructor(r, g, b) {
		this[hex] = r * 0x10000 + g * 0x100 + b
	}
	get red()   { return  this[hex] >> 16         }
	get green() { return (this[hex] >>  8) & 0xff }
	get blue()  { return  this[hex]        & 0xff }
	static equals(c1, c2) {
		return c1[hex] === c2[hex]
	}
}
```

```js
const hex = Symbol()
class RGBColor {
	constructor(r, g, b) {
		this[hex] = r * 0x10000 + g * 0x100 + b
	}
	get red()   { return  this[hex] >> 16         }
	get green() { return (this[hex] >>  8) & 0xff }
	get blue()  { return  this[hex]        & 0xff }
	static equals(c1, c2) {
		return c1[hex] === c2[hex]
	}
}
```

基于Symbol
Pros and Cons

- 简单易行
- 写法略微麻烦
- 无性能损失
- 无命名冲突
- 可以被绕过

- 简单易行
- 写法略微麻烦
- 无性能损失
- 无命名冲突
- ~~可以被绕过~~

Unguessability,
Unforgeability

`Object.getOwnPropertySymbols(obj)`

- 简单易行
- 写法略微麻烦
- 无性能损失
- 无命名冲突
- 可通过reflection访问

### 基于闭包

```js
class RGBColor {
	constructor(r, g, b) {
		this._hex = r * 0x10000 + g * 0x100 + b
	}
	get red()   { return  this._hex >> 16         }
	get green() { return (this._hex >>  8) & 0xff }
	get blue()  { return  this._hex        & 0xff }
	static equals(c1, c2) {
		return c1._hex === c2._hex
	}
}
```

```js
class RGBColor {
	constructor(r, g, b) {
		const hex = r * 0x10000 + g * 0x100 + b
		Object.defineProperties(this, {
			red:   { get: function () { return  hex >> 16         } },
			green: { get: function () { return (hex >>  8) & 0xff } },
			blue:  { get: function () { return  hex        & 0xff } },
		})
	}
	static equals(c1, c2) {  // How to implement it?
		// return c1.hex === c2.hex
	}
}
```

```js
class RGBColor {
	constructor(r, g, b) {
		this._hex = r * 0x10000 + g * 0x100 + b
	}
\
	get red()   { return  this._hex  >> 16         }
	get green() { return (this._hex  >>  8) & 0xff }
	get blue()  { return  this._hex         & 0xff }
	static equals(c1, c2) {
		return c1._hex === c2._hex
	}
}
```

```js
class RGBColor {
	constructor(r, g, b) {
		const hex = r * 0x10000 + g * 0x100 + b
		this.hex = function () { return hex }
	}
	get red()   { return  this.hex() >> 16         }
	get green() { return (this.hex() >>  8) & 0xff }
	get blue()  { return  this.hex()        & 0xff }
	static equals(c1, c2) {
		return c1.hex() === c2.hex()
	}
}
```

基于闭包
Pros and Cons

- 无命名冲突
- 外部（包括static方法）完全无法访问
- 有一定性能代价
- 与 ES6+ 类的方法语义不协调

prototype方法 VS privilege方法（delegate）,
对privilege方法 call/apply/bind 行为不确定,
不在prototype上的方法无法进行 super 调用

### 基于WeakMap

```js
\
\
\
\
class RGBColor {
	constructor(r, g, b) {
		this._hex = r * 0x10000 + g * 0x100 + b
	}
\
\
	get red()   { return  this._hex  >> 16         }
	get green() { return (this._hex  >>  8) & 0xff }
	get blue()  { return  this._hex         & 0xff }
	static equals(c1, c2) {
		return c1._hex === c2._hex
	}
}
```

```js
const privates = new WeakMap
function hex(instance) {
	return privates.get(instance).hex
}
class RGBColor {
	constructor(r, g, b) {
		privates.set(this, {
			hex: r * 0x10000 + g * 0x100 + b
		})
	}
	get red()   { return  hex(this)  >> 16         }
	get green() { return (hex(this)  >>  8) & 0xff }
	get blue()  { return  hex(this)         & 0xff }
	static equals(c1, c2) {
		return hex(c1) === hex(c2)
	}
}
```

基于WeakMap
Pros and Cons

- 无命名冲突
- 外部无法访问
- 写法比较麻烦
- 有一定性能代价


## Prior Art

- 命名约定（如下划线前缀）
- 名称变换（如python）
- 基于Symbol
- 基于闭包
- 基于WeakMap

- 命名约定（如下划线前缀）
- ~~名称变换（如python）~~
- 基于Symbol
- ~~基于闭包~~
- 基于WeakMap

## 简单加入 private
	关键字行不行？

```js
class RGBColor {
	private c
	constructor(r, g, b) {
		this.c = [r, g, b]
	}
	toString() {
		const [r, g, b] = this.c
		return `rgb(${r}, ${g}, ${b})`
	}
	get red()   { return this.c[0] }
	get green() { return this.c[1] }
	get blue()  { return this.c[2] }
	static equals(c1, c2) {
		return c1.red   === c2.red
			&&   c1.green === c2.green
			&&   c1.blue  === c2.blue
	}
}
```

大多数语言就是这样！,
包括 TypeScript（JS 超集）

```js
class RGBColor {
	private hex
	constructor(r, g, b) {
		this.hex = r * 0x10000 + g * 0x100 + b
	}
	toString() {
		return `rgb(${this.red}, ${this.green}, ${this.blue})`
	}
	get red()   { return this.hex >> 16 }
	get green() { return (this.hex >> 8) & 0xff }
	get blue()  { return this.hex & 0xff }
	static equals(c1, c2) {
		return c1.hex === c2.hex  // 👈 Semantic?
	}
}
```

没有类型信息！

所以，现在的
proposal：

```js
class RGBColor {
	#hex
	constructor(r, g, b) {
		#hex = r * 0x10000 + g * 0x100 + b
	}
	toString() {
		return `rgb(${this.red}, ${this.green}, ${this.blue})`
	}
	get red()   { return #hex >> 16 }
	get green() { return (#hex >> 8) & 0xff }
	get blue()  { return #hex & 0xff }
	static equals(c1, c2) {
		return c1.#hex === c2.#hex
	}
}
```

第一反应？

WTF!

丑

不要急，
继续看：

```js
class Foo {
  //instance members
  own x=0, y=0  // two data properties
  own #secret   // a private field
                 // initial value undefined
  own *[Symbol.iterator](){yield this.#secret}
                 // a generator method
  own #callback(){}  //a private instance method
  //class constructor members
  static #p=new Set(), q=Foo.#p
                // a private field and a property
                // of the class constructor
  static get p(){return Foo.#p} //accessor method
  //prototype methods
  setCallback(f){this.#callback=f}
  constructor(s){
     this.#secret = s
  }
}
```


丑爆了

[Why not use the "private" keyword, like Java or C#?](https://github.com/tc39/proposal-private-fields/issues/14)

针对“#”产生大量的
消极反应

当然也有不少提议

不过绝大多数都是
行不通的

语言演化

难

- 新 API
- 增加语法糖
- 新特性（语法+语义）
- 改变语义
- 改变语法
- 删除特性

例子……

回到 private 问题

分成两部分

语法 / 语义

语法问题
sigil

难道真的不行吗？

PHP

```php
class RGBColor {
	private $hex;
	function __construct($r, $g, $b) {
		$this->hex = $r * 0x10000 + $g * 0x100 + $b;
	}
	function __toString() {
		return "rgb({$this->red()}, {$this->green()}, {$this->blue()})";
	}
	function red()   { return $this->hex >> 16; }
	function green() { return ($this->hex >> 8) & 0xff; }
	function blue()  { return $this->hex & 0xff; }
	static function equals($c1, $c2) {
		return $c1->hex === $c2->hex;  // 👈 Semantic?
	}
}
```

PHP 可以的？
JS 为啥不行？

因为 PHP 是
最好的语言……

因为：

语义复杂

prototype 可变

压缩混淆

属性访问
性能问题

引擎实现
复杂性

语法问题
@ vs #


语义问题
soft vs hard

大部分语言的private机制
都是某种程度上soft的

但可以使用 SecurityManager
之类的机制限制 refection

Symbol 机制

语法成本

Private symbol？

Proxy
动态代理

膜
Membrane

实现 host 接口

协调问题
- public properties
- own/prototype/static
- decorators


平衡

- common use cases
- mental model
- performance
- backward compatibility
- forward compatibility


# FAQ
github: @hax
zhihu: 贺师俊
weibo: @johnhax
