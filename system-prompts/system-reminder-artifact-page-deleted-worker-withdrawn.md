<!--
name: 'System Reminder: Artifact page deleted and follow-up withdrawn'
description: >-
  Notice that the artifact page was deleted and the follow-up was withdrawn
  before the worker read it.
ccVersion: 2.1.251
variables:
  - PAGE_URL
  - WORKER_REF
-->
the page it concerned (${PAGE_URL}) has since been deleted, so the follow-up was withdrawn from ${WORKER_REF} before it read it — nothing is pending from ${WORKER_REF}; handle the thread message yourself if it still needs an answer.
