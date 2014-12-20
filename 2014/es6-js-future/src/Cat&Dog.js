import Pet from './Pet'

export class Cat extends Pet {
	hi() {
		console.log('Meow~')
	}
}

export class Dog extends Pet {
	hi() {
		console.log('Woof~')
	}
}