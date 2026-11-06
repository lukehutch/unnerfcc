<!--
name: 'Tool Result: REPL timeout before shell command finished'
description: >-
  Explains behavior when a script reaches its overall time limit before a shell
  command completes.
ccVersion: 2.1.318
-->
 before a shell call finished. The limit is on the whole script, and a command still running when it is reached is stopped with the script. A command whose own timeout ends before the limit moves to the background at that timeout and keeps running (one that starts with sleep is stopped instead), so give a long command a shorter timeout, or split the work.
