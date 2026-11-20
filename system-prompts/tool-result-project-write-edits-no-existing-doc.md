<!--
name: 'Tool Result: project_write edits target doc missing'
description: >-
  Refuses edits when no text doc exists at the target path and instructs how to
  create one.
ccVersion: 2.1.329
variables:
  - REFUSAL_PREFIX
  - CREATE_INSTRUCTION
-->
${REFUSAL_PREFIX} There is no text doc at this path to edit. To create one, ${CREATE_INSTRUCTION}
