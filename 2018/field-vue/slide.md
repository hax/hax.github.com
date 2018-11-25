VueConf 2018 Hangzhou

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy

JS class fields
& Vue

```js
class Counter {
	value = 0
\
	render() {
		return <div>{this.value}</div>
	}
}
```

```js
const counter = proxiedByVue(new Counter())
counter.value // 0, first run
++counter.value // 1, trigger render()
counter.value = 255 // 255, trigger render() again
```

```js
class Counter {
	_value = 0
\
	get value() { return this._value }
	set value(v) { this._value = Math.max(v, 10) }
\
	render() { ... }
}
```

```js
const counter = proxiedByVue(new Counter())
counter.value // 0, first run
++counter.value // 1, trigger render()
counter.value = 10 // 10, trigger render() again
counter.value = 255 // still 10, not trigger render()
counter._value = 255 // but it can be cracked easily!
```

```js
const myValue = Symbol()
class Counter {
	;[myValue] = 0 // weird syntax, but let's ignore it
\
	get value() { return this[myValue] }
	set value(v) { this[myValue] = Math.max(v, 10) }
\
	render() { ... }
}
```

```js
const counter = proxiedByVue(new Counter())
counter.value // 0, first run
++counter.value // 1, trigger render()
counter.value = 10 // 10, trigger render() again
counter.value = 255 // still 10, not trigger render()
// Without symbol key exposed, no simple way to access the internal state
// Though you can use Object.getOwnPropertySymbols() to inspect it
```

```js
class Counter {
	#value = 0
\
	get value() { return this.#value }
	set value(v) { this.#value = Math.max(v, 10) }
\
	render() {
		return <div>{this.value}</div>
	}
}
```

```js
const counter = proxiedByVue(new Counter())
\
counter.value // Throw!!! 😱
```

Brand checking

Not only affect Vue,
But also MobX, Aurelia...,
Even affect builtins...
```js
new Proxy(new Set, {}).add(1) // throw!
```

Proxy transparency?

Assume auto unwrap, but...

```js
const counter = proxiedByVue(new Counter())
\
counter.value // can't collect dependencies
++counter.value // never trigger render()
```

Proxy can't trap private

Getters/Setters still work?

NO.

No brand checking failure,
but also can't trap private

Can we treat Getters/Setters special?,
Yes, but can't really solve the problem

```js
const chineseNumber = [...'〇一二三四五六七八九十']
\
class Counter {
	#value = 0
\
	inc() { ++this.#value }
	displayValue() { return chineseNumber[this.#value] }
\
	render() {
		return <div onClick={() => this.inc()}>{this.displayValue()}</div>
	}
}
// No way to know inc() will change #value
// No way to know displayValue() depend on #value
```

🤔 Any solution?

🤔 `Proxy unwrap trap`,
[Still an idea, no formal proposal](https://github.com/littledan/proposal-proxy-transparent/issues/4),
May need several years...,
Still no reactivity

🤔 Decorators

```js
class Counter {
	@exposeToVue #value = 0
}
```

Decorators still stage 2

Need to decorate ALL private
you want to track MANUALLY

Intercept ALL private accesses of
ALL instances even not used for Vue,
Performance?

🤔 `WeakMap`-based => `Symbol`-based

Refused by some members in TC39
because of membrane requirements
(99.9% JS programmers never heard of membrane),
Many (includ me) still try
to convince TC39 to revisit

🤔 Vue Hooks?

Observable vs. Privacy

No classes -> No private fields -> No problems

🤔 Do NOT use private field
if you want to use Vue 😥

More footguns of
class fields
[“Class-fields-proposal” or “what<br> went wrong in tc39 committee”](https://medium.com/@igorchulinda/class-fields-proposal-or-what-went-wrong-in-tc39-committee-6ce41efe291)

Will "class fields" be the
new "BAD PART" of JS?
-----------------------------
[2018-12-09 NodeParty Hangzhou](https://zhuanlan.zhihu.com/p/50542169)



JS class fields & Vue
[johnax.net/2018/field-vue](https://johnhax.net/2018/field-vue/slide)
------------------------------
by hax @ VueConf 2018 Hangzhou

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy
