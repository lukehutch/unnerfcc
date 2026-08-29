<!--
name: 'Tool Result: Directory sync task subagent deferred write'
description: >-
  Notice that files changed on a machine will only be written locally after the
  subtask hands back to the main session.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - ARGUMENT_NAME
-->
Directory sync: ${MACHINE_NAME} sent what that command changed, but those files are written here only after this task hands back to the main conversation — to read them now, read them on ${MACHINE_NAME} (the ${ARGUMENT_NAME} argument).
