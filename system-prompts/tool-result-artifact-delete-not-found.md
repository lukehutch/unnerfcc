<!--
name: 'Tool Result: Artifact not found for delete'
description: >-
  Tells the model that the artifact to delete does not exist, was already
  deleted, or is not accessible.
ccVersion: 2.1.251
variables:
  - ARTIFACT_URL
-->
There is no Artifact at ${ARTIFACT_URL} — it may already be deleted, the link is wrong, or it isn't one the user can see. Nothing to delete; tell the user.
