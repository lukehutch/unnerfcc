<!--
name: 'Tool Result: REPL script dispatched'
description: >-
  REPL tool result telling the model its script was queued rather than run, that
  the outcome arrives later as a repl-eval poll event, and not to re-issue the
  code.
ccVersion: 2.1.235
variables:
  - EVAL_ID
-->
(dispatched #${EVAL_ID} — the script is queued, not run; its outcome arrives later as an <event kind="repl-eval"> poll event. Do not re-issue this code.)
