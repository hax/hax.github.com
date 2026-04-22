## AI × 开发者：从补全 到 Code Agent

```
开发工具和方式的飞速变化
从 AI 补全 到 Code Agent
```

如果看过去三年，开发工具和方式的变化非常快，是从 AI 补全一路走到 Code Agent。
开发者和 AI 的协作方式，其实已经经历了四个很不一样的阶段。
而且可能是跨越式的，像我这种比较保守的程序员，即使在搞 AI agent 时，才刚用上 AI 补全，说实话都还没完全适应，转眼刷一下就快进到了 Code Agent。

```
1
传统补全增强
```

先说第一阶段，就是传统补全增强。

```
2021-06-29
GitHub Copilot
preview
```

GitHub Copilot preview 发布，这是这一阶段的起点。AI 开始以 autocomplete 的形式大规模进入 IDE。
BTW，记住这个日子。以后要定古法编程纪念日的话，就选 6 月 28 日。

```
先补全
再补片段
```

第一阶段的核心特征是，AI 主要做补全和片段生成，开发者的局部体验提升了，其实有时候也未必，但开发者的整体开发方式并没有变。

```
这一阶段
AI 像副驾
```

你敲一点，它续一点；你写个注释，它补一段。

```
2
超级补全
+ 多文件编辑
```

第二阶段，是超级补全加多文件编辑。
代表性产品，是 Cursor，硬是在 IDE 这个红海杀出了一条路。

```
2024-07
Cursor
Composer
```

2024 年 7 月，Cursor 推出 Composer 和 multi-file edits：AI 不再只补一段，而是开始跨多个文件一起改。

```
输出单位
从 snippet
变 patch set
```

这一阶段，输出单位已经从 snippet 变成 patch set。

```
开始无脑 tab
更多是在
review diff
```

使用“超级补全”后，开发者开始无脑 tab，工作慢慢开始更多地 review diff，而不是复制粘贴代码块。

```
瓶颈也变了
```

这时瓶颈也变了。不再只是模型聪不聪明，而是上下文是不是够、改动范围是不是可控、diff 能不能 review、结果能不能回退。

```
3
指挥式编程
```

第三阶段，我把它叫做指挥式编程。

```
动手
变动嘴
```

这阶段，大家从动手逐渐变成了动嘴。或者说虽然你可能还是用键盘输入，但输入的东西发生了变化。

```
先火起来的
是 vibe coding
```

```
2025-02-02
Karpathy
vibe coding
```

2025 年 2 月 2 日，Karpathy 把 vibe coding 这个词讲火了。

```
vibe coding
先跑起来
再说
```

不过马上大部分程序员就会问：这不是造屎山吗？能维护吗？

```
spec-driven
先写 spec
再写代码
```

于是 spec-driven 也来了，也就是先指挥 AI 写 spec，再让 AI 根据 spec 写代码。

```
2025-09
Spec Kit
```

2025 年 9 月，Spec Kit 把 spec、technical plan、task breakdown 这套流程直接产品化。

spec-driven 不是某个人在某一天突然发明的，更像是 2025 年中后期，强调软件工程严谨性的人群对 vibe coding 的反弹。

```
vibe 还是 spec
```

不过呢，vibe 还是 spec，这个争论其实还没分出胜负就过气了。

```
4
Code Agent
+ harness engineering
```

因为到了 2025 年年底时，很清楚的，第四阶段已经来了，就是 Code Agent，再明确点就是最近的 harness engineering。

```
2024-03
Devin
```

这个讨论可以追溯到 2024 年 3 月的 Devin。它先证明了“直接操作电脑的 agent”这条路能成立。

```
真正让阶段成型的
是模型厂商
自己下场
```

但真正让这个阶段成型的，是模型厂商自己下场。

```
2025-02
Claude Code
```

2025 年 2 月，Claude Code 进入研究预览后，一个很大的变化是：模型厂商不再只卖 API，而是亲自把 agent 做进终端工作流。

```
读代码
改文件
跑命令
```

读代码、改文件、跑命令，这三个动作连起来，意义就完全不一样了。

```
2025-05
GitHub
Coding Agent
```

2025 年 5 月，GitHub Copilot Coding Agent 又把这件事进一步带进 GitHub 自己的 SDLC：assign issue，异步工作，推 draft PR，附 session logs，人类批准后再继续。

```
issue
直接变 PR
```

也就是说，issue 可以直接变 PR。

```
AI 不只是副驾
开始像团队成员
```

到这里，AI 已经不只是副驾，也不只是结对程序员，而是开始像团队成员一样进入真实交付链条。

```
Codex
重新下场
```

之后 OpenAI Codex 也不再只是历史名词，而是重新以 CLI 和 agent 形态进入开发现场。

```
模型厂商
自己做 agent
```

总之模型厂商全面取代创业公司自己做 agent，模型提供方亲自定义产品、交互和责任边界。

```
开发模式
永久改变
```

目前我们还处于这个阶段中，下一个阶段会是怎样呢？目前还不清楚。
但有一点是明确的，开发者的开发模式已经永久地被改变了。
