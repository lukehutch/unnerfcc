<!--
name: 'System Reminder: Artifact auto-edit refused and its reply withheld'
description: >-
  Tells the model a requested automatic artifact edit was refused so the
  artifact was not changed and the explanatory reply was withheld, and to read
  the thread and make the change itself if appropriate.
ccVersion: 2.1.235
variables:
  - REPLY_WITHHELD_REASON
-->
) was refused, so the artifact was NOT changed, and the explanatory reply was withheld: ${REPLY_WITHHELD_REASON}. Read the thread and make the change yourself if appropriate.
