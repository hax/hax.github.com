Class brand check for Stage 1
--------------------------------------------------------
<div><ruby>贺师俊<rp>（</rp><rt>HE Shi-Jun</rt><rp>）</rp></ruby> @hax <small>Jan 2021 TC39</small></div>


- [Class brand checks](https://github.com/hax/proposal-class-brand-check)
- [#13 of Ergonomic brand checks for Private Fields](https://github.com/tc39/proposal-private-fields-in-in/issues/13)

```js
// Ergonomic brand checks for Private Fields
class C {
	#brand
	static isC(obj) {
		return #brand in obj // private in
	}
}
\
C.isC(new C()) // true
C.isC(Object.create(C.prototype)) // false
new C() instanceof C // true
Object.create(C.prototype) instanceof C // true
```

Why we need `isC()`?

```js
class C {
	#x
	constructor(x) { this.#x = x }
	equals(o) {
		return this.#x === o.#x
	}
}
let a = new C(1)
let b = new C(2)
a.equals(a) // true
a.equals(b) // false
a.equals(1) // throw TypeError!
```

```js
class C {
	#x
	constructor(x) { this.#x = x }
	equals(o) {
		if (!(o instanceof X)) return false
		return this.#x === o.#x
	}
}
```

```js
class C {
	#x
	constructor(x) { this.#x = x }
	equals(o) {
		if (!(isC(o))) return false
		return this.#x === o.#x
	}
}
```

```js
class C {
	#x
	constructor(x) { this.#x = x }
	equals(o) {
		if (!(IsRealInstanceOf(o, C))) return false
		return this.#x === o.#x
	}
}
```

What is "real instance" mean?

`o` is the "real instance" of class `X`,
means `o` is created via `new X()`,
and have all public interfaces and
internal implementation details of `X`

Note: "real instance of" is a high-level
OOP concept which shared by almost all
mainstream OOP programming languages

Our problem: `instanceof` is prototype-based by default,
currently we don't have the mechnism
which could 100% map that concept

```js
#x
static isC(obj) {
	try {
		obj.#x
		return true
	} catch {
		return false
	}
}
```

Abusing the low-level mechnism (try/catch)
to make up high-level intentions


```js
get #x() { ... }
static isC(obj) {
	try {
		obj.#x
		return true
	} catch {
		return false
	}
}
```

```js
static isC(obj) {
	return #x in obj
}
```

It seems to solve the problem
But it's still a abusing
low-level mechanism

```js
class Product {
	id
	constructor(id) { this.id = id }
	equals(o) {
		if (???) return false
		return this.id === o.id
	}
}
```

```js
class Product {
	#id
	get id() { return this.#id }
	set id(v) { this.#id = v }
	constructor(id) { this.id = id }
	equals(o) {
		if (!(#x in o)) return false
		return this.x === o.x
	}
}
```

be tempted to use private field，
even you don't need it

- performance
- semantic (`Object.keys()`/`assign()`)

Even you already
use private fields

```js
class Product {
	#id
	#name // more
	#desc // fields
	equals(o) {
		if (!(#id in o)) return false
		// if (!(#id in o && #name in o && #desc in o)) return false
		return this.#id === o.#id
	}
	static idOf(o) {
		if (!(#id in o)) return null
		// if (!(#id in o && #name in o && #desc in o)) return null
		return o.#id
	}
}
```

- Add: maintaining cost
- Not add: incorrect in concept, theorically edge case
- It depends: mental model cost

Possible “Best practice”

```js
class Product {
	#id
	#name // more
	#desc // fields
	static #isProduct(o) {
		return #id in o && #name in o && #desc in o
	}
	equals(o) {
		if (!(#isProduct(o))) return false
		return this.#id === o.#id
	}
	static idOf(o) {
		if (!(#isProduct(o))) return null
		return o.#id
	}
}
```

```js
class C {
	#x
	#y
	#brand // for brand check, must be the last one, don't touch it!
	equals(o) {
		if (!(#brand in o)) return false
		return this.#x === o.#x && this.#y === o.#y
	}
	static readX(o) {
		if (!(#brand in o)) return null
		return o.#x
	}
}
```

```js
class C {
	#x
	#y
	#brand
	static #isC(o) {
		return #brand in o
	}
	equals(o) {
		if (!(#isC(o)) return false
		return this.#x === o.#x && this.#y === o.#y
	}
	static readX(o) {
		if (!(#isC(o)) return null
		return o.#x
	}
}
```

A low-level mechanism of
existence test of a single private field
not match programmer's
high-level intentions well

Class brand checks proposal

```js
class C {
	equals(o) {
		if (!(class.hasInstance(o))) return false
		return ...
	}
	static readX(o) {
		if (!(class.hasInstance(o))) return null
		return ...
	}
}
```

```js
class C {
	static [Symbol.hasInstance](o) {
		return class.hasInstance(o)
	}
}
```

- holistic brand check
- opt-in (only classes contains `class.hasInstance` would have class brand)
- more details semantics could be discussed in future stage

Private declarations

```js
private #shared
\
class X {
	outer #shared
}
class Y {
	outer #shared
}
```

Edge case of
"incomplete" instances

```js
let o
\
class A {
	constructor() {
		x = this
	}
}
class B extends A {
	#x
	#y = throwError()
}
try { new B() } catch {}
o // only have #x but no #y
```
