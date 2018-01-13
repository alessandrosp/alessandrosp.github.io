---
title: Notes
layout: default
---
{% include header.html %}
<img src="/assets/images/flower-shop.gif">
<div id="posts">
	{% for post in site.posts %}
		<div class="row">
			<div class="post-date col-md-4">{{ post.date | date: "%-d %B %Y" }}</div>
			<div class="post-title col-md-8"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></div>
		</div>
	{% endfor %}
</div>