<!--
name: 'Tool Result: Connector call uncopyable arguments refused'
description: >-
  Refuses a connector call whose arguments could not be cloned or inspected,
  advising simpler or flatter JSON structures.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: Claude Code could not copy this call's arguments, so it could not tell what the call would send. Calling again with the same arguments will not work: use plain JSON values, and fewer or flatter ones if they are very many or very deeply nested.
