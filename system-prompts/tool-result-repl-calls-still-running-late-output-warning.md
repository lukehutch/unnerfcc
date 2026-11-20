<!--
name: 'Tool Result: REPL calls running at script end warning'
description: >-
  Warns about unawaited calls running after script end, explains late output and
  loop termination, and instructs not to re-issue them.
ccVersion: 2.1.329
variables:
  - RUNNING_CALLS_LIST
-->
 tool call(s) still running at script end (${RUNNING_CALLS_LIST}) — they run on and their effects happen; what a .then(self.log) logs arrives as late output, anything else is not in this result. Do not re-issue them; await a call whose result the script needs. You will be told when they have ended. A loop left running ends at its next sleep() or timer, or when none of its calls is running.
