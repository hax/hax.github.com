var AdditiveResults = OperationType(0, {
	'+': function (a, b) { return a + b },
	'-': function (a, b) { return a - b }
})
var products = OperationType(1, {
	'¡Á': function (a, b) { return a * b },
	'¡Â': function (a, b) { return a / b }
})
var exponents = BinaryOperators({
	'a<sup>b</sup>': function (a, b) { return Math.pow(a, b) },
	'<sup>b</sup>¡Ì£þa£þ': function (a, b) { return Math.pow(a, 1/b) },
	'log<sub>a</sub>b': function(a, b) { return Math.log(b) / Math.log(a) }
})

function BinaryOperators(operations) {
	return function (operands) {
		var results = [],
			expressions = []
	}
}

function OperationType(initialValue, operations) {

	return function (operands) {
		var results = [initialValue],
			expressions = ['']
		for (var i = 0; i < operands.length; i++) {
			var x = operands[i]
			var rs = [], es = []
			for (var j = 0; j < results.length; j++) {
				var r = results[j], e = expressions[j]
				var r1 = r + x, r2 = r - x
				if (rs.indexOf(r1) === -1) {
					rs.push(r1)
					es.push(e + ' + ' + x)
				}
				if (rs.indexOf(r2) === -1) {
					rs.push(r2)
					es.push(e + ' - ' + x)
				}
			}
			results = rs
			expressions = es
		}
		for (var i = 0; i < expressions.length; i++) {
			var e = expressions[i]
			var pos = e.indexOf(' + ')
			if (pos >= 0) {
				expressions[i] = e.slice(pos + 3) + e.slice(0, pos)
			} else {
				delete results[i]
				delete expressions[i]
			}
		}
		return [results, expressions]
	}

}
/*
a^b^c = a^c^b = a^(b*c)
log a b ^ c = log a (b ^ c)

(log a b) * c = log a (b^c) = log cVa c
(log a b) / c = log a (cVb) = log a^c b
c * (log a b) = c / (log b a)


2^3^4 = 2^4^3 2^12
*/