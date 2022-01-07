中国如何参与JS语言标准？

GitHub @hax
知乎 贺师俊
B站 贺师俊
Matrix @haxjs

关于我

1998年,
开始写代码
<!-- 早于有「Web前端」 -->

Web前端和JS语言
20多年发展历程
见证人和参与者

- 盛大创新院
- 百姓网
- 360奇舞团

2019年6月~2021年4月
360集团 TC39代表
2021年4月起 特邀专家

中国如何参与JS语言标准？

JS

JavaScript
编程语言

目前全世界最流行的编程语言
1600万+ 开发者
（Slashdata 2021年Q3统计）

Brendan Eich
1995年的10天
Netscape 2

<!-- 与其他编程语言不同 -->
Web标准
竞争压力
<!-- 浏览器大战 微软 -->

<!-- 尽管并不稳定 -->
互联网脚本语言
事实标准

1996 标准化

Ecma国际
<!-- ECMA => Ecma国际 -->

ECMAScript
<!-- JavaScript商标 -->

TC39

1996年11月
ECMA-262

- 1997年6月 ES1
- 1998年6月 ES2
- 1999年12月 ES3
- 2009年12月 ES5
- 2015年6月 ES6

- 2015年6月 ES2015（ES6）
- 2016年6月 ES2016（ES7）
- ……
- 2021年6月 ES2021（ES12）
- 2022年6月 ES2022（ES13）

中国公司和社区？

我个人

2006 开始参与（邮件列表）
2016 日常参与（GitHub）
2017年中 发现问题
2018年底 游说中国科技公司

阿里、腾讯、美团
慧科、字节、360

思考：为什么企业要参与JS标准？

「开放」标准？
以公司、组织为单位

个人身份参与的问题

专业度、代表性
零散、分歧、被动

只能 提供反馈
无法 主导设计

组织技术战略
个人专业能力
<!-- 结合 -->

月影（时任360奇舞团团长）推动
穆鸿（时任360集团副总裁）拍板

2019年6月 360集团
成为Ecma国际会员
并加入TC39工作组

2019年12月
- 阿里巴巴
- 华为
- SujiTech

2020年6月 腾讯
2021年6月 字节

新提案的流程
以及工作方式

- Stage 1：问题域、用例，大致的解决方案
- Stage 2：语义语法、API齐备，正式的规范文本
- Stage 3：完整精确的语义语法、API，等待实现
- Stage 4：Test262测试集、至少两个实现

- GitHub Repo（通过公开仓库工作和讨论）
- 每2个月一次TC39全体大会（闭门会议）
- 采用共识机制（一票否决）
- 其他辅助性会议（孵化会议、champion group会议等）

由中国代表担任champion的提案一览

- Error cause (Stage 4)
- `Array.prototype.findLast`/`findLastIndex` (Stage 3)
- `function.sent` meta property (Stage 2)
- Double-ended iterators (Stage 1)
- Class branding checks (Stage 1)
- Extensions and `::` operator (Stage 1)
- Limited ArrayBuffer (Stage 1)
- Number Range (Stage 1)

- Pattern match (Stage 1)
- `Array.prototype.unique()` (Stage 1)
- await operations (Stage 1)
- Legacy reflection features for functions (Stage 1)
- Async context (Stage 0)
- String trim characters (Stage 0)
- Index from end syntax (Stage 0)
- function explicit `this` parameter (Stage 0)

案例1：`findLast`/`findLastIndex` (Stage 3)
微软中国 王文璐（@Kingwl）

识别问题

```js
const array = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
array.find(n => n.value % 2 === 1); // { value: 1 }
array.findIndex(n => n.value % 2 === 1); // 0
// find
[...array].reverse().find(n => n.value % 2 === 1); // { value: 3 }
// findIndex
array.length - 1 - [...array].reverse().findIndex(n => n.value % 2 === 1); // 2
array.length - 1 - [...array].reverse().findIndex(n => n.value === 42); // should be -1, but 4
```

解决方案

```js
// find
array.findLast(n => n.value % 2 === 1); // { value: 3 }
// findIndex
array.findLastIndex(n => n.value % 2 === 1); // 2
array.findLastIndex(n => n.value === 42); // -1
```

- 2021年1月进入Stage 1
- 2021年3月进入Stage 2
- 2021年7月达到Stage 3
- 2022年?月达到Stage 4

Issues

- 动机和场景 #14
- 命名 #1 #9 #13
- 其他提案（`forEachRight`、`findNth(n, pred)`） #11 #46
- TypedArray #5 #32
- `Array.prototype[@@unscopables]` #30

动机和场景（灵魂之问）
为什么用库不行？

Bar（门槛）
到底有多高？

- `padStart`/`padEnd`/`trimStart`/`trimEnd`
- Performance
- 库被引用的频繁程度
- API的完整性

- lodash.findlast 30k+/w
- lodash.findlastindex 10k+/w
- lodash.nth 1k+/w (`Array.p.at` stage 3)

计科两大难
命名与缓存

- findRight/findIndexRight
- findEnd/findIndexEnd
- findLast/findIndexLast
- findLast/findLastIndex

- `***Right`: `reduce`/`reduceRight`, `trimLeft`/`trimRight`
- `***End`: `padStart`/`padEnd`, `trimStart`/`trimEnd`
- `***Last`: `lastIndexOf`

案例经验

- API拾遗补缺是一个好的开始
- 严守（缩小）scope
- 适时的横向对比
- 重视细节（比如命名）

案例2：Error cause (ES2022)
阿里巴巴 吴成忠（@legendecas）

识别问题

```js
async function doJob() {
  const rawResource = await fetch('//domain/resource-a')
    .catch(err => {
      // How to wrap the error properly?
      // 1. throw new Error('Download raw resource failed: ' + err.message);
      // 2. const wrapErr = new Error('Download raw resource failed');
      //    wrapErr.cause = err;
      //    throw wrapErr;
      // 3. class CustomError extends Error {
      //      constructor(msg, cause) {
      //        super(msg);
      //        this.cause = cause;
      //      }
      //    }
      //    throw new CustomError('Download raw resource failed', err);
    })
  const jobResult = doComputationalHeavyJob(rawResource);
  await fetch('//domain/upload', { method: 'POST', body: jobResult });
}
await doJob(); // => TypeError: Failed to fetch
```

- 不直接暴露低层操作的错误
- 链式错误模式：每个层次的错误提供合适的上下文信息并包装更低层的错误
- 目前不是做不到，但是很麻烦
- 缺乏标准的做法，导致日志和调试工具无法提供帮助

解决方案

```js
async function doJob() {
  const rawResource = await fetch('//domain/resource-a')
    .catch(err => {
      throw new Error('Download raw resource failed', { cause: err });
    });
  const jobResult = doComputationalHeavyJob(rawResource);
  await fetch('//domain/upload', { method: 'POST', body: jobResult })
    .catch(err => {
      throw new Error('Upload job result failed', { cause: err });
    });
}
try {
  await doJob();
} catch (e) {
  console.log(e);
  console.log('Caused by', e.cause);
}
// Error: Upload job result failed
// Caused by TypeError: Failed to fetch
```

- 2020年9月进入Stage 1
- 2020年11月进入Stage 2
- 2021年3月达到Stage 3
- 2021年10月达到Stage 4

Issues

- 与现有方式的比较、共存问题 #4 #12 #31（Stage 1）
- API形态（option bag）、兼容性 #10 #11 #20 #33 #38（Stage 2）
- `Error.prototype.cause` #5 #24 #35（Stage 3）
- `toString()`和`.stack`行为 #14 #16 #22 #41（Stage 3）
- `cause`的类型 #21（Stage 3）
- `cause`与`errors`（`AggregateError`）的关系 #40（Stage 3）
- 规范细节问题 #28 #36 #37（Stage 3）

```js
new Error(message, cause)
new Error(message, {cause})
```

- 向前兼容性
- 向后兼容性（可扩展性）

```js
// Firefox
new Error(message, filename?, lineNumber?)
// DOM API
new DOMException(message, 'NotSupportedError')
```

```js
// 未来可能的其他特性
throw new Error('assertion failed', {kind: TestAssertion})
```

```js
// 缺点
try {
	...
} catch (e) {
	throw new Error(message, e) // 写错了
	// throw new Error(message, {cause: e})
	// 简单的类型检查并不能发现这个错误
	// 因为e如果是Error，则具有cause属性，
	// 和 {cause: any} 类型是相容的
}
```

特殊性

```js
'message' in Error.prototype // true
Object.hasOwn(new Error(), 'message') // false
Object.hasOwn(new Error(''), 'message') // true
'cause' in Error.prototype // false
Object.hasOwn(new Error('', {}), 'cause') // false
Object.hasOwn(new Error('', {cause: undefined}), 'cause') // true
```

```js
try {
	...
} catch (e) { // 理论上 e 可能是 undefined
	throw new Error('fail', {cause: e})
}
// 处理 cause
if ('cause' in e) { ... }
```

案例经验

- 从生产实践中发现问题
- 从其他编程语言借鉴方案
- 扩展API要注意兼容性
- 注意跨提案的关联
- 注意语义的明确
- 学习如何做权衡（委员会模式）

案例3：`function.thisArgumentExpected`
360 贺师俊（@hax）

识别问题

```js
class Test {
  constructor(name) {
    this.name = name
  }
  showName() {
    console.log(this.name)
  }
}
const hax = new Test('hax')
$(e).on('click', hax.showName) // <- 不报错，实际输出 window.name
```

```js
Promise.race([
	fetch('result'),
	fetch('negative-result').then(Promise.reject)
])
// 这代码是错误的，因为Promise.reject需要 this
// 必须是Promise或其子类
```

`Promise.reject`的例子特别坑：
- static方法，但需要`this`
- Promise/A+ 并不需要
- 这种错误只是偶尔发生，很难第一时间发现
- 发生了，也难以辨识错误的来源

解决方案

```js
ElementWrapper.prototype.on = function (eventType, listener, options) {
  const eventTarget = this.element
  if (listener.thisArgumentExpected) throw new TypeError(
    'listener should not expect this argument, please use arrow function or <function>.bind')
  eventTarget.addEventListener(eventType, listener, options)
}
\
$(window).on('click', hax.showName) // <- throw TypeError
\
$(window).on('click', () => hax.showName()) // <- ok
$(window).on('click', hax.showName.bind(hax)) // <- ok
\
$(window).on('click', test) // <- also ok
function test() { console.log('test') }
```

```js
class MyPromise extends Promise {
  then(onFulfilled, onRejected) {
    if (onFulfilled?.thisArgumentExpected) throw new TypeError()
    if (onRejected?.thisArgumentExpected) throw new TypeError()
    return super.then(onFulfilled, onRejected)
  }
}
```

被浏览器厂商代表否决😭

- Platform API 的实现成本
- 框架和库是否愿意使用该特性（鸡生蛋问题）
- 工具（如类型检查）至少可以（部分）解决问题

案例经验

- 上来就选了一个hard模式
- 虽然做了很多准备，但是没有充分评估浏览器厂商代表的立场（屁股）
- 前车之鉴（`Function.isCallable`/`Function.isConstructor`）
- 理解委员会模式的运作机制

案例4 双端迭代和解构（Stage 1）
360 贺师俊（@hax）

识别问题

```c
(first, *rest, last) = [1, 2, 3, 4] // Python/Ruby
[first, rest..., last] = [1, 2, 3, 4] // CoffeeScript
[first, rest @ .., last] = [1, 2, 3, 4] // Rust
```

解决方案

```js
let [first, ...rest, last] = [1, 2, 3, 4]
\
string.replace(pattern, (fullMatch, ...submatches, matchIndex, fullString) => {
  // `matchIndex` is always the second to last param (the full string is the last param).
  // There may be many submatch params, depending on the pattern.
})
```

```js
// let [a, b, ..., c, d] = iterable
let iter = iterable[Symbol.iterator]()
let a = iter.next().value
let b = iter.next().value
let d = iter.next('back').value
let c = iter.next('back').value
iter.return()
```

- 2020年9月进入Stage 1
- 2020年12月通过孵化会议讨论了大方向

案例经验

- 由小问题入手
- 考察历史
- 借鉴其他编程语言的方案
- 同时解决关联提案的问题
- 把问题先摆到台面上来
- 抓大放小，先解决方向问题

计划：继续推进提案
争取在2022年进入stage 2

更多案例,
今后会在知乎和B站
通过文章和视频发布

成果很多
挑战更多

真正参与者
仍然很少

- 我（hax），Invited Expert
- Jack Works，SujiTech
- 吴成忠（吞吞），阿里巴巴
- 王文璐，微软中国

- SujiTech：深度参与（个人）
- 阿里巴巴：深度参与（组织）
- 华为、腾讯：基本无参与
- 字节跳动：刚加入不久（组织）
- 360：2021年4月之后基本无参与
- 我：深度参与（个人）

时区 英语
意愿 能力

怕自己误解
怕讲不清楚
害羞、客气

JS 技术复杂度
历史包袱和兼容性要求
不同平台的需求冲突
不同标准组织的分工
一些特殊限制（如membrane）
委员会机制和流程
公司关系和人际关系

组织支持
时间、绩效
限制了更广泛
工程师的参与

限制了能力发挥

无法阻止和修正
提案的严重问题

- Class fields 多个严重设计失误
- Top-level await 存在较严重的工程风险
- Hashbang `#!` 鸡肋，潜在生态风险
- `#x in o` 鸡肋
- `Indexed.prototype.at()` 鸡肋
- JSON modules、Module assertions 鸡肋
- `??` 优先级 本可避免的问题
- Range提案 Iterator/Iterable 严重分歧

为什么会这样？

JS 技术复杂度
历史包袱和兼容性要求
不同平台的需求冲突
不同标准组织的分工
一些特殊限制（如membrane）
委员会机制和流程
公司关系和人际关系,
引擎厂商之间的矛盾
代表的个人偏好和倾向性

老一代领袖退出
浏览器厂商话语权过大
缺乏开发者代表
部分代表有严重个人偏好
优先满足委员会内部

人
制度

必须是会员
consensus in the room
一票否决
会议优先于书面

TC39的制度在
标准组织中是
比较特殊的

浏览器厂商之
间的互相制衡

- 缺乏国际化和包容性
- 缺乏对社区的尊重

中国是希望！

凝聚中国开发者

JSCIG
中文讨论组

[JSCIG/es-discuss/issues](https://github.com/JSCIG/es-discuss/issues)

中国的实现者
华为方舟
alinode

JS 分支的可能？

Thank you!
一起参与！

One more thing...
[中国计算机学会TF43 简报](https://johnhax.net/2021/js-cn/slide#72)
[中国计算机学会TF43 录像](https://dl.ccf.org.cn/video/videoDetail.html?_ack=1&id=5578915538241536)
