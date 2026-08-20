<!--
name: 'Tool Result: Name matches only in-session agents'
description: >-
  SendFiles refusal telling the model the name resolves only to agents inside
  this session, so it should send a message referencing the file as @<path>
  instead.
ccVersion: 2.1.231
variables:
  - REQUESTED_RECIPIENT_NAME
  - SEND_MESSAGE_TOOL_NAME
  - RESOLUTION_NOTES
-->
'${REQUESTED_RECIPIENT_NAME}' matches only agents in this session — use ${SEND_MESSAGE_TOOL_NAME} and reference the file as @<path> instead.${RESOLUTION_NOTES}
