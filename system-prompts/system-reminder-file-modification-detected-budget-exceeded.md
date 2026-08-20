<!--
name: 'System Reminder: File modification detected (budget exceeded)'
description: >-
  Variant of the external-file-change notice explaining the diff is omitted
  because other changed files this turn filled the snippet budget, pointing at
  the read tool instead.
ccVersion: 2.1.235
variables:
  - FILE_CHANGE_NOTICE
-->
${FILE_CHANGE_NOTICE} The diff is omitted here because other changed files this turn already filled the snippet budget; use 
