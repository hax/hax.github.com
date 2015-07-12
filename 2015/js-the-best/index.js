'use strict';

fetch('README.md').then(function (res) {
	return res.text();
}).then(parseContent).then(createSlides).then(startPresentation);

function parseContent(text) {
	return text.split(/\n{2,}/).map(function (slideText) {
		return slideText.split(/\n/);
	});
}

function createSlides(slides) {
	slides.map(function (slide) {
		var slideDiv = document.createElement('div');
		slideDiv.className = 'slide';
		document.body.appendChild(slideDiv);
		slide.forEach(function (line) {
			var lineDiv = document.createElement('div');
			lineDiv.className = 'line';
			line = line.trim().replace(/^#+\s+/, '');
			if (line.slice(-1) === ',') {
				line = line.slice(0, -1);
				lineDiv.classList.add('comma');
			}
			var m = /^!\[(.*?)\]\((.*?)\)/.exec(line);
			if (m) {
				var img = document.createElement('img');
				img.alt = m[1];
				img.src = m[2];
				lineDiv.appendChild(img);
			} else {
				lineDiv.appendChild(document.createTextNode(line));
			}
			slideDiv.appendChild(lineDiv);
		});
	});
}

function startPresentation() {
	initSlide();
	window.onpopstate = function (e) {
		showSlide(parseInt(e.state));
	};
	window.onkeydown = function (kbEvent) {
		var key = kbEvent.key || kbEvent.keyIdentifier;
		// console.log(key)
		switch (key) {
			case 'Left':
				prevSlide();break;
			case 'Right':
				nextSlide();break;
		}
	};
}

function initSlide() {
	if (!showSlide(parseInt(location.hash.slice(1)))) showSlide(0);
	pushState();
}

function showSlide(i) {
	var slide = document.querySelectorAll('.slide')[i];
	if (slide) {
		slideIndex = i;
		var curr = current();
		if (curr) curr.classList.toggle('current');
		slide.classList.toggle('current');
		adjustSlide();
		return true;
	}
	return false;
}

function current() {
	return document.querySelector('.current.slide');
}

function nextSlide() {
	var curr = current();
	var c = curr.querySelector('.comma');
	if (c) {
		c.classList.remove('comma');
		return;
	}
	var next = curr.nextElementSibling;
	//console.log(next)
	if (next) {
		++slideIndex;
		next.classList.toggle('current');
		curr.classList.toggle('current');
	}
	pushState();
	adjustSlide();
}

function prevSlide() {
	var curr = current();
	var prev = curr.previousElementSibling;
	//console.log(prev)
	if (prev) {
		--slideIndex;
		curr.classList.toggle('current');
		prev.classList.toggle('current');
	}
	pushState();
	adjustSlide();
}

var slideIndex = undefined;
function pushState() {
	history.pushState(slideIndex, '', '#' + slideIndex);
}

var forEach = Array.prototype.forEach;
function adjustSlide() {
	var _context;

	var curr = current();

	curr.style.visibility = 'hidden';
	curr.style.transform = null;
	(_context = curr.childNodes, forEach).call(_context, function (e) {
		return e.style.fontSize = null;
	});

	setTimeout(function () {
		var _context2;

		var vw = window.innerWidth * 0.8,
		    vh = window.innerHeight * 0.8;
		// console.log(vw, vh)
		(_context2 = curr.childNodes, forEach).call(_context2, function (e) {
			// console.log(e.clientWidth, vw)
			e.style.fontSize = vw / e.clientWidth + 'em'
			// console.log(e.clientWidth, vw)
			;
		});
		var scale = Math.min(vh / curr.clientHeight, 1);
		var dy = (vh - curr.clientHeight) / 2 / scale;
		curr.style.transform = 'scale(' + scale + ') translate(0, ' + dy + 'px)';
		curr.style.visibility = null
		//console.log(vh, curr.clientHeight, vh / curr.clientHeight, curr.style.transform)
		;
	});
}