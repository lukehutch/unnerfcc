<!--
name: 'System Reminder: Artifact auto-edit outcome unknown, note withheld'
description: >-
  Tells the model an automatic artifact edit could not confirm its publish
  landed, so whether the artifact changed is unknown and the follow-up note was
  withheld, and to review the artifact and the thread.
ccVersion: 2.1.235
variables:
  - NOTE_WITHHELD_REASON
-->
) could not confirm whether its publish landed, so it is UNKNOWN whether the artifact was changed; the follow-up note was withheld because ${NOTE_WITHHELD_REASON}. Review the artifact and the thread.
