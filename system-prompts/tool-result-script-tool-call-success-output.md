<!--
name: 'Tool Result: Script tool call success output'
description: >-
  Reports the successful completion and returned output of a tool call within a
  script.
ccVersion: 2.1.318
variables:
  - TOOL_CALL_IDENTIFIER
  - RESULT_CONTENT
-->
${TOOL_CALL_IDENTIFIER} finished. It returned:
${RESULT_CONTENT}
