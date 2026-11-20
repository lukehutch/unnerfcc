<!--
name: 'System Reminder: Artifact deleted by user'
description: >-
  Warns that the user deleted an artifact from /artifacts and its URL must not
  be used again.
ccVersion: 2.1.329
variables:
  - TAG_NAME
  - ARTIFACT_URL
-->
<${TAG_NAME} url="${ARTIFACT_URL}"/> The user deleted this Artifact from /artifacts: its link no longer works for anyone, it cannot be restored, and it cannot be published to again — publishing the same file creates a new Artifact at a new URL. Do not use this url again.
