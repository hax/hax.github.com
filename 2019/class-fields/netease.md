第二届网易前端技术大会

Will class fields be the
new Bad Part
of JavaScript?

![book covers](jscover.jpg)

JavaScript:
The Good Parts

The Bad Parts

![The Good Parts](goodparts.jpg)

![You don't know JS](udontknowjs.jpg)

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy

Class Fields

Public fields

React

```js
class Counter extends React.Component {
	constructor {
		super()
		this.state = {count: 0}
		this.inc = this.inc.bind(this)
	}
	inc() {
		this.setState({count: this.state.count + 1})
	}
	render() {
		return (
			<div onClick={this.inc}>{this.state.count}</div>
		)
	}
}
```

```js
class Counter extends React.Component {
	state = {count: 0}
	inc = () => {
		this.setState({count: this.state.count + 1})
	}
	render() {
		return (
			<div onClick={this.inc}>{this.state.count}</div>
		)
	}
}
```

GOOD!

Really?

React Hooks

```js
class Counter extends React.Component {
	state = {count: 0}
	inc = () => {
		this.setState({count: this.state.count + 1})
	}
	render() {
		return (
			<div onClick={this.inc}>{this.state.count}</div>
		)
	}
}
```

```js
function Counter() {
	const [count, setCount] = useState(0)
	const inc = () => setCount(count + 1)
	return (
		<div onClick={inc}>{count}</div>
	)
}
```

React class-based
components is doomed

Still good?

Private field

```js
class Counter {
	constructor() {
		this.count = 0
	}
	inc() { ++this.count }
}
```

```js
const c = new Counter()
c.inc()
c.count // 1
```

```js
c.count = 10 // hack it!
```

```js
class Counter {
	constructor() {
		this._count = 0
	}
	get count() { return this._count }
	inc() { ++this._count }
}
```

```js
const c = new Counter()
c.inc()
c.count // 1
c.count = 10 // throw!
```

```js
c._count = 10 // hack it!
```

```js
const count = Symbol()
class Counter {
	constructor() {
		this[count] = 0
	}
	get count() { return this[count] }
	inc() { ++this[count] }
}
```

Soft private

```js
// reflection
c[Object.getOwnPropertySymbols(c)[0]] = 10
```

```js
class Counter {
	#count = 0
	get count() { return this.#count }
	inc() { ++this.#count }
}
```

Hard private

```js
class Counter {
	@deco #count = 0
	get count() { return this.#count }
	inc() { ++this.#count }
}
```
<!--Only decorator (still stage 2) can access the PrivateName (WeakMap)-->

`#`

WTF!

Inner peace...

```js
class Counter {
	_count = 0
	get count() { return this._count }
	inc() { ++this._count }
}
```

```js
class Counter {
	#count = 0
	get count() { return this.#count }
	inc() { ++this.#count }
}
```

`#` is new `_`

If you accept it
it's just ok.

Are you OK?

```js
class X {
	#foo
	#foo() {}
	get #foo() {}
	*#foo() {}
	async *#foo() {}
}
```

```js
class X {
	static #foo
	static #foo() {}
	static get #foo() {}
	static *#foo() {}
	static async *#foo() {}
}
```

Are you OK?

`#` is new `_`

If you accept it
it's just ok.

- `public&nbsp; &nbsp;foo this.&nbsp;foo`
- `pseudo&nbsp;  _foo this._foo`
- `private #foo this.#foo`

- public  fields
- private fields

class fields

Stage 3

Babel 7 (Babel 6?)
Chrome 72 (soon)
node --harmony

- Good part?
- Bad part?

?

```js
\
	[x] = [1, 2, 3]
\
```

```js
class Test {
	[x] = [1, 2, 3]
}
```

Destructuring?

Computed property

Same syntax, very
different semantics

- bad to novices,
- bad to programmers from other languages,
- also bad to professional JS programmers

- rarely known,
- rarely used,
- hard to recognize

Possible solution

New ESLint rule,
**no-class-computed-field**

Use cases of computed fields?

Symbols

- Well-known symbols are for methods/accessors,
- Private fields instead of symbol-based private

No big use case

Just drop it!


```html
<script>
class Test {
	name = 'world'
	greeting = `Hello ${name}!`
}
alert(new Test().greeting)
</script>
```

- A. "Hello world!"
- B. "Hello undefined!"
- C. "Hello !"
- D. throw ReferenceError
- E. None of the above

C. "Hello !"

```js
\
	a = 10
	b = a * a
\
```

```js
class X {
	a = 10
	b = a * a
}
```

Same syntax, very
different semantics

- bad to novices,
- very bad to programmers from other languages,
- also bad to professional JS programmers

- I'm stupid!,
- You fool!

No

- Don't blame yourself
- Don't blame your coworkers

Blame TC39!

Why blame TC39?

It's reasonable/tradeoff
because blah blah blah...

Stop!

Does any other programming
languages have same issue?

- C++, C#, VB.NET
- Java, Scala, Groovy
- Swift, Kotlin, Dart
- Python, Ruby, Coffee
<!-- Objective-C ? , Perl ? , C, SQL, MATLAB, R, Go -->

None

Only one

PHP

Bad design **IS**
just bad design.

Why it is bad?

```js
class Test {
	name = 'world'
	greeting = `Hello ${name}!`
}
```

- Are you sure you never make such mistake?
- Are you sure your team members never make such mistake?
- Are you sure you can find the mistake by code review?

[code review](https://github.com/hax/js-class-fields-chinese-discussion/pull/1/files)

- How you know you are in the context of class body?
- How you know `b` in `class { a = b * b }` is a mistake?


Possible solution

New ESLint rule:
**no-field-name-var**

```js
class Test {
	name = 'world'
	greeting = `Hello ${window.name}!`
}
```

```js
const currentName = () => name;
class Test {
	window
	name = 'world'
	greeting = `Hello ${currentName()}!`
}
```

Why not just allow
implicit `this`?

Why not just
drop `this`?

`this` binding issue

```js
class Test {
	<keyword> count = 0
	<keyword> inc() { ++count }
	render() {
		return (
			<div onClick={inc}>{count}</div>
		)
	}
}
```

- Error prone,
- Ask for more accidents of missing `this`,
- Very bad to code review,
- New linter rule is must to have

New ASI hazards,
ruin semicolon-less coding style

semicolon-less,
leading semicolon

The leading semicolon rule is simple:
when starting a statement in new line,
insert leading semicolon iff the first
character is `(`, `[`, `+`, `-`, `/` and ```.

```js
test()
;[1, 2, 3, 4].forEach(n => console.log(n))
```

Public field add several
new ASI hazards

```js
class Test {
	x = 1
	[key] = 2 // miss leading semicolon
}
```

```js
class Test {
	x = 1
	[Symbol.iterator]() { ... } // miss leading semicolon
}
```

```js
class Test {
	x = 1
	*f() { ... } // miss leading semicolon
}
```

These three cases are ok. The first two
already covered by leading semicolon rule.
For the third, we need to add `*` case.
It's ok, actually make the rule simpler:

... iff the first character is:

- `([ &nbsp;` (open parens)
- `+-*/` (the notation of four arithmetic binary operators)
- ``&nbsp; &nbsp;` (template string)


```js
class Test1 {
	out
	in
	name
}
\
// Test2 actually is class { out = 'out' in name }
class Test2 {
	out = 'out'
	in
	name
}
```

This case is bad. We need an extra leading
semicolon rule: insert leading semicolon
if you are in class body and the first
~~character~~ **token** is `in` or `instanceof`.

```js
class Test1 {
	set = new Set
	f() { ... }
}
\
// Test2 actually is class { set f() { ... } }
class Test2 {
	set
	f() { ... }
}
```

This case is the worst. We need a special rule:
insert leading semicolon if you are in class body
and **the previous line is `set`, `get` or `static`**.

The core value of the leading semicolon
rule is you never look backward,
and this case just **ruin** it.

Possible Solutions

New ESLint rule:
**no-keyword-name-field**

```js
class Test {
	out
	'in'
	'instanceof'
	'set'
	'get'
	'static'
	f() { ... }
}
```

```js
class Test {
	'static' = true
	goodSyntax = false
}
```

- inconsistent
- very weird

New ESLint rule:
**prefer-decorator-for-field**

```js
class Test {
	@field out = new WritableStream()
	@field in = new ReadableStream()
	@field set = new Set()
	f() { ... }
}
```

- rely on linter
- rely on decorator (only stage 2)
- rely on transpiler
- coding style agreement

Add keyword!

```js
class Test {
	<keyword> out = new WritableStream()
	<keyword> in = new ReadableStream()
	<keyword> set = new Set()
	f() { ... }
}
```

Can linter/formmatter save us?

- ESLint
- TSLint
- Prettier

Community Cost

Syntax issues,
Semantic issues

```js
class MyComponent extends BaseComponent {
	constructor() {
		this.state = {foo: 42}
	}
	wrongUsage() {
		this.state.foo = ...
		this.state = ...
	}
}
```

```js
class BaseComponent {
	get state() { return this._immutableState }
	set state(initState) {
		if (this._state != null) throw new TypeError('please use setState()')
		if (initState == null) throw new TypeError('state should be initialized to a non-null value')
		this._state = initState
		this._immutableState = new Proxy(this._state, { set() { throw new TypeError() } })
	}
}
```

```js
class MyComponent extends BaseComponent {
	state = {foo: 42}
	wrongUsage() {
		this.state.foo = ...
		this.state = ...
	}
}
```

```js
class User {
	name
	password
	...
}
```

```js
class SafeUser extends User {
	password = generateStrongPassword()
}
```

```js
class User {
	get password() { return this._password }
	set password(v) {
		this._password = v
		SecurityAuditor.log('user change password', this.name, v)
	}
}
```

```js
class User {
	constructor() {
		this.password = generateStrongPassword()
		...
	}
}
```

```js
class SafeUser extends User {
	get password() { return this._password }
	set password(v) {
		this._password = v
		SecurityAuditor.log('user change password', this.name, v)
	}
}
```

```js
class User {
	constructor() {
		this.password = generateStrongPassword()
		...
	}
}
```

```js
class User {
	password = generateStrongPassword()
	...
}
```

- Subclass field will never call superclass accessor
- Subclass accessor can not override superclass field

- Ok: Babel 6, TypeScript
- Fail: Babel 7, Chrome

`[[Define]]` VS `[[Set]]`

- `[[Set]]` Babel 6, TypeScript
- `[[Define]]` Babel 7, Chrome

Why `[[Set]]`

- No footgun
- `foo = bar` just implies `[[Set]]`

Why `[[Define]]`

- Definition!
- Decorator!

- `[[Define]]` Vue, React, ...
- `[[Set]]` MobX, Polymer, ...

No real consensus

Possible Solution

New ESLint rule
**prefer-decorator-for-field**

```js
class {
	@set foo = 42
	@define bar = 1337
}
```

- Burden for edge cases
- @define still broken — subclass <br>accessor can't override superclass

No public field!

Classes 1.1 proposal
by Kevin Smith, Allen Wirfs-Brock and Brendan Eich

```js
class Counter {
	var value = 42
	inc() {
		++value
	}
	get value() { return value }
	equal(that) {
		return value === that::value
		// this::value === that::value
	}
}
```

No public field!

Own property
Definition

Prototype-based
Inheritence

Refused because of
no public field...

Revisit the issues

1. `foo = bar` implies `[[Set]]`
1. As `[[Set]]`, programmers expect <br>(subclass) "field" call (superclass) accessor
1. As `[[Define]]`, programmers expect <br>subclass (accessor) override superclass (field)

1. `[[Define]]`
1. own property

Solutions

1. Drop `[[Define]]` (use `[[Set]]`)
1. Drop own property (use `[[Define]]` on prototype)
1. Drop the combination of `[[Define]]` and own property

1. ~~use [[Set]]~~
1. `[[Define]]` accessors on prototype
1. `[[Define]]` data property on prototype, then `[[Set]]` for initializer

```js
class Foo {
	<keyword> foo = 42
}
class Bar extends Foo {
	get foo() { ... }
	set foo(v) { ... }
}
```

```js
class Foo {
	// Object.defineProperty(Foo.prototype,
	//   'foo', { value: undefined, ... })
	foo
	constructor() {
		this.foo = 42
	}
}
class Bar extends Foo {
	get foo() { ... }
	set foo(v) { ... }
}
```

Syntax sugar of
getter/setter
wrapper for private

```js
class Foo {
	<keyword> foo = 42
}
```

```js
class Foo {
	#foo = 42
	get foo() { return this.#foo }
	set foo(v) { this.#foo = v }
}
```

```js
class Foo {
	<private> foo = 42
	get foo() { return foo }
	set foo(v) { foo = v }
	<private> method() {
		foo // diff from this.foo
	}
}
```

Prototype-based
Follow ES6 classes

Keyword-based
Easy to follow
OO best practice

```js
<keyword> foo = 'foo'
<keyword> writable bar = 'bar'
```

```js
#foo = 'foo'
get foo() { return this.#foo }
#bar = 'bar'
get bar() { return this.#bar }
set bar(v) { this.#bar = v }
```

getter/setter is bad?

No!

(Time limit, no details)

Most programming languages
are using syntax sugar of
getter/setter pattern!

- C#
- Ruby
- Scala
- Groovy
- Kotlin
- Dart
- Swift
- ...

all use this pattern

In last 20 years, main stream OO programming languages
all adopt the design of using getter/setters wrap
private states — which is proved as OO best practice.

And most programming languages designers
agree it's good and deserve dedicate syntax

JavaScript programmers don't use getter/setters much,&nbsp;
not because we dislike getter/setters, just because we
never have private mechanism (there are some workarounds,&nbsp;
but lack of ergonomics syntax), which means we eventually
have to store states to the own properties in most cases.

So we use own properties to store states of instances
just because we do not have other good choices


Issue of static public field

```js
class X {
	static count = 0
	static inc() {
		++this.count
	}
	constructor() {
		// could be class.inc() as future proposal
		this.constructor.inc()
	}
}
class Y extends X {}
```

```js
console.log(X.count, Y.count) // 0 0
new X()
console.log(X.count, Y.count) // 1 1
new Y()
console.log(X.count, Y.count) // 1 2
new X()
console.log(X.count, Y.count) // 2 2
new Y()
console.log(X.count, Y.count) // 2 3
```

The footgun of mutable
property on prototype


Issue of Brand checking

```js
class X {
	#x
	constructor(value = 0) {
		this.#x = value
	}
	equal(that) {
			return this.#x === that.#x
		}
	}
}
```

```js
new X(1).equal(new X(1)) // true
new X(1).equal(new X(2)) // false
```

```js
new X().equal({}) // throw! oops...
```

Most JS programmers familiar with duck type, so if
they want to do "branding", they would like to write
`if (that[brand]) ...` or more strict form
`that[brand] !== undefined` or `brand in that`.

Unfortunately, with `this.#x`
you have no way to do such test

Of coz we can use `try`

```js
class X {
	...
  equal(that) {
		try {
			return this.#x === that.#x
		} catch {
			return false
		}
	}
}
```

But such abusing of `try` is not very desirable.
Eventually we realize it's just type check.
So most programmers will like to write:

```js
class X {
	...
  equal(that) {
		if (!(that instanceof X)) return false
		return this.#x === that.#x
	}
}
```

Not bad. But there are holes.

```js
const x = new X()
x.equal({}) // false
\
const x1 = { __proto__: X.prototype }
x.equal(x1) // throw!
\
const x2 = Object.create(x)
x.equal(x2) // throw!
\
const x3 = new Proxy(x, {})
x.equal(x3) // throw!
```

So the only safe way is `try`

Finally you will write code
like that to bypass "branding"

```js
class Foo {
	#x
	#y
	constructor(x, y) {
		this.#x = x
		this.#y = y
	}
	equal(that) {
			return this.#x === suppressBrand(() => that.#x)
				&& this.#y === suppressBrand(() => that.#y)
		}
	}
}
\
const fail = Symbol()
function suppressBrand(retrievePrivateField) {
	try {
		return retrievePrivateField()
	} catch {
		return fail
	}
}
```

Do we really need strict
brand checking by default?

opt-in

```js
const brandFoo = new WeakSet()
function checkFoo(o) {
	if (!brandFoo.has(o)) throw new TypeError()
}
class Foo {
	constructor() {
		brandFoo.add(this)
	}
	method1() {
		checkFoo(this)
		...
	}
	method2(that) {
		checkFoo(this)
		checkFoo(that)
		...
	}
}
```


```js
class Foo {
	constructor() {
		if (new.target === Foo) brandFoo.add(this)
	}
	...
}
```

```js
@brand
class Foo {
	method1() {
		...
	}
	method2(that) {
		this.brandCheck(that)
		...
	}
	@noBrand method3() {
		...
	}
}
```

Much flexible!

Issue of Proxy transparency

```js
class Foo {
	_foo = 42
	method() {
		return this._foo
	}
}
const p = new Proxy(new Foo(), {})
p.method() // 42
```

```js
class Foo {
	#foo = 42
	method() {
		return this.#foo
	}
}
const p = new Proxy(new Foo(), {})
p.method() // throw
```

Private fields break
Proxy **by default**

Can't coexist with
libraries/frameworks
rely on Proxy

- MobX
- Vue 3
- Aurelia
- ...

Membrane

```js
class Foo {
	#foo = 42
	method() {
		return this.#foo
	}
}
const p = new NaiveMembrane(new Foo())
p.method() // 42
```

```js
const wrapped = new WeakMap()
function NaiveMembrane(target) {
	const p = new Proxy(target, {
		get(target, key, reciever) {
			const result = Reflect.get(target, key, reciever)
			if (typeof result === 'function') {
				return new Proxy(result, {
					apply(target, thisArg, argList) {
						const unwrapped = wrapped.has(thisArg) ? wrapped.get(thisArg) : thisArg
						return Reflect.apply(target, unwrapped, argList)
					}
				})
			} else {
				return result
			}
		}
	})
	wrapped.set(p, target)
	return p
}
```

- Need membrane implementation which is very complex
- Footprint and performance cost
- May still unfit in MobX/Vue/Aurelia use cases

Issue of prototypal inheritance transparency

```js
class Test {
	#foo = 42
	foo() {
		return this.#foo
	}
}
const test = Object.create(new Test())
test.foo() // throw
```

Issue of static private

```js
const secret = '...'
/*
...
*/
class Base {
	static login() {
		secret
	}
}
class Sub extends Base {
	static doSth() {
		this.login()
	}
}
Sub.doSth()
```

Refactory for Cohesion

```js
class Base {
	static #secret = '...'
	static login() {
		this.#secret
	}
}
class Sub extends Base {
	static doSth() {
		this.login()
	}
}
Sub.doSth()
```

Throw!

Prototype!

Possible Solution

New ESLint rule:
**no-static-this-ref-private**

- Disallow `this.#foo` in static methods
- Disallow `this.constructor.#foo` in instance methods
- Disallow `class.#foo` in all methods?


Simple way

Use symbol-based semantic
instead of weakmap-based


# Destructuring and Enumeration

```js
// extract states from an object to local variables
const {a, b = 0, ...rest} = obj
\
// assign states from local variables to object
Object.assign(obj, {a, b})
\
// use enumeration to assign "safely"
for (const key in obj) obj[key] = rest[key]
```


```js
class {
	a
	b
	constructor(obj) {
		// destructuring to class instance is awkward
		let rest
		{a: this.a, b: this.b, ...rest} = obj
\
		// use assign
		const {a, b = 0, ...rest} = obj
		Object.assign(this, {a, b})
\
		// or use enumeration
		// WARN: may miss accessors on prototype and include conventional private `_foo`
		for (const key in this) {
			this[key] = rest[key]
		}
	}
}
```

```js
class {
	#a
	#b
	constructor(obj) {
		// destructuring to class instance is awkward
		let rest
		{a: this.#a, b: this.#b, ...rest} = obj
\
		// no way to assign
		const {a, b = 0, ...rest} = obj
		Object.assign(this, {#a: a, #b: b}) // illegal!
\
		// no way to enumerate
		for (const priv in this.#) { // illegal
			this.#[priv] = rest[key] // illegal
		}
	}
}
```

```js
class {
	#$
	constructor(obj) {
		// destructing
		const {a, b, ...rest} = obj
		this.#$ = {a, b}
\
		// use assign
		const {a, b = 0, ...rest} = obj
		Object.assign(this.#$, {a, b})
\
		// or use enumeration
		for (const key in this.#$) {
			this.#$[key] = rest[key]
		}
	}
	get a() {
		return this.#$.a // access private become a little weird
	}
	b(...args) {
		this.#$.b.call(this, ...args) // rebind this 😥
	}
}
```

`#` is new `_`?

Issue of protected

No `protected`!

```js
class X {
	@protected #field
	@protected #method() { ... }
}
class Y extends X {
	@inherit #field
	@override #method() {
		super.#method()
		...
	}
}
```

- Syntax?
- Performance?
- super call?


Initializer Order

```js
class X {
	#a = console.log(1)
	#b = console.log(2)
	constructor() {
		console.log(3)
	}
	#c = console.log(4)
}
class Y extends X {
	#d = console.log(5)
	constructor() {
		console.log(6)
		super()
		console.log(7)
	}
	#e = console.log(8)
}
new Y()
```

- Weird, complex order

```js
class X {
	#x
	constructor() {
		this.init()
	}
	init() {
		this.#x = 1
	}
	toString() { return this.#x }
}
class Y extends X {
	#y
	init() {
		super.init()
		this.#y = 2
	}
	toString() { return super.toString() + ', ' + this.#y }
}
new Y()
```

Footgun!

C# order is better!

Issue of `#`

Sense and Sensibility

`#` is a "sensibility" issue

No way to convince

Just like tab/space
semicolon style

And even worse!
(tab/space, semicolon style are not problem in
practice because they can be converted losslessly)

No reliable way to convert
`#` to other private solution

Community break

Especially bad to
TypeScript community

No promising migration
or any best practice

Will you accept a PR which
convert your TS private to `#`?

Summary

- public field: syntactic ambiguity, same syntax, different semantics in different context
- public field: new ASI hazards, ruin semicolon-less coding style
- public field: semantic conflict of own property definition to prototype-based inheritance
- static public field: mutable property on prototype is footgun
- private field: very hard to bypass brand checking
- private field: by default break proxy
- private field: no way to destructuring, enumeration
- static private field/method: break in subclass
- public/private field: initializer order is confusing and cause footgun
- public/private field: footgun of calling subclass override methods before initialization
- no protected, friend, etc
- private field/method: bad notation `#`

Some other issues

- use bad term "field"
- hard private
- leave too many things to decorators, <br>unnecessary powerful and risky, <br>hard to do static analysis
- doesn't solve some big issues of classes
- duality of syntax of public/private <br>but semantic are totally different
- motivation of public field (use class for <br>object factory) and private field (use class <br>for interface implementation) have conflict


Too many issues

Every part of the proposal
has at least one hole

Even each one may small
The whole cost is **huge**

Will class fields be the
new Bad Part
of JavaScript?

- Bad
- Not Bad

Alternatives?

What's wrong with TC39?

What can we do?

QA
[github.com/hax/js-class-fields-chinese-discussion](https://github.com/hax/js-class-fields-chinese-discussion)
