`this` in JS
====================
2019 成都 Web 全栈大会

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy

360
75team

360高级前端架构师
360技术委员会
Web前端TC委员

2019年7月起
TC39代表

为什么我们
要加入TC39

代表中国互联网和科技公司
参与关键技术标准的研发

为中国JS社区
建立渠道

推动JavaScript语言的进化
真正解决开发者的问题,
而不是制造更多问题

『搭便车』

360,
阿里,
华为

`this` in JS

`this` binding is a
constant source of confusion
for the JavaScript developer
who does not take the time to learn how the mechanism actually works.
—— *You don't know JS*

```js
console.log(this)
```

```js
function f() { this }
function f() { 'use strict'; this }
const f = () => this
```

```js
f()
obj.f()
new f()
```

```js
f.call(obj)
f.call(null)
f.call(42)
f.call()
```

[test](test)

```html
<form id=myForm>
	<input type="button" name="beijing" value="beijing">
	<input type="button" name="shanghai" value="shanghai">
	<input type="button" name="chengdu" value="chengdu">
</form>
```
```js
class Greeting {
	static from(control) { return new Greeting(control.value) }
	constructor(name) { this.name = name }
	hello() { console.log(`Hello ${this.name || 'world'}!`) }
}
[...myForm.elements]
	.map(e => [e, Greeting.from(e)])
	.forEach(([e, {hello}]) => e.addEventListener('click', hello))
```

- "Hello chengdu"
- "Hello world"
- "Hello "
- throw ReferenceError
- 其他

```js
Promise.all(numberPromises).then(nextStep)
```

```js
Promise.all(numberPromises)
	.then(values => {
		const nonNumbers = values.filter(isNaN)
		return Promise.all(values.concat(nonNumbers.map(Promise.reject)))
	})
	.then(nextStep)
	.catch(errorLogger)
```

`this`的问题

- 不学
- 学不会
- 学不动

- ~~不学~~
- ~~学不会~~
- ~~学不动~~

我学会了,
照样掉坑

容易挖坑
可能隐藏
难以定位

根源并不在
`this`本身

而在于函数被
过分override

- 普通函数
- 回调函数
- 构造器
- 方法

ES6

- 普通函数
- 回调函数 arrow function
- 构造器 class constructor
- 方法

- 普通函数
- 方法

- 普通函数（没有`this`）
- 真·方法（需要`this`）

```js
let f = function () { this }
f = f.bind(null)
f = function () { return function () { this } }
f = function () { g(() => this) }
f = (class { static f() { this } }).f
f = ({f() { super.f }}).f
```

```js
let f = function () { this } // 方法
f = f.bind(null)
f = function () { return function () { this } }
f = function () { g(() => this) } // 方法
f = (class { static f() { this } }).f // 方法
f = ({f() { super.f }}).f // 方法
```

源码缺乏标记
『真·方法』

```js
Promise.race // 方法
Array.isArray
Array.of // *
addEventListener // 方法
setTimeout // *
```

- 普通函数，可直接调用 `f()`
- 必须以方法形式调用 `o.f()`

不知道built-in函数
或第三方函数是否是
『真·方法』

如何解决？

- TypeScript
- ESLint,
- 新语言特性！

# function explicit this parameter

[Outdated draft: gilbert/es-explicit-this](https://github.com/gilbert/es-explicit-this)

## Usage

```js
function getX(this) { // explicit this
	return this.x
}
function getX(this o) { // alias
	return o.x
}
function getX(this {x}) { // destructuring
	return x
}
```

## Use cases

```js
// type annotation (TypeScript)
Number.prototype.toHex = function (this: number) {
	return this.toString(16)
}
```

```js
// original code
class Player {
	attack(opponent) {
		return Game.calculateResult(
			this.input(),
			opponent.input(),
		)
	}
}
```

```js
// better naming
class Player {
	attack(this offense, defense) {
		return Game.calculateResult(
			offense.input(),
			defense.input(),
		)
	}
}
```

```js
function process (name) {
	this.taskName = name;
	doAsync(function (amount) {
		this.x += amount;
	});
};
```

```js
function process (name) {
	this.taskName = name;
	const that = this
	doAsync(function (amount) {
		this.x += amount;
		that.emit('change', this)
	});
};
```

```js
function process (this obj, name) {
	obj.taskName = name;
	doAsync(function callback (this result, amount) {
		result.amount += 2;
		obj.emit('change', result)
	});
};
```

```js
// extension proposal (bind operator)
const ::div = function (this numerator, denominator) {
	const quot = Math.floor(numerator / denominator)
	const rem = numerator % denominator
	return [quot, rem]
}
10::div(3) // [3, 1]
```

```js
// parameter decorators
function div(@toInt32 this numerator, @toInt32 denominator) {
	// numerator = numerator|0
	// denominator = denominator|0
	// ...
}
```

```js
function div(@int32 this numerator, @int32 denominator) {
	// if (numerator !== numerator|0) throw new TypeError()
	// if (denominator !== denominator|0) throw new TypeError()
	// ...
}
```

```js
class User {
	get fullName() {
		const {firstName, lastName} = this
		return `${firstName} ${lastName}`
	}
}
```

```js
class User {
	// parameter destructuring
	get fullName(this {firstName, lastName}) {
		return `${firstName} ${lastName}`
	}
}
```

## Early errors

```js
function f(a, this /* syntax error */ ) {}
```

```js
let f = (this /* syntax error */ ) => 0
```

```js
function f(this o) {
	this // syntax error
}
```

```js
function f(this {x}) {
	this /* syntax error */ .x = x + 1
}
```

```js
function f(this o) {
	let g
	g = () => this // syntax error
	g = function (this) {
		this // ok
	}
	g = function (this o) {
		this // syntax error
	}
	g = () => (function () {
		this // ok
	})
}
```

```js
class A extends B {
	constructor(this /* syntax error */) {
		super() // <-- `this` is only available after `super()`
	}
}
```

```js
class C {
	constructor(this /* syntax error */) {}
}
```

## Possible linter rules

```js
function f(this o) {
	function g(/* this */) {
		this // <-- linter error
	}
}
class C {
	m1() { this } // <-- ok
	static m2() {} // <-- ok
	/* static */ m3() {} // <-- linter error
	static m4(/* this */) {
		this // <-- linter error
	}
}
```

# function `thisArgumentExpected` property

[Outdated draft: hax/proposal-function-this](https://github.com/hax/proposal-function-this)

## Use cases

```js
class User {
	constructor(name) {
		this.name = name
	}
	showName() {
		console.log(this.name)
	}
}
const hax = new User('hax')
```

```js
// bug, eventually output window.name
window.addEventListener('click', hax.showName)
// bug, eventually output input.name
document.querySelector('input').addEventListener('change', hax.showName)
```

```js
// safer API:
function on(eventTarget, eventType, listener, options) {
	if (listener.thisArgumentExpected) throw new TypeError('listener should not expect this argument')
	return eventTarget.addEventListener(eventType, listener, options)
}
```

```js
on(window, 'click', hax.showName) // throw TypeError
on(document.querySelector('input'), 'change', hax.showName) // throw TypeError
on(window, 'click', () => hax.showName()) // ok
on(document.querySelector('input'), 'change', hax.showName.bind(hax)) // ok
```

```js
// combine with extension (bind operator) and explicit this
const ::on = function (this eventTarget, eventType, listener, options) {
	if (listener.thisArgumentExpected) throw new TypeError('listener should not expect this argument')
	return eventTarget.addEventListener(eventType, listener, options)
}
window::on('click', hax.showName) // throw TypeError
window::on('click', () => hax.showName()) // ok
```

```js
// really want it?
const util = {
	show(property) {
		console.log(this[property])
	}
}
document.querySelector('input').addEventListener('change', util.show('name'))
```

```js
document.querySelector('input')::on('change', ({currentTarget}) => {
	const ::{show} = util
	currentTarget::show('name')
})
```

```js
document.querySelector('input')::on('change',
	e => e.currentTarget::util:show('name'))
```

## Usages

```js
let arrow = () => { this }
arrow.thisArgumentExpected // false
```

```js
let bound = f1.bind()
bound.thisArgumentExpected // false
```

```js
function func() {}
func.thisArgumentExpected // false
```

```js
function implicitThis() { this }
implicitThis.thisArgumentExpected // true
```

```js
function explicitThis(this) {}
explicitThis.thisArgumentExpected // true
```

```js
let o = {
	m1() {},
	m2() { this },
	m3(this) {},
	m4() { super.foo },
}
o.m1.thisArgumentExpected // false
o.m2.thisArgumentExpected // true
o.m3.thisArgumentExpected // true
o.m4.thisArgumentExpected // true
```

```js
class C {
	m1() {}
	m2() { this }
	m3(this) {}
	m4() { super.foo }
	static m1() {}
	static m2() { this }
	static m3(this) {}
	static m4() { super.foo }
}
C.prototype.m1.thisArgumentExpected // false
C.prototype.m2.thisArgumentExpected // true
C.prototype.m3.thisArgumentExpected // true
C.prototype.m4.thisArgumentExpected // true
C.m1.thisArgumentExpected // false
C.m2.thisArgumentExpected // true
C.m3.thisArgumentExpected // true
C.m4.thisArgumentExpected // true
C.thisArgumentExpected // null
```

```js
Map.thisArgumentExpected // null
Date.thisArgumentExpected // false
Object.thisArgumentExpected // false
Object.prototype.valueOf.thisArgumentExpected // true
Math.abs.thisArgumentExpected // false
Array.isArray.thisArgumentExpected // false
Array.of.thisArgumentExpected // false
Promise.resolve.thisArgumentExpected // true
setTimeout.thisArgumentExpected // false
```

## Edge cases

```js
function func() {}
func.thisArgumentExpected // false
```

```js
function directEval() {
	eval(code) // eval('this')
}
directEval.thisArgumentExpected // false
Object.defineProperty(directEval, 'thisArgumentExpected', {value: true})
```

```js
function implicitThis() { this }
implicitThis.thisArgumentExpected // true
```

```js
function OldStyleConstructor(foo) {
	this.foo = foo
}
new OldStyleConstructor(42)
OldStyleConstructor.thisArgumentExpected // true
Object.defineProperty(OldStyleConstructor, 'thisArgumentExpected', {value: null})
```

```js
function OldStyleConstructor(foo) {
	if (new.target === undefined) throw new TypeError()
	this.foo = foo
}
```

```js
function OldStyleConstructor(foo) {
	if (new.target === undefined) return new OldStyleConstructor(foo)
	this.foo = foo
}
Object.defineProperty(OldStyleConstructor, 'thisArgumentExpected', {value: false})
```

```js
class X {
	static of(...args) {
		return new (this ?? X)(args)
	}
}
X.of.thisArgumentExpected // true
Object.defineProperty(X.of, 'thisArgumentExpected', {value: false})
```

```js
let getGlobalThis = new Function('return this')
getGlobalThis.thisArgumentExpected // true
Object.defineProperty(getGlobalThis, 'thisArgumentExpected', {value: false})
```

## Semantics

```js
let pd = Object.getOwnPropertyDescriptor(callable, 'thisArgumentExpected')
pd.enumerable // false
pd.writable // false
pd.configurable // true
pd.value // true | false | null
```

`callable` => `callable.thisArgumentExpected`
- class constructor => `null`
- bound function => `false`
- arrow function => `false`
- no `this` => `false`
- explicit this => `true`
- implicit this (contains `this` or `super.foo`) => `true`

后续关键提案

- Extensions and `::` notation (bind operator)

欢迎反馈意见！

欢迎提出你的提案！

QA
