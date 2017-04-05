# 编程语言如何演化
	—— 以JS的private为例

##	Introduction of
	My Company
	and Myself

百姓网
www.baixing.com

github: @hax
zhihu: 贺师俊
weibo: @johnhax

## private

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

语义问题
soft vs hard

协调问题
- public fields
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
