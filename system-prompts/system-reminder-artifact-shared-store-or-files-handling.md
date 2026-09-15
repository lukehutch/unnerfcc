<!--
name: 'System Reminder: Artifact store or files handling instructions'
description: >-
  Instructs reading index and changed files depending on whether artifact
  content lives in store or files.
ccVersion: 2.1.272
variables:
  - STORE_ACTION_INSTRUCTION
-->
) and read any index file among them before writing either way. If it is the store, ${STORE_ACTION_INSTRUCTION}; if it is files, read each one you will change (
