Extensions提案简介
（中国参与JS语言标准的最新进展 2020年终版）

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy
Freenode @haxjs

关于我

1998年,
开始写代码
<!-- 早于有「Web前端」 -->

IE 4

Chrome 87

Web前端和JS语言
20多年发展历程
见证人和参与者

- 盛大创新院
- 百姓网
- 360奇舞团

2019年7月起
TC39代表
<!-- TC39：JS语言标准委员会 -->
<!-- 中国公司、中国JS社区第一批TC39代表之一 -->

中国参与JS语言标准的最新进展

JavaScript

Brendan Eich
1995年的10天
Netscape 2

<!-- 与其他语言不同 -->
Web标准
<!-- 来自微软 -->
竞争压力

互联网脚本语言标准

- IETF
- W3C
- Ecma

Ecma国际
<!-- ECMA => Ecma国际 -->

ECMAScript
<!-- JavaScript商标 -->

[TC39](https://tc39.es)

1996年11月（第1次会议）,
2020年11月（第79次会议）

[《JavaScript: The First 20 Years》](https://github.com/doodlewind/jshistory-cn)
- Allen Wirfs-Brock
- Brendan Eich

Ecma会员公司

- Google, Microsoft, Apple, Mozilla, Facebook, Intel, Oracle, Moddable
- PayPal, IBM, HP, Bloomberg, Airbnb, Godaddy, Netflix, Salesforce
- RunKit, Evernote, Meteor, Igalia, Agoric, Bocoup, Tilde
- Sun, Borland, Adobe, Yahoo, ...

中国公司和中国社区

2018年年底
开始游说中国科技公司
阿里、腾讯、美团
慧科、字节、360

月影（时任360奇舞团团长）推动
穆鸿（时任360集团副总裁）拍板

2019年6月 360成为Ecma会员并加入TC39工作组

2019年12月

- 阿里巴巴
- 华为
- SujiTech

2020年6月 腾讯
2020年12月 ？

插曲：中美关系

美国对中国技术封锁
通过科技脱钩孤立中国

华为、360

中国科技公司和技术社区
积极参与国际技术标准,
是构建人类命运共同体的实践

由中国公司代表担任
champion的提案一览

- `function.sent` meta property (Stage 2)
- Error cause (Stage 2)
- Range (Stage 1)
- Double-ended iterator and destructuring (Stage 1)
- Extensions and `::` notation (Stage 1)
- `Array.prototype.unique()` (Stage 1)
- await operations (Stage 1)
- Legacy reflection features for functions (Stage 1)
- Pattern match (Stage 1)
- Async context (Stage 0)
- function explicit `this` parameter (Stage 0)
- `class.hasInstance` (Stage 0)
- Reverse index syntax (Stage 0)


Extensions and `::` notation

[underscore/lodash](http://underscorejs.org/)

- functional style VS. oo style
- `_.chain().foo().bar().value()` (Ergonomics? Perf?)
- `_.mixin(extension)` (Name conflict? Static info (type)?)

```js

```

Minimal examples

```js
// declare an ad-hoc extension method
const ::at = function (i) {
	return this[i >= 0 ? i : this.length + i]
}
\
[1, 2, 3]::at(-1) // 3
```

```js
// declare an ad-hoc extension method
const $at = function (i) {
	return this[i >= 0 ? i : this.length + i]
}
\
$at.call([1, 2, 3], -1) // 3
```

```js
const ::at = function (i) { ... }
\
// `::` have the same precedence of `.`
// so the method invokings could be chained seamlessly
\
'Hello world'
	.split(' ')
	::at(0)
	.toUpperCase()
	::at(-1) // 'O'
```

```js
const ::at = function (i) { ... }
const ::last = function () { return this::at(-1) }
\
// extension methods are in a separate namespace
let last = [1, 2, 3]::last()
last // 3
```

```js
const ::forEach = Array.prototype.forEach
\
document
	.querySelector('#test')
	.children
	::forEach(e => {
		...
	})
```

```js
// Use constructor as extension
\
document
	.querySelector('#test')
	.children
	::Array:forEach(e => {
		...
	})
```

```js
// Use namespace object as extension
\
import * as lo from 'lodash'
\
[1, 2, -3]
	::lo:last()
	::Math:abs() // 3
```

```js
o::Ext:method(...args)
\
// roughly
IsConstructor(Ext)
	? Ext.prototype.method.call(o, ...args)
	: Ext.method(o, ...args)
```

- `::` infix notation
- Binary form `o::foo` for ad-hoc extension methods
- Ternary form `o::ext:foo` for using object as extension

`::` This-Binding Syntax proposal
https://github.com/tc39/proposal-bind-operator

```js
o::foo // foo.bind(o)
o::foo(...args) // foo.call(o, ...args)
::o.bar // o.bar.bind(o)
```

- Calling a known function with a supplied `this` argument (`o::foo(...args)`)
- Extracting a method from an object (`::o.bar`)

virtual methods

extension methods

```
In object-oriented computer programming, an
extension method is a method added to an object
after the original object was compiled.
— en.wikipedia.org/wiki/Extension_method
```

Extension methods
never rely on "bind" concept

```js
// method call
o.foo()
o::foo()
```

```js
// ?
o.foo
o::foo
```

```js
// property
o.foo
o::foo
```

```js
// extension property/accessor ?
let result = o::foo
o::foo = value
```

```js
// extension accessor
const ::last = {
	get() { return this[this.length - 1] },
	set(v) { this[this.length - 1] = v },
}
\
let a = [1, 2, 3]
a::last // 3
a::last++
a // [1, 2, 4]
```

```js
o::foo() // invoke a "virtual" method
::o.bar // extract a (real) method
```

```js
:: o.foo // extract/bind a (real) method
:: o::foo // extract/bind a (virtual) method
```

```js
o.&foo // extract/bind a (real) method
o::&foo // extract/bind a (virtual) method
```

- Virtual methods proposal
- Method extracting proposal
- ~~Syntax for `foo.bind(o)`~~

Alternative solution
of extracting methods

```js
// partial appliation proposal (stage 1)
o.foo(?) // (x) => o.foo(x)
```

```js
// possible syntax
o.foo(...) // (...args) => o.foo(...args)
```

```js
o.&method
```

```js
// Use userland extension methods as solution
const ::extract = function (name) {
	return this[name].bind(name)
}
let user = {
	name: 'hax',
	greet() { return `hi ${this.name}!`}
}
let f = user::extract('greet')
f() // 'hi hax'
```

```js
import ::{bindKey} from 'lodash'
\
let user = {
	name: 'hax',
	greet() { return `hi ${this.name}!`}
}
let f = user::bindKey('greet')
f() // 'hi hax'
```

Can pipeline operator
replace virtual method?

```js
function cube(x) { return x ** 3 }
\
2 |> cube // 8
```

Ergonomics Issue

```js
const ::at = function (i) { ... }
\
'Hello world'
	.split(' ')
	::at(0)
	.toUpperCase()
	::at(-1) // 'O'
```

```js
// wrong code!
const at = (a, i) => { ... }
\
'Hello world'
	.split(' ')
	|> at(0)
	.toUpperCase()
	|> at(-1)
```

```js
// add parens
const at = (a, i) => { ... }
\
('Hello world'
	.split(' ')
	|> at(0))
	.toUpperCase()
	|> at(-1)
```

```js
// add parens
const at = (a, i) => { ... }
\
(('Hello world'
	.split(' ')
	|> at(0))
	.toUpperCase()
	|> at(-1))
	.xxx
```

```js
const at = (a, i) => { ... }
\
'Hello world'
	|> x => x.split(' ')
	|> at(0)
	|> x => x.toUpperCase()
	|> at(-1)
```

```js
const at = (a, i) => { ... }
\
'Hello world'
	|> %.split(' ')
	|> at(%, 0)
	|> %.toUpperCase()
	|> at(%, -1)
```

```js
const at = (a, i) => { ... }
\
'Hello world'
	|> %.split(' ')
	|> at(0)
	|> %.toUpperCase()
	|> at(-1)
```

```js
const ::at = function (i) { ... }
\
'Hello world'
	.split(' ')
	::at(0)
	.toUpperCase()
	::at(-1) // 'O'
```

Shadow issue

```js
import {map} from 'lodash/fp'
// ...
{
	// ...
	// ...
	function foo() {
		// ...
		a |> map(f)
	}
}
```

```js
import {map} from 'lodash/fp'
// ...
{
	let map = new Map()
	// ...
	// ...
	function foo() {
		// ...
		a |> map(f)
	}
}
```

```js
import ::{map} from 'lodash'
// ...
{
	let map = new Map()
	// ...
	// ...
	function foo() {
		// ...
		a::map(f)
	}
}
```

Userland pipe extension method

```js
export function doubleSay(s) { return s + ' ' + s }
export function capitalize(s) { return s[0].toUpperCase() + s.slice(1) }
export function exclaim(s) { return s + '!' }
```

```js
import {doubleSay, capitalize, exclaim} from 'text-utils'
\
let result = "hello"
	|> doubleSay
	|> capitalize
	|> exclaim
```

```js
import ::{doubleSay, capitalize, exclaim} from 'text-utils'
\
let result = "hello"
	::doubleSay()
	::capitalize()
	::exclaim()
```

```js
import {doubleSay, capitalize, exclaim} from 'text-utils'
\
let result = "hello"
	|> compose(doubleSay, capitalize, exclaim)
```

```js
const ::pipe = function (f) { return f(this) }
\
import {doubleSay, capitalize, exclaim} from 'text-utils'
\
let result = "hello"
	::pipe(doubleSay)
	::pipe(capitalize)
	::pipe(exclaim)
```

```js
const ::pipe = function (f) { return f(this) }
\
import {doubleSay, capitalize, exclaim} from 'text-utils'
\
let result = "hello"
	::pipe(compose(doubleSay, capitalize, exclaim)
```

```js
const ::pipe = function (...args) { return compose(...args)(this) }
\
import {doubleSay, capitalize, exclaim} from 'text-utils'
\
let result = "hello"
	::pipe(doubleSay, capitalize, exclaim)
```

```js
let result = "hello"
	::pipe(doubleSay)
	// ::pipe(capitalize)
	.toUpperCase()
	::pipe(exclaim)
```

```js
x |> f(a, %, b)
\
import ::{pipe} from 'fp'
x::pipe(x => f(a, x, b))
\
import ::{pipe, pcall}, {$} from 'fp'
x::pipe(f::pcall(a, $, b))
\
import ::{pipe}, {$} from 'fp'
x::pipe(f, [a, $, b])
```

- F# style pipeline is very good for mainstream FP
- But might have ergonomics issues for multi-paradigm
- Topic style try to be OO-friendly, but ...

- reshape "virtual" methods part to this proposal
- leave method extracting to other proposals or userland solutions

Extensions in other languages

- A common feature in many languages
- Not monkey patch

Locality

History of adoption of Extensions

- 2003: Classboxes
- 2007: C# 3.0+ Extension methods (and possible future extension properties)
- 2007: VB.NET 9.0+ Extension Methods
- 2010: Ruby 2.0+ Refinements (local class extensions
- 2011: Kotlin Extensions
- 2012: Lombok v0.11.2+ Extension Method
- 2013: Haxe 3+ Static Extension
- 2013: Scala 2.10+ Implicit Classes
- 2014: Gosu Enhancements
- 2014: Swift Extensions
- ?: Eclipse Xtend Extension Methods
- 2017?: Manifold Java Extensions
- 2019: Dart 2.7+ Extension Methods
- ?: Dotty (Scala 3) Extension Methods

```swift
// swift
extension Int {
	var simpleDescription: String {
		return "The number \(self)"
	}
}
print(7.simpleDescription)
// Prints "The number 7"
```

```kt
// kotlin
fun Any?.toString(): String {
	if (this == null) return "null"
	// after the null check, 'this' is autocast to a non-null type, so the toString() below
	// resolves to the member function of the Any class
	return toString()
}
\
nullable.toString() // "null" if nullable is null
```

```kt
val <T> List<T>.lastIndex: Int
	get() = size - 1
\
listOf(1, 2, 3).lastIndex // 2
```

```ruby
# ruby refinement
class C
	def foo
		puts "C#foo"
	end
end
\
module M
	refine C do
		def foo
			puts "C#foo in M"
		end
	end
end
```

```ruby
using M
x = C.new
c.foo #=> C#foo in M
```

- Still use `.` notation
- Dispatched by the type

- Can JS overload `.` operator for extensions?
- Can JS dispatch extension methods by type?

TypeScript

https://github.com/microsoft/TypeScript/issues/9

Design goal: not generate special code
or do runtime dispatching based on type

```ts
interface Test {
	test(): string
}
\
// use similar syntax of Swift to declare extensions
extension String {
	test() { return 'test on string' }
}
extension Number {
	test() { return 'test on number' }
}
\
const n = 1, s = '1', o = { test() { return 'test' } }
\
n.test() // expect 'test on number'
s.test() // expect 'test on string'
o.test() // expect 'test'
\
Number.prototype.test = function () { return 'test on number proto' }
n.test() // behavior? what will generated code look like?
\
for (const x of [n, s, o]) {
	// type of x is number | string | typeof o
	x.test() // behavior? what will generated code look like?
	const x1 = x as Test
	x1.test() // behavior? what will generated code look like?
}
```

Can JS overload `.` operator for extensions?

- Would change semantic dramatically
- Would break `.` optimization in engines

Can JS dispatch extension methods by type?

```js
const Number::test = function () { return 'number' }
const String::test = function () { return 'string' }
\
1::test() // 'number'
's'::test() // 'string'
```

Possible, but:

- Runtime dispatching cost
- How to resolve conflict?
- How to test type?

[Ruby method lookup rules](https://bugs.ruby-lang.org/projects/ruby-master/wiki/RefinementsSpec#Method-lookup-with-refinements)

- Reuse `.`? Very impossible.
- Dispatch by type? Very unlikely.

Is Extensions still worth for JS?

Decoupling real methods
and extension methods

Parallel

- `o.foo`: Lookup `foo` based on `o`, dynamically
- `o::foo`: Lookup `foo` based on the local declarations, statically
- `o::ext:foo`: Lookup `foo` based on (delegated by) `ext`

Compare to the classical extension methods
- Locality
- Simple concept model
- Easy to infer
- Predicable performance

Customizable extension

`o::ext:foo`: Lookup `foo` based on (delegated by) `ext`

`o::ext:foo`: behavior delegated by `ext`

```js
o::ext:foo(...args)
let result = o::ext:foo
o::ext:foo = value
```

```js
const ext = {
	[Symbol.extension]: {
		invoke(receiver, name, args, ext) {},
		get(receiver, name, ext) {},
		set(receiver, name, value, ext) {},
	}
}
\
o::ext:foo(...args) // ext[Symbol.extension].invoke(o, 'foo', args, ext)
let result = o::ext:foo // ext[Symbol.extension].get(o, 'foo', ext)
o::ext:foo = value // ext[Symbol.extension].set(o, 'foo', value, ext)
```

```js
// previous userland method extracting util
const ::extract = function (name) {
	return this[name].bind(name)
}
let user = {
	name: 'hax',
	greet() { return `hi ${this.name}!`}
}
let f = user::extract('greet')
f() // 'hi hax'
```

```js
const extract = {
	[Symbol.extension]: {
		get(receiver, name) {
			return receiver[name].bind(receiver)
		}
	}
}
let user = {
	name: 'hax',
	greet() { return `hi ${this.name}!`}
}
let f = user::extract:greet
f() // 'hi hax'
```

Use cases

```js
// borrow built-in methods
value::Object:toString() // Object.prototype.toString.call(value)
```

```js
indexed::Array:map(x => x * x) // Array.prototype.map.call(indexed, x => x * x)
indexed::Array:filter(x => x > 0) // Array.prototype.filter.call(indexed, x => x > 0)
```

```js
const ::{map, filter} from Array
\
indexed::map(x => x * x)
indexed::filter(x => x > 0)
```

```js
const o = Object.create(null)
\
for (const key in o) {
	if (o.hasOwnProperty(key)) { // throw Error
		//...
	}
}
```

```js
const o = Object.create(null)
\
for (const key in o) {
	if (o::Object:hasOwnProperty(key)) { // Object.prototype.hasOwnProperty.call(o, key)
		//...
	}
}
```

```js
const ::{hasOwnProperty as own} from Object
\
const o = Object.create(null)
\
for (const key in o) {
	if (o::own(key)) {
		//...
	}
}
```

Code readability

```js
// WebAssembly.instantiateStreaming(fetch('simple.wasm'))
fetch('simple.wasm')
	::WebAssembly:instantiateStreaming()
```

```js
// Math.abs(a.very.long.and.complex.expression)
a.very.long.and.complex.expression::Math:abs()
```

CSS Unit

```js
1::CSS:px() // CSSUnitValue {value: 1, unit: "px"}
\
// Note: Need small hack due to https://www.w3.org/Bugs/Public/show_bug.cgi?id=29623
// See https://github.com/hax/proposal-extensions/blob/master/experimental/Extension.js
//   for Extension static helpers
CSS[Symbol.extension] = Extension.from({...CSS})
```

```js
const ::px = Extension.accessor(CSS.px)
1::px // CSSUnitValue {value: 1, unit: "px"}
```

[First-class protocols](https://github.com/michaelficarra/proposal-first-class-protocols)

```js
protocol Foldable {
	foldr
	toArray() {
		return this[Foldable.foldr](
			(m, a) => [a].concat(m), [])
	}
	get size() {
		return this[Foldable.foldr](m => m + 1, 0)
	}
	contains(eq, e) {
		return this[Foldable.foldr](
			(m, a) => m || eq(a, e),
			false)
	}
}
```

```js
// assume iter.constructor implements Foldable
iter[Foldable.toArray]()
iter[Foldable.size]
\
// better syntax
iter::Foldable:toArray()
iter::Foldable:size
\
// if used frequently, could extact the extension methods/accessors
const ::{toArray, size} from Foldable
\
iter::toArray()
iter::size
```

```js
iter.constructor implements Foldable // true
iter[Foldable.toArray]()
iter[Foldable.size]
\
x.constructor implements Foldable // false
x[Foldable.toArray] = function () { ... }
x[Foldable.toArray]() // also ok
x[Foldable.size] // undefined
\
// ensure really implemented protocol
const ::{toArray, size} from Foldable
iter::toArray()
iter::size
x::toArray() // throw TypeError
x::size // throw TypeError
```

```js
// possible shorthand syntax
protocol Foldable {
	foldr
	toArray() {
		return this::foldr((m, a) => [a].concat(m), [])
	}
	get size() {
		return this::foldr(m => m + 1, 0)
	}
	contains(eq, e) {
		return this::foldr((m, a) => m || eq(a, e), false)
	}
}
```

Sensitive code

```js
// Could be hijacked by modifying `WeakSet.prototype`!
const brand = new WeakSet()
\
function installBrand(o) {
	brand.add(o)
}
\
function checkBrand(o) {
	return brand.has(o)
}
```

```js
// Inconvenient syntax
// Could be hijacked by modifying `Function.prototype.call`!
const {has, add} = WeakSet.prototype
const brand = new WeakSet()
\
function installBrand(o) {
	add.call(brand, o)
}
\
function checkBrand(o) {
	return has.call(brand, o)
}
```

```js
// Inconvenient syntax
const call = Reflect.apply
const {has, add} = WeakSet.prototype
const brand = new WeakSet()
\
function installBrand(o) {
	call(add, brand, o)
}
\
function checkBrand(o) {
	return call(has, brand, o)
}
```

```js
const ::{has, add} from WeakSet
const brand = new WeakSet()
\
function installBrand(o) {
	brand::add(o)
}
\
function checkBrand(o) {
	return brand::has(o)
}
```

Eventual Send

```js
// https://github.com/tc39/proposal-eventual-send
\
// E and E.sendOnly convenience proxies
import { E } from 'js:eventual-send';
\
// Invoke pipelined RPCs.
const fileP = E(
	E(target).openDirectory(dirName)
).openFile(fileName);
// Process the read results after a round trip.
E(fileP).read().then(contents => {
	console.log('file contents', contents);
	// We don't use the result of this send.
	E.sendOnly(fileP).append('fire-and-forget');
});
```

```js
// Invoke pipelined RPCs.
const fileP = HandledPromise.applyMethod(
	HandledPromise.applyMethod(target, 'openDirectory', [dirName]),
	'openFile', [filename])
// Process the read results after a round trip.
HandledPromise.applyMethod(fileP, 'read', []).then(contents => {
	console.log('file contents', contents);
	// We don't use the result of this send.
	HandledPromise.applyMethodSendOnly(fileP, 'append', ['fire-and-forget'])
});
```

- need better syntax
- need two type of Proxy to differentiate `get` and `applyMethod`

```js
// https://github.com/tc39/proposal-wavy-dot
const fileP = target
	~.openDirectory(dirName)
	~.openFile(fileName)
// Process the read results after a round trip.
fileP~.read().then(contents => {
	console.log('file contents', contents)
	// We don't use the result of this send.
	fileP~.append('fire-and-forget')
})
```

```js
const send = {
	[Symbol.extension]: {
		invoke(receiver, key, args) {
			return HandledPromise.applyMethod(receiver, key, args)
		},
		get(receiver, key) {
			return HandledPromise.get(receiver, key)
		},
		set(receiver, key, value) {
			return HandledPromise.set(receiver, key, value)
		},
	},
}
const sendOnly = {
	[Symbol.extension]: {
		invoke(key, args) {
			return HandledPromise.applyMethodSendOnly(this, key, args)
		},
		get(key) {
			return HandledPromise.getSendOnly(this, key)
		},
		set(key, value) {
			return HandledPromise.setSendOnly(this, key, value)
		},
	},
}
```

```js
// Invoke pipelined RPCs.
const fileP = target
	::send:openDirectory(dirName)
	::send:openFile(fileName)
// Process the read results after a round trip.
fileP::send:read().then(contents => {
	console.log('file contents', contents)
	// We don't use the result of this send.
	fileP::sendOnly:append('fire-and-forget')
})
```

- Not as concise as special operator, but still elegant
- Save the syntax space

Experimental implementation
for new APIs on prototype

[How to test APIs in OO style instead of forcing FP style?](https://github.com/jridgewell/proposal-array-select-reject/issues/5#issuecomment-554513120)

```js
const array = select(
	input.map(e => e.value),
	(value) => predicate(value)
).find(value => match(value))
```

```js
import ::{select} from 'experimental-array-filtering'
\
input.map(e => e.value)
	::select((value) => predicate(value))
	.find(value => match(value))
```

Summary of my presentation and the proposal
- Revive the "virtual" method part of old bind operator to Extension methods/accessors
- Make the dev experience of extension method/accessors as close as real methods
- Optimize for common use cases, leavage the current ecosystem
- Customizable extension for poor man's custom infix operators
- Try to help other proposals in different ways

Discussion...

Thank you!
[This slide: https://johnhax.net/2020/tc39-nov-extensions](https://johnhax.net/2020/tc39-nov-extensions)
[Proposal repo: https://github.com/hax/proposal-extensions](https://github.com/hax/proposal-extensions)


Two more topics!

类型检查？

- SaneScript/SoundScript
- Optional type annotation (TS-like)
- Type guard (runtime check)

完善的OOP？

- private?（封装）
- protected/friendly?（封装）
- public fields/properties?（声明性）
- accessor group?（声明性）
- decorators?（声明性）
- protocols/interface/trait/mixins?（多态）
- extensions?

JSCIG
中文讨论组

[JSCIG/es-discuss/issues](https://github.com/JSCIG/es-discuss/issues)

Thank you!
一起参与！
