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
var slideshow
document.querySelector('.languages').addEventListener('click', function (event) {
	if (event.target.tagName.toUpperCase() === 'A') {
		event.preventDefault()
		slideshow = remark.create({sourceUrl: event.target.href})
	}
})
</script>
