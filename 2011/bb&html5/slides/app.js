'use strict'
new function () {
	
	console.log(document.styleSheets.length)
	console.log(document.querySelectorAll('link[rel~="stylesheet"]').length)
	if (!document.enableStyleSheetsForSet) document.enableStyleSheetsForSet = function(name) {
		if (name != null) {
			for (var i = 0, sheets = this.styleSheets, n = sheets.length; i < n; i++) {
				var s = sheets[i]
				if (s.title) s.disabled = name != s.title 
				//console.log(n, s.type, s.href, s.title, s.disabled)
			}
		}
	}
	
	document.enableStyleSheetsForSet('slides')
	
	if (!('addEventListener' in window) || !('onpopstate' in window))  return
	window.addEventListener('popstate', function(evt) {
		console.log('popstate', evt.data)
	}, false)
	var current = 0
	
	window.addEventListener('keydown', function(evt) {
		var key = evt.key || evt.keyIdentifier || keyCodeToName(evt.keyCode)
		switch (key) {
			case 'PageUp': case 'Left':
				prev()
				break
			case 'PageDown': case 'Right':
				next()
				break
		}
		
	}, false)
	
	function prev() {
	}
	function next() {
	}
	function go(e) {
		history.pushState({section:e.id}, '', '#' + e.id)
	}
}