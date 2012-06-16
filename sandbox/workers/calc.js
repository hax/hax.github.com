importScripts('op.js')
onmessage = function(evt) {
	postMessage('log: calc ' + evt.data)
	
	if (Array.isArray(evt.data)) {
		var operands = evt.data
		for (var ai = 0; ai < operands.length - 1; ai++)
		for (var bi = ai + 1; bi < operands.length; bi++) {
			var a = operands[ai], b = operands[bi]
			var rest = operands.concat()
			rest.splice(bi, 1)
			rest.splice(ai, 1)
			
			for (var i = 0; i < operations.length; i++) {
				var r = operations[i](a, b)
				var s = operators[i].replace('a', a).replace('b', b) + ' = ' + r
				var check = function(s){
					return function(evt) {
						if (evt.data.slice(0, 4) === 'log:') {
							postMessage(evt.data)
							return
						} else {
							postMessage(s + '\n' + evt.data)
						}
					}
				}(s)
				if (rest.length > 0) {
					var w = new SharedWorker('calc.js')
					w.onmessage = check
					w.postMessage([r].concat(rest))
				} else {
					if (Math.abs(r - 24) < Number.MIN_VALUE * 256) {
						postMessage(operators[i].replace('a', a).replace('b', b) + ' = 24')
					}
				}
			}
		}
	}
	//close()
	
}

