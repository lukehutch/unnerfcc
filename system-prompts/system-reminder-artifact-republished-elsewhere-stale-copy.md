<!--
name: 'System Reminder: Artifact republished elsewhere (stale copy)'
description: >-
  Notifies the model that the artifact was republished elsewhere to a newer
  version and that its copy is stale, requiring a re-read.
ccVersion: 2.1.251
variables:
  - ARTIFACT_ID
  - NEW_VERSION
-->
Artifact ${ARTIFACT_ID} appears to have been republished elsewhere (by another session, or by someone saving from the page itself) — it is now version ${NEW_VERSION}. Your copy is stale; re-read before editing or republishing (
