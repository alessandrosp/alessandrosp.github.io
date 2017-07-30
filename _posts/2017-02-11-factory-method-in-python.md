---
layout: post
title: Factory Method in Python
date:   2017-01-11 10:00:00 +0000
tags: [python, coding, programming, factory method]
---
Factory Method is one of many [design patterns](https://www.toptal.com/python/python-design-patterns), probably the most used in languages like Java or C++.

The basic idea is to have a Parent class and some Children classes. The Parent class (aka, The Factory) contains all the methods common to the Children classes plus a `@classmethod` method that is used to decide which specific Children class to instantiate.

Here an example:

<script src="https://gist.github.com/annoys-parrot/a0aad8e235deaf4fa53fb380e905b4ae.js"></script>

Which would output:

<script src="https://gist.github.com/annoys-parrot/dbfd19feb4820213f85ddcce88828114.js"></script>

This is it!
