<!--
name: 'Tool Result: project_write edits blocked by permission rule'
description: >-
  Refuses edits because a permission rule applies to the resulting text and
  requires a full-text write via content.
ccVersion: 2.1.329
variables:
  - REFUSAL_PREFIX
  - FALLBACK_INSTRUCTION
-->
${REFUSAL_PREFIX} A permission rule covers the text that these edits would save, and only a write of the whole text is checked against it. Instead, ${FALLBACK_INSTRUCTION}
