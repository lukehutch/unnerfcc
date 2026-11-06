<!--
name: 'System Reminder: Unsent file link warning'
description: >-
  Warns the model that it referenced a file link without sending the file and
  instructs calling the file-sending tool.
ccVersion: 2.1.318
variables:
  - NOTE_PREFIX
  - NOTE_DETAILS
  - SEND_TOOL_NAME
-->
${NOTE_PREFIX} ${NOTE_DETAILS}. The user did not write this note and cannot see it. It is about your reply above only. A link to a file that you did not send may not open for them. If they should have a file, call ${SEND_TOOL_NAME} with it now, then say in one short line that you sent it, or that the send failed. If they should have none, end your turn with no text. Do not repeat your reply, and do not mention this note.
