<!--
name: 'System Reminder: Automatic artifact edit refused'
description: >-
  Tells the model a requested automatic artifact edit was refused and the
  artifact was not changed, so it should read the thread and make the change
  itself if appropriate.
ccVersion: 2.1.231
variables:
  - ARTIFACT_URL
  - THREAD_FOLLOW_UP_TAIL
-->
 on artifact ${ARTIFACT_URL}: a requested automatic edit was refused, so the artifact was NOT changed. Read the thread and make the change yourself if appropriate.${THREAD_FOLLOW_UP_TAIL}
