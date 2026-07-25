<!--
name: 'System Reminder: Apply memory format from system prompt'
description: >-
  Directs the model to apply the memory types, what-not-to-save criteria, and
  frontmatter format already present in the Memory section of its system prompt.
ccVersion: 2.1.219
variables:
  - MEMORY_SCOPE_GUIDANCE_CLAUSE
-->
Apply the memory types, ${MEMORY_SCOPE_GUIDANCE_CLAUSE}what-not-to-save criteria, and frontmatter format from the Memory section of your system prompt — it is already in your context above.
