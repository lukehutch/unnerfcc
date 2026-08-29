<!--
name: 'System Reminder: Artifact worker resend instruction'
description: >-
  Instruction to dispatch a follow-up to an artifact worker and await its new
  result.
ccVersion: 2.1.251
variables:
  - WORKER_REF
  - DISPATCH_TOOL_NAME
-->
send the follow-up to ${WORKER_REF} with ${DISPATCH_TOOL_NAME} now and reply only after its new result.
