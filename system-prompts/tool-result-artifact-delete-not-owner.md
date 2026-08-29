<!--
name: 'Tool Result: Artifact delete not owner'
description: >-
  Tells the model that the artifact cannot be deleted because it is owned by
  another user.
ccVersion: 2.1.251
variables:
  - ARTIFACT_URL
-->
The Artifact at ${ARTIFACT_URL} belongs to someone else, and only its owner can delete it. Nothing was deleted; tell the user.
