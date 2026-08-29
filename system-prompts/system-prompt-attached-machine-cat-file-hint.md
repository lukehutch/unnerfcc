<!--
name: 'System Prompt: Attached machine cat file hint'
description: >-
  Short instruction hint on using cat with a specific tool and argument on the
  target machine.
ccVersion: 2.1.251
variables:
  - TOOL_NAME
  - ARGUMENT_NAME
-->
cat it there with ${TOOL_NAME} and "${ARGUMENT_NAME}"
