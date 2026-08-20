<!--
name: 'System Reminder: Auto-edit result unknown'
description: >-
  Tells the model an automatic edit attempt returned no recognizable publish
  result, so whether the artifact changed is unknown and both the artifact and
  the thread need review.
ccVersion: 2.1.222
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL}: an automatic edit attempt did not return a recognizable publish result, so it is UNKNOWN whether the artifact was changed. Review the artifact and the thread.
