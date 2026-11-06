<!--
name: 'Tool Result: REPL synchronous run wall clock timeout'
description: >-
  Explains that a synchronous REPL script exceeded the wall-clock limit and
  suggests reducing work for built-in operations.
ccVersion: 2.1.318
variables:
  - WALL_CLOCK_MS
-->
REPL: the script's synchronous run took ${WALL_CLOCK_MS} ms, its wall clock, and was stopped. The step budget counts loops and calls, not the time one built-in call takes, such as a regular expression match over a long input; give such a call less to do.
