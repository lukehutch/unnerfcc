<!--
name: 'System Reminder: Background agents from the previous session'
description: >-
  Lists background agents carried over from a previous session and tells the
  model their transcripts survive and can be resumed with SendMessage.
ccVersion: 2.1.219
variables:
  - BACKGROUND_AGENT_LIST
-->
 background agents from the previous session: ${BACKGROUND_AGENT_LIST}. They may have been stopped, or they may have been running when the previous Claude Code process exited — either way their transcripts are saved on disk, so their progress is not lost. Resume any of them by sending a message to its id with SendMessage, or check its worktree/output for partial work before assuming the task landed.
