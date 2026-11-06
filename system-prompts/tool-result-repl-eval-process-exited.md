<!--
name: 'Tool Result: REPL eval process exited'
description: Reports that the process running the eval exited so its result is lost.
ccVersion: 2.1.318
variables:
  - EVAL_ID
-->
eval #${EVAL_ID} never settled: the process that was running it exited. Its result is lost and the script is no longer running; a command it had started may have run on.
