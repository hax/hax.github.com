# Slice notation (Stage 1) Update
# & Index from end for Stage 1
--------------------------------------------------------
<div><ruby>贺师俊<rp>（</rp><rt>HE Shi-Jun</rt><rp>）</rp></ruby> @hax <small>Nov 2023 TC39</small></div>

- Slice Notation (`a[start:end]`)
- Index from End (`a[^index]`) 

Recap of Slice Notation Proposal
- [proposal repo](https://github.com/tc39/proposal-slice-notation)
- [last presented slides](https://docs.google.com/presentation/d/1EBpiGuYn2ChDvcd67fpz6gGY14kO8VCuAKOhFMxOqEQ)

Stage1 @ TC39 meeting on March 22, 2018
Champion/Author: Sathya Gunasekaran (SGN)
```ts
let a = [1, 2, 3]
a[0:2] // [1, 2]
a[0:-1] // [1, 2]
```

TC39 meeting on July 21, 2020
No Advanced, main Concerns:
- Jordan Harband: string support, will block stage 3 if isn’t resolved.
- Bradford C. Smith: string slicing -- Unicode code points vs code units.
- Yulia Startsev: whether the ergonomic benefits are sufficient to syntax.
- Waldemar Horwat: emphasized the importance of language orthogonality.
- Shu-yu Guo: inconsistency with current bracket indexing. (a[-1] vs a[-1:])

Recap of Index from End Proposal
- [proposal repo](https://github.com/hax/proposal-index-from-end)
- [last presented slides](https://johnhax.net/2021/index-from-end/slide#0)

TC39 meeting on January 28, 2021
Champion/Author: HE Shi-Jun (hax)
```ts
let a = [1, 2, 3]
a[^1] // 3
++a[^1] // 4
```
Not advanced, should align with slice notation first

- Champions agreed with the direction
- Hax champion both proposals
- Hope the committee will agree the direction and allow stage 1

Potential follow-up proposal
```ts
let a = [1, 2, 3, 4]
a[1:3] // [2, 3]
a[1:3] = [0, 0]
a // [1, 0, 0, 4]
```

Problems

Clarity and Consistency of Parameter Semantics
- Index or length?
- `slice/splice` inconsistent
- Note: linter/type check does not help
- Not easy to discover the mistake

Negative index
- Inconsistant with `a[i]`
- Not all methods support neg index
- Inconsistant: `array.indexOf/includes` vs `string.indexOf/includes`
- `indexOf/lastIndexOf/findIndex/findLastIndex` returns `-1`

[github.com/microsoft/vscode/src/vs/code/node/cli.ts](https://github.com/microsoft/vscode/blob/3dc8779a30910790358fa74d0e62792e2ba8a867/src/vs/code/node/cli.ts#L60)
```ts
const tunnelArgs = argv.slice(argv.indexOf(subcommand) + 1); // all arguments behind `tunnel`
```

Negative index
- Inconsistant with `a[i]`
- Not all methods support neg index
- Inconsistant: `array.indexOf/includes` vs `string.indexOf/includes`
- `indexOf/lastIndexOf/findIndex/findLastIndex` returns `-1`
- `-0` edge case

```ts
function last_n_items(a, n) {
    return a.slice(-n);
}
// Edge case with -0
last_n_items([1, 2, 3], 0); // expect [], actually [1, 2, 3]
```

- `a.slice(n, -m)` -- dropping the first n items and the last m items
- correct way: m > 0 ? a.slice(n, -m) : a.slice(n)

```ts
a.slice(n, fromEnd(m))
function fromEnd(i) {
  return i > 0 ? -i : undefined
}
```

Coercing behavior
- Illegal index: become 0
- bigint: throw

[Easy to made mistake, even MDN document](https://github.com/mdn/content/blob/main/files/en-us/web/javascript/reference/global_objects/string/slice/index.md?plain=1#L54)

Problems summarized
- Clarity and consistency of the semantics of parameters
- Negative index vs. `indexOf/findIndex` `-1`
- Negative index `-0` edge case
- Weird coercing behaviors

@alexweej: Aside, the fact that negative indices have a conceptually different 
meaning (“from the end”) leads to a hazard in Python whereby programs can have 
confusingly buggy behavior when integer arithmetic is used to compute indices… 
anything that involves index computation ends up creating a ‘reverse image’ of the sequence 
if bounds checking is not done to ‘null out’ out of bounds lookups. the static type system 
won’t help you because it’s perfectly valid as far as the type system is concerned…

Solution
- Index from end `a[^i]`, `a[^i] = value`
- Slice notation `a[i:j], a[^i:j], a[i:^j], a[^i:^j]`
- Future support for modifying arrays with slice notation

```ts
let a = [1, 2, 3]
a[^1] // 3
a[^1]++
a[^1] // 4
a[0:^1] // [1, 2]
a[1:^0] // [2, 4]
// follow-on proposal
a[0:2] = [6, 5]
a // [6, 5, 4]
```

Problem: Clarity and consistency of the semantics of parameters
Solution: a[i:j] uses square brackets, so clear it’s about index
and the colon suggests a symmetry on both sides (both indexes)

Problem: Negative index, `-1`, `-0` issues
Solution: `a[^i]`, `a[i:^j]` follow `a[i]`

Problem: Werid coercing behaviors
Solution: follow `a[i]`, not weird

- future `a[i:j] = items` to save `splice`
- better ergnomics, eg. `++a[^i]`

Other Issues and Concerns
- String slicing
- Should `^i` be a thing?

Discussion

- Do we agree the direction?
- If that, I will ask stage 1 for index from end proposal
- And update the explainer and spec for slice notation proposal soon
