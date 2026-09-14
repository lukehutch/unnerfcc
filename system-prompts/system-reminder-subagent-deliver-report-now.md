<!--
name: 'System Reminder: Deliver subagent report now'
description: >-
  Reminds a subagent that its report has not been delivered and directs it to
  call the reporting tool immediately.
ccVersion: 2.1.270
variables:
  - WARNING_PREFIX
  - REPORT_TOOL_NAME
-->
${WARNING_PREFIX} Your report has not been delivered. Call ${REPORT_TOOL_NAME}({message: <your full report>}) now, then stop.
