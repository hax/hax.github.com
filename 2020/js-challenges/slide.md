JavaScript 的困境与挑战
-----------------------------------
GMTC 2019 全球大前端技术大会·深圳站

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy

360高级前端架构师
360技术委员会Web前端TC委员

2019年7月起
TC39代表

1998

JavaScript

IE 4

- 前ES3时代 *1995~1999*
- ES3时代 *2000~2010*
- Harmony时代 *2008~2016*
- ES6/Babel时代 *2014~2020*,
- TS/JS生态新时代 *2019~*

2011：ES5 — Improve the Safety of JavaScript

- API扩展和标准化：JSON、Array.protoype.forEach/map/filter...
- 通用化，可实现平台对象：get/set accessor、Object.defineProperty、etc.
- 适应于PITL（programming-in-the-large）

2014：透过ES6看JS未来

- Module 使得 JS 生态系统能重新统一
- Module / Class 等让 JS 更适合大型编程
- Promise 等将最佳实践标准化
- Generator / Proxy 等提供了现代语言所需的重要设施
- Arrow function / Destructring 等不仅是语法糖，而且填了长期以来的一些坑

2015~2017：JS — 世界第一程式設計語言

Babel makes the language
**Modular**

22% stage 4
20% stage 3
25% stage 2
**33%** stage 0/1

Enable language features
incrementally

Hardest to upgrade,
-> Always use
**latest** feature!

Ecosystem

JavaScript have:

The most **ubiquitous** platform:
Browser

The most **active** platform:
Node.js

The **largest** companies:
Google Microsoft
Apple Facebook

The most experienced experts
in the language committee
---------- & ----------
The largest developers
Community

立了 Flag

隐忧浮现

JS fatigue

学不动了

边际效用
性价比

2020：JavaScript 的困境与挑战

前端开发编程语言的过去、现在和未来
-----------------------------------
GMTC 2019 全球大前端技术大会·北京站

TS/JS未来面临的挑战

TS背着JS包袱
JS背着历史包袱

社区复杂、差异性
怎么做tradeoff？
委员会语言弊病？

历史包袱

不能破坏
兼容性

只能通过增加特性
来解决以前的问题

Arrow Function

lexical `this`

不可避免地使得
`this`语义更加复杂

- 工程方案
- 事实标准
- 真·标准

长期共存

- CommonJS
- ES module
- Bundle

[CJS/ESM互操作性问题](https://www.zhihu.com/question/288322186)

`--experimental-modules`

包入口可不可以
分别指定CJS/ESM？

```html
<script></script>
<script type=module></script>
<script type=module async></script>
```

Polyfill+Transpiler

Polyfill

狭义Polyfill
广义Polyfill

- Global
- Prototype

- Array.prototype.flatten (MooTools)
- Array.prototype.flat (HighChart)

- Polyfill
- Experimental implementation

Babel

Stage-x Preset

22% stage 4
20% stage 3
25% stage 2
33% stage 0/1

无意中在Production中
使用了unstable features

~~JavaScript~~
BabelScript

`babel-plugin-macros`

长得像函数
其实并不是

TypeScript

Stage 3

2012

- arrow function
- class
- es module
- decorator
- private property / private field
- public property / public field

ESLint

Stage 4

- 早期stage也/更需要保护
- 标准缺乏lint社区的反馈

Maximally Minimal

先解决温饱
再考虑小康

每个人的需求不一样
谁能代表开发者？

`Map.prototype.upsert()`

如何衡量成本和收益？

有争议的提案

Top-level Await
Class fields

『改革进入深水区』

好做的都已做完了
剩下的都是难搞的

Pipeline Operator

`value |> f`
`f(value)`

`value |> f(...args)`

- `f(...args)(value)`
- `f(...args, value)`
- `f(value, ...args)`
- `f.call(value, ...args)`

F# Style

```js
value |> f(...args) // f(...args)(value)
value |> x => f(...args, x)
value |> x => f(x, ...args)
```

Smart Style

```js
value |> f(...args)(#)
value |> f(...args, #)
value |> f(#, ...args)
```

- 更符合FP主流？
- 更普适JS？

Binary AST

Roadmap？

主导者？
全局观？

总结

JavaScript 的困境与挑战

QA
