<!--
name: 'Tool Result: Wait in the foreground instead of polling'
description: >-
  Tells the model to keep working or block on one foreground command rather than
  polling repeatedly, and to run a command it must wait on in the foreground
  next time.
ccVersion: 2.1.251
variables:
  - SHELL_TOOL_NAME
-->
If you still need its result and have other work, keep working — it reaches you between your tool calls if it exits in time; if waiting for it is all that is left, wait with one foreground shell command that blocks until the output file shows what you need, rather than repeated ${SHELL_TOOL_NAME} calls. Next time, run a command you must wait on in the foreground (with a timeout of up to 
