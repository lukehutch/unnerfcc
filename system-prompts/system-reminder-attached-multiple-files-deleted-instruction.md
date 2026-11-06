<!--
name: 'System Reminder: Multiple attached files deleted instruction'
description: >-
  Instructs the model that multiple attached files were deleted, forbidding
  giving new details or attempting to recover them.
ccVersion: 2.1.318
variables:
  - COUNT
-->
${COUNT} files that were attached earlier in this chat were deleted just before this message. A mark stands wherever one of them or a read of it stood. What you said about them up to now, you said while they were in this chat. They are not in this chat now, so give no new detail of them. Do not open or recover any saved copy of them, even by its path. If the person asks about them or asks you to open them, tell them that they were deleted.
