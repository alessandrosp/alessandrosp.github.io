---
layout: post
title: How to hide files and folders in Ubuntu without the dot
date:   2018-09-30 15:27:00 +0100
tags: [linux, ubuntu, admin, nautilus]
---
The easiest way to hide (i.e. make "invisible") files and folders in Linux-based systems is to just add a dot ('.') in front of their names. For example to hide the file `my_file.txt`:

```bash
mv my_file.txt .my_file.txt
```

See more info about this approach on [StackOverflow](https://askubuntu.com/questions/107934/how-can-i-make-a-hidden-file-folder). However, in certain occasions it may be preferable not to rename the file or folder, for example not to change any prexisting path. In this cases, a file can be hidden from Nautilus (Ubuntu's default file explorer) by adding its name to `~/.hidden`. For example:

```bash
echo my_file.txt >> ~/.hidden
```

Make sure to use `>>` and not `>` otherwise you'll over-write the content of `~/.hidden`.
