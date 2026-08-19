<!--
name: 'System Reminder: Automatic artifact edit could not be applied'
description: >-
  Tells the model a requested automatic edit did not apply to the artifact's
  current source so nothing changed, and to read the thread and make the change
  itself if appropriate.
ccVersion: 2.1.235
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL}: a requested automatic edit could not be applied to the artifact's current source, so the artifact was NOT changed. Read the thread and make the change yourself if appropriate.
