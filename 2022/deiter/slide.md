# Double-Ended Iterator and
Destructuring Status Update
https://github.com/tc39/proposal-deiter (Stage 1)
--------------------------------------------------------
<div><ruby>贺师俊<rp>（</rp><rt>HE Shi-Jun</rt><rp>）</rp></ruby> @hax <small>July 2022 TC39</small></div>

Recap of syntax

```js
// current destructuring syntax
// only allow ...rest in last position
let [first, second, ...rest] = iterable
\
// with this proposal
// allow ...rest in any position
let [first, ...rest, last] = iterable
let [...rest, last] = iterable
```

```js
// and allow ... to omit the binding
let [a, ..., b] = iterable
\
// only take last 2 items
let [..., a, b] = iterable
\
// only take first 2 items
let [a, b, ...] = iterable
// similar to today's
let [a, b] = iterable
```

```js
// (One small update)
// https://github.com/tc39/proposal-deiter/issues/8
// Trailing comma after ...rest
let [ ...rest , ] = iterable
\
// Currently syntax error, but consider this proposal
// allow ...rest in any position, we should relax the
// rule to allow that
```

Recap of semantic

```js
// destructuring
let [first, second, ...rest] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, second, rest
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
\
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _next(); if (_result.done) break DESTRUCT
	second = _result.value
	for (;;) {
		_result = _next(); if (_result.done) break
		_rest.push(_result.value)
	}
}
rest = _rest
```

```js
// proposed double-ended destructuring
let [first, ...rest, last] = iterable
// (original stage 0 version) roughly ->
// ------------------------------------------------------- //
let first, last, rest
let _iter = iterable[Symbol.doubleEndedIterator]()
let _next = _iter.next.bind(_iter)
\
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _next("back"); if (_result.done) break DESTRUCT
	last = _result.value
	for (;;) {
		_result = _next(); if (_result.done) break
		_rest.push(_result.value)
	}
}
rest = _rest
```

```js
// proposed double-ended destructuring
let [first, ...rest, last] = iterable
// (updated version, discussed later) roughly ->
// ------------------------------------------------------- //
let first, last, rest
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter),
let _nextLast = _iter.nextLast.bind(_iter)
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last = _result.value
	for (;;) {
		_result = _next(); if (_result.done) break
		_rest.push(_result.value)
	}
}
rest = _rest
```

Proposal History
- [Stage 0->1 presentation](https://johnhax.net/2020/tc39-sept-deiter/slide)
- [Advanced to Stage 1 on Sept 2020](https://github.com/tc39/notes/blob/167155eeb708d84e1758d99c88b15670f9b81f75/meetings/2020-09/sept-24.md#double-ended-iterator-and-destructuring-for-stage-1)
- [Incubator call on Dec 3, 2020](https://github.com/tc39/incubator-agendas/blob/main/notes/2020/12-03.md)
The most important question:
What's the underlying mechanism
for double-ended destructuring?

[Optional Mechanisms for Double-ended Destructructing](https://github.com/tc39/proposal-deiter/blob/main/why-deiter.md)
- Index-based (only support Array/TypedArray)
- Some magic (support builtin iterables)
- Mechanism A: Iterator + Array
- Mechanism B: Double-Ended iterator

[Optional Mechanisms for Double-ended Destructructing](https://github.com/tc39/proposal-deiter/blob/main/why-deiter.md)
- ~~Index-based (only support Array/TypedArray)~~
- ~~Some magic (support builtin iterables)~~
- Mechanism A: Iterator + Array
- Mechanism B: Double-Ended Iterator

```js
// destructuring
let [first, second, third, ...rest] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, second, third, rest
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
\
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _next(); if (_result.done) break DESTRUCT
	second = _result.value
	_result = _next(); if (_result.done) break DESTRUCT
	third = _result.value
	for (;;) {
		_result = _next(); if (_result.done) break
		_rest.push(_result.value)
	}
}
rest = _rest
```

```js
// Mechanism A: Iterator + Array
let [first, ...rest, last2, last1] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, last2, last1, rest
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
\
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	for (;;) {
		_result = _next(); if (_result.done) break
		_rest.push(_result.value)
	}
	let _a = _rest.splice(-2)
	// alternative behaviors for insufficant items:
	last1 = _a.pop() // last2 = _a.shift()
	last2 = _a.pop() // last1 = _a.shift()
}
rest = _rest
```

```js
// Mechanism A: Iterator + Array
let [first, ..., last2, last1] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, last2, last1
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
\
let _result, _a = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	for (;;) {
		_result = _next(); if (_result.done) break
		if (_a.length == 2) _a.shift()
		_a.push(_result.value)
	}
	// alternative behaviors for insufficant items:
	last1 = _a.pop() // last2 = _a.shift()
	last2 = _a.pop() // last1 = _a.shift()
}
\
```

```js
// Mechanism A: Iterator + Array
let [..., last3, last2, last1] = iterable
// roughly ->
// ------------------------------------------------------- //
let last3, last2, last1
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
\
let _result, _a = []
DESTRUCT: {
	for (;;) {
		_result = _next(); if (_result.done) break
		if (_a.length == 3) _a.shift()
		_a.push(_result.value)
	}
\
	// alternative behaviors for insufficant items:
	last1 = _a.pop() // last3 = _a.shift()
	last2 = _a.pop() // last2 = _a.shift()
	last3 = _a.pop() // last1 = _a.shift()
}
\
```

```js
// destructuring
let [first, second, third] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, second, third
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
\
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _next(); if (_result.done) break DESTRUCT
	second = _result.value
	_result = _next(); if (_result.done) break DESTRUCT
	third = _result.value
\
	_iter.return?.()
\
\
}
\
```

```js
// destructuring
let [first, second, third, ...rest] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, second, third, rest
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
\
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _next(); if (_result.done) break DESTRUCT
	second = _result.value
	_result = _next(); if (_result.done) break DESTRUCT
	third = _result.value
	for (;;) {
		_result = _next(); if (_result.done) break
		_rest.push(_result.value)
	}
}
rest = _rest
```

```js
// Mechanism B: Double-Ended Iterator
let [first, ...rest, last2, last1] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, last2, last1, rest
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
let _nextLast = _iter.nextLast.bind(_iter)
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last1 = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last2 = _result.value
	for (;;) {
		_result = _next(); if (_result.done) break
		_rest.push(_result.value)
	}
}
rest = _rest
```

```js
// Mechanism B: Double-Ended Iterator
let [first, ..., last2, last1] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, last2, last1
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
let _nextLast = _iter.nextLast.bind(_iter)
let _result
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last1 = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last2 = _result.value
\
	_iter.return?.()
\
\
}
\
```

```js
// Mechanism B: Double-Ended Iterator
let [..., last3, last2, last1] = iterable
// roughly ->
// ------------------------------------------------------- //
let last3, last2, last1
let _iter = iterable[Symbol.iterator]()
\
let _nextLast = _iter.nextLast.bind(_iter)
let _result
DESTRUCT: {
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last1 = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last2 = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last3 = _result.value
\
	_iter.return?.()
\
\
}
\
```

```js
// destructuring
let [first, second, third] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, second, third
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
\
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _next(); if (_result.done) break DESTRUCT
	second = _result.value
	_result = _next(); if (_result.done) break DESTRUCT
	third = _result.value
\
	_iter.return?.()
\
\
}
\
```

Key points of Mechanism A
- Just works
- Must consume all items to get the last item
- Halt on infinite (or very long) sequence

Key points of Mechanism B
-  `[..., x] = it` invokes `nextLast()`, or throws
- Only consume exactly wanted items
- Can work on infinite (or very long) sequence

```js
// Some examples of infinite or very long,
// but still double-ended sequence
\
// 42, 42, ..., 42, 42
Iterator.repeat(42)
\
// 0n, 1n, ..., 0xffffffffffffffffn
BigInt.range(0n, 1n << 64n)
\
// 4, 2, 1, 0.5, 0.25 ..., 0, 0
GeometricProgression({start: 4, ratio: 1/2})
```

More consideration of double-ended iterators
- Symmetry of `next` and `nextLast`, also symmetry of derived APIs
<li>Provide reasonable semantics for <code>findLast</code>, <code>takeLast</code>, <code>reduceRight</code><br> and <code>toReversed</code> iterator helpers which people may expect</li>
<li>Can cover almost all use cases of reverse iterators, so instead of two<br> separate iterators (and still can't support <code>let [a, ..., b] = it</code>),<br> developers only need maintain the iteration logic in one double-ended<br> iterator, and <code>iter.toReversed()</code> just get the reverse iterator</li>

More consideration of double-ended iterators
- Predictable performance in all syntax or API usage
<li>Almost all built-in iterables/iterators have the nature of double-ended,<br> so even we choose Mechanism A, JS engines may use Mechanism B<br> internally for optimization, but userland iterables are impossible to<br> get such optimization, and it will be observable (not sure whether such<br> observable optimizations are spec compliant, or have any other issues)</li>
<li>For the use cases with deterministic performance expectations, <br> developers eventually need to reinvent similar mechanism</li>

Note: Developers can always convert non double-ended
iterables to arrays to get double-ended destrusturing
```js
let [first, ..., last] = [...iterable]
// or
let [first, ..., last] = iterator.toArray()
```
So Mechanism B has the escape hatch to Mechanism A behavior.
But if we choose Mechanism A, it's impossible to get Mechanism
B behavior (though JS engines can do some magic on built-ins)

Some conclusions in the incubator call
- It's always developer's duty to implement a iterator "correctly"
- It's better to treat built-in and userland iterators equal citizens
<li>It's better to consider infinite iterators as equal citizens to finite<br> iterators (not everyone agree)</li>
<li>People on the call generally like mechanism B even they may <br> have disagreement on the specific consideration listed before</li>

Summary of the reason why I prefer mechanism B
- In simple cases, they are just same
- In advanced cases, Mechanism B give the power to the authors
- Double-ended iterators by themselves can be useful
- Mechanism B has the escape hatch, Mechanism A hasn't

As the champion I'd like to go on with
mechanism B (double-ended iterators).
But we are just stage 1, can always revisit the design
spaces, please open the issue in the repo if you want.

Note: It's possible to support both, aka. if the iterator
is double-ended, use mechanism B, or fallback to mechanism A.
In that way, double-ended structuring always work, userland
iterators by default use mechanism A, but the authors can
upgrade their code to use mechanism B if they want. Because
mixing two mechanisms is a little bit complex, and we can
add mechanism A as fallback at anytime we want, I'd like to
focus on mechanism B for now, and revisit it in the future.

Updates on other important issues
- `next("back")` -> `nextLast()`
- How to mark double-ended iterables?
- What about built-in iterables?
- How iterator helpers work on double-ended?
- How to write double-ended iterators in generators?

The issues of `next("back")`
- Confusion of double-ended and bi-directional
- The word "back" is C++ term of "last", not fit for JS
- People feel `next()` should always forward-only
- Rely on "passing the protocol" semantic of iterator helpers proposal
- Rely on `function.sent` proposal to write userland deiter
- Magic string

The benefits of `nextLast()`
- Hopefully have clear difference to `cursor.previous()`
- The word "last" is consistent with `lastIndexOf`, `findLast` and so on
- Symmetry of `next()` and `nextLast()` (consume the first/last of the rest items)
- Much easy to spec how iterator helpers work on double-ended
- Not abusing custom iterator protocol
- No magic string

How to mark double-ended iterables?
```js
// In the original stage 0 version, introduce a new well-known symbol
let [a, ..., b] = array
// roughly ->
let _iter = array[Symbol.doubleEndedIterator]()
// ...
\
// But consider iterators and iterator helpers, they also need to have
// @@doubleEndedIterator methods
let [a, ..., b] = array.values().map(fn)
// ->
let _iter = array.values().map(fn)[Symbol.doubleEndedIterator]()
// ...
\
// There is Iterator.prototype[@@iterator]() { return this }
// But not fit to @@doubleEndedIterator because only some
// iterators are double-ended.
```

To be short, well-known symbol solution is possible, but a little bit
complex and may require tiny breaking changes due to many reasons.
[See tc39/proposal-deiter/issues/5#issuecomment-1019751577](https://github.com/tc39/proposal-deiter/issues/5#issuecomment-1019751577)
Note, reverse iterator proposal which introduce `@@reverseIterator` has similar issues.

Consider now we move to `nextLast()`, a much simple solution
is just use `nextLast` check (same as current `next` check).
So instead of introducing new well-known symbols and new
protocols, we just add an optional `nextLast()` method to
the *Iterator* interface (just like `throw()` and `return()`)

- only has `next()`: normal iterator
- have both `next()` and `nextLast()`: double-ended iterator,
- only has `nextLast()`?
- no `next()` and no `nextLast()`: "dead" iterator?

```js
// Though spec say `next` is required, this is already valid today:
let [] = {[Symbol.iterator]() {
	return {}
}}
\
// And it seems no reason to check `next` if don't needed:
let [..., last] = {[Symbol.iterator]() {
	return {
		nextLast() { return {value: 42} }
	}
}}
last // 42
```

```js
// Consider how iterator helpers could work
// it's possible to have `nextLast`-only iterators
\
// For example, it's easy to imagine a `toReversed()` iterator
// helper which just reverse the invoking of `next` and `nextLast`
function toReversed(upstream) {
	let next = upstream.nextLast?.bind(upstream)
	let nextLast = upstream.next?.bind(upstream)
	let ret = upstream.return?.bind(upstream)
	return {next, nextLast, return: ret, __proto__: IteratorPrototype}
}
// assume array iterators are double-ended, have both next/nextLast
let [three, ..., one] = toReversed([1, 2, 3].values())
three // 3
one // 1
\
// As the consequence, reverse a forward-only iterator
// could just give a backward-only iterator
function* onetwothree() { yield 1; yield 2; yield 3 }
let [..., two, one] = toReversed(onetwothree())
one // 1
two // 2
```

```js
// Or we can just think about what should happen if we remove `next`
// of a double-ended iterator
function onetwothree() {
	let iter = [1, 2, 3].values() // assume arrays are double-ended
	iter.next = null // nullify next
	return iter
}
\
let [..., two, three] = onetwothree()
let [..., one, two, three] = onetwothree()
let [...one_two, three] = onetwothree()
let [...one_two_three] = onetwothree()
// let [one, ...] // throw
```

The key point is `nextLast()` could also be
used to consume rest items just like `next()`

So we actually could update the *Iterator* iterface to
make `next` method also optional, or we can say an *Iterator*
is required to have either `next()` or `nextLast()`, or both

```js
// Mechanism B: Double-Ended Iterator
let [first, ...rest, last2, last1] = iterable
// roughly ->
// ------------------------------------------------------- //
let first, last2, last1, rest
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
let _nextLast = _iter.nextLast.bind(_iter)
let _result, _rest = []
DESTRUCT: {
	_result = _next(); if (_result.done) break DESTRUCT
	first = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last1 = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last2 = _result.value
	for (;;) {
		_result = _next(); if (_result.done) break
		_rest.push(_result.value)
	}
}
rest = _rest
```

```js
// Mechanism B: Double-Ended Iterator
let [..., last3, last2, last1] = iterable
// roughly ->
// ------------------------------------------------------- //
let last3, last2, last1
let _iter = iterable[Symbol.iterator]()
\
let _nextLast = _iter.nextLast.bind(_iter)
let _result
DESTRUCT: {
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last1 = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last2 = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last3 = _result.value
\
	_iter.return?.()
\
\
}
\
```

```js
// Mechanism B: Double-Ended Iterator
let [...rest, last3, last2, last1] = iterable
// roughly ->
// ------------------------------------------------------- //
let last3, last2, last1, rest
let _iter = iterable[Symbol.iterator]()
\
let _nextLast = _iter.nextLast.bind(_iter)
let _result, _rest = []
DESTRUCT: {
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last1 = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last2 = _result.value
	_result = _nextLast(); if (_result.done) break DESTRUCT
	last3 = _result.value
	for (;;) {
		_result = _nextLast(); if (_result.done) break
		_rest.unshift(_result.value)
	}
}
rest = _rest
```

```js
// destructuring
let [...rest] = iterable
// roughly ->
// ------------------------------------------------------- //
let rest
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next.bind(_iter)
\
\
\
let _result, _rest = []
for (;;) {
	_result = _next(); if (_result.done) break
	_rest.push(_result.value)
}
rest = _rest
```

```js
// destructuring
let [...rest] = iterable
// roughly ->
// ------------------------------------------------------- //
let rest
let _iter = iterable[Symbol.iterator]()
let _next = _iter.next?.bind(_iter), _push = "push"
if (!_next) {
	_next = _iter.nextLast?.bind(_iter); _push = "unshift"
}
let _result, _rest = []
for (;;) {
	_result = _next(); if (_result.done) break
	_rest[push](_result.value)
}
rest = _rest
```

- Normal iterators: `next()`-only
- Double-ended iterators: `next()` and `nextLast()`
- `nextLast()`-only ? (Do we like it?)
- No need of `@@doubleEndedIterator` (or `@@reverseIterator`)

What about built-in iterables?
- Most built-in iterables/iterators can be double-ended
- Easy to implement (or polyfill) Array/TypedArray
- Not hard to implement (or polyfill) String
- Not hard to implement (but hard to polyfill) Map/Set
<li>The only exception is RegExp String Iterator <br>(result of <code>String.prototype.matchAll()</code>)</li>
- Need to investigate `Intl` APIs
- I may miss something, please raise issues in the repo

How iterator helpers work on double-ended?
- One important thing to decide: do we want `nextLast()`-only?
- Some methods like `indexed`, `find`, `reduce` require `next`, no need to change
- Some methods like `forEach`, `map` just simply invoke upstream `next/nextLast`
<li>Most aggregator methods like <code>toArray</code>, <code>every</code>, etc. are neutral, need to fallback<br> to <code>nextLast</code> if <code>next</code> is not available</li>
- Some methods like `take`, `flatMap` need more investigation
- Can have some new iterator helpers like `toReversed`, `takeLast`, `reduceRight` etc.
- [See tc39/proposal-deiter/blob/main/iterator-helpers.md for more info](https://github.com/tc39/proposal-deiter/blob/main/iterator-helpers.md)

How to write double-ended iterators in generators?
```js
// In the original stage 0 version, rely on function.sent
function *range(start, end) {
	while (start < end) {
		if (function.sent === 'back') yield --end
		else yield start++
	}
}
// Because we now move to `nextLast`, we can't write
// double-ended iterator directly via generators
```

```js
// Not so hard to write double-ended iterators directly
function range(start, end) {
	const done = () => start >= end ? {done: true} : null
	return Iterator.from({
		next() { return done() ?? {value: start++} },
		nextLast() { return done() ?? {value: --end} },
	})
}
```

```js
// If we still want use generators, we can use wrapper
const range = doubleEnded(function *(start, end, context) {
	while (start < end) {
		if (context.method == "nextLast") {
			yield --end
		} else {
			yield start++
		}
	}
})
```

```js
// Also can be used as decorator
class IntRange {
  constructor(start, end) {
    if (!Number.isSafeInteger(start)) throw new TypeError()
    if (!Number.isSafeInteger(end)) throw new TypeError()
    this.start = start; this.end = end; Object.freeze(this)
  }
  @doubleEnded *[Symbol.iterator](context) {
    let {start, end} = this
    while (start < end) {
      if (context.method == "nextLast") yield --end
      else yield start++
    }
  }
}
```

```js
// May be standardized to Iterator.doubleEnded() in the future
function doubleEnded(g) {
  return function (...args) {
    const context = {}
    args.push(context)
    const iter = Reflect.apply(g, this, args)
    return {
      __proto__: IteratorPrototype,
      next() {
        context.method = "next"
        return iter.next()
      },
      nextLast() {
        context.method = "nextLast"
        return iter.next()
      },
      return(v) { return iter.return(v) },
    }
  }
}
const IteratorPrototype = function *() {}.prototype.__proto__.__proto__
```

Some future plan
- Align with iterator helpers proposal
- Experimental babel implementation for syntax
- Experimental built-ins polyfills
- Experimental double-ended iterator helpers polyfills
- Collect feedbacks
- Spec draft

Discussion...

Thank you!
