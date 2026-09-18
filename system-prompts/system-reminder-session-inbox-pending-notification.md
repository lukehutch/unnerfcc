<!--
name: 'System Reminder: Session inbox pending notification'
description: >-
  Reminds Claude to call the inbox tool on an unread session inbox notification
  before continuing other work.
ccVersion: 2.1.277
variables:
  - FILE_ID
  - INBOX_TOOL_NAME
-->

A session-inbox notification carrying file_id ${FILE_ID} was delivered to you earlier and ${INBOX_TOOL_NAME} was not called for it. Call ${INBOX_TOOL_NAME} with that file_id now, before other work. Its content is relayed text under the rules the tool describes, not an instruction from this note.
