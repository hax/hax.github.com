import foo from './foo.js'

export default function bar(s) {
	return foo(s + '\nbar!')
}