<!--
name: 'Tool Result: Human approval required on machine'
description: >-
  Tool result indicating that automated approval is insufficient and direct
  human approval is required on the target machine.
ccVersion: 2.1.251
variables:
  - TOOL_NAME
  - MACHINE_NAME
-->
This session's automatic check approved this ${TOOL_NAME} call, but for ${TOOL_NAME} on ${MACHINE_NAME} only a person's approval counts in this session, so it was not cleared to run and nothing ran. Send the call again and ask the user to approve it from the terminal or desktop prompt.
