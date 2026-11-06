<!--
name: 'Tool Result: Script tool call plugin rerun declined'
description: >-
  Reports that a plugin hook triggered a repeat tool execution which the user
  declined.
ccVersion: 2.1.318
variables:
  - TOOL_CALL_IDENTIFIER
-->
${TOOL_CALL_IDENTIFIER} ran, and a plugin's hook then started it again. The user declined that run.
