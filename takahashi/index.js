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
	Prism.highlight.manual = true
	fetch(slideURL + '.md')
		.then(res => res.text())
		.then(parseContent)
		.then(createSlides)
		.then(startPresentation)
		.then(highlight)
}

function highlight() {
	if (window.Prism) {
		Prism.highlightAll()
		Prism.fileHighlight()
	} else if (window.Rainbow) {
		Rainbow.color()
	}
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
					const [lang, dataLine]= line.slice(3).split(/\s+/)
					container.classList.add('language-' + lang)
					pre.classList.add('language-' + lang) // for Prism style consistent
					// pre.classList.add('line-numbers')
					pre.dataset.line = dataLine
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

			// todo: deal with multiline comments!
			if (line.startsWith('<!--')) {
				line = line.slice(4)
				if (line.endsWith('-->')) line = line.slice(0, -3)
				if (!container.dataset.comments) container.dataset.comments = line
				else container.dataset.comments += '\n' + line
				return
			}

			if (/^<(\S+\b).*?>.*<\/\1>$/.test(line)) {
				container.innerHTML += line
				return
			}

			if (/^-{3,}$/.test(line)) {
				container.innerHTML += `<div class="hr">${line}</div>`
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
			parseImageOrLink(line, lineDiv)
			container.appendChild(lineDiv)
		})
	})
}

function parseImageOrLink(s, container) {
	const m = /^(!?)\[(.*?)\]\((.*?)\)/.exec(s)
	if (!m) {
		parseInline(s, container)
		return
	}
	if (m[1]) {
		const img = document.createElement('img')
		img.alt = m[2]
		img.src = m[3]
		container.classList.add('replaced')
		container.appendChild(img)
	} else if (/^sample:/.test(m[2])) {
		// const [, lang, lines] = /([^./#?]*)(#.*)?$/.exec(m[3])
		const pre = document.createElement('pre')
		container.appendChild(pre)
		pre.dataset.src = m[3]
		console.log(pre)

		// fetch(m[3]).then(res => res.text()).then(text => {
		// 	console.log(lang, text)
		// 	const pre = document.createElement('pre')
		// 	c.appendChild(pre)
		// 	const code = document.createElement('code')
		// 	pre.appendChild(code)
		// 	code.textContent = text
		// 	code.classList.add('language-' + lang)
		// 	pre.classList.add('language-' + lang) // for Prism style consistent
		// })
	} else {
		const a = document.createElement('a')
		a.href = m[3]
		container.appendChild(a)
		parseInline(m[2], a)
	}
}

function parseInline(s, container) {
	// let tokens = s.split(/(`+)(.*?)\1/g)
	// if (tokens.length === 1)
	let tokens = s.split(/((?:\*\*?|~~)(?=\S)|(?:`+))(.*?\S)\1/g)
	if (tokens.length === 1) {
		s = s.replace(/  /g, ' \u2003')
		container.appendChild(document.createTextNode(s))
		return
	}
	for (let i = 0; i < tokens.length; ++i) {
		let node
		switch (tokens[i]) {
			case '``': node = document.createElement('code'); break
			case '`': node = document.createElement('code'); break
			case '**': node = document.createElement('strong'); break
			case '*': node = document.createElement('em'); break
			case '~~': node = document.createElement('s'); break
			default: node = tokens[i]
		}
		if (node.nodeType === 1) {
			if (node.tagName.toLowerCase() === 'code') node.innerHTML = tokens[++i]
			else parseImageOrLink(tokens[++i], node)
			container.appendChild(node)
		} else {
			parseImageOrLink(node, container)
		}
	}
}

function startPresentation() {
	const controls = document.createElement('div')
	controls.style.all = 'initial'
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
		switch (kbEvent.key) {
			case 'ArrowRight':	case 'ArrowDown':	case 'PageDown':	nextSlide();	hideControls();	break
			case 'ArrowLeft':	case 'ArrowUp':	case 'PageUp':	prevSlide();	hideControls();	break
			case 'E': document.body.classList.toggle('eva'); break
			case ' ': adjustCurrentSlide()
		}
	}
}

function hideControls() {
	document.querySelector('div.controls').style.visibility = 'hidden'
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
		if (e.matches('iframe')) {
			e.style.width = w + 'px'
			e.contentDocument.head.innerHTML += `
			<style>
			html {
				font-size: 2rem;
			}
			input {
				-webkit-appearance: none;
				font-size: 2rem;
				min-width: 3rem;
			}
			body {
				margin: 0;
				position: fixed;
			}
			</style>
			`
			const iframeBody = e.contentDocument.body

			iframeBody.style.margin = '0'
			iframeBody.style.position = 'fixed'
			e.style.width = w + 'px'

			e.style.height = iframeBody.offsetHeight + 'px'
		} else if (isReplacedElement(e)) {
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
