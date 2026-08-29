<!--
name: 'System Reminder: User history cannot be rewritten'
description: >-
  Warns that commits held by the user cannot be rewritten from the remote
  session and forbids resetting, amending, or rebasing them.
ccVersion: 2.1.251
variables:
  - RECOVERY_INSTRUCTION
-->
); history the user holds cannot be rewritten from here, so they are back on the work branch. ${RECOVERY_INSTRUCTION} — do not reset, amend or rebase commits the user has.
