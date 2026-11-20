<!--
name: 'Tool Result: project_write edits cannot verify doc staleness'
description: >-
  Refuses edits because the session cannot verify whether the doc changed and
  instructs passing full content instead.
ccVersion: 2.1.329
variables:
  - REFUSAL_PREFIX
  - FALLBACK_INSTRUCTION
-->
${REFUSAL_PREFIX} This session cannot check whether the doc has changed, so it cannot apply edits. Instead, ${FALLBACK_INSTRUCTION}
