<!--
name: 'System Reminder: Background agents from the previous session'
description: >-
  Lists background agents carried over from a previous session, tells the model
  their transcripts are saved on disk so their progress is not lost, and closes
  with the hint for resuming them.
ccVersion: 2.1.232
variables:
  - BACKGROUND_AGENT_LIST
  - RESUME_HINT
-->
 background agents from the previous session: ${BACKGROUND_AGENT_LIST}. They may have been stopped, or they may have been running when the previous Claude Code process exited — either way their transcripts are saved on disk, so their progress is not lost. ${RESUME_HINT}
