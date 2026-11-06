<!--
name: 'Tool Result: Hook messages count limit omission'
description: >-
  Notes that duplicate hook messages or messages exceeding count limit were
  suppressed.
ccVersion: 2.1.318
variables:
  - MAX_HOOK_MESSAGES
-->
Some hook messages weren't shown: each message is shown once, and at most ${MAX_HOOK_MESSAGES} for one piece of code.
