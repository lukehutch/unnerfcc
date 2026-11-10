<!--
name: 'Tool Result: Connector call non-object arguments refused'
description: >-
  Refuses a connector call whose arguments are not structured as a plain JSON
  object.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: this call's arguments are not a plain JSON object, so Claude Code could not tell what it would send. Pass them as one JSON object of argument names and values.
