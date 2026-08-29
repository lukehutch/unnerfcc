<!--
name: 'Tool Result: Do not re-check a background command'
description: >-
  Tells the model not to call the shell tool again for a running background
  command because its result is delivered automatically, and to end the turn if
  that result is all it is waiting for.
ccVersion: 2.1.251
variables:
  - SHELL_TOOL_NAME
  - RESULT_DELIVERY_TIMING_NOTE
-->
Do not call ${SHELL_TOOL_NAME} again for this task: when the command finishes, its result is delivered to you automatically — ${RESULT_DELIVERY_TIMING_NOTE} (usually as a ${SHELL_TOOL_NAME} result, otherwise as a task notification). If that result is all you are waiting for, end your turn; otherwise continue with other work.
