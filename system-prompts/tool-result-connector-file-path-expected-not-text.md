<!--
name: 'Tool Result: Connector file path expected instead of text'
description: >-
  Refuses a connector call because a file path parameter received non-path text,
  explaining how to send a file or omit the parameter.
ccVersion: 2.1.329
variables:
  - TOOL_NAME
  - PARAM_NAME
  - FORMAT_INSTRUCTION
  - OMITTABLE_PARAM
-->
No file was sent and ${TOOL_NAME} was not called: you were asked for a file's path in ${PARAM_NAME}, so what you wrote there is not sent to ${TOOL_NAME} as text. To send a file there now, ${FORMAT_INSTRUCTION}; you may also call ${TOOL_NAME} without ${OMITTABLE_PARAM}.
