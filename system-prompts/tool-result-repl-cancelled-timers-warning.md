<!--
name: 'Tool Result: REPL cancelled timers warning'
description: >-
  Model-facing REPL warning reporting that pending sleep() or timer calls were
  cancelled at script end and advising awaiting loops inside one script.
ccVersion: 2.1.329
variables:
  - CANCELLED_TIMERS_COUNT
-->
⚠ ${CANCELLED_TIMERS_COUNT} sleep() or timer(s) were still waiting at script end and were cancelled. Ignore this if they were only timeouts. A loop that waited on one goes no further: to run it, await it inside one script (set the timeout parameter if it is long).
