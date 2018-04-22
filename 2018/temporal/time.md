关于时间


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


时间
Time

平常

复杂

[乔治·华盛顿](https://zh.wikipedia.org/wiki/%E4%B9%94%E6%B2%BB%C2%B7%E5%8D%8E%E7%9B%9B%E9%A1%BF)

1732年2月22日

1732年2月11日

儒略历

格里历

1582年

1752年

历法

天文

政治、宗教、文化

现代编程语言
内置的时间API

[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)

格里历

外推格里历
[Proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar)

~~政治、宗教、文化~~

天文

+1S

闰秒
[Leap Second](https://en.wikipedia.org/wiki/Leap_second)

- 1000+的Instagram新照片,
- 4000+的新推文,
- 10000+的Skype电话呼叫,
- 20000+的Dropbox新文件上传,
- 40000+的Google搜索次数,
- 60000+的YouTube视频点击量,
- 80000+的Facebook点赞,
- 256000+ 双11交易峰值,
- 42000000+ 数据库处理峰值

[Bugs](https://en.wikipedia.org/wiki/Leap_second#Examples_of_problems_associated_with_the_leap_second)

~~政治、宗教、文化~~

~~天文~~

API 设计

Date

```js
new Date()
Date.now()
Date.UTC(Y, M=0, D=1, h=0, m=0, s=0, ms=0)
Date.parse(s)
date.toString()
date.toDateString()
date.toTimeString()
date.toGMTString()
date.toUTCString()
date.toISOString()
date.toLocaleString()
date.toLocaleDateString()
date.toLocaleTimeString()
date.toJSON()
date.valueOf()
date.getYear(), date.setYear(Y)
date.getFullYear(), date.setFullYear(Y)
date.getMonth(), date.setMonth(M)
date.getDate(), date.setDate(D)
date.getTime(), date.setTime(t)
date.getHours(), date.setHours(h)
date.getMinutes(), date.setMinutes(m)
date.getSeconds(), date.setSeconds(s)
date.getMilliseconds(), date.setMilliseconds(ms)
date.getTimezoneOffset()
```

问题

- 好多toXXXString()
- 不支持自定义格式
- 只有 UTC 和 local，不支持时区
- 缺乏方便的时间计算 API
- 一些 deprecated API
- 精度到毫秒


```js
new Date(2018, 4, 16)
```

```js
new Date(2018, 4, 16)
// 2018-05-15T16:00:00.000Z
```

```js
new Date(0)
new Date(0, 0)
new Date(0, 0, 0)
```

```js
new Date(0) // 1970-01-01T00:00:00Z
new Date(0, 0) // 1899-12-31T16:00:00Z
new Date(0, 0, 0) // 1899-12-30T16:00:00Z
```

- Too many overloads of `Date()`
- Month is 0-based
- Error tolerant
- UTC vs local

```js
Date.parse('2018-04-16T15:00:00')
```

```js
Date.parse('2018-04-16T15:00:00Z')
```

Mutable

```js
const d = new Date(Date.parse('1979-09-01'))
d.setFullYear(2018)
console.log(d)
```

```js
function getBirthdayOfThisYear(birthday) {
	birthday.setFullYear(new Date().getFullYear())
	return birthday
}
const myBirthday = new Date(Date.parse('1979-09-01'))
const thisBirthday = getBirthdayOfThisYear(myBirthday)
```

```js
function getBirthdayOfThisYear(birthday) {
	const d = new Date(birthday.getTime())
	d.setFullYear(new Date().getFullYear())
	return d
}
```

[HTML input.valueAsDate](value-as-date.html)

为什么
那么挫？

Brendan Eich
10天创造

JavaScript

Java

[java.util.Date](https://docs.oracle.com/javase/7/docs/api/java/util/Date.html)

Java 1.0

Java 1.1

库

- [Moment.js](http://momentjs.com/)
- [date-fns](https://date-fns.org/)
- [js-joda](https://js-joda.github.io/js-joda/)

提案

[proposal-temporal](https://github.com/tc39/proposal-temporal)
