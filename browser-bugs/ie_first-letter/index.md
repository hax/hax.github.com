---
layout: default
title: IE first-letter bug
---

## Source code of <a href="./test.html">Demo page</a>

{% highlight html %}
<style>

:first-letter {
	font-size: 2em;
	padding-left: 1em;
}

div { margin: 0.5em 2em; border: 1px solid }

</style>

<h1>::first-letter</h1>

<div>
	test
</div>

<div>
	<div>
		test
	</div>
</div>

<div>
	<div>
		<div>
			test
		</div>
	</div>
</div>
{% endhighlight %}

## Result in Chrome 20
<img src="./chrome_20.png">

## Result in IE 10.0.8250.0
<img src="./ie_10.0.8250.0.png">
