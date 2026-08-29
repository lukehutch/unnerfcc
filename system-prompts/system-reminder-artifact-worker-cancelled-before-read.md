<!--
name: 'System Reminder: Follow-up cancelled before worker read'
description: Notice that a follow-up was cancelled and withdrawn before the worker read it.
ccVersion: 2.1.251
variables:
  - WORKER_REF
-->
it was cancelled from the thread and withdrawn before ${WORKER_REF} read it — nothing is pending from it; do not wait for a result and do not dispatch it.
