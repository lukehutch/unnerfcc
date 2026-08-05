<!--
name: 'System Reminder: Auto-edit attribution unverified'
description: >-
  Tells the model an automatic artifact edit published but its attribution to
  the thread's edit grant could not be verified, so the change needs review.
ccVersion: 2.1.222
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL}: an automatic edit PUBLISHED but its attribution to the thread's edit grant could not be verified. Review the change.
