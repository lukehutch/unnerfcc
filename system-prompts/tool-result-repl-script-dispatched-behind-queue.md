<!--
name: 'Tool Result: REPL script dispatched behind a queue'
description: >-
  REPL tool result for a script queued behind other dispatches — it has not run
  yet, its outcome arrives later as a repl-eval poll event, and the code must
  not be re-issued.
ccVersion: 2.1.235
variables:
  - EVAL_ID
  - QUEUED_BEHIND_COUNT
-->
(dispatched #${EVAL_ID}, queued behind ${QUEUED_BEHIND_COUNT} — the script is queued, not run; its outcome arrives later as an <event kind="repl-eval"> poll event. Do not re-issue this code.)
