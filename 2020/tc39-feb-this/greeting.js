class Greeting {
	constructor(name) {
		this.name = name
	}
	hello() {
		alert(`Hello ${this.name || 'world'}!`)
	}
}
Array.from(document.querySelectorAll('input'))
	.map(e => [e, new Greeting(e.value)])
	.forEach(([e, {hello}]) => e.addEventListener('click', hello))
