<!--
name: 'Tool Result: REPL eval never reported back'
description: >-
  Reports that an earlier run ended or Claude Code exited before the eval result
  arrived.
ccVersion: 2.1.318
variables:
  - EVAL_ID
-->
eval #${EVAL_ID} never reported back: your earlier run ended or was stopped, or Claude Code exited, before its result reached you. Its result is lost and the script is no longer running. A command the script had started may still have run to completion.
