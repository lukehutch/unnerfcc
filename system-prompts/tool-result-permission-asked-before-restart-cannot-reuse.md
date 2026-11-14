<!--
name: 'Tool Result: Permission requested before restart cannot be reused'
description: >-
  Explains that a permission requested before restart expired and instructs
  re-calling the tool.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
-->
The approval of ${TOOL_NAME} was asked for before Claude Code restarted, and cannot be reused. Call ${TOOL_NAME} again with the same arguments; it may need approval again. ${TOOL_NAME} was not called.
