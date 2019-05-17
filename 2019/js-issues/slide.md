JS 的几朵乌云

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy

1998

JavaScript

IE 4

一个写了20年JS的男人

- [2011/8 &nbsp; ES5 — Improve the Safety of JS](http://v.youku.com/v_show/id_XMjkwNjc2Nzgw.html)
- [2014/12&nbsp; 透过ES6看JS未来](https://johnhax.net/2014/es6-js-future/)
- [2015/4 &nbsp; ES6实战](http://www.infoq.com/cn/presentations/es6-actual-combat)
- [2015/7 &nbsp; JS — The World's Best Programming Language](https://johnhax.net/2015/js-the-best/)
- [2016/8 &nbsp; 代码时间podcast之 ES2015](https://codetimecn.com/episodes/es2015)
- [2016/12&nbsp; JS @ 2017](http://www.itdks.com/dakashuo/detail/364)
- [2017/4 &nbsp; 编程语言如何演化 —— 以JS的private为例](https://johnhax.net/2017/js-private/)
- [2017/4 &nbsp; STC vs PTC](http://v.youku.com/v_show/id_XMjc0NDQ3MDI1Ng==.html?f=49711130&o=0&spm=a2h1n.8251843.playList.5!3~5~A)
- [2017/7 &nbsp; 后ES6时代的JS语言](https://johnhax.net/2017/es6+/)
- [2017/8 &nbsp; JavaScript — 世界第一程式設計語言](https://johnhax.net/2017/modern-web)
- [2017/9 &nbsp; 知乎Live：如何学习和实践 ES201X？](https://johnhax.net/2017/live-es201x)
- [2017/11&nbsp; STC vs PTC](https://johnhax.net/2017/stc-vs-ptc/)
- [2018/8 &nbsp; Time in JavaScript](https://johnhax.net/2018/temporal/)
- [2018/11&nbsp; JS class fields & Vue](https://johnhax.net/2018/field-vue/)
- [2019/1 &nbsp; Will “class fields” be the new “bad part” of JavaScript?](https://johnhax.net/2019/class-fields/)
- [2019/5 &nbsp; JS @ 2019](https://johnhax.net/2019/js@2019/)

ECMAScript 2019 (ES10)

后ES6时代

独立提案
分别演进
Stage 0 => 4

ES2016 +2
ES2017 +6
ES2018 +8
ES2019 +8,
ES2020 +1

[兼容性？](http://kangax.github.io/compat-table/es2016plus/)

ES2020+?

几朵乌云

- STC vs PTC (Stage ?)
- globalThis (Stage 3)
- class fields (Stage 3)

[STC vs PTC](https://johnhax.net/2017/stc-vs-ptc/)

PTC (ES6): Safari only
STC (proposal): Apple refuse


```js
function sum(n, total = 0) {
	if (n === 0) return total
	else return sum(n - 1, total + n)
}
```

```js
function sum(n, total = 0) {
	if (n === 0) return total
	else return continue sum(n - 1, total + n)
}
```

TC39 Notes
2016-5-24

Conclusion/Resolution: &nbsp; ,
**No consensus** on removing PTC
**No consensus** and **no rejection**
to advance STC to stage 1 &nbsp; &nbsp; &nbsp; &nbsp;

一年过去了……

三年过去了……

僵局

😣 JavaScript
依然没有
普遍可用
的尾递归

globalThis

[Please use a name without this](https://github.com/tc39/proposal-global/issues/31)

- Dr. Axel Rauschmayer -- The author of 2arity.com
- Kyle Simpson -- The author of You-Don't-Know-JS

[Naming](https://github.com/tc39/proposal-global/blob/master/NAMING.md)

- 流程
- 态度

[Class fields](https://johnhax.net/2019/class-fields/)

Footgun of public field

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
		SecurityAuditor.log('set password', this.name, v)
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

`[[Define]]` vs `[[Set]]`

误导！

Proxy transparency issue of private declarations

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

- 流程
- 态度

总结

[Will “class fields” be the new “bad part” of JavaScript?](https://johnhax.net/2019/class-fields/)
