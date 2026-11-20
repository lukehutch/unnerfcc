<!--
name: 'Tool Result: Config unreadable to confirm Claude account'
description: >-
  Informs the model that no file was sent because Claude Code could not read its
  configuration file to confirm the signed-in account.
ccVersion: 2.1.329
variables:
  - CALL_STATUS_NOTE
-->
No file was sent: Claude Code could not read its configuration file to confirm which Claude account is signed in. Tell the user; the call can be made again once Claude Code can read that file. ${CALL_STATUS_NOTE}
