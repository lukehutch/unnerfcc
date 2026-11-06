<!--
name: 'Tool Result: Do not re-call background command'
description: >-
  Warns the model not to re-invoke a running task, explaining that results are
  delivered automatically upon completion.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
Do not call ${TOOL_NAME} again for this task: if the command finishes while you are still working, its result is delivered to you automatically between your tool calls (usually as a ${TOOL_NAME} result, otherwise as a task notification). If you need that result before you reply and nothing else is left to do, wait with one foreground shell command that blocks until the output file shows what you need; otherwise continue with other work.
