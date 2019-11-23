JS新特性之
Top-level Await
— 从入门到被坑
====================
https://johnhax.net/2019/tla/slide

自我介绍

GitHub @hax
知乎 @贺师俊
微博 @johnhax
Twitter @haxy

360
75team

360高级前端架构师
360技术委员会
Web前端TC委员

2019年7月起
TC39代表

为什么我们
要加入TC39

代表中国互联网和科技公司
参与关键技术标准的研发

为中国JS社区
建立渠道

推动JavaScript语言的进化
真正解决开发者的问题,
而不是制造更多问题

『搭便车』
的时代已经过去

360,
阿里,
华为

TLA
Top-level Await

少废话，先看东西
No bb, show me the code

演示

- https://www.chromestatus.com/feature/5767881411264512
- https://hub.packtpub.com/googles-v8-javascript-engine-adds-support-for-top-level-await/

- Node.js: --harmony-top-level-await
- Chrome: --js-flags="--harmony-top-level-await"

入门完成！

看上去不错？

https://www.google.com/search?q=top-level+await

- https://v8.dev/features/top-level-await
- https://github.com/tc39/proposal-top-level-await
- https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221
- https://gist.github.com/MylesBorins/ae97abab4a4144411c12240bb09dc7dd

被坑时间到

演示

总结

- TLA隐式传递，所有依赖TLA的模块都变成异步模块
- TLA确实好用，但可见性很差，以至于很容易无意间引入TLA
- 任何深层依赖的TLA都可以阻塞整个应用
- 无意间引入的TLA可以改变代码的执行序
- 原本合理的重构（无论手动还是自动）可能由于TLA而违反预期

解决方案？

- 教育
- 工具

- 我能教育多少人？
- 教了你你就能避免踩坑吗？
- 教了你你就能避免别人挖坑吗？
- 心智负担：怎么判断这里用TLA是否合理

- 不用TLA检查工具的程序员不是好运维
- 适用所有场景吗？
- 心智负担和背锅负担：怎么判断是否允许TLA
- 心智负担和背锅负担：怎么判断TLA是否会引发问题

从入门到被坑

还没完

Service worker 的故事

- 禁用TLA，除非用动态import导入
- Reasonable（性能！）
- 开创了『那里能用，这里不能用』的先河

可能的解决方案
将Service worker的方案推而广之

- 普通modulescript不允许TLA（但可用动态import）
- async的modulescript允许TLA

```html
<script type=module async></script>
```

- 教育
- 工具

- 教育：await只能用于async上下文<br>async functions<br>async generators<br>async modulescript<br>async script（也许未来？）
- 工具：不需要额外工具，直接浏览器里一跑便知

问题

- champions 不同意（理由不明）
- 不是 TC39 的范畴，而是 W3C 的领地

QA
