<!--
name: 'Tool Result: REPL ignore if timers were timeouts'
description: >-
  Model-facing REPL tool result suffix advising ignoring the warning if
  cancelled sleep() or timer calls were only timeouts.
ccVersion: 2.1.329
variables:
  - STOPPED_MESSAGE
-->
${STOPPED_MESSAGE} Ignore this if its sleep() calls and timers were only timeouts.
