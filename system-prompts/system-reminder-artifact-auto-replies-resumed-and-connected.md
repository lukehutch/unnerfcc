<!--
name: 'System Reminder: Artifact auto-replies resumed and connected'
description: >-
  Notifies that auto-replies were resumed by a resume_replies request and the
  live watch is now connected.
ccVersion: 2.1.251
variables:
  - ARTIFACT_ID
  - ADDITIONAL_STATUS_NOTE
-->
Auto-replies on artifact ${ARTIFACT_ID} were resumed by a resume_replies request — they had been paused when the user interrupted the session (Ctrl+C or Stop); the watch has now connected. ${ADDITIONAL_STATUS_NOTE}
