---
title: Before you compile Python...
description: The complicated reality of creating a Python executable
published: 2023-12-27T11:23:06-06:00
updated: 2026-09-10T11:00:00-06:00
tags:
  - programming
  - python
---

It is not uncommon for a developer to want to distribute the project they've made in Python with others. Many people will resort to creating an executable because it is easier for them to distribute and it is easier for someone else to setup and use, since it is a simple "one click" solution.

However, the fact that Python does not natively produce executables  makes distribution a bit more complicated than other languages such as Java and C# which generally do. Still, there are many tools that can create an executable from Python source code, [PyInstaller](https://pyinstaller.org/en/stable/) and [Nuitka](https://nuitka.net/) being the most popular.

While these tools generally succeed in their goal, they must consider the fact that Python was not designed with this task in mind, and so these tools have to employ workarounds to achieve their goal which usually introduce their own caveats and limitations. This article discusses how these tools work as well as the challenges you might face while using them.

## How do they work?

### PyInstaller: The "Freezing" Side

PyInstaller is perhaps the most popular way to distribute a Python project. In essence, PyInstaller is a bundling tool. It works by bundling the Python runtime, your source code, and all of its dependencies into a single package. When operating in "onedir" mode, it creates a folder containing this bundle plus an executable that launches the Python runtime within the bundle.

When operated in "onefile" mode, it builds this package into a single executable. When this executable is run, the bundled package is decompressed into a temporary folder and the included Python runtime is used to run the extracted source code.

The process performed in this mode is known as "freezing" and there are many tools that use this approach such as [cx_Freeze](https://cx-freeze.readthedocs.io/en/stable/), [PyOxidizer](https://pyoxidizer.readthedocs.io/en/stable/), and Python's very own [Freeze](https://github.com/python/cpython/tree/main/Tools/freeze) tool.

### Nuitka: Compiling Python

Nuitka calls itself "the Python compiler." Unlike PyInstaller, which performs freezing, Nuitka will attempt to translate your Python source code into equivalent C, while introducing optimizations along the way to improve performance. When it is not possible to translate such code directly, Nuitka uses `libpython` to execute uncompiled Python code alongside compiled code.

Nuitka also has two distribution modes, called standalone (equivalent of PyInstaller's "onedir") and onefile. They behave in a similar way to PyInstaller, but using the compiled code rather than Python bytecode during the process.

## A Word of Caution

### False Positives

While not exclusive to the Python world, these tools (particularly the "freezing" ones) are prone to generating **false positives** from antivirus software, especially when used in onefile mode.

This is because modern antivirus software not only uses signature-based scanning but also heuristics to flag executables based on behaviors that are deemed suspicious. One can definitely argue that an executable that drops another (the Python runtime) and then runs stuff through it may be deemed as "suspicious". In fact, this is fairly common amongst malware, where a "dropper" extracts or downloads malicious code that it then runs on the target system.

Also, Python-based malware commonly use PyInstaller and other tools to distribute themselves more easily, as seen in [this Fortinet article](https://www.fortinet.com/blog/threat-research/unpacking-python-executables-windows-linux). This is why some solutions will explicitly flag PyInstaller executables as they are easy to identify (they share a common base, known as a bootloader, which performs the extraction process mentioned earlier).

Another contributing factor in detections is a file's reputation. Various factors are used to determine a file's reputation such as the date the file was first created, the date it was first seen by the reputation scanner, whether the file contains identifying metadata such as a name and publisher, and whether the file has been digitally signed.

While reputation will always be a factor, regardless of the language being used,  a file generated using PyInstaller will have a greater chance of being flagged than a binary produced by a C compiler, simply because the former includes a common base shared across all other PyInstaller executables that is seen by some software as suspicious.

### Python was not designed for this

CPython (the standard reference implementation of Python) does not compile to machine code and the flexibility and dynamism of the language can definitely complicate matters, so the solutions out there will be hacky. "Freezing" tools like PyInstaller or cx\_Freeze bundle the Python runtime and the standard library into a single package or executable, with the main advantage being their portability and ease of use.

However, because of these hacks, "freezing" tools can introduce several drawbacks, especially when operating in onefile mode. Alongside the previously mentioned false positives, another common issue is slower startup times since they need to extract themselves into a temporary directory to be able to run. This is particularly the case when your application uses heavy dependencies such as GUI frameworks or libraries such as `pandas` and `numpy`.

> A notable exception to this is [PyOxidizer](https://pyoxidizer.readthedocs.io/en/stable/pyoxidizer.html). The binaries it generates are compiled from Rust and this code acts similarly to the "bootloader" you'd find in PyInstaller. However, rather than writing to disk, it loads Python modules into memory, which is much faster.

Some other common issues when using onefile mode include:

- Crashes related to missing data files, bad paths or environment issues can be harder to trace and debug in onefile mode, due to the bundle extracting to a temporary directory. A common solution is to first debug the program in onedir mode then compile to onefile once you have verified it works.
- The tool may not be able to determine all imports or libraries used by a project, especially those included dynamically or libraries based on C extensions, which may require the developer to specify these imports (and their dependencies) explicitly.
- Some of these tools can produce very large bundles, especially when using heavy dependencies, which can make these applications harder to distribute. Most of these tools support compression or packing via tools such as `upx`.
- Because of the extraction process, running multiple instances of an executable can produce conflicts such as file locks, race conditions, or cleanup issues. A solution with Nuitka is to specify the temporary directory format so it includes the process ID in its name. If you do not expect your app to need multiple instances, you can also write additional code to restrict them to a single instance.

Of course, all of these issues can be fixed with some time and effort. However, these issues may pose a headache to first time users.

Nuitka tries to compile most of your Python code into equivalent C with the advantage of great performance gains but at the expense of accuracy. Nuitka is effectively a different Python runtime. It is not perfect and there are [known issues](https://github.com/Nuitka/Nuitka#typical-problems), specifically with some libraries like PyQt. It also faces some of the same issues pointed above.

## So, what can I do?

### If you have to use onefile mode

- You will have to tell users about possible false positives and contact AV vendors directly so they can analyze your software and determine it as safe. However, if your application targets a small audience or isn't downloaded often, you will likely have to do this for each release of your software, which may not be desirable, especially in commercial environments.
- If using PyInstaller, a possible solution is to [recompile its bootloader](https://www.pyinstaller.org/en/stable/bootloader-building.html). The bootloader is the binary included with your executable which is responsible for extracting and running your application. Recompiling does require additional work and is not guaranteed to be effective.
- Code signing, although costly, can help to establish your software's reputation, reduce false positives, and ensure software integrity (has it been tampered?) and authenticity (where is this from?). This is generally beneficial regardless of if you are using onefile mode. There are three types of code signing certificates:
  - IV (individual verification) certificates are generally easier and cheaper to get. It attaches a publisher (your legal name) to executables signed with it, which removes "unknown publisher" warnings but still requires your application to gain reputation over time.
  - OV (organizational verification) certificates are associated with a business. These are generally more expensive and require additional checks to obtain.
  - EV (extended verification) certificates are the most expensive option but effectively provide instant reputation to software signed with it.

### Providing an installer

If you are willing to forgo onefile mode, you could simply tell users to install Python. One way could be providing an instruction manual alongside your software with steps on how to setup Python and your application. Another could be providing the one directory output built by PyInstaller and Nuitka as a ZIP package, organized so users know what file to run.

An easier method would be to provide users with an installer. An installer is a separate application that performs a similar extraction process to onefile mode, but instead of extracting to a temporary directory on every run, an installer extracts to a permanent directory, registering this location with the OS and providing a shortcut for users to run your app.

An installer combines the benefits of a "one click" method and the advantages of using onedir mode, including reduced false positives and faster startup times. Multiple third-party tools exist to create an installer, such as Inno Setup and NSIS. The [briefcase](https://github.com/beeware/briefcase/) and [pynsist](https://github.com/takluyver/pynsist) projects are also available to help simplify this process.

### Using a different language

If you are starting a project and distribution is a priority, consider **not using Python at all**, at least for the time being. Python is great for server-side software but the difficulty of distributing Python can make it undesirable for developing client-side software. However, there are many languages such as C++, C#, and Rust that have compilation in mind, provide great ecosystems, and have solved most of the challenges presented above.

## Conclusion

I hope this article has cleared up how these tools work and their drawbacks. The reason I made this article is to answer the question "How can I compile my app into an executable?" which is very common, especially with beginners, and where the usual answer of "You don't" can feel somewhat discouraging.

The point of this article is not to discourage or scare you into not using these tools. I have personally used some of them and there's a lot of projects that do. The point is not to tell you not to climb a tree but to tell you what you're in for. While the mission of these tools is great and respectable, there are challenges that come from the nature of Python itself, so I hope this post has helped clarify at least some of them.
