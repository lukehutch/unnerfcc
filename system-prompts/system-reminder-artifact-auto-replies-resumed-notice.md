<!--
name: 'System Reminder: Artifact auto-replies resumed notice'
description: Informs that auto-replies were resumed after being paused by a user interrupt.
ccVersion: 2.1.251
variables:
  - ARTIFACT_ID
  - ADDITIONAL_STATUS_NOTE
-->
Auto-replies on artifact ${ARTIFACT_ID} were resumed by a resume_replies request — they had been paused when the user interrupted the session (Ctrl+C or Stop). ${ADDITIONAL_STATUS_NOTE}
