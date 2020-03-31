Relax Hashbang Syntax
--------------------------------------------------------
<div> @hax, 360 Tech Group <small>April 2020 TC39</small></div>

Hashbang Grammar (Stage 3)
https://github.com/tc39/proposal-hashbang
```js
#!/usr/bin/env node
if (typeof window === 'object') {
	console.log('browser env')
} else {
	console.log('node env')
}
```
```sh
$ ./test.js          　
```
```html
<script src=test.js>
</script>
```

When hashbang only node.js trick, programmers only add hashbangs in node.js entry scripts
With the hashbang standardized, programmers may add hashbangs for all multi-env scripts
```js
#!/usr/bin/env node
if (isNodeEnv()) {
	openBrowser(htmlFileFor(__filename))
} else {
	// normal code for browser env
	// ...
}
```
```js
#!/usr/bin/env node
if (!isNodeEnv()) initNodeEmulator()
// normal code for node env
// ...
```

```html
<script src=test.js>
</script>
```
```html
<script>
<? include 'test.js' ?>
</script>
```
,
Oops, syntax error!

```html
<script>#!/usr/bin/env node
console.log('ok')
</script>
```
```html
<!-- Oops, syntax error! -->
<script>
#!/usr/bin/env node
console.log('ok')
</script>
```

Syntax Error because of
unintentional whitespaces

[Why only at the start of a Source Text](https://github.com/tc39/proposal-hashbang#why-only-at-the-start-of-a-source-text)
> There is no gain for the intended usage by allowing it in other places and in fact
> could lead to confusion since it would not be picked up by CLI environments.

Problem
[#18](https://github.com/tc39/proposal-hashbang/issues/18)

JS scripts in browsers may be
transformed in various ways

Programmers always have a simple belief:
Prepend/Append whitespaces/comments
will not change the behavior of my code,
(This is true from ES1 to ES2020, until hashbang proposal)

Simple transformations which normally do not use full-featured parser
- Adding copyrights and license at start
- Providing server information for debugging by prepending comments
- Function wrapping (eg. convert CommonJS to AMD/UMD)
- Simple concat of source files
- Not intentionally, but for a variety of reasons adding the newline/whitespace accidently

Stakeholders in production (ordered by timeline)
- Transformers authors (who never expect whitespaces/comments could cause syntax error)
- Operations team
- Script users
- Script authors (who may add hashbang in the future minor verions)

Not immediate problems
But protential risks

Proposed Solution:
Relax hashbang syntax
(make `#!` behave like `//` or `-->`)

Precedents
- BOM (treat BOM as whitespace)
- HTML comments

Alternative Solutions:
Make hashbang support optional (Let browsers do not support it)
So developers will keep only using hashbang in cli-only scripts

Discussion

Consensus?
