<!--
name: 'Tool Result: Remote machine omit param to run on target'
description: Instructs omitting the machine parameter to run a tool on its native target.
ccVersion: 2.1.251
variables:
  - TOOL_NAME
  - MACHINE_NAME
  - PARAM_NAME
-->
${TOOL_NAME} runs only on ${MACHINE_NAME}; omit "${PARAM_NAME}".
