JS @ 2019
------------------
FDCon 2019

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

- 2018/1 &nbsp; JS @ 2018
- 2018/4 &nbsp; ES9实战
- 2018/7 &nbsp; 后ES7时代的JS语言
- 2018/9 &nbsp; JS — Really The World's Best PL &nbsp; &nbsp; &nbsp; &nbsp;

- 2019/1 &nbsp; JS @ 2019
- 2019/4 &nbsp; ES10实战
- 2019/7 &nbsp; 后ES8时代的JS语言
- 2019/8 &nbsp; JS — Still The World's Best PL &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

- 2020/1 &nbsp; JS @ 2020
- 2020/4 &nbsp; ES11实战
- 2020/7 &nbsp; 后ES9时代的JS语言
- 2020/8 &nbsp; JS — The World's Best PL as You Wish

- [2017/9 &nbsp; 知乎Live：如何学习和实践 ES201X？](https://johnhax.net/2017/live-es201x)
- [2017/11&nbsp; STC vs PTC](https://johnhax.net/2017/stc-vs-ptc/)
- [2018/8 &nbsp; Time in JavaScript](https://johnhax.net/2018/temporal/)
- [2018/11&nbsp; JS class fields & Vue](https://johnhax.net/2018/field-vue/)
- [2019/1 &nbsp; Will “class fields” be the new “bad part” of JavaScript?](https://johnhax.net/2019/class-fields/)
- 2019/5 &nbsp; JS @ 2019

JS @ 2019

标准

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

- 语法改进
- 新增内置API
- 新语言特性
- 其他修订

语法改进

- Exponentiation operator (ES2016)
- Trailing commas in function (ES2017)
- Optional catch binding (ES2019)

Exponentiation operator

```js
Math.pow(x, y)
x ** y
```

```js
let a = 2
a **= 10
```

```js
x ** y
x ^ y
```

```js
-2**10 // ?
```

```js
-2**10 // SyntaxError
```

```js
-x**y // SyntaxError
~x**y // SyntaxError
!x**y // SyntaxError
```

```js
(-2) ** 10 // 1024
-(2 ** 10) // -1024
```

```js
100 ** 0.5 //  ?
```

```js
100 ** 0.5 // 10
```

```js
(-100) ** 0.5 //   ?
```

```js
(-100) ** 0.5 // NaN
```

```js
32 ** 0.2 //  ?
```

```js
32 ** 0.2 //  2
```

```js
(-32) ** 0.2 //   ?
```

```js
(-32) ** 0.2 // NaN
```

[为什么很多程序无法计算负数的立方根？](https://www.zhihu.com/question/23107259)

[IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)

```js
0.1 + 0.2 == 0.3 // false
```

Trailing commas in function

```js
function f(a, b) { ... }
f(1, 2)
\
function f(a, b,) { ... }
f(1, 2,)
```

```js
function f(
	a,
	b,
) { ... }
\
f(
	1,
	2,
)
```

- copy/paste
- diff
- git blame

Optional catch binding

```js
try {
	...
} catch (unused) {
	...
}
```

```js
try {
	...
} catch {
	...
}
```

```js
try {
	return JSON.parse(input)
} catch {
	return null
}
```

- 简化linter
- 显式编码意图
- 引擎优化可能

新增内置API

- Array.prototype.includes (ES2016)
- Array.prototype.flat/flatMap (ES2019)

```js
[NaN].indexOf(NaN); // -1
[NaN].includes(NaN); // true
```

```js
[[1, 2], [[3]], 4, [5, [[6], 7]]].flat(); // [1, 2, [3], 4, 5, [[6], 7]]
[[1, 2], [[3]], 4, [5, [[6], 7]]].flat(2); // [1, 2, 3, 4, 5, [6], 7]
[[1, 2], [[3]], 4, [5, [[6], 7]]].flat(3); // [1, 2, 3, 4, 5, 6, 7]
```

```js
[1, 2, 3].flatMap(x => [x, x]) // [1, 1, 2, 2, 3, 3]
```

- String.prototype.padStart/padEnd (ES2017)
- String.prototype.trimStart/trimEnd (ES2019)
- String.prototype.matchAll (ES2020)

```js
const num = 42
String(num).padStart(4, '0') // '0042'
String(num).padStart(4) // '  42'
\
' FDCon 2019 '.padStart(17, '.:').padEnd(40, '.:')
// '.:.:. FDCon 2019 .:.:.:.:.:.:.:.:.:.:.:.'
```

```js
const s = '\u3000\u3000Test string \r\n'
s.trim() // 'Test string'
s.trimStart() // 'Test string \r\n'
s.trimEnd() // '　　Test string'
```

start/end
left/right

- Symbol.prototype.description (ES2019)

```js
const s = Symbol('test')
s.toString() // 'Symbol(test)'
s.description // 'test'
```

- Promise.prototype.finally (ES2018)

```js
try {
	doSomething()
} catch (e) {
	handleError(e)
} finally {
	cleanup()
}
```

```js
promise
.then(doSomething)
.catch(handleError)
.finally(cleanup)
```

```js
function ajaxGetAsync(url) {
	return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.addEventListener("error", reject)
			xhr.addEventListener("load", resolve)
			xhr.open("GET", url)
			xhr.send(null)
	}).finally(() => {
			$("#ajax-loader-animation").hide()
	})
}
```

- Object.getOwnPropertyDescriptors (ES2017)
- Object.values/entries (ES2017)
- Object.fromEntries (ES2019)

```js
const o = {a: 1, b: 2, c: 3}
Object.keys(o) // ['a', 'b', 'c']
Object.values(o) // [1, 2, 3]
Object.entries(o) // [['a', 1], ['b', 2], ['c', 3]]
Object.fromEntries([['a', 1], ['b', 2], ['c', 3]])
```

- RegExp named capture groups (ES2018)
- RegExp Unicode Property Escapes (ES2018)
- RegExp Lookbehind Assertions (ES2018)
- RegExp s (dotAll) flag (ES2018)

```js
/(\d{4})-(\d{2})-(\d{2})/.exec('2019-05-11')
// ["2019-05-11", "2019", "05", "11"]
\
const m = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec('2019-05-11')
const {year, month, day} = m.groups
```

```js
const regex = /^\p{Number}+$/u;
regex.test('²³¹¼½¾𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼㉛㉜㉝ⅠⅡⅢⅣⅤⅥⅦⅧⅨ') /// true
\
/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu
```

```js
/(?<=\$)\d+(\.\d*)?/.exec('$13.6') // ["13.6", ...]
/(?<!\$)\d+(\.\d*)?/.exec('￥13.6') // ["13.6", ...]
```

```js
/foo.bar/s.test('foo\nbar') // true
```

新语言特性

- Shared memory and atomics (ES2017)
- Async functions (ES2017)
- Asynchronous Iteration (ES2018)
- Rest/Spread Properties (ES2018)

```js
const { value, done } = syncIterator.next()
\
asyncIterator.next().then(({ value, done }) => ...)
const { value, done } = await asyncIterator.next()
```

```js
for await (const line of readLines(filePath)) {
  console.log(line);
}
\
async function* readLines(path) {
	const file = await fileOpen(path);
	try {
		while (!file.EOF) {
			yield await file.readLine();
		}
	} finally {
		await file.close();
	}
}
```

```js
const readable = fs.createReadStream(...)
readable.on('data', chunk => ...)
\
// Node.js 10+
for await (const k of readable) {
	...
}
```

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```

```js
let n = { x, y, ...z };
n; // { x: 1, y: 2, a: 3, b: 4 }
```

其他修订

- JSON superset (ES2019)
- Well-formed JSON.stringify (ES2019)
- Lifting template literal restriction (ES2018)
- Function.prototype.toString revision (ES2019)

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
