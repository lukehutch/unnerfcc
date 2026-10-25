<!--
name: 'Tool Description: claude_test_app_up'
description: >-
  Checks whether the application under test is currently listening on the local
  machine.
ccVersion: 2.1.310
-->
Say whether the app under test is listening on this machine right now. The browser helper can see localhost when "ct.mjs status" could not (devServer.sandboxed). It tries only the ports of this machine that Claude Test would try for this project (its base URL's, or those its files name and a few usual ones), by address: it only connects, and sends no data at all, and for a port that answers it reads this machine's process table to tell whether the program there works in this project's folder (at the base URL's port, a program that works in another folder is not this app: the answer is up: false with portBusy; start nothing on that port); "up" is about the base URL's address when one is set, else about the ports the project's own files name. Call it from the person's conversation with devServer.check.arguments as status printed them, before a run is started. Right after you started the dev server, pass wait as well: the helper then tries again four times a second until the app answers or that many seconds have passed, and answers once, so one call is all the waiting a start needs. With wait it also stops waiting when the start it follows has stopped by itself, and answers startEnded with its cause in fixed words (causeWords), never its output. Pass output only when the check comes in a later message than the start.
