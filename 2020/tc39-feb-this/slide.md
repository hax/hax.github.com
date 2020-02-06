Improve Developer Experience of
`this` in JavaScript
Explict `this` parameter for Stage 1
`thisArgumentExpected` for Stage 1
--------------------------------------------------------
<div> @hax, 360 Tech Group <small>February 2020 TC39</small></div>
<div><small>source of slide/demo: <a href=https://github.com/hax/hax.github.com/tree/master/2020/tc39-feb-this>github.com/hax/hax.github.com/tree/master/2020/tc39-feb-this</a></small></div>

## Introduce myself
<!-- my first time submit proposal in tc39 -->

<div><ruby>贺师俊<rt>HE Shi-Jun</rt></ruby></div>

GitHub @hax
Freenode @haxjs
Twitter @haxy
Wechat/Weibo @johnhax
<!-- u can call me hax -->
<!-- sorry for using diff name in diff places -->
<!-- naming is always issue -->

Started coding JS from 1998
Read the ES3 spec several times
& **[found a spec bug](https://esdiscuss.org/topic/question-about-joined-function-object-of-ecma-262-3rd-edition)** (fixed in ES5)
Subscribed es-discuss mailing list
when it was called es4-discuss
<!-- I have been using JS as my main programming language 20 years -->
<!-- 13 years ago, raised issues about "joined functions" in ES3 -->
<!-- start from that time, I am always keeping eyes on tc39  -->

Very active in Chinese
JavaScript & Web front-end
community in last 10+ years

Very famous speaker & organizer of
many JS/WebF2E/Node topics of
most biggest tech conferences in China

Working for 360 now
Join ECMA TC39 from July 2019
Also member of W3C from 2012
<!-- also introduce tc39 to many china companies -->
<!-- very happy that we now have 4 chinese company members -->

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
<!-- maybe it's the time to change this  -->

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

`this` is common in OO languages
But there are some special things in JS

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
<!-- weird -->

```js
'use strict'
globalThis // global
```
<!-- though the name is unfortunate -->

```js
'use strict'
globalThis === this // false
```

🤡 `globalThis` is
strictly **NOT** `this` in
strict global code
<!-- sorry, may be a bad joke -->

- global `this`
- `this` in functions

- `globalThis`
- `this` in functions

- ~~`globalThis`~~
- `this` in functions
<!-- remove it from the weirdness list of `this` -->

`this` confusion from
the functions

`function` is
too overloaded

a classic function can be used for...
- `func(...args)` plain call
- `o.method(...args)` method invoking
- `new C(...args)` construct
- `doSth(callback)` callback
with very different `this` behavior
<!-- used in various ways -->

ES6

```js
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args, newTarget)
```
<!-- diff: thisArg -->

a classic function can be used for...
- `f(...args)` → `R.apply(f, undefined, args)` plain call
- `o.m(...args)` → `R.apply(o.m, o, args)` method invoking
- `new C(...args)` → `R.construct(C, args)` construct
- `foo(callback)` → ?
with very different `this` behavior

- bound functions (ES5)
- arrow functions (ES6)
- class (ES6)

a classic function should be used for...
- `f(...args)` → `R.apply(f, undefined, args)` plain call
- `o.m(...args)` → `R.apply(o.m, o, args)` method invoking
- ~~`new C(...args)` → `R.construct(C, args)`~~ use class!
- `foo(callback)` → ?
<!-- in most time, u can't provide thisArg -->
<!-- don't know what's the thisArg passed in  -->

a classic function should be used for...
- `f(...args)` → `R.apply(f, undefined, args)` plain call
- `o.m(...args)` → `R.apply(o.m, o, args)` method invoking
- ~~`new C(...args)` → `R.construct(C, args)`~~ use class!
- ~~`foo(callback)` → ?~~ use arrow/bound! can we?

Prefer use arrow, bound
functions for callbacks,
But very hard to ensure that!

a classic function should be used for...
- `f(...args)` → `R.apply(f, undefined, args)` plain call
- `o.m(...args)` → `R.apply(o.m, o, args)` method invoking
- ~~`new C(...args)` → `R.construct(C, args)`~~ use class!
- ~~`foo(callback)` → ?~~ use arrow/bound! can we?

Misuse of "method",
(What is "method"? Spec is vague about that)
<!-- method is just functions property -->
<!-- common OO terminology -->

A "real" method expect correct
`this` argument to be provided
by the caller when it is invoked

```js
obj.method();
(obj.method)();
(0, obj.method)();
let {method} = obj; method()
```

A method used as callback
- do not provide `thisArg`,
- provide wrong `thisArg`
<!-- very common in callback cases -->
<!-- worse in second case, non-strict -->

<iframe src=greeting1.html></iframe>
[sample:](greeting1.html?end=-1)
[sample:](greeting.js)

<iframe src=greeting2.html></iframe>
[sample:](greeting2.html?end=-1)
[sample:](greeting.js)

```js
Promise.race([
	fetch('result'),
	fetch('negative-result').then(Promise.reject)
])
```

Some factors in this case
- static, but expects this argument
- implementation inconsistent (Promise/A+)
- only get errors in very late time, rarely
- can't easily differantiate error source

How to deal with it?

RTFM

RTFS

RTFM/RTFS to figure out / remeber
- `Promise.resolve` expect `this`
- `e.addEventListener` use `e` as `this` arg

```js
Promise.race
Array.isArray
Array.of
setTimeout
```

```js
Promise.race // expects this arg
Array.isArray // not expect this arg
Array.of // optional
// optional, throw if provide wrong,
// always pass it to callback as this arg
setTimeout
```

What about user-land code?

```js
class A {
	static realStaticMethod() {
		// ...
	}
	static dynamicStaticMethod() {
		// ...
		this.foo
		// ...
	}
	instanceMethod() {
		// ...
		this.foo
		// ...
	}
	instanceMethodButNeverUseInstance() {
		// ...
	}
}
```

Are we ok?,
Try this:

```js
const o = {
	is_this_a_method(x) {
		// ...
		// ...
		x.foo = function (f) {
			// ...
			// ...
			return f.call(this)
			// ...
		}.bind(o, () => ({
			x() { this },
			y: function () { this },
			z: () => eval('this'),
		}))
		// ...
	}
}
```

```js
class A extends B {
	static process(...args) {
		// ...
		// ...
		// ...
		if (condition) {
			// ...
			args.forEach(super.process)
			// ...
		}
	}
}
```
<!-- this static -->

`this` binding is a
constant source of confusion
for the JavaScript developer
who does not take the time to learn how the mechanism actually works.
—— *You don't know JS*

`this` binding is a
constant source of confusion
for the JavaScript developer
even they do take the time to learn how the mechanism actually works.
—— *JS don't like you*


People always make mistakes

- How easy the mistakes could be make
- How hidden the mistakes could be
- How hard to locate the mistakes

How to solve?

- TypeScript
- ESLint,
- New language features!

Part Ⅰ
# explicit `this` parameter

[Draft: gilbert/es-explicit-this](https://github.com/gilbert/es-explicit-this)
Written by Gilbert 4 years ago,
before TS adding `this` type check

Prior Arts:
- TypeScript
- Java (explicit receiver parameter)
- C# (`this` modifier of extension methods)

## Usage

```js
function getX(this) { // explicit this parameter
	return this.x
}
function getX(this o) { // give a name instead of `this`
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
<!-- shadowed -->
<!-- we avoid shadow -->
<!-- this always shadow -->
<!-- hard to recognize -->
<!-- not convinent to use outside -->

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
// static extension proposal (old bind operator)
const Number::div = function (this numerator, denominator) {
	const quot = Math.floor(numerator / denominator)
	const rem = numerator % denominator
	return [quot, rem]
}
10::div(3) // [3, 1]
```

```js
Number.prototype.toHex = function (this: number) {
	return this.toString(16)
}
```
<!-- no runtime check -->

```js
Number.prototype.toHex = function (this: number) {
	return Number(this).toString(16)
}
```

```js
// Future parameter decorators
Number.prototype.toHex = function (@toNumber this) {
	return this.toString(16)
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

Protect programmers by
throwing as early as possible

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
class C {
	constructor(this /* syntax error */) {}
}
```
<!-- constructor is special -->
<!-- you can't pass in thisArg to constructor -->
<!-- if param, u could pass a value as this arg to it -->
<!-- this in constructor is created automatically -->

```js
// use case of naming?
class C {
	constructor(this newInstance) {
		newInstance.innerClass = class {
			constructor() {
				this.outer = newInstance
			}
		}
	}
}
```
<!-- this pattern is not common cases -->

```js
class C {
	constructor(this ) {
		this.innerClass = this |> outer => class {
			constructor() {
				this.outer = outer
			}
		}
	}
}
```

Prior Arts:
- TypeScript: NO
- Java: NO
- C#: N/A

## Runtime errors

```js
function f(this) {}
\
f() // TypeError
new f() // TypeError
\
f.call() // allowed
Reflect.apply(f, undefined) // allowed
\
Reflect.construct(f) // TypeError
```

## Possible linter rules

```js
function f(this x) {
	function g(/* this */) {
		this // <-- linter error
	}
}
```

```js
function f(this x) {
	function g(this y) {
		y // ok
	}
}
```

```js
class C {
	m1() { this } // <-- ok
	static m2() {} // <-- ok
	/* static */ m3() {} // <-- linter error
	static m4(/* this */) {
		this // <-- linter error
	}
}
```

```js
class C {
	m1() { this }
	static m2() {}
	m3(this) {} // <-- ok
	static m4(this) {
		this // ok
	}
}
```

Summary of
explicit `this` parameter

Allow you do treat `this` as normal parameter
- annotate/decorate it
- name it
- destructure it

Allow programmers *explicitly*
mark a function as *method*
which expect `this` arg to be passed in
---------------------------------------
Improve self-documenting
Better coding style of `this`
Error early for some common misuse

Stage 1?

Part Ⅱ
# function `thisArgumentExpected` property

[draft: hax/proposal-function-this](https://github.com/hax/proposal-function-this)

`thisArgumentExpected` data property of functions
indicates whether the function
expect "`this` argument" to be passed in

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
	if (listener.thisArgumentExpected) {
		throw new TypeError('listener should not expect this argument')
	}
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
// combine with static extension and explicit this
const EventTarget::on = function (this eventTarget, eventType, listener, options) {
	if (listener.thisArgumentExpected) {
		throw new TypeError('listener should not expect this argument')
	}
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
// future static extension proposal
document.querySelector('input')::on('change',
	e => e.currentTarget::util:show('name'))
```

```js
let {then} = Promise.prototype
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (onFulfilled?.thisArgumentExpected) throw new TypeError()
  if (onRejected?.thisArgumentExpected) throw new TypeError()
  return then.call(this, onFulfilled, onRejected)
}
```

```js
Promise.race([
	fetch('result'),
	fetch('negative-result').then(Promise.reject)
]) // throw now! ----------^^^^
```

## Semantics

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

## Summary

```js
let pd = Object.getOwnPropertyDescriptor(callable, 'thisArgumentExpected')
pd.enumerable // false
pd.writable // false
pd.configurable // true
pd.value // true | false | null
```

- class constructor => `null`
- bound function => `false`
- arrow function => `false`
- no `this` => `false`
- explicit this => `true`
- implicit this (contains `this` or `super.foo`) => `true`

Allow frameworks/libraries (and future language features!)
create safer APIs by checking the `thisArgumentExpected`
property, throw an error as early as possible, and the error
could contain better error message which is helpful to locate the bug

Stage 1 ?

Part Ⅲ

- function explicit `this` parameter
- function instance `thisArgumentExpected` data property,
- static extensions

static extensions
------------------
See you next time!
