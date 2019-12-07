JS 的新特性（2019年12月）
--------------------------------
GDG DevFest 2019 Beijing

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy

360
75team

360高级前端架构师
360技术委员会Web前端TC委员

2019年7月起
TC39代表

[已完成的提案](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

每年6-8个提案

ES2020

- String.prototype.matchAll
- import()
- BigInt
- Promise.allSettled
- globalThis
- for-in order
- Optional Chaining
- Nullish Coalescing

Nullish Coalescing Operator

`??`

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

优先级

实质上和 `||` 相同

```js
a ?? b || c
a || b ?? c
a ?? b && c
a && b ?? c
```

`SyntaxError`

必须加括号

`a > b ?? c`

`a > (b ?? c)`

`(a > b) ?? c`

`a ?? b`
a 是 nullable 才有意义
否则 `?? b` 是 dead code

- `a ** b ?? c`
- `a % b ?? c`
- `a + b ?? c`
- `a >>> b ?? c`
- `a in b ?? c`
- `a === b ?? c`
- `a | b ?? c`

- `a ** (b ?? c)`
- `a % (b ?? c)`
- `a + (b ?? c)`
- `a >>> (b ?? c)`
- `a in (b ?? c)`
- `a === (b ?? c)`
- `a | (b ?? c)`

(a *[OP]* b) ?? c
一定都是错误代码

a *[OP]* b ?? c
一定都是错误代码

a *[OP]* (b ?? c)

ESLint

Optional Chaining

`a?.b`

`a !== undefined && a !== null ? a.b : undefined`

`a != null ? a.b : undefined`

Nullish-aware Operators

`a != null ? a.b : undefined`

`a && a.b`

truthy/falsy
nullish

`a && a.b && a.b.c`

Side effects

- OAOO
- DRY

document.all

Short-circuiting

`a?.[++x]`

`a == null ? undefined : a[++x]`

`a?.b.c(++x).d`

`a == null ? undefined : a.b.c(++x).d`

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

`a?[b]?[c]:d`

```js
a?.b
a?.[prop]
a?.(...args)
```

`a != null ? a(...args) : undefined`

~~a?(...)~~
a?.(...)

`delete a?.b`

`a == null ? true : delete a.b`

不支持的

- `new?.target`
- `import?.('foo')`
- `new a?.()`
- `new a?.b()`
- `super?.()`
- `super?.foo`
- ``a?.`string` ``
- ``a?.b`string` ``
- `a?.b = c`

QA

`String.prototype.matchAll`

```js
'abaa'.match('a')  // ['a', index: 0, input: 'abaa']
'abaa'.match(/a/)  // ['a', index: 0, input: 'abaa']
'abaa'.match(/a/g) // ['a', 'a', 'a']
\
'abaa'.matchAll('a')  // (['a', index: 0], ['a', index: 2], ['a', index: 3])
'abaa'.matchAll(/a/g) // (['a', index: 0], ['a', index: 2], ['a', index: 3])
'abaa'.matchAll(/a/)  // throw TypeError
```

`String.prototype.replaceAll`

Stage 3

```js
'abaa'.replace('a', 'A')  // Abaa
'abaa'.replace(/a/, 'A')  // Abaa
'abaa'.replace(/a/g, 'A') // AbAA
\
'abaa'.replaceAll('a', 'A')  // AbAA
'abaa'.replaceAll(/a/g, 'A') // AbAA
'abaa'.replaceAll(/a/, 'A')  // throw TypeError
```

QA

Stage 3

Hashbang

```js
#!/usr/bin/env node
console.log('hello')
```

Top-level await

```js
// config.js
export const data = await fetch('/api').then(res => res.json())
```

```html
<script type=module>
import data from './config.js'
window.addEventListener('load', e => {
	console.log(data.info)
})
</script>
```

Class fields

```js
class A {
	x = 1
}
new A().x // 1
```

```js
class B extends A {
	#x
	get x() { return this.#x }
	set x(v) {
		SecurityLogger.log('set x', v)
		this.#x = v
	}
}
new B().x // 1
```

```js
class C {
	#priv = 42
	test1() { return 'ok' }
	test2() { return this.#priv }
}
const p = new Proxy(new C(), {})
p.test1() // ok
p.test2() // throw TypeError
```
