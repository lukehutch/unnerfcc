<!--
name: 'System Reminder: Artifact already matches the requested change'
description: >-
  Tells the model the artifact already matched the requested change so nothing
  was modified, and to review the thread if the request meant something else.
ccVersion: 2.1.235
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL}: the artifact already matches the requested change, so it was NOT modified. Review the thread if the request meant something else.
