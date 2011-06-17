'use strict'

new function () {
	
	function fireSimpleEvent(type, target, option) {
		if (!target) target = document
		if (!option) option = {}
		var evt = document.createEvent('Event')
		evt.initEvent(type, !!option.bubbles, !!option.cancelable)
		return target.dispatchEvent(evt)
	}
	
	if (!('fullScreen' in window)) Object.defineProperty(window, 'fullScreen', {
		get: function() {
			/*console.debug(screen.width, screen.height,
				screen.availWidth, screen.availHeight,
				window.outerWidth, window.outerHeight,
				window.innerWidth, window.innerHeight)*/
			return (screen.width == window.outerWidth && screen.height == window.outerHeight)
		}
	})
	var _fullScreen = window.fullScreen
	if (!('onfullscreenchange' in window)) window.addEventListener('resize', function() {
		var f = window.fullScreen
		if (f != _fullScreen) {
			_fullScreen = f
			fireSimpleEvent('fullscreenchange', document, {bubbles:true})
		}
	}, false)
	
	if (!document.enableStyleSheetsForSet) document.enableStyleSheetsForSet = function(name) {
		if (name != null) {
			var meta = document.querySelector('meta[http-equiv="default-style"]')
			if (!meta) {
				meta = document.createElement('meta')
				meta.httpEquiv = 'default-style'
				document.head.appendChild(meta)
			}
			meta.content = name
		}
	}
	
	var current
	
	window.addEventListener('DOMContentLoaded', reset, false)
	window.addEventListener('fullscreenchange', reset, false)
	//window.addEventListener('hashchange', reset, false)
	window.addEventListener('popstate', function(evt) {
		console.log('popstate', evt.state)
		var index = evt.state ? evt.state.index : getSlideIndex()
		if (index && current != index) gotoSlide(index)
	}, false)
	
	function reset(evt) {
		console.debug(evt.type)
		
		if (window.fullScreen) {
			if (current == null) gotoSlide(getSlideIndex() || 0)
			playSlides()
		} else {
			stopSlides()
		}
		
	}
	
	function getSlideIndex() {
		return parseInt(location.hash.slice(1))
	}
	
	function playSlides() {
		console.debug('play')
		document.enableStyleSheetsForSet('slides')	
		window.addEventListener('keydown', keyboardHandler, false)
		window.addEventListener('click', mouseHandler, false)
	}
	function stopSlides() {
		console.debug('stop')
		document.enableStyleSheetsForSet('')
		window.removeEventListener('keydown', keyboardHandler, false)
		window.removeEventListener('click', mouseHandler, false)
	}
	
	function keyboardHandler(evt) {
		var key = evt.key || evt.keyIdentifier || keyCodeToName(evt.keyCode)
		switch (key) {
			case 'PageUp': case 'Left':
				prev()
				break
			case 'PageDown': case 'Right':
				next()
				break
			case 'Home':
				first()
				break
			case 'End':
				last()
				break
		}
		
	}
	function mouseHandler(evt) {
		next()
	}
	
	function prev() {
		go(current - 1)
	}
	function next() {
		go(current + 1)
	}
	function first() {
		go(0)
	}
	function last() {
		go(-1)
	}
	function go(n) {
		if (gotoSlide(n))
			history.pushState({index:n}, '', '#' + n)
	}
	function gotoSlide(n) {
		console.debug('slide', current, '->', n)
		var slides = getSlides()
		if (n < 0) n += slides.length
		if (n >= 0 && n < slides.length) {
			var old = document.getElementsByClassName('current')[0]
			if (old) old.classList.remove('current')
			slides[n].classList.add('current')
			current = n
			console.debug('current slide is', current)
			return true
		} else {
			console.debug('failed to goto slide', n, 'in', slides)
			return false
		}
	}
	
	function getSlides() {
		return document.querySelectorAll('header, section, footer, .slide')
	}
	
	var KeyName = {
		33: 'PageUp',
		34: 'PageDown',
		35: 'End',
		36: 'Home',
		37: 'Left',
		38: 'Up',
		39: 'Right',
		40: 'Down',
	}
	function keyCodeToName(code) {
		console.debug('key code:', code)
		return KeyName[code] || 'Unknown'
	}
}