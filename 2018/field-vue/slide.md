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
\
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
}
\
const counter = proxiedByVue(new Counter())
counter.value // 0, first run
++counter.value // 1, trigger render()
counter.value = 10 // 10, trigger render() again
counter.value = 255 // still 10, not trigger render()
```

```js
const myValue = Symbol()
class Counter {
	;[myValue] = 0
\
	get value() { return this[myValue] }
	set value(v) { this[myValue] = Math.max(v, 10) }
}
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
\
const counter = proxiedByVue(new Counter())
counter.value // throw!!! 😱
\
```

Branding check

Not only affect Vue,
But also MobX, Aurelia...

Proxy transparency?

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
\
const counter = proxiedByVue(new Counter())
\
counter.value // can't collect dependencies
counter.value = 255 // never trigger render()
```

Proxy can't trap private

Getters/Setters still work?

NO.

```js
const chineseNumber = [...'〇一二三四五六七八九十']
\
class Counter {
	#value = 0
\
	displayValue() { return chineseNumber[this.#value] }
\
	render() {
		return <div>{this.displayValue()}</div>
	}
}
```

🤔 Any solution?

🤔 `Proxy unwrap trap`,
May need several years or fail...,
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

Caputre ALL instances
even not used for Vue,
Performance?

🤔 `WeakMap`-based => `Symbol`-based

Refused by some members in TC39,
We (includ me) still try
to convince TC39 to revisit

🤔 Vue Hooks?

Observable vs. Privacy

🤔 Do NOT use private field
if you want to use Vue 😥

More footguns of
class fields
[“Class-fields-proposal” or “what<br> went wrong in tc39 committee”](https://medium.com/@igorchulinda/class-fields-proposal-or-what-went-wrong-in-tc39-committee-6ce41efe291)

Will "class fields" be the
new "BAD PART" of JS?
-----------------------------
[2018-12-09 NodeParty Hangzhou](https://zhuanlan.zhihu.com/p/50542169)



FAQ
JS class fields & Vue
[johnax.net/2018/js-class-field-vue/slide](https://johnhax.net/2018/js-class-field-vue/slide)
------------------------------
by hax @ VueConf 2018 Hangzhou

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy
