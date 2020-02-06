class Greeting {
	constructor(name) {
		this.name = name
	}
	hello() {
		alert(`Hello ${this.name || 'world'}!`)
	}
}
Array.from(document.getElementById('myForm').elements)
	.map(e => [e, new Greeting(e.value)])
	.forEach(([e, {hello}]) => e.addEventListener('click', hello))
