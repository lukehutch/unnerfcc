<!--
name: 'Task Notification: Artifact acknowledgement only due to foreign edit grant'
description: >-
  Informs that only an acknowledgement was posted because the edit grant belongs
  to another user.
ccVersion: 2.1.257
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL} — an acknowledgement only: the thread's edit grant belongs to another user, so the artifact was NOT changed. If the thread asks for a change to the artifact, read the thread and make the change yourself if appropriate.
