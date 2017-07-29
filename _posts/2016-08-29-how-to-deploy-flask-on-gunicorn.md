---
layout: post
title: How to deploy Flask on Gunicorn
date:   2016-08-29 17:53:00 +0000
tags: [python, flask, gunicorn, web development, server]
---
First thing, install **virtualenv**:

    pip install virtualenv

Then create your virtual environment. The virtual environment will use Python 2 by default, unless specified otherwise:

    virtualenv env # Use Python 2.x
    virtualenv -p python3 env # Use Python 3.x

Activate the virtualenv:

    source env/bin/activate

Install **Flask** and **Gunicorn**:

    pip install flask
    pip install gunicorn

Create a Python file containing a dummy app, e.g. `hello.py`:

<script src="https://gist.github.com/annoys-parrot/a6e046651d1044129984a3f06a180b9d.js"></script>

From the command line navigate to the folder with your Python file, then:

    gunicorn hello:app

That's it. By default gunicorn use port 8000, which may not be available. You'll get a `OSError: [Errno 98] Address already in use` error. You can fix that by specifying the port to use with the `-b` flag:

    gunicorn hello:app -b 127.0.0.1:7999

We can also daemonise gunicorn so that it’ll run even after we close our current terminal session. Simple as this:

    gunicorn hello:app -p hello.pid -D

The `-D` flag specifies the server should be run in the background, while the string before it (in our case `hello.pid`, it could be anything) specifies the name of the file where to store the process id so that when we want to kill the server we don't have to scroll through all the active processes to search for the right pid. Simply:

    kill `cat hello.pid`

Some useful resources:

- [Standalone WSGI Containers](http://flask.pocoo.org/docs/0.11/deploying/wsgi-standalone/)
- [Flask Deployment](http://exploreflask.com/en/latest/deployment.html)
- [Setting up flask app on Cloud9](https://maltmann.wordpress.com/2014/03/25/setting-up-flask-app-on-cloud9/)