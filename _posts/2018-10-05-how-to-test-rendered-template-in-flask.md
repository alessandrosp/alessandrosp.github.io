---
layout: post
title: How to Test Rendered Template in Flask
date:   2018-10-05 08:09:00 +0100
tags: [python, flask, test, unittest, blinker, signals, session]
---
When testing the routing logic of your Flask application it's important to be able to check a specific template was rendered via `flask.render_template()`. One way to test the returned HTML is to treat the HTML code as a string:

```python
import unittest

import main  # The module where the Flask app is defined.


class TestHomepage(unittest.TestCase):

    def setUp(self):
        main.app.config['TESTING'] = True
        main.app.config['WTF_CSRF_ENABLED'] = False
        self.test_client = main.app.test_client()

    def test_homepage_returns_login_page_when_logged_out(self):
        response = self.test_client.get('/')
        # We test a known substring in login.html appears in the returned HTML.
        self.assertTrue('Username:' in str(response.get_data()))
```

We need to coerce the response's data to str() because it's bytes() by default. Note: these are all equivalents to the last line in the previous snippet:

```python
self.assertTrue('Username:' in str(response.get_data()))
self.assertTrue('Username:' in str(response.data))
self.assertTrue(b'Username:' in response.get_data())
self.assertTrue(b'Username:' in response.data())
```

This approach would work for as long as you don't touch the HTML content of the page; however, every change to the template file may compromise the tests, which is not good. [Flask offers a better way](http://flask.pocoo.org/docs/1.0/signals/) to test which template has been rendered using the `blinking` library for signaling (it's not installed by default so you may need to run `pip install blinking` first).

The idea is to use the built-in library `contextlib` to define a context manager that keeps track of any time a template is rendered. After a given request has been completed, we can check the context manager to see what templates have been rendered.

```python
import contextlib
import unittest

import flask

import main  # The module where the Flask app is defined.

@contextlib.contextmanager
def captured_templates(app):
    recorded = []
    def record(sender, template, context, **extra):
        recorded.append((template, context))
    flask.template_rendered.connect(record, app)
    try:
        yield recorded
    finally:
        flask.template_rendered.disconnect(record, app)

class TestHomepage(unittest.TestCase):

    def setUp(self):
        main.app.config['TESTING'] = True
        main.app.config['WTF_CSRF_ENABLED'] = False
        self.app = main.app
        self.test_client = main.app.test_client()

    def test_homepage_returns_login_page_when_logged_out(self):
        with captured_templates(self.app) as templates:
            _ = self.test_client.get('/')
            template, context = templates[0]
            self.assertTrue(template.name == 'login.html')
```

Note how we use `self.test_client` to make all the requests but we use self.app for capturing the templates in `captured_templates()`.

Lastly, we can combine our `captured_templates()` with sessions, for example to check the correct template is rendered when the user is logged in. The code would be exactly the same as in the previous snippet but for a few extra lines in `test_homepage_returns_login_page_when_logged_out()`.

```python
def test_homepage_returns_homepage_when_logged_in(self):
    with self.test_client.session_transaction() as session:
        session['logged_in'] = True
    with captured_templates(self.app) as templates:
        _ = self.test_client.get('/')
        template, context = templates[0]
        self.assertTrue(template.name == 'homepage.html')
```

Note that the request part of the test is **not** run in the context manager opened by `session_transaction()` as this often creates some confusion.
