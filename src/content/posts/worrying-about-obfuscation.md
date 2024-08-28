---
title: Why you (probably) shouldn't worry about obfuscation
description: If you think that obfuscation will solve your issues, it probably won't. 
published: 2024-08-28T14:15:00-06:00
---

Sometimes when a person finishes a project and wants to distribute an executable for it, they may not want others to look at their source code be it to deter piracy, to protect secrets, etc.

However, the truth is that obfuscation is not particularly great for these purposes.

## Is obfuscation helpful?

For protecting your source code, probably not. But, for preventing the casual attempts, definitely.

### Obfuscation helps the good people

Obfuscation is only a deterrent for the mildly inclined individual. It's a warning to anyone looking at your code. If a user acting in good faith tries to reverse engineer your app and sees gibberish, the user will probably get the idea that you don't want them looking there.

If a user is really keen on reverse engineering your code, it doesn't matter how many obstacles you put on their way. With enough time, money, and effort, they will get through them.

## The sad reality: it's not possible

Given that a computer cannot read obfuscated code, the application must first deobfuscate or decrypt itself to then execute. This is the weak point that allows someone to reverse engineer your application.

Obfuscation does not inherently make your code secure. These methods can act as deterrents to thwart reverse engineering attempts, but they are not infallible.

## Others have tried and have failed

The software industry has invested a lot of their time and money into implementing competent copy-protection measures.

In their attempts, these measures have either introduced performance issues that impact actual customers, prevented legitimate usage of the software ("only on x devices" measures), and sometimes included vulnerabilities alongside them. In short, copy-protection measures are usually more detrimental to the paying customers than they are to pirates.

## The easy solution

If there's no software, there's no code.

Seen the recent move to web apps and software as a service? A possible factor is that it allows you to hide the server logic that powers your application. Of course, the client facing code will always be extractable but not the server code which is what matters.

### But my code has API secrets! I don't want people to use my keys

You should **never** store anything secret in software the user receives. If they have the application, they have the keys! Instead, host a wrapper of the APIs you're using on an external server -- one that you control. You can also add authentication to make sure that only the people using your application have access to your API.

### But I'm selling my application! I don't want people plagiarizing my code

Unless your application implements some ground-breaking algorithm that gives you an advantage over the competition, there's no need to worry.

If such algorithm were to exist in your code, the cost of a person reverse engineering that algorithm (both in money, time, and effort) will probably exceed the cost of just reimplementing a similar one from scratch. This cost grows larger the bigger your codebase is. If their goal is to steal your **entire application**, it will take them a while (even with others helping).

## The best solution

The best solution is to accept reality.

Accept the fact that some will be interested in extracting details about your application.

Accept the fact that some will want to circumvent the measures you impose.

But, rather than chasing these users down or adding a dozen deterrents, **invest your efforts in good software** that people will want to use and pay for.
