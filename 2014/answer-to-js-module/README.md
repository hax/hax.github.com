# The Answer to JavaScript Module
  论ES6模块和加载器之设计

## Introduction of ES6 Module Syntax
   一、ES6的module语法简介

## Introduction of ES6 Loader API
   二、ES6的loader用法简介

## The Modular Mechanism of other Programming Languages
   三、其他编程语言中的模块机制

 * 待考察语言（已确定）：Java, C#, PHP, Python, Ruby
 * 待考察语言（未确定）：C, C++, OC, Haskell, Lua, F#, Go, Rust, Swift...

### 核心问题
 * reused unit / namespace / source file / package
 * versioning
 * dependency hell
 * static linking VS dynamic linking?
 * loader?

## The Various Modular Solutions in the Old JavaScript
   四、史上各种JS模块化方案

  * simple module pattern
  * jspkg, jsan, jslab, jsvm, jsi, pies, ...
  * jQuery
  * YUI, Dojo
  * CommonJS, Node.js
  * AMD, Require.js, Sea.js
  * UMD

### Web 的独特问题
 * 异步加载
 * 按需加载
 * 合并请求
 * 缓存
 * 版本更新
 * 加载其他资源（如CSS）

## ES6 module 和其他方案的对比

## ES6 module 的设计原理

### 满足主流需求（靠近CommonJS）
 * ES6开发进程中的挑战

### 静态化
 * 错误检查
 * 性能
 * 循环依赖
 * macro可能性
 * 类型系统
 * 跨语言

### 简化
 * 基于惯例
 * 没有 namespace 和 qualified name
 * 无单独的模块名，文件和模块边界一致
 * default import/export
 * 使用 Promise API

## ES6 module now

### ES6 module loader polyfill
### ES6 module transpiler
### SystemJS
### Nomalize.js
### Ember.js

## ES6 module对于JS社区发展未来的意义和展望
