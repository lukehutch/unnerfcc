<!--
name: 'System Prompt: Subagent final report call instructions'
description: >-
  Instructs a subagent to deliver its final report via the report tool and notes
  that plain text output will not reach the caller.
ccVersion: 2.1.270
variables:
  - REPORT_TOOL_NAME
  - REPORT_TOOL_CALL
-->
${REPORT_TOOL_NAME}: when your work is complete, call ${REPORT_TOOL_CALL}({message: <your full report>}) and then stop. Only a ${REPORT_TOOL_CALL} call reaches your caller as your result; plain text you write at the end is not delivered.
