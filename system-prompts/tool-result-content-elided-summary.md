<!--
name: 'Tool Result: Content elided summary'
description: >-
  Displays truncated content with the head, character count of elided text, and
  tail.
ccVersion: 2.1.318
variables:
  - HEAD_OUTPUT
  - ELIDED_CHARS
  - TAIL_OUTPUT
-->
${HEAD_OUTPUT}
... [${ELIDED_CHARS} chars elided] ...
${TAIL_OUTPUT}
