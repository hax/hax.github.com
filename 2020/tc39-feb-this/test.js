class A {
	static get process() {
		this.test()
		return console.log
	}
	static test() {
		console.log('A')
	}
}
class B extends A {
	static process(...args) {
		args.forEach(x => super.process(x))
	}
	static test() {
		console.log('B')
	}
}

B.process(1, 2)
B.process.call(null, 5, 6)
