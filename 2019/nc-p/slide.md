Nullish Coalescing Precedence Issue

https://github.com/tc39/proposal-nullish-coalescing/issues/58

- Low Precedence <br>(effectively same as `||` by forcing parens for mix of `??` and `||`/`&&`)
- [High Precedence <br>(higher than `**`)](https://github.com/tc39/proposal-nullish-coalescing/issues/26#issuecomment-511344028)
- Forcing parentheses for mix of `??` and others from `**` to `? :` <br>(allow us postpone precedence decision to future)

Precedence Issue

Developer Experience Issue

Different type of developers

- precedence is arbitary, don't care about it (it's programmer's duty)
- precedence is evil (forcing parens everywhere)
- precedence is mostly evil (forcing parens except well-known operators: +-*/)
- precedence should be optimized for most use cases (need protection for bad cases)
- precedence should be optimized/limited for special cases (TC39 position?)

Precedents:

- `yield` vs `await`
- -a ** b
- a && b ?? c
- `|>` #23 #104 ...

We should make decision for last two types of developers:
- ~~precedence is arbitary, don't care about it (it's programmer's duty)~~
- ~~precedence is evil (forcing parens everywhere)~~
- ~~precedence is mostly evil (forcing parens except well-known operators: +-*/)~~
- precedence should be optimized for most use cases (need protection for bad cases)
- precedence should be optimized/limited for special cases (TC39 position?)

- Forcing parentheses
- Low Precedence
- High Precedence

No difference in these cases
- `a = foo ?? bar`
- `await foo ?? bar`
- `yield foo ?? bar`
- `a?.b ?? c.d()`

`a + b ?? c`

- Parens: `(a + b) ?? c` vs `a + (b ?? c)`
- Low: &nbsp; &nbsp; &nbsp; `a + b  ?? c` vs `a + (b ?? c)`
- High: &nbsp;&nbsp;`(a + b) ?? c` vs `a +  b ?? c`

- Parens: `a + (b ?? c)`
- Low: &nbsp;&nbsp; `a + (b ?? c)`
- High: &nbsp; `a +  b ?? c`

All binary operators except `&&` `||`
`**` `*` `/` `%` `+` `-` `<<` `>>` `>>>` `<` `<=` `>` `>=`
`in` `instanceof` `==` `!=` `===` `!==` `&` `^` `|`
never produce nullish value

Low == Forcing parens (deoptimized for all cases)

Especially bad for Kotlin/Swift background developers
`foo ?? defaultFoo === bar ?? defaultBar`

Low precedence (effectively same as `||`) is optimized
for migration from `||` (poor man's `??`) to real `??`

`a [op] b || c` ≠> `(a [op] b) ?? c`

Already have parens, no difference
`a [op] (b || c)` => `a [op] (b ?? c)`
`a || (b [op] c)` => `a ?? (b [op] c)`

What about `a || b [op] c`?

if `a` is boolean/number/string
UNSAFE to do naive replacement
Developers SHOULD check logic and test edge cases

if `a` is object
safe, but ...

`obj || defaultObj`

`a [binop] b` never produce object

Conclusion

Low precedence &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
- deoptimized for all cases of `a [op] b ?? c`
- no difference with high precedence for safe cases
- "optimized" for unsafe cases
- need to keep forbiding mix `??` and `&&` `||` for ever

High precedence &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
- optimized for all cases of `a [op] b ?? c`
- no difference with low precedence for safe cases
- "deoptimized" for unsafe cases
- allow us eventually remove the limitation of `&&` `||`

Forcing parens &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
- Postpone the decision
- Wait for tools mature

My apologize for too late to bring the concern
- Unwilling to block a very wanted feature
- Misunderstanding of the status of the issue
- Misjudged the progress of the tools and the implementation choice of TS
- Can only collect more user feedbacks after implementation (especially TS) available
