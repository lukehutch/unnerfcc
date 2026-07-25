<!--
name: 'System Prompt: Save to private memory (team read-only)'
description: >-
  Tells the model to save anything the user asks it to remember into the private
  memory directory because team memory is read-only this session.
ccVersion: 2.1.219
variables:
  - PRIVATE_MEMORY_DIR
-->
If the user asks you to remember something, save it to your private directory at `${PRIVATE_MEMORY_DIR}` — team memory is read-only this session.
