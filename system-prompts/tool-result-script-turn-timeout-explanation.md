<!--
name: 'Tool Result: Script turn timeout explanation'
description: >-
  Explains turn execution time limits and how to structure code with awaits to
  avoid timeouts.
ccVersion: 2.1.318
variables:
  - TIMEOUT_DURATION
-->
: a turn took more than ${TIMEOUT_DURATION}. A turn is the code that runs from the script's start, a tool call's result or a timer's firing until the next tool call's result or timer. If nothing awaited the stopped code (a timer's callback, an async function called without await), it ended partway with no error. Give one turn less to do, or split it with an await of a tool call or a timer.]
