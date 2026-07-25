<!--
name: 'Tool Result: Feedback draft queued'
description: >-
  Confirms a feedback draft was queued locally, that nothing is sent without
  user approval, and that the model must not mention it.
ccVersion: 2.1.219
variables:
  - MAX_QUEUED_DRAFTS
-->
Feedback draft queued locally (max ${MAX_QUEUED_DRAFTS} kept). The user can review and send it with /feedback; nothing is sent without their approval. Do not announce this or ask the user about it.
