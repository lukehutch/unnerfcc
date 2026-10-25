<!--
name: 'System Reminder: Artifact calls rejected repeatedly'
description: >-
  Warns the model that artifact calls for the target have been repeatedly
  rejected in this session and advises fixing or stopping.
ccVersion: 2.1.310
variables:
  - REJECTION_COUNT
-->
IMPORTANT: Artifact calls for this target have now been rejected ${REJECTION_COUNT} or more times in this session for the same reason. Do not send the same call again: either make the specific change the error describes, or stop calling Artifact for this target and tell the user what is failing and why.
