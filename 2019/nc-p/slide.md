Nullish Coalescing Precedence Issue

https://github.com/tc39/proposal-nullish-coalescing/issues/58

- Low Precedence (effectively same as `||` by forcing parens for mix of `||` and `&&`)
- High Precedence ([higher than `**`](https://github.com/tc39/proposal-nullish-coalescing/issues/26#issuecomment-511344028))
- Forcing parentheses for mix of `**` to `? :` (allow us postpone precedence decision to future)

Precedence Issue

Developer Experience Issue

Differnt type of developers

- precedence is arbitary, don't care about it (it's programmer's duty)
- precedence is evil (forcing parens everywhere)
- precedence is mostly evil (forcing parens except well-known operators: +-*/)
- precedence should be optimized for most use cases (need protection for bad cases)
- precedence should be optimized/limited for special cases (TC39 position?)

Precedents:
- `yield` vs `await`
- -a ** b
- a && b ?? c
- `|>` [#23](https://github.com/tc39/proposal-pipeline-operator/issues/23) [#104](https://github.com/tc39/proposal-pipeline-operator/issues/104) ...

We should make decision for last two types of developers:
- ~precedence is arbitary, don't care about it (it's programmer's duty)~
- ~precedence is evil (forcing parens everywhere)~
- ~precedence is mostly evil (forcing parens except well-known operators: +-*/)~
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

- Parens: `(a + b) ?? c` `a + (b ?? c)`
- Low:    ` a + b  ?? c` `a + (b ?? c)`
- High:   `(a + b) ?? c` `a +  b ?? c `

- Parens: `a + (b ?? c)`
- Low:    `a + (b ?? c)`
- High:   `a +  b ?? c `

All binary operators except `&&` `||`
`**` `*` `/` `%` `+` `-` `<<` `>>` `>>>` `<` `<=` `>` `>=`
`in` `instanceof` `==` `!=` `===` `!==` `&` `^` `|`
never produce nullish value

Low == Forcing parens (deoptimized for all cases)

Especially bad for Kotlin/Swift background developers
`foo ?? defaultFoo === bar ?? defaultBar`

Low precedence (effectively same as `||`) is optimized
for migration from `||` (poor man's `??`) to real `??`

Already have parens, no difference
`a + (b || c)` => `a + (b ?? c)`
`(a + b) || c` => `(a + b) ?? c`

What about `a || b + c`?

if `a` is boolean/number/string
UNSAFE to do naive replacement
Developers SHOULD check logic and test edge cases

if `a` is object
safe, but ...

`obj || defaultObj`

`a [binop] b` never produce object

Conclusion

Low precedence
- deoptimized for all cases of `a [op] b ?? c`
- no difference with high precedence for safe cases
- "optimized" for unsafe cases
- need to keep forbiding mix `??` and `&&` `||` for ever

High precedence
- optimized for all cases of `a [op] b ?? c`
- no difference with low precedence for safe cases
- "deoptimized" for unsafe cases
- allow us eventually remove the limitation of `&&` `||`

Forcing parens
- Postpone the decision
- Wait for tools mature

My apologize for too late to bring the concern
- Unwilling to block a very wanted feature
- Misunderstanding of the status of the issue
- Misjudged the progress of the tools and the implementation choice of TS
- Can only collect more user feedbacks after implementation (especially TS) available
