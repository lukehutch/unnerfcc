<!--
name: 'Tool Result: Remote machine omit param fallback lead-in'
description: Lead-in suggesting omitting the machine parameter to run the tool elsewhere.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - TOOL_NAME
  - PARAM_NAME
-->
${MACHINE_NAME} does not serve ${TOOL_NAME} right now; omit "${PARAM_NAME}" to run it 
