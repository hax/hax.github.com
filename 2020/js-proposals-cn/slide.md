中国参与JS语言标准的最新进展

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

Chrome 85

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

TC39

1996年11月

Mr. Cargill (Netscape), Ms. Converse (Netscape), Mr. Eich (Netscape),
Mr. Fisher (NIST), Mr. Gardner (Borland), Mr. Krull (Borland),
Mr. Ksar (HP), Mr. Lenkov (HP), Mr. Lie (W3C), Mr. Luu (Mainsoft),
Mr. Mathis (Pithecanthropus, JTC1/SC22), Mr. Matzke (Apple),
Mr. Murarka (Spyglass), Ms. Nguyen (Netscape), Mr. Noorda (Nombas),
Mr. Palay (Silicon Graphics), Mr. Reardon (Microsoft), Mr. Robinson (Sun),
Mr. Singer (IBM), Mr. Smilonich (Unysis), Mr. Smith (Digital),
Mr. Stryker (Netscape), Ms. Thompson (Unisys), Mr. Urquhart (Sun),
Mr. Veale (Borland), Mr. Welland (Microsoft), Mr. White (AAC Group, Microsoft),
Mr. Willingmyre (GTW Associates, Microsoft), Mr. Wiltamuth (Microsoft).

[《JavaScript: The First 20 Years》](https://github.com/doodlewind/jshistory-cn)
- Allen Wirfs-Brock
- Brendan Eich

中国公司和中国社区

[W3C](https://www.chinaw3c.org/)

- 2003 W3C香港办事处（香港科技大学）
<!-- 中国国际万维网发展论坛 -->
- 2006 W3C北京办事处（北京航空航天大学）
- 2011 百度成为W3C会员，随后腾讯、360等也加入
- 2013 W3C/北航总部

ECMA

China IWNCOMM
西电捷通
2014-6~2018-6?
近场通讯相关标准

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

插曲：中美关系

美国对中国技术封锁
通过科技脱钩孤立中国

华为、360

中国科技公司和技术社区
积极参与国际技术标准,
是构建人类命运共同体的实践

由中国代表担任champion的提案一览

- `function.sent` meta property (Stage 2)
- Range (Stage 1)
- `Array.prototype.unique()` (Stage 1)
- await operations (Stage 1)
- Legacy reflection features for functions (Stage 1)
- Pattern match (Stage 1)
- Async context (Stage 0)
- function explicit `this` parameter (Stage 0)
- function `thisArgumentExpected` property （Stage 0)
- Extension methods and accessors (Stage 0)

Range提案

```js
for (let i = 1; i < 100; ++i) {
	...
}
```

```js
processNumbers(f, 1, 100)
\
function processNumbers(f, start, end) {
	for (let i = start; i < end; ++i) {
		f(i)
	}
}
```

```js
processNumbers(f, {start: 1, end: 100})
\
function processNumbers(f, {start, end}) {
	for (let i = start; i < end; ++i) {
		f(i)
	}
}
```

```js
const nums = range(1, 100)
\
processNumbers(f, nums)
function processNumbers(f, range) {
	for (const i of range) {
		f(i)
	}
}
```

```js
Number.range(1, 10) // 1, 2 ... 9
BigInt.range(1n, 10n) // 1n, 2n ... 9n
```

```js
function range(start, end) {
	return Array.from(
		{length: end - start},
		(_, i) => start + i,
	)
}
```

```js
function *range(start, end) {
	for (let i = start; i < end; ++i) yield i
}
```

看起来挺简单的？

问题

```js
const n = 0x100000000
range(0x200000 * n, 0x200001 * n)
```

Safe integer

```js
function *range(start, end) {
	const n = end - start
	for (let i = 0; i < n; ++i) yield start + i
}
```

细节

```js
Number.range(1, 10, {inclusive: true})
Number.range(10, 100, {step: 10})
Number.range(0, Infinity)
BigInt.range(0n, Infinity)
```

```js
Number.range(10, 0)
// range(10, 0, {step: 1})
// range(10, 0, {step: -1})
// throw ?
```

```js
Number.range(10)
// range(0, 10)
// range(10, Infinity)
// throw ?
```

争议问题

Iterable
Iterator

```js
const r = range(1, 5)
for (const x of r) console.log(x)
for (const x of r) console.log(x)
```

```js
const r = range(1, 5)
const [a, b] = r
const [c, d] = r
```

Iterator是一次性消耗的
Iterable通常是可重用的

支持Iterator
- 看上去就应该是generator
- 可利用iterator helpers
- 想重用用arrow function包一下

支持Iterable
- 应该从使用者角度考虑
- 很多开发者没意识到差别
- 通过`r.values().map()`利用helpers
- 潜在的错误（重构接口变化）
- 几乎所有其他语言都是iterable

你的想法？

function.sent元属性

```js
function *g() {
	yield 1
	yield 2
}
const iter = g()
g.next() // {value: 1}
g.next() // {value: 2}
g.next() // {done: true}
```

```js
function *g() {
	const a = yield
	const b = yield
	return a + b
}
const iter = g()
g.next()
g.next(1)
g.next(2) // {value: 3, done: true}
```

```js
function *g() {
	const a = function.sent
	yield
	const b = function.sent
	return a + b
}
const iter = g()
g.next(1)
g.next(2) // {value: 3, done: true}
```

```js
function *g() {
	let v = 0
	for (;;) {
		v += function.sent
		yield v
	}
}
const iter = g()
g.next(1) // {value: 1}
g.next(2) // {value: 3}
g.next(10) // {value: 13}
```

问题

- 真实use case？
- 命名？
- `yield*`语义？

双端迭代器提案（stage 0）

```js
const [first, second, ...rest] = iterable
// 可不可以从后面拿？
const [...rest, last] = iterable
const [first, ...rest, last] = iterable
```

```js
const [first, ...rest] = iterable
const last = rest.pop()
```

问题

```js
const [..., last] = iterable
```

```js
const [..., last] = range(1, 100000)
```

```js
const [..., last] = repeat(value)
```

双端迭代器
不仅可以从前端拿
也可以从后端拿

```js
const iter = [1, 2, 3, 4, 5].values()
iter.next() // {value: 1}
iter.next() // {value: 2}
iter.next_from_back_end() // {value: 5}
iter.next() // {value: 3}
iter.next_from_back_end() // {value: 4}
iter.next_from_back_end() // {done: true}
```

问题

怎样用generator实现双端迭代？

```js
function *values() {
	const arr = this
	let i = 0
	while (i < arr.length) yield arr[i++]
}
```

可能的方式

```js
function *values() {
	const arr = this
	let i = 0, j = arr.length
	while (i < j) {
		if (__from__ === 'back-end') yield arr[--j]
		else yield arr[i++]
	}
}
```

```js
function *values() {
	const arr = this
	let i = 0, j = arr.length
	while (i < j) {
		if (function.sent === 'back') yield arr[--j]
		else yield arr[i++]
	}
}
```

```js
const iter = [1, 2, 3, 4, 5].values()
iter.next() // {value: 1}
iter.next() // {value: 2}
iter.next('back') // {value: 5}
iter.next() // {value: 3}
iter.next('back') // {value: 4}
iter.next('back') // {done: true}
```

Web compatibility？

JSCIG
中文讨论组

[JSCIG/es-discuss/issues](https://github.com/JSCIG/es-discuss/issues)

Thank you!
一起参与！
