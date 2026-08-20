<!--
name: 'System Prompt: Personal memory while shared stores are read-only'
description: >-
  Tells the model to save every memory type in its personal memory directory
  with the file tools because the shared stores are read-only this session.
ccVersion: 2.1.231
variables:
  - PERSONAL_MEMORY_DIR
-->
Save every memory type in your personal memory directory at `${PERSONAL_MEMORY_DIR}` with the file tools; the shared stores are read-only this session. Your personal memory directory already exists — write to it directly with the Write tool (do not run mkdir or check for its existence).
