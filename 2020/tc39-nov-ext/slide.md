Extensions and `::` notation for Stage 1
--------------------------------------------------------
<div>贺师俊 @hax <small>Nov 2020 TC39</small></div>

0. Minimal examples
1. Revisit old bind operator
2. Extensions in other languages
3. Customizable extension
4. Use cases
5. Summary

Part 0: Minimal examples

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

Summary of Part 0
- `::` infix notation
- Binary form `o::foo` for ad-hoc extension methods
- Ternary form `o::ext:foo` for using object as extension

Part 1: Revisit old bind operator

`::` This-Binding Syntax proposal
https://github.com/tc39/proposal-bind-operator

- Offical TC39 repo
- Many discussion
- Offical Babel support
- Some adoption in production
- Still stage 0!

```
AWB: Prior to ES6 there was a lot of confusion about what
`this` means. With ES6 classes (and arrow functions) we
made the story a lot cleaner. Maybe it is better to let
this cool down a bit and see how things turn out in a few
years...
Conclusion on bind: Get more feedback from users of Babel
— Mar 25, 2015
```

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
// refs proposal (stage 0)
let ref f = ref o.foo
f() // ? https://github.com/rbuckton/proposal-refs/issues/9
```

```js
o.&method
```

```
need.bind.method.here
                ^
::need.bind.method.here
^
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
import ::{bindKey as extract} from 'lodash' // syntax TBD
\
let user = {
	name: 'hax',
	greet() { return `hi ${this.name}!`}
}
let f = user::extract('greet')
f() // 'hi hax'
```

Can pipeline operator
replace virtual method?

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
	|> #.split(' ')
	|> at(#, 0)
	|> #.toUpperCase()
	|> at(#, -1)
```

```js
const at = (a, i) => { ... }
\
'Hello world'
	|> ?.split(' ')
	|> at(0)
	|> ?.toUpperCase()
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

Userland pipe extension method

```js
let result = "hello"
	|> doubleSay
	|> capitalize
	|> exclaim
```

```js
const ::pipe = function (f) { return f(this) }
\
let result = "hello"
	::pipe(doubleSay)
	::pipe(capitalize)
	::pipe(exclaim)
```

```js
const ::pipe = function (f) { ... }
\
let result = "hello"
	::pipe(
		doubleSay,
		capitalize,
		exclaim)
```

```js
let result = "hello"
	::pipe(doubleSay)
	// ::pipe(capitalize)
	.toUpperCase()
	::pipe(exclaim)
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
import ::{map} from 'lodash' // syntax TBD
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

- F# style pipeline is very good for mainstream FP
- But might have ergonomics issues for multi-paradigm
- Topic style try to be OO-friendly, but ...

Summary of Part 1
- the issue of old bind operator
- reshape "virtual" methods part to this proposal
- leave method extracting to other proposals or userland solutions

Part 2 Extensions in other languages

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

Summary of Part 2

Compare to the classical extension methods
- Locality
- Simple concept model
- Easy to infer
- Predicable performance

Part 3: Customizable extension

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

Part 4. Use cases

```js
// borrow built-in methods
value::Object:toString() // Object.prototype.toString.call(value)
```

```js
indexed::Array:map(x => x * x) // Array.prototype.map.call(indexed, x => x * x)
indexed::Array:filter(x => x > 0) // Array.prototype.filter.call(indexed, x => x > 0)
```

```js
const ::{map, filter} from Array // syntax TBD
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

Advance to Stage 1?

Thank you!
[This slide: https://johnhax.net/2020/tc39-nov-extensions](https://johnhax.net/2020/tc39-nov-extensions)
[Proposal repo: https://github.com/hax/proposal-extensions](https://github.com/hax/proposal-extensions)
