---
title: Installing Python on Windows, the right way
description: Installing Python on Windows without the troubles.
published: 2024-08-14T14:27:00-06:00
updated: 2025-10-24T22:00:00-06:00
tags:
  - programming
  - python
  - windows
---

> As of October 2025, the preferred method of obtaining Python on Windows is the Python Install Manager which streamlines the installation process by downloading Python on the go and extracting it onto your device. [You can read about PyManager here](/posts/pymanager/).

Python is an easy to use yet powerful language suited for a wide variety of applications including data science, automation, backends, and more. As any other language, to use its features in the most effective way, you will need to install a suitable runtime for running your code.

This process can however require some setup. This post should help you get ready with Python on Windows the right way.

## Downloading Python

The Python language has a few interpreters available for you to use. However, the official, most popular and most well supported is CPython which is provided by the Python Software Foundation and is available at <https://www.python.org>.

From their website, you can click on [Downloads](https://www.python.org/downloads/) in the navigation bar and you will be brought to a page similar to the one shown below.

![The downloads page for Python on Windows](/images/py-on-win/python-downloads-page.png)

Clicking on the yellow button (the one with "Download Python" followed by a version number) will immediately start downloading the latest version of Python appropriate for your system.

If you want a different version, you can go to [Downloads > Windows](https://www.python.org/downloads/windows/) in the navigation bar and scroll down until you find the correct version.

![An installer entry as seen in Python Releases for Windows](/images/py-on-win/python-stable-page.png)

You can select a version from here or click on the Python version to learn more about that particular release.

![A list of available files for this release](/images/py-on-win/python-org-files.png)

> **About these files**
>
> All releases of Python will allow you to download either a GZIP or XZ compressed tarball of the source code.
>
> Each release provides installers for both Windows and Mac. Linux users must either compile the source code, use their distribution's package manager to install Python or use an external provider such as `pyenv` or `uv`.
>
> The "embeddable" Windows releases are standalone redistributable versions of Python designed to be included as a runtime in other applications.
>
> Each release also used to provide a web-based Windows installer that installed Python via the network. They were [discontinued](https://github.com/python/cpython/issues/86503), however, due to low usage and lack of practicality.
>
> It's worth noting that releases of Python in the "security fixes only" stage only ship Python releases in source form only. No installers are made.

## Installing Python

Once you have downloaded the Python installer, you can run it from the Downloads tab in your web browser or from the folder where you saved the installer (typically your Downloads folder).

Once you do, you should be greeted with this window:

![The Python installer](/images/py-on-win/installer-main-page.png)

You are given two options: "Install Now" will install Python including IDLE and `pip` and "Customize Installation" will give you more options to configure your Python installation.

You can also see two checkboxes at the bottom:

- The first checkbox corresponds to the Python launcher (`py.exe`). If it is your first time installing Python, you will see the option "Use admin privileges when installing py.exe" which tells the installer to install the Python launcher as an administrator. In my case, I already have the Python launcher so it simply reads "Python Launcher is already installed."
- The second checkbox is for adding Python to the `PATH` environment variable which allows programs to locate Python on your computer. This is how running `python` or `pip` in your terminal works. **If it is your first time installing Python, check this option.**

## Customizing your Python installation

By selecting "Customize installation", you will be brought to these options:

![The "Optional features" panel within the installer](/images/py-on-win/optional-features.png)

This allows you to select which Python components to install. You should leave these options checked unless you know what you're doing!

Next, you'll be greeted with the "Advanced Options" panel.

![The "Advanced options" panel within the installer](/images/py-on-win/advanced-options.png)

This notably allows you to customize where to install Python and whether to install it for all users or just you.

- "Associate files with Python", when checked, registers file associations for `.py` and `.pyw` files so they open with the Python launcher. In general, you will be running Python from the terminal, not by double-clicking.
- "Create shortcuts for installed applications" adds shortcuts for the Python shell and IDLE.
- "Add Python to environment variables" adds Python to PATH. If it's your first time installing Python, you should check this.
- "Precompile standard library" is an optimization so that, when you import a standard library module for the first time, you won't have to wait for it to generate bytecode. In practice, it shows little to no effect so checking this option is not needed.
- "Download debugging symbols" and "Download debug binaries" are useful for debugging Python itself. No need to check unless this is needed.

## Final Steps

Once you click "Install Now" (or "Install" in the advanced options panel), Python will start installing all the necessary components:

![Python being installed](/images/py-on-win/installer-progress.png)

After this completes, you should hopefully see "Setup was successful."

![Python installed successfully](/images/py-on-win/installer-done.png)

After clicking Close, you can do as instructed and search for Python in your start menu. You should be able to open a terminal and type `py` to run Python (if you installed the Python launcher) and type `python` and `pip` to use those components (if you added Python to PATH).

![The Python 3.12 shell](/images/py-on-win/py312-shell.png)

## FAQ

### My setup fails. What do I do?

Because the Python installer can fail due to a plethora of reasons (permissions, missing or corrupted files, partially installed releases, etc), there's usually more than one answer. There are however a few things you can try to diagnose why it fails:

- The installer should leave a log file with information about what caused the install to fail. Search for `0x8` within the log and lookup these errors through [this website](https://james.darpinian.com/decoder/) (they look similar to this example: `0x80070641`). Above these `0x8` strings, you will also find the component that produced this error.
- The installer also leaves more verbose logs for each component in the `%Temp%` folder. To find them, search for `WixBundleLog_` in the main log file. The location of the component's log file should be in the same line.
- If you see "This installation is forbidden by your system policy", you might need to run the installer as administrator.
- If you see "A newer version of Python \[x\] is already installed", this means that the installer has found traces of a newer release on your PC. Make sure that you have uninstalled these properly (in some cases, including the launcher) and try again. To make sure, run a specialized application like [BCUninstaller](https://www.bcuninstaller.com/) that adequately removes leftovers from uninstalls.
- If you see "The network resource is unavailable", this usually means that the installer was unable to extract that component. Remove any leftovers as instructed above and try again.
- If you see a more generic error like "The user cancelled the installation" or "Unrecoverable error during install", this can hint at multiple factors:
  - Improperly uninstalled versions of Python: follow as instructed above.
  - User account issues: if your system has multiple user accounts, it's possible that you installed Python for a specific user and are uninstalling from a different one. Make sure you have the correct user permissions to reinstall Python.
  - Permission issues: run as admin or uncheck the "Install launcher for all users" option. It is also possible your antivirus software is interfering with the installer so disabling it temporarily may work.
  - An issue with the Windows installer service: run [this troubleshooter](http://support.microsoft.com/mats/program_install_and_uninstall) from Microsoft and try again.

### Should I use the Microsoft Store version?

If you're planning on developing applications with Python and aren't just using it to run scripts, the simple answer is **no**. Because Microsoft Store applications are managed in a sandbox, you may encounter permission issues when using third-party packages or tools. This is why the general recommendation is to download Python from <https://python.org>.

### What version of Python should I install?

If you are just starting with Python, the latest release of Python is usually fine. If you plan to work with libraries, check when the Python version was released and ensure that those libraries work with that version.

From this assessment, you may decide to stay one or two minor versions behind the latest (3.10 or 3.11 rather than 3.12).

If you find that a package does not work in a recent version of Python (i.e. it only works properly on 3.8 and below), you should consider finding an alternative.
