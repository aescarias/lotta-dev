---
title: Before you compile Python...
description: The complicated reality of creating a Python executable
published: 2023-12-27T11:23:06-06:00
---

There are cases where you may want to distribute a project you've made in Python. Many people will resort to creating an executable because it's easier for them and easier for an user.

However, the fact that Python is an interpreted language (as in: it does not compile to machine code, traditionally) makes it a bit more complicated to make an executable. Even so, there are many tools that can create Python executables: the two most common being [PyInstaller](https://pyinstaller.org/en/stable/) and [Nuitka](https://nuitka.net/).

## How do they work?

### PyInstaller: The "Freezing" Side

PyInstaller is the most popular way to distribute a package as an executable. It bundles a Python interpreter, your code, and any of its dependencies into a standalone executable. When this executable is run, the bundled interpreter is extracted and is then used to run your code. This process is known as "freezing" and there are many tools that use this approach such as [briefcase](https://github.com/beeware/briefcase), [PyOxidizer](https://pyoxidizer.readthedocs.io/en/stable/), and CPython's very own [Freeze](https://github.com/python/cpython/tree/main/Tools/freeze) tool.

### Nuitka: Compiling Python

Nuitka calls itself "*the* python Compiler." It attempts to compile most Python constructs to equivalent C, introducing optimizations along the way. However, some Python code cannot be directly translated because it could introduce bugs or vulnerabilities, so Nuitka also depends on the Python runtime to execute uncompiled code.

## A Word of Caution

### False Positives

While not exclusive to the Python world, these tools (specially those that bundle) are prone to generating **false positives** from antivirus software.

This is because antivirus software flag executables based on patterns or behaviors that are deemed suspicious (known as *heuristics*). You can definitely argue that an executable that drops another (the Python runtime) and then runs stuff through it may be deemed "suspicious." Some solutions will explicitly flag these executables as they are easy to identify and are common amongst malware. (You can read more on how they can be identified [here](https://www.fortinet.com/blog/threat-research/unpacking-python-executables-windows-linux))

### Python was not designed for this

CPython (the standard implementation of Python) does not compile to machine code, so the solutions out there will be hacky. "Freezing" tools like PyInstaller or ``briefcase`` bundle the CPython runtime and the standard library with the advantage of their incredible portability and ease of use.

The issue with "freezing" tools is that most of them have to extract files to a temporary directory. This not only means that your application needs to have write access to the filesystem (even if your application doesn't directly depend on it), it also means that we now  depend on I/O speed, which can fluctuate. Some users might have to wait a few seconds before they see a window and it may put off some of them.

> A notable exception is [PyOxidizer](https://pyoxidizer.readthedocs.io/en/stable/pyoxidizer.html). The binaries it generates are compiled from Rust and this code acts similarly to the "bootloader" you'd find in PyInstaller. However, rather than writing to disk, it imports Python modules from memory which is much faster.

Other common issues include dealing with hidden imports (imports the tool could not detect), bundling C extensions, and depending on multiple files. These issues are things you will have to deal with manually and may be a headache if it is your first time using these tools.

Nuitka tries to compile most of Python into C with the advantage of great performance gains but at the expense of accuracy. Nuitka is effectively a different Python runtime -- it is not perfect and there are [known issues](https://github.com/Nuitka/Nuitka#typical-problems), specifically with some libraries like PyQt. It also faces some of the same issues pointed above.

## So, what can I do?

### If you have no option but to use these tools

- You'll have to tell users about possible false positives. You may also need to contact AV vendors directly so they can mark your file as safe. However, if your application targets a small audience or isn't downloaded often, you'll likely have to do this for each release of your software.
- If using PyInstaller, a hacky solution I have heard *might* work is to [recompile its bootloader](https://www.pyinstaller.org/en/stable/bootloader-building.html). The bootloader is another binary written in C which is responsible for extracting and running your application once it's compiled. Recompiling does require some work and it is not guaranteed to be effective.
- Another factor that can lead to detections is your file's reputation. **Code signing**, although costly, can help in establishing that reputation and helping guarantee its integrity (has it been tampered) and authenticity (where is this from).
  - If your app gets popular enough, it may be detected by less engines as your app's reputation increases and as other people report false positives.

### If you prefer to use Python

The simplest and easiest solution is just **not using these tools at all**. Telling your users to install Python is probably the best of all the options here.

> If your users are not tech savvy, you can easily create an installer through Inno, NSIS, and similar. With an installer, you can simply bundle a Python interpreter with your code in the same way PyInstaller would. In fact, there's a tool called [pynsist](https://github.com/takluyver/pynsist) that does this.

### Otherwise

If you are starting a project and distribution is a priority, consider <u>not using Python at all</u> (at least, not yet). Python is great for server-side software but the difficulty of distributing Python can make it undesirable for developing client-side software. There are many languages, however, like C++, C#, and Rust, that have compilation in mind and have solved most of the challenges pointed above. If you are concerned about your source code being out there, then you may also prefer this route. (rather than obfuscating).

## Conclusion

The reason I made this article is to compile the most common responses I have seen others give when people ask "How can I compile my app into an EXE?". This is a very common question and the usual answer is "You don't." Without context, this can feel dismissive.

The point of this article is not to discourage or scare you into not using these tools. I personally have used some of them and there's a lot of projects that do. The point is not to tell you not to climb a tree but to tell you what you're in for. While the mission of these tools is great and respectable, there are challenges that come from the nature of Python itself, so I hope this post clarified at least a few of them.
