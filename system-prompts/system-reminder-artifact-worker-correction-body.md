<!--
name: 'System Reminder: Artifact worker correction body'
description: >-
  Correction body explaining why a follow-up did not reach an artifact worker
  and what action to take.
ccVersion: 2.1.251
variables:
  - WORKER_REF
  - FAILURE_REASON
  - NEXT_ACTION
-->
, disregard it — that follow-up did NOT reach ${WORKER_REF} (${FAILURE_REASON}). If you have already dispatched or answered that follow-up yourself, ignore this; otherwise ${NEXT_ACTION}
