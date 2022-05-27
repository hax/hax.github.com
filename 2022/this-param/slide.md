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
function getX<T>(this: T) {
	return this.x
}
```

```js
// JavaScript this parameter
function getX(this) {
	return this.x
}
```

[Type Annotation proposal](https://github.com/tc39/proposal-type-annotations#this-parameters)
[Old gilbert/es-explicit-this](https://github.com/gilbert/es-explicit-this)
Written by Gilbert 6 years ago
before TS adding `this` type check
Include renaming and destructuring

Prior Arts:
- Java 8+ (explicit receiver parameter)
- TypeScript
- FlowType

## Motivations

Standardize syntax for TS/Flow/etc.
Simpify tool chains of TS/Flow/etc.
Eliminate the confusion of newcomers

Narrow the gap between
JavaScript and TypeScript

Effort of reducing the syntax burdens
of Type Annotation proposal

## Use cases

- Type annotation
- Parameter decorators
- Mark "method"

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

```js
function f(this) {}
// f is not a constructor
new f() // TypeError
Reflect.construct(f, []) // TypeError
```

```js
function f(this) {}
f() // TypeError
f.call() // ok
Reflect.apply(f, undefined, []) // ok
```

## How to spec runtime semantic?

`[[ThisMode]]`
- lexical (arrow functions)
- global (`this ??= globalThis`)
- strict,
- explicit (has `this` parameter)

`[[ThisMode]]`
- lexical (arrow functions)
- global (`this ??= globalThis`)
- implicit (no `this` parameter)
- explicit (has `this` parameter)

Allow programmers *explicitly*
mark a function as *method*
which expect `this` arg to be passed in
---------------------------------------
Improve self-documenting
Error early for some common misuse

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
				use(this) // <- here
			})
		})
	},
}
list.forEach(o.doSomething) // wrong
```

```js
// Use this parameter to
// mark method
let o = {
	doSomething(this) {
		// ...
	},
}
list.forEach(o.doSomething) // TypeError
list.forEach(o.doSomething, o) // ok
```

```js
class X {
	// Use this parameter to denote a static
	// method which also need receiver
	static foo(this) {
		// ...
	}
}
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
- "method" semantic

Queue...

Stage 1?
