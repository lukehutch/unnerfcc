<!--
name: 'System Reminder: Auto-replies re-enabled by this publish'
description: >-
  Tells the model this publish re-armed auto-replies that had been stopped when
  their live-updates task was killed, and how to disarm them again for the
  artifact or the whole session.
ccVersion: 2.1.222
variables:
  - ARTIFACT_URL
-->
Auto-replies on artifact ${ARTIFACT_URL} were re-enabled by this publish — they had been stopped when their live-updates task was killed. If this wasn't intended, kill the task again to stop them for this artifact, or use the kill-all-agents gesture to disarm auto-replies for the whole session.
