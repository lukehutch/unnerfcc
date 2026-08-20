<!--
name: 'Task Notification: Background agents did not complete'
description: >-
  Task notification listing background agents whose in-process state was lost
  when the previous Claude Code process exited, closing with the hint for
  checking or relaunching them.
ccVersion: 2.1.232
variables:
  - AGENT_NAME_LIST
  - CHECK_OR_RELAUNCH_HINT
-->
 background agents were running when the previous Claude Code process exited and did not complete: ${AGENT_NAME_LIST}. Their in-process state was lost. ${CHECK_OR_RELAUNCH_HINT}
