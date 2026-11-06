<!--
name: 'Tool Result: REPL calls running at script end warning'
description: >-
  Warns about unawaited calls running after script end and instructs how late
  output is delivered.
ccVersion: 2.1.318
variables:
  - RUNNING_CALLS_LIST
-->
 tool call(s) still running at script end (${RUNNING_CALLS_LIST}) — they run on and their effects happen; what a .then(self.log) logs arrives as late output, anything else is not in this result. Do not re-issue them; await next time.
