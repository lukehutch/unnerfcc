<!--
name: 'System Reminder: File modification detected (budget exceeded)'
description: >-
  Variant of the external-file-change notice explaining the diff is omitted
  because other changed files this turn filled the snippet budget, pointing at
  the read tool instead.
ccVersion: 2.1.251
variables:
  - FILE_CHANGE_NOTICE
  - READ_TOOL_NAME
-->
${FILE_CHANGE_NOTICE} The diff is omitted here because other changed files this turn already filled the snippet budget; use ${READ_TOOL_NAME} if you need the current content.
