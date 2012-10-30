importScripts('op.js')

function match(result) { return Math.abs(result - 24) < 1e-12 }

function comparator(a, b) { return a - b }

function calc(operands) {
	
	operands.sort(comparator)
	
	var solutions = []
	
	for (var ai = 0; ai < operands.length - 1; ai++)
	for (var bi = ai + 1; bi < operands.length; bi++) {
		
		var a = operands[ai], b = operands[bi]
		
		var rest = operands.concat()
		rest.splice(bi, 1)
		rest.splice(ai, 1)
		
		for (var ops = Object.keys(operations), i = 0; i < ops.length; i++) {
			var op = ops[i]
			var r = operations[op](a, b)
			if (r < 0) {
			}
			var s = operators[i].replace(/\ba\b/, a).replace(/\bb\b/, b) + ' = ' + r
			
			//postMessage([r, rest])
		
			if (rest.length > 0) {
				var sol = calc([r].concat(rest))
				sol.forEach(function(e){
					e.unshift(s)
				})
				solutions = solutions.concat(sol)
			} else {
				if (match(r)) {
					solutions.push([s])
				}
			}
		}
	}
	return solutions
}

onmessage = function(evt) {
	
	postMessage( calc(evt.data) )
	
}

