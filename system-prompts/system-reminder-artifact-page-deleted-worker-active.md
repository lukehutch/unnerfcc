<!--
name: 'System Reminder: Artifact page deleted but worker active'
description: Notice that the artifact page was deleted after the worker read the follow-up.
ccVersion: 2.1.251
variables:
  - PAGE_URL
  - WORKER_REF
-->
the page it concerned (${PAGE_URL}) has since been deleted, but ${WORKER_REF} had already read the follow-up and may still act on it against the deleted page — treat any result from it as superseded, and handle the thread message yourself if it still needs an answer.
