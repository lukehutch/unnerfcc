<!--
name: 'Tool Result: Script tool call waiting to run when stopped'
description: >-
  Reports that a tool call was queued and waiting to run when the script
  terminated.
ccVersion: 2.1.318
variables:
  - TOOL_CALL_IDENTIFIER
-->
${TOOL_CALL_IDENTIFIER} was waiting to run when the script stopped. The script got no result, and the call may still have run afterwards.
