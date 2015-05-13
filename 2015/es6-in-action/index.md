---
layout: default
title: ES6 in Action
slide: remark
class: center, middle
---

<p class="languages">
	<a href="README.en.md" hreflang="en">English</a> |
	<a href="README.md" hreflang="zh-Hans-cmn-x-hax">中文</a>
</p>

<script>
document.querySelector('.languages').addEventListener('click', function (event) {
	if (event.target.tagName.toUpperCase() === 'A') {
		event.preventDefault()
		history.pushState(
			event.target.href,
			event.target.title || event.target.textContent,
			{
				remark: true,
				url: event.target.href,
			}
		)
		openSlide(event.target.href)
	}
})

addEventListener('popstate', function (event) {
	if (event.data && event.data.remark) {
		openSlide(event.data.url)
	}
})

var slideshow
function openSlide(url) {
	slideshow = remark.create({sourceUrl: url})
}
</script>
