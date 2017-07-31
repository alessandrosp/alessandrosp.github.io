---
title: Notes
layout: default
---
<header>
	<span class="header-image"><img src="/assets/images/header01.jpg"></span>
	<span class="header-links"><a href="/notes">Notes</a> – <a href="/travelling">Travelling</a></span>
</header>
<div>
	{% for post in site.posts %}
		<span class="post-date">{{ post.date | date: "%-d %B %Y" }}</span>
		<span class="post-title"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></span>
	{% endfor %}
</div>