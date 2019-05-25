void function() {
'use strict' // for Chrome 47-

if (typeof fetch !== 'function') {
	alert('Sorry, your browser is too low!')
	return
}

takahashi(
	location.search.slice(1)
	|| getName(location.pathname)
	|| 'README'
)

function getName(path) {
	const filename = path.slice(path.lastIndexOf('/') + 1)
	const pos = filename.lastIndexOf('.')
	return pos === -1 ? filename : filename.slice(0, pos)
}

function takahashi(slideURL) {
	fetch(slideURL + '.md')
		.then(res => res.text())
		.then(parseContent)
		.then(createSlides)
		.then(startPresentation)
		.then(highlight)
}

function highlight() {
	if (window.Prism) Prism.highlightAll()
	else if (window.Rainbow) Rainbow.color()
}

function parseContent(text) {
	return text.split(/\n{2,}/).map(slideText => slideText.split(/\n/))
}

function createSlides(slides) {
	slides.forEach((slide, i) => {
		const slideDiv = document.createElement('div')
		slideDiv.id = i
		slideDiv.classList.add('slide')
		slideDiv.dataset.url = new URL('#' + i, document.URL)
		document.body.appendChild(slideDiv)
		const contentDiv = document.createElement('div')
		contentDiv.classList.add('slide-content')
		// if (slide[0].startsWith('.')) {
		// 	const classList = slide.shift().slice(1).split('.')
		// 	contentDiv.classList.add(classList)
		// }
		slideDiv.appendChild(contentDiv)
		let container = contentDiv, listType = null
		const listPatterns = {
			'*': /^\*\s+/,
			'-': /^-\s+/,
			'#': /^\d\.\s+/,
		}
		let codeBlock = false
		slide.forEach(line => {
			if (line.startsWith('```')) {
				if (!codeBlock) {
					codeBlock = true
					const pre = document.createElement('pre')
					container.appendChild(pre)
					container = document.createElement('code')
					pre.appendChild(container)
					const lang = line.slice(3)
					container.classList.add('language-' + lang)
					pre.classList.add('language-' + lang) // for Prism style consistent
				} else {
					codeBlock = false
					container = contentDiv
				}
				return
			}
			if (codeBlock) {
				container.textContent += (line !== '\\' ? line : '') + '\n'
				return
			}
			line = line.trim()
			if (line.startsWith('<!--')) {
				line = line.slice(4)
				if (line.endsWith('-->')) line = line.slice(0, -3)
				if (!container.dataset.comments) container.dataset.comments = line
				else container.dataset.comments += '\n' + line
				return
			}
			line = line.replace(/^#+\s+/, '')
			if (listType) {
				if (listPatterns[listType].test(line)) {
					line = line.replace(listPatterns[listType], '')
				} else {
					listType = null
					container = contentDiv
				}
			}
			if (!listType) {
				for (const t of Object.keys(listPatterns)) {
					const re = listPatterns[t]
					if (re.test(line)) {
						listType = t
						const list = document.createElement(t === '#' ? 'ol' : 'ul')
						if (t === '#') list.start = parseInt(line)
						container.appendChild(list)
						container = list
						line = line.replace(listPatterns[listType], '')
						break
					}
				}
			}
			const lineDiv = document.createElement(listType ? 'li' : 'div')
			if (line.endsWith(',')) {
				line = line.slice(0, -1)
				lineDiv.classList.add('comma')
			}
			const m = /^(!?)\[(.*?)\]\((.*?)\)/.exec(line)
			if (m) {
				if (m[1]) {
					const img = document.createElement('img')
					img.alt = m[2]
					img.src = m[3]
					lineDiv.classList.add('replaced')
					lineDiv.appendChild(img)
				} else {
					const a = document.createElement('a')
					a.innerHTML = m[2]
					a.href = m[3]
					lineDiv.appendChild(a)
				}
			} else {
				const tokens = line.split(/(`|\*\*|\*|~~)(?=\S)(.*?\S)\1/g)
				for (let i = 0; i < tokens.length; ++i) {
					let node
					switch (tokens[i]) {
						case '`': node = document.createElement('code'); break
						case '**': node = document.createElement('strong'); break
						case '*': node = document.createElement('em'); break
						case '~~': node = document.createElement('s'); break
						default: node = tokens[i]
					}
					if (node.nodeType === 1) {
						node.innerHTML += tokens[++i]
						lineDiv.appendChild(node)
					} else {
						lineDiv.innerHTML += node
					}
				}
			}
			container.appendChild(lineDiv)
		})
	})
}

function startPresentation() {
	const controls = document.createElement('div')
	controls.classList.add('controls')
	controls.style.position = 'fixed'
	controls.style.bottom = '0'
	controls.style.left = '0'
	controls.style.right = '0'
	controls.style.color = 'gray'
	controls.style.opacity = '0.8'
	controls.innerHTML = '<button class="prev" style="width: 38%; height: 48px">&lt;</button><button class="next" style="width: 61%; height: 48px">&gt;</button>'
	document.body.appendChild(controls)
	controls.addEventListener('click', event => {
		if	(event.target.matches('button.next'))	nextSlide()
		else if	(event.target.matches('button.prev'))	prevSlide()
	})

	initSlide()
	window.onhashchange = initSlide
	window.onpopstate = e => {
		gotoSlide(parseInt(e.state))
	}
	window.onkeydown = kbEvent => {
		console.log(kbEvent.key, kbEvent.keyIdentifier, kbEvent.keyCode)
		if (kbEvent.key) {
			switch (kbEvent.key) {
				case 'ArrowRight':	case 'ArrowDown':	case 'PageDown':	nextSlide();	hideControls();	break
				case 'ArrowLeft':	case 'ArrowUp':	case 'PageUp':	prevSlide();	hideControls();	break
				case 'E': document.body.classList.toggle('eva'); break
			}
		} else if (kbEvent.keyIdentifier) {
			switch (kbEvent.keyIdentifier) {
				case 'Right':	case 'Down':	nextSlide();	hideControls();	break
				case 'Left':	case 'Up':	prevSlide();	hideControls();	break
				case 'E': document.body.classList.toggle('eva'); break
			}
		} else {
		}
	}
}

function hideControls() {
	document.querySelector('div.controls').style.opacity = '0'
}

function initSlide() {
	if (gotoSlide(parseInt(location.hash.slice(1))) || gotoSlide(0)) updateState()
}

function current() {
	return document.querySelector('.current.slide')
}

function gotoSlide(i) {
		const slide = document.querySelectorAll('.slide')[i]
		if (!slide) return false
		return showSlide(i, slide, current())
}

function nextSlide() {
	const curr = current()
	const c = curr.querySelector('.comma')
	if (c) {
		c.classList.remove('comma')
		return
	}
	const next = curr.nextElementSibling
	if (next && next.matches('.slide')) showSlide(slideIndex + 1, next, curr) && updateState()
}

function prevSlide() {
	const curr = current()
	const prev = curr.previousElementSibling
	if (prev && prev.matches('.slide')) showSlide(slideIndex - 1, prev, curr) && updateState()
}

function showSlide(index, element, old) {
	const e = new CustomEvent('slide', {
		bubbles: true,
		cancelable: true,
		detail: {from: slideIndex, to: index},
	})
	if (!element.dispatchEvent(e)) return false

	if (old) old.classList.toggle('current')
	element.classList.toggle('current')
	slideIndex = index
	adjustCurrentSlide()
	document.documentElement.dataset.slideIndex = slideIndex
	return true
}

let slideIndex
function updateState() {
	history.replaceState(slideIndex, '', `#${slideIndex}`)
}

function adjustCurrentSlide() {
	adjustSlide(current())
}

function isReplacedElement(e) {
	return e.matches('img, canvas, picture, video, embed, iframe, object')
		&& e.width != 0 && e.height != 0
}

function adjustSlide(curr) {
	const w = curr.clientWidth
	const h = curr.clientHeight
	const c = curr.querySelector('.slide-content')
	const s = c.style

	s.visibility = 'hidden'
	s.transform = null

	for (const e of c.children) {
		if (isReplacedElement(e)) {
			e.style.width = w + 'px'
		} else if (c.childElementCount > 1) {
			e.style.fontSize = '1rem'
			e.style.fontSize = `${w / e.scrollWidth}rem`
		}
	}

	const scale = Math.min(h / c.clientHeight, w / c.clientWidth)
	// const dx = (w - curr.scrollWidth * scale) / 2
	// const dy = (h - curr.scrollHeight * scale) / 2
	// curr.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`

	s.transform = `translate(-50%, -50%) scale(${scale}) `
	s.visibility = null
}

window.onresize = adjustCurrentSlide

matchMedia('print').onchange = mql => {
	if (mql.matches) {
		document.querySelectorAll('.slide').forEach(adjustSlide)
	}
}

}()
