<!--
name: 'System Reminder: File modified by user or linter'
description: >-
  Variant of the external-file-change notice that introduces the relevant
  changes, shown with line numbers.
ccVersion: 2.1.321
variables:
  - FILE_CHANGE_NOTICE
  - DIFF_CONTENT
-->
${FILE_CHANGE_NOTICE} Here are the relevant changes (shown with line numbers):
${DIFF_CONTENT}
