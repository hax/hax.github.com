fetch('README.md').then(res => res.text())
	.then(parseContent)
	.then(createSlides)
	.then(startPresentation)

function parseContent(text) {
	return text.split(/\n{2,}/).map(slideText => slideText.split(/\n/))
}

function createSlides(slides) {
	slides.map(slide => {
		const slideDiv = document.createElement('div')
		slideDiv.className = 'slide'
		document.body.appendChild(slideDiv)
		slide.forEach(line => {
			const lineDiv = document.createElement('div')
			lineDiv.className = 'line'
			line = line.trim().replace(/^#+\s+/, '')
			if (line.slice(-1) === ',') {
				line = line.slice(0, -1)
				lineDiv.classList.add('comma')
			}
			const m = /^!\[(.*?)\]\((.*?)\)/.exec(line)
			if (m) {
				const img = document.createElement('img')
				img.alt = m[1]
				img.src = m[2]
				lineDiv.appendChild(img)
			} else {
				lineDiv.appendChild(document.createTextNode(line))
			}
			slideDiv.appendChild(lineDiv)
		})
	})
}

function startPresentation() {
	initSlide()
	window.onpopstate = e => {
		showSlide(parseInt(e.state))
	}
	window.onkeydown = kbEvent => {
		const key = kbEvent.key || kbEvent.keyIdentifier
		// console.log(key)
		switch (key) {
			case 'Left': prevSlide(); break
			case 'Right': nextSlide(); break
		}
	}
}

function initSlide() {
	if (!showSlide(parseInt(location.hash.slice(1)))) showSlide(0)
	pushState()
}

function showSlide(i) {
		const slide = document.querySelectorAll('.slide')[i]
		if (slide) {
			slideIndex = i
			const curr = current()
			if (curr) curr.classList.toggle('current')
			slide.classList.toggle('current')
			adjustSlide()
			return true
		}
		return false
}

function current() {
	return  document.querySelector('.current.slide')
}

function nextSlide() {
	const curr = current()
	const c = curr.querySelector('.comma')
	if (c) {
		c.classList.remove('comma')
		return
	}
	const next = curr.nextElementSibling
	//console.log(next)
	if (next) {
		++slideIndex
		next.classList.toggle('current')
		curr.classList.toggle('current')
	}
	pushState()
	adjustSlide()
}

function prevSlide() {
	const curr = current()
	const prev = curr.previousElementSibling
	//console.log(prev)
	if (prev) {
		--slideIndex
		curr.classList.toggle('current')
		prev.classList.toggle('current')
	}
	pushState()
	adjustSlide()
}

let slideIndex
function pushState() {
	history.pushState(slideIndex, '', `#${slideIndex}`)
}

function adjustSlide() {
	const curr = current()

	curr.style.visibility = 'hidden'
	curr.style.transform = null
	Array.from(curr.childNodes).forEach(e => e.style.fontSize = null)

	setTimeout(() => {
		const vw = window.innerWidth * 0.8, vh = window.innerHeight * 0.8
		// console.log(vw, vh)
		Array.from(curr.childNodes).forEach(e => {
			// console.log(e.clientWidth, vw)
			e.style.fontSize = vw / e.clientWidth + 'em'
			// console.log(e.clientWidth, vw)
		})
		const scale = Math.min(vh / curr.clientHeight, 1)
		const dy = (vh - curr.clientHeight) / 2 / scale
		curr.style.transform = `scale(${scale}) translate(0, ${dy}px)`
		curr.style.visibility = null
		//console.log(vh, curr.clientHeight, vh / curr.clientHeight, curr.style.transform)
	})
}
