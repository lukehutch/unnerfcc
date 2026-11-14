<!--
name: 'Tool Parameter: SendUserFile status (no notification)'
description: >-
  Describes the status parameter for SendUserFile when neither value sends a
  notification and directs calling the notification tool if needed.
ccVersion: 2.1.325
variables:
  - NOTIFY_TOOL_NAME
-->
Set `status` on every call. Use `proactive` when you're initiating (build artifact ready, report generated). Use `normal` when replying to something the user just said. Neither one sends a notification: the file waits in this session until the user opens it. If this run is meant to notify the user, call ${NOTIFY_TOOL_NAME} as well.
