<!--
name: 'System Prompt: Remote machine stopped serving omit argument'
description: >-
  Notice that Claude on the machine stopped serving the session, advising
  omitting the machine argument.
ccVersion: 2.1.318
variables:
  - REASON
  - ARGUMENT_NAME
  - MACHINE_NAME
-->
 Claude told this session it had stopped serving it, ${REASON}. Omit "${ARGUMENT_NAME}" and run commands here; if the task needs ${MACHINE_NAME} files, tools or logins, do not do that part here: tell the user that 
