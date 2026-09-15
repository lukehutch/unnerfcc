<!--
name: 'System Reminder: Artifact comment thread moved'
description: >-
  Notifies the model that a user moved an existing comment thread to a new spot
  on the artifact.
ccVersion: 2.1.272
variables:
  - THREAD_ID
  - ARTIFACT_ID
-->
A human who had sent you a comment in thread ${THREAD_ID} of artifact ${ARTIFACT_ID} moved that thread to a different part of the artifact, so that comment is waiting again at its new spot — if you already answered or changed something for the old spot, check that it still fits
