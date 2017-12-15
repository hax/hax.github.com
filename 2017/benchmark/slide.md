什么是 microbenchmark

测试一小段
代码的性能

为什么需要？

性能优化

不要猜
要测！

console.time

问题

结果不稳定

JIT
Just-in-time

Interpreter
Baseline compiler

Optimizing compiler

先跑一会儿,
然后再测

预热
preheat

后面也不见得稳定啊？

抢占式
多任务
操作系统

测不准

多跑几次，
求平均值？

只能远观
不可亵玩

自己计时

API

// ES5+
Date.now()

问题

精度只有 1ms

无法测量
1ms 以下的
时间间隔

测量误差

100Kg±0.5Kg
100Kg±0.5%
10Kg±5%
1Kg±50%

1513395600000
1513395600005

5ms ?

[1513395600000, 1513395600001)
[1513395600005, 1513395600006)

(4ms, 6ms)
5ms±20%

// ES3
new Date().getTime()

问题

精度只有 1ms

甚至更低

IE6 ~ IE8
Windows XP

15ms, 16ms

15.625ms
64Hz

更老的

IE4 ~ IE6
Windows 9x

50ms, 60ms

18.2Hz

IBM PC BIOS
INT 1Ah, AH=00h

Intel 8253 PIT
Programmable interval timer

1.1931818... MHz
÷65536=18.2065 Hz

14.31818... MHz
315/22 MHz

NTSC

黑白 => 彩色

彩色信号加载在原黑
白信号中的副载波中
315/88 MHz

5×7×9/(8×11)

扯远了……

兼容性,
标准化组件

言归正传

精度 => 误差

15.625ms
1.5s±1%

1ms
100ms±1%

10个取样

performance.now()

精度达到5μs

0.5ms±1%

取样数量
× 200

[hr-time](https://w3c.github.io/hr-time/)

兼容性

1ms
1μs
0.1ms

Node.js

process.hrtime()
[seconds, nanoseconds]

精度 1ns？

平台相关

30ns

可用精度不高于100ns

基本思路

重复跑待测代码块若干次
并且确保误差小于给定值

方法一

方法二

统计学方法

平均值
方差
标准差
置信区间

benchmark.js

示例

问题

慢

心理等待时间

没有使用
performance.now()

Boilerplate

参数调节

重新考虑
基本假设
