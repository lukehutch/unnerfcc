<!--
name: 'Tool Description: Task message by ID'
description: >-
  Explains how to message a task using its task ID rather than expired session
  context handles.
ccVersion: 2.1.318
variables:
  - MESSAGE_FUNCTION_NAME
-->
 To message it, call await ${MESSAGE_FUNCTION_NAME}({to: "ID", message: "..."}) from a script, where ID is the task id above. The previous session's contexts handles no longer work, so use the id.
