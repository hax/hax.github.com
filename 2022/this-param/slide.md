# TypeScript `this` parameter for Stage 1
--------------------------------------------------------
<div><ruby>贺师俊<rp>（</rp><rt>HE Shi-Jun</rt><rp>）</rp></ruby> @hax <small>June 2022 TC39</small></div>

# ~~Type~~Script `this` parameter for Stage 1
--------------------------------------------------------
<div><ruby>贺师俊<rp>（</rp><rt>HE Shi-Jun</rt><rp>）</rp></ruby> @hax <small>June 2022 TC39</small></div>

# JavaScript `this` parameter for Stage 1
--------------------------------------------------------
<div><ruby>贺师俊<rp>（</rp><rt>HE Shi-Jun</rt><rp>）</rp></ruby> @hax <small>June 2022 TC39</small></div>

```ts
// TypeScript this parameter
function getX(this: Point) {
	return this.x
}
```

```js
// JavaScript this parameter
function getX(this) {
	return this.x
}
```

Prior Arts:
- TypeScript
- FlowType
<li>Java 8+<br>(explicit receiver parameter)</li>

[Old proposal: gilbert/es-explicit-this](https://github.com/gilbert/es-explicit-this)
- by Gilbert 6 years ago (before TS adding `this` type check)
- include renaming and destructuring `this` feature
- main motivation: solve `this` confusion (shadowing) issue
- presented on Feb 2020 meeting but not advanced

[Type Annotation: tc39/proposal-type-annotations](https://github.com/tc39/proposal-type-annotations#this-parameters)
- `this` parameter itself is not type annotation
- runtime semantic is out of scope of "annotation" (aka. comments)

[This proposal: hax/proposal-this-parameter](https://github.com/hax/proposal-this-parameter)
- **drop** the features of renaming and destructuring
- focus on the basic syntax **and semantic**

## Motivations

Standardize syntax for TS/Flow/etc.
Simpify tool chains of TS/Flow/etc.

Narrow the gap between
JavaScript and TypeScript
Eliminate the confusion of newcomers

Effort of reducing the syntax burdens
of Type Annotation proposal

## Usage

- Type annotation
- Parameter decorators

```ts
// type annotation (TypeScript, FlowType)
function handleClick(this: HTMLElement) {
	this.innerText = "clicked!"
}
element.addEventListener("click", handleClick)
```

```ts
// Parameter decorators
function handleClick(@Type(HTMLElement) this) {
	this.innerText = "clicked!"
}
element.addEventListener("click", handleClick)
```

## Early errors
(Follow TS/Flow errors)

```js
function f(a, this /* syntax error */ ) {}
```
```js
let f = (this /* syntax error */ ) => 0
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
<!-- TypeScript/FlowType/Java all disallow it -->

## Runtime errors
(Also match TS/Flow behavior)

```js
function f(this) {}
// f is not a constructor
new f() // TypeError
Reflect.construct(f, []) // TypeError
```

```js
function f(this) {}
f() // TypeError
f.call({}) // ok
Reflect.apply(f, {}, []) // ok
```

Extra Motivation
Provide syntax/semantic for "method"

- Constructor: no *this argument*
- Non-method: ignore *this argument*
- Method: expect *this argument*

- Dedicated syntax for Constructors: classes
- Dedicated syntax for Non-methods: arrow functions
- Dedicated syntax for Methods: ?

- Dedicated syntax for Constructors: classes
- Dedicated syntax for Non-methods: arrow functions
- Dedicated syntax for Methods: `this` parameter

Allow programmers *explicitly*
mark a function as *method*
expect *this argument* to be passed in
---------------------------------------
Improve self-documenting
Throw Error early for some common misuse

```js
let o = {
	doSomething(v) {
		// ...
		// hundreds of line
		// ...
		doA(() => {
			// ...
			doB(() => {
				// deep nest
				// ...
				if (condition)
					use(this) // <- here
			})
		})
	},
}
const {doSomething} = o
doSomething(value) // wrong
list.forEach(o.doSomething) // wrong
```

```js
// Use this parameter to
// mark method
let o = {
	doSomething(this, v) {
		// ...
	},
}
const {doSomething} = o
doSomething(value) // TypeError
doSomething.call(value) // ok
list.forEach(o.doSomething) // TypeError
list.forEach(o.doSomething, o) // ok
```

```js
class X {
	// Use this parameter to denote a static
	// method also expect this argument
	static foo(this) {
		// ...
	}
}
run(X.foo) // throw TypeError
run(() => X.foo()) // ok
```

## Useful to Extensions/call-this proposal

```js
export function pipe(this, ...funcList) {
	let v = this
	for (const f of funcList) {
		v = f(v)
	}
	return v
}
```

```js
// call-this proposal
import {pipe} from "./methods"
// ...
value~>pipe(f1, f2, f3)
// ...
pipe(value, f1, f2, f3) // TypeError
```

```js
// Extensions proposal
import ::{pipe} from "./methods"
value::pipe(f1, f2, f3)
// ...
pipe // ReferenceError
```

```js
// Extensions proposal
import ::{pipe} from "./util-helpers" // TypeError
// ...
value::pipe(f1, f2, f3)
```

Summary of
`this` parameter

- adopt TS/Flow syntax
- annotate/decorate `this` arg
- "method" syntax/semantic

Queue...

Extra slides
(not stage 1 consideration)

```js
f() // TypeError
f.call({}) // ok
Reflect.apply(f, {}, []) // ok
// Issue: what about undefined/null?
f.call() // ok?
f.call(null) // ok?
Reflect.apply(f, undefined, []) // ok?
Reflect.apply(f, null, []) // ok?
```

## How to spec ?

`[[ThisMode]]`
- lexical (arrow functions)
- global (`this=Object(this??globalThis)`)
- strict,
- explicit (has `this` parameter)

`[[ThisMode]]`
- lexical (arrow functions)
- global (`this=Object(this??globalThis)`)
- implicit (no `this` parameter)
- explicit (has `this` parameter)

[Issue: Non-strict?](https://github.com/hax/proposal-this-parameter#issue-of-non-strict-mode)
If you specify something explicitly
you don't want any implicit effect

Stage 1?

Thank you!
