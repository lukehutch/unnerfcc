<!--
name: 'Tool Result: REPL sleep() cancelled after script return'
description: >-
  Model-facing REPL error telling the model that sleep() was cancelled because
  the parent script already returned and instructing it to await steps within
  one script.
ccVersion: 2.1.329
-->
sleep() was cancelled: the script that started this code has returned, and the code it left behind can't wait. Await these steps inside one script.
