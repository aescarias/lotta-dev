---
title: Installing Python on Windows, the right way
description: Installing Python on Windows without the troubles.
published: 2024-08-14T14:27:00-06:00
---

To use Python, you need to install a Python interpreter that runs your code. This post should help you get ready with Python on Windows the right way.

## Downloading Python

Python, the language, has a few available interpreters out there. The official and most popular one is [CPython](https://www.python.org/) from the Python Software Foundation.

From their website, you can click on [Downloads](https://www.python.org/downloads/) in the navigation bar and you will be brought to a page similar to this one.

![The downloads page for Python on Windows](/images/python-downloads-page.png)

Clicking on the yellow button (the one with "Download Python \[some version\]") will immediately start downloading the latest version of Python appropriate for your system.

If you want a different version, you can go to [Downloads > Windows](https://www.python.org/downloads/windows/) in the navigation bar and scroll down until you find the correct version.

![An installer entry as seen in Python Releases for Windows](/images/python-stable-release.png)

You can select a version from here or click on the Python version to learn more about the release.

![A list of available files for this release](/images/python-files.png)

> **About these files**
>
> All releases of Python will allow you to download either a GZIP or XZ compressed tarball of the source code.
>
> Each release provides installers for both Windows and Mac. Linux users must either compile the source code or use their distribution's package manager to install Python.
>
> The "embeddable" Windows releases are standalone redistributable versions of Python designed to be included as a runtime in other applications.
>
> Each release also used to provide a web-based Windows installer that installed Python via the network. They were seemingly discontinued, however, due to low adoption.

## Installing Python

Once you have downloaded the Python installer, you can run it from the Downloads tab in your browser or the Downloads folder on your device.

Once you do, you will be greeted with this window:

![The Python installer](/images/py312-installer.png)

You are given two options: "Install Now" will install Python including IDLE and pip and "Customize Installation" will give you more options to configure the installation.

You can also see two checkboxes at the bottom:

- The first checkbox corresponds to the Python launcher (`py.exe`). If it is your first time installing Python, you will see the option "Use admin privileges when installing py.exe" which tells the installer to install the Python launcher as an administrator. In my case, I already have the Python launcher so it simply reads "Python Launcher is already installed."
- The second checkbox is for adding Python to the `PATH` environment variable which allows programs to locate Python on your computer. This is how running `python` or `pip` in your terminal works. **If it is your first time installing Python, check this option.**

## Customizing your Python installation

By selecting "Customize installation", you will be brought to these options:

![The "Optional features" panel within the installer](/images/py312-features.png)

This allows you to customize which Python components to install. You should leave these options checked unless you know what you're doing!

Next, you'll be greeted with the "Advanced Options" panel.

![The "Advanced options" panel within the installer](/images/py312-options.png)

This notably allows you to customize where to install Python and whether to install it for all users or just you.

- "Associate files with Python", when checked, registers file associations for `.py` and `.pyw` files so they open with the Python launcher. In general, you will be running Python from the terminal, not by double-clicking.
- "Create shortcuts for installed applications" adds shortcuts for the Python shell and IDLE (if selected).
- "Add Python to environment variables" adds Python to PATH.
- "Precompile standard library" is an optimization so that, when you import a standard library module for the first time, you won't have to wait for it to generate bytecode. In practice, it shows little to no effect so checking this option is not needed.
- "Download debugging symbols" and "Download debug binaries" are useful for debugging Python itself. No need to check unless this is needed.

## Final Steps

Once you click "Install Now" (or "Install" in the advanced options panel), Python will start installing all the necessary components:

![Python being installed](/images/py312-progress.png)

After this completes, you should hopefully see "Setup was successful."

![Python installed successfully](/images/py312-done.png)

After clicking Close, you can do as instructed and search for Python in your start menu.

![The Python 3.12 shell](/images/py312-shell.png)

## FAQ

### My setup fails. What do I do?

Due to the nature of Windows, sometimes things don't work out. If your installation fails, try one of the following:

- The installer should leave a log file with information about what caused the install to fail. Search for `0x8` within the installer and look for those errors online (they look something like this example: `0x80070641`). Above these `0x8` strings, you will also find the component that produced this error.
- If you see "This installation is forbidden by your system policy", you might need to run the installer as administrator.
- If you see "A newer version of Python \[x\] is already installed", this means that the installer has found traces of a newer release on your PC. Make sure that you have uninstalled these properly (in some cases, including the launcher) and try again. To make sure, run a specialized application like [BCUninstaller](https://www.bcuninstaller.com/) that adequately removes leftovers from uninstalls.
- If you see "The network resource is unavailable", this means that the installer was unable to extract that component. Remove any leftovers as instructed above and try again.
- If you see a more generic error like "The user cancelled the installation" or "Unrecoverable error during install", this can hint at multiple factors:
  - Improperly uninstalled versions of Python: follow as instructed above.
  - Permission issues: run as admin.
  - An issue with the Windows installer service: run [this troubleshooter](http://support.microsoft.com/mats/program_install_and_uninstall) from Microsoft and try again.

### Should I use the Microsoft Store version?

If you're planning on developing applications with Python and aren't just using it to run scripts, the simple answer is **no**. Because Microsoft Store applications are managed in a "sandbox" of sorts, you may encounter permission issues when using third-party packages or tools. This is why the general recommendation is to download Python from <https://python.org>.

### What version of Python should I install?

If you are just starting with Python, the latest release of Python is usually fine. If you plan to work with libraries, check when the Python version was released and ensure that those libraries work with that version.

From this assessment, you may decide to stay one or two minor versions behind the latest. (3.10 or 3.11 rather than 3.12)

If you find that a package does not work for a recent version (i.e. only works correctly on 3.7 and below), consider finding an alternative or following a different resource.
