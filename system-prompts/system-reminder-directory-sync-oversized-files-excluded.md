<!--
name: 'System Reminder: Directory sync oversized files excluded'
description: >-
  Informs the model that specific files exceed the per-file size limit and were
  excluded from syncing.
ccVersion: 2.1.251
variables:
  - OVERSIZED_FILES
-->
Directory sync: these files are over the per-file size limit, so this turn's version of them is NOT synced to the user's machine (which keeps whatever it last had there — nothing, for a new file): ${OVERSIZED_FILES}
