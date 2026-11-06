<!--
name: 'Tool Parameter: Subagent internal transcript calls'
description: >-
  Describes internal field recording a subagent's executed tool calls, inputs,
  and results.
ccVersion: 2.1.318
variables:
  - CALL_TYPE_1
  - CALL_TYPE_2
-->
@internal The subagent's ${CALL_TYPE_1} and ${CALL_TYPE_2} calls that landed, in order: each call's tool, input and result text. The subagent writes the session's task list, and no other row of the main transcript shows these calls (not a stable consumer field)
