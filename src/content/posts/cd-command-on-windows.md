---
title: Using the cd command on Windows
description: Yes, the "change directory" command. Trust me, you'll learn something.
published: 2025-01-02T13:50:00-06:00
tags:
  - windows
---

> This article does not apply to the `cd` command on Powershell which is an alias for `Set-Location` and which behaves differently. This is strictly for `cd.exe`.

`cd` (or `chdir`), standing for "**ch**ange **dir**ectory", does what it says on the tin: it changes the current directory to whatever is specified.

Or that is at least *one* of its features. `cd` is actually two commands in one!

`cd` allows you to both *query* and *set* the default directory for a drive. To understand `cd` better, let's run through some examples.

## Querying and setting the current directory

Running `cd` as is simply yields the current directory for the current drive (akin to `pwd` on Unix likes)

```plaintext
C:\Users\Micro>cd
C:\Users\Micro
```

Giving `cd` a path will tell it to change the current directory at the specified drive to the new one.

```plaintext
C:\Users\Micro>cd mingw64\lib

C:\Users\Micro\mingw64\lib>
```

Note that `cd` will handle paths with spaces in them for you. `cd C:\Users\Micro\Saved Notes` and `cd "C:\Users\Micro\Saved Notes"` will both work (although you should prefer the latter).

## Setting the current directory on a different drive

A little known feature of `cd` is that allows you to set the current directory for a different drive. Let's say we have drives `C:` and `E:`.

To move within different drives in Command Prompt, you usually type the drive letter followed by a colon and hit Enter.

```plaintext
C:\Users\Micro>E:

E:\>
```

From drive `E:` (which is now the current drive), we can change the *current directory* of drive `C:` to something else.

```plaintext
E:\>cd C:\Users\Micro\mingw64\include

E:\>
```

Notice how we aren't immediately sent to `C:\Users\Micro\mingw64\include`. Instead, we remain at drive `E:`. This is because, by default, only the *current directory* for the drive is changed, not the current drive. If we wanted to change both the current drive and the current directory, we need to specify the `/d` parameter.

```plaintext
E:\>cd /d C:\Users\Micro\mingw64\include

C:\Users\Micro\mingw64\include>
```

If we want to see the current directory for a particular drive, you simply input the drive letter.

```plaintext
E:\>cd C:
C:\Users\Micro\mingw64\include
```

If we decide to go back to the `C:` drive, we will see that we are moved into the directory we specified earlier.

```plaintext
E:\>C:

C:\Users\Micro\mingw64\include>
```
