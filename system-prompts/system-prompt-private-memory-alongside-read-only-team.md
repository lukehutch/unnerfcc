<!--
name: 'System Prompt: Private memory alongside read-only team memory'
description: >-
  Tells the model to save every memory type into its private memory directory
  this session because team memory is read-only.
ccVersion: 2.1.219
variables:
  - PRIVATE_MEMORY_DIR
-->
Your private memory directory at `${PRIVATE_MEMORY_DIR}` persists alongside team memory: save every memory type there this session — team memory is read-only, so team-scoped memories also belong in your private directory for now.
