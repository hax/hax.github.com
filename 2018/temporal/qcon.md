关于时间
QConBeijing 2018


个人简介

hax

贺师俊

百姓网
www.baixing.com

百姓网
架构部

前端

HTML

JavaScript

[proposal-function-this](https://github.com/hax/proposal-function-this)

时间
Time

平常

复杂

历法

天文

年 月 日

- 年 太阳
- 月 月亮
- 日 地球

政治、宗教、文化

公历

- 农历
- 佛历
- 印度历
- 希伯来历
- 波斯历
- 伊斯兰历

- 年月日
- 月日年
- 日月年

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

[Bugs](https://en.wikipedia.org/wiki/Leap_second#Examples_of_problems_associated_with_the_leap_second)

~~政治、宗教、文化~~

~~天文~~

时间 API

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
const user = { name: hax, birthday: new Date(Date.parse('1979-09-01')) }
const thisBirthday = getBirthdayOfThisYear(user.birthday)
```

```js
function getBirthdayOfThisYear(birthday) {
	const d = new Date(birthday.getTime())
	d.setFullYear(new Date().getFullYear())
	return d
}
```

[input.valueAsDate](value-as-date.html)

```js
const user = {
	_birthdayTime: Date.parse('1979-09-01'),
	get birthday() { return new Date(this._birthdayTime) },
}
```

为什么
那么挫？

Brendan Eich
10天创造

JavaScript

Java

[java.util.Date](https://docs.oracle.com/javase/7/docs/api/java/util/Date.html)

Java 1.0

Java 1.1

Java 8

[java.time](https://docs.oracle.com/javase/8/docs/api/java/time/package-summary.html)

- 不变性
- 分离人类可读时间和机器时间
- 更清晰的 API 接口
- 实用运算
- 可扩展性

库

- [Moment.js](http://momentjs.com/)
- [date-fns](https://date-fns.org/)
- [js-joda](https://js-joda.github.io/js-joda/)


```js
moment().format('MMMM Do YYYY, h:mm:ss a')
moment().format('dddd')
moment().format("MMM Do YY")
moment().format('YYYY [escaped] YYYY')
moment("20180422", "YYYYMMDD")
```

```js
moment().startOf('day')
moment().endOf('day')
moment().startOf('hour')
moment().subtract(10, 'days')
moment().add(1, 'hours')
```

- [Why Moment.js Isn’t Immutable Yet](https://maggiepint.com/2016/06/24/why-moment-js-isnt-immutable-yet/)
- [moment.js为何要设计成mutable的，有何优缺点？](https://www.zhihu.com/question/52669297)


```js
LocalDate.now()
const d = LocalDate.of(2018, 4, 22)
d.plusDays(365)
d.minusDays(365)
d.withDayOfMonth(1)
d.withMonth(1).withDayOfMonth(1)
d.isAfter(d.minusDays(1))
LocalTime.now()
d.atTime(LocalTime.of(17, 55))
const dt = LocalDateTime.parse('2018-02-26T23:55:42.123')
dt.truncatedTo(ChronoUnit.HALF_DAYS); // '2018-02-26T12:00'
```

提案

[proposal-temporal](https://github.com/tc39/proposal-temporal)

Champions
- Maggie Pint (@maggiepint)
- Matt Johnson (@mj1856)
- Brian Terlson (@bterlson)

Civil Time

- `CivilDate` `2017-12-31`
- `CivilTime` `17:00:00`
- `CivilDateTime` `2017-12-31T12:00:00`

Absolute Time

- `Instant` `2017-12-31T00:00:00Z`
- `ZonedInstant` `2017‑12‑31T09:00:00+08:00[Asia/Beijing]`

```js
const civilDate = new CivilDate(2018, 4, 22)
const year = civilDate.year
const month = civilDate.month
const day = civilDate.day
```

```js
const {year, month, day} = civilDate
```

```js
const d2 = d1.plus({months: 1})
const t = new CivilTime(17, 30, 15, 0, 0)
const dt1 = d1.withTime(t)
const dt2 = t.withDate(d1)
```

```js
m.add(1, 'month').add(1, 'day')
j.plusMonths(1).plusDays(1)
d.plus({month: 1, day: 1})
```

```js
let civilDateTime = CivilDateTime.from(date, time)
let civilDateTime2 = civilDateTime1.plus({days: 3, hours: 4, minutes: 2, seconds: 12})
let civilDate = civilDateTime.toCivilDate()
let civilTime = civilDateTime.toCivilTime()
let newCivilDate = civilDate.with({year: 2017, month: 3})
let zonedInstant = civilDateTime.withZone(timeZone[, options])
```

```js
new Instant(milliseconds[, nanoseconds])
const {milliseconds, nanoseconds} = instant
const zonedInstant = instant.withZone(timeZone)
const civilDateTime = zonedInstant.toCivilDateTime()
const civilDate = zonedInstant.toCivilDate()
const civilTime = zonedInstant.toCivilTime()
const instant = zonedInstant.toInstant()
```

一些讨论

[CivilXXX 命名](https://github.com/tc39/proposal-temporal/issues/33)
[Local 的意思](https://github.com/tc39/proposal-temporal/issues/11)

- Date/Time/DateTime
- Civil
- Local
- Plain
- Unzoned,
- CalendarDate/ClockTime/DateTime

其他历法？

其他时间构造？

- Period
- Year
- YearMonth
- MonthDay
- OffsetTime
- ZonedDateTime

总结

Q & A
- [@johnhax](https://weibo.com/haxy)
- [zhihu.com/people/he-shi-jun](https://www.zhihu.com/people/he-shi-jun/activities)
