<!--
name: 'Tool Result: Script tool call error output'
description: Reports the error details returned by a failed tool call within a script.
ccVersion: 2.1.318
variables:
  - TOOL_CALL_IDENTIFIER
  - ERROR_MESSAGE
-->
${TOOL_CALL_IDENTIFIER} failed with this error:
${ERROR_MESSAGE}
