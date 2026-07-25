<!--
name: 'Task Notification: Background agents did not complete'
description: >-
  Task notification listing background agents whose in-process state was lost
  when the previous Claude Code process exited, telling the model to inspect
  each worktree before assuming the work landed.
ccVersion: 2.1.219
variables:
  - AGENT_NAME_LIST
-->
 background agents were running when the previous Claude Code process exited and did not complete: ${AGENT_NAME_LIST}. Their in-process state was lost. Check each agent's worktree/output for partial work before assuming the tasks landed.
