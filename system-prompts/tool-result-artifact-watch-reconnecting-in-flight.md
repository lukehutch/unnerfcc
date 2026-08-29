<!--
name: 'Tool Result: Artifact watch reconnecting'
description: >-
  Informs the model that the artifact watch is reconnecting and to re-check
  status.
ccVersion: 2.1.251
variables:
  - ARTIFACT_REF
  - DETAILS
-->
- ${ARTIFACT_REF} — reconnecting right now, so nothing reaches this session until it is connected again${DETAILS}. Check status again in a few seconds before relying on it.
