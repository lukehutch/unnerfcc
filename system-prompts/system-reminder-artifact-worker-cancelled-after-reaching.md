<!--
name: 'System Reminder: Follow-up cancelled after reaching worker'
description: >-
  Notice that a follow-up was cancelled after reaching the worker and its result
  should be treated as superseded.
ccVersion: 2.1.251
variables:
  - WORKER_REF
-->
it was cancelled from the thread after it had already reached ${WORKER_REF}; if its result arrives, treat it as superseded by the cancellation (do not post it as the answer unless the thread asks again).
