'use strict'

var operations = [
	function (operands) {
		var results = [{val:0, exp:''}]
		for (var i = 0; i < operands.length; i++) {
			var x = operands[i]
			var rs = []
			for (var i = 0; i < results.length; i++) {
				var r = results[i]
				rs.push(
					{val: r.val + x, exp: r.exp + ' + ' + x},
					{val: r.val - x, exp: r.exp + ' - ' + x}
				)
			}
			results = rs
		}
		for (var i = 0; i < results; i++) {
			var r = results[i]
			var pos = r.exp.indexOf(' + ')
			if (pos >= 0)
				r.exp = r.exp.slice(pos + 3) + r.exp.slice(0, pos)
			else
				delete results[i]
		}
		return results
	},
	function (a, b) {
		return a >= b ? [a - b, 'a - b'] : [b - a, 'b - a']
	},
	function (a, b) {
		return [a * b, 'a × b']
	},
	function (a, b) {
		return [a / b, 'a ÷ b']
	},
	function (a, b) {
		return [b / a, 'b ÷ a']
	},
	function (a, b) {
		return [Math.pow(a, b), 'a<sup>b</sup>']
	},
	function (a, b) {
		return [Math.pow(b, a), 'b<sup>a</sup>']
	},
	function (a, b) {
		return Math.pow(a, 1/b)
		'<sup>b</sup>√￣a￣'
	},
	'<sup>a</sup>√￣b￣': function (a, b) { return Math.pow(b, 1/a) },
	'log<sub>b</sub>a': function(a, b) { return Math.log(a) / Math.log(b) },
	'log<sub>a</sub>b': function(a, b) { return Math.log(b) / Math.log(a) }
]


