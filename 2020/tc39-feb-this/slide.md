Improve Developer Experience of
`this` in JavaScript
Explict `this` parameter for Stage 1
`thisArgumentExpected` for Stage 1
--------------------------------------------------------
<div> @hax, 360 Tech Group, <small>February 2020 TC39</small></div>
https://johnhax.net/2020/tc39-feb-this/slide   *[source of slide/demo](https://github.com/hax/hax.github.com/tree/master/2020/tc39-feb-this)*

## Introduce myself

<div><ruby>贺师俊<rt>HE Shi-Jun</rt></ruby></div>

GitHub @hax
<!-- u can call me hax -->
Freenode @haxjs
Twitter @haxy
Wechat/Weibo @johnhax

Started coding JS from 1998
<!-- I have been using JS as my main programming language 20 years -->
Read the ES3 spec several times
& **[found a spec bug](https://esdiscuss.org/topic/question-about-joined-function-object-of-ecma-262-3rd-edition)** (fixed in ES5)
<!-- joined functions -->
Subscribed es-discuss mailing list
when it was called es4-discuss

Very active in Chinese
JavaScript & Web front-end
community in last 10+ years

Very famous speaker & organizer of
many JS/WebF2E/Node topics of
most biggest tech conferences in China

Working for 360 now
Join ECMA TC39 from July 2019
Also member of W3C from 2012

Watching/contributing many
proposal repos for years

My most big impacts on
programming languages
fields up to now is ...

Not JS 😒,
But Swift 🤪

As the original
inventor of `..<`

Proposed `..<` symbol for
exclusive range operator
`1 ..< 5 // 1, 2, 3, 4`

to replace the confusing
`..` and `...` (ruby?) at
early stages of Groovy
(about 15 years ago...)

Swift copied
`..<`
from Groovy

- 100,000+ lines of JS
- 100 lines of Swift
🐸 人呐，就都不知道，
自己不可以预料 👓

PART 0
`this` in JS

`this` binding is a
constant source of confusion
for the JavaScript developer
who does not take the time to learn how the mechanism actually works.
—— *You don't know JS*

```js
this
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
f.call(42)
f.call(null)
f.call()
```

strict VS. non-strict
global VS. functions

```js
this // global
```

```js
'use strict'
this // undefined
```

```js
'use strict'
new Function('return this')() // global
```

```js
'use strict'
globalThis // global
```

```js
'use strict'
globalThis === this // false
```

🤡 `globalThis` is
strictly **NOT** `this` in
strict global code,

- global `this`
- `this` in functions

- `globalThis`
- `this` in functions

- ~~`globalThis`~~
- `this` in functions

The root cause of
`this` confusion is
the functions

`function` is
too overloaded

a classic function can be used for...
- plain call `func(...args)`
- method invoking `o.method(...args)`
- construct `new C(...args)`
- callback `doSth(callback)`

ES6

```js
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args, newTarget)
```

- plain call `f(...args)` → `Reflect.apply(f, undefined, args)`
- method invoking `o.m(...args)` → `Reflect.apply(o.m, o, args)`
- construct `new C(...args)` → `Reflect.construct(C, args)`
- callback `foo(callback)` → ?

- plain call `f(...args)` → `Reflect.apply(f, undefined, args)`
- method invoking `o.m(...args)` → `Reflect.apply(o.m, o, args)`
- construct `new C(...args)` → `Reflect.construct(C, args)`
- callback `foo(callback)` → ?

- plain call `func(...args)`
- method invoking `reciever.method(...args)`
- callback `onevent = callback`
- ~~old style constructors~~ class `new C()`

- plain call `func(...args)`
- method invoking `reciever.method(...args)`
- callback `onevent = callback`

- plain call `func(...args)`
- method invoking `reciever.method(...args)`
- arrow/bound for callback `onevent = callback`

- plain call `func(...args)`
- method invoking `reciever.method(...args)`
- arrow/bound/plain for callback `onevent = callback`

Always use arrow, bound or
plain functions for callback
But very hard to ensure that!

Misuse of "method"

A method, which expect correct `this`
argument provided when invoked by the caller

A method used as callback
- callback do not provide `thisArg`
- callback provide wrong `thisArg`

```html
<form id=myForm>
	<input type="button" name="tc39" value="tc39">
	<input type="button" name="w3c" value="w3c">
</form>
```
```js
class Greeting {
	static from(control) { return new Greeting(control.value) }
	constructor(name) { this.name = name }
	hello() { console.log(`Hello ${this.name || 'world'}!`) }
}
;[...myForm.elements]
	.map(e => [e, Greeting.from(e)])
	.forEach(([e, {hello}]) => e.addEventListener('click', hello))
```

- "Hello tc39"
- "Hello world"
- "Hello "
- throw ReferenceError
- Other

[test](test)


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

`this` binding is a
constant source of confusion
for the JavaScript developer
who does not take the time to learn how the mechanism actually works.
—— *You don't know JS*

`this` binding is a
constant source of confusion
for the JavaScript developer
even they do take the time to learn how the mechanism actually works.
—— *Don't forget JS hate you*


People always make mistakes

- How easy the mistakes could be make
- How hidden the mistakes could be
- How hard to locate the mistakes


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

Part Ⅰ
# explicit `this` parameter

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
function div(@int32 this numerator, @int32 denominator) {
	// if (numerator !== numerator|0) throw new TypeError()
	// if (denominator !== denominator|0) throw new TypeError()
	// ...
}
```

```js
Number.prototype.toHex = function (this: number) {
	return this.toString(16)
}
```

```js
Number.prototype.toHex = function (this: number) {
	return Number(this).toString(16)
}
```

```js
Number.prototype.toHex = function (@toNumber this) {
	return this.toString(16)
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

Part Ⅱ
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

好复杂？
学不动？

此特性主要是提供给
框架和库开发者的

间接改善普通开
发者的开发体验

将来能结合decorator

```js
@constructor
function OldStyleConstructor() {
	// ...
}
```

- function explicit `this` parameter
- function instance `thisArgumentExpected` data property,
- extensions and `::` notation

当然也可能通
不过委员会🤬

欢迎反馈意见！

欢迎提出你的提案！

Part Ⅲ
QA
