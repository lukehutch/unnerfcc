<!--
name: 'System Reminder: Container disk desync warning'
description: >-
  Warns the model that the container disk is older than the conversation and
  files or packages may be missing or out of date.
ccVersion: 2.1.310
variables:
  - MISSING_CALL_TIMESTAMP_NOTE
  - REPEATED_LAG_NOTE
-->
 of your recent tool calls, so the disk may be older than the conversation.${MISSING_CALL_TIMESTAMP_NOTE} Files that those calls created or changed may be missing or out of date, and installed packages may be gone. Check the files that you need before you rely on them, and tell the user if work was lost.${REPEATED_LAG_NOTE}
