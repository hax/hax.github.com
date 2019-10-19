聊聊JS的几个新特性
--------------------
QConShanghai 2019 —— 编程语言

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy

1998

IE 4

一个写了20+年JS的男人

- 前ES3时代 *1995~1999*
- ES3时代 *2000~2010*
- Harmony时代 *2008~2016*
- 后ES6时代 *2016~2020*,
- TS/JS生态新时代 *2020~*

360
75team

360高级前端架构师
360技术委员会Web前端TC委员

2019年7月起
TC39代表

ECMA

- ECMA-334 – C# Language Specification
- ECMA-335 – Common Language Infrastructure (CLI)
- ECMA-367 – Eiffel programming Language
- ECMA-376 – Office Open XML (ISO/IEC 29500)
- ECMA-388 – Open XML Paper Specification
- ECMA-408 – Dart language specification
- ECMA-410 – NFC-SEC Entity Authentication and <br>Key Agreement using Asymmetric Cryptography
- ECMA-411 – NFC-SEC Entity Authentication and <br>Key Agreement using Symmetric Cryptography

China IWNCOMM
西电捷通
2014-6~2018-6?

- ECMA-262 – ECMAScript Language Specification
- ECMA-357 – ECMAScript for XML (E4X) (废弃)
- ECMA-402 – ECMAScript Internationalization API
- ECMA-404 – JSON

JavaScript
ECMAScript

JavaScript<sup>®</sup>
ECMAScript<sup>®</sup>

TC39

- Google
- Apple
- Mozilla
- Microsoft,
- Facebook

- IBM
- Intel
- Paypal
- Stripe

- 360
- Airbnb
- Bloomberg
- GoDaddy
- Salesforce

- Evernote
- Igalia
- Meteor
- npm
- OpenJS Foundation

建立渠道

聊聊JS的
几个新特性

[已完成的提案](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

每年6-8个提案

ES2020
目前5个

- String.prototype.matchAll
- import()
- BigInt
- Promise.allSettled
- globalThis

[Stage 3](https://github.com/tc39/proposals#stage-3)

- Nullish Coalescing
- Optional Chaining
- String.prototype.replaceAll ?

Nullish Coalescing Operators

??

`a ?? b`

`a !== undefined && a !== null ? a : b`

`a != null ? a : b`

```js
a ? a : b
a || b
```

truthy/falsy

- string: `"" || v`
- boolean: `false || v`
- nubmer: `0 || v`
- number: `NaN || v`
- Array: `[] || v`
- Object: `({ valueOf() { return 0 } }) || v`

nullish

```js
a != null ? a : b
```

```js
a.b.c() ?? v
a.b.c.d ?? v
```

```js
a.b.c() != null ? a.b.c() : v
a.b.c.d != null ? a.b.c.d : v
```

Side effects

- OAOO
- DRY

- eval Once And Only Once
- Don't Repeat Yourself

`a != null ? a : b`,
`a !== undefined && a !== null ? a : b`

`document.all`

TypeScript

`a ?? b`,
a 必须是 nullish

- `T | undefined`
- `T | null`
- `T | null | undefined`

```js
a ?? b || c
a || b ?? c
a ?? b && c
a && b ?? c
```

`SyntaxError`

必须加括号

未决问题
优先级

- 等于 ?: —— GNU C、Groovy（`?:`）
- **小于 ||** —— C#、PHP、Dart、Coffee
- 等于 || —— Perl（`//`）
- 高于 ==：Swift、Kotlin

`v ?? complex_expression`

`complex_expression ?? v`

```js
a == b ?? c
(a == b) ?? c
a == (b ?? c)
```

```js
a ** b ?? c
(a ** b) ?? c
a ** (b ?? c)
```

[Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

TypeScript

`a ?? b`
a 必须是 nullish

(a *[OP]* b) ?? c
一定都是错误代码

a *[OP]* b ?? c
一定都是错误代码

a *[OP]* (b ?? c)

a ?? b *[OP]* c
理解上存在歧义

a *[OP]* b ?? c *[OP]* d
怎样自动fix？
~~(a *[OP]* b) ?? (c *[OP]* d)~~
a *[OP]* (b ?? c *[OP]* d)
a *[OP]* (b ?? c) *[OP]* d

高于比较运算符：Swift、Kotlin

高于**（所有二元运算符）

a *[OP]* b ?? c

a *[OP]* b ?? c *[OP]* d

a ?? b *[OP]* c

比较保守的团队
可以定制lint规则

相对简单的lint规则
只禁止 a ?? b *[OP]* c
a ?? b 或者 a ?? (b *[OP]* c)

而现在可能需要lint规则
- a *[OP]* b ?? c
- a ?? b *[OP]* c
- a *[OP]* b ?? c *[OP]* d

~~优先级~~

[#15](https://github.com/tc39/proposal-nullish-coalescing/issues/15) [#26](https://github.com/tc39/proposal-nullish-coalescing/issues/26) [#48](https://github.com/tc39/proposal-nullish-coalescing/issues/48)

Optional Chaining

a?.b

a !== undefined && a !== null ? a.b : undefined

a != null ? a.b : undefined

Nullish-aware Operators

a != null ? a.b : undefined

a && a.b

truthy/falsy
nullish

a && a.b && a.b.c

Side effects

- OAOO
- DRY

document.all

TypeScript

`a?.b`
a 必须是 nullish

```js
a?.b.c
a?.b?.c
```

Short-circuiting

a?.[++x]

a == null ? undefined : a[++x]

a?.b.c(++x).d
a == null ? undefined : a.b.c(++x).d

Long short-circuiting

```js
a?.b.c
(a?.b).c
```

```js
a == null ? undefined : a.b.c
(a == null ? undefined : a.b).c
```

```js
a?.b.c.d
a?.b?.c?.d
```

TypeScript静态类型检查
可以严格地确定每个部分
应该用`a.b`还是`a?.b`

`a?.b.c?.d`

```js
a?.b
a!.b
```

Non-null assertion

a!

```js
const H = '🇭🇰'.codePointAt(0).toString(16)
const K = '🇭🇰'.codePointAt(2).toString(16)
console.log(H, K)
```

```js
const H = '🇭🇰'.codePointAt(0)!.toString(16)
const K = '🇭🇰'.codePointAt(2)!.toString(16)
console.log(H, K)
```

```js
const H = '🇭🇰'.codePointAt(0)?.toString(16)
const K = '🇭🇰'.codePointAt(2)?.toString(16)
console.log(H, K)
```

```js
const lang = localStorage.getItem('lang') ?? 'en-US'
const labels = i18n.load(lang)
const user = JSON.parse(localStorage.getItem('user'))
document.querySelector('bdi#user-name')!.textContent =
	user?.name ?? labels?.['non-login-user-name'] ?? 'anonymous'
```

```js
a?.b
a?.[key]
```

a **.** b -> a **[** key **]**
a **?.** b -> a **?[** key **]**

```js
a?[b]
a?[b]:c
```

a?[b]?[c]:d

其他语言？

C#：数组是 {...}

CoffeeScript：没有 ?: 三元

Swift：用空格区分！

`try a?.b?[c]`

```js
a?.b
a?.[prop]
a?.(...args)
```

a != null ? a(...args) : undefined

~~a?(...)~~
a?.(...)

C#：a?.invoke(...)

- a.b?.(...)
- a.b?.invoke(...)

Stage 2

```js
a??.b
a??[key]
a??(...args)
```

```js
a??.b
a??[key]
a??(...args)
a ??? b
```

```js
a??.b a??[key] a??(...args) a ??? b
a?&b a?&[key] a?&(...args) a ?? b
a?>b a?>[key] a?>(...args) a ?? b
a?.b a?\[key] a?\(...args) a ?? b
a\.b a\[key] a\(...args) a \\ b
a?.b a?.[key] a?.(...args) a ?? b
```

主要use case
[a?.b 80%+](https://github.com/tc39/proposal-optional-chaining/issues/17)
a ?? b

`delete a?.b`

`a == null ? true : delete a.b`

不支持的

- new?.target
- import?.('foo')
- new a?.()
- new a?.b()
- super?.()
- super?.foo
- a?.`string`
- a?.b`string`
- a?.b = c

`a?.b = c`

```js
// syntax error
document.querySelector('#test')?.innerHTML += '...'
```

```js
// ok
document.querySelector('#test')?.insertAdjacentHTML('beforeend', '...')
```

[#18](https://github.com/tc39/proposal-optional-chaining/issues/18)


QA


`String.prototype.replaceAll`

```js
'abaa'.replace('a', 'A')  // Abaa
'abaa'.replace(/a/, 'A')  // Abaa
'abaa'.replace(/a/g, 'A') // AbAA
\
'abaa'.replaceAll('a', 'A')  // AbAA
'abaa'.replaceAll(/a/, 'A')  // Ab??
'abaa'.replaceAll(/a/g, 'A') // AbAA
```

- `'AbAA'` (auto `g`)
- `'Abaa'` (consistency?)
- throw `TypeError`
- do not allow RegExp at all (change API name to `substitue`)

`String.prototype.matchAll`

```js
'abaa'.match('a')  // ['a', index: 0, input: 'abaa']
'abaa'.match(/a/)  // ['a', index: 0, input: 'abaa']
'abaa'.match(/a/g) // ['a', 'a', 'a']

'abaa'.matchAll('a')  // (['a', index: 0, input: 'abaa'])
'abaa'.matchAll(/a/)  // ?
'abaa'.matchAll(/a/g) // (['a', index: 0], ['a', index: 2], ['a', index: 3])
```

Stage 4!

```js
'abaa'.replaceAll(/a/, 'A') // TypeError!
'abaa'.matchAll(/a/)        // TypeError!
```

globalThis

- window
- self
- global

[Why globalThis](https://github.com/tc39/proposal-global/blob/master/NAMING.md)

global
https://github.com/tc39/proposal-global

```js
if (typeof global === 'object') {
	// code for node.js
} else {
	// code for browser
}
```

- self
- globalObject
- globe
- Global

`globalThis`

安慰一下自己

只是一个
名字而已

QA

One more thing

class fields

Stage 3

Chrome已经实现

```js
class Test {
	name = 'hax'
	greeeting = `Hello ${name}`
}
console.log(new Test().greeting)
```

```js
class Test {
	#privateField
	#privateMethod() {}
	async	#privateAsyncMethod() {}
	get #privateGetter() {}
	*#privateGenerator() {}
	async *#privateAsyncGenterator() {}
}
```

```js
class Test {
	#privateField
	#privateMethod() {}
	async	#privateAsyncMethod() {}
	get #privateGetter() {}
	*#privateGenerator() {}
	async	*#privateStaticAsyncGenterator() {}
	static #privateStaticField
	static #privateStaticMethod() {}
	static async	#privateStaticAsyncMethod() {}
	static get #privateStaticGetter() {}
	static *#privateStaticGenerator() {}
	static async *#privateStaticAsyncGenterator() {}
}
```

[9月8日class fields提案闭门研讨会](https://github.com/hax/js-class-fields-chinese-discussion/tree/master/meetings/20190908)

[参会名单](https://github.com/hax/js-class-fields-chinese-discussion/blob/master/meetings/20190908/attendees.md)
