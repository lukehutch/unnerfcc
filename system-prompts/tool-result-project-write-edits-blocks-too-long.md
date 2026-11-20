<!--
name: 'Tool Result: project_write edits blocks too long'
description: >-
  Refuses edits when the blocks are too long relative to the doc size and
  advises splitting calls or passing full content.
ccVersion: 2.1.329
variables:
  - FALLBACK_INSTRUCTION
-->
The blocks are too long for a doc of this size. Send fewer in each call, or ${FALLBACK_INSTRUCTION}
