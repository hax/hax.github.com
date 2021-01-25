Ergonomic brand checks for Private Fields
https://github.com/tc39/proposal-private-fields-in-in
进入stage 3的步伐被我block了3次

Brand
TC39的黑话

```js
// private fields in in 的例子
class C {
	#brand
	static isC(obj) {
		return #brand in obj
	}
}
\
C.isC(new C()) // true
C.isC(Object.create(C.prototype)) // false
new C() instanceof C // true
Object.create(C.prototype) instanceof C // true
```

为什么需要 isC？

```js
// 我给一个更贴地气的例子
class X {
	#x
	constructor(x) { this.#x = x }
	equals(o) {
		return this.#x = o.#x
	}
}
let a = new X(1)
let b = new X(2)
a.equals(a) // true
a.equals(b) // false
a.equals(1) // throw TypeError!
```

```js
class X {
	#x
	constructor(x) { this.#x = x }
	equals(o) {
		if (!(o instanceof X)) return false
		return this.#x === o.#x
	}
}
```

```js
class X {
	#x
	constructor(x) { this.#x = x }
	equals(o) {
		if (!(IsRealInstanceOf(o, X))) return false
		return this.#x === o.#x
	}
}
```

定义 real instance of？

o是类X的「真实例」，意指o是经由
类X所构造的对象，具有类X所声明
的所有外部接口和内部实现细节。

注意：这不是一个「底层机制」级别的
定义，而是一个「高层意图」的定义。

问题：JS现有的class底层机制（原型）
不能100%映射到OOP的意图，存在gap。

```js
#x
static isX(obj) {
	try {
		obj.#x
		return true
	} catch {
		return false
	}
}
```

滥用底层机制
凑活高层意图

```js
get #x() { ... }
static isX(obj) {
	try {
		obj.#x
		return true
	} catch {
		return false
	}
}
```

```js
static isC(obj) {
	return #x in obj
}
```

看似解决问题
实则仍是
滥用底层机制

```js
class X {
	x
	constructor(x) { this.x = x }
	equals(o) {
		if (???) return false
		return this.x === o.x
	}
}
```

```js
class X {
	#x
	get x() { return this.#x }
	set x(v) { this.#x = v }
	constructor(x) { this.x = x }
	equals(o) {
		if (!(#x in o)) return false
		return this.x === o.x
	}
}
```

程序员被引诱使用
private field，
即使本不需要。

- performance变化
- semantic变化

即使本来就已经用了private fields

```js
class C {
	#x
	#y
	equals(o) {
		if (!(#x in o)) return false
		// if (!(#x in o && #y in o)) return false
		return this.#x === o.#x && this.#y === o.#y
	}
	static readX(o) {
		if (!(#x in o)) return null
		// if (!(#x in o && #y in o)) return null
		return o.#x
	}
}
```

- 不加：概念上不准确、存在理论上的bug
- 加：维护成本
- 看情况：心智成本

最终的「Best practice」很可能是：

```js
class C {
	#x
	#y
	static #isX(o) {
		return #x in o && #y in o
	}
	equals(o) {
		if (!(X.#isX(o))) return false
		return this.#x === o.#x && this.#y === o.#y
	}
	static readX(o) {
		if (!(X.#isX(o))) return false
		return o.#x
	}
}
```

```js
class C {
	#x
	#y
	#brand // for brand check, must be the last one, don't touch it!
	equals(o) {
		if (!(#brand in o)) return false
		return this.#x === o.#x && this.#y === o.#y
	}
	static readX(o) {
		if (!(#brand in o)) return null
		return o.#x
	}
}
```

无论哪一种其实都说明一个问题
基于单个private fields的存在
检测是一种底层机制，用于表达
程序员的高层意图是不合适的。


替代方案

```js
class C {
	equals(o) {
		if (!(class.hasInstance(o))) return false
		return ...
	}
	static readX(o) {
		if (!(class.hasInstance(o))) return null
		return ...
	}
}
```

```js
class C {
	static [Symbol.hasInstance](o) {
		return class.hasInstance(o)
	}
}
```

讨论

是否两者都需要

```js
private #shared
\
class X {
	outer #shared
}
class Y {
	outer #shared
}
```

```js
let o
\
class A {
	constructor() {
		x = this
	}
}
class B extends A {
	#x
	#y = throwError()
}
try { new B() } catch {}
o // only have #x but no #y
```
