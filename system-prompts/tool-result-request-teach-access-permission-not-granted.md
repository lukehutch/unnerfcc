<!--
name: 'Tool Result: request_teach_access Permission Pending'
description: >-
  tool_result text telling the model macOS permissions aren't granted yet and to
  call request_teach_access again after the user grants them.
ccVersion: 2.1.178
variables:
  - TOOL_RESULT_REQUEST_TEACH_ACCESS_PERMISSION_NOT_GRANTED_VAR_0
-->
macOS ${TOOL_RESULT_REQUEST_TEACH_ACCESS_PERMISSION_NOT_GRANTED_VAR_0.join(" and ")} permission(s) not yet granted. The permission panel has been shown. Once the user grants the missing permission(s), call request_teach_access again.
