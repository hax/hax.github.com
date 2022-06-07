# `function.sent` (Stage 2) Status Update
--------------------------------------------------------
<div><ruby>贺师俊<rp>（</rp><rt>HE Shi-Jun</rt><rp>）</rp></ruby> @hax <small>June 2022 TC39</small></div>

```js
function *g() {
	for (;;) yield function.sent
}
const echo = g()
echo.next("hello") // {value: "hello"}
echo.next("bye") // {value: "bye"}
```

```js
function *g() {
	let receivedValue
	for (;;) receivedValue = yield receivedValue
}
const echo = g()
echo.next("hello") // {value: undefined}
echo.next("bye") // {value: "bye"}
```

History of
`function.sent`

- [May 2015: Authored by Allen Wirfs-Brock](https://github.com/allenwb/ESideas/blob/master/Generator%20metaproperty.md)
- [Nov 2015: Discussed in the plenary, already stage 2](https://github.com/tc39/notes/blob/main/meetings/2015-11/nov-17.md#functionsent)
- [Mar 2018: Allen retired, needs new champion](https://github.com/tc39/notes/blob/167155eeb708d84e1758d99c88b15670f9b81f75/meetings/2018-03/mar-22.md#12iiic-functionsent-needs-a-champion)
- [July 2019: Would be inactive if no champion, so I took the job](https://github.com/tc39/notes/blob/167155eeb708d84e1758d99c88b15670f9b81f75/meetings/2019-07/july-23.md#making-functionsent-inactive)

I took the job in my first TC39 plenary meeting 😅
- It seems like a tiny proposal, good-first-contribution for new delegate
- I happened to write the babel plugin for it before official implementation land
- But it's actually has some difficult issues (eg. naming)...

It's time to update!

Issues

- Use cases
- Naming
- Miscellaneous

Does the proposal
have good use cases?

```js
// Example by AWB
function *adder(total = 0) {
	let increment = 1
	for (;;) {
		const input = function.sent
		switch (input) {
			case undefined: break
			case "done": return total
			default: increment = Number(input)
		}
		yield total += increment
	}
}
```

```js
let tally = adder();
tally.next(10); // value: 10
tally.next(); // value: 20
tally.next(); // value: 30
tally.next(6); // value: 36
tally.next(); // value: 42
let last = tally.next("done");
console.log(last.value);  // 42
```

Generators are new feature in 2015
Need some time to "discover" the usage

```js
function *numberParser() {
  let sign = 1, integer = 0, fraction = 0
  if (function.sent === '-') {
    sign = -1
    yield
  } else if (function.sent === '+') {
    yield
  }
  while (function.sent >= '0' && function.sent <= '9') {
    integer *= 10
    integer += function.sent.charCodeAt(0) - '0'.charCodeAt(0)
    yield
  }
  if (function.sent === '.') {
    yield
    let x = 1
    while (function.sent >= '0' && function.sent <= '9') {
      x *= 10
      fraction += (function.sent.charCodeAt(0) - '0'.charCodeAt(0)) / x
      yield
    }
  }
  if (function.sent == null) return sign * (integer + fraction)
  throw new Error()
}
```

```js
function test(s) {
	const p = numberParser()
	for (const c of s) p.next(c)
	const {value} = p.next()
	console.log(value)
}
test('42') // 42
test('+100') // 100
test('-100') // -100
test('3.1415') // 3.1415
test('-.233') // -0.233
test('-.0') // -0
test('-.x') // throw
```

```ts
// by @lifaon74 from #10
const pagination = new Pagination().pageIterator();
const controller = new AbortController();
setTimeout(() => controller.abort('timeout'), 5000);
const page = await pagination.next(controller);
```

```ts
export interface IGetPaginatedDataOptions { signal?: AbortSignal; }
export class Pagination<GData> {
  getPaginatedData(page: IPageInfo, options?: IGetPaginatedDataOptions): Promise<IPaginatedData<GData>> {
    return fetch('some url', options).then(_ => _.json());
  }
  /**
   * Creates an async iterator over the list of pages
   */
  async* pageIterator({ pageIndex = 0, itemsPerPage = 10 }: Partial<IPageInfo> = {}) {
    const page: IPageInfo = { pageIndex, itemsPerPage };
    let result: IPaginatedData<GData>;
    do {
      result = await this.getPaginatedData(page, function.sent); // note just here the usage of funtion.sent
      yield result;
      page.pageIndex++;
    } while (result.pageCount > page.pageIndex);
  }
}
```

```js
// double-ended destructuring and iterators
// https://github.com/tc39/proposal-deiter
let [first, ..., last] = [1, 2, 3, 4]
first // 1
last // 4
// roughly (omit done check and error handling):
const _it = [1, 2, 3, 4][Symbol.doubleEndedIterator]()
let first = _it.next().value
let last = _it.next('last').value
_it.return?.()
\
Array.prototype[Symbol.doubleEndedIterator] = function *values() {
  for (let firstIndex = 0, lastIndex = this.length; firstIndex < lastIndex;) {
    if (function.sent === 'last') yield this[--lastIndex]
    else yield this[firstIndex++]
  }
}
```

```js
const reporter = tennisGameScore('Nicolas Mahut', 'John Isner')
// Set 1, Game 9 of Isner–Mahut match at the 2010 Wimbledon Championships
// https://en.wikipedia.org/wiki/Isner%E2%80%93Mahut_match_at_the_2010_Wimbledon_Championships
report.next('server') // {value: "15–love"}
report.next('server') // {value: "30–love"}
report.next('receiver') // {value: "30–15"}
report.next('server') // {value: "40–15"}
report.next('receiver') // {value: "40–30"}
report.next('receiver') // {value: "deuce"}
report.next('receiver') // {value: "advantage receiver"}
report.next('receiver') // {done: true, value: "John Isner"}
```

```js
function *tennisGameScore(serverName, receiverName, {deuce30} = {}) {
	const call = ["love", 15, 30, 40]
	const deuceThreshold = deuce30 ? 2 : 3
	const points = {server: 0, receiver: 0}
	for (;;) {
		points[function.sent]++
		if (points[function.sent] > 3) break
		if (points.server === points.receiver) {
			if (points.server == deuceThreshold) break
			yield `${points.server} all`
		} else {
			yield `${points.server}–${points.receiver}`
		}
	}
	for (;;) {
		switch (points.server - points.receiver) {
			case 0: yield "deuce"; break
			case 1: yield "advantage server"; break
			case -1: yield "advantage receiver"; break
			default:
				return points.server > points.receiver ? serverName : receiverName
		}
		points[function.sent]++
	}
}
```

```js
class TennisGameScore {
	server = 0
	receiver = 0
	serverName
	receiverName
	deuceThreshold = 3
	constructor(serverName, receiverName, {deuce30} = {}) {
		this.serverName = serverName
		this.receiverName = receiverName
		if (deuce30) this.deuceThreshold = 2
	}
	get beyondDeuce() {
		return this.server >= this.deuceThreshold
			&& this.receiver >= this.deuceThreshold
	}
	next(winner) {
		this[winner]++
		const {score} = this
		const done = score.startsWith("game ")
		return {done, value: done ? score.slice(5) : score }
	}
	// ... to be continued
```

```js
	// ... continue
	get score() {
		if (this.beyondDeuce) {
			switch (this.server - this.receiver) {
				case 0: return "deuce"
				case 1: return `advantage ${this.serverName}`
				case -1: return `advantage ${this.receiverName}`
				case 2: return `game ${this.serverName}`
				case -2: return `game ${this.receiverName}`
			}
		} else if (this.server == 4) {
			return "game ${this.serverName}"
		} else if (this.receiver == 4) {
			return "game ${this.receiverName}"
		} else {
			const call = ["love", 15, 30, 40]
			if (this.server == this.receiver) {
				return `${call[this.server]} all`
			} else {
				return `${call[this.server]}–${call[this.receiver]}`
			}
		}
	}
}
```

Summary of the use cases:
- `adder`: accumulator or similar calculating
- `numberParser`: push-style stream consuming
- `pageIterator`: extra options for each step of iteration
- `double-ended iterator`: language-level iteration protocol
- `tennisGameScore`: handwriting finite state machine

Naming issue: #1

Recap of the goal:
Allow accessing "received value"
(sent by `genObj.next(value)`)
in the generator function body
especially the first "received value"
which not be able to access now

meta property
- `new.target`
- `import.meta`,
- `function.sent`

`function.sent` implies it's a
feature applied to all functions

not a naming issue
but the consequence of it
```js
// Syntax error or `undefined`/lexical
// in non generator functions?
function f() { function.sent }
const arrow = () => function.sent
// what about arrow generator functions?
// const arrowgen = ()*=> function.sent
```

What about
`yield.sent`?

- The first received value has no relationship with `yield`
- `yield.sent` could be a normal property outside generators
- syntax/semantics confusion
```js
let sent = yield.sent
let sent = (yield).sent
let {sent} = yield
```

`sent` is also confusing

In the generator function body
you **receive** the value
which is **sent** by `genObj.next(v)`,
or **sent** by `return v` in sub-generator (`yield *`)


Alternatives:
- `function.got`
- `function.input`
- `function.lastValue`
- `function.currentValue`
- `function.receivedValue`
- `function.received`

- `function.sent`
- `function.received`
- `yield.received`
- `var.received`

- ~~`function.sent`~~
- `function.received`
- ~~`yield.received`~~
- `var.received`

DX issue

Repeated reassignments
- `value = yield`
- `value = yield* iterable`

`function.sent` or any meta property
can't solve the issue well
- Too long (12+ chars)
- No way to short

```js
function *numberParser() {
  let sign = 1, integer = 0, fraction = 0
  if (function.sent === '-') {
    sign = -1
    yield
  } else if (function.sent === '+') {
    yield
  }
  while (function.sent >= '0' && function.sent <= '9') {
    integer *= 10
    integer += function.sent.charCodeAt(0) - '0'.charCodeAt(0)
    yield
  }
  if (function.sent === '.') {
    yield
    let x = 1
    while (function.sent >= '0' && function.sent <= '9') {
      x *= 10
      fraction += (function.sent.charCodeAt(0) - '0'.charCodeAt(0)) / x
      yield
    }
  }
  if (function.sent == null) return sign * (integer + fraction)
  throw new Error()
}
```

```js
function *numberParser() {
  let sign = 1, integer = 0, fraction = 0
  let ch = function.sent
  if (ch === '-') {
    sign = -1
    yield
  } else if (ch === '+') {
    yield
  }
  ch = function.sent
  while (ch >= '0' && ch <= '9') {
    integer *= 10
    integer += ch.charCodeAt(0) - '0'.charCodeAt(0)
    yield
    ch = function.sent
  }
  // ...to be continued
```

```js
  // continue...
  ch = function.sent // redundant
  if (ch === '.') {
    yield // miss?
    let x = 1
    ch = function.sent // ok, it's here
    while (ch >= '0' && ch <= '9') {
      x *= 10
      fraction += (ch.charCodeAt(0) - '0'.charCodeAt(0)) / x
      yield // <-- miss reassignment!
    }
  }
  ch = function.sent
  if (ch) return sign * (integer + fraction)
  throw new Error()
}
```

```js
function *numberParser() {
  let sign = 1, integer = 0, fraction = 0
  let ch = function.sent
  if (ch === '-') {
    sign = -1
    ch=yield
  } else if (ch === '+') {
    ch=yield
  }
  while (ch >= '0' && ch <= '9') {
    integer *= 10
    integer += ch.charCodeAt(0) - '0'.charCodeAt(0)
    ch=yield
  }
  // ...to be continued
```

```js
  // continue...
  if (ch === '.') {
    ch=yield
    let x = 1
    while (ch >= '0' && ch <= '9') {
      x *= 10
      fraction += (ch.charCodeAt(0) - '0'.charCodeAt(0)) / x
      ch=yield
    }
  }
  if (ch) return sign * (integer + fraction)
  throw new Error()
}
```

```js
function *numberParser() {
  const ch = () => function.sent
  let sign = 1, integer = 0, fraction = 0
  if (ch() === '-') {
    sign = -1
    yield
  } else if (ch() === '+') {
    yield
  }
  // ...
}
```

```js
function *numberParser() {
	// ref proposal by rbuckton (stage 0)
  let ref ch = ref function.sent
  let sign = 1, integer = 0, fraction = 0
  if (ch === '-') {
    sign = -1
    yield
  } else if (ch === '+') {
    yield
  }
  // ...
}
```

Rethink about the goal:
Allow accessing "received value"
(sent by `genObj.next(value)`)

`function.sent` is actually
the argument of `next(param)`

```js
// meta property function.sent
function *g() {
	for (;;) {
		console.log(function.sent)
		yield
	}
}
```

```js
// receive param syntax
function *g() receive (value) {
	for (;;) {
		console.log(value)
		yield
	}
}
```

Use cases
rewritten in receive param syntax

```js
function *g() {
	for (;;) yield function.sent
}
const echo = g()
echo.next("hello") // {value: "hello"}
echo.next("bye") // {value: "bye"}
```

```js
function *g() receive (input) {
	for (;;) yield input
}
const echo = g()
echo.next("hello") // {value: "hello"}
echo.next("bye") // {value: "bye"}
```

```js
function *adder(total = 0) {
	let increment = 1
	for (;;) {
		const input = function.sent
		switch (input) {
			case undefined: break
			case "done": return total
			default: increment = Number(input)
		}
		yield total += increment
	}
}
```

```js
function *adder(total = 0)
				receive (input) {
	let increment = 1
	for (;;) {
		switch (input) {
			case undefined: break
			case "done": return total
			default: increment = Number(input)
		}
		yield total += increment
	}
}
```

```js
function *numberParser() {
  let sign = 1, integer = 0, fraction = 0
  if (function.sent === '-') {
    sign = -1
    yield
  } else if (function.sent === '+') {
    yield
  }
  while (function.sent >= '0' && function.sent <= '9') {
    integer *= 10
    integer += function.sent.charCodeAt(0) - '0'.charCodeAt(0)
    yield
  }
  if (function.sent === '.') {
    yield
    let x = 1
    while (function.sent >= '0' && function.sent <= '9') {
      x *= 10
      fraction += (function.sent.charCodeAt(0) - '0'.charCodeAt(0)) / x
      yield
    }
  }
  if (function.sent == null) return sign * (integer + fraction)
  throw new Error()
}
```

```js
function *numberParser() receive (ch) {
  let sign = 1, integer = 0, fraction = 0
  if (ch === '-') {
    sign = -1
    yield
  } else if (ch === '+') {
    yield
  }
  while (ch >= '0' && ch <= '9') {
    integer *= 10
    integer += ch.charCodeAt(0) - '0'.charCodeAt(0)
    yield
  }
  if (ch === '.') {
    yield
    let x = 1
    while (ch >= '0' && ch <= '9') {
      x *= 10
      fraction += (ch.charCodeAt(0) - '0'.charCodeAt(0)) / x
      yield
    }
  }
  if (ch == null) return sign * (integer + fraction)
  throw new Error()
}
```

```ts
export interface IGetPaginatedDataOptions { signal?: AbortSignal; }
export class Pagination<GData> {
  getPaginatedData(page: IPageInfo, options?: IGetPaginatedDataOptions): Promise<IPaginatedData<GData>> {
    return fetch('some url', options).then(_ => _.json());
  }
  /**
   * Creates an async iterator over the list of pages
   */
  async* pageIterator({ pageIndex = 0, itemsPerPage = 10 }: Partial<IPageInfo> = {}) {
\
    const page: IPageInfo = { pageIndex, itemsPerPage };
    let result: IPaginatedData<GData>;
    do {
      result = await this.getPaginatedData(page, function.sent); // note just here the usage of funtion.sent
      yield result;
      page.pageIndex++;
    } while (result.pageCount > page.pageIndex);
  }
}
```

```ts
export interface IGetPaginatedDataOptions { signal?: AbortSignal; }
export class Pagination<GData> {
  getPaginatedData(page: IPageInfo, options?: IGetPaginatedDataOptions): Promise<IPaginatedData<GData>> {
    return fetch('some url', options).then(_ => _.json());
  }
  /**
   * Creates an async iterator over the list of pages
   */
  async* pageIterator({ pageIndex = 0, itemsPerPage = 10 }: Partial<IPageInfo> = {})
        receive (options?: IGetPaginatedDataOptions) {
    const page: IPageInfo = { pageIndex, itemsPerPage };
    let result: IPaginatedData<GData>;
    do {
      result = await this.getPaginatedData(page, options);
      yield result;
      page.pageIndex++;
    } while (result.pageCount > page.pageIndex);
  }
}
```

```js
// double-ended destructuring and iterators
// https://github.com/tc39/proposal-deiter
Array.prototype[Symbol.doubleEndedIterator] = function *values() {
  for (let firstIndex = 0, lastIndex = this.length; firstIndex < lastIndex;) {
    if (function.sent === 'last') yield this[--lastIndex]
    else yield this[firstIndex++]
  }
}
```

```js
// double-ended destructuring and iterators
// https://github.com/tc39/proposal-deiter
Array.prototype[Symbol.doubleEndedIterator] = function *values() receive (from) {
  for (let firstIndex = 0, lastIndex = this.length; firstIndex < lastIndex;) {
    if (from === 'last') yield this[--lastIndex]
    else yield this[firstIndex++]
  }
}
```

```js
function *tennisGameScore(serverName, receiverName, {deuce30} = {}) {
\
	const call = ["love", 15, 30, 40]
	const deuceThreshold = deuce30 ? 2 : 3
	const points = {server: 0, receiver: 0}
	for (;;) {
		points[function.sent]++
		if (points[function.sent] > 3) break
		if (points.server === points.receiver) {
			if (points.server == deuceThreshold) break
			yield `${points.server} all`
		} else {
			yield `${points.server}–${points.receiver}`
		}
	}
	for (;;) {
		switch (points.server - points.receiver) {
			case 0: yield "deuce"; break
			case 1: yield "advantage server"; break
			case -1: yield "advantage receiver"; break
			default:
				return points.server > points.receiver ? serverName : receiverName
		}
		points[function.sent]++
	}
}
```

```js
function *tennisGameScore(serverName, receiverName, {deuce30} = {})
				receive (whoWinThePoint) {
	const call = ["love", 15, 30, 40]
	const deuceThreshold = deuce30 ? 2 : 3
	const points = {server: 0, receiver: 0}
	for (;;) {
		points[whoWinThePoint]++
		if (points[whoWinThePoint] > 3) break
		if (points.server === points.receiver) {
			if (points.server == deuceThreshold) break
			yield `${points.server} all`
		} else {
			yield `${points.server}–${points.receiver}`
		}
	}
	for (;;) {
		switch (points.server - points.receiver) {
			case 0: yield "deuce"; break
			case 1: yield "advantage server"; break
			case -1: yield "advantage receiver"; break
			default:
				return points.server > points.receiver ? serverName : receiverName
		}
		points[whoWinThePoint]++
	}
}
```

receive param syntax just
solve almost all issues

The only possible "issue":
The value of receive param
will updated *automatically*
after `yield`, `yield *`

Next step of the proposal
- Collect feedback of receive param syntax
- Rewrite the spec text
- Deal with left issues (#3)

Queue?

Thank you
