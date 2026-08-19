<!--
name: 'System Reminder: Auto-edit publish could not be confirmed'
description: >-
  Tells the model an automatic edit attempt could not confirm whether its
  publish landed, so whether the artifact changed is unknown and both the
  artifact and the thread need review.
ccVersion: 2.1.235
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL}: an automatic edit attempt could not confirm whether its publish landed, so it is UNKNOWN whether the artifact was changed. Review the artifact and the thread.
