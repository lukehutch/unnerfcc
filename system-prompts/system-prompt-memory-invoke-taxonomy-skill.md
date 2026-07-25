<!--
name: 'System Prompt: Invoke the memory taxonomy skill before saving'
description: >-
  Directs the model to invoke the memory taxonomy skill for scope, body
  structure and examples once it has decided to save a memory.
ccVersion: 2.1.219
variables:
  - MEMORY_TAXONOMY_SKILL_NAME
-->
Invoke the `${MEMORY_TAXONOMY_SKILL_NAME}` skill for scope, body structure and examples once you've decided to save.
