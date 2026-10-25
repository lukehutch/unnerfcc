<!--
name: 'System Prompt: Remote machine stopped serving omit argument'
description: >-
  Notice that Claude on the machine stopped serving the session, advising
  omitting the machine argument.
ccVersion: 2.1.310
variables:
  - REASON
  - ARGUMENT_NAME
-->
 Claude told this session it had stopped serving it, ${REASON}. Omit "${ARGUMENT_NAME}" and run commands here; if the task needs 
