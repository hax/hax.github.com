# STC vs PTC
----------------------------------------
[johnhax.net/2017/stc-vs-ptc/](http://johnhax.net/2017/stc-vs-ptc/)
（观赏本 slide 请使用 Chrome 50+ 等支持 ES6、Fetch API 等新特性的浏览器）

个人简介

hax

贺师俊

百姓网
www.baixing.com

Craigslist

1. 58同城,
1. 赶集,
1. 百姓网

1. 58集团,
1. 百姓网

百姓网
架构组

Web
前端

Web
标准

W3C HTML5
Chinese IG

HTML,
Acknowledgments

做了
一点微小的
工作

JavaScript

- node.js
- babel
- atom
- eslint
- ...

..<

[关于exclusive range运算的符号](https://github.com/hax/hax.github.com/issues/25)

Groovy,
Swift

JS

人呐…
自己就不可以预料


github: @hax
zhihu: 贺师俊
weibo: @johnhax

正题,
之前

高橋流
簡報法
Takahashi Method

Ruby

高桥征义

高橋流

![人生的忠告](rsdzg1.jpg)

![人生的忠告](rsdzg2.jpg)

“人生的忠告”

STC vs PTC

Functional
Programming

JavaScript

[Ramda](http://ramdajs.com/)

![Ramda logo](ramdaFilled_200x235.png)

Production
大规模使用？

FP in JS

===

Garbage

[JS+FP===垃圾](https://github.com/hax/hax.github.com/issues/14)

Strong Preference for Immutable Data,
一次性中间变量,
回收

Recursion & Tail Call Elimination,
没有尾递归优化,
爆栈

Trampolining

```js
function trampoline(f) {
  return function() {
    var result = f.apply(this, arguments);
    while (result instanceof Function) {
      result = result();
    }
    return result;
  };
}
var reduce = trampoline(function myself(f, list, sum) {
  if (list.length < 1) {
    return sum;
  } else {
    return function() {
      var val = list.shift();
      return myself(f, list, f(val, list));
    };
  }
});
```

Trampolining
每次迭代都产生一个临时函数,
垃圾

Function Composition & Partial Application,
临时的参数数组和partial的函数,
垃圾

Conclusion,
Never forget that,
JS *hates* you

ES6

PTC
Proper Tail Calls

```js
function sum(n, total = 0) {
	if (n === 0) return total
	else return sum(n - 1, total + n)
}
```

现场
演示

Flag

[kangax.github.io/compat-table](http://kangax.github.io/compat-table/es6/)

Only
Safari

V8 flag
--harmony_tailcalls

[V8 blog: ES6, ES7, and beyond](https://v8project.blogspot.jp/2016/04/es6-es7-and-beyond.html)

两点
问题

不知道
写对没

新事物

学习一个

反馈

不知道
写对没

调一调

看看
是不是

爆了

然而：,
没爆也不能证明你写对了
也许只是运气（不）好🤡

难调试

DevTools

Error.prototype.stack

[ES6 PTC in WebKit](https://webkit.org/blog/6240/ecmascript-6-proper-tail-calls-in-webkit/)

ShadowChicken

调试时
&nbsp;≠&nbsp;
运行时

Syntactic Tail Calls
STC

[Proposal](https://github.com/tc39/proposal-ptc-syntax)
co-championed by
Mozilla & Microsoft

```js
function factorial(n, acc = 1) {
  if (n === 1) {
    return acc;
  }
  return continue factorial(n - 1, acc * n)
}
```

没写对
就报错

你自己
选的路

逗我呢？

区别

决定权也是
很重要的！

收集错误

浏览器升级
支持PTC……

其他问题

性能

- JSC 📈
- V8 📊
- Chakra 📉

Cross-Realm

安全模型

膜
membrane

Developer
Intent

显式地编码
程序员的意图

这里需要
Tail Call！

不小心
“重构”

PTC 优点
STC 缺点

渐进增强？

```js
function foo(x) {
    function _foo() {
        if (x > 1) {
            acc = acc + (x / 2);
            x = x - 1;
            return _foo();
        }
    }
    var acc = 1;
    while (x > 1) {
        try {
            _foo();
        }
        catch (err) { }
    }
    return acc;
}
foo( 123456 );          // 3810376848.5
```

新语法意味着
需要维护
两套后端

[tc39/ecma262#535](https://github.com/tc39/ecma262/issues/535)

Apple：
我反对！

TC39 Notes
2016-5-24

Conclusion/Resolution: &nbsp; ,
**No consensus** on removing PTC
**No consensus** and **no rejection**
to advance STC to stage 1 &nbsp; &nbsp; &nbsp; &nbsp;

Apple 胜了？

流程上要求
一致同意

一年过去了……

僵局

😣 JavaScript
依然没有
普遍可用
的尾递归

通向FP之路
依然漫长

但至少……

编译
Target

Elm/PureScript
ClojureScript
F# |> Babel

@bobzhang
BuckleScript,
@be5invis
Idris => js

WebAssembly

虽然,
不会

但是

Exciting

谢谢！

QA/交流
github: @hax
zhihu: 贺师俊
weibo: @johnhax
