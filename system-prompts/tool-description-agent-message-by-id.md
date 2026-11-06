<!--
name: 'Tool Description: Agent message by ID'
description: >-
  Explains how to message an agent using its ID rather than expired session
  context handles.
ccVersion: 2.1.318
variables:
  - MESSAGE_FUNCTION_NAME
-->
 To message one of them, call await ${MESSAGE_FUNCTION_NAME}({to: "ID", message: "..."}) from a script, where ID is that agent's id from the list above. The previous session's contexts handles no longer work, so use the ids.
