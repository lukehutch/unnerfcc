<!--
name: 'Tool Result: REPL dangling code cannot continue'
description: >-
  Model-facing REPL tool result informing the model that code left running after
  script exit cannot use timers or start new calls once prior calls finish, and
  advising awaiting inside one script.
ccVersion: 2.1.329
-->
Code that this script left running can go no further: after a script returns, that code can't use sleep() or timers, and it can make calls only while an earlier call is still running. Check what was done, then await the rest inside one script (set the timeout parameter for a long loop).
