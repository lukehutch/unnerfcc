<!--
name: 'System Reminder: Artifact page updated by third party while worker active'
description: >-
  Notice that a newer page version was published after the worker read the
  follow-up.
ccVersion: 2.1.251
variables:
  - PAGE_URL
  - WORKER_REF
-->
a newer version of that page (${PAGE_URL}) was published by someone other than ${WORKER_REF} after it had already read the follow-up, so its change may be applied on a stale copy — check the page before replying with any result from ${WORKER_REF}.
