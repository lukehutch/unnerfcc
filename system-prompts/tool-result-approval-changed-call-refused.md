<!--
name: 'Tool Result: Approval changed tool call refused'
description: >-
  Refuses execution because user approval altered the call parameters from what
  was requested.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
  - RUNNER_TOOL_NAME
-->
 changed this ${TOOL_NAME} call, but ${RUNNER_TOOL_NAME} runs only the call it asked permission for, so the request there was withdrawn and nothing ran. Do not guess at the change: tell the user that the approval changed the call and that nothing ran.
