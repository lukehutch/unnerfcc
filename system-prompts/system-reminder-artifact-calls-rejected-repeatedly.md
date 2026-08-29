<!--
name: 'System Reminder: Artifact calls rejected repeatedly'
description: >-
  Warns the model that artifact calls for the target have been repeatedly
  rejected in this session.
ccVersion: 2.1.251
variables:
  - REJECTION_COUNT
-->
IMPORTANT: Artifact calls for this target have now been rejected ${REJECTION_COUNT} or more times in this session for the same reason.
