var operators = [
	'a + b',
	/*'a - b',
	'a * b',
	'a / b',
	'b - a',
	'b / a'*/
]

var operations = []

for (var i = 0; i < operators.length; i++) {
	operations[i] = new Function('a', 'b', 'return ' + operators[i])
}