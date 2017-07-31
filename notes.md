---
title: Notes
layout: default
---
{% include header.html image="header01" %}
<div>
	{% for post in site.posts %}
		<span class="post-date">{{ post.date | date: "%-d %B %Y" }}</span>
		<span class="post-title"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></span>
	{% endfor %}
</div>