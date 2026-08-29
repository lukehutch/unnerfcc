<!--
name: 'System Reminder: Artifact page updated and follow-up withdrawn'
description: >-
  Notice that a newer page version was published and the follow-up was withdrawn
  from the worker.
ccVersion: 2.1.251
variables:
  - PAGE_URL
  - WORKER_REF
-->
a newer version of that page (${PAGE_URL}) was published by someone other than ${WORKER_REF}, so the earlier follow-up was withdrawn from ${WORKER_REF} before it read it — nothing is pending from ${WORKER_REF}; check the page and handle the thread message yourself if it still needs a change.
