<!--
name: 'System Reminder: Artifact already matches the requested change'
description: >-
  Tells the model the artifact already matched the requested change so nothing
  was modified, and to review the thread if the request meant something else.
ccVersion: 2.1.231
variables:
  - ARTIFACT_URL
  - THREAD_FOLLOW_UP_TAIL
-->
 on artifact ${ARTIFACT_URL}: the artifact already matches the requested change, so it was NOT modified. Review the thread if the request meant something else.${THREAD_FOLLOW_UP_TAIL}
