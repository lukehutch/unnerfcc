<!--
name: 'Tool Result: REPL calls pending results discarded'
description: >-
  Warns that pending tool calls had their results discarded because they were
  not awaited.
ccVersion: 2.1.318
variables:
  - PENDING_CALLS_LIST
-->
 tool call(s) still pending at script end — results discarded: ${PENDING_CALLS_LIST}. Add 'await'.
