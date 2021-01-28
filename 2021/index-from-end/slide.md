`a[^i]` syntax for Stage 1
--------------------------------------------------------
<div><ruby>贺师俊<rp>（</rp><rt>HE Shi-Jun</rt><rp>）</rp></ruby> @hax <small>Jan 2021 TC39</small></div>

```js
let a = [1, 2, 3]
\
a[^1] // 3
\
++a[^1]
a // [1, 2, 4]
```

- Borrowed from C# 8 but keep minimal
- `a[^i]` roughly same as `a[a.length - i]`
- Semantic: `a[LengthOfArrayLike(a) - Number(i)]`

Motivations
- Same as `.at()`
- Revive slice notation proposal


For many years, programmers have asked for the ability
to do "negative indexing" of JS Arrays, like you can
do with Python. That is, **asking for the ability to**
**write arr[-1] instead of arr[arr.length-1]**, where
negative numbers count backwards from the last element.
----------------------------------------------------------------
[https://github.com/tc39/proposal-relative-indexing-method#rationale](https://github.com/tc39/proposal-relative-indexing-method#rationale)

- `a[-i]` (Python/Ruby, impossible in JS)
- `a[^i]` (syntax solution)
- `a.at(-i)` (prototype method solution)

Comparison

```js
a[a.length - 1] // currently
a[-1] // Python/Ruby...
a[^1] // C#, this proposal
a.at(-1) // .at() proposal
```

```js
a[a.length - 1] = v // currently
a[-1] = v // Python/Ruby...
a[^1] = v // C#, this proposal
// .at() is only for read
```

```js
a[a.length - 1] += v // currently
a[-1] += v // Python/Ruby...
a[^1] += v // C#, this proposal
a.setAt(-1, a.at(-1) + v) // imaginary .setAt()
```

- `a[^i]` for `Array`, `TypedArray` and all `ArrayLike`
- `a.at()` for `Array`, `TypedArray` and `String`

```js
let elements = document.querySelectorAll(selectors)
elements[^i] // work
elements.at(-i) // not work
```

Argument range

```js
let a = [1, 2, 3]
a[i], a[^i], a[a.length - i], a.at(-i), a.at(i)
```

<style>table#idx td {text-align:center}</style>
<table id=idx border=1>
	<tr><th><th>a[i]</th><th>a[^i]<th>a[a.length-i]<th>a.at(-i)<th>a.at(i)</tr>
	<tr><td>i=-3<td><td><td><td><td>1</tr>
	<tr><td>i=-2<td><td><td><td>3<td>2</tr>
	<tr><td>i=-1<td><td><td><td>2<td>3</tr>
	<tr><td>i=0<td>1<td><td><td>1<td>1</tr>
	<tr><td>i=1<td>2<td>3<td>3<td>3<td>2</tr>
	<tr><td>i=2<td>3<td>2<td>2<td>2<td>3</tr>
	<tr><td>i=3<td><td>1<td>1<td>1<td></tr>
</table>

Edge case of `-0`
What the intention of `a.at(-i)` if `i` is `0`?

```js
let v = a[a.length - i]
...
if (v !== undefined) {
	...
}
```

```js
let v = a.at(-i)
...
if (v !== undefined) {
	...
}
```

Learning, understanding
and memory cost

`a[^i]`
- not a "brand-new" syntax
- just a simple extensions of `a[i]`
- easy to infer the semantic

`a.at(i)`
- simple method
- "like `a[i]` but support negative index like `slice()`"
- NOT easy to infer the semantic

Which objects have `at()`?
- String?
- `arguments`?
- `document.body.classList`?
- Node.js `Buffer`?

Inconsistency with `a[i]`
- `a.at(1.1)`
- `a.at(NaN)`
- `a.at('not-a-number')`
- `a.at(0n)`

Confusion with `s.xxxAt()`
- `s.at(i)`
- `s.charCodeAt(i)`
- `s.charAt(i)`
- `s.codePointAt(i)`
- `s.at(i)` (old proposal)

Adoption cost
- `a[^i]`: need transpiling, not need runtime polyfill
- `a.at(i)`: not need transpiling, need runtime polyfill

Web compatibility
- `a[^i]`: no issue
- `a.at(i)`: “`.at()` might also be web incompatible for reasons yet unknown.”

`.at()` might also be web incompatible for reasons ~~yet unknown~~.
- Sugar.js add `Array.prototype.at` method (from 2011)
- core-js or other old `String.prototype.at` shims (from 2014)

[webcompat/sugar.html](webcompat/sugar.html)
```html
<!doctype html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sugar/1.3.9/sugar.min.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/sugar/0.9/sugar.min.js"></script> -->
<script>
var a = [10, 20, 30, 40]
test(0) // 10
test(-1) // 40
test(5) // 20
test(-5) // 40
test(1, 3, 5, 7) // 20,40,20,40
test(0.5) // undefined
function test(...args) {
	console.log(`a.at(${args}) // ${a.at(...args)}`)
}
</script>
```

[webcompat/core-js.html](webcompat/core-js.html)
```html
<!doctype html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/3.7.0/minified.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/0.2.0/core.min.js"></script> -->
<script>
const s = '👪'
console.log(s.at(0), s.at(-1))
</script>
```

Maybe lucky to not get incompatible report, but
- At least have known risks
- String case is very subtle
- Hard to detect web compatibility issues in China market

Summary of `a[^i]`:
- have slight better ergnomics
- much more general (mutate, ArrayLike)
- have simpler arg range (non-negative integers)
- no `-0` edge case
- semantic is easier to infer (follow `a[i]`)
- have lower learning/understanding/memory costs
- similar adoption cost
- no risk of web incompatibility

Consider the motivation of both proposals
**write arr[-1] instead of arr[arr.length-1]**
`a[^i]` give a better solution than `a.at(-i)`

Slice notation

```js
// current proposal
let a = [1, 2, 3, 4]
a[1:3] // [2, 3], same as a.slice(1, 3)
a[1:-1] // [2, 3], same as a.slice(1, -1)
```

No chance to advance, because
inconsistency semantic of `-1`
between `a[-1]` with `a[1:-1]`

Inconsistency semantic of `i`
between `a[i]` with `a[0:i]`
if `i` is a negative integer

Replace `-i` with `^i`
solve the problem, and

- `a[^i]` is better than `a.at()`
- `a[n:^m]` is much better than `a.slice()`

`-0` case is much worse in `slice()`

```js
function last_n_items(a, n) {
	return a.slice(-n) // or a[-n:] as current slice notation
}
last_n_items([1, 2, 3], 2) // [2, 3]
last_n_items([1, 2, 3], 0) // expect [], actually [1, 2, 3]
```

- https://github.com/rust-lang/rfcs/issues/2249#issuecomment-352128826
- https://stackoverflow.com/questions/39460528/-in-string-prototype-slice-should-slice0-0-and-slice0-0-output-the-sam/39461147
- https://stackoverflow.com/questions/31740252/when-use-negative-number-to-slice-a-string-in-python-0-is-disabled?noredirect=1&lq=1
- https://bytes.com/topic/python/answers/504522-string-negative-indices
- https://tesarek.me/articles/slicing-primer#indexing
- https://open.cs.uwaterloo.ca/python-from-scratch/2/9/transcript


```js
// drop n elments from start, drop m elements from end
a.slice(n, -m)
```

```js
m > 0 ? a.slice(n, -m) : a.slice(n)
```

```js
a.slice(n, fromEnd(m))
\
function fromEnd(i) {
	return i > 0 ? -i : undefined
}
```

In practice, programmers very likely simply
ignore the problem and cause potential bugs.

```js
// common patterns
a[0:n] // first n elements
a[^n:^0] // last n elements
a[n:^0] // without first n elements
a[0:^n] // without last n elements
a[0:^0] // all elements
a[n:^m] // without first n elements and last m elements
```

Prior Arts
- C# 8 `^fromEnd` (Note C# do not have compat issue of `a[-i]`)
- Raku (formerly Perl 6) drop Perl's `@a[-i]` and introduce `@a[*-i]`
- D `a[$-1]`

Negative index is problematical
Only `slice/splice` use negative index
`indexOf/lastIndexOf/findIndex` use `-1` for "not found"

Summary of `a[^i]`:
- have slight better ergnomics
- much more general (mutate, ArrayLike)
- have simpler arg range (non-negative integers)
- no `-0` edge case
- semantic is easier to infer (follow `a[i]`)
- have lower learning/understanding/memory costs
- similar adoption cost
- no risk of web incompatibility,
- help to revive slice notation

Discussion

Advance to Stage 1?
