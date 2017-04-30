import bar from './bar.js'

export default function foo(s = '') {
	if (s.length > 100) {
		throw new Error()
	}
	else return bar(s + '\nfoo!')
}