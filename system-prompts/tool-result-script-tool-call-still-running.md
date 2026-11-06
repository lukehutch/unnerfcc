<!--
name: 'Tool Result: Script tool call still running when stopped'
description: Reports that a tool call was still in progress when the script was terminated.
ccVersion: 2.1.318
variables:
  - TOOL_CALL_IDENTIFIER
-->
${TOOL_CALL_IDENTIFIER} was still running when the script stopped. The script got no result, and the call may have run in part or in full.
