`this` argument reflection of functions for Stage 1
--------------------------------------------------------
<div> @hax, 360 Tech Group <small>April 2020 TC39</small></div>

Last meeting
`thisArgumentExpected` data property of functions
- not clear on problem
- overworking on solution
- better to change proposal name

Problem

Both devs and framework authors
complain about `this`

Common mistakes
```js
window.addEventListener('click', obj.showName)
fetch(url).then(() => { ... }, logger.processError)
array.forEach(obj.method)
```

frameworks/libraries/devtools doesn't help
```js
$(e).on('click', obj.showName)
request(url).then(() => { ... }, logger.processError)
_(array).forEach(obj.method, obj)
render() {
	return <div onClick={this.handleClick}>click me</div>
}
```

Motivation:

Allow frameworks/libraries/devtools inspect
the intended usage of a function
if not match the expectation
report error in early stage and
provide better error/warning message

Possible solution:

```js
forEach(f, thisArg) {
	const a = this._array
	if (Function.expectThisArgument(f)) {
		if (thisArg == null) throw new Error('expect this argument')
		a.forEach(f, thisArg)
	} else {
		if (thisArg != null) throw new Error('not expect this argument')
		a.forEach(f)
	}
}
```

May be useful for future language feature

```js
// example from https://www.smashingmagazine.com/2018/10/taming-this-javascript-bind-operator/
const plus = x => this + x;
console.info(1::plus(1));
// "[object Window]1"
```

```js
const plus = x => this + x;
// if (!Function.expectThisArgument(plus)) throw new TypeError()
console.info(1::plus(1)); // throw TypeError
```

API options

- `func.thisArgumentExpected` (own data prop)
- `Function.prototype.thisArgumentExpected` (getter/setter)
- `Function.expectThisArgument(f)` (static method, #3)
- `Function.reflect(f): {apply: boolean, construct: boolean, thisArgumentExpected: boolean}` ([Reflect.isCallable() / Reflect.isConstructor()](https://github.com/caitp/TC39-Proposals/blob/master/tc39-reflect-isconstructor-iscallable.md))

Discussion

Consensus?
