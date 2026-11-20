<!--
name: 'Tool Result: project_write edits invalid with script or content'
description: >-
  Refuses edits when called from a script or combined with content or
  local_path, directing the model to pass whole content instead.
ccVersion: 2.1.329
variables:
  - REFUSAL_PREFIX
  - FALLBACK_INSTRUCTION
-->
${REFUSAL_PREFIX} edits cannot be used from a script, or with content or local_path. Instead, ${FALLBACK_INSTRUCTION}
