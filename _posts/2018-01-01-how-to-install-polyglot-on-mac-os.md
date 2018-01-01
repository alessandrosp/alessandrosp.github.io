---
layout: post
title: How to Install Polyglot on macOS
date:   2018-01-01 15:15:00 +0100
tags: [python, polyglot, natural language processing]
---
Polyglot is a great library for NLP for languages other than English. To install it on Linux distros is fairly straightforward, while the same is not necessary true for macOS.

Start by following [Polyglot instructions](http://polyglot.readthedocs.io/en/latest/Installation.html), use pip (or pip3) to retrieve Polyglot code.

    sudo pip3 polyglot
    
Open the Python command line and try to import polyglot.text:

    import polyglot.text
    
If there are no errors, awesome, you're good to go. On the other hand, if you get an `ModuleNotFoundError: No module named 'icu'` error, it means you need to install some more dependencies.

Install [homebrew](https://brew.sh/) (like apt-get for macOS) if you have not done so already:

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

Use homebrew to install icu4c:

    brew install icu4c
    
Now you need to install pyicu, just execute:

    CFLAGS=-I/usr/local/opt/icu4c/include LDFLAGS=-L/usr/local/opt/icu4c/lib pip3 install pyicu
    
Now you should be alright, just try again to `import polyglot.text`.

More info can be found [here](https://medium.com/data-science-cafe/install-polyglot-on-mac-3c90445abc1f).
